import axios from "axios";
import { ActionTypes } from "../constants/actionTypes";

export const getAddresses = (userId) => {
  return async (dispatch) => {
    const response = await axios
      .post("http://localhost:2000/api/getaddresses", { userId })
      .catch((err) => {
        console.log("Err ", err);
      });
    /*   console.log(response); */

    dispatch({
      type: ActionTypes.GET_ADDRESSES,
      payload: response?.data?.address,
    });
  };
};
