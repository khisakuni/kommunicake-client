const formatRequest = (url, { method, body, headers } = { body: {}, headers: {} }) => {
  return {
    method: method,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': 'http://foo.com',
      ...headers,
    },
    body: JSON.stringify(body)
  }
}

const methods = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

const handleResponse = (res) => {
  return res.json().then((json) => {
    if (!res.ok) {
      const error = { status: res.status, body: json }
      throw error
    }
    return json
  })
}

export const get = (url, { headers } = { headers: {} }) => {
  const req = formatRequest(url, { method: methods.GET, headers })
  return fetch(url, req).then(handleResponse)
}

export const post = (url, { body } = {}) => {
  const req = formatRequest(url, { method: methods.POST, body })
  return fetch(url, req).then(handleResponse)
}

export const put = (url, { body }) => {
  const req = formatRequest(url, { method: methods.PUT, body })
  return fetch(url, req).then(handleResponse)
}

export const destroy = (url) => {
  const req = formatRequest(url, { method: methods.DELETE })
  return fetch(url, req).then(handleResponse)
}

export const authenticated = (requestFn) => (
  (url) => {
    const token = localStorage.getItem('TOKEN')
    return requestFn(url, { headers: { 'Authorization': `Bearer ${token}` } })
  }
)

export default {
  get,
  post,
  put,
  destroy,
  authenticated
}