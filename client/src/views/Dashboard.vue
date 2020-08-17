<template>
  <div>
      <div class="dashboard">
        <v-container>
          <h1>My URLs</h1>
          <v-card text max-width="800" class="px-3" >
            <v-layout row wrap>
              <v-flex xs10 md5>
                <div class="my-2">Short url</div>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <v-chip small text-color="white" class="my-2">status</v-chip>
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

}
</script>

<style>

</style>