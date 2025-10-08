// Admin-specific Notion CRUD operations
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Database IDs
const DATABASE_IDS = {
  MODEL_DETAILS: process.env.NOTION_MODEL_DETAILS_DATABASE_ID,
  MODEL_FAQS: process.env.NOTION_MODEL_FAQS_DATABASE_ID,
  OTHER_MODELS: process.env.NOTION_OTHER_MODELS_DATABASE_ID,
};

// Helper function to get plain text from rich text
function getPlainText(richText) {
  if (!richText || !Array.isArray(richText)) return '';
  return richText.map(text => text.plain_text).join('');
}

// Helper function to get URL from URL property
function getUrl(urlProperty) {
  return urlProperty?.url || '';
}

// Helper function to create rich text property
function createRichText(text) {
  return [{
    type: 'text',
    text: { content: text || '' }
  }];
}

// Helper function to create URL property
function createUrl(url) {
  return url ? { url } : null;
}

// MODEL DETAILS CRUD OPERATIONS
export async function getModelDetails(pageSize = 50, startCursor = null) {
  try {
    const queryOptions = {
      database_id: DATABASE_IDS.MODEL_DETAILS,
      page_size: pageSize,
    };
    
    // Only add start_cursor if it's not null
    if (startCursor) {
      queryOptions.start_cursor = startCursor;
    }
    
    const response = await notion.databases.query(queryOptions);

    const models = response.results.map(page => ({
      id: page.id,
      name: getPlainText(page.properties.name?.rich_text),
      model: getPlainText(page.properties.model?.rich_text),
      category: getPlainText(page.properties.category?.title),
      power: getPlainText(page.properties.Maximum_Power?.rich_text),
      isBannerImage: getPlainText(page.properties.isBannerImage?.rich_text) === 'true',
      bannerImage: getPlainText(page.properties.bannerImage?.rich_text),
      warrantyTime: parseInt(getPlainText(page.properties.warrantyTime?.rich_text)) || 0,
      isFMTTI: getPlainText(page.properties.isFMTTI?.rich_text) === 'true',
      isUserManual: getPlainText(page.properties.isUserManual?.rich_text) === 'true',
      userManualUrl: getUrl(page.properties.userManualUrl),
      isBrochure: getPlainText(page.properties.isBrochure?.rich_text) === 'true',
      brochureUrl: getUrl(page.properties.brochureUrl),
      isSpareParts: getPlainText(page.properties.isSpareParts?.rich_text) === 'true',
      sparePartsUrl: getUrl(page.properties.sparePartsUrl),
      created_time: page.created_time,
      last_edited_time: page.last_edited_time,
    }));

    return {
      models,
      hasMore: response.has_more,
      nextCursor: response.next_cursor,
    };
  } catch (error) {
    console.error('Error fetching model details:', error);
    throw error;
  }
}

export async function createModelDetail(data) {
  try {
    const properties = {
      category: {
        title: [{ type: 'text', text: { content: data.category || '' } }]
      },
      name: {
        rich_text: createRichText(data.name)
      },
      model: {
        rich_text: createRichText(data.model)
      },
      Maximum_Power: {
        rich_text: createRichText(data.power)
      },
      isBannerImage: {
        rich_text: createRichText(data.isBannerImage ? 'true' : '')
      },
      bannerImage: {
        rich_text: createRichText(data.bannerImage)
      },
      warrantyTime: {
        rich_text: createRichText(data.warrantyTime?.toString() || '36')
      },
      isFMTTI: {
        rich_text: createRichText(data.isFMTTI ? 'true' : '')
      },
      isUserManual: {
        rich_text: createRichText(data.isUserManual ? 'true' : '')
      },
      isBrochure: {
        rich_text: createRichText(data.isBrochure ? 'true' : '')
      },
      isSpareParts: {
        rich_text: createRichText(data.isSpareParts ? 'true' : '')
      },
    };

    // Add URL properties if they exist
    if (data.userManualUrl) {
      properties.userManualUrl = { url: data.userManualUrl };
    }
    if (data.brochureUrl) {
      properties.brochureUrl = { url: data.brochureUrl };
    }
    if (data.sparePartsUrl) {
      properties.sparePartsUrl = { url: data.sparePartsUrl };
    }

    const response = await notion.pages.create({
      parent: { database_id: DATABASE_IDS.MODEL_DETAILS },
      properties,
    });

    return response;
  } catch (error) {
    console.error('Error creating model detail:', error);
    throw error;
  }
}

export async function updateModelDetail(pageId, data) {
  try {
    const properties = {};

    // Only update properties that are provided
    if (data.name !== undefined) {
      properties.name = { rich_text: createRichText(data.name) };
    }
    if (data.model !== undefined) {
      properties.model = { rich_text: createRichText(data.model) };
    }
    if (data.category !== undefined) {
      properties.category = { title: [{ type: 'text', text: { content: data.category } }] };
    }
    if (data.power !== undefined) {
      properties.Maximum_Power = { rich_text: createRichText(data.power) };
    }
    if (data.isBannerImage !== undefined) {
      properties.isBannerImage = { rich_text: createRichText(data.isBannerImage ? 'true' : '') };
    }
    if (data.bannerImage !== undefined) {
      properties.bannerImage = { rich_text: createRichText(data.bannerImage) };
    }
    if (data.warrantyTime !== undefined) {
      properties.warrantyTime = { rich_text: createRichText(data.warrantyTime?.toString() || '36') };
    }
    if (data.isFMTTI !== undefined) {
      properties.isFMTTI = { rich_text: createRichText(data.isFMTTI ? 'true' : '') };
    }
    if (data.isUserManual !== undefined) {
      properties.isUserManual = { rich_text: createRichText(data.isUserManual ? 'true' : '') };
    }
    if (data.userManualUrl !== undefined) {
      properties.userManualUrl = data.userManualUrl ? { url: data.userManualUrl } : { url: null };
    }
    if (data.isBrochure !== undefined) {
      properties.isBrochure = { rich_text: createRichText(data.isBrochure ? 'true' : '') };
    }
    if (data.brochureUrl !== undefined) {
      properties.brochureUrl = data.brochureUrl ? { url: data.brochureUrl } : { url: null };
    }
    if (data.isSpareParts !== undefined) {
      properties.isSpareParts = { rich_text: createRichText(data.isSpareParts ? 'true' : '') };
    }
    if (data.sparePartsUrl !== undefined) {
      properties.sparePartsUrl = data.sparePartsUrl ? { url: data.sparePartsUrl } : { url: null };
    }

    const response = await notion.pages.update({
      page_id: pageId,
      properties,
    });

    return response;
  } catch (error) {
    console.error('Error updating model detail:', error);
    throw error;
  }
}

export async function deleteModelDetail(pageId) {
  try {
    const response = await notion.pages.update({
      page_id: pageId,
      archived: true,
    });

    return response;
  } catch (error) {
    console.error('Error deleting model detail:', error);
    throw error;
  }
}

// FAQ CRUD OPERATIONS
export async function getFAQs(pageSize = 50, startCursor = null) {
  try {
    const queryOptions = {
      database_id: DATABASE_IDS.MODEL_FAQS,
      page_size: pageSize,
    };
    
    // Only add start_cursor if it's not null
    if (startCursor) {
      queryOptions.start_cursor = startCursor;
    }
    
    const response = await notion.databases.query(queryOptions);

    const faqs = response.results.map(page => ({
      id: page.id,
      category: getPlainText(page.properties.Category?.title),
      question: getPlainText(page.properties.Question?.rich_text),
      answer: getPlainText(page.properties.Answer?.rich_text),
      created_time: page.created_time,
      last_edited_time: page.last_edited_time,
    }));

    return {
      faqs,
      hasMore: response.has_more,
      nextCursor: response.next_cursor,
    };
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    throw error;
  }
}

export async function createFAQ(data) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: DATABASE_IDS.MODEL_FAQS },
      properties: {
        Category: {
          title: [{ type: 'text', text: { content: data.category || '' } }]
        },
        Question: {
          rich_text: createRichText(data.question)
        },
        Answer: {
          rich_text: createRichText(data.answer)
        },
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating FAQ:', error);
    throw error;
  }
}

export async function updateFAQ(pageId, data) {
  try {
    const properties = {};

    if (data.category !== undefined) {
      properties.Category = { title: [{ type: 'text', text: { content: data.category } }] };
    }
    if (data.question !== undefined) {
      properties.Question = { rich_text: createRichText(data.question) };
    }
    if (data.answer !== undefined) {
      properties.Answer = { rich_text: createRichText(data.answer) };
    }

    const response = await notion.pages.update({
      page_id: pageId,
      properties,
    });

    return response;
  } catch (error) {
    console.error('Error updating FAQ:', error);
    throw error;
  }
}

export async function deleteFAQ(pageId) {
  try {
    const response = await notion.pages.update({
      page_id: pageId,
      archived: true,
    });

    return response;
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    throw error;
  }
}

// OTHER MODELS CRUD OPERATIONS
export async function getOtherModels(pageSize = 50, startCursor = null) {
  try {
    const queryOptions = {
      database_id: DATABASE_IDS.OTHER_MODELS,
      page_size: pageSize,
    };
    
    // Only add start_cursor if it's not null
    if (startCursor) {
      queryOptions.start_cursor = startCursor;
    }
    
    const response = await notion.databases.query(queryOptions);

    const models = response.results.map(page => ({
      id: page.id,
      category: getPlainText(page.properties.Category?.title),
      name: getPlainText(page.properties.Name?.rich_text),
      feature: getPlainText(page.properties.Feature?.rich_text),
      imageLink: getPlainText(page.properties['Image Link']?.rich_text),
      created_time: page.created_time,
      last_edited_time: page.last_edited_time,
    }));

    return {
      models,
      hasMore: response.has_more,
      nextCursor: response.next_cursor,
    };
  } catch (error) {
    console.error('Error fetching other models:', error);
    throw error;
  }
}

export async function createOtherModel(data) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: DATABASE_IDS.OTHER_MODELS },
      properties: {
        Category: {
          title: [{ type: 'text', text: { content: data.category || '' } }]
        },
        Name: {
          rich_text: createRichText(data.name)
        },
        Feature: {
          rich_text: createRichText(data.feature)
        },
        'Image Link': {
          rich_text: createRichText(data.imageLink)
        },
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating other model:', error);
    throw error;
  }
}

export async function updateOtherModel(pageId, data) {
  try {
    const properties = {};

    if (data.category !== undefined) {
      properties.Category = { title: [{ type: 'text', text: { content: data.category } }] };
    }
    if (data.name !== undefined) {
      properties.Name = { rich_text: createRichText(data.name) };
    }
    if (data.feature !== undefined) {
      properties.Feature = { rich_text: createRichText(data.feature) };
    }
    if (data.imageLink !== undefined) {
      properties['Image Link'] = { rich_text: createRichText(data.imageLink) };
    }

    const response = await notion.pages.update({
      page_id: pageId,
      properties,
    });

    return response;
  } catch (error) {
    console.error('Error updating other model:', error);
    throw error;
  }
}

export async function deleteOtherModel(pageId) {
  try {
    const response = await notion.pages.update({
      page_id: pageId,
      archived: true,
    });

    return response;
  } catch (error) {
    console.error('Error deleting other model:', error);
    throw error;
  }
}