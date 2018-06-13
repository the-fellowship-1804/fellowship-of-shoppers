import React from 'react';

const AdminUsersSort = props => {
  return (
    <select onChange={props.applySort}>
      <option value="id">Sort By ID</option>
      <option value="name">Sort Alphabetically</option>
    </select>
  );
};

export default AdminUsersSort;
