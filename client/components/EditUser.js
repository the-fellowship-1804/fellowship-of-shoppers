import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { editUser } from '../store/singleUser'
/**
 * COMPONENT
 */
class EditUser extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      address: '',
      imageUrl: '',
      saved: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const updatedUser = {
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
      imageUrl: this.state.imageUrl,
    }

    const userid = this.props.user.id

    this.props.editUser(userid, updatedUser)

    this.setState({
      email: '',
      password: '',
      address: '',
      paymentInfo: '',
      imageUrl: '',
      saved: true
    })
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <h1>Edit Account</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input name='email' type='text' value={this.state.email} onChange={this.handleChange} required />
          <span class="validity"></span>

          <label htmlFor='password'>Password</label>
          <input name='password' type='text' value={this.state.password} onChange={this.handleChange} required />
          <span class="validity"></span>

          <label htmlFor='address'>Address</label>
          <input name='address' type='address' value={this.state.address} onChange={this.handleChange} required />
          <span class="validity"></span>

          <label htmlFor='imageUrl'>Image Url</label>
          <input name='imageUrl' type='imageUrl' value={this.state.imageUrl} onChange={this.handleChange} required />
          <span class="validity"></span>
          <div>
            <button type='submit'>Save Changes</button>
          </div>
        </form>
        <div>
          {this.state.saved ? 'Changes Saved!' : null}
        </div>
        {
          <h4>{this.state.created === undefined ? null : this.state.created}</h4>
        }
      </div>
    )
  }
}

const mapSTP = (state) => ({
  user: state.singleUser
})

const mapDP = (dispatch) => ({
  editUser: (id, user) => dispatch(editUser(id, user))

})

export default connect(mapSTP, mapDP)(EditUser)
