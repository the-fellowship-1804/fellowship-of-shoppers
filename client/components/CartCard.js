import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { addToCart, removeFromCart } from '../store/singleUser';

class CartCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desiredQuantity: this.props.productObj.quantity
    };
  }

  handleChange = event => {
    if ((event.target.value + '')[0] === '0' && event.target.value.length > 1) {
      this.setState({
        [event.target.name]: event.target.value.slice(1)
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value * 1
      });
    }
  };

  remover = () => {
    const updatedCart = this.props.user.cart.filter(
      productObj => productObj.product.id !== this.props.productObj.product.id
    );
    this.props.removeFromCart(this.props.user.id, updatedCart);
  };

  handleClickRemove = () => {
    this.remover();
  };

  handleClickQuantity = async event => {
    if (this.state.desiredQuantity == '0') {
      this.remover();
    } else {
      await this.props.addToCart(
        this.props.user.id,
        this.props.productObj.product,
        this.state.desiredQuantity - this.props.productObj.quantity
      );
    }
  };

  render() {
    const product = this.props.productObj.product;
    return (
      <div>
        {
          <Link to={`/products/${product.id}`}>
            <img src={product.productImageUrl} />
            <p>{product.productName}</p>
          </Link>
        }
        <p>Price: {product.price ? product.price : 'Free'}</p>
        <div>Quantity: {this.props.productObj.quantity} </div>
        <label htmlFor="desiredQuantity">Change quantity:</label>
        <input
          type="number"
          name="desiredQuantity"
          step="1"
          min="0"
          value={this.state.desiredQuantity}
          onChange={this.handleChange}
        />
        <button
          type="button"
          onClick={this.handleClickQuantity}
          disabled={this.state.desiredQuantity < 0}>
          Change Quantity
        </button>
        <button
          type="button"
          onClick={event => this.handleClickRemove(event, product.id)}>
          Remove from Cart
        </button>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.singleUser
});

const mapDispatch = dispatch => ({
  addToCart: (userId, product, quantity) =>
    dispatch(addToCart(userId, product, quantity)),
  removeFromCart: (userId, cart) => dispatch(removeFromCart(userId, cart))
});

export default connect(
  mapState,
  mapDispatch
)(CartCard);
