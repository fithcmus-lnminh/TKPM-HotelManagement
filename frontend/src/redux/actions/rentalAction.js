import axios from "axios";
import {
  PAY_FAIL,
  PAY_REQUEST,
  PAY_SUCCESS,
} from "../../constants/paymentConsts";
import {
  CANCEL_RENTAL_FAIL,
  CANCEL_RENTAL_REQUEST,
  CANCEL_RENTAL_SUCCESS,
  CREATE_BILL_FAIL,
  CREATE_BILL_REQUEST,
  CREATE_BILL_SUCCESS,
  CREATE_RENTAL_CARD_FAIL,
  CREATE_RENTAL_CARD_REQUEST,
  CREATE_RENTAL_CARD_SUCCESS,
  GET_BILL_FAIL,
  GET_BILL_REQUEST,
  GET_BILL_SUCCESS,
  GET_CANCEL_FAIL,
  GET_CANCEL_REQUEST,
  GET_CANCEL_SUCCESS,
  GET_RENTAL_CARD_FAIL,
  GET_RENTAL_CARD_REQUEST,
  GET_RENTAL_CARD_SUCCESS,
} from "../../constants/rentalConsts";
import { openNotification } from "../../utils/notification";

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

export const cancelRental = (rentalId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CANCEL_RENTAL_REQUEST });

    const { userInfo } = getState().userLoginReducer;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/rooms/cancel-room/${rentalId}`,
      {},
      config
    );
    console.log(data);

    dispatch({ type: CANCEL_RENTAL_SUCCESS, data: data });
    openNotification("success", "Hủy đặt phòng thành công");
  } catch (err) {
    dispatch({
      type: CANCEL_RENTAL_FAIL,
      message:
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message,
    });
  }
};

export const getCancelRental = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CANCEL_REQUEST });

    const { userInfo } = getState().userLoginReducer;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/rooms/cancel-room/${userId}`,
      config
    );

    dispatch({ type: GET_CANCEL_SUCCESS, data: data });
  } catch (err) {
    dispatch({
      type: GET_CANCEL_FAIL,
      message:
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message,
    });
  }
};

export const payBill =
  (billId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: PAY_REQUEST });

      const { userInfo } = getState().userLoginReducer;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/rooms/payment/${billId}`,
        paymentResult,
        config
      );
      console.log("data", data);

      dispatch({ type: PAY_SUCCESS });
      openNotification("success", "Thanh toán thành công");
    } catch (err) {
      dispatch({
        type: PAY_FAIL,
        message:
          err.response && err.response.data.errors.message
            ? err.response.data.errors.message
            : err.message,
      });
    }
  };
