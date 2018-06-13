import React from 'react';
import axios from 'axios';

class AdminUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  async componentDidMount() {
    const res = await axios.get('/api/users');
    const users = res.data;
    console.log('users', users);
    this.setState({ users });
  }
  render() {
    return (
      <div>
        <h1>EDIT USERS</h1>
        <div>
          {/* {this.state.users.map(user => <h1 key={user.id}>{user.email}</h1>)} */}
        </div>
      </div>
    );
  }
}

export default AdminUsers;
