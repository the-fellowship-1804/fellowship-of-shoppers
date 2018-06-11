import React from 'react';

const SingleProductSpecs = props => {
  const product = props.product;
  return (
    <ul id="single-product-unordered-list">
      {product.class ? (
        <li id="single-product-class">Class: {product.class}</li>
      ) : (
        ''
      )}
      {product.firepower ? (
        <li id="single-product-firepower">Firepower: {product.firepower}</li>
      ) : (
        ''
      )}
      {product.crew ? (
        <li id="single-product-crew">Crew: {product.crew}</li>
      ) : (
        ''
      )}
      {product.topSpeed ? (
        <li id="single-product-topspeed">Top Speed: {product.topSpeed}</li>
      ) : (
        ''
      )}
      {product.acceleration ? (
        <li id="single-product-acceleration">
          Acceleration: {product.acceleration}
        </li>
      ) : (
        ''
      )}
      {product.weight ? (
        <li id="single-product-weight">Mass: {product.weight}</li>
      ) : (
        ''
      )}
      {product.diameter ? (
        <li id="single-product-diameter">Diameter: {product.diameter}</li>
      ) : (
        ''
      )}
      {product.length && product.width && product.depth ? (
        <li id="single-product-dimensions">
          Dimensions: {product.length}L x {product.width}W x {product.depth}D
        </li>
      ) : (
        ''
      )}
    </ul>
  );
};

export default SingleProductSpecs;
