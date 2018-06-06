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
          return ship.productName === 'the Death Star';
        });

        return (
          <div>
            <div>
              <h1>Welcome!</h1>
              <h3>Let's buy some starships!</h3>
              <img src="http://cdn2us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2016/10/chewbacca.jpeg?itok=sfDLqR8A" />
            </div>
            <div>
              <h2>FLASH SALE!</h2>
              <ProductCard product={deathStar} />
            </div>
            <h6>A message from the Dealers....</h6>
            <p>
              Chris is happy and calm. The sky is blue, the stars are shining,
              and the galaxy awaits. Choose a ship and let the journey begin!
              *wink*!
            </p>
          </div>
        );
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
