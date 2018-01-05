import React, { Component } from 'react'
import { Form, Text } from 'react-form'
import _ from 'lodash'
import { postRegister } from '../../../services/api/register'
import { login } from '../../../services/auth'

const errorStyles = {
  color: 'red'
}

const errorValidator = (values) => {
  return {
    name: validateName(values),
    password: validatePassword(values),
    passwordConfirmation: validatePasswordConfirmation(values),
    email: validateEmail(values)
  }
}

const validateName = (formValues) => {
  if (_.isNil(formValues.name)) return 'Name must be present' 
}

const validatePassword = (formValues) => {
  if (_.isNil(formValues.password)) return 'Password must be present' 
}

const validatePasswordConfirmation = (formValues) => {
  if (_.isNil(formValues.passwordConfirmation)) {
    return 'Password confirmation must be present' 
  }
  const passwordsFilledOut = !_.isNil(formValues.password) && !_.isNil(formValues.passwordConfirmation)
  const passwordsMatch = formValues.password === formValues.passwordConfirmation

  if (passwordsFilledOut && !passwordsMatch) {
    return 'Must match password'
  }
}

const validateEmail = (formValues) => {
  if (_.isNil(formValues.email)) {
    return 'Email must be present'
  }

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!emailRegex.test(formValues.email)) {
    return 'Must be valid email'
  }
}

const displayFormError = (formApi, field) => (
  formApi.errors[field] &&
    formApi.touched[field] &&
    (<span style={errorStyles}>{formApi.errors[field]}</span>)
)

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = { error: null }

    this.submit = this.submit.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleFailure = this.handleFailure.bind(this)
    this.displayError = this.displayError.bind(this)
  }

  submit(values) {
    postRegister(values).then(this.handleSuccess).catch(this.handleFailure)
  }

  handleSuccess(response) {
    login({ user: response.user, token: response.token })
  }

  handleFailure(response) {
    this.setState({
      ...this.state,
      error: response.body.message
    })
  }

  displayError() {
    return !_.isNil(this.state.error) && (
      <span style={errorStyles}>There was an error: {this.state.error}</span>
    )
  }

  render() {
    return (
      <div>
        <h2>Register</h2>
        <Form
          validateError={errorValidator}
          onSubmit={this.submit}
        >
          {
            (formApi) => (
              <form onSubmit={formApi.submitForm}>
                {this.displayError()}
                <label htmlFor="name">Name</label>
                {displayFormError(formApi, 'name')}
                <Text type="text" field="name" id="name"></Text>

                <label htmlFor="email">Email</label>
                {displayFormError(formApi, 'email')}
                <Text type="email" field="email" id="email"></Text>

                <label htmlFor="password" >Password</label>
                {displayFormError(formApi, 'password')}
                <Text type="password" field="password" id="password"></Text>

                <label htmlFor="passwordConfirmation">Password Confirmation</label>
                {displayFormError(formApi, 'passwordConfirmation')}
                <Text type="password" field="passwordConfirmation" id="passwordConfirmation"></Text>

                <button className="button" type="submit">Submit</button>
              </form>
            )
          }
        </Form>
      </div>
    )
  }
}