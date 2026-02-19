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

## Contact Form セキュア構成

GitHub Pages は静的ホスティングのため、フロントエンドに秘密鍵を置く方式は安全ではありません。  
このリポジトリでは、Contact フォームを以下の構成で運用します。

- フロント: `REACT_APP_CONTACT_API_URL` の公開エンドポイントに送信
- サーバー側: Cloudflare Worker (`workers/contact-proxy`) が受信
- 秘密情報: `WEB3FORMS_ACCESS_KEY` は Worker Secret として保持（フロントには一切配布しない）
- 許可ドメイン: Worker 側の `ALLOWED_ORIGINS` で制限

フロントの設定:

- 参照キー: `REACT_APP_CONTACT_API_URL`
- ローカル: `.env.production.local` に設定（`.gitignore` 対象）
- CI/CD: GitHub Repository Secrets の `REACT_APP_CONTACT_API_URL` に設定
- テンプレート: `.env.production.example`

```bash
cp .env.production.example .env.production.local
```

Worker デプロイ例:

```bash
cd workers/contact-proxy
npx wrangler secret put WEB3FORMS_ACCESS_KEY
npx wrangler secret put ALLOWED_ORIGINS
npx wrangler deploy
```

- `ALLOWED_ORIGINS` 例: `https://www.peace-biz.com,https://peace-biz-corporate-site.pages.dev`
- 公開された Worker URL を `REACT_APP_CONTACT_API_URL` に設定してください。

## デプロイ

`main` ブランチへの push で `.github/workflows/deploy-github-pages.yml` が実行され、GitHub Pages に自動反映されます。

処理内容:

1. `npm ci`
2. `CI=false npm run build`
3. `build/` を Pages Artifact としてアップロード
4. GitHub Pages へデプロイ

補足:
- ワークフローは `REACT_APP_CONTACT_API_URL` と `REACT_APP_WEB3FORMS_ACCESS_KEY` の両方が未設定の場合に失敗します。
- 互換運用として `REACT_APP_WEB3FORMS_ACCESS_KEY` でもビルド可能ですが、これはキーがフロントに露出するため本番では非推奨です。

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
- `/works/:slug` `/work/:slug`
- `/news`
- `/news/:slug`
- `/contact`
- `/recruit`
- `/privacy`
- `/sitepolicy` `/terms`

コンテンツデータ:

- `src/data/content/news.json`
- `src/data/content/works.json`

一覧ページはページネーションを実装しています。`NEWS_PAGE_SIZE` / `WORKS_PAGE_SIZE` で件数を調整できます。

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
