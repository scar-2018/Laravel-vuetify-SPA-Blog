<template>
  <div>
    <v-main>
      <v-container class="fill-height">
        <v-layout>
          <router-view :key="$route.fullPath"></router-view>
        </v-layout>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },

  mounted() {
  },

  methods: {
  }
}
</script>