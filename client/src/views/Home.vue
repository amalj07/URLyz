<template>
    <div class="home">
        <v-container>
            <div class="my-10">
                <p class="text-center text-h3 pt-5">myURL</p>
                <p class="text-center text-h5 pb-5">Create your own links...</p>
            </div>
                <v-row class="mt-16" justify="center">
                   <v-col cols="8" md="6">
                        <v-text-field
                            flat
                            label="Solo"
                            placeholder="Place your link here..."
                            solo
                            height="60"
                            outlined
                            color="deep-purple lighten-1"
                            v-model="longUrl"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="1" md="1">
                            <v-btn 
                                flat 
                                height="57" 
                                color="deep-purple lighten-1 white--text"
                                @click="shorten"
                            >Shorten</v-btn>
                    </v-col>
                </v-row>
                <v-row justify="center">
                        <v-card class="ml-8"
                            outlined
                            max-width=800
                            min-width=800
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
            copyBtnTxtClr: 'purple--text'
        }
    },
    watch: {
        longUrl: function() {
            if(this.longUrl == '') {
                this.shortUrl = '',
                this.copyBtn = 'COPY LINK',
                this.copyBtnTxtClr = 'purple--text'
            }
        }
    },
    methods: {
        shorten() {
            let url = this.$serverURLI + "/api/url/shorten"
            this.$http.post(url, {
                longUrl: this.longUrl
            }).then(response => {
                if(response.status == 200) {
                    this.shortUrl = response.data
                } else {
                    console.log(response.data)
                }
            }).catch(error => {
                alert(error)
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