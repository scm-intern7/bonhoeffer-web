'use client'
import BgLayout from '@/components/templates/bgLayout'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

function SparePage() {
  // Spare parts data extracted from Spanish filenames and converted to English
  const sparePartsData = [
    // SPARE PARTS SECTION
    {
      id: 1,
      name: "Piston Kit",
      image: "/spare-parts/1_kit-de-piston.png",
      slug: "piston-kit",
      category: "spare-parts",
      label: "Engine Components"
    },
    {
      id: 2,
      name: "Piston Rings",
      image: "/spare-parts/2_anillos-de-piston.png",
      slug: "piston-rings",
      category: "spare-parts",
      label: "Engine Components"
    },
    {
      id: 3,
      name: "Carburetor",
      image: "/spare-parts/3_carburetor.png",
      slug: "carburetor",
      category: "spare-parts",
      label: "Fuel System"
    },
    {
      id: 4,
      name: "Carburetor Repair Kit",
      image: "/spare-parts/4_kit-de-reparacion-del-carburetor-.png",
      slug: "carburetor-repair-kit",
      category: "spare-parts",
      label: "Fuel System"
    },
    {
      id: 5,
      name: "Chainsaw Chain",
      image: "/spare-parts/5_cadena-de-motosierra.png",
      slug: "chainsaw-chain",
      category: "spare-parts",
      label: "Cutting Components"
    },
    {
      id: 6,
      name: "Fuel Hose & Primer Bulb",
      image: "/spare-parts/5_manguera-combustible-_-bulbo-de-imprimacion.png",
      slug: "fuel-hose-primer-bulb",
      category: "spare-parts",
      label: "Fuel System"
    },
    {
      id: 7,
      name: "Cylinder Kit",
      image: "/spare-parts/7_kit-de-cilindro.png",
      slug: "cylinder-kit", 
      category: "spare-parts",
      label: "Engine Components"
    },
    {
      id: 8,
      name: "Brush Cutter Head",
      image: "/spare-parts/8_cabezal-de-motoguadana.png",
      slug: "brush-cutter-head",
      category: "spare-parts",
      label: "Cutting Components"
    },
    {
      id: 9,
      name: "Head Spare Parts",
      image: "/spare-parts/9_repuestos-de-cabezal.png",
      slug: "head-spare-parts",
      category: "spare-parts",
      label: "Cutting Components"
    },
    {
      id: 10,
      name: "Brush Cutter Nylon",
      image: "/spare-parts/10_nyon-de-motoguadana.png",
      slug: "brush-cutter-nylon",
      category: "spare-parts",
      label: "Cutting Components"
    },
    {
      id: 11,
      name: "Chainsaw Bar",
      image: "/spare-parts/11_espada-de-motosierra.png",
      slug: "chainsaw-bar",
      category: "spare-parts",
      label: "Cutting Components"
    },
    {
      id: 12,
      name: "Hard Tip Bar",
      image: "/spare-parts/12_espada-con-punta-dura.png",
      slug: "hard-tip-bar",
      category: "spare-parts",
      label: "Cutting Components"
    },
    {
      id: 13,
      name: "Starter",
      image: "/spare-parts/13_arrancador.png",
      slug: "starter",
      category: "spare-parts",
      label: "Starting System"
    },
    {
      id: 14,
      name: "Starter Rope",
      image: "/spare-parts/14_cuerda-de-arranque.png",
      slug: "starter-rope",
      category: "spare-parts",
      label: "Starting System"
    },
    {
      id: 15,
      name: "Metal Wire Rope",
      image: "/spare-parts/15_cuerda-metallica-cuerda.png",
      slug: "metal-wire-rope",
      category: "spare-parts",
      label: "Starting System"
    },
    {
      id: 16,
      name: "Air Filter",
      image: "/spare-parts/16_filtro-de-aire.png",
      slug: "air-filter",
      category: "spare-parts",
      label: "Filtration System"
    },
    {
      id: 17,
      name: "Fuel Filter",
      image: "/spare-parts/17_filtro-de-combustible.png",
      slug: "fuel-filter",
      category: "spare-parts",
      label: "Filtration System"
    },
    {
      id: 18,
      name: "Oil Pump",
      image: "/spare-parts/18_bomba-de-aciete.png",
      slug: "oil-pump",
      category: "spare-parts",
      label: "Lubrication System"
    },
    {
      id: 19,
      name: "Pinion",
      image: "/spare-parts/19_pinion.png",
      slug: "pinion",
      category: "spare-parts",
      label: "Drive System"
    },
    {
      id: 20,
      name: "Pinion with Rim",
      image: "/spare-parts/20_pinion-con-rim.png",
      slug: "pinion-with-rim",
      category: "spare-parts",
      label: "Drive System"
    },
    {
      id: 21,
      name: "Clutch Drum",
      image: "/spare-parts/21_emberague-tambor-de-emberague.png",
      slug: "clutch-drum",
      category: "spare-parts",
      label: "Drive System"
    },
    {
      id: 22,
      name: "Clutch Bell",
      image: "/spare-parts/22_campana-de-clutch.png",
      slug: "clutch-bell",
      category: "spare-parts",
      label: "Drive System"
    },
    {
      id: 23,
      name: "Gearbox",
      image: "/spare-parts/23_caja-de-engranaje.png",
      slug: "gearbox",
      category: "spare-parts",
      label: "Drive System"
    },
    {
      id: 24,
      name: "Gearbox Parts",
      image: "/spare-parts/24_repuestos-de-caja-de-engranaje.png",
      slug: "gearbox-parts",
      category: "spare-parts",
      label: "Drive System"
    },
    {
      id: 25,
      name: "Mounting",
      image: "/spare-parts/25_montaje.png",
      slug: "mounting",
      category: "spare-parts",
      label: "Assembly Parts"
    },
    {
      id: 26,
      name: "Ignition Coil",
      image: "/spare-parts/26_bobina-de-encendido.png",
      slug: "ignition-coil",
      category: "spare-parts",
      label: "Ignition System"
    },
    {
      id: 27,
      name: "Crankshaft",
      image: "/spare-parts/27_ciguenal.png",
      slug: "crankshaft",
      category: "spare-parts",
      label: "Engine Components"
    },
    {
      id: 28,
      name: "Brush Cutter Shaft",
      image: "/spare-parts/28_eje-para-motoguadana.png",
      slug: "brush-cutter-shaft",
      category: "spare-parts",
      label: "Drive System"
    },
    {
      id: 29,
      name: "2-3 Teeth Blades",
      image: "/spare-parts/29_cuchillas-de-2-3-dientes-para-motoguadana.png",
      slug: "2-3-teeth-blades",
      category: "spare-parts",
      label: "Cutting Components"
    },
    {
      id: 30,
      name: "Round Blades",
      image: "/spare-parts/30_cuchillas-redondas-para-motoguadana.png",
      slug: "round-blades",
      category: "spare-parts",
      label: "Cutting Components"
    },
    {
      id: 31,
      name: "Rubber Parts",
      image: "/spare-parts/31_partes-de-goma-motosierra-china.png",
      slug: "rubber-parts",
      category: "spare-parts",
      label: "Sealing & Gaskets"
    },
    {
      id: 40,
      name: "Bearings",
      image: "/spare-parts/40_rodamientos-baleeros.png",
      slug: "bearings",
      category: "spare-parts",
      label: "Drive System"
    },
    {
      id: 41,
      name: "Chain Accessories",
      image: "/spare-parts/41_accesorios-de-cadena-de-motosierra.png",
      slug: "chain-accessories",
      category: "spare-parts",
      label: "Cutting Components"
    },
    {
      id: 42,
      name: "Spark Plugs",
      image: "/spare-parts/42_bujias.png",
      slug: "spark-plugs",
      category: "spare-parts",
      label: "Ignition System"
    },

    // ACCESSORIES SECTION
    {
      id: 32,
      name: "Irrigation Hose",
      image: "/spare-parts/32_manguera-de-riego.png",
      slug: "irrigation-hose",
      category: "accessories",
      label: "Garden Accessories"
    },
    {
      id: 33,
      name: "Expandable Garden Hose",
      image: "/spare-parts/33_mangeura-de-jardin-expandible.png",
      slug: "expandable-garden-hose",
      category: "accessories",
      label: "Garden Accessories"
    },
    {
      id: 34,
      name: "Aluminum Couplings",
      image: "/spare-parts/34_acoples-aluminio.png",
      slug: "aluminum-couplings",
      category: "accessories",
      label: "Connection Parts"
    },
    {
      id: 35,
      name: "Aluminum Coupling Joint",
      image: "/spare-parts/35_junta-de-acoplamiento-de-aluminio.png",
      slug: "aluminum-coupling-joint",
      category: "accessories",
      label: "Connection Parts"
    },
    {
      id: 36,
      name: "Professional Harness",
      image: "/spare-parts/36_arnes-profesional-para-motoguadana.png",
      slug: "professional-harness",
      category: "accessories",
      label: "Safety Equipment"
    },
    {
      id: 37,
      name: "Lawn Mower Wheels",
      image: "/spare-parts/37_llantas-para-cortacesped.png",
      slug: "lawn-mower-wheels",
      category: "accessories",
      label: "Mower Parts"
    },
    {
      id: 38,
      name: "High Pressure Spray Hose",
      image: "/spare-parts/38_manguera-de-fumigacion-de-alta-presion.png",
      slug: "high-pressure-spray-hose",
      category: "accessories",
      label: "Spraying Equipment"
    },
    {
      id: 39,
      name: "Spraying Parts",
      image: "/spare-parts/39_repuestos-de-fumigacion.png",
      slug: "spraying-parts",
      category: "accessories",
      label: "Spraying Equipment"
    },
    {
      id: 44,
      name: "Air Gun",
      image: "/spare-parts/44_pistola-de-aire.png",
      slug: "air-gun",
      category: "accessories",
      label: "Tools"
    },
    {
      id: 47,
      name: "Garden Tools",
      image: "/spare-parts/47_herramient-as-de-jardin.png",
      slug: "garden-tools",
      category: "accessories",
      label: "Garden Accessories"
    },
    {
      id: 48,
      name: "Long Tail Propeller",
      image: "/spare-parts/48_helice-de-cola-larga.png",
      slug: "long-tail-propeller",
      category: "accessories",
      label: "Boat Parts"
    },
    {
      id: 49,
      name: "Eye Protection",
      image: "/spare-parts/49_proteccion-para-los-ojos.png",
      slug: "eye-protection",
      category: "accessories",
      label: "Safety Equipment"
    },
    {
      id: 50,
      name: "Head Protection & Helmet",
      image: "/spare-parts/50_proteccion-para-la-cabeza-combinacion-de-casco.png",
      slug: "head-protection-helmet",
      category: "accessories",
      label: "Safety Equipment"
    },
    {
      id: 51,
      name: "Drill",
      image: "/spare-parts/51_drill.png",
      slug: "drill",
      category: "accessories",
      label: "Tools"
    },
    {
      id: 52,
      name: "Respiratory Protection",
      image: "/spare-parts/51_proteccion-respiratoria.png",
      slug: "respiratory-protection",
      category: "accessories",
      label: "Safety Equipment"
    },
    {
      id: 53,
      name: "Electrodes & Wire",
      image: "/spare-parts/52_electrodes-and-wire.png",
      slug: "electrodes-wire",
      category: "accessories",
      label: "Welding Equipment"
    },
    {
      id: 54,
      name: "Face Protection",
      image: "/spare-parts/53_protección-facial.png",
      slug: "face-protection",
      category: "accessories",
      label: "Safety Equipment"
    }
  ];

  const sparePartsItems = sparePartsData.filter(item => item.category === 'spare-parts');
  const accessoriesItems = sparePartsData.filter(item => item.category === 'accessories');

  return (
    <BgLayout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mt-5">
        <div className="absolute inset-0">
          <Image
            src="/spare-parts/spare-parts-banner.webp"
            alt="Spare Parts Banner"
            fill
            className="object-cover"
            priority
          />
          {/* <div className="absolute inset-0 bg-black/60" /> */}
        </div>
        
        {/* <motion.div 
          className="relative z-10 text-center text-white px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Spare <span className="text-[#989b2e]">Parts</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Genuine Parts & Accessories for Peak Performance
          </motion.p>
        </motion.div> */}
      </section>

      {/* Spare Parts Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#989b2e]">
              Spare Parts
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              High-quality replacement parts to keep your machinery running at peak performance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sparePartsItems.map((part, index) => (
              <motion.div
                key={part.id}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(152, 155, 46, 0.1)" }}
              >
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-white/5">
                  <Image
                    src={part.image}
                    alt={part.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="mb-4">
                  <span className="text-[#989b2e] text-xs font-medium bg-[#989b2e]/20 px-3 py-1 rounded-full">
                    {part.label}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#989b2e] transition-colors">
                  {part.name}
                </h3>
                
                <Link 
                  href={`/spare-parts/${part.slug}`}
                  className="inline-flex items-center justify-center w-full bg-[#989b2e] hover:bg-[#8a8c20] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 group-hover:scale-105"
                >
                  View More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessories Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#989b2e]">
              Accessories
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Essential accessories and tools to enhance your machinery's functionality
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {accessoriesItems.map((accessory, index) => (
              <motion.div
                key={accessory.id}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(152, 155, 46, 0.1)" }}
              >
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-white/5">
                  <Image
                    src={accessory.image}
                    alt={accessory.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="mb-4">
                  <span className="text-[#989b2e] text-xs font-medium bg-[#989b2e]/20 px-3 py-1 rounded-full">
                    {accessory.label}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#989b2e] transition-colors">
                  {accessory.name}
                </h3>
                
                <Link 
                  href={`/spare-parts/${accessory.slug}`}
                  className="inline-flex items-center justify-center w-full bg-[#989b2e] hover:bg-[#8a8c20] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 group-hover:scale-105"
                >
                  View More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </BgLayout>
  )
}

export default SparePage