import { getProductCategories } from '@/lib/notion';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = await getProductCategories();
    return NextResponse.json({ 
      success: true, 
      data: categories,
      count: categories.length 
    });
  } catch (error) {
    console.error('Error in product categories API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product categories' },
      { status: 500 }
    );
  }
}
