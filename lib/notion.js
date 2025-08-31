import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Database ID from the URL
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_MODELS_DATABASE_ID = process.env.NOTION_MODELS_DATABASE_ID;

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
