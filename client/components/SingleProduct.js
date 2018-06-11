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
      quantity: 1,
      addedtoCart: false
    };
  }
  componentDidMount() {
    this.props.getProducts();
  }

  handleClick = async () => {
    const product = this.props.products.find(
      indivProduct => indivProduct.id == this.props.match.params.productId
    );
    try {
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
          <div className="centercontainer">
            <div className="rowcontainerproduct">
              <div id="singleproductcard">
                <ProductCard product={product} />
              </div>
              <div>
                <ul id="single-product-unordered-list">
                  {product.class ? (
                    <li id="single-product-class">Class: {product.class}</li>
                  ) : (
                    ''
                  )}
                  {product.firepower ? (
                    <li id="single-product-firepower">
                      Firepower: {product.firepower}
                    </li>
                  ) : (
                    ''
                  )}
                  {product.crew ? (
                    <li id="single-product-crew">Crew: {product.crew}</li>
                  ) : (
                    ''
                  )}
                  {product.topSpeed ? (
                    <li id="single-product-topspeed">
                      Top Speed: {product.topSpeed}
                    </li>
                  ) : (
                    ''
                  )}
                  {product.acceleration ? (
                    <li id="single-product-acceleration">
                      Acceleration: {product.acceleration}
                    </li>
                  ) : (
                    ''
                  )}
                  {product.weight ? (
                    <li id="single-product-weight">Mass: {product.weight}</li>
                  ) : (
                    ''
                  )}
                  {product.length && product.width && product.depth ? (
                    <li id="single-product-dimensions">
                      Dimensions: {product.length}L x {product.width}W x{' '}
                      {product.depth}D
                    </li>
                  ) : (
                    ''
                  )}
                </ul>
              </div>
            </div>
            <div id="single-product-description">
              <h6>Description</h6>
              <p id="single-product-description-p">
                {product.productDescription}
              </p>
            </div>
            <Link to="/products">
              <button type="button">Back to All Products</button>
            </Link>
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
