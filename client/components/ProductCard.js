import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../store/allProducts';
import { withRouter, Link } from 'react-router-dom';

const [UNASKED, LOADING, LOADED, ERROR] = [
  'UNASKED',
  'LOADING',
  'LOADED',
  'ERROR',
];

const ProductCard = props => {
  const product = props.productObj ? props.productObj.product : props.product;
  return (
    <div>
      {
        <Link to={`/products/${product.id}`}>
          <img src={product.productImageUrl} />
          <p>{product.productName}</p>
        </Link>
      }
      <p>Price: {product.price ? product.price : 'Free'}</p>
      {props.onCheckoutPage ? (
        <div>
          <div>Quantity: {props.productObj.quantity} </div>
          <button
            type="button"
            onClick={event => props.handleClickRemove(event, product.id)}
            //passed in from Checkout
          >
            Remove from Cart
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ProductCard;
