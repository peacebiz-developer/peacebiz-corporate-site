const { run, defaultOptions } = require('react-snap');
const { getPrerenderRoutes } = require('./route-manifest');

const execute = async () => {
  const include = getPrerenderRoutes();
  const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';
  const puppeteerArgs = isCI
    ? ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    : [];

  await run({
    ...defaultOptions,
    source: 'build',
    include,
    crawl: false,
    puppeteerArgs,
  });
};

execute().catch((error) => {
  console.error(error);
  process.exit(1);
});
