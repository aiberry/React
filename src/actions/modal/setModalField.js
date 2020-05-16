export const setModalField = (field, value) => (dispatch) => {
  dispatch({ type: "SET_MODAL_FIELD", payload: { field, value } });
};
