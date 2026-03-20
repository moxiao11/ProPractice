(function () {
  'use strict';

  const DEFAULT_DOC = 'README.md';
  const contentEl = document.getElementById('content');
  const sidebarEl = document.getElementById('sidebar-tree');
  const searchEl = document.getElementById('site-search');
  const docPathEl = document.getElementById('doc-path');

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
    return DEFAULT_DOC;
  }

  function toQueryUrl(docPath, anchor) {
    let url = `?doc=${encodeURIComponent(docPath)}`;
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
    docPathEl.textContent = safeDoc;

    try {
      const response = await fetch(safeDoc, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const markdown = preprocessMarkdown(await response.text());
      contentEl.innerHTML = marked.parse(markdown);

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
