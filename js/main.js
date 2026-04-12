/* ============================================
   CASSPHERE - Main JavaScript
   ============================================ */

(function () {
    'use strict';

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');

    function handleScroll() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Mobile navigation ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Close mobile nav on outside click
    document.addEventListener('click', function (e) {
        if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        }
    });

    // --- Scroll animations ---
    var animatedElements = document.querySelectorAll('[data-animate]');

    function revealElements() {
        animatedElements.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 30) {
                el.classList.add('visible');
            }
        });
    }

    // Run on load and on every scroll
    revealElements();
    window.addEventListener('scroll', revealElements, { passive: true });

    // --- Active nav link highlight on scroll ---
    var sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        var scrollY = window.scrollY + 120;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            var link = navLinks.querySelector('a[href="#' + id + '"]');

            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.style.color = '#0066cc';
                    link.style.fontWeight = '600';
                } else {
                    link.style.color = '';
                    link.style.fontWeight = '';
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });

    // --- Contact form handling ---
    var contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var formData = new FormData(contactForm);
        var data = {};
        formData.forEach(function (value, key) {
            data[key] = value;
        });

        // Show success state
        var btn = contactForm.querySelector('button[type="submit"]');
        var originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.style.background = '#00a8a8';
        btn.style.borderColor = '#00a8a8';
        btn.disabled = true;

        contactForm.reset();

        setTimeout(function () {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.disabled = false;
        }, 3000);
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
