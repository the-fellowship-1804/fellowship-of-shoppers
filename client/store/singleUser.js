import axios from 'axios';
import history from '../history';
import { aCC } from '.';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const updateUser = userInfo => ({ type: UPDATE_USER, userInfo })

/**
 * THUNK CREATORS
 */
export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err));

export const auth = (email, password, method) => dispatch =>
  axios
    .post(`/auth/${method}`, { email, password })
    .then(
    res => {
      dispatch(getUser(res.data));
      history.push('/editAccount');
    },
    authError => {
      // rare example: a good use case for parallel (non-catch) error handler
      dispatch(getUser({ error: authError }));
    }
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser());
      history.push('/login');
    })
    .catch(err => console.log(err));

export const addToCart = (userId, product, quantity) => async dispatch => {
  const productObj = { product, quantity };
  try {
    await axios.put(`/api/users/${userId}`, { addProductToCart: productObj });
    dispatch(aCC(ADD_TO_CART, productObj));
  } catch (err) {
    console.log(err);
  }
};

const cartUpdate = (newProductObj, cart) => {
  const matchedProduct = cart.filter(
    productObj => productObj.product.id === newProductObj.product.id
  );
  if (!matchedProduct.length) {
    return [...cart, newProductObj];
  } else {
    return cart.map(productObj => {
      if (productObj.product.id === newProductObj.product.id) {
        return {
          ...productObj,
          quantity: productObj.quantity + newProductObj.quantity
        };
      } else {
        return productObj;
      }
    });
  }
};

export const removeFromCart = (userId, cart) => async dispatch => {
  try {
    await axios.put(`/api/users/${userId}`, { cart });
    dispatch(aCC(REMOVE_FROM_CART, cart));
  } catch (error) {
    console.log(error);
  }
};

export const editUser = (userId, userInfo) => async dispatch => {
  try {
    console.log('hello0ooooooo', userInfo)
    const { data } = await axios.put(`api/users/${userId}`, userInfo)
    console.log(data)
    dispatch(updateUser(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case ADD_TO_CART:
      return {
        ...state,
        cart: cartUpdate(action.payload, state.cart)
      };
    case REMOVE_FROM_CART:
      return { ...state, cart: action.payload };
    case UPDATE_USER:
      return { ...state, ...action.userInfo }
    default:
      return state;
  }
}
