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
                <v-snackbar
                    text
                    top
                    color="error"
                    v-model="snackbar">
                    {{ this.snackbarText }}
                    <template v-slot:action="{ attrs }">
                        <v-btn
                        color="error"
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                        >
                        <v-icon left>close</v-icon>
                        </v-btn>
                    </template>
                </v-snackbar>
            </div>
                <v-row justify="center">
                        <v-card class="ml-8"
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
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            longUrl: '',
            shortUrl: '',
            copyBtn: 'COPY LINK',
            copyBtnTxtClr: 'blue--text text--darken-2',
            snackbar: false,
            snackbarText: '',
            loading: false,
            disabled: false,
            sid: '',
            token: ''
        }
    },
    watch: {
        longUrl: function() {
            if(this.longUrl == '') {
                this.shortUrl = '',
                this.copyBtn = 'COPY LINK',
                this.copyBtnTxtClr = 'blue--text text--darken-2'
            }
        }
    },
    methods: {
        shorten() {
            if(this.$cookies.get("sid") != null && this.$cookies.get("t") != null) {
                this.sid = this.$cookies.get("sid")
                this.token = this.$cookies.get("t")
            }
            this.loading = true
            this.disabled = true
            let url = this.$serverURLI + "/api/shortenurl/shorten"
            this.$http.post(url, {
                sid: this.sid,
                token: this.token,
                longUrl: this.longUrl
            }).then(response => {
                this.loading = false
                this.disabled = false
                this.copyBtn = 'COPY LINK'
                this.copyBtnTxtClr = 'blue--text text--darken-2'
                this.shortUrl = response.data
            }).catch(error => {
                this.loading = false
                this.disabled =false
                this.snackbar = true
                if(error.response.data == 'Invalid long url'){
                    this.snackbarText = 'Invalid URL'
                } else if (error.response.data == 'Something went wrong!' || error.response.data == 'invalid base url') {
                    this.snackbarText = 'Something went wrong!'
                }else {
                    this.logout
                }
            })
        },
        copyShortUrl() {
            this.copyBtn = "LINK COPIED!"
            this.copyBtnTxtClr = 'green--text'
        },
        async logout() {
            this.$http.post('http://localhost:5000/api/user/logout', {
                sid: this.$cookies.get("sid"),
                token: this.$cookies.get("t")
            }).then(async () => {
                await this.$cookies.remove("sid")
                await this.$cookies.remove("t")
                // this.$router.push('/login')
                window.location.href = 'http://localhost:8080/'
            })
        }
    }
}
</script>

<style>
.v-btn.copy::before {
  background-color: transparent;
}
</style>