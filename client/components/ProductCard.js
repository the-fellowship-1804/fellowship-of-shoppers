import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = props => {
  return (
    <div className="centercontainer">
      <Link to={`/products/${props.product.id}`}>
        <h2>{props.product.productName}</h2>
      </Link>
      <Link to={`/products/${props.product.id}`}>
        <img src={props.product.productImageUrl} />
      </Link>
      <h4 id="price">
        {props.product.price ? props.product.price : '0'} Space Bucks
      </h4>
    </div>
  );
};

export default ProductCard;
