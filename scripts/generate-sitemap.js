const fs = require('fs');
const path = require('path');
const { getSitemapRoutes } = require('./route-manifest');

const SITE_URL = 'https://www.peace-biz.com';
const TODAY = new Date().toISOString().slice(0, 10);
const OUTPUT_PATH = path.resolve(__dirname, '..', 'public', 'sitemap.xml');

const routePriority = (route) => {
  if (route === '/') return '1.0';
  if (route.startsWith('/services')) return '0.9';
  if (route.startsWith('/news')) return '0.8';
  if (route.startsWith('/works')) return '0.8';
  if (route === '/contact') return '0.7';
  if (route === '/privacy' || route === '/sitepolicy' || route === '/terms') return '0.5';
  return '0.8';
};

const routeChangeFreq = (route) => {
  if (route === '/') return 'weekly';
  if (route.startsWith('/news')) return 'daily';
  if (route.startsWith('/works')) return 'weekly';
  if (route === '/privacy' || route === '/sitepolicy' || route === '/terms') return 'yearly';
  return 'weekly';
};

const toAbsoluteUrl = (route) => (route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`);

const routes = getSitemapRoutes();
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => {
    return [
      '  <url>',
      `    <loc>${toAbsoluteUrl(route)}</loc>`,
      `    <lastmod>${TODAY}</lastmod>`,
      `    <changefreq>${routeChangeFreq(route)}</changefreq>`,
      `    <priority>${routePriority(route)}</priority>`,
      '  </url>',
    ].join('\n');
  }),
  '</urlset>',
  '',
].join('\n');

fs.writeFileSync(OUTPUT_PATH, xml);
console.log(`Generated sitemap with ${routes.length} routes.`);
