"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('es'); // Default to Spanish
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [productDropdownTimeout, setProductDropdownTimeout] = useState(null);

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
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Success Stories" },
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
    }, 1000); // 2 second delay
    setProductDropdownTimeout(timeout);
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (productDropdownTimeout) {
        clearTimeout(productDropdownTimeout);
      }
    };
  }, [productDropdownTimeout]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement your search logic here
      console.log('Searching for:', searchQuery);
      // You can redirect to a search results page or filter content
      // window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

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

  return (
    <section>
        <div className="flex flex-row items-center gap-5 text-white">
            <div className="image pt-5">
                <img
                    src="https://9lhi1aprmhe38img.public.blob.vercel-storage.com/logo.png"
                    alt="Bonhoeffer Machines Logo"
                    className="h-24 pl-5 pr-5"
                />

                {/* <h1 className="text-2xl font-bold mt-5 py-1 pl-5 bg-[#989b2e] w-70 rounded-r-xl">Become Our Dealer</h1> */}
            </div>

            <nav className="relative">
                <ul className="flex justify-center space-x-6">
                    {links.map((item) => (
                        <li key={item.href + item.label} className="relative">
                            {item.hasDropdown ? (
                                <div
                                    className="relative"
                                    onMouseEnter={handleProductDropdownEnter}
                                    onMouseLeave={handleProductDropdownLeave}
                                >
                                    <Link
                                        href={item.href}
                                        className="text-lg font-semibold text-white hover:text-gray-400 cursor-pointer flex items-center space-x-1"
                                    >
                                        <span>{item.label}</span>
                                        <svg 
                                            className={`w-4 h-4 transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : ''}`}
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </Link>
                                    
                                    {/* Products Dropdown */}
                                    {isProductsDropdownOpen && (
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
                                </div>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-lg font-semibold text-white hover:text-gray-400 cursor-pointer"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            
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
                    <span className="text-sm font-medium">
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
                    <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 min-w-[160px]">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => handleLanguageChange(language.code)}
                                className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-150 ${
                                    currentLanguage === language.code ? 'bg-gray-50 text-[#989b2e] font-medium' : 'text-gray-700'
                                }`}
                            >
                                <span className="text-xl">{language.flag}</span>
                                <span className="text-sm">{language.name}</span>
                                {currentLanguage === language.code && (
                                    <svg className="w-4 h-4 ml-auto text-[#989b2e]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
        
        {isSearchOpen && (
            <div className="fixed inset-0 bg-black z-50 flex items-start justify-center pt-20">
                <div className="bg-white backdrop-blur-sm rounded-lg shadow-xl w-full max-w-5xl mx-4">
                    <form onSubmit={handleSearchSubmit} className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 relative">
                                <input
                                    id="search-input"
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search anything..."
                                    className="w-full px-4 py-3 text-black text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#989b2e] focus:border-transparent"
                                />
                                <svg 
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
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
                                className="px-6 py-3 bg-[#989b2e] text-white rounded-lg hover:bg-[#7a7d24] transition-colors duration-200 font-semibold cursor-pointer"
                            >
                                Search
                            </button>
                            <button
                                type="button"
                                onClick={toggleSearch}
                                className="p-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
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
                        
                        {searchQuery && (
                            <div className="mt-4 text-sm text-gray-600">
                                Press Enter to search for &ldquo;{searchQuery}&rdquo;
                            </div>
                        )}
                    </form>
                </div>
            </div>
        )}
    </section>
  )
}

export default Header