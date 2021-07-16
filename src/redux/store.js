import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import reducers from "./reducers";

/* const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
); */

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["getCart", "getAddresses", "allBrands"], // which reducer want to store
};
const pReducer = persistReducer(persistConfig, reducers);
const middleware = applyMiddleware(thunk);
const store = createStore(pReducer, composeWithDevTools(middleware));
const persistor = persistStore(store);

export { persistor, store };
