# AGENTS.md

## Overview
- このリポジトリは B2B コーポレートサイトです。信頼性・読みやすさ・モバイル品質・SEO・速度・デザイン品質を同時に守ります。
- 事実ベースで作業してください。断定できない内容は `TODO(要確認)` で残してください。

### Verified Repo Facts
- Framework: React + TypeScript + Create React App (`react-scripts`)
- Routing: `BrowserRouter`（`src/App.tsx`）+ `basename` は `process.env.PUBLIC_URL` から算出
- Deploy: GitHub Actions (`.github/workflows/deploy-github-pages.yml`) で GitHub Pages へデプロイ
- Custom Domain: `CNAME` は `www.peace-biz.com`、`package.json` の `homepage` は `https://www.peace-biz.com`
- Build pipeline:
  - `npm run build` = `scripts/generate-ai-context.js` -> `scripts/generate-sitemap.js` -> `scripts/verify-seo-ai-consistency.js` -> `react-scripts build` -> `scripts/generate-static-routes.js` -> `scripts/generate-legacy-asset-aliases.js`
  - `postbuild` = `scripts/run-react-snap.js`（CI時は `--no-sandbox` 等を付与）
- Dynamic route source: `src/data/content/news.json`, `src/data/content/works.json`（`scripts/route-manifest.js`）
- Static route/meta source: `src/data/content/static-route-meta.json`（`src/components/utils/RouteMeta.tsx`, `scripts/route-manifest.js`）
- CI guardrail: build後に `public/sitemap.xml` / `public/llms.txt` / `public/ai-context.json` の未コミット差分があるとデプロイを停止
- Main asset locations:
  - `public/`（favicon・`robots.txt`・`sitemap.xml`・`404.html`・AI参照ファイル）
  - `public/assets/images/brand`, `public/assets/images/about`, `public/assets/images/services`, `public/assets/images/top`
  - `public/assets/images/news`, `public/assets/images/works`
  - `public/assets/videos/top`, `public/assets/videos/recruit`
- AI context outputs:
  - `public/llms.txt`（LLM向けテキスト）
  - `public/ai-context.json`（機械可読メタ）
- Contact form:
  - フロントは `src/pages/Contact.tsx`
  - 優先経路は `REACT_APP_CONTACT_API_URL`（Cloudflare Worker プロキシ）
  - 代替経路は `REACT_APP_WEB3FORMS_ACCESS_KEY`（クライアント露出リスクあり）
  - Worker 実装: `workers/contact-proxy/src/index.ts`

### Commands (Only What Exists)
- Install: `npm ci`（CIで使用）, `npm install`（README記載）
- Dev: `npm start`
- Build: `npm run build`
- AI Context Sync: `npm run sync:ai-context`
- SEO/AI Verify: `npm run verify:seo`
- Test: `npm test`
- Lint: `TODO(要確認) npm script 未定義`
- Format: `TODO(要確認) npm script 未定義`

## How to Work
- 変更前に必ず関連ファイルを読む（UI変更でも SEO/ルーティング/ビルド影響を確認）。
- 1変更1意図で、小さくレビューしやすい差分にする。
- 推測で直さない。仕様不明は `TODO(要確認)` を残し、勝手に確定しない。
- URL・メタ・フォーム・ビルド設定を変更する場合は、必ず「理由」と「影響範囲」を明記する。
- 既存の未関連変更は巻き込まない。

## Quality Bar
- デザイン: 既存トーン（余白・タイポ・配色・モーション密度）を壊さない。
- 文章: B2Bサイトとして誤解がなく、簡潔で信頼感のある文面にする。
- モバイル: 320px幅相当でも情報欠落・横スクロール・タップ不能を出さない。
- アクセシビリティ: コントラスト・フォーカス可能・意味のあるラベルを維持する。

## Performance Without Quality Loss
- 圧縮は「劣化」ではなく「知覚品質を維持しつつ転送量を削減すること」。
- 画像:
  - 可能な範囲で次世代形式（既存では `.webp` 多用）を使う。
  - `width/height` またはアスペクト比を明示して CLS を防ぐ。
  - `loading="lazy"` は適用するが、ファーストビューは体感優先で遅延しすぎない。
- 動画:
  - 見た目の品質が維持できる範囲でビットレート/解像度を最適化する。
  - 明確なブロックノイズやファーストビュー体験悪化を伴う変更は禁止。
  - `poster` や読み込み戦略で体感速度を守る。
- アニメーション:
  - 重い JS 主導より CSS/`transform` 中心を優先。
  - スクロール連動は特にモバイル負荷を検証してから採用する。
- 依存追加は原則禁止。必要時は理由・代替案・バンドル影響を提示してから。

## SEO & Routing Safety
- ルーティング変更時は次をセットで確認する:
  - `src/App.tsx`（Route定義）
  - `src/data/content/static-route-meta.json`（静的ページ canonical / robots / sitemap/prerender 対象）
  - `src/components/utils/RouteMeta.tsx`（静的ページメタ）
  - `src/pages/NewsDetail.tsx` / `src/pages/WorkDetail.tsx`（詳細ページメタ）
  - `scripts/route-manifest.js`（プリレンダー/サイトマップ対象）
- `public/index.html` の canonical / OGP / robots / 構造化データを破壊しない。
- GitHub Pages 前提の SPA 対応 (`public/404.html`, `public/index.html` 内スクリプト) を壊さない。
- `PUBLIC_URL`/`homepage` と `BrowserRouter basename` の整合を維持する。

## Assets Policy
- 画像・動画は用途に応じて配置する:
  - ブランド/共通画像: `public/assets/images/brand`
  - About系画像: `public/assets/images/about`
  - Service系画像: `public/assets/images/services`
  - Top系画像: `public/assets/images/top`
  - News/Works コンテンツ画像: `public/assets/images/news`, `public/assets/images/works`
  - 動画: `public/assets/videos/top`, `public/assets/videos/recruit`
- 配信しない元素材は `assets-source/` に配置し、`public/` には置かない。
- ファイル名は内容が分かる一貫した命名（既存は kebab-case ベース）を維持する。
- 画質確認は必須（PC/モバイル双方で視認チェック）。
- 追加アセットが大きい場合は、見た目を保った軽量化案を同時に検討する。

## Forms & Security
- 秘密情報（APIキー、トークン、秘密鍵）を Git にコミットしない。
- `.env.production.local` は `.gitignore` 対象。秘密はローカル環境変数または CI Secrets を使う。
- Contact はプロキシ経由（`REACT_APP_CONTACT_API_URL` + Worker Secret `WEB3FORMS_ACCESS_KEY`）を優先する。
- `REACT_APP_WEB3FORMS_ACCESS_KEY` はクライアントに露出するため、本番運用では常用しない。
- CORS 許可ドメイン（`ALLOWED_ORIGINS`）の更新時は本番ドメイン影響を必ず確認する。
- 既存のスパム対策（honeypot・送信間隔制限）を削除しない。

## Review Checklist
- PC表示: レイアウト崩れ、タイポ、余白、hover挙動
- Mobile表示: 文字欠け、横スクロール、タップ領域、固定要素干渉
- 主要導線: Header/Nav -> 各ページ -> CTA が途切れない
- リンク: 内部リンク、外部リンク、アンカー、404導線
- フォーム: 必須入力、エラー文言、成功導線、送信先設定
- 速度: 初期表示体感、重い画像/動画、不要なアニメ負荷
- SEO: title/description/canonical/robots、サイトマップ・プリレンダー対象整合
- Build/Deploy: `npm run build` が通ること、Pages想定ルート直アクセス確認

## Git / Commit Convention
- 件名フォーマット（固定）: `ver.X.X.XX <type>(<scope>): <summary>`
- 日付は件名に入れない。
- `type` は以下のみ:
  - `feat`, `fix`, `seo`, `perf`, `style`, `content`, `chore`
- `scope` は原則以下から選ぶ（必要最小限の追加は可）:
  - `home`, `about`, `services`, `eco`, `it`, `office`, `contact`, `header`, `footer`, `nav`, `layout`, `components`, `assets`, `build`

### Commit Examples
- `ver.2.12.01 fix(contact): route submissions through worker endpoint`
- `ver.2.12.02 perf(assets): optimize hero video loading without quality drop`
- `ver.2.12.03 seo(build): align sitemap routes with dynamic news slugs`
- `ver.2.12.04 style(nav): improve hover modal readability on desktop`
- `ver.2.12.05 content(about): add representative message section`
