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

const STATUS_OPTIONS = [
  { value: 'present', label: 'Present', color: 'bg-[#27a861]' },
  { value: 'absent', label: 'Absent', color: 'bg-[#dc4545]' },
  { value: 'holiday', label: 'Holiday', color: 'bg-[#e3a51e]' },
  { value: 'half_day', label: 'Half day', color: 'bg-[#8765c5]' },
  { value: 'wfh', label: 'WFH', color: 'bg-[#3886c7]' },
]

const pad = n => String(n).padStart(2, '0')
const dateKey = (year, month, day) => `${year}-${pad(month + 1)}-${pad(day)}`

function monthHolidays(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1
    const date = new Date(year, month, day)
    const key = dateKey(year, month, day)
    const namedHoliday = HOLIDAYS[key]
    if (!namedHoliday && date.getDay() !== 4) return null
    return { day, name: namedHoliday || 'Weekly holiday' }
  }).filter(Boolean)
}

function AttendanceSidePanel({ holidays, monthName, monthShort }) {
  return (
    <aside className="content-start">
      <div className="rounded-xl border border-orange/10 bg-[#fff8ef] p-3.5">
        <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#887b6e]">Holidays for {monthName}</h4>
        <div className="mt-3 space-y-2">
          {holidays.length ? holidays.map(item => <div key={item.day} className="flex items-center gap-2.5 rounded-lg bg-white/80 px-2.5 py-2">
            <span className="flex h-8 w-8 shrink-0 flex-col items-center justify-center rounded-lg bg-[#f3e5cf] text-[#8c5d20]"><span className="text-[12px] font-bold leading-none">{item.day}</span><span className="mt-0.5 text-[8px] font-bold uppercase leading-none">{monthShort}</span></span>
            <span className="text-[11px] font-semibold leading-4 text-[#55483c]">{item.name}</span>
          </div>) : <p className="rounded-lg bg-white/80 px-3 py-3 text-[11px] text-[#887b6e]">No holidays listed for this month.</p>}
        </div>
      </div>
    </aside>
  )
}

export default function AttendanceCalendar({ attendance = [], editable = false, onChange }) {
  const [view, setView] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })
  const [activeDate, setActiveDate] = useState('')
  const records = useMemo(() => Object.fromEntries(attendance.map(item => [item.date, item.status])), [attendance])
  const { year, month } = view
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthName = new Date(year, month, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
  const monthShort = new Date(year, month, 1).toLocaleDateString('en-IN', { month: 'short' })
  const holidays = monthHolidays(year, month)

  const changeMonth = direction => {
    const target = new Date(year, month + direction, 1)
    if (target < START) return
    setView({ year: target.getFullYear(), month: target.getMonth() })
    setActiveDate('')
  }

  const updateDay = (key, status) => {
    if (!editable || !onChange) return
    onChange(key, status)
    setActiveDate('')
  }

  const cells = Array.from({ length: firstDay + daysInMonth }, (_, index) => {
    if (index < firstDay) return <div key={`empty-${index}`} />
    const day = index - firstDay + 1
    const key = dateKey(year, month, day)
    const beforeStart = key < '2026-09-01'
    const status = records[key]
    const statusOption = STATUS_OPTIONS.find(option => option.value === status)
    return (
      <button
        key={key}
        type="button"
        disabled={!editable || beforeStart}
        onClick={() => editable && !beforeStart && setActiveDate(key)}
        aria-label={`${key}${statusOption ? `, ${statusOption.label}` : ''}`}
        title={key}
        className={`aspect-square w-full rounded-lg text-[11px] font-semibold transition-colors sm:text-[12px] ${statusOption?.color || 'bg-[#f4f0ea]'} ${editable && !beforeStart ? 'cursor-pointer hover:ring-2 hover:ring-orange/40' : 'cursor-default'} ${status ? 'text-white' : 'text-[#756859]'} ${activeDate === key ? 'ring-2 ring-orange ring-offset-1' : ''}`}
      >
        {day}
      </button>
    )
  })

  return (
    <section className="rounded-2xl bg-white p-4 sm:p-5" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <div className="mx-auto grid max-w-[660px] items-start gap-5 lg:grid-cols-[minmax(0,400px)_220px]">
        <div className="mx-auto w-full max-w-[400px]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <button type="button" onClick={() => changeMonth(-1)} disabled={year === 2026 && month === 8} aria-label="Previous month" className="h-7 w-7 rounded-lg border border-black/10 text-sm text-[#65594d] disabled:cursor-not-allowed disabled:opacity-30">&lsaquo;</button>
            <h3 className="text-[15px] font-bold text-[#19120b]">{monthName}</h3>
            <button type="button" onClick={() => changeMonth(1)} aria-label="Next month" className="h-7 w-7 rounded-lg border border-black/10 text-sm text-[#65594d]">&rsaquo;</button>
          </div>
          <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[9px] font-bold uppercase tracking-wide text-[#a09589]">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <span key={day}>{day}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1">{cells}</div>
          {editable && activeDate && <div className="mt-4 rounded-xl bg-[#faf7f2] p-3">
            <div className="mb-2 flex items-center justify-between gap-2"><p className="text-[12px] font-bold text-[#55483c]">Update {new Date(`${activeDate}T00:00:00`).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p><button type="button" onClick={() => setActiveDate('')} aria-label="Close date options" className="rounded-md px-2 py-1 text-[12px] text-[#887b6e] hover:bg-white">Close</button></div>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map(option => <button key={option.value} type="button" onClick={() => updateDay(activeDate, option.value)} className={`rounded-lg px-3 py-2 text-[11px] font-bold text-white ${option.color}`}>{option.label}</button>)}
              {records[activeDate] && <button type="button" onClick={() => updateDay(activeDate, null)} className="rounded-lg border border-black/10 bg-white px-3 py-2 text-[11px] font-bold text-[#65594d]">Clear</button>}
            </div>
          </div>}
        </div>
        <AttendanceSidePanel holidays={holidays} monthName={monthName} monthShort={monthShort} />
      </div>
    </section>
  )
}
