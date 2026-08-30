/* ============================================================
   Pedro dApps — Blog · Inscrições
   Web Push (notificação nativa do navegador) + Newsletter e-mail
   API: NEWSLETTER_API (Worker Cloudflare + D1)
   ============================================================ */
(() => {
  'use strict';

  // Valores injetados via define:vars no Layout
  const API = typeof window.NEWSLETTER_API === 'string' ? window.NEWSLETTER_API : '';
  const VAPID_KEY = typeof window.VAPID_PUBLIC_KEY === 'string' ? window.VAPID_PUBLIC_KEY : '';

  const pushButton = document.querySelector('[data-push-button]');
  const pushStatus = document.querySelector('[data-push-status]');
  const emailForm = document.querySelector('[data-newsletter-form]');
  const emailInput = document.querySelector('[data-newsletter-email]');
  const emailMessage = document.querySelector('[data-newsletter-message]');

  const isSecure = window.isSecureContext;
  const supportsPush = 'serviceWorker' in navigator && 'PushManager' in window && isSecure;
  const supportsSw = 'serviceWorker' in navigator && isSecure;

  /* ---------- Helpers de UI ---------- */
  function setPushState(state) {
    if (!pushButton || !pushStatus) return;
    pushButton.classList.remove('is-subscribed', 'is-error');
    if (state === 'subscribed') {
      pushButton.classList.add('is-subscribed');
      pushButton.textContent = '✓ Notificações ativadas';
      if (pushStatus) pushStatus.textContent = 'Você será avisado quando sair post novo.';
    } else if (state === 'unsupported') {
      pushButton.disabled = true;
      pushButton.textContent = 'Notificações indisponíveis';
      if (pushStatus) pushStatus.textContent = 'Seu navegador não suporta notificações push.';
    } else if (state === 'denied') {
      pushButton.disabled = true;
      pushButton.textContent = 'Notificações bloqueadas';
      if (pushStatus)
        pushStatus.textContent = 'Você bloqueou notificações — libere nas configurações do navegador.';
    } else {
      pushButton.textContent = 'Ativar notificações';
      if (pushStatus)
        pushStatus.textContent = 'Receba um aviso no navegador quando um novo post for publicado.';
    }
  }

  function setEmailMessage(type, text) {
    if (!emailMessage) return;
    emailMessage.textContent = text;
    emailMessage.className = `form-message form-message--${type}`;
  }

  /* ---------- Service Worker ---------- */
  async function registerSw() {
    if (!supportsSw) return null;
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;
      return reg;
    } catch (err) {
      return null;
    }
  }

  /* ---------- Web Push ---------- */
  async function pushSubscriptionJson() {
    const reg = await navigator.serviceWorker.ready;
    return reg.pushManager.getSubscription();
  }

  async function subscribePush() {
    if (!supportsPush || !API) return;
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setPushState(permission === 'denied' ? 'denied' : 'unsupported');
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: VAPID_KEY,
      });
      const payload = sub.toJSON();
      await fetch(`${API}/api/push/subscribe`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          endpoint: payload.endpoint,
          keys: { p256dh: payload.keys.p256dh, auth: payload.keys.auth },
        }),
      });
      setPushState('subscribed');
    } catch (err) {
      setPushState('unsupported');
    }
  }

  async function checkPushStatus() {
    if (!supportsPush || !API) {
      if (pushButton) setPushState('unsupported');
      return;
    }
    try {
      const sub = await pushSubscriptionJson();
      if (sub) {
        setPushState('subscribed');
      } else if (Notification.permission === 'denied') {
        setPushState('denied');
      }
    } catch (err) {
      /* silencioso */
    }
  }

  if (pushButton) {
    if (!supportsPush || !API) {
      setPushState('unsupported');
    } else {
      pushButton.addEventListener('click', subscribePush);
      // Registra o SW e restaura o estado (mesmo sem clicar, para e-mail futuro)
      registerSw().then(checkPushStatus);
    }
  }

  /* ---------- Newsletter por e-mail ---------- */
  if (emailForm && emailInput) {
    emailForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!API) {
        setEmailMessage('error', 'Serviço de inscrição indisponível no momento.');
        return;
      }
      const email = emailInput.value.trim().toLowerCase();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
      if (!emailOk) {
        setEmailMessage('error', 'Informe um e-mail válido.');
        return;
      }
      const name =
        emailForm.querySelector('[data-newsletter-name]')?.value.trim() || '';
      const submitBtn = emailForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando…';
      }
      try {
        const res = await fetch(`${API}/api/subscribe`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email, name }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setEmailMessage('ok', 'Inscrição confirmada! Você receberá os próximos posts no e-mail.');
          emailInput.value = '';
          emailForm.querySelector('[data-newsletter-name]').value = '';
        } else {
          setEmailMessage(
            'error',
            data.error && data.error.includes('já')
              ? 'Este e-mail já está inscrito. 😉'
              : 'Não foi possível inscrever. Tente novamente em instantes.',
          );
        }
      } catch (err) {
        setEmailMessage('error', 'Erro de conexão. Tente novamente em instantes.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Assinar';
        }
      }
    });
  }

  /* ---------- Rodapé da newsletter: link de cancelamento ---------- */
  document.querySelectorAll('[data-newsletter-unsubscribe]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const email = prompt('Digite o e-mail que deseja cancelar:');
      if (!email) return;
      fetch(`${API}/api/unsubscribe`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.ok ? 'E-mail removido da lista.' : 'E-mail não encontrado.');
        })
        .catch(() => alert('Erro de conexão. Tente novamente.'));
    });
  });
})();
