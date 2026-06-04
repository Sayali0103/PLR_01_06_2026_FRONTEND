import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { num: '3–30',    unit: 'kg',  label: 'Payload Range',     desc: 'From lightweight assembly to heavy industrial tasks' },
  { num: '500–1800', unit: 'mm', label: 'Reach Range',       desc: 'Flexible reach across compact and large work cells'  },
  { num: '6',       unit: ' DOF', label: 'Degrees of Freedom', desc: 'Full articulation for any task'                   },
  { num: '±0.03',   unit: 'mm',  label: 'Repeatability',     desc: 'Micron-level precision on every cycle'              },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-[#faf7f2] py-16 px-5 sm:py-20 sm:px-6 lg:py-24">
      <div className="max-w-[1320px] mx-auto">

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="w-8 h-[2px] bg-orange rounded-full" />
          <span className="text-[11px] font-semibold tracking-[2.5px] uppercase text-orange">
            About Cobot family
          </span>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e8e2d8]"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              whileHover={{ backgroundColor: '#fff8f0' }}
              transition={{ duration: 0.2 }}
              className="bg-[#faf7f2] p-6 sm:p-8 lg:p-10 flex flex-col gap-3 cursor-default"
            >
              <div
                className="font-bold text-[#111] leading-none tracking-tight"
                style={{ fontSize: 'clamp(30px, 3.5vw, 48px)', letterSpacing: '-2px' }}
              >
                {s.num}
                <span className="text-orange">{s.unit}</span>
              </div>
              <div className="font-semibold text-[15px] text-[#111]">{s.label}</div>
              <div className="text-[13px] text-[#888] leading-[1.6]">{s.desc}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
