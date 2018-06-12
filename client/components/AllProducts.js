import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../store/allProducts';
import { withRouter, Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Filters from './AllProductsFilters';
import Sort from './AllProductsSort';

const [UNASKED, LOADING, LOADED, ERROR] = [
  'UNASKED',
  'LOADING',
  'LOADED',
  'ERROR'
];

export class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
      class: 'All',
      sort: 'byname'
    };
    this.applyFilter = this.applyFilter.bind(this);
    this.applySort = this.applySort.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  applyFilter(event) {
    this.setState({
      ...this.state,
      filter: true,
      class: event.target.value
    });
    if (event.target.value === 'All') this.setState({ filter: false });
  }

  applySort(event) {
    this.setState({ sort: event.target.value });
  }

  render() {
    let allProducts = this.state.filter
      ? this.props.products.filter(
          ship => ship.class === this.state.class || this.state.class === `All`
        )
      : this.props.products;

    if (this.state.sort === 'byname') {
      allProducts = allProducts.sort((ObjA, ObjB) => {
        const nameA = ObjA.name,
          nameB = ObjB.name;
        if (nameA < nameB) return -1;
        if (nameB < nameA) return 1;
        return 0;
      });
    }

    if (this.state.sort === 'byfirepower') {
      allProducts = allProducts.sort((ObjA, ObjB) => {
        const fireA = ObjA.firepower,
          fireB = ObjB.firepower;
        if (fireA < fireB) return 1;
        if (fireB < fireA) return -1;
        return 0;
      });
    }

    if (this.state.sort === 'bypricehightolow') {
      allProducts = allProducts.sort((ObjA, ObjB) => {
        const priceA = ObjA.price,
          priceB = ObjB.price;
        if (priceA < priceB) return 1;
        if (priceB < priceA) return -1;
        return 0;
      });
    }

    if (this.state.sort === 'bypricelowtohigh') {
      allProducts = allProducts.sort((ObjA, ObjB) => {
        const priceA = ObjA.price,
          priceB = ObjB.price;
        if (priceA < priceB) return -1;
        if (priceB < priceA) return 1;
        return 0;
      });
    }

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
            <h2 id="allproductsheading">
              All Products{' '}
              {this.state.class === 'All' ? `` : `> ${this.state.class}s`}
            </h2>
            <div>
              <Filters
                applyFilter={this.applyFilter}
                class={this.state.class}
              />
              <Sort applySort={this.applySort} sort={this.state.sort} />
            </div>
            <div className="centerproductcontainer">
              {allProducts.map(product => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
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
