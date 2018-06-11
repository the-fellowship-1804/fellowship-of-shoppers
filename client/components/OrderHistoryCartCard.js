import React from 'react';
import shortid from 'shortid';

import OrderHistoryProductCard from './OrderHistoryProductCard';

const OrderHistoryCartCard = props => {
  const cart = props.cart;
  let totalPrice = 0;
  cart.forEach(productObj => {
    totalPrice += productObj.product.price * productObj.quantity;
  });
  return (
    <div>
      <h5>
        {`Order Number ${props.orderNumber}`}
        <br />
        {`Total cost ${totalPrice} credits`}
      </h5>
      {cart.map(productObj => (
        <OrderHistoryProductCard
          key={shortid.generate()}
          productObj={productObj}
        />
      ))}
    </div>
  );
};

export default OrderHistoryCartCard;
