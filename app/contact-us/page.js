
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BgLayout from '@/components/templates/bgLayout';

const departments = [
  {
    name: 'Sales Department',
    email: 'sales@bonhoeffermachines.com',
    description: 'Product inquiries, pricing, and sales support',
    icon: '💼',
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Customer Support',
    email: 'support@bonhoeffermachines.com',
    description: 'Technical assistance and product guidance',
    icon: '🔧',
    color: 'from-green-500 to-green-600'
  },
  {
    name: 'Human Resources',
    email: 'hr@bonhoeffermachines.com',
    description: 'Career opportunities and employment',
    icon: '👥',
    color: 'from-pink-500 to-pink-600'
  }
];

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    productInterest: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      productInterest: ''
    });
    setIsSubmitting(false);
  };

  return (
    <BgLayout>
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden mt-5">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url("/contact-banner.jpg")'
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Get In <span className="text-[#9a9c30]">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Ready to power your business with our industrial solutions?
            </p>
          </motion.div>
        </div>
      </section>

            {/* Introduction Text Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                    Let's Build Something <span className="text-[#9a9c30]">Powerful Together</span>
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    At Bonhoeffer Machines, we believe in the power of partnership. Whether you're looking for 
                    cutting-edge industrial equipment, technical support, or exploring new business opportunities, 
                    our team is here to help you succeed.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                    With decades of experience in manufacturing and exporting high-quality machinery, we're committed 
                    to providing solutions that drive your business forward. Connect with us today and discover how 
                    we can power your next project.
                    </p>
                </motion.div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Send Us a Message
                    </h2>
                    <p className="text-gray-300 text-lg">
                    Fill out the form below and we'll get back to you within 24 hours
                    </p>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-gray-700 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-white font-medium mb-2">Full Name *</label>
                        <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300"
                        placeholder="Enter your full name"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-white font-medium mb-2">Email Address *</label>
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300"
                        placeholder="your.email@company.com"
                        />
                    </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-white font-medium mb-2">Phone Number *</label>
                        <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300"
                        placeholder="+91 98765 43210"
                        required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-white font-medium mb-2">Company</label>
                        <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300"
                        placeholder="Your company name"
                        />
                    </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-white font-medium mb-2">Subject *</label>
                        <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300"
                        placeholder="What's this about?"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-white font-medium mb-2">Product Interest</label>
                        <select
                        name="productInterest"
                        value={formData.productInterest}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300"
                        >
                        <option value="">Select a category</option>
                        <option value="water-pumps">Water Pumps</option>
                        <option value="generators">Generators</option>
                        <option value="engines">Engines</option>
                        <option value="agricultural">Agricultural Equipment</option>
                        <option value="cutting-tools">Cutting Tools</option>
                        <option value="other">Other</option>
                        </select>
                    </div>
                    </div>

                    <div className="mb-8">
                    <label className="block text-white font-medium mb-2">Message *</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#9a9c30] focus:ring-2 focus:ring-[#9a9c30]/20 transition-all duration-300 resize-none"
                        placeholder="Tell us about your requirements, questions, or how we can help you..."
                    />
                    </div>

                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#9a9c30] to-[#8a8c20] text-white font-bold py-4 px-8 rounded-xl hover:from-[#8a8c20] hover:to-[#7a7c10] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Sending Message...
                        </div>
                    ) : (
                        'Send Message'
                    )}
                    </button>
                </motion.form>
                </div>
            </section>

            {/* Contact Information Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Reach Out to Us
                    </h2>
                    <p className="text-gray-300 text-lg">
                    Multiple ways to connect with our team
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <motion.div
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700 hover:border-[#9a9c30] transition-all duration-300 transform hover:scale-105"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    >
                    <div className="text-4xl mb-4">📧</div>
                    <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                    <p className="text-gray-300 mb-4">Send us an email anytime</p>
                    <a href="mailto:support@bonhoeffermachines.com" className="text-[#9a9c30] hover:text-[#8a8c20] font-medium">
                        support@bonhoeffermachines.com
                    </a>
                    </motion.div>

                    <motion.div
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700 hover:border-[#9a9c30] transition-all duration-300 transform hover:scale-105"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    >
                    <div className="text-4xl mb-4">📞</div>
                    <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                    <p className="text-gray-300 mb-4">Speak with our team directly</p>
                    <a href="tel:+919667515523" className="text-[#9a9c30] hover:text-[#8a8c20] font-medium">
                        +91 96675 15523
                    </a>
                    </motion.div>

                    <motion.div
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700 hover:border-[#9a9c30] transition-all duration-300 transform hover:scale-105"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    >
                    <div className="text-4xl mb-4">💬</div>
                    <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
                    <p className="text-gray-300 mb-4">Quick messages and support</p>
                    <a href="https://wa.me/919667515523" className="text-[#9a9c30] hover:text-[#8a8c20] font-medium">
                        +91 96675 15523
                    </a>
                    </motion.div>
                </div>
                </div>
            </section>

            {/* Department Emails Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Department Contacts
                    </h2>
                    <p className="text-gray-300 text-lg">
                    Connect directly with the right department for faster assistance
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departments.map((dept, index) => (
                    <motion.div
                        key={dept.name}
                        className={`bg-gradient-to-br ${dept.color} p-1 rounded-2xl hover:scale-105 transition-all duration-300`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-gray-900 rounded-xl p-6 h-full">
                        <div className="text-3xl mb-4">{dept.icon}</div>
                        <h3 className="text-xl font-bold text-white mb-2">{dept.name}</h3>
                        <p className="text-gray-300 text-sm mb-4">{dept.description}</p>
                        <a 
                            href={`mailto:${dept.email}`}
                            className="text-white font-medium hover:text-gray-300 transition-colors break-all"
                        >
                            {dept.email}
                        </a>
                        </div>
                    </motion.div>
                    ))}
                </div>
                </div>
            </section>

            {/* Corporate Office Address */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Corporate Office
                    </h2>
                    <p className="text-gray-300 text-lg">
                    Visit us at our headquarters
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 border border-gray-700 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="text-5xl mb-6">🏢</div>
                    <h3 className="text-3xl font-bold text-white mb-6">Bonhoeffer Machines Pvt. Ltd.</h3>
                    
                    <div className="space-y-4 text-gray-300 text-lg">
                    <p>Plot No. 756, 2nd Floor, Udyog Vihar Phase -5</p>
                    <p>Gurugram, Haryana 122001</p>
                    <p>India</p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-700">
                    <h4 className="text-2xl font-bold text-white mb-4">Business Hours</h4>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-gray-300">
                        <div>
                        <p className="font-medium text-lg">Monday - Friday</p>
                        <p>10:00 AM - 6:00 PM IST</p>
                        </div>
                        {/* <div>
                        <p className="font-medium">Saturday</p>
                        <p>9:00 AM - 1:00 PM IST</p>
                        </div> */}
                    </div>
                    </div>

                        <motion.button
                      className="mt-8 bg-[#9a9c30] text-white px-8 py-3 rounded-full font-medium hover:bg-[#8a8c20] transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open('https://maps.app.goo.gl/YFtj4tyftwo91y8w6', '_blank')}
                    >
                      📍 View on Google Maps
                    </motion.button>
                  </motion.div>
                </div>
              </section>
    </BgLayout>
  );
      }

      export default ContactPage;