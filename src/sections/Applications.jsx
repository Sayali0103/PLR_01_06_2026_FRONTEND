import { useRef, useEffect, useState } from 'react'
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
  const cardRef = useRef(null)
  const videoRef = useRef(null)
  const hoverTimerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = app.speed
      if (isPlaying) {
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [app.speed, isPlaying])

  useEffect(() => () => clearTimeout(hoverTimerRef.current), [])

  useEffect(() => {
    const card = cardRef.current
    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches

    if (!card || !isTouchDevice) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPlaying(entry.isIntersecting && entry.intersectionRatio >= 0.65)
      },
      { threshold: [0, 0.65] }
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  const handlePointerEnter = (event) => {
    if (event.pointerType !== 'mouse') return
    clearTimeout(hoverTimerRef.current)
    hoverTimerRef.current = setTimeout(() => setIsPlaying(true), 180)
  }

  const handlePointerLeave = (event) => {
    if (event.pointerType !== 'mouse') return
    clearTimeout(hoverTimerRef.current)
    setIsPlaying(false)
  }

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ height: 'clamp(300px, 70vw, 420px)' }}
    >
      <video
        ref={videoRef}
        src={app.video}
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={(event) => {
          event.currentTarget.currentTime = Math.min(0.1, event.currentTarget.duration)
        }}
        onLoadedData={() => setIsVideoReady(true)}
        className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
          isVideoReady ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(26,18,8,0.72) 8%, rgba(26,18,8,0.34) 40%, rgba(255,149,1,0.05) 75%, transparent 100%)',
        }}
      />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <h3 className="font-bold text-[20px] text-orange mb-2 tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
          {app.title}
        </h3>
        <p
          className="text-[13px] leading-[1.6] transition-all duration-300 max-h-[90px] overflow-hidden sm:max-h-0 sm:group-hover:max-h-[80px]"
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
    <section ref={ref} style={{ backgroundColor: 'var(--color-grey)' }} className="py-16 px-5 relative overflow-hidden sm:py-20 sm:px-6 lg:py-28">

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
          className="flex flex-col items-start justify-between mb-10 gap-6 sm:mb-12 lg:mb-16 lg:flex-row lg:items-end"
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
              style={{ fontSize: 'clamp(32px, 10vw, 52px)', letterSpacing: '-1.5px' }}
            >
              One Cobot.<br />
              <span className="text-orange">Endless Possibilities.</span>
            </h2>
          </div>

          <MotionLink
            to="/applications"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex w-full items-center justify-center gap-2 text-[13px] font-semibold px-6 py-[12px] rounded-[10px] cursor-pointer transition-all duration-200 sm:w-auto"
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
