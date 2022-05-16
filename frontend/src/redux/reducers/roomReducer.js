import {
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_RESET,
  CREATE_REVIEW_SUCCESS,
  CREATE_ROOM_FAIL,
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
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

export const roomCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
      return { isLoading: true };
    case CREATE_REVIEW_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CREATE_REVIEW_FAIL:
      return { isLoading: false, errorMessage: action.message };
    case CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const roomCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ROOM_REQUEST:
      return { isLoading: true };
    case CREATE_ROOM_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CREATE_ROOM_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};
