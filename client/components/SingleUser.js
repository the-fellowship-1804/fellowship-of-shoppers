import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OrderHistory from './OrderHistory';

/**
 * COMPONENT
 */
class SingleUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayHistory: false
    };
  }

  handleClick = () => {
    this.setState({ displayHistory: true });
  };

  render() {
    const { email, imageUrl, address, orderHistory } = this.props.user;
    return (
      <div>
        <h3>Welcome, {email}</h3>
        <img src={imageUrl} />
        <h4>Your Address: {address}</h4>
        <button type="button">
          View Cart
          <Link to="/cart" />
        </button>
        <button onClick={this.handleClick} type="button">
          Show Order History
        </button>
        {this.state.displayHistory ? <OrderHistory user={this.props.user} /> : null}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  };
};

export default connect(mapState)(SingleUser);
