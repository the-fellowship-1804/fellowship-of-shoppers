import React from 'react';
import { Link } from 'react-router-dom';

const OrderHistoryProductCard = props => {
  const product = props.productObj.product;
  const quantity = props.productObj.quantity;
  return (
    <div>
      <Link to={`/products/${product.id}`}>
        <div>{`${product.productName}, ${quantity}`}</div>
      </Link>
      <div>Price: {product.price ? product.price : '0'} Credits</div>
    </div>
  );
};

export default OrderHistoryProductCard;
