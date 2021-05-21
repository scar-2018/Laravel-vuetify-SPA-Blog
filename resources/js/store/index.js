import Vue from 'vue'
import Vuex from 'vuex'

// Global vuex
import categories from './categories'
import posts from './posts'
import comments from './comments'

Vue.use(Vuex)

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
  modules: {
    categories,
    posts,
    comments
  }
})

export default store
