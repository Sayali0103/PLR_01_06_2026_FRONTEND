import { motion } from 'framer-motion'

const updates = [
  {
    id: 1,
    title: 'The robots running modern industry',
    date: 'April 2026',
    category: 'Industry Shift',
    source: 'Kearney',
    href: 'https://www.kearney.com/industry/technology/article/the-robots-running-modern-industry',
    detail: 'A sharp look at how robotics is moving from isolated factory cells into the operating backbone of modern industry, reshaping productivity, resilience, and how manufacturers compete.',
    featured: true,
  },
  {
    id: 2,
    title: 'The physical AI craze and automation trends to watch in 2026',
    date: 'January 2026',
    category: 'AI Robotics',
    source: 'Manufacturing Dive',
    href: 'https://www.manufacturingdive.com/news/physical-ai-craze-2026-automation-trends-to-watch/810860/',
    detail: 'Physical AI, cobots, robotic arms, smart sensors, and AI agents are moving deeper into production as companies use automation to fill labor gaps and protect competitiveness.',
  },
  {
    id: 3,
    title: 'India rises to sixth in global factory robot installations',
    date: 'September 2025',
    category: 'India Market',
    source: 'International Federation of Robotics',
    href: 'https://ifr.org/downloads/press_docs/2025-09-25-IFR_press_release_India_in_English.pdf',
    detail: 'IFR reports that India reached a new record of 9,120 industrial robot installations, reflecting strong adoption led by automotive suppliers and rising demand across general industry.',
  },
  {
    id: 4,
    title: 'Sona Comstar partners with NEURA Robotics to build robots in India',
    date: 'October 2025',
    category: 'India Market',
    source: 'Business Standard',
    href: 'https://www.business-standard.com/markets/capital-market-news/sona-blw-gains-after-partnering-with-neura-robotics-to-build-robots-in-india-125101000621_1.html',
    detail: 'The partnership aims to jointly develop advanced robot and humanoid technologies for India and other markets, pointing to a broader shift from auto components into intelligent manufacturing.',
  },
  {
    id: 5,
    title: 'AI and machine learning are redefining manufacturing intelligence',
    date: 'February 2026',
    category: 'Smart Factory',
    source: 'Association for Advancing Automation',
    href: 'https://www.automate.org/ai/industry-insights/how-ai-and-ml-are-redefining-manufacturing-intelligence',
    detail: 'Manufacturers are moving from rigid, rule-based automation toward adaptive systems that use vision, data, and machine learning for quality control, predictive maintenance, and flexible production.',
  },
  {
    id: 6,
    title: 'Delta showcases cobots, digital twins, and smart manufacturing at SEMICON India',
    date: 'September 2025',
    category: 'India Market',
    source: 'Machine Maker',
    href: 'https://themachinemaker.com/news/delta-unveils-advanced-digital-twin-platforms-cobots-and-smart-manufacturing-solutions-at-semicon-india-2025/',
    detail: 'Delta highlighted cobots, DIATwin virtual machine platforms, semiconductor automation, and energy-efficient factory systems as India accelerates electronics and semiconductor manufacturing.',
  },
]

const highlights = [
  'Robotics is becoming core infrastructure for resilient factories.',
  'India is now one of the fastest-rising industrial robot markets.',
  'AI, machine vision, and digital twins are making automation more flexible.',
]

const marketSignals = [
  { value: '9,120', label: 'industrial robots installed in India in 2024, per IFR' },
  { value: '#6', label: 'India rank in global factory robot installations' },
  { value: '45%', label: 'India robot installation share from automotive' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }

export default function News() {
  const featured = updates[0]
  const rest = updates.slice(1)

  return (
    <main className="bg-cream min-h-screen pt-[90px] text-[#111] overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="max-w-[1320px] mx-auto px-16 pt-14 pb-16 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(255,255,255,0.18)' }} />
        <div className="absolute pointer-events-none"
          style={{ top: -80, right: -60, width: 520, height: 520, background: 'radial-gradient(circle, rgba(255,149,1,0.06) 0%, transparent 65%)', borderRadius: '50%' }} />

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-end">
            <div>
              <h1
                className="font-bold text-[#111] leading-[1.02] mb-6"
                style={{ fontSize: 'clamp(44px,5.5vw,76px)', letterSpacing: '-2.5px' }}
              >
                News from the<br />P.L. Robotics<br />
                <span style={{ color: '#FF9501' }}>radar.</span>
              </h1>
              <p className="text-[16px] leading-[1.85] text-[#666] max-w-[500px]">
                Curated reads on automation, robotics, AI-enabled factories, and the Indian market signals shaping the next decade of manufacturing.
              </p>
            </div>

            {/* Top highlights */}
            <div
              className="rounded-[24px] p-8"
              style={{ background: 'linear-gradient(145deg, #fff7eb, #fff3e0)', border: '1px solid rgba(255,149,1,0.18)' }}
            >
              <p className="text-[11px] font-semibold tracking-[2px] uppercase text-orange mb-5">Top Highlights</p>
              <ul className="space-y-4">
                {highlights.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-[7px] w-[6px] h-[6px] rounded-full bg-orange flex-shrink-0" />
                    <span className="text-[14.5px] leading-[1.7] text-[#555]">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── CONTENT ── */}
      <section className="max-w-[1320px] mx-auto px-16 pb-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]"
        >
          {/* Main column */}
          <div className="space-y-5">

            {/* Featured article */}
            <motion.a
              href={featured.href}
              target="_blank"
              rel="noreferrer"
              variants={fadeUp}
              whileHover={{ y: -4, boxShadow: '0 24px 64px rgba(255,149,1,0.11)', borderColor: 'rgba(255,149,1,0.28)' }}
              transition={{ duration: 0.22 }}
              className="block bg-white rounded-[28px] p-10 cursor-pointer relative overflow-hidden"
              style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
            >
              <div
                className="absolute top-0 right-0 px-4 py-2 rounded-bl-[18px] rounded-tr-[28px] text-[10.5px] font-bold tracking-[1.5px] uppercase text-orange"
                style={{ background: 'rgba(255,149,1,0.08)', border: '1px solid rgba(255,149,1,0.14)' }}
              >
                Latest
              </div>

              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span
                  className="text-[11px] font-bold tracking-[1.5px] uppercase px-3 py-[4px] rounded-full text-orange"
                  style={{ background: 'rgba(255,149,1,0.08)', border: '1px solid rgba(255,149,1,0.18)' }}
                >
                  {featured.category}
                </span>
                <span className="text-[13px] text-[#aaa]">{featured.date}</span>
                <span className="text-[12px] uppercase tracking-[1.5px] text-[#bbb]">{featured.source}</span>
              </div>

              <h2
                className="font-bold text-[#111] mb-4 leading-tight"
                style={{ fontSize: 'clamp(22px,2.5vw,30px)', letterSpacing: '-0.8px' }}
              >
                {featured.title}
              </h2>
              <p className="text-[15px] leading-[1.85] text-[#666] mb-7 max-w-[580px]">{featured.detail}</p>

              <motion.span
                whileHover={{ scale: 1.03, boxShadow: '0 6px 24px rgba(255,149,1,0.36)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-orange text-white text-[13px] font-bold px-6 py-[11px] rounded-xl"
                style={{ boxShadow: '0 4px 18px rgba(255,149,1,0.28)' }}
              >
                Read Article
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </motion.span>
            </motion.a>

            {/* Rest of updates */}
            {rest.map(item => (
              <motion.a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                variants={fadeUp}
                whileHover={{ y: -3, boxShadow: '0 16px 50px rgba(255,149,1,0.08)', borderColor: 'rgba(255,149,1,0.2)' }}
                transition={{ duration: 0.22 }}
                className="block bg-white rounded-[24px] p-8 cursor-pointer"
                style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span
                    className="text-[11px] font-bold tracking-[1.5px] uppercase px-3 py-[4px] rounded-full text-orange"
                    style={{ background: 'rgba(255,149,1,0.08)', border: '1px solid rgba(255,149,1,0.18)' }}
                  >
                    {item.category}
                  </span>
                  <span className="text-[13px] text-[#aaa]">{item.date}</span>
                  <span className="text-[11px] uppercase tracking-[1.5px] text-[#bbb]">{item.source}</span>
                </div>
                <h2 className="font-semibold text-[19px] text-[#111] mb-2 leading-tight tracking-tight">{item.title}</h2>
                <p className="text-[14px] leading-[1.75] text-[#777] mb-5">{item.detail}</p>
                <span className="inline-flex items-center gap-2 text-orange text-[13px] font-bold">
                  Open source
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 4l5 4-5 4" />
                  </svg>
                </span>
              </motion.a>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-[24px] p-8"
              style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
            >
              <p className="text-[10.5px] font-semibold tracking-[2px] uppercase text-[#aaa] mb-5">India Market Signals</p>
              <div className="space-y-5">
                {marketSignals.map(signal => (
                  <div key={signal.value} className="pb-5 last:pb-0" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <p className="font-bold text-orange leading-none mb-2" style={{ fontSize: 'clamp(30px, 3vw, 42px)', letterSpacing: '-1px' }}>
                      {signal.value}
                    </p>
                    <p className="text-[13.5px] leading-[1.65] text-[#666]">{signal.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-[24px] p-8"
              style={{ background: 'linear-gradient(145deg, #fff7eb, #fff3e0)', border: '1px solid rgba(255,149,1,0.18)' }}
            >
              <p className="text-[10.5px] font-semibold tracking-[2px] uppercase text-orange mb-4">Why It Matters</p>
              <h3 className="font-bold text-[20px] text-[#111] mb-3 tracking-tight leading-tight">Automation is becoming a competitive baseline.</h3>
              <p className="text-[14px] leading-[1.8] text-[#666]">
                From cobots and vision systems to digital twins, the new wave of robotics helps factories improve consistency, reduce downtime, and scale production without redesigning everything from scratch.
              </p>
            </motion.div>
          </aside>
        </motion.div>
      </section>
    </main>
  )
}
