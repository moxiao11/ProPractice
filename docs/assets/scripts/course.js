// 课程站点交互增强
document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', '回到顶部');
  backToTop.textContent = '↑';
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    const visible = window.scrollY > 480;
    backToTop.style.opacity = visible ? '1' : '0';
    backToTop.style.transform = visible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.96)';
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
