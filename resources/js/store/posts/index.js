import postsApi from '../../services/api/posts'

const posts = {
  namespaced: true,
  state : {
    loadingPosts: false,
    loadingPost: false,
    savingPost: false,
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
    SET_SAVING_POST(state, loading) {
      state.savingPost = loading
    },

    SET_POSTS(state, posts) {
      state.posts = posts
    },
    SET_POST(state, post) {
      state.post = post
    }
  },
  actions : {
    async getPosts({ store, commit }, query) {
      commit('SET_LOADING_POSTS', true)
      
      try {
        const response = await postsApi.getPosts(query)

        commit('SET_POSTS', response.data.data)
        commit('SET_LOADING_POSTS', false)
        
        return response
      } catch(err) {
        console.log(err)
      } finally {
        commit('SET_LOADING_POSTS', false)
      }
    },

    async getPost({ store, commit }, slug) {
      commit('SET_LOADING_POST', true)
      
      try {
        const response = await postsApi.getPost(slug)

        commit('SET_POST', response.data.data)
        return response
      } catch(err) {
        console.log(err)
      }

      commit('SET_LOADING_POST', false)
    },

    async createPost({ store, commit }, payload) {
      commit('SET_SAVING_POST', true)
      
      try {
        await postsApi.createPost(payload)
      } catch(err) {
        throw (err.response.data)
      } finally {
        commit('SET_SAVING_POST', false)
      }
    },

    async updatePost({ store, commit }, payload) {
      commit('SET_SAVING_POST', true)
      
      try {
        await postsApi.updatePost(payload)
      } catch(err) {
        throw (err.response.data)
      } finally {
        commit('SET_SAVING_POST', false)
      }
    },

    async deletePost({ store, commit }, slug) {
      commit('SET_LOADING_POST', true)
      
      try {
        await postsApi.deletePost(slug)
      } catch(err) {
        throw (err.response.data)
      } finally {
        commit('SET_LOADING_POST', false)
      }
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