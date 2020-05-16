export const getCarModels = (id_brand) => (dispatch) => {
  fetch(`http://80.249.84.47:11000/api/cars/brands/${id_brand}/`, {
    mode: "cors",
  })
    .then((response) => response.json())
    .then((myJson) => {
      dispatch({
        type: "SET_CAR_MODELS",
        payload: myJson,
      });
    })
    .catch(console.error);
};
