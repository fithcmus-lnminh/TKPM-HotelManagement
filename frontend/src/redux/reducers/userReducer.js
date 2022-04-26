import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../../constants/userConsts";
import { decode } from "js-base64";

const initialState = {
  isLoading: false,
  userInfo:
    sessionStorage.getItem("userInfo") &&
    JSON.parse(decode(sessionStorage.getItem("userInfo"))),
};

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.userInfo,
      };
    case USER_LOGIN_FAIL:
      return { ...state, isLoading: false, errorMessage: action.message };
    case USER_LOGOUT:
      return {};
    // case CHANGE_USER_LOGIN_NAME:
    //   return { ...state, userInfo: { ...state.userInfo, name: action.name } };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, isLoading: true };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.userInfo,
      };
    case USER_REGISTER_FAIL:
      return { ...state, isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};
