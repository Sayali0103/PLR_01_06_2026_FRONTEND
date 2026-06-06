import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitApplication } from '../hooks/useJobs'

function ChoiceStep({ job, onSelect, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="px-5 pt-6 pb-5 sm:px-8 sm:pt-8 sm:pb-6" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="min-w-0 font-bold text-[19px] leading-tight text-[#111] tracking-tight sm:text-[20px]">How would you like to apply?</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-[#bbb] hover:text-[#333] hover:bg-[#f5f3ef] transition-all cursor-pointer flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 4L4 12M4 4l8 8"/></svg>
          </button>
        </div>
        <p className="text-[13px] text-[#aaa] mt-1">{job.title} · {job.dept}</p>
      </div>

      <div className="px-5 py-6 grid gap-4 sm:px-8 sm:py-7 sm:grid-cols-2">
        <motion.button
          whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(255,149,1,0.14)', borderColor: 'rgba(255,149,1,0.4)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('intern')}
          className="flex flex-col items-start text-left p-5 rounded-[20px] bg-white cursor-pointer transition-all duration-200 sm:p-6"
          style={{ border: '1px solid rgba(255,149,1,0.2)', boxShadow: '0 4px 20px rgba(255,149,1,0.07)' }}
        >
          <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-orange" style={{ background: 'rgba(255,149,1,0.09)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <span className="font-bold text-[16px] text-[#111] mb-2 tracking-tight">Intern</span>
          <p className="text-[12.5px] leading-[1.7] text-[#777] mb-4">
            6-month paid internship. Based on performance, you may receive a Pre-Placement Offer (PPO) for a full-time role at PLR.
          </p>
          <div className="mt-auto pt-3 w-full" style={{ borderTop: '1px solid rgba(255,149,1,0.12)' }}>
            <p className="text-[11px] font-semibold text-orange uppercase tracking-[1.5px] mb-1">Eligibility</p>
            <p className="text-[12px] text-[#888] leading-[1.6]">Pre-final year, final year, or recent graduates (freshers welcome)</p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(30,100,220,0.1)', borderColor: 'rgba(30,100,220,0.3)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('fulltime')}
          className="flex flex-col items-start text-left p-5 rounded-[20px] bg-white cursor-pointer transition-all duration-200 sm:p-6"
          style={{ border: '1px solid rgba(30,100,220,0.15)', boxShadow: '0 4px 20px rgba(30,100,220,0.05)' }}
        >
          <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(30,100,220,0.08)', color: '#1e64dc' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
          </div>
          <span className="font-bold text-[16px] text-[#111] mb-2 tracking-tight">Employee</span>
          <p className="text-[12.5px] leading-[1.7] text-[#777] mb-4">
            Full-time role with a 6-month probation period. Upon successful completion, you become a permanent employee at PLR.
          </p>
          <div className="mt-auto pt-3 w-full" style={{ borderTop: '1px solid rgba(30,100,220,0.1)' }}>
            <p className="text-[11px] font-semibold uppercase tracking-[1.5px] mb-1" style={{ color: '#1e64dc' }}>Eligibility</p>
            <p className="text-[12px] text-[#888] leading-[1.6]">Minimum 1+ year of relevant work experience required</p>
          </div>
        </motion.button>
      </div>
    </motion.div>
  )
}

function Field({ label, required, hint, children }) {
  return (
    <div>
      <label className="block text-[11.5px] font-semibold text-[#555] mb-1.5 tracking-wide">
        {label} {required && <span className="text-orange">*</span>}
      </label>
      {hint && <p className="text-[11px] text-[#bbb] mb-1.5 -mt-1">{hint}</p>}
      {children}
    </div>
  )
}

// ── Reusable file uploader ──
function FileUploader({ label, hint, required, file, onChange, onClear, accept, icon }) {
  return (
    <Field label={label} hint={hint} required={required}>
      <label
        className="flex items-center gap-3 w-full px-3 py-[10px] bg-[#f9f6f1] rounded-xl cursor-pointer hover:bg-[#f3ede5] transition-colors duration-200 sm:px-4"
        style={{ border: `1px solid ${file ? 'rgba(255,149,1,0.4)' : 'rgba(0,0,0,0.09)'}` }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: file ? 'rgba(255,149,1,0.1)' : 'rgba(0,0,0,0.05)' }}
        >
          {icon || (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={file ? '#FF9501' : '#bbb'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          {file
            ? <p className="text-[13px] text-orange font-medium truncate">{file.name}</p>
            : <p className="text-[13px] text-[#bbb]">Choose file to attach</p>
          }
          <p className="text-[11px] text-[#ccc] mt-0.5">PDF, DOCX, ZIP accepted — max 50 MB</p>
        </div>
        {file && (
          <button
            type="button"
            onClick={e => { e.preventDefault(); onClear() }}
            className="flex-shrink-0 text-[#ccc] hover:text-red-400 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 4L4 12M4 4l8 8"/></svg>
          </button>
        )}
        <input
          type="file"
          accept={accept}
          onChange={e => onChange(e.target.files[0] || null)}
          className="hidden"
        />
      </label>
    </Field>
  )
}

const inputCls = "w-full px-4 py-[10px] text-[13.5px] bg-[#f9f6f1] rounded-xl text-[#333] placeholder:text-[#ccc] outline-none transition-all duration-200 focus:ring-2 focus:ring-orange/20"
const inputStyle = { border: '1px solid rgba(0,0,0,0.09)' }

function FormStep({ job, applicantType, onClose, onBack, onSuccess }) {
  const isIntern = applicantType === 'intern'

  const [form, setForm] = useState({
    firstName: '', middleName: '', lastName: '',
    dob: '', phone: '', email: '',
    currentLocation: '',
    currentlyEmployed: false,
    employerDetails: '',
  })
  const [resumeFile,  setResumeFile]  = useState(null)
  const [projectFile, setProjectFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const validateDOB = val => /^\d{2}\/\d{2}\/\d{4}$/.test(val)

  const submit = async e => {
    e.preventDefault()
    setError('')
    if (!form.firstName || !form.lastName) { setError('First and last name are required.'); return }
    if (!validateDOB(form.dob))            { setError('Date of birth must be in DD/MM/YYYY format.'); return }
    if (!form.phone)                        { setError('Mobile number is required.'); return }
    if (!form.email)                        { setError('Email is required.'); return }
    if (form.currentlyEmployed && !form.employerDetails) { setError('Please mention the company name and notice period.'); return }
    if (!resumeFile)                        { setError('Resume is required. Please attach your resume.'); return }

    setLoading(true)
    const fd = new FormData()
    fd.append('jobId',            job._id)
    fd.append('jobTitle',         job.title)
    fd.append('applicantType',    applicantType)
    fd.append('firstName',        form.firstName)
    fd.append('middleName',       form.middleName)
    fd.append('lastName',         form.lastName)
    fd.append('dob',              form.dob)
    fd.append('phone',            form.phone)
    fd.append('email',            form.email)
    fd.append('currentLocation',  form.currentLocation)
    fd.append('currentlyEmployed', String(form.currentlyEmployed))
    fd.append('employerDetails',  form.employerDetails)
    if (resumeFile)  fd.append('attachment', resumeFile)
    if (projectFile) fd.append('project',    projectFile)

    try {
      await submitApplication(fd)
      onSuccess(`${form.firstName} ${form.lastName}`)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 px-5 pt-5 pb-4 bg-white rounded-t-[24px] sm:px-8 sm:pt-7 sm:pb-5 sm:rounded-t-[28px]" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <button onClick={onBack} className="text-[#ccc] hover:text-orange transition-colors cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 12L6 8l4-4"/></svg>
              </button>
              <span
                className="text-[11px] font-bold tracking-[2px] uppercase px-3 py-[3px] rounded-full"
                style={{
                  background: isIntern ? 'rgba(255,149,1,0.09)' : 'rgba(30,100,220,0.07)',
                  color: isIntern ? '#FF9501' : '#1e64dc',
                  border: `1px solid ${isIntern ? 'rgba(255,149,1,0.2)' : 'rgba(30,100,220,0.18)'}`,
                }}
              >
                {isIntern ? 'Internship' : 'Full-time'} Application
              </span>
            </div>
            <h3 className="break-words font-bold text-[18px] leading-tight text-[#111] tracking-tight sm:text-[19px]">{job.title}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-[#bbb] hover:text-[#333] hover:bg-[#f5f3ef] transition-all cursor-pointer flex-shrink-0 mt-1">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 4L4 12M4 4l8 8"/></svg>
          </button>
        </div>
      </div>

      <form onSubmit={submit} className="px-5 py-5 space-y-4 sm:px-8 sm:py-6">
        {error && (
          <div className="text-[13px] text-red-500 bg-red-50 px-4 py-3 rounded-xl" style={{ border: '1px solid rgba(220,0,0,0.12)' }}>
            {error}
          </div>
        )}

        {/* Full name */}
        <div>
          <p className="text-[11.5px] font-semibold text-[#555] mb-2 tracking-wide">
            Full Name <span className="text-orange">*</span>
            <span className="text-[#bbb] font-normal ml-1">(First Name · Middle Name · Last Name)</span>
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {[['firstName','First Name'],['middleName','Middle Name'],['lastName','Last Name']].map(([key, ph]) => (
              <input
                key={key} name={key} value={form[key]} onChange={set}
                placeholder={ph}
                required={key !== 'middleName'}
                className={inputCls} style={inputStyle}
              />
            ))}
          </div>
        </div>

        {/* DOB */}
        <Field label="Date of Birth" required hint="Format: DD/MM/YYYY">
          <input
            name="dob" value={form.dob} onChange={set}
            placeholder="DD/MM/YYYY" required maxLength={10}
            className={inputCls} style={inputStyle}
            onBlur={e => {
              e.target.style.borderColor = e.target.value && !/^\d{2}\/\d{2}\/\d{4}$/.test(e.target.value)
                ? 'rgba(220,0,0,0.4)' : 'rgba(0,0,0,0.09)'
            }}
          />
        </Field>

        {/* Mobile */}
        <Field label="Mobile Number" required>
          <input name="phone" value={form.phone} onChange={set} placeholder="+91 1234567891" required className={inputCls} style={inputStyle} />
        </Field>

        {/* Email */}
        <Field label="College / Personal Email ID" required hint="PLEASE ENTER CORRECT EMAIL ID ONLY">
          <input name="email" type="email" value={form.email} onChange={set} placeholder="you@college.edu" required className={inputCls} style={inputStyle} />
        </Field>

        {/* Location */}
        <Field label="Current Location">
          <input name="currentLocation" value={form.currentLocation} onChange={set} placeholder="City, State" className={inputCls} style={inputStyle} />
        </Field>

        {/* Currently employed */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div
              onClick={() => setForm(f => ({ ...f, currentlyEmployed: !f.currentlyEmployed, employerDetails: '' }))}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${form.currentlyEmployed ? 'bg-orange' : 'bg-[#ddd]'}`}
            >
              <div className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow transition-all duration-200 ${form.currentlyEmployed ? 'left-[22px]' : 'left-[3px]'}`} />
            </div>
            <span className="text-[13.5px] text-[#444] font-medium">Are you currently doing an internship or job anywhere?</span>
          </label>
          <AnimatePresence>
            {form.currentlyEmployed && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                <div className="pt-3">
                  <input name="employerDetails" value={form.employerDetails} onChange={set} placeholder="Company name and notice period (e.g. Acme Corp — 30 days)" required className={inputCls} style={inputStyle} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Resume upload ── */}
        <FileUploader
          label="Resume"
          hint="Upload your latest resume (PDF or DOCX preferred)"
          required
          file={resumeFile}
          onChange={setResumeFile}
          onClear={() => setResumeFile(null)}
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={resumeFile ? '#FF9501' : '#bbb'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
            </svg>
          }
        />

        {/* ── Projects upload ── */}
        <FileUploader
          label="Projects / Portfolio"
          hint="Upload any project work, portfolio, or GitHub summary (optional)"
          required={false}
          file={projectFile}
          onChange={setProjectFile}
          onClear={() => setProjectFile(null)}
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={projectFile ? '#FF9501' : '#bbb'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
            </svg>
          }
        />

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2 pb-1 sm:flex-row sm:items-center">
          <motion.button
            type="submit" disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02, boxShadow: '0 8px 28px rgba(255,149,1,0.4)' }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            className="flex-1 bg-orange text-white text-[13.5px] font-bold py-[13px] rounded-xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ boxShadow: '0 4px 18px rgba(255,149,1,0.28)' }}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </motion.button>
          <button type="button" onClick={onBack} className="w-full px-5 py-[13px] text-[13px] font-semibold text-[#888] hover:text-[#333] rounded-xl transition-colors cursor-pointer sm:w-auto" style={{ border: '1px solid rgba(0,0,0,0.09)' }}>
            Back
          </button>
        </div>
      </form>
    </motion.div>
  )
}

function SuccessStep({ name, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="px-5 py-14 text-center sm:px-8 sm:py-16"
    >
      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5" style={{ border: '1px solid rgba(0,160,0,0.18)' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14a050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      </div>
      <h4 className="font-bold text-[22px] text-[#111] mb-2 tracking-tight">Application Sent!</h4>
      <p className="text-[14px] text-[#777] leading-[1.8] max-w-[320px] mx-auto">
        Thanks <strong>{name.split(' ')[0]}</strong>! We've received your application and will review it shortly. We'll be in touch soon.
      </p>
      <motion.button
        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        onClick={onClose}
        className="mt-8 bg-orange text-white text-[13px] font-bold px-10 py-[12px] rounded-xl cursor-pointer"
        style={{ boxShadow: '0 4px 18px rgba(255,149,1,0.28)' }}
      >
        Done
      </motion.button>
    </motion.div>
  )
}

export default function ApplyModal({ job, onClose }) {
  const [step, setStep] = useState('choice')
  const [applicantType, setApplicantType] = useState(null)
  const [applicantName, setApplicantName] = useState('')

  const selectType = type => { setApplicantType(type); setStep('form') }
  const handleSuccess = name => { setApplicantName(name); setStep('success') }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-end justify-center px-0 sm:items-center sm:px-4"
        style={{ background: 'rgba(10,6,2,0.78)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[560px] max-h-[94svh] overflow-x-hidden overflow-y-auto overscroll-contain rounded-t-[24px] bg-white pb-[env(safe-area-inset-bottom)] sm:max-h-[90vh] sm:rounded-[28px] sm:pb-0"
          style={{
            boxShadow: '0 32px 100px rgba(0,0,0,0.25)',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,149,1,0.4) transparent',
          }}
          onClick={e => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            {step === 'choice'  && <ChoiceStep key="choice"  job={job} onSelect={selectType} onClose={onClose} />}
            {step === 'form'    && <FormStep   key="form"    job={job} applicantType={applicantType} onClose={onClose} onBack={() => setStep('choice')} onSuccess={handleSuccess} />}
            {step === 'success' && <SuccessStep key="success" name={applicantName} onClose={onClose} />}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
