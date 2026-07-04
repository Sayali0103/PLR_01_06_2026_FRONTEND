import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { submitWebsiteForm } from '../services/api.js'

const fieldClass = 'w-full rounded-[12px] border border-black/10 bg-white px-4 py-3 text-[14px] text-[#1a1208] outline-none transition-all duration-200 focus:border-[#ff9501] focus:ring-4 focus:ring-[#ff9501]/10'

function FormField({ field, value, onChange }) {
  const props = { id: field.name, name: field.name, value, onChange, required: true, className: fieldClass }
  return (
    <label className={field.fullWidth ? 'md:col-span-2' : ''}>
      <span className="mb-2 block text-[12px] font-bold tracking-[1.3px] uppercase text-[#7b6c5e]">
        {field.label} <span className="text-[#ff9501]">*</span>
      </span>
      {field.type === 'textarea' ? (
        <textarea {...props} rows="5" maxLength={field.maxLength || 2000} />
      ) : field.type === 'select' ? (
        <select {...props}>
          <option value="">Select an option</option>
          {field.options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : (
        <input {...props} type={field.type || 'text'} maxLength={field.maxLength || 160} />
      )}
    </label>
  )
}

export default function InquiryFormPage({ eyebrow, title, accentTitle, description, endpoint, fields, successMessage, helperLink }) {
  const emptyForm = Object.fromEntries([...fields.map(field => [field.name, '']), ['website', '']])
  const [form, setForm] = useState(emptyForm)
  const [state, setState] = useState({ submitting: false, error: '', success: false })

  const handleChange = event => {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setState({ submitting: true, error: '', success: false })
    try {
      await submitWebsiteForm(endpoint, form)
      setForm(emptyForm)
      setState({ submitting: false, error: '', success: true })
    } catch (error) {
      setState({ submitting: false, error: error.message, success: false })
    }
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] pt-32 pb-24 px-5 sm:px-6">
      <div className="max-w-[1120px] mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[2px] bg-[#ff9501] rounded-full" />
            <span className="text-[11px] font-semibold tracking-[2.5px] uppercase text-[#ff9501]">{eyebrow}</span>
          </div>
          <h1 className="font-bold text-[#1a1208] leading-[1.04] mb-6" style={{ fontSize: 'clamp(40px, 5vw, 66px)', letterSpacing: '-2px' }}>
            {title}<br />
            <span className="text-[#ff9501]">{accentTitle}</span>
          </h1>
          <p className="text-[15px] leading-[1.9] text-[#6d5f51] max-w-[450px]">{description}</p>
          {helperLink && (
            <Link
              to={helperLink.to}
              className="mt-6 inline-flex items-center gap-2 rounded-[12px] border border-[#ff9501]/20 bg-white px-5 py-3 text-[13px] font-bold text-[#ff9501] shadow-[0_8px_28px_rgba(26,18,8,0.05)]"
            >
              {helperLink.label}
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          )}
          <div className="mt-10 rounded-2xl border border-[#ff9501]/15 bg-[#fff8f0] p-5 text-[13px] leading-[1.8] text-[#6d5f51]">
            Prefer email? Write to <a href="mailto:contact@plrobotics.com" className="font-bold text-[#ff9501]">contact@plrobotics.com</a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }} className="rounded-[24px] border border-black/5 bg-white p-6 sm:p-8 shadow-[0_18px_55px_rgba(26,18,8,0.08)]">
          {state.success ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff9501]/10 text-[26px] text-[#ff9501]">✓</div>
              <h2 className="mb-3 text-[24px] font-bold text-[#1a1208]">Thank you.</h2>
              <p className="mx-auto mb-7 max-w-[420px] text-[14px] leading-[1.8] text-[#6d5f51]">{successMessage}</p>
              <Link to="/" className="inline-flex rounded-[10px] bg-[#ff9501] px-6 py-3 text-[13px] font-bold text-white">Back to Home</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-5">
                {fields.map(field => <FormField key={field.name} field={field} value={form[field.name]} onChange={handleChange} />)}
              </div>
              <label className="hidden" aria-hidden="true">
                Website
                <input name="website" value={form.website} onChange={handleChange} tabIndex="-1" autoComplete="off" />
              </label>
              {state.error && <p className="mt-5 text-[13px] font-semibold text-red-600">{state.error}</p>}
              <button disabled={state.submitting} className="mt-7 inline-flex w-full items-center justify-center rounded-[12px] bg-[#ff9501] px-7 py-[14px] text-[13px] font-bold text-white shadow-[0_5px_22px_rgba(255,149,1,0.3)] transition-opacity disabled:opacity-60">
                {state.submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  )
}
