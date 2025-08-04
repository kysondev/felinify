import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://clami.app';
  
  const routes = [
    '',
    '/auth/login',
    '/auth/signup',
    '/workspace/library',
    '/workspace/explore',
    '/workspace/settings',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}