<template>
    <v-navigation-drawer
      app
      permanent
      clipped
      class="blue darken-5"
    >
        <v-layout column align-center class="pr-10">

        <v-list-item>
          <v-list-item-avatar class="pl-3 mt-5" size="90">
            <img src="https://avatars.dicebear.com/api/bottts/:john.svg">
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h5 text-uppercase white--text">Amal Jose</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-layout>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    data () {
      return {
        items: [
            { title: 'My Profile', icon: 'mdi-account' },
            { title: 'My URLs', icon: 'link' },
            { title: 'New URL', icon: 'note_add' },
        ],
      }
    },
    created() {
        console.log(this.$route.name)
    }
  }
</script>