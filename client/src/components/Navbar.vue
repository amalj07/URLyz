<template>
  <nav>
      <v-app-bar clipped-left flat elevation=0 app :class="getColor(this.$route.path)">
          <v-toolbar-title class="title ml-10">
            <router-link to="/">
              <span class="font-weight-light text-h5" :class="getColorTitle(this.$route.path)">URL</span>
              <span class="font-weight-bold text-h5" :class="getColorTitle(this.$route.path)">yz</span>
            </router-link>
          </v-toolbar-title>

        <v-spacer></v-spacer>
        <div class="mr-10">
          <v-btn
            v-if="getLoginStatus && this.$route.path == '/'"
            to="/dashboard" 
            depressed
            class="signin mr-5"
            :color="getColorBtnSignin(this.$route.path)">
          <span>Dashboard</span>
          </v-btn>
          <v-btn
            v-if="getLoginStatus"
            to="/login" 
            depressed
            @click="logout"
            class="signin"
            :color="getColorBtnSignin(this.$route.path)">
          <span>Logout</span>
          </v-btn>
          <v-btn
            v-if="!getLoginStatus"
            to="/login" 
            depressed
            class="signin mr-5"
            :color="getColorBtnSignin(this.$route.path)">
          <span>Signin</span>
          </v-btn>
          <v-btn
            v-if="!getLoginStatus"
            to="/register"
            depressed
            shaped 
            class="white"
            :color="getColorBtnRegister(this.$route.path)">
          <span>Register</span>
          </v-btn>
        </div>
      </v-app-bar>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['checkLoginStatus']),
    async logout() {
      this.$http.post('http://localhost:5000/api/user/logout', {
        sid: this.$cookies.get("sid"),
        token: this.$cookies.get("t")
      }).then(async () => {
        await this.$cookies.remove("sid")
        await this.$cookies.remove("t")
        await this.checkLoginStatus()
        // this.$router.push('/login')
        window.location.href = 'http://localhost:8080/login'
      }).catch(error => {
        if(error.response.data == 'Failed to logout user') {
          alert('Failed to logout user')
        }
      })
    },
    getColor(path) {
      if(path == '/') {
        return "blue darken-1"
      }else {
        return "white"
      }
    },
    getColorTitle(path) {
      if(path == '/') {
        return "white--text"
      }else {
        return "blue--text text--darken-1"
      }
    },
    getColorBtnRegister(path) {
      if(path == '/') {
        return "white blue--text text--darken-2"
      }else {
        return "blue darken-1 white--text"
      }
    },
    getColorBtnSignin(path) {
      if(path == '/') {
        return "blue darken-1 white--text"
      }else {
        return "white blue--text text--darken-2"
      }
    }
  },
  computed: mapGetters(['getLoginStatus']),
  created() {
    this.checkLoginStatus()
  }
}
</script>

<style>
a {
  text-decoration: none;
}
.v-btn.signin::before {
  background-color: transparent;
}
</style>