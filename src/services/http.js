const formatRequest = (url, { method, body } = { body: {} }) => {
  const params = {
    method: method,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': 'http://foo.com'
    },
    body: JSON.stringify(body)
  }
  return new Request(url, params)
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

export const get = (url) => {
  const req = formatRequest(url, { method: methods.GET })
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

export default {
  get: get,
  post: post,
  put: put,
  destroy: destroy
}