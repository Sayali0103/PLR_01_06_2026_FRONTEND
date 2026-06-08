import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useJobs } from '../hooks/useJobs'
import JobDetailModal from '../components/JobDetailModal'
import ApplyModal from '../components/ApplyModal'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }

function getJobSortRank(title = '') {
  const normalizedTitle = title.toLowerCase()
  if (normalizedTitle.includes('robotics engineer')) return 0
  if (normalizedTitle.includes('ros developer')) return 0
  if (normalizedTitle.includes('mechanical engineer')) return 1
  if (normalizedTitle.includes('electronics engineer') || normalizedTitle.includes('electronic engineer')) return 2
  if (normalizedTitle.includes('ui developer')) return 3
  return 4
}

export default function Careers() {
  const { jobs, loading, error } = useJobs()

  const departments = ['All', ...new Set(jobs.map(j => j.dept))]
  const [activeDept, setActiveDept] = useState('All')
  const [selectedJob, setSelectedJob] = useState(null)  // detail modal
  const [applyJob, setApplyJob] = useState(null)         // apply modal

  const sortedJobs = [...jobs].sort((a, b) => {
    const rankDiff = getJobSortRank(a.title) - getJobSortRank(b.title)
    if (rankDiff !== 0) return rankDiff
    return a.title.localeCompare(b.title)
  })
  const filtered = activeDept === 'All' ? sortedJobs : sortedJobs.filter(j => j.dept === activeDept)

  return (
    <main className="bg-cream min-h-screen pt-[90px]">

      {/* ── HERO ── */}
      <section className="max-w-[1320px] mx-auto px-5 pt-10 pb-0 sm:px-6 sm:pt-14 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid gap-10 items-end lg:grid-cols-2 lg:gap-16">
            <div>
              <h1
                className="font-bold text-[#111] mb-6 leading-[1.04]"
                style={{ fontSize: 'clamp(40px,5vw,68px)', letterSpacing: '-2px' }}
              >
                Build the Future<br />of{' '}
                <span className="text-orange" style={{ filter: 'drop-shadow(0 0 16px rgba(255,149,1,0.25))' }}>
                  Robotics
                </span>
              </h1>
              <p className="text-[15.5px] leading-[1.8] text-[#666] max-w-[460px]">
                We're a small, ambitious team building collaborative robots that redefine
                how humans and machines work together. Come help us shape that future.
              </p>
            </div>

            {/* Candidate cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: 'Build Real Robots',
                  desc: 'Work on hardware, controls, software, and factory-ready systems.',
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M12 11V7M9 7h6M8 15h.01M16 15h.01M9 21v1M15 21v1" /></svg>,
                },
                {
                  title: 'Learn by Doing',
                  desc: 'Own practical problems from prototype to shop-floor deployment.',
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6M12 16v6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" /></svg>,
                },
                {
                  title: 'Create for India',
                  desc: 'Design automation that fits Indian factories, teams, and budgets.',
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
                },
              ].map(s => (
                <motion.div key={s.title}
                  whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(255,149,1,0.1)', borderColor: 'rgba(255,149,1,0.25)' }}
                  transition={{ duration: 0.22 }}
                  className="bg-white rounded-2xl p-5 cursor-default sm:p-6"
                  style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-orange" style={{ background: 'rgba(255,149,1,0.08)' }}>
                    {s.icon}
                  </div>
                  <h3 className="font-bold text-[15px] text-[#111] tracking-tight mb-2">{s.title}</h3>
                  <p className="text-[12.5px] leading-[1.65] text-[#777]">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-[1320px] mx-auto px-5 mt-10 sm:px-6 sm:mt-14 lg:px-16">
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,149,1,0.2), transparent)' }} />
      </div>

      {/* ── JOB LISTINGS ── */}
      <section className="max-w-[1320px] mx-auto px-5 pt-10 pb-20 sm:px-6 sm:pt-14 lg:px-16 lg:pb-24">

        {/* Header + filters */}
        <div className="flex items-start justify-between flex-wrap gap-5 mb-9">
          <div>
            <h2 className="font-bold text-[28px] text-[#111] tracking-tight">Open Positions</h2>
            <p className="text-[13.5px] text-[#999] mt-1">
              {loading ? 'Loading...' : `${filtered.length} role${filtered.length !== 1 ? 's' : ''} available${activeDept !== 'All' ? ` in ${activeDept}` : ''}`}
            </p>
          </div>
          <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 lg:w-auto lg:flex-wrap lg:overflow-visible">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-[13px] font-medium cursor-pointer transition-all duration-200 ${activeDept === dept ? 'bg-orange text-white' : 'bg-white text-[#555] hover:text-orange'
                  }`}
                style={{
                  border: activeDept === dept ? '1px solid #ff9501' : '1px solid rgba(0,0,0,0.1)',
                  boxShadow: activeDept === dept ? '0 2px 12px rgba(255,149,1,0.3)' : '0 1px 4px rgba(0,0,0,0.05)',
                }}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-[18px] p-5 h-[160px] animate-pulse sm:p-8" style={{ border: '1px solid rgba(0,0,0,0.07)' }} />
            ))}
          </div>
        )}

        {error && <div className="text-center py-20 text-[#bbb] text-[15px]">{error}</div>}

        {/* Job cards */}
        {!loading && !error && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDept}
              variants={stagger}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-3"
            >
              {filtered.map(job => (
                <motion.div
                  key={job._id}
                  variants={fadeUp}
                  whileHover={{ y: -3, boxShadow: '0 16px 52px rgba(255,149,1,0.09)', borderColor: 'rgba(255,149,1,0.3)' }}
                  transition={{ duration: 0.22 }}
                  className="bg-white rounded-[18px] p-5 grid gap-6 items-center sm:p-8 lg:grid-cols-[1fr_auto] lg:gap-8"
                  style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                >
                  {/* Left — job info */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span
                        className="text-[11px] font-semibold tracking-[1.5px] uppercase text-orange px-[10px] py-[3px] rounded-full"
                        style={{ background: 'rgba(255,149,1,0.07)', border: '1px solid rgba(255,149,1,0.18)' }}
                      >
                        {job.dept}
                      </span>
                      {job.isPaid && (
                        <span className="text-[11px] font-semibold text-green-600 bg-green-50 px-[10px] py-[3px] rounded-full" style={{ border: '1px solid rgba(0,140,0,0.2)' }}>
                          Paid
                        </span>
                      )}
                      <span className="text-[11px] font-semibold text-[#2a6e2a] bg-green-50 px-[10px] py-[3px] rounded-full" style={{ border: '1px solid rgba(0,140,0,0.2)' }}>
                        {job.positionType}
                      </span>
                    </div>

                    <h3 className="font-bold text-[18px] text-[#111] mb-2 tracking-tight">{job.title}</h3>

                    <div className="flex items-center gap-5 mb-3 flex-wrap">
                      <span className="flex items-center gap-[5px] text-[13px] text-[#888]">
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M8 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M8 2C5.2 2 3 4.2 3 7c0 4 5 7 5 7s5-3 5-7c0-2.8-2.2-5-5-5Z" />
                        </svg>
                        {job.location}
                      </span>
                    </div>

                    <p className="text-[13.5px] leading-[1.7] text-[#666] max-w-[580px] mb-4 line-clamp-2">{job.overview}</p>

                    <div className="flex gap-2 flex-wrap">
                      {job.tags?.slice(0, 5).map(tag => (
                        <span key={tag} className="text-[12px] font-medium text-[#555] bg-[#f5f3ef] px-3 py-1 rounded-full" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right — 2 buttons */}
                  <div className="grid grid-cols-1 gap-2 flex-shrink-0 sm:grid-cols-2 lg:flex lg:flex-col" onClick={e => e.stopPropagation()}>
                    <motion.button
                      whileHover={{ scale: 1.04, boxShadow: '0 6px 24px rgba(255,149,1,0.38)' }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setApplyJob(job)}
                      className="inline-flex w-full items-center justify-center gap-2 bg-orange text-white text-[13px] font-bold px-6 py-[11px] rounded-xl whitespace-nowrap cursor-pointer"
                      style={{ boxShadow: '0 4px 18px rgba(255,149,1,0.28)' }}
                    >
                      Apply Now
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.04, borderColor: 'rgba(255,149,1,0.35)', color: '#FF9501' }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectedJob(job)}
                      className="inline-flex w-full items-center justify-center gap-2 text-[#555] text-[13px] font-semibold px-6 py-[11px] rounded-xl whitespace-nowrap cursor-pointer transition-all duration-200 bg-white"
                      style={{ border: '1px solid rgba(0,0,0,0.1)' }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20 text-[#bbb] text-[15px]">
            No openings in this department right now. Check back soon!
          </div>
        )}
      </section>
      
      {/* Modals */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={(job) => { setSelectedJob(null); setApplyJob(job) }}
        />
      )}
      {applyJob && (
        <ApplyModal
          job={applyJob}
          onClose={() => setApplyJob(null)}
        />
      )}
    </main>
  )
}
