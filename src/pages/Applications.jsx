import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionLink = motion.create(Link)

export const applications = [
  {
    slug: 'cnc-machine-automation',
    title: 'CNC Machine Automation',
    short: 'Automate the loading and unloading of CNC machines to improve productivity and keep production running smoothly.',
    image: '/photos/photo24.jpeg',
    benefits: ['Faster machine operation', 'Reduced manual work', 'Improved production efficiency'],
  },
  {
    slug: 'assembly-automation',
    title: 'Assembly Automation',
    short: 'Automate assembly tasks with accurate and consistent part placement for a wide range of products.',
    image: '/photos/app2.jpeg',
    benefits: ['Consistent assembly quality', 'Reliable production process', 'Flexible for different products'],
  },
  {
    slug: 'quality-inspection',
    title: 'Quality Inspection',
    short: 'Use vision-based inspection to identify defects and maintain product quality throughout production.',
    image: '/photos/app3.avif',
    benefits: ['Improved product quality', 'Early defect detection', 'Reliable inspection results'],
  },
  {
    slug: 'welding-automation',
    title: 'Welding Automation',
    short: 'Automate welding operations to achieve consistent weld quality and safer working conditions.',
    image: '/photos/app4.avif',
    benefits: ['Uniform weld quality', 'Safer work environment', 'Simplified operation'],
  },
  {
    slug: 'custom-automation',
    title: 'Custom Automation',
    short: 'Tailored automation solutions designed to match your specific production requirements and workflows.',
    image: '/photos/app5.jpg',
    benefits: ['Customized solutions', 'Expert engineering support', 'Seamless system integration'],
  },
  {
    slug: 'press-machine-tending',
    title: 'Press Machine Tending',
    short: 'Automate the loading and unloading of press machines for efficient and reliable production.',
    image: '/photos/app6.webp',
    benefits: ['Improved productivity', 'Safe material handling', 'Consistent operation'],
  },
  {
    slug: 'packaging-automation',
    title: 'Packaging Automation',
    short: 'Automate picking, sorting, and packaging tasks to keep production lines running efficiently.',
    image: '/photos/app7.jpg',
    benefits: ['Faster packaging process', 'Reliable product handling', 'Reduced downtime'],
  },
  {
    slug: 'scara-pick-place',
    title: 'Pick & Place',
    short: 'Quick and accurate movement of products between conveyors, trays, and workstations.',
    image: '/photos/app8.webp',
    benefits: ['Accurate product placement', 'Smooth material transfer', 'Flexible operation'],
  },
  {
    slug: 'palletizing',
    title: 'Palletizing',
    short: 'Automate stacking and organizing of boxes, bags, and cartons for easier handling and storage.',
    image: '/photos/app9.jpg',
    benefits: ['Efficient pallet stacking', 'Reduced manual lifting', 'Consistent load arrangement'],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }

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
