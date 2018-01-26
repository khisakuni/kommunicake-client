import { get, authenticated } from '../http'

export const getMessageProviders = () => {
  const url = `${process.env.REACT_APP_API_DOMAIN}/api/v1/message_providers`
  return authenticated(get)(url)
}


export default {
  getMessageProviders
}