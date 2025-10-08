import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_CATEGORIES_DATABASE_ID;

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
            property: 'description',
            rich_text: {
              contains: search,
            },
          },
        ],
      };
    }

    const response = await notion.databases.query(queryOptions);

    const categories = response.results.map((item) => ({
      id: item.id,
      name: item.properties.name?.title?.[0]?.text?.content || '',
      description: item.properties.description?.rich_text?.[0]?.text?.content || '',
      slug: item.properties.slug?.rich_text?.[0]?.text?.content || '',
      isActive: item.properties.isActive?.checkbox || false,
      sortOrder: item.properties.sortOrder?.number || 0,
      parentCategory: item.properties.parentCategory?.relation?.[0]?.id || null,
      imageUrl: item.properties.imageUrl?.url || '',
      metaTitle: item.properties.metaTitle?.rich_text?.[0]?.text?.content || '',
      metaDescription: item.properties.metaDescription?.rich_text?.[0]?.text?.content || '',
      lastUpdated: item.last_edited_time,
    }));

    return NextResponse.json({
      categories,
      hasMore: response.has_more,
      nextCursor: response.next_cursor,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
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
      description: {
        rich_text: [
          {
            text: {
              content: data.description || '',
            },
          },
        ],
      },
      slug: {
        rich_text: [
          {
            text: {
              content: data.slug || '',
            },
          },
        ],
      },
      isActive: {
        checkbox: data.isActive || false,
      },
      sortOrder: {
        number: data.sortOrder || 0,
      },
    };

    if (data.imageUrl) {
      properties.imageUrl = {
        url: data.imageUrl,
      };
    }

    if (data.parentCategory) {
      properties.parentCategory = {
        relation: [{ id: data.parentCategory }],
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

    const response = await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties,
    });

    return NextResponse.json({ success: true, id: response.id });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    const properties = {};

    if (updateData.name !== undefined) {
      properties.name = {
        title: [
          {
            text: {
              content: updateData.name,
            },
          },
        ],
      };
    }

    if (updateData.description !== undefined) {
      properties.description = {
        rich_text: [
          {
            text: {
              content: updateData.description,
            },
          },
        ],
      };
    }

    if (updateData.slug !== undefined) {
      properties.slug = {
        rich_text: [
          {
            text: {
              content: updateData.slug,
            },
          },
        ],
      };
    }

    if (updateData.isActive !== undefined) {
      properties.isActive = {
        checkbox: updateData.isActive,
      };
    }

    if (updateData.sortOrder !== undefined) {
      properties.sortOrder = {
        number: updateData.sortOrder,
      };
    }

    if (updateData.imageUrl !== undefined) {
      properties.imageUrl = {
        url: updateData.imageUrl,
      };
    }

    if (updateData.parentCategory !== undefined) {
      properties.parentCategory = {
        relation: updateData.parentCategory ? [{ id: updateData.parentCategory }] : [],
      };
    }

    if (updateData.metaTitle !== undefined) {
      properties.metaTitle = {
        rich_text: [
          {
            text: {
              content: updateData.metaTitle,
            },
          },
        ],
      };
    }

    if (updateData.metaDescription !== undefined) {
      properties.metaDescription = {
        rich_text: [
          {
            text: {
              content: updateData.metaDescription,
            },
          },
        ],
      };
    }

    await notion.pages.update({
      page_id: id,
      properties,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
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
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    await notion.pages.update({
      page_id: id,
      archived: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}