import axios from "axios";
import { ActionTypes } from "../constants/actionTypes";

export const getBrands = () => {
  return async (dispatch) => {
    const response = await axios
      .get("http://localhost:2000/api/brand/getbrands")
      .catch((err) => {
        console.log("Err ", err);
      });
    console.log(response);

    dispatch({
      type: ActionTypes.GET_BRANDS,
      payload: response.data.brands,
    });
  };
};

export const selectedBrand = (brandId) => {
  return async (dispatch) => {
    const response = await axios
      .get(`http://localhost:2000/api/product/getbybrand/${brandId}`)
      .catch((err) => {
        console.log("Err ", err);
      });

    console.log("selected products", response.data.products);
    dispatch({
      type: ActionTypes.SELECTED_BRAND,
      payload: response.data.products,
    });
  };
};

export const removeSelectedBrand = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_BRAND,
  };
};
