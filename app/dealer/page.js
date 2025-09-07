"use client"
import BgLayout from '@/components/templates/bgLayout'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

function DealerPage() {
  const [form, setForm] = useState({
    company: '',
    email: '',
    phone: '',
    address: '',
    postal: '',
    city: '',
    country: '',
    brands: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [agree, setAgree] = useState(false)
  const router = useRouter();
  const timeoutRef = useRef(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!agree) return;
    setSubmitted(true);

    // Submit to formsubmit.co without redirect/reload
    try {
      const formData = new FormData();
      formData.append('company', form.company);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('address', form.address);
      formData.append('postal', form.postal);
      formData.append('city', form.city);
      formData.append('country', form.country);
      formData.append('brands', form.brands);
      formData.append('_subject', 'New Dealer Lead from Bonhoeffer Website');
      formData.append('_template', 'table');
      formData.append('_next', window.location.href); // disables redirect, stays on page
      formData.append('_captcha', 'false');

      await fetch('https://formsubmit.co/amit@bonhoeffermachines.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
      // No redirect, UI stays as is
    } catch (err) {
      // Optionally handle error
    }
  }

  // Redirect to home after 10s or when modal is closed
  useEffect(() => {
    if (submitted) {
      timeoutRef.current = setTimeout(() => {
        router.push('/');
      }, 10000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [submitted, router]);

  const closeModal = () => {
    setSubmitted(false);
    router.push('/');
  }

  return (
    <BgLayout>
      {/* Mobile header spacer for fixed header on mobile/tablet */}
      <div className="block lg:hidden" style={{ height: '4em' }} aria-hidden="true" />

      {/* Hero Image */}
      <div className="relative w-full h-[40vw] min-h-[220px] max-h-[400px] mt-5">
        <Image
          src="https://bonhoeffermachines.com/en/public/images/dealer-banner.webp"
          alt="Become a Dealer Hero Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Heading & Intro */}
      <section className="py-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Become an Authorised Dealer for 
          </h1>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#989b2e]">Bonhoeffer Machines India</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Bonhoeffer Machines products are only sold via authorised dealer shops that are carefully selected by us.
          </p>
        </motion.div>
      </section>

      {/* Dealer Form */}
      <section className="py-8 px-6">
        <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-lg relative">
          <form onSubmit={handleSubmit} className="space-y-6" style={{ filter: submitted ? 'blur(2px)' : 'none', pointerEvents: submitted ? 'none' : 'auto' }}>
            <div>
              <label className="block text-white font-medium mb-2">Company name</label>
              <input name="company" value={form.company} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:ring-2 focus:ring-[#989b2e] outline-none" />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">E-mail</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:ring-2 focus:ring-[#989b2e] outline-none" />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Phone number</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:ring-2 focus:ring-[#989b2e] outline-none" />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Address</label>
              <input name="address" value={form.address} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:ring-2 focus:ring-[#989b2e] outline-none" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-white font-medium mb-2">Postal code</label>
                <input name="postal" value={form.postal} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:ring-2 focus:ring-[#989b2e] outline-none" />
              </div>
              <div className="flex-1">
                <label className="block text-white font-medium mb-2">City</label>
                <input name="city" value={form.city} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:ring-2 focus:ring-[#989b2e] outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Country</label>
              <input name="country" value={form.country} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:ring-2 focus:ring-[#989b2e] outline-none" />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Current brands</label>
              <input name="brands" value={form.brands} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:ring-2 focus:ring-[#989b2e] outline-none" />
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" id="agree" checked={agree} onChange={e => setAgree(e.target.checked)} required className="mt-1" />
              <label htmlFor="agree" className="text-gray-400 text-sm select-none">
                You understand that when you click on submit, Bonhoeffer Machines AB (publ.) and its affiliate companies will use your personal data to respond to you. We will always use your personal data in accordance with our <a href="/privacy-policy" className="underline text-[#989b2e]">Privacy Notice</a>. You will find more information about how we process your data, who we may share it with, what rights you have and further contact details to us in the Privacy Notice. You can withdraw your consent to our newsletter at any time by clicking the unsubscribe button in any communication you receive from us or by contacting us as set out in the Privacy Notice.
              </label>
            </div>
            <button type="submit" disabled={!agree} className="w-full py-3 bg-[#989b2e] hover:bg-[#7a7d24] text-white font-bold rounded-lg transition-colors text-lg mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
              Submit
            </button>
          </form>

          {/* Animated Thank You Modal */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center border border-[#989b2e] relative"
                  initial={{ scale: 0.8, opacity: 0, y: 60 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 60 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-[#989b2e] text-2xl font-bold focus:outline-none">&times;</button>
                  <Image
                    src="https://bonhoeffermachines.com/en/public/images/Event-Banner.jpg"
                    alt="Thank You Banner"
                    width={480}
                    height={120}
                    className="object-cover rounded-xl mx-auto mb-6"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      Thank you for reaching out to Bonhoeffer!
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-4">
                      We will get back to you as soon as possible with a response. In the meantime, please feel free to explore and know more about Bonhoeffer along with its product offerings across the various segments.
                    </p>
                    <p className="text-md text-gray-400 max-w-xl mx-auto mb-2 break-all">
                      You can also reach out to us at <a href="mailto:support@bonhoeffermachines.com" className="underline text-[#989b2e]">support@bonhoeffermachines.com</a> for any urgent queries or requirement of additional information.
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </BgLayout>
  )
}

export default DealerPage