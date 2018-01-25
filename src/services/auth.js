import _ from 'lodash'

const keys = {
  USER: 'USER',
  TOKEN: 'TOKEN'
}

export const login = ({ user, token }) => {
  localStorage.setItem(keys.USER, JSON.stringify(user))
  localStorage.setItem(keys.TOKEN, token)
}

export const logout = () => {
  localStorage.removeItem(keys.USER)
  localStorage.removeItem(keys.TOKEN)
}

export const userIsLoggedIn = () => {
  return !_.isNil(getToken())
}

export const getToken = () => {
  return localStorage.getItem(keys.TOKEN)
}

export const getUser = () => {
  const user = localStorage.getItem(keys.USER)
  return user ? JSON.parse(user) : user 
}

export default {
  login,
  logout
}