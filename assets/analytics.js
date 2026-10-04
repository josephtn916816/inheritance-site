/*
 * 傳承智策網站統計：僅在正式 GitHub Pages 網域啟用。
 * 不傳送客戶案件、表單內容、姓名或其他個人識別資料。
 */
(() => {
  const measurementId = 'G-Y8YYXV5PB6';
  const productionHost = 'josephtn916816.github.io';

  // 所有內頁使用同一組完整導覽；本機預覽與正式網站都能一致切換分頁。
  const pageId = window.location.pathname.split('/').filter(Boolean)[0];
  if (pageId) {
    document.addEventListener('DOMContentLoaded', () => {
      const nav = document.querySelector('.site-header nav');
      if (!nav) return;
      const pages = [
        ['start', '開始使用'], ['product', '產品介紹'], ['showcase', '畫面導覽'],
        ['guide', '操作教學'], ['releases', '下載'], ['data-updates', '更新資訊'],
        ['support', '支援'], ['privacy', '隱私權'],
      ];
      const links = [['../', '首頁'], ...pages.map(([id, label]) => [`../${id}/`, label])];
      nav.setAttribute('aria-label', '主要導覽');
      nav.replaceChildren(...links.map(([href, label]) => {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = label;
        if (href === `../${pageId}/`) link.setAttribute('aria-current', 'page');
        return link;
      }));
    });
  }

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
