const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "posts" */ '../pages/Index.vue'),
    name: "posts",
    meta: {
      layout: "blog-layout"
    }
  }, {
    path: "/p/:slug",
    component: () => import(/* webpackChunkName: "post" */ '../pages/Post.vue'),
    name: "post",
    meta: {
      layout: "blog-layout"
    }
  }
]

export default routes