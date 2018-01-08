import React, { Component } from 'react'
import { Form, Text } from 'react-form'
import _ from 'lodash'
import { postLogin } from '../../../services/api/login'
import { login } from '../../../services/auth'

const errorStyles = {
  color: 'red'
}

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = { error: null }

    this.submit = this.submit.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleFailure = this.handleFailure.bind(this)
  }

  submit(values) {
    postLogin(values).then(this.handleSuccess).catch(this.handleFailure)
  }

  handleSuccess(response) {
    login({ user: response.user, token: response.token })
  }

  handleFailure(response) {
    this.setState({ ...this.state, error: response.body.message })
  }

  displayError() {
    return !_.isNil(this.state.error) && (
      <span style={errorStyles}>There was an error: {this.state.error}</span>
    )
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Form onSubmit={this.submit}>
          {
            (formApi) => (
              <form onSubmit={formApi.submitForm}>
                {this.displayError()}

                <label htmlFor="email">Email</label>
                <Text type="email" field="email" id="email"></Text>

                <label htmlFor="password">Password</label>
                <Text type="password" field="password" id="password"></Text>

                <button type="submit" className="button">Login</button>
              </form>
            )
          }
        </Form>
      </div>
    )
  }
}