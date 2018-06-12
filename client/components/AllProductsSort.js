import React from 'react';

const Sort = props => {
  console.log(props);
  return (
    <select id="sort" name="sort" onChange={props.applySort}>
      <option value="byname">
        {props.sort === 'byname' ? 'Sort Products' : 'By Name'}
      </option>
      <option value="byfirepower">By Firepower</option>
      <option value="bypricehightolow">By Price High to Low</option>
      <option value="bypricelowtohigh">By Price Low to High</option>
    </select>
  );
};

export default Sort;
