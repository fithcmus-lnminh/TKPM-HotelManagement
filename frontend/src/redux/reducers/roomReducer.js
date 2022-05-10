import {
  GET_ALL_ROOMS_FAIL,
  GET_ALL_ROOMS_REQUEST,
  GET_ALL_ROOMS_SUCCESS,
  GET_ROOM_DETAILS_FAIL,
  GET_ROOM_DETAILS_REQUEST,
  GET_ROOM_DETAILS_SUCCESS,
} from "../../constants/roomConsts";

export const allRoomsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ROOMS_REQUEST:
      return { isLoading: true };
    case GET_ALL_ROOMS_SUCCESS:
      return { isLoading: false, allRooms: action.data };
    case GET_ALL_ROOMS_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};

export const roomDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ROOM_DETAILS_REQUEST:
      return { isLoading: true };
    case GET_ROOM_DETAILS_SUCCESS:
      return { isLoading: false, roomInfo: action.data };
    case GET_ROOM_DETAILS_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};
