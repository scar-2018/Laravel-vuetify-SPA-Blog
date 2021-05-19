import categoriesApi from '../../services/api/categories'

const categories = {
  namespaced: true,
  state : {
    loadingCategories: false,
    categories: []
  },
  mutations : {
    SET_LOADING_CATEGORIES(state, loading) {
      state.loadingCategories = loading
    },

    SET_CATEGORIES(state, categories) {
      state.categories = categories
    }
  },
  actions : {
    async getCategories({ store, commit }) {
      commit('SET_LOADING_CATEGORIES', true)
      
      try {
        const response = await categoriesApi.getCategories()

        commit('SET_CATEGORIES', response.data.categories)
      } catch(err) {
        console.log(err)
      }

      commit('SET_LOADING_CATEGORIES', false)
    }
  }
}

export default categories;