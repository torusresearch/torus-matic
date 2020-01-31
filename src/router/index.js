import Vue from "vue";
import VueRouter from "vue-router";
import Movies from "@/components/Movies";
import Movie from "@/components/Movie";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "movies",
      component: Movies
    },
    {
      path: "/movie/:slug",
      name: "movie",
      component: Movie
    }
  ],
  mode: "history"
});
