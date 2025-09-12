import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Database ID from the URL
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_MODELS_DATABASE_ID = process.env.NOTION_MODELS_DATABASE_ID;
const NOTION_SPARE_PARTS_DATABASE_ID = process.env.NOTION_SPARE_PARTS_DATABASE_ID;
const NOTION_PRODUCT_CATEGORIES_DATABASE_ID = process.env.NOTION_PRODUCT_CATEGORIES_DATABASE_ID;
const NOTION_PRODUCT_MODELS_DATABASE_ID = process.env.NOTION_PRODUCT_MODELS_DATABASE_ID;
const NOTION_PRODUCT_DETAILS_DATABASE_ID = process.env.NOTION_PRODUCT_DETAILS_DATABASE_ID;
const NOTION_PRODUCT_INFO_DATABASE_ID = process.env.NOTION_PRODUCT_INFO_DATABASE_ID;
const NOTION_MODEL_DETAILS_DATABASE_ID = process.env.NOTION_MODEL_DETAILS_DATABASE_ID;
const NOTION_MODEL_FAQS_DATABASE_ID = process.env.NOTION_MODEL_FAQS_DATABASE_ID;
const NOTION_OTHER_MODELS_DATABASE_ID = process.env.NOTION_OTHER_MODELS_DATABASE_ID;

/**
 * Fetch all spare parts categories from Notion database
 */
export async function getSparePartsCategories() {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
    });

    // Group by category to get unique categories
    const categoriesMap = new Map();
    
    response.results.forEach((page) => {
      const properties = page.properties;
      const category = getPlainText(properties.Category);
      
      if (category && !categoriesMap.has(category)) {
        // Create a display name from the category slug
        const displayName = category
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        categoriesMap.set(category, {
          name: displayName,
          slug: category,
          image: getUrl(properties['Image Link']) || getDefaultImage(category),
          category: 'spare-parts', // Default category type
          label: getCategoryLabel(category),
        });
      }
    });

    return Array.from(categoriesMap.values());
  } catch (error) {
    console.error('Error fetching spare parts categories from Notion:', error);
    throw error;
  }
}

/**
 * Fetch all models for a specific part category from the models database
 */
export async function getModelsByCategory(categorySlug) {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_MODELS_DATABASE_ID,
      filter: {
        property: 'Category',
        rich_text: {
          equals: categorySlug,
        },
      },
    });

    const models = response.results.map((page) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        name: getPlainText(properties['Model Name']),
        code: getPlainText(properties['Model Name']), // Using Model Name as code for URL
        compatible: getPlainText(properties.Compatible),
        image: getUrl(properties['Image Link']),
        category: getPlainText(properties.Category),
      };
    });

    // Sort models by code in ascending order (natural sort for better number handling)
    models.sort((a, b) => {
      const codeA = a.code || '';
      const codeB = b.code || '';
      
      // Use natural sort to handle numbers correctly (001, 002, 010, etc.)
      return codeA.localeCompare(codeB, undefined, { 
        numeric: true, 
        sensitivity: 'base' 
      });
    });

    return models;
  } catch (error) {
    console.error('Error fetching models by category from Notion:', error);
    throw error;
  }
}

/**
 * Fetch specific model details by category and model code from both databases
 */
export async function getSpecificModelDetails(categorySlug, modelCode) {
  try {
    // First, try to get the model from the models database for basic info
    const modelsResponse = await notion.databases.query({
      database_id: NOTION_MODELS_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Category',
            rich_text: {
              equals: categorySlug,
            },
          },
          {
            property: 'Model Name',
            title: {
              equals: modelCode,
            },
          },
        ],
      },
    });

    let modelData = null;
    if (modelsResponse.results.length > 0) {
      const page = modelsResponse.results[0];
      const properties = page.properties;
      
      modelData = {
        name: getPlainText(properties['Model Name']),
        compatible: getPlainText(properties.Compatible),
        image: getUrl(properties['Image Link']),
        code: getPlainText(properties['Model Name']),
        details: [],
      };
    }

    // Now try to get the detailed specifications from the main products database
    // Try multiple search strategies to find the specific model
    let specificationsFound = false;
    
    // Strategy 1: Search by exact CODE match
    try {
      const codeResponse = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
        filter: {
          property: 'CODE',
          title: {
            equals: modelCode,
          },
        },
      });
      
      if (codeResponse.results.length > 0) {
        const productPage = codeResponse.results[0];
        const productProperties = productPage.properties;
        const details = extractDynamicFields(productProperties);
        
        if (modelData) {
          modelData.details = details;
        } else {
          modelData = {
            name: modelCode,
            compatible: getPlainText(productProperties.Compatible) || 'Compatible with multiple models',
            image: getUrl(productProperties['Image Link']),
            code: modelCode,
            details: details,
          };
        }
        specificationsFound = true;
      }
    } catch (error) {
      console.warn('Error searching by CODE:', error);
    }
    
    // Strategy 2: If not found by CODE, try searching by Model Name
    if (!specificationsFound) {
      try {
        const modelNameResponse = await notion.databases.query({
          database_id: NOTION_DATABASE_ID,
          filter: {
            property: 'Model Name',
            title: {
              equals: modelCode,
            },
          },
        });
        
        if (modelNameResponse.results.length > 0) {
          const productPage = modelNameResponse.results[0];
          const productProperties = productPage.properties;
          const details = extractDynamicFields(productProperties);
          
          if (modelData) {
            modelData.details = details;
          } else {
            modelData = {
              name: modelCode,
              compatible: getPlainText(productProperties.Compatible) || 'Compatible with multiple models',
              image: getUrl(productProperties['Image Link']),
              code: modelCode,
              details: details,
            };
          }
          specificationsFound = true;
        }
      } catch (error) {
        console.warn('Error searching by Model Name:', error);
      }
    }
    
    // Strategy 3: If still not found, search by partial match in category
    if (!specificationsFound && modelData) {
      try {
        const categoryResponse = await notion.databases.query({
          database_id: NOTION_DATABASE_ID,
          filter: {
            and: [
              {
                property: 'Category',
                rich_text: {
                  contains: categorySlug,
                },
              },
              {
                or: [
                  {
                    property: 'CODE',
                    title: {
                      contains: modelCode.split('-')[1] || modelCode, // Try to match part of the code
                    },
                  },
                  {
                    property: 'Model Name',
                    title: {
                      contains: modelCode.split('-')[1] || modelCode,
                    },
                  },
                ],
              },
            ],
          },
        });
        
        if (categoryResponse.results.length > 0) {
          const productPage = categoryResponse.results[0];
          const productProperties = productPage.properties;
          const details = extractDynamicFields(productProperties);
          modelData.details = details;
        }
      } catch (error) {
        console.warn('Error searching by category and partial match:', error);
      }
    }

    return modelData;
  } catch (error) {
    console.error('Error fetching specific model details from Notion:', error);
    throw error;
  }
}

/**
 * Extract dynamic fields from properties (exclude mandatory fields)
 */
function extractDynamicFields(properties) {
  const mandatoryFields = ['Category', 'Model Name', 'Image Link', 'Compatible', 'CODE', 'Code'];
  const details = [];
  
  Object.entries(properties).forEach(([key, value]) => {
    if (!mandatoryFields.includes(key) && hasValue(value)) {
      const displayValue = getDisplayValue(value);
      if (displayValue) {
        details.push({
          label: key,
          value: displayValue,
        });
      }
    }
  });
  
  return details;
}

/**
 * Check if a property has a value
 */
function hasValue(property) {
  if (!property) return false;
  
  switch (property.type) {
    case 'rich_text':
      return property.rich_text && property.rich_text.length > 0 && property.rich_text[0].plain_text.trim() !== '';
    case 'number':
      return property.number !== null && property.number !== 0;
    case 'select':
      return property.select && property.select.name;
    case 'multi_select':
      return property.multi_select && property.multi_select.length > 0;
    case 'checkbox':
      return property.checkbox;
    case 'date':
      return property.date;
    case 'url':
      return property.url;
    case 'email':
      return property.email;
    case 'phone_number':
      return property.phone_number;
    case 'files':
      return property.files && property.files.length > 0;
    default:
      return false;
  }
}

/**
 * Get display value for different property types
 */
function getDisplayValue(property) {
  if (!property) return '';
  
  switch (property.type) {
    case 'rich_text':
      return property.rich_text.map(text => text.plain_text).join('');
    case 'number':
      return property.number?.toString() || '';
    case 'select':
      return property.select?.name || '';
    case 'multi_select':
      return property.multi_select?.map(option => option.name).join(', ') || '';
    case 'checkbox':
      return property.checkbox ? 'Yes' : 'No';
    case 'date':
      return property.date?.start || '';
    case 'url':
      return property.url || '';
    case 'email':
      return property.email || '';
    case 'phone_number':
      return property.phone_number || '';
    case 'files':
      return property.files?.map(file => file.name).join(', ') || '';
    default:
      return '';
  }
}

// Helper functions to extract data from Notion properties
function getPlainText(property) {
  if (!property) return '';
  
  if (property.type === 'title' && property.title) {
    return property.title.map(text => text.plain_text).join('');
  }
  if (property.type === 'rich_text' && property.rich_text) {
    return property.rich_text.map(text => text.plain_text).join('');
  }
  return '';
}

function getSelect(property) {
  if (!property) return '';
  
  if (property.type === 'select' && property.select) {
    return property.select.name;
  }
  return '';
}

function getUrl(property) {
  if (!property) return '';
  
  if (property.type === 'url' && property.url) {
    return property.url;
  }
  if (property.type === 'files' && property.files && property.files.length > 0) {
    return property.files[0].file?.url || property.files[0].external?.url || '';
  }
  return '';
}

function getNumber(property) {
  if (!property) return null;
  
  if (property.type === 'number' && property.number !== null) {
    return property.number;
  }
  return null;
}

// Helper functions for category processing
function getDefaultImage(category) {
  // Provide default images based on category
  const defaultImages = {
    'piston-kit': 'https://bonhoeffermachines.com/en/public/parts-category/1_kit-de-piston.png',
    'piston-rings': 'https://bonhoeffermachines.com/en/public/parts-category/2_anillos-de-piston.png',
    'carburetor': 'https://bonhoeffermachines.com/en/public/parts-category/3_carburetor.png',
    'face-protection': '/spare-parts/face-protection.jpeg',
    // Add more default images as needed
  };
  
  return defaultImages[category] || '/spare-parts/default.png';
}

function getCategoryLabel(category) {
  // Map categories to labels
  const categoryLabels = {
    'piston-kit': 'Engine Components',
    'piston-rings': 'Engine Components',
    'carburetor': 'Fuel System',
    'face-protection': 'Safety Equipment',
    // Add more mappings as needed
  };
  
  return categoryLabels[category] || 'Spare Parts';
}

/**
 * Fetch all spare parts and accessories from the dedicated spare parts database
 */
export async function getSparePartsAndAccessories() {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_SPARE_PARTS_DATABASE_ID,
    });

    const items = response.results.map((page) => {
      const properties = page.properties;
      
      return {
        name: getPlainText(properties.Name),
        slug: getPlainText(properties.Slug),
        category: getPlainText(properties.Category),
        label: getPlainText(properties.Label),
        image: getUrl(properties['Image Link']),
      };
    });

    // Reverse to match the order shown in Notion database
    return items.reverse();
  } catch (error) {
    console.error('Error fetching spare parts and accessories from Notion:', error);
    throw error;
  }
}

/**
 * Fetch all product categories with their products from the dedicated product categories database
 */
export async function getProductCategories() {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_PRODUCT_CATEGORIES_DATABASE_ID,
    });

    // First, collect all data maintaining order
    const allItems = response.results.map((page) => {
      const properties = page.properties;
      
      return {
        categoryId: getPlainText(properties['Category ID']) || getSelect(properties['Category ID']),
        categoryName: getPlainText(properties['Category Name']),
        productName: getPlainText(properties['Product Name']),
        productSlug: getPlainText(properties['Product Slug']),
        productImage: getUrl(properties['Image Link']),
      };
    }).filter(item => item.categoryName && item.productName);

    // Group products by category while preserving order
    const categoriesMap = new Map();
    const categoryOrder = [];
    
    allItems.forEach((item) => {
      if (!categoriesMap.has(item.categoryName)) {
        categoriesMap.set(item.categoryName, {
          id: parseInt(item.categoryId) || Math.random(),
          name: item.categoryName,
          products: []
        });
        categoryOrder.push(item.categoryName);
      }
      
      const category = categoriesMap.get(item.categoryName);
      category.products.push({
        name: item.productName,
        slug: item.productSlug || item.productName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        image: item.productImage || '/placeholder.png'
      });
    });

    // Return categories in the order they first appeared
    const categories = categoryOrder.map(categoryName => categoriesMap.get(categoryName));

    return categories.reverse();
  } catch (error) {
    console.error('Error fetching product categories from Notion:', error);
    throw error;
  }
}

/**
 * Fetch product models for a specific product slug from Notion database
 */
export async function getProductModels(productSlug) {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_PRODUCT_MODELS_DATABASE_ID,
      filter: {
        property: 'Slug',
        title: {
          equals: productSlug
        }
      },
      sorts: [
        {
          property: 'Product ID',
          direction: 'ascending'
        }
      ]
    });

    const models = response.results.map((page) => {
      const properties = page.properties;
      
      return {
        id: parseInt(getPlainText(properties['Product ID'])) || Math.random(),
        name: getPlainText(properties['Product Name']) || '',
        image: getUrl(properties['Image Link']) || '',
        feature: getPlainText(properties['Feature']) || '',
        link: getPlainText(properties['Link']) || `/product/${productSlug}/${getPlainText(properties['Product Name']).toLowerCase()}`
      };
    });

    return models;
  } catch (error) {
    console.error('Error fetching product models from Notion:', error);
    return [];
  }
}

/**
 * Fetch product details/paragraphs for a specific product slug from Notion database
 */
export async function getProductDetails(productSlug) {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_PRODUCT_DETAILS_DATABASE_ID,
      filter: {
        property: 'Category Slug',
        rich_text: {
          equals: productSlug
        }
      }
    });

    const details = response.results.map((page) => {
      const properties = page.properties;
      
      return {
        title: getPlainText(properties['Title']) || '',
        description: getPlainText(properties['Description']) || ''
      };
    });

    return details;
  } catch (error) {
    console.error('Error fetching product details from Notion:', error);
    return [];
  }
}

/**
 * Fetch product information (name, image, description) for a specific product slug
 */
export async function getProductInfo(productSlug) {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_PRODUCT_INFO_DATABASE_ID,
      filter: {
        property: 'Slug',
        title: {
          equals: productSlug
        }
      }
    });

    if (response.results.length > 0) {
      const properties = response.results[0].properties;
      
      const productInfo = {
        name: getPlainText(properties['Name']) || '',
        image: getUrl(properties['Banner Link']) || '',
        description: getPlainText(properties['Description']) || ''
      };

      return productInfo;
    }

    return {};
  } catch (error) {
    console.error('Error fetching product info from Notion:', error);
    return {};
  }
}

// Helper function to parse specifications text into array format
function parseSpecifications(text) {
  if (!text) return [];
  
  // Try to parse as JSON first
  try {
    return JSON.parse(text);
  } catch (e) {
    // If not JSON, split by lines and create simple key-value pairs
    return text.split('\n').filter(line => line.trim()).map(line => {
      const [label, ...valueParts] = line.split(':');
      return {
        label: label.trim(),
        value: valueParts.join(':').trim() || 'N/A'
      };
    });
  }
}

// Helper function to parse features text into array format  
function parseFeatures(text) {
  if (!text) return [];
  
  // Try to parse as JSON first
  try {
    return JSON.parse(text);
  } catch (e) {
    // If not JSON, split by lines or bullets
    return text.split(/[\n•-]/).filter(line => line.trim()).map(line => line.trim());
  }
}

// Helper function to build specifications from individual field properties
function buildSpecifications(properties) {
  const specs = [];
  
  // Define the specification field mapping
  const specFields = {
    'Maximum_Power': 'Maximum Power',
    'Starting_System': 'Starting System',
    'Fuel_Tank_Size': 'Fuel Tank Size',
    'Compression_Ratio': 'Compression Ratio',
    'Recommended_Oil': 'Recommended Oil',
    'Discharge_Diameter': 'Discharge Diameter',
    'Suction_Diameter': 'Suction Diameter',
    'Suction_Height': 'Suction Height',
    'Total_Elevation': 'Total Elevation',
    'Maximum_Pumping_Capacity': 'Maximum Pumping Capacity',
    'Pump_Type': 'Pump Type',
    'Impeller_Material': 'Impeller Material',
    'Volute_Material': 'Volute Material',
    'Mechanical_Seal': 'Mechanical Seal'
  };
  
  // Extract specifications from properties
  Object.entries(specFields).forEach(([fieldKey, label]) => {
    const value = getPlainText(properties[fieldKey]);
    if (value && value.trim()) {
      specs.push({
        label: label,
        value: value.trim()
      });
    }
  });
  
  return specs;
}

// Helper function to build features from individual feature properties
function buildFeatures(properties) {
  const features = [];
  
  // Extract feature fields (feature_1, feature_2, etc.)
  for (let i = 1; i <= 8; i++) {
    const featureKey = `feature_${i}`;
    const featureText = getPlainText(properties[featureKey]);
    if (featureText && featureText.trim()) {
      features.push(featureText.trim());
    }
  }
  
  return features;
}

// Helper function to parse pipe-separated showcaseImages
function parseShowcaseImages(showcaseImagesText) {
  if (!showcaseImagesText) return [];
  
  return showcaseImagesText
    .split('|')
    .map(url => url.trim())
    .filter(url => url && url.length > 0);
}

// Helper function to parse pipe-separated specifications
function parseSpecificationsFromText(specificationsText) {
  if (!specificationsText) return [];
  
  return specificationsText
    .split('|')
    .map(spec => spec.trim())
    .filter(spec => spec && spec.includes(':'))
    .map(spec => {
      const [label, ...valueParts] = spec.split(':');
      return {
        label: label.trim(),
        value: valueParts.join(':').trim()
      };
    });
}

// Helper function to parse pipe-separated features
function parseFeaturesFromText(featuresText) {
  if (!featuresText) return [];
  
  return featuresText
    .split('|')
    .map(feature => feature.trim())
    .filter(feature => feature && feature.length > 0);
}

// Get model details for specific product and model
export async function getModelDetails(productSlug, modelName) {
  try {
    console.log('Fetching model details for:', productSlug, modelName);
    console.log('Using database ID:', NOTION_MODEL_DETAILS_DATABASE_ID);
    
    const response = await notion.databases.query({
      database_id: NOTION_MODEL_DETAILS_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'category',
            title: {
              equals: productSlug
            }
          },
          {
            property: 'model_key',
            rich_text: {
              equals: modelName
            }
          }
        ]
      }
    });

    if (response.results.length > 0) {
      const page = response.results[0];
      const properties = page.properties;
      
      const modelDetails = {
        name: getPlainText(properties['name']) || modelName,
        model: getPlainText(properties['model']) || modelName,
        power: getPlainText(properties['Maximum_Power']) || '',
        
        // Description fields (fixed two columns each)
        description: [
          {
            title: getPlainText(properties['description_1_title']) || '',
            text: getPlainText(properties['description_1_text']) || ''
          },
          {
            title: getPlainText(properties['description_2_title']) || '',
            text: getPlainText(properties['description_2_text']) || ''
          }
        ].filter(desc => desc.text), // Only include descriptions that have text
        
        descriptionImage: getUrl(properties['descriptionImage']) || '',
        
        // Showcase images - parse pipe-separated URLs
        showcaseImages: parseShowcaseImages(getPlainText(properties['showcaseImages'])),
        
        // Banner image
        isBannerImage: getPlainText(properties['isBannerImage']) === 'true',
        bannerImage: getUrl(properties['bannerImage']) || '',
        
        // Video - support for multiple videos (fixed three columns)
        isVideo: getPlainText(properties['isVideo']) === 'true',
        videoUrls: [
          {
            url: getUrl(properties['video_1_url']) || '',
            title: getPlainText(properties['video_1_title']) || ''
          },
          {
            url: getUrl(properties['video_2_url']) || '',
            title: getPlainText(properties['video_2_title']) || ''
          },
          {
            url: getUrl(properties['video_3_url']) || '',
            title: getPlainText(properties['video_3_title']) || ''
          }
        ].filter(video => video.url), // Only include videos that have URLs
        
        // Catalogues
        isCatalogueLeft: getPlainText(properties['isCatalogueLeft']) === 'true',
        isCatalogueRight: getPlainText(properties['isCatalogueRight']) === 'true',
        catalougeLeft: getUrl(properties['catalougeLeft']) || '',
        catalougeRight: getUrl(properties['catalougeRight']) || '',
        
        // Manuals and documents
        isWorkshopManual: getPlainText(properties['isWorkshopManual']) === 'true',
        workshopManualUrl: getUrl(properties['workshopManualUrl']) || '',
        isUserManual: getPlainText(properties['isUserManual']) === 'true',
        userManualUrl: getUrl(properties['userManualUrl']) || '',
        isBrochure: getPlainText(properties['isBrochure']) === 'true',
        brochureUrl: getUrl(properties['brochureUrl']) || '',
        isSpareParts: getPlainText(properties['isSpareParts']) === 'true',
        sparePartsUrl: getUrl(properties['sparePartsUrl']) || '',
        
        // Warranty and certifications
        warrantyTime: parseInt(getPlainText(properties['warrantyTime'])) || 36,
        isFMTTI: getPlainText(properties['isFMTTI']) === 'true',
        
        // Features and specifications - parse from pipe-separated text
        specifications: parseSpecificationsFromText(getPlainText(properties['specifications'])),
        features: parseFeaturesFromText(getPlainText(properties['features']))
      };

      return modelDetails;
    }

    return null;
  } catch (error) {
    console.error('Error fetching model details from Notion:', error);
    return null;
  }
}

// Get FAQs for a specific product
export async function getModelFAQs(productSlug) {
  try {

    
    const response = await notion.databases.query({
      database_id: NOTION_MODEL_FAQS_DATABASE_ID,
      filter: {
        property: 'Category',
        rich_text: {
          equals: productSlug
        }
      }
    });

    const faqs = response.results.map((page) => {
      const properties = page.properties;
      
      return {
        question: getPlainText(properties['Question']) || '',
        answer: getPlainText(properties['Answer']) || ''
      };
    });

    return faqs;
  } catch (error) {
    console.error('Error fetching model FAQs from Notion:', error);
    return [];
  }
}

// Get other models for a specific product (excluding current model)
export async function getOtherModels(productSlug, currentModel) {
  try {

    
    const response = await notion.databases.query({
      database_id: NOTION_OTHER_MODELS_DATABASE_ID,
      filter: {
        property: 'Category',
        rich_text: {
          equals: productSlug
        }
      }
    });

    const otherModels = response.results
      .map((page) => {
        const properties = page.properties;
        
        return {
          name: getPlainText(properties['Name']) || '',
          power: getPlainText(properties['Feature']) || '', // Using Feature as power description
          image: getUrl(properties['Image Link']) || ''
        };
      })
      .filter(model => model.name.toLowerCase() !== currentModel.toLowerCase());

    return otherModels;
  } catch (error) {
    console.error('Error fetching other models from Notion:', error);
    return [];
  }
}
