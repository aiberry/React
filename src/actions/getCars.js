export const getCars = () => (dispatch) => {
  fetch("http://80.249.84.47:11000/api/cars", {
    mode: "cors",
  })
    .then((response) => response.json())
    .then((myJson) => {
      dispatch({
        type: "SET_CARS",
        payload: myJson.map((car) => ({ ...car, isOnTerritory: false })),
      });
      return fetch("http://80.249.84.47:11000/api/stat/here/");
    })
    .then((response) =>
      response.json().then((myJson) => {
        dispatch({
          type: "SET_CARS_HERE",
          payload: myJson,
        });
      })
    )
    .catch(console.error);
};
