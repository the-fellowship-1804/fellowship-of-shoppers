import React from 'react';
import shortid from 'shortid';

import OrderHistoryCartCard from './OrderHistoryCartCard';

const OrderHistory = props => {
  return (
    <div>
      <h4>Order History: </h4>
      {props.user.orderHistory.length > 0 ? (
        props.user.orderHistory.map((cart, index) => {
          return (
            <OrderHistoryCartCard
              key={shortid.generate()}
              cart={cart}
              orderNumber={props.user.orderHistory.length - index}
            />
          );
        })
      ) : (
        <div>No orders</div>
      )}
    </div>
  );
};

export default OrderHistory;
