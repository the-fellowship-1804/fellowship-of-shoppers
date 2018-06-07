import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = props => {
  return (
    <div className="centercontainer">
      <h2>{props.product.productName}</h2>
      <h4 id="price">
        Price: {props.product.price ? props.product.price : '0'} Credits
      </h4>
      <Link to={`/products/${props.product.id}`}>
        <img src={props.product.productImageUrl} />
      </Link>
    </div>
  );
};

export default ProductCard;
