import React from 'react';

const commafy = num => {
  const numArr = num.toString().split('');
  for (let i = numArr.length; i > 0; i = i - 3) {
    numArr.splice(i, 0, ',');
  }
  const trimmed = numArr.slice(0, numArr.length - 1).join('');
  return trimmed;
};

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
        <li id="single-product-firepower">
          Firepower: {commafy(product.firepower)}
        </li>
      ) : (
        ''
      )}
      {product.crew ? (
        <li id="single-product-crew">Crew: {commafy(product.crew)}</li>
      ) : (
        ''
      )}
      {product.topSpeed ? (
        <li id="single-product-topspeed">
          Top Speed: {commafy(product.topSpeed)} m/s
        </li>
      ) : (
        ''
      )}
      {product.acceleration ? (
        <li id="single-product-acceleration">
          Acceleration: {commafy(product.acceleration)} m/s
        </li>
      ) : (
        ''
      )}
      {product.weight ? (
        <li id="single-product-weight">Mass: {commafy(product.weight)} kg</li>
      ) : (
        ''
      )}
      {product.diameter ? (
        <li id="single-product-diameter">
          Diameter: {commafy(product.diameter)}m
        </li>
      ) : (
        ''
      )}
      {product.length && product.width && product.depth ? (
        <li id="single-product-dimensions">
          Dimensions(LxWxH): {product.length}m x {product.width}m x{' '}
          {product.depth}m
        </li>
      ) : (
        ''
      )}
    </ul>
  );
};

export default SingleProductSpecs;
