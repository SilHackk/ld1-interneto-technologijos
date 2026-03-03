function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.body.classList.add('dark-mode');

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Typed init (only if element exists)
  const typedEl = document.querySelector('.typed');
  if (typedEl && window.Typed) {
    const items = typedEl.getAttribute('data-typed-items').split(',').map(s => s.trim());
    new Typed('.typed', {
      strings: items,
      typeSpeed: 90,
      backSpeed: 45,
      loop: true,
      backDelay: 1200
    });
  }
});

window.addEventListener('scroll', () => {
  const btn = document.getElementById('scrollToTopBtn');
  if (!btn) return;
  btn.style.display = (document.documentElement.scrollTop > 300) ? 'flex' : 'none';
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}