/* ============================================
   ZimTech — script.js
   Author: Zimam Jaufer
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== NAVBAR SCROLL ===== */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ===== HAMBURGER MOBILE MENU ===== */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen.toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ===== FADE-UP SCROLL ANIMATION ===== */
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => fadeObserver.observe(el));

  /* ===== SKILL BAR ANIMATION ===== */
  const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.metric-fill').forEach(fill => {
          const width = fill.getAttribute('data-width');
          fill.style.width = width + '%';
        });
        metricObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const aboutSection = document.getElementById('about');
  if (aboutSection) metricObserver.observe(aboutSection);

  /* ===== BACK TO TOP BUTTON ===== */
  const backTop = document.getElementById('back-top');

  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== CONTACT FORM SUBMISSION ===== */
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      const fname = document.getElementById('fname').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!fname || !email || !message) {
        alert('Please fill in the required fields (Name, Email, Message).');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      this.style.display = 'none';
      const successMsg = document.getElementById('formSuccess');
      if (successMsg) successMsg.style.display = 'block';
    });
  }

  /* ===== ACTIVE NAV HIGHLIGHT ON SCROLL ===== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current
        ? 'var(--white)'
        : '';
    });
  }, { passive: true });

});
