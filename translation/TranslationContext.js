"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Translation Context
const TranslationContext = createContext();

// Country code mappings
const COUNTRY_MAPPINGS = {
  pt: ['BR'], // Portuguese: Brazil only
  es: ['MX', 'GT', 'BZ', 'SV', 'HN', 'NI', 'CR', 'PA', 'CO', 'EC', 'PE', 'BO', 'CL', 'AR', 'PY', 'UY', 'VE', 'GY', 'SR', 'GF'], // Spanish: Mexico, Central America, South America except Brazil
  en: [] // English: All other countries (default)
};

// Utility function to get nested object values using dot notation
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
};

// Translation Provider Component
export const TranslationProvider = ({ children }) => {
  const [currentLocale, setCurrentLocale] = useState('en');
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDetecting, setIsDetecting] = useState(true);

  // Load translation files
  const loadTranslations = async (locale) => {
    try {
      const response = await fetch(`/translation/translation-${locale}.json`);
      if (response.ok) {
        const data = await response.json();
        setTranslations(prev => ({
          ...prev,
          [locale]: data
        }));
        return data;
      }
    } catch (error) {
      console.warn(`Failed to load translations for ${locale}:`, error);
    }
    return null;
  };

  // Detect user's country and determine appropriate locale
  const detectLocale = async () => {
    try {
      setIsDetecting(true);
      
      // Check if user has a saved preference
      const savedLocale = localStorage.getItem('app-locale');
      if (savedLocale && ['en', 'es', 'pt'].includes(savedLocale)) {
        setCurrentLocale(savedLocale);
        await loadTranslations(savedLocale);
        setIsDetecting(false);
        setIsLoading(false);
        return;
      }

      // Detect location using ipapi.co with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      try {
        const response = await fetch('https://ipapi.co/json/', {
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const countryCode = data.country_code;
          
          let detectedLocale = 'en'; // Default to English
          
          // Check country mappings
          if (COUNTRY_MAPPINGS.pt.includes(countryCode)) {
            detectedLocale = 'pt';
          } else if (COUNTRY_MAPPINGS.es.includes(countryCode)) {
            detectedLocale = 'es';
          }
          
          console.log(`Detected country: ${countryCode}, locale: ${detectedLocale}`);
          setCurrentLocale(detectedLocale);
          await loadTranslations(detectedLocale);
        } else {
          throw new Error('Geolocation API failed');
        }
      } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
          console.warn('Geolocation detection timed out, using default locale');
        } else {
          console.warn('Geolocation detection failed:', error);
        }
        // Default to English
        setCurrentLocale('en');
        await loadTranslations('en');
      }
    } catch (error) {
      console.error('Locale detection failed:', error);
      setCurrentLocale('en');
      await loadTranslations('en');
    } finally {
      setIsDetecting(false);
      setIsLoading(false);
    }
  };

  // Switch locale manually
  const switchLocale = async (newLocale) => {
    if (!['en', 'es', 'pt'].includes(newLocale)) {
      console.warn(`Invalid locale: ${newLocale}`);
      return;
    }

    setIsLoading(true);
    setCurrentLocale(newLocale);
    
    // Save to localStorage
    localStorage.setItem('app-locale', newLocale);
    
    // Load translations if not already loaded
    if (!translations[newLocale]) {
      await loadTranslations(newLocale);
    }
    
    setIsLoading(false);
  };

  // Translation function with fallback strategy
  const t = (key, defaultValue = null) => {
    // Try current locale first
    let value = getNestedValue(translations[currentLocale], key);
    if (value !== null) return value;

    // Fallback to English if not current locale
    if (currentLocale !== 'en') {
      value = getNestedValue(translations['en'], key);
      if (value !== null) return value;
    }

    // Return default value or key if nothing found
    return defaultValue || key;
  };

  // Initialize translations on mount
  useEffect(() => {
    const initializeTranslations = async () => {
      // Always load English as fallback
      await loadTranslations('en');
      // Detect and load appropriate locale
      await detectLocale();
    };

    initializeTranslations();
  }, []);

  // Load additional locales when switching
  useEffect(() => {
    if (currentLocale && !translations[currentLocale] && !isDetecting) {
      loadTranslations(currentLocale);
    }
  }, [currentLocale, isDetecting]);

  const value = {
    currentLocale,
    isLoading,
    isDetecting,
    t,
    switchLocale,
    availableLocales: ['en', 'es', 'pt']
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use translation context
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export default TranslationContext;
