"use client"
import BgLayout from '@/components/templates/bgLayout'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import jobsData from './jobs.json'

function CareersPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    profileInterested: '',
    contactNumber: '',
    email: '',
    resume: null,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0); // Track which core value is selected
  const [expandedJobs, setExpandedJobs] = useState({}); // Track which job descriptions are expanded

  const scrollToForm = () => {
    const formSection = document.getElementById('application-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleJobDescription = (jobId) => {
    setExpandedJobs(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare form data for Firebase submission (without file upload)
      const submissionData = {
        fullName: formData.fullName,
        profileInterested: formData.profileInterested,
        contactNumber: formData.contactNumber,
        email: formData.email,
        message: formData.message,
        resumeFileName: formData.resume ? formData.resume.name : null,
        resumeSize: formData.resume ? formData.resume.size : null,
        submissionTime: new Date().toISOString(),
        hasResume: formData.resume ? 'Yes' : 'No',
        note: 'Resume file sent via email through formsubmit.co'
      };

      // Submit to Firebase (form data only)
      try {
        const response = await fetch('/api/firebase-submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData)
        });
        
        const result = await response.json();
        if (response.ok) {
          console.log('Firebase submission successful:', result);
        } else {
          console.error('Firebase submission failed:', result);
        }
      } catch (firebaseError) {
        console.error('Firebase submission failed:', firebaseError);
      }

      // Submit to formsubmit.co (with file)
      const formSubmitData = new FormData();
      formSubmitData.append('name', formData.fullName);
      formSubmitData.append('email', formData.email);
      formSubmitData.append('phone', formData.contactNumber);
      formSubmitData.append('position', formData.profileInterested);
      formSubmitData.append('message', formData.message || 'No additional message provided');
      formSubmitData.append('_subject', `Career Application: ${formData.profileInterested} - ${formData.fullName}`);
      
      if (formData.resume) {
        formSubmitData.append('resume', formData.resume);
      }

      const formSubmitResponse = await fetch('https://formsubmit.co/scmintern7@gmail.com', {
        method: 'POST',
        body: formSubmitData
      });

      if (formSubmitResponse.ok) {
        // Success message
        alert('Application submitted successfully! We will get back to you soon.');
        
        // Reset form
        setFormData({
          fullName: '',
          profileInterested: '',
          contactNumber: '',
          email: '',
          resume: null,
          message: ''
        });
        
        // Reset file input
        const fileInput = document.getElementById('resume');
        if (fileInput) {
          fileInput.value = '';
        }
        
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: "👥", title: "Employee friendly Policies", description: "Comprehensive policies that prioritize employee well-being" },
    { icon: "📈", title: "Internal Career Mobility", description: "Growth opportunities within the organization" },
    { icon: "🎉", title: "Team outings & Annual Celebration", description: "Regular team building activities and celebrations" },
    { icon: "🏥", title: "Medical Insurance", description: "Complete healthcare coverage for you and your family" },
    { icon: "👨‍👩‍👧‍👦", title: "Health Benefits extended to parents", description: "Healthcare coverage for your parents" },
    { icon: "☕", title: "Inhouse Cafe", description: "On-site dining facilities to satisfy your taste buds" },
    { icon: "💰", title: "Saving and retirement guidance", description: "Financial planning and retirement support" },
    { icon: "🏆", title: "Rewards & Recognition", description: "Regular appreciation and recognition programs" },
    { icon: "🎂", title: "Birthday Celebration", description: "Special celebrations for every team member" },
    { icon: "🏥", title: "Annual Medical Camps", description: "Regular health checkups and medical camps" },
    { icon: "💸", title: "Performance Incentives", description: "Rewards based on performance achievements" },
    { icon: "🎮", title: "Recreational Area", description: "Dedicated spaces for relaxation and recreation" },
    { icon: "👶", title: "Maternity, Paternity & Adoption leaves", description: "Comprehensive leave policies for family needs" },
    { icon: "🍵", title: "Running tea, Coffee, lemon drinks etc", description: "Complimentary beverages throughout the day" },
    { icon: "⏰", title: "Flexible working hours", description: "Work-life balance with flexible schedules" },
    { icon: "📅", title: "5 days working", description: "Balanced work week with weekends off" },
    { icon: "🚗", title: "Parking Space", description: "Convenient parking facilities for employees" },
    { icon: "⚖️", title: "Work Life balance", description: "Policies that support healthy work-life integration" },
    { icon: "🗣️", title: "Employee Advocacy", description: "Strong support system for employee concerns" },
    { icon: "🌈", title: "Workplace diversity and inclusion", description: "Inclusive environment celebrating diversity" },
    { icon: "📚", title: "Training and development programs", description: "Continuous learning and skill development" },
    { icon: "📊", title: "Employee survey and feedback", description: "Regular feedback mechanisms for improvement" }
  ];

  const coreValues = [
    {
      title: "Join our Team",
      description: "At Bonhoeffer Machines, we are a community of passionate individuals who value innovation and embrace change. We encourage our team members to challenge conventional wisdom, bringing forth more efficient and effective ways to accomplish tasks. Your voice counts, no matter where you are in your career journey. Join us and be part of a team that welcomes novel ideas and strives for excellence.",
      icon: "🚀"
    },
    {
      title: "Efficient Collaboration and Teamwork",
      description: "Teamwork is not just a buzzword at Bonhoeffer Machines; it is at the core of our operations. We recognise the strength of combining diverse skills, perspectives, and experiences. The best outcomes are achieved by nurturing an environment of collaboration and cooperation. Our teams work together efficiently, leveraging each other's strengths to drive success and deliver excellence.",
      icon: "🤝"
    },
    {
      title: "Inclusive Workplace Culture",
      description: "At Bonhoeffer Machines, we're committed to creating an inclusive workplace where diversity is celebrated as a catalyst for creativity and growth. We value and respect every individual, regardless of age, gender, color, religion, or sexual orientation. Our commitment to diversity is reflected in our actions and how we conduct business.",
      icon: "🌍"
    },
    {
      title: "Professional Growth and Development",
      description: "We are invested in the success and growth of our team members. At Bonhoeffer Machines, you will have access to a range of professional development opportunities, including training programs, mentorship initiatives, and career advancement prospects. We believe in nurturing talent, providing the necessary resources, and encouraging a supportive environment for personal and professional growth.",
      icon: "📚"
    },
    {
      title: "Make an Impact",
      description: "Join our team at Bonhoeffer Machines and help shape the future of agriculture and power product. Contribute to developing innovative machinery, revolutionise agriculture automation, and make a positive environmental impact. Together, we can drive towards a sustainable and electrifying future.",
      icon: "🌱"
    }
  ];

  return (
    <BgLayout>
      {/* Mobile header spacer */}
      <div className="block lg:hidden" style={{ height: '4em' }} aria-hidden="true" />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[60vh] flex items-center justify-center mt-5">
        <div className="absolute inset-0">
          <Image
            src="https://bonhoeffermachines.com/en/public/images/about/career-banner-new.webp"
            alt="Careers at Bonhoeffer Machines"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <motion.div 
          className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Build Your <span className="text-[#989b2e]">Career</span> With Us
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Join our innovative team and be part of the future of agricultural machinery
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-1 left-1/2 -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg className="w-10 h-10 text-[#989b2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Core Values Section */}
      <section className="py-5 md:py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-[#989b2e]">Bonhoeffer Machines</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Discover what makes our workplace culture unique and why talented individuals choose to build their careers with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Values List */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border-l-4 ${
                    selectedValue === index 
                      ? 'bg-[#989b2e]/20 border-[#989b2e] text-white' 
                      : 'bg-gray-900/50 border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:border-[#989b2e]/50'
                  }`}
                  onMouseEnter={() => setSelectedValue(index)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{value.icon}</span>
                    <h3 className={`text-lg font-semibold transition-colors ${
                      selectedValue === index ? 'text-[#989b2e]' : 'text-white'
                    }`}>
                      {value.title}
                    </h3>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Right Side - Description */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8"
            >
              <motion.div
                key={selectedValue}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full flex flex-col"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-4xl sm:text-5xl">{coreValues[selectedValue].icon}</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#989b2e]">
                    {coreValues[selectedValue].title}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-base sm:text-lg flex-1">
                  {coreValues[selectedValue].description}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Current Job Openings Section */}
      <section className="py-5 md:py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Current <span className="text-[#989b2e]">Openings</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Explore exciting career opportunities and find the perfect role that matches your skills and aspirations.
            </p>
          </motion.div>

          {jobsData.jobs && jobsData.jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobsData.jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#989b2e]/50 transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#989b2e] mb-3">
                        {job.title}
                      </h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-gray-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span className="text-sm font-medium text-[#989b2e]">{job.Salary}</span>
                        </div>
                      </div>
                      
                      {/* Job Description */}
                      {job.description && (
                        <div className="mb-4">
                          <div className="text-gray-300 text-sm leading-relaxed">
                            {expandedJobs[job.id] ? (
                              <div>
                                <p className="mb-3">{job.description}</p>
                                <button
                                  onClick={() => toggleJobDescription(job.id)}
                                  className="text-[#989b2e] hover:text-[#7a7d24] cursor-pointer text-xs font-medium transition-colors flex items-center space-x-1"
                                >
                                  <span>Show Less</span>
                                  <svg className="w-3 h-3 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <div>
                                <p className="mb-2">
                                  {job.description.length > 120 
                                    ? `${job.description.substring(0, 120)}...` 
                                    : job.description
                                  }
                                </p>
                                {job.description.length > 120 && (
                                  <button
                                    onClick={() => toggleJobDescription(job.id)}
                                    className="text-[#989b2e] hover:text-[#7a7d24] cursor-pointer text-xs font-medium transition-colors flex items-center space-x-1"
                                  >
                                    <span>See More</span>
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={scrollToForm}
                      className="w-full bg-[#989b2e] hover:bg-[#7a7d24] text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer duration-300 mt-4"
                    >
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-4">No Current Openings</h3>
                <p className="text-gray-300 mb-6">
                  We don&apos;t have any open positions at the moment, but we&apos;re always looking for talented individuals to join our team.
                </p>
                <p className="text-gray-300">
                  Feel free to submit your application below and we&apos;ll keep your profile for future opportunities.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-5 md:py-10 px-4 sm:px-6 ">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Why We Are <span className="text-[#989b2e]">Different</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive benefits and perks that set us apart from other employers
            </p>
          </motion.div>

          <div className="grid [@media(max-width:400px)]:grid-cols-1 [@media(min-width:401px)_and_(max-width:639px)]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-[#989b2e]/50 hover:scale-105 transition-all duration-300 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl sm:text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-[#989b2e] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="py-5 md:py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to <span className="text-[#989b2e]">Join Us?</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Take the first step towards an exciting career with Bonhoeffer Machines. Fill out the form below and let&apos;s start this journey together.
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-white font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#989b2e] focus:ring-1 focus:ring-[#989b2e] transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="profileInterested" className="block text-white font-medium mb-2">
                    Profile Interested In *
                  </label>
                  <input
                    type="text"
                    id="profileInterested"
                    name="profileInterested"
                    value={formData.profileInterested}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#989b2e] focus:ring-1 focus:ring-[#989b2e] transition-colors"
                    placeholder="e.g., Software Engineer, Marketing Manager, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactNumber" className="block text-white font-medium mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#989b2e] focus:ring-1 focus:ring-[#989b2e] transition-colors"
                    placeholder="Enter your contact number"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#989b2e] focus:ring-1 focus:ring-[#989b2e] transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="resume" className="block text-white font-medium mb-2">
                  Resume/CV *
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full px-4 py-3 cursor-pointer bg-gray-900 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#989b2e] file:text-white hover:file:bg-[#7a7d24] focus:outline-none focus:border-[#989b2e] focus:ring-1 focus:ring-[#989b2e] transition-colors"
                />
                <p className="text-gray-400 text-sm mt-1">
                  Upload your resume in PDF, DOC, or DOCX format (Max 5MB)
                </p>
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message (If any)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#989b2e] focus:ring-1 focus:ring-[#989b2e] transition-colors resize-vertical"
                  placeholder="Tell us why you'd like to join our team..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#989b2e] hover:bg-[#7a7d24] cursor-pointer text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 md:py-10 px-4 sm:px-6 ">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Shape the Future?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
              Join us in revolutionizing the agricultural machinery industry. Your journey towards an exciting and fulfilling career starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/about-us"
                className="bg-[#989b2e] hover:bg-[#7a7d24] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-300 inline-flex items-center justify-center space-x-2"
              >
                <span>About Us</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="/contact-us"
                className="border-2 border-[#989b2e] text-[#989b2e] hover:bg-[#989b2e] hover:text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-300 inline-flex items-center justify-center space-x-2"
              >
                <span>Contact HR</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </BgLayout>
  )
}

export default CareersPage