# Peacebiz Corporate Site

This project uses Create React App and is configured for automatic deployment to GitHub Pages.

## Local development and build

In the project directory:

```bash
npm install
npm run build
```

The production build output is generated in the `build` directory.

## GitHub Pages deployment

This repository includes `.github/workflows/deploy-github-pages.yml`.
When you push to `main`, GitHub Actions automatically:

1. installs dependencies with `npm ci`
2. runs `npm run build`
3. uploads the `build` output
4. deploys to GitHub Pages

Published URL:

- https://peacebiz-developer.github.io/peacebiz-corporate-site/

### Required repository setting

In GitHub repository settings:

1. Open **Settings** → **Pages**
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**
3. Save if prompted

## Troubleshooting

### Assets (CSS/JS/images) return 404

- Confirm `package.json` has:
  - `"homepage": "https://peacebiz-developer.github.io/peacebiz-corporate-site/"`
- Confirm workflow uploads the `build` directory.
- Confirm you are accessing the site under `/peacebiz-corporate-site/`.

### Blank white page after deploy

- Open browser developer tools and check the Console/Network tabs for missing JS bundles.
- Verify the latest `Deploy to GitHub Pages` workflow run on `main` succeeded.
- Verify the repository Pages source is set to **GitHub Actions**.

### Site opens as raw attachment-like content or wrong response

- Confirm GitHub Pages is enabled in repository settings.
- Confirm deployment came from the `deploy-github-pages.yml` workflow, not a manual artifact host.
- Re-run workflow from the **Actions** tab with **Run workflow** after confirming settings.
