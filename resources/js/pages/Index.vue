<template>
  <div class="d-flex flex-grow-1">
    <v-row>
      <v-col cols="12" sm="8">
        <div>
          <div class="d-flex align-center">
            <h2>Blogs</h2>
            <v-spacer></v-spacer>
            <span class="mr-2">Sort:</span>
            <v-select
              v-model="sortBy"
              :items="sorts"
              dense
              outlined
              style="max-width: 120px;"
              hide-details
              @change="gotoPage"
            ></v-select>
          </div>
          <post-card
            v-for="(post, i) in posts"
            :key="i"
            :post="post"
            class="my-4"
          ></post-card>

          <v-pagination
            v-model="pagination.current"
            :length="pagination.total"
            @input="gotoPage"
          ></v-pagination>
        </div>
      </v-col>
      <v-col cols="12" sm="4">
        <div>
          <h2>Categories</h2>
          <categories-card
            v-model="category"
            class="mt-4"
            @input="gotoPage"
          ></categories-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  import PostCard from '../components/PostCard'
  import CategoriesCard from '../components/CategoriesCard'

  export default {
    components: {
      PostCard, CategoriesCard
    },
    data() {
      return {
        category: this.$route.query.category,
        sortBy: this.$route.query.sortBy,
        sorts: ['Latest', 'Popular'],
        pagination: {
          current: 1,
          total: 0
        }
      }
    },
    computed: {
      ...mapState({
        posts: (state) => state.posts.posts
      })
    },
    mounted() {
      try {
        this.getPosts(this.$route.query)
      } catch (err) {
        console.log(err)
      }
    },
    methods: {
      ...mapActions({
        getPosts: 'posts/getPosts'
      }),
      gotoPage() {
        this.$nextTick(() => {
          this.$router.push({
            name: 'posts',
            query: {
              page: this.pagination.current,
              sortBy: this.sortBy,
              category: this.category ? this.category : '',
            }
          })
        })
      }
    }
  }
</script>
