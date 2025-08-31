import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function GET() {
  try {
    // First, let's get the database schema
    const database = await notion.databases.retrieve({
      database_id: NOTION_DATABASE_ID,
    });

    // Then get a few sample records
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      page_size: 3, // Just get 3 records for testing
    });

    return NextResponse.json({
      success: true,
      database_schema: database.properties,
      sample_records: response.results.map(page => ({
        id: page.id,
        properties: page.properties,
      })),
      total_records: response.results.length,
    });
  } catch (error) {
    console.error('Notion API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        details: error.body || 'No additional details'
      },
      { status: 500 }
    );
  }
}
