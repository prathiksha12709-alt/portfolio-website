/**
 * Prathiksha P. Shet - AIML Portfolio JavaScript
 * Interactive Features: Theme Switcher, Mobile Nav, ScrollSpy, Form Validation, Copy to Clipboard
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.getElementById('theme-toggle');
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  const currentYearSpan = document.getElementById('current-year');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-text');
  const emailAddress = document.getElementById('email-address');
  const contactForm = document.getElementById('contact-form');
  const formSuccessAlert = document.getElementById('form-success-alert');

  // Set current year in footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* ---------------- 1. Theme Toggle (Dark / Light) ---------------- */
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (!icon) return;
    if (theme === 'light') {
      icon.className = 'fa-solid fa-sun';
      themeToggle.setAttribute('title', 'Switch to Dark Mode');
    } else {
      icon.className = 'fa-solid fa-moon';
      themeToggle.setAttribute('title', 'Switch to Light Mode');
    }
  }

  /* ---------------- 2. Mobile Menu Navigation ---------------- */
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      const menuIcon = menuToggle.querySelector('i');
      if (menuIcon) {
        menuIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const menuIcon = menuToggle.querySelector('i');
        if (menuIcon) {
          menuIcon.className = 'fa-solid fa-bars';
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        const menuIcon = menuToggle.querySelector('i');
        if (menuIcon) {
          menuIcon.className = 'fa-solid fa-bars';
        }
      }
    });
  }

  /* ---------------- 3. Header Scroll & Back-to-Top Button ---------------- */
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header styling on scroll
    if (header) {
      if (scrollPos > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll to Top button visibility
    if (scrollTopBtn) {
      if (scrollPos > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    // Active link highlighting on scroll
    highlightActiveNavLink();
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ---------------- 4. Active Nav Link on ScrollSpy ---------------- */
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-list a[href*='${sectionId}']`);

      if (navLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  /* ---------------- 5. Copy Email to Clipboard ---------------- */
  if (copyEmailBtn && emailAddress) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailAddress.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyText.textContent;
        copyText.textContent = 'Copied!';
        copyEmailBtn.style.color = 'var(--accent-emerald)';
        copyEmailBtn.style.borderColor = 'var(--accent-emerald)';

        setTimeout(() => {
          copyText.textContent = originalText;
          copyEmailBtn.style.color = '';
          copyEmailBtn.style.borderColor = '';
        }, 2200);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  }

  /* ---------------- 6. Contact Form Validation & Submission ---------------- */
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const subjectError = document.getElementById('subject-error');
      const messageError = document.getElementById('message-error');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.classList.add('visible');
        nameInput.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        nameError.classList.remove('visible');
        nameInput.style.borderColor = '';
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailError.classList.add('visible');
        emailInput.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        emailError.classList.remove('visible');
        emailInput.style.borderColor = '';
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        subjectError.classList.add('visible');
        subjectInput.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        subjectError.classList.remove('visible');
        subjectInput.style.borderColor = '';
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.classList.add('visible');
        messageInput.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        messageError.classList.remove('visible');
        messageInput.style.borderColor = '';
      }

      if (isValid) {
        // Show success alert
        if (formSuccessAlert) {
          formSuccessAlert.classList.add('show');
          formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Construct a mailto fallback link to allow user to send directly via mail client
        const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${subjectInput.value.trim()}`);
        const mailtoBody = encodeURIComponent(`Hi Prathiksha,\n\nMy name is ${nameInput.value.trim()} (${emailInput.value.trim()}).\n\n${messageInput.value.trim()}`);
        const mailtoHref = `mailto:prathiksha.shet@example.com?subject=${mailtoSubject}&body=${mailtoBody}`;

        // Reset inputs after 1.5s
        setTimeout(() => {
          contactForm.reset();
        }, 1500);

        // Hide notification after 6 seconds
        setTimeout(() => {
          if (formSuccessAlert) {
            formSuccessAlert.classList.remove('show');
          }
        }, 6000);
      }
    });

    // Remove error highlights on user input
    ['name', 'email', 'subject', 'message'].forEach((id) => {
      const field = document.getElementById(id);
      const error = document.getElementById(`${id}-error`);
      if (field && error) {
        field.addEventListener('input', () => {
          error.classList.remove('visible');
          field.style.borderColor = '';
        });
      }
    });
  }

  /* ---------------- 7. Skill Bars Animation on Scroll ---------------- */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 150);
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    skillBars.forEach((bar) => observer.observe(bar));
  }
});

