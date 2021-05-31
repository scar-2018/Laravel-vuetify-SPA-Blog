<template>
  <div>
    <v-menu offset-y left transition="slide-x-reverse-transition">
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          v-on="on"
        >
          <v-icon dark large>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>

      <v-list dense nav>
        <v-list-item @click="logout" link>
          <v-list-item-icon>
            <v-icon small>mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
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
  },
  methods: {
    ...mapActions({
      'signOut': 'auth/signOut'
    }),
    async logout() {
      try {
        await this.signOut()

        this.$router.push({ name: 'login' })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
