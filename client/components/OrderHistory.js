import React from 'react';
import { Link } from 'react-router-dom';

const OrderHistory = (props) => {
  const { email, orderHistory } = props.user;
  return (
    <h2>{email}'s Order History: </h2>
  )
}

export default OrderHistory;
