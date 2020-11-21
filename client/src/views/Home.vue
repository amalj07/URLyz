<template>
    <div class="home">
        <v-container>
            <div class="my-10">
                <p class="text-center text-h3 pt-5">URLyz</p>
                <p class="text-center text-h5 pb-5">Create your own links...</p>
            </div>
            <div>
                <v-row class="mt-16" justify="center">
                   <v-col cols="8" md="6">
                        <v-text-field
                            flat
                            label="Solo"
                            placeholder="Place your link here..."
                            solo
                            height="60"
                            outlined
                            color="blue darken-2"
                            v-model="longUrl"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="1" md="1">
                            <v-btn 
                                flat
                                :loading= this.loading
                                :disabled= this.disabled
                                height="57" 
                                color="blue darken-2 white--text"
                                @click="shorten"
                            >Shorten</v-btn>
                    </v-col>
                </v-row>
                <v-row class="mt-n5" justify="center">
                     <span class="url mr-1 mt-4">urlyz.xyz/</span>
                    <v-text-field
                        v-model="customUrl"
                        class="customurl"
                        placeholder="Enter a custom URL or leave blank"
                    ></v-text-field>
                </v-row>
                <v-row justify="center">
                    <v-card class="mt-3 ml-8"
                        outlined
                        max-width=600
                        min-width=710
                        min-height=60>
                        <v-list-item>
                            <v-card-text>
                                {{ this.shortUrl }}
                            </v-card-text>
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                :class="`copy white lighten-1 ${this.copyBtnTxtClr}`"
                                height=59
                                v-ripple="{ class: 'white--text' }"
                                v-clipboard:copy="shortUrl"
                                v-clipboard:success="copyShortUrl">
                                    {{ this.copyBtn }}
                            </v-btn>
                        </v-list-item>
                    </v-card>  
                </v-row>
                <v-snackbar
                    text
                    top
                    color="error"
                    v-model="snackbar">
                    {{ this.snackbarText }}
                    <template v-slot:action="{ attrs }">
                        <v-btn
                        :ripple=false
                        color="error"
                        text
                        class="copy"
                        v-bind="attrs"
                        @click="snackbar = false"
                        >
                        <v-icon left>close</v-icon>
                        </v-btn>
                    </template>
                </v-snackbar>
            </div>   
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            longUrl: '',
            shortUrl: '',
            customUrl: '',
            copyBtn: 'COPY LINK',
            copyBtnTxtClr: 'blue--text text--darken-2',
            snackbar: false,
            snackbarText: '',
            loading: false,
            disabled: false,
        }
    },
    watch: {
        longUrl: function() {
            if(this.longUrl == '') {
                this.shortUrl = '',
                this.customUrl = '',
                this.copyBtn = 'COPY LINK',
                this.copyBtnTxtClr = 'blue--text text--darken-2'
            }
        }
    },
    methods: {
        shorten() {
            this.loading = true
            this.disabled = true
            let url = `${this.$serverURLI}/api/shortenurl/shorten`
            this.$http.post(url, {
                longUrl: this.longUrl,
                customUrl: this.customUrl
            }).then(response => {
                this.loading = false
                this.disabled = false
                this.copyBtn = 'COPY LINK'
                this.copyBtnTxtClr = 'blue--text text--darken-2'
                this.shortUrl = response.data
            }).catch(error => {
                this.loading = false
                this.disabled =false
                if(error.response.data == "Invalid user") {
                    this.logout()
                } else if(error.response.data == 'Invalid URL' || error.response.data == 'Custom url already taken'){
                    this.snackbar = true
                    this.snackbarText = error.response.data
                } else {
                    this.snackbar = true
                    this.snackbarText = 'Something went wrong!'
                }
            })
        },
        copyShortUrl() {
            this.copyBtn = "LINK COPIED!"
            this.copyBtnTxtClr = 'green--text'
        },
        logout() {
            let url = `${this.$serverURLI}/api/user/logout`
            this.$http.get(url).then(() => {
                // window.location.href = `${this.$serverURLI}`
                window.location.href = process.env.VUE_APP_CLIENT_URL + '/login'
            })
        },
    }
}
</script>

<style>
.v-btn.copy::before {
  background-color: transparent;
}
.v-text-field.customurl {
    max-width: 350px !important;
}
.url {
    font-size: 20px;
}
</style>