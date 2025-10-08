import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/admin-auth';
import { 
  getOtherModels, 
  createOtherModel, 
  updateOtherModel, 
  deleteOtherModel 
} from '@/lib/admin-notion';

// GET - Fetch all other models
async function handleGet(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSize = parseInt(searchParams.get('pageSize')) || 50;
    const startCursor = searchParams.get('cursor') || null;

    const result = await getOtherModels(pageSize, startCursor);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching other models:', error);
    return NextResponse.json(
      { error: 'Failed to fetch other models' },
      { status: 500 }
    );
  }
}

// POST - Create new other model
async function handlePost(request) {
  try {
    const data = await request.json();
    const result = await createOtherModel(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating other model:', error);
    return NextResponse.json(
      { error: 'Failed to create other model' },
      { status: 500 }
    );
  }
}

// PUT - Update other model
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
    const result = await updateOtherModel(id, data);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating other model:', error);
    return NextResponse.json(
      { error: 'Failed to update other model' },
      { status: 500 }
    );
  }
}

// DELETE - Delete other model
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

    const result = await deleteOtherModel(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting other model:', error);
    return NextResponse.json(
      { error: 'Failed to delete other model' },
      { status: 500 }
    );
  }
}

export const GET = requireAuth(handleGet);
export const POST = requireAuth(handlePost);
export const PUT = requireAuth(handlePut);
export const DELETE = requireAuth(handleDelete);