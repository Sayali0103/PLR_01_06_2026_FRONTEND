import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function PolicyPage({ audience, description, sections, otherPolicy }) {
  return (
    <main className="employee-policy-page min-h-screen bg-[#faf7f2] px-5 pb-20 pt-[118px] text-[#1a1208] sm:px-8">
      <section className="mx-auto max-w-[980px]">
        <motion.header initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="border-b border-black/10 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3"><div className="h-[2px] w-8 rounded-full bg-[#FF7D00]" /><span className="text-[11px] font-semibold uppercase tracking-[2.5px] text-[#FF7D00]">{audience} Resources</span></div>
            <Link to={otherPolicy.path} className="rounded-full border border-[#FF7D00]/25 bg-[#fff3e6] px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-[#c96000] transition-colors hover:bg-[#ffe6cc]">View {otherPolicy.label}</Link>
          </div>
          <h1 className="mt-5 max-w-[760px] text-[clamp(30px,4vw,48px)] font-bold leading-[1.08] tracking-[-1px]">{audience} Policies</h1>
          <p className="mt-5 max-w-[720px] text-[15px] leading-[1.8] text-[#6d5f51]">{description}</p>
          <div className="mt-6 grid gap-3 text-[12px] text-[#6d5f51] sm:grid-cols-3"><div><span className="font-bold uppercase tracking-wide text-[#a09589]">Company</span><br />P.L. Robotics Pvt. Ltd.</div><div><span className="font-bold uppercase tracking-wide text-[#a09589]">R&amp;D Centre</span><br />Bhosari, Pune</div><div><span className="font-bold uppercase tracking-wide text-[#a09589]">Contact</span><br />contact@plrobotics.com</div></div>
        </motion.header>
        <div className="mt-8 space-y-5">
          {sections.map((section, index) => <motion.section key={section.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.45, delay: index * 0.04 }} className="rounded-[18px] border border-black/5 bg-white p-6 shadow-[0_8px_28px_rgba(26,18,8,0.04)] sm:p-8"><h2 className="text-[20px] font-bold leading-[1.3] text-[#1a1208]">{section.title}</h2><ol className="mt-5 list-decimal space-y-4 pl-5 text-[14px] leading-[1.85] text-[#51473d] marker:font-bold marker:text-[#FF7D00]">{section.clauses.map(clause => <li key={clause} className="pl-2">{clause}</li>)}</ol></motion.section>)}
        </div>
        <div className="mt-7 border-l-2 border-[#FF7D00] bg-[#fff3e6] px-5 py-4 text-[12px] leading-[1.7] text-[#6d5f51]">This page is provided for internal review and information. The final agreement should be reviewed and approved by the Company before it is issued for signature.</div>
      </section>
    </main>
  )
}
