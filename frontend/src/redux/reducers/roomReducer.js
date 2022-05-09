import {
  GET_ALL_ROOMS_FAIL,
  GET_ALL_ROOMS_REQUEST,
  GET_ALL_ROOMS_SUCCESS,
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
