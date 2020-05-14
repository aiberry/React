import { columns } from "../constants";

const filters = (
  state = {
    [columns.here]: false,
    [columns.brand]: "",
    [columns.model]: "",
    [columns.number]: "",
    [columns.tenant]: "",
  },
  action
) => {
  if (action.type === "SET_FILTER") {
    return {
      ...state,
      [action.payload.columnName]:
        typeof action.payload.value === "string"
          ? action.payload.value.toLowerCase()
          : !state[action.payload.columnName],
    };
  }
  return state;
};

export default filters;
