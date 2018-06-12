import React from 'react';
import { connect } from 'react-redux';

const AdminProducts = props => {
  console.log(props.user.isAdmin);
  return (
    <div>
      <h1>EDITPRODUCTS</h1>
      <h1>EDITPRODUCTS</h1>
      <h1>EDITPRODUCTS</h1>
      <h1>EDITPRODUCTS</h1>
      <h1>EDITPRODUCTS</h1>
      <h1>EDITPRODUCTS</h1>
      <h1>EDITPRODUCTS</h1>
      <h1>EDITPRODUCTS</h1>
      <h1>EDITPRODUCTS</h1>
      <h1>EDITPRODUCTS</h1>
      <h1>EDITPRODUCTS</h1>
      <h1>EDITPRODUCTS</h1>
      <h1>EDITPRODUCTS</h1>
      <h1>EDITPRODUCTS</h1>
    </div>
  );
};

const mapSTP = state => ({
  user: state.singleUser,
  products: state.allProducts
});

export default connect(
  mapSTP,
  null
)(AdminProducts);
