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

class Landing extends Component {
  componentDidMount() {
    this.props.getProducts();

  }

  render() {
    const deathStar = this.props.products.find((ship) => {
      ship.productName === 'the Death Star'
    })

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
            <h1>FLASH SALE!</h1>
            <ProductCard product={deathStar} />
            <h6>A message from the Dealers....</h6>
              <p>Chris is happy and calm. The sky is blue, Matt wears cool socks, the stars are shining, and the galaxy awaits. Choose a ship and let the journey begin!</p>
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
  )(Landing)
);
