import { post } from '../http'

export const postRegister = (params) => {
  const url = `${process.env.REACT_APP_API_DOMAIN}/api/v1/register`
  return post(url, { body: params })
}

export default {
  postRegister
}