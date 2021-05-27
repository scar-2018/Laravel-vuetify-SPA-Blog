//Routes
import adminRoutes from "./admin"
import publicRoutes from "./public"

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

export default routes;