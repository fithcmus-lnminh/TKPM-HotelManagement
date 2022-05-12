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
  STORE_BILL_DATA,
} from "../../constants/rentalConsts";

export const createRentalCardReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_RENTAL_CARD_REQUEST:
      return { isLoading: true };
    case CREATE_RENTAL_CARD_SUCCESS:
      return { isLoading: false, isSuccess: true, rentalInfo: action.data };
    case CREATE_RENTAL_CARD_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};

export const createBillReducer = (state = { billData: {} }, action) => {
  switch (action.type) {
    case CREATE_BILL_REQUEST:
      return { isLoading: true };
    case CREATE_BILL_SUCCESS:
      return { isLoading: false, isSuccess: true, billInfo: action.data };
    case CREATE_BILL_FAIL:
      return { isLoading: false, errorMessage: action.message };
    case STORE_BILL_DATA:
      return { billData: action.data };
    default:
      return state;
  }
};

export const rentalCardReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_RENTAL_CARD_REQUEST:
      return { isLoading: true };
    case GET_RENTAL_CARD_SUCCESS:
      return { isLoading: false, rentalInfo: action.data };
    case GET_RENTAL_CARD_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};

export const billReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BILL_REQUEST:
      return { isLoading: true };
    case GET_BILL_SUCCESS:
      return { isLoading: false, billInfo: action.data };
    case GET_BILL_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};
