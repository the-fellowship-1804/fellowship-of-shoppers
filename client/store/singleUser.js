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

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () => dispatch =>
  axios
    .get('/auth/me')
    // .then(data => {console.log(data); return data})
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err));

export const auth = (email, password, method) => dispatch =>
  axios
    .post(`/auth/${method}`, { email, password })
    .then(
      res => {
        dispatch(getUser(res.data));
        history.push('/home');
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

export const addToCart = (userId, product, quantity = 1) => async dispatch => {
  const productObj = { product, quantity };
  try {
    await axios.put(`/api/users/${userId}`, { addProductToCart: productObj });
    dispatch(aCC(ADD_TO_CART, product));
  } catch (err) {
    console.log(err);
  }
};

export const removeFromCart = (userId, cart) => dispatch =>
  axios
    .put(`/api/users/${userId}`, { cart })
    .then(_ => {
      dispatch(aCC(REMOVE_FROM_CART, cart));
      console.log(cart);
    })
    .catch(err => console.log(err));
/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };
    case REMOVE_FROM_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
}
