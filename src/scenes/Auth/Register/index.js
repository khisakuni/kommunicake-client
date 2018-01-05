import React, { Component } from 'react'
import { Form, Text } from 'react-form'
import _ from 'lodash'

const errorValidator = (values) => {
  return {
    passwordConfirmation: validPasswordConfirmation(values) ? null : 'Does not match password',
    email: validEmail(values) ? null : 'Please use valid email'
  }
}

const validPasswordConfirmation = (formValues) => {
  const passwordsFilledOut = !_.isNil(formValues.password) && !_.isNil(formValues.passwordConfirmation)
  const passwordsMatch = formValues.password === formValues.passwordConfirmation

  return !passwordsFilledOut || (passwordsFilledOut && passwordsMatch)
}

const validEmail = (formValues) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(formValues.email)
}

const successValidator = (values, errors) => {
  console.log('values>>', values, 'errors>>', errors)
}

const submit = (values) => {
  console.log('SUBMIT>>', values)
}

const displayError = (formApi, field) => (
  formApi.errors[field] && formApi.touched[field] && (<span>{formApi.errors[field]}</span>)
)

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        <h2>Register</h2>
        <Form
          validateError={errorValidator}
          validateSuccess={successValidator}
          onSubmit={submit}
        >
          {
            (formApi) => (
              <form onSubmit={formApi.submitForm}>
                <label htmlFor="name">Name</label>
                <Text type="text" field="name" id="name"></Text>

                <label htmlFor="email">Email</label>
                {displayError(formApi, 'email')}
                <Text type="email" field="email" id="email"></Text>

                <label htmlFor="password" >Password</label>
                <Text type="password" field="password" id="password"></Text>

                <label htmlFor="passwordConfirmation">Password Confirmation</label>
                {displayError(formApi, 'passwordConfirmation')}
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