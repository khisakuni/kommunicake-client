export const types = {
  REQUEST_MESSAGE_PROVIDERS: 'REQUEST_MESSAGE_PROVIDERS',
  REQUEST_MESSAGE_PROVIDERS_SUCCESS: 'REQUEST_MESSAGE_PROVIDERS_SUCCESS',
  REQUEST_MESSAGE_PROVIDERS_FAILURE: 'REQUEST_MESSAGE_PROVIDERS_FAILURE',
}

export const actionCreators = {

}

export const initialState = {
  loading: false,
  error: null,
  messageProviders: [],
}

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case types.REQUEST_MESSAGE_PROVIDERS:
      return { ...state, loading: true }
    case types.REQUEST_MESSAGE_PROVIDERS_SUCCESS:
      return { ...state, loading: false, messageProviders: payload }
    case types.REQUEST_MESSAGE_PROVIDERS_FAILURE:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}

