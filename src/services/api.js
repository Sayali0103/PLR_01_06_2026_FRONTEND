export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function submitWebsiteForm(path, payload) {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Submission failed. Please try again.')
  return data
}
