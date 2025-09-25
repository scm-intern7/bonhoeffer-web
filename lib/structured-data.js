// Structured Data (JSON-LD) utilities for SEO

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Bonhoeffer Machines",
  "description": "Leading manufacturer of high-quality agricultural and industrial machinery including generators, water pumps, lawn mowers, chainsaws, and more.",
  "url": "https://bonhoeffermachines.com",
  "logo": "https://bonhoeffermachines.com/logo.png",
  "foundingDate": "2010",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "url": "https://bonhoeffermachines.com/contact-us",
    "availableLanguage": ["English", "Spanish", "Portuguese"]
  },
  "sameAs": [
    "https://www.facebook.com/bonhoeffermachines",
    "https://www.linkedin.com/company/bonhoeffermachines",
    "https://www.youtube.com/c/bonhoeffermachines"
  ],
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Agricultural and Industrial Equipment",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Generators",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Diesel Generators",
              "category": "Generator"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product", 
              "name": "Gasoline Generators",
              "category": "Generator"
            }
          }
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "Water Pumps",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Gasoline Water Pumps",
              "category": "Water Pump"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Product",
              "name": "Diesel Water Pumps", 
              "category": "Water Pump"
            }
          }
        ]
      }
    ]
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Bonhoeffer Machines",
  "url": "https://bonhoeffermachines.com",
  "description": "Leading manufacturer of high-quality agricultural and industrial machinery",
  "publisher": {
    "@type": "Organization",
    "name": "Bonhoeffer Machines"
  },
  "inLanguage": ["en", "es", "pt"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://bonhoeffermachines.com/product?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const productSchema = (product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.images || [],
  "brand": {
    "@type": "Brand",
    "name": "Bonhoeffer Machines"
  },
  "manufacturer": {
    "@type": "Organization", 
    "name": "Bonhoeffer Machines"
  },
  "category": product.category,
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "USD",
    "seller": {
      "@type": "Organization",
      "name": "Bonhoeffer Machines"
    }
  },
  "warranty": product.warranty ? {
    "@type": "WarrantyPromise",
    "durationOfWarranty": `P${product.warranty}M`,
    "warrantyScope": "Full warranty coverage"
  } : undefined
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Component to render JSON-LD structured data
export function StructuredData({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
    />
  );
}