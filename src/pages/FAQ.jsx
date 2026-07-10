import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: 'What types of robots does P. L. Robotics offer?',
    answer: 'P. L. Robotics offers industrial automation solutions including collaborative robots, Cartesian robots, and application-specific robotic systems for manufacturing needs.',
  },
  {
    question: 'Can P. L. Robotics customize automation for our production line?',
    answer: 'Yes. The team studies the application, process flow, available space, and production goals before recommending or building a suitable automation solution.',
  },
  {
    question: 'Which industries can use P. L. Robotics solutions?',
    answer: 'The solutions can support industries such as automotive, machining, packaging, fabrication, assembly, inspection, and other manufacturing environments.',
  },
  {
    question: 'Can your robots be integrated with existing machines?',
    answer: 'Yes. Robotic systems can be planned around existing equipment such as CNC machines, conveyors, fixtures, sensors, and other shop-floor systems.',
  },
  {
    question: 'How do I know which robot is right for my application?',
    answer: 'The best option depends on payload, reach, cycle time, precision, floor space, safety requirements, and the process being automated.',
  },
  {
    question: 'How can I book a demo?',
    answer: 'You can use the Book Demo page to share your company details, application, and automation requirement. The team will contact you for the next steps.',
  },
  {
    question: 'Does P. L. Robotics provide installation and commissioning?',
    answer: 'Yes. Installation, commissioning, testing, and basic handover support can be provided as part of the automation project scope.',
  },
  {
    question: 'Is operator training provided?',
    answer: 'Training can be included so operators and maintenance teams understand the basic operation, safety practices, and daily usage of the system.',
  },
  {
    question: 'Do you provide after-sales service and maintenance support?',
    answer: 'P. L. Robotics can support customers after installation through service assistance, troubleshooting, and maintenance-related coordination.',
  },
  {
    question: 'How can I contact P. L. Robotics for a project inquiry?',
    answer: 'You can contact the team through the Contact page, email, or phone numbers listed on the website footer.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <main className="min-h-screen bg-[#faf7f2] pt-[110px] text-[#1a1208]">
      <section className="mx-auto max-w-[1180px] px-5 pb-20 pt-8 sm:px-6 lg:px-12 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
        >
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-[2px] w-8 rounded-full bg-[#FF7D00]" />
              <span className="text-[11px] font-semibold uppercase tracking-[2.5px] text-[#FF7D00]">
                FAQ
              </span>
            </div>
            <h1
              className="mb-6 font-bold leading-[1.04] text-[#1a1208]"
              style={{ fontSize: 'clamp(40px, 5vw, 66px)', letterSpacing: '-2px' }}
            >
              Frequently Asked
              <br />
              <span className="text-[#FF7D00]">Questions.</span>
            </h1>
            <p className="max-w-[440px] text-[15px] leading-[1.9] text-[#6d5f51]">
              Quick answers about our robotics products, automation applications, demos, installation, and support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex rounded-[12px] bg-[#FF7D00] px-6 py-3 text-[13px] font-bold text-white shadow-[0_5px_22px_rgba(255,125,0,0.28)]"
              >
                Contact Us
              </Link>
              <Link
                to="/book-demo"
                className="inline-flex rounded-[12px] border border-[#1a1208]/10 bg-white px-6 py-3 text-[13px] font-bold text-[#1a1208]"
              >
                Book Demo
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index

              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.03 }}
                  className="overflow-hidden rounded-[18px] border border-black/5 bg-white shadow-[0_8px_28px_rgba(26,18,8,0.05)]"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="text-[16px] font-semibold leading-[1.45] text-[#1a1208]">
                      {item.question}
                    </span>
                    <span
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[22px] font-semibold text-[#FF7D00]"
                      style={{ background: 'rgba(255,125,0,0.09)' }}
                    >
                      {isOpen ? '-' : '+'}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-6 text-[14.5px] leading-[1.85] text-[#6d5f51] sm:px-6">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </section>
    </main>
  )
}
