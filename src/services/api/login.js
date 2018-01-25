import { post } from '../http'

export const postLogin = (params) => {
  const url = `${process.env.REACT_APP_API_DOMAIN}/api/v1/login`
  return post(url, { body: params })
}

export default {
  postLogin
}