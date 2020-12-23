/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/Home.vue";
import AddAccount from "./components/AddAccount.vue";
import AddRecord from "./components/AddRecord.vue";
import AcctDetail from "./components/AcctDetail.vue";
import Settings from "./components/Settings.vue";
Vue.use(VueRouter);
const router = new VueRouter({routes: [
  { path: "/", component: Home},
  { path: "/add-account", component: AddAccount},
  { path: "/add-record", component: AddRecord},
  { path: "/account-detail/:id", component: AcctDetail, props: true},
  { path: "/settings", component: Settings},
]})

export default router;
