import axios from 'axios';
import { aCC } from './index.js';

const [UNASKED, LOADING, LOADED, ERROR] = [
  'UNASKED',
  'LOADING',
  'LOADED',
  'ERROR',
];

//Action types
const LOADING_PRODUCTS = 'LOADING_PRODUCTS';

const LOADED_PRODUCTS = 'LOADED_PRODUCTS';

const ERROR_PRODUCTS = 'ERROR_PRODUCTS';

export const getProducts = () => {
  return async dispatch => {
    try {
      dispatch(aCC(LOADING_PRODUCTS));
      const { data } = await axios.get('/api/products');
      dispatch(aCC(LOADED_PRODUCTS, data));
    } catch (err) {
      dispatch(aCC(ERROR_PRODUCTS, err));
    }
  };
};

const initialState = {
  products: [],
  status: UNASKED,
};

const allProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_PRODUCTS:
      return {
        ...state,
        status: LOADING,
      };
    case LOADED_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        status: LOADED,
      };
    case ERROR_PRODUCTS:
      return {
        ...state,
        status: ERROR,
      };
    default:
      return state;
  }
};

export default allProductsReducer;
