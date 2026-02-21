const fs = require('fs');
const path = require('path');
const { getSitemapRoutes } = require('./route-manifest');

const SITE_URL = 'https://www.peace-biz.com';
const OUTPUT_PATH = path.resolve(__dirname, '..', 'public', 'sitemap.xml');
const NEWS_PATH = path.resolve(__dirname, '..', 'src', 'data', 'content', 'news.json');
const WORKS_PATH = path.resolve(__dirname, '..', 'src', 'data', 'content', 'works.json');

const readJson = (targetPath) => JSON.parse(fs.readFileSync(targetPath, 'utf8'));
const toIsoDate = (value) => {
  const parts = String(value || '').split('.');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }
  if (/^\d{4}$/.test(String(value || ''))) {
    return `${value}-01-01`;
  }
  return '';
};

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

const newsItems = readJson(NEWS_PATH);
const worksItems = readJson(WORKS_PATH);
const latestContentDate =
  [
    ...newsItems.map((item) => toIsoDate(item.date)).filter(Boolean),
    ...worksItems.map((item) => toIsoDate(item.year)).filter(Boolean),
  ].sort().at(-1) || '1970-01-01';

const newsLastmodBySlug = new Map(
  newsItems.map((item) => [item.slug, toIsoDate(item.date) || latestContentDate])
);
const worksLastmodBySlug = new Map(
  worksItems.map((item) => [item.slug, toIsoDate(item.year) || latestContentDate])
);
const routeLastmod = (route) => {
  if (route.startsWith('/news/')) {
    return newsLastmodBySlug.get(route.slice('/news/'.length)) || latestContentDate;
  }
  if (route.startsWith('/works/')) {
    return worksLastmodBySlug.get(route.slice('/works/'.length)) || latestContentDate;
  }
  return latestContentDate;
};

const routes = getSitemapRoutes();
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => {
    return [
      '  <url>',
      `    <loc>${toAbsoluteUrl(route)}</loc>`,
      `    <lastmod>${routeLastmod(route)}</lastmod>`,
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
