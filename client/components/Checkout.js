import React from 'react';
import { connect } from 'react-redux';
import CheckoutCard from './CheckoutCard';
import { removeFromCart } from '../store/singleUser';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleCheckout = () => {
    //some bs to actually check the person out:
    //charge their card
    //add their cart's contents to their ordered history
    //clear their cart
    //redirect them somewhere? => place to enter payment info/address with options to use default?
    //check if they have a valid address and payment method when the rest works
    //
  };

  caluculateTotalPrice = () => {
    let sum = 0;
    this.props.user.cart.forEach(productObj => {
      sum += productObj.product.price * productObj.quantity;
    });
    return sum;
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Checkout</h3>
        <div>
          Your total is:{' '}
          {this.props.user.id ? this.caluculateTotalPrice() : 'Calculating'}{' '}
          space-cash
        </div>
        <button type="button" onClick={this.handleCheckout}>
          Checkout!
        </button>
        {this.props.user.id
          ? this.props.user.cart.map(productObj => (
              <CheckoutCard
                key={productObj.product.id}
                productObj={productObj}
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
    user: state.singleUser
  };
};

const mapProps = { removeFromCart };

export default connect(
  mapState,
  mapProps
)(Checkout);
