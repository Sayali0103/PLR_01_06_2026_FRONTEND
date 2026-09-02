import { useEffect, useState } from 'react'
import AttendanceCalendar from '../components/AttendanceCalendar'
import { fetchEmployeeAttendance, fetchPublicEmployees } from '../services/api'

export default function Employee() {
  const [employees, setEmployees] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [employee, setEmployee] = useState(null)
  const [attendance, setAttendance] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { fetchPublicEmployees().then(setEmployees).catch(() => setError('Unable to load employee list.')) }, [])
  const selectEmployee = id => {
    setSelectedId(id)
    if (!id) { setEmployee(null); setAttendance([]); return }
    fetchEmployeeAttendance(id).then(data => { setEmployee(data.employee); setAttendance(data.attendance); setError('') }).catch(err => setError(err.message))
  }

  const present = attendance.filter(item => item.status === 'present').length
  const absent = attendance.filter(item => item.status === 'absent').length
  return (
    <main className="min-h-screen bg-[#faf7f2] px-5 pb-16 pt-28 sm:px-8">
      <div className="mx-auto max-w-[760px]">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-orange">PLR Robotics</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#17100a]">My Attendance</h1>
        <p className="mt-2 text-[14px] text-[#74685c]">View your attendance from 1 September 2026 onward.</p>
        <select value={selectedId} onChange={event => selectEmployee(event.target.value)} className="mt-6 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-orange/20">
          <option value="">Select your name</option>
          {employees.map(item => <option key={item._id} value={item._id}>{item.name}</option>)}
        </select>
        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-600">{error}</p>}
        {employee && <>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[['Present', present, 'text-[#168044]'], ['Absent', absent, 'text-[#bd3333]'], ['Holiday', 'Thu + listed dates', 'text-[#ad7510]']].map(([label, value, color]) => <div key={label} className="rounded-xl bg-white p-4" style={{ border: '1px solid rgba(0,0,0,0.07)' }}><p className="text-[11px] font-bold uppercase tracking-wide text-[#a09589]">{label}</p><p className={`mt-1 text-[16px] font-bold ${color}`}>{value}</p></div>)}
          </div>
          <div className="mt-6"><AttendanceCalendar attendance={attendance} /></div>
        </>}
      </div>
    </main>
  )
}
