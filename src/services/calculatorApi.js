const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
const API_BASE_URL = configuredBaseUrl.replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request(path, options = {}) {
  let response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
  } catch {
    throw new ApiError('Unable to connect to the calculator service.')
  }

  let payload
  try {
    payload = await response.json()
  } catch {
    throw new ApiError('The calculator service returned an invalid response.', response.status)
  }

  if (!response.ok || payload.success !== true) {
    throw new ApiError(
      payload?.error?.message || 'The calculator service could not complete the request.',
      response.status,
    )
  }

  return payload.data
}

export function calculateExpression(expression) {
  return request('/api/calculate', {
    method: 'POST',
    body: JSON.stringify({ expression }),
  })
}

export function getHistory() {
  return request('/api/history')
}

export function deleteHistoryItem(historyId) {
  return request(`/api/history/${historyId}`, { method: 'DELETE' })
}
