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
  createEmployeeReducer,
  deleteUserReducer,
} from "./reducers/userReducer";
import {
  allRoomsReducer,
  roomDetailsReducer,
  roomCreateReviewReducer,
  roomCreateReducer,
  revenueReportReducer,
  destinyReportReducer,
  updateRoomReducer,
  deleteRoomReducer,
  topRoomsReducer,
} from "./reducers/roomReducer";
import { navigateReducer } from "./reducers/navigateReducer";
import {
  createRentalCardReducer,
  createBillReducer,
  rentalCardReducer,
  billReducer,
  cancelRentalReducer,
  getCancelRentalReducer,
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
  deleteRoomReducer,
  createEmployeeReducer,
  deleteUserReducer,
  cancelRentalReducer,
  getCancelRentalReducer,
  topRoomsReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
