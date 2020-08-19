<template>
  <div>
      <div class="dashboard">
        <v-container>
          <h1>My URLs</h1>
          <v-card text max-width="800" class="px-3" v-for="url in urls" :key="url.urlCode">
            <v-layout row wrap>
              <v-flex xs10 md5>
                <div class="my-2">{{ url.shortUrl }}</div>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <v-chip small text-color="white" :color="getColor(url.status)" class="my-2">{{ url.status }}</v-chip>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <div class="my-2">Disable</div>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <div class="my-2">Delete</div>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-card>
        </v-container>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urls: []
    }
  },
  methods: {
    fetchUrls() {
      const sid = this.$cookies.get("sid")
      const token = this.$cookies.get("t")
      const url = 'http://localhost:5000/api/fetch/fetchurl'
      this.$http.post(url, {
        sid,
        token
      }).then(response => {
        this.urls = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getColor(status) {
      if(status == 'active') {
        return "green"
      }else {
        return "red"
      }
    }
  },
  created() {
    this.fetchUrls()
  }
}
</script>

<style>

</style>