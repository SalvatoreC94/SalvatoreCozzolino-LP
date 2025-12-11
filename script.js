document.addEventListener("DOMContentLoaded", function () {
    // ========== HAMBURGER MENU ==========
    const burger = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Chiudi menu su click link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Chiudi menu cliccando fuori
        document.addEventListener('click', (e) => {
            if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // ========== ANIMATED COUNTER ==========
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 secondi
        const step = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    // Intersection Observer per counter animati
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.classList.contains('counted')) {
                    animateCounter(counter);
                    counter.classList.add('counted');
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(counter => {
        counterObserver.observe(counter);
    });

    // ========== SCROLL ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Applica animazioni agli elementi con data-aos
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        const animation = el.getAttribute('data-aos');

        if (animation.includes('fade-up')) {
            el.style.transform = 'translateY(30px)';
        } else if (animation.includes('fade-right')) {
            el.style.transform = 'translateX(-30px)';
        } else if (animation.includes('fade-left')) {
            el.style.transform = 'translateX(30px)';
        } else if (animation.includes('zoom-in')) {
            el.style.transform = 'scale(0.9)';
        }

        el.style.transition = 'all 0.6s ease-out';

        const delay = el.getAttribute('data-aos-delay');
        if (delay) {
            el.style.transitionDelay = `${delay}ms`;
        }

        scrollObserver.observe(el);
    });

    // ========== STICKY CTA ==========
    const stickyCta = document.getElementById('sticky-cta');

    if (stickyCta) {
        // Nascondi sticky CTA quando si scorre verso l'alto
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll <= 100) {
                stickyCta.style.transform = 'translateX(400px)';
                stickyCta.style.opacity = '0';
            } else if (currentScroll < lastScroll) {
                // Scroll up
                stickyCta.style.transform = 'translateX(400px)';
                stickyCta.style.opacity = '0';
            } else {
                // Scroll down
                stickyCta.style.transform = 'translateX(0)';
                stickyCta.style.opacity = '1';
            }

            lastScroll = currentScroll;
        });
    }

    // ========== FORMSPREE AJAX ==========
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    if (form && status) {
        status.setAttribute('aria-live', 'polite');

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const data = new FormData(form);

            // Disabilita il bottone durante l'invio
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso...';

            fetch(form.action, {
                method: "POST",
                body: data,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                status.style.display = "block";
                status.classList.remove("text-green-400", "text-red-400");

                if (response.ok) {
                    status.textContent = "Messaggio inviato con successo! Ti risponderò presto.";
                    status.classList.add("text-green-400");
                    form.reset();
                } else {
                    status.textContent = "Errore nell'invio. Riprova o scrivi a salvatorecozzolino.dev@gmail.com";
                    status.classList.add("text-red-400");
                }

                setTimeout(() => {
                    status.style.display = "none";
                    status.textContent = "";
                }, 5000);
            })
            .catch(() => {
                status.style.display = "block";
                status.textContent = "Errore di connessione. Riprova più tardi!";
                status.classList.add("text-red-400");

                setTimeout(() => {
                    status.style.display = "none";
                    status.textContent = "";
                }, 5000);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        });
    }

    // ========== SMOOTH SCROLL WITH OFFSET FOR FIXED NAVBAR ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== NAVBAR BACKGROUND ON SCROLL ==========
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(24, 24, 27, 0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(24, 24, 27, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        }
    });

    // ========== PORTFOLIO IMAGE LAZY LOADING ==========
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ========== PREVENT SCROLL INDICATOR OVERLAP ==========
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }

    // ========== EASTER EGG: KONAMI CODE ==========
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-konamiSequence.length);

        if (konamiCode.join('') === konamiSequence.join('')) {
            // Easter egg attivato!
            document.body.style.animation = 'rainbow 2s infinite';

            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);

            setTimeout(() => {
                document.body.style.animation = '';
                style.remove();
            }, 5000);

            konamiCode = [];
        }
    });

    // ========== CONSOLE MESSAGE ==========
    console.log('%c👨‍💻 Ciao developer!', 'color: #FFD600; font-size: 24px; font-weight: bold;');
    console.log('%cSe stai guardando il codice, perché non mi scrivi? 😊', 'color: #A1A1AA; font-size: 14px;');
    console.log('%c📧 salvatorecozzolino.dev@gmail.com', 'color: #FFD600; font-size: 14px; font-weight: bold;');
});
