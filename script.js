// ====================
// FORMSPREE FEEDBACK
// ====================
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (form && status) {
        status.setAttribute('aria-live', 'polite');
        form.addEventListener("submit", async function (e) {
            e.preventDefault();
            const data = new FormData(form);
            const action = form.action;

            status.textContent = "";
            status.classList.remove("text-green-400", "text-red-400", "animate-fade-in");
            status.classList.add("hidden");

            try {
                const response = await fetch(action, {
                    method: "POST",
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                status.classList.remove("hidden");
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
            } catch (error) {
                status.classList.remove("text-green-400");
                status.classList.add("text-red-400");
                status.textContent = "Errore di connessione. Riprova più tardi!";
            }

            status.scrollIntoView({ behavior: 'smooth', block: 'center' });

            setTimeout(() => {
                status.classList.remove("animate-fade-in", "text-green-400", "text-red-400");
                status.classList.add("hidden");
                status.textContent = "";
            }, 4500);
        });
    }

