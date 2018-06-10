import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OrderHistory from './OrderHistory';
import { getProducts } from '../store/allProducts';

class SingleUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayHistory: false
    };
  }

  async componentDidMount() {
    try {
      await this.props.getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  handleClick = () => {
    this.setState(prevState => ({
      displayHistory: !prevState.displayHistory
    }));
  };

  render() {
    const { email, imageUrl, address } = this.props.user;
    return (
      <div>
        <h3>Welcome, {email}</h3>
        <img src={imageUrl} />
        <h4>Your Address: {address}</h4>
        <Link to="/cart">
          <button type="button">View Cart</button>
        </Link>
        <Link to="/editAccount">
          <button type="button">Edit Info</button>
        </Link>
        <button type="button" onClick={this.handleClick}>
          Order History
        </button>
        {this.state.displayHistory ? (
          <OrderHistory user={this.props.user} />
        ) : null}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.singleUser,
    allProducts: state.allProducts
  };
};

const mapProps = { getProducts };

export default connect(
  mapState,
  mapProps
)(SingleUser);
