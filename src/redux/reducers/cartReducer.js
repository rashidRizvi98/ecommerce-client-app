import { ActionTypes } from "../constants/actionTypes";

export const getCartReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_CART:
      return { ...state, ...payload };

    case ActionTypes.CLEAR_CART:
      return {};

    default:
      return state;
  }
};
