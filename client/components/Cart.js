import React from 'react';
import { connect } from 'react-redux';
import CartCard from './CartCard';
import { removeFromCart, addToCart } from '../store/singleUser';
import { findGuest } from '../store/singleUser';

class Cart extends React.Component {
  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.findGuest();
    }
  }

  handleClick = () => {
    this.props.history.push('/checkout');
  };

  caluculateTotalPrice = () => {
    let sum = 0;
    this.props.user.cart.forEach(productObj => {
      sum += productObj.product.price * productObj.quantity;
    });
    return sum;
  };

  render() {
    const user = this.props.user;
    return (
      <div id="cart">
        <div id="cartcheckout">
          <h3>Cart</h3>
          <div>
            Your total is:{' '}
            {user.id
              ? `${this.caluculateTotalPrice()} Space Cash`
              : '0 Space Cash'}
          </div>
          <button
            type="button"
            onClick={this.handleClick}
            disabled={user.id ? user.cart.length === 0 : true}>
            Checkout!
          </button>
        </div>
        <div id="cartitems">
          {user.id
            ? user.cart.map(productObj => (
                <CartCard key={productObj.product.id} productObj={productObj} />
              ))
            : null}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.singleUser,
    isLoggedIn:
      !!state.singleUser.id &&
      state.singleUser.email.split('@')[1] !== 'guest.com'
  };
};

const mapProps = { removeFromCart, findGuest };

export default connect(
  mapState,
  mapProps
)(Cart);
