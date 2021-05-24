<template>
  <div>
    <v-snackbar
      :timeout="3000"
      v-model="toast.show"
      top
      centered
      :color="toast.type == 'success' ? 'green' : 'error'"
      elevation="24"
    >
      <div class="d-flex align-center">
        <span>{{ toast.message }}</span>
      </div>
      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          @click="toast.show = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data() {
      return {
      }
    },
    computed: {
      ...mapState('app', ['toast'])
    },
    methods: {
      ...mapActions('app', ['hideNotification'])
    }
  }
</script>
