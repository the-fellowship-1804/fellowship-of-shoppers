import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser } from '../store/singleUser';
/**
 * COMPONENT
 */
class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.user.email,
      password: this.props.user.password,
      address: this.props.user.address,
      imageUrl: this.props.user.imageUrl,
      saved: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const updatedUser = {
      email: this.state.email ? this.state.email : this.props.user.email,
      password: this.state.password
        ? this.state.password
        : this.props.user.password,
      address: this.state.address
        ? this.state.address
        : this.props.user.address,
      imageUrl: this.state.imageUrl
        ? this.state.imageUrl
        : this.props.user.imageUrl
    };

    const userid = this.props.user.id;

    this.props.editUser(userid, updatedUser);

    this.setState({
      email: '',
      password: '',
      address: '',
      paymentInfo: '',
      imageUrl: '',
      saved: true
    });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>Edit Account</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="text"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <label htmlFor="address">Address</label>
          <input
            name="address"
            type="address"
            value={this.state.address}
            onChange={this.handleChange}
          />

          <label htmlFor="imageUrl">Image Url</label>
          <input
            name="imageUrl"
            type="imageUrl"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />

          <div>
            <button type="submit">Save Changes</button>
          </div>
        </form>
        <div>{this.state.saved ? 'Changes Saved!' : null}</div>
        {
          <h4>
            {this.state.created === undefined ? null : this.state.created}
          </h4>
        }
      </div>
    );
  }
}

const mapSTP = state => ({
  user: state.singleUser
});

const mapDP = dispatch => ({
  editUser: (id, user) => dispatch(editUser(id, user))
});

export default connect(
  mapSTP,
  mapDP
)(EditUser);
