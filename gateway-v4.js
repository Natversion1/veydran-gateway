(() => {
  'use strict';

  const glyphMap = {
    A:'∆', B:'β', C:'Ͼ', D:'Ð', E:'Ξ', F:'Ϝ', G:'Ǥ', H:'Ħ', I:'ɪ', J:'ʆ', K:'Ҡ', L:'Ł', M:'Ϻ',
    N:'И', O:'Θ', P:'Ƥ', Q:'Ҩ', R:'Я', S:'Ϟ', T:'Ŧ', U:'Ս', V:'Ѵ', W:'Ш', X:'Ж', Y:'Ұ', Z:'Ȥ'
  };

  const languageToggle = document.getElementById('languageToggle');
  const toast = document.getElementById('toast');
  const ageModal = document.getElementById('ageModal');
  const noticeModal = document.getElementById('noticeModal');
  const noticeCode = document.getElementById('noticeCode');
  const noticeTitle = document.getElementById('noticeTitle');
  const noticeMessage = document.getElementById('noticeMessage');
  const closeNotice = document.getElementById('closeNotice');
  const singlesAd = document.getElementById('singlesAd');
  const closeAge = document.getElementById('closeAge');
  const claimAge = document.getElementById('claimAge');
  const advertImages = [...document.querySelectorAll('.artwork-card img[data-vey-src]')];
  let language = 'vey';
  const textNodes = [];

  function toVeydran(text) {
    return [...text].map((char) => glyphMap[char.toUpperCase()] || char).join('');
  }

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || parent.closest('[data-no-vey="true"]')) return NodeFilter.FILTER_REJECT;
      if (['SCRIPT','STYLE'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let node;
  while ((node = walker.nextNode())) textNodes.push({ node, english: node.nodeValue });

  function localise(text) {
    return language === 'vey' ? toVeydran(text) : text;
  }

  function applyDynamicLanguage(el) {
    if (el && el.dataset.englishMessage) el.textContent = localise(el.dataset.englishMessage);
  }

  function setAdvertArtworkLanguage() {
    advertImages.forEach((img) => {
      const target = language === 'vey'
        ? img.dataset.veySrc
        : (img.dataset.enSrc || img.dataset.veySrc);
      if (target && img.getAttribute('src') !== target) img.setAttribute('src', target);
    });
  }

  function applyLanguage() {
    const vey = language === 'vey';
    textNodes.forEach(({node, english}) => {
      node.nodeValue = vey ? toVeydran(english) : english;
    });
    languageToggle.textContent = vey ? 'ENGLISH' : 'VEYDRAN';
    document.documentElement.lang = vey ? 'x-vey' : 'en';
    document.title = vey ? toVeydran('Veydran Interstellar Authority') : 'Veydran Interstellar Authority';
    setAdvertArtworkLanguage();
    [toast, noticeCode, noticeTitle, noticeMessage].forEach(applyDynamicLanguage);
  }

  function showToast(message) {
    toast.dataset.englishMessage = message;
    toast.textContent = localise(message);
    toast.classList.remove('hidden');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.add('hidden'), 5200);
  }

  function lockScroll() {
    document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
    if (ageModal.classList.contains('hidden') && noticeModal.classList.contains('hidden')) {
      document.body.style.overflow = '';
    }
  }

  function showNotice(title, message, code = 'VEYDRAN NETWORK // REQUEST RESPONSE') {
    noticeCode.dataset.englishMessage = code;
    noticeTitle.dataset.englishMessage = title;
    noticeMessage.dataset.englishMessage = message;
    noticeCode.textContent = localise(code);
    noticeTitle.textContent = localise(title);
    noticeMessage.textContent = localise(message);
    noticeModal.classList.remove('hidden');
    lockScroll();
    showToast(message);
  }

  function closeNoticeModal() {
    noticeModal.classList.add('hidden');
    unlockScroll();
  }

  languageToggle.addEventListener('click', () => {
    language = language === 'vey' ? 'en' : 'vey';
    applyLanguage();
  });

  document.querySelectorAll('.service[data-denied] button').forEach((button) => {
    button.addEventListener('click', () => {
      const service = button.closest('.service');
      showNotice(
        service.dataset.deniedTitle || 'ACCESS DENIED',
        service.dataset.denied,
        'VEYDRAN SECURITY // CLEARANCE FAILURE'
      );
    });
  });

  document.querySelectorAll('[data-ad-message]').forEach((button) => {
    button.addEventListener('click', () => {
      showNotice(
        button.dataset.adTitle || 'REQUEST REJECTED',
        button.dataset.adMessage,
        'COMMERCIAL NETWORK // ELIGIBILITY CHECK'
      );
    });
  });

  document.querySelectorAll('.artwork-card').forEach((card) => {
    const img = card.querySelector('img');
    if (!img) return;
    const markLoaded = () => card.classList.add('image-loaded');
    const markMissing = () => card.classList.remove('image-loaded');
    img.addEventListener('load', markLoaded);
    img.addEventListener('error', markMissing);
    if (img.complete && img.naturalWidth > 0) markLoaded();
  });

  if (singlesAd) {
    singlesAd.addEventListener('click', () => {
      ageModal.classList.remove('hidden');
      lockScroll();
    });
  }

  function closeAgeGate() {
    ageModal.classList.add('hidden');
    unlockScroll();
  }

  if (closeAge) closeAge.addEventListener('click', closeAgeGate);
  if (closeNotice) closeNotice.addEventListener('click', closeNoticeModal);

  if (claimAge) {
    claimAge.addEventListener('click', () => {
      closeAgeGate();
      showNotice(
        'AGE CLAIM REJECTED',
        'ESTIMATED TERRAN LIFESPAN IS BELOW VEYDRAN ADULT THRESHOLD. NICE TRY.',
        'VEYDRAN DECENCY AUTHORITY // AUTOMATED AGE ESTIMATE'
      );
    });
  }

  [ageModal, noticeModal].forEach((modal) => {
    if (!modal) return;
    modal.addEventListener('click', (event) => {
      if (event.target !== modal) return;
      if (modal === ageModal) closeAgeGate();
      if (modal === noticeModal) closeNoticeModal();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (!noticeModal.classList.contains('hidden')) closeNoticeModal();
    else if (!ageModal.classList.contains('hidden')) closeAgeGate();
  });

  console.log('%cVEYDRAN PUBLIC NODE', 'color:#39d6ff;font-weight:bold;font-size:18px');
  console.log('Terran inspection detected. Curiosity has been added to your species profile.');

  applyLanguage();
  document.body.classList.remove('vey-loading');
})();
