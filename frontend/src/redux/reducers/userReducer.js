import {
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_USER_LOGIN_NAME,
  CREATE_EMPLOYEE_FAIL,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_ALL_CUSTOMER_FAIL,
  GET_ALL_CUSTOMER_REQUEST,
  GET_ALL_CUSTOMER_SUCCESS,
  GET_ALL_EMPLOYEE_FAIL,
  GET_ALL_EMPLOYEE_REQUEST,
  GET_ALL_EMPLOYEE_SUCCESS,
  GET_USER_DETAILS_FAIL,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_RESET,
  GET_USER_DETAILS_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
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
    case UPDATE_USER_PROFILE_SUCCESS:
      return { isLoading: false };
    case UPDATE_USER_PROFILE_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};

export const changePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return { isLoading: true };
    case CHANGE_PASSWORD_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CHANGE_PASSWORD_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};

export const customerReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMER_REQUEST:
      return { isLoading: true };
    case GET_ALL_CUSTOMER_SUCCESS:
      return { isLoading: false, customers: action.data };
    case GET_ALL_CUSTOMER_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};

export const employeeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EMPLOYEE_REQUEST:
      return { isLoading: true };
    case GET_ALL_EMPLOYEE_SUCCESS:
      return { isLoading: false, employees: action.data };
    case GET_ALL_EMPLOYEE_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};

export const createEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_EMPLOYEE_REQUEST:
      return { isLoading: true };
    case CREATE_EMPLOYEE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CREATE_EMPLOYEE_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
   switch (action.type) {
    case DELETE_USER_REQUEST:
      return { isLoading: true };
    case DELETE_USER_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case DELETE_USER_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
}
