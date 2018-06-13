import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../store/allProducts';
import { withRouter, Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const [UNASKED, LOADING, LOADED, ERROR] = [
  'UNASKED',
  'LOADING',
  'LOADED',
  'ERROR'
];

class Landing extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    switch (this.props.status) {
      case UNASKED: {
        return <p>we dont want this</p>;
      }
      case LOADING: {
        return <p>LOADING...</p>;
      }
      case LOADED: {
        const deathStar = this.props.products.find(ship => {
          return ship.name === 'The Death Star';
        });
        if (!deathStar) {
          return (
            <div>
              <div className="mainlanding">
                <h1 className="header1">Welcome to the StarShip Depot</h1>
              </div>
              <div className="centercontainer">
                <img id="landingimage" src="https://i.gifer.com/7U5F.gif" />
              </div>
              <div className="centercontainer">
                <h4>A message from the Dealers....</h4>
                <p>
                  The galaxy awaits! Choose a ship and let the journey begin!
                </p>
                <p className="small">
                  Disclaimer: All sales are final. Used items are sold in "as
                  is" condition. Vendor is not liable for malfunctioning parts
                  or sudden ejection into space. Exhaust port covers from
                  third-party sellers are HIGHLY recommended.
                </p>
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <div className="mainlanding">
                <h1 className="header1">Welcome to the StarShip Depot</h1>
              </div>
              <div className="centercontainer">
                <h2 id="sale">FLASH SALE!</h2>
                <ProductCard product={deathStar} />
              </div>
              <div className="centercontainer">
                <h4>A message from the Dealers....</h4>
                <p>
                  The galaxy awaits! Choose a ship and let the journey begin!
                </p>
                <p className="small">
                  Disclaimer: All sales are final. Used items are sold in "as
                  is" condition. Vendor is not liable for malfunctioning parts
                  or sudden ejection into space. Exhaust port covers from
                  third-party sellers are HIGHLY recommended.
                </p>
              </div>
            </div>
          );
        }
      }
      default: {
        return <div>Mistakes were made</div>;
      }
    }
  }
}

const mapSTP = state => {
  return {
    products: state.allProducts.products,
    status: state.allProducts.status
  };
};

const mapDTP = { getProducts };

export default withRouter(
  connect(
    mapSTP,
    mapDTP
  )(Landing)
);
