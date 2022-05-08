import {
  CHANGE_USER_LOGIN_NAME,
  GET_USER_DETAILS_FAIL,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_RESET,
  GET_USER_DETAILS_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
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
    case CHANGE_USER_LOGIN_NAME:
      return { ...state, userInfo: { ...state.userInfo, name: action.name } };
    case USER_LOGOUT:
      return {};
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

export const getUserProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_DETAILS_REQUEST:
      return { ...state, isLoading: true };
    case GET_USER_DETAILS_SUCCESS:
      return { isLoading: false, userProfile: action.data };
    case GET_USER_DETAILS_FAIL:
      return { isLoading: false, errorMessage: action.message };
    case GET_USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const updateUserProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE_REQUEST:
      return { isLoading: true };
    case UPDATE_USER_PROFILE_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};
