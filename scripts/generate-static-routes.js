const fs = require('fs');
const path = require('path');
const { getPrerenderRoutes } = require('./route-manifest');

const staticRouteMeta = require('../src/data/content/static-route-meta.json');

const buildDir = path.resolve(__dirname, '..', 'build');
const sourceIndex = path.join(buildDir, 'index.html');
const routes = getPrerenderRoutes().filter((route) => route !== '/');

const ensureTrailingSlash = (route) => {
  if (route === '/') {
    return '/';
  }

  return route.endsWith('/') ? route : `${route}/`;
};

const createRedirectHtml = (targetPath) => `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=${targetPath}" />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="https://peace-biz.com${targetPath}" />
    <title>Redirecting...</title>
    <script>
      window.location.replace(${JSON.stringify(targetPath)});
    </script>
  </head>
  <body></body>
</html>
`;

const getAliasRedirectTarget = (route) => {
  if (route.startsWith('/work/')) {
    return ensureTrailingSlash(route.replace('/work/', '/works/'));
  }

  const meta = staticRouteMeta[route];
  if (!meta || !meta.canonicalPath) {
    return null;
  }

  if (meta.canonicalPath !== route) {
    return ensureTrailingSlash(meta.canonicalPath);
  }

  return null;
};

if (!fs.existsSync(sourceIndex)) {
  throw new Error(`index.html not found: ${sourceIndex}`);
}

for (const route of routes) {
  const routeDir = path.join(buildDir, route.replace(/^\//, ''));
  const redirectTarget = getAliasRedirectTarget(route);

  fs.mkdirSync(routeDir, { recursive: true });

  if (redirectTarget) {
    fs.writeFileSync(path.join(routeDir, 'index.html'), createRedirectHtml(redirectTarget), 'utf8');
  } else {
    fs.copyFileSync(sourceIndex, path.join(routeDir, 'index.html'));
  }
}

console.log(`Generated static route files for ${routes.length} routes.`);
