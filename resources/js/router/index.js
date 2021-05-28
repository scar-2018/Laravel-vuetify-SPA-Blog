import Vue from 'vue'
import VueRouter from 'vue-router';

import store from '../store'
import bootstrap from './bootstrap'

import adminRoutes from "./admin"
import publicRoutes from "./public"

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

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)

  const isLoggedIn = !!store.state.auth.user

  if (requiresAuth) {
    if (!isLoggedIn)
      return next({ name: 'login' })
    return next()
  } else if (requiresGuest) {
    if (isLoggedIn)
      return next({ name: 'admin-dashboard' })
    return next()
  }

  return next()
})

export default router