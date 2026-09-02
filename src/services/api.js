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

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options)
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Request failed')
  return data
}

const adminHeaders = password => ({ 'Content-Type': 'application/json', 'x-admin-password': password })

export const fetchPublicEmployees = () => request('/employees/public')
export const fetchEmployeeAttendance = id => request(`/employees/${id}/attendance`)
export const adminFetchEmployees = password => request('/employees', { headers: { 'x-admin-password': password } })
export const adminCreateEmployee = (employee, password) => request('/employees', { method: 'POST', headers: adminHeaders(password), body: JSON.stringify(employee) })
export const adminFetchAttendance = (id, password) => request(`/employees/${id}/admin-attendance`, { headers: { 'x-admin-password': password } })
export const adminSaveAttendance = (id, date, status, password) => request(`/employees/${id}/attendance/${date}`, { method: 'PUT', headers: adminHeaders(password), body: JSON.stringify({ status }) })
export const adminClearAttendance = (id, date, password) => request(`/employees/${id}/attendance/${date}`, { method: 'DELETE', headers: { 'x-admin-password': password } })
