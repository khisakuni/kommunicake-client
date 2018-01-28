import { get, post, authenticated } from '../http'

const domain = process.env.REACT_APP_API_DOMAIN

export const getMessageProviders = () => {
  const url = `${domain}/api/v1/message_providers`
  return authenticated(get)(url)
}

export const postGmailLoginLink = () => {
  const url = `${domain}/api/v1/gmail_login`
  const redirectURL = `${process.env.REACT_APP_DOMAIN}/message-providers`
  const body = { redirectURL }
  return authenticated(post)(url, { body })
}

export default {
  getMessageProviders
}