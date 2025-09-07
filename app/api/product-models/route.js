import { NextResponse } from 'next/server';
import { getProductModels } from '@/lib/notion';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productSlug = searchParams.get('slug');
    
    if (!productSlug) {
      return NextResponse.json({ error: 'Product slug is required' }, { status: 400 });
    }

    const models = await getProductModels(productSlug);
    console.log('Product models result:', models);
    console.log('Searched for slug:', productSlug);
    return NextResponse.json(models);
  } catch (error) {
    console.error('Error in product-models API:', error);
    return NextResponse.json({ error: 'Failed to fetch product models' }, { status: 500 });
  }
}
