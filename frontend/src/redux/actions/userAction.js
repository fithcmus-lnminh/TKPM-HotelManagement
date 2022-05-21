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
  UPDATE_USER_PROFILE_REQUEST,
  CHANGE_USER_LOGIN_NAME,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_SUCCESS,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  GET_ALL_CUSTOMER_REQUEST,
  GET_ALL_CUSTOMER_SUCCESS,
  GET_ALL_CUSTOMER_FAIL,
  GET_ALL_EMPLOYEE_REQUEST,
  GET_ALL_EMPLOYEE_SUCCESS,
  GET_ALL_EMPLOYEE_FAIL,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_FAIL,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_REQUEST,
} from "../../constants/userConsts";
import { encode } from "js-base64";
import { openNotification } from "../../utils/notification";

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
  (name, email, password, identity_card, customerType) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/register",
        { name, email, password, identity_card, customerType },
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

export const updateUserProfile = (userObj) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

    const { userInfo } = getState().userLoginReducer;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put("/api/users/profile", userObj, config);

    dispatch({ type: UPDATE_USER_PROFILE_SUCCESS });
    dispatch({
      type: GET_USER_DETAILS_SUCCESS,
      data: { ...data, dob: data.dob?.split("T")[0] },
    });
    openNotification("success", "Cập nhật thành công");
    if (data.name) {
      sessionStorage.setItem(
        "userInfo",
        encode(JSON.stringify({ ...userInfo, name: data.name }))
      );
      dispatch({ type: CHANGE_USER_LOGIN_NAME, name: data.name });
    }
  } catch (err) {
    dispatch({
      type: UPDATE_USER_PROFILE_FAIL,
      message:
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message,
    });
  }
};

export const changeUserPassword =
  (passwordObj) => async (dispatch, getState) => {
    try {
      dispatch({ type: CHANGE_PASSWORD_REQUEST });

      const { userInfo } = getState().userLoginReducer;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/users/change-password",
        passwordObj,
        config
      );

      dispatch({ type: CHANGE_PASSWORD_SUCCESS });
      openNotification("success", "Thay đổi mật khẩu thành công");
    } catch (err) {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        message:
          err.response && err.response.data.errors.message
            ? err.response.data.errors.message
            : err.message,
      });
    }
  };

export const getAllCustomer = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_CUSTOMER_REQUEST });

    const { userInfo } = getState().userLoginReducer;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/users/all-user", config);

    dispatch({ type: GET_ALL_CUSTOMER_SUCCESS, data: data });
  } catch (err) {
    dispatch({
      type: GET_ALL_CUSTOMER_FAIL,
      message:
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message,
    });
  }
};

export const getAllEmployee = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_EMPLOYEE_REQUEST });

    const { userInfo } = getState().userLoginReducer;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/users/all-emp", config);

    dispatch({ type: GET_ALL_EMPLOYEE_SUCCESS, data: data });
  } catch (err) {
    dispatch({
      type: GET_ALL_EMPLOYEE_FAIL,
      message:
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message,
    });
  }
};

export const createEmployee = (obj) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_EMPLOYEE_REQUEST });

    const { userInfo } = getState().userLoginReducer;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/users/create-emp", obj, config);
    console.log(data);

    dispatch({ type: CREATE_EMPLOYEE_SUCCESS });
    openNotification("success", "Thêm nhân viên thành công");
  } catch (err) {
    dispatch({
      type: CREATE_EMPLOYEE_FAIL,
      message:
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { userInfo } = getState().userLoginReducer;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/delete-user/${id}`, config);
    console.log(data);

    dispatch({ type: DELETE_USER_SUCCESS });
    openNotification("success", "Xóa tài khoản thành công");
  } catch (err) {
    dispatch({
      type: DELETE_USER_FAIL,
      message:
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message,
    });
  }
};
