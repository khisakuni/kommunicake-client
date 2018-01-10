import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import _ from 'lodash'

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.isLoggedIn = this.isLoggedIn.bind(this)
  }
  isLoggedIn() {
    const { user, token } = this.props
    return !_.isNil(user) && !_.isNil(token)
  }

  render() {
    return (
      <ul>
        {!this.isLoggedIn() && (<li><Link to="/signup">Sign Up</Link></li>)}
        {!this.isLoggedIn() && (<li><Link to="/login">Log In</Link></li>)}
      </ul>
    )
  }
}