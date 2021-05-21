<template>
  <div>
    <v-app-bar
      fixed
      color="white"
      elevate-on-scroll
    >
      <div class="d-flex flex-grow-1 align-center" :class="{container: $vuetify.breakpoint.smAndUp}">
        <template v-if="$vuetify.breakpoint.smAndUp">
          <v-toolbar-title>
            <router-link to="/" class="text-decoration-none font-weight-bold">Laravel-Vue-SPA-Blog</router-link>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <div>
            <v-menu
              offset-y
              open-on-hover
              transition="slide-x-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <span
                  v-bind="attrs"
                  v-on="on"
                  class="mx-2 primary--text"
                >
                  Posts
                </span>
              </template>
              <v-list dense>
                <v-list-item to="/">
                  <v-list-item-title>Latest Posts</v-list-item-title>
                </v-list-item>
                <v-list-item to="/?popular=1">
                  <v-list-item-title>Popular Posts</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu
              offset-y
              open-on-hover
              transition="slide-x-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <span
                  v-bind="attrs"
                  v-on="on"
                  class="primary--text"
                >
                  Categories
                </span>
              </template>
              <v-list dense>
                <v-list-item to="/" v-for="(category, i) in categories" :key="i">
                  <v-list-item-title>{{ category.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <v-spacer></v-spacer>

          <v-text-field
            class="mx-1"
            style="max-width: 400px;"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            hide-details
            filled
            rounded
            dense
          ></v-text-field>
        </template>
        <template v-else>
          <v-text-field
            v-if="visibleSearch"
            class="mx-1 lx-auto"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            append-icon="mdi-close"
            hide-details
            filled
            rounded
            dense
            @click:append="visibleSearch = false"
          ></v-text-field>
          <template v-else>
            <v-btn
              class="mr-1 d-flex d-sm-none"
              icon
              dark
              color="primary"
            >
              <v-icon dark>
                mdi-menu
              </v-icon>
            </v-btn>
            
            <v-spacer></v-spacer>

            <v-toolbar-title>
              <router-link to="/" class="text-decoration-none font-weight-bold">Laravel-Vue-SPA-Blog</router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn
              class="d-flex d-sm-none"
              icon
              dark
              color="primary"
              @click="visibleSearch = true"
            >
              <v-icon dark>
                mdi-magnify
              </v-icon>
            </v-btn>
          </template>
        </template>
      </div>
    </v-app-bar>

    <v-main style="margin-top: 80px;">
      <v-container class="fill-height">
        <v-layout>
          <v-row dense justify="center">
            <v-col cols="12" md="11" lg="8">
              <router-view :key="$route.fullPath"></router-view>
            </v-col>
          </v-row>
        </v-layout>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {
  },

  data() {
    return {
      visibleSearch: false
    }
  },

  computed: {
    ...mapState({
      categories: (state) => state.categories.categories
    })
  },

  mounted() {
    this.getCategories()
  },

  methods: {
    ...mapActions({
      getCategories: 'categories/getCategories'
    }),
    onKeyup(e) {
      this.$refs.search.focus()
    }
  }
}
</script>