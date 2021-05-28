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
        <v-list-item
          v-for="(item, index) in menu"
          :key="index"
          :to="item.link"
          :exact="item.exact"
          :disabled="item.disabled"
          link
        >
          <v-list-item-icon>
            <v-icon small :class="{ 'grey--text': item.disabled }">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="my-1"></v-divider>

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
      menu: [
        { icon: 'mdi-account-box-outline', key: 'menu.profile', text: 'Profile', link: '/profile' }
      ]
    }
  },
  computed: {
    ...mapState({
      // username: (state) => state.auth.user.username
    })
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
