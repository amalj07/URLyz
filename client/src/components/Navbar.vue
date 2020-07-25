<template>
  <nav>
      <v-app-bar flat app class="white">
          <v-toolbar-title class="blue--text text--darken-2 ml-13">
              <span class="font-weight-light">URL</span>
              <span class="font-weight-medium">yz</span>
          </v-toolbar-title>

        <v-spacer></v-spacer>
        <div class="mr-13">
          <v-btn depressed class="signin white blue--text text--darken-2 mr-5">
          <span>Signin</span>
          </v-btn>
          <v-btn depressed shaped class="blue darken-2 white--text">
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
.v-btn.signin::before {
  background-color: transparent;
}
</style>