import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Add document to 'career-applications' collection
    const docRef = await addDoc(collection(db, 'career-applications'), {
      ...data,
      createdAt: new Date().toISOString()
    });
    
    console.log('Document written with ID: ', docRef.id);
    
    return Response.json({ 
      success: true, 
      id: docRef.id,
      message: 'Application submitted successfully to Firebase' 
    });
    
  } catch (error) {
    console.error('Error adding document: ', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
