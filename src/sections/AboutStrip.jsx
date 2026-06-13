import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const pillars = [
  {
    num: '01',
    title: 'Safety First',
    desc: 'Every P. L. Robotics cobot is engineered to work safely alongside humans. No cages, no barriers, no compromises.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Plug & Deploy',
    desc: 'Seamless integration into your existing workflow with minimal setup and zero disruption to your operations.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Made in India',
    desc: 'Designed, built, and supported from Pune. Real engineers, real support, real accountability. Always close by.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
]

const MotionLink = motion.create(Link)

export default function AboutStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-[#fff3ea] py-16 px-5 relative overflow-hidden sm:py-20 sm:px-6 lg:py-28">

      {/* Orange glow */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          top: -300, right: -200,
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(255,149,1,0.12) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-[1320px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-start">

          {/* Left */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >

            <motion.h2
              variants={fadeUp}
              className="font-bold text-[#1a1208] mb-5 leading-[1.04] sm:mb-6"
              style={{ fontSize: 'clamp(32px, 10vw, 56px)', letterSpacing: '-1.5px' }}
            >
              Built to Work.<br />
              <span className="text-orange">Designed to Last.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-[14.5px] leading-[1.75] mb-8 max-w-[460px] sm:text-[15.5px] sm:leading-[1.85] sm:mb-10"
              style={{ color: 'rgba(26,18,8,0.68)' }}
            >
              P. L. Robotics is a Pune based industrial robotics company
              building the next generation of cobots for Indian manufacturing.
              We believe automation should empower workers, not replace them.
            </motion.p>

            <motion.div variants={fadeUp}>
              <MotionLink
                to="/about"
                whileHover={{ y: -2, boxShadow: '0 10px 36px rgba(255,149,1,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-orange text-white text-[13px] font-bold px-7 py-[13px] rounded-[10px] cursor-pointer"
                style={{ boxShadow: '0 4px 20px rgba(255,149,1,0.35)' }}
              >
                Our Story
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </MotionLink>
            </motion.div>
          </motion.div>

          {/* Right — pillars */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-col gap-5"
          >
            {pillars.map((p) => (
              <motion.div
                key={p.num}
                variants={fadeUp}
                whileHover={{
                  x: 6,
                  borderColor: 'rgba(255,149,1,0.3)',
                  background: 'rgba(255,149,1,0.08)',
                }}
                transition={{ duration: 0.22 }}
                className="flex flex-col gap-4 p-5 rounded-2xl cursor-default transition-colors duration-200 sm:flex-row sm:gap-5 sm:p-6"
                style={{
                  border: '1px solid rgba(255,149,1,0.18)',
                  background: 'rgba(255,255,255,0.95)',
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-orange"
                  style={{ background: 'rgba(255,149,1,0.12)' }}
                >
                  {p.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] font-bold tracking-[2px] text-orange/60">{p.num}</span>
                    <h3 className="font-semibold text-[15px] text-[#1a1208]">{p.title}</h3>
                  </div>
                  <p className="text-[13.5px] leading-[1.7]" style={{ color: 'rgba(26,18,8,0.6)' }}>
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
