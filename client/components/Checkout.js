import React from 'react';
import { connect } from 'react-redux';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleClick = () => {
    //should unshift the cart into their order history and clear the cart in both DB model and store-state
    //and redirect them to singleuser page
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
    return (
      <div>
        <h3>Checkout</h3>
        <div>
          Your total is:{' '}
          {this.props.user.id
            ? `${this.caluculateTotalPrice()} space-cash`
            : 'Calculating...'}
        </div>
        <button type="button" onClick={this.handleClick}>
          Place Order
        </button>
        {this.props.user.id ? (
          <div>
            <h3>Your items:</h3>
            {this.props.user.cart.length > 0 ? (
              this.props.user.cart.map(productObj => (
                <ul key={productObj.product.id}>
                  <h4>{productObj.product.name}</h4>
                  <h4>{productObj.product.price}</h4>
                  <h4>{productObj.quanitity}</h4>
                  <h4>{productObj.product.price * productObj.quanitity}</h4>
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
)(Cart);
