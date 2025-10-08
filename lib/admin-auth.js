// Admin authentication utilities
import { NextResponse } from 'next/server';

export function isValidAdmin(username, password) {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  return username === adminUsername && password === adminPassword;
}

export function createAuthResponse() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Panel"',
    },
  });
}

export function checkBasicAuth(request) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return { isValid: false };
  }
  
  try {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    
    return {
      isValid: isValidAdmin(username, password),
      username,
    };
  } catch (error) {
    return { isValid: false };
  }
}

export function requireAuth(handler) {
  return async (request, context) => {
    const auth = checkBasicAuth(request);
    
    if (!auth.isValid) {
      return createAuthResponse();
    }
    
    return handler(request, context);
  };
}