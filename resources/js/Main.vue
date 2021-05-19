<template>
  <v-app>
    <!-- Layout section -->
    <component :is="layout"></component>
    <!-- End layout section -->
    <v-notification></v-notification>
  </v-app>
</template>

<script>
  import BlogLayout from "./layouts/BlogLayout"
  import AdminLayout from "./layouts/AdminLayout"
  import VNotification from "./components/VNotification";

  export default {
    name: "App",
    components: { AdminLayout, BlogLayout, VNotification },
    data() {
      return {
        defaultLayout: "blog-layout"
      }
    },
    mounted() {
      
    },
    computed: {
      layout() {
        return this.$route.meta.layout ? this.$route.meta.layout : this.defaultLayout;
      }
    },
  }
</script>