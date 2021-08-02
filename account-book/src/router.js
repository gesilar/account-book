/* eslint-disable */
import VueRouter from "vue-router";
import Home from "./components/Home";
import AddAccount from "./components/AddAccount";
import AddRecord from "./components/AddRecord";
import AddType from "./components/AddType";
import AcctDetail from "./components/AcctDetail";
import Settings from "./pages/Settings";
import About from "./components/About";
const router = new VueRouter({routes: [
  { path: "/", component: Home},
  { path: "/add-account", component: AddAccount},
  { path: "/add-record", component: AddRecord},
  { path: "/add-type", component: AddType},
  { path: "/account-detail/:id", component: AcctDetail, props: true},
  { path: "/settings", component: Settings},
  { path: "/about", component: About},
]})

export default router;
