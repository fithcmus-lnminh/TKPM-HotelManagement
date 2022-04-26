import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducer";
import { navigateReducer } from "./reducers/navigateReducer";

const reducer = combineReducers({
  userLoginReducer,
  userRegisterReducer,
  navigateReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
