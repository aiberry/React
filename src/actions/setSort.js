export const setSort = (column, order) => (dispatch) => {
  dispatch({ type: "SET_SORTING", payload: { column, order } });
};
