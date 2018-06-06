import React from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import { removeFromCart } from '../store/singleUser';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      checkedOut: false,
    };
  }

  handleClickRemove = (event, productId) => {
    const updatedCart = this.props.user.cart.filter(
      productObj => productObj.product.id !== productId
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
        {this.props.user.id
          ? this.props.user.cart.map((productObj, index) => (
              <ProductCard
                key={productObj.product.id}
                productObj={productObj}
                onCheckoutPage={true}
                handleClickRemove={this.handleClickRemove}
              />
            ))
          : null}
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
  };
};

const mapProps = { removeFromCart };

export default connect(
  mapState,
  mapProps
)(Checkout);
