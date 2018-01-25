import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import reducer, { actionCreators, types, initialState } from './message-providers'

describe('message-providers', () => {
  describe('actionCreators', () => {
    it('passes')
  })

  describe('reducer', () => {
    it('handles REQUEST_MESSAGE_PROVIDERS', () => {
      expect(reducer(initialState, { type: types.REQUEST_MESSAGE_PROVIDERS })).toEqual({
        ...initialState,
        loading: true,
      })
    })

    it('handles REQUEST_MESSAGE_PROVIDERS_SUCCESS', () => {
      const payload = [ { messageProviderType: 'GMAIL' } ]

      expect(reducer(initialState, { type: types.REQUEST_MESSAGE_PROVIDERS_SUCCESS, payload })).toEqual({
        ...initialState,
        messageProviders: payload,
      })
    })

    it('handles REQUEST_MESSAGE_PROVIDERS_FAILURE', () => {
      const payload = 'an error occurred'

      expect(reducer(initialState, { type: types.REQUEST_MESSAGE_PROVIDERS_FAILURE, payload })).toEqual({
        ...initialState,
        error: payload,
      })
    })
  })
})