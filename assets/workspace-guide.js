(() => {
  const title = document.querySelector('[data-workspace-guide-title]');
  const description = document.querySelector('[data-workspace-guide-description]');
  const hotspots = document.querySelectorAll('.workspace-hotspot');
  if (!title || !description || !hotspots.length) return;

  const show = (hotspot) => {
    title.textContent = hotspot.dataset.title || '功能說明';
    description.textContent = hotspot.dataset.description || '點選功能卡查看操作教學。';
  };
  const reset = () => {
    title.textContent = '將游標停在功能卡上';
    description.textContent = '說明會顯示在這裡；點選卡片才會開啟該功能的獨立操作教學。';
  };

  hotspots.forEach((hotspot) => {
    hotspot.addEventListener('mouseenter', () => show(hotspot));
    hotspot.addEventListener('focus', () => show(hotspot));
  });
  document.querySelector('.workspace-guide')?.addEventListener('mouseleave', reset);
})();
