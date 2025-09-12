import { NextResponse } from 'next/server';
import { getModelDetails } from '@/lib/notion';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productSlug = searchParams.get('productSlug');
    const modelName = searchParams.get('modelName');

    if (!productSlug || !modelName) {
      return NextResponse.json({ error: 'Product slug and model name are required' }, { status: 400 });
    }

    const modelDetails = await getModelDetails(productSlug, modelName);
    
    return NextResponse.json(modelDetails || {});
  } catch (error) {
    console.error('Error in model-details API:', error);
    return NextResponse.json({ error: 'Failed to fetch model details' }, { status: 500 });
  }
}
