import commentsApi from '../../services/api/comments'

const comments = {
  namespaced: true,
  state : {
    comments: []
  },
  mutations : {
    SET_COMMENTS(state, comments) {
      state.comments = comments
    }
  },
  actions : {
    async getComments({ store, commit }, post) {
      try {
        const response = await commentsApi.getComments(post)

        commit('SET_COMMENTS', response.data.data)
      } catch(err) {
        console.log(err)
      }
    }
  }
}

export default comments;