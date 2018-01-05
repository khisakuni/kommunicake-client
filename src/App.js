import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import _ from 'lodash'
import Register from './scenes/Auth/Register'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props)
    const userInfo = localStorage.getItem("user")
    this.state = { user: userInfo }
  }

  render() {
    return (
      <Router>
        <div className="grid-container">
          {
            _.isNil(this.state.user) &&
              <Link to="/signup">Sign Up</Link>
          }

          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
