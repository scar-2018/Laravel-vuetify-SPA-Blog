import Vue from 'vue'
import Vuex from 'vuex'

// Global vuex
import categories from './categories'

Vue.use(Vuex)

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
  modules: {
    categories
  }
})

export default store
