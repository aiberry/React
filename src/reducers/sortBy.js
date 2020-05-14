import { columns, sortDirections } from "../constants";

const defaultState = {
  [columns.brand]: sortDirections.none,
  [columns.model]: sortDirections.none,
  [columns.number]: sortDirections.none,
  [columns.tenate]: sortDirections.none,
};

const sort = (state = defaultState, action) => {
  if (action.type === "SET_SORTING") {
    if (state[action.payload.column] === sortDirections.up) {
      return {
        ...state,
        [action.payload.column]: sortDirections.down,
      };
    }
    if (state[action.payload.column] === sortDirections.down) {
      return {
        ...state,
        [action.payload.column]: sortDirections.up,
      };
    }
    return {
      ...defaultState,
      [action.payload.column]: sortDirections.up,
    };
  }
  return state;
};

export default sort;
