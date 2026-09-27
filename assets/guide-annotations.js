/* 將同一頁的操作步驟緊貼在實機圖旁；不在圖中遮住按鍵。 */
(() => {
  const numberPattern = /[①②③④⑤]/;
  // 只使用已依實機畫面核對過的標示座標；未核對的頁面絕不猜測位置。
  const verifiedTargets = {
    'client-profile': [
      { side: 'left', top: 7, startY: 19, x: 59, y: 23 },
      { side: 'left', top: 42, startY: 53, x: 18, y: 46 },
      { side: 'right', top: 27, startY: 37, x: 85, y: 32 }
    ]
  };

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
    const targets = verifiedTargets[article.id];
    steps.forEach((step, index) => {
      const item = document.createElement('li');
      item.className = `guide-image-callout guide-image-callout--${index + 1}`;
      const number = step.match(/[①②③④⑤]/)?.[0] || String(index + 1);
      item.innerHTML = `<b>${number}</b><span></span>`;
      item.querySelector('span').textContent = step.replace(/[①②③④⑤]\s*/, '');
      const target = targets?.[index];
      if (target) {
        item.dataset.side = target.side;
        item.style.setProperty('--callout-top', `${target.top}%`);
      } else {
        item.classList.add('guide-image-callout--inline');
      }
      callouts.append(item);
    });

    let inlineCallouts = null;
    if (targets) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'guide-leaders');
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.setAttribute('preserveAspectRatio', 'none');
      targets.slice(0, steps.length).forEach((target) => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', target.side === 'left' ? '0' : '100');
        line.setAttribute('y1', String(target.startY));
        line.setAttribute('x2', String(target.x));
        line.setAttribute('y2', String(target.y));
        svg.append(line);
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', String(target.x));
        dot.setAttribute('cy', String(target.y));
        dot.setAttribute('r', '1.05');
        svg.append(dot);
      });
      figure.append(svg);
      figure.append(callouts);
    } else {
      callouts.classList.add('guide-image-callouts--inline');
      inlineCallouts = callouts;
    }
    const heading = article.querySelector('h3');
    heading?.insertAdjacentElement('afterend', figure);
    if (inlineCallouts) figure.insertAdjacentElement('afterend', inlineCallouts);
  });
})();
