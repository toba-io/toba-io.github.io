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

// Preserve incoming links to the former combined research page.
const researchDestinations = {"main-study": "flow-battery-research.html#main-study", "digital-twin": "flow-battery-research.html#digital-twin", "model-structure": "flow-battery-research.html#model-structure", "cell-design": "flow-battery-research.html#cell-design", "tools": "flow-battery-research.html#tools", "experimental-phase": "flow-battery-research.html#experimental-phase", "ocv-reader": "flow-battery-research.html#ocv-reader", "synthetic-study": "flow-battery-research.html#synthetic-study", "he-synthetic": "flow-battery-research.html#he-synthetic", "foundations": "flow-battery-research.html#foundations", "oxidation-states": "oxidation-state-study.html#oxidation-states", "ten-cycle": "oxidation-state-study.html#ten-cycle", "titration": "oxidation-state-study.html#titration", "potentiometric-titration": "oxidation-state-study.html#potentiometric-titration", "aos-series": "oxidation-state-study.html#aos-series", "pipette-stand": "oxidation-state-study.html#pipette-stand", "pipette-stand-finished": "oxidation-state-study.html#pipette-stand-finished", "overview": "research.html"};
if (location.pathname.endsWith("/research.html") && location.hash) {
  const destination = researchDestinations[location.hash.slice(1)];
  if (destination) location.replace(destination);
}
