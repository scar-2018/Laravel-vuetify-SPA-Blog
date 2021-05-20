import postsApi from '../../services/api/posts'

const posts = {
  namespaced: true,
  state : {
    loadingPosts: false,
    posts: []
  },
  mutations : {
    SET_LOADING_POSTS(state, loading) {
      state.loadingPosts = loading
    },

    SET_POSTS(state, posts) {
      state.posts = posts
    }
  },
  actions : {
    async getPosts({ store, commit }) {
      commit('SET_LOADING_POSTS', true)
      
      try {
        const response = await postsApi.getPosts()

        commit('SET_POSTS', response.data.posts)
      } catch(err) {
        console.log(err)
      }

      commit('SET_LOADING_POSTS', false)
    }
  }
}

export default posts;