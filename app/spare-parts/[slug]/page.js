'use client'
import BgLayout from '@/components/templates/bgLayout'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

function PartSpecificPage() {
  const params = useParams();
  const slug = params.slug;
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch models from Notion API
  useEffect(() => {
    async function fetchModels() {
      try {
        const response = await fetch(`/api/spare-parts/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch models data');
        }
        const result = await response.json();
        
        if (result.success) {
          setModels(result.data);
        } else {
          throw new Error(result.error || 'Failed to fetch data');
        }
      } catch (err) {
        console.error('Error fetching models:', err);
        setError(err.message);
        // Set fallback data
        setModels(getDefaultModels(slug));
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchModels();
    }
  }, [slug]);


  const getPartName = (slug) => {
      const nameMap = {
        'starter-spring': 'Starter Spring',
        'air-filter': 'Air Filter',
        'fuel-filter': 'Fuel Filter',
        'pinion': 'Pinion',
        'rim-sprocket': 'Rim Sprocket',
        'professional-harness': 'Professional Harness',
        'lawn-mower-wheels': 'Lawn Mower Wheels',
        'high-pressure-hose': 'High Pressure Hose',
        'sprayer-parts': 'Sprayer Parts',
        'ball-bearings': 'Ball Bearings',
        'chainsaw-accessories': 'Chainsaw Accessories',
        'spark-plug': 'Spark Plug',
        'air-gun': 'Air Gun',
        'garden-tools': 'Garden Tools',
        'long-tail-propeller': 'Long Tail Propeller',
        'eye-protection': 'Eye Protection',
        'head-protection': 'Head Protection',
        'respiratory-protection': 'Respiratory Protection',
        'drill': 'Drill',
        'electrodes-and-wire': 'Electrodes and Wire',
        'facial-protection': 'Facial Protection',
        'aluminum-coupling-joint': 'Aluminum Coupling Joint',
        // Legacy mappings for backwards compatibility
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
        'oil-pump': 'Oil Pump',
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
        'high-pressure-spray-hose': 'High Pressure Spray Hose',
        'spraying-parts': 'Spraying Parts',
        'head-protection-helmet': 'Head Protection & Helmet',
        'electrodes-wire': 'Electrodes & Wire',
        'face-protection': 'Face Protection'
      };
      return nameMap[slug] || 'Spare Part';
    };
    
    const getPartImage = (slug) => {
    const imageMap = {
      'starter-spring': 'https://bonhoeffermachines.com/en/public/parts-category/starter-spring.png',
      'air-filter': 'https://bonhoeffermachines.com/en/public/parts-category/16_filtro-de-aire.png',
      'fuel-filter': 'https://bonhoeffermachines.com/en/public/parts-category/17_filtro-de-combustible.png',
      'pinion': 'https://bonhoeffermachines.com/en/public/parts-category/19_pinion.png',
      'rim-sprocket': 'https://bonhoeffermachines.com/en/public/parts-category/rim-sprocket.png',
      'professional-harness': 'https://bonhoeffermachines.com/en/public/parts-category/36_arnes-profesional-para-motoguadana.png',
      'lawn-mower-wheels': 'https://bonhoeffermachines.com/en/public/parts-category/37_llantas-para-cortacesped.png',
      'high-pressure-hose': 'https://bonhoeffermachines.com/en/public/parts-category/38_manguera-de-fumigacion-de-alta-presion.png',
      'sprayer-parts': 'https://bonhoeffermachines.com/en/public/parts-category/39_repuestos-de-fumigacion.png',
      'ball-bearings': 'https://bonhoeffermachines.com/en/public/parts-category/40_rodamientos-baleeros.png',
      'chainsaw-accessories': 'https://bonhoeffermachines.com/en/public/parts-category/41_accesorios-de-cadena-de-motosierra.png',
      'spark-plug': 'https://bonhoeffermachines.com/en/public/parts-category/42_bujias.png',
      'air-gun': 'https://bonhoeffermachines.com/en/public/parts-category/44_pistola-de-aire.png',
      'garden-tools': 'https://bonhoeffermachines.com/en/public/parts-category/47_herramient-as-de-jardin.png',
      'long-tail-propeller': 'https://bonhoeffermachines.com/en/public/parts-category/48_helice-de-cola-larga.png',
      'eye-protection': 'https://bonhoeffermachines.com/en/public/parts-category/49_proteccion-para-los-ojos.png',
      'head-protection': 'https://bonhoeffermachines.com/en/public/parts-category/50_proteccion-para-la-cabeza-combinacion-de-casco.png',
      'respiratory-protection': 'https://bonhoeffermachines.com/en/public/parts-category/51_proteccion-respiratoria.png',
      'drill': 'https://bonhoeffermachines.com/en/public/parts-category/51_drill.png',
      'electrodes-and-wire': 'https://bonhoeffermachines.com/en/public/parts-category/52_electrodes-and-wire.png',
      'facial-protection': 'https://bonhoeffermachines.com/en/public/parts-category/53_protección-facial.png',
      'aluminum-coupling-joint': 'https://bonhoeffermachines.com/en/public/parts-category/35_junta-de-acoplamiento-de-aluminio.png',
      // Legacy mappings for backwards compatibility
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
      'oil-pump': 'https://bonhoeffermachines.com/en/public/parts-category/18_bomba-de-aciete.png',
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
      'high-pressure-spray-hose': 'https://bonhoeffermachines.com/en/public/parts-category/38_manguera-de-fumigacion-de-alta-presion.png',
      'spraying-parts': 'https://bonhoeffermachines.com/en/public/parts-category/39_repuestos-de-fumigacion.png',
      'head-protection-helmet': 'https://bonhoeffermachines.com/en/public/parts-category/50_proteccion-para-la-cabeza-combinacion-de-casco.png',
      'electrodes-wire': 'https://bonhoeffermachines.com/en/public/parts-category/52_electrodes-and-wire.png',
      'face-protection': 'https://bonhoeffermachines.com/en/public/parts-category/53_protección-facial.png'
    };
    return imageMap[slug] || 'https://bonhoeffermachines.com/en/public/parts-category/1_kit-de-piston.png';
  };
  // Fallback default models for parts not in JSON or if loading fails
  const getDefaultModels = (partSlug) => {
    return [
      { 
        id: `default-1`, 
        code: `STD-${partSlug.toUpperCase()}-001`,
        name: `Standard ${getPartName(partSlug)}`, 
        compatible: 'Compatible with most models',
        image: getPartImage(partSlug)
      },
      { 
        id: `default-2`, 
        code: `PRO-${partSlug.toUpperCase()}-001`,
        name: `Professional ${getPartName(partSlug)}`, 
        compatible: 'Professional grade equipment',
        image: getPartImage(partSlug)
      },
      { 
        id: `default-3`, 
        code: `HD-${partSlug.toUpperCase()}-001`,
        name: `Heavy Duty ${getPartName(partSlug)}`, 
        compatible: 'Industrial applications',
        image: getPartImage(partSlug)
      },
      { 
        id: `default-4`, 
        code: `PREM-${partSlug.toUpperCase()}-001`,
        name: `Premium ${getPartName(partSlug)}`, 
        compatible: 'High-end machinery',
        image: getPartImage(partSlug)
      }
    ];
  };

  // Get models for the current slug from imported data
  const getModels = (partSlug) => {
    const partModels = modelsData[partSlug] || {};
    
    // Convert object to array format expected by the component
    const modelsArray = Object.entries(partModels).map(([code, modelData]) => ({
      id: code,
      code: code,
      name: modelData.name,
      compatible: modelData.compatible,
      image: modelData.image
    }));
    
    // Return models array or fallback to default if empty
    return modelsArray.length > 0 ? modelsArray : getDefaultModels(partSlug);
  };

  const partName = getPartName(slug);
  const partImage = getPartImage(slug);

  // Loading state
  if (loading) {
    return (
      <BgLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#989b2e] mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading models...</p>
          </div>
        </div>
      </BgLayout>
    );
  }

  // Error state (still show page with fallback data)
  if (error) {
    console.warn('Using fallback data due to error:', error);
  }

  return (
    <BgLayout>
      {/* Mobile header spacer for fixed header on mobile/tablet */}
      <div className="block lg:hidden" style={{ height: '4em' }} aria-hidden="true" />

      {/* Hero Section */}
      <section className="flex items-center justify-center overflow-hidden mt-5">
        <div className="">
          <img
            src="https://bonhoeffermachines.com/en/public/images/spare-parts-banner-india.webp"
            alt="Spare Parts Banner"
            // fill
            className="object-cover"
            // priority
          />
          {/* <div className="absolute inset-0 bg-black/10" /> */}
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
      <section className="pb-20 pt-5 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Available <span className="text-[#989b2e]">Models</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Select the perfect {partName.toLowerCase()} model for your machinery
            </p>
            {error && (
              <p className="text-sm text-yellow-400 mt-4 bg-yellow-400/20 px-4 py-2 rounded-full inline-block">
                Using fallback data - some models may not be current
              </p>
            )}
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
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-white">
                  <Image
                    src={model.image || partImage}
                    alt={model.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* <div className="mb-4">
                  <span className="text-[#989b2e] text-xs font-medium bg-[#989b2e]/20 px-3 py-1 rounded-full">
                    {model.code}
                  </span>
                </div> */}
                
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#989b2e] transition-colors">
                  {model.name}
                </h3>
                
                <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                  {model.compatible}
                </p>
                
                {/* <div className="flex items-center justify-between mb-4">
                  <span className="text-[#989b2e] font-bold text-lg">{model.price}</span>
                </div> */}
                
                <Link 
                  href={`/spare-parts/${slug}/${model.code || model.id}`}
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

// implement something like this but like in this example chainsaw-chain is used do this also for trimmer-head, chainsaw-oil-pump, clutch, brushcutter-clutch-housing-assembly, brushcutter-gear-head, spare-parts of