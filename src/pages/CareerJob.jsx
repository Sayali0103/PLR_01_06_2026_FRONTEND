import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ApplyModal from '../components/ApplyModal'
import JobDetailModal from '../components/JobDetailModal'
import { API_URL } from '../services/api'

function getJobId(identifier) {
  const match = String(identifier || '').match(/([a-f\d]{24})$/i)
  return match?.[1] || ''
}

export default function CareerJob() {
  const { identifier } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [applyJob, setApplyJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const jobId = getJobId(identifier)
    if (!jobId) {
      setError('This job link is not valid.')
      setLoading(false)
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError('')
    fetch(`${API_URL}/jobs/${jobId}`, { signal: controller.signal })
      .then(async response => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || 'This job is no longer available.')
        return data
      })
      .then(data => { if (data.isActive) setJob(data); else throw new Error('This job is no longer available.') })
      .catch(err => { if (err.name !== 'AbortError') setError(err.message || 'Unable to load this job.') })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })

    return () => controller.abort()
  }, [identifier])

  return (
    <main className="min-h-screen bg-cream px-5 pb-16 pt-28 sm:px-8">
      {loading && <p className="mx-auto max-w-[780px] rounded-2xl bg-white p-8 text-center text-[14px] text-[#887b6e]">Loading this job…</p>}
      {!loading && error && <section className="mx-auto max-w-[600px] rounded-2xl bg-white p-8 text-center" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
        <h1 className="text-2xl font-bold text-[#17100a]">Job unavailable</h1>
        <p className="mt-2 text-[14px] text-[#74685c]">{error}</p>
        <Link to="/careers" className="mt-5 inline-flex rounded-xl bg-orange px-5 py-3 text-[13px] font-bold text-white">Browse open positions</Link>
      </section>}
      {job && <JobDetailModal job={job} onClose={() => navigate('/careers')} onApply={selected => setApplyJob(selected)} />}
      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
    </main>
  )
}
