import React, { Component } from 'react';
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Register from './scenes/Auth/Register'
import Login from './scenes/Auth/Login'
import Header from './components/Header'
import configureStore from './store'
import { actionCreators } from './reducers/auth'

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

    const user = localStorage.getItem('USER')
    if (user) {
      store.dispatch(actionCreators.setUser({ ...JSON.parse(user) }))
      store.dispatch(actionCreators.setToken(localStorage.getItem('TOKEN')))
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
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
