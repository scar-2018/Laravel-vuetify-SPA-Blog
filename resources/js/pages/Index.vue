<template>
  <div class="d-flex flex-grow-1">
    <v-row>
      <v-col cols="12" sm="8">
        <div>
          <h2>Blogs</h2>
          <post-card
            v-for="(post, i) in posts"
            :key="i"
            :post="post"
            class="my-4"
          ></post-card>
          <v-pagination
            v-model="page"
            class="my-4"
            :length="6"
          ></v-pagination>
        </div>
      </v-col>
      <v-col cols="12" sm="4">
        <div>
          <h2>Categories</h2>
          <v-card
            class="mt-4"
          >
            <v-list shaped>
              <v-list-item-group
                v-model="category"
              >
                <v-list-item
                  v-for="(ct, i) in categories"
                  :key="i"
                  :value="ct.slug"
                  active-class="primary--text"
                  @click="gotoPage"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="ct.name"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-chip
                      :color="category == ct.slug ? 'primary' : ''"
                    >
                      {{ ct.posts_count }}
                    </v-chip>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  import PostCard from '../components/PostCard'

  export default {
    components: {
      PostCard
    },
    data() {
      return {
        category: '',
        page: 1,
        paginationOption: {
          itemsPerPage: 7,
          total: 1
        }
      }
    },
    computed: {
      ...mapState({
        posts: (state) => state.posts.posts,
        categories: (state) => state.categories.categories
      })
    },
    mounted() {
      this.category = this.$route.query.category
      this.getPosts(this.$route.query)
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
              popular: this.$route.query.popular,
              category: this.category ? this.category : ''
            }
          })
        })
      }
    }
  }
</script>
