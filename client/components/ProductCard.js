import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = props => {
  return (
    <div className="centercontainer">
      <Link to={`/products/${props.product.id}`}>
        <h2>{props.product.name}</h2>
      </Link>
      <h4 id="price">
        Price: {props.product.price ? props.product.price : '0'} Credits
      </h4>
      <Link to={`/products/${props.product.id}`}>
        <img src={props.product.imageUrl} />
      </Link>
    </div>
  );
};

export default ProductCard;
