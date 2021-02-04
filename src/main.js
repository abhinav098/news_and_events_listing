import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import { config } from "../config";
import { OktaAuth } from "@okta/okta-auth-js";
import OktaVue from "@okta/okta-vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const oktaAuth = new OktaAuth({
  issuer: config.issuer,
  client_id: config.client_id,
  redirect_uri: config.redirect_uri,
  scope: config.scope,
});

Vue.use(OktaVue, { oktaAuth });

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
