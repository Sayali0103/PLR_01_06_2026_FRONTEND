import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionLink = motion.create(Link)

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-[#faf7f2] py-16 px-5 sm:py-20 sm:px-6 lg:py-28">
      <div className="max-w-[1320px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden sm:rounded-[32px]"
          style={{
            background: 'linear-gradient(135deg, #fff8f0 0%, #fef3e4 50%, #fff8f0 100%)',
            border: '1px solid rgba(255,125,0,0.18)',
            boxShadow: '0 8px 48px rgba(255,125,0,0.08)',
          }}
        >
          {/* Orange glow top center */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              top: -180, left: '50%', transform: 'translateX(-50%)',
              width: 600, height: 600,
              background: 'radial-gradient(circle, rgba(255,125,0,0.12) 0%, transparent 65%)',
            }}
          />

          {/* Dot grid top-right */}
          <div
            className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(circle, #FF7D00 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Dot grid bottom-left */}
          <div
            className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(circle, #FF7D00 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Orange accent line top */}
          <div
            className="absolute top-0 left-1/4 right-1/4 h-[2px] rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #FF7D00, transparent)' }}
          />

          {/* Content */}
          <div className="relative z-[1] px-6 py-10 flex flex-col lg:flex-row items-start justify-between gap-8 sm:px-10 sm:py-12 lg:items-center lg:gap-12 lg:px-16 lg:py-16">

            {/* Left */}
            <div className="max-w-[520px]">
              <h2
                className="font-bold text-[#1a1208] leading-[1.04] mb-5"
                style={{ fontSize: 'clamp(28px, 9vw, 50px)', letterSpacing: '-1.5px' }}
              >
                Ready to Automate<br />
                <span className="text-[#FF7D00]">Your Factory Floor?</span>
              </h2>

              <p
                className="text-[14.5px] leading-[1.75] mb-5 sm:text-[15px] sm:leading-[1.85]"
                style={{ color: 'rgba(26,18,8,0.55)' }}
              >
                Book a free demo with our team and see exactly how P. L. Robotics
                cobots fit into your workflow.
              </p>

              <p className="text-[11px] font-semibold tracking-[2px] uppercase text-[#FF7D00]/70">
                Built to Work. Designed to Last.
              </p>
            </div>

            {/* Right — buttons */}
            <div className="flex flex-col gap-3 flex-shrink-0 min-w-[220px] w-full lg:w-auto">
              <MotionLink
                to="/book-demo"
                whileHover={{ y: -2, boxShadow: '0 12px 36px rgba(255,125,0,0.45)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-[#FF7D00] text-white text-[13.5px] font-bold px-8 py-[14px] rounded-[12px] cursor-pointer"
                style={{ boxShadow: '0 4px 20px rgba(255,125,0,0.35)' }}
              >
                Book a Free Demo
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </MotionLink>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
