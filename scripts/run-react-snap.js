const { run, defaultOptions } = require('react-snap');
const { getPrerenderRoutes } = require('./route-manifest');

const execute = async () => {
  const include = getPrerenderRoutes();
  await run({
    ...defaultOptions,
    source: 'build',
    include,
    crawl: false,
  });
};

execute().catch((error) => {
  console.error(error);
  process.exit(1);
});
