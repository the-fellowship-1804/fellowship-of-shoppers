import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/allProducts";
import { withRouter, Link } from "react-router-dom";

const [UNASKED, LOADING, LOADED, ERROR] = [
  "UNASKED",
  "LOADING",
  "LOADED",
  "ERROR"
];

const ProductCard = props => (
  <div key={props.product.id}>
    {
      <Link to={`/products/${props.product.id}`}>
        <img src={props.product.productImageUrl} />
        <p>{props.product.productName}</p>
      </Link>
    }
    <p>{props.product.price ? props.product.price : "Free"}</p>
  </div>
);

export default ProductCard;
