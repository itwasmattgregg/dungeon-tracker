<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" dark disable-resize-watcher app>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout" v-if="user">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Sign Out</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat @click="logout" v-if="user">
          <v-icon left>exit_to_app</v-icon>
          Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view :user="user"></router-view>
    </v-content>

  </v-app>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data () {
      return {
        appTitle: 'Dungeon Tracker',
        sidebar: false,
      }
    },
    computed: {
      menuItems () {
        if (this.user) {
          return [
            { title: 'Home', path: '/profile', icon: 'home' },
            { title: 'Stories', path: '/stories', icon: 'local_library' },
            { title: 'Quests', path: '/quests', icon: 'assignment_late' }
          ]
        } else {
          return [
            { title: 'Sign In', path: '/login', icon: 'lock_open' }
          ]
        }
      },
      ...mapGetters([
        'user',
      ]),
    },
    methods: {
      ...mapActions([
        'logout'
      ]),
    },
  }
</script>
