'use client'
import BgLayout from '@/components/templates/bgLayout'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

function ProductPage() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Handle mouse leave with delay
  const handleCategoryLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredCategory(null);
    }, 300); // 1 second delay
    setHoverTimeout(timeout);
  };

  // Handle mouse enter to cancel timeout
  const handleCategoryEnter = (categoryId) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHoveredCategory(categoryId);
  };

  // Handle products dialog mouse events
  const handleProductsEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleProductsLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredCategory(null);
    }, 300); // 1 second delay
    setHoverTimeout(timeout);
  };

  // Fetch product categories from Notion API
  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/product-categories');
        const data = await response.json();
        
        if (data.success) {
          setProductCategories(data.data);
        } else {
          console.error('Failed to fetch product categories:', data.error);
        }
      } catch (error) {
        console.error('Error fetching product categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductCategories();
  }, []);

  const [responsive, setResponsive] = React.useState({ productsPerView: 3, cardWidth: 340, cardHeight: 510, imageHeight: 440, imageWidth: 280 });

  // Infinite Slider Logic
  const [sliderPositions, setSliderPositions] = React.useState(
    productCategories.map(() => 0)
  );
  const [isTransitioning, setIsTransitioning] = React.useState(
    productCategories.map(() => true)
  );
  const autoSlideInterval = React.useRef([]);
  const sliderRefs = React.useRef([]);

  // Create extended product lists for infinite scrolling
  const getExtendedProducts = (products, productsPerView) => {
    if (products.length <= productsPerView) return products;
    
    // Clone products for seamless infinite scroll
    // Add enough clones at the beginning and end
    const cloneCount = Math.max(productsPerView, 3);
    const startClones = products.slice(-cloneCount);
    const endClones = products.slice(0, cloneCount);
    
    return [...startClones, ...products, ...endClones];
  };

  // Infinite scroll navigation functions
  const handleNext = React.useCallback((catIdx) => {
    setSliderPositions(prev => {
      const category = productCategories[catIdx];
      if (!category || !category.products || category.products.length <= responsive.productsPerView) return prev;

      const updated = [...prev];
      const newPosition = prev[catIdx] - (responsive.cardWidth + 16);
      updated[catIdx] = newPosition;
      
      // Check if we need to reset position for infinite scroll
      const cloneCount = Math.max(responsive.productsPerView, 3);
      const totalOriginalWidth = category.products.length * (responsive.cardWidth + 16);
      const currentPos = Math.abs(newPosition);
      
      if (currentPos >= totalOriginalWidth + (cloneCount * (responsive.cardWidth + 16))) {
        // Reset to beginning seamlessly after a brief delay
        setTimeout(() => {
          setIsTransitioning(current => {
            const updatedTransition = [...current];
            updatedTransition[catIdx] = false;
            return updatedTransition;
          });
          
          setSliderPositions(current => {
            const updatedPos = [...current];
            updatedPos[catIdx] = -(cloneCount * (responsive.cardWidth + 16));
            return updatedPos;
          });

          // Re-enable transition after position reset
          setTimeout(() => {
            setIsTransitioning(current => {
              const updatedTransition = [...current];
              updatedTransition[catIdx] = true;
              return updatedTransition;
            });
          }, 50);
        }, 500);
      }
      
      return updated;
    });
  }, [responsive.productsPerView, responsive.cardWidth]);

  const handlePrev = React.useCallback((catIdx) => {
    setSliderPositions(prev => {
      const category = productCategories[catIdx];
      if (!category || !category.products || category.products.length <= responsive.productsPerView) return prev;

      const updated = [...prev];
      const newPosition = prev[catIdx] + (responsive.cardWidth + 16);
      updated[catIdx] = newPosition;
      
      // Check if we need to reset position for infinite scroll
      const cloneCount = Math.max(responsive.productsPerView, 3);
      const resetPosition = -(cloneCount * (responsive.cardWidth + 16));
      
      if (newPosition > resetPosition) {
        // Reset to end seamlessly after a brief delay
        setTimeout(() => {
          setIsTransitioning(current => {
            const updatedTransition = [...current];
            updatedTransition[catIdx] = false;
            return updatedTransition;
          });
          
          const totalOriginalWidth = category.products.length * (responsive.cardWidth + 16);
          setSliderPositions(current => {
            const updatedPos = [...current];
            updatedPos[catIdx] = -(totalOriginalWidth);
            return updatedPos;
          });

          // Re-enable transition after position reset
          setTimeout(() => {
            setIsTransitioning(current => {
              const updatedTransition = [...current];
              updatedTransition[catIdx] = true;
              return updatedTransition;
            });
          }, 50);
        }, 500);
      }
      
      return updated;
    });
  }, [responsive.productsPerView, responsive.cardWidth]);

  React.useEffect(() => {
    // Clear all intervals on unmount
    return () => {
      autoSlideInterval.current.forEach(clearInterval);
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  React.useEffect(() => {
    // Clear existing intervals
    autoSlideInterval.current.forEach(clearInterval);
    autoSlideInterval.current = [];
    
    // Set up auto-slide for each category with infinite scroll
    productCategories.forEach((cat, catIdx) => {
      if (cat && cat.products && cat.products.length > responsive.productsPerView) {
        autoSlideInterval.current[catIdx] = setInterval(() => {
          setSliderPositions(prev => {
            const category = productCategories[catIdx];
            if (!category || !category.products || category.products.length <= responsive.productsPerView) return prev;

            const updated = [...prev];
            const newPosition = prev[catIdx] - (responsive.cardWidth + 16);
            updated[catIdx] = newPosition;
            
            // Check if we need to reset position for infinite scroll
            const cloneCount = Math.max(responsive.productsPerView, 3);
            const totalOriginalWidth = category.products.length * (responsive.cardWidth + 16);
            const currentPos = Math.abs(newPosition);
            
            if (currentPos >= totalOriginalWidth + (cloneCount * (responsive.cardWidth + 16))) {
              // Reset to beginning seamlessly after a brief delay
              setTimeout(() => {
                setIsTransitioning(current => {
                  const updatedTransition = [...current];
                  updatedTransition[catIdx] = false;
                  return updatedTransition;
                });
                
                setSliderPositions(current => {
                  const updatedPos = [...current];
                  updatedPos[catIdx] = -(cloneCount * (responsive.cardWidth + 16));
                  return updatedPos;
                });

                // Re-enable transition after position reset
                setTimeout(() => {
                  setIsTransitioning(current => {
                    const updatedTransition = [...current];
                    updatedTransition[catIdx] = true;
                    return updatedTransition;
                  });
                }, 50);
              }, 500);
            }
            
            return updated;
          });
        }, 4000);
      }
    });
    
    // Cleanup on category/product change
    return () => {
      autoSlideInterval.current.forEach(clearInterval);
    };
  }, [responsive.productsPerView, responsive.cardWidth, productCategories]);

  // Initialize positions when responsive changes or when productCategories are loaded
  React.useEffect(() => {
    const cloneCount = Math.max(responsive.productsPerView, 3);
    const initialPositions = productCategories.map((category) => {
      if (!category || !category.products || category.products.length <= responsive.productsPerView) return 0;
      return -(cloneCount * (responsive.cardWidth + 16));
    });
    setSliderPositions(initialPositions);
  }, [responsive.productsPerView, responsive.cardWidth, productCategories]);

  // Responsive state for products per view and card width

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setResponsive({ productsPerView: 1, cardWidth: 260, cardHeight: 380, imageHeight: 260, imageWidth: 180 });
      } else if (window.innerWidth < 1024) {
        setResponsive({ productsPerView: 2, cardWidth: 300, cardHeight: 440, imageHeight: 320, imageWidth: 210 });
      } else {
        setResponsive({ productsPerView: 3, cardWidth: 340, cardHeight: 510, imageHeight: 440, imageWidth: 260 });
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <BgLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#989b2e] mx-auto"></div>
            <p className="text-white mt-4 text-xl">Loading Products...</p>
          </div>
        </div>
      </BgLayout>
    );
  }

  return (
    <BgLayout>
      {/* Mobile header spacer for fixed header on mobile/tablet */}
      <div className="block lg:hidden" style={{ height: '4em' }} aria-hidden="true" />

      {/* Combined Hero and Quick Access Section */}
      <section className="relative mt-5">
        <div className="flex min-h-[32vh] sm:min-h-[40vh] md:min-h-[50vh]">
          {/* Fixed Left Sidebar - Categories */}
          <motion.div
            className="w-[25%] h-[32vh] sm:h-[40vh] md:h-[65vh] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-2xl ml-5 overflow-y-auto hidden lg:block"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4">
              {/* Categories List */}
              <div className="space-y-2">
                {productCategories.map((category) => (
                  <div
                    key={category.id}
                    className="px-3 py-1 rounded-lg cursor-pointer transition-colors hover:bg-[#989b2e] text-white hover:text-white text-base font-medium border border-transparent hover:border-[#989b2e]"
                    onMouseEnter={() => handleCategoryEnter(category.id)}
                    onMouseLeave={handleCategoryLeave}
                    onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Products Dialog */}
          {(hoveredCategory || selectedCategory) && (
            <motion.div
              className="absolute left-[calc(25%+1.25rem)] top-0 w-[25%] h-[32vh] sm:h-[40vh] md:h-[65vh] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-2xl z-50 overflow-y-auto hidden lg:block"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={handleProductsEnter}
              onMouseLeave={handleProductsLeave}
            >
              <div className="p-4">
                <h3 className="font-bold text-[#989b2e] text-base mb-4">
                  {productCategories.find(cat => cat.id === (hoveredCategory || selectedCategory))?.name}
                </h3>
                
                {/* Products List - Text Only */}
                <div className="space-y-2">
                  {(productCategories.find(cat => cat.id === (hoveredCategory || selectedCategory))?.products || []).map((product, index) => (
                    <Link
                      key={index}
                      href={`/product/${product?.slug || '#'}`}
                      className="block p-2 rounded-lg hover:bg-gray-600 transition-colors group"
                    >
                      <h4 className="text-white text-base font-medium group-hover:text-[#989b2e] transition-colors">
                        {product?.name || 'Product'}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Content Area */}
          <div className="w-full lg:w-[75%] relative transition-all duration-300">
            {/* Hero Section */}
            <div className="relative min-h-[32vh] sm:min-h-[40vh] md:min-h-[65vh] lg:rounded-2xl rounded-none lg:ml-2 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src="/product-banner.avif"
                  alt="Products Banner"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/70" />
              </div>
              
              <motion.div 
                className="relative z-10 text-center text-white px-4 sm:px-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.h1 
                  className="text-3xl xs:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  Our <span className="text-[#989b2e]">Products</span>
                </motion.h1>
                
                <motion.p 
                  className="text-base md:text-2xl max-w-2xl md:max-w-4xl mx-auto text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  Comprehensive Range of Professional Machinery & Equipment
                </motion.p>
              </motion.div>
            </div>
          </div>

          {/* Mobile Hero Section - Full Width */}
          <div className="w-full relative hidden">
            {/* Hero Section */}
            <div className="relative min-h-[32vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src="/product-banner.avif"
                  alt="Products Banner"
                  // fill
                  className="object-cover"
                  // priority
                />
                <div className="absolute inset-0 bg-black/70" />
              </div>
              
              <motion.div 
                className="relative z-10 text-center text-white px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.h1 
                  className="text-3xl font-bold mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  Our <span className="text-[#989b2e]">Products</span>
                </motion.h1>
                
                <motion.p 
                  className="text-base max-w-2xl mx-auto text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  Comprehensive Range of Professional Machinery & Equipment
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Wrapper */}
      <div className="transition-all duration-300">
        {/* Introduction Text */}
        <section className="py-8 sm:pb-8 px-2 sm:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-8">
                Professional Machinery for <span className="text-[#989b2e]">Every Application</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl md:max-w-4xl mx-auto">
                From agricultural equipment to industrial machinery, our comprehensive product range covers every aspect of professional work. Each category features cutting-edge technology, robust construction, and reliable performance to meet the demands of modern industry. Explore our extensive collection designed for professionals who demand excellence.
              </p>
            </motion.div>
          </div>
        </section>

      {/* Product Categories Sections */}
      {productCategories.map((category, categoryIndex) => {
        if (!category || !category.products) return null;
        
        const extendedProducts = getExtendedProducts(category.products, responsive.productsPerView);
        const currentPosition = sliderPositions[categoryIndex] || 0;
        const hasInfiniteScroll = category.products.length > responsive.productsPerView;
        
        return (
          <section key={category.id} className={`py-6 sm:py-10 px-2 sm:px-6`}>
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="text-center mb-6 sm:mb-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#989b2e]" id={`category-${category.id}`}>
                  {category.name}
                </h2>
              </motion.div>
              
              {/* Product Slider */}
              <div className="relative">
                {/* Navigation Arrows */}
                {hasInfiniteScroll && (
                  <div className="absolute right-0 -top-7 sm:-top-10 flex space-x-2 z-10">
                    <button
                      onClick={() => handlePrev(categoryIndex)}
                      className="bg-[#989b2e] hover:bg-[#7a7d24] text-white p-2 sm:p-3 rounded-full shadow-lg transition-colors duration-300"
                      aria-label="Previous"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleNext(categoryIndex)}
                      className="bg-[#989b2e] hover:bg-[#7a7d24] text-white p-2 sm:p-3 rounded-full shadow-lg transition-colors duration-300"
                      aria-label="Next"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                      </svg>
                    </button>
                  </div>
                )}
                
                <div className="overflow-hidden py-4">
                  <div
                    ref={el => sliderRefs.current[categoryIndex] = el}
                    className="flex"
                    style={{
                      width: hasInfiniteScroll 
                        ? `${extendedProducts.length * (responsive.cardWidth + 16) - 16}px`
                        : `${category.products.length * (responsive.cardWidth + 16) - 16}px`,
                      transform: `translateX(${currentPosition}px)`,
                      transition: isTransitioning[categoryIndex] ? 'transform 0.5s ease-in-out' : 'none'
                    }}
                  >
                    {(hasInfiniteScroll ? extendedProducts : category.products).map((product, index) => {
                      // For infinite scroll, we need to determine the actual product for linking
                      let actualProduct = product;
                      let keyIndex = index;
                      
                      if (hasInfiniteScroll) {
                        const cloneCount = Math.max(responsive.productsPerView, 3);
                        const originalProducts = category.products;
                        
                        if (index < cloneCount) {
                          // Start clones
                          actualProduct = originalProducts[originalProducts.length - cloneCount + index];
                          keyIndex = `start-${index}`;
                        } else if (index >= cloneCount + originalProducts.length) {
                          // End clones
                          actualProduct = originalProducts[index - cloneCount - originalProducts.length];
                          keyIndex = `end-${index}`;
                        } else {
                          // Original products
                          actualProduct = originalProducts[index - cloneCount];
                          keyIndex = `orig-${index}`;
                        }
                      }
                      
                      return (
                        <Link
                          key={keyIndex}
                          href={`/product/${actualProduct?.slug || '#'}`}
                          className="flex-shrink-0 mr-4 last:mr-0"
                          style={{ width: `${responsive.cardWidth}px`, height: `${responsive.cardHeight}px` }}
                        >
                          <motion.div
                            className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full flex flex-col"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: (index % 10) * 0.01 }}
                            whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(152, 155, 46, 0.1)' }}
                          >
                            <div className="relative mb-4 sm:mb-6 rounded-xl overflow-hidden bg-white flex-1 flex items-center justify-center"
                              style={{ height: `${responsive.imageHeight}px`, width: `${responsive.imageWidth}px`, margin: '0 auto' }}>
                              <img
                                src={actualProduct?.image || '/placeholder.png'}
                                alt={actualProduct?.name || 'Product'}
                                // fill
                                className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                                style={{ objectFit: 'contain' }}
                              />
                            </div>
                            <h3 className="text-base sm:text-xl font-bold text-white my-2 sm:my-4 group-hover:text-[#989b2e] transition-colors text-center">
                              {actualProduct?.name || 'Product'}
                            </h3>
                            <div className="text-center">
                              <span className="inline-flex items-center text-[#989b2e] font-medium text-xs sm:text-base">
                                View Models
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                            </div>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

        {/* Call to Action */}
        <section className="py-10 sm:py-20 px-2 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Need Help Choosing the Right Product?
              </h2>
              <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                Our technical experts are here to help you find the perfect machinery for your specific needs. Contact us for personalized recommendations and professional guidance.
              </p>
              <Link
                href="/contact-us"
                className="inline-flex items-center bg-[#989b2e] hover:bg-[#8a8c20] text-white px-6 sm:px-4 py-3 sm:py-3 rounded-full font-medium text-base sm:text-lg transition-all duration-300"
              >
                Contact Our Experts
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </BgLayout>
  )
}

export default ProductPage