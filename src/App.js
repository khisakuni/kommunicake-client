import React, { Component } from 'react';
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Register from './scenes/Auth/Register'
import Login from './scenes/Auth/Login'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import configureStore from './store'
import { actionCreators } from './reducers/auth'
import { userIsLoggedIn, getToken, getUser } from './services/auth'

const store = process.env.NODE_ENV === 'development' ?
  configureStore(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) :
  configureStore()

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props)

    if (userIsLoggedIn()) {
      store.dispatch(actionCreators.setUser(getUser()))
      store.dispatch(actionCreators.setToken(getToken()))
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="grid-container">
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Register} />
            <Route path="/login" component={Login} />

            <ProtectedRoute path="/message-providers" component={Home} authenticated={userIsLoggedIn()} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
