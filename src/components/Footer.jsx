import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Products', path: '/#product-showcase' },
  { label: 'Technology', path: '/technology' },
  { label: 'Applications', path: '/applications' },
  { label: 'About', path: '/about' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'News', path: '/news' },
  { label: 'Careers', path: '/careers' }
]

const socialLinks = [
  { icon: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/plrobotics_india/' },
  { icon: 'threads', label: 'Threads', url: 'https://www.threads.com/@plrobotics_india' },
  { icon: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61590256899387' },
  { icon: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@P.L.Robotics_India' },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--color-surface)] border-t border-[#d7cfc6]">
      <div className="max-w-[1440px] mx-auto px-6">

        {/* Main footer content */}
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr] py-20">

          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Link to="/" className="inline-block group">
              <img
                src="/logo/logo.png"
                alt="P.L. Robotics"
                className="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
              />
            </Link>

            <p className="max-w-[340px] text-[14.5px] leading-[1.8] text-[#6d5f51]">
              Designing and delivering advanced robotics and automation solutions that help industries achieve greater precision, efficiency, and sustainable growth.            </p>

            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.url}
                  title={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#f5ebe5] text-orange flex items-center justify-center transition-all duration-300 hover:bg-orange hover:text-white"
                >
                  {social.icon === 'instagram' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.1A4.9 4.9 0 1 1 12 16.9 4.9 4.9 0 0 1 12 7.1Zm0 2A2.9 2.9 0 1 0 12 14.9 2.9 2.9 0 0 0 12 9.1Zm5.15-2.55a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
                    </svg>
                  )}
                  {social.icon === 'threads' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.28 2C6.22 2 2.25 5.92 2.25 12.02S6.24 22 12.31 22c5.36 0 8.72-2.92 8.72-7.02 0-3.1-1.8-5.06-5.08-5.74-.7-3.18-2.76-4.95-5.86-4.95-2.67 0-4.8 1.43-5.86 3.92l1.86.8c.74-1.76 2.17-2.73 4-2.73 1.92 0 3.15.97 3.74 2.86-.51-.04-1.05-.06-1.62-.06-3.38 0-5.45 1.55-5.45 4.08 0 2.35 1.87 3.96 4.64 3.96 2.95 0 4.8-1.72 4.8-4.47v-1.33c1.88.58 2.83 1.8 2.83 3.66 0 2.96-2.6 5.03-6.72 5.03-4.95 0-8.06-3.08-8.06-7.99C4.25 7.08 7.35 4 12.28 4c3.94 0 6.56 1.95 7.38 5.5l1.95-.45C20.58 4.61 17.2 2 12.28 2Zm1.94 9.2v1.31c0 1.72-.99 2.7-2.8 2.7-1.6 0-2.64-.8-2.64-2.05 0-1.37 1.2-2.1 3.44-2.1.74 0 1.41.05 2 .14Z" />
                    </svg>
                  )}
                  {social.icon === 'facebook' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2V8.6h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.25 22 17.08 22 12.06Z" />
                    </svg>
                  )}
                  {social.icon === 'youtube' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.55 3.58 12 3.58 12 3.58s-7.55 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.85.5 9.4.5 9.4.5s7.55 0 9.4-.5a3 3 0 0 0 2.1-2.12A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Explore */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-[12px] font-bold uppercase tracking-[3px] text-orange mb-7">Explore</div>
            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="block text-[14px] font-medium text-[#6d5f51] hover:text-orange transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-orange transition-all duration-300 group-hover:w-full rounded-full" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-[12px] font-bold uppercase tracking-[3px] text-orange mb-7">Support</div>
            <div className="space-y-4">
              <Link
                to="/contact"
                className="block text-[14px] font-medium text-[#6d5f51] hover:text-orange transition-colors duration-300 relative group"
              >
                Contact us
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-orange transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
              <a
                href="mailto:contact@plrobotics.com"
                className="flex items-center gap-2 text-[14px] font-medium text-[#6d5f51] hover:text-orange transition-colors duration-300 group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                contact@plrobotics.com
              </a>
              <a
                href="tel:+917058091580"
                className="flex items-start gap-2 text-[14px] font-medium text-[#6d5f51] hover:text-orange transition-colors duration-300"
              >
                <svg className="mt-[2px] flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>
                  <span className="block text-[12px] font-semibold uppercase tracking-[1.5px] text-[#9d8d7f]">Customer Support</span>
                  +91 7058091580
                </span>
              </a>
              <a
                href="tel:+919834596021"
                className="flex items-start gap-2 text-[14px] font-medium text-[#6d5f51] hover:text-orange transition-colors duration-300"
              >
                <svg className="mt-[2px] flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>
                  <span className="block text-[12px] font-semibold uppercase tracking-[1.5px] text-[#9d8d7f]">Queries</span>
                  +91 98345 96021
                </span>
              </a>
            </div>
          </motion.div>

          {/* Find Us — map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-[12px] font-bold uppercase tracking-[3px] text-orange mb-7">Find Us</div>

            <div className="flex items-start gap-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#FF9501" strokeWidth="1.6" strokeLinecap="round" className="mt-[3px] flex-shrink-0">
                <path d="M8 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                <path d="M8 2C5.2 2 3 4.2 3 7c0 4 5 7 5 7s5-3 5-7c0-2.8-2.2-5-5-5Z" />
              </svg>
              <div>
                <p className="text-[13.5px] font-semibold text-[#3a2e24] mb-2">Address</p>
                <p className="text-[13.5px] leading-[1.85] text-[#6d5f51]">
                  Office No. 401, Pooja Complex,<br />
                  Telco Road, Near Quality Circle,<br />
                  MIDC Bhosari, PCMC,<br />
                  Maharashtra – 411026
                </p>

                <a
                  href="https://maps.google.com/?q=Pooja+Complex,+Telco+Road,+MIDC+Bhosari,+PCMC,+Maharashtra+411026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-4 text-[12.5px] font-semibold text-orange hover:underline">
                  Get Directions
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </div>
        </div>
      </motion.div>

    </div>

        {/* Divider */ }
  <div className="border-t border-[#d7cfc6]" />

  {/* Bottom bar */ }
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.4 }}
    className="py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
  >
    <span className="text-[13px] text-[#7e7061]">© 2026 P.L. Robotics. All rights reserved.</span>
    <div className="flex flex-wrap gap-6 items-center text-[13px]">
      <a href="#" className="text-[#7e7061] hover:text-orange transition-colors duration-300">Privacy Policy</a>
      <a href="#" className="text-[#7e7061] hover:text-orange transition-colors duration-300">Terms of Service</a>
      <span className="text-[#9d8d7f]">Located in Pune, India</span>
    </div>
  </motion.div>

      </div >
    </footer >
  )
}
