import Vue from 'vue'
import VueRouter from 'vue-router';

import adminRoutes from "./admin"
import publicRoutes from "./public"

import bootstrap from './bootstrap'

Vue.use(VueRouter);

const routes = [
  ...adminRoutes,
  ...publicRoutes,
	{
    path: "*",
    component: () => import(/* webpackChunkName: "blank" */ '../pages/BlankPage.vue'),
    name: "blank",
    meta: {
      layout: "simple-layout"
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
  base: '/laravel-vue-SPA-blog/public/'
})

let firstRoute = true

router.beforeEach(async (to, from, next) => {
  if (firstRoute) {
    firstRoute = false

    await bootstrap()
  }

  next()
})

export default router