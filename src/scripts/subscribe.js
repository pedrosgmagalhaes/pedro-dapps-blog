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

  /* ---------- Origem da visita (UTM), igual ao pedrodapps.com ---------- */
  const FIRST = 'pd.attr.first';
  const LAST = 'pd.attr.last';
  const readJson = (k) => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch { return null; } };
  const writeJson = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sem armazenamento */ } };
  (() => {
    const q = new URLSearchParams(location.search);
    const touch = {};
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const v = q.get(k);
      if (v) touch[k] = v.slice(0, 120);
    }
    try {
      const host = document.referrer ? new URL(document.referrer).hostname : '';
      if (host && host !== location.hostname) touch.referrer = host;
    } catch { /* referência inválida */ }
    if (!Object.keys(touch).length) return;
    touch.landing = location.pathname;
    touch.at = new Date().toISOString();
    if (!readJson(FIRST)) writeJson(FIRST, touch);
    writeJson(LAST, touch);
  })();
  const attribution = () => {
    const out = {};
    for (const [prefix, t] of [['first', readJson(FIRST)], ['last', readJson(LAST)]]) {
      if (!t) continue;
      for (const [k, v] of Object.entries(t)) if (v) out[`${prefix}_${k}`] = String(v);
    }
    return out;
  };

  /* ---------- Newsletter por e-mail (Listmonk, confirmação dupla) ---------- */
  const LISTMONK = typeof window.LISTMONK_URL === 'string' ? window.LISTMONK_URL : '';
  const ATTRIB_URL = 'https://newsletter-attrib-production.up.railway.app/attrib';
  const LIST_UUID = typeof window.LIST_UUID_NEWSLETTER === 'string' ? window.LIST_UUID_NEWSLETTER : '';
  if (emailForm && emailInput) {
    emailForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!LISTMONK || !LIST_UUID || LIST_UUID.startsWith('__')) {
        setEmailMessage('error', 'Serviço de inscrição indisponível no momento.');
        return;
      }
      const email = emailInput.value.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        setEmailMessage('error', 'Informe um e-mail válido.');
        return;
      }
      const consent = emailForm.querySelector('[data-newsletter-consent]');
      if (consent && !consent.checked) {
        setEmailMessage('error', 'Marque a caixa de consentimento para continuar.');
        return;
      }
      const submitBtn = emailForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando…';
      }
      try {
        const attribs = {
          consent_at: new Date().toISOString(),
          consent_version: '2026-10-v2',
          consent_source: location.origin + location.pathname,
          source: 'blog.pedrodapps.com',
          lang: 'pt',
          ...attribution(),
        };
        const res = await fetch(`${LISTMONK}/api/public/subscription`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email, name: email.split('@')[0], list_uuids: [LIST_UUID], attribs }),
        });
        if (!res.ok) throw new Error(String(res.status));
        // A inscrição pública do Listmonk descarta attribs: origem e consentimento vão pelo
        // serviço newsletter-attrib (o mesmo do pedrodapps.com).
        try {
          fetch(ATTRIB_URL, {
            method: 'POST',
            keepalive: true,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, attribs }),
          }).catch(() => {});
        } catch { /* origem é melhor esforço */ }
        setEmailMessage('ok', 'Quase lá! Confira seu e-mail e confirme a inscrição.');
        emailForm.reset();
        try { if (typeof gtag === 'function') gtag('event', 'sign_up', { method: 'newsletter', form_location: 'blog' }); } catch { /* sem GA */ }
      } catch (err) {
        setEmailMessage('error', 'Não foi possível inscrever agora. Tente novamente em instantes.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Assinar';
        }
      }
    });
  }
})();
