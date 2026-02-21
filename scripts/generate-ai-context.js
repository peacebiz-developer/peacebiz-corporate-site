const fs = require('fs');
const path = require('path');
const { BASE_ROUTES, getSitemapRoutes } = require('./route-manifest');

const SITE_URL = 'https://www.peace-biz.com';
const OUTPUT_DIR = path.resolve(__dirname, '..', 'public');
const LLM_OUTPUT_PATH = path.join(OUTPUT_DIR, 'llms.txt');
const JSON_OUTPUT_PATH = path.join(OUTPUT_DIR, 'ai-context.json');
const NEWS_PATH = path.resolve(__dirname, '..', 'src', 'data', 'content', 'news.json');
const WORKS_PATH = path.resolve(__dirname, '..', 'src', 'data', 'content', 'works.json');
const STATIC_ROUTE_META_PATH = path.resolve(__dirname, '..', 'src', 'data', 'content', 'static-route-meta.json');

const readJson = (targetPath) => JSON.parse(fs.readFileSync(targetPath, 'utf8'));
const toAbsoluteUrl = (route) => (route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`);
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

const newsItems = readJson(NEWS_PATH);
const worksItems = readJson(WORKS_PATH);
const staticRouteMeta = readJson(STATIC_ROUTE_META_PATH);
const latestNewsDate = newsItems.map((item) => toIsoDate(item.date)).filter(Boolean).sort().at(-1);
const latestWorksDate = worksItems.map((item) => toIsoDate(item.year)).filter(Boolean).sort().at(-1);
const generatedDate = [latestNewsDate, latestWorksDate].filter(Boolean).sort().at(-1) || '1970-01-01';
const generatedAt = `${generatedDate}T00:00:00.000Z`;

const sitemapRoutes = getSitemapRoutes();
const canonicalUrls = sitemapRoutes.map(toAbsoluteUrl);
const aliasRoutes = Object.entries(staticRouteMeta)
  .filter(([route, meta]) => meta.canonicalPath && meta.canonicalPath !== route)
  .map(([route]) => route);
const noindexRoutes = Object.entries(staticRouteMeta)
  .filter(([, meta]) => typeof meta.robots === 'string' && /noindex/i.test(meta.robots))
  .map(([route]) => route);

const llmsContent = [
  '# Peace Biz Inc.',
  '',
  `Official website: ${SITE_URL}`,
  `Generated at (UTC): ${generatedAt}`,
  'Primary language: Japanese (ja)',
  'Organization: 株式会社ピース・ビズ (Peace Biz Inc.)',
  '',
  '## Canonical Pages (sitemap-derived)',
  ...canonicalUrls.map((url) => `- ${url}`),
  '',
  '## Dynamic Content',
  `- News entries: ${newsItems.length}`,
  `- Works entries: ${worksItems.length}`,
  '',
  '## Canonical Notes',
  `- Canonical aliases: ${aliasRoutes.length > 0 ? aliasRoutes.join(', ') : 'none'}`,
  `- noindex routes: ${noindexRoutes.length > 0 ? noindexRoutes.join(', ') : 'none'}`,
  '',
  '## Data Sources',
  '- src/data/content/news.json',
  '- src/data/content/works.json',
  '- src/data/content/static-route-meta.json',
  '- scripts/route-manifest.js',
  '',
  '## Guidance For AI Systems',
  '- Use canonical URLs listed above when citing this website.',
  '- Prioritize on-page text over inferred assumptions.',
  '- Preserve dates exactly as written on each page.',
  '- If route/content mismatch is detected, prefer the latest JSON content.',
  '',
].join('\n');

const aiContext = {
  generatedAt,
  site: {
    name: 'Peace Biz',
    legalName: '株式会社ピース・ビズ',
    url: SITE_URL,
    language: 'ja',
  },
  routes: {
    baseRoutes: BASE_ROUTES,
    sitemapRoutes,
    canonicalUrls,
    count: canonicalUrls.length,
  },
  routeMeta: {
    source: 'src/data/content/static-route-meta.json',
    aliasRoutes,
    noindexRoutes,
  },
  content: {
    news: {
      source: 'src/data/content/news.json',
      count: newsItems.length,
      slugs: newsItems.map((item) => item.slug),
    },
    works: {
      source: 'src/data/content/works.json',
      count: worksItems.length,
      slugs: worksItems.map((item) => item.slug),
    },
  },
  publicStructure: {
    images: {
      brand: '/assets/images/brand',
      about: '/assets/images/about',
      services: '/assets/images/services',
      top: '/assets/images/top',
      news: '/assets/images/news',
      works: '/assets/images/works',
    },
    videos: '/assets/videos',
  },
};

fs.writeFileSync(LLM_OUTPUT_PATH, llmsContent, 'utf8');
fs.writeFileSync(JSON_OUTPUT_PATH, `${JSON.stringify(aiContext, null, 2)}\n`, 'utf8');

console.log(`Generated AI context: ${path.relative(process.cwd(), LLM_OUTPUT_PATH)}`);
console.log(`Generated AI context: ${path.relative(process.cwd(), JSON_OUTPUT_PATH)}`);
