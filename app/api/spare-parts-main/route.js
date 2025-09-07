import { getSparePartsAndAccessories } from '@/lib/notion';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await getSparePartsAndAccessories();
    
    return NextResponse.json({
      success: true,
      data: items,
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
