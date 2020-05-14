export const setFilter = (columnName, value) => (dispatch) => {
  dispatch({ type: "SET_FILTER", payload: { value, columnName } });
};
