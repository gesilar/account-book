import {Reducer, combineReducers} from "redux";
import {History} from "history";
import { connectRouter, RouterState } from "connected-react-router";
interface IAppState {
  router: RouterState;
}
const createRootReducer = (history: History): Reducer<IAppState> => {
  return combineReducers({
    router: connectRouter(history)
  })
}

export default createRootReducer;