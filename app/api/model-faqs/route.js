import { NextResponse } from 'next/server';
import { getModelFAQs } from '@/lib/notion';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productSlug = searchParams.get('productSlug');

    if (!productSlug) {
      return NextResponse.json({ error: 'Product slug is required' }, { status: 400 });
    }

    const faqs = await getModelFAQs(productSlug);
    
    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Error in model-faqs API:', error);
    return NextResponse.json({ error: 'Failed to fetch model FAQs' }, { status: 500 });
  }
}
