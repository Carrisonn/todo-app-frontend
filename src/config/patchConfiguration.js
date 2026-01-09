export function patchConfiguration(taskID, data) {
  const url = `${import.meta.env.VITE_API_URL}/edit/${taskID}`

  const PATCH_CONFIG = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }

  return {
    PATCH_CONFIG,
    url
  }
}