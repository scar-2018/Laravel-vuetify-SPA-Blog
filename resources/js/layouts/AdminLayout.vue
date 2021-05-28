<template>
  <div class="d-flex flex-grow-1 white">
    <!-- Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      app
      floating
      class="elevation-1 grey lighten-4"
      :mini-variant.sync="mini"
    >
      <v-list-item class="px-2 py-1">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Laravel-Vue-SPA-Blog</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <admin-menu />

      <template v-slot:append>
        <div class="pa-2 text-right">
          <v-btn
            icon
            @click.stop="mini = !mini"
          >
            <v-icon>{{ mini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-app-bar
      app
      color="white"
      height="64"
    >
      <v-spacer class="d-none d-lg-block"></v-spacer>
      <toolbar-user />
    </v-app-bar>

    <v-main>
      <v-container>
        <v-layout>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import AdminMenu from '../components/AdminMenu'
import ToolbarUser from '../components/toolbar/ToolbarUser'

export default {
  components: {
    AdminMenu,
    ToolbarUser
  },
  data() {
    return {
      drawer: null,
      mini: false
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  }
}
</script>
