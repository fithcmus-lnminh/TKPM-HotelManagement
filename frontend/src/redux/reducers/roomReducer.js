import {
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_RESET,
  CREATE_REVIEW_SUCCESS,
  CREATE_ROOM_FAIL,
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
  DELETE_ROOM_FAIL,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  GET_ALL_ROOMS_FAIL,
  GET_ALL_ROOMS_REQUEST,
  GET_ALL_ROOMS_SUCCESS,
  GET_DESTINY_FAIL,
  GET_DESTINY_REQUEST,
  GET_DESTINY_SUCCESS,
  GET_REVENUE_FAIL,
  GET_REVENUE_REQUEST,
  GET_REVENUE_SUCCESS,
  GET_ROOM_DETAILS_FAIL,
  GET_ROOM_DETAILS_REQUEST,
  GET_ROOM_DETAILS_SUCCESS,
  GET_TOP_ROOMS_FAIL,
  GET_TOP_ROOMS_REQUEST,
  GET_TOP_ROOMS_SUCCESS,
  UPDATE_ROOM_FAIL,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS,
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

export const revenueReportReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REVENUE_REQUEST:
      return { isLoading: true };
    case GET_REVENUE_SUCCESS:
      return { isLoading: false, revenue: action.data };
    case GET_REVENUE_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};

export const destinyReportReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DESTINY_REQUEST:
      return { isLoading: true };
    case GET_DESTINY_SUCCESS:
      return { isLoading: false, destiny: action.data };
    case GET_DESTINY_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};

export const updateRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ROOM_REQUEST:
      return { isLoading: true };
    case UPDATE_ROOM_SUCCESS:
      return { isLoading: false, isSuccess: true, updatedRoom: action.data };
    case UPDATE_ROOM_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};

export const deleteRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ROOM_REQUEST:
      return { isLoading: true };
    case DELETE_ROOM_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case DELETE_ROOM_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};

export const topRoomsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TOP_ROOMS_REQUEST:
      return { isLoading: true };
    case GET_TOP_ROOMS_SUCCESS:
      return { isLoading: false, topRooms: action.data };
    case GET_TOP_ROOMS_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};
