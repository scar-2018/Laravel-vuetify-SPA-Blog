import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import vuetify from './vuetify'
import Main from "./Main.vue";
import store from "./store";
require('./bootstrap');

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.use(VueRouter);

const app = new Vue({
  el: '#app',
  router: new VueRouter({
  	mode: 'history',
  	routes,
  	base: '/laravel-vue-SPA-blog/public/'
  }),
  vuetify,
  store,
  render: h => h(Main)
});
