import axios from "axios";
import { ActionTypes } from "../constants/actionTypes";

export const signin = (user) => {
  console.log(user);

  return async (dispatch) => {
    const response = await axios.post(
      `http://localhost:2000/api/client/signin`,
      { ...user }
    );

    if (response.status === 200) {
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log(response.data);
      dispatch({
        type: ActionTypes.SIGNIN_SUCCESS,
        payload: response.data,
      });
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: ActionTypes.SIGNIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    const response = await axios.post(
      `http://localhost:2000/api/admin/signout`
    );

    if (response.status === 200) {
      localStorage.clear();
      dispatch({
        type: ActionTypes.SIGNOUT_SUCCESS,
      });
    }
  };
};
