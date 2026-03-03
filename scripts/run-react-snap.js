const fs = require('fs');
const path = require('path');
const { run, defaultOptions } = require('react-snap');
const { getPrerenderRoutesForSnap } = require('./route-manifest');

const SNAP_ENTRY_PATH = path.resolve(process.cwd(), 'build', '200.html');

const removeSnapEntryIfExists = () => {
  if (fs.existsSync(SNAP_ENTRY_PATH)) {
    fs.unlinkSync(SNAP_ENTRY_PATH);
  }
};

const execute = async () => {
  const include = getPrerenderRoutesForSnap();
  const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';
  const configuredPort = Number.parseInt(process.env.REACT_SNAP_PORT || '', 10);
  const defaultPortCandidates = [45678, 45679, 45680, 45681, 45682];
  const portCandidates = Number.isInteger(configuredPort)
    ? [configuredPort, ...defaultPortCandidates.filter((port) => port !== configuredPort)]
    : defaultPortCandidates;
  const puppeteerArgs = isCI
    ? ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    : [];
  const puppeteerExecutablePath = process.env.PUPPETEER_EXECUTABLE_PATH || undefined;
  const concurrencyPlan = [isCI ? 2 : 4, 1];

  let lastError = null;

  for (let i = 0; i < concurrencyPlan.length; i += 1) {
    const concurrency = concurrencyPlan[i];

    for (const port of portCandidates) {
      removeSnapEntryIfExists();

      try {
        await run({
          ...defaultOptions,
          source: 'build',
          include,
          crawl: false,
          port,
          concurrency,
          skipThirdPartyRequests: true,
          puppeteerArgs,
          puppeteerExecutablePath,
        });
        return;
      } catch (error) {
        lastError = error;

        if (error && error.code === 'EADDRINUSE') {
          console.warn(
            `react-snap failed (port=${port}, concurrency=${concurrency}) due to EADDRINUSE. Trying next port.`
          );
          continue;
        }

        if (i < concurrencyPlan.length - 1) {
          console.warn(
            `react-snap failed (port=${port}, concurrency=${concurrency}). Retrying with lower concurrency.`
          );
        }

        break;
      }
    }

    if (i < concurrencyPlan.length - 1 && lastError && lastError.code === 'EADDRINUSE') {
      console.warn(
        `react-snap exhausted port candidates for concurrency=${concurrency}. Retrying with lower concurrency.`
      );
    }
  }

  throw lastError || new Error('react-snap failed');
};

execute().catch((error) => {
  console.error(error);
  process.exit(1);
});
