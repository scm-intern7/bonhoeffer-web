import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_SPARE_PARTS_DATABASE_ID;

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
            property: 'category',
            rich_text: {
              contains: search,
            },
          },
        ],
      };
    }

    const response = await notion.databases.query(queryOptions);

    const spareParts = response.results.map((item) => ({
      id: item.id,
      name: item.properties.name?.title?.[0]?.text?.content || '',
      category: item.properties.category?.rich_text?.[0]?.text?.content || '',
      partNumber: item.properties.partNumber?.rich_text?.[0]?.text?.content || '',
      price: item.properties.price?.number || 0,
      availability: item.properties.availability?.select?.name || '',
      description: item.properties.description?.rich_text?.[0]?.text?.content || '',
      imageUrl: item.properties.imageUrl?.url || '',
      compatibleModels: item.properties.compatibleModels?.multi_select?.map(model => model.name) || [],
      lastUpdated: item.last_edited_time,
    }));

    return NextResponse.json({
      spareParts,
      hasMore: response.has_more,
      nextCursor: response.next_cursor,
    });
  } catch (error) {
    console.error('Error fetching spare parts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spare parts' },
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
      category: {
        rich_text: [
          {
            text: {
              content: data.category || '',
            },
          },
        ],
      },
      partNumber: {
        rich_text: [
          {
            text: {
              content: data.partNumber || '',
            },
          },
        ],
      },
      price: {
        number: data.price || 0,
      },
      availability: {
        select: {
          name: data.availability || 'In Stock',
        },
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
    };

    if (data.imageUrl) {
      properties.imageUrl = {
        url: data.imageUrl,
      };
    }

    if (data.compatibleModels && Array.isArray(data.compatibleModels)) {
      properties.compatibleModels = {
        multi_select: data.compatibleModels.map(model => ({ name: model })),
      };
    }

    const response = await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties,
    });

    return NextResponse.json({ success: true, id: response.id });
  } catch (error) {
    console.error('Error creating spare part:', error);
    return NextResponse.json(
      { error: 'Failed to create spare part' },
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

    if (updateData.category !== undefined) {
      properties.category = {
        rich_text: [
          {
            text: {
              content: updateData.category,
            },
          },
        ],
      };
    }

    if (updateData.partNumber !== undefined) {
      properties.partNumber = {
        rich_text: [
          {
            text: {
              content: updateData.partNumber,
            },
          },
        ],
      };
    }

    if (updateData.price !== undefined) {
      properties.price = {
        number: updateData.price,
      };
    }

    if (updateData.availability !== undefined) {
      properties.availability = {
        select: {
          name: updateData.availability,
        },
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

    if (updateData.imageUrl !== undefined) {
      properties.imageUrl = {
        url: updateData.imageUrl,
      };
    }

    if (updateData.compatibleModels !== undefined) {
      properties.compatibleModels = {
        multi_select: updateData.compatibleModels.map(model => ({ name: model })),
      };
    }

    await notion.pages.update({
      page_id: id,
      properties,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating spare part:', error);
    return NextResponse.json(
      { error: 'Failed to update spare part' },
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
        { error: 'Spare part ID is required' },
        { status: 400 }
      );
    }

    await notion.pages.update({
      page_id: id,
      archived: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting spare part:', error);
    return NextResponse.json(
      { error: 'Failed to delete spare part' },
      { status: 500 }
    );
  }
}