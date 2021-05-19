<template>
  <div class="d-flex flex-grow-1">
    <v-app-bar
      absolute
      color="white"
      elevate-on-scroll
    >
      <div class="d-flex flex-grow-1 container align-center">
        <v-toolbar-title>Laravel-Vue-SPA-Blog</v-toolbar-title>

        <v-spacer></v-spacer>

        <div class="hidden-xs-only">
          <v-menu offset-y v-model="menuPosts">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                text
                v-bind="attrs"
                v-on="on"
                class="mx-2"
              >
                Posts
                <v-icon right>{{ menuPosts ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item to="/">
                <v-list-item-title>Latest Posts</v-list-item-title>
              </v-list-item>
              <v-list-item to="/?popular=1">
                <v-list-item-title>Popular Posts</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                v-bind="attrs"
                v-on="on"
                text
              >
                Categories
                <v-icon right>{{ menuCategories ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </template>
            <v-list-item to="/" v-for="(category, i) in categories" :key="i">
              <v-list-item-title>{{ category.name }}</v-list-item-title>
            </v-list-item>
          </v-menu>
        </div>

        <v-spacer></v-spacer>
        
        <v-text-field
          ref="search"
          class="mx-1 hidden-xs-only"
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          hide-details
          filled
          rounded
          dense
          style="max-width: 300px;"
        ></v-text-field>
      </div>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height">
        <v-layout>
          <slot></slot>
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
      showSearch: false,
      menuPosts: false,
      menuCategories: false
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