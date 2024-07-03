import ContactUsForm from '@/components/home/contact/contact-us-form'
import PageHeader from '@/components/home/page-header'

export default function ContactPage() {
  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader title="Contact us" />

      <ContactUsForm />
    </div>
  )
}
