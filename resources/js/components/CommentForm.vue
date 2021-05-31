<template>
  <v-form ref="form">
    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="name"
          :rules="[rules.required]"
          placeholder="Name"
          outlined
          dense
          required
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.email]"
          placeholder="Email"
          outlined
          dense
        >
        </v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="comment"
          :rules="[rules.required]"
          placeholder="Comment"
          outlined
        ></v-textarea>
      </v-col>
      <v-btn
        color="primary"
        :loading="submitting"
        :disabled="submitting"
        @click="submit"
      >Submit</v-btn>
    </v-row>
  </v-form>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    postSlug: {
      type: String,
      default: ''
    },
    submitting: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      name: '',
      email: '',
      comment: '',
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('submit', {
          postSlug: this.postSlug,
          name: this.name,
          email: this.email,
          comment: this.comment
        })
      }
    }
  }
}
</script>