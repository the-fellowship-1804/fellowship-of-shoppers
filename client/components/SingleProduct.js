import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../store/allProducts';
import { addToCart } from '../store/singleUser';
import { withRouter, Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const [UNASKED, LOADING, LOADED, ERROR] = [
  'UNASKED',
  'LOADING',
  'LOADED',
  'ERROR'
];

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  handleClick = () => {
    const updatedCart = [
      ...this.props.user.cart,
      this.props.match.params.productId
    ];
    this.props
      .addToCart(this.props.user.id, updatedCart)
      .catch(err => console.log(err));
  };

  render() {
    const product = this.props.product;
    switch (this.props.status) {
      case UNASKED: {
        return <p>we dont want this</p>;
      }
      case LOADING: {
        return <p>LOADING...</p>;
      }
      case LOADED: {
        return (
          <div>
            <h1>Single Product</h1>
            <ProductCard product={product} />
            <ul id="single-product-unordered-list">
              {product.weight ? (
                <li id="single-product-weight">Weight: {product.weight}</li>
              ) : (
                ''
              )}
              <li id="single-product-height"> Height: {product.height} </li>
              <li id="single-product-width">Width: {product.width}</li>
              <li id="single-product-length">Length: {product.depth}</li>
              <li id="single-product-topSpeed">
                Top Speed: {product.topSpeed}
              </li>
              <li id="single-product-acceleration">
                Acceleration: {product.acceleration}
              </li>
              <li id="single-product-class">Class: {product.class}</li>
            </ul>
            <div id="single-product-description">
              <h6>Description</h6>
              <p id="single-product-description-p">
                {product.productDescription}
              </p>
            </div>
            <Link to="/products">
              <button type="button">back to the future~~</button>
            </Link>
            <button type="button" onClick={this.handleClick}>
              Add to cart
            </button>
          </div>
        );
      }
      default:
        return <div> sorry man; mistakes were made </div>;
    }
  }
}

const mapSTP = state => {
  return {
    product: state.allProducts.products.find(
      product => product.id == this.props.match.params.productId
    ),
    status: state.allProducts.status,
    user: state.singleUser
  };
};

const mapDTP = { getProducts, addToCart };

export default withRouter(
  connect(
    mapSTP,
    mapDTP
  )(SingleProduct)
);
