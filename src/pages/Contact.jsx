import InquiryFormPage from '../components/InquiryFormPage.jsx'

const fields = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
  { name: 'phone', label: 'Phone Number', type: 'tel', maxLength: 30 },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'reason', label: 'Reason to Contact', type: 'textarea', fullWidth: true },
]

export default function Contact() {
  return <InquiryFormPage eyebrow="Contact PL Robotics" title="Let's" accentTitle="Connect." description="Tell us what you are looking for. Our team will review your message and get in touch with you directly." endpoint="/contact" fields={fields} successMessage="Your message has been received. The PL Robotics team will contact you shortly." />
}
