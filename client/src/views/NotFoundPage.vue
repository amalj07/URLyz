<template>
  <div>
      <center>
          <div class="mt-13">
            <img src="../assets/404.svg" alt="">
            <p class="my-9 text-h4 grey--text text--darken-2">The page you're looking for cannot be found!</p>
            <!-- <a class="mt-10 blue--text text--darken-2 text-h5" :href="`${this.$serverURLI}`"> -->
            <a class="mt-10 blue--text text--darken-2 text-h5" :href="window.location.href = process.env.VUE_APP_CLIENT_URL">
                <span>Short a looooooong URL</span>
                <v-icon class="ml-2 blue--text text--darken-2 arrow">arrow_forward</v-icon>
            </a>
          </div>
      </center>
  </div>
</template>

<script>
export default {

}
</script>

<style>
img {
    width: 400px;
}
.arrow:hover {
    padding-left: 10px;
    transition: .2s ease-in;
}
</style>