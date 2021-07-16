import axios from "axios";
import { ActionTypes } from "../constants/actionTypes";

export const signup = (user) => {
  console.log(user);

  return async (dispatch) => {
    const response = await axios.post(
      `http://localhost:2000/api/client/signup`,
      { ...user }
    );

    console.log(response.data);
    dispatch({
      type: ActionTypes.SIGNUP_SUCCESS,
      payload: response.data,
    });
  };
};
