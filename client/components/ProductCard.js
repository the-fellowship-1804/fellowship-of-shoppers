import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../store/allProducts';
import { withRouter, Link } from 'react-router-dom';

const [UNASKED, LOADING, LOADED, ERROR] = [
  'UNASKED',
  'LOADING',
  'LOADED',
  'ERROR'
];

const ProductCard = props => (
  <div key={props.product.id}>
    {
      <div className="singleproductcard centercontainer">
        <h2>{props.product.productName}</h2>
        <p>Price: {props.product.price ? props.product.price : '0'} Credits</p>
        <Link to={`/products/${props.product.id}`}>
          <img src={props.product.productImageUrl} />
        </Link>
      </div>
    }
  </div>
);

export default ProductCard;
