import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  getUserProfileReducer,
  updateUserProfileReducer,
} from "./reducers/userReducer";
import { allRoomsReducer, roomDetailsReducer } from "./reducers/roomReducer";
import { navigateReducer } from "./reducers/navigateReducer";
import { rentalCardReducer, billReducer } from "./reducers/rentalReducer";
import { paymentReducer } from "./reducers/paymentReducer";

const reducer = combineReducers({
  userLoginReducer,
  userRegisterReducer,
  navigateReducer,
  getUserProfileReducer,
  updateUserProfileReducer,
  allRoomsReducer,
  roomDetailsReducer,
  rentalCardReducer,
  billReducer,
  paymentReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
