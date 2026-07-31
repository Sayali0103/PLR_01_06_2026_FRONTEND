import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  adminFetchJobs, adminCreateJob, adminUpdateJob, adminDeleteJob,
  adminFetchApplications, adminUpdateAppStatus, adminDeleteApplication, adminFetchInterviewers, adminScheduleInterviews,
  adminEditInterview, adminCancelInterview,
} from '../hooks/useJobs'

const EMPTY_JOB = {
  title: '', dept: '', location: 'Pune, India', positionType: 'Full time',
  overview: '', responsibilities: '', requiredSkills: '', educationRequirements: '', additionalSkills: '',
  whyJoin: '', tags: '', applyInternUrl: '', applyJobUrl: '',
  isPaid: true, isActive: true,
}

const statusColors = {
  new: { bg: 'rgba(30,100,220,0.07)', text: '#1e64dc', border: 'rgba(30,100,220,0.18)' },
  reviewing: { bg: 'rgba(255,125,0,0.08)', text: '#FF7D00', border: 'rgba(255,125,0,0.2)' },
  shortlisted: { bg: 'rgba(20,160,80,0.07)', text: '#14a050', border: 'rgba(20,160,80,0.18)' },
  rejected: { bg: 'rgba(220,0,0,0.06)', text: '#dc3030', border: 'rgba(220,0,0,0.15)' },
}

function formatInterviewTime(date, index, total) {
  if (!date || !total) return ''
  const start = new Date(`${date}T15:00:00+05:30`)
  const length = (2 * 60 * 60 * 1000) / total
  const format = value => new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' }).format(new Date(value))
  return `${format(start.getTime() + index * length)}–${format(start.getTime() + (index + 1) * length)} IST`
}

function formatScheduledInterview(interview) {
  if (!interview?.startAt) return ''
  const dateStr = new Date(interview.startAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' })
  return `${dateStr}, 3:00 pm–5:00 pm IST`
}

export default function Admin() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [tab, setTab] = useState('jobs') // 'jobs' | 'applications'

  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loadingJobs, setLoadingJobs] = useState(false)
  const [loadingApps, setLoadingApps] = useState(false)

  const [showForm, setShowForm] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [formData, setFormData] = useState(EMPTY_JOB)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [selectedInterviewIds, setSelectedInterviewIds] = useState([])
  const [interviewers, setInterviewers] = useState([])
  const [interviewAssignments, setInterviewAssignments] = useState({})
  const [interviewDate, setInterviewDate] = useState('')
  const [interviewError, setInterviewError] = useState('')
  const [schedulingInterviews, setSchedulingInterviews] = useState(false)
  const [editingApp, setEditingApp] = useState(null)
  const [editDate, setEditDate] = useState('')
  const [editInterviewer, setEditInterviewer] = useState('')
  const [editing, setEditing] = useState(false)
  const [editError, setEditError] = useState('')

  // Login
  const login = async e => {
    e.preventDefault()
    setAuthError('')
    try {
      await adminFetchJobs(password)
      setAuthed(true)
      loadJobs()
      loadInterviewers()
    } catch {
      setAuthError('Incorrect password.')
    }
  }

  const loadJobs = async () => {
    setLoadingJobs(true)
    try { setJobs(await adminFetchJobs(password)) }
    catch { /* handled */ }
    finally { setLoadingJobs(false) }
  }

  const loadApps = async () => {
    setLoadingApps(true)
    try { setApplications(await adminFetchApplications(password)) }
    catch { /* handled */ }
    finally { setLoadingApps(false) }
  }

  useEffect(() => { if (authed && tab === 'applications') loadApps() }, [tab, authed])

  // Helpers — convert textarea lines to/from arrays
  const toArr = str => str.split('\n').map(s => s.trim()).filter(Boolean)
  const toStr = arr => (arr || []).join('\n')

  const openCreate = () => {
    setEditingJob(null)
    setFormData(EMPTY_JOB)
    setFormError('')
    setShowForm(true)
  }

  const openEdit = job => {
    setEditingJob(job)
    setFormData({
      ...job,
      responsibilities: toStr(job.responsibilities),
      requiredSkills: toStr(job.requiredSkills),
      educationRequirements: toStr(job.educationRequirements),
      additionalSkills: toStr(job.additionalSkills),
      whyJoin: toStr(job.whyJoin),
      tags: (job.tags || []).join(', '),
    })
    setFormError('')
    setShowForm(true)
  }

  const saveJob = async e => {
    e.preventDefault()
    setSaving(true)
    setFormError('')
    const payload = {
      ...formData,
      responsibilities: toArr(formData.responsibilities),
      requiredSkills: toArr(formData.requiredSkills),
      educationRequirements: toArr(formData.educationRequirements),
      additionalSkills: toArr(formData.additionalSkills),
      whyJoin: toArr(formData.whyJoin),
      tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean),
    }
    try {
      if (editingJob) {
        await adminUpdateJob(editingJob._id, payload, password)
      } else {
        await adminCreateJob(payload, password)
      }
      setShowForm(false)
      loadJobs()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const deleteJob = async id => {
    if (!confirm('Delete this job posting?')) return
    await adminDeleteJob(id, password)
    loadJobs()
  }

  const toggleActive = async job => {
    await adminUpdateJob(job._id, { isActive: !job.isActive }, password)
    loadJobs()
  }

  const updateStatus = async (id, status) => {
    await adminUpdateAppStatus(id, status, password)
    loadApps()
  }

  const deleteApp = async id => {
    if (!confirm('Delete this application?')) return
    await adminDeleteApplication(id, password)
    loadApps()
  }

  const loadInterviewers = async () => {
    try { setInterviewers(await adminFetchInterviewers(password)) }
    catch { setInterviewError('Unable to load the interviewer list.') }
  }

  // Open edit modal for a single application
  const openEditInterview = app => {
    setEditingApp(app)
    setEditDate(app.interview?.startAt ? new Date(app.interview.startAt).toISOString().slice(0,10) : '')
    setEditInterviewer(app.interview?.interviewerEmail || '')
    setEditError('')
  }

  const closeEdit = () => {
    setEditingApp(null); setEditDate(''); setEditInterviewer(''); setEditError('')
  }

  const submitEdit = async () => {
    if (!editDate || !editInterviewer) { setEditError('Select date and interviewer'); return }
    setEditing(true); setEditError('')
    try {
      await adminEditInterview(editingApp._id, editDate, editInterviewer, password)
      loadApps()
      closeEdit()
    } catch (err) {
      setEditError(err.message)
    } finally { setEditing(false) }
  }

  const toggleInterviewCandidate = id => {
    if (selectedInterviewIds.includes(id)) {
      setSelectedInterviewIds(current => current.filter(candidateId => candidateId !== id))
      setInterviewAssignments(assignments => {
        const remaining = { ...assignments }
        delete remaining[id]
        return remaining
      })
    } else if (selectedInterviewIds.length < 10) {
      setSelectedInterviewIds(current => [...current, id])
    }
    setInterviewError('')
  }

  const scheduleInterviews = async () => {
    if (!interviewDate || !selectedInterviewIds.length) {
      setInterviewError('Select at least one candidate and an interview date.')
      return
    }
    const assignments = selectedInterviewIds.map(applicationId => ({
      applicationId,
      interviewerEmail: interviewAssignments[applicationId],
    }))
    if (assignments.some(assignment => !assignment.interviewerEmail)) {
      setInterviewError('Select an interviewer for every candidate.')
      return
    }
    setSchedulingInterviews(true)
    setInterviewError('')
    try {
      const result = await adminScheduleInterviews(selectedInterviewIds, interviewDate, assignments, password)
      setSelectedInterviewIds([])
      setInterviewAssignments({})
      setInterviewDate('')
      if (result.failedEmails) setInterviewError(`${result.scheduled} interviews were scheduled, but ${result.failedEmails} confirmation email(s) failed. Check email configuration.`)
      loadApps()
    } catch (err) {
      setInterviewError(err.message)
    } finally {
      setSchedulingInterviews(false)
    }
  }

  // ── LOGIN SCREEN ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[380px] bg-white rounded-[28px] p-10"
          style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 8px 50px rgba(0,0,0,0.08)' }}
        >
          <img src="/logo/PLRFinalLogo.png" alt="PLR" className="h-9 mb-8 object-contain" />
          <h1 className="font-bold text-[22px] text-[#111] mb-1 tracking-tight">Admin Dashboard</h1>
          <p className="text-[13.5px] text-[#aaa] mb-8">Enter your admin password to continue.</p>
          <form onSubmit={login} className="space-y-4">
            {authError && (
              <div className="text-[13px] text-red-500 bg-red-50 px-4 py-3 rounded-xl" style={{ border: '1px solid rgba(220,0,0,0.12)' }}>
                {authError}
              </div>
            )}
            <input
              type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full px-4 py-[11px] text-[14px] bg-[#f9f6f1] rounded-xl outline-none focus:ring-2 focus:ring-orange/20"
              style={{ border: '1px solid rgba(0,0,0,0.09)' }}
            />
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="w-full bg-orange text-white font-bold text-[14px] py-[12px] rounded-xl cursor-pointer"
              style={{ boxShadow: '0 4px 18px rgba(255,125,0,0.28)' }}
            >
              Sign In →
            </motion.button>
          </form>
        </motion.div>
      </div>
    )
  }

  // ── MAIN DASHBOARD ──
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-[1200px] mx-auto px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-bold text-[26px] text-[#111] tracking-tight">Admin Dashboard</h1>
            <p className="text-[13px] text-[#aaa] mt-1">Manage job listings and applications</p>
          </div>
          <button
            onClick={() => { setAuthed(false); setPassword('') }}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-[10px] text-[13px] font-semibold text-[#555] transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500 cursor-pointer"
            style={{ border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 17l5-5-5-5M15 12H3M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            </svg>
            Sign out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8">
          {['jobs', 'applications'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-[9px] rounded-full text-[13px] font-semibold cursor-pointer capitalize transition-all duration-200 ${
                tab === t ? 'bg-orange text-white' : 'bg-white text-[#555] hover:text-orange'
              }`}
              style={{
                border: tab === t ? '1px solid #FF7D00' : '1px solid rgba(0,0,0,0.09)',
                boxShadow: tab === t ? '0 2px 12px rgba(255,125,0,0.28)' : '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              {t} {t === 'jobs' ? `(${jobs.length})` : `(${applications.length})`}
            </button>
          ))}
        </div>

        {/* ── JOBS TAB ── */}
        {tab === 'jobs' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-[18px] text-[#111] tracking-tight">Job Postings</h2>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={openCreate}
                className="inline-flex items-center gap-2 bg-orange text-white text-[13px] font-bold px-6 py-[10px] rounded-xl cursor-pointer"
                style={{ boxShadow: '0 4px 18px rgba(255,125,0,0.28)' }}
              >
                + Add Job
              </motion.button>
            </div>

            {loadingJobs ? (
              <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="bg-white h-20 rounded-2xl animate-pulse" style={{ border: '1px solid rgba(0,0,0,0.07)' }} />)}</div>
            ) : (
              <div className="space-y-3">
                {jobs.map(job => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl px-7 py-5 flex items-center justify-between gap-6 flex-wrap"
                    style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${job.isActive ? 'bg-green-400' : 'bg-[#ddd]'}`}
                        style={{ boxShadow: job.isActive ? '0 0 6px rgba(74,222,128,0.7)' : 'none' }}
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-[15px] text-[#111] truncate">{job.title}</p>
                        <p className="text-[12.5px] text-[#aaa]">{job.dept} · {job.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => toggleActive(job)}
                        className={`text-[11.5px] font-semibold px-3 py-[4px] rounded-full cursor-pointer transition-all duration-200 ${
                          job.isActive ? 'text-green-600 bg-green-50 hover:bg-red-50 hover:text-red-500' : 'text-[#aaa] bg-[#f5f3ef] hover:bg-green-50 hover:text-green-600'
                        }`}
                        style={{ border: '1px solid rgba(0,0,0,0.08)' }}
                      >
                        {job.isActive ? 'Active' : 'Inactive'}
                      </button>
                      <button
                        onClick={() => openEdit(job)}
                        className="text-[12px] font-semibold text-[#555] hover:text-orange px-3 py-[4px] rounded-full transition-colors duration-200 cursor-pointer"
                        style={{ border: '1px solid rgba(0,0,0,0.08)' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteJob(job._id)}
                        className="text-[12px] font-semibold text-[#aaa] hover:text-red-500 px-3 py-[4px] rounded-full transition-colors duration-200 cursor-pointer"
                        style={{ border: '1px solid rgba(0,0,0,0.08)' }}
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
                {jobs.length === 0 && <p className="text-center text-[#ccc] py-16 text-[14px]">No job postings yet. Add one above.</p>}
              </div>
            )}
          </div>
        )}

        {/* ── APPLICATIONS TAB ── */}
        {tab === 'applications' && (
          <div>
            <div className="mb-5 flex items-start justify-between gap-5 flex-wrap">
              <div>
                <h2 className="font-bold text-[18px] text-[#111] tracking-tight">Applications Received</h2>
                <p className="mt-1 text-[12.5px] text-[#999]">Select up to 10 candidates, then schedule a Thursday or Sunday interview batch.</p>
              </div>
              {selectedInterviewIds.length > 0 && <span className="rounded-full bg-orange/10 px-4 py-2 text-[12px] font-bold text-orange" style={{ border: '1px solid rgba(255,125,0,0.2)' }}>{selectedInterviewIds.length} candidate{selectedInterviewIds.length === 1 ? '' : 's'} selected</span>}
            </div>
            {selectedInterviewIds.length > 0 && (
              <div className="mb-6 rounded-2xl bg-[#fff8f0] p-5 sm:p-6" style={{ border: '1px solid rgba(255,125,0,0.2)' }}>
                <div className="flex items-end gap-4 flex-wrap">
                  <label className="min-w-[210px] flex-1">
                    <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[1.2px] text-[#7b6c5e]">Interview date</span>
                    <input type="date" value={interviewDate} onChange={event => { setInterviewDate(event.target.value); setInterviewError('') }} className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-[13px] outline-none focus:ring-2 focus:ring-orange/20" />
                  </label>
                  <button onClick={scheduleInterviews} disabled={schedulingInterviews} className="rounded-xl bg-orange px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_18px_rgba(255,125,0,0.28)] disabled:opacity-60">{schedulingInterviews ? 'Creating Meet links...' : 'Confirm & email candidates'}</button>
                  <button onClick={() => { setSelectedInterviewIds([]); setInterviewAssignments({}); setInterviewError('') }} className="px-3 py-2.5 text-[12px] font-semibold text-[#777]">Clear</button>
                </div>
                <div className="mt-4 grid gap-3 text-[12px] text-[#66584c] sm:grid-cols-2">{selectedInterviewIds.map((id, index) => {
                  const candidate = applications.find(application => application._id === id)
                  return <div key={id} className="rounded-lg bg-white p-3" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                    <p className="font-bold text-[#3f352b]">{candidate ? `${candidate.firstName} ${candidate.lastName}` : 'Candidate'}</p>
                    {interviewDate && <p className="mt-1 text-[#8b7a69]">{formatInterviewTime(interviewDate, index, selectedInterviewIds.length)}</p>}
                    <select value={interviewAssignments[id] || ''} onChange={event => { setInterviewAssignments(assignments => ({ ...assignments, [id]: event.target.value })); setInterviewError('') }} className="mt-2 w-full rounded-lg border border-black/10 bg-[#faf7f2] px-2.5 py-2 text-[12px] font-medium text-[#55483d] outline-none focus:ring-2 focus:ring-orange/20">
                      <option value="">Assign interviewer...</option>
                      {interviewers.map(interviewer => <option key={interviewer.email} value={interviewer.email}>{interviewer.name}</option>)}
                    </select>
                  </div>
                })}</div>
                {/* Slots remaining */}
                {interviewDate && (() => {
                  const dayStart = new Date(`${interviewDate}T00:00:00+05:30`)
                  const dayEnd = new Date(`${interviewDate}T23:59:59.999+05:30`)
                  const existingCount = applications.filter(a => a.interview?.startAt && a.interview?.status === 'scheduled' && new Date(a.interview.startAt) >= dayStart && new Date(a.interview.startAt) <= dayEnd).length
                  const remaining = Math.max(0, 10 - existingCount)
                  return <p className="mt-3 text-[12px] font-semibold text-[#555]">Slots remaining for {interviewDate}: <span className="font-bold">{remaining}</span></p>
                })()}
                <p className="mt-3 text-[11.5px] leading-[1.6] text-[#8b7a69]">The API only accepts future Thursdays or Sundays. The 3:00–5:00 PM IST window is divided evenly between selected candidates; each receives a Google Calendar invitation and a PL Robotics email.</p>
                {interviewError && <p className="mt-3 text-[12.5px] font-semibold text-red-600">{interviewError}</p>}
              </div>
            )}
            {loadingApps ? (
              <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="bg-white h-52 rounded-2xl animate-pulse" style={{ border: '1px solid rgba(0,0,0,0.07)' }} />)}</div>
            ) : (
              <div className="space-y-4">
                {applications.map(app => {
                  const sc = statusColors[app.status] || statusColors.new
                  const applicantName = [app.firstName, app.middleName, app.lastName].filter(Boolean).join(' ') || 'Unnamed applicant'
                  const submittedAt = app.createdAt
                    ? new Date(app.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
                    : 'Date unavailable'
                  const hasAtsScore = Number.isFinite(app.atsScore)
                  const isInterviewScheduled = app.interview?.status === 'scheduled'
                  const isSelectedForInterview = selectedInterviewIds.includes(app._id)
                  return (
                    <motion.div
                      key={app._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-[20px] px-5 py-5 flex items-start justify-between gap-6 flex-wrap sm:px-7 sm:py-6"
                      style={{ border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 3px 18px rgba(0,0,0,0.05)' }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <p className="font-bold text-[17px] text-[#111] tracking-tight">{applicantName}</p>
                          <span
                            className="text-[10.5px] font-semibold tracking-[1px] uppercase px-2.5 py-[3px] rounded-full"
                            style={{ background: app.applicantType === 'intern' ? 'rgba(255,125,0,0.08)' : 'rgba(30,100,220,0.07)', color: app.applicantType === 'intern' ? '#FF7D00' : '#1e64dc', border: `1px solid ${app.applicantType === 'intern' ? 'rgba(255,125,0,0.2)' : 'rgba(30,100,220,0.18)'}` }}
                          >
                            {app.applicantType}
                          </span>
                          <span
                            className="text-[10.5px] font-bold tracking-[0.5px] uppercase px-2.5 py-[3px] rounded-full"
                            style={{
                              background: hasAtsScore ? 'rgba(20,160,80,0.07)' : 'rgba(0,0,0,0.04)',
                              color: hasAtsScore ? '#148f49' : '#999',
                              border: `1px solid ${hasAtsScore ? 'rgba(20,160,80,0.18)' : 'rgba(0,0,0,0.08)'}`,
                            }}
                          >
                            ATS {hasAtsScore ? `${app.atsScore.toFixed(1)}/10` : 'Not scored'}
                          </span>
                        </div>
                        <p className="text-[13.5px] font-semibold text-[#444] mb-2">{app.jobTitle}</p>
                        <div className="grid gap-x-6 gap-y-1.5 text-[12.5px] text-[#666] sm:grid-cols-2">
                          <a href={`mailto:${app.email}`} className="break-all hover:text-orange">{app.email}</a>
                          <a href={`tel:${app.phone}`} className="hover:text-orange">{app.phone}</a>
                          <span>{app.currentLocation || 'Location not provided'}</span>
                          <span>{app.currentlyEmployed ? 'Currently employed' : 'Not currently employed'}</span>
                        </div>
                        {app.employerDetails && <p className="mt-2 text-[12.5px] leading-[1.6] text-[#777]">{app.employerDetails}</p>}
                        <p className="mt-3 text-[11.5px] text-[#aaa]">Submitted {submittedAt}</p>
                        {app.attachmentDriveLink && (
                          <a href={app.attachmentDriveLink} target="_blank" rel="noopener noreferrer" className="text-[12px] font-semibold text-orange hover:underline">
                            View Resume
                          </a>
                        )}
                        {app.projectDriveLink && (
                          <a href={app.projectDriveLink} target="_blank" rel="noopener noreferrer" className="ml-4 text-[12px] font-semibold text-[#666] hover:text-orange hover:underline">
                            View Project / Portfolio
                          </a>
                        )}
                        {app.message && <p className="text-[12.5px] text-[#777] mt-2 max-w-[500px] leading-[1.6]">"{app.message}"</p>}
                        {isInterviewScheduled && (
                          <div className="mt-4 flex items-center gap-3 flex-wrap rounded-xl bg-[#f4fbf6] px-3 py-2.5 text-[12px]" style={{ border: '1px solid rgba(20,160,80,0.18)' }}>
                            <span className="font-bold text-[#168044]">Interview: {formatScheduledInterview(app.interview)}</span>
                            {app.interview.interviewerName && <span className="text-[#397052]">Interviewer: {app.interview.interviewerName}</span>}
                            {app.interview.meetLink && <a href={app.interview.meetLink} target="_blank" rel="noopener noreferrer" className="font-bold text-orange hover:underline">Join Google Meet →</a>}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                        <label className={`inline-flex items-center gap-2 rounded-lg px-3 py-[8px] text-[12px] font-semibold ${isInterviewScheduled ? 'cursor-not-allowed bg-[#f5f3ef] text-[#aaa]' : 'cursor-pointer bg-[#fff8f0] text-orange'}`} style={{ border: '1px solid rgba(255,125,0,0.2)' }}>
                          <input type="checkbox" checked={isSelectedForInterview} disabled={isInterviewScheduled} onChange={() => toggleInterviewCandidate(app._id)} className="accent-[#FF7D00]" />
                          {isInterviewScheduled ? 'Scheduled' : 'Interview'}
                        </label>
                        {isInterviewScheduled && (
                          <>
                            <button onClick={() => openEditInterview(app)} className="text-[12px] font-semibold text-[#555] hover:text-orange px-3 py-[8px] rounded-lg transition-colors duration-200 cursor-pointer" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
                              Edit Interview
                            </button>
                            <button onClick={async () => { if (!confirm('Cancel this interview?')) return; try { await adminCancelInterview(app._id, password); loadApps() } catch (err) { alert(err.message) } }} className="text-[12px] font-semibold text-[#aaa] hover:text-red-500 px-3 py-[8px] rounded-lg transition-colors duration-200 cursor-pointer" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
                              Cancel Interview
                            </button>
                          </>
                        )}
                        <select
                          value={app.status}
                          onChange={e => updateStatus(app._id, e.target.value)}
                          className="text-[12px] font-semibold px-3 py-[8px] rounded-lg cursor-pointer outline-none"
                          style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
                        >
                          <option value="new">New</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        <button
                          onClick={() => deleteApp(app._id)}
                          className="text-[12px] font-semibold text-[#999] hover:text-red-500 hover:bg-red-50 transition-colors duration-200 cursor-pointer px-3 py-[8px] rounded-lg"
                          style={{ border: '1px solid rgba(0,0,0,0.1)' }}
                        >
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
                {applications.length === 0 && <p className="text-center text-[#ccc] py-16 text-[14px]">No applications received yet.</p>}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── JOB FORM MODAL ── */}
      {/* ── EDIT INTERVIEW MODAL ── */}
      <AnimatePresence>
        {editingApp && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center px-4" style={{ background: 'rgba(10,6,2,0.72)', backdropFilter: 'blur(6px)' }} onClick={closeEdit}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.28 }} className="w-full max-w-[520px] bg-white rounded-2xl p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[18px]">Edit Interview</h3>
                <button onClick={closeEdit} className="text-[#bbb] hover:text-[#333]">Close</button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-[13px] font-semibold mb-1">Interview Date</label>
                  <input type="date" value={editDate} onChange={e => setEditDate(e.target.value)} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2" />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold mb-1">Assign Interviewer</label>
                  <select value={editInterviewer} onChange={e => setEditInterviewer(e.target.value)} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2">
                    <option value="">Select interviewer</option>
                    {interviewers.map(i => <option key={i.email} value={i.email}>{i.name}</option>)}
                  </select>
                </div>
                {editError && <p className="text-red-600">{editError}</p>}
                <div className="flex items-center gap-3 mt-4">
                  <button disabled={editing} onClick={submitEdit} className="bg-orange text-white px-4 py-2 rounded-xl">{editing ? 'Saving...' : 'Save changes'}</button>
                  <button onClick={closeEdit} className="px-4 py-2 rounded-xl border">Cancel</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4"
            style={{ background: 'rgba(10,6,2,0.72)', backdropFilter: 'blur(6px)' }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[680px] max-h-[88vh] overflow-y-auto rounded-[28px] bg-white"
              style={{ boxShadow: '0 32px 100px rgba(0,0,0,0.22)' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 bg-white rounded-t-[28px]" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                <h2 className="font-bold text-[18px] text-[#111] tracking-tight">{editingJob ? 'Edit Job' : 'New Job Posting'}</h2>
                <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-[#bbb] hover:text-[#333] hover:bg-[#f5f3ef] transition-all cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 4L4 12M4 4l8 8"/></svg>
                </button>
              </div>

              <form onSubmit={saveJob} className="px-8 py-7 space-y-5">
                {formError && <div className="text-[13px] text-red-500 bg-red-50 px-4 py-3 rounded-xl" style={{ border: '1px solid rgba(220,0,0,0.12)' }}>{formError}</div>}

                <div className="grid grid-cols-2 gap-4">
                  {[['title','Job Title *'],['dept','Department *'],['location','Location'],['positionType','Position Type']].map(([key, label]) => (
                    <div key={key}>
                      <label className="block text-[11.5px] font-semibold text-[#666] mb-1.5">{label}</label>
                      <input value={formData[key]} onChange={e => setFormData(f => ({...f, [key]: e.target.value}))}
                        className="w-full px-4 py-[9px] text-[13.5px] bg-[#f9f6f1] rounded-xl outline-none focus:ring-2 focus:ring-orange/20"
                        style={{ border: '1px solid rgba(0,0,0,0.09)' }} />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-[11.5px] font-semibold text-[#666] mb-1.5">Role Overview *</label>
                  <textarea value={formData.overview} onChange={e => setFormData(f => ({...f, overview: e.target.value}))}
                    rows={3} className="w-full px-4 py-[9px] text-[13.5px] bg-[#f9f6f1] rounded-xl outline-none focus:ring-2 focus:ring-orange/20 resize-none"
                    style={{ border: '1px solid rgba(0,0,0,0.09)' }} />
                </div>

                {[['responsibilities','Responsibilities (one per line)'],['requiredSkills','Required Skills (one per line)'],['educationRequirements','Education Requirements (one per line)'],['additionalSkills','Additional Skills (one per line)'],['whyJoin','Why Join Us (one per line)']].map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-[11.5px] font-semibold text-[#666] mb-1.5">{label}</label>
                    <textarea value={formData[key]} onChange={e => setFormData(f => ({...f, [key]: e.target.value}))}
                      rows={4} className="w-full px-4 py-[9px] text-[13.5px] bg-[#f9f6f1] rounded-xl outline-none focus:ring-2 focus:ring-orange/20 resize-none"
                      style={{ border: '1px solid rgba(0,0,0,0.09)' }} />
                  </div>
                ))}

                <div>
                  <label className="block text-[11.5px] font-semibold text-[#666] mb-1.5">Tags (comma separated)</label>
                  <input value={formData.tags} onChange={e => setFormData(f => ({...f, tags: e.target.value}))}
                    placeholder="React, Python, ROS 2"
                    className="w-full px-4 py-[9px] text-[13.5px] bg-[#f9f6f1] rounded-xl outline-none focus:ring-2 focus:ring-orange/20"
                    style={{ border: '1px solid rgba(0,0,0,0.09)' }} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[['applyInternUrl','Intern Application URL'],['applyJobUrl','Employee Application URL']].map(([key, label]) => (
                    <div key={key}>
                      <label className="block text-[11.5px] font-semibold text-[#666] mb-1.5">{label}</label>
                      <input value={formData[key]} onChange={e => setFormData(f => ({...f, [key]: e.target.value}))}
                        className="w-full px-4 py-[9px] text-[13.5px] bg-[#f9f6f1] rounded-xl outline-none focus:ring-2 focus:ring-orange/20"
                        style={{ border: '1px solid rgba(0,0,0,0.09)' }} />
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-1">
                  {[['isPaid','Paid opportunity'],['isActive','Active (visible on site)']].map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={formData[key]} onChange={e => setFormData(f => ({...f, [key]: e.target.checked}))}
                        className="w-4 h-4 accent-orange" />
                      <span className="text-[13px] text-[#555]">{label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-3 sticky bottom-0 bg-white pb-2">
                  <motion.button type="submit" disabled={saving} whileHover={{ scale: saving ? 1 : 1.02 }} whileTap={{ scale: saving ? 1 : 0.97 }}
                    className="flex-1 bg-orange text-white font-bold text-[13.5px] py-[12px] rounded-xl cursor-pointer disabled:opacity-60"
                    style={{ boxShadow: '0 4px 18px rgba(255,125,0,0.28)' }}>
                    {saving ? 'Saving...' : editingJob ? 'Save Changes' : 'Create Job'}
                  </motion.button>
                  <button type="button" onClick={() => setShowForm(false)}
                    className="px-6 py-[12px] text-[13px] text-[#888] hover:text-[#333] rounded-xl cursor-pointer transition-colors"
                    style={{ border: '1px solid rgba(0,0,0,0.09)' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
