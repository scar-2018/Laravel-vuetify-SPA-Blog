<template>
  <div v-if="loadingPost">
  </div>
  <div v-else>
    <template v-if="post">
      <h1>{{ post.title }}</h1>
      <span class="text--secondary">{{ post.ago }}</span>
      <span class="text--secondary">by</span>
      <router-link to="/">{{ post.creator.name }}</router-link>
      <div class="mt-4" v-html="post.content"></div>

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
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  import CommentCard from '../components/CommentCard'
  export default {
    components: {
      CommentCard
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapState({
        loadingPost: (state) => state.posts.loadingPost,
        post: (state) => state.posts.post,
        comments: (state) => state.comments.comments
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
        getComments: 'comments/getComments'
      })
    }
  }
</script>
