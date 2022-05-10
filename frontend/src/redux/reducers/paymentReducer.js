import {
  PAY_FAIL,
  PAY_REQUEST,
  PAY_SUCCESS,
  PAY_RESET,
} from "../../constants/paymentConsts";

export const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    case PAY_REQUEST:
      return { ...state, isLoading: true };
    case PAY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case PAY_FAIL:
      return { isLoading: false, errorMessage: action.message };
    case PAY_RESET:
      return {};
    default:
      return state;
  }
};
