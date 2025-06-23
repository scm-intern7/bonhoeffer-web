'use client'
import BgLayout from '@/components/templates/bgLayout'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

function PartSpecificPage() {
  const params = useParams();
  const slug = params.slug;

  // Mock data for different models of each spare part
  const getPartModels = (partSlug) => {
    const commonModels = {
      'piston-kit': [
        { id: 1, name: 'Universal Piston Kit 45mm', compatible: 'Chainsaw Models: CS-4500, CS-5200', price: '$45', code: 'PK-45-001' },
        { id: 2, name: 'Heavy Duty Piston Kit 52mm', compatible: 'Chainsaw Models: CS-5800, CS-6200', price: '$65', code: 'PK-52-002' },
        { id: 3, name: 'Professional Piston Kit 58mm', compatible: 'Chainsaw Models: CS-6500, CS-7200', price: '$85', code: 'PK-58-003' },
        { id: 4, name: 'Commercial Piston Kit 62mm', compatible: 'Heavy Duty Models: HD-7500, HD-8200', price: '$120', code: 'PK-62-004' }
      ],
      'carburetor': [
        { id: 1, name: 'Standard Carburetor', compatible: 'Brush Cutters: BC-260, BC-330', price: '$35', code: 'CB-STD-001' },
        { id: 2, name: 'High Performance Carburetor', compatible: 'Chainsaws: CS-4500, CS-5200', price: '$55', code: 'CB-HP-002' },
        { id: 3, name: 'Professional Carburetor', compatible: 'Industrial Models: IN-6500, IN-7200', price: '$75', code: 'CB-PRO-003' },
        { id: 4, name: 'Racing Carburetor', compatible: 'Competition Models: RC-8000, RC-9000', price: '$150', code: 'CB-RC-004' }
      ],
      'air-filter': [
        { id: 1, name: 'Foam Air Filter', compatible: 'All Small Engine Models', price: '$8', code: 'AF-FOAM-001' },
        { id: 2, name: 'Paper Air Filter', compatible: 'Medium Duty Models: MD-4000-6000', price: '$12', code: 'AF-PAPER-002' },
        { id: 3, name: 'Heavy Duty Air Filter', compatible: 'Industrial Models: HD-7000+', price: '$18', code: 'AF-HD-003' },
        { id: 4, name: 'High Flow Air Filter', compatible: 'Performance Models: PF-5000+', price: '$25', code: 'AF-HF-004' }
      ],
      'spark-plugs': [
        { id: 1, name: 'Standard Spark Plug', compatible: 'All 2-Stroke Engines', price: '$6', code: 'SP-STD-001' },
        { id: 2, name: 'Iridium Spark Plug', compatible: 'High Performance Engines', price: '$15', code: 'SP-IR-002' },
        { id: 3, name: 'Platinum Spark Plug', compatible: 'Professional Grade Engines', price: '$12', code: 'SP-PT-003' },
        { id: 4, name: 'Racing Spark Plug', compatible: 'Competition Engines', price: '$25', code: 'SP-RC-004' }
      ]
    };

    // Default models for parts not specifically defined
    const defaultModels = [
      { id: 1, name: `Standard ${getPartName(partSlug)}`, compatible: 'Compatible with most models', price: '$25', code: 'STD-001' },
      { id: 2, name: `Professional ${getPartName(partSlug)}`, compatible: 'Professional grade equipment', price: '$45', code: 'PRO-002' },
      { id: 3, name: `Heavy Duty ${getPartName(partSlug)}`, compatible: 'Industrial applications', price: '$65', code: 'HD-003' },
      { id: 4, name: `Premium ${getPartName(partSlug)}`, compatible: 'High-end machinery', price: '$85', code: 'PREM-004' }
    ];

    return commonModels[partSlug] || defaultModels;
  };

  const getPartName = (slug) => {
    const nameMap = {
      'piston-kit': 'Piston Kit',
      'piston-rings': 'Piston Rings',
      'carburetor': 'Carburetor',
      'carburetor-repair-kit': 'Carburetor Repair Kit',
      'chainsaw-chain': 'Chainsaw Chain',
      'fuel-hose-primer-bulb': 'Fuel Hose & Primer Bulb',
      'cylinder-kit': 'Cylinder Kit',
      'brush-cutter-head': 'Brush Cutter Head',
      'head-spare-parts': 'Head Spare Parts',
      'brush-cutter-nylon': 'Brush Cutter Nylon',
      'chainsaw-bar': 'Chainsaw Bar',
      'hard-tip-bar': 'Hard Tip Bar',
      'starter': 'Starter',
      'starter-rope': 'Starter Rope',
      'metal-wire-rope': 'Metal Wire Rope',
      'air-filter': 'Air Filter',
      'fuel-filter': 'Fuel Filter',
      'oil-pump': 'Oil Pump',
      'pinion': 'Pinion',
      'pinion-with-rim': 'Pinion with Rim',
      'clutch-drum': 'Clutch Drum',
      'clutch-bell': 'Clutch Bell',
      'gearbox': 'Gearbox',
      'gearbox-parts': 'Gearbox Parts',
      'mounting': 'Mounting',
      'ignition-coil': 'Ignition Coil',
      'crankshaft': 'Crankshaft',
      'brush-cutter-shaft': 'Brush Cutter Shaft',
      '2-3-teeth-blades': '2-3 Teeth Blades',
      'round-blades': 'Round Blades',
      'rubber-parts': 'Rubber Parts',
      'bearings': 'Bearings',
      'chain-accessories': 'Chain Accessories',
      'spark-plugs': 'Spark Plugs',
      'irrigation-hose': 'Irrigation Hose',
      'expandable-garden-hose': 'Expandable Garden Hose',
      'aluminum-couplings': 'Aluminum Couplings',
      'aluminum-coupling-joint': 'Aluminum Coupling Joint',
      'professional-harness': 'Professional Harness',
      'lawn-mower-wheels': 'Lawn Mower Wheels',
      'high-pressure-spray-hose': 'High Pressure Spray Hose',
      'spraying-parts': 'Spraying Parts',
      'air-gun': 'Air Gun',
      'garden-tools': 'Garden Tools',
      'long-tail-propeller': 'Long Tail Propeller',
      'eye-protection': 'Eye Protection',
      'head-protection-helmet': 'Head Protection & Helmet',
      'drill': 'Drill',
      'respiratory-protection': 'Respiratory Protection',
      'electrodes-wire': 'Electrodes & Wire',
      'face-protection': 'Face Protection'
    };
    return nameMap[slug] || 'Spare Part';
  };

  const getPartImage = (slug) => {
    const imageMap = {
      'piston-kit': 'https://bonhoeffermachines.com/en/public/parts-category/1_kit-de-piston.png',
      'piston-rings': 'https://bonhoeffermachines.com/en/public/parts-category/2_anillos-de-piston.png',
      'carburetor': 'https://bonhoeffermachines.com/en/public/parts-category/3_carburetor.png',
      'carburetor-repair-kit': 'https://bonhoeffermachines.com/en/public/parts-category/4_kit-de-reparacion-del-carburetor-.png',
      'chainsaw-chain': 'https://bonhoeffermachines.com/en/public/parts-category/5_cadena-de-motosierra.png',
      'fuel-hose-primer-bulb': 'https://bonhoeffermachines.com/en/public/parts-category/5_manguera-combustible-_-bulbo-de-imprimacion.png',
      'cylinder-kit': 'https://bonhoeffermachines.com/en/public/parts-category/7_kit-de-cilindro.png',
      'brush-cutter-head': 'https://bonhoeffermachines.com/en/public/parts-category/8_cabezal-de-motoguadana.png',
      'head-spare-parts': 'https://bonhoeffermachines.com/en/public/parts-category/9_repuestos-de-cabezal.png',
      'brush-cutter-nylon': 'https://bonhoeffermachines.com/en/public/parts-category/10_nyon-de-motoguadana.png',
      'chainsaw-bar': 'https://bonhoeffermachines.com/en/public/parts-category/11_espada-de-motosierra.png',
      'hard-tip-bar': 'https://bonhoeffermachines.com/en/public/parts-category/12_espada-con-punta-dura.png',
      'starter': 'https://bonhoeffermachines.com/en/public/parts-category/13_arrancador.png',
      'starter-rope': 'https://bonhoeffermachines.com/en/public/parts-category/14_cuerda-de-arranque.png',
      'metal-wire-rope': 'https://bonhoeffermachines.com/en/public/parts-category/15_cuerda-metallica-cuerda.png',
      'air-filter': 'https://bonhoeffermachines.com/en/public/parts-category/16_filtro-de-aire.png',
      'fuel-filter': 'https://bonhoeffermachines.com/en/public/parts-category/17_filtro-de-combustible.png',
      'oil-pump': 'https://bonhoeffermachines.com/en/public/parts-category/18_bomba-de-aciete.png',
      'pinion': 'https://bonhoeffermachines.com/en/public/parts-category/19_pinion.png',
      'pinion-with-rim': 'https://bonhoeffermachines.com/en/public/parts-category/20_pinion-con-rim.png',
      'clutch-drum': 'https://bonhoeffermachines.com/en/public/parts-category/21_emberague-tambor-de-emberague.png',
      'clutch-bell': 'https://bonhoeffermachines.com/en/public/parts-category/22_campana-de-clutch.png',
      'gearbox': 'https://bonhoeffermachines.com/en/public/parts-category/23_caja-de-engranaje.png',
      'gearbox-parts': 'https://bonhoeffermachines.com/en/public/parts-category/24_repuestos-de-caja-de-engranaje.png',
      'mounting': 'https://bonhoeffermachines.com/en/public/parts-category/25_montaje.png',
      'ignition-coil': 'https://bonhoeffermachines.com/en/public/parts-category/26_bobina-de-encendido.png',
      'crankshaft': 'https://bonhoeffermachines.com/en/public/parts-category/27_ciguenal.png',
      'brush-cutter-shaft': 'https://bonhoeffermachines.com/en/public/parts-category/28_eje-para-motoguadana.png',
      '2-3-teeth-blades': 'https://bonhoeffermachines.com/en/public/parts-category/29_cuchillas-de-2-3-dientes-para-motoguadana.png',
      'round-blades': 'https://bonhoeffermachines.com/en/public/parts-category/30_cuchillas-redondas-para-motoguadana.png',
      'rubber-parts': 'https://bonhoeffermachines.com/en/public/parts-category/31_partes-de-goma-motosierra-china.png',
      'bearings': 'https://bonhoeffermachines.com/en/public/parts-category/40_rodamientos-baleeros.png',
      'chain-accessories': 'https://bonhoeffermachines.com/en/public/parts-category/41_accesorios-de-cadena-de-motosierra.png',
      'spark-plugs': 'https://bonhoeffermachines.com/en/public/parts-category/42_bujias.png',
      'irrigation-hose': 'https://bonhoeffermachines.com/en/public/parts-category/32_manguera-de-riego.png',
      'expandable-garden-hose': 'https://bonhoeffermachines.com/en/public/parts-category/33_mangeura-de-jardin-expandible.png',
      'aluminum-couplings': 'https://bonhoeffermachines.com/en/public/parts-category/34_acoples-aluminio.png',
      'aluminum-coupling-joint': 'https://bonhoeffermachines.com/en/public/parts-category/35_junta-de-acoplamiento-de-aluminio.png',
      'professional-harness': 'https://bonhoeffermachines.com/en/public/parts-category/36_arnes-profesional-para-motoguadana.png',
      'lawn-mower-wheels': 'https://bonhoeffermachines.com/en/public/parts-category/37_llantas-para-cortacesped.png',
      'high-pressure-spray-hose': 'https://bonhoeffermachines.com/en/public/parts-category/38_manguera-de-fumigacion-de-alta-presion.png',
      'spraying-parts': 'https://bonhoeffermachines.com/en/public/parts-category/39_repuestos-de-fumigacion.png',
      'air-gun': 'https://bonhoeffermachines.com/en/public/parts-category/44_pistola-de-aire.png',
      'garden-tools': 'https://bonhoeffermachines.com/en/public/parts-category/47_herramient-as-de-jardin.png',
      'long-tail-propeller': 'https://bonhoeffermachines.com/en/public/parts-category/48_helice-de-cola-larga.png',
      'eye-protection': 'https://bonhoeffermachines.com/en/public/parts-category/49_proteccion-para-los-ojos.png',
      'head-protection-helmet': 'https://bonhoeffermachines.com/en/public/parts-category/50_proteccion-para-la-cabeza-combinacion-de-casco.png',
      'drill': 'https://bonhoeffermachines.com/en/public/parts-category/51_drill.png',
      'respiratory-protection': 'https://bonhoeffermachines.com/en/public/parts-category/51_proteccion-respiratoria.png',
      'electrodes-wire': 'https://bonhoeffermachines.com/en/public/parts-category/52_electrodes-and-wire.png',
      'face-protection': 'https://bonhoeffermachines.com/en/public/parts-category/53_protección-facial.png'
    };
    return imageMap[slug] || 'https://bonhoeffermachines.com/en/public/parts-category/1_kit-de-piston.png';
  };

  const partName = getPartName(slug);
  const partImage = getPartImage(slug);
  const models = getPartModels(slug);

  return (
    <BgLayout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mt-5">
        <div className="absolute inset-0">
          <Image
            src="https://bonhoeffermachines.com/en/public/images/spare-parts-banner-india.webp"
            alt="Spare Parts Banner"
            fill
            className="object-cover"
            priority
          />
          {/* <div className="absolute inset-0 bg-black/70" /> */}
        </div>
        
        {/* <motion.div 
          className="relative z-10 text-center text-white px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="text-[#989b2e]">{partName}</span> Models
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Choose from our range of high-quality {partName.toLowerCase()} models
          </motion.p>
        </motion.div> */}
      </section>

      {/* Models Grid Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Available <span className="text-[#989b2e]">Models</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Select the perfect {partName.toLowerCase()} model for your machinery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {models.map((model, index) => (
              <motion.div
                key={model.id}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(152, 155, 46, 0.1)" }}
              >
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-white/5">
                  <Image
                    src={partImage}
                    alt={model.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="mb-4">
                  <span className="text-[#989b2e] text-xs font-medium bg-[#989b2e]/20 px-3 py-1 rounded-full">
                    {model.code}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#989b2e] transition-colors">
                  {model.name}
                </h3>
                
                <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                  {model.compatible}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#989b2e] font-bold text-lg">{model.price}</span>
                </div>
                
                <Link 
                  href={`/spare-parts/${slug}/${model.code.toLowerCase()}`}
                  className="inline-flex items-center justify-center w-full bg-[#989b2e] hover:bg-[#8a8c20] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 group-hover:scale-105"
                >
                  View Details
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Spare Parts */}
      <section className="py-10 px-6 text-center">
        <Link 
          href="/spare-parts"
          className="inline-flex items-center text-[#989b2e] hover:text-white transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Spare Parts
        </Link>
      </section>
    </BgLayout>
  )
}

export default PartSpecificPage
