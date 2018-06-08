import React from 'react';
import { connect } from 'react-redux';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      paymentInfo: {}
    };
  }

  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://checkout.stripe.com/checkout.js';
    script.async = true;
    script.className = 'stripe-button';
    script.dataset.key = 'pk_test_1BGAQuuZplpLNN1Y5QC5V08o';
    script.dataset.amount = 99;
    script.dataset.currency = 'usd';
    script.dataset.name = 'The Starship Depot';
    script.dataset.locale = 'auto';
    document.getElementById('stripe-form').appendChild(script);
    console.log(script);
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

  handleSubmit = event => {
    event.preventDefault();
    //should unshift the cart into their order history and clear the cart in both DB model and store-state
    //and redirect them to confirmation page
  };

  //where they can put in/edit their payment and shipping info and actually buy the item

  caluculateTotalPrice = () => {
    let sum = 0;
    this.props.user.cart.forEach(productObj => {
      sum += productObj.product.price * productObj.quantity;
    });
    return sum;
  };

  render() {
    console.log(this.props);
    console.log(this.state);
    const totalPrice = this.props.user.id ? this.caluculateTotalPrice() : null;
    return (
      <div>
        <h3>Checkout</h3>
        <div>
          Your total is:{' '}
          {this.props.user.id ? `${totalPrice} space-cash` : 'Calculating...'}
        </div>
        {/* ALL THE INFO FOR PAYMENT INFO, ADDRESS */}
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <label htmlFor="address">Address:</label>
          <input type="text" name="address" value={this.state.address} />
          <label htmlFor="paymentInfo">Payment Information:</label>
          <input
            type="text"
            name="paymentInfo"
            value={this.state.paymentInfo}
          />
        </form>
        {/*   <!-- this is copied from the Stripe checkout embed --> */}
        <form
          action={`/api/charge/${totalPrice}`}
          method="POST"
          id="stripe-form"
        />
        {/* <!-- end of Stripe embed --> */}
        {this.props.user.id ? (
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

export default connect(
  mapState,
  null
)(Checkout);
