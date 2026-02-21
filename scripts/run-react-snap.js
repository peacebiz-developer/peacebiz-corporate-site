const fs = require('fs');
const path = require('path');
const { run, defaultOptions } = require('react-snap');
const { getPrerenderRoutes } = require('./route-manifest');

const SNAP_ENTRY_PATH = path.resolve(process.cwd(), 'build', '200.html');

const removeSnapEntryIfExists = () => {
  if (fs.existsSync(SNAP_ENTRY_PATH)) {
    fs.unlinkSync(SNAP_ENTRY_PATH);
  }
};

const execute = async () => {
  const include = getPrerenderRoutes();
  const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';
  const puppeteerArgs = isCI
    ? ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    : [];
  const concurrencyPlan = [isCI ? 2 : 4, 1];

  let lastError = null;

  for (let i = 0; i < concurrencyPlan.length; i += 1) {
    const concurrency = concurrencyPlan[i];
    removeSnapEntryIfExists();

    try {
      await run({
        ...defaultOptions,
        source: 'build',
        include,
        crawl: false,
        concurrency,
        skipThirdPartyRequests: true,
        puppeteerArgs,
      });
      return;
    } catch (error) {
      lastError = error;
      if (i < concurrencyPlan.length - 1) {
        console.warn(
          `react-snap attempt ${i + 1} failed (concurrency=${concurrency}). Retrying with lower concurrency.`
        );
      }
    }
  }

  throw lastError || new Error('react-snap failed');
};

execute().catch((error) => {
  console.error(error);
  process.exit(1);
});
