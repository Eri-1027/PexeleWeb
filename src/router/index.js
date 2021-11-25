import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Photo from "../components/Photo.vue";
import video from "../components/video.vue";
import ErrorPages from "../components/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "",
    component: Home,
    children: [
      {
        path: "",
        name: "Photo",
        component: Photo,
      },
      {
        path: "video",
        name: "video",
        component: video,
      },
    ],
  },
  {
    path: "/ErrorPages",
    name: "ErrorPages",
    component: ErrorPages,
  },
  {
    path: "*",
    redirect: "/ErrorPages",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
