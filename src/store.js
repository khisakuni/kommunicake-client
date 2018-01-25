import { createStore, applyMiddleware } from 'redux'
import thunkMidleware from 'redux-thunk'
import rootReducer from './reducers'

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMidleware)
  )
}

