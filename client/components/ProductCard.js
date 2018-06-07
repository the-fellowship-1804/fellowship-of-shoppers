import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = props => {
  return (
    <div>
      {
        <Link to={`/products/${props.product.id}`}>
          <img src={props.product.productImageUrl} />
          <p>{props.product.productName}</p>
        </Link>
      }
      <p>Price: {props.product.price ? props.product.price : 'Free'}</p>
    </div>
  );
};

export default ProductCard;
