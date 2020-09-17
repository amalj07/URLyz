<template>
  <div>
    <NavDrawer />
      <div class="mt-10 ml-8">
        <v-container>
          <v-dialog
              overlay-color="indigo lighten-5"
              max-width="350"
              persistent
              v-model="deleteUrlDialog">
              <v-form ref="verifyUserForm">
                  <v-card
                      :loading="this.deleteurl_load">
                      <v-card-title class="justify-center blue--text text--darken-2">
                          Delete Url
                      </v-card-title>
                      <v-card-text class="pt-2 text-center">
                          <p class="body-1">Are you sure to delete the url?</p>
                      </v-card-text>
                      <v-card-actions class="mt-n3 justify-center">
                          <v-btn
                              text
                              @click="confirmDelete"
                              :disabled="this.delete_btnStatus"
                              class="verify_btn mb-3"
                              color="red darken-2 white--text">
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
          <v-snackbar
              text
              top
              color="success"
              v-model="successSnackbar">
              {{ this.snackbarText }}
              <template v-slot:action="{ attrs }">
                  <v-btn
                  color="green"
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                  >
                  <v-icon left>close</v-icon>
                  </v-btn>
              </template>
          </v-snackbar>
          <v-snackbar
              text
              top
              color="error"
              v-model="errorSnackbar">
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
                      :ripple=false
                      shaped
                      class="del_btn my-2 white blue--text text--darken-2">
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
      deleteurl_load: false,
      delete_btnStatus: false,
      successSnackbar: false,
      errorSnackbar: false,
      snackbarText: '',
      deleteurl: '',
      deleteurlindex: null
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
            if(error.response.data == 'Failed to fetch urls'){
              this.errorSnackbar = true
              this.snackbarText = error.response.data
            }else {
              this.logout()
            }
          })
    },
    updateLink(url, index) {
      this.updateLinkIndex = index
      this.$http.post('http://localhost:5000/api/urls/disable', {
            sid: this.$cookies.get("sid"),
            token: this.$cookies.get("t"),
            url: url
        }).then(response => {
          this.urls[this.updateLinkIndex].status = response.data.status
          this.getColor(response.data.status)
        }).catch(error => {
          if(error.response.data == 'Failed to update url') {
            this.errorSnackbar = true
            this.snackbarText = error.response.data
          }else {
            this.logout()
          }
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
      this.deleteurl = url
      this.deleteurlindex = index
      this.deleteUrlDialog = true
    },
    cancelDelete() {
      this.deleteurl = ''
      this.deleteUrlDialog = false
    },
    confirmDelete() {
      this.deleteurl_load = true
      this.$http.post('http://localhost:5000/api/urls/delete', {
        sid: this.$cookies.get("sid"),
        token: this.$cookies.get("t"),
        url: this.deleteurl
      }).then(() => {
        this.urls.splice(this.deleteurlindex, 1)
        this.deleteurl_load = false
        this.deleteUrlDialog = false
        this.successSnackbar = true
        this.snackbarText = 'Url deleted'
      }).catch(error => {
        if(error.response.data == 'Failed to delete url') {
            this.deleteurl_load = false
            this.deleteUrlDialog = false
            this.errorSnackbar = true
            this.snackbarText = error.response.data
          }else {
            this.logout()
          }
      })
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
            }).catch(error => {
                console.log(error)
                if(error.response.data == 'Failed to logout user') {
                    this.errorSnackbar = true,
                    this.snackbarText = error.response.data
                } else {
                    this.errorSnackbar = true,
                    this.snackbarText = 'Something went wrong!'
                }
            })
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
.v-btn.del_btn::before {
  background-color: transparent;
}
</style>