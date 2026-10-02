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
  const commandConnect = document.getElementById('commandConnect');
  const commandModal = document.getElementById('commandModal');
  const commandModalCode = document.getElementById('commandModalCode');
  const commandModalTitle = document.getElementById('commandModalTitle');
  const commandLinkVisual = document.getElementById('commandLinkVisual');
  const commandRoute = document.getElementById('commandRoute');
  const commandRelay = document.getElementById('commandRelay');
  const commandHandshake = document.getElementById('commandHandshake');
  const commandClearance = document.getElementById('commandClearance');
  const commandProgressBar = document.getElementById('commandProgressBar');
  const commandStatus = document.getElementById('commandStatus');
  const commandPercent = document.getElementById('commandPercent');
  const commandFailure = document.getElementById('commandFailure');
  const commandActions = document.getElementById('commandActions');
  const closeCommand = document.getElementById('closeCommand');
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
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (parent.closest('[data-no-vey="true"]')) return NodeFilter.FILTER_REJECT;
      if (parent.closest('.ad-translation')) return NodeFilter.FILTER_REJECT;
      if (['SCRIPT','STYLE'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let node;
  while ((node = walker.nextNode())) textNodes.push({ node, english: node.nodeValue });

  function localise(text) { return language === 'vey' ? toVeydran(text) : text; }
  function applyDynamicLanguage(el) { if (el && el.dataset.englishMessage) el.textContent = localise(el.dataset.englishMessage); }

  function setAdvertArtworkLanguage() {
    advertImages.forEach((img) => {
      const target = language === 'en' ? (img.dataset.enSrc || img.dataset.veySrc) : img.dataset.veySrc;
      if (target && img.getAttribute('src') !== target) img.setAttribute('src', target);
    });
  }

  function applyLanguage() {
    const vey = language === 'vey';
    textNodes.forEach(({ node, english }) => { node.nodeValue = vey ? toVeydran(english) : english; });
    document.documentElement.lang = vey ? 'x-vey' : 'en';
    document.body.dataset.lang = vey ? 'vey' : 'en';
    languageToggle.textContent = vey ? 'ENGLISH' : 'VEYDRAN';
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

  function lockScroll() { document.body.style.overflow = 'hidden'; }
  function unlockScroll() {
    if (
      ageModal.classList.contains('hidden') &&
      noticeModal.classList.contains('hidden') &&
      commandModal.classList.contains('hidden')
    ) document.body.style.overflow = '';
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

  function closeNoticeModal() { noticeModal.classList.add('hidden'); unlockScroll(); }

  languageToggle.addEventListener('click', () => {
    language = language === 'vey' ? 'en' : 'vey';
    applyLanguage();
  });

  document.querySelectorAll('.service[data-denied] button').forEach((button) => {
    if (button.id === 'commandConnect') return;
    button.addEventListener('click', () => {
      const service = button.closest('.service');
      showNotice(service.dataset.deniedTitle || 'ACCESS DENIED', service.dataset.denied, 'VEYDRAN SECURITY // CLEARANCE FAILURE');
    });
  });

  const commandTimers = [];
  function clearCommandTimers() {
    while (commandTimers.length) window.clearTimeout(commandTimers.pop());
  }

  function commandSet(el, english) {
    if (el) el.textContent = localise(english);
  }

  function commandLater(delay, fn) {
    commandTimers.push(window.setTimeout(fn, delay));
  }

  function resetCommandSequence() {
    clearCommandTimers();
    commandModal.classList.remove('failed');
    commandLinkVisual.classList.remove('failed');
    commandFailure.classList.add('hidden');
    commandActions.classList.add('hidden');

    commandSet(commandModalCode, 'COMMAND NETWORK // SECURE UPLINK');
    commandSet(commandModalTitle, 'ESTABLISHING CONNECTION');
    commandSet(commandRoute, 'INITIALISING');
    commandSet(commandRelay, 'SEARCHING');
    commandSet(commandHandshake, 'PENDING');
    commandSet(commandClearance, 'PENDING');
    commandSet(commandStatus, 'INITIALISING SECURE COMMAND ROUTE');
    commandPercent.textContent = '08%';
    commandProgressBar.style.width = '8%';
  }

  function startCommandSequence() {
    resetCommandSequence();
    commandModal.classList.remove('hidden');
    lockScroll();

    commandLater(550, () => {
      commandSet(commandRoute, 'ACCEPTED');
      commandSet(commandRelay, 'NODE SEARCH');
      commandSet(commandStatus, 'LOCATING NEAREST IMPERIAL RELAY');
      commandPercent.textContent = '31%';
      commandProgressBar.style.width = '31%';
    });

    commandLater(1150, () => {
      commandSet(commandRelay, 'RELAY 7-K FOUND');
      commandSet(commandHandshake, 'NEGOTIATING');
      commandSet(commandStatus, 'NEGOTIATING CRYPTOGRAPHIC HANDSHAKE');
      commandPercent.textContent = '57%';
      commandProgressBar.style.width = '57%';
    });

    commandLater(1750, () => {
      commandSet(commandHandshake, 'ACCEPTED');
      commandSet(commandClearance, 'VERIFYING');
      commandSet(commandStatus, 'VERIFYING OPERATOR CLEARANCE');
      commandPercent.textContent = '82%';
      commandProgressBar.style.width = '82%';
    });

    commandLater(2350, () => {
      commandSet(commandStatus, 'SPECIES PROFILE RECEIVED');
      commandPercent.textContent = '97%';
      commandProgressBar.style.width = '97%';
    });

    commandLater(2850, () => {
      commandModal.classList.add('failed');
      commandLinkVisual.classList.add('failed');
      commandSet(commandModalCode, 'COMMAND SECURITY // CONNECTION RESPONSE');
      commandSet(commandModalTitle, 'ACCESS FAILURE');
      commandSet(commandClearance, 'DENIED // TERRAN');
      commandSet(commandStatus, 'CONNECTION TERMINATED');
      commandPercent.textContent = '00%';
      commandProgressBar.style.width = '100%';
      commandFailure.classList.remove('hidden');
      commandActions.classList.remove('hidden');
    });
  }

  function closeCommandModal() {
    clearCommandTimers();
    commandModal.classList.add('hidden');
    unlockScroll();
  }

  if (commandConnect) commandConnect.addEventListener('click', startCommandSequence);
  if (closeCommand) closeCommand.addEventListener('click', closeCommandModal);

  document.querySelectorAll('[data-ad-message]').forEach((button) => {
    button.addEventListener('click', () => {
      showNotice(button.dataset.adTitle || 'REQUEST REJECTED', button.dataset.adMessage, 'COMMERCIAL NETWORK // ELIGIBILITY CHECK');
    });
  });

  document.querySelectorAll('.artwork-card').forEach((card) => {
    const img = card.querySelector('img[data-vey-src]') || card.querySelector('img');
    if (!img) return;
    const markLoaded = () => card.classList.add('image-loaded');
    const markMissing = () => card.classList.remove('image-loaded');
    img.addEventListener('load', markLoaded);
    img.addEventListener('error', markMissing);
    if (img.complete && img.naturalWidth > 0) markLoaded();
  });

  if (singlesAd) singlesAd.addEventListener('click', () => { ageModal.classList.remove('hidden'); lockScroll(); });
  function closeAgeGate() { ageModal.classList.add('hidden'); unlockScroll(); }
  if (closeAge) closeAge.addEventListener('click', closeAgeGate);
  if (closeNotice) closeNotice.addEventListener('click', closeNoticeModal);

  if (claimAge) {
    claimAge.addEventListener('click', () => {
      closeAgeGate();
      showNotice('AGE CLAIM REJECTED', 'ESTIMATED TERRAN LIFESPAN IS BELOW VEYDRAN ADULT THRESHOLD. NICE TRY.', 'VEYDRAN DECENCY AUTHORITY // AUTOMATED AGE ESTIMATE');
    });
  }

  [ageModal, noticeModal, commandModal].forEach((modal) => {
    if (!modal) return;
    modal.addEventListener('click', (event) => {
      if (event.target !== modal) return;
      if (modal === ageModal) closeAgeGate();
      if (modal === noticeModal) closeNoticeModal();
      if (modal === commandModal) closeCommandModal();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (!commandModal.classList.contains('hidden')) closeCommandModal();
    else if (!noticeModal.classList.contains('hidden')) closeNoticeModal();
    else if (!ageModal.classList.contains('hidden')) closeAgeGate();
  });

  console.log('%cVEYDRAN PUBLIC NODE // BUILD 7', 'color:#39d6ff;font-weight:bold;font-size:18px');
  console.log('Terran inspection detected. Curiosity has been added to your species profile.');

  applyLanguage();
  document.body.classList.remove('vey-loading');
})();
