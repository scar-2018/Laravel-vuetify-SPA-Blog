import Vue from 'vue'
import vuetify from './vuetify'
import Main from './Main.vue'
import store from './store'
import router from './router'

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

const app = new Vue({
  el: '#app',
  router,
  vuetify,
  store,
  render: (h) => h(Main)
})
