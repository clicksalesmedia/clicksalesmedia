import React from 'react'
import CodeBeams from '../ui/CodeBeams'
import { MdOutlineSupportAgent } from 'react-icons/md'
import ContactForm from '../components/Contact/contactForm'
import { Metadata } from 'next'
import ContactPageContent from '../components/Contact/ContactPageContent'

export const metadata: Metadata = {
    title: 'Contact us',
    description: 'Contact clicksalesmedia Team',
}

export default function Contact() {
  return (
    <>
      <CodeBeams
        icon={<MdOutlineSupportAgent/>}
        title="Contact us"
        description="We'd love to hear from you!"
      />
      <ContactPageContent />
    </>
  )
}