import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/admin-auth';
import { 
  getFAQs, 
  createFAQ, 
  updateFAQ, 
  deleteFAQ 
} from '@/lib/admin-notion';

// GET - Fetch all FAQs
async function handleGet(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSize = parseInt(searchParams.get('pageSize')) || 50;
    const startCursor = searchParams.get('cursor') || null;

    const result = await getFAQs(pageSize, startCursor);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}

// POST - Create new FAQ
async function handlePost(request) {
  try {
    const data = await request.json();
    const result = await createFAQ(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}

// PUT - Update FAQ
async function handlePut(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'FAQ ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();
    const result = await updateFAQ(id, data);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to update FAQ' },
      { status: 500 }
    );
  }
}

// DELETE - Delete FAQ
async function handleDelete(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'FAQ ID is required' },
        { status: 400 }
      );
    }

    const result = await deleteFAQ(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to delete FAQ' },
      { status: 500 }
    );
  }
}

export const GET = requireAuth(handleGet);
export const POST = requireAuth(handlePost);
export const PUT = requireAuth(handlePut);
export const DELETE = requireAuth(handleDelete);