import React from 'react';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';

import CheckoutAddress from './CheckoutAddress';
import CheckoutForm from './CheckoutForm';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.user.address
    };
  }

  handleChange = event => {
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

  render() {
    const totalPrice = this.props.user.id ? this.caluculateTotalPrice() : null;
    return (
      <div>
        <h3>Checkout</h3>
        <div>
          Your total is:{' '}
          {this.props.user.id ? `${totalPrice} Space Bucks` : 'Calculating...'}
        </div>
        <CheckoutAddress
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          address={this.state.address}
        />
        <Elements>
          <CheckoutForm
            price={totalPrice}
            user={this.props.user.id ? this.props.user : null}
          />
        </Elements>
        {this.props.user.id ? ( //this will have to be changed to accomodate for not-logged in users
          <div>
            <h3>Your items:</h3>
            {this.props.user.cart.length > 0 ? (
              this.props.user.cart.map(productObj => (
                <ul key={productObj.product.id}>
                  <h4>Name: {productObj.product.name}</h4>
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
