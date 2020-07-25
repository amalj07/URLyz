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
            disabled: false
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
            this.loading = true
            this.disabled = true
            let url = this.$serverURLI + "/api/url/shorten"
            this.$http.post(url, {
                longUrl: this.longUrl
            }).then(response => {
                this.loading = false
                this.disabled = false
                this.copyBtn = 'COPY LINK'
                this.copyBtnTxtClr = 'blue--text text--darken-2'
                if(response.status == 200) {
                    this.shortUrl = response.data
                } else {
                    this.snackbar = true
                    this.snackbarText = response.data
                }
            }).catch(error => {
                this.loading = false
                this.disabled =false
                this.snackbar = true
                if(error.message == 'Request failed with status code 401') {
                    this.snackbarText = 'Invalid URL'
                } else if (error.message == 'Request failed with status code 500') {
                    this.snackbarText = 'Internal server error'
                }
            })
        },
        copyShortUrl() {
            this.copyBtn = "LINK COPIED!"
            this.copyBtnTxtClr = 'green--text'
        }
    }
}
</script>

<style>
.v-btn.copy::before {
  background-color: transparent;
}
</style>