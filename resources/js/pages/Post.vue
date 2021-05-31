<template>
  <div v-if="loadingPost">
  </div>
  <div v-else>
    <v-row>
      <v-col cols="12" sm="8">
        <template v-if="post">
          <h1>{{ post.title }}</h1>
          <span class="text--secondary">{{ post.ago }}</span>
          <span class="text--secondary">by</span>
          <router-link to="#">{{ post.creator.name }}</router-link>
          <div class="mt-4" v-html="post.content"></div>

          <v-divider class="my-8"></v-divider>

          <comment-form
            :post-slug="post.slug"
            :submitting="submittingComment"
            @submit="submit"
          ></comment-form>

          <v-divider class="my-8"></v-divider>
          
          <div class="mt-8">
            <comment-card
              v-for="(comment, i) in comments"
              :key="i"
              :comment="comment"
              class="my-4"
            >
            </comment-card>
          </div>
        </template>
      </v-col>
      <v-col cols="12" sm="4">
        <div>
          <h2>Categories</h2>
          <categories-card
            :categories="categories"
            class="mt-4"
            @input="categorySelected"
          ></categories-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import CommentForm from '../components/CommentForm'
import CommentCard from '../components/CommentCard'
import CategoriesCard from '../components/CategoriesCard'

export default {
  components: {
    CommentCard, CategoriesCard, CommentForm
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      loadingPost: (state) => state.posts.loadingPost,
      post: (state) => state.posts.post,
      comments: (state) => state.comments.comments,
      categories: (state) => state.categories.categories,
      submittingComment: (state) => state.comments.submittingComment
    })
  },
  mounted() {
    this.addVisits(this.$route.params.slug)
    this.getPost(this.$route.params.slug)
    this.getComments(this.$route.params.slug)
  },
  methods: {
    ...mapActions({
      getPost: 'posts/getPost',
      addVisits: 'posts/addVisits',
      getComments: 'comments/getComments',
      submitComment: 'comments/submitComment'
    }),
    categorySelected(category) {
      this.$router.push({
        name: 'posts',
        query: {
          sortBy: 'Latest',
          category
        }
      })
    },
    async submit(data) {
      await this.submitComment(data)

      this.getComments(this.$route.params.slug)
    }
  }
}
</script>
