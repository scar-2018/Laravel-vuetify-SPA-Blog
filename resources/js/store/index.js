import Vue from 'vue'
import Vuex from 'vuex'

// Global vuex
import app from './app'
import categories from './categories'
import posts from './posts'
import comments from './comments'

Vue.use(Vuex)

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
  modules: {
  	app,
    categories,
    posts,
    comments
  }
})

export default store
