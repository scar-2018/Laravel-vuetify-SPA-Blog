<template>
  <div v-if="loadingPost">
  </div>
  <div v-else>
    <template v-if="post">
      <h1>{{ post.title }}</h1>
      <span class="text--secondary">{{ post.ago }}</span>
      <span class="text--secondary">by</span>
      <router-link to="/">{{ post.creator.name }}</router-link>
      <p class="mt-4">{{ post.content }}</p>
    </template>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapState('posts', ['loadingPost', 'post'])
    },
    mounted() {
      this.getPost(this.$route.params.slug)
    },
    methods: {
      ...mapActions('posts', ['getPost'])
    }
  }
</script>
