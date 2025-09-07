import { NextResponse } from 'next/server';
import { getProductInfo } from '@/lib/notion';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productSlug = searchParams.get('slug');
    
    if (!productSlug) {
      return NextResponse.json({ error: 'Product slug is required' }, { status: 400 });
    }

    const productInfo = await getProductInfo(productSlug);
    return NextResponse.json(productInfo);
  } catch (error) {
    console.error('Error in product-info API:', error);
    return NextResponse.json({ error: 'Failed to fetch product info' }, { status: 500 });
  }
}
