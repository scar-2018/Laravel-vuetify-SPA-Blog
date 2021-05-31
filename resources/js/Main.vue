<template>
  <v-app>
    <!-- Layout section -->
    <component :is="layout"></component>
    <!-- End layout section -->
    <v-notification></v-notification>
  </v-app>
</template>

<script>
import BlogLayout from './layouts/BlogLayout'
import AdminLayout from './layouts/AdminLayout'
import SimpleLayout from './layouts/SimpleLayout'
import VNotification from './components/VNotification'

export default {
  name: 'App',
  components: { AdminLayout, BlogLayout, SimpleLayout, VNotification },
  data() {
    return {
      defaultLayout: 'blog-layout'
    }
  },
  computed: {
    layout() {
      return this.$route.meta.layout ? this.$route.meta.layout : this.defaultLayout
    }
  },
  mounted() {
  }
}
</script>