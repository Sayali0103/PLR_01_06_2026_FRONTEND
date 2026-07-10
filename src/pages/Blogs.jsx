import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const posts = [
  {
    id: 1,
    title: 'Are Indian Cobots Making Industrial Automation Truly Local?',
    date: 'September 2025',
    readTime: '7 min read',
    summary: 'Indian cobots are bridging local automation and factory-floor value, with homegrown startups and integrators making robotics more accessible for Indian industry.',
    tag: 'Automation',
    source: 'ElectronicsForU',
    type: 'Article',
    image: 'https://www.electronicsforu.com/wp-contents/uploads/2025/09/Prajwal-Lale.jpg',
    href: 'https://www.electronicsforu.com/news/are-indian-cobots-making-industrial-automation-truly-local',
    featured: true,
  },
  {
    id: 2,
    title: 'How Cobots Are Revolutionizing Flexible Manufacturing',
    date: 'November 2025',
    readTime: '6 min read',
    summary: 'Collaborative robots are reshaping production lines by enabling rapid task-switching, safer human-robot teamwork, and faster ROI — typically within 12–18 months of deployment.',
    tag: 'Automation',
    source: 'Automate.org',
    type: 'Article',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=1000',
    href: 'https://www.automate.org/robotics/blogs/cobots-revolutionizing-flexible-manufacturing',
    featured: false,
  },
  {
    id: 3,
    title: 'Top Robotics Trends for 2026: Nearshoring, AI & Precision Machining',
    date: 'January 2026',
    readTime: '8 min read',
    summary: 'From high-precision robotic machining to connected ecosystems of automation components, 2026 is seeing robots move far beyond simple repetitive tasks into adaptive, AI-driven roles.',
    tag: 'Robotics',
    source: 'RoboDK',
    type: 'Article',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000',
    href: 'https://robodk.com/blog/top-robotics-trends-2026/',
    featured: false,
  },
  {
    id: 4,
    title: 'Physical AI Is Here: Jensen Huang\'s Inflection Point for Manufacturing',
    date: 'January 2026',
    readTime: '7 min read',
    summary: 'Nvidia\'s CEO declared a "ChatGPT moment for physical AI" at CES 2026. Breakthroughs in robot reasoning and real-world planning are finally moving automation from labs to factory floors.',
    tag: 'Industry',
    source: 'Manufacturing Dive',
    type: 'Article',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=1000',
    href: 'https://www.manufacturingdive.com/news/physical-ai-craze-2026-automation-trends-to-watch/810860/',
    featured: false,
  },
  {
    id: 5,
    title: 'Predictions for 2026: What\'s Next for Robotics?',
    date: 'January 2026',
    readTime: '9 min read',
    summary: 'From Robots-as-a-Service models to lights-out factory operations, industry veterans share how pragmatic economics and supply chain resilience will define robotics adoption in 2026.',
    tag: 'Industry',
    source: 'RoboticsTomorrow',
    type: 'Article',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
    href: 'https://www.roboticstomorrow.com/article/2026/01/predictions-for-2026-whats-next-for-robotics/25968',
    featured: false,
  },
  {
    id: 6,
    title: 'Digital Twins & AI Cobots: Simulate Before You Procure',
    date: 'December 2025',
    readTime: '5 min read',
    summary: '2026 marks the shift to "Simulate-then-Procure" — manufacturers are building entire work cells in digital twin environments to verify ROI before a single dollar is spent on hardware.',
    tag: 'Engineering',
    source: 'DBR77',
    type: 'Article',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000',
    href: 'https://dbr77.com/industrial-robotics-trends-2026/',
    featured: false,
  },
  {
    id: 7,
    title: 'I Replaced My Robot’s CNN With a Vision Transformer in ROS2. Here’s Exactly What Happened.',
    date: 'April 2026',
    readTime: 'Medium article',
    summary: 'A hands-on look at replacing a robot’s CNN with a Vision Transformer in ROS2, and what that change meant in practice.',
    tag: 'Robotics',
    source: 'Medium',
    type: 'Blog',
    author: 'Aarohi',
    authorRole: 'Full Stack Robotics Engineer at PL Robotics',
    image: 'https://miro.medium.com/v2/resize:fit:1200/1*ljWYl1YnMcLdjliFSElxJw.png',
    href: 'https://medium.com/@MLwithAarohi/i-replaced-my-robots-cnn-with-a-vision-transformer-in-ros2-here-s-exactly-what-happened-82010c4a993a',
    featured: false,
  },
  {
    id: 8,
    title: 'ROS Is Underdeveloped — and It’s Holding Robotics Back',
    date: 'April 2026',
    readTime: 'Medium article',
    summary: 'Aarohi’s perspective on the gaps in ROS and why strengthening the robotics software ecosystem matters for the field’s next chapter.',
    tag: 'Robotics',
    source: 'Medium',
    type: 'Blog',
    author: 'Aarohi',
    authorRole: 'Full Stack Robotics Engineer at PL Robotics',
    image: 'https://miro.medium.com/v2/resize:fit:1200/1*0UJ2k4ZPJobTniFR_-pRzg.png',
    href: 'https://medium.com/@MLwithAarohi/ros-is-underdeveloped-and-its-holding-robotics-back-088da0dc0e21',
    featured: false,
  },
  {
    id: 9,
    title: 'Top 10 Open-Source Robotics Tools You Should Learn in 2025 (With Examples)',
    date: 'December 2025',
    readTime: 'Medium article',
    summary: 'A practical introduction to ten open-source tools that help robotics engineers build, simulate, and deploy better systems.',
    tag: 'Engineering',
    source: 'Medium',
    type: 'Blog',
    author: 'Aarohi',
    authorRole: 'Full Stack Robotics Engineer at PL Robotics',
    image: 'https://miro.medium.com/v2/resize:fit:1200/1*uB-mBtBk6wmXmhtmlhGgbQ.png',
    href: 'https://medium.com/@MLwithAarohi/top-10-open-source-robotics-tools-you-should-learn-in-2025-with-examples-b1cd36ee33b8',
    featured: false,
  },
]

const highlights = [
  'How P. L. Robotics makes cobots user-friendly for production teams.',
  'Real-world automation wins for electronics and automotive.',
  'Best practices for integrating robots into existing workflows.',
]

const allTags = ['All', 'Automation', 'Robotics', 'Industry', 'Engineering']

const tagColors = {
  Automation: { bg: 'rgba(255,125,0,0.08)', text: '#FF7D00', border: 'rgba(255,125,0,0.2)' },
  Robotics:   { bg: 'rgba(30,100,220,0.07)', text: '#1e64dc', border: 'rgba(30,100,220,0.18)' },
  Industry:   { bg: 'rgba(20,160,80,0.07)', text: '#14a050', border: 'rgba(20,160,80,0.18)' },
  Engineering: { bg: 'rgba(130,60,200,0.07)', text: '#823cc8', border: 'rgba(130,60,200,0.18)' },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

function TagBadge({ tag }) {
  const c = tagColors[tag] || { bg: 'rgba(0,0,0,0.05)', text: '#555', border: 'rgba(0,0,0,0.1)' }
  return (
    <span
      className="text-[11px] font-semibold tracking-[1.5px] uppercase px-3 py-[4px] rounded-full"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      {tag}
    </span>
  )
}

function PostImage({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.onerror = null
        e.target.src = `https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000`
      }}
    />
  )
}

export default function Blogs() {
  const [activeTag, setActiveTag] = useState('All')
  const filtered = activeTag === 'All' ? posts : posts.filter(p => p.tag === activeTag)
  const featured = filtered.find(p => p.featured) || filtered[0]
  const rest = filtered
    .filter(p => p.id !== featured?.id)
    .sort((a, b) => (b.author ? 1 : 0) - (a.author ? 1 : 0))

  // Sidebar: latest 3 non-featured posts regardless of tag filter
  const sidebarPosts = posts.filter(p => !p.featured).slice(-3).reverse()

  return (
    <main className="bg-cream min-h-screen pt-[90px] text-[#111] overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="max-w-[1320px] mx-auto px-5 pt-10 pb-12 relative sm:px-6 sm:pt-14 sm:pb-16 lg:px-16">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(255,255,255,0.18)' }} />
        <div className="absolute pointer-events-none" style={{ top: -100, left: -80, width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,125,0,0.06) 0%, transparent 65%)', borderRadius: '50%' }} />

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid gap-10 items-end lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <h1
                className="font-bold text-[#111] leading-[1.02] mb-6"
                style={{ fontSize: 'clamp(44px,5.5vw,76px)', letterSpacing: '-2.5px' }}
              >
                Stories from<br />
                the robotics<br />
                <span style={{ color: '#FF7D00' }}>floor.</span>
              </h1>
              <p className="text-[16px] leading-[1.85] text-[#666] max-w-[500px]">
                Automation experiences, product design insights, and manufacturing success stories crafted for Indian industry teams.
              </p>
            </div>

            {/* Highlights */}
            <div
              className="rounded-[24px] p-5 sm:p-8"
              style={{ background: 'linear-gradient(145deg, #fff7eb, #fff3e0)', border: '1px solid rgba(255,125,0,0.18)' }}
            >
              <p className="text-[11px] font-semibold tracking-[2px] uppercase text-orange mb-5">Featured Takeaways</p>
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

      {/* ── TAG FILTERS ── */}
      <div className="max-w-[1320px] mx-auto px-5 pb-8 sm:px-6 lg:px-16">
        <div className="flex items-center gap-2 flex-wrap">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-[8px] rounded-full text-[13px] font-medium cursor-pointer transition-all duration-200 sm:px-5 ${
                activeTag === tag
                  ? 'bg-orange text-white'
                  : 'bg-white text-[#555] hover:text-orange'
              }`}
              style={{
                border: activeTag === tag ? '1px solid #FF7D00' : '1px solid rgba(0,0,0,0.09)',
                boxShadow: activeTag === tag ? '0 2px 12px rgba(255,125,0,0.28)' : '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── POSTS ── */}
      <section className="max-w-[1320px] mx-auto px-5 pb-20 sm:px-6 lg:px-16">
        <AnimatePresence mode="wait">
          <motion.div key={activeTag} initial="hidden" animate="show" variants={stagger}>
            <div className="grid gap-8 lg:grid-cols-[1.45fr_0.55fr]">

              {/* Main column */}
              <div className="space-y-5">

                {/* Featured post */}
                {featured && (
                  <motion.article
                    variants={fadeUp}
                    whileHover={{ y: -4, boxShadow: '0 24px 64px rgba(255,125,0,0.11)', borderColor: 'rgba(255,125,0,0.28)' }}
                    transition={{ duration: 0.22 }}
                    className="bg-white rounded-[24px] p-5 cursor-pointer relative overflow-hidden sm:rounded-[28px] sm:p-8 lg:p-10"
                    style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
                  >
                    <div
                      className="absolute top-0 right-0 px-4 py-2 rounded-bl-[18px] rounded-tr-[28px] text-[10.5px] font-bold tracking-[1.5px] uppercase text-orange"
                      style={{ background: 'rgba(255,125,0,0.08)', border: '1px solid rgba(255,125,0,0.14)' }}
                    >
                      Featured
                    </div>

                    {featured.image && (
                      <div className="mb-6 overflow-hidden rounded-[22px] w-full" style={{ aspectRatio: '16/9', background: '#f5f5f5' }}>
                        <PostImage
                          src={featured.image}
                          alt={featured.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-5 flex-wrap">
                      <TagBadge tag={featured.tag} />
                      <span className="text-[13px] text-[#aaa]">{featured.date}</span>
                      <span className="text-[13px] text-[#ccc]">·</span>
                      <span className="text-[13px] text-[#aaa]">{featured.readTime}</span>
                      {featured.source && (
                        <span className="text-[12px] uppercase tracking-[1.5px] text-[#bbb]">{featured.source}</span>
                      )}
                    </div>

                    <h2 className="font-bold text-[#111] mb-4 leading-tight" style={{ fontSize: 'clamp(22px,2.5vw,30px)', letterSpacing: '-0.8px' }}>
                      {featured.title}
                    </h2>
                    <p className="text-[15px] leading-[1.85] text-[#666] mb-7 max-w-[560px]">{featured.summary}</p>
                    {featured.author && (
                      <p className="inline-flex items-center rounded-lg bg-[#fff3e0] px-3 py-2 text-[13px] font-medium text-[#7a4a08] mb-5">
                        Written by <span className="font-bold text-[#333] ml-1">{featured.author}</span><span className="mx-2 text-orange">·</span>{featured.authorRole}
                      </p>
                    )}

                    <a href={featured.href} target="_blank" rel="noreferrer" className="inline-flex">
                      <motion.button
                        whileHover={{ scale: 1.03, boxShadow: '0 6px 24px rgba(255,125,0,0.36)' }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 bg-orange text-white text-[13px] font-bold px-6 py-[11px] rounded-xl"
                        style={{ boxShadow: '0 4px 18px rgba(255,125,0,0.28)' }}
                      >
                        Read Article
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </motion.button>
                    </a>
                  </motion.article>
                )}

                {/* Regular Post Cards */}
                {rest.map(post => (
                  <motion.article
                    key={post.id}
                    variants={fadeUp}
                    whileHover={{ y: -3, boxShadow: '0 16px 50px rgba(255,125,0,0.09)', borderColor: 'rgba(255,125,0,0.22)' }}
                    transition={{ duration: 0.22 }}
                    className="bg-white rounded-[24px] overflow-hidden cursor-pointer grid grid-cols-1 lg:grid-cols-[260px_1fr] items-stretch p-5 gap-5 sm:p-6 sm:gap-6"
                    style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                  >
                    {post.image && (
                      <div
                        className="rounded-[16px] overflow-hidden flex-shrink-0"
                        style={{ minHeight: '170px', background: '#f0f0f0' }}
                      >
                        <PostImage
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          style={{ display: 'block', minHeight: '170px' }}
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-between py-1 relative lg:pr-12">
                      <div>
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <TagBadge tag={post.tag} />
                          <span className="text-[13px] text-[#aaa]">{post.date}</span>
                          <span className="text-[13px] text-[#ccc]">·</span>
                          <span className="text-[13px] text-[#aaa]">{post.readTime}</span>
                          {post.source && (
                            <span className="text-[11px] uppercase tracking-[1.5px] text-[#bbb]">{post.source}</span>
                          )}
                        </div>
                        <h2 className="font-bold text-[20px] text-[#111] mb-2 leading-tight tracking-tight">{post.title}</h2>
                        <p className="text-[14px] leading-[1.75] text-[#666] max-w-[540px] mb-4">{post.summary}</p>
                        {post.author && (
                          <p className="inline-flex items-center rounded-lg bg-[#fff3e0] px-3 py-2 text-[13px] font-medium text-[#7a4a08] mb-4">
                            Written by <span className="font-bold text-[#333] ml-1">{post.author}</span><span className="mx-2 text-orange">·</span>{post.authorRole}
                          </p>
                        )}
                      </div>

                      <div>
                        <a href={post.href} target="_blank" rel="noreferrer" className="inline-flex">
                          <button className="bg-transparent border border-orange/30 text-orange font-bold text-[13px] px-4 py-[8px] rounded-lg hover:bg-orange hover:text-white transition-all duration-200">
                            Read Article
                          </button>
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Sidebar */}
              <aside className="space-y-5">
                {/* Author spotlight */}
                <motion.div
                  variants={fadeUp}
                  className="rounded-[24px] p-5 sm:p-8"
                  style={{ background: 'linear-gradient(145deg, #fff7eb, #fff3e0)', border: '1px solid rgba(255,125,0,0.18)' }}
                >
                  <p className="text-[10.5px] font-semibold tracking-[2px] uppercase text-orange mb-4">PL Robotics Author Spotlight</p>
                  <h3 className="font-bold text-[22px] text-[#111] mb-2 tracking-tight">Aarohi on Medium</h3>
                  <p className="text-[13px] font-semibold text-[#555] mb-3">Full Stack Robotics Engineer at PL Robotics</p>
                  <p className="text-[14px] leading-[1.8] text-[#666] mb-5">Read Aarohi’s blog for perspectives on robotics, AI, and hands-on engineering.</p>
                  <a href="https://medium.com/@MLwithAarohi" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-orange text-[13px] font-semibold">
                    Visit Aarohi’s Medium blog
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 4l5 4-5 4" />
                    </svg>
                  </a>
                </motion.div>

                {/* Trend */}
                <motion.div
                  variants={fadeUp}
                  className="bg-white rounded-[24px] p-5 sm:p-8"
                  style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
                >
                  <p className="text-[10.5px] font-semibold tracking-[2px] uppercase text-[#aaa] mb-4">Trend Focus</p>
                  <h3 className="font-bold text-[20px] text-[#111] mb-3 tracking-tight leading-tight">Robotics trends in 2026</h3>
                  <p className="text-[14px] leading-[1.8] text-[#666]">From smarter cobots to hybrid automation, Indian manufacturers are embracing flexible robotics for faster, safer production.</p>
                </motion.div>

                {/* Latest Articles Sidebar */}
                <motion.div
                  variants={fadeUp}
                  className="bg-white rounded-[24px] p-5 sm:p-8"
                  style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
                >
                  <p className="text-[10.5px] font-semibold tracking-[2px] uppercase text-[#aaa] mb-4">Latest Articles</p>
                  <div className="space-y-4">
                    {sidebarPosts.map(post => (
                      <div key={post.id} className="rounded-[20px] overflow-hidden border border-[#f4ede3]">
                        <div
                          className="w-full overflow-hidden"
                          style={{ height: '112px', background: '#f0efed' }}
                        >
                          <PostImage
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <TagBadge tag={post.tag} />
                            <span className="text-[11px] text-[#bbb]">{post.date}</span>
                          </div>
                          <h4 className="font-semibold text-[14px] text-[#111] leading-[1.45] mb-3">{post.title}</h4>
                          <a href={post.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-orange text-[13px] font-semibold">
                            Read Article
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M6 4l5 4-5 4" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </aside>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  )
}
