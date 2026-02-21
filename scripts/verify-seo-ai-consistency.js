const fs = require('fs');
const path = require('path');
const { BASE_ROUTES, getSitemapRoutes } = require('./route-manifest');

const SITE_URL = 'https://www.peace-biz.com';
const STATIC_ROUTE_META_PATH = path.resolve(__dirname, '..', 'src', 'data', 'content', 'static-route-meta.json');
const APP_PATH = path.resolve(__dirname, '..', 'src', 'App.tsx');
const ROUTES_CONFIG_PATH = path.resolve(__dirname, '..', 'src', 'config', 'routes.ts');
const SITEMAP_PATH = path.resolve(__dirname, '..', 'public', 'sitemap.xml');
const LLM_PATH = path.resolve(__dirname, '..', 'public', 'llms.txt');
const AI_CONTEXT_PATH = path.resolve(__dirname, '..', 'public', 'ai-context.json');
const ROBOTS_PATH = path.resolve(__dirname, '..', 'public', 'robots.txt');

const readText = (targetPath) => fs.readFileSync(targetPath, 'utf8');
const readJson = (targetPath) => JSON.parse(readText(targetPath));
const unique = (list) => Array.from(new Set(list));
const normalizeRoute = (route) => (route === '/' ? '/' : route.replace(/\/+$/, ''));
const toAbsoluteUrl = (route) => (route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`);

const compareSets = (label, expected, actual, failures) => {
  const expectedSet = new Set(expected);
  const actualSet = new Set(actual);
  const missing = expected.filter((item) => !actualSet.has(item));
  const extra = actual.filter((item) => !expectedSet.has(item));

  if (missing.length > 0 || extra.length > 0) {
    failures.push(
      `${label} mismatch\n  missing: ${missing.length ? missing.join(', ') : 'none'}\n  extra: ${
        extra.length ? extra.join(', ') : 'none'
      }`
    );
  }
};

const extractRoutesConfig = (routesConfigSource) => {
  const routes = {};
  const pairRegex = /^\s*([A-Za-z0-9_]+):\s*'([^']+)'/gm;
  let match = pairRegex.exec(routesConfigSource);
  while (match) {
    routes[match[1]] = match[2];
    match = pairRegex.exec(routesConfigSource);
  }
  return routes;
};

const extractAppRoutes = (appSource, routesConfig, failures) => {
  const routes = [];

  const literalRouteRegex = /<Route\s+path="([^"]+)"/g;
  let match = literalRouteRegex.exec(appSource);
  while (match) {
    routes.push(match[1]);
    match = literalRouteRegex.exec(appSource);
  }

  const constantRouteRegex = /<Route\s+path=\{ROUTES\.([A-Za-z0-9_]+)\}/g;
  match = constantRouteRegex.exec(appSource);
  while (match) {
    const routeKey = match[1];
    const routePath = routesConfig[routeKey];
    if (!routePath) {
      failures.push(`Unknown ROUTES key used in App.tsx: ${routeKey}`);
    } else {
      routes.push(routePath);
    }
    match = constantRouteRegex.exec(appSource);
  }

  return unique(routes);
};

const extractSitemapRoutes = (sitemapXml) => {
  const locRegex = /<loc>(.*?)<\/loc>/g;
  const routes = [];
  let match = locRegex.exec(sitemapXml);
  while (match) {
    const url = match[1];
    if (!url.startsWith(SITE_URL)) {
      routes.push(url);
    } else {
      const pathname = url.slice(SITE_URL.length) || '/';
      routes.push(normalizeRoute(pathname || '/'));
    }
    match = locRegex.exec(sitemapXml);
  }
  return unique(routes);
};

const extractLlmsCanonicalUrls = (llmsText) =>
  unique(
    llmsText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('- https://'))
      .map((line) => line.replace(/^- /, ''))
  );

const verify = () => {
  const failures = [];

  const staticRouteMeta = readJson(STATIC_ROUTE_META_PATH);
  const routesConfig = extractRoutesConfig(readText(ROUTES_CONFIG_PATH));
  const staticEntries = Object.entries(staticRouteMeta);
  const staticRoutes = staticEntries.map(([route]) => route);

  const staticPrerenderRoutes = staticEntries
    .filter(([, meta]) => meta.includeInPrerender !== false)
    .map(([route]) => route);
  const staticSitemapRoutes = staticEntries
    .filter(([, meta]) => meta.includeInSitemap === true)
    .map(([route]) => route);

  if (staticRoutes.length === 0) {
    failures.push('static-route-meta.json must define at least one route.');
  }

  for (const [route, meta] of staticEntries) {
    if (!route.startsWith('/')) {
      failures.push(`Route key must start with "/": ${route}`);
    }
    if (!meta.title || !meta.description || !meta.canonicalPath) {
      failures.push(`Route meta is incomplete: ${route}`);
    }
    if (!meta.canonicalPath.startsWith('/')) {
      failures.push(`canonicalPath must start with "/": ${route} -> ${meta.canonicalPath}`);
    }
    if (
      typeof meta.ogImagePath === 'string' &&
      !meta.ogImagePath.startsWith('/') &&
      !/^https?:\/\//.test(meta.ogImagePath)
    ) {
      failures.push(`ogImagePath must start with "/" or "http(s)://": ${route} -> ${meta.ogImagePath}`);
    }
    if (meta.includeInSitemap === true && typeof meta.robots === 'string' && /noindex/i.test(meta.robots)) {
      failures.push(`Sitemap route cannot be noindex: ${route}`);
    }
    if (meta.includeInSitemap === true && normalizeRoute(meta.canonicalPath) !== normalizeRoute(route)) {
      failures.push(`Sitemap route must be self-canonical: ${route} -> ${meta.canonicalPath}`);
    }
  }

  compareSets('BASE_ROUTES', unique(staticPrerenderRoutes), unique(BASE_ROUTES), failures);

  const expectedSitemapRoutes = getSitemapRoutes().map(normalizeRoute);
  const expectedCanonicalUrls = expectedSitemapRoutes.map(toAbsoluteUrl);

  compareSets(
    'Sitemap static routes and manifest static routes',
    unique(staticSitemapRoutes),
    unique(BASE_ROUTES.filter((route) => staticRouteMeta[route]?.includeInSitemap === true)),
    failures
  );

  const appRoutes = extractAppRoutes(readText(APP_PATH), routesConfig, failures);
  compareSets('App static routes', unique(staticRoutes), unique(appRoutes.filter((route) => !route.includes(':'))), failures);

  ['/news/:slug', '/works/:slug', '/work/:slug'].forEach((dynamicRoute) => {
    if (!appRoutes.includes(dynamicRoute)) {
      failures.push(`App route missing dynamic template: ${dynamicRoute}`);
    }
  });

  const sitemapRoutesFromFile = extractSitemapRoutes(readText(SITEMAP_PATH)).map(normalizeRoute);
  compareSets('public/sitemap.xml routes', unique(expectedSitemapRoutes), unique(sitemapRoutesFromFile), failures);

  const aiContext = readJson(AI_CONTEXT_PATH);
  compareSets(
    'ai-context routes.sitemapRoutes',
    unique(expectedSitemapRoutes),
    unique((aiContext.routes?.sitemapRoutes || []).map(normalizeRoute)),
    failures
  );
  compareSets(
    'ai-context routes.canonicalUrls',
    unique(expectedCanonicalUrls),
    unique(aiContext.routes?.canonicalUrls || []),
    failures
  );

  const aliasRoutes = staticEntries
    .filter(([route, meta]) => normalizeRoute(route) !== normalizeRoute(meta.canonicalPath))
    .map(([route]) => route);
  const noindexRoutes = staticEntries
    .filter(([, meta]) => typeof meta.robots === 'string' && /noindex/i.test(meta.robots))
    .map(([route]) => route);

  compareSets(
    'ai-context routeMeta.aliasRoutes',
    unique(aliasRoutes),
    unique(aiContext.routeMeta?.aliasRoutes || []),
    failures
  );
  compareSets(
    'ai-context routeMeta.noindexRoutes',
    unique(noindexRoutes),
    unique(aiContext.routeMeta?.noindexRoutes || []),
    failures
  );

  const llmsCanonicalUrls = extractLlmsCanonicalUrls(readText(LLM_PATH));
  compareSets('llms.txt canonical URLs', unique(expectedCanonicalUrls), unique(llmsCanonicalUrls), failures);

  const robots = readText(ROBOTS_PATH);
  if (!/Sitemap:\s*https:\/\/www\.peace-biz\.com\/sitemap\.xml/i.test(robots)) {
    failures.push('robots.txt must include sitemap directive for https://www.peace-biz.com/sitemap.xml');
  }

  if (failures.length > 0) {
    console.error('SEO/AI consistency verification failed:');
    failures.forEach((failure, index) => {
      console.error(`${index + 1}. ${failure}`);
    });
    process.exit(1);
  }

  console.log('SEO/AI consistency verification passed.');
};

verify();
