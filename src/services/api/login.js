import { post, authenticated } from '../http'

export const postLogin = (params) => {
  const url = `${process.env.REACT_APP_API_DOMAIN}/api/v1/login`
  return post(url, { body: params })
}

export const postToken = (token) => {
  const url = `${process.env.REACT_APP_API_DOMAIN}/api/v1/token`
  return authenticated(post)(url, { body: { token }})
}

export default {
  postLogin,
  postToken,
}