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

    // ========== STICKY CTA VISIBILITY ==========
    const stickyCta = document.getElementById('sticky-cta');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Nascondi scroll indicator dopo 200px
        if (scrollIndicator) {
            if (scrolled > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }

        // Mostra sticky CTA dopo 300px
        if (stickyCta) {
            if (scrolled > 300) {
                stickyCta.style.opacity = '1';
                stickyCta.style.transform = 'translateY(0)';
            } else {
                stickyCta.style.opacity = '0';
                stickyCta.style.transform = 'translateY(100px)';
            }
        }
    });

    // Inizializza stato sticky CTA
    if (stickyCta) {
        stickyCta.style.opacity = '0';
        stickyCta.style.transform = 'translateY(100px)';
    }
});
