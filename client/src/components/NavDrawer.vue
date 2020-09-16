<template>
    <v-navigation-drawer
      app
      permanent
      clipped
      class="blue darken-5"
    >
        <v-layout column align-center class="pr-10">

        <v-list-item>
          <v-list-item-avatar class="ml-5 mt-5" size="90">
            <!-- <img v-if="user.name != undefined" :src="'https://avatars.dicebear.com/api/bottts/:'+user.name+'.svg'"> -->
            <img v-if="user.name != undefined" :src="`https://ui-avatars.com/api/?name=${user.name}&size=128&background=ECEFF1&color=546E7A`">
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h5 text-uppercase white--text">{{ user.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-layout>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          router
          :to="item.path"
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
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      navItems: [
          { title: 'My Profile', icon: 'mdi-account', path: '/myprofile' },
          { title: 'My URLs', icon: 'link', path: '/dashboard' },
          { title: 'New URL', icon: 'note_add' }
      ],
    }
  },
  methods: mapActions(['fetchUser']),
  computed: mapGetters(['user']),
  created() {
      this.fetchUser()
  }
}
</script>