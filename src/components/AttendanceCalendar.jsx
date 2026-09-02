import { useMemo, useState } from 'react'

const START = new Date(2026, 8, 1)
const HOLIDAYS = {
  '2026-09-14': 'Ganesh Chaturthi',
  '2026-09-25': 'Anant Chaturthi',
  '2026-10-02': 'Gandhi Jayanti',
  '2026-10-20': 'Dussehra',
  '2026-11-08': 'Diwali',
  '2026-11-11': 'Bhaubeej',
  '2026-12-25': 'Christmas',
}

const pad = n => String(n).padStart(2, '0')
const dateKey = (year, month, day) => `${year}-${pad(month + 1)}-${pad(day)}`
const isThursday = (year, month, day) => new Date(year, month, day).getDay() === 4

export default function AttendanceCalendar({ attendance = [], editable = false, onChange }) {
  const [view, setView] = useState({ year: 2026, month: 8 })
  const records = useMemo(() => Object.fromEntries(attendance.map(item => [item.date, item.status])), [attendance])
  const { year, month } = view
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthName = new Date(year, month, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

  const changeMonth = direction => {
    const target = new Date(year, month + direction, 1)
    if (target < START) return
    setView({ year: target.getFullYear(), month: target.getMonth() })
  }

  const updateDay = (key, current) => {
    if (!editable || !onChange) return
    const next = current === 'present' ? 'absent' : current === 'absent' ? null : 'present'
    onChange(key, next)
  }

  const cells = Array.from({ length: firstDay + daysInMonth }, (_, index) => {
    if (index < firstDay) return <div key={`empty-${index}`} />
    const day = index - firstDay + 1
    const key = dateKey(year, month, day)
    const holidayName = isThursday(year, month, day) ? 'Thursday holiday' : HOLIDAYS[key]
    const beforeStart = key < '2026-09-01'
    const status = records[key]
    const color = holidayName ? 'bg-[#f3b437]' : status === 'present' ? 'bg-[#27a861]' : status === 'absent' ? 'bg-[#dc4545]' : 'bg-[#f4f0ea]'
    return (
      <button
        key={key}
        type="button"
        disabled={!editable || !!holidayName || beforeStart}
        onClick={() => updateDay(key, status)}
        title={holidayName || (editable ? `${key}: click to cycle present, absent, clear` : key)}
        className={`relative aspect-square rounded-xl text-[13px] font-bold transition-all ${color} ${editable && !holidayName && !beforeStart ? 'cursor-pointer hover:scale-105 hover:shadow-md' : 'cursor-default'} ${status || holidayName ? 'text-white' : 'text-[#756859]'}`}
      >
        {day}
        {holidayName && <span className="absolute bottom-1 left-1 right-1 truncate text-[8px] font-medium leading-none">{HOLIDAYS[key] ? 'Holiday' : 'Thu'}</span>}
      </button>
    )
  })

  return (
    <section className="rounded-2xl bg-white p-5 sm:p-6" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <button type="button" onClick={() => changeMonth(-1)} disabled={year === 2026 && month === 8} className="h-9 w-9 rounded-lg border border-black/10 text-lg text-[#65594d] disabled:cursor-not-allowed disabled:opacity-30">‹</button>
        <h3 className="text-[17px] font-bold text-[#19120b]">{monthName}</h3>
        <button type="button" onClick={() => changeMonth(1)} className="h-9 w-9 rounded-lg border border-black/10 text-lg text-[#65594d]">›</button>
      </div>
      <div className="mb-2 grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold uppercase tracking-wide text-[#a09589]">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <span key={day}>{day}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1.5">{cells}</div>
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold text-[#6d6155]">
        {[['bg-[#27a861]', 'Present'], ['bg-[#dc4545]', 'Absent'], ['bg-[#f3b437]', 'Holiday']].map(([color, label]) => <span key={label} className="inline-flex items-center gap-1.5"><i className={`h-2.5 w-2.5 rounded-full ${color}`} />{label}</span>)}
        {editable && <span className="text-[#a09589]">Click a working day: present → absent → clear</span>}
      </div>
    </section>
  )
}
