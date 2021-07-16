import axios from "axios";
import { ActionTypes } from "../constants/actionTypes";

export const selectedProduct = (productId) => {
  return async (dispatch) => {
    const response = await axios
      .get(`http://localhost:2000/api/product/getbyId/${productId}`)
      .catch((err) => {
        console.log("Err ", err);
      });

    dispatch({
      type: ActionTypes.GET_SELECTED_PRODUCT,
      payload: response.data.product,
    });
  };
};

export const removeSelectedProduct = () => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_SELECTED_PRODUCT,
    });
  };
};
