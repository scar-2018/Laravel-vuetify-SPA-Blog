const comments = {
  namespaced: true,
  state : {
    toast: {
      show: false,
      type: 'success',
      message: null
    }
  },
  mutations : {
    SET_VISIBILITY(state, visible) {
      state.toast.show = visible
    },
    SET_TYPE(state, type) {
      state.toast.type = type
    },
    SET_MESSAGE(state, message) {
      if (typeof(message) == 'string')
        state.toast.message = message
      else if (typeof(message) == 'object') {
        const result = Object.keys(message).reduce(function (r, k) {
          return r.concat(message[k]);
        }, []);

        state.toast.message = result[0]
      } else {
        state.message = ''
      }

    }
  },
  actions : {
    showSuccess({ state, commit }, message) {
      if (state.toast.show) commit('SET_VISIBILITY', false)

      commit('SET_VISIBILITY', true)
      commit('SET_TYPE', 'success')
      commit('SET_MESSAGE', message)
    },
    showError({ state, commit }, message) {
      if (state.toast.show) commit('SET_VISIBILITY', false)

      commit('SET_VISIBILITY', true)
      commit('SET_TYPE', 'error')
      commit('SET_MESSAGE', message)
    },
    hideNotification({ store, commit }) {
      commit('SET_VISIBILITY', false)
    }
  }
}

export default comments;