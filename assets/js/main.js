/* ═══════════════════════════════════════════════════════════════════════
   m1lwh — Main application script
   Boot / typing / palette / audio / cursor / reveals / copy / etc.
   ═══════════════════════════════════════════════════════════════════════ */
'use strict';

(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  /* ═══════════ BOOT SCREEN ═══════════ */
  const boot = $('#boot');
  const bootName = $('#bootName');
  const bootLang = $('#bootLang');
  const bootEnter = $('#bootEnter');
  const bootReset = $('#bootReset');
  const savedLang = localStorage.getItem(I18N_KEY);
  const hasLang = savedLang === 'ru' || savedLang === 'en';
  let bootDone = false;

  function finishBoot() {
    if (bootDone) return;
    bootDone = true;
    boot.classList.add('done');
    document.body.classList.add('booted');
    setTimeout(() => boot?.remove(), 800);
    document.dispatchEvent(new CustomEvent('boot:done'));
    if (currentLang) runHeroTyping();
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }

  async function typeName() {
    const text = 'm1lwh';
    for (let i = 0; i <= text.length; i++) {
      bootName.textContent = text.slice(0, i);
      await new Promise(r => setTimeout(r, 90));
    }
    if (hasLang) {
      await new Promise(r => setTimeout(r, 350));
      finishBoot();
    }
  }

  if (boot) {
    $$('.lang-btn', bootLang).forEach(btn => {
      btn.addEventListener('click', () => {
        applyLang(btn.dataset.lang);
        playClick();
        finishBoot();
      });
    });
    bootEnter?.addEventListener('click', () => {
      if (!hasLang) applyLang(detectLang());
      playClick();
      finishBoot();
    });
    bootReset?.addEventListener('click', () => {
      localStorage.removeItem(I18N_KEY);
      location.reload();
    });
    if (hasLang) {
      bootReset?.classList.remove('hidden-lang');
    } else {
      bootLang?.classList.remove('hidden-lang');
    }
    typeName();
    setTimeout(() => { if (!bootDone) finishBoot(); }, 6000);
  }

  /* ═══════════ REVEAL ON SCROLL ═══════════ */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  function initReveals() {
    $$('[data-reveal]').forEach((el, i) => {
      el.style.setProperty('--d', `${el.dataset.delay ?? (i % 6) * 70}ms`);
      io.observe(el);
    });
  }

  /* ═══════════ NAVBAR ═══════════ */
  const nav = $('.nav');
  const burger = $('#navBurger');
  const mobileMenu = $('#mobileMenu');
  const fab = $('#toTop');

  function onScroll() {
    const y = window.scrollY;
    nav?.classList.toggle('scrolled', y > 10);
    const total = document.documentElement.scrollHeight - window.innerHeight;
    $('#progressBar').style.width = total > 0 ? `${(y / total) * 100}%` : '0%';
    fab?.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  burger?.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    if (open) playClick();
  });

  // Language switcher in navbar
  $$('.lang-switch button').forEach((b) => {
    b.addEventListener('click', () => {
      if (b.dataset.lang !== currentLang) {
        applyLang(b.dataset.lang);
        playClick();
      }
    });
  });

  $$('.mobile-menu a, .nav-link').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
        mobileMenu?.classList.remove('open');
        burger?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Active section highlight
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = e.target.id;
        $$('.nav-link, .mobile-menu a').forEach((l) => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('section[id]').forEach((s) => spy.observe(s));

  /* ═══════════ HERO TYPING ═══════════ */
  let typingTimer = null;
  function runHeroTyping() {
    const el = $('.hero-role .role');
    if (!el) return;
    if (prefersReduced) {
      el.textContent = t('hero_roles')[0];
      return;
    }
    if (typingTimer) { clearTimeout(typingTimer); typingTimer = null; }
    const roles = t('hero_roles');
    let ri = 0, ci = 0, deleting = false;

    const tick = () => {
      const word = roles[ri];
      ci += deleting ? -1 : 1;
      el.textContent = word.slice(0, ci);
      let delay = deleting ? 38 : 68;
      if (!deleting && ci === word.length) { delay = 1900; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 350; }
      typingTimer = setTimeout(tick, delay);
    };
    tick();
  }

  /* ═══════════ COUNTERS ═══════════ */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    if (prefersReduced) {
      el.textContent = fmtCounter(target);
      return;
    }
    const dur = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmtCounter(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function fmtCounter(n) {
    return n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K+` : `${n}+`;
  }

  const countersIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        countersIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  $$('.stat-value[data-count]').forEach((c) => countersIO.observe(c));

  // GitHub live stats (graceful fallback)
  (async () => {
    try {
      const [uRes, rRes] = await Promise.all([
        fetch('https://api.github.com/users/m1lwh'),
        fetch('https://api.github.com/users/m1lwh/repos?per_page=100&sort=updated'),
      ]);
      if (!uRes.ok || !rRes.ok) return;
      const u = await uRes.json();
      const repos = await rRes.json();
      const pj = $('.stat-value[data-count="15"]');
      if (pj) {
        pj.dataset.count = String(Math.max(15, u.public_repos));
        countersIO.observe(pj);
      }
    } catch { /* offline — keep defaults */ }
  })();

  /* ═══════════ SKILL BARS ═══════════ */
  const barsIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const bar = e.target;
        setTimeout(() => { bar.style.width = `${bar.dataset.width}%`; }, 120);
        barsIO.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });
  $$('.skill-bar[data-width]').forEach((b) => barsIO.observe(b));

  /* ═══════════ TERMINAL (no layout shift — all lines pre-rendered) ═══════════ */
  const termBody = $('#termBody');
  let termStarted = false;

  const PUFFY = [
    '                _.._',
    "             .' .-'`|",
    "            /  /  .-'|",
    '            |  |  |  |',
    "             \\  '  /  |",
    "              '--'   /",
    '                   /',
    "                 .'",
  ].join('\n');

  function buildTerminal(lang) {
    if (!termBody) return;
    const L = (wait, cls, html) => `<div class="term-line ${cls}" data-wait="${wait}">${html}</div>`;
    const KV = (k, v) => `<span class="term-key">${k}:</span><span class="term-val"> ${v}</span>`;
    const parts = [
      L(700, 'tl-ascii', `<span class="term-ascii">${PUFFY}</span>`),
      L(120, '', `<span class="term-key">m1lwh@openbsd</span><span class="term-dim"> ────────────</span>`),
      L(130, '', KV(t('term_kernel', lang), 'GENERIC.MP')),
      L(130, '', KV(t('term_shell', lang), 'ksh (94%)')),
      L(130, '', KV(t('term_uptime', lang), '2 477 days')),
      L(130, '', KV(t('term_terminal', lang), 'st · xterm')),
      L(130, '', KV(t('term_editor', lang), 'nvim · vim · IDEA')),
      L(130, '', KV(t('term_langs', lang), 'Java · Python · Bash')),
      L(130, '', KV(t('term_lines', lang), '12 400+')),
      L(500, '', '<span class="term-dim"></span>'),
      L(650, '', `<span class="term-prompt">$ </span><span class="term-cmd">${t('term_about_cmd', lang)}</span>`),
      L(600, '', `<span class="term-dim">${t('term_about_out', lang)}</span>`),
      L(650, '', `<span class="term-prompt">$ </span><span class="term-cmd">${t('term_translate_cmd', lang)}</span>`),
      L(600, '', `<span class="term-dim">${t('term_translate_out', lang)}</span>`),
      L(0, 'tl-last', `<span class="term-prompt">$ </span><span class="term-caret"></span>`),
    ];
    termBody.innerHTML = parts.join('');
  }

  function typeTerminal() {
    if (termStarted || !termBody) return;
    termStarted = true;
    const lines = $$('.term-line', termBody);
    let i = 0;
    const step = () => {
      if (i >= lines.length) { document.dispatchEvent(new CustomEvent('term:done')); return; }
      lines[i].classList.add('visible');
      const wait = parseInt(lines[i].dataset.wait || '120', 10);
      i++;
      setTimeout(step, wait);
    };
    setTimeout(step, 300);
  }

  const termIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { typeTerminal(); termIO.disconnect(); }
    });
  }, { threshold: 0.2 });
  if (termBody) {
    buildTerminal(currentLang || 'ru');
    termIO.observe(termBody);
  }

  /* ═══════════ GAME CARD TILT ═══════════ */
  if (!isTouch && !prefersReduced) {
    $$('.game-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ═══════════ MAGNETIC BUTTONS ═══════════ */
  if (!isTouch && !prefersReduced) {
    $$('.hero-cta .btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * 0.22;
        const dy = (e.clientY - r.top - r.height / 2) * 0.3;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ═══════════ COPY + TOAST ═══════════ */
  const toastWrap = $('.toast-wrap');
  let toastTimer = null;
  function toast(msg) {
    if (!toastWrap) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<i data-lucide="circle-check"></i><span></span>';
    el.querySelector('span').textContent = msg;
    toastWrap.appendChild(el);
    if (window.lucide) window.lucide.createIcons({ attrs: { class: 'lucide' } });
    requestAnimationFrame(() => el.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 400);
    }, 2400);
  }

  function copyText(text, label) {
    const done = () => { playClick(); toast(label || t('copied')); };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else fallbackCopy(text, done);
  }
  function fallbackCopy(text, done) {
    const inp = document.createElement('textarea');
    inp.value = text;
    inp.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(inp);
    inp.select();
    try { document.execCommand('copy'); done(); } catch { /* noop */ }
    inp.remove();
  }

  document.addEventListener('click', (e) => {
    const cp = e.target.closest('[data-copy]');
    if (cp) copyText(cp.dataset.copy, cp.dataset.toast ? t(cp.dataset.toast) : null);
  });

  /* ═══════════ LIGHTBOX ═══════════ */
  const lightbox = $('#lightbox');
  const lbImg = $('#lbImg');
  const lbCap = $('#lbCap');
  function openLightbox(src, capKey) {
    if (!lightbox) return;
    lbImg.src = src;
    lbCap.textContent = t(capKey);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.addEventListener('click', (e) => {
    const item = e.target.closest('[data-lb]');
    if (item) openLightbox(item.dataset.lb, item.dataset.lbCap);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.matches('[data-lb]')) {
      openLightbox(e.target.dataset.lb, e.target.dataset.lbCap);
    }
  });
  $('#lbClose')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ═══════════ FAQ ═══════════ */
  $$('.faq-item').forEach((item) => {
    const q = $('.faq-q', item);
    const a = $('.faq-a', item);
    q.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', String(open));
      a.style.maxHeight = open ? `${a.scrollHeight}px` : '';
      if (open) {
        $$('.faq-item.open').forEach((o) => {
          if (o !== item) {
            o.classList.remove('open');
            $('.faq-q', o).setAttribute('aria-expanded', 'false');
            $('.faq-a', o).style.maxHeight = '';
          }
        });
      }
    });
  });

  /* ═══════════ COMMAND PALETTE ═══════════ */
  const palette = $('#palette');
  const palInput = $('#palInput');
  const palList = $('#palList');
  let palItems = [];
  let palSel = -1;

  function buildPaletteItems() {
    const l = currentLang;
    return [
      { group: 'pal_group_nav', items: [
        { label: t('nav_about', l), icon: 'user', go: () => scrollToId('about') },
        { label: t('nav_journey', l), icon: 'route', go: () => scrollToId('journey') },
        { label: t('nav_projects', l), icon: 'folder-git-2', go: () => scrollToId('projects') },
        { label: t('nav_games', l), icon: 'gamepad-2', go: () => scrollToId('games') },
        { label: t('nav_skills', l), icon: 'zap', go: () => scrollToId('skills') },
        { label: t('nav_gallery', l), icon: 'image', go: () => scrollToId('gallery') },
        { label: t('nav_faq', l), icon: 'message-circle-question', go: () => scrollToId('faq') },
        { label: t('nav_contact', l), icon: 'mail', go: () => scrollToId('contact') },
      ] },
      { group: 'pal_group_actions', items: [
        { label: t('pal_copy_ip', l), icon: 'copy', go: () => copyText('mc.funsmine.su', t('server_copied')) },
        { label: t('pal_copy_dc', l), icon: 'copy', go: () => copyText('m1lwh_tvink', t('copied')) },
        { label: `${t('pal_theme', l)} ${l === 'ru' ? 'English' : 'Русский'}`, icon: 'languages', go: () => applyLang(l === 'ru' ? 'en' : 'ru') },
        { label: t('pal_music', l), icon: 'music-2', go: toggleMusic },
      ] },
      { group: 'pal_group_socials', items: [
        { label: t('pal_github', l), icon: 'github', go: () => window.open('https://github.com/m1lwh', '_blank') },
        { label: t('pal_tg', l), icon: 'send', go: () => window.open('https://t.me/m1lwh', '_blank') },
      ] },
    ];
  }

  function renderPalette(filter = '') {
    if (!palList) return;
    palList.innerHTML = '';
    palItems = [];
    const q = filter.trim().toLowerCase();
    const groups = buildPaletteItems();
    let has = false;
    groups.forEach((g) => {
      const items = g.items.filter((i) => !q || i.label.toLowerCase().includes(q));
      if (!items.length) return;
      has = true;
      const header = document.createElement('div');
      header.className = 'pal-group';
      header.textContent = t(g.group);
      palList.appendChild(header);
      items.forEach((item) => {
        const el = document.createElement('button');
        el.className = 'pal-item';
        el.innerHTML = `<i data-lucide="${item.icon}"></i><span>${item.label}</span><span class="pal-hint">↵</span>`;
        el.addEventListener('click', () => { playClick(); item.go(); closePalette(); });
        palList.appendChild(el);
        palItems.push({ el, go: item.go });
      });
    });
    if (!has) palList.innerHTML = `<div class="pal-empty">${t('pal_empty')}</div>`;
    if (window.lucide) window.lucide.createIcons();
    palSel = -1;
  }

  function openPalette() {
    if (!palette) return;
    renderPalette();
    palette.classList.add('open');
    palInput.value = '';
    document.body.style.overflow = 'hidden';
    setTimeout(() => palInput.focus(), 60);
  }
  function closePalette() {
    palette?.classList.remove('open');
    document.body.style.overflow = '';
  }

  palInput?.addEventListener('input', () => renderPalette(palInput.value));
  palInput?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      palSel = (palSel + 1) % palItems.length;
      updatePalSel();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      palSel = (palSel - 1 + palItems.length) % palItems.length;
      updatePalSel();
    } else if (e.key === 'Enter' && palItems[palSel]) {
      playClick();
      palItems[palSel].go();
      closePalette();
    }
  });
  function updatePalSel() {
    palItems.forEach((p, i) => p.el.classList.toggle('selected', i === palSel));
    palItems[palSel]?.el.scrollIntoView({ block: 'nearest' });
  }
  $('#palBtn')?.addEventListener('click', openPalette);

  function scrollToId(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
  }

  /* ═══════════ FAB ═══════════ */
  fab?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    playClick();
  });

  /* ═══════════ KEYBOARD ═══════════ */
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      palette?.classList.contains('open') ? closePalette() : openPalette();
    }
    if (e.key === 'Escape') {
      closePalette();
      closeLightbox();
      mobileMenu?.classList.remove('open');
      burger?.setAttribute('aria-expanded', 'false');
    }
  });

  /* ═══════════ AUDIO (WebAudio, no assets) ═══════════ */
  let audioCtx = null;
  let musicGain = null;
  let musicNodes = [];
  let musicOn = false;
  const musicBtn = $('#musicBtn');

  function ensureAudio() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      audioCtx = new AC();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function playClick() {
    if (prefersReduced) return;
    try {
      const ac = ensureAudio();
      if (!ac) return;
      const osc = ac.createOscillator();
      const g = ac.createGain();
      osc.type = 'sine';
      osc.frequency.value = 720;
      g.gain.setValueAtTime(0.04, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.09);
      osc.connect(g).connect(ac.destination);
      osc.start();
      osc.stop(ac.currentTime + 0.1);
    } catch { /* audio blocked */ }
  }

  const CHORDS = [
    [110, 164.81, 220, 261.63],   // Am
    [98, 146.83, 196, 246.94],    // G
    [87.31, 130.81, 174.61, 220], // F
    [130.81, 196, 261.63, 329.63],// C
  ];
  let chordTimer = null;

  function startMusic() {
    try {
      const ac = ensureAudio();
      if (!ac) return;
      musicGain = ac.createGain();
      musicGain.gain.value = 0;
      const filter = ac.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 850;
      filter.Q.value = 0.4;
      musicGain.connect(filter).connect(ac.destination);

      let idx = 0;
      const chord = () => {
        const freqs = CHORDS[idx % CHORDS.length];
        musicNodes.forEach((n) => { try { n.osc.stop(); } catch { /* */ } });
        musicNodes = freqs.map((f) => {
          const osc = ac.createOscillator();
          osc.type = 'sine';
          osc.frequency.value = f;
          osc.detune.value = (Math.random() - 0.5) * 6;
          const g = ac.createGain();
          g.gain.setValueAtTime(0, ac.currentTime);
          g.gain.linearRampToValueAtTime(0.055, ac.currentTime + 2.5);
          g.gain.linearRampToValueAtTime(0.045, ac.currentTime + 9);
          osc.connect(g).connect(musicGain);
          osc.start();
          return osc;
        });
        idx++;
        chordTimer = setTimeout(chord, 10000);
      };
      chord();
      musicGain.gain.linearRampToValueAtTime(1, ac.currentTime + 2);
      musicOn = true;
      musicBtn?.classList.add('playing');
      toast(t('now_playing'));
    } catch { /* audio unavailable */ }
  }

  function stopMusic() {
    musicNodes.forEach((n) => { try { n.stop(); } catch { /* */ } });
    musicNodes = [];
    if (chordTimer) { clearTimeout(chordTimer); chordTimer = null; }
    if (musicGain && audioCtx) {
      const g = musicGain;
      g.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.8);
      setTimeout(() => { try { g.disconnect(); } catch { /* */ } }, 900);
    }
    musicGain = null;
    musicOn = false;
    musicBtn?.classList.remove('playing');
    toast(t('music_stopped'));
  }

  function toggleMusic() {
    if (musicOn) stopMusic();
    else startMusic();
  }
  musicBtn?.addEventListener('click', () => { playClick(); toggleMusic(); });

  // Subtle click feedback on interactive elements
  if (!prefersReduced) {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.btn, .chip, .social-btn, .icon-btn, .lang-btn')) playClick();
    });
  }

  /* ═══════════ CUSTOM CURSOR ═══════════ */
  if (!isTouch && !prefersReduced) {
    const dot = $('.cursor-dot');
    const ring = $('.cursor-ring');
    if (dot && ring) {
      let mx = -100, my = -100, rx = -100, ry = -100;
      document.addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
        ring.classList.add('visible');
        const interactive = e.target.closest('a, button, [data-copy], .game-card, .gal-item, input, [role="button"]');
        ring.classList.toggle('hover', !!interactive);
      });
      document.addEventListener('mouseleave', () => ring.classList.remove('visible'));
      (function loop() {
        rx += (mx - rx) * 0.22;
        ry += (my - ry) * 0.22;
        dot.style.left = `${mx}px`;
        dot.style.top = `${my}px`;
        ring.style.left = `${rx}px`;
        ring.style.top = `${ry}px`;
        requestAnimationFrame(loop);
      })();
    }
  }

  /* ═══════════ FOOTER YEAR ═══════════ */
  const year = $('#currentYear');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ═══════════ RE-RENDER DYNAMIC CONTENT ON LANG CHANGE ═══════════ */
  document.addEventListener('langchange', (e) => {
    const lang = e.detail;
    if (termBody && !termStarted) buildTerminal(lang);
    if (palette?.classList.contains('open')) renderPalette(palInput.value);
    if (!typingTimer) {
      const el = $('.hero-role .role');
      if (el) el.textContent = t('hero_roles', lang)[0];
    }
    $$('.faq-item.open').forEach((item) => {
      const a = $('.faq-a', item);
      a.style.maxHeight = `${a.scrollHeight}px`;
    });
  });

  /* ═══════════ INITIALIZE ═══════════ */
  currentLang = detectLang();
  if (hasLang) applyLang(savedLang, { save: false });
  else applyLang(currentLang, { save: false });

  initReveals();
  onScroll();
  window.addEventListener('load', () => {
    if (window.lucide) window.lucide.createIcons();
  });
})();
