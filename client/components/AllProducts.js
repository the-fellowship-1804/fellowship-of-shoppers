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

class AllProducts extends Component {
  constructor() {
    super();
    this.state = {
      filter: false,
      class: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  handleChange(event) {
    console.dir(event.target);
    this.setState({
      filter: true,
      class: event.target.value
    });
  }

  render() {
    const allProducts = this.state.filter
      ? this.props.products.filter(
          ship =>
            ship.class === this.state.class ||
            this.state.class === `All Product`
        )
      : this.props.products;

    switch (this.props.status) {
      case UNASKED: {
        return <p>Nothing has been asked for</p>;
      }
      case LOADING: {
        return <p>LOADING...</p>;
      }
      case LOADED: {
        return (
          <div>
            <h1 id="allproductsheading">
              All Products {!this.state.class ? `` : `> ${this.state.class}s`}
            </h1>

            <select id="filter" name="filter" onChange={this.handleChange}>
              <option value="All Product">
                {!this.state.class ? 'Filter by Class' : 'All'}
              </option>

              <option value="Space Station">Space Stations</option>

              <option value="Starship">Starships</option>

              <option value="Freighter">Freighters</option>

              <option value="Fighter">Fighters</option>
            </select>
            {allProducts.map(product => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        );
      }
      default: {
        return 'Nothing to see here';
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
  )(AllProducts)
);
