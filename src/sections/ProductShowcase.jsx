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

const cartesianSpecs = [
  { label: 'Applications', value: 'Adhesive, Painting, Welding' },
  { label: 'Configuration', value: 'Custom Built' },
  { label: 'Motion', value: 'Linear XYZ' },
  { label: 'Workspace', value: 'As Required' },
  { label: 'Tooling', value: 'Process Specific' },
  { label: 'Integration', value: 'Factory Ready' },
]

const vscaraSpecs = [
  { label: 'Maximum Payload', value: '3 kg' },
  { label: 'Reach', value: '500 mm' },
  { label: 'Axes', value: '4' },
  { label: 'Repeatability', value: '±0.03 mm' },
  { label: 'Robot Weight', value: '20 kg' },
  { label: 'Protection Rating', value: 'IP54' },
]

const deltaSpecs = [
  { label: 'Maximum Payload', value: '1 kg' },
  { label: 'Reach', value: '500 mm' },
  { label: 'Axes', value: '3' },
  { label: 'Repeatability', value: '±0.03 mm' },
  { label: 'Robot Weight', value: '25 kg' },
  { label: 'Protection Rating', value: 'IP54' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
}

function ProductSection({ id, eyebrow, title, description, image, imageAlt, specs, datasheet, downloadName, inView }) {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = datasheet
    link.download = downloadName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div id={id} className="mt-20 scroll-mt-24 border-t border-black/10 pt-16 sm:mt-24 sm:pt-20 lg:mt-28 lg:scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mb-10 sm:mb-12 lg:mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[2px] bg-orange rounded-full" />
          <span className="text-[11px] font-semibold tracking-[2.5px] uppercase text-orange">{eyebrow}</span>
        </div>
        <h2
          className="font-bold text-[#111] leading-[1.04]"
          style={{ fontSize: 'clamp(32px, 10vw, 52px)', letterSpacing: '-1.5px' }}
        >
          {title}
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="relative rounded-2xl overflow-hidden bg-[#e8e4de] sm:rounded-3xl"
            style={{ height: 'clamp(280px, 58vw, 480px)' }}
          >
            <img src={image} alt={imageAlt} className="w-full h-full object-contain object-center p-5 sm:p-8" />
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <motion.p
            variants={fadeUp}
            className="text-[14.5px] leading-[1.75] mb-8 max-w-[520px] sm:text-[15px] sm:leading-[1.85] sm:mb-10"
            style={{ color: 'rgba(0,0,0,0.55)' }}
          >
            {description}
          </motion.p>

          <motion.div variants={stagger} className="grid grid-cols-1 gap-3 mb-8 sm:grid-cols-2 sm:mb-10">
            {specs.map(spec => (
              <motion.div
                key={spec.label}
                variants={fadeUp}
                whileHover={{
                  y: -3,
                  boxShadow: '0 8px 28px rgba(255,125,0,0.1)',
                  borderColor: 'rgba(255,125,0,0.28)',
                }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-4 flex flex-col gap-2 cursor-default sm:p-5"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div className="text-[10.5px] font-semibold tracking-[1.8px] uppercase text-[#aaa]">{spec.label}</div>
                <div className="font-bold text-[18px] text-[#1a1208] tracking-tight leading-none sm:text-[20px]">{spec.value}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <MotionLink
              to="/book-demo"
              whileHover={{ y: -2, boxShadow: '0 10px 36px rgba(255,125,0,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 bg-orange text-white text-[13px] font-bold px-7 py-[13px] rounded-[10px] cursor-pointer"
              style={{ boxShadow: '0 4px 24px rgba(255,125,0,0.35)' }}
            >
              Request Demo
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </MotionLink>

            <motion.button
              onClick={handleDownload}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 text-[#111] text-[13px] font-semibold px-7 py-[13px] rounded-[10px] cursor-pointer transition-all duration-200"
              style={{ border: '1px solid rgba(0,0,0,0.12)', background: 'rgba(0,0,0,0.03)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Datasheet
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function ProductShowcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activePhoto, setActivePhoto] = useState(0)
  const [activeCartesianPhoto, setActiveCartesianPhoto] = useState(0)

  const photos = [
    '/photos/photo1.png',
    '/photos/photo5.jpeg',
    '/photos/photo3.jpeg',
  ]

  const cartesianPhotos = [
    '/photos/c1.jpeg',
    '/photos/c2.jpeg',
    '/photos/c3.jpeg',
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
    <section id="product-showcase" ref={ref} className="bg-[#faf7f2] py-16 px-5 scroll-mt-24 sm:py-20 sm:px-6 lg:py-28 lg:scroll-mt-28">
      <div className="max-w-[1320px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-10 flex-wrap gap-6 sm:mb-12 lg:mb-16"
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
              style={{ fontSize: 'clamp(32px, 10vw, 52px)', letterSpacing: '-1.5px' }}
            >
              Meet Our Cobot
            </h2>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">

          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main image */}
            <div
              className="relative rounded-2xl overflow-hidden bg-[#e8e4de] mb-4 sm:rounded-3xl"
              style={{ height: 'clamp(280px, 58vw, 480px)' }}
            >
              <motion.img
                key={activePhoto}
                src={photos[activePhoto]}
                alt="P. L. Robotics Cobot"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-contain object-center"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 sm:gap-3">
              {photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhoto(i)}
                  className="relative rounded-xl overflow-hidden flex-1 cursor-pointer transition-all duration-200 bg-[#e8e4de]"
                  style={{
                    height: 72,
                    border: activePhoto === i
                      ? '2px solid #FF7D00'
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
              className="text-[14.5px] leading-[1.75] mb-8 max-w-[460px] sm:text-[15px] sm:leading-[1.85] sm:mb-10"
              style={{ color: 'rgba(0,0,0,0.55)' }}
            >
              The P. L. Robotics Cobot is a 6-axis collaborative robot engineered for
              precision, flexibility, and safe human collaboration on any
              factory floor.
            </motion.p>

            {/* Specs grid */}
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 gap-3 mb-8 sm:grid-cols-2 sm:mb-10"
            >
              {specs.map(s => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  whileHover={{
                    y: -3,
                    boxShadow: '0 8px 28px rgba(255,125,0,0.1)',
                    borderColor: 'rgba(255,125,0,0.28)',
                  }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl p-4 flex flex-col gap-2 cursor-default sm:p-5"
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.07)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <div className="text-[10.5px] font-semibold tracking-[1.8px] uppercase text-[#aaa]">
                    {s.label}
                  </div>
                  <div className="font-bold text-[18px] text-[#1a1208] tracking-tight leading-none sm:text-[20px]">
                    {s.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <MotionLink
                to="/book-demo"
                whileHover={{ y: -2, boxShadow: '0 10px 36px rgba(255,125,0,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-orange text-white text-[13px] font-bold px-7 py-[13px] rounded-[10px] cursor-pointer"
                style={{ boxShadow: '0 4px 24px rgba(255,125,0,0.35)' }}
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
                className="inline-flex items-center justify-center gap-2 text-[#111] text-[13px] font-semibold px-7 py-[13px] rounded-[10px] cursor-pointer transition-all duration-200"
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

        <div id="cartesian-robot" className="mt-20 scroll-mt-24 border-t border-black/10 pt-16 sm:mt-24 sm:pt-20 lg:mt-28 lg:scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-10 sm:mb-12 lg:mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-orange rounded-full" />
              <span className="text-[11px] font-semibold tracking-[2.5px] uppercase text-orange">
                Custom Automation
              </span>
            </div>
            <h2
              className="font-bold text-[#111] leading-[1.04]"
              style={{ fontSize: 'clamp(32px, 10vw, 52px)', letterSpacing: '-1.5px' }}
            >
              Cartesian Robot
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="relative rounded-2xl overflow-hidden bg-[#e8e4de] mb-4 sm:rounded-3xl"
                style={{ height: 'clamp(280px, 58vw, 480px)' }}
              >
                <motion.img
                  key={activeCartesianPhoto}
                  src={cartesianPhotos[activeCartesianPhoto]}
                  alt="P. L. Robotics Cartesian Robot"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-contain object-center"
                />
              </div>

              <div className="flex gap-2 sm:gap-3">
                {cartesianPhotos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCartesianPhoto(i)}
                    className="relative rounded-xl overflow-hidden flex-1 cursor-pointer transition-all duration-200 bg-[#e8e4de]"
                    style={{
                      height: 72,
                      border: activeCartesianPhoto === i
                        ? '2px solid #FF7D00'
                        : '2px solid transparent',
                      opacity: activeCartesianPhoto === i ? 1 : 0.5,
                    }}
                  >
                    <img src={photo} alt="" className="w-full h-full object-contain object-center" />
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              <motion.p
                variants={fadeUp}
                className="text-[14.5px] leading-[1.75] mb-8 max-w-[520px] sm:text-[15px] sm:leading-[1.85] sm:mb-10"
                style={{ color: 'rgba(0,0,0,0.55)' }}
              >
                The P. L. Robotics Cartesian Robot is designed for customizable
                process automation. It can be configured around your required
                workspace, tooling, payload, and cycle needs for adhesive
                dispensing, spray painting, welding, and similar industrial
                applications.
              </motion.p>

              <motion.div
                variants={stagger}
                className="grid grid-cols-1 gap-3 mb-8 sm:grid-cols-2 sm:mb-10"
              >
                {cartesianSpecs.map(s => (
                  <motion.div
                    key={s.label}
                    variants={fadeUp}
                    whileHover={{
                      y: -3,
                      boxShadow: '0 8px 28px rgba(255,125,0,0.1)',
                      borderColor: 'rgba(255,125,0,0.28)',
                    }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-2xl p-4 flex flex-col gap-2 cursor-default sm:p-5"
                    style={{
                      background: '#ffffff',
                      border: '1px solid rgba(0,0,0,0.07)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div className="text-[10.5px] font-semibold tracking-[1.8px] uppercase text-[#aaa]">
                      {s.label}
                    </div>
                    <div className="font-bold text-[18px] text-[#1a1208] tracking-tight leading-none sm:text-[20px]">
                      {s.value}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <MotionLink
                  to="/book-demo"
                  whileHover={{ y: -2, boxShadow: '0 10px 36px rgba(255,125,0,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 bg-orange text-white text-[13px] font-bold px-7 py-[13px] rounded-[10px] cursor-pointer"
                  style={{ boxShadow: '0 4px 24px rgba(255,125,0,0.35)' }}
                >
                  Discuss Customization
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                  </svg>
                </MotionLink>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <ProductSection
          id="vscara-vs3"
          eyebrow="High-Speed Automation"
          title="VSCARA VS3"
          description="The VSCARA VS3 is a high-performance 4-axis robot designed for compact and efficient pick-and-place automation in modern press machines. It automates the complete material handling process, from loading raw blanks into the press machine to transferring parts between operations and unloading finished components with high speed and precision. Compatible with mechanical, hydraulic, pneumatic, servo, and stamping press machines, the VS3 ensures smooth, continuous production while increasing throughput, reducing cycle times, improving product quality, minimizing manual handling, and enhancing workplace safety. It is the ideal automation solution for manufacturers looking to maximize productivity and optimize their press line performance."
          image="/photos/vscara-vs3.png"
          imageAlt="P. L. Robotics VSCARA VS3 robot"
          specs={vscaraSpecs}
          datasheet="/docs/PLR-VSCARA-VS3-Datasheet.pdf"
          downloadName="PLR-VSCARA-VS3-Datasheet.pdf"
          inView={inView}
        />

        <ProductSection
          id="delta-dr1"
          eyebrow="High-Speed Automation"
          title="Delta DR1"
          description="The DR1 is a high-speed delta robot engineered for precision pick-and-place, sorting, stacking, and palletizing. Its rapid, accurate motion and optimized working envelope suit fast packaging, assembly, and material-handling lines."
          image="/photos/delta-dr1.png"
          imageAlt="P. L. Robotics Delta DR1 robot"
          specs={deltaSpecs}
          datasheet="/docs/PLR-Delta-DR1-Datasheet.pdf"
          downloadName="PLR-Delta-DR1-Datasheet.pdf"
          inView={inView}
        />
      </div>
    </section>
  )
}
