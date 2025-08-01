'use client'
import BgLayout from '@/components/templates/bgLayout'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import productsData from './products.json'
import paraData from './para.json'

function ProductSpecificPage() {
  const params = useParams();
  const slug = params.slug;

  const getParaDetails = (productSlug) => {
    return paraData[productSlug] || [];
  };

  // Get product models based on slug
  const getProductModels = (productSlug) => {
    // Check if the product exists in the JSON data
    if (productsData[productSlug] && productsData[productSlug].length > 0) {
      return productsData[productSlug];
    }
    
    // Default models for products not specifically defined
    const defaultModels = [
      { id: 1, name: `${getProductName(productSlug)}-100`, image: getProductImage(productSlug), feature: '5.5 HP - 163CC', link: `/product/${productSlug}/${getProductName(productSlug)}-100` },
      { id: 2, name: `${getProductName(productSlug)}-200`, image: getProductImage(productSlug), feature: '6.5 HP - 196CC', link: `/product/${productSlug}/${getProductName(productSlug)}-200` },
      { id: 3, name: `${getProductName(productSlug)}-300`, image: getProductImage(productSlug), feature: '7.0 HP - 210CC', link: `/product/${productSlug}/${getProductName(productSlug)}-300` },
      { id: 4, name: `${getProductName(productSlug)}-400`, image: getProductImage(productSlug), feature: '8.0 HP - 250CC', link: `/product/${productSlug}/${getProductName(productSlug)}-400` }
    ];

    return defaultModels;
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
      'blower': 'Blower',
      'multi-tool': 'Multi Tool',
      'diesel-generator': 'Diesel Generator',
      'electric': 'Electric Lawn Mower',
      'electric-pressure-washer': 'Electric Pressure Washer',
      'electric-motor': 'Electric Motors',
      'direct-driven-air-compressor': 'Air Compressor',
      'solar-panel': 'Solar Panel',
      'solar-water-pump': 'Solar Water Pump',
      'gasoline-sprayer': 'Gasoline Sprayer',
      'manual-sprayer': 'Manual Sprayer',
      'backpack-atomizer': 'Backpack Atomizer',
      'mistduster': 'Mistduster',
      'gasoline-generator': 'Gasoline Generator',
      'gasoline-inverter': 'Gasoline Inverter',
      'pressure-washer': 'Pressure Washer',
      'pressure-washer-home-use': 'Domestic Pressure Washer',
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
      'ac-professional': 'AC Professional',
      'vacuum-cleaner': 'Vacuum Cleaner',
      'knapsack-sprayer': 'Knapsack Sprayer',
      'electric-motor': 'Electric Motor',
      'centrifugal-pump': 'Centrifugal Pump',
      'welding-machines': 'Welding Machines',
      'tamping-rammer': 'Tamping Rammer',
      'plate-compactor': 'Plate Compactor',
      'concrete-cutter': 'Concrete Cutter',
      'concrete-vibrator': 'Concrete Vibrator',
      'concrete-power-trowel': 'Concrete Power Trowel',
      'manual-sprayer': 'Manual Sprayer',
      'mistduster': 'Mistduster',
      'thermal-fogger': 'Thermal Fogger',
      'gasoline-pressure-washer': 'Gasoline Pressure Washer',
      'pressure-washer-home-use': 'Pressure Washer - Home',
      'vacuum-cleaner': 'Vacuum Cleaner',
      'solar-panel': 'Solar Panel',
      'submersible-pump': 'Submersible Pump',
      'gasoline-tiller': 'Tiller',
      'knapsack-sprayer': 'Knapsack Sprayer',
      'electric-motor': 'Electric Motor',
      'centrifugal-pump': 'Centrifugal Pump',
      'welding-machines': 'Welding Machines',
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
      'multi-tool': 'https://bonhoeffermachines.com/en/public/product_banner/multi-tool-banner.webp',
      'chainsaw': 'https://bonhoeffermachines.com/en/public/product_banner/chainsaw-banner.webp',
      'hedge-trimmer': 'https://bonhoeffermachines.com/en/public/product_banner/hedge-trimmer-banner.webp',
      'leaf-blower': 'https://bonhoeffermachines.com/en/public/product_banner/blower-banner.webp',
      'lawn-mower': 'https://bonhoeffermachines.com/en/public/product_banner/lawn-mower-banner.webp',
      'earth-auger': 'https://bonhoeffermachines.com/en/public/product_banner/earth-auger-banner.webp',
      'diesel-water-pump': 'https://bonhoeffermachines.com/en/public/product_banner/diesel-water-pump-banner.webp',
      'diesel-generator': 'https://bonhoeffermachines.com/en/public/product_banner/diesel-generator-banner.webp',
      'diesel-engine': 'https://bonhoeffermachines.com/en/public/product_banner/diesel-engine-banner.webp',
      'gasoline-pressure-washer': 'https://bonhoeffermachines.com/en/public/product_banner/gasoline-pressure-washer-banner.webp',
      'pressure-washer-home-use': 'https://bonhoeffermachines.com/en/public/product_banner/pressure-washer-home-use-banner.webp',
      'direct-driven-air-compressor': 'https://bonhoeffermachines.com/en/public/product_banner/direct-driven-air-compressure-banner.webp',
      'commercial-vacuum': 'https://bonhoeffermachines.com/en/public/product_banner/vaCCum-cleaner-banner.webp',
      'manual-sprayer': 'https://bonhoeffermachines.com/en/public/product_banner/manual-sprayers-banner.webp',
      'electric-pressure-washer': 'https://bonhoeffermachines.com/en/public/product_banner/28-electric-pressure-washer.webp',
      'mistduster': 'https://bonhoeffermachines.com/en/public/product_banner/mist-duster-banner.webp',
      'centrifugal-pump': 'https://bonhoeffermachines.com/en/public/product_banner/centrifugal-pump-banner.webp',
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
      'engine-2-stroke': 'https://bonhoeffermachines.com/en/public/product_banner/2-stroke-engine-banner.webp',
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
      'gasoline-tiller': 'https://bonhoeffermachines.com/en/public/product_banner/gasoline-tiller-banner.webp',
      'knapsack-sprayer': 'https://bonhoeffermachines.com/en/public/product_banner/knapsack-sprayer-banner.webp',
      'electric-motor': 'https://bonhoeffermachines.com/en/public/product_banner/44-electric-motors-banner.webp',
      'centrifugal-pump': 'https://bonhoeffermachines.com/en/public/product_banner/centrifugal-pump-banner.webp',
      'welding-machines': 'https://bonhoeffermachines.com/en/public/product_banner/welding-machine-banner.webp',
      'tamping-rammer': 'https://bonhoeffermachines.com/en/public/product_banner/tamping-rammer-banner.webp',
      'plate-compactor': 'https://bonhoeffermachines.com/en/public/product_banner/plate-compactor-banner.webp',
      'concrete-cutter': 'https://bonhoeffermachines.com/en/public/product_banner/concrete-cutter-banner.webp',
      'concrete-vibrator': 'https://bonhoeffermachines.com/en/public/product_banner/concrete-vibrator-banner.webp',
      'concrete-power-trowel': 'https://bonhoeffermachines.com/en/public/product_banner/power-trovel-banner.webp',
      'vacuum-cleaner': 'https://bonhoeffermachines.com/en/public/product_banner/vaccum-cleaner-banner.webp',
      'thermal-fogger': 'https://bonhoeffermachines.com/en/public/product_banner/thermal-fogger-banner.webp',
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
      'chainsaw': 'Chainsaws are used to cut the big logs and the hardwood. Bonhoeffer chain saws are equipped with a powerful engine which can deliver an output of 13000+ RPM while sustaining a longer running time to give maximum fuel efficiency. Designed for maximum stability, low vibration and professional quality guide bar and saw chain which helps in achieving greater speed, efficiency, and precision.',
      'earth-auger': 'Earth augers are powerful tools designed for drilling holes in the ground quickly and efficiently. Ideal for planting trees, installing fence posts, and other agricultural or construction applications. Bonhoeffer earth augers feature robust 2-stroke engines, ergonomic handles, and durable auger bits for reliable performance in tough soil conditions.',
      'water-pump-2-stroke': 'To withstand the challenge of shifting water from place to place in irrigation, Bonhoeffer\'s 2-stroke engine water pump is perfectly capable to draw water from 6m beneath surface. It has a 1-liter fuel tank capacity and discharges water at 10000m/hour.',
      'engine-2-stroke': 'Bonhoeffer\'s 2-stroke engines are compact, lightweight, and powerful, ideal for handheld equipment and portable machinery. Designed for high performance and reliability, these engines feature easy start, efficient fuel consumption, and robust construction for demanding applications.',
      'lawn-mower': 'Powered to maneuver over grass and turf for desirable and affordable trimming and clearing, the Bonhoeffer 4-in-1 Stringing Mower comes with a 6.5 HP motor and a 22-inch cutting width. Steel covers make it stronger and more durable. Self-propelled driving makes it convenient to move. Equipped with a 65L bag to facilitate waste collection.',
      'backpack-brush-cutter': 'Backpack Brush cutters make the machine much more convenient to carry around. Bonhoeffer\'s Brush cutter comes with 30% more powerful engine compared with traditional engines , 200 Hour tested Professional Gear Box , 20 CRMO material Crankshaft, high quality harness and durable steel frame for engine fitment.',
      'blower': 'Blowers are mainly used in homes and industries to blow away dust from every nook and corner. The blower has the features of a vacuum, blower, and mulching and is the perfect solution for cleaning the off-season leaves from your garden and gathering the dust particles. The 2-stroke engine with a single cylinder Bonhoeffer blower runs like a compact machine and has a double-layer air filter for a cleaner engine. ACCessibility of adjustable handle inside the 90-degree range, makes it comfortable and reduces fatigue. The Blower even works for heavy workloads because of an Air Volume of 1450 M3/H and an ideal air velocity of 78 M/S.',
      'diesel-engine': 'Diesel engines are widely used in multiple applications and machines such as Water pumps, tillers, generators, etc. Bonhoeffer diesel Engines provided a higher compression ratio, uniform distribution in the fuel, low maintenance, and high performance. compared with ordinary engine Bonhoeffer Diesel Engine equipped with HCCI technology.',
      'diesel-generator': 'Diesel generators are used to generate electric energy by using diesel engines and alternators. Bonhoeffer\'s single-phase diesel generators are equipped with professional quality 4 stroke air cooled diesel engines, compact structure, Low noise, digital control system, and advanced technology which helps in fuel efficiency.',
      'diesel-water-pump': 'Diesel water pumps are ideal for industrial applications or agricultural applications. Bonhoeffer\'s diesel water pumps come with a professional 4-stroke air-cooled diesel engine, an aluminum casing pump for normal lift, and a cast-iron pump for high lift. High fuel efficiency, lightweight, compact structure, and convenient operation are key features of our diesel water pump.',
      'earth-auger': 'Earth Augers are the best solution to drill the hard ground surface for planting a tree or erecting poles for the fence. Bonhoeffer\'s earth auger comes with easy to maintain Air filter, low vibration performance due to precise coupling between PTO and bits, third a generation gearbox with a structure of 2 cavities for greater durability. We have the option of a single-operator handle and a multi-operator handle for the ultimate comfort.',
      'electric-pressure-washer': 'Electric Pressure washers are used in various industries, residential complexes, and workshops to remove loose paint, dust, mud, and dirt from surfaces. Bonhoeffer\'s electric pressure washer is fitted with a performance-proven three-phase motor, heavy-duty grade direct drive brass manifold triplex pump, solid heat treatment stainless steel plunger with ceramic coating, and aCCessories such as quick plug type nozzle tips, 10" pneumatic tires, steel braided high-pressure hose, professional trigger gun with stainless steel lance.',
      'electric': 'Electric lawn mowers are eco-friendly and efficient, ideal for residential and commercial use. Bonhoeffer\'s electric lawn mowers feature high-performance motors, ergonomic designs, and durable construction for reliable operation.',
      'solar-panel': 'Solar panels collect energy from the sun in the form of sunlight and convert it into electricity that can be used to power homes and businesses. Bonhoeffer\'s high-efficiency solar panels come in monocrystalline and polycrystalline types with a power range from 150W to 460W.',
      'submersible-pump': 'Submersible pumps are used to pump out large amounts of water from underground and in borewell areas with high pressure. Bonhoeffer submersible pumps are fitted with brass inlet and outlet to avoid oxidation. POM Impellers for high efficiency, 100% copper winding motor for resistance to high temperatures, and better working efficiency.',
      'gasoline-tiller': 'A very robust and powerful weeder for customers who value long-lasting durability and high efficiency. Reliable and easy-starting diesel-power Bonhoeffer engine with oil bath air filter for longest service life. An absolute requirement for engines used in dry and dusty environments. Power weeder has a fully sealed transmission for usage in wet cultures and operates with a direct clutch; two speeds forward and one reverse. The handlebar is adjustable, both horizontally and vertically, for comfortable use. Removable transport wheels are standard and allow the use of many aCCessories, such as ploughs and ditching blades. The AUX PTO makes the machine extremely versatile as it gives you the option to connect several useful aCCessories to be powered by this multi-purpose machine.',
      'knapsack-sprayer': 'Knapsack Sprayer enables the farmer to apply chemicals with relative ease. Bonhoeffer\'s knapsack sprayer comes with 2 stroke and 4 stroke engines coupled with high quality greaseless pump for easy maintenance. It has 25 litres tank capacity for longer work duration and durable spraying aCCessories.',
      'electric-motor': 'Electric motors are devices that convert electrical energy into mechanical energy. Bonhoeffer electric motors are known for their high efficiency, durability, and reliable performance in various industrial applications.',
      'centrifugal-pump': 'Centrifugal pumps are used across a vast array of Domestic, Agriculture, and Industrial purposes. Supplying water used in residential places to do normal pumping work in various industries these are compact and handy pumps. Bonhoeffer\'s Centrifugal Pump is an electric pump with a durable and fast cooling feature. The brass impeller mounted in the machine makes it more effective and productive. The device comes with 100% copper winding and works effectively for long time usage.',
      'welding-machines': 'Welding machines are among the most essential tools for a welding professional. Welding machines generate heat that melts metal parts so that these parts can be joined. Bonhoeffer\'s welding machines are the supreme equipment due to digital display and IGBT inverter technology. The double function of MMA/Lift TIG Welding makes this machine portable and durable for users. Another highlight of our welding machines is that they come with an automatic temperature protector that allows the machine to cool down.',
      'tamping-rammer': 'Tamping rammer is a machine used for compacting different types of soil under various construction sites. Bonhoeffer\'s Tamping Rammer has a powerful engine specially build for working at construction sites. It has a robust housing crankcase aluminium alloy for more extended durability. Fitted with long-lasting bellows with ribbed polyurethane for maximum durability and forged steel alloy plate for greater intensity and better shock absorption.',
      'plate-compactor': 'A plate compactor is a piece of construction equipment used to smooth and level the earth. It consists of a heavy iron plate mounted to the base of a machine and uses either a vibrating or pounding action to flatten the land. Bonhoeffer Plate compactors are fitted with professional quality 6.5 HP gasoline engine that helps in getting greater centrifugal force, heavy duty iron plate, folding handle, and protective frame make the machine more efficient.',
      'concrete-cutter': 'Concrete saws are power tools used to cut concrete, tiles, asphalt, and other solid materials. Bonhoeffer\'s concrete cutter is powered by 13 HP Gasoline engine, heavy duty frame and undercarriage to eliminate frame vibration and bending, wheels have ball bearings and waterproof seals for reduced maintenance, screw-type depth control w/lock guarantees aCCurate cutting.',
      'concrete-vibrator': 'Concrete Vibrator machines are used in the process of eradicating air bubbles by forcefully shaking the freshly poured concrete. Bonhoeffer\'s concrete vibrator comes with 6.5 HP gasoline engine. Vibrating poker diameter ranges from 28 mm to 70 mm and length varies from 4 M to 8 M.',
      'concrete-power-trowel': 'A concrete power trowel also known as a power float is a tool used during construction to apply a smooth finish to concrete slabs. Bonhoeffer concrete power trowel comes in 6.5 Hp with a rotor diameter of 91 cm, finish blades of 35*15 cm, and Millstone diameter of 97 cm. Bonhoeffer power trowel is lighter compared to the ride-on model and they are the best when observing the surface.',
      'pressure-washer-home-use': 'Pressure washers are mainly used to clean greasy and dirty surfaces such as home, offices, vehicles, etc. Bonhoeffer offers the best pressure washers in the industry with a powerful copper-wound brushless motor that provides maximum pressure for efficient cleaning. It also comes with auto cut-off feature when the trigger is released for energy saving.',
      'mist-duster': 'Mist Duster\'s are suitable for spraying pesticides and fungicides. They are mainly used for spraying pesticides in rice, fruits and vegetable crops. Bonhoeffer\'s Mist Duster is equipped with a booster pump through which it helps to cover an extensive and wide range. Our Mist dusters are fitted with powerful and durable engines that guarantees top performance and high productivity. Mist dusters are available in different tank sizes',
      'thermal-fogger': 'Thermal fogging is used to process disinfectant solution within the air for a period in order to disinfect the surfaces of dust particles, it plays a major role in disease prevention and control. Bonhoeffer Thermal Fogger machine is both electric starting and manual starting, SS Body to prevent corrosion and electrical flow, Light in weight and balanced. Also available in butane gas variant.',
      'gasoline-pressure-washer': 'Gasoline Pressure washers are used in various industries, residential complexes, and workshops to remove loose paint, dust, mud, and dirt from surfaces. Bonhoeffer\'s Gasoline pressure washer is fitted with professional quality gasoline engines, a Heavy-duty grade direct drive brass manifold triplex pump, solid heat treatment stainless steel plunger with ceramic coating, and aCCessories such as quick plug type nozzle tips, 10" pneumatic tires, steel braided high-pressure hose, professional trigger gun with stainless steel lance.',
      'manual-sprayer': 'Manual sprayers are used for spraying pesticides, fungicides, and herbicides in agriculture. Bonhoeffer\'s manual sprayers are designed for ease of use, featuring a durable tank, ergonomic handle, and efficient nozzle for precise application. They are ideal for small-scale farming and gardening.',
      'gasoline-pressure-washer': 'Gasoline Pressure washers are used in various industries, residential complexes, and workshops to remove loose paint, dust, mud, and dirt from surfaces. Bonhoeffer\'s Gasoline pressure washer is fitted with professional quality gasoline engines, a Heavy-duty grade direct drive brass manifold triplex pump, solid heat treatment stainless steel plunger with ceramic coating, and aCCessories such as quick plug type nozzle tips, 10" pneumatic tires, steel braided high-pressure hose, professional trigger gun with stainless steel lance',
      'direct-driven-air-compressor': 'The air compressor is a device with wide application in almost all types of industries and domestic needs. Powered by a copper electric motor, Bonhoeffer\'s range of direct drive air compressors come with durable and powerful wheels for easy maneuvering. The tank capacity of 25 liters and 50 liters offers options to choose from as per requirements. The flow ranges between 233 liters per minute.',
      'vacuum-cleaner': 'Vacuum cleaners are not only effective at cleaning dust and getting rid of allergens, they are also easy to use and they also save time and energy. Bonhoeffer\'s Vacuum cleaners are equipped with highly efficient Particulate Air Filter (HEPA) and are powerful enough to pull in wet and dry waste. The best thing about Bonhoeffer\'s Vacuum cleaner is that it comes with stainless steel tanks of 30 Litres and 50 Litres along with a 1400 W copper winding Motor.',
      'multi-tool': 'Be it cutting and trimming long-height trees or far-reached shrubs, multitool eases your effort. The multi-tool has a long shaft connected with the engine and the detachable aCCessories are used for a different purpose. Bonhoeffer’s Multi-Tool comes with a digital intelligent engine that is 30% more powerful than standard engines, Professional Gear Box, Nikasil Coated cylinder, and 20 CRMO material Crankshaft. ACCessories include Trimmer Head /Bladed / Pruner / Hedge Trimmer which is ideal for multipurpose.',
      'hedge-trimmer': 'A hedge trimmer is a must-have tool to beautify your garden or to shape the fences of a plantation. Bonhoeffer\'s hedge trimmer gears up with a powerful 2-stroke engine , double blade action with 600 mm cutting length and has a maximum speed of 4200 rpm that is a perfect solution for overgrown hedges.',
    };
    
    return descriptions[slug] || `Professional ${getProductName(slug).toLowerCase()} designed for heavy-duty applications. Built with premium materials and advanced engineering for reliable performance in demanding conditions.`;
  };

  const productName = getProductName(slug);
  const productImage = getProductImage(slug);
  const productDescription = getProductDescription(slug);
  const models = getProductModels(slug);

  return (
    <BgLayout>
      {/* Mobile header spacer for fixed header on mobile/tablet */}
      <div className="block lg:hidden" style={{ height: '4em' }} aria-hidden="true" />

      {/* Hero Section */}
      <section className="relative h-[22vh] xs:h-[26vh] sm:h-[32vh] md:h-[38vh] lg:h-[44vh] min-h-[160px] sm:min-h-[200px] md:min-h-[260px] lg:min-h-[320px] flex items-center overflow-hidden mt-4 md:mt-5">
        <div className="absolute inset-0">
          <Image
            src={productImage}
            alt="Product Banner"
            fill
            className="object-cover object-left md:object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <motion.div
          className="relative z-10 text-white px-3 xs:px-4 sm:px-6 flex items-center h-full justify-start w-full"
          style={{ left: 0 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-left w-full max-w-[90%] xs:max-w-[80%] md:max-w-[40%] pl-1 xs:pl-2 sm:pl-4 md:pl-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ maxWidth: '25%' }}
          >
            <span className="text-[#989b2e]">{productName}</span>
          </motion.h1>
        </motion.div>
      </section>

      {/* Product Description */}
      <section className="pt-10 xs:pt-12 md:pt-16 px-3 xs:px-4 sm:px-6">
        <div className="max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-8">
              Professional Grade <span className="text-[#989b2e]">{productName}</span>
            </h2>
            <p className="text-base xs:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl sm:max-w-4xl md:max-w-6xl mx-auto">
              {productDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Models Grid Section */}
      <section className="pt-10 xs:pt-14 md:pt-20 px-3 xs:px-4 sm:px-6">
        <div className="max-w-2xl sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
          >
            {models.map((model, index) => (
              <motion.div
                key={model.id || model.name}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 xs:p-5 md:p-6 hover:bg-white/10 transition-all duration-300 flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(152, 155, 46, 0.1)' }}
              >
                <div className="relative w-full  mb-4 xs:mb-6 rounded-xl overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src={model.image}
                    alt={model.name}
                    // fill
                    className="object-contain p-2 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white mb-2 xs:mb-3 group-hover:text-[#989b2e] transition-colors text-center">
                  {model.name}
                </h3>
                <div className="space-y-1 xs:space-y-2 mb-2 xs:mb-4 text-center">
                  <p className="text-gray-300 text-xs xs:text-sm">
                    {model.feature}
                  </p>
                </div>
                <Link
                  href={model.link || `/product/${slug}/${model.name.toLowerCase()}`}
                  className="inline-flex  items-center justify-center w-full bg-[#989b2e] hover:bg-[#8a8c20] text-white px-4 xs:px-6 py-2 xs:py-3 rounded-full font-medium transition-all duration-300 group-hover:scale-105 cursor-pointer text-sm xs:text-base mt-auto"
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

      {/* Paragraph Section for SEO */}
      <section className="pt-10 xs:pt-14 md:pt-20 px-3 xs:px-4 sm:px-6">
        <div className="max-w-2xl sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto">
          {/* <h2 className="text-lg xs:text-xl md:text-2xl font-bold text-white mb-4">Why Choose Bonhoeffer's Petrol Water Pumps?</h2> */}
          {getParaDetails(slug).map((paragraph, index) => (
          <p key={index} className="text-base xs:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl sm:max-w-4xl md:max-w-6xl mx-auto py-2">
                {paragraph}
                {index < getParaDetails(slug).length - 1 && <br />}
            </p>
          ))}
        </div>
      </section>

      {/* Back Navigation */}
      <section className="pt-6 xs:pt-8 md:pt-10 px-3 xs:px-4 sm:px-6 text-center">
        <Link
          href="/product"
          className="inline-flex items-center text-[#989b2e] hover:text-white transition-colors text-base xs:text-lg font-medium gap-1 xs:gap-2"
        >
          <svg className="w-5 h-5 mr-1 xs:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Products
        </Link>
      </section>
    </BgLayout>
  )
}

export default ProductSpecificPage
