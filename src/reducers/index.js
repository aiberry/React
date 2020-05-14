import { combineReducers } from "redux";

import cars from "./cars";
import filters from "./filters";
import sortBy from "./sortBy";

export default combineReducers({
  cars,
  filters,
  sortBy,
});
