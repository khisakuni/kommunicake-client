import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import reducer, { actionCreators, types, initialState } from './message-providers'
import { mockLocalStorage } from '../test-helpers'

describe('message-providers', () => {
  describe('actionCreators', () => {
    describe('getMessageProviders', () => {
      beforeEach(() => {
        mockLocalStorage()
      })

      afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      const middlewares = [thunk]
      const mockStore = configureMockStore(middlewares)
      const url = `${process.env.REACT_APP_API_DOMAIN}/api/v1/message_providers`

      it('creates REQUEST_MESSAGE_PROVIDERS_SUCCESS when done successfully', () => {
        const body = [{ messageProviderType: 'GMAIL'}]
        fetchMock.getOnce(url, { body, headers: { 'content-type': 'application/json' } })
        const expectedActions = [
          actionCreators.getMessageProvidersRequest(),
          actionCreators.getMessageProvidersSuccess(body),
        ]
        const store = mockStore(initialState)

        return store.dispatch(actionCreators.getMessageProviders()).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
      })

      it('creates REQUEST_MESSAGE_PROVIDERS_FAILURE wehn done with error', () => {
        const body = { message: 'an error occurred' }
        fetchMock.getOnce(url, {
          body,
          headers: { 'content-type': 'application/json' },
          status: 500,
        })
        const expectedActions = [
          actionCreators.getMessageProvidersRequest(),
          actionCreators.getMessageProvidersFailure(body.message)
        ]
        const store = mockStore(initialState)

        return store.dispatch(actionCreators.getMessageProviders()).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
      })
    })

    describe('getMessageProvidersRequest', () => {
      it('creates REQUEST_MESSAGE_PROVIDERS type', () => {
        expect(actionCreators.getMessageProvidersRequest()).toEqual({
          type: types.REQUEST_MESSAGE_PROVIDERS,
        })
      })
    })

    describe('getMessageProvidersSuccess', () => {
      it('creates REQUEST_MESSAGE_PROVIDERS_SUCCESS type', () => {
        const payload = 'payload'

        expect(actionCreators.getMessageProvidersSuccess(payload)).toEqual({
          type: types.REQUEST_MESSAGE_PROVIDERS_SUCCESS,
          payload,
        })
      })
    })

    describe('getMessageProvidersFailure', () => {
      const error = 'an error occurred'

      expect(actionCreators.getMessageProvidersFailure(error)).toEqual({
        type: types.REQUEST_MESSAGE_PROVIDERS_FAILURE,
        payload: error,
      })
    })
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
        list: payload,
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