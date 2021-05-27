import commentsApi from '../../services/api/comments'

const comments = {
  namespaced: true,
  state : {
    loadingComments: false,
    submittingComment: false,
    comments: []
  },
  mutations : {
    SET_LOADING_COMMENTS(state, loading) {
      state.loadingComments = loading
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments
    },
    SET_SUBMITTING(state, submittingComment) {
      state.submittingComment = submittingComment
    }
  },
  actions : {
    async getComments({ store, commit }, slug = '') {
      commit('SET_LOADING_COMMENTS', true)

      try {
        const response = await commentsApi.getComments(slug)

        commit('SET_COMMENTS', response.data.data)
      } catch (err) {
        throw (err.response.data)
      } finally {
        commit('SET_LOADING_COMMENTS', false)
      }
    },

    async submitComment({ store, commit }, commentForm) {
      commit('SET_SUBMITTING', true)

      try {
        await commentsApi.submitComment(commentForm)
      } catch (err) {
        console.log(err)
      }

      commit('SET_SUBMITTING', false)
    },

    async deleteComment({ store, commit }, id) {
      commit('SET_SUBMITTING', true)
      
      try {
        await commentsApi.deleteComment(id)
      } catch (err) {
        throw (err.response.data)
      } finally {
        commit('SET_SUBMITTING', false)
      }
    }
  }
}

export default comments;