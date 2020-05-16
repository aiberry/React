export const getCarBrands = () => (dispatch) => {
  fetch("http://80.249.84.47:11000/api/cars/brands/", {
    mode: "cors",
  })
    .then((response) => response.json())
    .then((myJson) => {
      dispatch({
        // Promice.all???
        type: "SET_CAR_BRANDS",
        payload: myJson,
      });
    })

    .catch(console.error);
};
