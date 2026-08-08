/* ==========================================================================
   شركة العزل المتقدم — Site behavior
   Vanilla JS, no dependencies. All observers / rAF-throttled.
   ========================================================================== */
(function () {
    'use strict';

    // JS is active — enable JS-only reveal behavior
    document.documentElement.classList.remove('no-js');

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Mobile menu ---------- */
    var menuToggle = document.getElementById('menuToggle');
    var mobileMenu = document.getElementById('mobileMenu');
    var menuClose = document.getElementById('mobileMenuClose');

    function openMenu() {
        mobileMenu.hidden = false;
        requestAnimationFrame(function () {
            mobileMenu.classList.add('is-open');
        });
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'إغلاق القائمة');
        document.body.style.overflow = 'hidden';
        menuClose.focus();
    }

    function closeMenu() {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'فتح القائمة');
        document.body.style.overflow = '';
        setTimeout(function () {
            mobileMenu.hidden = true;
        }, 350);
        menuToggle.focus();
    }

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            if (menuToggle.getAttribute('aria-expanded') === 'true') {
                closeMenu();
            } else {
                openMenu();
            }
        });
        if (menuClose) {
            menuClose.addEventListener('click', closeMenu);
        }
        document.addEventListener('keydown', function (e) {
            if (menuToggle.getAttribute('aria-expanded') !== 'true') return;
            if (e.key === 'Escape') {
                closeMenu();
                return;
            }
            if (e.key === 'Tab') {
                // Keep focus trapped inside the open dialog
                var focusables = mobileMenu.querySelectorAll('a[href], button:not([disabled])');
                if (!focusables.length) return;
                var first = focusables[0];
                var last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });
        mobileMenu.addEventListener('click', function (e) {
            if (e.target.closest('a') || e.target === mobileMenu) {
                closeMenu();
            }
        });
        // Close the menu automatically when switching to a desktop viewport
        if (window.matchMedia) {
            var desktopQuery = window.matchMedia('(min-width: 901px)');
            var onViewportChange = function (ev) {
                if (ev.matches && menuToggle.getAttribute('aria-expanded') === 'true') {
                    closeMenu();
                }
            };
            if (desktopQuery.addEventListener) {
                desktopQuery.addEventListener('change', onViewportChange);
            } else if (desktopQuery.addListener) {
                desktopQuery.addListener(onViewportChange);
            }
        }
    }

    /* ---------- Header scroll state + scroll-top button ---------- */
    var header = document.getElementById('siteHeader');
    var scrollTop = document.getElementById('scrollTop');
    var ticking = false;

    function onScroll() {
        var y = window.scrollY;
        if (header) {
            header.classList.toggle('is-scrolled', y > 40);
        }
        if (scrollTop) {
            scrollTop.classList.toggle('is-visible', y > 600);
            // Keep the button out of the accessibility tree until it is actually
            // visible (opacity 0 + pointer-events none is not enough for AT users).
            scrollTop.hidden = y <= 600;
        }
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    if (scrollTop) {
        scrollTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    /* ---------- Reveal on scroll ---------- */
    var reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        if (prefersReducedMotion) {
            reveals.forEach(function (el) { el.classList.add('is-visible'); });
        } else {
            var revealObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            reveals.forEach(function (el) { revealObserver.observe(el); });
        }
    }

    /* ---------- Counters ---------- */
    var counters = document.querySelectorAll('[data-target]');
    if (counters.length) {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                var target = parseInt(el.getAttribute('data-target'), 10) || 0;
                var suffix = el.getAttribute('data-suffix') || '';
                if (prefersReducedMotion) {
                    el.textContent = target + suffix;
                } else {
                    var duration = 2000;
                    var start = null;
                    el.textContent = '0';
                    function tick(ts) {
                        if (!start) start = ts;
                        var progress = Math.min((ts - start) / duration, 1);
                        var eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.floor(eased * target) + suffix;
                        if (progress < 1) {
                            window.requestAnimationFrame(tick);
                        }
                    }
                    window.requestAnimationFrame(tick);
                }
                counterObserver.unobserve(el);
            });
        }, { threshold: 0.5 });
        counters.forEach(function (el) { counterObserver.observe(el); });
    }

    /* ---------- Active nav link ---------- */
    var navLinks = document.querySelectorAll('.site-nav .nav-link[href^="#"], .mobile-menu-links a[href^="#"]');
    var sections = Array.prototype.slice.call(
        document.querySelectorAll('section[id], header[id]')
    );

    function setActiveNav(id) {
        navLinks.forEach(function (link) {
            var isActive = link.getAttribute('href') === '#' + id;
            link.classList.toggle('is-active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    if (navLinks.length && sections.length) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    setActiveNav(entry.target.id);
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        sections.forEach(function (s) { spy.observe(s); });
    }

    /* ---------- FAQ: keep one open at a time ---------- */
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
        item.addEventListener('toggle', function () {
            if (item.open) {
                faqItems.forEach(function (other) {
                    if (other !== item) other.open = false;
                });
            }
        });
    });

    /* ---------- Hero particles ---------- */
    var particles = document.getElementById('particles');
    if (particles && !prefersReducedMotion) {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < 18; i++) {
            var drop = document.createElement('span');
            drop.className = 'water-drop';
            var size = Math.random() * 6 + 4;
            drop.style.left = Math.random() * 100 + '%';
            drop.style.width = size + 'px';
            drop.style.height = size + 'px';
            drop.style.animationDuration = (Math.random() * 8 + 6) + 's';
            drop.style.animationDelay = (Math.random() * 6) + 's';
            fragment.appendChild(drop);
        }
        particles.appendChild(fragment);
    }

    /* ---------- Footer year ---------- */
    var yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
})();
