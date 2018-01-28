import { combineReducers } from 'redux'
import auth from './auth'
import messageProviders from './message-providers'

export default combineReducers({ auth, messageProviders }) 