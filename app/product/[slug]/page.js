'use client'
import BgLayout from '@/components/templates/bgLayout'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

function ProductSpecificPage() {
  const params = useParams();
  const slug = params.slug;

  // Get product models based on slug
  const getProductModels = (productSlug) => {
    const productModels = {
      'gasoline-water-pump': [
        { id: 1, name: 'BON-P-WP1.0-31', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP1.0-31.webp', feature: 'INLET/OUTLET- 1 INCH -31 CC', link: '/product/gasoline-water-pump/BON-P-WP1.0-31' },
        { id: 2, name: 'BON-P-WP1.5-79', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP1.5-79.webp', feature: 'Engine Power : 79 CC', link: '/product/gasoline-water-pump/BON-P-WP1.5-79' },
        { id: 3, name: 'BON-P-WP2.0-149', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP2.0-149.webp', feature: 'INLET/OUTLET- 2 INCHES- 149 CC', link: '/product/gasoline-water-pump/BON-P-WP2.0-149' },
        { id: 4, name: 'BON-P-WP2.0-196', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP2.0-196.webp', feature: 'Engine Power : 196 Cc', link: '/product/gasoline-water-pump/BON-P-WP2.0-196' },
        { id: 5, name: 'BON-P-WP3.0-196', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP3.0-196.webp', feature: 'Engine Power : 196 Cc', link: '/product/gasoline-water-pump/BON-P-WP3.0-196' },
        { id: 6, name: 'BON-P-WP4.0-272', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP4.0-272.webp', feature: 'Engine Power : 272 Cc', link: '/product/gasoline-water-pump/BON-P-WP4.0-272' },
        { id: 7, name: 'BON-P-WP1.5-224HL', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP1.5-224HL.webp', feature: 'INLET/OUTLET- 1.5 INCH-224 CC- HL', link: '/product/gasoline-water-pump/BON-P-WP1.5-224HL' },
        { id: 8, name: 'BON-P-WP6.0-420', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP6.0-420.webp', feature: 'INLET / OUTLET- 6 INCHES- 420 CC', link: '/product/gasoline-water-pump/BON-P-WP6.0-420' },
        { id: 9, name: 'BON-P-WP2.0-224HL', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP2.0-224HL.webp', feature: 'Engine Power : 224 Cc', link: '/product/gasoline-water-pump/BON-P-WP2.0-224HL' },
        { id: 10, name: 'BON-P-WP2.0-420HL', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP2.0-420HL.png', feature: 'INLET/OUTLET- 2.0 INCH-420 CC- HL', link: '/product/gasoline-water-pump/BON-P-WP2.0-420HL' },
        { id: 11, name: 'BON-P-WP3.0-420HL', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP3.0-420HL.png', feature: 'INLET/OUTLET- 3.0 IN- 420 CC- HL', link: '/product/gasoline-water-pump/BON-P-WP3.0-420HL' },
        { id: 12, name: 'BON-P-WP2.0-196CH', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP2.0-196CH.webp', feature: 'INLET/OUTLET- 2 IN- 196 CC- CH', link: '/product/gasoline-water-pump/BON-P-WP2.0-196CH' },
        { id: 13, name: 'BON-P-WP2.0-196TR', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP2.0-196TR.webp', feature: 'INLET/OUTLET- 2 IN- 196 CC- TR', link: '/product/gasoline-water-pump/BON-P-WP2.0-196TR' },
        { id: 14, name: 'BON-P-WP3.0-196TR', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-WP3.0-196TR.webp', feature: 'INLET / OUTLET- 3 INCHES- 196 CC- TR', link: '/product/gasoline-water-pump/BON-P-WP3.0-196TR' }
      ],
      'gasoline-engine': [
        { id: 1, name: 'BON-P-GE-3.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-3.0HP.webp', feature: 'POTENCIA 3.0 HP', link: '/product/gasoline-engine/BON-P-GE-3.0HP' },
        { id: 2, name: 'BON-P-GE-3.5HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-3.5HP.webp', feature: 'POTENCIA 3.5 HP', link: '/product/gasoline-engine/BON-P-GE-3.5HP' },
        { id: 3, name: 'BON-P-GE-4.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-4.0HP.webp', feature: 'POTENCIA 4.0 HP', link: '/product/gasoline-engine/BON-P-GE-4.0HP' },
        { id: 4, name: 'BON-P-GE-5.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-5.0HP.webp', feature: 'POTENCIA 5.0 HP', link: '/product/gasoline-engine/BON-P-GE-5.0HP' },
        { id: 5, name: 'BON-P-GE-7.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-7.0HP.webp', feature: 'Engine Power : 7.0HP', link: '/product/gasoline-engine/BON-P-GE-7.0HP' },
        { id: 6, name: 'BON-P-GE-9.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-9.0HP.webp', feature: 'Engine Power : 9.0HP', link: '/product/gasoline-engine/BON-P-GE-9.0HP' },
        { id: 7, name: 'BON-P-GE-13.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-13.0HP.webp', feature: 'Engine Power : 13.0HP', link: '/product/gasoline-engine/BON-P-GE-13.0HP' },
        { id: 8, name: 'BON-P-GE-14.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-14.0HP.webp', feature: 'Engine Power : 14.0HP', link: '/product/gasoline-engine/BON-P-GE-14.0HP' },
        { id: 9, name: 'BON-P-GE-16.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-16.0HP.webp', feature: 'POTENCIA 16.0 HP', link: '/product/gasoline-engine/BON-P-GE-16.0HP' },
        { id: 10, name: 'BON-P-GE-24.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-24.0HP.webp', feature: 'POWER 24.0 HP- V DOBLE CILINDRO', link: '/product/gasoline-engine/BON-P-GE-24.0HP' },
        { id: 11, name: 'BON-P-GE-34.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GE-34.0HP.webp', feature: 'POTENCIA 34.0 HP- V DOBLE CILINDRO', link: '/product/gasoline-engine/BON-P-GE-34.0HP' }
      ],
      'gasoline-generator': [
        { id: 1, name: 'BON-P-GG-2.8KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-2.8KW.webp', feature: 'MAX . POWER 2.8 KW', link: '/product/gasoline-generator/BON-P-GG-2.8KW' },
        { id: 2, name: 'BON-P-GG-3.7KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-3.7KW.webp', feature: 'MAX . POWER 3.7 KW', link: '/product/gasoline-generator/BON-P-GG-3.7KW' },
        { id: 3, name: 'BON-P-GG-5.0KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-5.0KW.webp', feature: 'MAX . POWER 5.0 KW', link: '/product/gasoline-generator/BON-P-GG-5.0KW' },
        { id: 4, name: 'BON-P-GG-7.5KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-7.5KW.webp', feature: 'MAX . POWER 7.5 KW', link: '/product/gasoline-generator/BON-P-GG-7.5KW' },
        { id: 5, name: 'BON-P-GG-9.0KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-9.0KW.webp', feature: 'MAX . POWER 9.0 KW', link: '/product/gasoline-generator/BON-P-GG-9.0KW' },
        { id: 6, name: 'BON-P-GG-9.5KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-9.5KW.webp', feature: 'MAX . POWER 9.5 KW', link: '/product/gasoline-generator/BON-P-GG-9.5KW' },
        { id: 7, name: 'BON-P-GG-12.0KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-12KW.webp', feature: 'MAX . POWER 12.0 KW', link: '/product/gasoline-generator/BON-P-GG-12.0KW' },
        { id: 8, name: 'BON-P-GG-13.5KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-13.5KW.webp', feature: 'MAX . POWER 13.5 KW', link: '/product/gasoline-generator/BON-P-GG-13.5KW' },
        { id: 9, name: 'BON-P-GG-16.0KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-16KW.webp', feature: 'MAX . POWER 16.0 KW', link: '/product/gasoline-generator/BON-P-GG-16.0KW' },
        { id: 10, name: 'BON-P-GG-18.5KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GG-18KW.webp', feature: 'MAX . POWER 18.5 KW', link: '/product/gasoline-generator/BON-P-GG-18.5KW' }
      ],
      'brush-cutter': [
        { id: 1, name: 'BON-P-BC36', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-BC36.webp', feature: 'Displacement 36 CC', link: '/product/brush-cutter/BON-P-BC36' },
        { id: 2, name: 'BON-ET-BC53', image: 'https://bonhoeffermachines.com/en/public/machines/BON-ET-BC53.webp', feature: 'DISPLACEMENT 53 CC', link: '/product/brush-cutter/BON-ET-BC53' },
        { id: 3, name: 'BON-P-BC45', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-BC45.webp', feature: 'DISPLACEMENT 45 CC', link: '/product/brush-cutter/BON-P-BC45' }
      ],
      'multi-tool': [
        { id: 1, name: 'BON-P-MT45', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-MT45.webp', feature: 'Multi Tool', link: '/product/multi-tool/BON-P-MT45' }
      ],
      'chainsaw': [
        { id: 1, name: 'BON-P-CS40', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-CS40.webp', feature: 'Displacement 40 CC', link: '/product/chainsaw/BON-P-CS40' },
        { id: 2, name: 'BON-P-CS55', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-CS55.webp', feature: 'Displacement 55 CC', link: '/product/chainsaw/BON-P-CS55' },
        { id: 3, name: 'BON-P-CS65', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-CS65.webp', feature: 'Displacement 65 CC', link: '/product/chainsaw/BON-P-CS65' },
        { id: 4, name: 'BON-P-CS92', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-CS92.webp', feature: 'Displacement 92 CC', link: '/product/chainsaw/BON-P-CS92' }
      ],
      'gasoline-inverter': [
        { id: 1, name: 'BON-P-GI-1.8KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GI-1.8KW.webp', feature: 'MAX . POWER 1.8 KW', link: '/product/gasoline-inverter/BON-P-GI-1.8KW' },
        { id: 2, name: 'BON-P-GI-2.1KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GI-2.1KW.png', feature: 'MAX . POWER 2.1 KW', link: '/product/gasoline-inverter/BON-P-GI-2.1KW' },
        { id: 3, name: 'BON-P-GI-2.5KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GI-2.5KW.webp', feature: 'MAX . POWER 2.5 KW', link: '/product/gasoline-inverter/BON-P-GI-2.5KW' },
        { id: 4, name: 'BON-P-GI-2.9KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GI-2.9KW.webp', feature: 'MAX . POWER 2.9 KW', link: '/product/gasoline-inverter/BON-P-GI-2.9KW' },
        { id: 5, name: 'BON-P-GI-3.5KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GI-3.5KW.webp', feature: 'MAX . POWER 3.5 KW', link: '/product/gasoline-inverter/BON-P-GI-3.5KW' },
        { id: 6, name: 'BON-P-GI-3.8KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GI-3.8KW.webp', feature: 'MAX . POWER 3.8 KW', link: '/product/gasoline-inverter/BON-P-GI-3.8KW' },
        { id: 7, name: 'BON-P-GI-5.5KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GI-5.5KW.webp', feature: 'MAX . POWER 5.5 KW', link: '/product/gasoline-inverter/BON-P-GI-5.5KW' },
        { id: 8, name: 'BON-P-GI-7.5KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-GI-7.5KW.webp', feature: 'MAX . POWER 7.5 KW', link: '/product/gasoline-inverter/BON-P-GI-7.5KW' }
      ],
      'earth-auger': [
        { id: 1, name: 'BON-P-EA-52', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-EA-52.webp', feature: 'Engine: 2-Stroke, 52cc, 1.45kW', link: '/product/earth-auger/BON-P-EA-52' },
        { id: 2, name: 'BON-P-EA-63', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-EA-63.webp', feature: 'Engine: 2-Stroke, 63cc, 1.65kW', link: '/product/earth-auger/BON-P-EA-63' },
        { id: 3, name: 'BON-P-EA-68', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-EA-68.webp', feature: 'Engine: 2-Stroke, 68cc, 2.2kW', link: '/product/earth-auger/BON-P-EA-68' },
        { id: 4, name: 'BON-P-EA-80', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-EA-80.webp', feature: 'Engine: 2-Stroke, 80cc, 2.4kW', link: '/product/earth-auger/BON-P-EA-80' }
      ],
      'water-pump-2-stroke': [
        { id: 1, name: 'BON-WP1.0-52-2S', image: 'https://bonhoeffermachines.com/en/public/machines/BON-WP1.0-52-2S.webp', feature: 'INLET / OUTLET- 1 INCHES - 52 CC', link: '/product/water-pump-2-stroke/BON-WP1.0-52-2S' }
      ],
      'engine-2-stroke': [
        { id: 1, name: 'BON-2S-35', image: 'https://bonhoeffermachines.com/en/public/machines/BON-2S-35.webp', feature: '2-Stroke, 35cc, 1.0kW', link: '/product/engine-2-stroke/BON-2S-35' },
        { id: 2, name: 'BON-2S-43', image: 'https://bonhoeffermachines.com/en/public/machines/BON-2S-43.webp', feature: '2-Stroke, 43cc, 1.25kW', link: '/product/engine-2-stroke/BON-2S-43' },
        { id: 3, name: 'BON-2S-52', image: 'https://bonhoeffermachines.com/en/public/machines/BON-2S-52.webp', feature: '2-Stroke, 52cc, 1.45kW', link: '/product/engine-2-stroke/BON-2S-52' }
      ],
      'lawn-mover': [
        { id: 1, name: 'BON-P-LM22', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-LM22.webp', feature: 'CUTTING WIDTH - 22 INCHES', link: '/product/lawn-mover/BON-P-LM22' }
      ],
      'backpack-brush-cutter': [
        { id: 1, name: 'BON-P-BP-BC45', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-BP-BC45.webp', feature: 'DISPLACEMENT 45 CC', link: '/product/backpack-brush-cutter/BON-P-BP-BC45' }
      ],
      'blower': [
        { id: 1, name: 'BON-P-BBL53', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-BBL53.webp', feature: 'DISPLACEMENT 53 CC', link: '/product/blower/BON-P-BBL53' },
        { id: 2, name: 'BON-P-BL26', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-BL26.webp', feature: 'DESPLAZAMIENTO 26 CC', link: '/product/blower/BON-P-BL26' },
        { id: 3, name: 'BON-P-BLV26', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-BLV26.webp', feature: 'DISPLACEMENT 26 CC', link: '/product/blower/BON-P-BLV26' }
      ],
      'diesel-engine': [
        { id: 1, name: 'BON-P-DE-5.5HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-DE-5.5HP.webp', feature: 'POWER 5.5 HP', link: '/product/diesel-engine/BON-P-DE-5.5HP' },
        { id: 2, name: 'BON-P-DE-5.0 HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-DE-5.5HP.webp', feature: 'POWER 5.0 HP', link: '/product/diesel-engine/BON-P-DE-5.0 HP' },
        { id: 3, name: 'BON-P-DE-6.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-DE-6.0HP.webp', feature: 'POWER 6.0 HP', link: '/product/diesel-engine/BON-P-DE-6.0HP' },
        { id: 4, name: 'BON-P-DE-9.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-DE-9.0HP.webp', feature: 'POWER 9.0 HP', link: '/product/diesel-engine/BON-P-DE-9.0HP' },
        { id: 5, name: 'BON-P-DE-10.2HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-DE-10.2HP.png', feature: 'POWER 10.2 HP', link: '/product/diesel-engine/BON-P-DE-10.2HP' },
        { id: 6, name: 'BON-P-DE-11.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-DE-11.0HP.webp', feature: 'POWER 11.0 HP', link: '/product/diesel-engine/BON-P-DE-11.0HP' },
        { id: 7, name: 'BON-P-DE-13.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-DE-13.0HP.png', feature: 'POWER 13.0 HP', link: '/product/diesel-engine/BON-P-DE-13.0HP' }
      ],
      'diesel-generator': [
        { id: 1, name: 'BON-P-DG-3.5 KW', image: 'https://bonhoeffermachines.com/en/public/machines/DIESEL-GENERATOR-1.png', feature: 'MAX . POWER 3.5 KW', link: '/product/diesel-generator/BON-P-DG-3.5 KW' },
        { id: 2, name: 'BON-P-DG-6.0KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-DG-6.0KW.webp', feature: 'MAX . POWER 6.0 KW', link: '/product/diesel-generator/BON-P-DG-6.0KW' },
        { id: 3, name: 'BON-P-DG-6.5KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-DG-6.5KW.webp', feature: 'MAX . POWER 6.5 KW', link: '/product/diesel-generator/BON-P-DG-6.5KW' },
        { id: 4, name: 'BON-P-DG-3.0KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-DG-3.0KW.webp', feature: 'MAX . POWER 3.0 KW', link: '/product/diesel-generator/BON-P-DG-3.0KW' },
        { id: 5, name: 'BON-P-DG-9.0KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-DG-9.0KW.webp', feature: 'MAX . POWER 9.0 KW', link: '/product/diesel-generator/BON-P-DG-9.0KW' },
        { id: 6, name: 'BON-P-DG-10.0KW', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-DG-10KW.webp', feature: 'MAX . POWER 10.0 KW', link: '/product/diesel-generator/BON-P-DG-10.0KW' }
      ],
      'diesel-water-pump': [
        { id: 1, name: 'BON-P-DWP2.0-5.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-DW2.0-5HP-front.webp', feature: 'INLET / OUTLET- 2 INCHES- 5 HP', link: '/product/diesel-water-pump/BON-P-DWP2.0-5.0HP' },
        { id: 2, name: 'BON-P-DWP3.0-5.5HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-DW3.0-5.5HP-front.webp', feature: 'INLET / OUTLET- 3 INCHES- 5.5 HP', link: '/product/diesel-water-pump/BON-P-DWP3.0-5.5HP' },
        { id: 3, name: 'BON-P-DWP4.0-10.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-DW4.0-10HP-front.webp', feature: 'INLET / OUTLET- 4 INCHES- 10.0 HP', link: '/product/diesel-water-pump/BON-P-DWP4.0-10.0HP' },
        { id: 4, name: 'BON-P-DWP2.0-10.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-DW2.0-10HP-front.webp', feature: 'INLET/OUTLET - 2 INCH - 10.0 HP', link: '/product/diesel-water-pump/BON-P-DWP2.0-10.0HP' },
        { id: 5, name: 'BON-P-DWP3.0-10.5HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-DW3.0-10.5HP-front.webp', feature: 'INLET / OUTLET- 3 INCHES- 10.5 HP', link: '/product/diesel-water-pump/BON-P-DWP3.0-10.5HP' }
      ],
      'earth-auger': [
        { id: 1, name: 'BON-P-EA63', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-EA68.webp', feature: 'Displacement 63 CC', link: '/product/earth-auger/BON-P-EA63' },
        { id: 2, name: 'BON-P-EA52', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-EA52.webp', feature: 'Displacement 52 CC', link: '/product/earth-auger/BON-P-EA52' },
        { id: 3, name: 'BON-P-EA159-4S', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-EA159-4S.webp', feature: 'DESPLAZAMIENTO 159 CC- 4 TIEMPOS', link: '/product/earth-auger/BON-P-EA159-4S' }
      ],
      'electric-pressure-washer': [
        { id: 1, name: 'BON-P-PW-E2.2KW', image: 'https://bonhoeffermachines.com/en/public/machines/0asdfasfdasfdasfasdfa.png', feature: 'POWER 2.2 KW', link: '/product/electric-pressure-washer/BON-P-PW-E2.2KW' },
        { id: 2, name: 'BON-P-PW-E3.0KW', image: 'https://bonhoeffermachines.com/en/public/machines/0Electric%20pressure%20washer.png', feature: 'POWER 3.0 KW', link: '/product/electric-pressure-washer/BON-P-PW-E3.0KW' },
        { id: 3, name: 'BON-P-PW-E5.5KW', image: 'https://bonhoeffermachines.com/en/public/machines/0%20BON-P-PW-E5.5KW.png', feature: 'POWER 5.5 KW', link: '/product/electric-pressure-washer/BON-P-PW-E5.5KW' },
        { id: 4, name: 'BON-P-PW-E7.5KW', image: 'https://bonhoeffermachines.com/en/public/machines/0%20BON-P-PW-E7.5KWasdas.png', feature: 'POWER 7.5 KW', link: '/product/electric-pressure-washer/BON-P-PW-E7.5KW' }
      ],
      'electric': [
        { id: 1, name: 'BON-E-LM-1600W', image: 'https://bonhoeffermachines.com/en/public/machines/BON-E-LM-1600W-front.webp', feature: 'POWER 1600 W', link: '/product/electric/BON-E-LM-1600W' },
        { id: 2, name: 'BON-E-LM-1800W', image: 'https://bonhoeffermachines.com/en/public/machines/BON-E-LM-1800W-front.webp', feature: 'POWER 1800 W', link: '/product/electric/BON-E-LM-1800W' }
      ],
      'solar-panel': [
        { id: 1, name: 'BON-MC-SP-430W', image: 'https://bonhoeffermachines.com/en/public/machines/BON-MC-SP-430W.webp', feature: 'POWER 430 W', link: '/product/solar-panel/BON-MC-SP-430W' }
      ],
      'submersible-pump': [
        { id: 1, name: 'BON-P-SP-0.5HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-SP-0.5HP.webp', feature: 'POWER 0.5 HP', link: '/product/submersible-pump/BON-P-SP-0.5HP' },
        { id: 2, name: 'BON-P-SP-1.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-SP-1.0HP.webp', feature: 'POWER 1.0 HP', link: '/product/submersible-pump/BON-P-SP-1.0HP' },
        { id: 3, name: 'BON-P-SP-3.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-SP-3.0HP.webp', feature: 'POWER 3.0 HP', link: '/product/submersible-pump/BON-P-SP-3.0HP' },
        { id: 4, name: 'BON-P-SP-2.0HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-SP-2.0HP.webp', feature: 'POWER 2.0 HP', link: '/product/submersible-pump/BON-P-SP-2.0HP' },
        { id: 5, name: 'BON-P-SP-1.5HP', image: 'https://bonhoeffermachines.com/en/public/machines/BON-P-SP-1.5HP.webp', feature: 'POWER 1.5 HP', link: '/product/submersible-pump/BON-P-SP-1.5HP' }
      ],
      'tiller': [
        { id: 1, name: 'BON-DI-950', image: 'https://bonhoeffermachines.com/en/public/machines/BON-DI-950.webp', feature: 'POWER 10.0 HP', link: '/product/tiller/BON-DI-950' },
        { id: 2, name: 'BON-GT-500B', image: 'https://bonhoeffermachines.com/en/public/machines/BON-GT-500B.webp', feature: 'POWER 3.5 HP', link: '/product/tiller/BON-GT-500B' },
        { id: 3, name: 'BON-GT-500S', image: 'https://bonhoeffermachines.com/en/public/machines/BON-GT-500S.webp', feature: 'POTENCIA 5.0 HP', link: '/product/tiller/BON-GT-500S' },
        { id: 4, name: 'BON-GT-900', image: 'https://bonhoeffermachines.com/en/public/machines/BON-GT-900.webp', feature: 'POWER 7.0 HP', link: '/product/tiller/BON-GT-900' },
        { id: 5, name: 'BON-GT-950T', image: 'https://bonhoeffermachines.com/en/public/machines/BON-GT-950T.webp', feature: 'POWER 7.0 HP', link: '/product/tiller/BON-GT-950T' },
        { id: 6, name: 'BON-GT-950C', image: 'https://bonhoeffermachines.com/en/public/machines/BON-GT-950C.webp', feature: 'POTENCIA 14.0 HP', link: '/product/tiller/BON-GT-950C' }
      ],
      // Default models for products not specifically defined
      defaultModels: [
        { id: 1, name: `${getProductName(productSlug)}-100`, image: getProductImage(productSlug), feature: '5.5 HP - 163cc', link: `/product/${productSlug}/${getProductName(productSlug)}-100` },
        { id: 2, name: `${getProductName(productSlug)}-200`, image: getProductImage(productSlug), feature: '6.5 HP - 196cc', link: `/product/${productSlug}/${getProductName(productSlug)}-200` },
        { id: 3, name: `${getProductName(productSlug)}-300`, image: getProductImage(productSlug), feature: '7.0 HP - 210cc', link: `/product/${productSlug}/${getProductName(productSlug)}-300` },
        { id: 4, name: `${getProductName(productSlug)}-400`, image: getProductImage(productSlug), feature: '8.0 HP - 250cc', link: `/product/${productSlug}/${getProductName(productSlug)}-400` }
      ]
    };

    return productModels[productSlug] || productModels.defaultModels;
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
      'electric': 'Electric Lawn Mower',
      'electric-pressure-washer': 'Electric Pressure Washer',
      'electric-motors': 'Electric Motors',
      'air-compressor': 'Air Compressor',
      'solar-panel': 'Solar Panel',
      'solar-water-pump': 'Solar Water Pump',
      'gasoline-sprayer': 'Gasoline Sprayer',
      'manual-sprayer': 'Manual Sprayer',
      'backpack-atomizer': 'Backpack Atomizer',
      'mistduster': 'Mistduster',
      'gasoline-generator': 'Gasoline Generator',
      'gasoline-inverter': 'Gasoline Inverter',
      'pressure-washer': 'Pressure Washer',
      'domestic-pressure-washer': 'Domestic Pressure Washer',
      'commercial-vacuum': 'Commercial Vacuum',
      'welding-machine': 'Welding Machine',
      'centrifugal-pump': 'Centrifugal Pump',
      'submersible-pump': 'Submersible Pump',
      'water-pump-2-stroke': '2-Stroke Water Pump',
      'engine-2-stroke': '2-Stroke Engine',
      'tamping-rammer': 'Tamping Rammer',
      'plate-compactor': 'Plate Compactor',
      'concrete-cutter': 'Concrete Cutter',
      'concrete-vibrator': 'Concrete Vibrator',
      'power-trowel': 'Power Trowel',
      'earth-auger': 'Earth Auger',
      'garden-tools': 'Garden Tools',
      'hand-tools': 'Hand Tools',
      'wood-chipper': 'Wood Chipper',
      'chaff-cutter': 'Chaff Cutter',
      'log-splitter': 'Log Splitter',
      'mini-dumper': 'Mini Dumper',
      'trencher': 'Trencher',
      'ac-professional': 'AC Professional'
    };
    return nameMap[slug] || 'Product';
  };

  const getProductImage = (slug) => {
    const imageMap = {
      'gasoline-water-pump': 'https://bonhoeffermachines.com/en/public/product_banner/water-pump-banner.webp',
      'gasoline-engine': 'https://bonhoeffermachines.com/en/public/product_banner/gasoline-engine-banner.webp',
      'gasoline-generator': 'https://bonhoeffermachines.com/en/public/product_banner/gasoline-generator-banner.webp',
      'gasoline-inverter': 'https://bonhoeffermachines.com/en/public/product_banner/gasoline-inverter-banner.webp',
      'gasoline-tiller': 'https://bonhoeffermachines.com/public/product_banner/5-gasoline-tiller.webp',
      'brush-cutter': 'https://bonhoeffermachines.com/en/public/product_banner/brush-cutter-banner.webp',
      'backpack-brush-cutter': 'https://bonhoeffermachines.com/en/public/product_banner/backpack-brush-cutter-banner.webp',
      'multi-tool': 'https://bonhoeffermachines.com/public/product_banner/9-multi-tool.webp',
      'chainsaw': 'https://bonhoeffermachines.com/public/product_banner/10-chain-saw.webp',
      'hedge-trimmer': 'https://bonhoeffermachines.com/public/product_banner/11-hedge-trimmer.webp',
      'leaf-blower': 'https://bonhoeffermachines.com/public/product_banner/12-blower.webp',
      'lawn-mower': 'https://bonhoeffermachines.com/public/product_banner/13-gasoline-lawn-mower.webp',
      'earth-auger': 'https://bonhoeffermachines.com/public/product_banner/14-earth-auger.webp',
      'diesel-water-pump': 'https://bonhoeffermachines.com/public/product_banner/19-diesel-water-pump.webp',
      'diesel-generator': 'https://bonhoeffermachines.com/public/product_banner/20-diesel-generator.webp',
      'diesel-engine': 'https://bonhoeffermachines.com/public/product_banner/21-diesel-engine.webp',
      'pressure-washer': 'https://bonhoeffermachines.com/public/product_banner/22-gasoline-pressure-washer.webp',
      'domestic-pressure-washer': 'https://bonhoeffermachines.com/public/product_banner/23-pressure-washer-home-use.webp',
      'air-compressor': 'https://bonhoeffermachines.com/public/product_banner/24-direct-driven-air-compressor.webp',
      'commercial-vacuum': 'https://bonhoeffermachines.com/public/product_banner/25-vaccum-cleaner.webp',
      'manual-sprayer': 'https://bonhoeffermachines.com/public/product_banner/27-manual-sprayer.webp',
      'electric-pressure-washer': 'https://bonhoeffermachines.com/public/product_banner/28-electric-pressure-washer.webp',
      'mistduster': 'https://bonhoeffermachines.com/public/product_banner/29-Mistduster.webp',
      'centrifugal-pump': 'https://bonhoeffermachines.com/public/product_banner/31-Centrifugal-Pump.webp',
      'submersible-pump': 'https://bonhoeffermachines.com/public/product_banner/32-Submersible-Pump.webp',
      'solar-water-pump': 'https://bonhoeffermachines.com/public/product_banner/33-Solar-Submersible-Pump.webp',
      'solar-panel': 'https://bonhoeffermachines.com/public/product_banner/34-solar-pannel.webp',
      'tamping-rammer': 'https://bonhoeffermachines.com/public/product_banner/35-tamping-rammer.webp',
      'plate-compactor': 'https://bonhoeffermachines.com/public/product_banner/36-plate-compactor.webp',
      'concrete-cutter': 'https://bonhoeffermachines.com/public/product_banner/37-Concrete-cutter.webp',
      'concrete-vibrator': 'https://bonhoeffermachines.com/public/product_banner/38-concrete-vibrator.webp',
      'power-trowel': 'https://bonhoeffermachines.com/public/product_banner/39-power-trovel.webp',
      'welding-machine': 'https://bonhoeffermachines.com/public/product_banner/40-welding-set.webp',
      'water-pump-2-stroke': 'https://bonhoeffermachines.com/en/public/product_banner/waterpump-2stroke-banner.webp',
      'engine-2-stroke': 'https://bonhoeffermachines.com/en/public/product_banner/2stroke-engine-banner.webp',
      'lawn-mover': 'https://bonhoeffermachines.com/en/public/product_banner/lawn-mower-banner.webp',
      'blower': 'https://bonhoeffermachines.com/en/public/product_banner/blower-banner.webp',
      'diesel-engine': 'https://bonhoeffermachines.com/en/public/product_banner/diesel-engine-banner.webp',
      'diesel-generator': 'https://bonhoeffermachines.com/en/public/product_banner/diesel-generator-banner.webp',
      'diesel-water-pump': 'https://bonhoeffermachines.com/en/public/product_banner/diesel-water-pump-banner.webp',
      'earth-auger': 'https://bonhoeffermachines.com/en/public/product_banner/earth-auger-banner.webp',
      'electric-pressure-washer': 'https://bonhoeffermachines.com/en/public/product_banner/electric-pressure-washer-banner.webp',
      'electric': 'https://bonhoeffermachines.com/en/public/product_banner/electric-lawn-mower-banner.webp',
      'solar-panel': 'https://bonhoeffermachines.com/en/public/product_banner/solar-pannel-banner.webp',
      'submersible-pump': 'https://bonhoeffermachines.com/en/public/product_banner/submersible-pumps-banner.webp',
      'tiller': 'https://bonhoeffermachines.com/en/public/product_banner/gasoline-tiller-banner.webp',
    };
    return imageMap[slug] || 'https://bonhoeffermachines.com/public/product_banner/1-gasoline-water-pump.webp';
  };

  const getProductDescription = (slug) => {
    const descriptions = {
      'gasoline-water-pump': 'A gasoline water pump is a machine used to transmit massive amounts of water. These water pumps are ideal for irrigation, agriculture, and construction industry requirements. Bonhoeffer\'s gasoline water pump comes with a robust OHV technology engine and a high-quality aluminum pump. These water pumps are light weighted making it vastly portable and easy to operate. It comes with a resistant ceramic cylinder to wear, a double crankshaft forged arm and low vibration, delivering high-performance goals',
      'gasoline-engine': 'Designed for heavy duty work, it can be installed on water pumps/generators/cultivators/small construction machinery/stationary sprayers/pressure washers, etc. The Bonhoeffer gasoline engine comes with OHV technology, making it easy to start and offering high performance. It incorporates a steel grille protecting the muffler with better cooling performance and greater resistance. The engine also has a smart framed structure and a built-in oil sensor that automates engine start when the oil level is low.',
      'gasoline-generator': 'Gasoline generators are best source of all your power requirements at places where there is lack of electricity. Bonhoeffer\'s generators are fitted with professional gasoline engines and 100% copper winding alternators. Frames are built up with Q235-type steel using fully automatic robotic welding technology. Control Panel is Integrated with graphical interface for easy operation. Our generators are capable of handling all the load requirements and ensures complete safety.',
      'gasoline-inverter': 'Gasoline Inverter have unique feature of portability, light weight and compact. Bonhoeffer gasoline inverter are ultra-quiet fitted with 4 stroke gasoline engine, high quality Plastic resin parts, work perfectly at variable temperature of -5 °c and 50 °c and full use of petrol when tilt at different angles up to 25° in all directions.',
      'brush-cutter': 'Brush cutter makes your daily task of cutting and trimming the uneven bushes, shrubs, and grass easy. Bonhoeffer\'s Brush cutter comes with 30% more powerful engine compared with traditional engines. Made with shear precision, it is compatible, lightweight, and has a 200 Hour tested Professional Gear Box. Our Brush cutter engine is fitted with 20 CRMO material Crankshaft for a longer service life. Ergonomic bicycle type handle helps to do outdoor work effectively.',
      'chainsaw': 'Professional chainsaws for tree felling, pruning, and wood cutting applications. Features advanced anti-kickback technology, automatic chain lubrication, and ergonomic design for extended use.',
      'earth-auger': 'Earth augers are powerful tools designed for drilling holes in the ground quickly and efficiently. Ideal for planting trees, installing fence posts, and other agricultural or construction applications. Bonhoeffer earth augers feature robust 2-stroke engines, ergonomic handles, and durable auger bits for reliable performance in tough soil conditions.',
      'water-pump-2-stroke': 'To withstand the challenge of shifting water from place to place in irrigation, Bonhoeffer\'s 2-stroke engine water pump is perfectly capable to draw water from 6m beneath surface. It has a 1-liter fuel tank capacity and discharges water at 10000m/hour.',
      'engine-2-stroke': 'Bonhoeffer\'s 2-stroke engines are compact, lightweight, and powerful, ideal for handheld equipment and portable machinery. Designed for high performance and reliability, these engines feature easy start, efficient fuel consumption, and robust construction for demanding applications.',
      'lawn-mover': 'Powered to maneuver over grass and turf for desirable and affordable trimming and clearing, the Bonhoeffer 4-in-1 Stringing Mower comes with a 6.5 HP motor and a 22-inch cutting width. Steel covers make it stronger and more durable. Self-propelled driving makes it convenient to move. Equipped with a 65L bag to facilitate waste collection.',
      'backpack-brush-cutter': 'Backpack Brush cutters make the machine much more convenient to carry around. Bonhoeffer\'s Brush cutter comes with 30% more powerful engine compared with traditional engines , 200 Hour tested Professional Gear Box , 20 CRMO material Crankshaft, high quality harness and durable steel frame for engine fitment.',
      'blower': 'Blowers are mainly used in homes and industries to blow away dust from every nook and corner. The blower has the features of a vacuum, blower, and mulching and is the perfect solution for cleaning the off-season leaves from your garden and gathering the dust particles. The 2-stroke engine with a single cylinder Bonhoeffer blower runs like a compact machine and has a double-layer air filter for a cleaner engine. Accessibility of adjustable handle inside the 90-degree range, makes it comfortable and reduces fatigue. The Blower even works for heavy workloads because of an Air Volume of 1450 M3/H and an ideal air velocity of 78 M/S.',
      'diesel-engine': 'Diesel engines are widely used in multiple applications and machines such as Water pumps, tillers, generators, etc. Bonhoeffer diesel Engines provided a higher compression ratio, uniform distribution in the fuel, low maintenance, and high performance. compared with ordinary engine Bonhoeffer Diesel Engine equipped with HCCI technology.',
      'diesel-generator': 'Diesel generators are used to generate electric energy by using diesel engines and alternators. Bonhoeffer\'s single-phase diesel generators are equipped with professional quality 4 stroke air cooled diesel engines, compact structure, Low noise, digital control system, and advanced technology which helps in fuel efficiency.',
      'diesel-water-pump': 'Diesel water pumps are ideal for industrial applications or agricultural applications. Bonhoeffer\'s diesel water pumps come with a professional 4-stroke air-cooled diesel engine, an aluminum casing pump for normal lift, and a cast-iron pump for high lift. High fuel efficiency, lightweight, compact structure, and convenient operation are key features of our diesel water pump.',
      'earth-auger': 'Earth Augers are the best solution to drill the hard ground surface for planting a tree or erecting poles for the fence. Bonhoeffer\'s earth auger comes with easy to maintain Air filter, low vibration performance due to precise coupling between PTO and bits, third a generation gearbox with a structure of 2 cavities for greater durability. We have the option of a single-operator handle and a multi-operator handle for the ultimate comfort.',
      'electric-pressure-washer': 'Electric Pressure washers are used in various industries, residential complexes, and workshops to remove loose paint, dust, mud, and dirt from surfaces. Bonhoeffer\'s electric pressure washer is fitted with a performance-proven three-phase motor, heavy-duty grade direct drive brass manifold triplex pump, solid heat treatment stainless steel plunger with ceramic coating, and accessories such as quick plug type nozzle tips, 10" pneumatic tires, steel braided high-pressure hose, professional trigger gun with stainless steel lance.',
      'electric': 'Electric lawn mowers are eco-friendly and efficient, ideal for residential and commercial use. Bonhoeffer\'s electric lawn mowers feature high-performance motors, ergonomic designs, and durable construction for reliable operation.',
      'solar-panel': 'Solar panels collect energy from the sun in the form of sunlight and convert it into electricity that can be used to power homes and businesses. Bonhoeffer\'s high-efficiency solar panels come in monocrystalline and polycrystalline types with a power range from 150W to 460W.',
      'submersible-pump': 'Submersible pumps are used to pump out large amounts of water from underground and in borewell areas with high pressure. Bonhoeffer submersible pumps are fitted with brass inlet and outlet to avoid oxidation. POM Impellers for high efficiency, 100% copper winding motor for resistance to high temperatures, and better working efficiency.',
      'tiller': 'A very robust and powerful weeder for customers who value long-lasting durability and high efficiency. Reliable and easy-starting diesel-power Bonhoeffer engine with oil bath air filter for longest service life. An absolute requirement for engines used in dry and dusty environments. Power weeder has a fully sealed transmission for usage in wet cultures and operates with a direct clutch; two speeds forward and one reverse. The handlebar is adjustable, both horizontally and vertically, for comfortable use. Removable transport wheels are standard and allow the use of many accessories, such as ploughs and ditching blades. The AUX PTO makes the machine extremely versatile as it gives you the option to connect several useful accessories to be powered by this multi-purpose machine.'
    };
    
    return descriptions[slug] || `Professional ${getProductName(slug).toLowerCase()} designed for heavy-duty applications. Built with premium materials and advanced engineering for reliable performance in demanding conditions.`;
  };

  const productName = getProductName(slug);
  const productImage = getProductImage(slug);
  const productDescription = getProductDescription(slug);
  const models = getProductModels(slug);

  return (
    <BgLayout>
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center overflow-hidden mt-5">
        <div className="absolute inset-0">
          <Image
            src={productImage}
            alt="Product Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/5" />
        </div>
        
        <motion.div 
          className="relative z-10 text-white px-0 flex items-center h-full justify-start"
          style={{ left: 0 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-left w-full md:w-1/4 pl-6 md:pl-12"
            style={{ maxWidth: '25%' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="text-[#989b2e]">{productName}</span>
          </motion.h1>
          
          {/* <motion.p 
            className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Choose from our range of professional {productName.toLowerCase()} models
          </motion.p> */}
        </motion.div>
      </section>

      {/* Product Description */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Professional Grade <span className="text-[#989b2e]">{productName}</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              {productDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Models Grid Section */}
      <section className="py-20 px-6 ">
        <div className="max-w-7xl mx-auto">
          {/* <motion.div
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
              Select the perfect {productName.toLowerCase()} model for your specific needs
            </p>
          </motion.div> */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {models.map((model, index) => (
              <motion.div
                key={model.id || model.name}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(152, 155, 46, 0.1)" }}
              >
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-white">
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-contain p-2 scale-150 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#989b2e] transition-colors text-center">
                  {model.name}
                </h3>
                <div className="space-y-2 mb-4 text-center">
                  <p className="text-gray-300 text-sm">
                    {model.feature}
                  </p>
                </div>
                <Link 
                  href={model.link || `/product/${slug}/${model.name.toLowerCase()}`}
                  className="inline-flex items-center justify-center w-full bg-[#989b2e] hover:bg-[#8a8c20] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 group-hover:scale-105 cursor-pointer"
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

      {/* Back Navigation */}
      <section className="py-10 px-6 text-center">
        <Link 
          href="/product"
          className="inline-flex items-center text-[#989b2e] hover:text-white transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Products
        </Link>
      </section>
    </BgLayout>
  )
}

export default ProductSpecificPage
