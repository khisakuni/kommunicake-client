import React, { Component } from 'react'
import { Form, Text } from 'react-form'
import _ from 'lodash'
import { login } from '../../../services/auth'

const errorStyles = {
  color: 'red'
}

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.submit = this.submit.bind(this)
  }

  submit(values) {
    this.props.login(values).then(({ payload }) => login(payload))
  }

  displayError() {
    return !_.isNil(this.props.error) && (
      <span style={errorStyles}>There was an error: {this.props.error}</span>
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