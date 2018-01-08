import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import _ from 'lodash'
import Register from './scenes/Auth/Register'
import Login from './scenes/Auth/Login'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const authLinks = () => (
  <ul>
    <li><Link to="/signup">Sign Up</Link></li>
    <li><Link to="/login">Log In</Link></li>
  </ul>
)

class App extends Component {
  constructor(props) {
    super(props)
    // TODO: use auth service class
    const userInfo = localStorage.getItem("USER")
    this.state = { user: userInfo }
  }

  render() {
    return (
      <Router>
        <div className="grid-container">
          {
            _.isNil(this.state.user) && authLinks()
          }

          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Register} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
