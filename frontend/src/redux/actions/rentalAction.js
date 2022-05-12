import axios from "axios";
import {
  CREATE_BILL_FAIL,
  CREATE_BILL_REQUEST,
  CREATE_BILL_SUCCESS,
  CREATE_RENTAL_CARD_FAIL,
  CREATE_RENTAL_CARD_REQUEST,
  CREATE_RENTAL_CARD_SUCCESS,
  GET_BILL_FAIL,
  GET_BILL_REQUEST,
  GET_BILL_SUCCESS,
  GET_RENTAL_CARD_FAIL,
  GET_RENTAL_CARD_REQUEST,
  GET_RENTAL_CARD_SUCCESS,
} from "../../constants/rentalConsts";

export const createRentalCard = (rentalObj) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_RENTAL_CARD_REQUEST });

    const { userInfo } = getState().userLoginReducer;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/rooms/create-rental-card",
      rentalObj,
      config
    );

    dispatch({ type: CREATE_RENTAL_CARD_SUCCESS, data: data });
  } catch (err) {
    dispatch({
      type: CREATE_RENTAL_CARD_FAIL,
      message:
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message,
    });
  }
};

export const createBill = (billObj) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_BILL_REQUEST });

    const { userInfo } = getState().userLoginReducer;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/rooms/create-bill",
      billObj,
      config
    );

    dispatch({ type: CREATE_BILL_SUCCESS, data: data });
  } catch (err) {
    dispatch({
      type: CREATE_BILL_FAIL,
      message:
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message,
    });
  }
};

export const getRentalCardByUserId = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_RENTAL_CARD_REQUEST });

    const { data } = await axios.get(`/api/rooms/rental-card/${userId}`);

    dispatch({ type: GET_RENTAL_CARD_SUCCESS, data: data });
  } catch (err) {
    dispatch({
      type: GET_RENTAL_CARD_FAIL,
      message:
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message,
    });
  }
};

export const getBillByUserId = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BILL_REQUEST });

    const { data } = await axios.get(`/api/rooms/rental-bill/${userId}`);
    console.log(data);

    dispatch({ type: GET_BILL_SUCCESS, data: data });
  } catch (err) {
    dispatch({
      type: GET_BILL_FAIL,
      message:
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message,
    });
  }
};
