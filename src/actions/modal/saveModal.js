import { store } from "../../index";
import { columns } from "../../constants";

export const saveModal = () => (dispatch) => {
  const { current } = store.getState().modal;

  fetch(`http://80.249.84.47:11000/api/cars/add/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      car_number: current[columns.number],
      car_brand: current[columns.brand].id,
      car_model: current[columns.model].id,
      car_tenant: current[columns.tenant].id,
    }),
  })
    .then((response) => response.json())
    .then((myJson) => {
      dispatch({
        type: "ADD_CARS",
        payload: [
          {
            ...myJson,
            isOnTerritory: false,
            car_tenant: {
              id: myJson.car_tenant,
              name: current[columns.tenant].name,
            },
            car_brand: {
              id: myJson.car_brand,
              name: current[columns.brand].name,
            },
            car_model: {
              id: myJson.car_model,
              name: current[columns.model].name,
            },
          },
        ],
      });
    })
    .catch(console.error);
};
