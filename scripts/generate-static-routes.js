const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, '..', 'build');
const sourceIndex = path.join(buildDir, 'index.html');

const routes = [
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
  '/sparkles-demo',
];

if (!fs.existsSync(sourceIndex)) {
  throw new Error(`index.html not found: ${sourceIndex}`);
}

for (const route of routes) {
  const routeDir = path.join(buildDir, route.replace(/^\//, ''));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.copyFileSync(sourceIndex, path.join(routeDir, 'index.html'));
}

console.log(`Generated static route files for ${routes.length} routes.`);
