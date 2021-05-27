<template>
  <v-card width="100%">
    <v-card-title>Create a new post</v-card-title>
    <v-card-text>
      <v-form ref="form" @submit.prevent="save">
        <v-text-field
          v-model="form.title"
          :rules="[rules.required]"
          outlined
          dense
          placeholder="Title"
        ></v-text-field>
        <v-select
          v-model="form.category_id"
          :items="categories"
          item-text="name"
          item-value="id"
          :rules="[rules.required]"
          outlined
          dense
          placeholder="Category"
        ></v-select>
        <vue-simplemde v-model="form.content" ref="mde" />
        <v-btn
          @click="save"
          color="primary"
          :loading="loadingPost"
          :disabled="loadingPost"
        >Create</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import VueSimplemde from 'vue-simplemde'

  export default {
    components: {
      VueSimplemde
    },
    data() {
      return {
        form: {},
        rules: {
          required: value => !!value || 'Required.'
        },
      }
    },
    computed: {
      ...mapState({
        categories: (state) => state.categories.categories,
        loadingPost: (state) => state.posts.loadingPost
      }),
    },
    methods: {
      ...mapActions('posts', ['createPost']),
      async save() {
        if (this.$refs.form.validate()) {
          try {
            await this.createPost(this.form)

            this.$router.push({ name: 'admin-posts' })
          } catch (err) {
            console.log(err)
          }
        }
      }
    }
  }
</script>
<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>