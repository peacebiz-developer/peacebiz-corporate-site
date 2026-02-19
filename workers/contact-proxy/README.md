# Contact Proxy Worker

GitHub Pages 配信のフロントから送信された Contact データを受け取り、  
Worker Secret に保存した `WEB3FORMS_ACCESS_KEY` を使って Web3Forms に中継します。

## セットアップ

```bash
cd workers/contact-proxy
npx wrangler login
npx wrangler secret put WEB3FORMS_ACCESS_KEY
npx wrangler secret put ALLOWED_ORIGINS
npx wrangler deploy
```

`ALLOWED_ORIGINS` 例:

```text
https://www.peace-biz.com,https://peace-biz-corporate-site.pages.dev
```

デプロイ後の Worker URL をフロントの `REACT_APP_CONTACT_API_URL` に設定してください。

