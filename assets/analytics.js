/*
 * 傳承智策網站統計：僅在正式 GitHub Pages 網域啟用。
 * 不傳送客戶案件、表單內容、姓名或其他個人識別資料。
 */
(() => {
  const measurementId = 'G-Y8YYXV5PB6';
  const productionHost = 'josephtn916816.github.io';

  if (window.location.hostname !== productionHost) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { anonymize_ip: true });

  const googleTag = document.createElement('script');
  googleTag.async = true;
  googleTag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.append(googleTag);

  document.addEventListener('click', (event) => {
    const download = event.target.closest('[data-analytics-download]');
    if (!download) return;

    window.gtag('event', download.dataset.analyticsEvent || 'client_download', {
      file_name: download.dataset.analyticsDownload,
      file_platform: download.dataset.analyticsPlatform,
      file_version: download.dataset.analyticsVersion,
    });
  });
})();
