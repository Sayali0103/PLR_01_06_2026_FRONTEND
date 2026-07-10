import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { applications } from './Applications'

const MotionLink = motion.create(Link)

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }

const robotColors = {
  COBOT: { bg: 'rgba(255,125,0,0.08)', border: 'rgba(255,125,0,0.25)', text: '#FF7D00' },
  SCARA: { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.25)', text: '#3b82f6' },
  DELTA: { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', text: '#10b981' },
}

// Extended detail content per application
const details = {
  'cnc-machine-automation': {
    tagline: 'Keep your CNC running. Always.',
    overview: `CNC machine tending is one of the most common and impactful applications for collaborative robots. Operators are freed from repetitive load/unload cycles, allowing them to focus on programming, quality control, and process improvement.

The PLR CO5 cobot integrates directly with CNC lathes, mills, and machining centres via standard I/O or fieldbus communication. Its 750mm reach and ±0.03mm repeatability ensure consistent part placement every cycle — even for high-precision aerospace and automotive components.`,
    steps: [
      { num: '01', title: 'Part Pickup',       desc: 'Cobot picks raw stock from an infeed tray or conveyor using a precision gripper.' },
      { num: '02', title: 'Machine Loading',    desc: 'Part is loaded into the chuck or fixture with exact positioning — door opening triggered automatically.' },
      { num: '03', title: 'Cycle Monitoring',   desc: 'Cobot waits in safe position while machine completes its cycle, monitoring for completion signal.' },
      { num: '04', title: 'Part Unloading',     desc: 'Finished part is removed and placed on outfeed tray or passed to next process.' },
      { num: '05', title: 'Quality Check',      desc: 'Optional vision inspection step verifies part dimensions before outfeed.' },
    ],
    specs: [
      { label: 'Cycle Time',    value: '< 8 sec'   },
      { label: 'Part Weight',   value: 'Up to 5kg' },
      { label: 'Repeatability', value: '±0.03mm'   },
      { label: 'Setup Time',    value: '< 4 hours' },
      { label: 'Compatible',    value: 'CNC Lathe / Mill / VMC' },
      { label: 'Comm',          value: 'I/O / Modbus / EtherNet' },
    ],
  },
  'assembly-automation': {
    tagline: 'Consistent assembly, every single time.',
    overview: `Manual assembly is error-prone and physically demanding. The PLR CO5 brings consistent force, position, and speed to every assembly step — whether it's screwdriving, press-fitting, or component placement.

Flexible tooling options including electric grippers, screwdrivers, and force-torque sensors allow a single cobot to handle multiple assembly steps in sequence.`,
    steps: [
      { num: '01', title: 'Component Pickup',  desc: 'Cobot picks components from feeder, tray, or conveyor using vision-guided gripper.' },
      { num: '02', title: 'Positioning',        desc: 'Part placed in fixture at exact orientation and position for assembly operation.' },
      { num: '03', title: 'Assembly Operation', desc: 'Screwdriving, press-fitting, snap-fit, or adhesive dispensing performed with controlled force.' },
      { num: '04', title: 'Verification',       desc: 'Force feedback and vision confirm successful assembly before moving to next step.' },
    ],
    specs: [
      { label: 'Force Control', value: '±0.5N'       },
      { label: 'Payload',       value: 'Up to 5kg'   },
      { label: 'Repeatability', value: '±0.03mm'     },
      { label: 'Tool Change',   value: 'Auto / Manual' },
    ],
  },
  'quality-inspection': {
    tagline: 'Zero defect escape. Every shift.',
    overview: `Integrating PLR's Vision System with the CO5 cobot creates a powerful automated inspection cell. The cobot presents parts to the camera at precise angles and distances — eliminating the lighting and position variation that plagues manual inspection.

Defect data is logged in real time, feeding directly into your quality management system.`,
    steps: [
      { num: '01', title: 'Part Presentation', desc: 'Cobot picks part and presents it to the vision camera at calibrated position and angle.' },
      { num: '02', title: 'Image Capture',      desc: 'High-resolution camera captures multiple views; AI model analyses for defects in < 200ms.' },
      { num: '03', title: 'Pass / Fail Sort',   desc: 'Good parts move to outfeed; rejects are placed in a separate bin with defect logged.' },
      { num: '04', title: 'Data Logging',       desc: 'All inspection results timestamped and pushed to QMS dashboard in real time.' },
    ],
    specs: [
      { label: 'Inspection Speed', value: '< 200ms / part' },
      { label: 'Detection Rate',   value: '> 99.5%'        },
      { label: 'Camera',           value: 'PLR Vision 4MP' },
      { label: 'Integration',      value: 'REST API / OPC-UA' },
    ],
  },
  'welding-automation': {
    tagline: 'Consistent welds. Safer floors.',
    overview: `Cobot welding reduces operator exposure to fumes, heat, and UV while delivering weld paths that are repeated identically every cycle. The CO5 supports MIG, TIG, and spot welding with leading power source brands.

Torch paths are taught by hand-guiding the cobot — no specialist robot programming knowledge required.`,
    steps: [
      { num: '01', title: 'Fixture Loading',  desc: 'Operator loads parts into welding fixture; cobot initiates cycle automatically.' },
      { num: '02', title: 'Seam Tracking',    desc: 'Laser seam tracker guides torch along joint in real time, compensating for fixture variation.' },
      { num: '03', title: 'Welding',          desc: 'Consistent travel speed, arc length, and wire feed maintained throughout the weld path.' },
      { num: '04', title: 'Post-Weld Check',  desc: 'Optional vision inspection verifies weld bead geometry before part release.' },
    ],
    specs: [
      { label: 'Process',      value: 'MIG / TIG / Spot'  },
      { label: 'Travel Speed', value: '200–800mm/min'      },
      { label: 'Reach',        value: '750mm'              },
      { label: 'Compatible',   value: 'Fronius / Lincoln / OTC' },
    ],
  },
  'custom-automation': {
    tagline: 'Your process. Our engineering.',
    overview: `No two factories are the same. Our applications engineering team works directly with you to design, simulate, and commission a cobot solution built around your specific requirements — from single-robot cells to multi-robot production lines.`,
    steps: [
      { num: '01', title: 'Process Assessment', desc: 'Our engineers visit your site and map your current process, identifying automation opportunities.' },
      { num: '02', title: 'Concept Design',     desc: 'We develop a cell layout and cycle time simulation before any hardware is ordered.' },
      { num: '03', title: 'Build & Test',        desc: 'Cell is built and tested in our Pune facility against agreed acceptance criteria.' },
      { num: '04', title: 'Installation',        desc: 'On-site installation, commissioning, and operator training included.' },
    ],
    specs: [
      { label: 'Lead Time',  value: '6–10 weeks'  },
      { label: 'Support',    value: '24/7 on-call' },
      { label: 'Warranty',   value: '2 years'      },
      { label: 'Training',   value: 'Included'     },
    ],
  },
  'press-machine-tending': {
    tagline: 'Keep your press running flat out.',
    overview: `SCARA robots excel at press machine tending thanks to their rigid vertical axis and sub-second cycle times. In coiltech environments, the PLR SCARA handles raw coil stampings at temperatures and speeds that would be unsafe for manual operators.`,
    steps: [
      { num: '01', title: 'Blank Pickup',   desc: 'SCARA picks stamping blank from stack or conveyor at high speed.' },
      { num: '02', title: 'Press Loading',  desc: 'Blank placed in die with ±0.05mm positional accuracy before press stroke.' },
      { num: '03', title: 'Part Removal',   desc: 'Formed part extracted immediately after stroke and placed on outfeed.' },
      { num: '04', title: 'Repeat',         desc: 'Cycle repeats at up to 40 strokes per minute with no fatigue or variation.' },
    ],
    specs: [
      { label: 'Cycle Time',    value: '< 1.5 sec'   },
      { label: 'Repeatability', value: '±0.02mm'     },
      { label: 'Payload',       value: '3 kg'        },
      { label: 'Environment',   value: 'IP54 rated'  },
    ],
  },
  'packaging-automation': {
    tagline: 'Maximum throughput. Zero misses.',
    overview: `High-speed packaging lines demand robot arms that can keep pace without sacrificing placement accuracy. The PLR SCARA delivers up to 120 picks per minute — suitable for blister packs, cartons, sachets, and pouches across FMCG and pharma lines.`,
    steps: [
      { num: '01', title: 'Product Infeed',   desc: 'Products arrive on conveyor; vision system locates each item in real time.' },
      { num: '02', title: 'Pick',             desc: 'SCARA picks each product at full conveyor speed using vacuum or mechanical gripper.' },
      { num: '03', title: 'Place',            desc: 'Product placed in tray, carton, or blister cavity with exact orientation.' },
      { num: '04', title: 'Case Packing',     desc: 'Filled trays or blisters transferred to secondary packaging station.' },
    ],
    specs: [
      { label: 'Speed',         value: '120 picks/min' },
      { label: 'Repeatability', value: '±0.03mm'       },
      { label: 'Vision',        value: 'Integrated'    },
      { label: 'Changeover',    value: '< 15 min'      },
    ],
  },
  'scara-pick-place': {
    tagline: 'Sub-millimetre. Every time.',
    overview: `Electronics assembly and small-part handling demand precision and speed in equal measure. The PLR SCARA's rigid Z-axis and 4-axis kinematics deliver placement repeatability of ±0.02mm — handling PCBs, connectors, and miniature components at production rates.`,
    steps: [
      { num: '01', title: 'Feeder Pickup',   desc: 'Components fed from bowl feeder, tape, or tray; vision guides pick position.' },
      { num: '02', title: 'Transfer',        desc: 'Component transported to placement station at speed.' },
      { num: '03', title: 'Placement',       desc: 'Part placed with controlled force to avoid damage to sensitive components.' },
      { num: '04', title: 'Next Cycle',      desc: 'Robot returns immediately for next pick — no waiting, no variation.' },
    ],
    specs: [
      { label: 'Repeatability', value: '±0.02mm'  },
      { label: 'Cycle Time',    value: '0.4 sec'  },
      { label: 'Payload',       value: '2 kg'     },
      { label: 'Reach',         value: '550mm'    },
    ],
  },
  'palletizing': {
    tagline: 'Stack it. Ship it. Repeat.',
    overview: `End-of-line palletizing is physically demanding, injury-prone, and difficult to staff. The PLR DELTA replaces manual palletizing with programmable stacking patterns that can be changed in minutes — supporting multiple SKUs on the same line without hardware changes.`,
    steps: [
      { num: '01', title: 'Case Infeed',     desc: 'Boxes or bags arrive from production line on conveyor.' },
      { num: '02', title: 'Layer Formation', desc: 'Delta robot arranges cases into the programmed layer pattern at high speed.' },
      { num: '03', title: 'Pallet Building', desc: 'Layer placed on pallet; robot advances to next layer automatically.' },
      { num: '04', title: 'Pallet Out',      desc: 'Full pallet conveyed to stretch wrapper; empty pallet automatically loaded.' },
    ],
    specs: [
      { label: 'Speed',    value: '200 cycles/min' },
      { label: 'Payload',  value: '5 kg'           },
      { label: 'Patterns', value: 'Unlimited'      },
      { label: 'Reach',    value: '1300mm dia'     },
    ],
  },
  'delta-pick-place': {
    tagline: 'The fastest picks in the industry.',
    overview: `When milliseconds matter, parallel robot kinematics win. The PLR DELTA's lightweight carbon-fibre arms and centralised actuators deliver the highest pick speeds in our range — trusted by food, pharma, and FMCG manufacturers for random-bin picking and conveyor tracking.`,
    steps: [
      { num: '01', title: 'Random Infeed',   desc: 'Products arrive randomly on conveyor; vision locates each item in < 5ms.' },
      { num: '02', title: 'Pick',            desc: 'Delta robot intercepts each product at conveyor speed with vacuum gripper.' },
      { num: '03', title: 'Place',           desc: 'Product placed in target tray, carton, or fixture with precision.' },
      { num: '04', title: 'Continuous',      desc: 'No stops, no pauses — continuous flow at up to 200 cycles per minute.' },
    ],
    specs: [
      { label: 'Speed',    value: '200 picks/min' },
      { label: 'Payload',  value: '2 kg'          },
      { label: 'Reach',    value: '1300mm dia'    },
      { label: 'IP Rating', value: 'IP69K'        },
    ],
  },
}

export default function ApplicationDetail() {
  const { slug } = useParams()
  const app = applications.find(a => a.slug === slug)
  const detail = details[slug]

  if (!app || !detail) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center pt-20 gap-4">
        <h2 className="font-bold text-[28px] text-[#1a1208]">Application not found</h2>
        <Link to="/applications" className="text-[#FF7D00] font-semibold underline">← Back to Applications</Link>
      </div>
    )
  }

  const rc = robotColors[app.robot]

  // Related apps (same robot, different slug)
  const related = applications.filter(a => a.robot === app.robot && a.slug !== slug).slice(0, 3)

  return (
    <main className="bg-[#faf7f2] min-h-screen">

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-0 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(245,240,232,0.9) 0%, transparent 100%)', zIndex: 1 }} />

        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img src={app.image} alt={app.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.35) saturate(0.8)' }} />
        </div>

        <div className="relative z-[2] max-w-[1320px] mx-auto px-6 pb-20">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-10 text-[13px] text-white/60"
          >
            <Link to="/applications" className="hover:text-[#FF7D00] transition-colors">Applications</Link>
            <span>/</span>
            <span className="text-white/80">{app.title}</span>
          </motion.div>

          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="show"
            className="max-w-[700px]"
          >
            {/* Robot badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full px-4 py-[5px] pl-[9px] mb-6"
              style={{ background: rc.bg, border: `1px solid ${rc.border}` }}
            >
              <div className="w-[6px] h-[6px] rounded-full" style={{ background: rc.text }} />
              <span className="text-[11px] font-bold tracking-[2px] uppercase" style={{ color: rc.text }}>
                {app.robot}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-bold text-white mb-4 leading-[1.02]"
              style={{ fontSize: 'clamp(38px,5.5vw,72px)', letterSpacing: '-2px' }}
            >
              {app.title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-[18px] font-medium mb-8"
              style={{ color: '#FF7D00' }}
            >
              "{detail.tagline}"
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-[15.5px] leading-[1.85] mb-10 max-w-[560px]"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              {app.short}
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
              <MotionLink
                to="/book-demo"
                whileHover={{ y: -2, boxShadow: '0 10px 36px rgba(255,125,0,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-[#FF7D00] text-white text-[13px] font-bold px-7 py-[13px] rounded-[10px] cursor-pointer"
                style={{ boxShadow: '0 4px 20px rgba(255,125,0,0.4)' }}
              >
                Book Demo
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </MotionLink>
              <MotionLink
                to="/contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-[13px] font-semibold px-7 py-[13px] rounded-[10px] cursor-pointer"
                style={{ color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.07)' }}
              >
                Talk to Us
              </MotionLink>
              <MotionLink
                to="/contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-[13px] font-semibold px-7 py-[13px] rounded-[10px] cursor-pointer"
                style={{ color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.07)' }}
              >
                Get Automation Consultation
              </MotionLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="py-24 px-6">
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-20 items-start">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-[#FF7D00] rounded-full" />
              <span className="text-[11px] font-semibold tracking-[2.5px] uppercase text-[#FF7D00]">Overview</span>
            </div>
            <h2 className="font-bold text-[#1a1208] mb-6 leading-tight"
              style={{ fontSize: 'clamp(26px,3vw,38px)', letterSpacing: '-1px' }}>
              How It Works
            </h2>
            {detail.overview.split('\n\n').map((para, i) => (
              <p key={i} className="text-[15px] leading-[1.85] text-[#555] mb-4">{para}</p>
            ))}

            {/* Benefits */}
            <div className="mt-8 p-6 rounded-2xl" style={{ background: 'rgba(255,125,0,0.05)', border: '1px solid rgba(255,125,0,0.15)' }}>
              <h4 className="font-semibold text-[14px] text-[#1a1208] mb-4 tracking-tight">Key Benefits</h4>
              <div className="flex flex-col gap-3">
                {app.benefits.map(b => (
                  <div key={b} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FF7D00] flex items-center justify-center flex-shrink-0 mt-[1px]">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 6l3 3 5-5"/>
                      </svg>
                    </div>
                    <span className="text-[14px] text-[#444] leading-[1.5]">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — image + specs */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-2xl overflow-hidden mb-6" style={{ height: 300 }}>
              <img src={app.image} alt={app.title} className="w-full h-full object-cover" />
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-px bg-[#e8e2d8] rounded-2xl overflow-hidden">
              {detail.specs.map(s => (
                <div key={s.label} className="bg-white p-5">
                  <div className="text-[10px] font-medium tracking-[1.5px] uppercase text-[#aaa] mb-1">{s.label}</div>
                  <div className="font-bold text-[17px] text-[#1a1208] tracking-tight">{s.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── PROCESS STEPS ── */}
      <section className="py-20 px-6 bg-[#111] relative overflow-hidden">
        <div className="absolute pointer-events-none rounded-full"
          style={{ top: -200, right: -200, width: 600, height: 600, background: 'radial-gradient(circle, rgba(255,125,0,0.07) 0%, transparent 65%)' }} />

        <div className="max-w-[1320px] mx-auto relative z-[1]">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-[2px] bg-[#FF7D00] rounded-full" />
            <span className="text-[11px] font-semibold tracking-[2.5px] uppercase text-[#FF7D00]">Process Flow</span>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          >
            {detail.steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                className="relative p-6 rounded-2xl cursor-default"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                whileHover={{ y: -4, borderColor: 'rgba(255,125,0,0.3)', background: 'rgba(255,125,0,0.05)' }}
                transition={{ duration: 0.22 }}
              >
                <div className="text-[11px] font-bold tracking-[2px] text-[#FF7D00]/60 mb-3">{step.num}</div>
                <h4 className="font-semibold text-[15px] text-white mb-2">{step.title}</h4>
                <p className="text-[13px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.45)' }}>{step.desc}</p>
                {i < detail.steps.length - 1 && (
                  <div className="hidden xl:block absolute top-1/2 -right-2 w-4 h-[1.5px] bg-[#FF7D00]/30" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── RELATED APPLICATIONS ── */}
      {related.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-[1320px] mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-[2px] bg-[#FF7D00] rounded-full" />
                  <span className="text-[11px] font-semibold tracking-[2.5px] uppercase text-[#FF7D00]">More {app.robot} Applications</span>
                </div>
                <h3 className="font-bold text-[26px] text-[#1a1208] tracking-tight">Related Applications</h3>
              </div>
              <Link to="/applications"
                className="text-[13px] font-semibold text-[#FF7D00] flex items-center gap-1 hover:gap-2 transition-all duration-200">
                View all
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {related.map(rel => (
                <motion.div
                  key={rel.slug}
                  whileHover={{ y: -5, boxShadow: '0 20px 60px rgba(0,0,0,0.1)', borderColor: 'rgba(255,125,0,0.25)' }}
                  transition={{ duration: 0.25 }}
                  className="group bg-white rounded-[18px] overflow-hidden"
                  style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}
                >
                  <div className="relative overflow-hidden" style={{ height: 180 }}>
                    <img src={rel.image} alt={rel.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-[16px] text-[#1a1208] mb-2 tracking-tight group-hover:text-[#FF7D00] transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-[13px] text-[#777] leading-[1.6] mb-4 line-clamp-2">{rel.short}</p>
                    <Link to={`/applications/${rel.slug}`}
                      className="text-[12.5px] font-semibold text-[#FF7D00] flex items-center gap-1">
                      Explore →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 px-6 pb-28">
        <div className="max-w-[1320px] mx-auto">
          <div className="rounded-[24px] px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #111 0%, #1e1408 100%)' }}>
            <div className="absolute rounded-full pointer-events-none"
              style={{ top: -150, right: -100, width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,125,0,0.1) 0%, transparent 65%)' }} />
            <div className="relative z-[1]">
              <h3 className="font-bold text-white mb-2 text-[22px] tracking-tight">
                Ready to automate {app.title.toLowerCase()}?
              </h3>
              <p className="text-[14px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Talk to our engineers. We'll design the right solution for your floor.
              </p>
            </div>
            <div className="relative z-[1] flex gap-3 flex-wrap">
              <MotionLink
                to="/book-demo"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-[#FF7D00] text-white text-[13px] font-bold px-7 py-[13px] rounded-[10px] cursor-pointer"
                style={{ boxShadow: '0 4px 20px rgba(255,125,0,0.4)' }}
              >
                Book Demo →
              </MotionLink>
              <MotionLink
                to="/contact"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-[13px] font-semibold px-7 py-[13px] rounded-[10px] cursor-pointer"
                style={{ color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)' }}
              >
                Get Consultation
              </MotionLink>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
