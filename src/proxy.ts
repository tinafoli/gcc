import { NextRequest, NextResponse } from 'next/server';

function normalizePath(input: string): string {
  let value = input.trim();
  if (!value) return '/secure-admin-gcc';
  if (!value.startsWith('/')) value = `/${value}`;
  if (value.length > 1 && value.endsWith('/')) value = value.slice(0, -1);
  return value.toLowerCase();
}

function getAdminPortalPath(): string {
  const normalized = normalizePath(process.env.ADMIN_PORTAL_PATH || '/secure-admin-gcc');
  if (normalized === '/admin' || normalized === '/blog-admin' || normalized.startsWith('/api/')) {
    return '/secure-admin-gcc';
  }
  return normalized;
}

function getRequestIp(request: NextRequest): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') || '';
}

function getAllowedIps(): Set<string> {
  const raw = process.env.ADMIN_ALLOWED_IPS || '';
  if (!raw.trim()) return new Set();
  return new Set(
    raw
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean),
  );
}

function isProtectedAdminPath(pathname: string, adminPortalPath: string): boolean {
  return (
    pathname === adminPortalPath ||
    pathname.startsWith(`${adminPortalPath}/`) ||
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname === '/blog-admin' ||
    pathname.startsWith('/blog-admin/') ||
    pathname === '/api/admin' ||
    pathname.startsWith('/api/admin/') ||
    pathname === '/api/blog-admin' ||
    pathname.startsWith('/api/blog-admin/')
  );
}

function isDashboardEnabled(): boolean {
  return (process.env.ADMIN_DASHBOARD_ENABLED || 'false').trim().toLowerCase() === 'true';
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase();
  const adminPortalPath = getAdminPortalPath();
  const dashboardEnabled = isDashboardEnabled();

  if (!dashboardEnabled && isProtectedAdminPath(pathname, adminPortalPath)) {
    if (pathname.startsWith('/api/admin/') || pathname.startsWith('/api/blog-admin/')) {
      return NextResponse.json({ error: 'Admin dashboard is temporarily disabled.' }, { status: 403 });
    }
    return new NextResponse('Not Found', { status: 404 });
  }

  // Optional IP allowlist for admin pages and admin APIs.
  const allowedIps = getAllowedIps();
  if (
    allowedIps.size > 0 &&
    request.nextUrl.hostname !== 'localhost' &&
    request.nextUrl.hostname !== '127.0.0.1' &&
    isProtectedAdminPath(pathname, adminPortalPath)
  ) {
    const requestIp = getRequestIp(request);
    if (!requestIp || !allowedIps.has(requestIp)) {
      if (pathname.startsWith('/api/admin/')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      return new NextResponse('Not Found', { status: 404 });
    }
  }

  // Hidden admin portal path rewrites to /admin internally.
  if (pathname === adminPortalPath || pathname.startsWith(`${adminPortalPath}/`)) {
    const url = request.nextUrl.clone();
    const suffix = pathname.slice(adminPortalPath.length);
    url.pathname = `/admin${suffix}`;
    return NextResponse.rewrite(url);
  }

  // Block guessed direct admin routes.
  if (
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname === '/blog-admin' ||
    pathname.startsWith('/blog-admin/')
  ) {
    return new NextResponse('Not Found', { status: 404 });
  }

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
  
  // Redirect /report to /reports
  if (pathname === '/report' || pathname === '/report/') {
    const url = request.nextUrl.clone();
    url.pathname = '/reports';
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



