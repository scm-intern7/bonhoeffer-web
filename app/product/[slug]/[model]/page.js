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
          description: [
            {title: 'High-Performance Water Transfer', text: 'The BON-P-WP1.5-79 is a high-performance water pump designed for efficient water transfer in various demanding conditions. It features an ergonomically shaped L-handle for comfortable transport, OHV technology for enhanced engine efficiency, and a robust vertical engine capable of operating up to 250 hours continuously.'},
            {title: 'Large-Scale Applications', text: 'With a high suction and discharge capacity of 13 tons of water per hour, this pump is ideal for large-scale applications. Additionally, it includes a steel grid muffler protector for user safety, preventing accidental contact with hot surfaces.'}
          ],
          descriptionImage: 'https://bonhoeffermachines.com/en/public/machines/specification_dark_1721129007_aa71a890cbda98df88c2.webp',
          showcaseImages: [
            'https://bonhoeffermachines.com/en/public/machines/showcase-2-bon-p-wp1.5-79.webp',
            'https://bonhoeffermachines.com/en/public/machines/showcase-1-bon-p-wp1.5-79.webp',
            'https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-wp1.5-79-4.webp'
          ],
          isBannerImage: false,
          bannerImage: [],
          isVideo: true,
          videoUrls: [
            'https://www.youtube.com/embed/troubleshooting1',
            'https://www.youtube.com/embed/troubleshooting2'
          ],
          catalougeLeft: 'https://bonhoeffermachines.com/en/public/machines/specification_left_1718186339_850cc03e19fb1858ca2f.webp',
          catalougeRight: 'https://bonhoeffermachines.com/en/public/machines/specification_light_1718186352_495c82b0719f1d7ed41c.webp',
          isWorkshopManual: true,
          workshopManualUrl: 'https://bonhoeffermachines.com/en/public/workshop_pdf/workshop-water-pump.pdf',
          isUserManual: true,
          userManualUrl: 'https://bonhoeffermachines.com/en/public/pdfs_usermanual/BON-P-WP1.5-79.pdf',
          isBrochure: true,
          brochureUrl: 'https://bonhoeffermachines.com/en/public/pdfs_brochure/BON-P-WP1.5-79.pdf',
          isSpareParts: true,
          sparePartsUrl: 'https://bonhoeffermachines.com/en/public/pdfs/BON-P-WP1.5-79.pdf',
          warrantyTime: 36,
          isFMTTI: false,
          specifications: [
            { label: 'Pump Type', value: 'Self-priming' },
            { label: 'Maximum Power', value: '3 HP / 4000 rpm' },
            { label: 'Maximum Pumping Capacity', value: '13000 liters per hour' },
            { label: 'Starting System', value: 'Retractable' },
            { label: 'Suction Diameter', value: '1.5 inch' },
            { label: 'Discharge Diameter', value: '1.5 inch' },
            { label: 'Total Elevation', value: '15 meters' },
            { label: 'Suction Height', value: '5 meters' },
            { label: 'Fuel Tank Size', value: '1.2 liters' },
            { label: 'Recommended Oil', value: 'SAE10W-30' },
            { label: 'Compression Ratio', value: '8.0:1' },
            { label: 'Volute Material', value: 'Aluminum' },
            { label: 'Impeller Material', value: 'Aluminum' },
            { label: 'Mechanical Seal', value: 'Carbon/Ceramic' }
          ],
          features: [
            'OHV technology for enhanced engine efficiency',
            'High suction and discharge capacity of 13 tons per hour',
            'Vertical engine design for work in demanding conditions',
            'Steel grid muffler protector for user safety',
            'Ergonomically shaped L-handle for comfortable transport',
            'Robust vertical engine capable of operating up to 250 hours continuously',
            'Self-priming design',
            'Retractable starting system',
          ],
        },
        'BON-P-WP2.0-149': {
          name: 'Gasoline Water Pump',
          description: [
            {title: 'Powerful and Easy-to-Use', text: 'The BON-P-WP2.0-149 is a powerful and easy-to-use water pump perfect for moving large amounts of water quickly. With a strong 5-horsepower engine, it can pump up to 30,000 liters of water per hour. It starts easily with a pull-cord and has 2-inch-wide pipes for both suction and discharge.'},
            {title: 'Heavy-Duty Performance', text: 'This pump can lift water up to 25 meters high and draw it from up to 6 meters deep. It is fuel-efficient with a 1.2-liter tank and runs best with standard SAE10W-30 oil. This pump is great for heavy-duty tasks like draining pools, emptying flooded areas, or supplying irrigation systems.'}
          ],
          descriptionImage: 'https://bonhoeffermachines.com/en/public/machines/specification_dark_1721129007_aa71a890cbda98df88c2.webp',
          showcaseImages: [
            'https://bonhoeffermachines.com/en/public/machines/showcase-2-bon-p-wp2.0-149.webp',
            'https://bonhoeffermachines.com/en/public/machines/showcase-1-bon-p-wp2.0-149.webp',
            'https://bonhoeffermachines.com/en/public/machines/showcase-bon-p-wp2.0-149-4.webp'
          ],
          isBannerImage: false,
          bannerImage: [],
          isVideo: true,
          videoUrls: [
            'https://www.youtube.com/embed/troubleshooting-wp2'
          ],
          catalougeLeft: 'https://bonhoeffermachines.com/en/public/machines/specification_left_1718186339_850cc03e19fb1858ca2f.webp',
          catalougeRight: 'https://bonhoeffermachines.com/en/public/machines/specification_light_1718186352_495c82b0719f1d7ed41c.webp',
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
            { label: 'Pump Type', value: 'Self-priming' },
            { label: 'Maximum Power', value: '5 HP / 4000 rpm' },
            { label: 'Maximum Pumping Capacity', value: '30,000 liters per hour' },
            { label: 'Starting System', value: 'Retractable' },
            { label: 'Suction Diameter', value: '2 inches' },
            { label: 'Discharge Diameter', value: '2 inches' },
            { label: 'Total Elevation', value: '25 meters' },
            { label: 'Suction Height', value: '6 meters' },
            { label: 'Fuel Tank Size', value: '1.2 liters' },
            { label: 'Recommended Oil', value: 'SAE10W-30' },
            { label: 'Compression Ratio', value: '8.0:1' },
            { label: 'Volute Material', value: 'Aluminum' },
            { label: 'Impeller Material', value: 'Aluminum' },
            { label: 'Mechanical Seal', value: 'Carbon/Ceramic' }
          ],
          features: [
            'Cast iron cylinders, metal cams, forged crankshafts for durability',
            'High suction/discharge capacity - 30,000 liters of water per hour',
            'UV-resistant plastic components designed to withstand exposure',
            'Full protection frame offering effective safeguarding',
            'Vertical motor design for tough conditions up to 250 hours',
            'OHV technology for enhanced efficiency and durability',
            'Easy pull-cord starting system',
            'Large 2-inch diameter pipes for maximum flow',
          ],
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
          answer: 'Bonhoeffer water pumps are designed and certified to run on regular unleaded gasoline containing no more than 5% ethanol (E10). Always refer to the owner’s manual for your Bonhoeffer to get a list of recommended fuel and the current approved additives. For more information, see our Fuel Recommendations Link. Download or print a handout on how to avoid fuel-related problems for your Bonhoeffer general purpose water pump.'
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
      // Video banner (YouTube embed)
      const video = modelDetails.videoUrls[0];
      return (
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden mt-5">
          <div className="w-full max-w-3xl aspect-video relative z-10">
            <iframe
              src={video.url}
              title={video.title || 'Product Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-2xl border-none"
            />
          </div>
          {video.title && (
            <div className="mt-4 text-center text-white text-lg font-semibold">{video.title}</div>
          )}
          <motion.div 
            className="relative z-10 text-center text-white px-6 mt-6"
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center"
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
        {modelDetails.isSpareParts && (
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
          <p className="text-xs text-gray-300">{modelDetails.warrantyTime} Month Warranty</p>
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
            <p className="text-xs text-gray-300">FMTTI Certified</p>
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
          <p className="text-xs text-gray-300">ISO Company</p>
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
          <div className="flex gap-40 ">
            {/* Left - Product Name */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {modelDetails.name}
              </h2>
              {/* <p className="text-[#989b2e] text-lg font-medium">{modelDetails.power}</p> */}
            </motion.div>

            {/* Right - Download Buttons */}
            <DocumentButtons />
          </div>
        </div>
      </section>

      {/* Product Leaflet Image */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row gap-4 md:gap-8 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-8 items-center justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full aspect-[2492/3508] h-full ">
              <Image
                src={modelDetails.catalougeLeft}
                alt={`${modelDetails.name} Leaflet Left`}
                fill
                className="object-contain bg-white rounded-xl shadow-md"
                priority
              />
            </div>
            <div className="relative w-full aspect-[2492/3508] h-full ">
              <Image
                src={modelDetails.catalougeRight}
                alt={`${modelDetails.name} Leaflet Right`}
                fill
                className="object-contain bg-white rounded-xl shadow-md"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

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
            {/* Left - Labeled Product Image */}
            <motion.div
              className="relative h-96 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
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

            {/* Right - Product & Model Descriptions */}
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
                      <p className="text-gray-300 leading-relaxed">{desc.text}</p>
                    </div>
                  ))}
                </div>
              </div>
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
                href={`/product/${slug}/${otherModel.name.toLowerCase()}`}
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
