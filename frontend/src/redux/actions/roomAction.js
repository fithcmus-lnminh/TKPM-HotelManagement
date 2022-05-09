import axios from "axios";
import {
  GET_ALL_ROOMS_FAIL,
  GET_ALL_ROOMS_REQUEST,
  GET_ALL_ROOMS_SUCCESS,
} from "../../constants/roomConsts";

export const getAllRooms = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_ROOMS_REQUEST });

    const { data } = await axios.get("/api/rooms/all-rooms");

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
