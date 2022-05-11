import axios from "axios";
import {
  CREATE_BILL_FAIL,
  CREATE_BILL_REQUEST,
  CREATE_BILL_SUCCESS,
  CREATE_RENTAL_CARD_FAIL,
  CREATE_RENTAL_CARD_REQUEST,
  CREATE_RENTAL_CARD_SUCCESS,
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

    console.log(data);

    dispatch({ type: CREATE_RENTAL_CARD_SUCCESS });
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
