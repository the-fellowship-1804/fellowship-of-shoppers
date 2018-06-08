import React from 'react';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';

import CheckoutForm from './CheckoutForm';

import { checkOut } from '../store/singleUser';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ''
    };
  }

  UNSAFE_componentWillReceiveProps(incomingProps) {
    this.setState({
      address: incomingProps.user.address
    });
  }

  handleChange = event => {
    console.log(event.target.name, event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  caluculateTotalPrice = () => {
    let sum = 0;
    this.props.user.cart.forEach(productObj => {
      sum += productObj.product.price * productObj.quantity;
    });
    return sum;
  };

  handleSubmit = event => {
    event.preventDefault();
    const updatedOrderHistory = [
      this.props.user.cart,
      ...this.props.user.orderHistory
    ];
    this.props.checkOut(this.props.user.id, updatedOrderHistory);
    console.log('reached');
  };

  render() {
    const totalPrice = this.props.user.id ? this.caluculateTotalPrice() : null;
    return (
      <div>
        <h3>Checkout</h3>
        <div>
          Your total is:{' '}
          {this.props.user.id ? `${totalPrice} space-cash` : 'Calculating...'}
        </div>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <label htmlFor="address">Address:</label>
          <input type="text" name="address" value={this.state.address} />
          <button type="submit">TESTING BUTTON</button>
        </form>
        {/* <Elements>
          <CheckoutForm
            price={totalPrice}
            user={this.props.user.id ? this.props.user : null}
            checkout={this.props.checkout}
          />
        </Elements> */}
        {this.props.user.id ? ( //this will have to be changed to accomodate for not-logged in users
          <div>
            <h3>Your items:</h3>
            {this.props.user.cart.length > 0 ? (
              this.props.user.cart.map(productObj => (
                <ul key={productObj.product.id}>
                  <h4>Name: {productObj.product.productName}</h4>
                  <h4>Price per ship: {productObj.product.price}</h4>
                  <h4>Number of ships: {productObj.quantity}</h4>
                  <h4>
                    Total: {productObj.product.price * productObj.quantity}
                  </h4>
                </ul>
              ))
            ) : (
              <div> no items </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.singleUser
  };
};

const mapDispatch = dispatch => ({
  checkOut: (userId, orderHistory) => dispatch(checkOut(userId, orderHistory))
});

export default connect(
  mapState,
  mapDispatch
)(Checkout);
