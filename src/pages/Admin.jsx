import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  adminFetchJobs, adminCreateJob, adminUpdateJob, adminDeleteJob,
  adminFetchApplications, adminUpdateAppStatus, adminDeleteApplication, adminFetchInterviewers, adminScheduleInterviews,
  adminEditInterview, adminCancelInterview,
  adminSendInterviewRoundEmail,
} from '../hooks/useJobs'
import AttendanceCalendar from '../components/AttendanceCalendar'
import { adminAssignTask, adminChangePassword, adminClearAttendance, adminCreateEmployee, adminDeleteEmployee, adminDownloadEmployeeDocument, adminFetchAttendance, adminFetchAttendanceSummary, adminFetchEmployeeDocuments, adminFetchEmployees, adminFetchLeaveRequests, adminFetchSalarySlips, adminFetchTasks, adminSaveAttendance, adminSetEmployeePortal, adminUpdateLeaveRequest, adminUploadEmployeeDocument, adminUploadSalarySlip, employeeLogin } from '../services/api'

const INTERVIEW_ROLES = ['Robotics Engineer', 'Mechanical Engineer', 'Electronics Engineer', 'Technical Sales Engineer', 'UI Developer', 'Human Resources']
const MEET_LINKS = { 'Robotics Engineer': 'https://meet.google.com/vck-cqkr-yvd', 'Mechanical Engineer': 'https://meet.google.com/mcq-zjio-qez', 'Electronics Engineer': 'https://meet.google.com/pts-pxon-knm' }
const OFFICE_ADDRESS = 'Office No: 401, Pooja Complex,\nTelco Road, near Quality Circle,\nMIDC Bhosari, PCMC,\nMaharashtra - 411026'
const MAPS_LINK = 'https://maps.app.goo.gl/7PzDa7FfWS9jmVLF6'
const DEFAULT_INSTRUCTIONS = 'Please bring your laptop for the interview and any technical discussion.\nPlease carry 2–3 copies of your updated resume along with passport-size photographs.\nPlease have your previous work, relevant projects, and relevant design files ready to present and discuss.\nBe prepared to explain your project contributions, design decisions, tools used, and technical approach.\nKindly be punctual and report at the scheduled time.'
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

function formatInterviewTime(date) {
    if (!date) return ''
    const formattedDate = new Date(`${date}T00:00:00+05:30`).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' })
    return `${formattedDate}, 3:00–5:00 PM IST`
}

function formatScheduledInterview(interview) {
  if (!interview?.startAt) return ''
  const dateStr = new Date(interview.startAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' })
  const start = new Date(interview.startAt).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' })
  const end = new Date(interview.endAt).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' })
  return `${dateStr}, ${start}–${end} IST`
}

function formatMinutes(minutes) {
  if (minutes === null || minutes === undefined) return '—'
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`
}

function currentIndiaDateKey() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
}

function currentIndiaMonthKey() {
  return currentIndiaDateKey().slice(0, 7)
}

function attendanceMinutesWorked(record) {
  if (!record.loginAt) return null
  const start = new Date(record.loginAt).getTime()
  const end = record.logoutAt
    ? new Date(record.logoutAt).getTime()
    : record.date === currentIndiaDateKey() ? Date.now() : null
  if (end === null || !Number.isFinite(start) || !Number.isFinite(end) || end < start) return null
  return Math.floor((end - start) / 60000)
}

function formatIndiaTime(value) {
  return value
    ? new Date(value).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })
    : '—'
}

function formatWorkedTime(record) {
  const minutes = record.minutesWorked ?? attendanceMinutesWorked(record)
  const duration = formatMinutes(minutes)
  return record.loginAt && !record.logoutAt && minutes !== null ? `${duration} · ongoing` : duration
}

function getInterviewRoleKey(jobTitle = '') {
  const normalized = String(jobTitle).toLowerCase()
  if (normalized.includes('robotics')) return 'robotics'
  if (normalized.includes('mechanical')) return 'mechanical'
  if (normalized.includes('electronics') || normalized.includes('electronic')) return 'electronics'
  return normalized || 'other'
}

export default function Admin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const canManageEmployees = ['hr', 'admin'].includes(role)
  const [employeeLoginName, setEmployeeLoginName] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [tab, setTab] = useState('jobs')
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordFormCurrent, setPasswordFormCurrent] = useState('')
  const [passwordFormNew, setPasswordFormNew] = useState('')
  const [passwordFormConfirm, setPasswordFormConfirm] = useState('')
  const [passwordFormError, setPasswordFormError] = useState('')
  const [passwordFormMessage, setPasswordFormMessage] = useState('')
  const [passwordFormBusy, setPasswordFormBusy] = useState(false)

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
  const [editInterviewerEmails, setEditInterviewerEmails] = useState([])
  const [editing, setEditing] = useState(false)
  const [editError, setEditError] = useState('')
  const [employees, setEmployees] = useState([])
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
  const [attendance, setAttendance] = useState([])
  const [employeeName, setEmployeeName] = useState('')
  const [employeeEmail, setEmployeeEmail] = useState('')
  const [employeePassword, setEmployeePassword] = useState('')
  const [portalPassword, setPortalPassword] = useState('')
  const [pastEmployeeId, setPastEmployeeId] = useState('')
  const [pastEmployeePassword, setPastEmployeePassword] = useState('')
  const [pastAttendance, setPastAttendance] = useState([])
  const [pastMonth, setPastMonth] = useState(currentIndiaMonthKey)
  const [pastAttendanceError, setPastAttendanceError] = useState('')
  const [documentEmployeeId, setDocumentEmployeeId] = useState('')
  const [employeeDocuments, setEmployeeDocuments] = useState([])
  const [employeeDocumentFile, setEmployeeDocumentFile] = useState(null)
  const [employeeDocumentsError, setEmployeeDocumentsError] = useState('')
  const [employeeDocumentsMessage, setEmployeeDocumentsMessage] = useState('')
  const [employeeDocumentsBusy, setEmployeeDocumentsBusy] = useState(false)
  const [downloadingDocumentId, setDownloadingDocumentId] = useState('')
  const [portalMessage, setPortalMessage] = useState('')
  const [leaveRequests, setLeaveRequests] = useState([])
  const [leaveError, setLeaveError] = useState('')
  const [attendanceError, setAttendanceError] = useState('')
  const [savingAttendance, setSavingAttendance] = useState(false)
  const [attendanceSummary, setAttendanceSummary] = useState([])
  const [summaryMonth, setSummaryMonth] = useState(() => { const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}` })
  const [summaryError, setSummaryError] = useState('')
  const [tasks, setTasks] = useState([])
  const [taskError, setTaskError] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDueDate, setTaskDueDate] = useState('')
  const [taskEmployeeId, setTaskEmployeeId] = useState('')
  const [taskBusy, setTaskBusy] = useState(false)
  const [salarySlips, setSalarySlips] = useState([])
  const [salaryEmployeeId, setSalaryEmployeeId] = useState('')
  const [salaryMonth, setSalaryMonth] = useState(() => { const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}` })
  const [salaryFile, setSalaryFile] = useState(null)
  const [salaryBusy, setSalaryBusy] = useState(false)
  const [salaryMessage, setSalaryMessage] = useState('')
  const [candidateEmailForm, setCandidateEmailForm] = useState({ role: INTERVIEW_ROLES[0], date: '', time: '11:00', mode: 'online', meetingLink: MEET_LINKS[INTERVIEW_ROLES[0]], address: OFFICE_ADDRESS, mapsLink: MAPS_LINK, details: '', instructions: DEFAULT_INSTRUCTIONS })
  const [selectedEmailCandidates, setSelectedEmailCandidates] = useState([])
  const [pastedCandidates, setPastedCandidates] = useState('')
  const [sendingCandidateEmail, setSendingCandidateEmail] = useState(false)
  const [candidateEmailMessage, setCandidateEmailMessage] = useState(null)
  const [emailSentPopup, setEmailSentPopup] = useState(null)
  const activeEmployees = employees.filter(employee => employee.isActive)
  const pastEmployees = employees.filter(employee => !employee.isActive)
  const pastMonthRecords = pastAttendance.filter(record => record.date.startsWith(pastMonth))
  const pastPresentDays = pastMonthRecords.reduce((total, record) => total + (record.status === 'half_day' ? 0.5 : ['present', 'wfh'].includes(record.status) ? 1 : 0), 0)
  const pastLeaveDays = pastMonthRecords.filter(record => record.status === 'informed_leave').length
  const pastAbsentDays = pastMonthRecords.filter(record => record.status === 'absent').length
  const pastTotalMinutes = pastMonthRecords.reduce((total, record) => total + (attendanceMinutesWorked(record) || 0), 0)

  // Login
  const login = async e => {
    e.preventDefault()
    setAuthError('')
    try {
      if (role === 'employee') {
        const result = await employeeLogin({ name: employeeLoginName, password })
        sessionStorage.setItem('plr_employee_token', result.token)
        navigate('/employee')
        return
      }
      await adminFetchJobs(password, role)
      setAuthed(true)
      loadJobs()
      loadApps()
      loadInterviewers()
      loadEmployees()
    } catch (err) {
      if (err?.status === 401) {
        setAuthError(role === 'employee' ? 'Invalid employee name or password.' : 'Incorrect password.')
      } else if (err instanceof TypeError) {
        setAuthError('Could not reach the sign-in service. Please try again later.')
      } else {
        setAuthError(err instanceof Error ? `Sign-in failed: ${err.message}` : 'Sign-in failed. Please try again.')
      }
    }
  }

  const changeAdminPassword = async event => {
    event.preventDefault()
    setPasswordFormError('')
    setPasswordFormMessage('')
    if (passwordFormNew !== passwordFormConfirm) {
      setPasswordFormError('New passwords do not match.')
      return
    }
    setPasswordFormBusy(true)
    try {
      await adminChangePassword(passwordFormNew, passwordFormCurrent, role)
      setPassword(passwordFormNew)
      setPasswordFormCurrent('')
      setPasswordFormNew('')
      setPasswordFormConfirm('')
      setPasswordFormMessage('Your password has been changed.')
    } catch (err) { setPasswordFormError(err.message) }
    finally { setPasswordFormBusy(false) }
  }

  const loadJobs = async () => {
    setLoadingJobs(true)
    try { setJobs(await adminFetchJobs(password, role)) }
    catch { /* handled */ }
    finally { setLoadingJobs(false) }
  }

  const loadApps = async () => {
    setLoadingApps(true)
    try { setApplications(await adminFetchApplications(password, role)) }
    catch { /* handled */ }
    finally { setLoadingApps(false) }
  }

  // Helpers: convert textarea lines to/from arrays
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
        await adminUpdateJob(editingJob._id, payload, password, role)
      } else {
        await adminCreateJob(payload, password, role)
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
    await adminDeleteJob(id, password, role)
    loadJobs()
  }

  const toggleActive = async job => {
    await adminUpdateJob(job._id, { isActive: !job.isActive }, password, role)
    loadJobs()
  }

  const updateStatus = async (id, status) => {
    await adminUpdateAppStatus(id, status, password, role)
    loadApps()
  }

  const deleteApp = async id => {
    if (!confirm('Delete this application?')) return
    await adminDeleteApplication(id, password, role)
    loadApps()
  }

  const loadInterviewers = async () => {
    try { setInterviewers(await adminFetchInterviewers(password, role)) }
    catch { setInterviewError('Unable to load the interviewer list.') }
  }

  const loadEmployees = async () => {
    try { setEmployees(await adminFetchEmployees(password, role)) }
    catch { setAttendanceError('Unable to load employees.') }
  }

  const loadAttendanceSummary = async month => {
    try {
      const result = await adminFetchAttendanceSummary(month, password, role)
      setAttendanceSummary(result.employees)
      setSummaryError('')
    } catch (err) { setSummaryError(err.message) }
  }

  const loadTasks = async () => {
    try { setTasks(await adminFetchTasks(password, role)); setTaskError('') }
    catch (err) { setTaskError(err.message) }
  }

  useEffect(() => {
    if (!authed || tab !== 'tasks') return undefined
    let active = true
    const refresh = async () => {
      try {
        const latestTasks = await adminFetchTasks(password, role)
        if (active) { setTasks(latestTasks); setTaskError('') }
      } catch (err) {
        if (active) setTaskError(err.message)
      }
    }
    refresh()
    const timer = window.setInterval(refresh, 20000)
    return () => { active = false; window.clearInterval(timer) }
  }, [authed, tab, password, role])

  const assignTask = async event => {
    event.preventDefault()
    if (!taskEmployeeId) return
    setTaskBusy(true)
    setTaskError('')
    try {
      await adminAssignTask({ employeeId: taskEmployeeId, title: taskTitle, description: taskDescription, dueDate: taskDueDate }, password, role)
      setTaskTitle('')
      setTaskDescription('')
      setTaskDueDate('')
      await loadTasks()
    } catch (err) { setTaskError(err.message) }
    finally { setTaskBusy(false) }
  }

  const loadLeaveRequests = async () => {
    try { setLeaveRequests(await adminFetchLeaveRequests(password, role)); setLeaveError('') }
    catch (err) { setLeaveError(err.message) }
  }

  const updateLeaveRequest = async (id, status) => {
    try {
      const updated = await adminUpdateLeaveRequest(id, status, password, role)
      setLeaveRequests(current => current.map(item => item._id === updated._id ? updated : item))
    } catch (err) { setLeaveError(err.message) }
  }

  const loadAttendance = async employeeId => {
    if (!employeeId) { setAttendance([]); return }
    try { setAttendance(await adminFetchAttendance(employeeId, password, role)); setAttendanceError('') }
    catch (err) { setAttendanceError(err.message) }
  }

  const loadPastAttendance = async employeeId => {
    if (!employeeId) { setPastAttendance([]); return }
    setPastAttendance([])
    setPastAttendanceError('')
    try {
      const [records, requests] = await Promise.all([
        adminFetchAttendance(employeeId, password, role),
        adminFetchLeaveRequests(password, role),
      ])
      const byDate = new Map(records.map(record => [record.date, record]))
      requests
        .filter(request => request.status === 'approved' && String(request.employeeId?._id || request.employeeId) === employeeId)
        .forEach(request => {
          for (let date = request.startDate; date <= request.endDate; date = new Date(new Date(`${date}T00:00:00Z`).getTime() + 86400000).toISOString().slice(0, 10)) {
            const existing = byDate.get(date)
            if (!existing || existing.status === 'absent') byDate.set(date, { date, status: 'informed_leave' })
          }
        })
      setPastAttendance([...byDate.values()].sort((a, b) => a.date.localeCompare(b.date)))
    } catch (err) { setPastAttendanceError(err.message) }
  }

  const loadEmployeeDocuments = async employeeId => {
    setEmployeeDocumentsError('')
    if (!employeeId) { setEmployeeDocuments([]); return }
    try { setEmployeeDocuments(await adminFetchEmployeeDocuments(employeeId, password, role)) }
    catch (err) { setEmployeeDocumentsError(err.message) }
  }

  const uploadEmployeeDocument = async event => {
    event.preventDefault()
    if (!documentEmployeeId || !employeeDocumentFile) return
    setEmployeeDocumentsBusy(true)
    setEmployeeDocumentsError('')
    setEmployeeDocumentsMessage('')
    try {
      const form = event.currentTarget
      await adminUploadEmployeeDocument(documentEmployeeId, employeeDocumentFile, password, role)
      setEmployeeDocumentFile(null)
      form.querySelector('input[type="file"]').value = ''
      await loadEmployeeDocuments(documentEmployeeId)
      setEmployeeDocumentsMessage('Document uploaded. It is now available on the employee dashboard.')
    } catch (err) { setEmployeeDocumentsError(err.message) }
    finally { setEmployeeDocumentsBusy(false) }
  }

  const downloadEmployeeDocument = async document => {
    setDownloadingDocumentId(document._id)
    setEmployeeDocumentsError('')
    try { await adminDownloadEmployeeDocument(documentEmployeeId, document, password, role) }
    catch (err) { setEmployeeDocumentsError(err.message) }
    finally { setDownloadingDocumentId('') }
  }

  const loadSalarySlips = async employeeId => {
    if (!employeeId) { setSalarySlips([]); return }
    try { setSalarySlips(await adminFetchSalarySlips(employeeId, password, role)); setSalaryMessage('') }
    catch (err) { setSalaryMessage(err.message) }
  }

  const uploadSalarySlip = async event => {
    event.preventDefault()
    if (!salaryEmployeeId || !salaryFile) return
    setSalaryBusy(true)
    setSalaryMessage('')
    try {
      const form = event.currentTarget
      await adminUploadSalarySlip(salaryEmployeeId, salaryMonth, salaryFile, password, role)
      setSalaryFile(null)
      form.querySelector('input[type="file"]').value = ''
      await loadSalarySlips(salaryEmployeeId)
      setSalaryMessage('Salary slip uploaded. The employee can now download it from their dashboard.')
    } catch (err) { setSalaryMessage(err.message) }
    finally { setSalaryBusy(false) }
  }

  const addEmployee = async event => {
    event.preventDefault()
    setAttendanceError('')
    try {
      const employee = await adminCreateEmployee({ name: employeeName, email: employeeEmail, password: employeePassword }, password, role)
      setEmployees(current => [...current, employee].sort((a, b) => a.name.localeCompare(b.name)))
      setSelectedEmployeeId(employee._id)
      setEmployeeName('')
      setEmployeeEmail('')
      setEmployeePassword('')
    } catch (err) { setAttendanceError(err.message) }
  }

  const enableEmployeePortal = async () => {
    if (!selectedEmployeeId) return
    setAttendanceError('')
    setPortalMessage('')
    try {
      const updatedEmployee = await adminSetEmployeePortal(selectedEmployeeId, portalPassword, password, role)
      setEmployees(current => current.map(employee => employee._id === updatedEmployee._id ? updatedEmployee : employee))
      setPortalPassword('')
      setPortalMessage('Employee dashboard is active. Share the password with the employee securely.')
    } catch (err) { setAttendanceError(err.message) }
  }

  const restorePastEmployee = async () => {
    if (!pastEmployeeId || pastEmployeePassword.length < 8) return
    setAttendanceError('')
    try {
      const updatedEmployee = await adminSetEmployeePortal(pastEmployeeId, pastEmployeePassword, password, role)
      setEmployees(current => current.map(employee => employee._id === updatedEmployee._id ? updatedEmployee : employee))
      setPastEmployeePassword('')
      setPastEmployeeId('')
      setPastAttendance([])
      setPortalMessage('Employee dashboard restored.')
    } catch (err) { setAttendanceError(err.message) }
  }

  const removeEmployee = async () => {
    const employee = employees.find(item => item._id === selectedEmployeeId)
    if (!employee || !confirm(`Remove ${employee.name} from the employee list? Their attendance history will be retained.`)) return
    setAttendanceError('')
    try {
      await adminDeleteEmployee(employee._id, password, role)
      setEmployees(current => current.map(item => item._id === employee._id ? { ...item, isActive: false, portalEnabled: false } : item))
      setSelectedEmployeeId('')
      setAttendance([])
    } catch (err) { setAttendanceError(err.message) }
  }

  const changeAttendance = async (date, status) => {
    if (!selectedEmployeeId || savingAttendance) return
    setSavingAttendance(true)
    setAttendanceError('')
    try {
      if (status) await adminSaveAttendance(selectedEmployeeId, date, status, password, role)
      else await adminClearAttendance(selectedEmployeeId, date, password, role)
      await loadAttendance(selectedEmployeeId)
    } catch (err) { setAttendanceError(err.message) }
    finally { setSavingAttendance(false) }
  }

  const sendCandidateInterviewEmail = async event => {
    event.preventDefault()
    const imported = pastedCandidates.split(/\r?\n/).map(line => line.split(/[\t,;]/).map(value => value.trim())).filter(parts => parts.length >= 2 && parts[0] && parts[1] && parts[1].includes('@')).map(([name, email]) => ({ name, email }))
    const candidates = [...selectedEmailCandidates, ...imported].filter((candidate, index, list) => list.findIndex(other => other.email.toLowerCase() === candidate.email.toLowerCase()) === index)
    if (!candidates.length) {
      setCandidateEmailMessage({ type: 'error', text: 'Select candidates or paste a list of names and email addresses.' })
      return
    }
    setSendingCandidateEmail(true)
    setCandidateEmailMessage(null)
    try {
      const result = await adminSendInterviewRoundEmail({ ...candidateEmailForm, candidates }, password, role)
      setCandidateEmailMessage({ type: result.failed ? 'error' : 'success', text: `Sent ${result.sent} of ${candidates.length} interview emails.${result.failed ? ` ${result.failed} failed: ${result.results.filter(item => !item.sent).map(item => `${item.email} (${item.error})`).join('; ')}` : ''}` })
      if (result.sent > 0) setEmailSentPopup({ sent: result.sent, total: candidates.length, failed: result.failed })
    } catch (error) {
      setCandidateEmailMessage({ type: 'error', text: error.message })
    } finally {
      setSendingCandidateEmail(false)
    }
  }

  const emailRecipients = [...selectedEmailCandidates, ...pastedCandidates.split(/\r?\n/).map(line => line.split(/[\t,;]/).map(value => value.trim())).filter(parts => parts.length >= 2 && parts[0] && parts[1]?.includes('@')).map(([name, email]) => ({ name, email }))].filter((candidate, index, list) => list.findIndex(other => other.email.toLowerCase() === candidate.email.toLowerCase()) === index)
  const previewCandidate = emailRecipients[0] || { name: 'Candidate Name', email: 'candidate@example.com' }
  const previewDate = candidateEmailForm.date ? new Date(`${candidateEmailForm.date}T00:00:00+05:30`).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full' }) : 'Selected interview date'
  const previewTime = candidateEmailForm.time ? new Date(`2000-01-01T${candidateEmailForm.time}:00+05:30`).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' }) : 'Selected time'
  const emailPreviewHtml = `<!doctype html><html><body style="margin:0;padding:20px;background:#f4efe8;font-family:Arial,sans-serif;color:#1a1208"><div style="max-width:620px;margin:auto;background:white;border:1px solid #eadfd3;border-radius:18px;overflow:hidden"><header style="background:#fff8f0;padding:26px;border-bottom:1px solid #eadfd3"><small style="color:#FF7D00;letter-spacing:2px;font-weight:bold">INTERVIEW SCHEDULED</small><h1 style="font-size:24px">P. L. Robotics ${candidateEmailForm.mode === 'online' ? 'Online' : 'Offline'} Interview Round</h1></header><main style="padding:26px"><p>Dear ${previewCandidate.name},</p><p>Congratulations on being shortlisted for an <b>${candidateEmailForm.mode === 'online' ? 'online' : 'offline'}</b> interview for the <b>${candidateEmailForm.role}</b> role.</p><p>We are pleased to invite you to an interview and discussion. The details are as follows:</p><section style="padding:20px;background:#fffaf4;border:1px solid #eadfd3;border-radius:14px"><h2>Interview Schedule</h2><table width="100%">${[['Role', candidateEmailForm.role], ['Date', previewDate], ['Reporting Time', `${previewTime} IST`], ['Mode', candidateEmailForm.mode === 'online' ? 'Online' : 'Offline (In-person)'], ...(candidateEmailForm.mode === 'online' ? [['Meeting Link', candidateEmailForm.meetingLink || 'Add a meeting link']] : [['Venue', 'View Google Maps Location'], ['Office Address', candidateEmailForm.address]])].map(([label, value]) => `<tr><td style="padding:10px 0;color:#6f6256">${label}</td><td style="padding:10px 0;font-weight:bold">${value}</td></tr>`).join('')}</table>${candidateEmailForm.mode === 'offline' ? `<p><a href="${candidateEmailForm.mapsLink}" style="color:#FF7D00">${candidateEmailForm.mapsLink}</a></p>` : ''}${candidateEmailForm.details ? `<p>${candidateEmailForm.details.replace(/\n/g, '<br>')}</p>` : ''}</section><h2>Important Information</h2><ul>${candidateEmailForm.instructions.split('\n').filter(Boolean).map(item => `<li style="margin:8px 0">${item}</li>`).join('')}</ul><p>We look forward to meeting you.</p></main><footer style="padding:20px;background:#fffaf4;border-top:1px solid #eadfd3;color:#6f6256">Regards,<br><b style="color:#1a1208">P. L. Robotics Talent Acquisition Team</b></footer></div></body></html>`

  // Open edit modal for a single application
  const openEditInterview = app => {
    setEditingApp(app)
    setEditDate(app.interview?.startAt ? new Date(app.interview.startAt).toISOString().slice(0,10) : '')
    setEditInterviewerEmails(app.interview?.interviewers?.map(i => i.email) || [])
    setEditError('')
  }

  const closeEdit = () => {
    setEditingApp(null)
    setEditDate('')
    setEditInterviewerEmails([])
    setEditError('')
  }

  const submitEdit = async () => {
    if (!editDate || editInterviewerEmails.length === 0) {
      setEditError('Select a date and at least one interviewer')
      return
    }
    setEditing(true)
    setEditError('')
    try {
      await adminEditInterview(editingApp._id, editDate, editInterviewerEmails, password, role)
      loadApps()
      closeEdit()
    } catch (err) {
      setEditError(err.message)
    } finally {
      setEditing(false)
    }
  }

  const toggleInterviewCandidate = id => {
    if (selectedInterviewIds.includes(id)) {
      setSelectedInterviewIds(current => current.filter(candidateId => candidateId !== id))
      setInterviewAssignments(assignments => {
        const remaining = { ...assignments }
        delete remaining[id]
        return remaining
      })
      setInterviewError('')
    } else {
      const candidate = applications.find(application => application._id === id)
      const roleKey = getInterviewRoleKey(candidate?.jobTitle)
      const selectedForRole = selectedInterviewIds.filter(candidateId => {
        const selectedCandidate = applications.find(application => application._id === candidateId)
        return getInterviewRoleKey(selectedCandidate?.jobTitle) === roleKey
      }).length
      if (selectedForRole < 10) {
        setSelectedInterviewIds(current => [...current, id])
        setInterviewError('')
      } else {
        setInterviewError(`You can select up to 10 ${roleKey} candidates per day.`)
      }
    }
  }

  const scheduleInterviews = async () => {
    if (!interviewDate || !selectedInterviewIds.length) {
      setInterviewError('Select at least one candidate and an interview date.')
      return
    }
    const assignments = selectedInterviewIds.map(applicationId => ({
      applicationId,
      interviewerEmails: interviewAssignments[applicationId],
    }))
    if (assignments.some(assignment => !Array.isArray(assignment.interviewerEmails) || assignment.interviewerEmails.length === 0)) {
      setInterviewError('Assign interviewer(s) to every candidate.')
      return
    }
    setSchedulingInterviews(true)
    setInterviewError('')
    try {
      const result = await adminScheduleInterviews(selectedInterviewIds, interviewDate, assignments, password, role)
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

  // -- LOGIN SCREEN --
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
          <h1 className="font-bold text-[22px] text-[#111] mb-1 tracking-tight">{role === 'employee' ? 'Employee sign in' : 'Admin Dashboard'}</h1>
          <p className="text-[13.5px] text-[#aaa] mb-8">{role === 'employee' ? 'Enter your employee name and password to open your dashboard.' : 'Choose your role and enter your password to continue.'}</p>
          <form onSubmit={login} className="space-y-4">
            {authError && (
              <div className="text-[13px] text-red-500 bg-red-50 px-4 py-3 rounded-xl" style={{ border: '1px solid rgba(220,0,0,0.12)' }}>
                {authError}
              </div>
            )}
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full px-4 py-[11px] text-[14px] bg-[#f9f6f1] rounded-xl outline-none focus:ring-2 focus:ring-orange/20"
              style={{ border: '1px solid rgba(0,0,0,0.09)' }}
            >
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
              <option value="admin">Admin</option>
            </select>
            {role === 'employee' && <input
              required value={employeeLoginName}
              onChange={e => setEmployeeLoginName(e.target.value)}
              placeholder="Employee full name"
              autoComplete="username"
              className="w-full px-4 py-[11px] text-[14px] bg-[#f9f6f1] rounded-xl outline-none focus:ring-2 focus:ring-orange/20"
              style={{ border: '1px solid rgba(0,0,0,0.09)' }}
            />}
            <input
              required type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder={`${role === 'hr' ? 'HR' : role === 'employee' ? 'Employee' : 'Admin'} password`}
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

  // -- MAIN DASHBOARD --
  return (
    <div className="min-h-screen bg-cream">
      <div className={`${tab === 'interview email' ? 'max-w-[1720px]' : 'max-w-[1200px]'} mx-auto px-5 py-8 sm:px-8 lg:px-10 lg:py-10`}>

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-bold text-[26px] text-[#111] tracking-tight">{role === 'hr' ? 'HR Dashboard' : 'Admin Dashboard'}</h1>
            <p className="text-[13px] text-[#aaa] mt-1">Manage jobs, applications, interviews, employee attendance, leave, and tasks</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => { setShowPasswordForm(value => !value); setPasswordFormError(''); setPasswordFormMessage('') }} className="rounded-xl bg-white px-4 py-[10px] text-[13px] font-semibold text-[#555]" style={{ border: '1px solid rgba(0,0,0,0.1)' }}>Change password</button>
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
        </div>
        {showPasswordForm && <form onSubmit={changeAdminPassword} className="mb-6 rounded-2xl bg-white p-5 sm:p-6" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
          <h2 className="text-[16px] font-bold text-[#111]">Change {role === 'hr' ? 'HR' : 'admin'} password</h2>
          <p className="mt-1 text-[12px] text-[#887b6e]">Enter your current password and choose a new password of at least 8 characters.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <input required type="password" autoComplete="current-password" value={passwordFormCurrent} onChange={event => setPasswordFormCurrent(event.target.value)} placeholder="Current password" className="rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 text-[13px]" />
            <input required type="password" minLength={8} autoComplete="new-password" value={passwordFormNew} onChange={event => setPasswordFormNew(event.target.value)} placeholder="New password (8+ characters)" className="rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 text-[13px]" />
            <input required type="password" minLength={8} autoComplete="new-password" value={passwordFormConfirm} onChange={event => setPasswordFormConfirm(event.target.value)} placeholder="Confirm new password" className="rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 text-[13px]" />
          </div>
          {passwordFormError && <p role="alert" className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-600">{passwordFormError}</p>}
          {passwordFormMessage && <p role="status" className="mt-3 rounded-xl bg-green-50 px-4 py-3 text-[13px] text-green-700">{passwordFormMessage}</p>}
          <button disabled={passwordFormBusy || passwordFormNew.length < 8} className="mt-3 rounded-xl bg-orange px-5 py-2.5 text-[13px] font-bold text-white disabled:opacity-60">{passwordFormBusy ? 'Changing…' : 'Save new password'}</button>
        </form>}

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {['jobs', 'applications', 'attendance', 'salary slips', 'leave requests', 'tasks', 'employee documents', 'interview email', 'past employees'].map(t => (
            <button
              key={t}
              onClick={() => {
                setTab(t)
                if (t === 'applications') loadApps()
                if (t === 'attendance') { loadEmployees(); loadAttendanceSummary(summaryMonth) }
                if (t === 'salary slips') loadEmployees()
                if (t === 'leave requests') loadLeaveRequests()
                if (t === 'tasks') { loadEmployees(); loadTasks() }
                if (t === 'employee documents') loadEmployees()
                if (t === 'past employees') loadEmployees()
              }}
              className={`px-6 py-[9px] rounded-full text-[13px] font-semibold cursor-pointer capitalize transition-all duration-200 ${
                tab === t ? 'bg-orange text-white' : 'bg-white text-[#555] hover:text-orange'
              }`}
              style={{
                border: tab === t ? '1px solid #FF7D00' : '1px solid rgba(0,0,0,0.09)',
                boxShadow: tab === t ? '0 2px 12px rgba(255,125,0,0.28)' : '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              {t} {t === 'jobs' ? `(${jobs.length})` : t === 'applications' ? `(${applications.length})` : ''}
            </button>
          ))}
        </div>

        {/* -- JOBS TAB -- */}
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

        {/* -- APPLICATIONS TAB -- */}
        {tab === 'applications' && (
          <div>
            <div className="mb-5 flex items-start justify-between gap-5 flex-wrap">
              <div>
                <h2 className="font-bold text-[18px] text-[#111] tracking-tight">Applications Received</h2>
                <p className="mt-1 text-[12.5px] text-[#999]">Select up to 10 candidates for each role, then choose a Thursday or Sunday date for the fixed 3:00–5:00 PM IST interview slot.</p>
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
                  <div className="min-w-[140px]">
                    <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[1.2px] text-[#7b6c5e]">Interview slot</span>
                    <div className="rounded-xl border border-black/10 bg-[#faf7f2] px-4 py-2.5 text-[13px] text-[#55483d]">Thu/Sun 3:00–5:00 PM IST</div>
                  </div>
                  <button onClick={scheduleInterviews} disabled={schedulingInterviews} className="rounded-xl bg-orange px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_18px_rgba(255,125,0,0.28)] disabled:opacity-60">{schedulingInterviews ? 'Scheduling interviews...' : 'Confirm & email candidates'}</button>
                  <button onClick={() => { setSelectedInterviewIds([]); setInterviewAssignments({}); setInterviewError('') }} className="px-3 py-2.5 text-[12px] font-semibold text-[#777]">Clear</button>
                </div>
                <div className="mt-4 grid gap-3 text-[12px] text-[#66584c] sm:grid-cols-2">{selectedInterviewIds.map(id => {
                  const candidate = applications.find(application => application._id === id)
                  return <div key={id} className="rounded-lg bg-white p-3" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                    <p className="font-bold text-[#3f352b]">{candidate ? `${candidate.firstName} ${candidate.lastName}` : 'Candidate'}</p>
                    {interviewDate && <p className="mt-1 text-[#8b7a69]">{formatInterviewTime(interviewDate)}</p>}
                    <select
                      multiple
                      value={interviewAssignments[id] || []}
                      onChange={event => {
                        const selected = Array.from(event.target.selectedOptions).map(option => option.value)
                        setInterviewAssignments(assignments => ({ ...assignments, [id]: selected }))
                        setInterviewError('')
                      }}
                      className="mt-2 h-32 w-full rounded-lg border border-black/10 bg-[#faf7f2] px-2.5 py-2 text-[12px] font-medium text-[#55483d] outline-none focus:ring-2 focus:ring-orange/20"
                    >
                      {interviewers.map(interviewer => <option key={interviewer.email} value={interviewer.email}>{interviewer.name}</option>)}
                    </select>
                    <p className="mt-2 text-[11px] text-[#8b7a69]">Hold Ctrl/Cmd to select multiple interviewers. Electronics candidates require both Pratik and Shantanu.</p>
                  </div>
                })}</div>
                {/* Slots remaining per role */}
                {interviewDate && (() => {
                  const dayStart = new Date(`${interviewDate}T00:00:00+05:30`)
                  const dayEnd = new Date(`${interviewDate}T23:59:59.999+05:30`)
                  const roles = ['robotics', 'mechanical', 'electronics']
                  const remainingByRole = roles.map(role => {
                    const existingCount = applications.filter(a => a.interview?.startAt && a.interview?.status === 'scheduled' && getInterviewRoleKey(a.jobTitle) === role && new Date(a.interview.startAt) >= dayStart && new Date(a.interview.startAt) <= dayEnd).length
                    return `${role[0].toUpperCase()}${role.slice(1)}: ${Math.max(0, 10 - existingCount)}`
                  })
                  return <p className="mt-3 text-[12px] font-semibold text-[#555]">Slots remaining for {interviewDate} (per role): <span className="font-bold">{remainingByRole.join(' · ')}</span></p>
                })()}
                <p className="mt-3 text-[11.5px] leading-[1.6] text-[#8b7a69]">Choose any future date and start time; interviews can be 1 or 2 hours long. Each selected candidate gets the shared interview Meet link and a PL Robotics email.</p>
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
                            <button onClick={async () => { if (!confirm('Cancel this interview?')) return; try { await adminCancelInterview(app._id, password, role); loadApps() } catch (err) { alert(err.message) } }} className="text-[12px] font-semibold text-[#aaa] hover:text-red-500 px-3 py-[8px] rounded-lg transition-colors duration-200 cursor-pointer" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
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

        {tab === 'attendance' && (
          <div>
            <section className="mb-6 rounded-2xl bg-white p-5 sm:p-6" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div><h2 className="text-[18px] font-bold text-[#111]">Monthly attendance summary</h2><p className="mt-1 text-[12px] text-[#887b6e]">Present includes office, WFH, and half days counted as 0.5. Leave includes approved leave and informed leave not overridden by a present entry.</p></div>
                <label className="text-[11px] font-bold text-[#76695d]">MONTH<input type="month" value={summaryMonth} onChange={event => { setSummaryMonth(event.target.value); if (event.target.value) loadAttendanceSummary(event.target.value) }} className="mt-1 block rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2 text-[13px] font-normal" /></label>
              </div>
              {summaryError && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-[12px] text-red-600">{summaryError}</p>}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[900px] text-left text-[12px]">
                  <thead><tr className="border-b border-black/5 text-[10px] uppercase tracking-wide text-[#a09589]"><th className="px-3 py-3">Employee</th><th className="px-3 py-3">Present days</th><th className="px-3 py-3">Leave days</th><th className="px-3 py-3">Absent days</th><th className="px-3 py-3">Hours worked</th><th className="px-3 py-3">Login / logout · WFH</th></tr></thead>
                  <tbody>{attendanceSummary.map(summary => {
                    const sessions = summary.attendance.filter(record => record.loginAt || record.logoutAt)
                    return <tr key={summary.employee._id} className="border-b border-black/5 align-top last:border-0">
                      <td className="px-3 py-3"><span className="font-bold text-[#332a22]">{summary.employee.name}</span><span className="mt-0.5 block text-[10px] text-[#887b6e]">{summary.employee.email}</span></td>
                      <td className="px-3 py-3 font-bold text-green-700">{summary.present}</td><td className="px-3 py-3 font-bold text-amber-700">{summary.leave}</td><td className="px-3 py-3 font-bold text-red-600">{summary.absent}</td>
                      <td className="px-3 py-3 font-bold text-[#332a22]">{formatMinutes(summary.totalMinutesWorked)}</td>
                      <td className="px-3 py-3 text-[#65594d]">{sessions.length ? sessions.map(record => <div key={record.date} className="mb-1 last:mb-0"><span className="font-semibold">{record.date}</span> · {record.loginAt ? new Date(record.loginAt).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }) : '—'}–{record.logoutAt ? new Date(record.logoutAt).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }) : 'active'} · {formatWorkedTime(record)}{record.workMode === 'wfh' || record.status === 'wfh' ? ' · WFH' : ''}</div>) : <span className="text-[#aaa]">No sessions recorded</span>}</td>
                    </tr>
                  })}</tbody>
                </table>
                {!attendanceSummary.length && !summaryError && <p className="py-7 text-center text-[12px] text-[#887b6e]">No employees found.</p>}
              </div>
            </section>
            <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="rounded-2xl bg-white p-6 h-fit" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <h2 className="text-[18px] font-bold text-[#111]">Employee Attendance</h2>
              <p className="mt-1 text-[12.5px] leading-5 text-[#887b6e]">Select an employee, then click any date to update their attendance.</p>
              <label className="mt-5 block text-[11.5px] font-bold text-[#76695d]">EMPLOYEE</label>
              <select value={selectedEmployeeId} onChange={event => { setSelectedEmployeeId(event.target.value); loadAttendance(event.target.value) }} className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-3 text-[13px] outline-none focus:ring-2 focus:ring-orange/20">
                <option value="">Select employee</option>
                {activeEmployees.map(employee => <option key={employee._id} value={employee._id}>{employee.name}{canManageEmployees && !employee.portalEnabled ? ' (Portal not set up)' : ''}</option>)}
              </select>
              {canManageEmployees && <form onSubmit={addEmployee} className="mt-7 border-t border-black/5 pt-5">
                <h3 className="text-[13px] font-bold text-[#444]">Add employee dashboard</h3>
                <input required value={employeeName} onChange={event => setEmployeeName(event.target.value)} placeholder="Full name" className="mt-3 w-full rounded-xl border border-black/10 px-3 py-2.5 text-[13px] outline-none focus:ring-2 focus:ring-orange/20" />
                <input required type="email" value={employeeEmail} onChange={event => setEmployeeEmail(event.target.value)} placeholder="Email address" className="mt-2 w-full rounded-xl border border-black/10 px-3 py-2.5 text-[13px] outline-none focus:ring-2 focus:ring-orange/20" />
                <input required minLength={8} type="password" autoComplete="new-password" value={employeePassword} onChange={event => setEmployeePassword(event.target.value)} placeholder="Initial password (8+ characters)" className="mt-2 w-full rounded-xl border border-black/10 px-3 py-2.5 text-[13px] outline-none focus:ring-2 focus:ring-orange/20" />
                <button className="mt-3 w-full rounded-xl bg-orange py-2.5 text-[13px] font-bold text-white">Add employee dashboard</button>
              </form>}
              {canManageEmployees && selectedEmployeeId && employees.find(item => item._id === selectedEmployeeId)?.isActive && <div className="mt-5 border-t border-black/5 pt-5">
                <h3 className="text-[13px] font-bold text-[#444]">{employees.find(item => item._id === selectedEmployeeId)?.portalEnabled ? 'Reset dashboard password' : 'Enable employee dashboard'}</h3>
                <input minLength={8} type="password" autoComplete="new-password" value={portalPassword} onChange={event => setPortalPassword(event.target.value)} placeholder="New password (8+ characters)" className="mt-3 w-full rounded-xl border border-black/10 px-3 py-2.5 text-[13px] outline-none focus:ring-2 focus:ring-orange/20" />
                <button type="button" disabled={portalPassword.length < 8} onClick={enableEmployeePortal} className="mt-2 w-full rounded-xl border border-orange/30 py-2.5 text-[13px] font-bold text-orange disabled:opacity-40">{employees.find(item => item._id === selectedEmployeeId)?.isActive ? 'Set dashboard password' : 'Restore dashboard access'}</button>
                {employees.find(item => item._id === selectedEmployeeId)?.isActive && <button type="button" onClick={removeEmployee} className="mt-2 w-full rounded-xl border border-red-200 py-2.5 text-[13px] font-bold text-red-600 hover:bg-red-50">Remove employee dashboard</button>}
              </div>}
              {attendanceError && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-[12px] text-red-600">{attendanceError}</p>}
              {portalMessage && <p role="status" className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-[12px] text-green-700">{portalMessage}</p>}
            </div>
            <div>
              {selectedEmployeeId ? <>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div><h2 className="text-[18px] font-bold text-[#111]">{employees.find(employee => employee._id === selectedEmployeeId)?.name || 'Attendance calendar'}</h2><p className="mt-1 text-[12px] text-[#887b6e]">Attendance records from 1 September 2026 onward.</p></div>
                  {savingAttendance && <span className="text-[12px] font-semibold text-orange">Saving...</span>}
                </div>
                <AttendanceCalendar attendance={attendance} editable onChange={changeAttendance} />
              </> : <div className="flex min-h-[360px] items-center justify-center rounded-2xl bg-white text-[14px] text-[#aaa]" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>Select or add an employee to manage attendance.</div>}
            </div>
          </div>
          </div>
        )}

        {tab === 'salary slips' && (
          <div className="grid items-start gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
            <section className="rounded-2xl bg-white p-6" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <h2 className="text-[18px] font-bold text-[#111]">Upload salary slip</h2>
              <p className="mt-1 text-[12.5px] leading-5 text-[#887b6e]">Choose an active employee, the pay month, and their PDF salary slip.</p>
              <label className="mt-5 block text-[11.5px] font-bold text-[#76695d]">EMPLOYEE</label>
              <select value={salaryEmployeeId} onChange={event => { setSalaryEmployeeId(event.target.value); loadSalarySlips(event.target.value); setSalaryFile(null) }} className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-3 text-[13px] outline-none focus:ring-2 focus:ring-orange/20">
                <option value="">Select employee</option>
                {activeEmployees.map(employee => <option key={employee._id} value={employee._id}>{employee.name}</option>)}
              </select>
              <form onSubmit={uploadSalarySlip} className="mt-5 space-y-3">
                <label className="block text-[11.5px] font-bold text-[#76695d]">PAY MONTH<input required type="month" value={salaryMonth} onChange={event => setSalaryMonth(event.target.value)} className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-3 text-[13px] font-normal" /></label>
                <label className="block text-[11.5px] font-bold text-[#76695d]">SALARY SLIP (PDF)<input required type="file" accept="application/pdf,.pdf" onChange={event => setSalaryFile(event.target.files?.[0] || null)} className="mt-2 block w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-3 text-[12px] font-normal file:mr-3 file:rounded-lg file:border-0 file:bg-orange file:px-3 file:py-2 file:font-bold file:text-white" /></label>
                <p className="text-[11px] text-[#887b6e]">PDF only, up to 10 MB. Uploading the same employee and month replaces the previous slip.</p>
                <button disabled={!salaryEmployeeId || !salaryFile || salaryBusy} className="w-full rounded-xl bg-orange py-3 text-[13px] font-bold text-white disabled:opacity-50">{salaryBusy ? 'Uploading…' : 'Upload salary slip'}</button>
              </form>
              {salaryMessage && <p role="status" className={`mt-4 rounded-lg px-3 py-2 text-[12px] ${salaryMessage.includes('uploaded') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>{salaryMessage}</p>}
            </section>
            <section className="rounded-2xl bg-white p-6" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <h2 className="text-[18px] font-bold text-[#111]">Uploaded salary slips</h2>
              <p className="mt-1 text-[12px] text-[#887b6e]">{employees.find(employee => employee._id === salaryEmployeeId)?.name || 'Select an employee to see their slips.'}</p>
              <div className="mt-5 space-y-2">
                {salarySlips.map(slip => <div key={slip._id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#faf7f2] px-4 py-3"><div><p className="text-[13px] font-bold text-[#332a22]">{new Date(`${slip.month}-01T00:00:00`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p><p className="mt-0.5 text-[11px] text-[#887b6e]">{slip.originalName}</p></div><span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold uppercase text-green-700">Available to employee</span></div>)}
                {salaryEmployeeId && salarySlips.length === 0 && <p className="rounded-xl bg-[#faf7f2] px-4 py-8 text-center text-[13px] text-[#887b6e]">No salary slips uploaded for this employee yet.</p>}
                {!salaryEmployeeId && <p className="rounded-xl bg-[#faf7f2] px-4 py-8 text-center text-[13px] text-[#887b6e]">Select an employee to view uploaded slips.</p>}
              </div>
            </section>
          </div>
        )}

        {tab === 'leave requests' && (
          <div>
            <h2 className="text-[20px] font-bold text-[#111]">Employee leave requests</h2>
            <p className="mt-1 text-[13px] text-[#887b6e]">Review requests submitted from employee dashboards.</p>
            {leaveError && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-600">{leaveError}</p>}
            <div className="mt-5 space-y-3">
              {leaveRequests.map(request => <article key={request._id} className="rounded-2xl bg-white p-5" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[15px] font-bold text-[#17100a]">{request.employeeId?.name || 'Former employee'} <span className="font-normal text-[#887b6e]">· {request.employeeId?.email || ''}</span></h3>
                    <p className="mt-1 text-[13px] font-semibold text-[#55483c]">{request.startDate === request.endDate ? request.startDate : `${request.startDate} – ${request.endDate}`}</p>
                    <p className="mt-2 whitespace-pre-wrap text-[13px] leading-5 text-[#74685c]">{request.reason}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase ${request.status === 'approved' ? 'bg-green-100 text-green-700' : request.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{request.status}</span>
                    {request.status === 'pending' && <>
                      <button onClick={() => updateLeaveRequest(request._id, 'approved')} className="rounded-lg bg-green-600 px-3 py-2 text-[11px] font-bold text-white">Approve</button>
                      <button onClick={() => updateLeaveRequest(request._id, 'rejected')} className="rounded-lg border border-red-200 px-3 py-2 text-[11px] font-bold text-red-600">Reject</button>
                    </>}
                  </div>
                </div>
              </article>)}
              {leaveRequests.length === 0 && !leaveError && <div className="rounded-2xl bg-white px-6 py-16 text-center text-[14px] text-[#887b6e]" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>No leave requests have been submitted.</div>}
            </div>
          </div>
        )}

        {tab === 'tasks' && (
          <div className="grid items-start gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
            <section className="rounded-2xl bg-white p-5 sm:p-6" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <h2 className="text-[18px] font-bold text-[#111]">Assign a task</h2>
              <p className="mt-1 text-[12px] text-[#887b6e]">Assigned tasks appear in the employee portal.</p>
              <form onSubmit={assignTask} className="mt-5 space-y-3">
                <label className="block text-[11px] font-bold text-[#76695d]">EMPLOYEE<select required value={taskEmployeeId} onChange={event => setTaskEmployeeId(event.target.value)} className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 text-[13px] font-normal"><option value="">Select employee</option>{activeEmployees.map(employee => <option key={employee._id} value={employee._id}>{employee.name}</option>)}</select></label>
                <label className="block text-[11px] font-bold text-[#76695d]">TASK TITLE<input required maxLength={160} value={taskTitle} onChange={event => setTaskTitle(event.target.value)} className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 text-[13px] font-normal" placeholder="Task title" /></label>
                <label className="block text-[11px] font-bold text-[#76695d]">DESCRIPTION<textarea maxLength={2000} rows={4} value={taskDescription} onChange={event => setTaskDescription(event.target.value)} className="mt-1.5 w-full resize-y rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 text-[13px] font-normal" placeholder="Task details and expected outcome" /></label>
                <label className="block text-[11px] font-bold text-[#76695d]">DUE DATE<input type="date" value={taskDueDate} onChange={event => setTaskDueDate(event.target.value)} className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 text-[13px] font-normal" /></label>
                {taskError && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-[12px] text-red-600">{taskError}</p>}
                <button disabled={taskBusy || !taskEmployeeId} className="w-full rounded-xl bg-orange py-3 text-[13px] font-bold text-white disabled:opacity-50">{taskBusy ? 'Assigning…' : 'Assign task'}</button>
              </form>
            </section>
            <section className="rounded-2xl bg-white p-5 sm:p-6" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center justify-between gap-3"><div><h2 className="text-[18px] font-bold text-[#111]">Task progress</h2><p className="mt-1 text-[12px] text-[#887b6e]">Refreshes automatically every 20 seconds.</p></div><button type="button" onClick={loadTasks} className="rounded-lg border border-black/10 px-3 py-2 text-[11px] font-bold text-[#65594d]">Refresh</button></div>
              {taskError && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-[12px] text-red-600">{taskError}</p>}
              <div className="mt-4 space-y-3">{tasks.map(task => <article key={task._id} className="rounded-xl bg-[#faf7f2] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="text-[14px] font-bold text-[#332a22]">{task.title}</h3><p className="mt-1 text-[11px] text-[#887b6e]">{task.employeeId?.name || 'Former employee'}{task.dueDate ? ` · Due ${task.dueDate}` : ''}</p></div><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${task.status === 'completed' ? 'bg-green-100 text-green-700' : task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{task.status.replace('_', ' ')}</span></div>
                {task.description && <p className="mt-3 whitespace-pre-wrap text-[12px] leading-5 text-[#65594d]">{task.description}</p>}
                {task.updateNote && <div className="mt-3 rounded-lg border border-black/5 bg-white px-3 py-2"><p className="text-[10px] font-bold uppercase text-[#a09589]">Employee update</p><p className="mt-1 whitespace-pre-wrap text-[12px] leading-5 text-[#55483c]">{task.updateNote}</p></div>}
                {task.employeeUpdatedAt && <p className="mt-2 text-[10px] text-[#887b6e]">Updated {new Date(task.employeeUpdatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}</p>}
              </article>)}{!tasks.length && !taskError && <p className="rounded-xl bg-[#faf7f2] px-4 py-10 text-center text-[13px] text-[#887b6e]">No tasks assigned yet.</p>}</div>
            </section>
          </div>
        )}

        {tab === 'interview email' && (
          <div>
            <h2 className="text-[20px] font-bold text-[#111]">Interview invitation</h2>
            <p className="mt-1 text-[13px] text-[#887b6e]">Schedule an interview, select candidates, and preview the invitation before sending.</p>
            {candidateEmailMessage && <p role="status" className={`mt-4 rounded-xl px-4 py-3 text-[13px] ${candidateEmailMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>{candidateEmailMessage.text}</p>}
            <form onSubmit={sendCandidateInterviewEmail} className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]">
              <div className="space-y-4 rounded-2xl bg-white p-5 sm:p-6" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
                <section><h3 className="font-bold">Recipients</h3><p className="mt-1 text-[12px] text-[#887b6e]">Select applicants or paste rows as Name, email. Duplicate addresses are removed.</p>
                  <div className="mt-3 max-h-48 space-y-1 overflow-auto rounded-xl border border-black/10 p-2">
                    {applications.map(app => { const name = [app.firstName, app.middleName, app.lastName].filter(Boolean).join(' ') || app.name || ''; const email = app.email || ''; if (!name || !email) return null; const checked = selectedEmailCandidates.some(candidate => candidate.email.toLowerCase() === email.toLowerCase()); return <label key={app._id || email} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] hover:bg-[#fff8f0]"><input type="checkbox" checked={checked} onChange={() => setSelectedEmailCandidates(current => checked ? current.filter(candidate => candidate.email.toLowerCase() !== email.toLowerCase()) : [...current, { name, email }])} /><span className="min-w-0 flex-1 truncate">{name}</span><span className="max-w-[48%] truncate text-[#887b6e]">{email}</span></label> })}
                    {!applications.length && <p className="p-2 text-[12px] text-[#887b6e]">No applications loaded.</p>}
                  </div>
                  <textarea value={pastedCandidates} onChange={event => setPastedCandidates(event.target.value)} rows={3} placeholder={'Paste spreadsheet rows:\nCandidate Name, candidate@email.com'} className="mt-3 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 text-[12px]" />
                  <p className="mt-1 text-[11px] text-[#887b6e]">{emailRecipients.length} unique recipient(s) ready</p>
                </section>
                <section><h3 className="mb-3 font-bold">Schedule</h3><div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-[12px] font-semibold">Role<select value={candidateEmailForm.role} onChange={event => setCandidateEmailForm(form => ({ ...form, role: event.target.value, meetingLink: MEET_LINKS[event.target.value] || '' }))} className="mt-1 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 font-normal">{INTERVIEW_ROLES.map(item => <option key={item}>{item}</option>)}</select></label>
                  <label className="text-[12px] font-semibold">Mode<select value={candidateEmailForm.mode} onChange={event => setCandidateEmailForm(form => ({ ...form, mode: event.target.value }))} className="mt-1 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 font-normal"><option value="online">Online</option><option value="offline">Offline</option></select></label>
                  <label className="text-[12px] font-semibold">Date<input required type="date" value={candidateEmailForm.date} onChange={event => setCandidateEmailForm(form => ({ ...form, date: event.target.value }))} className="mt-1 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 font-normal" /></label>
                  <label className="text-[12px] font-semibold">Reporting time<input required type="time" value={candidateEmailForm.time} onChange={event => setCandidateEmailForm(form => ({ ...form, time: event.target.value }))} className="mt-1 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 font-normal" /></label>
                </div></section>
                {candidateEmailForm.mode === 'online' ? <label className="block text-[12px] font-semibold">Google Meet link<input required type="url" value={candidateEmailForm.meetingLink} onChange={event => setCandidateEmailForm(form => ({ ...form, meetingLink: event.target.value }))} placeholder="Paste a meeting link" className="mt-1 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 font-normal" />{MEET_LINKS[candidateEmailForm.role] && <span className="mt-1 block text-[11px] font-normal text-[#887b6e]">Saved role link filled in; you can replace it.</span>}</label> : <div className="space-y-3"><label className="block text-[12px] font-semibold">Office address<textarea required rows={3} value={candidateEmailForm.address} onChange={event => setCandidateEmailForm(form => ({ ...form, address: event.target.value }))} className="mt-1 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 font-normal" /></label><label className="block text-[12px] font-semibold">Google Maps location link<input required type="url" value={candidateEmailForm.mapsLink} onChange={event => setCandidateEmailForm(form => ({ ...form, mapsLink: event.target.value }))} className="mt-1 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 font-normal" /></label></div>}
                <label className="block text-[12px] font-semibold">Additional instructions<textarea rows={2} maxLength={2000} value={candidateEmailForm.details} onChange={event => setCandidateEmailForm(form => ({ ...form, details: event.target.value }))} placeholder="Optional details" className="mt-1 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 font-normal" /></label>
                <label className="block text-[12px] font-semibold">Important information<textarea rows={5} maxLength={5000} value={candidateEmailForm.instructions} onChange={event => setCandidateEmailForm(form => ({ ...form, instructions: event.target.value }))} className="mt-1 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 font-normal" /></label>
                <button disabled={sendingCandidateEmail || !emailRecipients.length} className="w-full rounded-xl bg-orange px-5 py-3 text-[13px] font-bold text-white disabled:opacity-50">{sendingCandidateEmail ? 'Sending emails...' : `Send to ${emailRecipients.length} candidate${emailRecipients.length === 1 ? '' : 's'}`}</button>
              </div>
              <aside className="lg:sticky lg:top-4"><div className="mb-2 flex items-center justify-between"><h3 className="font-bold">Email preview</h3><span className="text-[11px] text-[#887b6e]">For {previewCandidate.name}</span></div><iframe title="Interview email preview" sandbox="" srcDoc={emailPreviewHtml} className="h-[850px] w-full rounded-2xl bg-[#f4efe8] shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.1)' }} /></aside>
            </form>
          </div>
        )}

        {tab === 'past employees' && (
          <div className="grid items-start gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
            <section className="rounded-2xl bg-white p-5 sm:p-6" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
              <h2 className="text-[18px] font-bold text-[#111]">Past employees / interns</h2>
              <p className="mt-1 text-[12px] leading-5 text-[#887b6e]">Removed accounts are kept here, separate from active employee lists.</p>
              <div className="mt-4 max-h-[440px] space-y-2 overflow-y-auto">
                {pastEmployees.map(employee => <button key={employee._id} type="button" onClick={() => { setPastEmployeeId(employee._id); loadPastAttendance(employee._id) }} className={`w-full rounded-xl px-3 py-3 text-left ${pastEmployeeId === employee._id ? 'bg-orange/10 ring-1 ring-orange/30' : 'bg-[#faf7f2]'}`}>
                  <span className="block text-[13px] font-bold text-[#332a22]">{employee.name}</span><span className="mt-0.5 block text-[11px] text-[#887b6e]">{employee.email}</span>
                </button>)}
                {!pastEmployees.length && <p className="rounded-xl bg-[#faf7f2] px-4 py-8 text-center text-[12px] text-[#887b6e]">No past employees or interns.</p>}
              </div>
              {pastEmployeeId && <div className="mt-5 border-t border-black/5 pt-4">
                <h3 className="text-[13px] font-bold text-[#444]">Restore dashboard access</h3>
                <input minLength={8} type="password" autoComplete="new-password" value={pastEmployeePassword} onChange={event => setPastEmployeePassword(event.target.value)} placeholder="New password (8+ characters)" className="mt-3 w-full rounded-xl border border-black/10 px-3 py-2.5 text-[12px]" />
                <button type="button" disabled={pastEmployeePassword.length < 8} onClick={restorePastEmployee} className="mt-2 w-full rounded-xl border border-orange/30 py-2.5 text-[12px] font-bold text-orange disabled:opacity-40">Restore employee dashboard</button>
              </div>}
              {pastAttendanceError && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-[12px] text-red-600">{pastAttendanceError}</p>}
              {attendanceError && <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-[12px] text-red-600">{attendanceError}</p>}
              {portalMessage && <p role="status" className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-[12px] text-green-700">{portalMessage}</p>}
            </section>
            <section className="space-y-5">
              {pastEmployeeId ? <>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div><h2 className="text-[18px] font-bold text-[#111]">{pastEmployees.find(employee => employee._id === pastEmployeeId)?.name}</h2><p className="mt-1 text-[12px] text-[#887b6e]">Historical attendance and login details.</p></div>
                  <label className="text-[11px] font-bold text-[#76695d]">MONTH<input type="month" min="2026-09" value={pastMonth} onChange={event => setPastMonth(event.target.value)} className="mt-1 block rounded-xl border border-black/10 bg-white px-3 py-2 text-[13px] font-normal" /></label>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[['Present days', pastPresentDays, 'text-green-700'], ['Leave days', pastLeaveDays, 'text-amber-700'], ['Absent days', pastAbsentDays, 'text-red-600'], ['Hours worked', formatMinutes(pastTotalMinutes), 'text-[#332a22]']].map(([label, value, color]) => <div key={label} className="rounded-2xl bg-white p-4" style={{ border: '1px solid rgba(0,0,0,0.07)' }}><p className="text-[10px] font-bold uppercase tracking-wide text-[#a09589]">{label}</p><p className={`mt-2 text-[15px] font-bold ${color}`}>{value}</p></div>)}
                </div>
                <div className="rounded-2xl bg-white p-4 sm:p-5" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
                  <AttendanceCalendar attendance={pastAttendance} />
                </div>
                <div className="overflow-x-auto rounded-2xl bg-white p-4 sm:p-5" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
                  <h3 className="mb-3 text-[15px] font-bold text-[#111]">{new Date(`${pastMonth}-01T00:00:00`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })} details</h3>
                  <table className="w-full min-w-[640px] text-left text-[12px]">
                    <thead><tr className="border-b border-black/5 text-[10px] uppercase tracking-wide text-[#a09589]"><th className="px-3 py-2">Date</th><th className="px-3 py-2">Status</th><th className="px-3 py-2">Login</th><th className="px-3 py-2">Logout</th><th className="px-3 py-2">Hours worked</th></tr></thead>
                    <tbody>{pastMonthRecords.map(record => <tr key={record.date} className="border-b border-black/5 last:border-0"><td className="px-3 py-2.5 font-semibold">{record.date}</td><td className="px-3 py-2.5 capitalize">{record.status.replace(/_/g, ' ')}</td><td className="px-3 py-2.5">{formatIndiaTime(record.loginAt)}</td><td className="px-3 py-2.5">{record.logoutAt ? formatIndiaTime(record.logoutAt) : record.loginAt ? 'Active' : '—'}</td><td className="px-3 py-2.5">{formatWorkedTime(record)}</td></tr>)}</tbody>
                  </table>
                  {!pastMonthRecords.length && <p className="py-6 text-center text-[12px] text-[#887b6e]">No attendance records for this month.</p>}
                </div>
              </> : <div className="flex min-h-[360px] items-center justify-center rounded-2xl bg-white px-6 text-center text-[14px] text-[#887b6e]" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>Select a past employee or intern to see their attendance.</div>}
            </section>
          </div>
        )}

        {tab === 'employee documents' && (
          <div className="grid items-start gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
            <section className="rounded-2xl bg-white p-5 sm:p-6" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
              <h2 className="text-[18px] font-bold text-[#111]">Upload employee document</h2>
              <p className="mt-1 text-[12px] leading-5 text-[#887b6e]">Documents are private to the selected employee and HR/admin.</p>
              <label className="mt-5 block text-[11px] font-bold text-[#76695d]">EMPLOYEE<select value={documentEmployeeId} onChange={event => { setDocumentEmployeeId(event.target.value); setEmployeeDocumentFile(null); setEmployeeDocuments([]); setEmployeeDocumentsMessage(''); loadEmployeeDocuments(event.target.value) }} className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-3 text-[13px] font-normal"><option value="">Select employee</option>{activeEmployees.map(employee => <option key={employee._id} value={employee._id}>{employee.name}</option>)}</select></label>
              <form onSubmit={uploadEmployeeDocument} className="mt-4 space-y-3">
                <label className="block text-[11px] font-bold text-[#76695d]">DOCUMENT<input required type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png" onChange={event => setEmployeeDocumentFile(event.target.files?.[0] || null)} className="mt-1.5 block w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-3 text-[11px] font-normal file:mr-2 file:rounded-lg file:border-0 file:bg-orange file:px-3 file:py-2 file:font-bold file:text-white" /></label>
                <p className="text-[11px] text-[#887b6e]">PDF, Office files, JPG, JPEG, or PNG · 10 MB maximum.</p>
                <button disabled={!documentEmployeeId || !employeeDocumentFile || employeeDocumentsBusy} className="w-full rounded-xl bg-orange py-3 text-[13px] font-bold text-white disabled:opacity-50">{employeeDocumentsBusy ? 'Uploading…' : 'Upload document'}</button>
              </form>
              {employeeDocumentsError && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-[12px] text-red-600">{employeeDocumentsError}</p>}
              {employeeDocumentsMessage && <p role="status" className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-[12px] text-green-700">{employeeDocumentsMessage}</p>}
            </section>
            <section className="rounded-2xl bg-white p-5 sm:p-6" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
              <h2 className="text-[18px] font-bold text-[#111]">Shared documents</h2>
              <p className="mt-1 text-[12px] text-[#887b6e]">{activeEmployees.find(employee => employee._id === documentEmployeeId)?.name || 'Select an employee to view their documents.'}</p>
              <div className="mt-4 space-y-2">
                {employeeDocuments.map(document => <article key={document._id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#faf7f2] px-4 py-3">
                  <div><p className="text-[13px] font-bold text-[#332a22]">{document.originalName}</p><p className="mt-0.5 text-[10px] text-[#887b6e]">{(document.size / (1024 * 1024)).toFixed(2)} MB · Uploaded {new Date(document.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p></div>
                  <button type="button" onClick={() => downloadEmployeeDocument(document)} disabled={Boolean(downloadingDocumentId)} className="rounded-lg border border-orange/30 px-3 py-2 text-[11px] font-bold text-orange disabled:opacity-50">{downloadingDocumentId === document._id ? 'Downloading…' : 'Download'}</button>
                </article>)}
                {!documentEmployeeId && <p className="rounded-xl bg-[#faf7f2] px-4 py-8 text-center text-[13px] text-[#887b6e]">Select an employee to view their shared documents.</p>}
                {documentEmployeeId && employeeDocuments.length === 0 && <p className="rounded-xl bg-[#faf7f2] px-4 py-8 text-center text-[13px] text-[#887b6e]">No documents have been uploaded for this employee.</p>}
              </div>
            </section>
          </div>
        )}
      </div>
      <AnimatePresence>
        {emailSentPopup && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={() => setEmailSentPopup(null)}>
          <motion.div initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} transition={{ duration: 0.2 }} role="dialog" aria-modal="true" aria-labelledby="email-sent-title" className="w-full max-w-[420px] rounded-2xl bg-white p-7 text-center shadow-2xl" onClick={event => event.stopPropagation()}>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-2xl font-bold text-green-600">OK</div>
            <h2 id="email-sent-title" className="mt-4 text-[20px] font-bold text-[#1a1208]">{emailSentPopup.failed ? 'Emails sent with some failures' : 'Emails sent successfully'}</h2>
            <p className="mt-2 text-[14px] leading-6 text-[#6f6256]">Sent {emailSentPopup.sent} of {emailSentPopup.total} interview emails.{emailSentPopup.failed ? ` ${emailSentPopup.failed} failed; see the status message on the form for details.` : ''}</p>
            <button type="button" onClick={() => setEmailSentPopup(null)} className="mt-6 w-full rounded-xl bg-orange px-5 py-3 text-[13px] font-bold text-white">Done</button>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
      {/* -- JOB FORM MODAL -- */}
      {/* -- EDIT INTERVIEW MODAL -- */}
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
                  <label className="block text-[13px] font-semibold mb-1">Interview slot</label>
                  <div className="w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2 text-[13px]">Thu/Sun 3:00–5:00 PM IST</div>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold mb-1">Assign interviewer(s)</label>
                  <select
                    multiple
                    value={editInterviewerEmails}
                    onChange={e => {
                      const selected = Array.from(e.target.selectedOptions).map(option => option.value)
                      setEditInterviewerEmails(selected)
                    }}
                    className="w-full h-36 rounded-xl border border-black/10 bg-white px-3 py-2"
                  >
                    {interviewers.map(i => <option key={i.email} value={i.email}>{i.name}</option>)}
                  </select>
                  <p className="mt-2 text-[11px] text-[#8b7a69]">Hold Ctrl/Cmd to assign more than one interviewer.</p>
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
