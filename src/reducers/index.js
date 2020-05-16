import { combineReducers } from "redux";

import cars from "./cars";
import filters from "./filters";
import sortBy from "./sortBy";
import modal from "./modal";

export default combineReducers({
  cars,
  filters,
  sortBy,
  modal,
});
