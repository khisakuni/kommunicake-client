import React, { Component } from 'react'
import { Form, Text } from 'react-form'

export default class Login extends Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <Form>
          {
            (formApi) => (
              <form>
                <label htmlFor="email">Email</label>
                <Text type="email" field="email" id="email"></Text>

                <label htmlFor="password">Password</label>
                <Text type="password" field="password" id="password"></Text>
              </form>
            )
          }
        </Form>
      </div>
    )
  }
}