import { columns } from "../constants";

const defaultState = {
  isOpen: false,
  current: {
    [columns.tenant]: {},
    [columns.brand]: {},
    [columns.model]: {},
    [columns.number]: "",
  },
  tenants: [],
  carBrands: [],
  carModels: [],
};

const modal = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_MODAL_OPEN":
      return { ...state, isOpen: !state.isOpen };
    case "SET_TENANTS":
      return { ...state, tenants: action.payload };
    case "SET_CAR_BRANDS":
      return { ...state, carBrands: action.payload };
    case "SET_CAR_MODELS":
      return { ...state, carModels: action.payload };
    case "SET_MODAL_FIELD":
      return {
        ...state,
        current: {
          ...state.current,
          [action.payload.field]: action.payload.value,
        },
      };
    default:
      return state;
  }
};

export default modal;
