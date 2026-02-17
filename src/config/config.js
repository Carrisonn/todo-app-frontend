export function config(id, data, method) {
  const API_URL = method === 'POST'
    ? `${import.meta.env.VITE_API_URL}/tasks`
    : `${import.meta.env.VITE_API_URL}/tasks/${id}`

  const CONFIG = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }

  return {
    API_URL,
    CONFIG
  }
}