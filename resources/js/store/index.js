import Vue from 'vue'
import Vuex from 'vuex'

// Global vuex
import categories from './categories'
import posts from './posts'

Vue.use(Vuex)

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
  modules: {
    categories,
    posts
  }
})

export default store
