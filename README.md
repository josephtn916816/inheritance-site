# 傳承智策官方資訊網站

公開網址：<https://josephtn916816.github.io/inheritance-site/>

此倉庫只存放公開官網靜態檔案，包括產品介紹、每張功能卡與工作頁的靜態操作教學、隱私權政策、下載／發布說明及受簽章資料更新原則。

## 維護規則

- 不得放入客戶資料、安裝檔、私鑰、授權碼、帳號密碼或未公開程式原始碼。
- 正式安裝檔發布前，Windows 必須確認 Authenticode 簽章；Google Play 必須使用正式受保護上傳金鑰建立 AAB。
- 稅務或法規資料更新只能在專業覆核後，以受簽章保護的資料包發布。
- 更新網站後，GitHub Pages 會由 `main` 分支根目錄重新發布。

## 精簡管理工具

管理資訊不放在公開網頁內，避免把帳號或統計資料暴露給訪客。日常維護只需要下列項目：

- 私人流量與下載點擊統計：Google Analytics 4（僅網站管理者的 Google 帳號可登入）。
- 公開發布檔與版本說明：GitHub Releases；正式檔才可上傳。
- 發布前檢查：執行 `powershell -ExecutionPolicy Bypass -File .\tools\verify-site.ps1`。
- 完整操作順序、回復方式與權限原則：閱讀 [SITE-MANAGEMENT.md](SITE-MANAGEMENT.md)。

本機的 `downloads-local/` 是驗收用檔案，已排除於 Git，不得隨網站公開推送。
