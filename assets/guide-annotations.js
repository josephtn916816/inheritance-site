/* 將同一頁的操作步驟緊貼在實機圖旁；不在圖中遮住按鍵。 */
(() => {
  const numberPattern = /[①②③④⑤]/;
  document.querySelectorAll('.page-guide-list article[id]').forEach((article) => {
    const details = article.querySelectorAll('dl dd');
    const stepText = details[1]?.textContent?.trim();
    if (!stepText) return;

    const steps = stepText
      .split(/(?=[①②③④⑤])/)
      .map((item) => item.trim())
      .filter((item) => numberPattern.test(item))
      .slice(0, 3);
    if (!steps.length) return;

    const figure = document.createElement('figure');
    figure.className = 'guide-figure';
    const image = document.createElement('img');
    image.src = `../assets/tutorial-screenshots/${article.id}.png`;
    image.alt = `${article.querySelector('h3')?.textContent?.trim() || '功能'}工作頁畫面`;
    image.loading = 'lazy';
    figure.append(image);

    const callouts = document.createElement('ol');
    callouts.className = 'guide-image-callouts';
    steps.forEach((step, index) => {
      const item = document.createElement('li');
      item.className = `guide-image-callout guide-image-callout--${index + 1}`;
      const number = step.match(/[①②③④⑤]/)?.[0] || String(index + 1);
      item.innerHTML = `<b>${number}</b><span></span>`;
      item.querySelector('span').textContent = step.replace(/[①②③④⑤]\s*/, '');
      callouts.append(item);
    });
    figure.append(callouts);
    article.querySelector('h3')?.insertAdjacentElement('afterend', figure);
  });
})();
