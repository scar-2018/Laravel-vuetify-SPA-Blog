const routes = [
  {
    path: "/admin",
    redirect: '/admin/dashboard',
    meta: {
      layout: "admin-layout"
    }
  }, {
    path: "/admin/login",
    component: () => import(/* webpackChunkName: "admin-login" */ '../pages/admin/auth/Login.vue'),
    name: 'login',
    meta: {
      layout: "simple-layout"
    }
  }, {
    path: "/admin/dashboard",
    component: () => import(/* webpackChunkName: "admin-dashboard" */ '../pages/admin/AdminDashboard.vue'),
    name: "admin-dashboard",
    meta: {
      layout: "admin-layout"
    }
  }, {
    path: "/admin/categories",
    component: () => import(/* webpackChunkName: "admin-categories" */ '../pages/admin/CategoryManagement.vue'),
    name: "admin-categories",
    meta: {
      layout: "admin-layout"
    }
  }, {
    path: "/admin/posts",
    component: () => import(/* webpackChunkName: "admin-posts" */ '../pages/admin/PostManagement.vue'),
    name: "admin-posts",
    meta: {
      layout: "admin-layout"
    }
  }, {
    path: "/admin/comments",
    component: () => import(/* webpackChunkName: "admin-comments" */ '../pages/admin/CommentManagement.vue'),
    name: "admin-comments",
    meta: {
      layout: "admin-layout"
    }
  }, {
    path: "/admin/posts/create",
    component: () => import(/* webpackChunkName: "admin-post-create" */ '../pages/admin/PostCreate.vue'),
    name: "admin-post-create",
    meta: {
      layout: "admin-layout"
    }
  }, {
    path: "/admin/posts/edit/:slug",
    component: () => import(/* webpackChunkName: "admin-post-edit" */ '../pages/admin/PostEdit.vue'),
    name: "admin-post-edit",
    meta: {
      layout: "admin-layout"
    }
  }
]

export default routes