import React from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import { getProducts } from '../store/allProducts';

import { withRouter, Link } from 'react-router-dom';
import Filters from './AllProductsFilters';
import Sort from './AllProductsSort';

const [UNASKED, LOADING, LOADED, ERROR] = [
  'UNASKED',
  'LOADING',
  'LOADED',
  'ERROR'
];

class AdminProducts extends React.Component {
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
    // console.dir(event.target);
    this.setState({
      ...this.state,
      filter: true,
      class: event.target.value
    });
    if (event.target.value === 'All') this.setState({ filter: false });
  }

  applySort(event) {
    // console.dir(event.target);
    this.setState({ sort: event.target.value });
  }

  render() {
    let allProducts = this.props.products;
    console.log('PROPSSSSS', this.props);
    // console.log(this.props.user.isAdmin);
    // console.log('products', this.props.products);
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
                return (
                  <div key={product.id}>
                    <ProductCard key={product.id} product={product} />
                    <button type="submit">Delete</button>
                  </div>
                );
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

const mapSTP = state => ({
  user: state.singleUser,
  products: state.allProducts.products,
  status: state.allProducts.status
});

const mapDTP = { getProducts };

export default withRouter(
  connect(
    mapSTP,
    mapDTP
  )(AdminProducts)
);
