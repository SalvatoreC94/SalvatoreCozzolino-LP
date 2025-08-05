document.addEventListener("DOMContentLoaded", function () {
    // Hamburger menu
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
    }

    // Formspree AJAX
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (form && status) {
        status.setAttribute('aria-live', 'polite');
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const data = new FormData(form);
            fetch(form.action, {
                method: "POST",
                body: data,
                headers: { 'Accept': 'application/json' }
            })
                .then(response => {
                    status.style.display = "block";
                    status.classList.remove("text-green-400", "text-red-400", "animate-fade-in");
                    status.classList.add("animate-fade-in");
                    if (response.ok) {
                        status.textContent = "Messaggio inviato! Ti risponderò presto 👋";
                        status.classList.remove("text-red-400");
                        status.classList.add("text-green-400");
                        form.reset();
                    } else {
                        status.textContent = "Errore nell’invio. Riprova o scrivi a salvatorecozzolino.dev@gmail.com";
                        status.classList.remove("text-green-400");
                        status.classList.add("text-red-400");
                    }
                    setTimeout(() => {
                        status.style.display = "none";
                        status.textContent = "";
                    }, 4000);
                })
                .catch(() => {
                    status.style.display = "block";
                    status.textContent = "Errore di connessione. Riprova più tardi!";
                    status.classList.remove("text-green-400");
                    status.classList.add("text-red-400");
                    setTimeout(() => {
                        status.style.display = "none";
                        status.textContent = "";
                    }, 4000);
                });
        });
    }
});
