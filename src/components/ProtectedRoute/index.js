import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { refreshToken } from '../../services/auth'

class ProtectedRoute extends Component {
  constructor(props) {
    super(props)

    this.state = { authenticated: false, loading: true }
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: true })
    refreshToken().then((authenticated) => {
      this.setState({...this.state, authenticated, loading: false })
    })
  }

  render() {
    const { component: Component, ...rest } = this.props

    return (
      <Route {...rest} render={props => {
        if (this.state.loading) {
          return <p>Loading...</p>
        }

        return this.state.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location },
          }} />
        )
        }}
      />
    )
  }
}

export default ProtectedRoute