import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const productItems = [
  {
    label: 'COBOT',
    desc: 'Collaborative 6-axis robot arm for flexible manufacturing',
    image: '/photos/photo1.png',
    path: '/#product-showcase',
  },
  {
    label: 'SCARA',
    desc: 'High-speed selective compliance arm for assembly',
    image: '/photos/photo5.jpeg',
    comingSoon: true,
  },
  {
    label: 'DELTA',
    desc: 'Ultra-fast parallel robot for picking & packaging',
    image: '/photos/photo3.jpeg',
    tag: null,
    comingSoon: true,
  },
]

const techItems = [
  {
    label: 'Telemetric System',
    desc: 'Real-time robot monitoring & analytics',
    path: '/technology#telemetric',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    label: 'Vision System',
    desc: 'AI-powered machine vision for precision tasks',
    path: '/technology#vision',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    label: 'Software Platform',
    desc: 'Intuitive robot programming & control interface',
    path: '/technology#software',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M7 8l3 3-3 3M13 14h4" />
      </svg>
    ),
  },
]

const navLinks = [
  { label: 'Products', path: '/products', dropdown: 'products' },
  { label: 'Technology', path: '/technology', dropdown: null },
  { label: 'Applications', path: '/applications', dropdown: null },
  { label: 'Company',  dropdown: 'company' },
  { label: 'Careers', path: '/careers', dropdown: null },
]

const companyItems = [
  { label: 'About', path: '/about', desc: 'Who we are and our mission' },
  { label: 'Blogs', path: '/blogs', desc: 'Insights from our team' },
  { label: 'News', path: '/news', desc: 'Latest announcements' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpen] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(true)
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(true)
  const closeTimer = useRef(null)
  const { pathname } = useLocation()
  const contactActive = pathname === '/contact'
  const demoActive = pathname === '/book-demo'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const open = (key) => { clearTimeout(closeTimer.current); setOpen(key) }
  const close = () => { closeTimer.current = setTimeout(() => setOpen(null), 150) }
  const stay = () => clearTimeout(closeTimer.current)

  useEffect(() => {
    setOpen(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <div className="fixed top-3 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none sm:top-4 sm:px-6">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto w-full max-w-[1360px] flex items-center justify-between px-4 rounded-[18px] transition-all duration-500 sm:px-6 sm:rounded-[20px]"
        style={{
          height: 68,
          background: scrolled
            ? 'rgba(252,249,244,0.25)'
            : 'rgba(252,249,244,0.15)',
          backdropFilter: 'blur(72px) brightness(1.1)',
          WebkitBackdropFilter: 'blur(72px) brightness(1.1)',
          border: '1.5px solid rgba(255,255,255,0.6)',
          boxShadow: scrolled
            ? '0 32px 80px rgba(0,0,0,0.16), inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.05)'
            : '0 20px 64px rgba(0,0,0,0.12), inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -1px 2px rgba(0,0,0,0.03)',
        }}
      >

        {/* ── Logo ── */}
        <Link to="/" className="flex-shrink-0 flex items-center">
          <motion.img
            src="/logo/logo.png"
            alt="PLR Robotics"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="h-10 w-auto object-contain sm:h-12"
          />
        </Link>

        {/* ── Nav links ── */}
        <div className="hidden flex-1 items-center justify-center gap-0 lg:flex">
          {navLinks.map(({ label, path, dropdown }) => {
            const routeActive = path && (pathname === path || pathname.startsWith(path + '/'))
            const childActive = dropdown === 'company' && companyItems.some(item => pathname === item.path)
            const isOpen = openDropdown === dropdown
            const active = routeActive || childActive || isOpen

            return (
              <div
                key={label}
                className="relative"
                onMouseEnter={() => dropdown ? open(dropdown) : null}
                onMouseLeave={() => dropdown ? close() : null}
              >
                {dropdown ? (
                  <button
                    type="button"
                    onClick={() => openDropdown === dropdown ? setOpen(null) : open(dropdown)}
                    className="relative flex items-center gap-[5px] px-5 py-3 rounded-[12px] text-[14.5px] font-[550] tracking-[-0.1px] whitespace-nowrap transition-all duration-200 group"
                    style={{ color: active ? '#ff9501' : '#1a1208' }}
                  >
                    <motion.span
                      className="absolute inset-0 rounded-[12px]"
                      initial={false}
                      animate={{ opacity: active ? 1 : 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.18 }}
                      style={{ background: active ? 'rgba(255,149,1,0.1)' : 'rgba(0,0,0,0.05)' }}
                    />

                    <span className="relative z-[1]">{label}</span>

                    <motion.svg
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                      className="relative z-[1] flex-shrink-0 opacity-60"
                      width="12" height="12" viewBox="0 0 12 12"
                      fill="none" stroke="currentColor"
                      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M2 4l4 4 4-4" />
                    </motion.svg>
                  </button>
                ) : (
                  <Link
                    to={path}
                    onClick={() => setOpen(null)}
                    className="relative flex items-center gap-[5px] px-5 py-3 rounded-[12px] text-[14.5px] font-[550] tracking-[-0.1px] whitespace-nowrap text-[#1a1208] hover:text-[#ff9501] transition-colors duration-200 group"
                  >
                    {/* Animated bg on hover */}
                    <motion.span
                      className="absolute inset-0 rounded-[12px]"
                      initial={false}
                      animate={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.18 }}
                      style={{ background: 'rgba(0,0,0,0.05)' }}
                    />

                    <span className="relative z-[1]">{label}</span>

                    {/* Chevron for dropdowns */}
                    {dropdown && (
                      <motion.svg
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.22 }}
                        className="relative z-[1] flex-shrink-0 opacity-60"
                        width="12" height="12" viewBox="0 0 12 12"
                        fill="none" stroke="currentColor"
                        strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d="M2 4l4 4 4-4" />
                      </motion.svg>
                    )}
                  </Link>
                )}

                {/* ── Products Dropdown — Image style ── */}
                <AnimatePresence>
                  {dropdown === 'products' && isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-[200] p-3 rounded-[24px]"
                      style={{
                        width: 580,
                        background: 'rgba(252,249,244,0.2)',
                        backdropFilter: 'blur(80px) brightness(1.08)',
                        WebkitBackdropFilter: 'blur(80px) brightness(1.08)',
                        border: '1.5px solid rgba(255,255,255,0.65)',
                        boxShadow: '0 32px 88px rgba(0,0,0,0.18), inset 0 1px 2px rgba(255,255,255,0.85), inset 0 -1px 2px rgba(0,0,0,0.05)',
                      }}
                      onMouseEnter={stay}
                      onMouseLeave={close}
                    >
                      {/* Header */}
                      <div className="px-3 pb-3 pt-1 mb-4 border-b border-black/5">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-[1.5px] bg-orange rounded-full" />
                          <span className="text-[10.5px] font-bold tracking-[2px] uppercase text-orange">
                            Our Products
                          </span>
                        </div>
                        <div className="text-[13px] font-semibold text-[#1a1208]">
                          Explore our robot families for modern automation.
                        </div>
                      </div>

                      {/* Product cards */}
                      <div className="grid grid-cols-3 gap-3">
                        {productItems.map(item => {
                          const CardTag = item.comingSoon ? 'div' : Link
                          const cardProps = item.comingSoon
                            ? {}
                            : { to: item.path, onClick: () => setOpen(null) }

                          return (
                            <CardTag
                              key={item.label}
                              {...cardProps}
                              className={`group/card rounded-[20px] overflow-hidden block bg-white transition-all duration-300 ${item.comingSoon
                                ? 'cursor-default'
                                : 'cursor-pointer hover:-translate-y-1'
                                }`}
                              style={{
                                border: '1px solid rgba(0,0,0,0.07)',
                                boxShadow: '0 12px 34px rgba(26,18,8,0.08)',
                              }}
                            >
                              <div className="relative overflow-hidden" style={{ height: 150 }}>
                                {item.comingSoon ? (
                                  <div
                                    className="w-full h-full flex items-center justify-center"
                                    style={{
                                      background: 'linear-gradient(135deg, rgba(255,149,1,0.12), rgba(26,18,8,0.05))',
                                    }}
                                  >
                                    <span
                                      className="text-[11px] font-bold tracking-[2px] uppercase text-orange px-3 py-[6px] rounded-full"
                                      style={{ background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(255,149,1,0.22)' }}
                                    >
                                      Coming Soon
                                    </span>
                                  </div>
                                ) : (
                                  <>
                                    <img
                                      src={item.image}
                                      alt={item.label}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                                    />
                                    <div
                                      className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent transition-opacity duration-300"
                                    />
                                  </>
                                )}
                                <div className="absolute left-0 bottom-0 right-0 p-4">
                                  <div className={`text-[15px] font-semibold tracking-tight ${item.comingSoon ? 'text-[#1a1208]' : 'text-white'}`}>
                                    {item.label}
                                  </div>
                                </div>
                              </div>

                              <div className="px-4 py-4 transition-colors duration-200 group-hover/card:bg-orange/5">
                                <p className="text-[13px] leading-[1.6] text-[#555] group-hover/card:text-[#333] transition-colors duration-200">
                                  {item.desc}
                                </p>
                                {!item.comingSoon && (
                                  <div className="flex items-center gap-1 mt-3 text-orange opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                                    <span className="text-[12px] font-semibold">Learn more</span>
                                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M3 8h10M9 4l4 4-4 4" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </CardTag>
                          )
                        })}
                      </div>

                      {/* Footer link */}
                      <div className="mt-4 pt-4 border-t border-black/5 px-3">
                        <Link
                          to="/#product-showcase"
                          onClick={() => setOpen(null)}
                          className="flex items-center justify-between gap-4 group/all"
                        >
                          <span className="text-[13px] font-semibold text-[#444] group-hover/all:text-orange transition-colors duration-200">
                            View all products
                          </span>
                          <div
                            className="flex items-center gap-2 text-orange text-[12px] font-semibold px-3 py-[6px] rounded-full transition-all duration-200 group-hover/all:bg-orange group-hover/all:text-white"
                            style={{ border: '1px solid rgba(255,149,1,0.3)' }}
                          >
                            Explore
                            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 8h10M9 4l4 4-4 4" />
                            </svg>
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Technology Dropdown ── */}
                <AnimatePresence>
                  {dropdown === 'tech' && isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-[200] p-3 rounded-[20px]"
                      style={{
                        width: 300,
                        background: 'rgba(252,249,244,0.2)',
                        backdropFilter: 'blur(80px) brightness(1.08)',
                        WebkitBackdropFilter: 'blur(80px) brightness(1.08)',
                        border: '1.5px solid rgba(255,255,255,0.65)',
                        boxShadow: '0 32px 88px rgba(0,0,0,0.18), inset 0 1px 2px rgba(255,255,255,0.85), inset 0 -1px 2px rgba(0,0,0,0.05)',
                      }}
                      onMouseEnter={stay}
                      onMouseLeave={close}
                    >
                      {/* Header */}
                      <div className="px-3 pb-3 pt-1 mb-2 border-b border-black/5">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-[1.5px] bg-orange rounded-full" />
                          <span className="text-[10.5px] font-bold tracking-[2px] uppercase text-orange">
                            Technology
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        {techItems.map(item => (
                          <Link
                            key={item.label}
                            to={item.path}
                            onClick={() => setOpen(null)}
                            className="flex items-start gap-3 px-3 py-[10px] rounded-[12px] transition-all duration-200 group/tech cursor-pointer"
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,149,1,0.06)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-orange mt-[1px]"
                              style={{ background: 'rgba(255,149,1,0.08)' }}
                            >
                              {item.icon}
                            </div>
                            <div>
                              <div className="text-[13.5px] font-semibold text-[#111] group-hover/tech:text-orange transition-colors duration-200">
                                {item.label}
                              </div>
                              <div className="text-[12px] text-[#999] mt-[2px] leading-[1.5]">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Company Dropdown ── */}
                <AnimatePresence>
                  {dropdown === 'company' && isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-[200] p-3 rounded-[20px]"
                      style={{
                        width: 320,
                        background: 'rgba(252,249,244,0.8)',
                        backdropFilter: 'blur(80px) brightness(1.08)',
                        WebkitBackdropFilter: 'blur(80px) brightness(1.08)',
                        border: '1.5px solid rgba(255,255,255,0.65)',
                        boxShadow: '0 32px 88px rgba(0,0,0,0.18), inset 0 1px 2px rgba(255,255,255,0.85), inset 0 -1px 2px rgba(0,0,0,0.05)',
                      }}
                      onMouseEnter={stay}
                      onMouseLeave={close}
                    >
                      {/* Header */}
                      <div className="px-3 pb-3 pt-1 mb-2 border-b border-black/5">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-[1.5px] bg-orange rounded-full" />
                          <span className="text-[10.5px] font-bold tracking-[2px] uppercase text-orange">
                            Company
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        {companyItems.map(item => (
                          <Link
                            key={item.label}
                            to={item.path}
                            onClick={() => setOpen(null)}
                            className="flex items-start gap-3 px-3 py-[10px] rounded-[12px] transition-all duration-200 group/company cursor-pointer"
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,149,1,0.06)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <div>
                              <div className="text-[13.5px] font-semibold text-[#111] group-hover/company:text-orange transition-colors duration-200">
                                {item.label}
                              </div>
                              <div className="text-[12px] text-[#999] mt-[2px] leading-[1.5]">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            )
          })}
        </div>

        {/* ── Actions ── */}
        <div className="hidden flex-shrink-0 items-center gap-2 lg:flex">
          <Link
            to="/contact"
            className="relative text-[14px] font-[550] px-5 py-[9px] rounded-[12px] overflow-hidden transition-colors duration-200 group"
            style={{ color: contactActive ? '#ff9501' : '#333' }}
          >
            <motion.span
              className="absolute inset-0 rounded-[12px]"
              initial={false}
              animate={{ opacity: contactActive ? 1 : 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.18 }}
              style={{ background: contactActive ? 'rgba(255,149,1,0.1)' : 'rgba(0,0,0,0.05)' }}
            />
            <span className="relative z-[1] transition-colors duration-200">
              Contact
            </span>
          </Link>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/book-demo"
              className="inline-flex items-center gap-2 text-[13.5px] font-bold text-white bg-orange px-6 py-[11px] rounded-[12px] whitespace-nowrap transition-all duration-200 hover:bg-amber"
              style={{
                boxShadow: demoActive
                  ? '0 0 0 3px rgba(255,149,1,0.18), 0 6px 24px rgba(255,149,1,0.45)'
                  : '0 2px 20px rgba(255,149,1,0.35)',
              }}
            >
              Book Demo
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </motion.div>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(open => !open)}
          className="relative z-[220] flex h-11 w-11 items-center justify-center rounded-2xl text-[#1a1208] lg:hidden"
          style={{
            background: mobileOpen ? 'rgba(255,149,1,0.16)' : 'rgba(255,255,255,0.55)',
            border: '1px solid rgba(255,255,255,0.65)',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.7), 0 10px 28px rgba(0,0,0,0.08)',
          }}
        >
          <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
          <span className="relative block h-5 w-5">
            <span
              className="absolute left-0 top-[4px] h-[2px] w-5 rounded-full bg-current transition-transform duration-200"
              style={{ transform: mobileOpen ? 'translateY(6px) rotate(45deg)' : 'none' }}
            />
            <span
              className="absolute left-0 top-[10px] h-[2px] w-5 rounded-full bg-current transition-opacity duration-200"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="absolute left-0 top-[16px] h-[2px] w-5 rounded-full bg-current transition-transform duration-200"
              style={{ transform: mobileOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }}
            />
          </span>
        </button>

      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 z-[180] bg-[#1a1208]/30 backdrop-blur-sm pointer-events-auto lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              className="fixed right-3 top-3 bottom-3 z-[210] ml-auto w-[calc(100%-24px)] max-w-[360px] overflow-y-auto rounded-[28px] bg-[#fffaf4] p-5 pointer-events-auto lg:hidden"
              initial={{ opacity: 0, x: 34, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 34, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              style={{
                border: '1px solid rgba(255,149,1,0.18)',
                boxShadow: '0 32px 90px rgba(26,18,8,0.24)',
              }}
            >
              <div className="mb-7 flex items-center justify-between pr-14">
                <Link to="/" className="flex items-center">
                  <img src="/logo/logo.png" alt="PLR Robotics" className="h-11 w-auto object-contain" />
                </Link>
              </div>

              <div className="mb-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-[2px] w-6 rounded-full bg-orange" />
                  <span className="text-[10.5px] font-bold uppercase tracking-[2px] text-orange">
                    Menu
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="rounded-3xl bg-white/75 p-2" style={{ border: '1px solid rgba(26,18,8,0.07)' }}>
                    <button
                      type="button"
                      onClick={() => setMobileProductsOpen(open => !open)}
                      className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-[16px] font-semibold text-[#1a1208] transition-colors hover:bg-orange/10 hover:text-orange"
                    >
                      Products
                      <motion.svg
                        animate={{ rotate: mobileProductsOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-60"
                      >
                        <path d="M2 4l4 4 4-4" />
                      </motion.svg>
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileProductsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-2 px-1 pb-1 pt-1">
                            {productItems.map(item => (
                              item.comingSoon ? (
                                <div
                                  key={item.label}
                                  className="rounded-2xl bg-[#fff8f0] px-3 py-3"
                                  style={{ border: '1px solid rgba(255,149,1,0.12)' }}
                                >
                                  <div className="flex items-center justify-between gap-3">
                                    <div>
                                      <div className="text-[14px] font-semibold text-[#1a1208]">{item.label}</div>
                                      <div className="mt-1 text-[12px] leading-[1.45] text-[#7b7166]">{item.desc}</div>
                                    </div>
                                    <span className="shrink-0 rounded-full bg-orange/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[1.4px] text-orange">
                                      Soon
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <Link
                                  key={item.label}
                                  to={item.path}
                                  className="block rounded-2xl bg-[#fff8f0] px-3 py-3 transition-colors hover:bg-orange/10"
                                  style={{ border: '1px solid rgba(255,149,1,0.12)' }}
                                >
                                  <div className="text-[14px] font-semibold text-[#1a1208]">{item.label}</div>
                                  <div className="mt-1 text-[12px] leading-[1.45] text-[#7b7166]">{item.desc}</div>
                                </Link>
                              )
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    to="/technology"
                    className="rounded-2xl px-4 py-3 text-[16px] font-semibold text-[#1a1208] transition-colors hover:bg-orange/10 hover:text-orange"
                  >
                    Technology
                  </Link>
                  <Link
                    to="/applications"
                    className="rounded-2xl px-4 py-3 text-[16px] font-semibold text-[#1a1208] transition-colors hover:bg-orange/10 hover:text-orange"
                  >
                    Applications
                  </Link>

                  <div className="rounded-3xl bg-white/75 p-2" style={{ border: '1px solid rgba(26,18,8,0.07)' }}>
                    <button
                      type="button"
                      onClick={() => setMobileCompanyOpen(open => !open)}
                      className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-[16px] font-semibold text-[#1a1208] transition-colors hover:bg-orange/10 hover:text-orange"
                    >
                      Company
                      <motion.svg
                        animate={{ rotate: mobileCompanyOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-60"
                      >
                        <path d="M2 4l4 4 4-4" />
                      </motion.svg>
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileCompanyOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-1 px-1 pb-1 pt-1">
                            {companyItems.map(item => (
                              <Link
                                key={item.label}
                                to={item.path}
                                className="block rounded-2xl px-3 py-3 transition-colors hover:bg-orange/10"
                              >
                                <div className="text-[14px] font-semibold text-[#1a1208]">{item.label}</div>
                                <div className="mt-1 text-[12px] leading-[1.45] text-[#7b7166]">{item.desc}</div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    to="/careers"
                    className="rounded-2xl px-4 py-3 text-[16px] font-semibold text-[#1a1208] transition-colors hover:bg-orange/10 hover:text-orange"
                  >
                    Careers
                  </Link>
                </div>
              </div>

              <div className="grid gap-3">
                <Link
                  to="/book-demo"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange px-5 py-[14px] text-[14px] font-bold text-white"
                  style={{ boxShadow: '0 10px 28px rgba(255,149,1,0.32)' }}
                >
                  Book Demo
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-2xl px-5 py-[13px] text-[14px] font-bold text-[#1a1208]"
                  style={{
                    background: 'rgba(26,18,8,0.04)',
                    border: '1px solid rgba(26,18,8,0.09)',
                  }}
                >
                  Contact
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
