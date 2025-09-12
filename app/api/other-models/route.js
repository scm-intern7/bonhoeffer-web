import { NextResponse } from 'next/server';
import { getOtherModels } from '@/lib/notion';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productSlug = searchParams.get('productSlug');
    const currentModel = searchParams.get('currentModel');

    if (!productSlug || !currentModel) {
      return NextResponse.json({ error: 'Product slug and current model are required' }, { status: 400 });
    }

    const otherModels = await getOtherModels(productSlug, currentModel);
    
    return NextResponse.json(otherModels);
  } catch (error) {
    console.error('Error in other-models API:', error);
    return NextResponse.json({ error: 'Failed to fetch other models' }, { status: 500 });
  }
}
