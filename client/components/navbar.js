import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div className="rowcontainer">
          <div className="navlinks">
            <Link to="/">Home</Link>
            <Link to="/products">All Products</Link>
          </div>
          {isAdmin ? (
            <div className="navlinks">
              <Link to="/editproducts">Edit Products</Link>
              <Link to="/editusers">Edit Users</Link>
            </div>
          ) : null}
          <div className="navlinks">
            <Link to="/user">Your Account</Link>
            <Link to="/" onClick={handleClick}>
              Logout
            </Link>
            <Link to="/cart">Cart</Link>
          </div>
        </div>
      ) : (
        <div className="rowcontainer">
          <div className="navlinks">
            <Link to="/">Home</Link>
            <Link to="/products">All Products</Link>
          </div>
          {/* The navbar will show these links before you log in */}
          <div className="navlinks">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart</Link>
          </div>
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
    isLoggedIn:
      !!state.singleUser.id &&
      state.singleUser.email.split('@')[1] !== 'guest.com',
    isAdmin: state.singleUser.isAdmin
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
