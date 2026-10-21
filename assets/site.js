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
