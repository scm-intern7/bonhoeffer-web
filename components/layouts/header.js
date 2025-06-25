"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import '../../app/globals.css';

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('es'); // Default to Spanish
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [productDropdownTimeout, setProductDropdownTimeout] = useState(null);
  const [isGalleryDropdownOpen, setIsGalleryDropdownOpen] = useState(false);
  const [galleryDropdownTimeout, setGalleryDropdownTimeout] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  // Add state for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Mobile search state
  const [mobileSearch, setMobileSearch] = useState('');

  const router = useRouter();

  // --- Product & Spare Part Data (for search) ---
  // These arrays are auto-generated from your product/[slug]/page.js and workspace context
  const allProducts = [
    { name: 'Gasoline Water Pump', slug: 'gasoline-water-pump', type: 'product', link: '/product/gasoline-water-pump' },
    { name: 'Diesel Water Pump', slug: 'diesel-water-pump', type: 'product', link: '/product/diesel-water-pump' },
    { name: 'Gasoline Engine', slug: 'gasoline-engine', type: 'product', link: '/product/gasoline-engine' },
    { name: 'Diesel Engine', slug: 'diesel-engine', type: 'product', link: '/product/diesel-engine' },
    { name: 'Brush Cutter', slug: 'brush-cutter', type: 'product', link: '/product/brush-cutter' },
    { name: 'Backpack Brush Cutter', slug: 'backpack-brush-cutter', type: 'product', link: '/product/backpack-brush-cutter' },
    { name: 'Chainsaw', slug: 'chainsaw', type: 'product', link: '/product/chainsaw' },
    { name: 'Multi Tool', slug: 'multi-tool', type: 'product', link: '/product/multi-tool' },
    { name: 'Gasoline Generator', slug: 'gasoline-generator', type: 'product', link: '/product/gasoline-generator' },
    { name: 'Gasoline Inverter', slug: 'gasoline-inverter', type: 'product', link: '/product/gasoline-inverter' },
    { name: 'Earth Auger', slug: 'earth-auger', type: 'product', link: '/product/earth-auger' },
    { name: 'Water Pump 2-Stroke', slug: 'water-pump-2-stroke', type: 'product', link: '/product/water-pump-2-stroke' },
    { name: 'Engine 2-Stroke', slug: 'engine-2-stroke', type: 'product', link: '/product/engine-2-stroke' },
    { name: 'Lawn Mower', slug: 'lawn-mover', type: 'product', link: '/product/lawn-mover' },
    { name: 'Blower', slug: 'blower', type: 'product', link: '/product/blower' },
    { name: 'Diesel Generator', slug: 'diesel-generator', type: 'product', link: '/product/diesel-generator' },
    { name: 'Electric Pressure Washer', slug: 'electric-pressure-washer', type: 'product', link: '/product/electric-pressure-washer' },
    { name: 'Electric Lawn Mower', slug: 'electric', type: 'product', link: '/product/electric' },
    { name: 'Solar Panel', slug: 'solar-panel', type: 'product', link: '/product/solar-panel' },
    { name: 'Submersible Pump', slug: 'submersible-pump', type: 'product', link: '/product/submersible-pump' },
    { name: 'Tiller', slug: 'tiller', type: 'product', link: '/product/tiller' },
    // Models (flattened, from product/[slug]/page.js)
    { name: 'BON-P-WP1.0-31', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP1.0-31' },
    { name: 'BON-P-WP1.5-79', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP1.5-79' },
    { name: 'BON-P-WP2.0-149', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP2.0-149' },
    { name: 'BON-P-WP2.0-196', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP2.0-196' },
    { name: 'BON-P-WP3.0-196', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP3.0-196' },
    { name: 'BON-P-WP4.0-272', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP4.0-272' },
    { name: 'BON-P-WP1.5-224HL', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP1.5-224HL' },
    { name: 'BON-P-WP6.0-420', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP6.0-420' },
    { name: 'BON-P-WP2.0-224HL', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP2.0-224HL' },
    { name: 'BON-P-WP2.0-420HL', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP2.0-420HL' },
    { name: 'BON-P-WP3.0-420HL', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP3.0-420HL' },
    { name: 'BON-P-WP2.0-196CH', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP2.0-196CH' },
    { name: 'BON-P-WP2.0-196TR', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP2.0-196TR' },
    { name: 'BON-P-WP3.0-196TR', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP3.0-196TR' },
    { name: 'BON-P-GE-3.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-3.0HP' },
    { name: 'BON-P-GE-3.5HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-3.5HP' },
    { name: 'BON-P-GE-4.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-4.0HP' },
    { name: 'BON-P-GE-5.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-5.0HP' },
    { name: 'BON-P-GE-7.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-7.0HP' },
    { name: 'BON-P-GE-9.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-9.0HP' },
    { name: 'BON-P-GE-13.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-13.0HP' },
    { name: 'BON-P-GE-14.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-14.0HP' },
    { name: 'BON-P-GE-16.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-16.0HP' },
    { name: 'BON-P-GE-24.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-24.0HP' },
    { name: 'BON-P-GE-34.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-34.0HP' },
    // ...add more models from your product/[slug]/page.js as needed
  ];
  const allSpareParts = [
    { name: 'Carburetor', slug: 'carburetor', type: 'spare-part', link: '/spare-parts/carburetor' },
    { name: 'Air Filter', slug: 'air-filter', type: 'spare-part', link: '/spare-parts/air-filter' },
    { name: 'Fuel Tank', slug: 'fuel-tank', type: 'spare-part', link: '/spare-parts/fuel-tank' },
    { name: 'Ignition Coil', slug: 'ignition-coil', type: 'spare-part', link: '/spare-parts/ignition-coil' },
    { name: 'Recoil Starter', slug: 'recoil-starter', type: 'spare-part', link: '/spare-parts/recoil-starter' },
    { name: 'Spark Plug', slug: 'spark-plug', type: 'spare-part', link: '/spare-parts/spark-plug' },
    { name: 'Blade', slug: 'blade', type: 'spare-part', link: '/spare-parts/blade' },
    { name: 'Oil Filter', slug: 'oil-filter', type: 'spare-part', link: '/spare-parts/oil-filter' },
    { name: 'Starter Rope', slug: 'starter-rope', type: 'spare-part', link: '/spare-parts/starter-rope' },
    { name: 'Gasket Set', slug: 'gasket-set', type: 'spare-part', link: '/spare-parts/gasket-set' },
    { name: 'Piston Kit', slug: 'piston-kit', type: 'spare-part', link: '/spare-parts/piston-kit' },
    { name: 'Cylinder', slug: 'cylinder', type: 'spare-part', link: '/spare-parts/cylinder' },
    { name: 'Crankshaft', slug: 'crankshaft', type: 'spare-part', link: '/spare-parts/crankshaft' },
    { name: 'Valve', slug: 'valve', type: 'spare-part', link: '/spare-parts/valve' },
    { name: 'Fuel Filter', slug: 'fuel-filter', type: 'spare-part', link: '/spare-parts/fuel-filter' },
    { name: 'Handle', slug: 'handle', type: 'spare-part', link: '/spare-parts/handle' },
    { name: 'Switch', slug: 'switch', type: 'spare-part', link: '/spare-parts/switch' },
    { name: 'Clutch', slug: 'clutch', type: 'spare-part', link: '/spare-parts/clutch' },
    { name: 'Muffler', slug: 'muffler', type: 'spare-part', link: '/spare-parts/muffler' },
    { name: 'Flywheel', slug: 'flywheel', type: 'spare-part', link: '/spare-parts/flywheel' },
    // ...add more as needed
  ];
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español'},
    { code: 'pt', name: 'Português'}
  ];

  const links = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/product", label: "Products", hasDropdown: true },
    { href: "/spare-parts", label: "Spare Parts" },
    { href: "/events", label: "Fair" },
    // { href: "/gallery", label: "Gallery", hasDropdown: true },
    // { href: "/blog", label: "Success Stories" },
    { href: "/contact-us", label: "Contact Us" }
  ]

  // Product categories for dropdown
  const productCategories = [
    { name: "Agro Industrial", slug: "agro-industrial", icon: "🚜" },
    { name: "Garden & Forestry", slug: "garden-forestry", icon: "🌲" },
    { name: "Diesel Machines", slug: "diesel-machines", icon: "⚙️" },
    { name: "Electric Machines", slug: "electric-machines", icon: "⚡" },
    { name: "Solar", slug: "solar", icon: "☀️" },
    { name: "Sprayers", slug: "sprayers", icon: "💧" },
    { name: "Domestic & Commercial", slug: "domestic-commercial", icon: "🏠" },
    { name: "Industrial", slug: "industrial", icon: "🏭" },
    { name: "Construction", slug: "construction", icon: "🏗️" },
    { name: "Tools", slug: "tools", icon: "🔧" },
    { name: "Wood Chipper", slug: "wood-chipper", icon: "🪵" },
    { name: "Special Segment", slug: "special-segment", icon: "⭐" }
  ];

  // Product dropdown timeout handlers
  const handleProductDropdownEnter = () => {
    if (productDropdownTimeout) {
      clearTimeout(productDropdownTimeout);
      setProductDropdownTimeout(null);
    }
    setIsProductsDropdownOpen(true);
  };

  const handleProductDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setIsProductsDropdownOpen(false);
    }, 300); // 0.3 second delay
    setProductDropdownTimeout(timeout);
  };

  // Gallery dropdown timeout handlers
  const handleGalleryDropdownEnter = () => {
    if (galleryDropdownTimeout) {
      clearTimeout(galleryDropdownTimeout);
      setGalleryDropdownTimeout(null);
    }
    setIsGalleryDropdownOpen(true);
  };

  const handleGalleryDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setIsGalleryDropdownOpen(false);
    }, 300); // 0.3 second delay
    setGalleryDropdownTimeout(timeout);
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (productDropdownTimeout) {
        clearTimeout(productDropdownTimeout);
      }
      if (galleryDropdownTimeout) {
        clearTimeout(galleryDropdownTimeout);
      }
    };
  }, [productDropdownTimeout, galleryDropdownTimeout]);

  function fuzzyMatch(str, query) {
    if (!str || !query) return false;
    return str.toLowerCase().includes(query.toLowerCase());
  }

  function handleSearchInputChange(e) {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim().length === 0) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    // Search both products and spare parts
    const results = [
      ...allProducts.filter(p => fuzzyMatch(p.name, value)),
      ...allSpareParts.filter(s => fuzzyMatch(s.name, value)),
    ];
    setSearchResults(results);
    setShowSearchResults(true);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchResults.length === 1) {
      router.push(searchResults[0].link);
      setIsSearchOpen(false);
      setShowSearchResults(false);
      setSearchQuery('');
    } else if (searchResults.length > 1) {
      setShowSearchResults(true);
    } else {
      // Optionally show 'no results found'
      setShowSearchResults(true);
    }
  }

  const detectLanguageByLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Fetch country info based on coordinates
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
              const countryCode = data.countryCode;
              let detectedLanguage = 'es'; // Default to Spanish
              
              if (countryCode === 'BR') {
                detectedLanguage = 'pt'; // Portuguese for Brazil
              } else if (countryCode === 'US' || countryCode === 'CA' || countryCode === 'GB' || 
                        countryCode === 'AU' || countryCode === 'NZ' || countryCode === 'IE' ||
                        countryCode === 'ZA' || countryCode === 'IN' || countryCode === 'SG' ||
                        countryCode === 'MY' || countryCode === 'PH' || countryCode === 'NG') {
                detectedLanguage = 'en'; // English for these countries
              }
              // All other countries in Americas default to Spanish
              // All other countries worldwide default to English, but we'll keep Spanish as default
              
              setCurrentLanguage(detectedLanguage);
            })
            .catch(() => {
              // If API fails, keep default Spanish
              setCurrentLanguage('es');
            });
        },
        () => {
          // If geolocation fails, keep default Spanish
          setCurrentLanguage('es');
        }
      );
    } else {
      // If geolocation not supported, keep default Spanish
      setCurrentLanguage('es');
    }
  };

  // Detect language on component mount
  React.useEffect(() => {
    detectLanguageByLocation();
  }, []);

  // Handle scroll events for header transformation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
    // Here you can implement language switching logic
    console.log('Language changed to:', languageCode);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus on search input when opening
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  };

  // Hamburger icon for mobile
  const Hamburger = ({ open, toggle }) => (
    <button
      className="flex flex-col justify-center items-center w-10 h-10 z-50 focus:outline-none lg:hidden"
      aria-label="Toggle menu"
      onClick={toggle}
      type="button"
    >
      <span className="sr-only">Open main menu</span>
      <motion.span
        animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
        className="block w-7 h-1 bg-white rounded mb-1 origin-center transition-all"
      />
      <motion.span
        animate={{ opacity: open ? 0 : 1 }}
        className="block w-7 h-1 bg-white rounded mb-1 origin-center transition-all"
      />
      <motion.span
        animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
        className="block w-7 h-1 bg-white rounded origin-center transition-all"
      />
    </button>
  );

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Desktop/Tablet Header (untouched, just add responsive tweaks) */}
      <section
        className={`transition-all duration-700 ease-out ${isScrolled ? 'opacity-0 pointer-events-none transform -translate-y-4' : 'opacity-100 transform translate-y-0'} hidden lg:block`}
      >
        <div className="flex flex-row justify-around items-center gap-10 text-white">
            <div className="image pt-5">
              <Link href="/">
                <img
                    src="/logo.png"
                    alt="Bonhoeffer Machines Logo"
                    className="h-20 pl-10 pr-10"
                />
              </Link>

                {/* <h1 className="text-2xl font-bold mt-5 py-1 pl-5 bg-[#989b2e] w-70 rounded-r-xl">Become Our Dealer</h1> */}
            </div>

            <nav className="relative">
                <ul className="flex justify-center space-x-6">
                    {links.map((item) => (
                        <li key={item.href + item.label} className="relative">
                            {item.hasDropdown ? (
                                <div
                                    className="relative"
                                    onMouseEnter={item.label === 'Products' ? handleProductDropdownEnter : handleGalleryDropdownEnter}
                                    onMouseLeave={item.label === 'Products' ? handleProductDropdownLeave : handleGalleryDropdownLeave}
                                >
                                    <Link
                                        href={item.href}
                                        className="text-xl font-semibold text-white hover:text-gray-400 cursor-pointer flex items-center space-x-1"
                                    >
                                        <span>{item.label}</span>
                                        <svg 
                                            className={`w-4 h-4 transition-transform duration-200 ${
                                                (item.label === 'Products' && isProductsDropdownOpen) || 
                                                (item.label === 'Gallery' && isGalleryDropdownOpen) ? 'rotate-180' : ''
                                            }`}
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </Link>
                                    
                                    {/* Products Dropdown */}
                                    {item.label === 'Products' && isProductsDropdownOpen && (
                                        <div className="absolute top-full left-0 mt-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-800 z-50 min-w-[400px] max-w-[600px]">
                                            <div className="p-6">
                                                <h3 className="font-bold text-gray-100 mb-4 text-lg">Product Categories</h3>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {productCategories.map((category) => (
                                                        <Link
                                                            key={category.slug}
                                                            href="/product"
                                                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#989b2e] hover:text-white transition-colors group"
                                                        >
                                                            {/* <span className="text-xl">{category.icon}</span> */}
                                                            <span className="text-sm font-medium">{category.name}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <Link
                                                        href="/product"
                                                        className="inline-flex items-center space-x-2 text-[#989b2e] hover:text-[#7a7d24] font-medium"
                                                    >
                                                        <span>View All Products</span>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Gallery Dropdown */}
                                    {item.label === 'Gallery' && isGalleryDropdownOpen && (
                                        <div className="absolute top-full left-0 mt-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-800 z-50 min-w-[200px]">
                                            <div className="p-4">
                                                <h3 className="font-bold text-gray-100 mb-3 text-lg">Gallery</h3>
                                                <div className="space-y-2">
                                                    <Link
                                                        href="/gallery/photos"
                                                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#989b2e] hover:text-white transition-colors group"
                                                    >
                                                        {/* <span className="text-xl">📸</span> */}
                                                        <span className="text-sm font-medium">Photos</span>
                                                    </Link>
                                                    <Link
                                                        href="/gallery/videos"
                                                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#989b2e] hover:text-white transition-colors group"
                                                    >
                                                        {/* <span className="text-xl">🎥</span> */}
                                                        <span className="text-sm font-medium">Videos</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-xl font-semibold text-white hover:text-gray-400 cursor-pointer"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            
            <div className='flex flex-row items-center gap-4'>
              <div className="">
                  <button 
                      onClick={toggleSearch}
                      className="text-white hover:text-gray-400 transition-colors duration-200 p-2 cursor-pointer"
                      aria-label="Open search"
                  >
                      <svg 
                          className="w-6 h-6" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                      >
                          <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                          />
                      </svg>
                  </button>
              </div>

              <div className="relative pr-0">
                  <button
                      onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                      className="flex items-center space-x-2 text-white hover:text-gray-400 transition-colors duration-200 p-2 cursor-pointer"
                      aria-label="Change language"
                  >
                      <span className="text-xl">
                          {languages.find(lang => lang.code === currentLanguage)?.flag}
                      </span>
                      <span className="text-xl font-medium">
                          {languages.find(lang => lang.code === currentLanguage)?.name}
                      </span>
                      <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                      >
                          <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M19 9l-7 7-7-7" 
                          />
                      </svg>
                  </button>

                  {isLanguageDropdownOpen && (
                      <div className="absolute top-full right-0 mt-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg border border-[#989b2e] py-2 z-50 min-w-[160px]">
                          {languages.map((language) => (
                              <button
                                  key={language.code}
                                  onClick={() => handleLanguageChange(language.code)}
                                  className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-[#989b2e] transition-colors cursor-pointer duration-150 ${
                                      currentLanguage === language.code ? 'bg-[#989b2e] text-white font-medium' : 'text-gray-100'
                                  }`}
                              >
                                  <span className="text-xl">{language.flag}</span>
                                  <span className="text-lg">{language.name}</span>
                                  {currentLanguage === language.code && (
                                      <svg className="w-4 h-4 ml-auto text-white" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                  )}
                              </button>
                          ))}
                      </div>
                  )}
              </div>
            </div>
        </div>
        
        {isSearchOpen && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-24 px-2">
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-[#989b2e] shadow-2xl rounded-2xl w-full max-w-2xl mx-auto relative">
                    <form onSubmit={handleSearchSubmit} className="p-0">
                        <div className="flex items-center space-x-4 px-6 py-6">
                            <div className="flex-1 relative">
                                <input
                                    id="search-input"
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    placeholder="Search for products, models, or spare parts..."
                                    className="w-full px-6 py-3 text-white text-lg bg-gray-900 border border-[#989b2e] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#989b2e] focus:border-transparent placeholder-gray-400"
                                    autoComplete="off"
                                />
                                <svg 
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#989b2e]" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                                    />
                                </svg>
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-[#989b2e] text-white rounded-xl hover:bg-[#7a7d24] transition-colors duration-200 font-semibold cursor-pointer shadow"
                            >
                                Search
                            </button>
                            <button
                                type="button"
                                onClick={toggleSearch}
                                className="p-3 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                                aria-label="Close search"
                            >
                                <svg 
                                    className="w-5 h-5" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M6 18L18 6M6 6l12 12" 
                                    />
                                </svg>
                            </button>
                        </div>
                        {showSearchResults && (
                          <div className="mt-2 pb-6 px-6 max-h-80 overflow-y-auto custom-scrollbar">
                            {/*
                              To use a styled scrollbar instead of hiding, replace 'scrollbar-hide' with 'custom-scrollbar' and define the class in your global CSS.
                              Example for gold/dark theme:
                              .custom-scrollbar::-webkit-scrollbar { width: 6px; background: #232323; }
                              .custom-scrollbar::-webkit-scrollbar-thumb { background: #989b2e; border-radius: 8px; }
                              .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #989b2e #232323; }
                            */}
                            {searchResults.length > 0 ? (
                              <ul className="divide-y divide-gray-800">
                                {searchResults.map((result, idx) => (
                                  <li key={result.link + idx}>
                                    <Link
                                      href={result.link}
                                      className="block px-3 py-4 hover:bg-[#989b2e] hover:text-white rounded-xl transition-colors text-white/90 text-lg font-medium"
                                      onClick={() => { setIsSearchOpen(false); setShowSearchResults(false); setSearchQuery(''); }}
                                    >
                                      <span className="font-semibold text-white">{result.name}</span>
                                      <span className="ml-2 text-xs text-[#989b2e]">({result.type.replace('-', ' ')})</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="text-gray-400 px-3 py-4 text-center">No results found.</div>
                            )}
                          </div>
                        )}
                    </form>
                </div>
            </div>
        )}
      </section>

      {/* Capsule Sticky Header (untouched, just add responsive tweaks) */}
      <div
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-700 ease-out ${isScrolled ? 'opacity-100 translate-y-4' : 'opacity-0 -translate-y-8 pointer-events-none'} hidden lg:block`}
      >
        <div className="bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-lg rounded-full shadow-2xl border border-gray-700/50 px-8 py-3">
          <nav className="relative">
            <ul className="flex items-center space-x-8">
              {links.map((item) => (
                <li key={`capsule-${item.href + item.label}`} className="relative">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={item.label === 'Products' ? handleProductDropdownEnter : handleGalleryDropdownEnter}
                      onMouseLeave={item.label === 'Products' ? handleProductDropdownLeave : handleGalleryDropdownLeave}
                    >
                      <Link
                        href={item.href}
                        className="text-lg font-medium text-white hover:text-[#989b2e] cursor-pointer flex items-center space-x-1 transition-colors duration-200 whitespace-nowrap"
                      >
                        <span>{item.label}</span>
                        <svg 
                          className={`w-3 h-3 transition-transform duration-200 ${
                            (item.label === 'Products' && isProductsDropdownOpen) || 
                            (item.label === 'Gallery' && isGalleryDropdownOpen) ? 'rotate-180' : ''
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Link>
                      
                      {/* Products Dropdown for Capsule */}
                      {item.label === 'Products' && isProductsDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-800 z-50 min-w-[400px] max-w-[600px]">
                          <div className="p-6">
                            <h3 className="font-bold text-gray-100 mb-4 text-lg">Product Categories</h3>
                            <div className="grid grid-cols-2 gap-3">
                              {productCategories.map((category) => (
                                <Link
                                  key={category.slug}
                                  href="/product"
                                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#989b2e] hover:text-white transition-colors group"
                                >
                                  <span className="text-base font-medium">{category.name}</span>
                                </Link>
                              ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <Link
                                href="/product"
                                className="inline-flex items-center space-x-2 text-[#989b2e] hover:text-[#7a7d24] font-medium"
                              >
                                <span>View All Products</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Gallery Dropdown for Capsule */}
                      {item.label === 'Gallery' && isGalleryDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-800 z-50 min-w-[200px]">
                          <div className="p-4">
                            <h3 className="font-bold text-gray-100 mb-3 text-lg">Gallery</h3>
                            <div className="space-y-2">
                              <Link
                                href="/gallery/photos"
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#989b2e] hover:text-white transition-colors group"
                              >
                                {/* <span className="text-xl">📸</span> */}
                                <span className="text-base font-medium">Photos</span>
                              </Link>
                              <Link
                                href="/gallery/videos"
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#989b2e] hover:text-white transition-colors group"
                              >
                                {/* <span className="text-xl">🎥</span> */}
                                <span className="text-base font-medium">Videos</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-lg font-medium text-white hover:text-[#989b2e] cursor-pointer transition-colors duration-200 whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              
              {/* Search button in capsule */}
              <li>
                <button 
                  onClick={toggleSearch}
                  className="text-white hover:text-[#989b2e] transition-colors duration-200 p-1 cursor-pointer"
                  aria-label="Open search"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </button>
              </li>
              
              {/* Language selector in capsule */}
              <li className="relative">
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-1 text-white hover:text-[#989b2e] transition-colors duration-200 p-1 cursor-pointer"
                  aria-label="Change language"
                >
                  <span className="text-lg font-medium">
                    {languages.find(lang => lang.code === currentLanguage)?.name}
                  </span>
                  <svg 
                    className={`w-3 h-3 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </button>

                {isLanguageDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg border border-[#989b2e] py-2 z-50 min-w-[160px]">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-[#989b2e] transition-colors cursor-pointer duration-150 ${
                          currentLanguage === language.code ? 'bg-[#989b2e] text-white font-medium' : 'text-gray-100'
                        }`}
                      >
                        {/* <span className="text-xl">{language.flag}</span> */}
                        <span className="text-lg">{language.name}</span>
                        {currentLanguage === language.code && (
                          <svg className="w-4 h-4 ml-auto text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile/Foldable/Tablet Header (separate, only on < lg screens) */}
      <div className={`lg:hidden fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 flex items-center justify-between px-4 py-3 transition-all duration-300${mobileMenuOpen ? ' opacity-0 pointer-events-none' : ' opacity-100'}`}>
        <Link href="/">
          <img src="/logo.png" alt="Bonhoeffer Machines Logo" className="h-15" />
        </Link>
        <Hamburger open={mobileMenuOpen} toggle={() => setMobileMenuOpen((v) => !v)} />
      </div>
      {/* Animated Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex justify-end lg:hidden"
          >
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.05 }}
              className="w-4/5 max-w-xs h-full overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl p-7 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <img src="/logo.png" alt="Bonhoeffer Machines Logo" className="h-20" />
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="text-gray-300 hover:text-white p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Mobile Search */}
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (mobileSearch.trim()) {
                    // Implement your search logic here
                    setMobileMenuOpen(false);
                    setIsSearchOpen(false);
                    setSearchQuery(mobileSearch);
                    // You can redirect or handle search as needed
                  }
                }}
                className="mb-6"
              >
                <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
                  <input
                    type="text"
                    value={mobileSearch}
                    onChange={e => setMobileSearch(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none border-none text-base"
                  />
                  <button type="submit" className="ml-2 text-[#989b2e] hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
              {/* Mobile Language Switcher */}
              <div className="mb-6">
                <div className="text-xs text-gray-400 mb-2">Language</div>
                <div className="flex gap-2">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setCurrentLanguage(lang.code); setIsLanguageDropdownOpen(false); setMobileMenuOpen(false); }}
                      className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors duration-150 ${currentLanguage === lang.code ? 'bg-[#989b2e] text-white border-[#989b2e]' : 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-[#989b2e] hover:text-white'}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* Mobile Nav Links */}
              <ul className="flex flex-col gap-5">
                {links.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      className="text-xl font-semibold text-white hover:text-[#989b2e] transition-colors duration-200 block py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            {/* Click outside to close */}
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </motion.nav>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #989b2e #23272a;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #989b2e 60%, #23272a 100%);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </>
  )
}

export default Header