import React from 'react';

const Filters = props => {
  return (
    <select id="filter" name="filter" onChange={props.applyFilter}>
      <option value="All">
        {props.class === 'All' ? 'Filter by Class' : 'All'}
      </option>
      <option value="Space Station">Space Stations</option>
      <option value="Starship">Starships</option>
      <option value="Freighter">Freighters</option>
      <option value="Fighter">Fighters</option>
    </select>
  );
};

export default Filters;
