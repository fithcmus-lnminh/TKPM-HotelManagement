import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  getUserProfileReducer,
  updateUserProfileReducer,
} from "./reducers/userReducer";
import { allRoomsReducer } from "./reducers/roomReducer";

import { navigateReducer } from "./reducers/navigateReducer";

const reducer = combineReducers({
  userLoginReducer,
  userRegisterReducer,
  navigateReducer,
  getUserProfileReducer,
  updateUserProfileReducer,
  allRoomsReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
