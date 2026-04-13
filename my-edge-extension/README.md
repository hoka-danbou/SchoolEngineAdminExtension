# my-edge-extension

`https://app.example.com/*` 配下でのみ動作する、Manifest V3 ベースの Microsoft Edge 拡張機能ひな形です。

- Content Script は対象ドメイン配下でのみ実行
- URL ルーティングで画面ごとに処理を分離
- SPA (pushState / replaceState / popstate / hashchange) のURL変更に追従
- popup / background service worker を最小構成で実装
- **このリポジトリではテキストファイルのみを管理**（バイナリ画像は含めない）

## ディレクトリ構成

```text
my-edge-extension/
├─ .gitignore
├─ manifest.json
├─ README.md
├─ public/
│  └─ icons/
│     └─ .gitkeep
├─ src/
│  ├─ background/
│  │  └─ service-worker.js
│  ├─ content/
│  │  ├─ index.js
│  │  ├─ router.js
│  │  ├─ bootstrap/
│  │  │  └─ observer.js
│  │  ├─ common/
│  │  │  ├─ dom.js
│  │  │  ├─ storage.js
│  │  │  └─ constants.js
│  │  └─ pages/
│  │     ├─ dashboard/
│  │     │  └─ index.js
│  │     ├─ detail/
│  │     │  └─ index.js
│  │     └─ edit/
│  │        └─ index.js
│  └─ popup/
│     ├─ popup.html
│     ├─ popup.js
│     └─ popup.css
```

## Edge への読み込み手順

1. Edge で `edge://extensions` を開く
2. 右上の **開発者モード** を ON
3. **展開して読み込み** をクリック
4. この `my-edge-extension` フォルダを選択

## 動作確認方法

1. `https://app.example.com/dashboard` にアクセス
   - DevTools Console に dashboard 初期化ログが出ることを確認
2. `https://app.example.com/items/123` に遷移
   - detail 初期化ログが出ることを確認
3. `https://app.example.com/items/123/edit` に遷移
   - edit 初期化ログが出ることを確認
4. 上記以外の URL (`https://app.example.com/help` など)
   - unknown ログが出て、画面別処理は実行しないことを確認
5. 拡張機能アイコンをクリックし、popup に「拡張機能が有効」「現在URL」が表示されることを確認

## URL ルーティング仕様

`src/content/router.js` で以下の判定を行います。

- `/dashboard` → `dashboard`
- `/items/:id` → `detail`
- `/items/:id/edit` → `edit`
- それ以外 → `unknown`（何もしない）

## 補足

- ビルド不要（npm パッケージ依存なし）
- JavaScript の ES Modules を利用
- 対象ドメインは `https://app.example.com/*` のみに限定
- `icons` は配置場所のみ用意し、画像バイナリは意図的に除外
