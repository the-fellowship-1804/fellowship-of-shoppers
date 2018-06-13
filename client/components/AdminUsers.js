import React from 'react';
import axios from 'axios';
import AdminUsersSort from './AdminUsersSort';

class AdminUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      sort: 'id'
    };
    this.applySort = this.applySort.bind(this);
  }
  async componentDidMount() {
    const res = await axios.get('/api/users');
    const users = res.data;
    this.setState({ users });
  }

  applySort(event) {
    this.setState({ sort: event.target.value });
  }

  render() {
    let allUsers = this.state.users;
    let sort = this.state.sort;

    if (sort === 'name') {
      allUsers = this.state.users.sort((ObjA, ObjB) => {
        const nameA = ObjA.email,
          nameB = ObjB.email;
        if (nameA < nameB) return -1;
        if (nameB < nameA) return 1;
        return 0;
      });
    }

    if (sort === 'id') {
      allUsers = this.state.users.sort((ObjA, ObjB) => {
        const idA = ObjA.id,
          idB = ObjB.id;
        if (idA < idB) return -1;
        if (idB < idA) return 1;
        return 0;
      });
    }

    return (
      <div id="adminusertitle">
        <h4>ADMIN > EDIT USERS</h4>
        <div>
          <AdminUsersSort applySort={this.applySort} />
        </div>
        <div>
          {allUsers.map(user => (
            <div id="adminuserlist" key={user.id}>
              <div id="adminuserinfodelete">
                <h4>
                  User: [id: {user.id}, email: {user.email}]
                </h4>
                <button type="submit" onClick={this.deleteUser}>
                  Delete User
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AdminUsers;
