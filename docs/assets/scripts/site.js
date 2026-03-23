(function () {
  'use strict';

  const HOME_DOC = '__cover__';
  const DEFAULT_DOC = 'README.md';
  const COVERPAGE_DOC = '_coverpage.md';
  const contentEl = document.getElementById('content');
  const sidebarEl = document.getElementById('sidebar-tree');
  const searchEl = document.getElementById('site-search');
  let coverpageMarkdown = null;

  let currentDoc = DEFAULT_DOC;

  if (window.Prism && window.Prism.languages && window.Prism.languages.cpp) {
    window.Prism.languages['c++'] = window.Prism.languages.cpp;
    window.Prism.languages['C++'] = window.Prism.languages.cpp;
  }

  marked.setOptions({
    gfm: true,
    breaks: false,
    highlight(code, lang) {
      const normalized = normalizeLang(lang);
      if (window.Prism && window.Prism.languages[normalized]) {
        return window.Prism.highlight(code, window.Prism.languages[normalized], normalized);
      }
      return code;
    }
  });

  function normalizeLang(lang) {
    const raw = String(lang || '').trim().toLowerCase();
    if (raw === 'c++') return 'cpp';
    if (raw === 'powershell') return 'powershell';
    return raw || 'plaintext';
  }

  function cleanDocPath(path) {
    let p = decodeURIComponent(String(path || '')).trim();
    if (!p) return DEFAULT_DOC;
    if (p.startsWith('#/')) p = p.slice(2);
    if (p.startsWith('#')) p = p.slice(1);
    if (p.startsWith('/')) p = p.slice(1);
    return p || DEFAULT_DOC;
  }

  function getDocFromLocation() {
    const queryDoc = new URLSearchParams(window.location.search).get('doc');
    if (queryDoc) return cleanDocPath(queryDoc);
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      return cleanDocPath(window.location.hash);
    }
    return HOME_DOC;
  }

  function toQueryUrl(docPath, anchor) {
    let url = docPath === HOME_DOC ? './' : `?doc=${encodeURIComponent(docPath)}`;
    if (anchor) url += `#${anchor.replace(/^#/, '')}`;
    return url;
  }

  function splitAnchor(href) {
    const idx = href.indexOf('#');
    if (idx < 0) return { path: href, anchor: '' };
    return { path: href.slice(0, idx), anchor: href.slice(idx + 1) };
  }

  function resolveRelativePath(baseDocPath, relative) {
    const baseDir = baseDocPath.includes('/') ? baseDocPath.slice(0, baseDocPath.lastIndexOf('/') + 1) : '';
    if (/^(https?:)?\/\//i.test(relative) || relative.startsWith('mailto:')) return relative;
    if (relative.startsWith('/')) return relative.slice(1);
    return new URL(relative, `https://local/${baseDir}`).pathname.replace(/^\//, '');
  }

  function preprocessMarkdown(md) {
    return String(md || '')
      .replace(/```[ \t]*C\+\+/g, '```cpp')
      .replace(/```[ \t]*c\+\+/g, '```cpp')
      .replace(/```[ \t]*Powershell/g, '```powershell');
  }

  function isCoverRoute(docPath) {
    return String(docPath || '') === HOME_DOC;
  }

  function hslToRgb(h, s, l) {
    const hue = ((h % 360) + 360) % 360;
    const sat = Math.max(0, Math.min(100, s)) / 100;
    const lig = Math.max(0, Math.min(100, l)) / 100;
    const c = (1 - Math.abs(2 * lig - 1)) * sat;
    const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    const m = lig - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (hue < 60) [r, g, b] = [c, x, 0];
    else if (hue < 120) [r, g, b] = [x, c, 0];
    else if (hue < 180) [r, g, b] = [0, c, x];
    else if (hue < 240) [r, g, b] = [0, x, c];
    else if (hue < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }

  function rgbTupleString(rgb) {
    return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  }

  function applyRandomCoverPalette() {
    // Keep the original gradient model but randomize a single base hue for natural harmony.
    const baseHue = Math.floor(Math.random() * 360);
    const c1 = hslToRgb(baseHue - 34, 64, 67);
    const c2 = hslToRgb(baseHue + 42, 68, 71);
    const c3 = hslToRgb(baseHue + 118, 58, 68);
    const b1 = hslToRgb(baseHue + 10, 58, 94);
    const b2 = hslToRgb(baseHue + 36, 66, 90);
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--cover-c1', rgbTupleString(c1));
    rootStyle.setProperty('--cover-c2', rgbTupleString(c2));
    rootStyle.setProperty('--cover-c3', rgbTupleString(c3));
    rootStyle.setProperty('--cover-b1', rgbTupleString(b1));
    rootStyle.setProperty('--cover-b2', rgbTupleString(b2));
  }

  async function loadCoverpageHTML() {
    if (coverpageMarkdown !== null) {
      return coverpageMarkdown ? marked.parse(preprocessMarkdown(coverpageMarkdown)) : '';
    }

    try {
      const response = await fetch(COVERPAGE_DOC, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      coverpageMarkdown = await response.text();
      return marked.parse(preprocessMarkdown(coverpageMarkdown));
    } catch (_) {
      coverpageMarkdown = '';
      return '';
    }
  }

  function scrollToAnchor(anchor) {
    if (!anchor) return;
    const id = decodeURIComponent(anchor.replace(/^#/, ''));
    const target = document.getElementById(id) || document.querySelector(`[name="${CSS.escape(id)}"]`);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateActiveSidebar(docPath) {
    sidebarEl.querySelectorAll('a[data-doc-path]').forEach((a) => {
      const active = a.dataset.docPath === docPath;
      a.classList.toggle('active', active);
    });
  }

  async function loadMarkdown(docPath, anchor, shouldPush) {
    const safeDoc = cleanDocPath(docPath);
    currentDoc = safeDoc;
    document.body.classList.toggle('is-cover-route', isCoverRoute(safeDoc));

    try {
      if (isCoverRoute(safeDoc)) {
        applyRandomCoverPalette();
        const coverHTML = await loadCoverpageHTML();
        contentEl.innerHTML = coverHTML ? `<section class="site-cover">${coverHTML}</section>` : '<h1>欢迎</h1>';
        rewriteContentLinks(COVERPAGE_DOC);
        updateActiveSidebar('');
        window.scrollTo({ top: 0, behavior: 'auto' });
        if (shouldPush) {
          history.pushState({ doc: safeDoc, anchor: anchor || '' }, '', toQueryUrl(safeDoc, anchor));
        }
        return;
      }

      const response = await fetch(safeDoc, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const markdown = preprocessMarkdown(await response.text());
      const mainHTML = marked.parse(markdown);
      contentEl.innerHTML = mainHTML;

      rewriteContentLinks(safeDoc);
      if (window.Prism && typeof window.Prism.highlightAllUnder === 'function') {
        window.Prism.highlightAllUnder(contentEl);
      }
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([contentEl]);
      }

      updateActiveSidebar(safeDoc);
      window.scrollTo({ top: 0, behavior: 'auto' });
      if (anchor) scrollToAnchor(anchor);

      if (shouldPush) {
        history.pushState({ doc: safeDoc, anchor: anchor || '' }, '', toQueryUrl(safeDoc, anchor));
      }
    } catch (err) {
      contentEl.innerHTML = `<h1>加载失败</h1><p>无法加载文档：<code>${safeDoc}</code></p><p>${String(err.message || err)}</p>`;
    }
  }

  function handleInternalDocNavigation(targetDoc, anchor, pushStateFlag) {
    loadMarkdown(targetDoc, anchor, pushStateFlag);
  }

  function rewriteContentLinks(baseDoc) {
    contentEl.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src') || '';
      if (!src || /^(https?:)?\/\//i.test(src) || src.startsWith('data:')) return;
      img.setAttribute('src', resolveRelativePath(baseDoc, src));
    });

    contentEl.querySelectorAll('a').forEach((a) => {
      const raw = a.getAttribute('href') || '';
      if (!raw) return;

      if (raw.startsWith('#/')) {
        const fixed = cleanDocPath(raw);
        const parts = splitAnchor(fixed);
        a.setAttribute('href', toQueryUrl(parts.path, parts.anchor));
        a.addEventListener('click', (e) => {
          e.preventDefault();
          handleInternalDocNavigation(parts.path, parts.anchor, true);
        });
        return;
      }

      if (raw.startsWith('#')) {
        const anchor = raw.slice(1);
        a.addEventListener('click', (e) => {
          e.preventDefault();
          scrollToAnchor(anchor);
        });
        return;
      }

      if (/^(https?:)?\/\//i.test(raw) || raw.startsWith('mailto:')) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
        return;
      }

      const resolved = resolveRelativePath(baseDoc, raw);
      const parts = splitAnchor(resolved);

      if (parts.path.toLowerCase().endsWith('.md')) {
        a.setAttribute('href', toQueryUrl(parts.path, parts.anchor));
        a.addEventListener('click', (e) => {
          e.preventDefault();
          handleInternalDocNavigation(parts.path, parts.anchor, true);
        });
      } else {
        a.setAttribute('href', resolved + (parts.anchor ? `#${parts.anchor}` : ''));
      }
    });
  }

  function parseSidebar(sidebarText) {
    const lines = String(sidebarText || '').split(/\r?\n/);
    const root = document.createElement('ul');
    root.className = 'tree-root';

    const ulStack = [root];

    lines.forEach((line) => {
      if (!line.trim()) return;
      const linkMatch = line.match(/^(\s*)-\s+\[(.+?)\]\((.+?)\)\s*$/);
      const textMatch = line.match(/^(\s*)-\s+(.+)$/);
      if (!linkMatch && !textMatch) return;

      const rawIndent = (linkMatch ? linkMatch[1] : textMatch[1]).replace(/\t/g, '  ');
      const level = Math.min(6, Math.floor(rawIndent.length / 2));

      while (ulStack.length > level + 1) ulStack.pop();
      while (ulStack.length < level + 1) {
        const parentLi = ulStack[ulStack.length - 1].lastElementChild;
        if (!parentLi) break;
        const childUl = document.createElement('ul');
        parentLi.appendChild(childUl);
        ulStack.push(childUl);
      }

      const li = document.createElement('li');

      if (linkMatch) {
        const text = linkMatch[2].trim();
        const href = linkMatch[3].trim();
        const a = document.createElement('a');
        a.textContent = text;

        if (/^(https?:)?\/\//i.test(href)) {
          a.href = href;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
        } else {
          const fixed = href.startsWith('#/') ? cleanDocPath(href) : href;
          const resolved = resolveRelativePath(DEFAULT_DOC, fixed);
          const parts = splitAnchor(resolved);

          if (parts.path.toLowerCase().endsWith('.md')) {
            a.href = toQueryUrl(parts.path, parts.anchor);
            a.dataset.docPath = parts.path;
            a.addEventListener('click', (e) => {
              e.preventDefault();
              handleInternalDocNavigation(parts.path, parts.anchor, true);
            });
          } else {
            a.href = resolved;
          }
        }

        li.appendChild(a);
      } else {
        const span = document.createElement('span');
        span.className = 'tree-label';
        span.textContent = textMatch[2].trim();
        li.appendChild(span);
      }

      ulStack[ulStack.length - 1].appendChild(li);
    });

    sidebarEl.innerHTML = '';
    sidebarEl.appendChild(root);
  }

  async function initSidebar() {
    try {
      const response = await fetch('_sidebar.md', { cache: 'no-cache' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      parseSidebar(text);
    } catch (err) {
      sidebarEl.innerHTML = `<p class="sidebar-error">侧栏加载失败：${String(err.message || err)}</p>`;
    }
  }

  function initSearch() {
    searchEl.addEventListener('input', () => {
      const keyword = searchEl.value.trim().toLowerCase();
      sidebarEl.querySelectorAll('li').forEach((li) => {
        const text = li.textContent.toLowerCase();
        li.style.display = !keyword || text.includes(keyword) ? '' : 'none';
      });
    });
  }

  window.addEventListener('popstate', () => {
    const doc = getDocFromLocation();
    const anchor = window.location.hash ? window.location.hash.slice(1) : '';
    loadMarkdown(doc, anchor, false);
  });

  (async function bootstrap() {
    await initSidebar();
    initSearch();

    const doc = getDocFromLocation();
    const anchor = window.location.hash && !window.location.hash.startsWith('#/')
      ? window.location.hash.slice(1)
      : '';

    loadMarkdown(doc, anchor, false);
  })();
})();
