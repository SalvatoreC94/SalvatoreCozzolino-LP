// Feedback per Formspree
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();
            const data = new FormData(form);
            const action = form.action;
            fetch(action, {
                method: "POST",
                body: data,
                headers: { 'Accept': 'application/json' }
            })
                .then(response => {
                    if (response.ok) {
                        status.textContent = "Messaggio inviato! Ti risponderò presto 👋";
                        status.classList.remove("hidden", "text-red-400");
                        status.classList.add("text-green-400");
                        form.reset();
                    } else {
                        status.textContent = "Errore nell’invio. Riprova o scrivi a salvatorecozzolino.dev@gmail.com";
                        status.classList.remove("hidden", "text-green-400");
                        status.classList.add("text-red-400");
                    }
                })
                .catch(() => {
                    status.textContent = "Errore di connessione. Riprova più tardi!";
                    status.classList.remove("hidden", "text-green-400");
                    status.classList.add("text-red-400");
                });
        });
    }
});
