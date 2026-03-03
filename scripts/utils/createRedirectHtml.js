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

module.exports = { createRedirectHtml };
