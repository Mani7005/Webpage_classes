
  // Navbar scroll state
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  const menuClose = document.getElementById('menuClose');
  function openMenu(){ mobileMenu.classList.add('open'); overlay.classList.add('open'); }
  function closeMenu(){ mobileMenu.classList.remove('open'); overlay.classList.remove('open'); }
  hamburger.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.mm-link').forEach(a => a.addEventListener('click', closeMenu));

  // Smooth scroll with navbar offset for all in-page links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if(target){
        e.preventDefault();
        const offset = 76;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Hero rotating slides
  const slides = document.querySelectorAll('.hero-slide');
  const dotsWrap = document.getElementById('heroDots');
  let current = 0;
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    if(i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showSlide(i));
    dotsWrap.appendChild(dot);
  });
  function showSlide(i){
    slides[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');
    current = i;
    slides[current].classList.add('active');
    dotsWrap.children[current].classList.add('active');
  }
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!prefersReducedMotion){
    setInterval(() => { showSlide((current + 1) % slides.length); }, 5000);
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

