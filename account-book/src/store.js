import {createStore} from "redux";
import {createHashHistory} from "history";
import createRootReducer from "./reducers";

export const history = createHashHistory({
  hashType: "noslash"
});

export const store = createStore(createRootReducer(history));
