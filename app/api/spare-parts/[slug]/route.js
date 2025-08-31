import { getModelsByCategory } from '@/lib/notion';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const models = await getModelsByCategory(slug);
    
    return NextResponse.json({
      success: true,
      data: models,
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
