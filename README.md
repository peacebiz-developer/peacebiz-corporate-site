# Peace Biz Corporate Site

Peace Biz コーポレートサイト（React + TypeScript + CRA）のリポジトリです。  
GitHub Pages へ自動デプロイし、独自ドメイン `https://www.peace-biz.com` で公開します。

## Tech Stack

- React 19
- TypeScript
- Create React App (`react-scripts`)
- Tailwind CSS
- Framer Motion (`motion`)
- NextUI

## 実行コマンド

```bash
npm install
npm start
npm run build
```

- `npm start`: ローカル開発サーバー起動
- `npm run build`: 本番ビルド + 静的ルートファイル生成

## デプロイ

`main` ブランチへの push で `.github/workflows/deploy-github-pages.yml` が実行され、GitHub Pages に自動反映されます。

処理内容:

1. `npm ci`
2. `CI=false npm run build`
3. `build/` を Pages Artifact としてアップロード
4. GitHub Pages へデプロイ

## ルーティングと GitHub Pages 対応

SPA の直接アクセス（例: `/works`）で 404 を防ぐために、以下を併用しています。

- `public/404.html`（SPA redirect）
- `scripts/generate-static-routes.js`（主要ルートに `index.html` を生成）

主な公開ルート:

- `/`
- `/about` `/company`
- `/services`
- `/services/it-solution`
- `/services/eco-solution`
- `/services/office-solution`
- `/works` `/work`
- `/news`
- `/contact`
- `/recruit`
- `/privacy`
- `/sitepolicy` `/terms`

## SEO / Search Console

- `public/robots.txt`
- `public/sitemap.xml`
- `public/index.html` に favicon / OGP / Organization 構造化データを設定

デプロイ後の確認 URL:

- `https://www.peace-biz.com/robots.txt`
- `https://www.peace-biz.com/sitemap.xml`

## Favicon / App Icon

`public/favicon_io/` に favicon 一式を配置し、`public/index.html` と `public/manifest.json` で参照しています。

## 独自ドメイン

- `CNAME`: `www.peace-biz.com`
- `package.json` の `homepage`: `https://www.peace-biz.com`

## 注意事項

- GitHub Pages 反映前は、本番 URL で新規ルートや `sitemap.xml` が 404 のままになる場合があります。
- 反映確認は、Actions 成功後に本番 URL で行ってください。
