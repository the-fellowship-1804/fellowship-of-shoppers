import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import OrderHistory from "./OrderHistory";
import { getProducts } from "../store/allProducts";

class SingleUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayHistory: false,
      productInfo: []
    };
  }

  componentDidMount() {
    console.log(this.props);
    console.log(this.state);
    this.props.getProducts().catch(err => console.log(err));
  }

  handleClick = () => {
    this.setState({ displayHistory: true });
    const tempProductInfo = this.state.props.allProducts.products.filter(
      product => this.state.props.user.OrderHistory.includes(product.id)
    );
    this.setState({
      productInfo: tempProductInfo
    });
  };

  render() {
    const { email, imageUrl, address } = this.props.user;
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
        {this.state.displayHistory ? (
          <OrderHistory
            productInfo={this.state.productInfo}
            user={this.props.user}
          />
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
