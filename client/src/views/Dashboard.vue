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
              class="del_btn"
              v-model="successSnackbar">
              {{ this.snackbarText }}
              <template v-slot:action="{ attrs }">
                  <v-btn
                  :ripple=false
                  color="green"
                  class="del_btn"
                  text
                  v-bind="attrs"
                  @click="successSnackbar = false"
                  >
                  <v-icon left>close</v-icon>
                  </v-btn>
              </template>
          </v-snackbar>
          <v-snackbar
              text
              top
              color="error"
              class="del_btn"
              v-model="errorSnackbar">
              {{ this.snackbarText }}
              <template v-slot:action="{ attrs }">
                  <v-btn
                  :ripple=false
                  color="error"
                  class="del_btn"
                  text
                  v-bind="attrs"
                  @click="errorSnackbar = false"
                  >
                  <v-icon left>close</v-icon>
                  </v-btn>
              </template>
          </v-snackbar> 
          <h1 class="mb-10 grey--text text--darken-2 font-italic">My URLs - {{ urls.length }}</h1>
          <v-expansion-panels popout>
            <v-expansion-panel
              class="mb-3"
              v-for="(url,index) in urls"
              :key="index"
            >
              <center>
                <v-expansion-panel-header>
                  <div class="text-left">
                    <a @click.native.stop @click="updatevisit(url, index)" :href="url.shortUrl" target="_blank" class="grey--text text--darken-3">{{ url.shortUrl }}</a>
                  </div>
                  <div class="">
                    <v-chip
                      label
                      outlined
                      small
                      :text-color="getColor(url.status)"
                      :color="getColor(url.status)"
                      class="my-3 size">
                      <span>{{ url.status }}</span>
                    </v-chip>
                  </div>
                  <div class="">
                    <v-btn
                      @click.native.stop
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
                  <div class="">
                    <v-btn
                      @click.native.stop
                      text
                      :ripple=false
                      shaped
                      class="del_btn my-2 white blue--text text--darken-2">
                      <v-icon @click="deleteUrl(url, index)">delete</v-icon>
                    </v-btn>
                  </div>
                </v-expansion-panel-header>
              </center>
              <v-expansion-panel-content>
                <p class="grey--text text--darken-3">Total visits: {{ url.visits }} </p>
                <p class="grey--text text--darken-3">Original URL: <a :href="url.longUrl" target="_blank" class="grey--text text--darken-1">{{ url.longUrl }}</a> </p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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
      let url = `${this.$serverURLI}/api/urls/fetchurl`
      this.$http.get(url)
        .then(response => {
          this.urls = response.data
        })
        .catch(error => {
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
      let apiurl = `${this.$serverURLI}/api/urls/disable`
      this.$http.post(apiurl, {
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
      let url = `${this.$serverURLI}/api/urls/delete`
      this.$http.post(url, {
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
    logout() {
        let url = `${this.$serverURLI}/api/user/logout`
        this.$http.get(url).then(() => {
            // window.location.href = `${this.$serverURLI}`
            window.location.href = process.env.VUE_APP_CLIENT_URL + '/login'
        })
    },
    updatevisit(url, index) {
      if(this.urls[index].status != 'disabled'){
        this.urls[index].visits += 1
      }
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