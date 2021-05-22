import commentsApi from '../../services/api/comments'

const comments = {
  namespaced: true,
  state : {
    submittingComment: false,
    comments: []
  },
  mutations : {
    SET_COMMENTS(state, comments) {
      state.comments = comments
    },
    SET_SUBMITTING(state, submittingComment) {
      state.submittingComment = submittingComment
    }
  },
  actions : {
    async getComments({ store, commit }, post) {
      try {
        const response = await commentsApi.getComments(post)

        commit('SET_COMMENTS', response.data.data)
      } catch (err) {
        console.log(err)
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
    }
  }
}

export default comments;