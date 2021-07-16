import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
  },
  authenticate: false,
};

export const signinReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        authenticate: true,
      };

    case ActionTypes.SIGNOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};
