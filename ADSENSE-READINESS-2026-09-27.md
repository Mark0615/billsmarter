# BillSmart 送 AdSense 前複查（2026-09-27）

## 結論與範圍

**目前不建議立刻按「Request review」。** 本機候選版已修正計算、匯率、PDF 與指南範例，但公開站仍顯示舊版，Google 無法審到本機改版。這次檢查涵蓋本機候選版的 19 個內容頁、11 篇指南、導覽／索引設定、分帳流程、公開首頁與 AdSense 後台。尚未取得 GTM 設定與 Search Console「網頁索引」明細，也無法保證下次通過。

9/3 的拒絕早於 9/10 的內容改寫；那次結果不能證明新版內容仍被 Google 判為 low value。Mark 提供的 Search Console 截圖顯示三個月 555 次曝光與 3 次點擊，只證明部分網址曾顯示在搜尋結果，不能推出全站索引或 AdSense 通過機率。

## 已確認的基礎

- 本機建置的 19 個內容頁各有一個 H1、自身 canonical、可讀的伺服器產生文字；560 個站內連結引用未發現失效目標。robots、sitemap、ads.txt 有對應檔案，AdSense publisher ID 與程式碼一致。
- 11 篇指南並非只有標題與圖片：本機 HTML 的文章正文約 757–1,408 個英文詞。這**不是** Google 的最低字數標準，也不能單靠長度判斷價值。
- About、Contact、Privacy、Terms、作者連結與文章更新日期都有呈現；手機 390px 和 320px 的輸入／結算順序、欄位寬度已測，390px 下可完成付款與 PDF 下載。
- 核心工具能處理不同付款人、部分成員分攤、13 種幣別，並在結算後下載 PDF。這是網站的實際原創效用，應作為主要價值，而非再堆相似文章。

## 已完成的內容修正

- 旅行清單改為建議先用共享筆記記錄，結算時再輸入工具；歷史匯率須由團體另外確認並自行換算。票券文章把不同價格的商品拆成個別付款，也收斂退票／轉讓的概括說法。
- 逐張核對 11 張指南示意圖；移除 5 張與新版尾差或整數幣別結果不一致的圖片，改用已驗算的文字案例，其餘 6 張保留。修正較小的室友文章維持原更新日期。
- AdSense 後台顯示 billsmarter.app 的 Privacy & messaging 訊息已發布；Policy center 顯示無目前政策問題。這不能證明 GTM 在所有地區的同意前行為正確。
- AdSense Sites 仍顯示 9/3 的「Low value content」與「ads.txt Not found」狀態；9/27 從公開網址直接取得 `/ads.txt` 為 HTTP 200，內容與站上的 publisher ID 一致。後台狀態可能尚未重新抓取，不能把它當成目前檔案缺失。

## 送審前剩餘工作

1. **先讓候選版公開，才談送審。** 新 Workers 部署與網域切換尚未執行。部署後從外部重新檢查首頁、指南、API、手機、PDF、robots、sitemap、ads.txt、canonical 及 404；在 Search Console 的 URL 檢查確認關鍵頁取得新版內容。不要把本機測試等同正式站驗收。
2. **核對可查核資訊與作者資料。** 文章中的票券退改／轉讓、各地收費、卡片與匯率規則已收斂概括說法；後續如寫入特定平台或銀行規則，須連到對應官方資料。About／Contact 的作者與聯絡資訊需由站主確認屬實。Google 沒有規定每篇都必須有外部連結。
3. **核對廣告與同意設定。** AdSense 的 Privacy & messaging 已發布，但原始碼無法證明 GTM／AdSense 在每個適用地區的同意前行為，也還無法確認 Auto ads 的實際版位。正式站更新後檢查廣告不遮住輸入與 PDF。這屬政策與體驗檢查，不能直接推斷為 9/3 的 low-value 原因。
4. **確認索引與後台重新抓取。** 使用 Search Console URL 檢查確認首頁、How it works 與核心指南讀到新版本；在 AdSense Sites 頁確認 `ads.txt` 狀態是否更新。已發布的 CMP 和「No current issues」不等於內容審核會通過。

## 建議送審門檻

公開站已更新並可由未登入訪客使用；核心計算、匯率失敗提示與 PDF 正常；指南中的功能指示與示意金額一致；About／Contact／Privacy 與作者資料屬實；AdSense 後台沒有尚未處理的政策或連線項目；至少首頁、How it works 與核心指南在 Search Console 可檢查到新版內容。完成後再從 AdSense 原有的 Sites 頁申請複審，不必為追求特定文章數或流量而延後。

Google 的審核可能評估整站，沒有保證通過的文章數、字數或流量門檻。索引、搜尋曝光與 AdSense 審核是不同事情。

## Google 官方依據

- [AdSense：網站尚未通過時的內容與導覽問題](https://support.google.com/adsense/answer/81904?hl=en)
- [AdSense：送審前檢查內容、原創性與體驗](https://support.google.com/adsense/answer/7299563?hl=en)
- [AdSense：審查整站及連線方式](https://support.google.com/adsense/answer/7584263?hl=en)
- [Publisher Policies：無內容／低價值畫面](https://support.google.com/publisherpolicies/answer/11112688?hl=en)
- [Search Central：有幫助、可靠、以使用者為主的內容](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Search Central：sitemap 不保證索引](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [AdSense：EEA、英國與瑞士的 CMP 要求](https://support.google.com/adsense/answer/13554020?hl=en)
