(() => {
  const pageId = document.body.dataset.lesson;
  const host = document.querySelector('[data-lesson-host]');
  const title = document.querySelector('[data-lesson-title]');
  if (!pageId || !host || !title) return;

  document.querySelectorAll('[data-history-back]').forEach((link) => {
    link.addEventListener('click', (event) => {
      // 直接開啟教學頁時，瀏覽器也可能只有一個空白新分頁的歷史紀錄；
      // 因此以實際來源頁判斷，沒有來源時仍使用 href 回教學總覽。
      if (document.referrer) {
        event.preventDefault();
        window.history.back();
      }
    });
  });

  fetch('../index.html')
    .then((response) => {
      if (!response.ok) throw new Error('無法載入教學資料');
      return response.text();
    })
    .then((html) => {
      const source = new DOMParser().parseFromString(html, 'text/html');
      const template = source.querySelector('#lesson-source');
      const article = template?.content.querySelector(`article[id="${pageId}"]`);
      if (!article) throw new Error('找不到此功能的教學資料');

      const lesson = article.cloneNode(true);
      title.textContent = lesson.querySelector('h3')?.textContent?.trim() || '操作教學';
      document.title = `${title.textContent}｜操作教學中心｜傳承智策`;
      host.replaceChildren(lesson);

      const annotations = document.createElement('script');
      annotations.src = '../../assets/guide-annotations.js?v=20260928-precision-callouts';
      annotations.defer = true;
      document.body.append(annotations);
    })
    .catch((error) => {
      host.innerHTML = '<p class="lesson-error">目前無法載入此教學頁。請回到教學總覽重新選擇功能。</p>';
      console.error(error);
    });
})();

