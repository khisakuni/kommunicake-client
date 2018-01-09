export const types = {
  REQUEST_LOGIN: 'REQUEST_LOGIN',
  REQUEST_LOGIN_SUCCESS: 'REQUEST_LOGIN_SUCCESS',
  REQUEST_LOGIN_FAILURE: 'REQUEST_LOGIN_FAILURE',
}

const initialState = {
  loading: false,
  error: null,
  user: {},
  token: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.REQUEST_LOGIN:
      return { ...state, loading: true }
    case types.REQUEST_LOGIN_SUCCESS:
      return { ...state, loading: false, ...action.payload }
    case types.REQUEST_LOGIN_FAILURE:
      return { ...state, loaindg: false, error: action.payload }
    default:
      return state
  }
}