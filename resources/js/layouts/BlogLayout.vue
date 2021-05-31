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

    <v-btn
      v-show="btnShow"
      v-scroll="onScroll"
      fab
      dark
      fixed
      bottom
      right
      color="primary"
      @click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>

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
      <Footer />
    </v-main>
  </div>
</template>

<script>
import Footer from '../components/Footer'
export default {
  components: {
    Footer
  },
  data() {
    return {
      visibleSearch: false,
      btnShow: false
    }
  },

  mounted() {
  },

  methods: {
    onKeyup(e) {
      this.$refs.search.focus()
    },
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset ||   e.target.scrollTop || 0
    
      this.btnShow = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    }
  }
}
</script>