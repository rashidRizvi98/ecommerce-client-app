import axios from "axios";
import { ActionTypes } from "../constants/actionTypes";

export const getCart = (userId) => {
  return async (dispatch) => {
    const response = await axios
      .post("http://localhost:2000/api/getcart", { userId })
      .catch((err) => {
        console.log("Err ", err);
      });
    /*   console.log(response); */

    dispatch({
      type: ActionTypes.GET_CART,
      payload: response?.data?.cart,
    });
  };
};

export const removeCart = () => {
  return {
    type: ActionTypes.CLEAR_CART,
  };
};
