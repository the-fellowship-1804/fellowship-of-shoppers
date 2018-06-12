import React from 'react';

const CheckoutAddress = props => {
  const { address, handleChange, handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="address">Address:</label>
      <input
        onChange={handleChange}
        type="text"
        name="address"
        value={address ? address : ''}
      />
    </form>
  );
};

export default CheckoutAddress;
