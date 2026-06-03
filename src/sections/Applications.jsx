import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionLink = motion.create(Link)

const apps = [
  {
    title: 'Machine Tending',
    desc: 'Load and unload CNC machines, injection moulders, and presses around the clock without fatigue.',
    video: '/videos/video9.mp4',
    speed: 1,
  },
  {
    title: 'Pick & Place',
    desc: 'High-speed, repeatable handling of parts across bins, conveyors, and packaging lines.',
    video: '/videos/video3.mp4',
    speed: 2.0,
  },
  {
    title: 'Assembly',
    desc: 'Precise part placement, fastening, and sub-assembly for electronics, automotive, and consumer goods.',
    video: '/videos/video6.mp4',
    speed: 1,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

function VideoCard({ app, variants }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = app.speed
    }
  }, [app.speed])

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ height: 420 }}
    >
      <video
        ref={videoRef}
        src={app.video}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        autoPlay
        loop
        muted
        playsInline
      />
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(26,18,8,0.72) 8%, rgba(26,18,8,0.34) 40%, rgba(255,149,1,0.05) 75%, transparent 100%)',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-bold text-[20px] text-orange mb-2 tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
          {app.title}
        </h3>
        <p
          className="text-[13px] leading-[1.6] transition-all duration-300 max-h-0 overflow-hidden group-hover:max-h-[80px]"
          style={{ color: 'rgba(255,236,200,0.95)' }}
        >
          {app.desc}
        </p>
        <div
          className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: '#ffb35f' }}
        >
        </div>
      </div>
    </motion.div>
  )
}

export default function Applications() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ backgroundColor: 'var(--color-grey)' }} className="py-28 px-6 relative overflow-hidden">

      {/* Glow */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          bottom: -300, left: -200,
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(255,149,1,0.18) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-[1320px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-16 flex-wrap gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-orange rounded-full" />
              <span className="text-[11px] font-semibold tracking-[2.5px] uppercase text-orange">
                Applications
              </span>
            </div>
            <h2
              className="font-bold text-[#1a1208] leading-[1.04]"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-1.5px' }}
            >
              One Cobot.<br />
              <span className="text-orange">Endless Possibilities.</span>
            </h2>
          </div>

          <MotionLink
            to="/applications"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 text-[13px] font-semibold px-6 py-[12px] rounded-[10px] cursor-pointer transition-all duration-200"
            style={{
              color: '#ff9501',
              border: '1px solid rgba(255,149,1,0.25)',
              background: 'rgba(255,149,1,0.08)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,149,1,0.4)'
              e.currentTarget.style.background = 'rgba(255,149,1,0.14)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,149,1,0.25)'
              e.currentTarget.style.background = 'rgba(255,149,1,0.08)'
            }}
          >
            View All Applications
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </MotionLink>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          {apps.map(app => (
            <VideoCard key={app.title} app={app} variants={fadeUp} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
