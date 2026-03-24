/* ============================================================
   ME210 Autonomous Curling Robot — Main JavaScript
   Handles: mobile menu toggle, scroll-spy for active nav links
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile Menu Toggle ---- */

  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    hamburgerIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  });

  // Close mobile menu when a link is tapped
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });


  /* ---- Scroll Spy: highlight active nav link ---- */

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollY = window.scrollY + 100; // offset for navbar height

    let currentId = '';
    sections.forEach(section => {
      if (scrollY >= section.offsetTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();


  /* ---- CAD model tabs (Mechanical section main viewer) ---- */

  const cadMain = document.getElementById('cad-model-main');
  const cadTabs = document.querySelectorAll('.cad-tab');

  if (cadMain && cadTabs.length) {
    cadTabs.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const src = btn.getAttribute('data-cad-src');
        const alt = btn.getAttribute('data-cad-alt') || 'CAD model';

        if (src && cadMain.getAttribute('src') !== src) {
          cadMain.removeAttribute('src');
          requestAnimationFrame(() => {
            cadMain.setAttribute('src', src);
          });
        }
        cadMain.setAttribute('alt', alt);

        cadTabs.forEach((b) => {
          b.classList.remove('bg-cardinal', 'text-white');
          b.classList.add('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');
        });
        btn.classList.remove('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');
        btn.classList.add('bg-cardinal', 'text-white');
      });
    });
  }
});
