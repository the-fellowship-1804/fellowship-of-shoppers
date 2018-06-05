import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/allProducts";
import { withRouter, Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const [UNASKED, LOADING, LOADED, ERROR] = [
  "UNASKED",
  "LOADING",
  "LOADED",
  "ERROR"
];

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const allProducts = this.props.products;
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
            <h1>All Products</h1>
            {allProducts.map(product => {
              return <ProductCard product={product} />;
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
