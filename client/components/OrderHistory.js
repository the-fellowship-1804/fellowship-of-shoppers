import React from 'react';
import ProductCard from './ProductCard';

const OrderHistory = props => {
  return (
    <div>
      <h2>{props.user.email}'s Order History: </h2>
      {props.productInfo.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default OrderHistory;
