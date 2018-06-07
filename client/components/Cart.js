import React from 'react';
import { connect } from 'react-redux';
import CheckoutCard from './CheckoutCard';
import { removeFromCart } from '../store/singleUser';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleClick = () => {
    //redirect user to a checkout component
    //where they can put in/edit their payment and shipping info and actually buy the item
    //buying the item should unshift the cart into their order history and clear the cart in both DB model and store-state
  };

  caluculateTotalPrice = () => {
    let sum = 0;
    this.props.user.cart.forEach(productObj => {
      sum += productObj.product.price * productObj.quantity;
    });
    return sum;
  };

  render() {
    return (
      <div>
        <h3>Cart</h3>
        <div>
          Your total is:{' '}
          {this.props.user.id
            ? `${this.caluculateTotalPrice()} space-cash`
            : 'Calculating...'}
        </div>
        <button type="button" onClick={this.handleClick}>
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
)(Cart);
