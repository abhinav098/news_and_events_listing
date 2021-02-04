import Vue from "vue";
import Home from "../components/Home.vue";
import News from "../components/News.vue";
import Events from "../components/Events.vue";
import NewsShow from "../components/NewsShow.vue";
import EventShow from "../components/EventShow.vue";
import Router from "vue-router";
import { LoginCallback } from "@okta/okta-vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/implicit/callback",
      component: LoginCallback,
    },
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/news",
      name: "News",
      component: News,
    },
    {
      path: "/news/:id",
      name: "NewsShow",
      component: NewsShow,
    },
    {
      path: "/events",
      name: "Events",
      component: Events,
    },
    {
      path: "/events/:id",
      name: "EventShow",
      component: EventShow,
    },
  ],
});
