import { getSparePartsCategories } from '@/lib/notion';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = await getSparePartsCategories();
    
    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}
