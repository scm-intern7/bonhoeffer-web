import { getSpecificModelDetails } from '@/lib/notion';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { slug, model } = await params;
    const modelDetails = await getSpecificModelDetails(slug, model);
    
    if (!modelDetails) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Model not found' 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: modelDetails,
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
