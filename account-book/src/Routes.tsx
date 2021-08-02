import { Switch, Route } from "react-router";
import Home from "./pages/Home";
import AddAccount from "./pages/AddAccount";
import AddRecord from "./pages/AddRecord";
import AddType from "./pages/AddType";
import AcctDetail from "./pages/AcctDetail";
import Settings from "./pages/Settings";
import About from "./pages/About";


interface IRoute {
  path: string,
  component: any
}

const routes: Array<IRoute> = [
  { path: "/", component: Home},
  { path: "/add-account", component: AddAccount},
  { path: "/add-record", component: AddRecord},
  { path: "/add-type", component: AddType},
  { path: "/account-detail/:id", component: AcctDetail, props: true},
  { path: "/settings", component: Settings},
  { path: "/about", component: About},
]

const Routes = () => {
  return (
    <Switch>
      {
        routes.map((i: IRoute) => {
          return <Route path={i.path} component={i.component} />
        })
      }
    </Switch>
  )
}

export default Routes;