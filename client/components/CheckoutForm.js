import React from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      awaitingPayment: true,
      error: false
    };
  }

  //should unshift the cart into their order history and clear the cart in both DB model and store-state
  //and redirect them to confirmation page
  //where they can put in/edit their payment and shipping info and actually buy the item

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const stripeToken = await this.props.stripe.createToken({
        type: 'card',
        name: this.props.customer
      });
      await axios.post(`/api/charge/${this.props.price}`, {
        stripeTokenId: stripeToken.token.id
      });
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
    if (this.state.awaitingPayment) {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Card details
            <CardElement />
          </label>
          <button>Pay now</button>
        </form>
      );
    } else if (this.state.error) {
      return <h4>{`Error: ${this.state.error}`}</h4>;
    } else {
      return <h4>Payment Recieved!</h4>;
    }
  }
}

export default injectStripe(CheckoutForm);
