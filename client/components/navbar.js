import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          <ul>
            <Link to="/">Home</Link>
            <Link to="/products">All Products</Link>
            <Link to="/user">User Account</Link>
          </ul>
          <ul>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/cart">Cart</Link>
          </ul>
        </div>
      ) : (
        <div>
          <Link to="/">Home</Link>
          <Link to="/products">All Products</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart</Link>
        </div>
      )}
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.singleUser.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
