import {BgLayout} from '../../components/templates/bgLayout'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

function ThanksPage() {
  return (
    <BgLayout>
      {/* Hero Image */}
      <div className="relative w-full h-[40vw] min-h-[220px] max-h-[400px]">
        <Image
          src="https://bonhoeffermachines.com/en/public/images/Event-Banner.jpg"
          alt="Thank You Banner"
          fill
          className="object-cover"
          priority
        />
      </div>
      <section className="py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Thank you for reaching out to Bonhoeffer!
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            We will get back to you as soon as possible with a response. In the meantime, please feel free to explore and know more about Bonhoeffer along with its product offerings across the various segments.
          </p>
          <p className="text-md text-gray-400 max-w-xl mx-auto">
            You can also reach out to us at <a href="mailto:support@bonhoeffermachines.com" className="underline text-[#989b2e]">support@bonhoeffermachines.com</a> for any urgent queries or requirement of additional information.
          </p>
        </motion.div>
      </section>
    </BgLayout>
  )
}

export default ThanksPage