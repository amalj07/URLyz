<template>
    <v-navigation-drawer
      app
      permanent
      clipped
      class="blue lighten-1"
    >
      <template v-slot:prepend>
        <v-list-item>
          <v-list-item-avatar>
            <img src="https://avatars.dicebear.com/api/bottts/:john.svg">
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Test User</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
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
            { title: 'Users', icon: 'mdi-account-group-outline' },
        ],
      }
    },
    created() {
        console.log(this.$route.name)
    }
  }
</script>