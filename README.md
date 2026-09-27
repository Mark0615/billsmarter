# BillSmarter

網站：[billsmarter.app](https://billsmarter.app/)。Next.js 15 / React 19。

## 本機開發

使用 Node.js 22 或更新的支援版本：

```sh
npm ci
npm run dev
```

一般開發入口為 http://localhost:3000。首次建置需要網路下載 Inter 與 Doto 字型。

```sh
npm test
npm run lint
npx tsc --noEmit --incremental false
npm run build
```

`lib/bills.ts` 包含整數單位分帳。頁面不會保存新的歷史紀錄；結算後可一鍵下載包含姓名、金額與轉帳明細的 PDF，請自行保管。

## Cloudflare Pages 部署

正式站沿用現有 Cloudflare Pages 專案與 `billsmarter.app` 網域。Next.js 輸出靜態頁至 `out`；`functions/api/fx/latest.ts` 提供原有 `/api/fx/latest` 匯率 API。PDF 由瀏覽器產生，不需伺服器儲存。

```sh
npm run pages:build
npm run pages:preview
```

預覽預設在 http://localhost:8788/；以上不會修改正式站。Cloudflare Pages 原專案需將建置指令設為 `npm run pages:build`，輸出目錄設為 `out`。確認預覽分支正常後，再更新 `main` 讓既有 GitHub 自動部署生效。`/calculator` 的 301 轉址由 `public/_redirects` 提供。

公開頁面是靜態檔案；只有匯率查詢會呼叫 Pages Function，不需要 R2 或 D1。圖片直接透過靜態資產提供。

原有 `NEXT_PUBLIC_GTM_ID` 可指定 GTM 容器；未設定時使用既有容器 ID，設為空字串可停用 GTM。Google 認證 CMP 與 GTM 同意設定在後台核對，不能只靠隱私政策文字判定已完成。

- [初始稽核](AUDIT-2026-09-27.md)
- [改版與上線檢查](RELEASE-2026-09-27.md)
