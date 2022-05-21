import axios from "axios";
import {
  GET_ALL_ROOMS_FAIL,
  GET_ALL_ROOMS_REQUEST,
  GET_ALL_ROOMS_SUCCESS,
  GET_ROOM_DETAILS_REQUEST,
  GET_ROOM_DETAILS_SUCCESS,
  GET_ROOM_DETAILS_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAIL,
  GET_REVENUE_SUCCESS,
  GET_REVENUE_FAIL,
  GET_REVENUE_REQUEST,
  GET_DESTINY_REQUEST,
  GET_DESTINY_SUCCESS,
  GET_DESTINY_FAIL,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS,
  UPDATE_ROOM_FAIL,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_FAIL,
  DELETE_ROOM_REQUEST,
  GET_TOP_ROOMS_REQUEST,
  GET_TOP_ROOMS_SUCCESS,
  GET_TOP_ROOMS_FAIL,
} from "../../constants/roomConsts";
import { openNotification } from "../../utils/notification";

export const getAllRooms =
  (keyword = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: GET_ALL_ROOMS_REQUEST });

      const { data } = await axios.get(
        `/api/rooms/all-rooms?keyword=${keyword}`
      );

      dispatch({ type: GET_ALL_ROOMS_SUCCESS, data: data });
    } catch (err) {
      dispatch({
        type: GET_ALL_ROOMS_FAIL,
        message:
          err.response && err.response.data.errors.message
            ? err.response.data.errors.message
            : err.message,
      });
    }
  };

export const getRoomDetailsByNumber =
  (number) => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_ROOM_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/rooms/${number}`);
      dispatch({ type: GET_ROOM_DETAILS_SUCCESS, data: data });
    } catch (err) {
      dispatch({
        type: GET_ROOM_DETAILS_FAIL,
        message:
          err.response && err.response.data.errors.message
            ? err.response.data.errors.message
            : err.message,
      });
    }
  };

export const createRoomReview =
  (number, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_REVIEW_REQUEST });

      const { userInfo } = getState().userLoginReducer;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/rooms/${number}/reviews`,
        review,
        config
      );

      dispatch({ type: CREATE_REVIEW_SUCCESS });
    } catch (err) {
      dispatch({
        type: CREATE_REVIEW_FAIL,
        message:
          err.response && err.response.data.errors.message
            ? err.response.data.errors.message
            : err.message,
      });
    }
  };

export const createRoom = (roomObj) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ROOM_REQUEST });

    const { userInfo } = getState().userLoginReducer;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/rooms/create-room`,
      roomObj,
      config
    );

    dispatch({ type: CREATE_ROOM_SUCCESS });
    openNotification("success", "Thêm phòng thành công");
  } catch (err) {
    openNotification("error", err.response.data.errors.message || err.message);
    dispatch({
      type: CREATE_ROOM_FAIL,
      message:
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message,
    });
  }
};

export const getRevenue = (year, month) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_REVENUE_REQUEST });

    const { userInfo } = getState().userLoginReducer;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/rooms/revenue-report/${year}/${month}`,
      config
    );

    dispatch({ type: GET_REVENUE_SUCCESS, data: data });
  } catch (err) {
    dispatch({
      type: GET_REVENUE_FAIL,
      message:
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message,
    });
  }
};

export const getDensity =
  (roomId, year, month) => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_DESTINY_REQUEST });

      const { userInfo } = getState().userLoginReducer;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/rooms/density-use-report/${roomId}/${year}/${month}`,
        config
      );

      dispatch({ type: GET_DESTINY_SUCCESS, data: data });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_DESTINY_FAIL,
        message:
          err.response && err.response.data.errors.message
            ? err.response.data.errors.message
            : err.message,
      });
    }
  };

export const updateRoom = (id, obj) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_ROOM_REQUEST });

    const { userInfo } = getState().userLoginReducer;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/rooms/update-room/${id}`,
      obj,
      config
    );

    dispatch({ type: UPDATE_ROOM_SUCCESS, data: data });
    openNotification("success", "Cập nhật thành công");
  } catch (err) {
    console.log(err);
    dispatch({
      type: UPDATE_ROOM_FAIL,
      message:
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message,
    });
  }
};

export const deleteRoom = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_ROOM_REQUEST });

    const { userInfo } = getState().userLoginReducer;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/rooms/delete-room/${id}`, config);

    dispatch({ type: DELETE_ROOM_SUCCESS });
    openNotification("success", "Xóa phòng thành công");
  } catch (err) {
    dispatch({
      type: DELETE_ROOM_FAIL,
      message:
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message,
    });
  }
};

export const getTopRooms = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TOP_ROOMS_REQUEST });

    const { data } = await axios.get("/api/rooms/get-top-rooms");
    dispatch({ type: GET_TOP_ROOMS_SUCCESS, data: data });
  } catch (err) {
    dispatch({
      type: GET_TOP_ROOMS_FAIL,
      message:
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message,
    });
  }
};
