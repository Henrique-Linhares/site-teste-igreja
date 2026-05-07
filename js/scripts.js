document.addEventListener("DOMContentLoaded", () => {
  // 1. Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.getElementById("nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = mobileMenuBtn.querySelector("i");
      if (icon) {
        if (navLinks.classList.contains("active")) {
          icon.classList.replace("fa-bars", "fa-times");
        } else {
          icon.classList.replace("fa-times", "fa-bars");
        }
      }
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = mobileMenuBtn.querySelector("i");
        if (icon) {
          icon.classList.replace("fa-times", "fa-bars");
        }
      });
    });
  }

  // 3. WhatsApp Missions Form Logic
  const missionsForm = document.getElementById("form-whatsapp-missoes");
  if (missionsForm) {
    missionsForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const telefoneIgreja = "5516994274398";

      const nome = document.getElementById("nome").value;
      const interesse = document.getElementById("interesse").value;
      const mensagem = document.getElementById("mensagem").value;

      const textoMsg =
        `*Novo Voluntário - Missões*%0A` +
        `*Nome:* ${nome}%0A` +
        `*Interesse:* ${interesse}%0A` +
        `*Mensagem:* ${mensagem}`;

      const url = `https://api.whatsapp.com/send?phone=${telefoneIgreja}&text=${textoMsg}`;

      window.open(url, "_blank");
    });
  }

  if (typeof Swiper !== "undefined") {
    new Swiper(".mySwiper", {
      loop: true,
      autoplay: { delay: 3500 },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: {
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }
});
