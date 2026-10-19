import { useEffect, useState } from 'react'
import AttendanceCalendar from '../components/AttendanceCalendar'
import { employeeApplyForLeave, employeeFetchDashboard, employeeLogin } from '../services/api'

const TOKEN_KEY = 'plr_employee_token'
const EMPTY_LEAVE = { startDate: '', endDate: '', reason: '' }
const panelStyle = { border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.035)' }

function displayDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { dateStyle: 'medium' })
}

export default function Employee() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [dashboard, setDashboard] = useState(null)
  const [leave, setLeave] = useState(EMPTY_LEAVE)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [notice, setNotice] = useState('')

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
      const result = await employeeLogin({ name, password })
      sessionStorage.setItem(TOKEN_KEY, result.token)
      setDashboard(await employeeFetchDashboard(result.token))
      setToken(result.token)
      setPassword('')
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  const signOut = () => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken('')
    setDashboard(null)
    setLeave(EMPTY_LEAVE)
    setNotice('')
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
          {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-600">{error}</p>}
          <button disabled={loading} className="w-full rounded-xl bg-orange py-3 text-[14px] font-bold text-white disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in'}</button>
          <p className="text-center text-[12px] text-[#887b6e]">Need access? Contact HR to activate your employee dashboard.</p>
        </form>
      </div>
    </main>
  )

  const { employee, attendance, leaveRequests } = dashboard
  const present = attendance.filter(item => item.status === 'present').length
  const absent = attendance.filter(item => item.status === 'absent').length
  return (
    <main className="min-h-screen bg-[#faf7f2] px-5 pb-16 pt-24 sm:px-8">
      <div className="mx-auto max-w-[1000px]">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-[12px] font-bold uppercase tracking-[0.18em] text-orange">PLR Robotics · Employee portal</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-[#17100a]">Welcome, {employee.name}</h1><p className="mt-1 text-[14px] text-[#74685c]">Your attendance and leave requests in one place.</p></div>
          <button onClick={signOut} className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-[13px] font-bold text-[#63584d]">Sign out</button>
        </header>

        <section className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[['Present days', present, 'text-[#168044]'], ['Absent days', absent, 'text-[#bd3333]'], ['Holiday schedule', 'Thursdays + listed dates', 'text-[#ad7510]']].map(([label, value, color]) => <div key={label} className="rounded-2xl bg-white p-4 sm:p-5" style={panelStyle}><p className="text-[11px] font-bold uppercase tracking-wide text-[#a09589]">{label}</p><p className={`mt-2 text-[16px] font-bold ${color}`}>{value}</p></div>)}
        </section>
        <section className="mt-6 rounded-2xl bg-white p-4 sm:p-6" style={panelStyle}>
          <div className="mb-4"><h2 className="text-[18px] font-bold text-[#17100a]">My attendance</h2><p className="mt-1 text-[12px] text-[#887b6e]">Attendance records from 1 September 2026 onward.</p></div>
          <AttendanceCalendar attendance={attendance} />
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
