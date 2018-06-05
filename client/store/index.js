import { createStore, combineReducers, applyMiddleware } from "redux";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import singleUser from "./singleUser.js";
import singleProduct from "./singleProduct.js";
import allProducts from "./allProducts.js";

const reducer = combineReducers({ singleUser, allProducts, singleProduct });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
