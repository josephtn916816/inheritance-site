/* 將同一頁的操作步驟緊貼在實機圖旁；不在圖中遮住按鍵。 */
(() => {
  const numberPattern = /[①②③④⑤]/;
  const assetRoot = document.body.dataset.guideAssets || '../assets';
  // 只使用已依實機畫面核對過的標示座標；未核對的頁面絕不猜測位置。
  const verifiedTargets = {
    'client-profile': [
      { side: 'top', top: '-72px', left: 59, startX: 59, startY: -3, x: 59, y: 30 },
      { side: 'left', top: 42, startX: -3, startY: 53, x: 20, y: 39 },
      { side: 'right', top: 27, startX: 103, startY: 37, x: 85, y: 27 }
    ]
  };
  const fixedAnnotationImages = {
    'client-profile': 'client-profile-annotated-v5.png?v=20260928-inner-edge-markers'
  };
  const tutorialImages = {
    'client-profile-new': 'client-profile.png',
    'family': 'family-virtual-customer.png?v=20260928-test-client'
  };
  const interactiveHotspots = {
    'client-profile': [
      { href: 'client-profile-new.html', x: 53.9, y: 24.8, w: 5.6, h: 10, label: '新增客戶：開啟新增客戶操作教學' },
      { href: 'client-profile-search.html', x: 60, y: 24.8, w: 5.6, h: 10, label: '客戶搜尋：開啟客戶搜尋操作教學' },
      { href: 'business-card-scan.html', x: 66.1, y: 24.8, w: 5.6, h: 10, label: '名片辨識建檔：開啟名片辨識建檔操作教學' }
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
    const fixedAnnotation = fixedAnnotationImages[article.id];
    image.src = fixedAnnotation
      ? `${assetRoot}/tutorial-annotations/${fixedAnnotation}`
      : `${assetRoot}/tutorial-screenshots/${tutorialImages[article.id] || `${article.id}.png`}`;
    image.alt = `${article.querySelector('h3')?.textContent?.trim() || '功能'}工作頁畫面`;
    image.loading = 'lazy';
    figure.append(image);

    (interactiveHotspots[article.id] || []).forEach((hotspot) => {
      const link = document.createElement('a');
      link.className = 'guide-action-hotspot';
      link.href = hotspot.href;
      link.setAttribute('aria-label', hotspot.label);
      link.title = hotspot.label;
      link.style.setProperty('--action-x', `${hotspot.x}%`);
      link.style.setProperty('--action-y', `${hotspot.y}%`);
      link.style.setProperty('--action-w', `${hotspot.w}%`);
      link.style.setProperty('--action-h', `${hotspot.h}%`);
      figure.append(link);
    });

    const callouts = document.createElement('ol');
    callouts.className = 'guide-image-callouts';
    const targets = fixedAnnotation ? null : verifiedTargets[article.id];
    steps.forEach((step, index) => {
      const item = document.createElement('li');
      item.className = `guide-image-callout guide-image-callout--${index + 1}`;
      const number = step.match(/[①②③④⑤]/)?.[0] || String(index + 1);
      item.innerHTML = `<b>${number}</b><span></span>`;
      item.querySelector('span').textContent = step.replace(/[①②③④⑤]\s*/, '');
      const target = targets?.[index];
      if (target) {
        item.dataset.side = target.side;
        item.style.setProperty('--callout-top', typeof target.top === 'number' ? `${target.top}%` : target.top);
        if (target.left) item.style.setProperty('--callout-left', `${target.left}%`);
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
      figure.append(svg);
      targets.slice(0, steps.length).forEach((target) => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', String(target.startX ?? (target.side === 'left' ? -3 : 103)));
        line.setAttribute('y1', String(target.startY));
        line.setAttribute('x2', String(target.x));
        line.setAttribute('y2', String(target.y));
        svg.append(line);
        const dot = document.createElement('span');
        dot.className = 'guide-target-dot';
        dot.style.setProperty('--target-x', `${target.x}%`);
        dot.style.setProperty('--target-y', `${target.y}%`);
        figure.append(dot);
      });
      figure.append(callouts);
    } else if (!fixedAnnotation) {
      callouts.classList.add('guide-image-callouts--inline');
      inlineCallouts = callouts;
    }
    const heading = article.querySelector('h3');
    const sample = document.createElement('p');
    sample.className = 'guide-sample-client';
    sample.textContent = '本頁教學案例：虛擬客戶「測試1小姐」。所有人物、金額與關係僅供示範，請勿視為真實客戶資料。';
    heading?.insertAdjacentElement('afterend', sample);
    sample.insertAdjacentElement('afterend', figure);
    if (inlineCallouts) figure.insertAdjacentElement('afterend', inlineCallouts);
  });
})();
