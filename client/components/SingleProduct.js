import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../store/allProducts';
import { addToCart } from '../store/singleUser';
import { withRouter, Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { findGuest } from '../store/singleUser';
import SingleProductSpecs from './SingleProductSpecs';

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
      quantity: 1,
      addedtoCart: false
    };
  }
  componentDidMount() {
    this.props.getProducts();
    if (!this.props.isLoggedIn) this.props.findGuest();
  }

  handleClick = async () => {
    const product = this.props.products.find(
      indivProduct => indivProduct.id == this.props.match.params.productId
    );
    try {
      console.log(this.props.user);
      this.props.history.push('/cart');
      await this.props.addToCart(
        this.props.user.id,
        product,
        this.state.quantity
      );
      this.setState({
        addedtoCart: true
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: !event.target.value ? '' : event.target.value * 1
    });
  };

  render() {
    const product = this.props.products.find(
      product => product.id === Number(this.props.match.params.productId)
    );
    switch (this.props.status) {
      case UNASKED: {
        return <p>Nothing has been asked for</p>;
      }
      case LOADING: {
        return <p>LOADING...</p>;
      }
      case LOADED: {
        return (
          <div className="centercontainer">
            <div className="rowcontainerproduct">
              <div id="singleproductcard">
                <ProductCard product={product} />
              </div>
              <div />
              <SingleProductSpecs product={product} />
            </div>
            <div id="single-product-description">
              <p id="single-product-description-p">{product.description}</p>
            </div>
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
              disabled={!this.state.quantity}>
              Add to cart
            </button>
            <div>
              {this.state.addedtoCart ? (
                <div>
                  <h3>Added to Cart!</h3>
                  <Link to="/cart">
                    <button type="button">Proceed to Checkout?</button>
                  </Link>
                </div>
              ) : null}
            </div>
            <Link to="/products">
              <button type="button">Back to All Products</button>
            </Link>
          </div>
        );
      }
      default: {
        return 'Nothing selected';
      }
    }
  }
}

const mapSTP = state => {
  return {
    products: state.allProducts.products,
    status: state.allProducts.status,
    user: state.singleUser,
    isLoggedIn:
      !!state.singleUser.id &&
      state.singleUser.email.split('@')[1] !== 'guest.com'
  };
};

const mapDTP = { getProducts, addToCart, findGuest };

export default withRouter(
  connect(
    mapSTP,
    mapDTP
  )(SingleProduct)
);
