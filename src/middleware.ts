import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is secure (HTTPS) or localhost
  const isSecure = request.headers.get('x-forwarded-proto') === 'https' || 
                   request.nextUrl.protocol === 'https:' ||
                   request.nextUrl.hostname === 'localhost';

  // If the request is not secure, redirect to HTTPS
  if (!isSecure) {
    // Create the HTTPS URL to redirect to
    const secureUrl = request.nextUrl.clone();
    secureUrl.protocol = 'https:';
    
    // 308 is a permanent redirect that preserves the request method
    return NextResponse.redirect(secureUrl, 308);
  }
  
  return NextResponse.next();
}

// Apply this middleware to all routes except static files and API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (project images)
     * - public/ (public assets)
     */
    '/((?!_next/static|_next/image|favicon.ico|images/|public/).*)',
  ],
}; 