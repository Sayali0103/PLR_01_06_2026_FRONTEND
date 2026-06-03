import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionLink = motion.create(Link)

const specs = [
  { label: 'Payload',       value: '3 – 30 kg'     },
  { label: 'Reach',         value: '500 – 1800 mm' },
  { label: 'Repeatability', value: '±0.03 mm'       },
  { label: 'Axes',          value: '6-Axis'         },
  { label: 'Robot Weight',  value: '20 kg'          },
  { label: 'Mounting',      value: 'All Directions' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
}

export default function ProductShowcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activePhoto, setActivePhoto] = useState(0)

  const photos = [
    '/photos/photo1.png',
    '/photos/photo5.jpeg',
    '/photos/photo3.jpeg',
  ]

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/docs/PLR-Datasheet.pdf'
    link.download = 'PLR-Cobot-Datasheet.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="product-showcase" ref={ref} className="bg-[#faf7f2] py-28 px-6 scroll-mt-28">
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
                Our Product
              </span>
            </div>
            <h2
              className="font-bold text-[#111] leading-[1.04]"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-1.5px' }}
            >
              Meet Our Cobot
            </h2>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main image */}
            <div
              className="relative rounded-3xl overflow-hidden bg-[#e8e4de] mb-4"
              style={{ height: 480 }}
            >
              <motion.img
                key={activePhoto}
                src={photos[activePhoto]}
                alt="PL Robotics Cobot"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-contain object-center"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhoto(i)}
                  className="relative rounded-xl overflow-hidden flex-1 cursor-pointer transition-all duration-200 bg-[#e8e4de]"
                  style={{
                    height: 80,
                    border: activePhoto === i
                      ? '2px solid #ff9501'
                      : '2px solid transparent',
                    opacity: activePhoto === i ? 1 : 0.5,
                  }}
                >
                  <img src={photo} alt="" className="w-full h-full object-contain object-center" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right — specs */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <motion.p
              variants={fadeUp}
              className="text-[15px] leading-[1.85] mb-10 max-w-[460px]"
              style={{ color: 'rgba(0,0,0,0.55)' }}
            >
              The PL Robotics Cobot is a 6-axis collaborative robot engineered for
              precision, flexibility, and safe human collaboration on any
              factory floor.
            </motion.p>

            {/* Specs grid */}
            <motion.div
              variants={stagger}
              className="grid grid-cols-2 gap-3 mb-10"
            >
              {specs.map(s => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  whileHover={{
                    y: -3,
                    boxShadow: '0 8px 28px rgba(255,149,1,0.1)',
                    borderColor: 'rgba(255,149,1,0.28)',
                  }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl p-5 flex flex-col gap-2 cursor-default"
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.07)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <div className="text-[10.5px] font-semibold tracking-[1.8px] uppercase text-[#aaa]">
                    {s.label}
                  </div>
                  <div className="font-bold text-[20px] text-[#1a1208] tracking-tight leading-none">
                    {s.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <MotionLink
                to="/book-demo"
                whileHover={{ y: -2, boxShadow: '0 10px 36px rgba(255,149,1,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-orange text-white text-[13px] font-bold px-7 py-[13px] rounded-[10px] cursor-pointer"
                style={{ boxShadow: '0 4px 24px rgba(255,149,1,0.35)' }}
              >
                Request Demo
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </MotionLink>

              <motion.button
                onClick={handleDownload}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-[#111] text-[13px] font-semibold px-7 py-[13px] rounded-[10px] cursor-pointer transition-all duration-200"
                style={{
                  border: '1px solid rgba(0,0,0,0.12)',
                  background: 'rgba(0,0,0,0.03)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.25)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Datasheet
              </motion.button>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
