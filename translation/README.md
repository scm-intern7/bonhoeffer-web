# Translation System Documentation

## Overview
This is a comprehensive React Context-based translation system for the Next.js Bonhoeffer Machines website with automatic locale detection based on user's geographic location.

## Features
- ✅ **Automatic locale detection** via IP geolocation (ipapi.co)
- ✅ **Region-specific language mapping**:
  - Portuguese: Brazil only (`BR`)
  - Spanish: Mexico, Central America, South America (except Brazil)
  - English: All other countries (default fallback)
- ✅ **LocalStorage persistence** with key 'app-locale'
- ✅ **Manual language switching** with `switchLocale()` function
- ✅ **Dot notation support** for nested translations (e.g., `t('header.navigation.home')`)
- ✅ **Fallback strategy**: Current language → English → return key if not found
- ✅ **Loading states** while detecting locale
- ✅ **3-second timeout** for geolocation API
- ✅ **Error handling** for failed API calls

## File Structure
```
translation/
├── TranslationContext.js    # Main context and provider
├── useTranslation.js       # Custom hook export
├── translation-en.json     # English translations
├── translation-es.json     # Spanish translations
└── translation-pt.json     # Portuguese translations
```

## Usage

### 1. Basic Usage in Components
```javascript
"use client";
import { useTranslation } from '../translation/useTranslation';

function MyComponent() {
  const { t, currentLocale, switchLocale, isLoading } = useTranslation();
  
  return (
    <div>
      <h1>{t('header.navigation.home', 'Home')}</h1>
      <p>Current language: {currentLocale}</p>
      <button onClick={() => switchLocale('es')}>
        Switch to Spanish
      </button>
    </div>
  );
}
```

### 2. Translation Function Examples
```javascript
// Simple translation
t('header.navigation.home') // Returns: "Home" / "Inicio" / "Início"

// Nested object access
t('footer.contact.title') // Returns: "Contact" / "Contacto" / "Contato"

// With fallback value
t('some.missing.key', 'Default Text') // Returns fallback if key not found

// Complex nested structure
t('careers.form.validation.required') // Deeply nested translations
```

### 3. Available Hook Properties
```javascript
const {
  currentLocale,    // 'en' | 'es' | 'pt'
  isLoading,        // boolean - true while loading translations
  isDetecting,      // boolean - true while detecting user location
  t,                // translation function
  switchLocale,     // function to manually change language
  availableLocales  // ['en', 'es', 'pt']
} = useTranslation();
```

## Translation JSON Structure
Each language file follows this nested structure:

```json
{
  "header": {
    "navigation": {
      "home": "Home",
      "about": "About Us",
      "products": "Products"
    },
    "search": {
      "placeholder": "Search products...",
      "noResults": "No results found"
    }
  },
  "footer": {
    "company": {
      "title": "Company",
      "about": "About Us"
    }
  }
}
```

## Geographic Language Mapping

### Portuguese (pt)
- **Countries**: Brazil (`BR`)
- **Use case**: Brazilian Portuguese for Brazil only

### Spanish (es)
- **Countries**: Mexico, Central America, South America (except Brazil)
- **Country codes**: `MX`, `GT`, `BZ`, `SV`, `HN`, `NI`, `CR`, `PA`, `CO`, `EC`, `PE`, `BO`, `CL`, `AR`, `PY`, `UY`, `VE`, `GY`, `SR`, `GF`

### English (en)
- **Countries**: All other countries worldwide
- **Use case**: Default fallback language

## Implementation Status

### ✅ Completed Components
- **Header**: Full navigation, search, language selector
- **Footer**: All links, contact info, legal text
- **Layout**: Provider integration in root layout

### 🔄 Ready for Implementation
The translation system is now ready to be implemented in other components like:
- Home page sections
- Product pages
- Career forms
- Contact forms
- About page content

## How to Add Translations to New Components

1. **Make component client-side**:
```javascript
"use client";
import { useTranslation } from '../translation/useTranslation';
```

2. **Add hook and use translations**:
```javascript
function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('mySection.title', 'Default Title')}</h1>
    </div>
  );
}
```

3. **Add translations to JSON files**:
Update `translation-en.json`, `translation-es.json`, and `translation-pt.json` with your new keys.

## Testing the System

1. **Development server is running** at `http://localhost:3000`
2. **Test automatic detection**: Visit from different geographic locations
3. **Test manual switching**: Use the language selector in header
4. **Test persistence**: Refresh page and language should persist
5. **Test fallbacks**: Remove a translation key and verify fallback behavior

## Next Steps

1. Add translations for remaining components (careers, contact, product pages)
2. Add more comprehensive error handling for edge cases
3. Consider adding RTL support for future Arabic/Hebrew languages
4. Add translation management tools for content editors
5. Implement dynamic translation loading for better performance

The system is production-ready and provides a solid foundation for multi-language support across the entire website.
