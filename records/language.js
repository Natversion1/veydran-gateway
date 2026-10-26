(() => {
  'use strict';

  // Reuse the same Veydran glyph encoding as the public gateway.
  const veyGlyphs = [
    '⌁','⟊','⌬','⟟','⟁','⊘','⊚','⌖','⟡','⊹','⧖','⧗','⟠','⍜',
    '⍟','⧈','⟐','⟢','⧇','⊞','⊡','⎔','⨳','⋮','⌗','⍉','⍖','⍗'
  ];
  const veyClusters = [
    'TION','MENT','ING','TH','SH','CH','PH','QU','ER','AN','AR','EN','IN','ON',
    'OR','ST','NT','RA','RE','VE','DR','TR','LL','SS','EE','OO'
  ];

  function veyHash(value) {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i += 1) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function encodeVeyWord(word) {
    const source = word.toUpperCase();
    const glyphs = [];
    let cursor = 0;

    while (cursor < source.length) {
      let chunk = veyClusters.find((cluster) => source.startsWith(cluster, cursor));

      if (!chunk) {
        const remaining = source.length - cursor;
        const width = remaining >= 3 && (veyHash(source + '|' + cursor) % 3 === 0)
          ? 3
          : Math.min(2, remaining);
        chunk = source.slice(cursor, cursor + width);
      }

      const glyph = veyGlyphs[veyHash(chunk + '|' + cursor + '|' + source.length) % veyGlyphs.length];
      glyphs.push(glyph);
      cursor += chunk.length;
    }

    return glyphs.join('');
  }

  function toVeydran(text) {
    const leading = (text.match(/^\s*/) || [''])[0];
    const trailing = (text.match(/\s*$/) || [''])[0];
    const core = text.trim();
    if (!core) return text;
    const encoded = core.replace(/[A-Za-z]+|[^A-Za-z]+/g, (token) => {
      if (/^[A-Za-z]+$/.test(token)) return encodeVeyWord(token);
      return token.replace(/\s+/g, ' · ');
    });
    return leading + encoded + trailing;
  }

  const languageToggle = document.getElementById('languageToggle');
  if (!languageToggle) {
    document.body.classList.remove('vey-loading');
    return;
  }

  function getSharedLanguage() {
    const match = document.cookie.match(/(?:^|;\s*)vey_lang=(en|vey)(?:;|$)/);
    return match ? match[1] : 'vey';
  }

  function setSharedLanguage(value) {
    const hostname = window.location.hostname;
    const domain = (hostname === 'veydran.space' || hostname.endsWith('.veydran.space'))
      ? '; Domain=veydran.space'
      : '';
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = 'vey_lang=' + value + domain + '; Path=/; Max-Age=31536000; SameSite=Lax' + secure;
  }

  let language = getSharedLanguage();
  const englishTitle = document.title;
  const search = document.getElementById('search');
  const englishPlaceholder = search ? search.getAttribute('placeholder') : '';
  const dynamicElements = [...document.querySelectorAll('[data-vey-dynamic]')];
  dynamicElements.forEach((el) => { el.dataset.englishMessage = el.textContent; });

  const englishNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || parent.closest('[data-no-vey="true"], [data-vey-dynamic]')) return NodeFilter.FILTER_REJECT;
      if (['SCRIPT', 'STYLE'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  let node;
  while ((node = walker.nextNode())) englishNodes.push({ node, english: node.nodeValue });

  function localise(text) { return language === 'vey' ? toVeydran(text) : text; }

  function updateText(element, english) {
    if (!element) return;
    element.dataset.englishMessage = english;
    element.textContent = localise(english);
  }

  function applyLanguage() {
    const vey = language === 'vey';
    englishNodes.forEach(({ node, english }) => { node.nodeValue = vey ? toVeydran(english) : english; });
    dynamicElements.forEach((el) => updateText(el, el.dataset.englishMessage || ''));
    if (search) search.setAttribute('placeholder', localise(englishPlaceholder));
    document.documentElement.lang = vey ? 'x-vey' : 'en';
    document.body.dataset.lang = language;
    document.title = localise(englishTitle);
    languageToggle.textContent = vey ? 'ENGLISH' : 'VEYDRAN';
    languageToggle.setAttribute('aria-label', vey ? 'Switch to English' : 'Switch to Veydran');
  }

  // The register's live search counter needs to follow the current language, too.
  window.VeydranRecordsLanguage = { updateText };

  languageToggle.addEventListener('click', () => {
    language = language === 'vey' ? 'en' : 'vey';
    setSharedLanguage(language);
    applyLanguage();
  });

  window.addEventListener('pageshow', () => {
    const shared = getSharedLanguage();
    if (language !== shared) {
      language = shared;
      applyLanguage();
    }
  });

  try { applyLanguage(); }
  finally { document.body.classList.remove('vey-loading'); }
})();
