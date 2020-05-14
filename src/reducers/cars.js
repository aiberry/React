const cars = (state = [], action) => {
  if (action.type === "SET_CARS") {
    return action.payload;
  }
  if (action.type === "SET_CARS_HERE") {
    return state.map((car) => {
      const isOnTerritory = !!action.payload.find(
        (carHere) => car.id === carHere.id
      );
      return { ...car, isOnTerritory };
    });
  }
  return state;
};

export default cars;
