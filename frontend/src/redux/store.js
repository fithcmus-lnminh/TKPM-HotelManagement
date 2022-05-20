import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  getUserProfileReducer,
  updateUserProfileReducer,
  changePasswordReducer,
  customerReducer,
  employeeReducer,
} from "./reducers/userReducer";
import {
  allRoomsReducer,
  roomDetailsReducer,
  roomCreateReviewReducer,
  roomCreateReducer,
  revenueReportReducer,
  destinyReportReducer,
  updateRoomReducer,
} from "./reducers/roomReducer";
import { navigateReducer } from "./reducers/navigateReducer";
import {
  createRentalCardReducer,
  createBillReducer,
  rentalCardReducer,
  billReducer,
} from "./reducers/rentalReducer";
import { paymentReducer } from "./reducers/paymentReducer";

const reducer = combineReducers({
  userLoginReducer,
  userRegisterReducer,
  navigateReducer,
  getUserProfileReducer,
  updateUserProfileReducer,
  allRoomsReducer,
  roomDetailsReducer,
  createRentalCardReducer,
  createBillReducer,
  paymentReducer,
  rentalCardReducer,
  billReducer,
  roomCreateReviewReducer,
  changePasswordReducer,
  roomCreateReducer,
  customerReducer,
  employeeReducer,
  revenueReportReducer,
  destinyReportReducer,
  updateRoomReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
