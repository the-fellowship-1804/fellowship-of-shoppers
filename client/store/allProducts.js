import axios from 'axios';


const [UNASKED, LOADING,  LOADED, ERROR] = [
  "UNASKED",
  "LOADING",
  "LOADED",
  "ERROR"
]

const LOADING_PRODUCTS = "LOADING_PRODUCTS"
const loadingAllProducts = () => ({
  type: LOADING_PRODUCTS
})

const LOADED_PRODUCTS = "LOADED_PRODUCTS"
const gotProducts = (products) => ({
  type: LOADED_PRODUCTS,
  products
})
export const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingAllProducts())
      const { data } = await axios.get('api/products')
      dispatch(gotProducts(data))
    } catch (err) {
      dispatch(errorProducts(err))
    }
  }
}

const ERROR_PRODUCTS = "ERROR_PRODUCTS"
const errorProducts = (error) => ({
  type: ERROR_PRODUCTS,
  error
})
const initialState = {
  products: [],
  status: UNASKED
}

const allProductsRed = (state = initialState, action) => {
  switch(action.type) {
    case LOADING_PRODUCTS:
      return ({
        ...state,
        status: LOADING
      })
    case LOADED_PRODUCTS:
      return ({
        ...state,
        products: action.products,
        status: LOADED
      })
    case ERROR_PRODUCTS:
      return ({
        ...state,
        status: ERROR
      })
    default: return state
  }
}

export default allProductsRed;
