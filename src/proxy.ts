import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
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

  // Redirect common URL variations to canonical URLs
  const pathname = request.nextUrl.pathname.toLowerCase();
  
  // Redirect /contact-us and /contact-us/ to /contact
  if (pathname === '/contact-us' || pathname === '/contact-us/') {
    const url = request.nextUrl.clone();
    url.pathname = '/contact';
    // 301 is a permanent redirect (better for SEO)
    return NextResponse.redirect(url, 301);
  }
  
  // Redirect /about-us and /about-us/ to /about
  if (pathname === '/about-us' || pathname === '/about-us/') {
    const url = request.nextUrl.clone();
    url.pathname = '/about';
    // 301 is a permanent redirect (better for SEO)
    return NextResponse.redirect(url, 301);
  }
  
  // Redirect /team, /team/, /our-team, /our-team/ to /about/team (which redirects to /about#team)
  if (pathname === '/team' || pathname === '/team/' || 
      pathname === '/our-team' || pathname === '/our-team/') {
    const url = request.nextUrl.clone();
    url.pathname = '/about/team';
    // 301 is a permanent redirect (better for SEO)
    return NextResponse.redirect(url, 301);
  }
  
  // Redirect /board, /board/, /board-members, /board-members/, /our-board, /our-board/ to /about/board (which redirects to /about#board)
  if (pathname === '/board' || pathname === '/board/' || 
      pathname === '/board-members' || pathname === '/board-members/' ||
      pathname === '/our-board' || pathname === '/our-board/' ||
      pathname === '/our-board-members' || pathname === '/our-board-members/') {
    const url = request.nextUrl.clone();
    url.pathname = '/about/board';
    // 301 is a permanent redirect (better for SEO)
    return NextResponse.redirect(url, 301);
  }
  
  // Redirect girls in STEM/tech related searches to the program page
  if (pathname === '/girls-in-stem' || pathname === '/girls-in-stem/' ||
      pathname === '/girls-in-tech' || pathname === '/girls-in-tech/' ||
      pathname === '/tech-girls' || pathname === '/tech-girls/') {
    const url = request.nextUrl.clone();
    url.pathname = '/programs/100-girls-in-stem';
    // 301 is a permanent redirect (better for SEO)
    return NextResponse.redirect(url, 301);
  }
  
  return NextResponse.next();
}

// Apply this proxy to all routes except static files and API routes
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


