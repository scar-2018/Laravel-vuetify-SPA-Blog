const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "index" */ '../pages/Index.vue'),
    name: "index",
    meta: {
        layout: "blog-layout"
    }
  }
]

export default routes