import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAIL,
  GET_USER_DETAILS_RESET,
} from "../../constants/userConsts";
import { encode } from "js-base64";

export const login =
  (email, password, redirect) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      dispatch({ type: USER_LOGIN_SUCCESS, userInfo: data });
      const navigate = getState().navigateReducer.navigate;
      redirect ? navigate(`/${redirect}`) : navigate("/");

      sessionStorage.setItem("userInfo", encode(JSON.stringify(data)));
    } catch (err) {
      dispatch({
        type: USER_LOGIN_FAIL,
        message:
          err.response && err.response.data.errors.message
            ? err.response.data.errors.message
            : err.message,
      });
    }
  };

export const register =
  (name, email, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/register",
        { name, email, password },
        config
      );

      dispatch({ type: USER_REGISTER_SUCCESS, userInfo: data });
      dispatch({ type: USER_LOGIN_SUCCESS, userInfo: data });

      const navigate = getState().navigateReducer.navigate;
      navigate("/");
      sessionStorage.setItem("userInfo", encode(JSON.stringify(data)));
    } catch (err) {
      dispatch({
        type: USER_REGISTER_FAIL,
        message:
          err.response && err.response.data.errors.message
            ? err.response.data.errors.message
            : err.message,
      });
    }
  };

export const logout = () => async (dispatch, getState) => {
  sessionStorage.removeItem("userInfo");

  dispatch({ type: USER_LOGOUT });
  dispatch({ type: GET_USER_DETAILS_RESET });
  const navigate = getState().navigateReducer.navigate;
  navigate("/");
};

export const getUserDetails = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_DETAILS_REQUEST });

    const { userInfo } = getState().userLoginReducer;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${userId}`, config);

    dispatch({ type: GET_USER_DETAILS_SUCCESS, data: data });
  } catch (err) {
    dispatch({
      type: GET_USER_DETAILS_FAIL,
      message:
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message,
    });
  }
};
