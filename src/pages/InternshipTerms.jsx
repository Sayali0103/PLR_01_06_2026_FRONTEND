import { motion } from 'framer-motion'

const sections = [
  {
    title: 'A. Working Hours, Leave & Dress Code',
    clauses: [
      'The Company is engaged in providing products and other services to its customers. It is just and necessary to keep operations aligned with customer needs. Given the nature of the Company\'s business, working hours and leave must align with operational requirements. Any changes will be notified from time to time.',
      'Working hours shall be 09:00 am to 06:00 pm on each working day, Monday to Saturday. However, your reporting authority may change the working hours to suit the needs of the Company.',
      'There shall be exceptions and flexibility with respect to working hours, leave and holidays to accommodate internal or external customer requirements and project needs. In all such cases, prior written intimation to or approval from your Reporting Authority shall be necessary.',
      'Dress Code: Employees and interns are expected to dress modestly and professionally in accordance with workplace standards.',
    ],
  },
  {
    title: 'B. Intellectual Property, Trade Secrets and Confidentiality',
    clauses: [
      'Upon your accomplishing any invention, process improvement, operational improvement or other process or method likely to result in the more efficient operation of any Company activity during your engagement, the intellectual property rights in that invention, improvement, process or method shall vest in the Company. The Company shall be entitled to use, utilise and exploit it for seeking patent rights or for any other purpose. All systems or projects developed by you during your engagement shall be the exclusive property of the Company, subject to applicable law.',
      'During your employment or internship, you must maintain strict confidentiality regarding all technical, business and proprietary information acquired, including products, systems, software and customer-related data. This obligation continues after your engagement ends. Disclosure is permitted only with prior approval from authorised Company personnel.',
      'You shall treat as strictly confidential the affairs of the Company and its customers of which you may become aware, particularly products, quotations, specifications, trade secrets, systems, procedures and policy information.',
      'On joining the Company, you shall execute a formal agreement covering non-disclosure of confidential information and vesting of applicable intellectual property rights developed during your engagement in the name of the Company.',
      'During your employment or internship, you shall not, without prior written approval from the Company, author or contribute to any publication, article, blog or report, whether for compensation or otherwise, that relates to the business, products, technology, strategy or operations of P.L. Robotics Pvt. Ltd. This restriction applies to public platforms including newspapers, journals, websites and social media.',
    ],
  },
  {
    title: 'C. Access to Company Intellectual Property',
    clauses: [
      'During your engagement, you may be required to use the Company\'s intellectual property or confidential information, including trade secrets, patents, proprietary software, designs and business data. You may be provided with a statement identifying the Company technology, intellectual property or confidential information that you are required to use or develop. You shall acknowledge receipt of that statement in writing before access is provided, on the terms and conditions recorded in it.',
      'When your engagement ends, you shall stop using and return or securely delete the Company\'s intellectual property and confidential information as instructed by the Company. Any restriction on future activities must be set out in a separate agreement and will be subject to applicable law.',
    ],
  },
  {
    title: 'D. Reimbursements',
    clauses: [
      'Any expense incurred on behalf of the Company must first be approved by your Reporting Authority. For authorised expenses borne by you, the Company shall reimburse you upon submission of valid proof in accordance with Company procedures.',
    ],
  },
  {
    title: 'E. End of Employment or Internship',
    clauses: [
      'The applicable notice period, termination process and final working date shall be governed by the employment or internship agreement issued to you by the Company and applicable law. For an internship, unless otherwise stated in writing, either party may terminate the engagement by giving written notice of one month. If the internship period is one month, the notice period shall be 15 days. The applicable party may tender a sum equivalent to one month\'s stipend, if applicable, in lieu of notice. The Company may, at its discretion, waive the whole or part of the notice period without compensation.',
    ],
  },
  {
    title: 'F. Employee Confidentiality Agreement',
    clauses: [
      'During the course of employment, the Employee may receive confidential information concerning the Company\'s intellectual property, technical information and commercial information. The Company requires this information to be protected from unauthorised use or disclosure.',
      'For purposes of this Agreement, Confidential Information means any data or information that is unique to the Employer, proprietary, competitively sensitive and not generally known by the public. This includes, without limitation, business clients and customers, product suppliers and distributors, prospective customers, training manuals, product development plans, market plans and strategies, business plans and projections, internal performance statistics, financial data, confidential information concerning employees, operational or administrative plans, policy manuals, contract terms, information received from customers that they consider confidential, unpublished price-sensitive information belonging to the Employer or its clients, and similar information relating to the business of the Employer, its customers, potential customers or suppliers. Confidential Information does not include information that is publicly available through no breach of this Agreement.',
      'For the purposes of this Agreement, Related Parties means a parent, spouse, sibling, child, child-in-law, other family member or friend. Confidential Information must not be shared with any Related Party unless the Company has provided prior written consent.',
      'The Employee shall take all reasonable care and precautions to protect the secrecy of Confidential Information and shall keep in safe custody all documents and media that contain it, including papers, discs, pen drives and other recording or storage devices.',
      'Confidential Information shall be used solely for performing duties under the Employee\'s employment and for no other purpose.',
      'The Employee shall not disclose or divulge Confidential Information to any person, firm or company without the Company\'s prior written consent.',
      'The obligations under this Agreement shall survive termination of the Employee\'s employment or employment contract.',
      'On termination of employment, the Employee shall return all Confidential Information belonging to the Company that is in their possession and shall not retain any copy of it.',
      'A violation of this Confidentiality Agreement may result in termination of services and may give rise to civil or criminal action, damages or other remedies available under applicable law. The Company may also seek injunctive relief and recovery of reasonable legal fees and costs where permitted by law.',
      'Severability: All provisions, clauses and sections of this Agreement are severable. If any provision is held to be unconstitutional, invalid, illegal or unenforceable, the remainder of this Agreement shall be interpreted as if that provision had not been included.',
      'In case of any dispute concerning this Agreement, the courts at Washim alone shall have jurisdiction, subject to applicable law.',
    ],
  },
]

export default function InternshipTerms() {
  return (
    <main className="employee-policy-page min-h-screen bg-[#faf7f2] px-5 pb-20 pt-[118px] text-[#1a1208] sm:px-8">
      <section className="mx-auto max-w-[980px]">
        <motion.header
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-black/10 pb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 rounded-full bg-[#FF7D00]" />
              <span className="text-[11px] font-semibold uppercase tracking-[2.5px] text-[#FF7D00]">
                Employee &amp; Intern Resources
              </span>
            </div>
          </div>
          <h1 className="mt-5 max-w-[760px] text-[clamp(30px,4vw,48px)] font-bold leading-[1.08] tracking-[-1px]">
            Employee &amp; Intern Terms, Conduct &amp; Confidentiality
          </h1>
          <p className="mt-5 max-w-[720px] text-[15px] leading-[1.8] text-[#6d5f51]">
            Please read these terms carefully. They describe the working expectations, confidentiality responsibilities, intellectual property provisions, reimbursements and end-of-engagement terms applicable to employees and interns at P.L. Robotics Pvt. Ltd.
          </p>
          <div className="mt-6 grid gap-3 text-[12px] text-[#6d5f51] sm:grid-cols-3">
            <div><span className="font-bold uppercase tracking-wide text-[#a09589]">Company</span><br />P.L. Robotics Pvt. Ltd.</div>
            <div><span className="font-bold uppercase tracking-wide text-[#a09589]">R&amp;D Centre</span><br />Bhosari, Pune</div>
            <div><span className="font-bold uppercase tracking-wide text-[#a09589]">Contact</span><br />contact@plrobotics.com</div>
          </div>
        </motion.header>

        <div className="mt-8 space-y-5">
          {sections.map((section, index) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="rounded-[18px] border border-black/5 bg-white p-6 shadow-[0_8px_28px_rgba(26,18,8,0.04)] sm:p-8"
            >
              <h2 className="text-[20px] font-bold leading-[1.3] text-[#1a1208]">{section.title}</h2>
              <ol className="mt-5 list-decimal space-y-4 pl-5 text-[14px] leading-[1.85] text-[#51473d] marker:font-bold marker:text-[#FF7D00]">
                {section.clauses.map(clause => <li key={clause} className="pl-2">{clause}</li>)}
              </ol>
            </motion.section>
          ))}
        </div>

        <div className="mt-7 border-l-2 border-[#FF7D00] bg-[#fff3e6] px-5 py-4 text-[12px] leading-[1.7] text-[#6d5f51]">
          This page is provided for internal review and information. The final employment or internship agreement should be reviewed and approved by the Company before it is issued for signature.
        </div>
      </section>
    </main>
  )
}
