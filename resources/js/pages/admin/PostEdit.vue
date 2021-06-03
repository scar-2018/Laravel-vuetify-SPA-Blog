<template>
  <v-card v-if="form" width="100%">
    <v-card-title>Edit post</v-card-title>
    <v-card-text>
      <v-form ref="form" @submit.prevent="save">
        <v-img
          contain
          width="260"
          height="160"
          :eager="true"
          :src="logoFileSrc"
          class="mx-auto mb-4"
          style="border: 1px dashed #ccc;"
        >
        </v-img>
        <v-file-input
          v-model="logoFileInput"
          accept="image/*"
          label="New Logo Image"
          outlined
          dense
          prepend-icon="mdi-camera"
          @change="prepareLogo"
        ></v-file-input>
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
      logoFileInput: undefined,
      logoFileSrc: '',
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
    ...mapActions('posts', ['updatePost', 'getPost', 'uploadLogo']),
    ...mapActions('categories', ['getCategories']),
    async save() {
      if (this.$refs.form.validate()) {
        const formData = new FormData()

        formData.append('_method', 'PUT')
        formData.append('title', this.form.title)
        formData.append('category_id', this.form.category_id)
        formData.append('content', this.form.content)
        formData.append('slug', this.form.slug)
        formData.append('cover', this.logoFileInput)

        try {
          await this.updatePost(formData)

          this.$router.push({ name: 'admin-posts' })
        } catch (err) {
          console.log(err)
        }
      }
    },
    prepareLogo(file) {
      if (file) {
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = () => {
          this.logoFileSrc = reader.result
        }
      }
    }
  }
}
</script>
<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>