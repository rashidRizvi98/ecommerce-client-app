import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  brands: [],
};

export const brandReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_BRANDS:
      return { ...state, brands: payload };

    default:
      return state;
  }
};

const initialSelectedBrandState = {
  products: [],
};

export const selectedBrandReducer = (
  state = initialSelectedBrandState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.SELECTED_BRAND:
      return { ...state, products: payload };

    case ActionTypes.REMOVE_SELECTED_BRAND:
      return { products: [] };
    default:
      return state;
  }
};
