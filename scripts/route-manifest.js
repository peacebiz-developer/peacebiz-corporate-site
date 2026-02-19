const fs = require('fs');
const path = require('path');

const NEWS_PATH = path.resolve(__dirname, '..', 'src', 'data', 'content', 'news.json');
const WORKS_PATH = path.resolve(__dirname, '..', 'src', 'data', 'content', 'works.json');

const BASE_ROUTES = [
  '/',
  '/about',
  '/company',
  '/services',
  '/services/it-solution',
  '/services/eco-solution',
  '/services/office-solution',
  '/works',
  '/work',
  '/news',
  '/contact',
  '/recruit',
  '/privacy',
  '/sitepolicy',
  '/terms',
];

const readJson = (filePath) => {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
};

const unique = (list) => Array.from(new Set(list));

const getDynamicRoutes = () => {
  const newsItems = readJson(NEWS_PATH);
  const worksItems = readJson(WORKS_PATH);

  const newsRoutes = newsItems.map((item) => `/news/${item.slug}`);
  const worksRoutes = worksItems.flatMap((item) => [`/works/${item.slug}`, `/work/${item.slug}`]);
  return unique([...newsRoutes, ...worksRoutes]);
};

const getPrerenderRoutes = () => unique([...BASE_ROUTES, ...getDynamicRoutes()]);
const getSitemapRoutes = () =>
  unique([
    ...BASE_ROUTES.filter((route) => route !== '/work'),
    ...getDynamicRoutes().filter((route) => !route.startsWith('/work/')),
  ]);

module.exports = {
  BASE_ROUTES,
  getDynamicRoutes,
  getPrerenderRoutes,
  getSitemapRoutes,
};
