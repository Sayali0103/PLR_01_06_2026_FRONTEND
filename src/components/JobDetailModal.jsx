import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function JobDetailModal({ job, onClose, onApply }) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!job) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-end justify-center px-0 sm:items-center sm:px-4"
        style={{ background: 'rgba(10,6,2,0.72)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[780px] max-h-[92svh] overflow-x-hidden overflow-y-auto overscroll-contain rounded-t-[24px] bg-white sm:max-h-[88vh] sm:rounded-[28px]"
          style={{ boxShadow: '0 32px 100px rgba(0,0,0,0.22)' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="sticky top-0 z-[10] flex items-start justify-between gap-3 px-5 py-5 rounded-t-[24px] sm:gap-4 sm:px-10 sm:py-7 sm:rounded-t-[28px]"
            style={{ background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className="text-[11px] font-semibold tracking-[1.5px] uppercase text-orange px-3 py-[3px] rounded-full"
                  style={{ background: 'rgba(255,149,1,0.08)', border: '1px solid rgba(255,149,1,0.2)' }}
                >
                  {job.dept}
                </span>
                <span className="flex items-center gap-1 text-[12px] text-[#888]">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M8 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M8 2C5.2 2 3 4.2 3 7c0 4 5 7 5 7s5-3 5-7c0-2.8-2.2-5-5-5Z"/>
                  </svg>
                  {job.location}
                </span>
                {job.isPaid && (
                  <span className="text-[11px] font-semibold text-green-600 bg-green-50 px-3 py-[3px] rounded-full" style={{ border: '1px solid rgba(0,160,0,0.18)' }}>
                    Paid
                  </span>
                )}
              </div>
              <h2 className="break-words font-bold text-[22px] text-[#111] leading-tight sm:text-[26px]" style={{ letterSpacing: '-0.5px' }}>
                {job.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[#aaa] hover:text-[#333] hover:bg-[#f5f3ef] transition-all duration-200 mt-1"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 4L4 12M4 4l8 8"/>
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-6 space-y-7 sm:px-10 sm:py-8 sm:space-y-8">

            {/* Role Overview */}
            <div>
              <h3 className="text-[11px] font-bold tracking-[2px] uppercase text-orange mb-3">Role Overview</h3>
              <p className="text-[14.5px] leading-[1.85] text-[#555]">{job.overview}</p>
            </div>

            {/* Responsibilities */}
            {job.responsibilities?.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold tracking-[2px] uppercase text-orange mb-4">Responsibilities</h3>
                <ul className="space-y-3">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] leading-[1.75] text-[#555]">
                      <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-orange flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required Skills */}
            {job.requiredSkills?.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold tracking-[2px] uppercase text-orange mb-4">Required Skills</h3>
                <ul className="space-y-3">
                  {job.requiredSkills.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] leading-[1.75] text-[#555]">
                      <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-orange flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Education Requirements */}
            {job.educationRequirements?.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold tracking-[2px] uppercase text-orange mb-4">Education Requirements</h3>
                <ul className="space-y-3">
                  {job.educationRequirements.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] leading-[1.75] text-[#555]">
                      <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-orange flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Additional Skills */}
            {job.additionalSkills?.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold tracking-[2px] uppercase text-orange mb-4">Additional Skills</h3>
                <ul className="space-y-3">
                  {job.additionalSkills.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] leading-[1.75] text-[#555]">
                      <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-orange/50 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Why Join */}
            {job.whyJoin?.length > 0 && (
              <div className="rounded-2xl p-5 sm:p-6" style={{ background: 'linear-gradient(145deg,#fff7eb,#ffefd4)', border: '1px solid rgba(255,149,1,0.18)' }}>
                <h3 className="text-[11px] font-bold tracking-[2px] uppercase text-orange mb-4">Why Join PLR?</h3>
                <ul className="space-y-3">
                  {job.whyJoin.map((w, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] leading-[1.75] text-[#555]">
                      <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-orange flex-shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {job.tags?.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {job.tags.map(tag => (
                  <span key={tag} className="text-[12px] font-medium text-[#555] bg-[#f5f3ef] px-3 py-[5px] rounded-full" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Payment note */}
            {job.isPaid && (
              <p className="text-[13px] text-[#aaa]">
                This is a paid opportunity. Based on performance, you may be offered full-time employment at PLR.
              </p>
            )}
          </div>

          {/* Sticky footer — apply buttons */}
          <div
            className="sticky bottom-0 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex items-center gap-3 flex-wrap sm:px-10 sm:py-5 sm:rounded-b-[28px]"
            style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(0,0,0,0.07)' }}
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 8px 28px rgba(255,149,1,0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onApply(job, 'intern')}
              className="inline-flex flex-1 items-center justify-center gap-2 bg-orange text-white text-[13px] font-bold px-7 py-[12px] rounded-xl cursor-pointer sm:flex-none"
              style={{ boxShadow: '0 4px 18px rgba(255,149,1,0.3)' }}
            >
              Apply Now
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </motion.button>
            <button
              onClick={onClose}
              className="ml-auto text-[13px] text-[#aaa] hover:text-[#555] transition-colors duration-200 cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
