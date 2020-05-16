export const getTenants = () => (dispatch) => {
  fetch("http://80.249.84.47:11000/api/tenants/", {
    mode: "cors",
  })
    .then((response) => response.json())
    .then((myJson) => {
      dispatch({
        type: "SET_TENANTS",
        payload: myJson,
      });
    })
    .catch(console.error);
};
