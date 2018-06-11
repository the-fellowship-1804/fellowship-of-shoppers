import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = props => {
  return (
    <div id="producttitle" className="centercontainer">
      <Link to={`/products/${props.product.id}`}>
        <h2 id="productname">{props.product.name}</h2>
      </Link>
      <Link to={`/products/${props.product.id}`}>
        <img src={props.product.imageUrl} />
      </Link>
      <h4 id="price">
        {props.product.price ? props.product.price : '0'} Space Bucks
      </h4>
    </div>
  );
};

export default ProductCard;
