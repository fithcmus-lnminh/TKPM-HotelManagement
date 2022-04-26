export const addNavigate = (navigate) => async (dispatch) => {
  dispatch({ type: "ADD_NAVIGATE", navigate: navigate });
};
