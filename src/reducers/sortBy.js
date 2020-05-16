import { columns, sortDirections } from "../constants";

const defaultState = {
  [columns.brand]: sortDirections.none,
  [columns.model]: sortDirections.none,
  [columns.number]: sortDirections.none,
  [columns.tenant]: sortDirections.none,
};

const sortBy = (state = defaultState, action) => {
  if (action.type === "SET_SORTING") {
    switch (state[action.payload.column]) {
      case sortDirections.up:
        return {
          ...state,
          [action.payload.column]: sortDirections.down,
        };
      case sortDirections.down:
        return {
          ...state,
          [action.payload.column]: sortDirections.up,
        };
      default:
        return {
          ...defaultState,
          [action.payload.column]: sortDirections.up,
        };
    }
  }
  return state;
};

export default sortBy;
