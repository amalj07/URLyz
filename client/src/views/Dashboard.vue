<template>
  <div>
      <div class="dashboard">
        <v-container>
          <h1>My URLs</h1>
          <v-card outlined text max-width="800" class="px-3">
            <div v-for="url in urls" :key="url.urlCode">
              <v-layout row wrap>
                <v-flex xs10 md5>
                  <div class="my-3 ml-4 grey--text text--darken-3">{{ url.shortUrl }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                    <v-chip
                      small
                      text-color="white"
                      :color="getColor(url.status)"
                      class="my-3 ml-4">
                      {{ url.status }}
                    </v-chip>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="text-right">
                    <v-btn
                      outlined
                      shaped
                      small
                      class="my-3"
                      color="blue darken-2"
                      @click="disableLink(url.urlCode)">
                      <span>Disable</span>
                    </v-btn>
                  </div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="text-right">
                    <v-btn
                      text
                      shaped
                      class="my-2 white blue--text text--darken-2">
                      <!-- <span>Delete</span> -->
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </div>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
            </div>
          </v-card>
        </v-container>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(['fetchUrls']),
    getColor(status) {
      if(status == 'active') {
        return "green"
      }else {
        return "red"
      }
    },
    disableLink(url) {
      console.log(url)
    }
  },
  computed: mapGetters(['urls']),
  created() {
    this.fetchUrls()
  }
}
</script>

<style>

</style>