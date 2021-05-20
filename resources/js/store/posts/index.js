import postsApi from '../../services/api/posts'

const posts = {
  namespaced: true,
  state : {
    loadingPosts: false,
    loadingPost: false,
    posts: [],
    post: null
  },
  mutations : {
    SET_LOADING_POSTS(state, loading) {
      state.loadingPosts = loading
    },
    SET_LOADING_POST(state, loading) {
      state.loadingPost = loading
    },

    SET_POSTS(state, posts) {
      state.posts = posts
    },
    SET_POST(state, post) {
      state.post = post
    }
  },
  actions : {
    async getPosts({ store, commit }) {
      commit('SET_LOADING_POSTS', true)
      
      try {
        const response = await postsApi.getPosts()

        commit('SET_POSTS', response.data.data)
      } catch(err) {
        console.log(err)
      }

      commit('SET_LOADING_POSTS', false)
    },

    async getPost({ store, commit }, slug) {
      commit('SET_LOADING_POST', true)
      
      try {
        const response = await postsApi.getPost(slug)

        commit('SET_POST', response.data.data)
      } catch(err) {
        console.log(err)
      }

      commit('SET_LOADING_POST', false)
    },

    async addVisits({ store, commit }, slug) {
      try {
        await postsApi.addVisits(slug)
      } catch(err) {
        console.log(err)
      }
    }
  }
}

export default posts;