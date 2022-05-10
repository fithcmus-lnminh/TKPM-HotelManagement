import {
  CREATE_BILL_FAIL,
  CREATE_BILL_REQUEST,
  CREATE_BILL_SUCCESS,
  CREATE_RENTAL_CARD_FAIL,
  CREATE_RENTAL_CARD_REQUEST,
  CREATE_RENTAL_CARD_SUCCESS,
} from "../../constants/rentalConsts";

export const rentalCardReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_RENTAL_CARD_REQUEST:
      return { isLoading: true };
    case CREATE_RENTAL_CARD_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CREATE_RENTAL_CARD_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};

export const billReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BILL_REQUEST:
      return { isLoading: true };
    case CREATE_BILL_SUCCESS:
      return { isLoading: false, isSuccess: true, billInfo: action.data };
    case CREATE_BILL_FAIL:
      return { isLoading: false, errorMessage: action.message };
    default:
      return state;
  }
};
