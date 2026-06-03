import { useState, useEffect } from 'react'
import { API_URL } from '../services/api.js'

const API = API_URL

export function useJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API}/jobs`)
      .then(r => r.json())
      .then(data => { setJobs(data); setLoading(false) })
      .catch(() => { setError('Failed to load jobs'); setLoading(false) })
  }, [])

  return { jobs, loading, error }
}

// File upload — uses FormData
export async function submitApplication(formData) {
  const res = await fetch(`${API}/applications`, {
    method: 'POST',
    body: formData, // FormData handles multipart automatically
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Submission failed')
  }
  return res.json()
}

// Admin calls
export async function adminFetchJobs(password) {
  const res = await fetch(`${API}/jobs/all`, { headers: { 'x-admin-password': password } })
  if (!res.ok) throw new Error('Unauthorized')
  return res.json()
}

export async function adminCreateJob(job, password) {
  const res = await fetch(`${API}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
    body: JSON.stringify(job),
  })
  if (!res.ok) throw new Error('Failed to create job')
  return res.json()
}

export async function adminUpdateJob(id, job, password) {
  const res = await fetch(`${API}/jobs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
    body: JSON.stringify(job),
  })
  if (!res.ok) throw new Error('Failed to update job')
  return res.json()
}

export async function adminDeleteJob(id, password) {
  const res = await fetch(`${API}/jobs/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-password': password },
  })
  if (!res.ok) throw new Error('Failed to delete job')
  return res.json()
}

export async function adminFetchApplications(password) {
  const res = await fetch(`${API}/applications`, { headers: { 'x-admin-password': password } })
  if (!res.ok) throw new Error('Unauthorized')
  return res.json()
}

export async function adminUpdateAppStatus(id, status, password) {
  const res = await fetch(`${API}/applications/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error('Failed to update status')
  return res.json()
}

export async function adminDeleteApplication(id, password) {
  const res = await fetch(`${API}/applications/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-password': password },
  })
  if (!res.ok) throw new Error('Failed to delete')
  return res.json()
}
