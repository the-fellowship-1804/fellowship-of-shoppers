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
  constructor() {
    super();
    this.state = {
      quantity: 1
    };
  }
  componentDidMount() {
    this.props.getProducts();
  }

  handleClick = () => {
    const product = this.props.products.find(
      indivProduct => indivProduct.id == this.props.match.params.productId
    );
    this.props
      .addToCart(this.props.user.id, product, this.state.quantity)
      .then(this.props.history.push('/cart'))
      .catch(err => console.log(err));
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: !event.target.value ? '' : event.target.value * 1
    });
  };

  render() {
    const product = this.props.products.find(
      product => product.id == this.props.match.params.productId
    );
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
            <p> this should be here </p>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              name="quantity"
              step="1"
              min="1"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <button
              type="button"
              onClick={this.handleClick}
              disabled={!this.state.quantity}
            >
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
    products: state.allProducts.products,
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
