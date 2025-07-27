"use client";
import { useTranslation } from '../../translation/useTranslation';

function Cta() {
  const { t } = useTranslation();
  
  return (
    <div className="mt-10 z-30">
        <div className="container mx-auto px-8 text-center">
        <div className="mb-8">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('cta.title', 'Explore Our Complete Range')}
            </h3>
            <p className="text-xl text-gray-300 mb-8">
            {t('cta.subtitle', 'Discover all of our premium products designed for excellence')}
            </p>
        </div>
        <button className="px-10 py-4 bg-[#9a9c30] text-white font-bold text-xl rounded-full 
                        hover:bg-[#85870e] transition-all duration-300 shadow-2xl hover:shadow-3xl
                        transform hover:scale-105 cursor-pointer">
            {t('cta.button', 'View All Products')}
        </button>
        </div>
    </div>
  )
}

export default Cta