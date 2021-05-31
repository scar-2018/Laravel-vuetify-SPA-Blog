import categoriesApi from '../../services/api/categories'

export default {
  namespaced: true,
  state : {
    loadingCategories: false,
    submittingCategory: false,
    categories: []
  },
  mutations : {
    SET_LOADING_CATEGORIES(state, loading) {
      state.loadingCategories = loading
    },
    SET_SUBMITTING_CATEGORY(state, loading) {
      state.submittingCategory = loading
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

        commit('SET_CATEGORIES', response.data.data)
      } catch (err) {
        console.log(err)
      }

      commit('SET_LOADING_CATEGORIES', false)
    },
    async createCategory({ store, commit }, data) {
      commit('SET_SUBMITTING_CATEGORY', true)
      
      try {
        await categoriesApi.createCategory(data)
      } catch (err) {
        throw (err.response.data)
      } finally {
        commit('SET_SUBMITTING_CATEGORY', false)
      }
    },
    async updateCategory({ store, commit }, data) {
      commit('SET_SUBMITTING_CATEGORY', true)
      
      try {
        await categoriesApi.updateCategory(data)
      } catch (err) {
        throw (err.response.data)
      } finally {
        commit('SET_SUBMITTING_CATEGORY', false)
      }
    },
    async deleteCategory({ store, commit }, id) {
      commit('SET_SUBMITTING_CATEGORY', true)
      
      try {
        await categoriesApi.deleteCategory(id)
      } catch (err) {
        throw (err.response.data)
      }

      commit('SET_SUBMITTING_CATEGORY', false)
    }
  }
}