import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

const systems = [
  {
    id: 'software',
    tag: 'Core USP',
    label: 'Software Platform',
    tagline: 'Program once. Deploy everywhere.',
    desc: 'Easy-to-use software that helps operators, technicians, and engineers quickly configure and manage robotic automation with confidence.',
    images: ['/photos/photo9.png', '/photos/photo11.png', '/photos/photo17.jpeg'],
    color: '#ff9501',
    colorBg: 'rgba(255,149,1,0.08)',
    colorBorder: 'rgba(255,149,1,0.2)',
    features: [
      { title: 'Drag & Drop Programming', desc: 'Create automation workflows visually with an intuitive no-code programming environment.' },
      { title: '10" HD Teach Pendant', desc: 'Program, monitor, and control robots through a responsive touchscreen interface designed for operators of all skill levels.' },
      { title: 'Visual Robot Configuration', desc: 'Configure robot parameters, system settings, and operational preferences through a guided interface.' },
      { title: 'Real-Time Alerts', desc: 'Receive instant notifications and system alerts to maintain smooth and uninterrupted operations.' },
      { title: 'Automation Workflow Management', desc: 'Manage multiple automation programs while monitoring system performance in real time.' },
      { title: '2 Years Free Software Access', desc: 'Includes two years of complimentary RACS software usage, updates, and platform support.' },
    ],
    specs: [
      { label: 'Software', value: 'RACS Control' },
      { label: 'Programming', value: 'Visual Workflow' },
      { label: 'Configuration', value: 'Robot Parameters' },
      { label: 'Monitoring', value: 'Real-Time Alerts' },
      { label: 'Interface', value: '10" HD Display' },
      { label: 'Training', value: 'Learn in No Time' },
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M7 8l3 3-3 3M13 14h4" />
      </svg>
    ),
  },
  {
    id: 'telemetric',
    tag: 'Monitoring',
    label: 'Telemetric System',
    tagline: 'See everything. Miss nothing.',
    desc: 'Track robot health, performance, and operational status from a centralized dashboard, with instant notifications and actionable insights to keep production running smoothly.',
    images: ['/photos/photo13.png', '/photos/photo14.png', '/photos/photo15.png'],
    color: '#ff9501',
    colorBg: 'rgba(255,149,1,0.08)',
    colorBorder: 'rgba(255,149,1,0.2)',
    features: [
      { title: 'Secure Login', desc: 'Authorized access with username and password protection.' },
      { title: 'Real-Time Visibility', desc: 'Stay connected to robot operations from anywhere.' },
      { title: 'Smart Alerts', desc: 'Get notified instantly when attention is required.' },
      { title: 'Multi-Robot Dashboard', desc: 'Manage all connected robots through one interface.' },
      { title: '3D Robot View', desc: 'Visualize robot activity with a live digital twin.' },
      { title: 'Operational Insights', desc: 'Access logs, diagnostics, and performance data in one place.' },
    ],
    specs: [
      { label: 'Visibility', value: '24/7 Operational' },
      { label: 'Monitoring', value: 'Real-Time' },
      { label: 'Alerts', value: 'Instant Notify' },
      { label: 'Dashboard', value: 'Multi-Robot' },
      { label: 'Access', value: 'Secure Login' },
      { label: 'View', value: '3D Digital Twin' },
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: 'vision',
    tag: 'Perception',
    label: 'Vision System',
    tagline: 'Robots that see. Precisely.',
    desc: 'Our vision system enables Delta Robots to recognize products, guide movements, and perform inspection tasks with greater accuracy and consistency.',
    images: ['/photos/photo21.png', '/photos/photo20.png', '/photos/deltacamera.jpg'],
    color: '#ff9501',
    colorBg: 'rgba(255,149,1,0.08)',
    colorBorder: 'rgba(255,149,1,0.2)',
    features: [
      { title: 'Intelligent Object Detection', desc: 'Automatically identifies products, parts, and components within the workspace.' },
      { title: 'Vision-Guided Picking', desc: 'Enables robots to locate and pick randomly placed items with precision.' },
      { title: 'Dynamic Product Tracking', desc: 'Tracks moving products on conveyors for continuous operation.' },
      { title: 'Automated Quality Inspection', desc: 'Detects visual defects, inconsistencies, and missing components during production.' },
      { title: 'Intelligent Sorting', desc: 'Classifies and sorts products based on predefined visual criteria.' },
      { title: 'Adaptive Position Correction', desc: 'Automatically adjusts robot movements based on real-time product location.' },
    ],
    specs: [
      { label: 'Product Identification', value: 'Fast' },
      { label: 'Object Tracking', value: 'Dynamic' },
      { label: 'Quality Inspection', value: 'Smart' },
      { label: 'Product Detection', value: 'Real-Time' },
      { label: 'Inspection Performance', value: 'Reliable' },
      { label: 'Mounting', value: 'All Directions' },
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
]

function SystemSection({ system, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeFeature, setActiveFeature] = useState(0)
  const [activePhoto, setActivePhoto] = useState(0)
  const isEven = index % 2 === 0
  const photos = system.images || [system.image]

  return (
    <section
      ref={ref}
      id={system.id}
      className={`scroll-mt-28 py-20 px-5 sm:px-6 lg:py-28 ${isEven ? 'bg-[#faf7f2]' : 'bg-white'}`}
    >
      <div className="max-w-[1320px] mx-auto">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-start ${!isEven ? 'direction-rtl' : ''}`}>

          {/* Content side */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className={!isEven ? 'lg:order-2' : ''}
          >

            <motion.h2
              variants={fadeUp}
              className="font-bold text-[#1a1208] mb-3 leading-tight"
              style={{ fontSize: 'clamp(30px, 3.5vw, 48px)', letterSpacing: '-1.5px' }}
            >
              {system.label}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-[17px] font-medium mb-5"
              style={{ color: system.color }}
            >
              "{system.tagline}"
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-[15px] leading-[1.9] text-[#555] mb-10 max-w-[500px]"
            >
              {system.desc}
            </motion.p>

            {/* Interactive features */}
            <motion.div variants={fadeUp} className="mb-8">
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {system.features.map((f, i) => (
                  <button
                    key={f.title}
                    onClick={() => setActiveFeature(i)}
                    className="text-left p-4 rounded-[14px] transition-all duration-200 cursor-pointer min-h-[82px]"
                    style={{
                      background: activeFeature === i ? system.colorBg : 'transparent',
                      border: `1px solid ${activeFeature === i ? system.colorBorder : 'rgba(0,0,0,0.07)'}`,
                      boxShadow: activeFeature === i ? '0 8px 24px rgba(255,149,1,0.08)' : 'none',
                    }}
                  >
                    <div
                      className="text-[13px] font-semibold mb-1 transition-colors duration-200"
                      style={{ color: activeFeature === i ? system.color : '#1a1208' }}
                    >
                      {f.title}
                    </div>
                    <AnimatePresence mode="wait">
                      {activeFeature === i && (
                        <motion.p
                          key={f.title}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22 }}
                          className="text-[12px] text-[#777] leading-[1.5]"
                        >
                          {f.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/book-demo"
                  className="inline-flex items-center gap-2 text-white text-[13px] font-bold px-7 py-[13px] rounded-[10px] cursor-pointer"
                  style={{ background: system.color, boxShadow: `0 4px 20px ${system.color}55` }}
                >
                  Request Demo
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={!isEven ? 'lg:order-1' : ''}
          >
            {/* Main image */}
            <div
              className="relative rounded-[24px] overflow-hidden mb-4 bg-[#e8e4de] h-[280px] sm:h-[330px] lg:h-[360px]"
              style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 16px 44px rgba(26,18,8,0.08)' }}
            >
              <motion.img
                key={photos[activePhoto]}
                src={photos[activePhoto]}
                alt={system.label}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                className={`w-full h-full object-center ${system.id === 'telemetric' ? 'object-contain' : 'object-cover'}`}
              />
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${system.color}22 0%, transparent 60%)` }} />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mb-5">
              {photos.map((photo, i) => (
                <button
                  key={photo}
                  type="button"
                  onClick={() => setActivePhoto(i)}
                  className="relative rounded-xl overflow-hidden flex-1 cursor-pointer transition-all duration-200 h-16 sm:h-[72px] bg-white"
                  style={{
                    border: activePhoto === i
                      ? '2px solid #ff9501'
                      : '2px solid transparent',
                    opacity: activePhoto === i ? 1 : 0.55,
                    boxShadow: activePhoto === i
                      ? '0 8px 24px rgba(255,149,1,0.18)'
                      : 'none',
                  }}
                  aria-label={`Show ${system.label} image ${i + 1}`}
                >
                  <img src={photo} alt="" className={`w-full h-full object-center ${system.id === 'telemetric' ? 'object-contain' : 'object-cover'}`} />
                </button>
              ))}
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden"
              style={{ background: '#e8e2d8', boxShadow: '0 8px 28px rgba(26,18,8,0.05)' }}>
              {system.specs.map(s => (
                <div key={s.label} className="bg-white p-4">
                  <div className="text-[10px] font-medium tracking-[1.5px] uppercase text-[#aaa] mb-1">{s.label}</div>
                  <div className="font-bold text-[14px] text-[#1a1208] tracking-tight leading-tight">{s.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default function Technology() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <main className="bg-[#faf7f2] min-h-screen">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-5 sm:px-6 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Bg glows */}
        <div className="absolute top-0 right-0 pointer-events-none rounded-full"
          style={{ width: 700, height: 700, transform: 'translate(30%,-30%)', background: 'radial-gradient(circle, rgba(255,149,1,0.07) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 left-0 pointer-events-none rounded-full"
          style={{ width: 500, height: 500, transform: 'translate(-30%,30%)', background: 'radial-gradient(circle, rgba(255,149,1,0.05) 0%, transparent 65%)' }} />

        <div className="max-w-[1320px] mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={heroInView ? 'show' : 'hidden'}
          >
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <motion.h1
                  variants={fadeUp}
                  className="font-bold text-[#1a1208] leading-[1.02] mb-6"
                  style={{ fontSize: 'clamp(42px, 5.5vw, 72px)', letterSpacing: '-2.5px' }}
                >
                  The Intelligence<br />
                  Behind{' '}
                  <span className="text-[#ff9501]"
                    style={{ filter: 'drop-shadow(0 0 18px rgba(255,149,1,0.3))' }}>
                    Every Robot.
                  </span>
                </motion.h1>
                <motion.p variants={fadeUp} className="text-[16px] leading-[1.85] text-[#666] max-w-[480px]">
                  Our robots work alongside intelligent software and vision systems to help businesses improve productivity and streamline operations.
                </motion.p>
              </div>

              {/* System nav cards */}
              <motion.div variants={stagger} className="grid sm:grid-cols-3 gap-3 lg:gap-4">
                {systems.map(s => (
                  <motion.a
                    key={s.id}
                    href={`#${s.id}`}
                    variants={fadeUp}
                    whileHover={{ y: -5, boxShadow: `0 16px 40px ${s.color}22`, borderColor: s.colorBorder }}
                    transition={{ duration: 0.22 }}
                    className="bg-white rounded-2xl p-5 flex flex-col gap-3 cursor-pointer min-h-[150px]"
                    style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: s.colorBg, color: s.color }}
                    >
                      {s.icon}
                    </div>
                    <div>
                      <div className="font-bold text-[14px] text-[#1a1208] mb-1">{s.label}</div>
                    </div>
                    <div className="flex items-center gap-1 text-[12px] font-semibold"
                      style={{ color: s.color }}>
                      Explore
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SYSTEM SECTIONS ── */}
      {systems.map((system, i) => (
        <SystemSection key={system.id} system={system} index={i} />
      ))}

      {/* ── CTA ── */}
      <section className="bg-[#faf7f2] py-20 px-5 sm:px-6 lg:py-28">
        <div className="max-w-[1320px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[32px] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #fff8f0 0%, #fef3e4 50%, #fff8f0 100%)',
              border: '1px solid rgba(255,149,1,0.18)',
              boxShadow: '0 8px 48px rgba(255,149,1,0.08)',
            }}
          >
            <div className="absolute pointer-events-none rounded-full"
              style={{ top: -180, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(255,149,1,0.12) 0%, transparent 65%)' }} />
            <div
              className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-[0.07]"
              style={{
                backgroundImage: 'radial-gradient(circle, #ff9501 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage: 'radial-gradient(circle, #ff9501 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div
              className="absolute top-0 left-1/4 right-1/4 h-[2px] rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, #ff9501, transparent)' }}
            />

            <div className="relative z-[1] px-6 py-10 sm:px-10 lg:px-16 lg:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-12">
              <div className="max-w-[520px]">
                <h2
                  className="font-bold text-[#1a1208] leading-[1.04] mb-5"
                  style={{ fontSize: 'clamp(28px, 3.8vw, 50px)', letterSpacing: '-1.5px' }}
                >
                  Ready to <br />
                  <span className="text-[#ff9501]">Automate?</span>
                </h2>

                <p
                  className="text-[15px] leading-[1.85] mb-5"
                  style={{ color: 'rgba(26,18,8,0.55)' }}
                >
                  Book a live demo with our engineering team and see how the
                  software platform, telemetry, and vision systems work together.
                </p>

                <p className="text-[11px] font-semibold tracking-[2px] uppercase text-[#ff9501]/70">
                  Built to Work. Designed to Last.
                </p>
              </div>

              <div className="flex flex-col gap-3 flex-shrink-0 min-w-[220px] w-full lg:w-auto">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/book-demo"
                    className="inline-flex w-full items-center justify-center gap-2 bg-[#ff9501] text-white text-[13.5px] font-bold px-8 py-[14px] rounded-[12px] cursor-pointer"
                    style={{ boxShadow: '0 4px 20px rgba(255,149,1,0.35)' }}
                  >
                    Book a Live Demo
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
