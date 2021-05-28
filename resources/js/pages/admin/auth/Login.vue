<template>
  <div class="d-flex flex-grow-1 justify-center">
    <div class="mt-12">
      <h3 class="py-8 text-center">Laravel-Vuetify-SPA-Blog</h3>
      <v-card width="500">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            @submit.prevent="submit"
          >
            <v-text-field
              v-model="form.email"
              label="Email"
              :rules="[]"
              outlined
              dense
              @input="resetErrors"
            >
            </v-text-field>
            <v-text-field
              v-model="form.password"
              label="Password"
              :rules="[]"
              type="password"
              outlined
              dense
              @input="resetErrors"
            >
            </v-text-field>
            <v-alert
              v-if="errors"
              dense
              outlined
              type="error"
            >
              {{ errors.message }}
            </v-alert>
            <v-btn
              color="primary"
              @click="submit"
              :loading="loading"
              :disabled="loading"
            >submit</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data() {
      return {
        loading: false,
        form: {
          email: '',
          password: ''
        }
      }
    },
    computed: {
      ...mapState('auth', ['errors'])
    },
    methods: {
      ...mapActions('auth', ['login', 'resetErrors', 'getAuthUser']),
      async submit() {
        this.resetErrors()

        if (this.$refs.form.validate()) {
          this.loading = true

          try {
            const response = await this.login(this.form)

            try {
              const userResponse = await this.getAuthUser()

              this.$router.push({ name: 'admin-dashboard' })
            } catch (err) {
              console.log(err)
            }
          } catch (err) {
            console.log(err)
          } finally {
            this.loading = false
          }
        }
      }
    }
  }
</script>