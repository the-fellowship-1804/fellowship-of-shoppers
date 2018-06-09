import React from 'react';
import { connect } from 'react-redux';
import CartCard from './CartCard';
import { removeFromCart } from '../store/singleUser';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {};
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
      <div>
        <h3>Cart</h3>
        <div>
          Your total is:{' '}
          {user.id
            ? `${this.caluculateTotalPrice()} space-cash`
            : 'Calculating...CHANGE THIS WHEN WE HANDLE VISITORS'}
        </div>
        <button
          type="button"
          onClick={this.handleClick}
          disabled={user.id ? user.cart.length === 0 : true}
        >
          Checkout!
        </button>
        {user.id
          ? user.cart.map(productObj => (
              <CartCard key={productObj.product.id} productObj={productObj} />
            ))
          : null}
      </div>
    );
  }
}

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
