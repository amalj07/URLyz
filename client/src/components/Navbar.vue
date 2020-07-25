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
            to="Login" 
            depressed
            class="signin white blue--text text--darken-2 mr-5">
          <span>Signin</span>
          </v-btn>
          <v-btn
            to="Register"
            depressed
            shaped class="blue darken-2 white--text">
          <span>Register</span>
          </v-btn>
        </div>
      </v-app-bar>
  </nav>
</template>

<script>
export default {

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