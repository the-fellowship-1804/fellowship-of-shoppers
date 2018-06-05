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

const gotProducts = (products) => ({
  type: LOADED,
  products
})

const errorProducts = (error) => ({
  type: ERROR,
  error
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
    case LOADED:
      return ({
        ...state,
        products: action.products,
        status: LOADED
      })
    default: state
  }
}
