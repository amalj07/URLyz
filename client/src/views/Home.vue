<template>
    <div class="home">
        <v-container>
            <div class="my-16">
                <p class="text-center text-h3 pt-5">myURL</p>
                <p class="text-center text-h5 pb-5">Create your own links...</p>
            </div>
            <div>
                <v-row justify="center">
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
                        <div>
                            <v-btn 
                                flat 
                                height="57" 
                                color="deep-purple lighten-1 white--text"
                                @click="shorten"
                            >Shorten</v-btn>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            longUrl: ''
        }
    },
    methods: {
        shorten() {
            let url = this.$serverURLI + "/api/url/shorten"
            this.$http.post(url, {
                longUrl: this.longUrl
            }).then(response => {
                if(response.status == 200) {
                    console.log(response.data)
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