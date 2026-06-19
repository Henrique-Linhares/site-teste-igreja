/**
 * AD Brás Belvedere — missoes.js
 * JS exclusivo da página de missões.
 * O script.js do site principal já cuida do header/menu/scroll.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== FORMULÁRIO WHATSAPP ====================
  const form = document.getElementById('form-whatsapp-missoes');
  if (!form) return;

  // ---- Validação em tempo real ----
  const requiredFields = form.querySelectorAll('[required]');

  requiredFields.forEach(field => {
    // Valida ao sair do campo
    field.addEventListener('blur', () => validateField(field));
    // Remove erro ao começar a digitar
    field.addEventListener('input', () => clearError(field));
    field.addEventListener('change', () => clearError(field));
  });

  function validateField(field) {
    const isEmpty = field.value.trim() === '' || field.value === '';
    const errorEl = field.closest('.field-group')?.querySelector('.field-error');

    if (isEmpty) {
      field.classList.add('has-error');
      if (errorEl) errorEl.hidden = false;
      return false;
    }
    clearError(field);
    return true;
  }

  function clearError(field) {
    field.classList.remove('has-error');
    const errorEl = field.closest('.field-group')?.querySelector('.field-error');
    if (errorEl) errorEl.hidden = true;
  }

  // ---- Submit — monta mensagem e abre WhatsApp ----
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Valida todos os campos obrigatórios antes de enviar
    let isValid = true;
    requiredFields.forEach(field => {
      if (!validateField(field)) isValid = false;
    });
    if (!isValid) {
      // Rola suavemente ao primeiro campo com erro
      const firstError = form.querySelector('.has-error');
      if (firstError) {
        const headerH = document.querySelector('.site-header')?.offsetHeight ?? 72;
        const top = firstError.getBoundingClientRect().top + scrollY - headerH - 24;
        window.scrollTo({ top, behavior: 'smooth' });
        firstError.focus();
      }
      return;
    }

    // Coleta dados
    const nome       = document.getElementById('nome').value.trim();
    const whatsapp   = document.getElementById('whatsapp')?.value?.trim() ?? '';
    const interesse  = document.getElementById('interesse').value;
    const mensagem   = document.getElementById('mensagem').value.trim();

    // Disponibilidade (checkboxes)
    const dias = Array.from(
      form.querySelectorAll('input[name="disponibilidade"]:checked')
    ).map(cb => cb.value);
    const disponibilidade = dias.length ? dias.join(', ') : 'Não informado';

    // ✏️ ADAPTE: Número do WhatsApp da equipe de missões
    const telefone = '5516994274398';

    // Monta a mensagem formatada
    const texto = [
      `*✉️ Novo Voluntário — Missões AD Brás Belvedere*`,
      ``,
      `*Nome:* ${nome}`,
      whatsapp ? `*WhatsApp:* ${whatsapp}` : null,
      `*Frente de interesse:* ${interesse}`,
      `*Disponibilidade:* ${disponibilidade}`,
      mensagem ? `*Mensagem:* ${mensagem}` : null,
      ``,
      `_Enviado pelo site da AD Brás Belvedere_`,
    ]
      .filter(Boolean)
      .join('%0A');

    const url = `https://api.whatsapp.com/send?phone=${telefone}&text=${texto}`;

    // Feedback visual no botão antes de abrir
    const submitBtn = form.querySelector('.m-form__submit');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Abrindo WhatsApp...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      window.open(url, '_blank');
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
      // Re-inicializa ícones do Lucide no botão restaurado
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 600);
  });


  // ==================== SCROLL REVEAL (itens da página) ====================
  const targets = document.querySelectorAll(
    '.frente-card, .impacto-item, .impact-card, .form-step'
  );

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });

    targets.forEach((el, i) => {
      el.classList.add('reveal');
      const siblings = Array.from(el.parentElement.children);
      el.style.transitionDelay = `${siblings.indexOf(el) * 80}ms`;
      obs.observe(el);
    });
  } else {
    targets.forEach(el => el.classList.add('visible'));
  }

});