import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FaBullseye, FaHandHoldingHeart, FaLightbulb } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const MotionLink = motion.create(Link)

const cards = [
  {
    title: 'Our Vision',
    number: '01',
    icon: FaLightbulb,
    text: 'We see an India where every factory, regardless of size, can access affordable and adaptable robotics solutions. Our goal is efficient, collaborative manufacturing where robots and people work together seamlessly.',
    points: [
      'Democratize automation for small and mid-size manufacturers',
      'Make robotics as easy to use as everyday tools',
      'Build a future where technology uplifts every worker',
    ],
  },
  {
    title: 'Our Mission',
    number: '02',
    icon: FaBullseye,
    text: 'To build next-generation robotics technology for Indian industries that boosts productivity, precision, and efficiency while making automation easy to adopt and scale.',
    points: [
      'Deliver robots that reduce cycle time and human error',
      'Support manufacturers from installation to full-scale deployment',
      'Design systems that grow with your production needs',
    ],
  },
  {
    title: 'Our Values',
    number: '03',
    icon: FaHandHoldingHeart,
    text: 'Innovation, affordability, and social impact guide everything we build. We design robotics with a local mindset that supports Indian businesses and strengthens the manufacturing ecosystem.',
    points: [
      'Engineer with purpose and every feature must solve a real problem',
      'Stay affordable without compromising on quality or safety',
      'Put people first operators, engineers, and factory owners alike',
    ],
  },
]

const features = [
  {
    title: 'Cobots for collaboration',
    desc: 'Robots designed to work safely alongside operators with intuitive controls and flexible deployment.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'SCARA precision systems',
    desc: 'High-speed assembly and pick-and-place automation for electronics, packaging, and small-part manufacturing.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: 'Modular end effectors',
    desc: 'Change tools quickly to support welding, dispensing, inspection, and material handling workflows.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }

export default function About() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <main className="bg-cream min-h-screen pt-[90px] text-[#111] overflow-x-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="max-w-[1320px] mx-auto px-5 pt-10 pb-16 relative sm:px-6 sm:pt-14 sm:pb-20 lg:px-16">
        <div className="absolute pointer-events-none"
          style={{
            top: -80, right: -60,
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(255,125,0,0.07) 0%, transparent 65%)',
            borderRadius: '50%',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: heroY }}
        >
          <div className="grid gap-10 items-start lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

            {/* Left */}
            <div>
              <h1
                className="font-bold text-[#111] leading-[1.02] mb-7"
                style={{ fontSize: 'clamp(44px,5.5vw,76px)', letterSpacing: '-2.5px' }}
              >
                Engineering<br />
                automation for<br />
                <span style={{ color: '#FF7D00' }}>smarter India.</span>
              </h1>
              <p className="text-[16px] leading-[1.85] text-[#666] max-w-[520px]">
                P. L. Robotics started with the idea of increasing industrial productivity through advanced manufacturing and software capabilities. We build next-generation robots designed for Indian manufacturing, from cobots to SCARA, precision automation, and modular end effectors.
              </p>
            </div>

            {/* Right — impact cards */}
            <div className="space-y-4 pt-0 lg:pt-2">
              {[
                { tag: 'What we deliver', body: 'Affordable automation solutions tailored for Indian manufacturing that improve throughput and worker safety.' },
                { tag: 'Why it matters', body: 'Robotics can help factories compete globally while preserving local jobs through smarter, safer production systems.' },
                { tag: 'Who we serve', body: 'From tier-1 automotive suppliers to small electronics assemblers — any Indian factory that wants to scale.' },
              ].map((item, i) => (
                <motion.div
                  key={item.tag}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 4, borderColor: 'rgba(255,125,0,0.3)' }}
                  className="bg-white rounded-2xl p-5 transition-all duration-200 sm:p-6"
                  style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
                >
                  <p className="text-[10.5px] font-semibold tracking-[2px] uppercase text-orange mb-2">{item.tag}</p>
                  <p className="text-[15px] leading-[1.75] text-[#555]">{item.body}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>
      </section>

      {/* ── VISION / MISSION / VALUES ── */}
      <section className="max-w-[1320px] mx-auto px-5 pb-20 sm:px-6 lg:px-16 lg:pb-24">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8 sm:mb-12"
        >
          <div className="h-px flex-1 max-w-[40px]" style={{ background: 'rgba(255,125,0,0.3)' }} />
          <span className="text-[11px] font-semibold tracking-[2.5px] uppercase text-orange">What drives us</span>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-6"
        >
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                variants={fadeUp}
                whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(255,125,0,0.1)', borderColor: 'rgba(255,125,0,0.25)' }}
                transition={{ duration: 0.22 }}
                className="bg-white rounded-[24px] p-6 relative overflow-hidden cursor-default flex flex-col sm:rounded-[28px] sm:p-8 lg:p-10"
                style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
              >
                {/* Large number watermark */}
                <div
                  className="absolute top-4 right-6 font-bold select-none pointer-events-none"
                  style={{ fontSize: 96, color: 'rgba(255,125,0,0.05)', lineHeight: 1, letterSpacing: -2 }}
                >
                  {card.number}
                </div>

                <div className="relative z-[1] mb-7">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 sm:w-[82px] sm:h-[82px]"
                    style={{
                      background: '#fff7e6',
                      border: '1px solid rgba(60,60,63,0.12)',
                      boxShadow: '0 12px 30px rgba(255,125,0,0.1)',
                    }}
                  >
                    <Icon className="text-[34px] text-[#FF7D00] sm:text-[42px]" />
                  </div>
                  <p className="text-[12px] font-bold tracking-[2.5px] uppercase text-orange mb-3">{card.number}</p>
                  <h3 className="font-bold text-[#1a1208] leading-[1.08]" style={{ fontSize: 'clamp(26px, 2.5vw, 34px)', letterSpacing: '-0.8px' }}>
                    {card.title}
                  </h3>
                </div>

                {/* Body text */}
                <p className="text-[16.5px] leading-[1.8] text-[#4a4037] mb-8 relative z-[1]">{card.text}</p>

                {/* Divider */}
                <div className="mb-6" style={{ height: '1px', background: 'rgba(0,0,0,0.06)' }} />

                {/* Bullet points */}
                <div className="flex flex-col gap-4 mt-auto relative z-[1]">
                  {card.points.map((pt) => (
                    <div key={pt} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-[20px] h-[20px] rounded-full flex items-center justify-center mt-[1px]"
                        style={{ background: 'rgba(255,125,0,0.1)', border: '1px solid rgba(255,125,0,0.2)' }}>
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#FF7D00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 6l3 3 5-5" />
                        </svg>
                      </div>
                      <span className="text-[14.5px] leading-[1.6] text-[#3f352d] font-semibold">{pt}</span>
                    </div>
                  ))}
                </div>

              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-[1320px] mx-auto px-5 mb-14 sm:px-6 sm:mb-20 lg:px-16">
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,125,0,0.2), transparent)' }} />
      </div>

      {/* ── ENGINEERING SECTION ── */}
      <section className="max-w-[1320px] mx-auto px-5 pb-16 sm:px-6 sm:pb-20 lg:px-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: 'rgba(255,125,0,0.4)' }} />
            <span className="text-[11px] font-semibold tracking-[2px] uppercase text-orange">Our Technology</span>
          </div>
          <h2 className="font-bold text-[#111] mb-5 leading-[1.1]" style={{ fontSize: 'clamp(30px,3.5vw,44px)', letterSpacing: '-1.5px' }}>
            Real-world robotics for Indian manufacturers.
          </h2>
          <p className="text-[15.5px] leading-[1.85] text-[#666] mb-9 max-w-[580px]">
            Our team combines deep manufacturing experience with software-first robotics design. We deliver systems that reduce cycle time, simplify programming, and scale with your factory's needs.
          </p>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-4"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                whileHover={{ y: -4, borderColor: 'rgba(255,125,0,0.28)', boxShadow: '0 8px 32px rgba(255,125,0,0.07)' }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-[20px] p-6 flex flex-col gap-4 cursor-default transition-all duration-200"
                style={{ border: '1px solid rgba(0,0,0,0.07)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-orange"
                  style={{ background: 'rgba(255,125,0,0.08)' }}
                >
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] text-[#111] mb-2">{f.title}</h3>
                  <p className="text-[13.5px] leading-[1.7] text-[#777]">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="max-w-[1320px] mx-auto px-5 pb-20 sm:px-6 lg:px-16 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="relative rounded-[24px] overflow-hidden sm:rounded-[32px]"
          style={{
            background: 'linear-gradient(135deg, #fff8f0 0%, #fef3e4 50%, #fff8f0 100%)',
            border: '1px solid rgba(255,125,0,0.18)',
            boxShadow: '0 8px 48px rgba(255,125,0,0.08)',
          }}
        >
          {/* Orange glow top center */}
          <div className="absolute pointer-events-none rounded-full"
            style={{
              top: -180, left: '50%', transform: 'translateX(-50%)',
              width: 600, height: 600,
              background: 'radial-gradient(circle, rgba(255,125,0,0.12) 0%, transparent 65%)',
            }} />

          {/* Dot grid top-right */}
          <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(circle, #FF7D00 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }} />

          {/* Dot grid bottom-left */}
          <div className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(circle, #FF7D00 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }} />

          {/* Orange accent line top */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #FF7D00, transparent)' }} />

          {/* Content */}
          <div className="relative z-[1] px-6 py-10 flex flex-col items-start justify-between gap-8 sm:px-10 sm:py-12 lg:px-16 lg:py-16 lg:flex-row lg:items-center lg:gap-12">

            {/* Left */}
            <div className="max-w-[520px]">
              <h2 className="font-bold text-[#1a1208] leading-[1.04] mb-5"
                style={{ fontSize: 'clamp(28px, 3.8vw, 50px)', letterSpacing: '-1.5px' }}>
                Interested in Our<br />
                <span className="text-[#FF7D00]">Robotics Solutions?</span>
              </h2>
              <p className="text-[15px] leading-[1.85] mb-5"
                style={{ color: 'rgba(26,18,8,0.55)' }}>
                Whether you're scaling a factory floor or starting automation for the first time, we'd love to show you what P. L. Robotics can do.
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
                Book a Demo
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </MotionLink>

              <MotionLink
                to="/contact"
                whileHover={{ y: -2, borderColor: 'rgba(26,18,8,0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 text-[13.5px] font-semibold px-8 py-[14px] rounded-[12px] cursor-pointer transition-all duration-200"
                style={{
                  color: '#1a1208',
                  border: '1.5px solid rgba(26,18,8,0.14)',
                  background: 'rgba(26,18,8,0.03)',
                }}
              >
                Contact Us
              </MotionLink>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  )
}
