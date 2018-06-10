import React from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { connect } from 'react-redux';
import axios from 'axios';

import { checkOut } from '../store/singleUser';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      awaitingPayment: true,
      error: false
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const user = this.props.user;
    const updatedOrderHistory = [user.cart, ...user.orderHistory];
    try {
      const stripeToken = await this.props.stripe.createToken({
        type: 'card',
        name: user.email
      });
      await axios.post(`/api/charge/${this.props.price}`, {
        stripeTokenId: stripeToken.token.id
      });
      await this.props.checkOut(this.props.user.id, updatedOrderHistory);
      this.setState({
        awaitingPayment: false
      });
    } catch (error) {
      console.log(error);
      this.setState({
        awaitingPayment: false,
        error
      });
    }
  };

  render() {
    if (this.props.user.cart && this.props.user.cart.length === 0) {
      return null;
    } else if (this.state.awaitingPayment) {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Card details
            <CardElement />
          </label>
          <button type="submit">Pay now</button>
        </form>
      );
    } else if (this.state.error) {
      return <h4>{`Error: ${this.state.error}`}</h4>;
    } else {
      return <h4>Payment Recieved!</h4>;
    }
  }
}

const mapState = state => ({
  user: state.singleUser
});

const mapDispatch = dispatch => ({
  checkOut: (userId, orderHistory) => dispatch(checkOut(userId, orderHistory))
});

export default injectStripe(
  connect(
    mapState,
    mapDispatch
  )(CheckoutForm)
);
