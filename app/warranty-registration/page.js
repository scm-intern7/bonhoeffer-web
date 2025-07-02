'use client'
import BgLayout from '@/components/templates/bgLayout'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

function WarrantyRegistrationPage() {
  const [formData, setFormData] = useState({
    customerName: '',
    contactNumber: '',
    purchaseProof: null
  })
  const [errors, setErrors] = useState({})
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const bannerImage = "https://bonhoeffermachines.com/en/public/images/contact-banner-india.webp"

  // useEffect to manage header/footer z-index when modals are open
  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'warranty-modal-style'
    
    if (isTermsModalOpen || showSuccessModal) {
      // Reduce header and footer z-index when modals are open
      style.textContent = `
        header {
          z-index: 10 !important;
        }
        footer {
          z-index: 10 !important;
        }
        nav {
          z-index: 10 !important;
        }
        .header-dropdown {
          z-index: 10 !important;
        }
      `
      document.head.appendChild(style)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      // Remove the style when modals are closed
      const existingStyle = document.getElementById('warranty-modal-style')
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
      // Restore body scroll
      document.body.style.overflow = 'unset'
    }

    return () => {
      // Cleanup on unmount
      const existingStyle = document.getElementById('warranty-modal-style')
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
      document.body.style.overflow = 'unset'
    }
  }, [isTermsModalOpen, showSuccessModal])

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Handle file upload
  const handleFileUpload = (file) => {
    if (!file) return

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        purchaseProof: 'File size must not exceed 5MB'
      }))
      return
    }

    // Validate file type (images and PDFs)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        purchaseProof: 'Please upload a valid image (JPEG, PNG, WebP) or PDF file'
      }))
      return
    }

    setFormData(prev => ({
      ...prev,
      purchaseProof: file
    }))
    
    // Clear error
    if (errors.purchaseProof) {
      setErrors(prev => ({
        ...prev,
        purchaseProof: ''
      }))
    }
  }

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required'
    }
    
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required'
    } else if (!/^\d{10,15}$/.test(formData.contactNumber.replace(/\s/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid contact number (10-15 digits)'
    }
    
    if (!formData.purchaseProof) {
      newErrors.purchaseProof = 'Purchase proof/bill is required'
    }
    
    if (!isTermsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setShowSuccessModal(true)
      // Reset form
      setFormData({
        customerName: '',
        contactNumber: '',
        purchaseProof: null
      })
      setIsTermsAccepted(false)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <BgLayout>
      {/* Hero Banner Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={bannerImage}
            alt="Warranty Registration Banner"
            fill
            className="object-cover"
            priority
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" /> */}
        </div>
      </section>

      <section>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mt-5 z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Warranty <span className="text-[#989b2e]">Registration</span> 
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-200 font-light leading-relaxed"
          >
            Register your Bonhoeffer product for warranty coverage
          </motion.p>
        </motion.div>
      </section>

      {/* Registration Form Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Customer Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <label className="block text-white text-lg font-semibold mb-3">
                  Customer Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-white/10 border ${
                    errors.customerName ? 'border-red-400' : 'border-white/20'
                  } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#989b2e] focus:border-transparent transition-all duration-300`}
                  placeholder="Enter your full name"
                />
                {errors.customerName && (
                  <p className="text-red-400 text-sm mt-2">{errors.customerName}</p>
                )}
              </motion.div>

              {/* Contact Number Field */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <label className="block text-white text-lg font-semibold mb-3">
                  Contact Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-white/10 border ${
                    errors.contactNumber ? 'border-red-400' : 'border-white/20'
                  } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#989b2e] focus:border-transparent transition-all duration-300`}
                  placeholder="Enter your contact number"
                />
                {errors.contactNumber && (
                  <p className="text-red-400 text-sm mt-2">{errors.contactNumber}</p>
                )}
              </motion.div>

              {/* File Upload Field */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <label className="block text-white text-lg font-semibold mb-3">
                  Purchase Proof/Bill <span className="text-red-400">*</span>
                </label>
                <p className="text-gray-400 text-sm mb-4">
                  Upload your purchase bill or receipt (max 1 file, max 5MB)
                </p>
                
                <div
                  className={`relative border-2 border-dashed ${
                    dragActive 
                      ? 'border-[#989b2e] bg-[#989b2e]/10' 
                      : errors.purchaseProof 
                        ? 'border-red-400' 
                        : 'border-white/30'
                  } rounded-xl p-8 text-center transition-all duration-300 hover:border-[#989b2e]/50`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                    accept="image/*,.pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {formData.purchaseProof ? (
                    <div className="flex items-center justify-center space-x-3">
                      <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      <div>
                        <p className="text-white font-medium">{formData.purchaseProof.name}</p>
                        <p className="text-gray-400 text-sm">
                          {(formData.purchaseProof.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-white mb-2">Drop your file here or click to browse</p>
                      <p className="text-gray-400 text-sm">Supports: JPEG, PNG, WebP, PDF</p>
                    </div>
                  )}
                </div>
                
                {errors.purchaseProof && (
                  <p className="text-red-400 text-sm mt-2">{errors.purchaseProof}</p>
                )}
              </motion.div>

              {/* Terms and Conditions */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isTermsAccepted}
                    onChange={(e) => setIsTermsAccepted(e.target.checked)}
                    className="mt-1 w-5 h-5 text-[#989b2e] bg-white/10 border border-white/20 rounded focus:ring-[#989b2e] focus:ring-2"
                  />
                  <label htmlFor="terms" className="text-white text-sm leading-relaxed">
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => setIsTermsModalOpen(true)}
                      className="text-[#989b2e] hover:text-[#7a7f25] underline transition-colors duration-300 cursor-pointer"
                    >
                      Terms and Conditions
                    </button>
                    <span className="text-red-400"> *</span>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-red-400 text-sm">{errors.terms}</p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className={`px-8 py-4 rounded-xl font-semibold text-lg cursor-pointer transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-[#989b2e] hover:bg-[#7a7f25] shadow-lg hover:shadow-xl'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit Registration'
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Terms and Conditions Modal */}
      <AnimatePresence>
        {isTermsModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={() => setIsTermsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-white/20 rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/20 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Bonhoeffer Warranty Terms & Conditions</h3>
                <button
                  onClick={() => setIsTermsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[60vh] text-gray-300 space-y-6 text-sm leading-relaxed">
                <div>
                  <h4 className="text-[#989b2e] font-bold text-lg mb-3">Bonhoeffer Warranty for Customers & Dealers</h4>
                  <h5 className="text-white font-semibold mb-2">Policy & Procedure Manual</h5>
                  <p>The Company warranty, subject as hereinafter provided that all new equipment supplied by it are free from defects in material and workmanship, its liability under such warranty being limited to making goods at factory to be nominated by it, any part or parts which shall be returned to the Company or its authorized representative and which the Company is satisfied on its examination of the part or parts to have been defective in material or workmanship.</p>
                </div>

                <div>
                  <p className="font-semibold text-[#989b2e]">The period of warranty is Fifteen Months for Two Stroke and 36 Month for Four Stroke Machines from the date of invoice to the customer.</p>
                  <p className="mt-2"><strong>Note:</strong> all 4 stroke machines - Gasoline Engines / Gasoline Generator+ Invertor + Gasoline Water Pump+ Gasoline Tillers and Diesel Tiller 950D covered only 36 months warranty.</p>
                </div>

                <div>
                  <h5 className="text-white font-semibold mb-2">Provided that:</h5>
                  <ul className="space-y-2 list-disc ml-6">
                    <li>The Company will not be responsible for any expenses like transportation of break down machine and revenue loss due to failure or other costs which might be involved.</li>
                    <li>All replaced parts shall become the property of the Company. The company will release replace part after received the failed part at HO.</li>
                    <li>Warranty will not cover, any failure arising from the abnormal or improper use of machines or wilful damages.</li>
                    <li>Any normal wear & tear, improper maintenance, improper lubrication, improper storage, dirt, abrasive, moisture, water, rain, snow, rust corrosion, or other similar conditions will not be covered under warranty.</li>
                    <li>Any losses or damage to property, production, financial loses, personal injury, direct/ indirect loses or other expenses arising due to operation or non-operation of the product will not cover under warranty.</li>
                    <li>Any failure arising from transportation, accident, abuse, act of god, fire, contaminated fluids or neglect or failure to operate, store, and maintain the product in accordance with instruction provided in the operator manual supply with the product will not cover under warranty.</li>
                    <li>Any failure arising from the use of incorrect fuel or 2T oil mixed for the two-stroke engine or incorrect chain oil for oil pump or incorrect Engine oil used in four stroke engine will not be covered under warranty.</li>
                  </ul>
                </div>

                <div>
                  <p>The Company does not give any Warranty in respect of its goods except the foregoing warranty which is given expressly in lieu of and excludes all other warranties and conditions expressed or implied whether under Common Law, Statue, or otherwise, and every form of liability for loss or damage direct or consequential, or for any accident resulting from defective material, faulty workmanship or otherwise is expressed excluded.</p>
                </div>

                <div>
                  <h5 className="text-white font-semibold mb-2">CUSTOMER RESPONSIBILITIES</h5>
                  <ul className="space-y-2 list-disc ml-6">
                    <li>The Customer has the right to submit his product for warranty service consideration to any authorized company's Dealer of his choice within the country.</li>
                    <li>The Customer must furnish to the authorized company's Dealer proof of purchase information such as invoice, properly filled warranty card and duly signed.</li>
                    <li>The product must exhibit reasonable care in the maintenance, operation, storage, and general upkeep practices as explained in the maintenance section of the Owner's/Operator's Manual.</li>
                    <li>Any costs incurred to obtain warranty consideration or services is the Customer's responsibility, including shipping and handling, travel expense, lost time, lost production, or pickup and delivery.</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-white font-semibold mb-2">LIMITATION FOR ACCEPTANCE OF CLAIM ON WEAR AND TEAR</h5>
                  <p className="mb-2">Items to be excluded from warranty:</p>
                  <ul className="space-y-1 list-disc ml-6">
                    <li>Gaskets and oil seals</li>
                    <li>Belt & all pulley</li>
                    <li>All electrical items like bulbs, burnt wiring, and rubber items like oil seal, o rings</li>
                    <li>Normal wear and tear of clutch lining, Brake (these are meant to wear subject to regular usage and would not constitute a manufacturing defect)</li>
                    <li>Parts replaced during Free Services, Chargeable Services and routine maintenance schedules</li>
                    <li>Fasteners</li>
                    <li>Cutting blade, accessories fitted to equipment</li>
                    <li>Failure / defects due to usage of non-recommended lubricants</li>
                    <li>Parts which are easily affected by external hits</li>
                    <li>Sheet metal parts</li>
                    <li>If any of the free service not carried out</li>
                  </ul>
                </div>
              </div>
              
              <div className="p-6 border-t border-white/20 flex justify-end space-x-4">
                <button
                  onClick={() => setIsTermsModalOpen(false)}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-white/20 rounded-2xl p-8 max-w-md text-center"
            >
              <div className="mb-6">
                <div className="bg-green-500/20 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Registration Successful!</h3>
                <p className="text-gray-300">
                  Thank you for registering your Bonhoeffer product. Your warranty registration has been submitted successfully. 
                  You will receive a confirmation email shortly.
                </p>
              </div>
              
              <motion.button
                onClick={() => setShowSuccessModal(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#989b2e] hover:bg-[#7a7f25] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BgLayout>
  )
}

export default WarrantyRegistrationPage