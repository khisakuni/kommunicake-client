import { postLogin } from '../services/api/login'

// Types
export const types = {
  REQUEST_LOGIN: 'REQUEST_LOGIN',
  REQUEST_LOGIN_SUCCESS: 'REQUEST_LOGIN_SUCCESS',
  REQUEST_LOGIN_FAILURE: 'REQUEST_LOGIN_FAILURE',
  SET_USER: 'SET_USER',
  SET_TOKEN: 'SET_TOKEN',
}

// Action Creators
export const actionCreators = {
  setUser: user => ({ type: types.SET_USER, payload: user }),
  setToken: token => ({ type: types.SET_TOKEN, payload: token }),
  login,
  loginRequest,
  loginRequestSuccess,
  loginRequestFailure,
}

function login({ email, password }) {
  return function (dispatch) {
    dispatch(loginRequest())
    return postLogin({ email, password })
      .then(
        response => dispatch(loginRequestSuccess(response)),
        errorResponse => dispatch(loginRequestFailure(errorResponse.body.message))
      )
  }
}

function loginRequest() {
  return { type: types.REQUEST_LOGIN }
}

function loginRequestSuccess(payload) {
  return { type: types.REQUEST_LOGIN_SUCCESS, payload }
}

function loginRequestFailure(payload) {
  return { type: types.REQUEST_LOGIN_FAILURE, payload }
}

// Reducer
export const initialState = {
  loading: false,
  error: null,
  user: {},
  token: null
}

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case types.REQUEST_LOGIN:
      return { ...state, loading: true }
    case types.REQUEST_LOGIN_SUCCESS:
      return { ...state, loading: false, user: payload.user, token: payload.token }
    case types.REQUEST_LOGIN_FAILURE:
      return { ...state, loaindg: false, error: payload }
    case types.SET_USER:
      return { ...state, user: payload }
    case types.SET_TOKEN:
      return { ...state, token: payload }
    default:
      return state
  }
}