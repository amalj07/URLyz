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
                                    class="white lighten-1 purple--text"
                                    height=59>
                                        copy link
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
            shortUrl: ''
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
        }
    }
}
</script>

<style>

</style>