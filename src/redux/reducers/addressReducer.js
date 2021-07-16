import { ActionTypes } from "../constants/actionTypes";

export const getAddressReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_ADDRESSES:
      return { ...state, ...payload };

    /*       case ActionTypes.CLEAR_CART:
        return {}; */

    default:
      return state;
  }
};
