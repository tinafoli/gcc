import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/private/', '/api/', '/workbook-launch/', '/order-workbook/', '/blog-admin/'],
    },
    sitemap: 'https://ghanacodeclub.org/sitemap.xml',
  };
} 