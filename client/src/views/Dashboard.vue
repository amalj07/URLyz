<template>
  <div>
    <NavDrawer />
      <div class="mt-10 ml-8">
        <v-container>
          <v-dialog
              overlay-color="indigo lighten-5"
              max-width="450"
              persistent
              v-model="deleteUrlDialog">
              <v-form ref="verifyUserForm">
                  <v-card
                      :loading="this.deleteurl">
                      <v-card-title class="justify-center blue--text text--darken-2">
                          Delete Url
                      </v-card-title>
                      <v-card-text class="pt-5">
                          <p>Are you sure to delete the url?</p>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                          <v-btn
                              text
                              @click="deleteUrl"
                              :disabled="this.delete_btnStatus"
                              class="verify_btn mb-3 red white--text">
                              Delete url
                          </v-btn>
                          <v-btn
                              text
                              @click="cancelDelete"
                              class="verify_btn mb-3 mr-4"
                              color="blue darken-2 white--text">
                              Cancel
                          </v-btn>
                      </v-card-actions>
                  </v-card>
              </v-form>
          </v-dialog>
          <h1 class="mb-10 text-decoration-underline grey--text text--darken-2 font-italic">My URLs</h1>
          <v-card outlined max-width="800" class="px-3">
            <div v-for="(url, index) in urls" :key="url.urlCode">
              <v-layout row wrap>
                <v-flex xs10 md5>
                  <div class="my-3 ml-4 grey--text text--darken-3">{{ url.shortUrl }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                    <v-chip
                      label
                      outlined
                      small
                      :text-color="getColor(url.status)"
                      :color="getColor(url.status)"
                      class="my-3 ml-4 size">
                      <span>{{ url.status }}</span>
                    </v-chip>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="text-right">
                    <v-btn
                      outlined
                      shaped
                      small
                      min-width=83
                      class="my-3"
                      color="blue darken-2"
                      @click="updateLink(url, index)">
                      <span v-if="url.status === 'active'">Disable</span>
                      <span v-else>Enable</span>
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
                      <v-icon @click="deleteUrl(url, index)">delete</v-icon>
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
import NavDrawer from '@/components/NavDrawer'
export default {
  components: {
    NavDrawer
  },
  data() {
    return {
      urls: [],
      updateLinkIndex: null,
      deleteUrlDialog: false,
      deleteurl: false,
      delete_btnStatus: false,
      snackbar: false,
      snackbarText: ''
    }
  },
  methods: {
    fetchUrls() {
      this.$http.post('http://localhost:5000/api/urls/fetchurl', {
            sid: this.$cookies.get("sid"),
            token: this.$cookies.get("t")
          }).then(response => {
            this.urls = response.data
          }).catch(error => {
            console.log(error)
          })
    },
    updateLink(url, index) {
      this.updateLinkIndex = index
      this.$http.post('http://localhost:5000/api/urls/disable', {
            url
        }).then(response => {
          this.urls[this.updateLinkIndex].status = response.data.status
          console.log(response.data.status)
          console.log(this.urls[this.updateLinkIndex].status)
          this.getColor(response.data.status)
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
    },
    deleteUrl(url, index) {
      console.log(url, index)
      this.deleteUrlDialog = true
    },
    cancelDelete() {
      this.deleteUrlDialog = false
    }
  },
  created() {
    this.fetchUrls()
  }
}
</script>

<style>
.size {
  width: 70px;
}
</style>