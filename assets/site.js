const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    menu.focus();
  }
});

const diagram = document.querySelector('.diagram');
document.querySelectorAll('[data-mode-button]').forEach(button => {
  button.addEventListener('click', () => {
    const charging = button.dataset.modeButton === 'charge';
    diagram.dataset.mode = button.dataset.modeButton;
    document.querySelectorAll('[data-mode-button]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelector('#reaction-label').textContent = charging ? 'Electrical energy → stored chemical energy' : 'Stored chemical energy → electrical energy';
  });
});

const lightbox = document.querySelector('.lightbox');
document.querySelectorAll('[data-photo]').forEach(button => {
  button.addEventListener('click', () => {
    const photo = button.querySelector('img');
    const full = lightbox.querySelector('img');
    full.src = photo.src;
    full.alt = photo.alt;
    lightbox.querySelector('p').textContent = photo.alt;
    lightbox.showModal();
  });
});
lightbox?.querySelector('button').addEventListener('click', () => lightbox.close());

const videos = document.querySelectorAll('video');
if (videos.length) {
  const inView = new Set();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const updateVideo = video => {
    if (inView.has(video) && !document.hidden && !reducedMotion.matches) {
      video.muted = true;
      video.play().catch(() => {}); // Native controls remain available if autoplay is blocked.
    } else {
      video.pause();
    }
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.25) inView.add(entry.target);
      else inView.delete(entry.target);
      updateVideo(entry.target);
    });
  }, { threshold: 0.25 });
  videos.forEach(video => {
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    observer.observe(video);
  });
  document.addEventListener('visibilitychange', () => videos.forEach(updateVideo));
  reducedMotion.addEventListener('change', () => videos.forEach(updateVideo));
}
