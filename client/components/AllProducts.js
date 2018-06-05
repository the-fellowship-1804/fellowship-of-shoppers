import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../store/allProducts'
import { withRouter, Link } from "react-router-dom";

const [UNASKED, LOADING,  LOADED, ERROR] = [
  "UNASKED",
  "LOADING",
  "LOADED",
  "ERROR"
]

class AllProducts extends Component {

  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const allProducts = this.props.products;
    switch(this.props.status) {
      case UNASKED: {
        return <p>we dont want this</p>
      }
      case LOADING: {
        return <p>LOADING...</p>
      }
      case LOADED: {
        return (
          <div>
            <h1>All Products</h1>
              {
                allProducts.map((product) => {
                  return (
                    <div key={product.id}>
                       {
                      <Link to={`/products/${product.id}`}>
                         <img src={product.productImageUrl} />
                         <p>{product.productName}</p>
                      </Link>
                       }
                       <p>{product.price ? product.price : 'Free'}</p>
                    </div>
                  )
                })
              }
          </div>
        )
      }
    }
  }
}

const mapSTP = (state) => {
  return {
    products: state.allProducts.products,
    status: state.allProducts.status
  }
}

const mapDTP = { getProducts }

export default withRouter(connect(mapSTP, mapDTP)(AllProducts));
