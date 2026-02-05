/* =========================================
   ARCHIVO: main.js
   PROYECTO: CoreWeb Solutions - Portafolio Web
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // REFERENCIAS
    // =========================================
    const form = document.getElementById("formContact");
    const header = document.getElementById("header");

    const fab = document.querySelector('.fab-hamburger');
    const sideMenu = document.querySelector('.side-menu');
    const overlay = document.querySelector('.menu-overlay');
    const closeBtn = document.querySelector('.close-menu');

    // =========================================
    // EFECTO SCROLL EN HEADER
    // =========================================
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // =========================================
    // FORMULARIO DE CONTACTO (FORMSPREE)
    // =========================================
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const submitBtn = form.querySelector(".submit-btn");
            const originalText = submitBtn.textContent;

            submitBtn.textContent = "Enviando...";
            submitBtn.disabled = true;

            const formData = new FormData(form);
            const data = new URLSearchParams(formData);

            fetch(form.action, {
                method: "POST",
                body: data,
                headers: { "Accept": "application/json" }
            })
            .then(response => {
                if (response.ok) {
                    alert("¡Gracias por tu mensaje! Te responderemos lo antes posible.");
                    form.reset();
                } else {
                    return response.json().then(data => {
                        throw new Error(data.error || "Error al enviar el formulario.");
                    });
                }
            })
            .catch(error => {
                alert("Error al enviar el mensaje: " + error.message);
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // =========================================
    // ANIMACIÓN SECCIONES AL HACER SCROLL
    // =========================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // =========================================
    // MENÚ FLOTANTE + LATERAL
    // =========================================
    if (fab && sideMenu && overlay && closeBtn) {
        function toggleMenu() {
            fab.classList.toggle('active');
            sideMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : '';
        }

        fab.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Cerrar al hacer clic en un enlace del menú
        sideMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

});