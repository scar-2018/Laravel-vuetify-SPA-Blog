import authApi from '../../services/api/auth'

export default {
  namespaced: true,
  state : {
    loading: false,
    user: null,
    token: '',
    isAppReady: false,
    errors: null
  },
  mutations : {
    BOOTSTRAP(state, data) {
      state.user = data.user || state.user
      state.token = data.token || state.token
      state.isAppReady = true
    },
    SET_BTN_LOADING(state, loading) { state.loading = loading },
    SET_TOKEN(state, token) { state.token = token },
    SET_LOGOUT_AUTH(state) {
      state.token = null
      state.user = null
    },
    SET_ERROR(state, errors) { state.errors = errors }
  },
  actions : {
    resetErrors({ commit }) {
      commit('SET_ERROR', null)
    },

    async login({ dispatch, store, commit }, payload) {
      try {
        const response = await authApi.login(payload)

        commit('SET_TOKEN', response.data.access_token)

        localStorage.setItem('token', response.data.access_token)

        return response
      } catch(err) {
        commit('SET_ERROR', err.response.data)

        throw (err.response.data)
      }
    },

    async getAuthUser({ store, commit }) {
      try {
        const response = await authApi.getAuthUser()

        commit('BOOTSTRAP', {
          user: response.data.user
        })
      } catch (err) {
        throw (err.response.data)
      }
    },

    async signOut({ store, commit }) {
      try {
        const response = await authApi.signOut()

        commit('SET_LOGOUT_AUTH')
        localStorage.removeItem('token')

        return response
      } catch (err) {
        throw (err)
      }
    }
  }
}