import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  SingleUser,
  Landing,
  AllProducts,
  SingleProduct,
  Cart,
  Checkout,
  EditUser,
  AdminProducts,
  AdminUsers
} from './components';
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Landing} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:productId" component={SingleProduct} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />

        {isAdmin ? (
          <Switch>
            {/* Routes placed here are only available to admins */}
            <Route exact path="/editproducts" component={AdminProducts} />
            <Route exact path="/editusers" component={AdminUsers} />
            <Route exact path="/user" component={SingleUser} />
            <Route exact path="/editAccount" component={EditUser} />
          </Switch>
        ) : isLoggedIn ? (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/user" component={SingleUser} />
            <Route exact path="/editAccount" component={EditUser} />
          </Switch>
        ) : null}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.singleUser.id,
    isAdmin: state.singleUser.isAdmin
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
