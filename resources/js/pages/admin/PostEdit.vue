<template>
  <v-card v-if="form" width="100%">
    <v-card-title>Edit post</v-card-title>
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
        <v-textarea
          v-model="form.content"
          outlined
          placeholder="Content"
          :rules="[rules.required]"
        >
        </v-textarea>
        <v-btn
          color="primary"
          :loading="savingPost"
          :disabled="savingPost"
          @click="save"
        >Save</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      form: null,
      rules: {
        required: (value) => !!value || 'Required.'
      }
    }
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
      savingPost: (state) => state.posts.savingPost
    })
  },
  async mounted() {
    try {
      this.getCategories()

      const postData = await this.getPost(this.$route.params.slug)

      this.form = postData.data.data
      this.form.category_id = this.form.category.id
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    ...mapActions('posts', ['updatePost', 'getPost']),
    ...mapActions('categories', ['getCategories']),
    async save() {
      if (this.$refs.form.validate()) {
        try {
          await this.updatePost(this.form)

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