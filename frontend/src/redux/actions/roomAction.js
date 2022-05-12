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
} from "../../constants/roomConsts";

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
