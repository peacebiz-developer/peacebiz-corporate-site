const fs = require('fs');
const path = require('path');
const { getPrerenderRoutes, getAliasRedirectTarget } = require('./route-manifest');
const { createRedirectHtml } = require('./utils/createRedirectHtml');

const buildDir = path.resolve(__dirname, '..', 'build');
const sourceIndex = path.join(buildDir, 'index.html');
const routes = getPrerenderRoutes().filter((route) => route !== '/');

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
