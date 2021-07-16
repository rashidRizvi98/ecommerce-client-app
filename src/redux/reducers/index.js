import { combineReducers } from "redux";
import { getAddressReducer } from "./addressReducer";
import { brandReducer, selectedBrandReducer } from "./brandReducer";
import { getCartReducer } from "./cartReducer";
import { selectedProductReducer } from "./productReducer";
import { signinReducer } from "./signinReducer";
import { signupReducer } from "./signupReducer";

const reducers = combineReducers({
  allBrands: brandReducer,
  selectedBrand: selectedBrandReducer,
  selectedProduct: selectedProductReducer,
  signup: signupReducer,
  auth: signinReducer,
  getCart: getCartReducer,
  getAddresses: getAddressReducer,
});

export default reducers;
