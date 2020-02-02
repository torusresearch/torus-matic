import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home";
import Movies from "@/components/Movies";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/movies",
      name: "movies",
      component: Movies,
      beforeEnter: (to, from, next) => {
        if (typeof window.account !== "undefined") {
          next();
        } else {
          next(from.path);
        }
      }
    }
  ],
  mode: "history"
});
