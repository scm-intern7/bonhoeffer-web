import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_PRODUCT_MODELS_DATABASE_ID;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page_size = parseInt(searchParams.get('page_size')) || 25;
    const start_cursor = searchParams.get('start_cursor');
    const search = searchParams.get('search') || '';

    const queryOptions = {
      database_id: DATABASE_ID,
      page_size,
    };

    if (start_cursor) {
      queryOptions.start_cursor = start_cursor;
    }

    if (search) {
      queryOptions.filter = {
        or: [
          {
            property: 'name',
            title: {
              contains: search,
            },
          },
          {
            property: 'modelCode',
            rich_text: {
              contains: search,
            },
          },
        ],
      };
    }

    const response = await notion.databases.query(queryOptions);

    const productModels = response.results.map((item) => ({
      id: item.id,
      name: item.properties.name?.title?.[0]?.text?.content || '',
      modelCode: item.properties.modelCode?.rich_text?.[0]?.text?.content || '',
      category: item.properties.category?.select?.name || '',
      subcategory: item.properties.subcategory?.select?.name || '',
      isActive: item.properties.isActive?.checkbox || false,
      priority: item.properties.priority?.number || 0,
      price: item.properties.price?.number || 0,
      discountPrice: item.properties.discountPrice?.number || null,
      availability: item.properties.availability?.select?.name || '',
      tags: item.properties.tags?.multi_select?.map(tag => tag.name) || [],
      shortDescription: item.properties.shortDescription?.rich_text?.[0]?.text?.content || '',
      fullDescription: item.properties.fullDescription?.rich_text?.[0]?.text?.content || '',
      specifications: item.properties.specifications?.rich_text?.[0]?.text?.content || '',
      features: item.properties.features?.rich_text?.[0]?.text?.content || '',
      images: item.properties.images?.files?.map(file => file.file?.url || file.external?.url) || [],
      thumbnailImage: item.properties.thumbnailImage?.url || '',
      metaTitle: item.properties.metaTitle?.rich_text?.[0]?.text?.content || '',
      metaDescription: item.properties.metaDescription?.rich_text?.[0]?.text?.content || '',
      slug: item.properties.slug?.rich_text?.[0]?.text?.content || '',
      lastUpdated: item.last_edited_time,
    }));

    return NextResponse.json({
      productModels,
      hasMore: response.has_more,
      nextCursor: response.next_cursor,
    });
  } catch (error) {
    console.error('Error fetching product models:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product models' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    const properties = {
      name: {
        title: [
          {
            text: {
              content: data.name || '',
            },
          },
        ],
      },
      modelCode: {
        rich_text: [
          {
            text: {
              content: data.modelCode || '',
            },
          },
        ],
      },
      isActive: {
        checkbox: data.isActive || false,
      },
      priority: {
        number: data.priority || 0,
      },
    };

    // Optional fields
    if (data.category) {
      properties.category = {
        select: {
          name: data.category,
        },
      };
    }

    if (data.subcategory) {
      properties.subcategory = {
        select: {
          name: data.subcategory,
        },
      };
    }

    if (data.price !== undefined) {
      properties.price = {
        number: data.price,
      };
    }

    if (data.discountPrice !== undefined && data.discountPrice !== null) {
      properties.discountPrice = {
        number: data.discountPrice,
      };
    }

    if (data.availability) {
      properties.availability = {
        select: {
          name: data.availability,
        },
      };
    }

    if (data.tags && Array.isArray(data.tags)) {
      properties.tags = {
        multi_select: data.tags.map(tag => ({ name: tag })),
      };
    }

    if (data.shortDescription) {
      properties.shortDescription = {
        rich_text: [
          {
            text: {
              content: data.shortDescription,
            },
          },
        ],
      };
    }

    if (data.fullDescription) {
      properties.fullDescription = {
        rich_text: [
          {
            text: {
              content: data.fullDescription,
            },
          },
        ],
      };
    }

    if (data.specifications) {
      properties.specifications = {
        rich_text: [
          {
            text: {
              content: data.specifications,
            },
          },
        ],
      };
    }

    if (data.features) {
      properties.features = {
        rich_text: [
          {
            text: {
              content: data.features,
            },
          },
        ],
      };
    }

    if (data.thumbnailImage) {
      properties.thumbnailImage = {
        url: data.thumbnailImage,
      };
    }

    if (data.metaTitle) {
      properties.metaTitle = {
        rich_text: [
          {
            text: {
              content: data.metaTitle,
            },
          },
        ],
      };
    }

    if (data.metaDescription) {
      properties.metaDescription = {
        rich_text: [
          {
            text: {
              content: data.metaDescription,
            },
          },
        ],
      };
    }

    if (data.slug) {
      properties.slug = {
        rich_text: [
          {
            text: {
              content: data.slug,
            },
          },
        ],
      };
    }

    const response = await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties,
    });

    return NextResponse.json({ success: true, id: response.id });
  } catch (error) {
    console.error('Error creating product model:', error);
    return NextResponse.json(
      { error: 'Failed to create product model' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    const properties = {};

    // Update properties based on provided data
    Object.keys(updateData).forEach(key => {
      const value = updateData[key];
      
      switch (key) {
        case 'name':
          if (value !== undefined) {
            properties.name = {
              title: [{ text: { content: value } }],
            };
          }
          break;
        case 'modelCode':
        case 'shortDescription':
        case 'fullDescription':
        case 'specifications':
        case 'features':
        case 'metaTitle':
        case 'metaDescription':
        case 'slug':
          if (value !== undefined) {
            properties[key] = {
              rich_text: [{ text: { content: value } }],
            };
          }
          break;
        case 'category':
        case 'subcategory':
        case 'availability':
          if (value !== undefined) {
            properties[key] = {
              select: { name: value },
            };
          }
          break;
        case 'tags':
          if (value !== undefined && Array.isArray(value)) {
            properties[key] = {
              multi_select: value.map(tag => ({ name: tag })),
            };
          }
          break;
        case 'isActive':
          if (value !== undefined) {
            properties[key] = {
              checkbox: value,
            };
          }
          break;
        case 'priority':
        case 'price':
        case 'discountPrice':
          if (value !== undefined) {
            properties[key] = {
              number: value,
            };
          }
          break;
        case 'thumbnailImage':
          if (value !== undefined) {
            properties[key] = {
              url: value,
            };
          }
          break;
      }
    });

    await notion.pages.update({
      page_id: id,
      properties,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating product model:', error);
    return NextResponse.json(
      { error: 'Failed to update product model' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product model ID is required' },
        { status: 400 }
      );
    }

    await notion.pages.update({
      page_id: id,
      archived: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product model:', error);
    return NextResponse.json(
      { error: 'Failed to delete product model' },
      { status: 500 }
    );
  }
}