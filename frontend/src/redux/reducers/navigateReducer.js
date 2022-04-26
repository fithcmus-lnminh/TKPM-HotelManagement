const initialState = {
  navigate: {},
};

export const navigateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NAVIGATE":
      return { ...state, navigate: action.navigate };

    default:
      return state;
  }
};
