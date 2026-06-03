import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.3,
    },
  },
}

export default function Hero() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 10, ease: 'power1.out' }
      )
    }
  }, [])

  return (
    <section className="relative w-full h-screen min-h-[700px] bg-[#f5f0e8]">

      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          objectPosition: 'center 38%',
          transformOrigin: 'center center',
          filter: 'brightness(1.1) contrast(1.02)',
        }}
      >
        <source src="/videos/herosection.mp4" type="video/mp4" />
        <img
          src="/photos/photo5.jpeg"
          alt="P.L. Robotics"
          className="w-full h-full object-cover"
        />
      </video>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] h-[28%] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(240,232,218,0.55) 0%, transparent 100%)',
        }}
      />

      {/* Orange glow */}
      <div
        className="absolute z-[2] rounded-full pointer-events-none"
        style={{
          top: -300,
          left: -200,
          width: 900,
          height: 900,
          background:
            'radial-gradient(circle, rgba(255,149,1,0.1) 0%, transparent 60%)',
        }}
      />

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[6] h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #ff9501 25%, #ff9501 75%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-[4] w-full max-w-[1440px] mx-auto h-full flex items-center px-20 pt-[140px]">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-[580px]"
        >
          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="font-bold text-dark mb-6 leading-[1.02]"
            style={{ fontSize: 'clamp(46px, 5.6vw, 80px)', letterSpacing: '-2px' }}
          >
            Automate<br />
            Anything.<br />
            <span
              className="text-orange"
              style={{ filter: 'drop-shadow(0 0 16px rgba(255,149,1,0.35))' }}
            >
              Precisely.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-[15px] leading-[1.85] mb-10 max-w-[440px]"
            style={{ color: 'rgba(30,18,4,0.58)' }}
          >
            Cobots that adapt, assist, and evolve with your workforce.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">

            <motion.a
              href="#product-showcase"
              whileHover={{
                y: -2,
                boxShadow: '0 10px 36px rgba(255,149,1,0.5)',
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-orange text-white text-[13px] font-bold tracking-[0.3px] px-8 py-[14px] rounded-[10px] cursor-pointer"
              style={{
                boxShadow: '0 4px 24px rgba(255,149,1,0.38)',
              }}
            >
              Explore CO5

              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
