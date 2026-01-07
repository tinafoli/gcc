import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Delius&display=swap" rel="stylesheet" />
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
              window.fbAsyncInit = function() {
                FB.init({
                  appId: '${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}',
                  xfbml: true,
                  version: 'v17.0'
                });
              };
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
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
