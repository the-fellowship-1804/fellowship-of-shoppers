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
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  handleChange(event) {
    console.dir(event.target)
    this.setState({
      filter: true,
      shipType: event.target.value,
    })
  }

  render() {
    const allProducts = this.state.filter
      ? this.props.products.filter(ship => ship.class === this.state.shipType || this.state.shipType === `All`)
      : this.props.products

    switch (this.props.status) {
      case UNASKED: {
        return <p>We don't want this</p>;
      }
      case LOADING: {
        return <p>LOADING...</p>;
      }
      case LOADED: {
        return (
          <div>
            <h1 id="allproductsheading">All Products {!this.state.shipType ? `` : `> ${this.state.shipType}`}</h1>

            <select id="filter" name="filter" onChange={this.handleChange}>

              <option value="All">{!this.state.shipType ? "Filter by Class" : "All"}
              </option>

              <option value="Space Stations">Space Stations</option>

              <option value="Starships">Starships</option>

              <option value="Freighters">Freighters</option>

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
    status: state.allProducts.status,
  };
};

const mapDTP = { getProducts };

export default withRouter(
  connect(
    mapSTP,
    mapDTP
  )(AllProducts)
);
