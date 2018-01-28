import * as api from '../services/api/message-providers'
export const types = {
  REQUEST_MESSAGE_PROVIDERS: 'REQUEST_MESSAGE_PROVIDERS',
  REQUEST_MESSAGE_PROVIDERS_SUCCESS: 'REQUEST_MESSAGE_PROVIDERS_SUCCESS',
  REQUEST_MESSAGE_PROVIDERS_FAILURE: 'REQUEST_MESSAGE_PROVIDERS_FAILURE',
}

export const actionCreators = {
  getMessageProviders,
  getMessageProvidersRequest,
  getMessageProvidersSuccess,
  getMessageProvidersFailure,
}

function getMessageProviders() {
  return (dispatch) => {
    dispatch(getMessageProvidersRequest())
    return api.getMessageProviders()
      .then(
        response => dispatch(getMessageProvidersSuccess(response)),
        errorResponse => dispatch(getMessageProvidersFailure(errorResponse.body.message))
      )

  }
}

function getMessageProvidersRequest() {
  return { type: types.REQUEST_MESSAGE_PROVIDERS }
}

function getMessageProvidersSuccess(payload) {
  return { type: types.REQUEST_MESSAGE_PROVIDERS_SUCCESS, payload }
}

function getMessageProvidersFailure(payload) {
  return { type: types.REQUEST_MESSAGE_PROVIDERS_FAILURE, payload }
}

export const initialState = {
  loading: false,
  error: null,
  list: [],
}

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case types.REQUEST_MESSAGE_PROVIDERS:
      return { ...state, loading: true }
    case types.REQUEST_MESSAGE_PROVIDERS_SUCCESS:
      return { ...state, loading: false, list: payload }
    case types.REQUEST_MESSAGE_PROVIDERS_FAILURE:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}

