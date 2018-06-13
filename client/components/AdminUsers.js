import React from 'react';
import axios from 'axios';

class AdminUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  render() {
    return <h1>EDIT USERS</h1>;
  }
}

export default AdminUsers;
