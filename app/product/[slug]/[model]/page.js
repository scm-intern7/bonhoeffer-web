'use client'
import BgLayout from '@/components/templates/bgLayout'
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

function ModelSpecificPage() {
  const params = useParams();
  const { slug, model } = params;
  const [activeView, setActiveView] = useState('specifications');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0); // For FAQ accordion

  const warranty36 = 'https://bonhoeffermachines.com/en/public/images/36-months.webp';
  const warranty12 = 'https://bonhoeffermachines.com/en/public/images/12-months.webp';
  const warranty15 = 'https://bonhoeffermachines.com/en/public/images/15-months.webp';
  const warranty24 = 'https://bonhoeffermachines.com/en/public/images/24-months.webp';
  const isoImage = 'https://bonhoeffermachines.com/en/public/images/iso.png';
  const fmttiImage = 'https://bonhoeffermachines.com/en/public/images/fmtti.webp';

  // Get model details based on slug and model
  const getModelDetails = (productSlug, modelName) => {
    const modelDetails = {
      'gasoline-water-pump': {
        'BON-P-WP1.0-31': {
          name: 'Gasoline Water Pump',
          model: 'BON-P-WP1.0-31',
          description: [
            {title: 'Compact and Powerful Pump', text: 'The BON-P-WP1.0-31 gasoline water pump is small but powerful, with a 2 HP engine running at 7000 rpm. It can pump up to 8,000 liters of water per hour, making it great for smaller jobs. The self-priming design and easy retractable start make it simple to use, perfect for home or light commercial use.'},
            {title: 'Lightweight and Durable', text: 'The BON-P-WP1.0-31 is built with strong but lightweight aluminum parts, making it easy to move around while still being tough. The carbon and ceramic mechanical seal helps prevent leaks, ensuring reliable operation. Whether you\'re watering the garden or pumping water from a well, this pump is a durable and dependable choice.'}
          ],
          descriptionImage: 'https://bonhoeffermachines.com/en/public/machines/specification_dark_1721129007_aa71a890cbda98df88c2.webp',
          showcaseImages: [
            'https://bonhoeffermachines.com/en/public/machines/showcase-2-bon-p-wp1.0-31.webp',
            'https://bonhoeffermachines.com/en/public/machines/showcase-1-bon-p-wp1.0-31.webp',
            'https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-wp1.0-31-4.webp'
          ],
          isBannerImage: false,
          bannerImage: '',
          isVideo: true,
          videoUrls: [
            {title: 'Troubleshoot', url:'https://www.youtube.com/embed/KDoZQKhpj00'},
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: 'https://bonhoeffermachines.com/en/public/machines/specification_left_1718186339_850cc03e19fb1858ca2f.webp',
          catalougeRight: 'https://bonhoeffermachines.com/en/public/machines/specification_light_1718186352_495c82b0719f1d7ed41c.webp',
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-water-pump.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-WP1.0-31.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-WP1.0-31.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-WP1.0-31.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: 'Pump Type', value: 'Self-priming' },
            { label: 'Maximum Power', value: '2 HP / 7000 rpm' },
            { label: 'Maximum Pumping Capacity', value: '8000 liters per hour' },
            { label: 'Starting System', value: 'Retractable' },
            { label: 'Suction Diameter', value: '1.0 inch' },
            { label: 'Discharge Diameter', value: '1.0 inch' },
            { label: 'Total Elevation', value: '29 meters' },
            { label: 'Suction Height', value: '7 meters' },
            { label: 'Fuel Tank Size', value: '0.5 liters' },
            { label: 'Recommended Oil', value: 'SAE10W-30' },
            { label: 'Compression Ratio', value: '8.0:1' },
            { label: 'Volute Material', value: 'Aluminum' },
            { label: 'Impeller Material', value: 'Aluminum' },
            { label: 'Mechanical Seal', value: 'Carbon/Ceramic' }
          ],
          features: [
            'OHV design enhances combustion efficiency',
            'Perfect for homeowners, gardeners, boat owners, and more',
            'Lightweight',
            'Garden hose adaptor, suction hose, clamps, and strainer included',
            'Advanced pump design for superior durability and performance',
            'Uses regular gasoline - no mixing of oil and gas!',
            'Easier priming',
            'Easy starting bonhoeffer mini 4-stroke commercial engine',
          ],
        },
        
        'BON-P-WP1.5-79': {
          name: 'Gasoline Water Pump',
          model: 'BON-P-WP1.5-79',
          description: [
            {
              title: 'Compact and Efficient Water Pump',
              text: 'The BON-P-WP1.5-79 is a compact centrifugal self-priming water pump designed for reliable and efficient performance. Featuring a 2 HP, 79 CC engine, this pump delivers a maximum discharge of 13,000 L/hr with a 15 m total head and 6 m suction lift. The recoil start system and 24 kg dry weight make it easy to operate and transport.'
            },
            {
              title: 'Durable Pump and Great Choice for Industrial Applications',
              text: 'Built for durability, it includes a 4‑vane cast iron impeller and rigid cast iron volute. The silicon carbide mechanical seal enhances longevity, making this pump a robust choice for agricultural, residential, and light industrial use.'
            }
          ],
          descriptionImage: 'https://bonhoeffermachines.com/en/public/machines/specification_dark_1720595587_c6f57f9de1de7946c0df.webp',
          showcaseImages: [
            'https://bonhoeffermachines.com/en/public/machines/showcase-3-BON-P-WP1.5-79.webp',
            'https://bonhoeffermachines.com/en/public/machines/showcase-2-BON-P-WP1.5-79.webp',
            'https://bonhoeffermachines.com/en/public/machines/showcase-1-BON-P-WP1.5-79.webp'
          ],
          isBannerImage: false,
          bannerImage: '',
          isVideo: true,
          videoUrls: [
            { title: 'Troubleshoot', url: 'https://www.youtube.com/embed/F84__M51Hrk' },
            { title: 'Troubleshoot', url: 'https://www.youtube.com/embed/KDoZQKhpj00' }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: 'https://bonhoeffermachines.com/en/public/machines/specification_left_1721380303_b8ff8f89fb2bef9b42a8.webp',
          catalougeRight: 'https://bonhoeffermachines.com/en/public/machines/specification_light_1721380316_1388a5ad449eefe5b3f9.webp',
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-water-pump.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/ENGLISH-MANUAL-BON-P-WP1.5-79.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-WP1.5-79.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-WP1.5-79.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: 'Pump Type', value: 'Centrifugal Self Priming, Monoblock Horizontal with Mechanical Seal' },
            { label: 'Displacement (CC)', value: '79' },
            { label: 'Engine Power (HP)', value: '2' },
            { label: 'Start System', value: 'Recoil' },
            { label: 'Suction Port Diameter (mm)', value: '38' },
            { label: 'Discharge Port Diameter (mm)', value: '38' },
            { label: 'Total Head (m)', value: '15' },
            { label: 'Suction Lift (m)', value: '6' },
            { label: 'Maximum Discharge (Litre Per Hour)', value: '13000' },
            { label: 'Dry Weight (kg)', value: '24' },
            { label: 'Impeller', value: '4 Vane Cast Iron' },
            { label: 'Compression Ratio', value: '8.5:1' },
            { label: 'Volute', value: 'Rigid Mounted Cast Iron' },
            { label: 'Mechanical Seal (Pump case)', value: 'Silicon Carbide' }
          ],
          features: [
            'OHV design enhances combustion efficiency',
            'Durable silicon carbide mechanical seal',
            '4 vane high efficiency impeller',
            'Cast iron volute',
            'Heavy duty full frame protection',
            'Protected by bonhoeffer Oil Alert®',
            'Easy starting Bonhoeffer OHV commercial engine'
          ],
        },

        'BON-P-WP2.0-149': {
          name: 'Gasoline Water Pump',
          model: 'BON-P-WP2.0-149',
          description: [
            {
              title: 'BON-P-WP2.0-149: Efficient and Powerful Water Pump',
              text: 'The BON-P-WP2.0-149 is a self-priming water pump designed to deliver reliable and efficient performance. With a maximum power of 5 HP at 4000 rpm, this pump can achieve a maximum pumping capacity of 30,000 litres per hour, making it perfect for a wide range of water transfer applications. The pump features a 2-inch suction and discharge diameter, allowing for a strong and steady water flow. Its total elevation capacity of 25 meters and a suction height of 6 meters ensure that it can handle both vertical and horizontal water movement effectively.'
            },
            {
              title: 'Optimal Performance for Agriculture and Irrigation',
              text: 'Built for ease of use and durability, the BON-P-WP2.0-149 comes with a retractable starting system for quick and convenient operation. It has a rated power of 2.5 kW and is equipped with a 1.2-liter fuel tank, ensuring extended operation times without frequent refuelling. For optimal performance, it is recommended to use SAE10W-30 oil. Whether for agricultural irrigation, dewatering, or other water transfer needs, the BON-P-WP2.0-149 offers a reliable and powerful solution that meets your requirements.'
            }
          ],
          descriptionImage: 'https://bonhoeffermachines.com/en/public/machines/specification_dark_1726649540_df9fc6a0ae38c893a27a.webp',
          showcaseImages: [
            'https://bonhoeffermachines.com/en/public/machines/showcase-1-bon-p-wp2.0-149.webp',
            'https://bonhoeffermachines.com/en/public/machines/showcase-2-bon-p-wp2.0-149.webp',
            'https://bonhoeffermachines.com/en/public/machines/showcase-3-bon-p-wp2.0-149.webp',
            'https://bonhoeffermachines.com/en/public/machines/showcase-4-bon-p-wp2.0-149.webp'
          ],
          isBannerImage: false,
          bannerImage: '',
          isVideo: true,
          videoUrls: [
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/KDoZQKhpj00' }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: 'https://bonhoeffermachines.com/en/public/machines/specification_left_1721116573_bd9681dc746dda8a0d2a.webp',
          catalougeRight: 'https://bonhoeffermachines.com/en/public/machines/specification_light_1721116586_0ea6799f2f87e89b2369.webp',
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-water-pump.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-WP2.0-149.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-WP2.0-149.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-WP2.0-149.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: 'Pump Type', value: 'Autocebante (Self-Priming)' },
            { label: 'Maximum Power', value: '5 HP / 4000 rpm' },
            { label: 'Maximum Pumping Capacity', value: '30,000 litres per hour' },
            { label: 'Start System', value: 'Retráctil (Recoil)' },
            { label: 'Suction Diameter', value: '2 Pulgadas (2 Inches)' },
            { label: 'Discharge Diameter', value: '2 Pulgadas (2 Inches)' },
            { label: 'Total Head (Elevación total)', value: '25 Metros' },
            { label: 'Suction Height (Altura de succión)', value: '6 Metros' },
            { label: 'Rated Power', value: '2.5 kW' },
            { label: 'Fuel Tank Size', value: '1.2 Litros' },
            { label: 'Recommended Oil', value: 'SAE10W-30' }
          ],
          features: [
            'OHV design enhances combustion efficiency',
            'Durable silicon carbide mechanical seal',
            '4 vane high efficiency impeller',
            'Cast iron volute',
            'Heavy duty full frame protection',
            'Protected by bonhoeffer Oil Alert®',
            'Easy starting Bonhoeffer OHV commercial engine'
          ],
        },

        'BON-P-WP2.0-196': {
          name: 'Petrol Water Pump',
          model: 'BON-P-WP2.0-196',
          description: [
            {
              title: 'BON-P-WP2.0-196: Efficient and Reliable Water Pump',
              text: 'The BON-P-WP2.0-196 is a centrifugal self-priming, Monoblock horizontal water pump designed for efficiency and reliability. Powered by a 6.5 HP engine with a displacement of 196 CC, this pump can handle a maximum discharge of 36,000 litres per hour. Its robust construction includes a 51 mm suction port and discharge port, making it suitable for a variety of water transfer needs. With a total head of 32 meters and a suction lift of 8 meters, this pump ensures excellent performance in both residential and commercial applications.'
            },
            {
              title: 'Built to Long Term Performance',
              text: 'Built to last, the BON-P-WP2.0-196 features a durable 4 vane cast iron impeller and a rigid mounted cast iron volute. The silicon carbide mechanical seal in the pump case enhances its durability, ensuring long-term, trouble-free operation. Weighing just 24 kg and equipped with a recoil start system, this pump is easy to use and transport. Whether you need it for irrigation, water supply, or drainage, the BON-P-WP2.0-196 is a reliable and efficient choice for all your water pumping needs.'
            }
          ],
          descriptionImage: 'https://bonhoeffermachines.com/en/public/machines/specification_dark_1720593525_2393802d7b2de8177267.webp',
          showcaseImages: [
            'https://bonhoeffermachines.com/en/public/machines/showcase-1-BON-P-WP2.0-196.webp',
            'https://bonhoeffermachines.com/en/public/machines/showcase-2-BON-P-WP2.0-196.webp',
            'https://bonhoeffermachines.com/en/public/machines/showcase-3-BON-P-WP2.0-196.webp'
          ],
          isBannerImage: false,
          bannerImage: '',
          isVideo: true,
          videoUrls: [
            {
              title: 'Troubleshooting',
              url: 'https://www.youtube.com/embed/KDoZQKhpj00'
            }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: 'https://bonhoeffermachines.com/en/public/machines/specification_left_1718186649_89397e8bd5adf8331fb2.webp',
          catalougeRight: 'https://bonhoeffermachines.com/en/public/machines/specification_light_1718186666_a891eb120c82c540a06a.webp',
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-water-pump.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-WP.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-WP2.0-196.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-WP2.0-196.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: 'Pump Type', value: 'Centrifugal Self Priming, Monoblock Horizontal With Mechanical Seal' },
            { label: 'Displacement (CC)', value: '196' },
            { label: 'Engine Power (HP)', value: '6.5' },
            { label: 'Start System', value: 'Recoil' },
            { label: 'Suction Port Diameter (mm)', value: '51' },
            { label: 'Discharge Port Diameter (mm)', value: '51' },
            { label: 'Total Head (m)', value: '32' },
            { label: 'Suction Lift (m)', value: '8' },
            { label: 'Maximum Discharge (Litre Per Hour)', value: '36000' },
            { label: 'Dry Weight (kg)', value: '24' },
            { label: 'Impeller', value: '4 Vane Cast Iron' },
            { label: 'Compression Ratio', value: '8.5:1' },
            { label: 'Volute', value: 'Rigid Mounted Cast Iron' },
            { label: 'Mechanical Seal (Pump case)', value: 'Silicon Carbide' }
          ],
          features: [
            'OHV design enhances combustion efficiency',
            'Durable silicon carbide mechanical seal',
            '4 vane high efficiency impeller',
            'Cast iron volute',
            'Heavy duty full frame protection',
            'Protected by bonhoeffer Oil Alert®',
            'Easy starting bonhoeffer mini 4-stroke commercial engine'
          ],
        },

        "BON-P-WP3.0-196": {
          name: "Petrol Water Pump",
          model: "BON-P-WP3.0-196",
          description: [
            {
              title: "BON-P-WP3.0-196: High-Performance Water Pump",
              text: "The BON-P-WP3.0-196 is a centrifugal self-priming water pump designed for high efficiency and reliable performance. With a powerful 6.5 HP engine and a displacement of 196 CC, this pump can handle a maximum discharge of 55,000 liters per hour, making it ideal for large-scale water transfer needs. The pump features a 3-inch suction port and discharge port, ensuring robust water flow. It has a total head of 30 meters and a suction lift of 7 meters, which means it can effectively move water over significant distances and heights."
            },
            {
              title: "Ideal for Agriculture, Irrigation and Industrial Applications",
              text: "Built for durability, the BON-P-WP3.0-196 includes a 4 vane cast iron impeller and a rigid mounted cast iron volute. The silicon carbide mechanical seal in the pump case enhances its longevity, providing reliable, long-term operation. Weighing 26 kg and equipped with a recoil start system, this pump is easy to operate and transport. Whether for agricultural irrigation, industrial applications, or emergency water transfer, the BON-P-WP3.0-196 is a dependable choice that combines power and durability."
            }
          ],
          descriptionImage: "https://bonhoeffermachines.com/en/public/machines/specification_dark_1720596412_dd0e34c7d2665fb6d1d6.webp",
          showcaseImages: [
            "https://bonhoeffermachines.com/en/public/machines/showcase-showcase-4-bon-p-wp3.0-196.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-showcase-3-bon-p-wp3.0-196.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-showcase-2-bon-p-wp3.0-196.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-showcase-1-bon-p-wp3.0-196.webp"
          ],
          isBannerImage: false,
          bannerImage: "",
          isVideo: true,
          videoUrls: [
            {
              title: "Troubleshooting",
              url: "https://www.youtube.com/embed/KDoZQKhpj00"
            }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: "https://bonhoeffermachines.com/en/public/machines/specification_left_1718186921_efd8e70b552d012cee64.webp",
          catalougeRight: "https://bonhoeffermachines.com/en/public/machines/specification_light_1718186933_2908dcc7f3ffae6e8d87.webp",
          isWorkshopManual: true,
          workshopManualUrl: "https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-water-pump.pdf",
          isUserManual: true,
          userManualUrl: "https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-WP.pdf",
          isBrochure: true,
          brochureUrl: "https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-WP3.0-196.pdf",
          isSpareParts: true,
          sparePartsUrl: "https://bonhoeffermachines.com/en/public/pdfs/BON-P-WP3.0-196.pdf",
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: 'Pump Type', value: 'Centrifugal Self Priming, Monoblock Horizontal With Mechanical Seal' },
            { label: 'Displacement (CC)', value: '196' },
            { label: 'Engine Power (HP)', value: '6.5' },
            { label: 'Start System', value: 'Recoil' },
            { label: 'Suction Port Diameter (mm)', value: '51' },
            { label: 'Discharge Port Diameter (mm)', value: '51' },
            { label: 'Total Head (m)', value: '30' },
            { label: 'Suction Lift (m)', value: '7' },
            { label: 'Maximum Discharge (Litre Per Hour)', value: '55000' },
            { label: 'Dry Weight (kg)', value: '26' },
            { label: 'Impeller', value: '4 Vane Cast Iron' },
            { label: 'Compression Ratio', value: '8.5:1' },
            { label: 'Volute', value: 'Rigid Mounted Cast Iron' },
            { label: 'Mechanical Seal (Pump case)', value: 'Silicon Carbide' }
          ],
          features: [
            'OHV design enhances combustion efficiency',
            'Durable silicon carbide mechanical seal',
            '4 vane high efficiency impeller',
            'Cast iron volute',
            'Heavy duty full frame protection',
            'Protected by bonhoeffer Oil Alert®',
            'Easy starting bonhoeffer mini 4-stroke commercial engine'
          ],
        },

        "BON-P-WP4.0-272": {
          name: "Petrol Water Pump",
          model: "BON-P-WP4.0-272",
          description: [
            {
              title: "BON-P-WP4.0-272: High-Capacity Centrifugal Pump",
              text: "The BON-P-WP4.0-272 is a high-performance centrifugal self-priming water pump designed for heavy-duty applications. With a powerful 9 HP engine and a displacement of 272 CC, this pump achieves an impressive maximum discharge of 105,000 litres per hour. It features a 4-inch suction and discharge port, allowing for efficient water flow and handling. The pump can achieve a total head of 25 meters and a suction lift of 6 meters, making it suitable for various demanding water transfer tasks. Its recoil start system ensures easy and reliable operation."
            },
            {
              title: "Durable and Robust Design",
              text: "Built to last, the BON-P-WP4.0-272 includes a 4-vane cast iron impeller and a rigid mounted cast iron volute for enhanced durability. The mechanical seal made of silicon carbide in the pump case ensures long-term reliability and minimal maintenance. Weighing 37 kg, this pump combines robust performance with a sturdy design, making it ideal for industrial, agricultural, and large-scale water management applications."
            }
          ],
          descriptionImage: "https://bonhoeffermachines.com/en/public/machines/specification_dark_1721128870_a8beec55136bb64ec52c.webp",
          showcaseImages: [
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-9.0hp_silde_2.png",
            "https://bonhoeffermachines.com/en/public/machines/showcase-showcase-1-bon-p-wp4.0-272.webp"
          ],
          isBannerImage: false,
          bannerImage: "",
          isVideo: true,
          videoUrls: [
            {
              title: "Unboxing",
              url: "https://www.youtube.com/embed/nHk2mb63GTw"
            },
            {
              title: "Troubleshooting",
              url: "https://www.youtube.com/embed/KDoZQKhpj00"
            }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: "https://bonhoeffermachines.com/en/public/machines/specification_left_1722420089_f81ff3b9986e9b210d84.webp",
          catalougeRight: "https://bonhoeffermachines.com/en/public/machines/specification_light_1722420099_644bcf2c9834dc571a03.webp",
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-water-pump.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-WP.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-WP4.0-272.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-WP4.0-272.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: "Pump Type", value: "Centrifugal Self Priming, Monoblock Horizontal With Mechanical Seal" },
            { label: "Displacement", value: "272 CC" },
            { label: "Engine Power", value: "9 HP" },
            { label: "Start System", value: "Recoil" },
            { label: "Suction Port Diameter", value: "4 inches" },
            { label: "Discharge Port Diameter", value: "4 inches" },
            { label: "Total Head (m)", value: "25" },
            { label: "Suction Lift (m)", value: "6" },
            { label: "Maximum Discharge (Litre Per Hour)", value: "105000" },
            { label: "Dry Weight (kg)", value: "37" },
            { label: "Impeller", value: "4 Vane Cast Iron" },
            { label: "Compression Ratio", value: "8.5:1" },
            { label: "Volute", value: "Rigid Mounted Cast Iron" },
            { label: "Mechanical Seal(Pump case)", value: "Silicon Carbide" }
          ],
          features: [
            "OHV design enhances combustion efficiency",
            "Durable silicon carbide mechanical seal",
            "4 vane high efficiency impeller",
            "Cast iron volute",
            "Heavy duty full frame protection",
            "Protected by bonhoeffer Oil Alert®",
            "Easy starting bonhoeffer mini 4-stroke commercial engine"
          ]
        },

        "BON-P-WP1.5-224HL": {
          name: "Petrol Water Pump",
          model: "BON-P-WP1.5-224HL",
          description: [
            {
              title: "High Performance and Efficient Gasoline Water Pump",
              text: "The BON-P-WP1.5-224HL from Bonhoeffer is a self-priming, high-lift water pump engineered for efficiency and reliability. With a powerful 8.0 HP engine operating at 3800 RPM, this pump can achieve a maximum pumping capacity of 15,000 liters per hour. Its robust design includes a 1.5-inch suction diameter and versatile discharge options (1.5/1.0/1.0 inches), making it suitable for various water transfer needs. The pump is capable of lifting water to a total elevation of 75 meters and has a suction height of 7 meters, ensuring excellent performance even in challenging conditions."
            },
            {
              title: "Durable and Easy to Use",
              text: "Built to last, the BON-P-WP1.5-224HL features a durable 4 vane cast iron impeller and a rigid mounted cast iron volute. The silicon carbide mechanical seal in the pump case enhances its durability, ensuring long-term, trouble-free operation. The retractable starting system makes it easy to get the pump up and running quickly, and the 2.6-liter fuel tank allows for extended operation without frequent refueling. For optimal performance, the pump is recommended to use SAE10W-30 oil. Whether for agricultural, industrial, or commercial use, the BON-P-WP1.5-224HL is a reliable choice for all your high-lift water pumping needs."
            }
          ],
          descriptionImage: "https://bonhoeffermachines.com/en/public/machines/specification_dark_1720594381_1fb0be26be82fd12e695.webp",
          showcaseImages: [
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-wp1.5-224hl.webp"
          ],
          isBannerImage: false,
          bannerImage: "",
          isVideo: true,
          videoUrls: [
            {
              title: "Troubleshooting",
              url: "https://www.youtube.com/embed/KDoZQKhpj00"
            }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: "https://bonhoeffermachines.com/en/public/machines/specification_left_1721805316_68bc2641381ad723589b.webp",
          catalougeRight: "https://bonhoeffermachines.com/en/public/machines/specification_light_1721805328_ccdae88af42d575f0833.webp",
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-water-pump.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-WP.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-WP1.5-224HL.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-WP1.5-224HL.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: "Pump Type", value: "Self-Priming (High Lift)" },
            { label: "Maximum power", value: "8.0 HP / 3800 rpm" },
            { label: "Maximum pumping capacity", value: "15000 liters per hour" },
            { label: "Starting system", value: "Retractable" },
            { label: "Suction diameter", value: "1.5 inch" },
            { label: "Discharge Diameter", value: "1.5/1.0/1.0 Inch" },
            { label: "Total elevation", value: "75 Meters" },
            { label: "Suction height", value: "7 Meters" },
            { label: "Fuel tank size", value: "2.6 Liters" },
            { label: "Recommended oil", value: "SAE10W-30" },
            { label: "Impeller", value: "4 Vane Cast Iron" },
            { label: "Compression Ratio", value: "8.5:1" },
            { label: "Volute", value: "Rigid Mounted Cast Iron" },
            { label: "Mechanical Seal(Pump case)", value: "Silicon Carbide" }
          ],
          features: [
            "OHV design enhances combustion efficiency",
            "Durable silicon carbide mechanical seal",
            "4 vane high efficiency impeller",
            "Cast iron volute",
            "Heavy duty full frame protection",
            "Protected by bonhoeffer Oil Alert®",
            "Easy starting Bonhoeffer OHV commercial engine"
          ]
        },

        "BON-P-WP6.0-420": {
          name: "Petrol Water Pump",
          model: "BON-P-WP6.0-420",
          description: [
            {
              title: "High-Powered Self-Priming Water Pump",
              text: "The Bonhoeffer BON-P-WP6.0-420 water pump is a powerful self-priming pump designed for high-volume water transfer tasks. Boasting a maximum power of 14.0 HP at 3600 rpm, this pump offers an exceptional maximum pumping capacity of 150,000 litres per hour. The retractable starting system ensures reliable and effortless starts, while the 6-inch suction and discharge diameters facilitate efficient water flow. With a total elevation capacity of 20 meters and a suction height of 5 meters, the BON-P-WP6.0-420 is equipped to handle a variety of demanding applications."
            },
            {
              title: "Robust Construction for Reliable Performance",
              text: "Equipped with a 6-liter fuel tank, the BON-P-WP6.0-420 provides extended operational periods, minimizing the need for frequent refuelling. Recommended to use SAE10W-30 oil for optimal performance, this pump features a 4-vane cast iron impeller and a rigid mounted cast iron volute, ensuring durability and efficiency. The mechanical seal of the pump case is made from silicon carbide, offering enhanced longevity and reliability. Designed for industrial and agricultural applications, this water pump combines high performance with robust construction to deliver dependable service in challenging environments."
            }
          ],
          descriptionImage: "https://bonhoeffermachines.com/en/public/machines/specification_dark_1721128958_163f7aa8e96ba47ac2f5.webp",
          showcaseImages: [
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-wp6.0-420.webp"
          ],
          isBannerImage: false,
          bannerImage: "",
          isVideo: true,
          videoUrls: [
            {
              title: "Troubleshooting",
              url: "https://www.youtube.com/embed/KDoZQKhpj00"
            }
          ],
          isCatalogueLeft: false,
          isCatalogueRight: false,
          catalougeLeft: "",
          catalougeRight: "",
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-water-pump.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-WP.pdf',
          isBrochure: false,
          brochureUrl: '',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-WP6.0-420.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: "Pump type", value: "Self-priming" },
            { label: "Maximum power", value: "14.0 HP/ 3600 rpm" },
            { label: "Starting system", value: "Retractable" },
            { label: "Maximum pumping capacity", value: "150,000 liters per hour" },
            { label: "Suction diameter", value: "6 inches" },
            { label: "Discharge diameter", value: "6 inches" },
            { label: "Total elevation", value: "20 Meters" },
            { label: "Suction height", value: "5 Meters" },
            { label: "Fuel tank size", value: "6 Liters" },
            { label: "Recommended oil", value: "SAE10W-30" },
            { label: "Impeller", value: "4 Vane Cast Iron" },
            { label: "Compression Ratio", value: "8.5:1" },
            { label: "Volute", value: "Rigid Mounted Cast Iron" },
            { label: "Mechanical Seal(Pump case)", value: "Silicon Carbide" }
          ],
          features: [
            "OHV design enhances combustion efficiency",
            "Durable silicon carbide mechanical seal",
            "4 vane high efficiency impeller",
            "Cast iron volute",
            "Heavy duty full frame protection",
            "Protected by bonhoeffer Oil Alert®",
            "Easy starting bonhoeffer mini 4-stroke commercial engine"
          ]
        },
        
        "BON-P-WP2.0-224HL": {
          name: "Petrol Water Pump",
          model: "BON-P-WP2.0-224HL",
          description: [
            {
              title: "Powerful Pumping with Self-Priming Design",
              text: "The BON-P-WP2.0-224HL gasoline water pump is designed for strong performance with its 8.0 HP engine running at 3800 rpm. This self-priming pump is perfect for moving water over long distances or heights. It can pump up to 18,000 liters of water per hour, making it ideal for heavy-duty tasks."
            },
            {
              title: "Built to Last with Durable Components",
              text: "The BON-P-WP2.0-224HL is made for durability, featuring a sturdy cast iron impeller and volute. The pump's mechanical seal is made from silicon carbide, which helps prevent leaks and extends the pump's life. With an easy-to-use retractable starting system, this pump is reliable and built to handle tough jobs for years to come."
            }
          ],
          descriptionImage: "https://bonhoeffermachines.com/en/public/machines/specification_dark_1720598093_51e2b5405410ef8b2b5a.webp",
          showcaseImages: [
            "https://bonhoeffermachines.com/en/public/machines/showcase-showcase-3-bon-p-wp2.0-224hl.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-showcase-2-bon-p-wp2.0-224hl.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-wp2.0-224hl.webp"
          ],
          isBannerImage: false,
          bannerImage: "",
          isVideo: true,
          videoUrls: [
            {
              title: "Unboxing & Assembly",
              url: "https://www.youtube.com/embed/DyqfBm_sjBU"
            },
            {
              title: "Troubleshooting",
              url: "https://www.youtube.com/embed/KDoZQKhpj00"
            }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: "https://bonhoeffermachines.com/en/public/machines/specification_left_1718186727_a58f7da1313fb1dda57c.webp",
          catalougeRight: "https://bonhoeffermachines.com/en/public/machines/specification_light_1718186738_d0bdc441c976b894a39a.webp",
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-water-pump.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-WP.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-WP2.0-224HL.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-WP2.0-224HL.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: "Pump Type", value: "Self-Priming (High Lift)" },
            { label: "Maximum power", value: "8.0 HP / 3800 rpm" },
            { label: "Maximum pumping capacity", value: "18000 liters per hour / 16000 liters per hour" },
            { label: "Starting system", value: "Retractable" },
            { label: "Suction diameter", value: "2 inches" },
            { label: "Discharge diameter", value: "2.0/1.5/1.5 inches" },
            { label: "Total elevation", value: "80 Meters" },
            { label: "Suction height", value: "7 meters" },
            { label: "Fuel tank size", value: "2.6 Liters" },
            { label: "Recommended oil", value: "SAE10W-30" },
            { label: "Impeller", value: "4 Vane Cast Iron" },
            { label: "Compression Ratio", value: "8.5:1" },
            { label: "Volute", value: "Rigid Mounted Cast Iron" },
            { label: "Mechanical Seal(Pump case)", value: "Silicon Carbide" }
          ],
          features: [
            "OHV design enhances combustion efficiency",
            "Durable silicon carbide mechanical seal",
            "4 vane high efficiency impeller",
            "Cast iron volute",
            "Heavy duty full frame protection",
            "Protected by bonhoeffer Oil Alert®",
            "Easy starting bonhoeffer mini 4-stroke commercial engine"
          ]
        },

        "BON-P-WP2.0-420HL": {
          name: "Petrol Water Pump",
          model: "BON-P-WP2.0-420HL",
          description: [
            {
              title: "Robust and Efficient Self-Priming Water Pump",
              text: "The BON-P-WP2.0-420HL is a robust and efficient cast iron self-priming water pump designed for high lift applications. Powered by a 14 HP engine operating at 3600 rpm, this pump boasts an impressive maximum pumping capacity of 30,000 litres per hour. The retractable starting system ensures ease of operation, while the 2.0-inch suction and discharge diameters make it suitable for a variety of demanding tasks. With a total elevation capacity of 95 meters and a suction height of 7 meters, the BON-P-WP2.0-420HL is built to handle substantial water transfer needs with precision and reliability."
            },
            {
              title: "Durable and Resistance Water Pump",
              text: "This water pump features a durable 4-vane cast iron impeller and a rigid mounted cast iron volute, enhancing its longevity and performance. The mechanical seal, made from silicon carbide, ensures superior durability and resistance to wear. The 6-liter fuel tank allows for extended operation periods, while the recommended SAE10W-30 oil ensures optimal engine performance. The BON-P-WP2.0-420HL is engineered for efficiency and reliability, making it an excellent choice for agricultural, industrial, and emergency water transfer applications."
            }
          ],
          descriptionImage: "https://bonhoeffermachines.com/en/public/machines/specification_dark_1724394011_3b2c0f5488501e861df0.webp",
          showcaseImages: [
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-wp2.0-420hl.webp"
          ],
          isBannerImage: false,
          bannerImage: "",
          isVideo: true,
          videoUrls: [
            {
              title: "Troubleshooting",
              url: "https://www.youtube.com/embed/KDoZQKhpj00"
            }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: "https://bonhoeffermachines.com/en/public/machines/specification_left_1718186823_a84fa27f797e5114150f.webp",
          catalougeRight: "https://bonhoeffermachines.com/en/public/machines/specification_light_1718186836_3270e8fe57460e3517dd.webp",
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-water-pump.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-WP.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-WP2.0-420HL.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-WP2.0-420HL.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: "Pump Type", value: "Cast Iron Self-Priming (High Lift)" },
            { label: "Maximum power", value: "14 HP/ 3600 rpm" },
            { label: "Maximum pumping capacity", value: "30000 liters per hour" },
            { label: "Starting system", value: "Retractable" },
            { label: "Suction diameter", value: "2.0 inches" },
            { label: "Discharge diameter", value: "2.0 inches" },
            { label: "Total elevation", value: "95 Meters" },
            { label: "Suction height", value: "7 meters" },
            { label: "Fuel tank size", value: "6 Liters" },
            { label: "Recommended oil", value: "SAE10W-30" },
            { label: "Impeller", value: "4 Vane Cast Iron" },
            { label: "Compression Ratio", value: "8.5:1" },
            { label: "Volute", value: "Rigid Mounted Cast Iron" },
            { label: "Mechanical Seal(Pump case)", value: "Silicon Carbide" }
          ],
          features: [
            "OHV design enhances combustion efficiency",
            "Durable silicon carbide mechanical seal",
            "4 vane high efficiency impeller",
            "Cast iron volute",
            "Heavy duty full frame protection",
            "Protected by bonhoeffer Oil Alert®",
            "Easy starting bonhoeffer mini 4-stroke commercial engine"
          ]
        },

        'BON-P-WP3.0-420HL': {
          name: 'Petrol Water Pump',
          model: 'BON-P-WP3.0-420HL',
          description: [
            {
              title: "BON-P-WP3.0-420HL: High-Performance Self-Priming Water Pump",
              text: "BON-P-WP3.0-420HL is one of the superior models of gasoline water pumps which is high-lift water pump from Bonhoeffer. Bonhoeffer is among the best brand of gasoline water pumps and our pumps are known for the best performance and reliability. The cast-iron self-pricing pump is mainly designed to meet the demanding needs of different water transfer applications. Because of the maximum pumping capacity of 45,000 litres per hour, this pump is ideal for commercial, industrial and agricultural applications. The high-lift feature ensures the efficient water transfer even from the long distances."
            },
            {
              title: "Durable and Ease of Maintenance",
              text: "This pump built with the robust cast iron components which includes 4 vane impeller and rigid mounted volute, this pump is engineered for longevity. The silicon carbide mechanical seal provides excellent resistance to wear and tear, ensuring a longer service life. The retractable starting system and 6-liter fuel tank make it user-friendly and capable of long operational periods without frequent refuelling."
            }
          ],
          descriptionImage: "https://bonhoeffermachines.com/en/public/machines/specification_dark_1720596255_08c17c4973c05dca42ae.webp",
          showcaseImages: [
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-wp3.0-420hl.webp"
          ],
          isBannerImage: true,
          bannerImage: "https://www.youtube.com/embed/KDoZQKhpj00",
          isVideo: true,
          videoUrls: [
            {
              title: "Troubleshooting",
              url: "https://www.youtube.com/embed/KDoZQKhpj00"
            }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: "https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-WP3.0-420HL.pdf",
          catalougeRight: "https://bonhoeffermachines.com/en/public/pdfs/BON-P-WP3.0-420HL.pdf",
          isWorkshopManual: true,
          workshopManualUrl: "https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-water-pump.pdf",
          isUserManual: true,
          userManualUrl: "https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-WP.pdf",
          isBrochure: true,
          brochureUrl: "https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-WP3.0-420HL.pdf",
          isSpareParts: true,
          sparePartsUrl: "https://bonhoeffermachines.com/en/public/pdfs/BON-P-WP3.0-420HL.pdf",
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: "Pump Type", value: "Cast Iron Self-Priming (High Lift)" },
            { label: "Maximum power", value: "14 HP/ 3600 rpm" },
            { label: "Maximum pumping capacity", value: "45,000 liters per hour" },
            { label: "Starting system", value: "Retractable" },
            { label: "Suction diameter", value: "3 inches" },
            { label: "Discharge diameter", value: "2.5/1.5/1.5 inches" },
            { label: "Total elevation", value: "75 Meters" },
            { label: "Suction height", value: "7 meters" },
            { label: "Fuel tank size", value: "6 Liters" },
            { label: "Recommended oil", value: "SAE10W-30" },
            { label: "Impeller", value: "4 Vane Cast Iron" },
            { label: "Compression Ratio", value: "8.5:1" },
            { label: "Volute", value: "Rigid Mounted Cast Iron" },
            { label: "Mechanical Seal (Pump case)", value: "Silicon Carbide" }
          ],
          features: [
            "OHV design enhances combustion efficiency",
            "Durable silicon carbide mechanical seal",
            "4 vane high efficiency impeller",
            "Cast iron volute",
            "Heavy duty full frame protection",
            "Protected by bonhoeffer Oil Alert®",
            "Easy starting bonhoeffer mini 4-stroke commercial engine"
          ]
        },


        "BON-P-WP2.0-196CH": {
          name: "Petrol Water Pump",
          model: "BON-P-WP2.0-196CH",
          description: [
            {
              title: "High-Performance Chemical Water Pump",
              text: "The Bonhoeffer BON-P-WP2.0-196CH water pump is a specialized, plastic self-priming chemical pump designed for handling corrosive liquids safely and efficiently. With a maximum power output of 6.5 HP at 3900 rpm, this pump can achieve a maximum pumping capacity of 35,000 liters per hour. Its retractable starting system ensures quick and reliable starts, while the 2-inch suction and discharge diameters facilitate smooth and effective fluid transfer. Capable of a total elevation of 30 meters and a suction height of 7 meters, this pump is well-suited for various industrial and agricultural chemical applications."
            },
            {
              title: "Reliable and Durable for Corrosive Environments",
              text: "Equipped with a 2.6-liter fuel tank, the BON-P-WP2.0-196CH allows for extended operation with minimal refuelling. Using SAE10W-30 oil is recommended to maintain optimal performance and longevity. The plastic construction of this self-priming pump ensures resistance to corrosive substances, making it ideal for handling chemicals in demanding environments. Whether used for agricultural irrigation or industrial processes, this chemical pump combines high capacity and robust design to deliver dependable performance in managing corrosive liquids."
            }
          ],
          descriptionImage: "https://bonhoeffermachines.com/en/public/machines/specification_dark_1720595280_67192a58b7e6439752b6.webp",
          showcaseImages: [
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-wp2.0-196ch.webp"
          ],
          isBannerImage: false,
          bannerImage: "",
          isVideo: true,
          videoUrls: [
            {
              title: "Unboxing & Assembly",
              url: "https://www.youtube.com/embed/rQz9cBmZ0Fo"
            },
            {
              title: "Troubleshooting",
              url: "https://www.youtube.com/embed/KDoZQKhpj00"
            }
          ],
          isCatalogueLeft: false,
          isCatalogueRight: false,
          catalougeLeft: "",
          catalougeRight: "",
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-water-pump.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-WP.pdf',
          isBrochure: false,
          brochureUrl: '',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-WP2.0-196CH.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: "Pump type", value: "Plastic self-priming (Chemical Pump)" },
            { label: "Maximum power", value: "6.5 HP/ 3900 rpm" },
            { label: "Maximum pumping capacity", value: "35,000 liters per hour" },
            { label: "Starting system", value: "Retractable" },
            { label: "Suction diameter", value: "2 inches" },
            { label: "Discharge diameter", value: "2 inches" },
            { label: "Total elevation", value: "30 Meters" },
            { label: "Suction height", value: "7 Meters" },
            { label: "Fuel tank size", value: "2.6 Liters" },
            { label: "Recommended oil", value: "SAE10W-30" }
          ],
          features: [
            "OHV design enhances combustion efficiency",
            "Suitable for pumping chemical products such as agricultural fertiliser or industrial chemicals",
            "Oil-Alert Technology will automatically switch off the ignition if the oil drops below a safe level",
            "The ultimate pump for professionals shifting volatile chemicals.",
            "Our Chemical pump has parts made of thermoplastic",
            "Easy starting Bonhoeffer OHV commercial engine"
          ]
        },

        "BON-P-WP2.0-196TR": {
          name: "Petrol Water Pump",
          model: "BON-P-WP2.0-196TR",
          description: [
            {
              title: "High-Performance Self-Priming Trash Water Pump",
              text: "The Bonhoeffer BON-P-WP2.0-196TR trash water pump is a robust and efficient self-priming garbage pump designed for demanding applications. With a maximum power output of 6.5 HP at 3900 rpm, this pump delivers an impressive pumping capacity of up to 35,000 liters per hour. Its retractable starting system ensures quick and reliable starts, while the 2-inch suction and discharge diameters facilitate efficient water flow. This pump can handle a total elevation of 30 meters and a suction height of 6 meters, making it suitable for a variety of challenging pumping tasks."
            },
            {
              title: "Reliable and Durable for Heavy-Duty Applications",
              text: "Equipped with a 2.6-liter fuel tank, the BON-P-WP2.0-196TR offers extended operation times, reducing the need for frequent refuelling. It is recommended to use SAE10W-30 oil to ensure optimal performance and longevity of the pump. Whether you're dealing with floodwater, construction site drainage, or agricultural irrigation, this trash water pump provides reliable and high-capacity performance to meet your needs. Its durable construction and powerful capabilities make it an essential tool for heavy-duty water pumping requirements."
            }
          ],
          descriptionImage: "https://bonhoeffermachines.com/en/public/machines/specification_dark_1726649462_cd1b6c847e9fcc2a53ca.webp",
          showcaseImages: [
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-wp2.0-196tr.webp"
          ],
          isBannerImage: false,
          bannerImage: "",
          isVideo: true,
          videoUrls: [
            {
              title: "Troubleshooting",
              url: "https://www.youtube.com/embed/KDoZQKhpj00"
            }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: "https://bonhoeffermachines.com/en/public/machines/specification_left_1723532324_205edaa1aa9a4c735f81.webp",
          catalougeRight: "https://bonhoeffermachines.com/en/public/machines/specification_light_1723532334_2da41d28c8ac0aba231f.webp",
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-water-pump.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-WP.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-WP2.0-196TR.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-WP2.0-196TR.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: "Pump type", value: "Self-priming (Garbage Pump)" },
            { label: "Maximum power", value: "6.5 HP/ 3900 rpm" },
            { label: "Maximum pumping capacity", value: "35,000 liters per hour" },
            { label: "Starting system", value: "Retractable" },
            { label: "Suction diameter", value: "2 inches" },
            { label: "Discharge diameter", value: "2 inches" },
            { label: "Total elevation", value: "30 Meters" },
            { label: "Suction height", value: "6 Meters" },
            { label: "Fuel tank size", value: "2.6 Liters" },
            { label: "Recommended oil", value: "SAE10W-30" }
          ],
          features: [
            "OHV design enhances combustion efficiency",
            "Durable silicon carbide mechanical seal",
            "2 vane high efficiency impeller",
            "Cast iron volute",
            "Heavy duty full frame protection",
            "Protected by Bonhoeffer Oil Alert®",
            "Easy starting Bonhoeffer mini 4-stroke commercial engine"
          ]
        },

        "BON-P-WP3.0-196TR": {
          name: "Gasoline Water Pump",
          model: "BON-P-WP3.0-196TR",
          description: [
            {
              title: "Powerful and Efficient Trash Water Pump",
              text: "The Bonhoeffer BON-P-WP3.0-196TR trash water pump is a high-capacity, self-priming pump designed for efficient waste and debris handling. With a powerful 6.5 HP engine running at 3900 rpm, this pump boasts an impressive maximum pumping capacity of 55,000 liters per hour. The retractable starting system ensures easy and reliable operation, while the 3-inch suction and discharge diameters allow for smooth and efficient water flow. With a total lift of 25 meters and a suction height of 6 meters, this pump is well-suited for various heavy-duty applications."
            },
            {
              title: "Durable Design for Demanding Applications",
              text: "The BON-P-WP3.0-196TR features a 2.6-liter fuel tank, enabling extended operation periods with less frequent refuelling. To ensure optimal performance and longevity, SAE10W-30 oil is recommended for use. Ideal for flood control, construction site dewatering, and agricultural irrigation, this trash pump is built to handle tough conditions and large volumes of water mixed with debris. Its durable construction and high pumping capacity make it a reliable choice for any demanding water pumping task."
            }
          ],
          descriptionImage: "https://bonhoeffermachines.com/en/public/machines/specification_dark_1720594878_3ecf340184667be97ba7.webp",
          showcaseImages: [
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-wp3.0-196tr-1.webp"
          ],
          isBannerImage: false,
          bannerImage: "",
          isVideo: true,
          videoUrls: [
            {
              title: "Troubleshooting",
              url: "https://www.youtube.com/embed/KDoZQKhpj00"
            }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: "https://bonhoeffermachines.com/en/public/machines/specification_left_1722411212_f439d6e6f6b62bab49af.webp",
          catalougeRight: "https://bonhoeffermachines.com/en/public/machines/specification_light_1722411227_b9ce92ceee2facc2240b.webp",
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-water-pump.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-WP.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-WP3.0-196TR_1.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-WP3.0-196TR.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: "Pump type", value: "Self-priming (Trash Pump)" },
            { label: "Maximum power", value: "6.5 HP/ 3900 rpm" },
            { label: "Maximum pumping capacity", value: "55,000 liters per hour" },
            { label: "Starting system", value: "Retractable" },
            { label: "Suction diameter", value: "3 inches" },
            { label: "Discharge diameter", value: "3 inches" },
            { label: "Total lift", value: "25 meters" },
            { label: "Suction height", value: "6 meters" },
            { label: "Fuel tank size", value: "2.6 liters" },
            { label: "Recommended oil", value: "SAE10W-30" }
          ],
          features: [
            "OHV design enhances combustion efficiency",
            "Durable silicon carbide mechanical seal",
            "2 vane high efficiency impeller",
            "Cast iron volute",
            "Heavy duty full frame protection",
            "Protected by Bonhoeffer Oil Alert®",
            "Easy starting Bonhoeffer mini 4-stroke commercial engine"
          ]
        },
      },
      'gasoline-engine': {
        'BON-P-GE-3.0HP': {
          name: 'Gasoline Engine',
          model: 'BON-P-GE-3.0HP',
          description: [
            {
              title: 'Extremely Powerful 4 Stroke 3 HP Gasoline Engine',
              text: 'Are you looking for an extremely efficient gasoline engine in the 4-stroke range? This is the right place for you to know more about the Bonhoeffer Gasoline Engine range. This is the 3 HP model under the 4-Stroke range. We use OHV overhead valve technology in our engines to make them more efficient and powerful. The fuel tank capacity of this machine is 1.2L, and the oil tank capacity is 500ml. The starting system of the engine is retractable, and the recommended oil to use the machine is SAE10W-30.'
            },
            {
              title: 'We Deal in Best Quality Gasoline Engines',
              text: 'Our gasoline engine range is extensive, and this range allows you to find the perfect gasoline engine for your requirements. We have different gasoline engine products with other capabilities. The 4-stroke engine is the most popular range right now in the market and is appropriate for various operations.'
            }
          ],
          descriptionImage: 'https://bonhoeffermachines.com/en/public/machines/specification_dark_1716960288_78a35a70f48a44492569.webp',
          showcaseImages: [
            'https://bonhoeffermachines.com/en/public/machines/showcase-1-bon-p-ge-3.0hp.webp',
            'https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-3.0-2.webp',
            'https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-3.0-3.webp'
          ],
          isBannerImage: false,
          bannerImage: '',
          isVideo: true,
          videoUrls: [
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/_sLPGCn5tfE' },
            { title: 'Air Cleaner Troubleshooting', url: 'https://www.youtube.com/embed/SStI7hj9cTU' },
            { title: 'Carburetor Troubleshooting', url: 'https://www.youtube.com/embed/vvHkyxUs2yM' }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: 'https://bonhoeffermachines.com/en/public/machines/specification_left_1716892944_7678b3e7e9035c703576.webp',
          catalougeRight: 'https://bonhoeffermachines.com/en/public/machines/specification_light_1716892953_b764ba64ad4692e1a03d.webp',
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/BON-P-GE-3.0HP.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GE-3.0HP.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-GE-3.0HP.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-GE-3.0HP.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: 'Engine', value: '3.0 HP' },
            { label: 'Technology', value: 'OHV, overhead valves' },
            { label: 'Type', value: '4 Stroke' },
            { label: 'Cooling system', value: 'Air' },
            { label: 'Cylinder diameter', value: '51*38.8 mm' },
            { label: 'Maximum power', value: '4000 Rpm' },
            { label: 'Torque', value: '3.7 Nm' },
            { label: 'Fuel tank capacity', value: '1.2 Liters' },
            { label: 'Oil tank capacity', value: '500 ml' },
            { label: 'Starting system', value: 'Retractable' },
            { label: 'Recommended oil', value: 'SAE10W-30' }
          ],
          features: [
            'OHV design enhances combustion efficiency',
            'High power-to-displacement ratio',
            'Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle',
            'High quality materials and purpose-built components which ensure reliable, long-term use',
            'Meets world\'s most stringent environmental legislation',
            'High Fuel Efficient Engine',
            'Low Oil Consumption'
          ]
        },
        "BON-P-GE-3.5HP": {
          "name": "Gasoline Engine",
          "model": "BON-P-GE-3.5HP",
          "description": [
            {
              "title": "BON-P-GE-3.5HP - Best Gasoline Engines for Agriculture",
              "text": "Gasoline engines are widely used in different industries, such as agriculture, construction, etc. This engine is a type of internal combustion engine that generates power by burning a volatile liquid fuel. The gas engine includes engine block, spark plug, crankshaft, pistons, and cylinders. We can divide these engines based on their types and various factors, including fuel management, ignition, rotor arrangement, piston and cylinder, strokes per cycle, cooling system and valve type and location."
            },
            {
              "title": "4000 RPM and 1.25 Litre Capacity",
              "text": "BON-P-GE-3.5HP is a 4-Stroke Gasoline Engine by Bonhoeffer with an air-cooling feature and a 4000 maximum RPM capability. The fuel tank capacity is 1.25 Litres, and the oil tank capacity is 500 ml. The recommended oil for this product is SAE10W-30. The model is one of the best gas engines for power generation."
            }
          ],
          "descriptionImage": "https://bonhoeffermachines.com/en/public/machines/specification_dark_1716960316_c6c38ce4e288e832ea8e.webp",
          "showcaseImages": [
            "https://bonhoeffermachines.com/en/public/machines/showcase-1-bon-p-ge-3.5hp.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-3.0-2.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-3.0-3.webp"
          ],
          "isBannerImage": false,
          "bannerImage": "",
          "isVideo": true,
          "videoUrls": [
            { "title": "Troubleshooting", "url": "https://www.youtube.com/embed/_sLPGCn5tfE" },
            { "title": "Air Cleaner Troubleshooting", "url": "https://www.youtube.com/embed/SStI7hj9cTU" },
            { "title": "Carburetor Troubleshooting", "url": "https://www.youtube.com/embed/vvHkyxUs2yM" }
          ],
          "isCatalogueLeft": true,
          "isCatalogueRight": true,
          "catalougeLeft": "https://bonhoeffermachines.com/en/public/machines/specification_left_1716892485_bb8bf38b5ead7da6f327.webp",
          "catalougeRight": "https://bonhoeffermachines.com/en/public/machines/specification_light_1716892494_b70309b52753b0c5b291.webp",
          "isWorkshopManual": true,
          "workshopManualUrl": "https://bonhoeffermachines.com/en/public/workshop_pdf/BON-P-GE-3.5HP.pdf",
          "isUserManual": true,
          "userManualUrl": "https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GE-3.5HP.pdf",
          "isBrochure": true,
          "brochureUrl": "https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-GE-3.5HP.pdf",
          "isSpareParts": true,
          "sparePartsUrl": "https://bonhoeffermachines.com/en/public/pdfs/BON-P-GE-3.5HP.pdf",
          "warrantyTime": 36,
          "isFMTTI": false,
          "specifications": [
            { "label": "Engine", "value": "3.5 HP" },
            { "label": "Technology", "value": "OHV, overhead valves" },
            { "label": "Type", "value": "4 Stroke" },
            { "label": "Cooling system", "value": "Air" },
            { "label": "Cylinder diameter", "value": "57*38.8 mm" },
            { "label": "Maximum power", "value": "4000 Rpm" },
            { "label": "Torque", "value": "4.4 Nm" },
            { "label": "Fuel tank capacity", "value": "1.25 Liters" },
            { "label": "Oil tank capacity", "value": "500 ml" },
            { "label": "Starting System", "value": "Retractable" },
            { "label": "Recommended oil", "value": "SAE10W-30" }
          ],
          "features": [
            "OHV design enhances combustion efficiency",
            "High power-to-displacement ratio",
            "Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle",
            "High quality materials and purpose-built components which ensure reliable, long-term use",
            "Meets world's most stringent environmental legislation",
            "High Fuel Efficient Engine",
            "Low Oil Consumption"
          ]
        },
        "BON-P-GE-4.0HP": {
          "name": "Gasoline Engine",
          "model": "BON-P-GE-4.0HP",
          "description": [
            {
              "title": "Bonhoeffer 4-Stroke 4 HP Gasoline Engine – Powerful and Reliable",
              "text": "A gasoline engine is a heat engine powered by gas. These engines are commonly used to move motor vehicles and agricultural equipment. A gasoline engine is a piston-driven gasoline engine. Gasoline Engines by Bonhoeffer Machines are powerful and available in an extensive range. OHV is the technology of the engine with 4-stroke capability. 500ml is the oil tank capacity of the engine."
            },
            {
              "title": "Powerful Gas Engines for Operations",
              "text": "We at Bonhoeffer Machines design and deliver the best quality machinery range, and our gasoline engines are extremely powerful for different operations. BON-P-GE-4.0HP is a 4-stroke 4 HP gasoline engine that powers many other machines, including cars and trucks. They are the most popular option for moving large quantities of people and goods. Basically, a gasoline engine is a mix of fuel and air that is compressed and ignited. This is the gas law process."
            }
          ],
          "descriptionImage": "https://bonhoeffermachines.com/en/public/machines/specification_dark_1716960347_6cf70b5d11eadcf84c68.webp",
          "showcaseImages": [
            "https://bonhoeffermachines.com/en/public/machines/showcase-1-bon-p-ge-4.0hp.webp"
          ],
          "isBannerImage": false,
          "bannerImage": "",
          "isVideo": true,
          "videoUrls": [
            { "title": "Troubleshooting", "url": "https://www.youtube.com/embed/_sLPGCn5tfE" },
            { "title": "Air Cleaner Troubleshooting", "url": "https://www.youtube.com/embed/SStI7hj9cTU" },
            { "title": "Carburetor Troubleshooting", "url": "https://www.youtube.com/embed/vvHkyxUs2yM" }
          ],
          "isCatalogueLeft": true,
          "isCatalogueRight": true,
          "catalougeLeft": "https://bonhoeffermachines.com/en/public/machines/specification_left_1716886948_1dabda7d7b9cee395bba.webp",
          "catalougeRight": "https://bonhoeffermachines.com/en/public/machines/specification_light_1716886964_4e8c0a1a8c853e5972bd.webp",
          "isWorkshopManual": true,
          "workshopManualUrl": "https://bonhoeffermachines.com/en/public/workshop_pdf/BON-P-GE-4.0HP.pdf",
          "isUserManual": true,
          "userManualUrl": "https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GE-4.0HP.pdf",
          "isBrochure": true,
          "brochureUrl": "https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-GE-4.0HP.pdf",
          "isSpareParts": true,
          "sparePartsUrl": "https://bonhoeffermachines.com/en/public/pdfs/BON-P-GE-4.0HP.pdf",
          "warrantyTime": 36,
          "isFMTTI": false,
          "specifications": [
            { "label": "Engine", "value": "4.0 HP" },
            { "label": "Technology", "value": "OHV, overhead valves" },
            { "label": "Type", "value": "4 Stroke" },
            { "label": "Cooling system", "value": "Air" },
            { "label": "Cylinder diameter", "value": "61*45 mm" },
            { "label": "Maximum power", "value": "4000 Rpm" },
            { "label": "Torque", "value": "6.5 Nm" },
            { "label": "Fuel tank capacity", "value": "1.2 Liters" },
            { "label": "Oil tank capacity", "value": "500 ml" },
            { "label": "Starting System", "value": "Retractable" },
            { "label": "Recommended oil", "value": "SAE10W-30" }
          ],
          "features": [
            "OHV design enhances combustion efficiency",
            "High power-to-displacement ratio",
            "Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle",
            "High quality materials and purpose-built components which ensure reliable, long-term use",
            "Meets world's most stringent environmental legislation",
            "High Fuel Efficient Engine",
            "Low Oil Consumption"
          ]
        },
        "BON-P-GE-5.0HP": {
          "name": "Gasoline Engine",
          "model": "BON-P-GE-5.0HP",
          "description": [
            {
              "title": "BON-P-GE-5.0HP – Best Gasoline Engines by Bonhoeffer",
              "text": "Gasoline engines are ideal for high-power applications because they burn a volatile liquid fuel with ignition powered by an electric spark. These engines are built to meet the requirements for power-plant applications. Gas engines are widely used in automobiles, small trucks, general aviation aircraft, outboard and inboard marine units, moderate-sized stationary pumping, lighting plants, machine tools, and power tools."
            },
            {
              "title": "4-Stroke 5 HP Engine with 500ml Oil Tank Capacity",
              "text": "BON-P-GE-5.0HP is the ultimate gasoline engine for high-power operations with OHV overhead valve technology. This is a 4-stroke gas engine with an air-cooling system, and the fuel tank capacity of the model is 1.2L. 500ml is the oil tank capacity with a retractable starting system. Bonhoeffer gasoline engines range is best in the market."
            }
          ],
          "descriptionImage": "https://bonhoeffermachines.com/en/public/machines/specification_dark_1716960438_6a4d87a5f24a910353bb.webp",
          "showcaseImages": [
            "https://bonhoeffermachines.com/en/public/machines/showcase-1-bon-p-ge-5.0hp.webp"
          ],
          "isBannerImage": false,
          "bannerImage": "",
          "isVideo": true,
          "videoUrls": [
            { "title": "Troubleshooting", "url": "https://www.youtube.com/embed/_sLPGCn5tfE" },
            { "title": "Air Cleaner Troubleshooting", "url": "https://www.youtube.com/embed/SStI7hj9cTU" },
            { "title": "Carburetor Troubleshooting", "url": "https://www.youtube.com/embed/vvHkyxUs2yM" }
          ],
          "isCatalogueLeft": true,
          "isCatalogueRight": true,
          "catalougeLeft": "https://bonhoeffermachines.com/en/public/machines/specification_left_1716888731_d7fe66da037788fefa7b.webp",
          "catalougeRight": "https://bonhoeffermachines.com/en/public/machines/specification_light_1716888745_75614748e240f33324d2.webp",
          "isWorkshopManual": true,
          "workshopManualUrl": "https://bonhoeffermachines.com/en/public/workshop_pdf/BON-P-GE-5.0HP.pdf",
          "isUserManual": true,
          "userManualUrl": "https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GE-5.0HP.pdf",
          "isBrochure": true,
          "brochureUrl": "https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-GE-5.0HP.pdf",
          "isSpareParts": true,
          "sparePartsUrl": "https://bonhoeffermachines.com/en/public/pdfs/BON-P-GE-5.0HP.pdf",
          "warrantyTime": 36,
          "isFMTTI": false,
          "specifications": [
            { "label": "Engine", "value": "5.0 HP" },
            { "label": "Technology", "value": "OHV, overhead valves" },
            { "label": "Type", "value": "4 Stroke" },
            { "label": "Cooling system", "value": "Air" },
            { "label": "Cylinder diameter", "value": "65*45 mm" },
            { "label": "Maximum power", "value": "4000 Rpm" },
            { "label": "Torque", "value": "7.2 Nm" },
            { "label": "Fuel tank capacity", "value": "1.2 Liters" },
            { "label": "Oil tank capacity", "value": "500 ml" },
            { "label": "Starting System", "value": "Retractable" },
            { "label": "Recommended oil", "value": "SAE10W-30" }
          ],
          "features": [
            "OHV design enhances combustion efficiency",
            "High power-to-displacement ratio",
            "Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle",
            "High quality materials and purpose-built components which ensure reliable, long-term use",
            "Meets world's most stringent environmental legislation",
            "High Fuel Efficient Engine",
            "Low Oil Consumption"
          ]
        },
        "BON-P-GE-7.0HP": {
          "name": "Gasoline Engine",
          "model": "BON-P-GE-7.0HP",
          "description": [
            {
              "title": "BON-P-GE-7.0HP – Best Gas Power 4-Stroke Engine",
              "text": "A gas engine is ideal for the high energy operations. When you are looking for the best quality gasoline engines, only a few brands are credible, and Bonhoeffer is one of them. Bonhoeffer Gasoline Engines are reliable, efficient, and powerful for the various operations in agriculture and other industries. BON-P-GE-7.0HP is a model of the gas engine by Bonhoeffer, which is a 4-stroke gas engine with 4000 maximum RPM. A gas engine consists of different types of systems through which fuel is converted into energy. This process is the result of various actions such as combustion, compression, intake, and power. Combustion is an important process that occurs inside the engine cylinders in which air and fuel are mixed and combusted by an electric spark. Pistons will automatically move up and down inside the cylinder with the heat and pressure."
            },
            {
              "title": "Air Cooling System with 600 ml Oil Tank Capacity",
              "text": "This is a 7 HP gas engine with OHV overhead valve technology and a 4-stroke engine with an air cooling system. 208 cc displacement of the engine is ideal for operations, and the 600ml oil tank capacity. The machine's starting system is retractable."
            }
          ],
          "descriptionImage": "https://bonhoeffermachines.com/en/public/machines/specification_dark_1717060579_ada5171a0e66aa81adba.webp",
          "showcaseImages": [
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-7.0hp.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-7.0hp-2.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-7.0hp-3.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-7.0hp-4.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-7.0hp-5.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-7.0-1.webp"
          ],
          "isBannerImage": false,
          "bannerImage": "",
          "isVideo": true,
          "videoUrls": [
            { "title": "Unboxing Gasoline Engine", "url": "https://www.youtube.com/embed/41C1p4dkqYY" },
            { "title": "Troubleshooting", "url": "https://www.youtube.com/embed/SStI7hj9cTU" },
            { "title": "Carburetor Troubleshooting", "url": "https://www.youtube.com/embed/vvHkyxUs2yM" }
          ],
          "isCatalogueLeft": true,
          "isCatalogueRight": true,
          "catalougeLeft": "https://bonhoeffermachines.com/en/public/machines/specification_left_1716889104_dab7f3ccdbf92878b256.webp",
          "catalougeRight": "https://bonhoeffermachines.com/en/public/machines/specification_light_1716889112_957989c917d65c256914.webp",
          "isWorkshopManual": true,
          "workshopManualUrl": "https://bonhoeffermachines.com/en/public/workshop_pdf/BON-P-GE-7.0HP.pdf",
          "isUserManual": true,
          "userManualUrl": "https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GE-7.0HP-and-BON-P-GE-9.0HP-and-BON-P-GE-14.0HP-ENGLISH-MANUAL.pdf",
          "isBrochure": true,
          "brochureUrl": "https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-GE-7.0HP.pdf",
          "isSpareParts": true,
          "sparePartsUrl": "https://bonhoeffermachines.com/en/public/pdfs/BON-P-GE-7.0HP-and-GB210.pdf",
          "warrantyTime": 36,
          "isFMTTI": false,
          "specifications": [
            { "label": "Engine Power", "value": "7.0HP" },
            { "label": "Displacement", "value": "208cc" },
            { "label": "Technology", "value": "OHV, Overhead valves" },
            { "label": "Type", "value": "4 Stroke" },
            { "label": "Cooling System", "value": "Air" },
            { "label": "Cylinder Diameter", "value": "70x54mm" },
            { "label": "Torque", "value": "11.5 N m" },
            { "label": "Fuel Tank Capacity", "value": "4.2 Liters" },
            { "label": "Oil Tank Capacity", "value": "600 ml" },
            { "label": "Starting System", "value": "Retractable" }
          ],
          "features": [
            "OHV design enhances combustion efficiency",
            "High power-to-displacement ratio",
            "Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle",
            "High quality materials and purpose-built components which ensure reliable, long-term use",
            "Meets world's most stringent environmental legislation",
            "High Fuel Efficient Engine",
            "Low Oil Consumption"
          ]
        },
        "BON-P-GE-9.0HP": {
          "name": "Gasoline Engine",
          "model": "BON-P-GE-9.0HP",
          "description": [
            {
              "title": "BON-P-GE-9.0HP – Durable and Low-Maintenance Gas Engine",
              "text": "Gas engines are the most popular engines nowadays because of their many advantages. Bonhoeffer presents the most potent and premium gasoline engine range in the industry. We have different models with different power and capacity features. BON-P-GE-9.0HP is a 9 HP gas engine with a 7.5-litre fuel tank capacity. This is a four-stroke engine with 270 cc displacement. This engine range is durable and works on low maintenance requirements. This engine is designed to withstand rigorous requirements and have a longer lifespan."
            },
            {
              "title": "High-Performance Versatile Engines",
              "text": "There is no doubt that gas engines excel in their versatility and performance, and that\'s why Bonhoeffer Gasoline Engines are the best engines and suitable for a wide range of applications. These engines have high-energy output and are efficient. Therefore these machines can convert a high percentage of fuel energy into power."
            }
          ],
          "descriptionImage": "https://bonhoeffermachines.com/en/public/machines/specification_dark_1717060781_88fbc260f8b52547fdf7.webp",
          "showcaseImages": [
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-9.0hp.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-9.0hp-2.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-9.0hp-3.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-9.0hp-4.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-9.0hp-5.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-7.0-1.webp"
          ],
          "isBannerImage": false,
          "bannerImage": "",
          "isVideo": true,
          "videoUrls": [
            { "title": "Unboxing & Assembly", "url": "https://www.youtube.com/embed/bc9WpuGpLfI" },
            { "title": "Air Cleaner Troubleshooting", "url": "https://www.youtube.com/embed/SStI7hj9cTU" },
            { "title": "Carburetor Troubleshooting", "url": "https://www.youtube.com/embed/vvHkyxUs2yM" }
          ],
          "isCatalogueLeft": true,
          "isCatalogueRight": true,
          "catalougeLeft": "https://bonhoeffermachines.com/en/public/machines/specification_left_1716891442_454a046af8af8d24a3b5.webp",
          "catalougeRight": "https://bonhoeffermachines.com/en/public/machines/specification_light_1716891452_4e3c47a1b3ccf516a7a9.webp",
          "isWorkshopManual": true,
          "workshopManualUrl": "https://bonhoeffermachines.com/en/public/workshop_pdf/BON-P-GE-9.0HP.pdf",
          "isUserManual": true,
          "userManualUrl": "https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GE-7.0HP-and-BON-P-GE-9.0HP-and-BON-P-GE-14.0HP-ENGLISH-MANUAL.pdf",
          "isBrochure": true,
          "brochureUrl": "https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-GE-9.0HP.pdf",
          "isSpareParts": true,
          "sparePartsUrl": "https://bonhoeffermachines.com/en/public/pdfs/BON-P-GE-9.0HP.pdf",
          "warrantyTime": 36,
          "isFMTTI": false,
          "specifications": [
            { "label": "Engine Power", "value": "9.0HP" },
            { "label": "Displacement", "value": "270cc" },
            { "label": "Technology", "value": "OHV, Overhead valves" },
            { "label": "Type", "value": "4 Stroke" },
            { "label": "Cooling System", "value": "Air" },
            { "label": "Cylinder Diameter", "value": "70x58mm" },
            { "label": "Torque", "value": "17.5 Nm" },
            { "label": "Fuel Tank Capacity", "value": "7.5 Liters" },
            { "label": "Oil Tank Capacity", "value": "1100 ml" },
            { "label": "Starting System", "value": "Retractable" }
          ],
          "features": [
            "OHV design enhances combustion efficiency",
            "High power-to-displacement ratio",
            "Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle",
            "High quality materials and purpose-built components which ensure reliable, long-term use",
            "Meets world's most stringent environmental legislation",
            "High Fuel Efficient Engine",
            "Low Oil Consumption"
          ]
        },
        "BON-P-GE-13.0HP": {
          "name": "Gasoline Engine",
          "model": "BON-P-GE-13.0HP",
          "description": [
            {
              "title": "BON-P-GE-13.0HP – Powerhouse of Efficiency and Energy",
              "text": "Among the wide gasoline engines range, we have one of the best models for the customers which is BON-P-GE-13.0HP. It is a Bonhoeffer 13HP 4 Stroke gasoline engine with OHV and Overhead valve technology. If you are looking for the most reliable and efficient gasoline engine for your requirements, then this model offers you a 1100 ml oil tank capacity."
            },
            {
              "title": "Reliable Power with Rapid Start-Up and 7.5L Fuel Capacity",
              "text": "Gas engines are ideal for their high energy output and efficiency in converting fuel into power. This model of Bonhoeffer is capable of rapid start-up and adjusting to load changes. Hence, all these features make this model efficient in various operational tasks. Starting system of the model is Retractable and fuel tank capacity is 7.5 litres."
            }
          ],
          "descriptionImage": "https://bonhoeffermachines.com/en/public/machines/specification_dark_1717060001_757e6a63120420200402.webp",
          "showcaseImages": [
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-9.0hp.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-13.0hp-2.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-13.0hp-3.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-13.0hp-4.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-13.0hp-5.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-13-1.webp"
          ],
          "isBannerImage": false,
          "bannerImage": "",
          "isVideo": true,
          "videoUrls": [
            { "title": "Unboxing and Assembly", "url": "https://www.youtube.com/embed/slbT6mchH8w" },
            { "title": "Air Cleaner Troubleshooting", "url": "https://www.youtube.com/embed/SStI7hj9cTU" },
            { "title": "Carburetor Troubleshooting", "url": "https://www.youtube.com/embed/vvHkyxUs2yM" }
          ],
          "isCatalogueLeft": true,
          "isCatalogueRight": true,
          "catalougeLeft": "https://bonhoeffermachines.com/en/public/machines/specification_left_1716896577_c4f373f5ed0ef194af25.webp",
          "catalougeRight": "https://bonhoeffermachines.com/en/public/machines/specification_light_1716896590_e7e095eb397ddc2a9d63.webp",
          "isWorkshopManual": true,
          "workshopManualUrl": "https://bonhoeffermachines.com/en/public/workshop_pdf/BON-P-GE-13.0HP.pdf",
          "isUserManual": true,
          "userManualUrl": "https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GE-7.0HP-and-BON-P-GE-9.0HP-and-BON-P-GE-14.0HP-ENGLISH-MANUAL.pdf",
          "isBrochure": true,
          "brochureUrl": "https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-GE-13.0HP.pdf",
          "isSpareParts": true,
          "sparePartsUrl": "https://bonhoeffermachines.com/en/public/pdfs/BON-P-GE-13.0HP-and-GB390.pdf",
          "warrantyTime": 36,
          "isFMTTI": false,
          "specifications": [
            { "label": "Engine Power", "value": "13.0HP" },
            { "label": "Displacement", "value": "389cc" },
            { "label": "Technology", "value": "OHV, Overhead valves" },
            { "label": "Type", "value": "4 Stroke" },
            { "label": "Cooling System", "value": "Air" },
            { "label": "Cylinder Diameter", "value": "88x64mm" },
            { "label": "Torque", "value": "26.0 N-m" },
            { "label": "Fuel Tank Capacity", "value": "7.5 Liters" },
            { "label": "Oil Tank Capacity", "value": "1100 ml" },
            { "label": "Starting System", "value": "Retractable" }
          ],
          "features": [
            "OHV design enhances combustion efficiency",
            "High power-to-displacement ratio",
            "Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle",
            "High quality materials and purpose-built components which ensure reliable, long-term use",
            "Meets world's most stringent environmental legislation",
            "High Fuel Efficient Engine",
            "Low Oil Consumption"
          ]
        },
        "BON-P-GE-14.0HP": {
          "name": "Gasoline Engine",
          "model": "BON-P-GE-14.0HP",
          "description": [
            {
              "title": "BON-P-GE-14.0HP",
              "text": "Gasoline engines have now become the new example in the modern energy landscape and are known for their efficiency and durability. The versatility in these engines represents the significant evolution and adds different technology advancements and environmental needs. A gas engine is a machine that operates by burning fuel. Bonhoeffer engine models are vast, and the 14 HP model is the popular gasoline engine ideal for various industries operations."
            },
            {
              "title": "1100ml Oil Tank Capacity",
              "text": "BON-P-GE-14.0HP is one of the best gasoline engines in the market because of various reasons and features. The 1100ml oil tank capacity with the 7.5-liter fuel tank capacity makes this engine ideal for heavy-duty applications."
            }
          ],
          "descriptionImage": "https://bonhoeffermachines.com/en/public/machines/specification_dark_1717060694_91a16ce8b9987af30ab5.webp",
          "showcaseImages": [
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-9.0hp.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-13.0hp-2.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-13.0hp-3.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-13.0hp-4.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-13.0hp-5.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-13-1.webp"
          ],
          "isBannerImage": false,
          "bannerImage": "",
          "isVideo": true,
          "videoUrls": [
            { "title": "Unboxing and Installation", "url": "https://www.youtube.com/embed/slbT6mchH8w" },
            { "title": "Air Cleaner Troubleshooting", "url": "https://www.youtube.com/embed/SStI7hj9cTU" },
            { "title": "Carburetor Troubleshooting", "url": "https://www.youtube.com/embed/vvHkyxUs2yM" }
          ],
          "isCatalogueLeft": true,
          "isCatalogueRight": true,
          "catalougeLeft": "https://bonhoeffermachines.com/en/public/machines/specification_left_1716896252_0f40c1dbb7e7a34b2df2.webp",
          "catalougeRight": "https://bonhoeffermachines.com/en/public/machines/specification_light_1716896263_a3f29f26dabe73fa0995.webp",
          "isWorkshopManual": true,
          "workshopManualUrl": "https://bonhoeffermachines.com/en/public/workshop_pdf/BON-P-GE-14.0HP.pdf",
          "isUserManual": true,
          "userManualUrl": "https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GE-7.0HP-and-BON-P-GE-9.0HP-and-BON-P-GE-14.0HP-ENGLISH-MANUAL.pdf",
          "isBrochure": true,
          "brochureUrl": "https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-GE-14.0HP.pdf",
          "isSpareParts": true,
          "sparePartsUrl": "https://bonhoeffermachines.com/en/public/pdfs/BON-P-GE-14.0HP-and-GB390.pdf",
          "warrantyTime": 36,
          "isFMTTI": false,
          "specifications": [
            { "label": "Engine Power", "value": "14.0HP" },
            { "label": "Displacement", "value": "420cc" },
            { "label": "Technology", "value": "OHV, Overhead valves" },
            { "label": "Type", "value": "4 Stroke" },
            { "label": "Cooling System", "value": "Air" },
            { "label": "Cylinder Diameter", "value": "70x58mm" },
            { "label": "Torque", "value": "27.0 N-m" },
            { "label": "Fuel Tank Capacity", "value": "7.5 Liters" },
            { "label": "Oil Tank Capacity", "value": "1100 ml" },
            { "label": "Starting System", "value": "Retractable" }
          ],
          "features": [
            "OHV design enhances combustion efficiency",
            "High power-to-displacement ratio",
            "Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle",
            "High quality materials and purpose-built components which ensure reliable, long-term use",
            "Meets world's most stringent environmental legislation",
            "High Fuel Efficient Engine",
            "Low Oil Consumption"
          ]
        },
        "BON-P-GE-16.0HP": {
          "name": "Gasoline Engine",
          "model": "BON-P-GE-16.0HP",
          "description": [
            {
              "title": "BON-P-GE-16.0HP Premium Gasoline Engine",
              "text": "Gas engines are powerful and used for internal combustion. In this type of engine, air enters and is combined with fuel and is converted into energy. Bonhoeffer represents the gasoline engines' premium range, and we have extensive models of engines, and a 16HP gas engine is one of them. BON-P-GE-16.0HP is an OHV technology-based 4-stroke engine with an air cooling system. The cylinder diameter of the engine is 92x69mm, and the maximum power of the engine is 16.0 HP and 3900 RPM. Fuel tank capacity is 7.5 liters."
            },
            {
              "title": "Gas Engines Have Economical Advantages",
              "text": "Gas engines also have environmental benefits and economic advantages. These engines are cost-effective options and ideal for operation and maintenance. Bonhoeffer Engines can enhance durability and be cost-effective for different applications."
            }
          ],
          "descriptionImage": "https://bonhoeffermachines.com/en/public/machines/specification_dark_1716982091_73620cda4882b517bfcc.webp",
          "showcaseImages": [
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-16.0hp.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-16.0hp-2.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-16.0hp-3.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-16.0hp-4.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-16.0hp-5.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-13-1.webp"
          ],
          "isBannerImage": false,
          "bannerImage": "",
          "isVideo": true,
          "videoUrls": [
            { "title": "Unboxing and Installation", "url": "https://www.youtube.com/embed/slbT6mchH8w" },
            { "title": "Air Cleaner Troubleshooting", "url": "https://www.youtube.com/embed/SStI7hj9cTU" },
            { "title": "Carburetor Troubleshooting", "url": "https://www.youtube.com/embed/vvHkyxUs2yM" }
          ],
          "isCatalogueLeft": true,
          "isCatalogueRight": true,
          "catalougeLeft": "https://bonhoeffermachines.com/en/public/machines/specification_left_1716896252_0f40c1dbb7e7a34b2df2.webp",
          "catalougeRight": "https://bonhoeffermachines.com/en/public/machines/specification_light_1716896263_a3f29f26dabe73fa0995.webp",
          "isWorkshopManual": true,
          "workshopManualUrl": "https://bonhoeffermachines.com/en/public/workshop_pdf/BON-P-GE-16.0HP.pdf",
          "isUserManual": true,
          "userManualUrl": "https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GE-7.0HP-and-BON-P-GE-9.0HP-and-BON-P-GE-14.0HP-ENGLISH-MANUAL.pdf",
          "isBrochure": true,
          "brochureUrl": "https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-GE-16.0HP.pdf",
          "isSpareParts": true,
          "sparePartsUrl": "https://bonhoeffermachines.com/en/public/pdfs/BON-P-GE-16.0HP.pdf",
          "warrantyTime": 36,
          "isFMTTI": false,
          "specifications": [
            { "label": "Engine", "value": "16.0 HP" },
            { "label": "Displacement", "value": "420cc" },
            { "label": "Technology", "value": "OHV, Overhead valves" },
            { "label": "Type", "value": "4 Stroke" },
            { "label": "Cooling System", "value": "Air" },
            { "label": "Cylinder Diameter", "value": "92x69mm" },
            { "label": "Maximum Power", "value": "16.0 HP / 3900 RPM" },
            { "label": "Torque", "value": "29 Nm" },
            { "label": "Fuel Tank Capacity", "value": "7.5 Liters" },
            { "label": "Oil Tank Capacity", "value": "1100 ml" },
            { "label": "Starting System", "value": "Retractable" },
            { "label": "Recommended Oil", "value": "SAE10W-30" }
          ],
          "features": [
            "OHV design enhances combustion efficiency",
            "High power-to-displacement ratio",
            "Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle",
            "High quality materials and purpose-built components which ensure reliable, long-term use",
            "Meets world's most stringent environmental legislation",
            "High Fuel Efficient Engine",
            "Low Oil Consumption"
          ]
        },
        "BON-P-GE-24.0HP": {
          "name": "Gasoline Engine",
          "model": "BON-P-GE-24.0HP",
          "description": [
            {
              "title": "Electric Starting System Gasoline Engine with 24 HP Power",
              "text": "This is one of the best models of gas engines by Bonhoeffer Machines. The engine power is 24 HP which is very impressive and V Twin Motor 2 Cylinder technology used in this machine. This is a 4-stroke machine and frame quality are very professional of this gasoline engine. This comes in the heavy-duty coil and maximum power of the engine 24 HP and torque of the machine is 47 Nm. The oil tank capacity of the machine is 1500ml and starting system is electric."
            },
            {
              "title": "BON-P-GE-24.0HP: Reliable Power for Your Needs",
              "text": "The model is constructed with a professional-quality frame and heavy-duty coil, the BON-P-GE-24.0HP is built to withstand tough conditions and ensure long-lasting durability. The engine features a gasoline alternator and an optimized cylinder diameter of 82x71 mm, which contribute to its high efficiency and performance. With a torque of 47 Nm and a 1500 ml oil tank capacity, this engine offers powerful performance and extended running times. The electric starting system provides quick and easy start-ups, while the recommended SAE10W-30 oil ensures optimal performance and longevity."
            }
          ],
          "descriptionImage": "https://bonhoeffermachines.com/en/public/machines/specification_dark_1721301338_c026d54a9e430e0c1750.webp",
          "showcaseImages": [
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-24.0hp.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-24.0hp-2.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-24.0hp-3.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-24.0hp-4.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-24.0hp-5.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-13-1.webp"
          ],
          "isBannerImage": false,
          "bannerImage": "",
          "isVideo": true,
          "videoUrls": [
            { "title": "Air Cleaner Troubleshooting", "url": "https://www.youtube.com/embed/SStI7hj9cTU" },
            { "title": "Carburetor Troubleshooting", "url": "https://www.youtube.com/embed/vvHkyxUs2yM" }
          ],
          "isCatalogueLeft": true,
          "isCatalogueRight": true,
          "catalougeLeft": "https://bonhoeffermachines.com/en/public/machines/specification_left_1716893308_01475680772c9f754f87.webp",
          "catalougeRight": "https://bonhoeffermachines.com/en/public/machines/specification_light_1716893317_fc3ad6beae67a3b6dac2.webp",
          "isWorkshopManual": false,
          "isUserManual": false,
          "isBrochure": true,
          "brochureUrl": "https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-GE-24.0HP.pdf",
          "isSpareParts": true,
          "sparePartsUrl": "https://bonhoeffermachines.com/en/public/pdfs/BON-P-GE-24.0HP.pdf",
          "warrantyTime": 36,
          "isFMTTI": false,
          "specifications": [
            { "label": "Engine", "value": "24.0 HP" },
            { "label": "Technology", "value": "V TWIN - MOTOR 2 Cylinder" },
            { "label": "Type", "value": "4 Stroke" },
            { "label": "Frame", "value": "Professional quality" },
            { "label": "Coil type", "value": "Heavy duty" },
            { "label": "Alternator Material", "value": "Gasoline" },
            { "label": "Cylinder Diameter", "value": "82x71mm" },
            { "label": "Maximum Power", "value": "24.0 HP / 3900 RPM" },
            { "label": "Torque", "value": "47 Nm" },
            { "label": "Oil Tank Capacity", "value": "1500 ml" },
            { "label": "Starting System", "value": "Electric" },
            { "label": "Recommended Oil", "value": "SAE 10W-30" }
          ],
          "features": [
            "OHV design enhances combustion efficiency",
            "High power-to-displacement ratio",
            "Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle",
            "High quality materials and purpose-built components which ensure reliable, long-term use",
            "Meets world's most stringent environmental legislation",
            "High Fuel Efficient Engine",
            "Low Oil Consumption"
          ]
        },
        "BON-P-GE-34.0HP": {
          "name": "Gasoline Engine",
          "model": "BON-P-GE-34.0HP",
          "description": [
            {
              "title": "BON-P-GE-34.0HP: Powerful and Efficient Engine for Your Needs",
              "text": "The engine model of BON-P-GE-34.0HP by Bonhoeffer is the amazing in terms of strength and reliability because it is designed to meet the demands of heavy-duty applications with ease. This high-performance engine delivers a robust 34.0 HP, ensuring you have the power you need for even the most challenging tasks. With its advanced V-TWIN, 2-cylinder technology and smooth 4-stroke operation, the BON-P-GE-34.0HP provides superior performance and efficiency, making it ideal for a variety of industrial, agricultural, and commercial uses."
            },
            {
              "title": "Quick and Hassle-Free Operations",
              "text": "The Bonhoeffer 34 HP gasoline engine built to last, this engine features a professional-grade frame and a heavy-duty coil, ensuring durability and reliable operation in tough conditions. The efficient alternator and optimized 90*78.5 mm cylinder design maximize power output and efficiency, while the 2500 ml oil tank allows for extended running times. The electric starting system ensures quick and hassle-free startups, and the recommended SAE10W-30 oil keeps the engine running smoothly."
            }
          ],
          "showcaseImages": [
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-34.0hp.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-34.0hp-2.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-34.0hp-3.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-34.0hp-4.webp",
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-ge-34.0hp-5.webp"
          ],
          "bannerImage": "https://bonhoeffermachines.com/en/public/machines/specification_dark_1721301366_272dadd4c382457aeded.webp",
          "videoUrls": [
            { "title": "Air Cleaner Troubleshooting", "url": "https://www.youtube.com/embed/SStI7hj9cTU" },
            { "title": "Carburetor Troubleshooting", "url": "https://www.youtube.com/embed/vvHkyxUs2yM" }
          ],
          "isBrochure": true,
          "brochureUrl": "https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-GE-34.0HP.pdf",
          "isSpareParts": true,
          "sparePartsUrl": "https://bonhoeffermachines.com/en/public/pdfs/BON-P-GE-34.0HP.pdf",
          "warrantyTime": 36,
          "specifications": [
            { "label": "Engine", "value": "34.0 HP" },
            { "label": "Technology", "value": "V TWIN - 2 Cylinder ENGINE" },
            { "label": "Type", "value": "4 Stroke" },
            { "label": "Frame", "value": "Professional quality" },
            { "label": "Coil type", "value": "Heavy duty" },
            { "label": "Alternator Material", "value": "Gasoline Diameter" },
            { "label": "Cylinder", "value": "90*78.5 mm" },
            { "label": "Maximum Power", "value": "34.0 HP" },
            { "label": "Torque", "value": "71 Nm" },
            { "label": "Oil Tank Capacity", "value": "2500 ml" },
            { "label": "Starting System", "value": "Electric" },
            { "label": "Recommended Oil", "value": "SAE10W-30" }
          ],
          "features": [
            "OHV design enhances combustion efficiency",
            "High power-to-displacement ratio",
            "Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle",
            "High quality materials and purpose-built components which ensure reliable, long-term use",
            "Meets world's most stringent environmental legislation",
            "High Fuel Efficient Engine",
            "Low Oil Consumption"
          ]
        },
      },

      'gasoline-generator': {
        'BON-P-GG-2.8KW': {
          name: 'Gasoline Generator',
          model: 'BON-P-GG-2.8KW',
          description: [
            {
              title: "High-Efficiency Power Generation with Bonhoeffer Gasoline Generator",
              text: "The Bonhoeffer Gasoline Generator delivers a maximum power output of 2.8 KW and a rated power of 2.5 KW, making it a reliable choice for various power needs. Featuring a 100% copper stator coil, this generator ensures efficient and stable power generation with a frequency range of 50 to 60 Hz. Its dual voltage capability (120V/240V) offers versatility, suitable for a wide range of applications. Powered by a robust 7 HP engine utilizing OHV (overhead valve) technology, the generator operates smoothly and efficiently, adhering to modern performance standards."
            },
            {
              title: "Durable and Long-Lasting Performance",
              text: "This 4-stroke gasoline generator is designed for durability and long-lasting performance. With an impressive execution time of 11.5 hours at 50% load and a substantial fuel tank capacity of 15 liters, it is perfect for extended use without frequent refueling. The retractable starting system ensures easy and reliable start-ups, while the 600 ml oil tank capacity supports optimal engine lubrication. Ideal for both residential and commercial use, the Bonhoeffer Gasoline Generator is a dependable power source that combines advanced technology with robust construction."
            }
          ],
          descriptionImage: 'https://bonhoeffermachines.com/en/public/machines/specification_dark_1722942262_5761ff55958740ee7697.webp',
          showcaseImages: [
            'https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-gg-2.8kw.webp'
          ],
          isBannerImage: false,
          bannerImage: '',
          isVideo: true,
          videoUrls: [
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/MtPUNBrBfTM' },
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/APK3obMIT5w' },
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/c5O_RQgAx4Q' }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: 'https://bonhoeffermachines.com/en/public/machines/specification_left_1724495423_b5b048612df06428371c.webp',
          catalougeRight: 'https://bonhoeffermachines.com/en/public/machines/specification_light_1724495433_fb00c2e1a769de9d99a2.webp',
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-manual-gasoline-generator.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GG-2.8-3.7-5.0-7.5-9.0.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-GG-2.8KW_1.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-GG-2.8KW.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: 'Maximum power', value: '2.8 KW' },
            { label: 'Rated Power', value: '2.5 KW' },
            { label: 'Stator coil', value: '100% Copper' },
            { label: 'Frequency', value: '50 o 60 Hz' },
            { label: 'Voltage', value: '120V/240V Dual voltage' },
            { label: 'Engine', value: '7 HP' },
            { label: 'Technology', value: 'OHV, overhead valves' },
            { label: 'Type', value: '4 Stroke' },
            { label: 'Execution time at 50% load', value: '11.5 Hour' },
            { label: 'Fuel tank capacity', value: '15 Liters' },
            { label: 'Starting System', value: 'Retractable' },
            { label: 'Oil tank capacity', value: '600 ml' }
          ],
          features: [
            'OHV design enhances combustion efficiency',
            'Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle',
            'High quality materials and purpose-built components which ensure reliable, long-term use',
            'Easy Start with Bonhoeffer world-class Bonhoeffer Engine',
            'Fuel Efficient & Environmentally Friendly',
            'Automatic Voltage Regulator (AVR) Technology',
            'Highly Heat Conductivity Product\'s with 100% cooper winding',
            'Super Quiet operation'
          ]
        },
        'BON-P-GG-3.7KW': {
          name: 'Gasoline Generator',
          model: 'BON-P-GG-3.7KW',
          description: [
            {
              title: "Power Through Any Task with the BON-P-GG-3.7KW Generator",
              text: "The BON-P-GG-3.7KW gasoline generator is engineered to deliver reliable power wherever you need it. With a maximum output of 3.7 KW and a rated power of 3.3 KW, this generator ensures consistent energy for your tools and appliances. Its stator coil, made from 100% copper, enhances durability and performance. Whether you're on a job site or need backup power at home, the dual voltage of 120V/240V provides the flexibility to power various devices with ease."
            },
            {
              title: "Robust Performance Meets Long-Lasting Reliability",
              text: "Designed with an 8 HP OHV engine and 4-stroke technology, the BON-P-GG-3.7KW generator offers powerful performance with exceptional efficiency. It boasts a generous 15-liter fuel tank, allowing up to 10 hours of execution time at 50% load. The retractable starting system ensures easy operation, while the 600 ml oil tank capacity keeps the engine running smoothly. Whether for work or emergency use, this generator is built to keep you powered up, hour after hour."
            }
          ],
          descriptionImage: 'https://bonhoeffermachines.com/en/public/machines/specification_dark_1722942298_85f04a36e939d469b00b.webp',
          showcaseImages: [
            'https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-gg-3.7kw.webp'
          ],
          isBannerImage: false,
          bannerImage: '',
          isVideo: true,
          videoUrls: [
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/MtPUNBrBfTM' },
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/APK3obMIT5w' },
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/c5O_RQgAx4Q' }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: 'https://bonhoeffermachines.com/en/public/machines/specification_left_1724496393_7715a9d07db64d21d148.webp',
          catalougeRight: 'https://bonhoeffermachines.com/en/public/machines/specification_light_1724496408_69aaac17ba9aa7859106.webp',
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-manual-gasoline-generator.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GG-2.8-3.7-5.0-7.5-9.0.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-GG-3.7KW_1.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-GG-3.7KW.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: 'Maximum power', value: '3.7 KW' },
            { label: 'Rated Power', value: '3.3 KW' },
            { label: 'Stator coil', value: '100% Copper' },
            { label: 'Frequency', value: '50 o 60 Hz' },
            { label: 'Voltage', value: '120V/240V Dual voltage' },
            { label: 'Engine', value: '8 HP' },
            { label: 'Technology', value: 'OHV, overhead valves' },
            { label: 'Type', value: '4 Stroke' },
            { label: 'Execution time at 50% load', value: '10.0 Hour' },
            { label: 'Fuel tank capacity', value: '15 Liters' },
            { label: 'Starting System', value: 'Retractable' },
            { label: 'Oil tank capacity', value: '600 ml' }
          ],
          features: [
            'OHV design enhances combustion efficiency',
            'Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle',
            'High quality materials and purpose-built components which ensure reliable, long-term use',
            'Easy Start with Bonhoeffer world-class Bonhoeffer Engine',
            'Fuel Efficient & Environmentally Friendly',
            'Automatic Voltage Regulator (AVR) Technology',
            'Highly Heat Conductivity Product\'s with 100% cooper winding',
            'Super Quiet operation'
          ]
        },
        'BON-P-GG-5.0KW': {
          name: 'Gasoline Generator',
          model: 'BON-P-GG-5.0KW',
          description: [
            {
              title: 'Experience Superior Power with the BON-P-GG-5.0KW Generator',
              text: 'The BON-P-GG-5.0KW gasoline generator delivers robust and reliable power with a maximum output of 5.0 KW and a rated power of 4.5 KW. Built with a 100% copper stator coil, this generator ensures long-lasting performance and efficiency. The dual voltage capability of 120V/240V provides the versatility needed to power a wide range of tools and appliances, making it an essential companion for both work sites and home backup.'
            },
            {
              title: 'Engineered for Efficiency and Durability',
              text: 'Powered by a 9 HP OHV engine with 4-stroke technology, the BON-P-GG-5.0KW is designed for dependable performance. It features a 15-liter fuel tank, offering up to 7 hours of runtime at 50% load, ideal for extended operations. The retractable starting system ensures easy and reliable startups, while the 1100 ml oil tank capacity supports the engine\'s longevity. This generator is your go-to solution for consistent and powerful energy, whenever and wherever you need it.'
            }
          ],
          descriptionImage: 'https://bonhoeffermachines.com/en/public/machines/specification_dark_1722942342_57625f860a1715610327.webp',
          showcaseImages: [
            'https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-gg-5.0kw.webp'
          ],
          isBannerImage: false,
          bannerImage: '',
          isVideo: true,
          videoUrls: [
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/MtPUNBrBfTM' },
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/APK3obMIT5w' },
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/c5O_RQgAx4Q' }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: 'https://bonhoeffermachines.com/en/public/machines/specification_left_1724497098_45d7779b64f23cdf86bd.webp',
          catalougeRight: 'https://bonhoeffermachines.com/en/public/machines/specification_light_1724497109_27678957b9071c1e8fbd.webp',
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-manual-gasoline-generator.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GG-2.8-3.7-5.0-7.5-9.0.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-GG-5.0KW_1.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-GG-5.0KW.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: 'Maximum power', value: '5.0 KW' },
            { label: 'Rated Power', value: '4.5 KW' },
            { label: 'Stator coil', value: '100% Copper' },
            { label: 'Frequency', value: '50 o 60 Hz' },
            { label: 'Voltage', value: '120V/240V dual voltage' },
            { label: 'Engine', value: '9 HP' },
            { label: 'Technology', value: 'OHV, overhead valves' },
            { label: 'Type', value: '4 Stroke' },
            { label: 'Execution time at 50% load', value: '7 Hour' },
            { label: 'Fuel tank capacity', value: '15 Liters' },
            { label: 'Starting System', value: 'Retractable' },
            { label: 'Oil tank capacity', value: '1100 ml' }
          ],
          features: [
            'OHV design enhances combustion efficiency',
            'Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle',
            'High quality materials and purpose-built components which ensure reliable, long-term use',
            'Easy Start with Bonhoeffer world-class Bonhoeffer Engine',
            'Fuel Efficient & Environmentally Friendly',
            'Automatic Voltage Regulator (AVR) Technology',
            'Highly Heat Conductivity Product\'s with 100% cooper winding',
            'Super Quiet operation'
          ]
        },
        'BON-P-GG-7.5KW': {
          name: 'Gasoline Generator',
          model: 'BON-P-GG-7.5KW',
          description: [
            {
              title: 'Reliable Power for Various Needs - BON-P-GG-7.5KW',
              text: 'The BON-P-GG-7.5KW generator offers a maximum power output of 7.5 KW, making it perfect for powering essential tools and machines. The generator has 14 HP engine and OHV technology, this generator delivers consistent and efficient performance, ensuring you have power when you need it.'
            },
            {
              title: 'Efficient Operation with Extended Runtime',
              text: 'The generator equipped with a 27-liter fuel tank, the Bonhoeffer gasoline generator can run for up to 8 hours at 50% load, providing long-lasting power during outages or remote work. The 100% copper stator coil and electric start system further enhance its reliability and ease of use.'
            }
          ],
          descriptionImage: 'https://bonhoeffermachines.com/en/public/machines/specification_dark_1722942455_20ed51b37fc7b0cc2a99.webp',
          showcaseImages: [
            'https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-gg-7.5kw.webp'
          ],
          isBannerImage: false,
          bannerImage: '',
          isVideo: true,
          videoUrls: [
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/MtPUNBrBfTM' },
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/APK3obMIT5w' },
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/c5O_RQgAx4Q' }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: 'https://bonhoeffermachines.com/en/public/machines/specification_left_1724497721_e57b1896dfbd748c03a6.webp',
          catalougeRight: 'https://bonhoeffermachines.com/en/public/machines/specification_light_1724497731_6aba5a207cb0facc0ab7.webp',
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-manual-gasoline-generator.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GG-2.8-3.7-5.0-7.5-9.0.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-GG-7.5KW_1.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-GG-7.5KW.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: 'Maximum power', value: '7.5 KW' },
            { label: 'Rated Power', value: '7.0 KW' },
            { label: 'Stator coil', value: '100% Copper' },
            { label: 'Frequency', value: '50 o 60 Hz' },
            { label: 'Voltage', value: '120V/240V dual voltage' },
            { label: 'Engine', value: '14 HP' },
            { label: 'Technology', value: 'OHV, overhead valves' },
            { label: 'Type', value: '4 Stroke' },
            { label: 'Execution time at 50% load', value: '8 Hour' },
            { label: 'Fuel tank capacity', value: '27 Liters' },
            { label: 'Starting system', value: 'Electric' },
            { label: 'Oil tank capacity', value: '1100 ml' }
          ],
          features: [
            'OHV design enhances combustion efficiency',
            'Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle',
            'High quality materials and purpose-built components which ensure reliable, long-term use',
            'Easy Start with Bonhoeffer world-class Bonhoeffer Engine',
            'Fuel Efficient & Environmentally Friendly',
            'Automatic Voltage Regulator (AVR) Technology',
            'Highly Heat Conductivity Product\'s with 100% cooper winding',
            'Super Quiet operation'
          ]
        },
        'BON-P-GG-9.0KW': {
          name: 'Gasoline Generator',
          model: 'BON-P-GG-9.0KW',
          description: [
            {
              title: 'High-Power Output with Reliable Performance',
              text: 'The Bonhoeffer 9.0 KW gasoline generator delivers a maximum power of 9.0 KW and a rated power of 8.5 KW, making it a robust solution for various power needs. Equipped with a 16 HP engine utilizing OHV (overhead valve) technology, this generator ensures efficient fuel combustion and enhanced durability. Whether it\'s for residential backup or industrial use, the dual voltage (120V/240V) capability and 50-60 Hz frequency adaptability make it versatile for different applications.'
            },
            {
              title: 'Extended Operation with Efficient Fuel Management',
              text: 'Designed for prolonged operation, the Bonhoeffer generator features a 27-liter fuel tank that supports up to 9 hours of continuous runtime. The 4-stroke engine, paired with an electric starting system, ensures easy and reliable start-up every time. Additionally, the generator is equipped with a 100% copper stator coil, offering superior conductivity and heat resistance, which contributes to its long-lasting performance and efficiency.'
            }
          ],
          descriptionImage: 'https://bonhoeffermachines.com/en/public/machines/specification_dark_1722942486_ac903d346f7b2d2bfa32.webp',
          showcaseImages: [
            'https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-gg-9.0kw.webp'
          ],
          isBannerImage: false,
          bannerImage: '',
          isVideo: true,
          videoUrls: [
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/MtPUNBrBfTM' },
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/APK3obMIT5w' },
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/c5O_RQgAx4Q' }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: 'https://bonhoeffermachines.com/en/public/machines/specification_left_1722494194_9a6a99a293e0b88fb2d2.webp',
          catalougeRight: 'https://bonhoeffermachines.com/en/public/machines/specification_light_1722494207_170ad87bb7357bd83f6a.webp',
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-manual-gasoline-generator.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GG-2.8-3.7-5.0-7.5-9.0.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-GG-9.0KW.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-GG-9.0KW.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: 'Maximum power', value: '9.0 KW' },
            { label: 'Rated Power', value: '8.5 KW' },
            { label: 'Stator coil', value: '100% Copper' },
            { label: 'Frequency', value: '50 o 60 Hz' },
            { label: 'Voltage', value: '120V/240V Dual voltage' },
            { label: 'Engine', value: '16 HP' },
            { label: 'Technology', value: 'OHV, overhead valves' },
            { label: 'Type', value: '4 Tiempos' },
            { label: 'Execution time at 50% load', value: '9.0 Hour' },
            { label: 'Fuel tank capacity', value: '27 Liters' },
            { label: 'Starting system', value: 'Electric' },
            { label: 'Oil tank capacity', value: '1100 ml' }
          ],
          features: [
            'OHV design enhances combustion efficiency',
            'Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle',
            'High quality materials and purpose-built components which ensure reliable, long-term use',
            'Easy Start with Bonhoeffer world-class Bonhoeffer Engine',
            'Fuel Efficient & Environmentally Friendly',
            'Automatic Voltage Regulator (AVR) Technology',
            'Highly Heat Conductivity Product\'s with 100% cooper winding',
            'Super Quiet operation'
          ]
        },
        'BON-P-GG-9.5KW': {
          name: 'Gasoline Generator',
          model: 'BON-P-GG-9.5KW',
          description: [
            {
              title: 'High-Performance Power Solution',
              text: 'The BON-P-GG-9.5KW generator delivers a maximum power of 9.5 KW, making it a top choice for heavy-duty applications. With a powerful 18.5 HP engine and OHV technology, this generator ensures efficient and reliable power output, capable of handling demanding tasks with ease.'
            },
            {
              title: 'Extended Runtime for Continuous Operation',
              text: 'Designed for long-lasting performance, the Bonhoeffer generator features a large 55-liter fuel tank, allowing it to run for up to 12.5 hours at 50% load. The 100% copper stator coil ensures durability, while the retractable starting system offers ease of use, making it a dependable choice for extended power needs.'
            }
          ],
          descriptionImage: 'https://bonhoeffermachines.com/en/public/machines/specification_dark_1728559275_f42290a23c6223637387.webp',
          showcaseImages: [
            'https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-gg-9.5kw.webp'
          ],
          isBannerImage: false,
          bannerImage: '',
          isVideo: true,
          videoUrls: [
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/MtPUNBrBfTM' },
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/APK3obMIT5w' },
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/c5O_RQgAx4Q' }
          ],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: 'https://bonhoeffermachines.com/en/public/machines/specification_left_1724499820_5b5df9bf38353c3f9e0c.webp',
          catalougeRight: 'https://bonhoeffermachines.com/en/public/machines/specification_light_1724499829_41979e188168862bcb5a.webp',
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-manual-gasoline-generator.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GG-2.8-3.7-5.0-7.5-9.0.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-GG-9.5KW_1.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-GG-9.5KW.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: 'Maximum power', value: '9.5 KW' },
            { label: 'Rated Power', value: '9.2 KW' },
            { label: 'Stator coil', value: '100% Copper' },
            { label: 'Frequency', value: '50 o 60 Hz' },
            { label: 'Voltage', value: '120V/240V Dual voltage' },
            { label: 'Engine', value: '18.5 HP' },
            { label: 'Technology', value: 'OHV, overhead valves' },
            { label: 'Type', value: '4 Stroke' },
            { label: 'Execution time at 50% load', value: '12.5 hours' },
            { label: 'Fuel tank capacity', value: '55 Liters' },
            { label: 'Starting system', value: 'Electric start' },
            { label: 'Oil tank capacity', value: '1400 ml' }
          ],
          features: [
            'OHV design enhances combustion efficiency',
            'Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle',
            'High quality materials and purpose-built components which ensure reliable, long-term use',
            'Easy Start with Bonhoeffer world-class Bonhoeffer Engine',
            'Fuel Efficient & Environmentally Friendly',
            'Automatic Voltage Regulator (AVR) Technology',
            'Highly Heat Conductivity Product\'s with 100% cooper winding',
            'Super Quiet operation'
          ]
        },
        'BON-P-GG-12.0KW': {
          name: 'Gasoline Generator',
          model: 'BON-P-GG-12.0KW',
          description: [
            {
              title: 'High-Capacity Dual Cylinder Generator for Demanding Use',
              text: 'The BON-P-GG-12.0KW is a high-performance gasoline generator designed for industrial and heavy-duty applications. With a 20 HP engine featuring OHV technology and two cylinders, it offers powerful and efficient performance, capable of sustaining large energy loads with a maximum output of 12.0 KW and rated output of 11.0 KW.'
            },
            {
              title: 'Optimized for Long Runtime and Versatility',
              text: 'Equipped with a 55-liter fuel tank and 1500 ml oil capacity, this 4-stroke generator can run up to 11.5 hours at 50% load. Its electric starting system ensures quick startups, and dual voltage (120V/240V) support provides compatibility for diverse devices. The 100% copper stator coil ensures excellent conductivity and long-term durability.'
            }
          ],
          descriptionImage: 'https://bonhoeffermachines.com/en/public/machines/specification_dark_1722942673_723e389eed0c41c40340.webp',
          showcaseImages: [
            'https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-gg-12.0kw.webp'
          ],
          isBannerImage: false,
          bannerImage: '',
          isVideo: true,
          videoUrls: [
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/MtPUNBrBfTM' },
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/APK3obMIT5w' },
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/c5O_RQgAx4Q' }
          ],
          isCatalogueLeft: false,
          isCatalogueRight: false,
          catalougeLeft: '',
          catalougeRight: '',
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-manual-gasoline-generator.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GG-2.8-3.7-5.0-7.5-9.0.pdf',
          isBrochure: false,
          brochureUrl: '',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-GG-12.0KW.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: 'Maximum power', value: '12.0 KW' },
            { label: 'Rated power', value: '11.0 KW' },
            { label: 'Stator coil', value: '100% Copper' },
            { label: 'Frequency', value: '50 o 60 Hz' },
            { label: 'Voltage', value: '120V/240V Dual voltage' },
            { label: 'Engine', value: '20 HP' },
            { label: 'Technology', value: 'OHV, overhead valves, 2 cylinders' },
            { label: 'Type', value: '4 Stroke' },
            { label: 'Execution time at 50% load', value: '11.5 Hour' },
            { label: 'Fuel tank capacity', value: '55 Liters' },
            { label: 'Starting system', value: 'Electric' },
            { label: 'Oil tank capacity', value: '1500 ml' }
          ],
          features: [
            'OHV design enhances combustion efficiency',
            'Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle',
            'High quality materials and purpose-built components which ensure reliable, long-term use',
            'Easy Start with Bonhoeffer world-class Bonhoeffer Engine',
            'Fuel Efficient & Environmentally Friendly',
            'Automatic Voltage Regulator (AVR) Technology',
            'Highly Heat Conductivity Product\'s with 100% cooper winding',
            'Super Quiet operation'
          ]
        },
        'BON-P-GG-13.5KW': {
          name: 'Gasoline Generator',
          model: 'BON-P-GG-13.5KW',
          description: [
            {
              title: 'Heavy-Duty Generator for Industrial Applications',
              text: 'The BON-P-GG-13.5KW is a high-powered gasoline generator designed to handle intensive electrical demands. With a 24 HP OHV engine and dual-cylinder configuration, it delivers a maximum power output of 13.5 KW and rated power of 13.0 KW, ensuring dependable energy supply for critical operations.'
            },
            {
              title: 'Built for Durability and Long Runtime',
              text: 'Equipped with a 55-liter fuel tank and an oil capacity of 1500 ml, this 4-stroke generator can run for up to 9 hours at 50% load. Its electric start mechanism ensures ease of use, while the 100% copper stator coil provides consistent performance and thermal conductivity. Suitable for high-demand environments with dual-voltage support.'
            }
          ],
          descriptionImage: 'https://bonhoeffermachines.com/en/public/machines/specification_dark_1722942711_dabf32893e4f4262ac5a.webp',
          showcaseImages: [
            'https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-gg-13.5kw.webp'
          ],
          isBannerImage: false,
          bannerImage: '',
          isVideo: true,
          videoUrls: [
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/MtPUNBrBfTM' },
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/APK3obMIT5w' },
            { title: 'Troubleshooting', url: 'https://www.youtube.com/embed/c5O_RQgAx4Q' }
          ],
          isCatalogueLeft: false,
          isCatalogueRight: false,
          catalougeLeft: '',
          catalougeRight: '',
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-manual-gasoline-generator.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GG-2.8-3.7-5.0-7.5-9.0.pdf',
          isBrochure: false,
          brochureUrl: '',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-GG-13.5KW.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: 'Maximum power', value: '13.5 KW' },
            { label: 'Rated Power', value: '13.0 KW' },
            { label: 'Stator coil', value: '100% Copper' },
            { label: 'Frequency', value: '50 o 60 Hz' },
            { label: 'Voltage', value: '120V/240V Dual voltage' },
            { label: 'Engine', value: '24 HP' },
            { label: 'Technology', value: 'OHV, overhead valves, 2 cylinders' },
            { label: 'Type', value: '4 Stroke' },
            { label: 'Execution time at 50% load', value: '9.0 Hour' },
            { label: 'Fuel tank capacity', value: '55 Litros' },
            { label: 'Starting system', value: 'Electric' },
            { label: 'Oil tank capacity', value: '1500 ml' }
          ],
          features: [
            'OHV design enhances combustion efficiency',
            'Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle',
            'High quality materials and purpose-built components which ensure reliable, long-term use',
            'Easy Start with Bonhoeffer world-class Bonhoeffer Engine',
            'Fuel Efficient & Environmentally Friendly',
            'Automatic Voltage Regulator (AVR) Technology',
            'Highly Heat Conductivity Product\'s with 100% cooper winding',
            'Super Quiet operation'
          ]
        },
        'BON-P-GG-16.0KW': {
          name: 'Gasoline Generator',
          model: 'BON-P-GG-16.0KW',
          description: [
            {
              title: "High-Power Performance for Demanding Applications",
              text: "The Bonhoeffer BON-P-GG-16.0KW gasoline generator delivers a maximum power of 16.0 KW and rated power of 15.0 KW, making it ideal for heavy-duty industrial, commercial, and emergency backup uses. Equipped with a powerful 34 HP engine and dual-cylinder OHV technology, this 4-stroke generator supports both 120V and 240V outputs, running smoothly at 50 or 60 Hz frequencies. Its 100% copper stator coil ensures efficient power transmission and durability."
            },
            {
              title: "Built for Endurance and Efficiency",
              text: "With an electric starting system, a 55-liter fuel tank, and an execution time of 7.5 hours at 50% load, the BON-P-GG-16.0KW is designed for uninterrupted long-duration performance. Its 1500 ml oil tank capacity and high-grade construction ensure reduced maintenance, improved efficiency, and long service life. Whether used for workshops, construction sites, or remote operations, this generator delivers unmatched reliability and performance."
            }
          ],
          descriptionImage: "https://bonhoeffermachines.com/en/public/machines/specification_dark_1722943220_4a211d11a382efaabbd4.webp",
          showcaseImages: [
            "https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-gg-16.0kw.webp"
          ],
          isBannerImage: false,
          bannerImage: "",
          isVideo: true,
          videoUrls: [
            { title: "Troubleshooting", url: "https://www.youtube.com/embed/MtPUNBrBfTM" },
            { title: "Troubleshooting", url: "https://www.youtube.com/embed/APK3obMIT5w" },
            { title: "Troubleshooting", url: "https://www.youtube.com/embed/c5O_RQgAx4Q" }
          ],
          isCatalogueLeft: false,
          isCatalogueRight: false,
          catalougeLeft: "",
          catalougeRight: "",
          isWorkshopManual: true,
          workshopManualUrl: "https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-manual-gasoline-generator.pdf",
          isUserManual: false,
          userManualUrl: "",
          isBrochure: false,
          brochureUrl: "",
          isSpareParts: true,
          sparePartsUrl: "https://bonhoeffermachines.com/en/public/pdfs/BON-P-GG-16.0KW.pdf",
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: "Maximum power", value: "16.0 KW" },
            { label: "Rated Power", value: "15.0 KW" },
            { label: "Stator coil", value: "100% Copper" },
            { label: "Frequency", value: "50 o 60 Hz" },
            { label: "Voltage", value: "120V/240V Dual voltage" },
            { label: "Engine", value: "34 HP" },
            { label: "Technology", value: "OHV, overhead valves, 2 cylinders" },
            { label: "Type", value: "4 Stroke" },
            { label: "Execution time at 50% load", value: "7.5 Hour" },
            { label: "Fuel tank capacity", value: "55 Liters" },
            { label: "Starting System", value: "Electric" },
            { label: "Oil tank capacity", value: "1500 ml" }
          ],
          features: [
            "OHV design enhances combustion efficiency",
            "Easy starting with an automatic decompression system and an easy-to-grip soft recoil starter handle",
            "High quality materials and purpose-built components which ensure reliable, long-term use",
            "Easy Start with Bonhoeffer world-class Bonhoeffer Engine",
            "Fuel Efficient & Environmentally Friendly",
            "Automatic Voltage Regulator (AVR) Technology",
            "Highly Heat Conductivity Product\'s with 100% cooper winding",
            "Super Quiet operation"
          ]
        },
      },

      'gasoline-inverter': {

      },

      'tiller': {

      },
      
      'brush-cutter':{
        'BON-P-BC36': {
          name: 'Brush Cutter',
          model: 'BON-P-BC36',
          description: [
            {
              title: 'Why Brush Cutter is an Essential Tool for Cutting Grass?',
              text: 'A brush cutter is a heavy-duty tool designed to clear tough vegetation that standard mowers struggle with. Perfect for cutting through dense grass, resilient weeds, and small saplings, this powerful machine easily handles overgrown areas. Its versatility and precision make it ideal for maintaining spaces that are difficult to access, providing effective control over unruly landscapes. You can get one of the best brush cutters from Bonhoeffer.'
            },
            {
              title: 'Tool Designed for Versatility and Precision',
              text: 'BON-P-BC36 is a hand-held brush cutter, equipped with a high-performance 2-stroke engine, delivering 1.2 kW of power at 7,500 rpm. It has a fuel ratio of 50:1 and a 720 cm³ fuel tank, ensuring extended use between refills. With an engine displacement of 35.3 cm³ and a maximum speed of 9,200 rpm. The idle speed of 3,000 rpm provides smooth operation, while the clutch engages at 4,200 rpm for better control. Weighing just 7.2 kg (without attachments), this machine offers the perfect balance of power and mobility, making it an essential tool for professional trimming tasks.'
            }
          ],
          descriptionImage: 'https://bonhoeffermachines.com/en/public/machines/specification_dark_1724761899_7ddd1769a97975f5ad37.webp',
          showcaseImages: [
            'https://bonhoeffermachines.com/en/public/machines/showcase-1-bon-p-bc33.webp',
            'https://bonhoeffermachines.com/en/public/machines/showcase-2-bon-p-bc33.webp',
            'https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-bc33.webp'
          ],
          isBannerImage: true,
          bannerImage: 'https://bonhoeffermachines.com/en/public/product_banner/brush-cutter-banner.webp',
          isVideo: false,
          videoUrls: [],
          isCatalogueLeft: true,
          isCatalogueRight: true,
          catalougeLeft: 'https://bonhoeffermachines.com/en/public/machines/specification_left_1727179453_951a0534a64f19831f63.webp',
          catalougeRight: 'https://bonhoeffermachines.com/en/public/machines/specification_light_1727179463_c72a35323b97517a555d.webp',
          isWorkshopManual: false,
          workshopManualUrl: '',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-BC36-ENGLISH-MANUAL.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-BC36.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-BC36.pdf',
          warrantyTime: 15,
          isFMTTI: true,
          specifications: [
            { label: 'Equipment mobility', value: 'Hand-held' },
            { label: 'Engine type', value: '2-stroke' },
            { label: 'Maximum power', value: '1.2 kW / 7500 min⁻¹' },
            { label: 'Fuel ratio', value: '50:1' },
            { label: 'Volumes of fuel tank', value: '720 cm³' },
            { label: 'Engine displacement', value: '35.3 cm³' },
            { label: 'Max engine speed for grass trimmer', value: '9200 min⁻¹' },
            { label: 'Gear ratio', value: '19:14' },
            { label: 'Engine idling speed', value: '3000 min⁻¹ ±300' },
            { label: 'Clutch engagement speed', value: '4200 min⁻¹' },
            { label: 'Unit mass (empty tanks without cutting attachment)', value: '7.2 kg' }
          ],
          features: [
            'BRUSH CUTTER is a powered garden or agriculture tool used to trim weeds, small trees, and other foliage.',
            'Brush cutter is a tool that is used to harvest crops, trim grass, as well as clear/remove unwanted crop. Catering to the needs and demands of farmers.',
            'It is used to cut weeds, trim crops, small trees, grass, parthenium etc.',
            'Various blades or trimmer heads can be attached to the machine for specific applications.',
            'It is typically used to cut tall grass (grass taller than 6”–8”), weeds, brush, shrubs and woody material such as stalks and saplings.',
            'This machine is started with recoil.',
            'Petrol engines, either two stroke, are used on the more powerful units.'
          ]
        },
      },

      'backpack-brush-cutter': {
        'BON-P-BP-BC45': {
          name: 'Backpack Brush Cutter',
          model: 'BON-P-BP-BC45',
          description: [
            {
              title: 'Achieve Effortless Grass Cutting with the Backpack Brush Cutter',
              text: 'Take the hassle out of grass-cutting with the Backpack Brush Cutter. Designed for comfort and efficiency, this lightweight, handheld tool provides superior performance for trimming grass and brush in any terrain. Its ergonomic backpack design ensures balanced weight distribution for reduced strain during extended use. Whether managing a large yard or tackling overgrown fields, this brush cutter delivers professional-grade results with minimal effort. Trust Bonhoeffer to make landscaping tasks easier and more efficient every time.'
            },
            {
              title: 'Exceptional Power and Durability for Heavy-Duty Grass Cutting',
              text: 'The BON-P-BP-BC45 combines a powerful 2-stroke engine with precision engineering for top-tier performance. With an engine displacement of 44.8cm³, it achieves a maximum output of 1.6kW at 7500min-1, making it ideal for heavy-duty tasks. The fuel tank has a generous 920cm³ capacity, ensuring longer operation times, while its lightweight 11.1kg frame enhances mobility. Whether using the brush cutter at speeds up to 10,500min-1 or the grass trimmer at 9500min-1, this unit handles every challenge with ease.'
            }
          ],
          descriptionImage: 'https://bonhoeffermachines.com/en/public/machines/specification_dark_1725523109_a0eb51a6c7aae116e15e.webp',
          showcaseImages: [
            'https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-bp-bc45.webp'
          ],
          isBannerImage: false,
          bannerImage: '',
          isVideo: true,
          videoUrls: [
            { title: 'Working Video', url: 'https://www.youtube.com/embed/t3BJT22yUGA' }
          ],
          isCatalogueLeft: false,
          isCatalogueRight: false,
          catalougeLeft: '',
          catalougeRight: '',
          isWorkshopManual: false,
          workshopManualUrl: '',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/English-Manual-BON-P-BP-BC45.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-BP-BC45.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-BP-BC45.pdf',
          warrantyTime: 15,
          isFMTTI: true,
          specifications: [
            { label: 'Equipment mobility', value: 'Hand-held' },
            { label: 'Engine type', value: '2-stroke' },
            { label: 'Engine displacement', value: '44.8 cm³' },
            { label: 'Maximum engine performance', value: '1.6 kW / 7500 min⁻¹' },
            { label: 'Volumes of fuel tank', value: '920 cm³' },
            { label: 'Max engine speed for brush cutter', value: '10500 min⁻¹' },
            { label: 'Max engine speed for grass trimmer', value: '9500 min⁻¹' },
            { label: 'Gear ratio', value: '19:14' },
            { label: 'Engine idling speed', value: '3000 min⁻¹ ± 300 min' },
            { label: 'Clutch engagement speed', value: '4200 min⁻¹' },
            { label: 'Fuel ratio', value: '50:1' },
            { label: 'Unit mass (empty tanks without cutting attachment)', value: '11.1 kg' }
          ],
          features: []
        },
      },
    };

    // Default model details
    const defaultDetails = {
      name: `${getProductName(productSlug)} ${modelName.toUpperCase()}`,
      power: '5.5 HP',
      description: `Professional ${getProductName(productSlug).toLowerCase()} designed for heavy-duty applications.`,
      modelDescription: `The ${modelName.toUpperCase()} model features advanced engineering and premium components for reliable performance in demanding conditions.`,
      images: [
        getProductImage(productSlug),
        getProductImage(productSlug),
        getProductImage(productSlug)
      ],
      specifications: [
        { label: 'Engine Name', value: 'Bonhoeffer Professional' },
        { label: 'Cylinder Displacement', value: '163cc' },
        { label: 'Net Power at Preset RPM', value: '5.5 HP @ 3600 RPM' },
        { label: 'Air Filter Type', value: 'Dry Type Paper Element' },
        { label: 'Fuel Tank Volume', value: '3.6 L' },
        { label: 'Fuel Type', value: 'Unleaded Gasoline' },
        { label: 'Engine Oil Capacity', value: '0.6 L' },
        { label: 'Engine Oil Type', value: 'SAE 10W-30' },
        { label: 'Operating Weight', value: '25 kg' },
        { label: 'Dimensions (L*W*H)', value: '650*450*550 mm' },
        { label: 'Warranty Period', value: '36 Months' },
        { label: 'Certification', value: 'ISO 9001:2015' }
      ],
      features: [
        'Reliable Bonhoeffer Engine: Equipped with robust and dependable engine ensuring powerful performance.',
        'Professional Grade Construction: Built with premium materials for long-lasting durability.',
        'Easy Operation: User-friendly controls and ergonomic design for comfortable operation.',
        'Low Maintenance: Designed for minimal maintenance requirements and easy servicing.',
        'Safety Features: Comprehensive safety systems protect both operator and equipment.',
        'Efficient Performance: Optimized design delivers maximum efficiency and fuel economy.',
        'Weather Resistant: Corrosion-resistant coating and weatherproof components.',
        'Comprehensive Warranty: Backed by 36-month warranty and nationwide service support.'
      ]
    };

    return modelDetails[productSlug]?.[modelName] || defaultDetails;
  };

  const getProductName = (slug) => {
    const nameMap = {
      'gasoline-water-pump': 'Gasoline Water Pump',
      'diesel-water-pump': 'Diesel Water Pump',
      'gasoline-engine': 'Gasoline Engine',
      'diesel-engine': 'Diesel Engine',
      'gasoline-tiller': 'Gasoline Tiller',
      'mini-cultivator': 'Mini Cultivator',
      'brush-cutter': 'Brush Cutter',
      'backpack-brush-cutter': 'Backpack Brush Cutter',
      'chainsaw': 'Chainsaw',
      'hedge-trimmer': 'Hedge Trimmer',
      'lawn-mower': 'Lawn Mower',
      'leaf-blower': 'Leaf Blower',
      'multi-tool': 'Multi Tool',
      'diesel-generator': 'Diesel Generator',
      'gasoline-generator': 'Gasoline Generator',
      'gasoline-inverter': 'Gasoline Inverter'
    };
    return nameMap[slug] || 'Product';
  };

  const getProductImage = (slug) => {
    const imageMap = {
      'gasoline-water-pump': 'https://bonhoeffermachines.com/public/product_banner/1-gasoline-water-pump.webp',
      'gasoline-engine': 'https://bonhoeffermachines.com/public/product_banner/2-gasoline-engine.webp',
      'gasoline-generator': 'https://bonhoeffermachines.com/public/product_banner/3-gasoline-generator.webp',
      'brush-cutter': 'https://bonhoeffermachines.com/public/product_banner/7-brush-cutter.webp',
      'chainsaw': 'https://bonhoeffermachines.com/public/product_banner/10-chain-saw.webp'
    };
    return imageMap[slug] || 'https://bonhoeffermachines.com/public/product_banner/1-gasoline-water-pump.webp';
  };

  // Get other models for the same product
  const getOtherModels = (productSlug, currentModel) => {
    const allModels = {
      'gasoline-water-pump': [
        { name: 'BON-P-WP1.0-31', feature: 'INLET/OUTLET- 1 INCH -31 CC', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP1.0-31.webp' },
        { name: 'BON-P-WP1.5-79', feature: 'Engine Power : 79 CC', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP1.5-79.webp' },
        { name: 'BON-P-WP2.0-149', feature: 'INLET/OUTLET- 2 INCHES- 149 CC', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP2.0-149.webp' },
        { name: 'BON-P-WP2.0-196', feature: 'Engine Power : 196 Cc', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP2.0-196.webp' },
        { name: 'BON-P-WP3.0-196', feature: 'Engine Power : 196 Cc', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP3.0-196.webp' },
        { name: 'BON-P-WP4.0-272', feature: 'Engine Power : 272 Cc', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP4.0-272.webp' },
        { name: 'BON-P-WP1.5-224HL', feature: 'INLET/OUTLET- 1.5 INCH-224 CC- HL', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP1.5-224HL.webp' },
        { name: 'BON-P-WP6.0-420', feature: 'INLET / OUTLET- 6 INCHES- 420 CC', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP6.0-420.webp' },
        { name: 'BON-P-WP2.0-224HL', feature: 'Engine Power : 224 Cc', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP2.0-224HL.webp' },
        { name: 'BON-P-WP2.0-420HL', feature: 'INLET/OUTLET- 2.0 INCH-420 CC- HL', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP2.0-420HL.png' },
        { name: 'BON-P-WP3.0-420HL', feature: 'INLET/OUTLET- 3.0 IN- 420 CC- HL', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP3.0-420HL.png' },
        { name: 'BON-P-WP2.0-196CH', feature: 'INLET/OUTLET- 2 IN- 196 CC- CH', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP2.0-196CH.webp' },
        { name: 'BON-P-WP2.0-196TR', feature: 'INLET/OUTLET- 2 IN- 196 CC- TR', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP2.0-196TR.webp' },
        { name: 'BON-P-WP3.0-196TR', feature: 'INLET / OUTLET- 3 INCHES- 196 CC- TR', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP3.0-196TR.webp' }
      ],

      'gasoline-engine': [
        { name: 'BON-P-GE-3.0HP', feature: 'POTENCIA 3.0 HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-3.0HP.webp' },
        { name: 'BON-P-GE-3.5HP', feature: 'POTENCIA 3.5 HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-3.5HP.webp' },
        { name: 'BON-P-GE-4.0HP', feature: 'POTENCIA 4.0 HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-4.0HP.webp' },
        { name: 'BON-P-GE-5.0HP', feature: 'POTENCIA 5.0 HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-5.0HP.webp' },
        { name: 'BON-P-GE-7.0HP', feature: 'Engine Power : 7.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-7.0HP.webp' },
        { name: 'BON-P-GE-9.0HP', feature: 'Engine Power : 9.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-9.0HP.webp' },
        { name: 'BON-P-GE-13.0HP', feature: 'Engine Power : 13.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-13.0HP.webp' },
        { name: 'BON-P-GE-14.0HP', feature: 'Engine Power : 14.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-14.0HP.webp' },
        { name: 'BON-P-GE-16.0HP', feature: 'POTENCIA 16.0 HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-16.0HP.webp' },
        { name: 'BON-P-GE-24.0HP', feature: 'POWER 24.0 HP- V DOBLE CILINDRO', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-24.0HP.webp' },
        { name: 'BON-P-GE-34.0HP', feature: 'POTENCIA 34.0 HP- V DOBLE CILINDRO', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-34.0HP.webp' }
      ],

      'gasoline-generator': [
        { name: 'BON-P-GG-2.8KW', feature: 'MAX . POWER 2.8 KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-2.8KW.webp' },
        { name: 'BON-P-GG-3.7KW', feature: 'MAX . POWER 3.7 KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-3.7KW.webp' },
        { name: 'BON-P-GG-5.0KW', feature: 'MAX . POWER 5.0 KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-5.0KW.webp' },
        { name: 'BON-P-GG-7.5KW', feature: 'MAX . POWER 7.5 KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-7.5KW.webp' },
        { name: 'BON-P-GG-9.0KW', feature: 'MAX . POWER 9.0 KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-9.0KW.webp' },
        { name: 'BON-P-GG-9.5KW', feature: 'MAX . POWER 9.5 KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-9.5KW.webp' },
        { name: 'BON-P-GG-12.0KW', feature: 'MAX . POWER 12.0 KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-12KW.webp' },
        { name: 'BON-P-GG-13.5KW', feature: 'MAX . POWER 13.5 KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-13.5KW.webp' },
        { name: 'BON-P-GG-16.0KW', feature: 'MAX . POWER 16.0 KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-16KW.webp' },
        { name: 'BON-P-GG-18.5KW', feature: 'MAX . POWER 18.5 KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-18KW.webp' }
      ],

      'gasoline-inverter': [

      ],

      'gasoline-tiller': [

      ],

      'brush-cutter': [
        { name: 'BON-P-BC36', feature: 'Displacement 36 CC', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-BC36.webp' },
        { name: 'BON-ET-BC53', feature: 'DISPLACEMENT 53 CC', image: 'https://bonhoeffermachines.com/en/public/machines/BON-ET-BC53.webp' },
        { name: 'BON-P-BC45', feature: 'DISPLACEMENT 45 CC', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-BC45.webp' }
      ],
    };

    const models = allModels[productSlug] || [
      { name: 'Model-100', power: '5.5 HP' },
      { name: 'Model-200', power: '6.5 HP' },
      { name: 'Model-300', power: '7.0 HP' }
    ];

    return models.filter(m => m.name.toLowerCase() !== currentModel);
  };

  // Mock FAQ data
  const getFAQs = (productSlug) => {
    const faqs = {
      'gasoline-water-pump': [
        {
          question: 'How to Storage my Bonhoeffer water pump Tips',
          answer: 'Flush the pump case with clean fresh water, then completely drain to prevent damage from freezing. Cover intake and discharge ports to prevent the entry of debris during storage. The term Self Priming is actually an industry term that describes the ability of a pump to create a partial vacuum by purging air from the intake hose and pump casing. All Honda pumps are self priming by definition. All self priming pumps require water to be added to the pump casing to start the priming process.'
        },
        {
          question: 'What are the priming tips for Bonhoeffer water pump',
          answer: 'Place the pump as close to the water source as possible. The less lift required will improve priming time. Fill the pump case completely with water (Never operate a centrifugal pump without water in the pump casing). Start the pump engine. By partially restricting the discharge hose, priming time can be improved. Shutting off a pump will allow water to flow out of the suction hose, requiring priming. The use of a foot valve on the end of the suction hose will prevent water from flowing out of the suction hose if you stop the pump and reduce time required for the pump to regain its prime. Wear off the volute and Impeller can decrease pump performance and increase time required to prime the pump. Regular inspection and maintenance of your pump will maintain peak performance.'
        },
        {
          question: 'Can I use synthetic oil in my Bonhoeffer water pump?',
          answer: 'Bonhoeffer water pumps are developed, tested and certified with petroleum based motor oils as a lubricant. Synthetic oils may be used; however, any motor oil used in our water pump must meet all oil requirements as stated in the owner manual. In addition, recommended oil change intervals must be followed.'
        },
        {
          question: 'How do I clean the carburettor of a Bonhoeffer water pump?',
          answer: 'See our Carburettor workshop Sheet to learn more about cleaning carburettors. Please be aware that the water pump should be serviced by a Bonhoeffer Authorized Dealer unless the owner has proper tools, service data and the necessary technical skills.'
        },
        {
          question: 'What fuel should I use in my Bonhoeffer water pump?',
          answer: 'Bonhoeffer water pumps are designed and certified to run on regular unleaded gasoline containing no more than 5% ethanol (E10). Always refer to the owner\'s manual for your Bonhoeffer to get a list of recommended fuel and the current approved additives. For more information, see our Fuel Recommendations Link. Download or print a handout on how to avoid fuel-related problems for your Bonhoeffer general purpose water pump.'
        },
        {
          question: 'What should I do if I didn\'t receive all the parts or materials when I purchased my Bonhoeffer Product?',
          answer: 'If you purchased a new piece of equipment and are missing parts or manuals, you need to contact your selling dealer. If you have further questions, you may contact our Customer Relations office at Manuals and Brochures.'
        },
        {
          question: 'How can I get an Owner\'s Manual?',
          answer: 'Owner\'s Manuals for General Purpose Water pump can be downloaded from our website.'
        },
        {
          question: 'What actions do I take when the Water pump is running poorly?',
          answer: 'If a problem occurs with the spark plug: Check the spark plug HT wire and connect it if necessary. Remove the spark plug cap. Clean any dirt from around the spark plug base, and then remove the spark plug. Grounding the side electrode to the engine, pull the recoil starter to see if sparks jump across the gap. If there is no spark, replace the plug. If there is a spark, reinstall the spark plug and start again. If the air cleaner is clogged, clean or replace the air cleaner. If the carburetor is clogged, clean the carburetor (see our carburettor workshop sheet). Check if the valve clearance is correct. If not, readjust the valve clearance to the correct setting with a filler gauge. Check if the governor is out of adjustment. If so, readjust the governor. If the problem is not solved, take your water pump to an authorised Bonhoeffer dealer.'
        }
      ],
      'gasoline-engine': [
        {
          question: 'Can I use synthetic oil in my Bonhoeffer engine?',
          answer: 'Bonhoeffer engines are developed, tested and certified with petroleum based motor oils as a lubricant. Synthetic oils may be used; however, any motor oil used in our engines must meet all oil requirements as stated in the owner Manual. In addition, recommended oil change intervals must be followed.'
        },
        {
          question: 'How do I clean the carburettor of a Bonhoeffer engine?',
          answer: 'See our <a href="https://bonhoeffermachines.com/en/public/carburettor/carburettor-workshop.pdf" target="_blank"><strong>Carburettor workshop Sheet</strong></a> to learn more about cleaning carburettors. Please be aware that the engine should be serviced by an Bonhoeffer Authorized Dealer unless the owner has proper tools, service data and the necessary technical skills.'
        },
        {
          question: 'What fuel should I use in my Bonhoeffer Engine?',
          answer: 'Bonhoeffer engines are designed and certified to run on regular unleaded gasoline containing no more than 5% ethanol (E10). Gasoline is allowed, by regulation, to contain a variety of additives. The same regulation limits how much of some additives, such as alcohol, can be included in the fuel and still allow it to be sold as gasoline. If you look in a Bonhoeffer product owner’s manual, you will see that a maximum of 5% ethanol is allowed (other oxygenates are also listed). Bonhoeffer engines are designed for good performance and efficient operation using gasoline containing from 0 to 5% ethanol. Always refer to the owner’s manual for your Bonhoeffer to get a list of recommended fuel and the current approved additives. For more information, see our <a href="https://bonhoeffermachines.com/en/public/carburettor/Fuel-Related-Problem.pdf" target="_blank"><strong>Fuel Recommendations Link</strong></a>. Download or print a handout on how to avoid fuel-related problems for your Bonhoeffer general purpose engine.'
        },
        {
          question: 'What should I do if I didn\'t receive all the parts or materials when I purchased my Bonhoeffer Product?',
          answer: 'If you purchased a new piece of equipment and are missing parts or manuals, you need to contact your selling dealer. If you have further questions, you may contact our Customer Relations office at Manuals and Brochures.'
        },
        {
          question: 'How can I get an Owner\'s Manual?',
          answer: 'Owner\'s Manuals for General Purpose Engines can be downloaded from our website. <a href="https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-GE-7.0HP-and-BON-P-GE-9.0HP-and-BON-P-GE-14.0HP-ENGLISH-MANUAL.pdf" target="_blank"><strong>Find link</strong></a>.'
        },
        {
          question: 'What actions do I take when the engine is running poorly?',
          answer: 'If a problem occurs with the spark plug: Check the spark plug HT wire and connect it if necessary. Remove the spark plug cap. Clean any dirt from around the spark plug base, and then remove the spark plug. Grounding the side electrode to the engine, pull the recoil starter to see if sparks jump across the gap. If there is no spark, replace the plug. If there is a spark, reinstall the spark plug and start again. If the air cleaner is clogged, clean or replace the air cleaner. If the carburetor is clogged, clean the carburetor (see our <a href="https://bonhoeffermachines.com/en/public/carburettor/carburettor-workshop.pdf" target="_blank"><strong>carburettor workshop sheet</strong></a>). Check if the valve clearance is correct. If not, readjust the valve clearance to the correct setting by the help of filler gauge. Check if the governor is out of adjustment. If so, readjust the governor. If the problem is not solved, take your engine to an authorised <strong>Bonhoeffer</strong> dealer.'
        }
      ],
      'gasoline-generator': [
        {
          question: 'How do I clean the carburettor of a Bonhoeffer engine?',
          answer: 'See our Carburettor workshop Sheet to learn more about cleaning carburettors. Please be aware that the engine should be serviced by an Bonhoeffer Authorized Dealer unless the owner has proper tools, service data and the necessary technical skills.'
        },
        {
          question: 'What fuel should I use in my Bonhoeffer Engine?',
          answer: 'Bonhoeffer engines are designed and certified to run on regular unleaded gasoline containing no more than 5% ethanol (E10). Gasoline is allowed, by regulation, to contain a variety of additives. The same regulation limits how much of some additives, such as alcohol, can be included in the fuel and still allow it to be sold as gasoline. If you look in a Bonhoeffer product owner’s manual, you will see that a maximum of 5% ethanol is allowed (other oxygenates are also listed). Bonhoeffer engines are designed for good performance and efficient operation using gasoline containing from 0 to 5% ethanol. Always refer to the owner’s manual for your Bonhoeffer to get a list of recommended fuel and the current approved additives. For more information, see our <a href="https://bonhoeffermachines.com/en/public/carburettor/Fuel-Related-Problem.pdf" target="_blank"><strong>Fuel Recommendations Link</strong></a>. Download or print a handout on how to avoid fuel-related problems for your Bonhoeffer general purpose engine.'
        },
        {
          question: 'How can I get an Owner\'s Manual?',
          answer: 'Owner\'s Manuals for General Purpose Engines can be downloaded from our website. <strong>Find link.</strong>'
        },
        {
          question: 'What size Bonhoeffer Generator do I need to run an air conditioner .?',
          answer: 'As there are so many different air conditioner models on the market today, and with all different start up specs, the right size Bonhoeffer generator will depend on your air conditioners start-up load. Refer to your air conditioners specifications to find this, then the right size generator can be recommended.'
        },
        {
          question: 'What is the difference between Maximum and Continuous (or rated) output?',
          answer: 'A generator will have a maximum output that it can produce before it will trip the overload. The continuous rating is what the generator can do for long periods of time. Normally the continuous rating is 90% of its maximum output.'
        },
        {
          question: 'I don\'t know the wattage but I know the amps?',
          answer: 'To get the watts from the amp rating is as follows: amps x voltage = watts. So a 9 amp tool will be 9 x 220 = 1980 watts.'
        },
        {
          question: 'Can I run Eco-Throttle all of the time?',
          answer: 'Eco-Throttle should only be used for short duration and for low wattage draw. It is recommended to run the generator at a high load for a period of time after extended Eco-Throttle use to clear carbon deposits and prevent poor running. Continuous use of Eco-Throttle with high loads can lead to damage of the inverter unit.'
        }
      ],
      'gasoline-tiller': [
        {
          question: 'Bonhoeffer power weeders suitable for organic farming?',
          answer: 'While Bonhoeffer power weeders can be used for weed control in organic farming, it\'s crucial to choose methods that minimize soil disturbance and avoid damaging beneficial organisms. Consulting with agricultural experts and organic farming resources is recommended.'
        },
        {
          question: 'Are there any government subsidies for Bonhoeffer power weeders in India?',
          answer: 'Yes, several government schemes offer subsidies for purchasing agricultural machinery, including Bonhoeffer power weeders. The specific schemes and eligibility criteria may vary depending on the state.'
        },
        {
          question: 'How can I avoid frequent breakdowns in Bonhoeffer Power weeder?',
          answer: 'Use high-quality fuel and lubricants. Store the equipment in a dry, sheltered place. Follow the maintenance schedule in the user manual.'
        },
        {
          question: 'Why is the Bonhoeffer Power weeder not cutting properly?',
          answer: 'The blades may be dull—sharpen or replace them. Soil conditions might require adjustments in blade depth.'
        },
        {
          question: 'How do I operate a Bonhoeffer power weeder?',
          answer: 'Assemble the tool as per the user manual. Adjust the blades and depth to suit the soil type and crop spacing. Start the motor and guide the tool along the crop rows.'
        }
      ],

      'backpack-brush-cutter': [],
    };

    return faqs[productSlug] || [
      { question: 'What is the warranty period?', answer: 'All our products come with a comprehensive 36-month warranty covering manufacturing defects.' },
      { question: 'Where can I get service support?', answer: 'We have authorized service centers nationwide. Contact our customer support for the nearest location.' },
      { question: 'What maintenance is required?', answer: 'Regular maintenance includes oil changes, air filter cleaning, and spark plug replacement as per the user manual.' }
    ];
  };

  const modelDetails = getModelDetails(slug, model);
  const otherModels = getOtherModels(slug, model);
  const faqs = getFAQs(slug);

  const handleDownload = (type) => {
    // Mock download functionality
    alert(`Downloading ${type} for ${modelDetails.name}`);
  };

  // ExZoomGallery: Custom exzoom-inspired image gallery/zoom
  function ExZoomGallery({ images = [], alt = '', currentIndex, setCurrentIndex }) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 0.5, y: 0.5 });
    const mainImgRef = React.useRef(null);

    const handleMouseMove = (e) => {
      const rect = mainImgRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setZoomPos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
    };

    const handlePrev = () => {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    const handleNext = () => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    return (
      <div className="w-full flex flex-col items-center relative">
        <div className="relative" style={{ width: 500, height: 500 }}>
          <div
            className="rounded-2xl overflow-visible bg-white/5 border border-white/10 flex items-center justify-center relative"
            style={{ width: 500, height: 500, background: '#fff', zIndex: 10 }}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            ref={mainImgRef}
          >
            <Image
              src={images[currentIndex]}
              alt={alt}
              fill
              className="object-contain cursor-crosshair select-none"
              draggable={false}
              priority
            />
            {/* Zoomed overlay */}
            {isZoomed && (
              <div
                className="fixed lg:absolute top-0 left-full ml-6 z-50 hidden lg:block"
                style={{ width: 480, height: 480 }}
              >
                <div
                  className="rounded-2xl border border-[#989b2e] shadow-2xl overflow-hidden bg-white"
                  style={{ width: 480, height: 480, position: 'relative' }}
                >
                  <Image
                    src={images[currentIndex]}
                    alt={alt + ' zoomed'}
                    fill
                    className="object-contain"
                    style={{
                      transform: `scale(2.5) translate(${-zoomPos.x * 60 + 30}%, ${-zoomPos.y * 60 + 30}%)`,
                      transition: 'transform 0.1s',
                    }}
                    draggable={false}
                    priority
                  />
                </div>
              </div>
            )}
          </div>
          {/* Prev/Next buttons */}
          <button
            className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 bg-[#989b2e] hover:bg-[#7a7d24] text-white rounded-full w-10 h-10 flex items-center justify-center z-20"
            onClick={handlePrev}
            aria-label="Previous image"
            style={{ left: -60 }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <button
            className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 bg-[#989b2e] hover:bg-[#7a7d24] text-white rounded-full w-10 h-10 flex items-center justify-center z-20"
            onClick={handleNext}
            aria-label="Next image"
            style={{ right: -60 }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </div>
        {/* Thumbnails */}
        <div className="flex space-x-3 mt-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                currentIndex === idx ? 'border-[#989b2e]' : 'border-white/20 hover:border-white/40'
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <Image
                src={img}
                alt={alt + ' thumbnail ' + (idx + 1)}
                fill
                className="object-contain p-2 bg-white"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 1. Banner Section (Image or Video)
  // Place this at the top, replacing the static hero image section
  const renderBannerSection = () => {
    if (modelDetails.isBannerImage && modelDetails.bannerImage) {
      // Banner image (single or array)
      const bannerSrc = Array.isArray(modelDetails.bannerImage)
        ? modelDetails.bannerImage[0]
        : modelDetails.bannerImage;
      return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mt-5">
          <div className="absolute inset-0">
            <Image
              src={bannerSrc}
              alt="Product Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <motion.div 
            className="relative z-10 text-center text-white px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="text-[#989b2e]">{modelDetails.name}</span>
            </motion.h1>
          </motion.div>
        </section>
      );
    } else if (modelDetails.isVideo && Array.isArray(modelDetails.videoUrls) && modelDetails.videoUrls.length > 0) {
      // Video banner (YouTube embed) - handles multiple videos
      return (
        <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden mt-5 py-12">
          
          <div className={`grid gap-6 w-full max-w-7xl px-6 ${
            modelDetails.videoUrls.length === 1 ? 'grid-cols-1 max-w-4xl' :
            modelDetails.videoUrls.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {modelDetails.videoUrls.map((video, index) => (
              <motion.div
                key={index}
                className="relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="aspect-video relative">
                  <iframe
                    src={video.url}
                    title={video.title || `Product Video ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-2xl border-none shadow-2xl"
                  />
                </div>
                {video.title && (
                  <div className="mt-3 text-center text-white text-base font-semibold">
                    {video.title}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="relative z-10 text-center text-white px-6 my-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="text-[#989b2e]">{modelDetails.name}</span>
            </motion.h1>
          </motion.div>
        </section>
      );
    } else {
      // Fallback: static hero image (as before)
      return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mt-5">
          <div className="absolute inset-0">
            <Image
              src="https://bonhoeffermachines.com/public/product_banner/product-banner.webp"
              alt="Product Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <motion.div 
            className="relative z-10 text-center text-white px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="text-[#989b2e]">{modelDetails.name}</span>
            </motion.h1>
          </motion.div>
        </section>
      );
    }
  };

  // 2. Document Buttons (in Product Info section)
  // Replace the document buttons block with this:
  function DocumentButtons() {
    return (
      <motion.div
        className="flex flex-wrap gap-4 lg:justify-end"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {modelDetails.isUserManual && (
          <a
            href={modelDetails.userManualUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            User Manual
          </a>
        )}
        {modelDetails.isBrochure && (
          <a
            href={modelDetails.brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Brochure
          </a>
        )}
        {modelDetails.isSpareParts && modelDetails.sparePartsUrl && (
          <a
            href={modelDetails.sparePartsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#989b2e] hover:bg-[#8a8c20] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Spare Parts
          </a>
        )}
        {modelDetails.isWorkshopManual && (
          <a
            href={modelDetails.workshopManualUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Workshop Manual
          </a>
        )}
      </motion.div>
    );
  }

  // 3. Warranty & Certifications (in Certification Seals section)
  // Replace the warranty/certification seals block with this:
  function WarrantyCertifications() {
    return (
      <motion.div
        className="flex justify-end space-x-6"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-2 bg-white/10">
            <Image
              src={
                modelDetails.warrantyTime === 36 ? warranty36 :
                modelDetails.warrantyTime === 24 ? warranty24 :
                modelDetails.warrantyTime === 15 ? warranty15 :
                warranty12
              }
              alt="Warranty Seal"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          {/* <p className="text-xs text-gray-300">{modelDetails.warrantyTime} Month Warranty</p> */}
        </div>
        {modelDetails.isFMTTI && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-2 bg-white/10">
              <Image
                src={fmttiImage}
                alt="FMTTI Seal"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            {/* <p className="text-xs text-gray-300">FMTTI Certified</p> */}
          </div>
        )}
        <div className="text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-2 bg-white/10">
            <Image
              src={isoImage}
              alt="ISO Seal"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          {/* <p className="text-xs text-gray-300">ISO Company</p> */}
        </div>
      </motion.div>
    );
  }

  return (
    <BgLayout>
      {/* Hero Section */}
      {renderBannerSection()}

      {/* Product Info & Download Buttons */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between gap-50 px-5">
            {/* Left - Product Name */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {modelDetails.model}
              </h2>
              {/* <p className="text-[#989b2e] text-lg font-medium">{modelDetails.power}</p> */}
            </motion.div>

            {/* Right - Download Buttons */}
            <DocumentButtons />
          </div>
        </div>
      </section>

      {/* Product Leaflet Image */}
      {(modelDetails.isCatalogueLeft || modelDetails.isCatalogueRight) && (
        <section className="py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="flex flex-col md:flex-row gap-4 md:gap-8 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6 items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {modelDetails.isCatalogueLeft && (
                <div className="relative w-full aspect-[2492/3508] h-full ">
                  <Image
                    src={modelDetails.catalougeLeft}
                    alt={`${modelDetails.name} Leaflet Left`}
                    fill
                    className="object-contain bg-white rounded-xl shadow-md"
                    priority
                  />
                </div>
              )}
              {modelDetails.isCatalogueRight && (
                <div className="relative w-full aspect-[2492/3508] h-full ">
                  <Image
                    src={modelDetails.catalougeRight}
                    alt={`${modelDetails.name} Leaflet Right`}
                    fill
                    className="object-contain bg-white rounded-xl shadow-md"
                    priority
                  />
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Specifications/Features Toggle & Certification Seals */}
      <section className="pt-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Toggle Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex space-x-4 mb-8">
                <button
                  onClick={() => setActiveView('specifications')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeView === 'specifications'
                      ? 'bg-[#989b2e] text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Technical Specifications
                </button>
                <button
                  onClick={() => setActiveView('features')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeView === 'features'
                      ? 'bg-[#989b2e] text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Special Features
                </button>
              </div>
            </motion.div>

            {/* Right - Certification Seals */}
            <WarrantyCertifications />
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Image Slider */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <ExZoomGallery
                images={modelDetails.showcaseImages}
                alt={modelDetails.name}
                currentIndex={currentImageIndex}
                setCurrentIndex={setCurrentImageIndex}
              />
            </motion.div>

            {/* Right - Specifications or Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {activeView === 'specifications' ? (
                <div className="grid grid-cols-1 gap-4">
                  {modelDetails.specifications.map((spec, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.005 }}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-[#989b2e] font-medium">{spec.label}</h4>
                        <p className="text-white font-semibold">{spec.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {modelDetails.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.01 }}
                    >
                      <p className="text-gray-300 leading-relaxed">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Description & Model Description */}
      <section className="py-12 px-6 ">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Product & Model Descriptions */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <div className="space-y-4">
                  {modelDetails.description.map((desc, idx) => (
                    <div key={idx}>
                      {desc.title && <h3 className="text-2xl font-bold text-[#989b2e] mb-4">{desc.title}</h3>}
                      <p className="text-gray-100 leading-relaxed">{desc.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right - Labeled Product Image */}
            <motion.div
              className="relative h-full rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={modelDetails.descriptionImage}
                alt={`${modelDetails.name} labeled view`}
                fill
                className="object-contain p-8 bg-white"
              />
              {/* You can add labeled callouts here */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Frequently Asked <span className='text-[#989b2e]'>Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <motion.div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 overflow-hidden ${isOpen ? 'shadow-lg' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.01 }}
                >
                  <button
                    className="w-full flex justify-between items-center text-left p-6 focus:outline-none"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-semibold text-white">{faq.question}</span>
                    <svg
                      className={`w-6 h-6 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className="transition-all duration-300 px-6"
                    style={{
                      maxHeight: isOpen ? '500px' : '0px',
                      opacity: isOpen ? 1 : 0,
                      pointerEvents: isOpen ? 'auto' : 'none',
                    }}
                  >
                    <p className="text-gray-300 leading-relaxed mb-2">{faq.answer}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other Models */}
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
              Other <span className='text-[#989b2e]'>Models</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherModels.map((otherModel, index) => (
              <Link
                key={index}
                href={`/product/${slug}/${otherModel.name}`}
                className="group"
              >
                <motion.div
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.01 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative h-60 mb-4 rounded-xl overflow-hidden bg-white">
                    <Image
                      src={otherModel.image || getProductImage(slug)}
                      alt={otherModel.name}
                      fill
                      className="object-contain p-2 scale-130 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-0 group-hover:text-[#989b2e] transition-colors text-center">
                    {otherModel.name}
                  </h3>
                  {/* <p className="text-gray-300 text-center">{otherModel.power}</p> */}
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-10 px-6 text-center">
        <div className="flex justify-center space-x-8">
          <Link 
            href={`/product/${slug}`}
            className="inline-flex items-center text-[#989b2e] hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {getProductName(slug)} Models
          </Link>
          <Link 
            href="/product"
            className="inline-flex items-center text-[#989b2e] hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            All Products
          </Link>
        </div>
      </section>
    </BgLayout>
  )
}

export default ModelSpecificPage
