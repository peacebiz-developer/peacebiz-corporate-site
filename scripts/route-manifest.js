const fs = require('fs');
const path = require('path');

const NEWS_PATH = path.resolve(__dirname, '..', 'src', 'data', 'content', 'news.json');
const WORKS_PATH = path.resolve(__dirname, '..', 'src', 'data', 'content', 'works.json');
const STATIC_ROUTE_META_PATH = path.resolve(__dirname, '..', 'src', 'data', 'content', 'static-route-meta.json');

const readJson = (filePath) => {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
};

const unique = (list) => Array.from(new Set(list));
const staticRouteMeta = readJson(STATIC_ROUTE_META_PATH);
const staticRouteEntries = Object.entries(staticRouteMeta);

const BASE_ROUTES = staticRouteEntries
  .filter(([, meta]) => meta.includeInPrerender !== false)
  .map(([route]) => route);

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
    ...staticRouteEntries
      .filter(([, meta]) => meta.includeInSitemap === true)
      .map(([route]) => route),
    ...getDynamicRoutes().filter((route) => !route.startsWith('/work/')),
  ]);

module.exports = {
  BASE_ROUTES,
  getDynamicRoutes,
  getPrerenderRoutes,
  getSitemapRoutes,
};
