import React from 'react';
import { connect } from 'react-redux';

import { removeFromCart } from '../store/singleUser';

class SingleUser extends React.Component {
  constructor() {
    super();
    this.state = {
      checkedOut: false
    };
  }

  handleClickRemove = (event, productId) => {
    const updatedCart = this.props.user.cart.filter(
      product => product.id !== productId
    );
    this.props.removeFromCart(this.props.user.id, updatedCart);
  };

  handleCheckout = () => {
    //some bs to actually check the person out:
    //charge their card
    //add their cart's contents to their ordered history
    //clear their cart
    //redirect them somewhere? => place to enter payment info/address with options to use default?
    //check if they have a valid address and payment method when the rest works
    //
  };

  render() {
    return (
      <div>
        <h3>Checkout</h3>
        <button type="button" onClick={this.handleCheckout}>
          Checkout!
        </button>
        <button onClick={this.handleClick} type="button">
          Show Order History
        </button>
        {this.state.displayHistory ? (
          <OrderHistory
            productInfo={this.state.productInfo}
            user={this.props.user}
          />
        ) : null}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.singleUser,
    allProducts: state.allProducts
  };
};

const mapProps = { getProducts, removeFromCart };

export default connect(
  mapState,
  mapProps
)(SingleUser);
