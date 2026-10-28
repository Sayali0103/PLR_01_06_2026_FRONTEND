import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionLink = motion.create(Link)

export const applications = [
  {
    slug: 'cnc-machine-automation',
    title: 'CNC Machine Automation',
    short: 'Automate the loading and unloading of CNC machines to improve productivity and keep production running smoothly.',
    image: '/photos/Application%20Images/cnc.jpeg',
    benefits: ['Faster machine operation', 'Reduced manual work', 'Improved production efficiency'],
  },
  {
    slug: 'assembly-automation',
    title: 'Assembly Automation',
    short: 'Automate assembly tasks with accurate and consistent part placement for a wide range of products.',
    // The file named assembly.png depicts CNC machine tending; use the
    // application-neutral gripper image for the assembly card instead.
    image: '/photos/Application%20Images/assembly.png',
    benefits: ['Consistent assembly quality', 'Reliable production process', 'Flexible for different products'],
  },
  {
    slug: 'quality-inspection',
    title: 'Quality Inspection',
    short: 'Use vision-based inspection to identify defects and maintain product quality throughout production.',
    image: '/photos/Application%20Images/qualityinspection.png',
    benefits: ['Improved product quality', 'Early defect detection', 'Reliable inspection results'],
  },
  {
    slug: 'welding-automation',
    title: 'Welding Automation',
    short: 'Automate welding operations to achieve consistent weld quality and safer working conditions.',
    image: '/photos/Application%20Images/weilding.png',
    benefits: ['Uniform weld quality', 'Safer work environment', 'Simplified operation'],
  },
  {
    slug: 'custom-automation',
    title: 'Custom Automation',
    short: 'Tailored automation solutions designed to match your specific production requirements and workflows.',
    image: '/photos/Application%20Images/customautomation.png',
    benefits: ['Customized solutions', 'Expert engineering support', 'Seamless system integration'],
  },
  {
    slug: 'press-machine-tending',
    title: 'Press Machine Tending',
    short: 'Automate the loading and unloading of press machines for efficient and reliable production.',
    image: '/photos/Application%20Images/pressmachinetending.png',
    benefits: ['Improved productivity', 'Safe material handling', 'Consistent operation'],
  },
  {
    slug: 'press-metal',
    title: 'Press Metal Application',
    short: 'Automate press metal handling to improve production efficiency and ensure consistent part processing.',
    image: '/photos/Application%20Images/pressmetal.jpeg',
    benefits: ['Efficient metal handling', 'Consistent part processing', 'Improved workplace safety'],
  },
  {
    slug: 'packaging-automation',
    title: 'Packaging Automation',
    short: 'Automate picking, sorting, and packaging tasks to keep production lines running efficiently.',
    image: '/photos/Application%20Images/packingautomation.png',
    benefits: ['Faster packaging process', 'Reliable product handling', 'Reduced downtime'],
  },
  {
    slug: 'scara-pick-place',
    title: 'Pick & Place',
    short: 'Quick and accurate movement of products between conveyors, trays, and workstations.',
    image: '/photos/Application%20Images/pickandplace.png',
    benefits: ['Accurate product placement', 'Smooth material transfer', 'Flexible operation'],
  },
  {
    slug: 'palletizing',
    title: 'Palletizing',
    short: 'Automate stacking and organizing of boxes, bags, and cartons for easier handling and storage.',
    image: '/photos/Application%20Images/palletizing.png',
    benefits: ['Efficient pallet stacking', 'Reduced manual lifting', 'Consistent load arrangement'],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }

const buildLogEntries = [
  { time: '2026-10-28 12:13:26', message: 'build', kind: 'plain' },
  { time: '2026-10-28 12:13:26', message: '$ npm run build', kind: 'command' },
  { time: '2026-10-28 12:13:26', message: '', kind: 'empty' },
  { time: '2026-10-28 12:13:26', message: 'Deploy', kind: 'plain' },
  { time: '2026-10-28 12:13:26', message: '$ npm run preview -- --host 0.0.0 --port 4173', kind: 'command' },
  { time: '2026-10-28 12:13:46', message: 'Build Failed: build daemon returned an error < listing workers for Build: failed to list workers: Unavailable: [rpc error] ...', kind: 'error' },
]

export default function Applications() {
  return (
    <main className="min-h-screen" style={{ background: '#f8f9fb' }}>

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(#1a1208 1px, transparent 1px), linear-gradient(90deg, #1a1208 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />

        {/* Soft orange bloom */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,125,0,0.07) 0%, transparent 65%)',
            transform: 'translate(30%, -30%)',
          }} />

        <div className="max-w-[1320px] mx-auto relative z-[1]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >

            <h1 className="font-bold text-[#0f0a04] mb-5"
              style={{ fontSize: 'clamp(36px,5vw,62px)', letterSpacing: '-2.5px', lineHeight: 1.05 }}>
              One Platform.<br />
              <span style={{
                background: 'linear-gradient(135deg, #FF7D00 0%, #FF7D00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Every Industry.
              </span>
            </h1>

            <p className="text-[16px] leading-[1.8] max-w-[500px]" style={{ color: '#6b7280' }}>
              From CNC tending to high-speed packaging P. L. Robotics cobots are deployed
              across Indian manufacturing floors delivering real, measurable results.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="max-w-[1320px] mx-auto">
          <div
            className="overflow-hidden rounded-t-[18px] border"
            style={{
              background: 'linear-gradient(180deg, rgba(24,18,34,0.98) 0%, rgba(10,10,15,0.98) 100%)',
              borderColor: 'rgba(255,255,255,0.09)',
              boxShadow: '0 20px 80px rgba(0,0,0,0.22)',
            }}
          >
            <div className="flex items-center gap-6 px-7 pt-4 pb-3 border-b border-white/10 text-[13px] sm:text-[15px]">
              {['Details', 'Build Logs', 'Deploy Logs', 'Network Logs'].map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  className="relative pb-2 text-left transition-opacity duration-200"
                  style={{
                    color: index === 1 ? '#f7f2ff' : 'rgba(255,255,255,0.72)',
                    fontWeight: index === 1 ? 600 : 500,
                    opacity: index === 1 ? 1 : 0.8,
                  }}
                >
                  {tab}
                  {index === 1 && (
                    <span
                      className="absolute bottom-[-13px] left-0 h-[2px] rounded-full"
                      style={{ background: '#f5d6ff', width: '100%' }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-7 py-4">
              <div className="flex items-center gap-3 text-[22px] font-semibold text-[#f1ebff]" style={{ letterSpacing: '-0.04em' }}>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#7d4dff]/20 text-[14px] text-[#d5c4ff]">◌</span>
                <span>Fetching deployment info</span>
              </div>
              <div className="font-mono text-[14px] text-[#f0ebff]">00:01</div>
            </div>

            <div className="px-7 pb-5 pt-5">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0d0b13]/60 px-4 py-3 text-[12px] text-white/70 sm:text-[14px]">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="6" />
                  <path d="M16 16l4 4" />
                </svg>
                <span className="flex-1">Search build logs</span>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-medium text-white/60">
                  <span>/</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3v18M3 12h18" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-0 border-t border-white/10 bg-[#070a13] px-0 pb-4">
              {buildLogEntries.map((entry, index) => (
                <div
                  key={`${entry.time}-${index}`}
                  className="grid grid-cols-[1fr_10fr] items-start gap-2 border-b border-white/5 px-7 py-2 text-[14px]"
                  style={{ minHeight: '44px' }}
                >
                  <div className="font-mono text-[#a6afc4] pr-6">{entry.time}</div>
                  <div className="relative pl-8 text-[#ebedf6]" style={{ minHeight: '22px' }}>
                    {entry.kind === 'error' ? (
                      <>
                        <span className="absolute left-0 top-1 h-2.5 w-2.5 rounded-full bg-[#e93a58]" />
                        <span className="font-medium text-[#f0f3ff]">Build Failed:</span>{' '}
                        <span className="text-[#f8f8fd]">{entry.message}</span>
                      </>
                    ) : entry.kind === 'command' ? (
                      <>
                        <span className="absolute left-0 top-1 h-2.5 w-2.5 rounded-full bg-[#7d4dff]" />
                        <span className="font-mono text-[#d7c7ff]">$</span>{' '}
                        <span className="font-mono text-[#f4f3ff]">{entry.message.replace(/^\$\s*/, '')}</span>
                      </>
                    ) : entry.message ? (
                      <>
                        <span className="absolute left-0 top-1 h-2.5 w-2.5 rounded-full bg-[#7d4dff]" />
                        <span className="font-medium text-[#f0f3ff]">{entry.message}</span>
                      </>
                    ) : (
                      <span className="inline-block h-4 w-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CARDS ── */}
      <section className="px-6 pb-24">
        <div className="max-w-[1320px] mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {applications.map(app => (
              <motion.div
                key={app.slug}
                variants={fadeUp}
                className="group flex flex-col rounded-[20px] overflow-hidden"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.28s ease, border-color 0.28s ease, transform 0.28s cubic-bezier(0.16,1,0.3,1)',
                }}
                whileHover={{
                  y: -6,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.04), 0 20px 56px rgba(0,0,0,0.10)',
                  borderColor: 'rgba(255,125,0,0.25)',
                }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: 340 }}>
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  {/* Gradient */}
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(10,6,2,0.82) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)' }} />

                  {/* Title on image */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
                    <h3 className="font-bold text-white leading-tight"
                      style={{ fontSize: '18px', letterSpacing: '-0.3px' }}>
                      {app.title}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
                  <p className="text-[13.5px] leading-[1.72] mb-5 flex-1"
                    style={{ color: '#6b7280' }}>
                    {app.short}
                  </p>

                  {/* Divider */}
                  <div className="mb-4" style={{ height: '1px', background: 'rgba(0,0,0,0.055)' }} />

                  {/* Benefits */}
                  <div className="flex flex-col gap-[9px]">
                    {app.benefits.map(b => (
                      <div key={b} className="flex items-center gap-[10px]">
                        {/* Checkmark icon */}
                        <div className="flex-shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center"
                          style={{ background: 'rgba(255,125,0,0.1)', border: '1px solid rgba(255,125,0,0.2)' }}>
                          <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#FF7D00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 6l3 3 5-5" />
                          </svg>
                        </div>
                        <span className="text-[12.5px] font-medium leading-[1.4]" style={{ color: '#374151' }}>
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="px-5 pb-20 sm:px-6 sm:pb-28">
        <div className="max-w-[1320px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[24px] overflow-hidden sm:rounded-[28px]"
            style={{
              background: 'linear-gradient(135deg, #fff8f0 0%, #fef3e4 50%, #fff8f0 100%)',
              border: '1px solid rgba(255,125,0,0.18)',
              boxShadow: '0 8px 48px rgba(255,125,0,0.08)',
            }}
          >
            {/* Glow */}
            <div className="absolute pointer-events-none rounded-full"
              style={{
                top: -180, left: '50%', transform: 'translateX(-50%)',
                width: 600, height: 600,
                background: 'radial-gradient(circle, rgba(255,125,0,0.11) 0%, transparent 65%)',
              }} />

            {/* Dot grid top-right */}
            <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage: 'radial-gradient(circle, #FF7D00 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }} />

            {/* Dot grid bottom-left */}
            <div className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none opacity-[0.05]"
              style={{
                backgroundImage: 'radial-gradient(circle, #FF7D00 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }} />

            {/* Top accent line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[2px] rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, #FF7D00, transparent)' }} />

            <div className="relative z-[1] px-6 py-10 flex flex-col items-start justify-between gap-8 sm:px-10 sm:py-12 lg:px-16 lg:py-16 lg:flex-row lg:items-center lg:gap-12">
              {/* Left */}
              <div className="max-w-[520px]">
                <h2 className="font-bold text-[#0f0a04] leading-[1.05] mb-4"
                  style={{ fontSize: 'clamp(26px,3.5vw,46px)', letterSpacing: '-1.5px' }}>
                  Not Sure Which Robot<span className="hidden sm:inline"><br /></span>{' '}
                  <span className="text-[#FF7D00]">Fits Your Process?</span>
                </h2>
                <p className="text-[15px] leading-[1.8] mb-5" style={{ color: 'rgba(26,18,8,0.52)' }}>
                  Our automation engineers will assess your workflow and recommend
                  the right solution.
                </p>
                <p className="text-[10.5px] font-bold tracking-[2.5px] uppercase text-[#FF7D00]/60">
                  Built to Work. Designed to Last.
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-col gap-3 flex-shrink-0 w-full lg:min-w-[230px] lg:w-auto">
                <MotionLink
                  to="/book-demo"
                  whileHover={{ y: -2, boxShadow: '0 12px 36px rgba(255,125,0,0.42)' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex w-full items-center justify-center gap-2 text-center text-white text-[13.5px] font-bold px-5 py-[14px] rounded-[12px] cursor-pointer sm:px-8"
                  style={{
                    background: 'linear-gradient(135deg, #FF7D00 0%, #FF7D00 100%)',
                    boxShadow: '0 4px 20px rgba(255,125,0,0.32)',
                  }}
                >
                  Get Automation Consultation
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </MotionLink>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
