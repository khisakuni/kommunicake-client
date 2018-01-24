import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { actionCreators, types, initialState } from './auth'

describe('reducers/auth actionCreators', () => {
  describe('loginRequest', () => {
    it('returns REQUEST_LOGIN action', () => {
      expect(actionCreators.loginRequest()).toEqual({ type: types.REQUEST_LOGIN })
    })
  })

  describe('loginRequestSuccess', () => {
    it('returns action with REQUEST_LOGIN_SUCCESS type', () => {
      expect(actionCreators.loginRequestSuccess().type).toBe(types.REQUEST_LOGIN_SUCCESS)
    })

    it('returns action with payload', () => {
      const payload = 'payload'

      expect(actionCreators.loginRequestSuccess(payload).payload).toBe(payload)
    })
  })

  describe('loginRequestFailure', () => {
    it('returns action with REQUEST_LOGIN_FAILURE type', () => {
      expect(actionCreators.loginRequestFailure().type).toBe(types.REQUEST_LOGIN_FAILURE)
    })

    it('returns action with payload', () => {
      const payload = 'payload'

      expect(actionCreators.loginRequestFailure(payload).payload).toBe(payload)
    })
  })

  describe('login', () => {
    afterEach(() => {
      fetchMock.reset()
      fetchMock.restore()
    })

    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    const url = `${process.env.REACT_APP_API_DOMAIN}/api/v1/login`

    it('creates REQUEST_LOGIN_SUCCESS when done successfully', () => {
      const body = {
        user: { id: 1, name: 'kohei', email: 'kohei@example.com' },
        token: 'token',
      }
      fetchMock.postOnce(url, { body, headers: { 'content-type': 'application/json' } })
      const expectedActions = [
        { type: types.REQUEST_LOGIN },
        { type: types.REQUEST_LOGIN_SUCCESS, payload: body },
      ]
      const store = mockStore(initialState)

      return store.dispatch(actionCreators.login({ email: 'kohei@example.com', password: 'password' })).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('creates REQUEST_LOGIN_FAILURE when done with error', () => {
      const body = { message: 'unauthorized' }
      fetchMock.postOnce(url, { body, headers: { 'content-type': 'application/json' }, status: 401 })
      const expectedActions = [
        { type: types.REQUEST_LOGIN },
        { type: types.REQUEST_LOGIN_FAILURE, payload: body.message },
      ]
      const store = mockStore(initialState)
      
      return store.dispatch(actionCreators.login({ email: 'kohei@example.com', password: 'password' })).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})
