import { ActionTypes } from "../constants/actionTypes";

export const signupReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SIGNUP_SUCCESS:
      return { ...state, ...payload };

    default:
      return state;
  }
};
