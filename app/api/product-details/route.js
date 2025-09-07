import { NextResponse } from 'next/server';
import { getProductDetails } from '@/lib/notion';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productSlug = searchParams.get('slug');
    
    if (!productSlug) {
      return NextResponse.json({ error: 'Product slug is required' }, { status: 400 });
    }

    const details = await getProductDetails(productSlug);
    return NextResponse.json(details);
  } catch (error) {
    console.error('Error in product-details API:', error);
    return NextResponse.json({ error: 'Failed to fetch product details' }, { status: 500 });
  }
}
