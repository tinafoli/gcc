# HTTPS Enforcement for Ghana Code Club Website

This document explains how HTTPS is enforced in the Ghana Code Club website to ensure secure communications between users and the server.

## Why HTTPS is Important

- **Security**: HTTPS encrypts all communications between a user's browser and the server, preventing man-in-the-middle attacks.
- **Privacy**: HTTPS ensures that user data remains private and cannot be intercepted or tampered with during transmission.
- **Integrity**: HTTPS verifies that the website's content hasn't been modified during transmission.
- **SEO**: Search engines prefer HTTPS websites and may rank them higher in search results.
- **Browser Requirements**: Modern browsers may show warnings for non-HTTPS websites, especially when forms are present.

## How HTTPS is Enforced in This Application

We've implemented multiple layers of HTTPS enforcement to ensure secure connections:

### 1. Server-side Proxy

The application includes a Next.js proxy (`src/proxy.ts`) that automatically redirects any HTTP requests to HTTPS:

```typescript
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
  
  return NextResponse.next();
}
```

### 2. Content Security Policy

We've added a Content Security Policy (CSP) in the root layout file (`src/app/layout.tsx`) with the `upgrade-insecure-requests` directive, which instructs the browser to upgrade HTTP requests to HTTPS:

```html
<meta
  httpEquiv="Content-Security-Policy"
  content="upgrade-insecure-requests"
/>
```

Additionally, we've set a comprehensive Content Security Policy in the metadata section:

```typescript
export const metadata: Metadata = {
  // ...other metadata
  other: {
    'Content-Security-Policy': 
      "default-src 'self' https: data:; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; " +
      "style-src 'self' 'unsafe-inline' https:; " +
      "img-src 'self' https: data:; " +
      "font-src 'self' https: data:; " +
      "connect-src 'self' https:; " +
      "frame-src 'self' https:; " +
      "upgrade-insecure-requests;",
  }
};
```

## Development with HTTPS

For local development, you can use HTTPS with the following steps:

1. **Install Required Tools**: 
   The project includes the necessary development dependencies (`local-ssl-proxy` and `mkcert`).

2. **Generate Certificates**:
   Run `npm run generate-certs` to create valid local SSL certificates.

3. **Start the Development Server with HTTPS**:
   Run `npm run dev:https` instead of `npm run dev`.

4. **Access the Site**:
   Visit `https://localhost:3001` in your browser to see the local HTTPS version.

## Production Deployment

In production, ensure that:

1. The hosting provider or server is configured to use HTTPS.
2. SSL certificates are properly set up for your domain.
3. HTTP to HTTPS redirection is enabled at the server level.
4. HSTS (HTTP Strict Transport Security) headers are set for enhanced security.

The proxy in this application provides an additional layer of security, but implementing HTTPS at the server level should be your primary approach in production.

## Testing HTTPS Enforcement

You can test HTTPS enforcement using:

1. Browser's developer tools to check for redirects
2. Online tools like [SSL Labs](https://www.ssllabs.com/ssltest/)
3. Manually trying to access the site via HTTP and verifying redirection to HTTPS

## Contact

If you encounter any security issues or have questions about HTTPS implementation, please contact the Ghana Code Club team at info@ghanacodeclub.org. 