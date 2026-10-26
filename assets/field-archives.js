(() => {
  'use strict';
  const search = document.getElementById('search');
  const entries = [...document.querySelectorAll('.archive-entry')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  const count = document.getElementById('searchCount');
  const empty = document.getElementById('noResults');
  if (!search || !entries.length) return;
  let currentFilter = 'all';
  function apply() {
    const query = search.value.trim().toLocaleLowerCase('en');
    let visible = 0;
    for (const entry of entries) {
      const haystack = (entry.getAttribute('data-search') || '').toLocaleLowerCase('en');
      const passes = (currentFilter === 'all' || entry.dataset.type === currentFilter) &&
        (!query || haystack.includes(query));
      entry.hidden = !passes;
      if (passes) visible++;
    }
    if (empty) empty.hidden = visible !== 0;
    if (count) {
      const message = 'DISPLAYING ' + visible + ' OF ' + entries.length + ' REGISTERED ENTRIES';
      if (window.VeydranRecordsLanguage) window.VeydranRecordsLanguage.updateText(count, message);
      else count.textContent = message;
    }
  }
  search.addEventListener('input', apply);
  filters.forEach(button => button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    apply();
  }));
  // Direct links to an individual dossier open it for visitors.
  function openTarget() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const entry = entries.find(item => item.id === id);
    if (entry) {
      entry.open = true;
      entry.scrollIntoView({block:'start'});
    }
  }
  window.addEventListener('hashchange', openTarget);
  apply();
  if (window.location.hash) openTarget();
})();
