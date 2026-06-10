import InquiryFormPage from '../components/InquiryFormPage.jsx'

const fields = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
  { name: 'companyName', label: 'Company Name' },
  { name: 'companyEmail', label: 'Company Email', type: 'email' },
  { name: 'companyContact', label: 'Company Contact', type: 'tel', maxLength: 30 },
  { name: 'companyAddress', label: 'Company Address', type: 'textarea', fullWidth: true, maxLength: 500 },
  { name: 'interestedIn', label: 'Interested Robot / Service' },
  { name: 'industryType', label: 'Industry Type' },
  { name: 'application', label: 'Application', type: 'textarea', fullWidth: true },
]

export default function BookDemo() {
  return <InquiryFormPage eyebrow="Book a Demo" title="See PL Robotics" accentTitle="In Action." description="Share your requirements and our team will get in touch to understand your application and arrange the right demonstration." endpoint="/demo-requests" fields={fields} successMessage="Your demo request has been received. The PL Robotics team will contact you to discuss the next steps." />
}
