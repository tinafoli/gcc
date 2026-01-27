import type { Metadata, Viewport } from "next";
import { Inter, Delius } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import { CartProvider } from '@/context/CartContext';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import Script from 'next/script';

// Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-delius',
});


export const metadata: Metadata = {
  title: {
    default: "Ghana Code Club",
    template: "%s | Ghana Code Club"
  },
  description: "Empowering Ghana's youth through coding education. We provide interactive computer science training for students aged 5-17, teacher training, and community tech initiatives.",
  keywords: ["Ghana Code Club", "coding education", "computer science", "Ghana tech education", "coding for kids", "STEM education", "digital skills", "tech training"],
  authors: [{ name: "Ghana Code Club" }],
  creator: "Ghana Code Club",
  publisher: "Ghana Code Club",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ghanacodeclub.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Ghana Code Club",
    description: "Empowering Ghana's youth through coding education. We provide interactive computer science training for students aged 5-17, teacher training, and community tech initiatives.",
    url: 'https://ghanacodeclub.org',
    siteName: 'Ghana Code Club',
    images: [
      {
        url: '/images/gcc-logo.png',
        width: 800,
        height: 600,
        alt: 'Ghana Code Club Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ghana Code Club",
    description: "Empowering Ghana's youth through coding education. We provide interactive computer science training for students aged 5-17, teacher training, and community tech initiatives.",
    images: ['/images/gcc-logo.png'],
    creator: '@ghanacodeclub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/images/gcc-logo.png', type: 'image/png', sizes: '16x16' },
      { url: '/images/gcc-logo.png', type: 'image/png', sizes: '32x32' },
      { url: '/images/gcc-logo.png', type: 'image/png', sizes: '48x48' },
      { url: '/images/gcc-logo.png', type: 'image/png', sizes: '192x192' }
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/images/gcc-logo.png', sizes: '180x180' }
    ],
    other: [
      { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/images/gcc-logo.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/images/gcc-logo.png' },
      { rel: 'icon', type: 'image/png', sizes: '48x48', url: '/images/gcc-logo.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', url: '/images/gcc-logo.png' },
      { rel: 'mask-icon', url: '/images/gcc-logo.png', color: '#ff0000' }
    ]
  },
  manifest: '/manifest.json',
  other: {
    'Content-Security-Policy': 
      "default-src 'self' https: data:; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; " +
      "style-src 'self' 'unsafe-inline' https:; " +
      "img-src 'self' https: data:; " +
      "font-src 'self' https: data:; " +
      "connect-src 'self' https:; " +
      "frame-src 'self' blob: https:; " +
      "object-src 'self' blob: https:; " +
      "media-src 'self' blob: https:; " +
      "upgrade-insecure-requests;",
  }
};

// Create separate viewport export for themeColor
export const viewport: Viewport = {
  themeColor: '#22C55E',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${delius.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/gcc-logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/gcc-logo.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/images/gcc-logo.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/gcc-logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/gcc-logo.png" />
        <meta name="msapplication-TileImage" content="/images/gcc-logo.png" />
        <meta name="msapplication-TileColor" content="#ff0000" />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        {/* Facebook SDK */}
        <div id="fb-root"></div>
        <Script
          id="facebook-sdk"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Suppress third-party tracking errors (non-critical)
                if (typeof window !== 'undefined') {
                  const originalError = window.onerror;
                  window.addEventListener('error', function(e) {
                    const message = e.message || '';
                    const source = e.filename || '';
                    // Suppress Facebook tracking endpoint 503 errors
                    if ((message.includes('track') || source.includes('facebook')) && 
                        (message.includes('503') || message.includes('Failed to load'))) {
                      e.preventDefault();
                      e.stopPropagation();
                      return true;
                    }
                    // Suppress TikTok CORS credential errors (browser-settings endpoint)
                    if (message.includes('CORS') && 
                        (message.includes('browser-settings') || message.includes('tiktok') || 
                         message.includes('Access-Control-Allow-Credentials'))) {
                      e.preventDefault();
                      e.stopPropagation();
                      return true;
                    }
                  }, true);
                  
                  // Suppress resource loading errors for Facebook tracking
                  window.addEventListener('unhandledrejection', function(e) {
                    const reason = e.reason?.message || String(e.reason || '');
                    if (reason.includes('track') && reason.includes('503')) {
                      e.preventDefault();
                    }
                    // Suppress TikTok CORS errors
                    if (reason.includes('CORS') && 
                        (reason.includes('browser-settings') || reason.includes('tiktok'))) {
                      e.preventDefault();
                    }
                  });
                  
                  // Suppress console errors for TikTok CORS (if console.error is called)
                  const originalConsoleError = console.error;
                  console.error = function(...args) {
                    const message = args.join(' ');
                    // Suppress TikTok CORS credential warnings
                    if (message.includes('CORS') && 
                        (message.includes('browser-settings') || message.includes('tiktok') || 
                         message.includes('Access-Control-Allow-Credentials'))) {
                      return;
                    }
                    originalConsoleError.apply(console, args);
                  };
                  
                  // Suppress console warnings for deprecated APIs (Shared Storage, etc.)
                  const originalConsoleWarn = console.warn;
                  console.warn = function(...args) {
                    const message = args.join(' ');
                    // Suppress Shared Storage API deprecation warnings (from third-party scripts)
                    if (message.includes('Shared Storage API') || 
                        message.includes('webmssdk') ||
                        (message.includes('deprecated') && message.includes('Storage'))) {
                      return;
                    }
                    originalConsoleWarn.apply(console, args);
                  };
                }
                
                window.fbAsyncInit = function() {
                  try {
                    if (typeof FB !== 'undefined') {
                      FB.init({
                        appId: '${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}',
                        xfbml: true,
                        version: 'v17.0',
                        status: false,
                        cookie: false
                      });
                    }
                  } catch (e) {
                    // Silently handle initialization errors
                  }
                };
                
                (function(d, s, id) {
                  var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) return;
                  js = d.createElement(s); js.id = id;
                  js.src = "https://connect.facebook.net/en_US/sdk.js";
                  js.onerror = function() {
                    // Silently handle script loading errors
                  };
                  fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
              })();
            `
          }}
        />
        {/* Facebook Customer Chat */}
        <div
          className="fb-customerchat"
          data-attribution="setup_tool"
          data-page-id={process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID}
        ></div>
        <CartProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
