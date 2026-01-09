export function postConfiguration(data) {
  const { task, priority, status, creation_date } = data

  const url = `${import.meta.env.VITE_API_URL}/create`

  const POST_CONFIG = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task, priority, status, creation_date })
  }

  return {
    POST_CONFIG,
    url
  }
}