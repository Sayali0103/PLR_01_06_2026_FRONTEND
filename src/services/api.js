export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

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
  let data
  try {
    data = await response.json()
  } catch {
    data = null
  }
  if (!response.ok) {
    const error = new Error(data?.error || `Request failed (${response.status})`)
    error.status = response.status
    throw error
  }
  return data
}

const adminHeaders = (password, role = 'admin') => ({ 'Content-Type': 'application/json', 'x-admin-password': password, 'x-admin-role': role })

export const employeeLogin = credentials => request('/employees/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(credentials) })
export const employeeFetchDashboard = token => request('/employees/me', { headers: { Authorization: `Bearer ${token}` } })
export const employeeLogout = token => request('/employees/me/logout', { method: 'POST', headers: { Authorization: `Bearer ${token}` } })
export const employeeApplyForLeave = (payload, token) => request('/employees/me/leaves', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) })
export const employeeUpdateTask = (id, payload, token) => request(`/employees/me/tasks/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) })
export const adminFetchEmployees = (password, role = 'admin') => request('/employees', { headers: { 'x-admin-password': password, 'x-admin-role': role } })
export const adminCreateEmployee = (employee, password, role = 'hr') => request('/employees', { method: 'POST', headers: adminHeaders(password, role), body: JSON.stringify(employee) })
export const adminDeleteEmployee = (id, password, role = 'hr') => request(`/employees/${id}`, { method: 'DELETE', headers: adminHeaders(password, role) })
export const adminSetEmployeePortal = (id, newPassword, password, role = 'hr') => request(`/employees/${id}/portal`, { method: 'PUT', headers: adminHeaders(password, role), body: JSON.stringify({ password: newPassword }) })
export const adminFetchLeaveRequests = (password, role = 'hr') => request('/employees/leave-requests', { headers: { 'x-admin-password': password, 'x-admin-role': role } })
export const adminUpdateLeaveRequest = (id, status, password, role = 'hr') => request(`/employees/leave-requests/${id}`, { method: 'PUT', headers: adminHeaders(password, role), body: JSON.stringify({ status }) })
export const adminFetchAttendance = (id, password, role = 'admin') => request(`/employees/${id}/admin-attendance`, { headers: { 'x-admin-password': password, 'x-admin-role': role } })
export const adminSaveAttendance = (id, date, status, password, role = 'hr') => request(`/employees/${id}/attendance/${date}`, { method: 'PUT', headers: adminHeaders(password, role), body: JSON.stringify({ status }) })
export const adminClearAttendance = (id, date, password, role = 'hr') => request(`/employees/${id}/attendance/${date}`, { method: 'DELETE', headers: adminHeaders(password, role) })
export const adminFetchAttendanceSummary = (month, password, role = 'admin') => request(`/employees/attendance-summary?month=${encodeURIComponent(month)}`, { headers: { 'x-admin-password': password, 'x-admin-role': role } })
export const adminFetchTasks = (password, role = 'admin') => request('/employees/tasks', { headers: { 'x-admin-password': password, 'x-admin-role': role } })
export const adminAssignTask = (payload, password, role = 'admin') => request('/employees/tasks', { method: 'POST', headers: adminHeaders(password, role), body: JSON.stringify(payload) })

export const adminFetchSalarySlips = (id, password, role = 'hr') => request(`/employees/${id}/salary-slips`, { headers: { 'x-admin-password': password, 'x-admin-role': role } })
export const adminUploadSalarySlip = (employeeId, month, file, password, role = 'hr') => {
  const body = new FormData()
  body.append('employeeId', employeeId)
  body.append('month', month)
  body.append('salarySlip', file)
  return request('/employees/salary-slips', { method: 'POST', headers: { 'x-admin-password': password, 'x-admin-role': role }, body })
}
export const employeeDownloadSalarySlip = (id, token) => downloadFile(`/employees/me/salary-slips/${id}/file`, { Authorization: `Bearer ${token}` })

async function downloadFile(path, headers) {
  const response = await fetch(`${API_URL}${path}`, { headers })
  if (!response.ok) {
    let message = 'Unable to download salary slip'
    try { message = (await response.json()).error || message } catch { /* Non-JSON response */ }
    throw new Error(message)
  }
  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'salary-slip.pdf'
  link.click()
  URL.revokeObjectURL(url)
}

export const sendChatMessage = message => request('/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message }),
})
