import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../store/allProducts';
import { withRouter, Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const [UNASKED, LOADING, LOADED, ERROR] = [
  'UNASKED',
  'LOADING',
  'LOADED',
  'ERROR'
];

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const allProducts = this.props.products;
    switch (this.props.status) {
      case UNASKED: {
        return <p>We don't want this</p>;
      }
      case LOADING: {
        return <p>LOADING...</p>;
      }
      case LOADED: {
        return (
          <div>
            <h1 id="allproductsheading">All Products</h1>
            <select id="filter" name="filter">
              <option selected="selected" disabled="true">
                Filter By Class
              </option>
              <option value="SpaceStation">Space Stations</option>
              <option value="Capital">Capital Class</option>
              <option value="Freighter">Freighters</option>
              <option value="Fighter">Fighters</option>
            </select>
            {allProducts.map(product => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        );
      }
    }
  }
}

const mapSTP = state => {
  return {
    products: state.allProducts.products,
    status: state.allProducts.status
  };
};

const mapDTP = { getProducts };

export default withRouter(
  connect(
    mapSTP,
    mapDTP
  )(AllProducts)
);
