import { useEffect, useState } from 'react'
import AttendanceCalendar from '../components/AttendanceCalendar'
import { employeeApplyForLeave, employeeChangePassword, employeeDownloadDocument, employeeDownloadSalarySlip, employeeFetchDashboard, employeeLogin, employeeLogout, employeeUpdateTask } from '../services/api'

const TOKEN_KEY = 'plr_employee_token'
const EMPTY_LEAVE = { startDate: '', endDate: '', reason: '' }
const panelStyle = { border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.035)' }

function displayDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { dateStyle: 'medium' })
}

function currentMonthKey() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit' }).format(new Date())
}

function formatWorkedTime(loginAt, logoutAt) {
  if (!loginAt) return '—'
  const start = new Date(loginAt).getTime()
  const end = logoutAt ? new Date(logoutAt).getTime() : Date.now()
  if (!Number.isFinite(start) || end < start) return '—'
  const minutes = Math.floor((end - start) / 60000)
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m${logoutAt ? '' : ' (ongoing)'}`
}

export default function Employee() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [workMode, setWorkMode] = useState('office')
  const [dashboard, setDashboard] = useState(null)
  const [leave, setLeave] = useState(EMPTY_LEAVE)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [notice, setNotice] = useState('')
  const [downloadingSlipId, setDownloadingSlipId] = useState('')
  const [downloadingDocumentId, setDownloadingDocumentId] = useState('')
  const [documentError, setDocumentError] = useState('')
  const [refreshingDocuments, setRefreshingDocuments] = useState(false)
  const [salaryError, setSalaryError] = useState('')
  const [taskError, setTaskError] = useState('')
  const [updatingTaskId, setUpdatingTaskId] = useState('')
  const [attendanceMonth, setAttendanceMonth] = useState(currentMonthKey)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordNotice, setPasswordNotice] = useState('')
  const [changingPassword, setChangingPassword] = useState(false)

  useEffect(() => {
    if (!token) return
    setLoading(true)
    employeeFetchDashboard(token)
      .then(setDashboard)
      .catch(() => { sessionStorage.removeItem(TOKEN_KEY); setToken(''); setError('Your session ended. Please sign in again.') })
      .finally(() => setLoading(false))
  }, [token])

  const signIn = async event => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await employeeLogin({ name, password, workMode })
      sessionStorage.setItem(TOKEN_KEY, result.token)
      setDashboard(await employeeFetchDashboard(result.token))
      setToken(result.token)
      setPassword('')
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  const signOut = async () => {
    setError('')
    try { await employeeLogout(token) }
    catch (err) { setError(err.message); return }
    sessionStorage.removeItem(TOKEN_KEY)
    setToken('')
    setDashboard(null)
    setLeave(EMPTY_LEAVE)
    setNotice('')
  }

  const updateTask = async task => {
    setUpdatingTaskId(task._id)
    setTaskError('')
    try {
      await employeeUpdateTask(task._id, { status: task.status, updateNote: task.updateNote || '' }, token)
      setDashboard(await employeeFetchDashboard(token))
    } catch (err) { setTaskError(err.message) }
    finally { setUpdatingTaskId('') }
  }

  const submitLeave = async event => {
    event.preventDefault()
    setError('')
    setNotice('')
    setSubmitting(true)
    try {
      await employeeApplyForLeave(leave, token)
      setDashboard(await employeeFetchDashboard(token))
      setLeave(EMPTY_LEAVE)
      setNotice('Your leave request was submitted to HR.')
    } catch (err) { setError(err.message) }
    finally { setSubmitting(false) }
  }

  const downloadSlip = async slip => {
    setDownloadingSlipId(slip._id)
    setSalaryError('')
    try { await employeeDownloadSalarySlip(slip._id, token) }
    catch (err) { setSalaryError(err.message) }
    finally { setDownloadingSlipId('') }
  }

  const downloadDocument = async document => {
    setDownloadingDocumentId(document._id)
    setDocumentError('')
    try { await employeeDownloadDocument(document, token) }
    catch (err) { setDocumentError(err.message) }
    finally { setDownloadingDocumentId('') }
  }

  const refreshDocuments = async () => {
    setRefreshingDocuments(true)
    setDocumentError('')
    try { setDashboard(await employeeFetchDashboard(token)) }
    catch (err) { setDocumentError(err.message) }
    finally { setRefreshingDocuments(false) }
  }

  const changePassword = async event => {
    event.preventDefault()
    setPasswordError('')
    setPasswordNotice('')
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.')
      return
    }
    setChangingPassword(true)
    try {
      await employeeChangePassword({ currentPassword, newPassword }, token)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setPasswordNotice('Your password has been changed.')
    } catch (err) { setPasswordError(err.message) }
    finally { setChangingPassword(false) }
  }

  if (!dashboard) return (
    <main className="min-h-screen bg-[#faf7f2] px-5 pb-16 pt-28 sm:px-8">
      <div className="mx-auto max-w-[440px] rounded-3xl bg-white p-7 sm:p-9" style={panelStyle}>
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-orange">PLR Robotics</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#17100a]">Employee sign in</h1>
        <p className="mt-2 text-[14px] leading-6 text-[#74685c]">Sign in with the name and password provided by HR to view your attendance and apply for leave.</p>
        <form onSubmit={signIn} className="mt-7 space-y-4">
          <label className="block text-[12px] font-bold text-[#76695d]">EMPLOYEE NAME
            <input required autoComplete="username" value={name} onChange={event => setName(event.target.value)} className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-4 py-3 text-[14px] font-normal outline-none focus:ring-2 focus:ring-orange/20" placeholder="Your full name" />
          </label>
          <label className="block text-[12px] font-bold text-[#76695d]">PASSWORD
            <input required type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-4 py-3 text-[14px] font-normal outline-none focus:ring-2 focus:ring-orange/20" placeholder="Your password" />
          </label>
          <label className="block text-[12px] font-bold text-[#76695d]">WORK LOCATION
            <select value={workMode} onChange={event => setWorkMode(event.target.value)} className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-4 py-3 text-[14px] font-normal outline-none focus:ring-2 focus:ring-orange/20"><option value="office">Office</option><option value="wfh">Work from home (WFH)</option></select>
          </label>
          {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-600">{error}</p>}
          <button disabled={loading} className="w-full rounded-xl bg-orange py-3 text-[14px] font-bold text-white disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in'}</button>
          <p className="text-center text-[12px] text-[#887b6e]">Need access? Contact HR to activate your employee dashboard.</p>
        </form>
      </div>
    </main>
  )

  const { employee, attendance, leaveRequests, tasks = [] } = dashboard
  const monthAttendance = attendance.filter(item => item.date.startsWith(attendanceMonth))
  const attendanceByDate = new Map(monthAttendance.map(item => [item.date, item]))
  const monthStart = `${attendanceMonth}-01`
  const monthEnd = `${attendanceMonth}-${new Date(Number(attendanceMonth.slice(0, 4)), Number(attendanceMonth.slice(5, 7)), 0).getDate().toString().padStart(2, '0')}`
  const leaveDates = new Set(monthAttendance.filter(item => item.status === 'informed_leave').map(item => item.date))
  leaveRequests.filter(item => item.status === 'approved' && item.startDate <= monthEnd && item.endDate >= monthStart).forEach(item => {
    const from = item.startDate < monthStart ? monthStart : item.startDate
    const through = item.endDate > monthEnd ? monthEnd : item.endDate
    for (let date = from; date <= through; date = new Date(new Date(`${date}T00:00:00Z`).getTime() + 86400000).toISOString().slice(0, 10)) {
      const record = attendanceByDate.get(date)
      if (!record || ['absent', 'informed_leave'].includes(record.status)) leaveDates.add(date)
    }
  })
  const present = monthAttendance.reduce((total, item) => total + (item.status === 'half_day' ? 0.5 : ['present', 'wfh'].includes(item.status) ? 1 : 0), 0)
  const absent = monthAttendance.filter(item => item.status === 'absent' && !leaveDates.has(item.date)).length
  const leaveDays = leaveDates.size
  const todayKey = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
  const todayAttendance = attendance.find(item => item.date === todayKey)
  return (
    <main className="min-h-screen bg-[#faf7f2] px-5 pb-16 pt-24 sm:px-8">
      <div className="mx-auto max-w-[1000px]">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-[12px] font-bold uppercase tracking-[0.18em] text-orange">PLR Robotics · Employee portal</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-[#17100a]">Welcome, {employee.name}</h1><p className="mt-1 text-[14px] text-[#74685c]">Your attendance and leave requests in one place.</p>{todayAttendance?.loginAt && <p className="mt-2 text-[12px] font-semibold text-[#65594d]">Today · {todayAttendance.workMode === 'wfh' || todayAttendance.status === 'wfh' ? 'WFH' : 'Office'} · Login {new Date(todayAttendance.loginAt).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })} · Logout {todayAttendance.logoutAt ? new Date(todayAttendance.logoutAt).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }) : 'Active'} · Worked {formatWorkedTime(todayAttendance.loginAt, todayAttendance.logoutAt)}</p>}</div>
          <button onClick={signOut} className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-[13px] font-bold text-[#63584d]">Sign out</button>
        </header>
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-600">{error}</p>}

        <section className="mt-7 rounded-2xl bg-white p-4 sm:p-5" style={panelStyle}>
          <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-[15px] font-bold text-[#17100a]">Monthly attendance</h2><label className="text-[10px] font-bold text-[#76695d]">MONTH<input type="month" min="2026-09" value={attendanceMonth} onChange={event => setAttendanceMonth(event.target.value)} className="ml-2 rounded-lg border border-black/10 bg-[#faf7f2] px-2.5 py-1.5 text-[12px] font-normal" /></label></div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[['Present days', present, 'text-[#168044]'], ['Absent days', absent, 'text-[#bd3333]'], ['Leave days', leaveDays, 'text-[#a76a14]']].map(([label, value, color]) => <div key={label} className="rounded-xl bg-[#faf7f2] p-3 sm:p-4"><p className="text-[10px] font-bold uppercase tracking-wide text-[#a09589]">{label}</p><p className={`mt-2 text-[16px] font-bold ${color}`}>{value}</p></div>)}
          </div>
        </section>
        <section className="mt-6 rounded-2xl bg-white p-4 sm:p-6" style={panelStyle}>
          <div className="mb-4"><h2 className="text-[18px] font-bold text-[#17100a]">My attendance</h2><p className="mt-1 text-[12px] text-[#887b6e]">Attendance records from 1 September 2026 onward.</p></div>
          <AttendanceCalendar attendance={attendance} />
        </section>

        <section className="mt-6 rounded-2xl bg-white p-5 sm:p-6" style={panelStyle}>
          <div><h2 className="text-[18px] font-bold text-[#17100a]">My tasks</h2><p className="mt-1 text-[12px] text-[#887b6e]">Update the status and leave a progress note for admin and HR.</p></div>
          {taskError && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-600">{taskError}</p>}
          <div className="mt-4 space-y-3">{tasks.map(task => <article key={task._id} className="rounded-xl bg-[#faf7f2] p-4">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="text-[14px] font-bold text-[#332a22]">{task.title}</h3>{task.dueDate && <p className="mt-1 text-[11px] text-[#887b6e]">Due {task.dueDate}</p>}</div><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${task.status === 'completed' ? 'bg-green-100 text-green-700' : task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{task.status.replace('_', ' ')}</span></div>
            {task.description && <p className="mt-3 whitespace-pre-wrap text-[12px] leading-5 text-[#65594d]">{task.description}</p>}
            <div className="mt-4 grid gap-3 sm:grid-cols-[180px_minmax(0,1fr)_auto]">
              <label className="text-[10px] font-bold text-[#76695d]">STATUS<select value={task.status} onChange={event => setDashboard(current => ({ ...current, tasks: current.tasks.map(item => item._id === task._id ? { ...item, status: event.target.value } : item) }))} className="mt-1 block w-full rounded-lg border border-black/10 bg-white px-2.5 py-2 text-[12px] font-normal"><option value="assigned">Assigned</option><option value="in_progress">In progress</option><option value="completed">Completed</option></select></label>
              <label className="text-[10px] font-bold text-[#76695d]">PROGRESS UPDATE<textarea maxLength={1000} rows={2} value={task.updateNote || ''} onChange={event => setDashboard(current => ({ ...current, tasks: current.tasks.map(item => item._id === task._id ? { ...item, updateNote: event.target.value } : item) }))} placeholder="Share your progress or blockers" className="mt-1 block w-full resize-y rounded-lg border border-black/10 bg-white px-3 py-2 text-[12px] font-normal" /></label>
              <button type="button" onClick={() => updateTask(task)} disabled={updatingTaskId === task._id} className="self-end rounded-lg bg-orange px-4 py-2 text-[12px] font-bold text-white disabled:opacity-50">{updatingTaskId === task._id ? 'Saving…' : 'Update task'}</button>
            </div>
            {task.employeeUpdatedAt && <p className="mt-2 text-[10px] text-[#887b6e]">Last updated {new Date(task.employeeUpdatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}</p>}
          </article>)}{!tasks.length && <p className="rounded-xl bg-[#faf7f2] px-4 py-8 text-center text-[13px] text-[#887b6e]">No tasks assigned yet.</p>}</div>
        </section>

        <section className="mt-6 rounded-2xl bg-white p-5 sm:p-6" style={panelStyle}>
          <h2 className="text-[18px] font-bold text-[#17100a]">Change password</h2>
          <p className="mt-1 text-[12px] text-[#887b6e]">Use your current password to set a new password of at least 8 characters.</p>
          <form onSubmit={changePassword} className="mt-4 grid gap-3 sm:grid-cols-3">
            <input required type="password" autoComplete="current-password" minLength={1} value={currentPassword} onChange={event => setCurrentPassword(event.target.value)} placeholder="Current password" className="rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 text-[13px]" />
            <input required type="password" autoComplete="new-password" minLength={8} value={newPassword} onChange={event => setNewPassword(event.target.value)} placeholder="New password (8+ characters)" className="rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 text-[13px]" />
            <input required type="password" autoComplete="new-password" minLength={8} value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} placeholder="Confirm new password" className="rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 text-[13px]" />
            <div className="sm:col-span-3">{passwordError && <p role="alert" className="mb-2 rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-600">{passwordError}</p>}{passwordNotice && <p role="status" className="mb-2 rounded-xl bg-green-50 px-4 py-3 text-[13px] text-green-700">{passwordNotice}</p>}
              <button disabled={changingPassword || newPassword.length < 8} className="rounded-xl bg-orange px-5 py-2.5 text-[13px] font-bold text-white disabled:opacity-60">{changingPassword ? 'Changing…' : 'Change password'}</button>
            </div>
          </form>
        </section>

        <section className="mt-6 rounded-2xl bg-white p-5 sm:p-6" style={panelStyle}>
          <h2 className="text-[18px] font-bold text-[#17100a]">My salary slips</h2>
          <p className="mt-1 text-[12px] text-[#887b6e]">Salary slips shared by HR are private to your account.</p>
          {salaryError && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-600">{salaryError}</p>}
          <div className="mt-4 space-y-2">
            {dashboard.salarySlips?.length ? dashboard.salarySlips.map(slip => <article key={slip._id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#faf7f2] px-4 py-3">
              <div><p className="text-[13px] font-bold text-[#332a22]">{new Date(`${slip.month}-01T00:00:00`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p><p className="mt-0.5 text-[11px] text-[#887b6e]">{slip.originalName}</p></div>
              <button type="button" onClick={() => downloadSlip(slip)} disabled={Boolean(downloadingSlipId)} className="rounded-lg bg-orange px-4 py-2 text-[12px] font-bold text-white disabled:opacity-60">{downloadingSlipId === slip._id ? 'Downloading…' : 'Download PDF'}</button>
            </article>) : <p className="rounded-xl bg-[#faf7f2] px-4 py-8 text-center text-[13px] text-[#887b6e]">No salary slips have been shared with you yet.</p>}
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-white p-5 sm:p-6" style={panelStyle}>
          <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-[18px] font-bold text-[#17100a]">My documents</h2><button type="button" onClick={refreshDocuments} disabled={refreshingDocuments} className="rounded-lg border border-black/10 px-3 py-2 text-[11px] font-bold text-[#65594d] disabled:opacity-50">{refreshingDocuments ? 'Refreshing…' : 'Refresh documents'}</button></div>
          <p className="mt-1 text-[12px] text-[#887b6e]">Documents shared with you by HR are private to your account.</p>
          {documentError && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-600">{documentError}</p>}
          <div className="mt-4 space-y-2">
            {dashboard.documents?.length ? dashboard.documents.map(document => <article key={document._id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#faf7f2] px-4 py-3">
              <div><p className="text-[13px] font-bold text-[#332a22]">{document.originalName}</p><p className="mt-0.5 text-[11px] text-[#887b6e]">{(document.size / (1024 * 1024)).toFixed(2)} MB · Shared {new Date(document.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p></div>
              <button type="button" onClick={() => downloadDocument(document)} disabled={Boolean(downloadingDocumentId)} className="rounded-lg bg-orange px-4 py-2 text-[12px] font-bold text-white disabled:opacity-60">{downloadingDocumentId === document._id ? 'Downloading…' : 'Download'}</button>
            </article>) : <p className="rounded-xl bg-[#faf7f2] px-4 py-8 text-center text-[13px] text-[#887b6e]">No documents have been shared with you yet.</p>}
          </div>
        </section>

        <section className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-2xl bg-white p-5 sm:p-6" style={panelStyle}>
            <h2 className="text-[18px] font-bold text-[#17100a]">Apply for leave</h2>
            <p className="mt-1 text-[12px] text-[#887b6e]">Your request will be sent to HR for review.</p>
            <form onSubmit={submitLeave} className="mt-5 space-y-3">
              <label className="block text-[12px] font-semibold text-[#76695d]">FROM<input required type="date" min="2026-09-01" value={leave.startDate} onChange={event => setLeave(current => ({ ...current, startDate: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 text-[13px]" /></label>
              <label className="block text-[12px] font-semibold text-[#76695d]">TO<input required type="date" min={leave.startDate || '2026-09-01'} value={leave.endDate} onChange={event => setLeave(current => ({ ...current, endDate: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 text-[13px]" /></label>
              <label className="block text-[12px] font-semibold text-[#76695d]">REASON<textarea required maxLength={1000} rows={3} value={leave.reason} onChange={event => setLeave(current => ({ ...current, reason: event.target.value }))} placeholder="Tell HR why you need leave" className="mt-1.5 w-full resize-y rounded-xl border border-black/10 bg-[#faf7f2] px-3 py-2.5 text-[13px]" /></label>
              {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-600">{error}</p>}
              {notice && <p role="status" className="rounded-xl bg-green-50 px-4 py-3 text-[13px] text-green-700">{notice}</p>}
              <button disabled={submitting} className="w-full rounded-xl bg-orange py-3 text-[13px] font-bold text-white disabled:opacity-60">{submitting ? 'Submitting…' : 'Submit leave request'}</button>
            </form>
          </div>
          <div className="rounded-2xl bg-white p-5 sm:p-6" style={panelStyle}>
            <h2 className="text-[18px] font-bold text-[#17100a]">My leave requests</h2>
            <div className="mt-4 space-y-3">
              {leaveRequests.length ? leaveRequests.map(item => <article key={item._id} className="rounded-xl bg-[#faf7f2] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-[13px] font-bold text-[#332a22]">{displayDate(item.startDate)}{item.endDate !== item.startDate ? ` – ${displayDate(item.endDate)}` : ''}</p><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${item.status === 'approved' ? 'bg-green-100 text-green-700' : item.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{item.status}</span></div>
                <p className="mt-2 whitespace-pre-wrap text-[12px] leading-5 text-[#74685c]">{item.reason}</p>
              </article>) : <p className="rounded-xl bg-[#faf7f2] px-4 py-8 text-center text-[13px] text-[#887b6e]">You have not submitted any leave requests yet.</p>}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
