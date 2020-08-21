<template>
  <nav>
      <v-app-bar flat app class="white">
          <v-toolbar-title class="title blue--text text--darken-2 ml-13">
            <router-link to="/">
              <span class="font-weight-light">URL</span>
              <span class="font-weight-medium">yz</span>
            </router-link>
          </v-toolbar-title>

        <v-spacer></v-spacer>
        <div class="mr-13">
          <v-btn
            v-if="getLoginStatus"
            to="/login" 
            depressed
            @click="logout"
            class="signin white blue--text text--darken-2 mr-5">
          <span>Logout</span>
          </v-btn>
          <v-btn
            v-if="!getLoginStatus"
            to="/login" 
            depressed
            class="signin white blue--text text--darken-2 mr-5">
          <span>Signin</span>
          </v-btn>
          <v-btn
            v-if="!getLoginStatus"
            to="/register"
            depressed
            shaped class="blue darken-2 white--text">
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
        console.log(error)
      })
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