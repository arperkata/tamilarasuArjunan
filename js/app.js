/* ==========================================================================
   Portfolio renderer — reads config.js and builds the page.
   You do NOT need to edit this file to customise your portfolio.
   ========================================================================== */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- safety net: show a friendly message instead of a blank page ---------- */
  function fail(msg) {
    document.getElementById('app').innerHTML =
      '<div style="max-width:640px;margin:12vh auto;padding:24px;font:16px/1.6 system-ui,sans-serif;border:1px solid #c33;border-radius:12px;background:#fff5f5;color:#400">' +
      '<h2 style="margin:0 0 8px">Portfolio could not load</h2><p>' + msg + '</p>' +
      '<p style="font-size:14px;opacity:.8">Tip: open the browser console (F12) for the exact line. Most often a comma, quote or bracket is missing in <code>config.js</code>.</p></div>';
  }
  window.addEventListener('error', e => { if (!document.querySelector('.hero')) fail(String(e.message)); });
  const C = window.PORTFOLIO;
  if (!C) return fail('<code>config.js</code> was not found or has a syntax error.');

  /* ---------- helpers ---------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // **bold** and *gradient* markup (text is escaped first, so it is safe)
  const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<span class="grad">$1</span>');
  const get = (o, p, d) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o) ?? d;
  const on = k => get(C, 'sections.' + k + '.enabled', true) !== false;
  const sec = k => C.sections[k] || {};
  const safeUrl = u => { u = String(u || '').trim(); return /^(https?:|mailto:|tel:|#|\/|\.\/|[\w-]+\/)/i.test(u) ? esc(u) : ''; };
  const person = C.person || {};
  const social = person.social || {};

  /* ---------- theme (colours) ---------- */
  function applyPalette(mode) {
    const preset = (window.THEMES || {})[get(C, 'theme.preset', 'goldSilver')] || (window.THEMES || {}).goldSilver || {};
    const base = Object.assign({}, preset[mode] || preset.dark || {}, get(C, 'theme.overrides.' + mode, {}));
    Object.keys(base).forEach(k => root.style.setProperty('--' + k, base[k]));
    root.style.setProperty('--card', mode === 'dark' ? 'rgba(255,255,255,.045)' : 'rgba(255,255,255,.85)');
    root.style.setProperty('--border', 'color-mix(in srgb,' + base.a + ' ' + (mode === 'dark' ? 18 : 22) + '%,transparent)');
    root.style.setProperty('--shadow', mode === 'dark' ? '0 10px 40px rgba(0,0,0,.5)' : '0 10px 30px rgba(40,40,60,.14)');
    root.style.setProperty('--grad', 'linear-gradient(120deg,' + base.g1 + ',' + base.g2 + ' 50%,' + base.g3 + ')');
    const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = base.bg;
  }
  function setTheme(t) {
    root.dataset.theme = t; applyPalette(t);
    const b = $('#theme'); if (b) b.textContent = t === 'light' ? '☀️' : '🌙';
    try { localStorage.setItem('theme', t); } catch (e) { }
  }
  (function initTheme() {
    let saved; try { saved = localStorage.getItem('theme'); } catch (e) { }
    const def = get(C, 'site.defaultTheme', 'dark');
    const auto = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const t = saved || (def === 'auto' ? auto : def);
    root.dataset.theme = t; applyPalette(t);
  })();

  /* ---------- page meta ---------- */
  if (get(C, 'site.title')) document.title = C.site.title;
  const md = document.querySelector('meta[name=description]'); if (md) md.content = get(C, 'site.description', '');
  ['og:title', 'og:description'].forEach((p, i) => {
    const m = document.createElement('meta'); m.setAttribute('property', p);
    m.content = i ? get(C, 'site.description', '') : get(C, 'site.title', ''); document.head.appendChild(m);
  });
  const initials = String(person.name || 'ME').split(/\s+/).filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const fav = document.createElement('link'); fav.rel = 'icon';
  fav.href = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="' + (getComputedStyle(root).getPropertyValue('--bg') || '#111') + '"/><text x="32" y="43" font-size="28" font-family="Arial" font-weight="700" text-anchor="middle" fill="' + (getComputedStyle(root).getPropertyValue('--a') || '#fc6') + '">' + esc(initials) + '</text></svg>');
  document.head.appendChild(fav);

  /* ---------- icons ---------- */
  const ICON = {
    linkedin: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.1c.5-1 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21h-4v-5c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V21h-4z',
    github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
    x: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    website: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 9h-3.1a15.700 15.700 0 0 0-1.300-5.300A8 8 0 0 1 18.900 11zM12 4c.9 1.200 1.600 3.100 1.800 5H10.200c.2-1.900.9-3.800 1.800-5zM4.300 13h3.100c.1 1.900.5 3.700 1.300 5.300A8 8 0 0 1 4.300 13zm3.100-2H4.300a8 8 0 0 1 4.400-5.300C7.900 7.300 7.500 9.100 7.400 11zM12 20c-.9-1.200-1.600-3.100-1.800-5h3.600c-.2 1.900-.9 3.800-1.800 5zm2.300-7H9.700a15 15 0 0 1 0-2h4.600a15 15 0 0 1 0 2zm.4 5.300c.8-1.600 1.200-3.400 1.300-5.300h3.100a8 8 0 0 1-4.400 5.300z',
    email: 'M3 5h18a1 1 0 0 1 1 1v.4l-10 6.600L2 6.400V6a1 1 0 0 1 1-1zm-1 3.800l10 6.600 10-6.600V18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z',
  };
  const LABEL = { linkedin: 'LinkedIn', github: 'GitHub', x: 'X', website: 'Website' };
  const socialList = () => Object.keys(social).filter(k => social[k] && safeUrl(social[k])).map(k => ({ key: k, url: safeUrl(social[k]), label: LABEL[k] || k }));

  /* ---------- section header ---------- */
  const head = (k, extra) => {
    const s = sec(k);
    return '<div class="eyebrow">' + esc(s.eyebrow || '') + '</div><h2>' + fmt(s.title || '') + '</h2>' +
      (s.subtitle ? '<p class="sub">' + esc(s.subtitle) + '</p>' : '') + (extra || '');
  };

  /* ==========================================================================
     BUILD HTML
     ========================================================================== */
  const navItems = [['home', 'Home', true]].concat(
    ['about', 'skills', 'experience', 'pipeline', 'impact', 'highlights', 'contact']
      .filter(on).map(k => [k, sec(k).nav || sec(k).eyebrow || k, true]));
  const navLinks = navItems.filter(n => n[0] !== 'home');

  function buildNav() {
    return '<div class="dots" id="dots" role="navigation" aria-label="Sections">' +
      navItems.map(n => '<a href="#' + n[0] + '" data-l="' + esc(n[1]) + '" aria-label="' + esc(n[1]) + '"></a>').join('') + '</div>' +
      '<nav aria-label="Main"><div class="wrap"><a href="#home" class="logo"><span class="grad">' + esc(initials) + '</span>.</a>' +
      '<div class="links" id="links">' + navLinks.map(n => '<a href="#' + n[0] + '">' + esc(n[1]) + '</a>').join('') + '</div>' +
      '<div style="display:flex;gap:8px">' +
      (get(C, 'site.showThemeToggle', true) ? '<button class="icon-btn" id="theme" aria-label="Toggle theme">🌙</button>' : '') +
      '<button class="icon-btn burger" id="burger" aria-label="Menu">☰</button></div></div></nav>';
  }

  function buildHero() {
    const ph = person.photo || {};
    const hasPhoto = !!(ph.src && String(ph.src).trim());
    const style = ['cutout', 'rounded', 'circle'].includes(ph.style) ? ph.style : 'rounded';
    const photo = hasPhoto ?
      '<figure class="avatar ' + style + '"><div class="ring"><img src="' + safeUrl(ph.src) + '" alt="' + esc(ph.alt || person.name || '') + '" fetchpriority="high" onerror="this.closest(\'.avatar\').remove();document.querySelector(\'.hero\').classList.add(\'nophoto\')"></div>' +
      (ph.caption ? '<figcaption class="tag"><span class="dot"></span> ' + esc(ph.caption) + '</figcaption>' : '') + '</figure>' : '';
    const ctas = ['<a class="btn primary" href="#' + (on('experience') ? 'experience' : (navLinks[0] || ['about'])[0]) + '">View my work →</a>']
      .concat(socialList().map(s => '<a class="btn ghost" href="' + s.url + '" target="_blank" rel="noopener">' + esc(s.label) + ' ↗</a>'))
      .concat(person.email ? ['<a class="btn ghost" href="mailto:' + esc(person.email) + '">Email me</a>'] : []);
    const badgeBits = [person.location, person.availability].filter(Boolean).map(esc).join(' · ');
    return '<header class="hero' + (hasPhoto ? '' : ' nophoto') + '" id="home"><div class="blob b1"></div><div class="blob b2"></div>' +
      (get(C, 'site.showBackgroundNetwork', true) ? '<canvas id="net" aria-hidden="true"></canvas>' : '') +
      '<div class="wrap">' + photo + '<div class="intro">' +
      (badgeBits ? '<div class="badge"><span class="dot"></span> ' + badgeBits + '</div>' : '') +
      '<h1>' + esc(person.hello || "Hi, I'm") + ' <span class="grad">' + esc(person.name || '') + '</span></h1>' +
      '<p class="role">' + esc(person.rolePrefix || '') + ' <b id="typed"></b><span class="caret"></span></p>' +
      (person.summary ? '<p class="lead">' + esc(person.summary) + '</p>' : '') +
      '<div class="cta">' + ctas.join('') + '</div></div></div></header>';
  }

  function buildStats() {
    const st = C.stats || []; if (!st.length) return '';
    return '<div class="wrap"><div class="stats">' + st.map(s =>
      '<div class="stat rv"><div class="num grad" data-to="' + (+s.value || 0) + '" data-suf="' + esc(s.suffix || '') + '">0</div><div class="lbl">' + esc(s.label) + '</div></div>').join('') + '</div></div>';
  }

  function buildMarquee() {
    const m = C.marquee || {}; if (m.enabled === false || !(m.items || []).length) return '';
    const items = m.items.map(t => '<span>' + esc(t) + '</span>').join('');
    return '<div class="marq" aria-label="' + esc(m.label || '') + '">' + (m.label ? '<div class="lbl">' + esc(m.label) + '</div>' : '') + '<div class="track">' + items + items + '</div></div>';
  }

  function codeVal(v) {
    if (Array.isArray(v)) return '[' + v.map(x => '<span class="s">"' + esc(x) + '"</span>').join(', ') + ']';
    if (typeof v === 'boolean') return '<span class="k">' + v + '</span>';
    if (typeof v === 'number') return '<span class="n">' + v + '</span>';
    return '<span class="s">"' + esc(v) + '"</span>';
  }
  function buildAbout() {
    const a = C.about || {}, cc = a.codeCard || {};
    const paras = (a.paragraphs || []).map(p => '<p>' + fmt(p) + '</p>').join('');
    const card = cc.enabled !== false && (cc.lines || []).length ?
      '<div class="terminal rv" style="margin-top:24px"><div class="tbar"><i></i><i></i><i></i></div><div class="tbody"><span class="cm">// ' + esc(cc.fileName || 'profile.ts') + '</span><br>' +
      '<span class="k">const</span> ' + esc(cc.variable || 'me') + ' = {<br>' +
      cc.lines.map(l => '&nbsp;&nbsp;' + esc(l.key) + ': ' + codeVal(l.value)).join(',<br>') + '<br>};</div></div>' : '';
    const panels = (a.panels || []).map(p => '<div class="panel"><h3>' + esc((p.icon ? p.icon + ' ' : '') + p.title) + '</h3>' +
      (p.chips ? '<div class="chips">' + p.chips.map(c => '<span class="chip">' + esc(c) + '</span>').join('') + '</div>' : '') +
      (p.text ? '<p style="margin:0">' + fmt(p.text) + '</p>' : '') + '</div>').join('');
    return '<section id="about"><div class="wrap">' + head('about') + '<div class="about"><div class="rv">' + paras + card + '</div><div class="rv">' + panels + '</div></div></div></section>';
  }

  const buildSkills = () => (C.skills || []).length ?
    '<section id="skills" style="background:var(--bg2)"><div class="wrap">' + head('skills') +
    '<input class="search" id="search" type="search" placeholder="Search a skill…" aria-label="Search skills"><div class="tabs" id="tabs"></div><div class="grid" id="skillGrid"></div></div></section>' : '';

  function buildExperience() {
    const jobs = (C.experience || []).map((j, i) => {
      const blocks = (j.blocks || []).map((b, bi) =>
        '<div class="blk' + (j.collapseAfter && bi >= j.collapseAfter ? ' more' : '') + '">' + (b.heading ? '<h5>' + esc(b.heading) + '</h5>' : '') +
        '<ul>' + (b.bullets || []).map(x => '<li>' + fmt(x) + '</li>').join('') + '</ul></div>').join('');
      const more = j.collapseAfter && (j.blocks || []).length > j.collapseAfter ?
        '<button class="toggle" data-more="' + esc(j.moreLabel || 'Show more') + '" aria-expanded="false">' + esc(j.moreLabel || 'Show more') + ' ↓</button>' : '';
      return '<article class="job spot rv' + (j.current ? ' now' : '') + '"><header><div><h3>' + esc(j.role) + '</h3><div class="co">' + esc(j.company) + '</div></div><div class="date">' + esc(j.period) + '</div></header>' + blocks + more + '</article>';
    }).join('');
    return '<section id="experience"><div class="wrap">' + head('experience') + '<div class="timeline">' + jobs + '</div></div></section>';
  }

  function buildPipeline() {
    const p = C.pipeline || {}; if (!(p.stages || []).length) return '';
    return '<section id="pipeline"><div class="wrap">' + head('pipeline') + '<div class="pipe rv"><div class="cta"><button class="btn primary" id="runPipe">▶ Run pipeline</button><button class="btn ghost" id="failPipe">Simulate a failure</button></div>' +
      '<div class="stages" id="stages">' + p.stages.map(s => '<div class="stg"><b>' + esc(s.name) + '</b>' + esc(s.detail || '') + '</div>').join('') + '</div><div class="verdict" id="verdict">Ready.</div></div></div></section>';
  }

  function buildImpact() {
    const im = C.impact || {};
    const ring = r => '<div class="panel ringcard" style="--p:' + (Math.min(100, Math.max(0, +r.value || 0)) / 100) + '"><div class="ring-wrap"><svg class="ring-svg" viewBox="0 0 120 120"><circle class="trk" cx="60" cy="60" r="52"/><circle class="bar" cx="60" cy="60" r="52"/></svg><div class="rnum"><span class="grad" data-to="' + (+r.value || 0) + '" data-suf="%">0</span></div></div><p>' + esc(r.label) + '</p></div>';
    const b = im.bars;
    const bars = b && (b.rows || []).length ? '<div class="panel speed"><h3>' + esc(b.title || '') + '</h3>' + b.rows.map(r =>
      '<div class="brow"><div class="bl"><span>' + esc(r.label) + '</span><b>' + esc(r.display || '') + '</b></div><div class="bt"><div class="bf" style="--w:' + Math.min(100, Math.max(0, +r.percent || 0)) + '%"></div></div></div>').join('') + (b.note ? '<small>' + esc(b.note) + '</small>' : '') + '</div>' : '';
    const bento = (im.rings || []).length || bars ?
      '<div class="bento rv" style="grid-template-columns:' + (((im.rings || []).length ? 'repeat(' + im.rings.length + ',1fr) ' : '') + (bars ? '1.4fr' : '')) + '">' +
      '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--g1)"/><stop offset=".5" stop-color="var(--g2)"/><stop offset="1" stop-color="var(--g3)"/></linearGradient></defs></svg>' +
      (im.rings || []).map(ring).join('') + bars + '</div>' : '';
    const cards = (im.cards || []).length ? '<div class="ach">' + im.cards.map(c => '<div class="card rv"><div class="big grad">' + esc(c.big) + '</div><p>' + fmt(c.text) + '</p></div>').join('') + '</div>' : '';
    return '<section id="impact" style="background:var(--bg2)"><div class="wrap">' + head('impact') + bento + cards + '</div></section>';
  }

  const buildHighlights = () => (C.highlights || []).length ?
    '<section id="highlights"><div class="wrap">' + head('highlights') + '<div class="ai-grid">' + C.highlights.map(h =>
      '<div class="card rv">' + (h.icon ? '<div class="ic">' + esc(h.icon) + '</div>' : '') + '<h4>' + esc(h.title) + '</h4><p>' + fmt(h.text) + '</p></div>').join('') + '</div></div></section>' : '';

  function buildContact() {
    const cta = (person.email ? ['<a class="btn primary" href="mailto:' + esc(person.email) + '">✉ ' + esc(person.email) + '</a>', '<button class="btn ghost" id="copy" data-email="' + esc(person.email) + '">⧉ Copy email</button>'] : [])
      .concat(socialList().map(s => '<a class="btn ghost" href="' + s.url + '" target="_blank" rel="noopener">' + esc(s.label) + '</a>'));
    return '<section id="contact" class="contact" style="background:var(--bg2)"><div class="wrap">' + head('contact') + '<div class="cta">' + cta.join('') + '</div></div></section>';
  }

  function buildFooter() {
    const ic = socialList().map(s => ({ k: s.key, url: s.url, label: s.label })).concat(person.email ? [{ k: 'email', url: 'mailto:' + esc(person.email), label: 'Email' }] : []);
    return '<footer><div class="soc">' + ic.map(i => '<a href="' + i.url + '"' + (i.k === 'email' ? '' : ' target="_blank" rel="noopener"') + ' aria-label="' + esc(i.label) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + (ICON[i.k] || ICON.website) + '"/></svg></a>').join('') + '</div>' +
      '© <span id="yr"></span> ' + esc(get(C, 'footer.text', person.name || '')) + '</footer>';
  }

  document.getElementById('app').innerHTML =
    '<a class="skip" href="#about">Skip to content</a><div id="bar"></div><button class="icon-btn" id="top" aria-label="Back to top">↑</button><div class="toast" id="toast" role="status"></div>' +
    buildNav() + buildHero() + buildStats() + buildMarquee() +
    (on('about') ? buildAbout() : '') + (on('skills') ? buildSkills() : '') + (on('experience') ? buildExperience() : '') +
    (on('pipeline') ? buildPipeline() : '') + (on('impact') ? buildImpact() : '') + (on('highlights') ? buildHighlights() : '') + (on('contact') ? buildContact() : '') + buildFooter();

  /* ==========================================================================
     INTERACTIONS
     ========================================================================== */
  setTheme(root.dataset.theme);
  const tg = $('#theme'); if (tg) tg.onclick = () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
  $('#burger').onclick = () => $('#links').classList.toggle('open');
  $$('#links a').forEach(a => a.addEventListener('click', () => $('#links').classList.remove('open')));

  // typing
  const roles = (person.roles || []).filter(Boolean);
  if (roles.length) {
    let ri = 0, ci = 0, del = false; const el = $('#typed');
    if (reduce) el.textContent = roles[0]; else (function tick() {
      const w = roles[ri]; el.textContent = w.slice(0, ci);
      if (!del && ci === w.length) { del = true; return setTimeout(tick, 1600); }
      if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; }
      ci += del ? -1 : 1; setTimeout(tick, del ? 35 : 70);
    })();
  }

  // skills
  if ($('#skillGrid')) {
    const cats = C.skills.map(s => s.category), tabs = ['All'].concat(cats); let cur = 'All', q = '';
    const draw = () => {
      $('#tabs').innerHTML = tabs.map(t => '<button class="tab ' + (t === cur ? 'on' : '') + '" data-t="' + esc(t) + '">' + esc(t) + '</button>').join('');
      const hit = i => q && String(i).toLowerCase().includes(q);
      $('#skillGrid').innerHTML = C.skills.flatMap(s => (s.groups || []).map(g => {
        const show = (cur === 'All' || cur === s.category) && (!q || (g.items || []).some(hit));
        return '<div class="skill spot ' + (show ? '' : 'hide') + '"><h4>' + esc(g.title) + '</h4><div class="chips">' + (g.items || []).map(i => '<span class="chip ' + (hit(i) ? 'hit' : '') + '">' + esc(i) + '</span>').join('') + '</div></div>';
      })).join('');
    };
    $('#tabs').onclick = e => { const b = e.target.closest('.tab'); if (b) { cur = b.dataset.t; draw(); } };
    let st; $('#search').oninput = e => { clearTimeout(st); st = setTimeout(() => { q = e.target.value.trim().toLowerCase(); draw(); }, 120); };
    draw();
  }

  // experience "show more"
  $$('.job .toggle').forEach(b => b.onclick = () => {
    const job = b.closest('.job'), o = job.classList.toggle('open');
    b.textContent = o ? 'Show less ↑' : b.dataset.more + ' ↓'; b.setAttribute('aria-expanded', o);
  });

  // reveal + counters
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; e.target.classList.add('in'); io.unobserve(e.target);
    const nums = e.target.matches('[data-to]') ? [e.target] : $$('[data-to]', e.target);
    nums.forEach(n => {
      const to = +n.dataset.to, t0 = performance.now(), suf = n.dataset.suf || '';
      (function f(t) { const p = reduce ? 1 : Math.min((t - t0) / 1400, 1); n.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(f); })(t0);
    });
  }), { threshold: .15 });
  $$('.rv').forEach(el => io.observe(el));

  // scroll progress + active links
  const secs = $$('section,header.hero'), bar = $('#bar'), topBtn = $('#top'); let tick2 = false, curId = '';
  function onScroll() {
    tick2 = false; const h = document.documentElement;
    bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1) * 100) + '%';
    topBtn.classList.toggle('show', h.scrollTop > 600);
    let id = 'home'; secs.forEach(s => { if (s.getBoundingClientRect().top < 120) id = s.id; });
    if (id !== curId) { curId = id; $$('#links a,#dots a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + id)); }
  }
  addEventListener('scroll', () => { if (!tick2) { tick2 = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  topBtn.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
  $('#yr').textContent = new Date().getFullYear();

  // toast + copy email
  const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(t._x); t._x = setTimeout(() => t.classList.remove('show'), 2200); };
  const cp = $('#copy'); if (cp) cp.onclick = async () => { try { await navigator.clipboard.writeText(cp.dataset.email); toast('Email copied ✓'); } catch (e) { toast(cp.dataset.email); } };

  // spotlight glow + 3D tilt
  document.addEventListener('pointermove', e => {
    const c = e.target.closest && e.target.closest('.spot,.card,.job,.panel,.stat'); if (!c) return;
    const r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });
  $$('.card,.job,.panel,.stat').forEach(el => el.classList.add('spot'));
  if (fine && !reduce) $$('.ach .card,.ai-grid .card').forEach(el => {
    el.classList.add('tilt');
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; el.style.transform = 'perspective(700px) rotateY(' + x * 10 + 'deg) rotateX(' + (-y * 10) + 'deg) translateY(-6px)'; });
    el.addEventListener('pointerleave', () => el.style.transform = '');
  });

  // pipeline demo
  if ($('#stages')) {
    const stg = $$('#stages .stg'), vd = $('#verdict'); let running = false;
    const failAt = Math.min(stg.length, Math.max(1, +get(C, 'pipeline.failAtStage', 3))) - 1;
    function run(fail) {
      if (running) return; running = true; vd.textContent = 'Running…'; vd.style.color = '';
      stg.forEach(s => { s.className = 'stg'; s.style.borderColor = ''; s.querySelector('.fill')?.remove(); });
      let i = 0;
      (function next() {
        if (i > 0) stg[i - 1].classList.replace('run', 'ok');
        if (fail && i === failAt + 1) { stg[failAt].className = 'stg'; stg[failAt].style.borderColor = '#f87171'; vd.textContent = get(C, 'pipeline.failText', '✗ Failed'); vd.style.color = '#f87171'; running = false; return; }
        if (i === stg.length) { vd.textContent = get(C, 'pipeline.passText', '✓ Passed'); vd.style.color = '#34d399'; running = false; return; }
        const s = stg[i]; s.classList.add('run'); const f = document.createElement('span'); f.className = 'fill'; s.appendChild(f);
        f.animate([{ width: '0' }, { width: '100%' }], { duration: reduce ? 1 : 700, fill: 'forwards' });
        i++; setTimeout(next, reduce ? 50 : 800);
      })();
    }
    $('#runPipe').onclick = () => run(false); $('#failPipe').onclick = () => run(true);
  }

  // hero network canvas
  const cv = $('#net');
  if (cv && !reduce) {
    const g = cv.getContext('2d'); let W, H, pts = [], vis = true; const mouse = { x: -999, y: -999 };
    const size = () => { const r = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2); W = cv.width = r.width * d; H = cv.height = r.height * d; const n = Math.min(70, Math.floor(r.width / 18)); pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4 * d, vy: (Math.random() - .5) * .4 * d })); };
    size(); addEventListener('resize', size);
    $('#home').addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(), d = W / r.width; mouse.x = (e.clientX - r.left) * d; mouse.y = (e.clientY - r.top) * d; }, { passive: true });
    new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !document.hidden) loop(); }).observe(cv);
    function loop() {
      if (!vis || document.hidden) return; g.clearRect(0, 0, W, H);
      const c = getComputedStyle(root).getPropertyValue('--a').trim(), L = 140 * (W / cv.getBoundingClientRect().width); g.fillStyle = c;
      for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; const dx = p.x - mouse.x, dy = p.y - mouse.y; if (dx * dx + dy * dy < L * L) { p.x += dx * .002; p.y += dy * .002; } g.beginPath(); g.arc(p.x, p.y, 1.8, 0, 6.3); g.fill(); }
      g.strokeStyle = c; for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y); if (d < L) { g.globalAlpha = (1 - d / L) * .5; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); } }
      g.globalAlpha = 1; requestAnimationFrame(loop);
    }
    document.addEventListener('visibilitychange', () => { if (!document.hidden && vis) loop(); });
  }
})();
