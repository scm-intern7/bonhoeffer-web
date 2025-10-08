import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/admin-auth';
import { 
  getModelDetails, 
  createModelDetail, 
  updateModelDetail, 
  deleteModelDetail 
} from '@/lib/admin-notion';

// GET - Fetch all model details
async function handleGet(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSize = parseInt(searchParams.get('pageSize')) || 50;
    const startCursor = searchParams.get('cursor') || null;

    const result = await getModelDetails(pageSize, startCursor);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching model details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch model details' },
      { status: 500 }
    );
  }
}

// POST - Create new model detail
async function handlePost(request) {
  try {
    const data = await request.json();
    const result = await createModelDetail(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating model detail:', error);
    return NextResponse.json(
      { error: 'Failed to create model detail' },
      { status: 500 }
    );
  }
}

// PUT - Update model detail
async function handlePut(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Model ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();
    const result = await updateModelDetail(id, data);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating model detail:', error);
    return NextResponse.json(
      { error: 'Failed to update model detail' },
      { status: 500 }
    );
  }
}

// DELETE - Delete model detail
async function handleDelete(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Model ID is required' },
        { status: 400 }
      );
    }

    const result = await deleteModelDetail(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting model detail:', error);
    return NextResponse.json(
      { error: 'Failed to delete model detail' },
      { status: 500 }
    );
  }
}

export const GET = requireAuth(handleGet);
export const POST = requireAuth(handlePost);
export const PUT = requireAuth(handlePut);
export const DELETE = requireAuth(handleDelete);