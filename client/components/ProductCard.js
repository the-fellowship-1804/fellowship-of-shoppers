import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = props => {
  return (
    <div id="producttitle" className="productcentercontainer">
      <Link to={`/products/${props.product.id}`}>
        <h2 id="productname">{props.product.name}</h2>
      </Link>
      <Link to={`/products/${props.product.id}`}>
        <div className="crop">
          <img src={props.product.imageUrl} />
        </div>
      </Link>
      <h4 id="price">
        {props.product.price ? props.product.price : '0'} Space Bucks
      </h4>
    </div>
  );
};

export default ProductCard;
