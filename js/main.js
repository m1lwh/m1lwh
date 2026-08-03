(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const LANG_KEY = 'm1lwh_lang';
  const SOUND_KEY = 'm1lwh_sound';
  const MUSIC_KEY = 'm1lwh_music';
  const VOL_KEY = 'm1lwh_music_vol';
  const NICK_KEY = 'm1lwh_nick';
  const THEME_KEY = 'm1lwh_term_theme';
  const TERM_POS_KEY = 'm1lwh_term_pos';
  const TERM_SIZE_KEY = 'm1lwh_term_size';
  const TERM_MIN_W = 320;
  const TERM_MIN_H = 240;
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = window.matchMedia('(pointer: fine)').matches;

  const DISCORD_USER = 'm1lwh_tvink';
  const SERVER_IP = 'mc.funsmine.su';
  const GITHUB_URL = 'https://github.com/m1lwh';
  const TELEGRAM_URL = 'https://t.me/m1lwh';
  const DISCORD_SERVER_URL = 'https://discord.gg/FwETzuJ2HF';
  const MUSIC_SRC = 'assets/music/shadowmixed_-_it_s_like_i_m_not_even_here_(mp3.pm).mp3';
  const THEMES = ['cyan', 'green', 'amber', 'violet', 'pink'];

  let lang = 'ru';
  let soundOn = localStorage.getItem(SOUND_KEY) === '1';
  let musicOn = localStorage.getItem(MUSIC_KEY) === '1';
  let musicVol = Math.min(100, Math.max(0, parseInt(localStorage.getItem(VOL_KEY) || '8', 10) || 8));
  let nick = (localStorage.getItem(NICK_KEY) || 'm1lwh').slice(0, 16);
  let termTheme = localStorage.getItem(THEME_KEY) || 'cyan';

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const t = key => (I18N[key] ? I18N[key][lang] ?? I18N[key].ru : key);
  const arrayT = key => t(key) || [];

  


  function detectLang() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'ru' || saved === 'en') return saved;
    return (navigator.language || 'ru').toLowerCase().startsWith('ru') ? 'ru' : 'en';
  }

  function applyI18n() {
    document.documentElement.lang = lang;

    $$('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      if (I18N[k]) el.innerHTML = I18N[k][lang] ?? I18N[k].ru;
    });
    $$('[data-i18n-attr]').forEach(el => {
      const [attr, k] = el.getAttribute('data-i18n-attr').split('|');
      if (I18N[k]) el.setAttribute(attr, I18N[k][lang] ?? I18N[k].ru);
    });

    document.title = t('doc_title');
    $('meta[name="description"]')?.setAttribute('content', t('doc_desc'));
    $('meta[name="keywords"]')?.setAttribute('content', t('doc_keywords'));
    $('meta[property="og:description"]')?.setAttribute('content', t('doc_desc'));
    $('meta[name="twitter:description"]')?.setAttribute('content', t('doc_desc'));

    const sw = $('.lang-switch');
    if (sw) sw.dataset.lang = lang;
    $$('.lang-switch button, #preloader .lang-btn').forEach(b => {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });

    if (window.__term && window.__term.body) window.__term.rebuild();
    if (window.__palette) window.__palette.rebuild();
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    localStorage.setItem(LANG_KEY, lang);
    const main = $('main');
    main?.style.setProperty('transition', 'opacity 0.18s ease');
    main?.style.setProperty('opacity', '0');
    setTimeout(() => {
      applyI18n();
      toast(t('toast_lang'), 'check');
      requestAnimationFrame(() => {
        main?.style.setProperty('opacity', '1');
        setTimeout(() => main?.style.removeProperty('transition'), 220);
      });
    }, 160);
  }

  


  function toast(message, icon = 'check') {
    const wrap = $('#toasts');
    if (!wrap) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#i-${icon}"></use></svg><span></span>`;
    el.querySelector('span').textContent = message;
    wrap.appendChild(el);
    const existing = $$('.toast', wrap);
    if (existing.length > 3) existing[0].remove();
    setTimeout(() => {
      el.classList.add('leaving');
      setTimeout(() => el.remove(), 320);
    }, 2600);
  }

  


  function copyText(text, okMsg, failMsg) {
    const done = () => toast(okMsg || t('copied'), 'check');
    const fail = () => toast(failMsg || t('copy_fail'), 'x');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => legacyCopy(text) && done() || fail());
    } else {
      legacyCopy(text) ? done() : fail();
    }
  }

  function legacyCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    return ok;
  }

  function copyWithFeedback(el, text) {
    copyText(text);
    el.classList.add('copied');
    setTimeout(() => el.classList.remove('copied'), 1600);
  }

  


  let actx = null;
  function audio() {
    if (!actx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      actx = new AC();
    }
    if (actx.state === 'suspended') actx.resume();
    return actx;
  }

  function blip(freq = 660, dur = 0.07, type = 'sine', gain = 0.06, when = 0) {
    const ctx = audio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const start = ctx.currentTime + when;
    g.gain.setValueAtTime(gain, start);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(g).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  }

  function clickSound() {
    if (!soundOn) return;
    blip(760, 0.05, 'triangle', 0.03);
  }
  function hoverSound() {
    if (!soundOn) return;
    blip(920, 0.03, 'sine', 0.015);
  }
  function successSound() {
    if (!soundOn) return;
    blip(660, 0.08, 'sine', 0.045);
    setTimeout(() => blip(990, 0.09, 'sine', 0.04), 90);
  }
  function failSound() {
    if (!soundOn) return;
    blip(220, 0.14, 'sawtooth', 0.03);
  }
  function toggleSound() {
    soundOn = !soundOn;
    localStorage.setItem(SOUND_KEY, soundOn ? '1' : '0');
    $$('.sound-toggle').forEach(b => {
      b.setAttribute('aria-pressed', String(soundOn));
      b.classList.toggle('off', !soundOn);
    });
    if (soundOn) successSound();
    toast(t(soundOn ? 'toast_sound_on' : 'toast_sound_off'), soundOn ? 'volume-2' : 'volume-x');
    if (window.__palette) window.__palette.rebuild();
  }

  


  let musicEl = null;

  function initMusicEl() {
    if (musicEl) return musicEl;
    musicEl = new Audio(MUSIC_SRC);
    musicEl.loop = true;
    musicEl.volume = musicVol / 100;
    return musicEl;
  }

  function setMusicVol(v) {
    musicVol = clamp(Math.round(Number(v) || 0), 0, 100);
    localStorage.setItem(VOL_KEY, String(musicVol));
    if (musicEl) musicEl.volume = musicVol / 100;
    const slider = $('#music-vol');
    if (slider) {
      slider.value = musicVol;
      slider.style.setProperty('--fill', musicVol + '%');
    }
    const label = $('#music-vol-val');
    if (label) label.textContent = musicVol + '%';
  }

  function syncMusicUI() {
    $$('.music-toggle').forEach(b => b.setAttribute('aria-pressed', String(musicOn)));
    const pp = $('#music-pp');
    if (pp) pp.classList.toggle('playing', musicOn);
    const note = $('.music-pop-note');
    if (note) note.hidden = musicOn;
    setMusicVol(musicVol);
  }  function toggleMusic() {
    musicOn = !musicOn;
    localStorage.setItem(MUSIC_KEY, musicOn ? '1' : '0');
    const el = initMusicEl();
    if (musicOn) {
      el.play().catch(() => {});
      successSound();
    } else {
      el.pause();
    }
    syncMusicUI();
    toast(t(musicOn ? 'toast_music_on' : 'toast_music_off'), 'music');
    if (window.__palette) window.__palette.rebuild();
  }

  function openMusicPop(force) {
    const pop = $('#music-pop');
    if (!pop) return;
    const willOpen = force !== undefined ? force : !pop.classList.contains('open');
    pop.classList.toggle('open', willOpen);
    const btn = $('#music-btn');
    if (btn) btn.setAttribute('aria-expanded', String(willOpen));
  }

  function errBeep() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      [[330, 0], [1180, 0.15]].forEach(([freq, t0]) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'square';
        o.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, ctx.currentTime + t0);
        g.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + t0 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + t0 + 0.18);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(ctx.currentTime + t0);
        o.stop(ctx.currentTime + t0 + 0.22);
      });
    } catch (e) {}
  }

  function closeIamGod() {
    const m = $('#iamgod-modal');
    if (!m) return;
    m.classList.remove('open');
    setTimeout(() => { m.hidden = true; }, 320);
  }

  


  function initPreloader() {
    const pre = $('#preloader');
    if (!pre) return;
    const fill = $('.preloader-bar-fill', pre);
    const status = $('.preloader-status', pre);
    const langRow = $('.preloader-lang', pre);
    const firstVisit = !localStorage.getItem(LANG_KEY);
    let afterChoice = false;

    lang = detectLang();
    document.documentElement.classList.add('preloading');

    if (firstVisit) {
      langRow.hidden = false;
      $$('.lang-btn', langRow).forEach(b => {
        b.addEventListener('click', () => {
          lang = b.dataset.lang;
          localStorage.setItem(LANG_KEY, lang);
          langRow.hidden = true;
          afterChoice = true;
          start();
        });
      });
    }
    start();

    function start() {
      applyI18n();
      const startT = performance.now();
      const dur = firstVisit && !afterChoice ? 0 : REDUCED ? 120 : 1400;
      const step = now => {
        const p = Math.min(1, (now - startT) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        fill.style.width = (eased * 100).toFixed(1) + '%';
        status.textContent = `${t('preload_load')}… ${Math.round(eased * 100)}%`;
        if (p < 1) requestAnimationFrame(step);
        else hide();
      };
      if (firstVisit && !afterChoice) {
        fill.style.width = '100%';
        status.textContent = `${t('preload_choose')} ↓`;
      } else {
        requestAnimationFrame(step);
      }
    }

    function hide() {
      pre.classList.add('done');
      document.documentElement.classList.remove('preloading');
      setTimeout(() => pre.remove(), 700);
    }
  }

  


  function initCursor() {
    if (!FINE || REDUCED) return;
    const dot = $('#cursor-dot');
    const ring = $('#cursor-ring');
    if (!dot || !ring) return;
    let x = -100, y = -100, rx = -100, ry = -100;
    window.addEventListener('mousemove', e => {
      document.documentElement.classList.add('has-cursor');
      x = e.clientX;
      y = e.clientY;
      ring.classList.toggle('is-hover', !!e.target.closest('a, button, input, [data-copy], .g-item, .faq-q, .palette-item'));
    }, { passive: true });
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  


  function initParticles() {
    const canvas = $('#bg-canvas');
    if (!canvas || REDUCED) return;
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0;
    let parts = [];
    let textParts = [];
    let trail = [];
    let running = true;
    let mx = -9999, my = -9999;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const COLORS = ['#22d3ee', '#818cf8', '#c084fc', '#34d399', '#f0f4ff'];

    const resize = () => {
      w = canvas.width = innerWidth * dpr;
      h = canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '10px "JetBrains Mono", "Cascadia Code", Consolas, monospace';
      const n = Math.min(230, Math.floor((innerWidth * innerHeight) / 7000));
      const tn = Math.min(16, Math.max(5, Math.round(n * 0.13)));
      parts = Array.from({ length: n - tn }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.3 + 0.3,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
        a: Math.random() * 0.5 + 0.15,
        tw: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.9 + 0.3,
        glow: Math.random() < 0.16,
      }));
      textParts = Array.from({ length: tn }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        vx: (Math.random() - 0.5) * 0.09,
        vy: (Math.random() - 0.5) * 0.09,
        a: Math.random() * 0.14 + 0.07,
        tw: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.6 + 0.25,
      }));
    };
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => { running = !document.hidden; });
    window.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      if (FINE && parts.length && Math.random() < 0.35) {
        trail.push({
          x: mx + (Math.random() - 0.5) * 26,
          y: my + (Math.random() - 0.5) * 26,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6 - 0.2,
          r: Math.random() * 1.6 + 0.5,
          c: COLORS[Math.floor(Math.random() * 3)],
          life: 1,
        });
        if (trail.length > 46) trail.shift();
      }
    }, { passive: true });

    const loop = () => {
      if (!running) { requestAnimationFrame(loop); return; }
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      const now = performance.now();

      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const dx = parts[i].x - parts[j].x;
          const dy = parts[i].y - parts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 16900) {
            ctx.strokeStyle = 'rgba(148, 163, 220, ' + (0.11 * (1 - Math.sqrt(d2) / 130)).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(parts[i].x, parts[i].y);
            ctx.lineTo(parts[j].x, parts[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of parts) {
        const dxm = mx - p.x;
        const dym = my - p.y;
        const dm = Math.hypot(dxm, dym);
        if (FINE && dm < 170) {
          const pull = (1 - dm / 170) * 0.035;
          p.vx += (dxm / dm) * pull;
          p.vy += (dym / dm) * pull;
        }
        p.vx = clamp(p.vx, -0.7, 0.7);
        p.vy = clamp(p.vy, -0.7, 0.7);
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -14) p.x = innerWidth + 14;
        if (p.x > innerWidth + 14) p.x = -14;
        if (p.y < -14) p.y = innerHeight + 14;
        if (p.y > innerHeight + 14) p.y = -14;
        const twinkle = 0.6 + 0.4 * Math.sin(now / 800 + p.tw);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.a * twinkle;
        ctx.fill();
        if (p.glow) {
          ctx.globalAlpha = p.a * twinkle * 0.35;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = p.c;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      for (const p of textParts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -44) p.x = innerWidth + 44;
        if (p.x > innerWidth + 44) p.x = -44;
        if (p.y < -14) p.y = innerHeight + 14;
        if (p.y > innerHeight + 14) p.y = -14;
        const twinkle = 0.55 + 0.45 * Math.sin(now / 1400 + p.tw);
        ctx.globalAlpha = p.a * twinkle;
        ctx.fillStyle = '#c7d2f4';
        ctx.fillText('m1lwh', p.x, p.y);
      }
      ctx.globalAlpha = 1;

      for (let i = trail.length - 1; i >= 0; i--) {
        const tr = trail[i];
        tr.life -= 0.028;
        tr.x += tr.vx;
        tr.y += tr.vy;
        if (tr.life <= 0) { trail.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(tr.x, tr.y, tr.r * tr.life, 0, Math.PI * 2);
        ctx.fillStyle = tr.c;
        ctx.globalAlpha = tr.life * 0.6;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(loop);
    };
    loop();
  }

  


  function initParallax() {
    if (REDUCED) return;
    const bg = $('.bg-aurora');
    const heroBg = $('.hero-bg img');
    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', e => {
      tx = (e.clientX / innerWidth - 0.5) * 26;
      ty = (e.clientY / innerHeight - 0.5) * 18;
    }, { passive: true });
    const loop = () => {
      cx += (tx - cx) * 0.045;
      cy += (ty - cy) * 0.045;
      if (bg) bg.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();
    if (heroBg) {
      window.addEventListener('scroll', () => {
        const rect = $('.hero').getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < innerHeight) {
          heroBg.style.transform = `translateY(${-rect.top * 0.14}px) scale(1.1)`;
        }
      }, { passive: true });
    }
  }

  


  function initMagnetic() {
    if (REDUCED || !FINE) return;
    $$('.btn, .icon-btn, .contact').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * 0.22;
        const dy = (e.clientY - r.top - r.height / 2) * 0.28;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1)';
        el.style.transform = '';
        setTimeout(() => { el.style.transition = ''; }, 420);
      });
    });
  }

  


  function initTilt() {
    if (REDUCED || !FINE) return;
    const rest = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s var(--ease), border-color 0.4s var(--ease)';
    const moving = 'transform 0.12s ease-out, box-shadow 0.4s var(--ease), border-color 0.4s var(--ease)';
    $$('.project-card, .game-card, .phil-card').forEach(card => {
      card.addEventListener('mouseenter', () => { card.style.transition = moving; });
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (0.5 - py) * 7;
        const ry = (px - 0.5) * 9;
        card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        card.style.transform = `translateY(-4px) perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = rest;
        card.style.transform = '';
      });
    });
  }

  


  function initReveal() {
    const els = $$('[data-reveal]');
    if (REDUCED) {
      els.forEach(el => el.classList.add('revealed'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('revealed');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${(i % 6) * 0.07}s`);
      io.observe(el);
    });
  }

  


  function initCounters() {
    const els = $$('[data-count]');
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        const el = en.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        if (REDUCED) { el.textContent = target + suffix; return; }
        const dur = 1500;
        const startT = performance.now();
        const step = now => {
          const p = Math.min(1, (now - startT) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    els.forEach(el => io.observe(el));
  }

  


  function initSkillBars() {
    const bars = $$('[data-bar]');
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        const el = en.target;
        setTimeout(() => { el.style.width = el.dataset.bar + '%'; }, 150);
      });
    }, { threshold: 0.4 });
    bars.forEach(el => io.observe(el));
  }

  


  function buildMarquee() {
    const track = $('#marquee-track');
    if (!track) return;
    const items = [
      { n: 'Java', s: 'assets/brand/java.svg' },
      { n: 'Python', s: 'assets/brand/python.svg' },
      { n: 'Git', s: 'assets/brand/git.svg' },
      { n: 'GitHub', s: '#i-github' },
      { n: 'Docker', s: 'assets/brand/docker.svg' },
      { n: 'Linux', s: 'assets/brand/linux.svg' },
      { n: 'Debian', s: 'assets/brand/debian.svg' },
      { n: 'OpenBSD', s: '#b-openbsd' },
      { n: 'Bash', s: 'assets/brand/bash.svg' },
      { n: 'JSON', s: '#b-json' },
      { n: 'YAML', s: '#b-yaml' },
      { n: 'Minecraft', s: '#b-minecraft' },
    ];
    const render = () => items.map(it => {
      const icon = it.s.startsWith('#')
        ? `<svg class="icon" aria-hidden="true"><use href="${it.s}"></use></svg>`
        : `<img src="${it.s}" alt="" aria-hidden="true">`;
      return `<span>${icon}${it.n}</span>`;
    }).join('');
    track.innerHTML = render() + render();
  }

  


  function initJourney() {
    const journey = $('.journey');
    const fill = $('#journey-fill');
    const sticky = $('#j-sticky');
    if (!journey || !fill) return;
    const items = $$('.j-item', journey);
    const years = items.map(it => it.querySelector('.j-year')?.textContent.trim() || '');

    const update = () => {
      const jRect = journey.getBoundingClientRect();
      const total = journey.offsetHeight;
      if (total <= 0) return;
      const passed = clamp(-jRect.top, 0, total);
      fill.style.height = ((passed / total) * 100).toFixed(1) + '%';

      let cur = items[0];
      items.forEach(it => {
        const r = it.getBoundingClientRect();
        if (r.top <= innerHeight * 0.55) cur = it;
        it.classList.toggle('visible', r.top < innerHeight * 0.92 && r.bottom > 0);
      });
      if (sticky) {
        const idx = items.indexOf(cur);
        sticky.textContent = years[idx] || '';
        const r = cur.getBoundingClientRect();
        sticky.style.top = clamp(r.top - jRect.top, 0, total - 30) + 'px';
      }
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  


  const terminal = {
    typing: false,
    booted: false,
    body: null,
    input: null,
    el: null,
    custom: false,
    pos: null,
    size: null,
    hist: [],
    histIdx: -1,
    clockTimer: null,
    clockLine: null,
    cwd: 'portfolio',
    bootAt: null,

    init() {
      this.el = $('.terminal');
      this.body = $('.term-body');
      this.input = $('.term-input');
      if (!this.body || !this.input) return;
      this.input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.exec(this.input.value.trim());
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.histNav(-1);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.histNav(1);
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
          e.preventDefault();
          this.clear();
        }
      });
      $('#term-expand')?.addEventListener('click', () => this.toggleExpand());
      $('#term-copy')?.addEventListener('click', () => this.copyOutput());
      this.initDrag();
      this.initResize();
      this.restoreState();
      const io = new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) {
          obs.disconnect();
          this.boot();
        }
      }, { threshold: 0.2 });
      io.observe(this.body);
    },

    toggleExpand() {
      const term = this.el || $('.terminal');
      if (!term) return;
      const expanded = term.classList.toggle('expanded');
      if (expanded) {
        term.classList.remove('custom');
        term.style.left = '';
        term.style.top = '';
        term.style.width = '';
        term.style.height = '';
      } else {
        this.restoreState();
      }
      $('#term-expand')?.setAttribute('aria-label', expanded ? t('a_term_min') : t('a_term_expand'));
      clickSound();
      setTimeout(() => this.scroll(), 60);
      if (this.input && expanded) setTimeout(() => this.input.focus(), 60);
    },

    initDrag() {
      const bar = $('.term-bar');
      if (!bar || !this.el) return;
      bar.addEventListener('pointerdown', e => {
        if (this.el.classList.contains('expanded')) return;
        if (e.target.closest('button')) return;
        if (window.matchMedia('(max-width: 720px)').matches) return;
        e.preventDefault();
        const r = this.el.getBoundingClientRect();
        const ox = e.clientX - r.left;
        const oy = e.clientY - r.top;
        this.enterCustom();
        this.el.classList.add('dragging');
        document.documentElement.classList.add('term-interacting');
        const move = ev => {
          this.pos.x = Math.max(8, Math.min(ev.clientX - ox, innerWidth - 80));
          this.pos.y = Math.max(8, Math.min(ev.clientY - oy, innerHeight - 70));
          this.applyPos();
        };
        const up = () => {
          this.el.classList.remove('dragging');
          document.documentElement.classList.remove('term-interacting');
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', up);
          this.saveState();
          clickSound();
        };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
      });
      bar.addEventListener('dblclick', e => {
        if (e.target.closest('button')) return;
        this.resetWindow();
      });
    },

    initResize() {
      if (!this.el) return;
      $$('.term-handle', this.el).forEach(h => {
        h.addEventListener('pointerdown', e => {
          if (this.el.classList.contains('expanded')) return;
          if (window.matchMedia('(max-width: 720px)').matches) return;
          e.preventDefault();
          e.stopPropagation();
          this.enterCustom();
          const dir = h.dataset.dir;
          const r0 = { w: this.size.w, h: this.size.h, x: this.pos.x, y: this.pos.y };
          const sx = e.clientX;
          const sy = e.clientY;
          this.el.classList.add('resizing');
          document.documentElement.classList.add('term-interacting');
          const move = ev => {
            const dx = ev.clientX - sx;
            const dy = ev.clientY - sy;
            const maxW = Math.min(Math.round(innerWidth * 0.92), 1200);
            const maxH = Math.round(innerHeight * 0.85);
            let w = r0.w;
            let h = r0.h;
            let x = r0.x;
            let y = r0.y;
            if (dir.includes('e')) w = clamp(Math.round(r0.w + dx), TERM_MIN_W, maxW);
            if (dir.includes('s')) h = clamp(Math.round(r0.h + dy), TERM_MIN_H, maxH);
            if (dir.includes('w')) { const nw = clamp(Math.round(r0.w - dx), TERM_MIN_W, maxW); x = r0.x + (r0.w - nw); w = nw; }
            if (dir.includes('n')) { const nh = clamp(Math.round(r0.h - dy), TERM_MIN_H, maxH); y = r0.y + (r0.h - nh); h = nh; }
            this.pos = { x, y };
            this.size = { w, h };
            this.applyRect();
          };
          const up = () => {
            this.el.classList.remove('resizing');
            document.documentElement.classList.remove('term-interacting');
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
            this.saveState();
          };
          window.addEventListener('pointermove', move);
          window.addEventListener('pointerup', up);
        });
      });
    },

    enterCustom() {
      if (this.custom) return;
      this.custom = true;
      const r = this.el.getBoundingClientRect();
      this.pos = { x: r.left, y: r.top };
      this.size = { w: r.width, h: r.height };
      this.applyRect();
    },

    applyRect() {
      const el = this.el;
      if (!el) return;
      el.classList.add('custom');
      el.style.left = Math.round(this.pos.x) + 'px';
      el.style.top = Math.round(this.pos.y) + 'px';
      el.style.width = Math.round(this.size.w) + 'px';
      el.style.height = Math.round(this.size.h) + 'px';
    },

    applyPos() {
      const el = this.el;
      if (!el) return;
      el.style.left = Math.round(this.pos.x) + 'px';
      el.style.top = Math.round(this.pos.y) + 'px';
    },

    saveState() {
      if (this.pos) localStorage.setItem(TERM_POS_KEY, JSON.stringify(this.pos));
      if (this.size) localStorage.setItem(TERM_SIZE_KEY, JSON.stringify(this.size));
    },

    restoreState() {
      let pos = null;
      let size = null;
      try { pos = JSON.parse(localStorage.getItem(TERM_POS_KEY) || 'null'); } catch (e) {}
      try { size = JSON.parse(localStorage.getItem(TERM_SIZE_KEY) || 'null'); } catch (e) {}
      if (!pos && !size) return;
      if (!pos) pos = { x: 24, y: 96 };
      if (!size) size = { w: 620, h: 460 };
      const maxW = Math.min(Math.round(innerWidth * 0.92), 1200);
      const maxH = Math.round(innerHeight * 0.85);
      size.w = clamp(size.w, TERM_MIN_W, maxW);
      size.h = clamp(size.h, TERM_MIN_H, maxH);
      pos.x = clamp(pos.x, 8, Math.max(8, innerWidth - size.w - 8));
      pos.y = clamp(pos.y, 8, Math.max(8, innerHeight - 90));
      this.pos = pos;
      this.size = size;
      this.custom = true;
      this.applyRect();
    },

    resetWindow() {
      this.custom = false;
      this.pos = null;
      this.size = null;
      const el = this.el;
      if (el) {
        el.classList.remove('custom');
        el.style.left = '';
        el.style.top = '';
        el.style.width = '';
        el.style.height = '';
      }
      localStorage.removeItem(TERM_POS_KEY);
      localStorage.removeItem(TERM_SIZE_KEY);
      toast(t('toast_term_reset'), 'check');
      clickSound();
    },

    copyOutput() {
      const txt = (this.body ? this.body.textContent : '').trim();
      if (!txt) return;
      copyText(txt);
      toast(t('copied'), 'check');
      successSound();
    },

    printLinesDelayed(lines, cls = '', delay = 45, done) {
      const list = Array.isArray(lines) ? lines : [lines];
      let i = 0;
      const next = () => {
        if (i >= list.length) {
          if (done) done();
          return;
        }
        this.printHtml(list[i], cls);
        i++;
        setTimeout(next, delay);
      };
      next();
    },

    rebuild() {
      if (this.typing || !this.body) return;
      this.body.innerHTML = '';
      this.hist = [];
      this.histIdx = -1;
      this.booted = false;
      if ($('.terminal').getBoundingClientRect().top < innerHeight) this.boot();
    },

    rmJoke() {
      if (this.rmBusy) return;
      this.rmBusy = true;
      const term = $('.terminal');
      if (this.input) this.input.disabled = true;
      const at = (ms, fn) => setTimeout(fn, ms);
      const glitch = line => this.printHtml(esc(line), 'rm-glitch');
      const flash = () => term && term.classList.add('rm-flash');
      const shake = () => term && term.classList.add('rm-shake');
      const unflash = () => term && term.classList.remove('rm-flash');
      const unshake = () => term && term.classList.remove('rm-shake');

      this.printLine(t('term_rm_start'), 'c-pink');
      at(350, () => { flash(); if (soundOn) errBeep(); });
      at(950, () => { unflash(); this.printLine(t('term_rm_scan'), 'c-dim'); });
      at(1350, () => { glitch(t('term_rm_glitch_1')); if (soundOn) errBeep(); });
      at(1850, () => { shake(); this.printLine(t('term_rm_del'), 'c-pink'); });
      at(2350, () => { unshake(); glitch(t('term_rm_glitch_2')); });
      at(2850, () => { flash(); this.printLine(t('term_rm_panic'), 'rm-glitch'); if (soundOn) errBeep(); });
      at(3350, () => { unflash(); this.printLine(t('term_rm_halt'), 'c-dim'); });
      at(3650, () => this.printLine(t('term_rm_lost'), 'rm-blink'));
      at(4450, () => this.printLine(t('term_rm_restore'), 'c-green'));
      at(5050, () => this.printLine(t('term_rm_back').replace('{nick}', nick), 'c-green'));
      at(5450, () => {
        this.printLine(t('term_rm_nice'), 'c-amber');
        if (this.input) this.input.disabled = false;
        this.rmBusy = false;
        this.scroll();
      });
    },

    iamGod() {
      const m = $('#iamgod-modal');
      if (!m) return;
      m.hidden = false;
      requestAnimationFrame(() => m.classList.add('open'));
      failSound();
    },

    boot() {
      if (this.booted) return;
      this.booted = true;
      this.bootAt = new Date();
      const login = t('term_login').replace('{nick}', nick);
      const kernel = t('term_kernel').replace('{date}', this.fmtKernel(this.bootAt));
      const next = (delay, fn) => setTimeout(fn, delay);
      const start = () => {
        this.typeLine(login, 'c-amber', () => {
          next(REDUCED ? 30 : 240, () => {
            this.typeLine(kernel, 'c-amber', () => {
              next(REDUCED ? 30 : 240, () => {
                this.printLinesDelayed(arrayT('term_ascii'), '', REDUCED ? 5 : 55, () => {
                  this.printLinesDelayed(arrayT('term_motd'), 'c-dim', REDUCED ? 15 : 150, () => {
                    next(REDUCED ? 20 : 160, () => {
                      this.printLine('', '');
                      this.printHtml(t('term_first') + ' <span class="term-caret"></span>', 'c-green');
                      this.scroll();
                      if (this.input) this.input.focus();
                    });
                  });
                });
              });
            });
          });
        });
      };
      next(REDUCED ? 60 : 400, start);
    },

    fmtKernel(d) {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const pad = n => String(n).padStart(2, '0');
      return `${days[d.getDay()]} ${months[d.getMonth()]} ${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} ${String(d.getFullYear()).slice(2)}`;
    },

    fmtClock() {
      const d = new Date();
      return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + ':' + String(d.getSeconds()).padStart(2, '0');
    },

    uptimeStr() {
      if (!this.bootAt) return t('term_uptime').replace('{d}', '0').replace('{h}', '0').replace('{m}', '0');
      const sec = Math.floor((Date.now() - this.bootAt.getTime()) / 1000);
      const d = Math.floor(sec / 86400);
      const h = Math.floor((sec % 86400) / 3600);
      const m = Math.floor((sec % 3600) / 60);
      return t('term_uptime').replace('{d}', d).replace('{h}', h).replace('{m}', m);
    },

    prompt() {
      const path = this.cwd === 'portfolio' ? '~/portfolio' : this.cwd;
      return `<span class="p-user">${esc(nick)}</span><span class="p-at">@</span><span class="p-host">m1lwhOS</span><span class="p-path">:${esc(path)}</span><span class="p-doll">$</span>`;
    },

    histNav(dir) {
      if (!this.hist.length) return;
      this.histIdx = clamp(this.histIdx + dir, -1, this.hist.length - 1);
      this.input.value = this.histIdx >= 0 ? this.hist[this.histIdx] : '';
    },

    typeLine(text, cls, done) {
      this.typing = true;
      const el = document.createElement('div');
      el.className = 'term-line ' + cls;
      this.body.appendChild(el);
      let i = 0;
      const step = () => {
        el.textContent = text.slice(0, i);
        if (i >= text.length) {
          this.typing = false;
          this.scroll();
          done && done();
          return;
        }
        i++;
        this.scroll();
        setTimeout(step, REDUCED ? 0 : 18);
      };
      step();
    },

    print(text, cls = '') {
      const el = document.createElement('div');
      el.className = 'term-line ' + cls;
      el.innerHTML = text;
      this.body.appendChild(el);
      this.scroll();
      return el;
    },

    printLine(text, cls = '') {
      const el = document.createElement('div');
      el.className = 'term-line ' + cls;
      el.textContent = text;
      this.body.appendChild(el);
      this.scroll();
      return el;
    },

    printHtml(text, cls = '') {
      const el = document.createElement('div');
      el.className = 'term-line ' + cls;
      el.innerHTML = text;
      this.body.appendChild(el);
      this.scroll();
      return el;
    },

    scroll() {
      if (this.body) this.body.scrollTop = this.body.scrollHeight;
    },

    focusTerm() {
      if (!this.input) return;
      if (this.body && this.body.closest('.expanded')) {
        setTimeout(() => this.input.focus(), 60);
        return;
      }
      this.el?.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'center' });
      setTimeout(() => this.input.focus(), 80);
    },

    clear() {
      this.body.innerHTML = '';
      this.scroll();
    },

    exec(raw, silent) {
      if (this.clockTimer) { clearInterval(this.clockTimer); this.clockTimer = null; this.clockLine = null; }
      if (!silent) {
        this.hist.push(raw);
        this.histIdx = this.hist.length;
        this.print(this.prompt(), 'cmd');
        const tLine = document.createElement('span');
        tLine.textContent = raw;
        this.body.lastChild.appendChild(tLine);
        if (this.input) this.input.value = '';
      }
      const parts = raw.split(/\s+/).filter(Boolean);
      const cmd = (parts[0] || '').toLowerCase();
      const arg = parts.slice(1).join(' ');

      const respond = (lines, cls = '') => {
        (Array.isArray(lines) ? lines : [lines]).forEach(l => this.printLine(l, cls));
      };
      const respondHtml = (lines, cls = '') => {
        (Array.isArray(lines) ? lines : [lines]).forEach(l => this.printHtml(l, cls));
      };
      const nl = () => this.printLine('', '');

      switch (cmd) {
        case 'help': {
          const man = t('term_man');
          const rows = [];
          Object.keys(man).forEach(c => {
            rows.push(`<span class="c-green">${esc(c)}</span>`);
            rows.push(`<span class="c-dim">    ${esc(man[c])}</span>`);
          });
          rows.push('');
          rows.push(`<span class="c-dim">${esc(t('term_man_tip'))}</span>`);
          this.printLinesDelayed(rows, '', REDUCED ? 2 : 12);
          break;
        }
        case 'man': {
          if (!arg) { respond(t('term_man_usage'), 'c-dim'); break; }
          const key = arg.split(/\s+/)[0];
          const man = t('term_man');
          if (!man[key]) { respond(t('term_man_missing').replace('{cmd}', key), 'c-dim'); break; }
          respondHtml([
            `<span class="c-cyan">NAME</span>`,
            `<span class="c-green">${esc(key)}</span>  -  ${esc(man[key])}`,
            '',
            `<span class="c-cyan">SYNOPSIS</span>`,
            `<span class="c-green">${esc(key)}</span>`,
            '',
            `<span class="c-dim">${esc(t('term_man_hint'))}</span>`,
          ], '');
          break;
        }
        case 'about':
          respond(arrayT('term_about'), 'c-cyan');
          break;
        case 'skills':
          respond(arrayT('term_skills'), 'c-green');
          break;
        case 'projects':
          respond(arrayT('term_projects'), 'c-violet');
          break;
        case 'games':
          respond(arrayT('term_games'), 'c-pink');
          break;
        case 'contact':
          respond(t('term_contact'), 'c-pink');
          nl();
          respond(t('copied'), 'c-dim');
          break;
        case 'whoami':
          respond(nick, 'c-cyan');
          break;
        case 'hostname':
          respond('m1lwhOS', 'c-green');
          break;
        case 'uname':
          respond(`M1lwhOS 3.2 ${arg === '-a' ? '(GENERIC.MP) #0: ' + this.fmtKernel(this.bootAt || new Date()) : 'm1lwhOS'}`.trim(), 'c-green');
          break;
        case 'uptime':
          respond(this.uptimeStr(), 'c-amber');
          break;
        case 'date':
          respond(new Date().toString(), 'c-amber');
          break;
        case 'time':
          respond(this.fmtClock(), 'c-amber');
          break;
        case 'clock': {
          const line = this.printLine('', 'c-amber');
          const tick = () => { line.textContent = this.fmtClock(); this.scroll(); };
          tick();
          this.clockLine = line;
          this.clockTimer = setInterval(tick, 1000);
          break;
        }
        case 'pwd':
          respond(this.cwd === 'portfolio' ? '~/portfolio' : '~/' + this.cwd, 'c-cyan');
          break;
        case 'ls':
          respondHtml([
            '<span class="c-cyan">Desktop/</span>  <span class="c-cyan">Documents/</span>  <span class="c-cyan">downloads/</span>  <span class="c-cyan">portfolio/</span>  <span class="c-cyan">scripts/</span>  <span class="c-violet">welcome.txt</span>',
          ]);
          break;
        case 'cd':
          if (!arg) { this.cwd = 'portfolio'; break; }
          if (arg === '..') { this.cwd = 'portfolio'; break; }
          if (arg === 'portfolio' || arg === '/') { this.cwd = 'portfolio'; break; }
          respond(t('term_cd_err').replace('{path}', arg), 'c-red');
          break;
        case 'tree':
          respondHtml(arrayT('term_tree').map(l => l.replace('{u}', esc(nick))), 'c-dim');
          break;
        case 'cat': {
          const files = { 'readme.md': 'term_cat_readme', 'welcome.txt': 'term_cat_welcome', 'backup.sh': 'term_cat_backup', 'monitor.py': 'term_cat_monitor', 'deploy.sh': 'term_cat_deploy' };
          const file = (arg || '').toLowerCase().replace(/^\//, '');          if (!arg) { respond(t('term_cat_usage'), 'c-dim'); break; }
          if (files[file]) respond(arrayT(files[file]), 'c-dim');
          else respond(t('term_cat_missing').replace('{file}', arg), 'c-red');
          break;
        }
        case 'echo':
          respond(arg || '', 'c-dim');
          break;
        case 'history':
          respond(this.hist.map((h, i) => String(i + 1).padStart(3, ' ') + '  ' + h), 'c-dim');
          break;
        case 'ping': {
          const host = arg || 'mc.funsmine.su';
          const ip = host === 'mc.funsmine.su' ? '185.232.69.148' : '127.0.0.1';
          respond(t('term_ping_hdr').replace('{host}', host).replace('{ip}', ip), 'c-dim');
          for (let i = 1; i <= 4; i++) {
            setTimeout(() => {
              respond(t('term_ping_reply').replace('{ip}', ip).replace('{n}', i).replace('{t}', (12 + Math.random() * 20).toFixed(2)), 'c-cyan');
            }, i * 220);
          }
          setTimeout(() => {
            respond(t('term_ping_stats').replace('{host}', host), 'c-dim');
            respond(t('term_ping_loss'), 'c-dim');
          }, 980);
          break;
        }
        case 'ip':
          respondHtml('<span class="c-green">eth0:</span> 10.0.0.1/24  <span class="c-dim">(wlp2s0 - LAN)</span>', '');
          respondHtml('<span class="c-green">inet6:</span> fe80::1f2e:3c4d:5a6b:7c8d', '');
          break;
        case 'server':
          respond(t('term_server'), 'c-amber');
          break;
        case 'github':
          respond(t('term_github'), 'c-violet');
          window.open(GITHUB_URL, '_blank', 'noopener');
          break;
        case 'weather':
          respond(arrayT('term_weather')[Math.floor(Math.random() * arrayT('term_weather').length)], 'c-cyan');
          break;
        case 'cpu':
          respondHtml(`<span class="c-green">CPU:</span> AMD Ryzen 9 5950X (32) @ 3.4GHz  <span class="c-dim">load: ${(Math.random() * 20 + 2).toFixed(1)}%</span>`, '');
          break;
        case 'memory':
          respondHtml(`<span class="c-green">Mem:</span> 6.2GiB / 31.3GiB  <span class="c-cyan">[█████░░░░░░░░░░░░░]</span> 20%`, '');
          break;
        case 'disk':
          respondHtml(`<span class="c-green">/dev/ada0p2:</span> 412G / 1.8T  <span class="c-amber">[████████░░░░░░░░░░]</span> 23%`, '');
          break;
        case 'processes':
          respondHtml([
            '<span class="c-green">PID</span>  <span class="c-green">USER</span>  <span class="c-green">CPU</span>  <span class="c-green">MEM</span>  <span class="c-green">CMD</span>',
            `2021  ${nick.padEnd(8)} 0.1  0.3  java -Xms512M -Xmx1G -jar server.jar nogui`,
            '1964  root      0.0  0.1  sshd: m1lwh [priv]',
            '1832  root      0.0  0.1  ntpd -s',
            '1811  root      0.0  0.0  doas: m1lwh ttyC0',
            '1120  root      0.0  0.0  /sbin/init',
          ].map((l, i) => i ? `<span class="c-dim">${l}</span>` : l), '');
          break;
        case 'btop':
        case 'htop': {
          const bars = ['██████████████████████ 12%', '████████████████████████ 14%', '██████████████████████░░ 12%', '██████████████████████░░ 11%'];
          respondHtml([
            `<span class="c-cyan">${cmd === 'btop' ? 'btop' : 'htop'}</span> - M1lwhOS 3.2 <span class="c-dim">(up ${this.uptimeStr().match(/\d+/g).slice(0, 3).join(':')})</span>`,
            '',
            '<span class="c-green">CPU</span> [████████████░░░░░░░░] 58%   <span class="c-cyan">MEM</span> [████░░░░░░░░░░░░░░░░] 20%',
            '<span class="c-cyan">SWAP</span> [░░░░░░░░░░░░░░░░░░░░] 0%    <span class="c-amber">DISK</span> [█████░░░░░░░░░░░░░░] 23%',
            '',
            '<span class="c-green">PID</span> USER       CPU   MEM   COMMAND',
            '<span class="c-dim">2021 m1lwh      0.1   0.3   java -jar server.jar</span>',
            '<span class="c-dim">1964 root       0.0   0.1   sshd: m1lwh [priv]</span>',
          ].map((l, i) => i < 4 ? l : `<span class="c-dim">${l}</span>`), '');
          break;
        }
        case 'cmatrix':
        case 'matrix': {
          const chars = 'アイウエオカキクケコサシスセソ0123456789ABCDEF';
          const rows = Array.from({ length: 8 }, () =>
            Array.from({ length: 42 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
          );
          respondHtml(rows.map(r => `<span class="c-green">${r}</span>`), '');
          break;
        }
        case 'sl':
          respond(arrayT('term_sl'), 'c-cyan');
          break;
        case 'cowsay': {
          const say = arg || t('term_cowsay_def');
          const bubble = ['<' + say + '>', ' ' + '-'.repeat(say.length + 2), '        \\   ^__^', '         \\  (oo)\\_______', '            (__)\\       )\\/\\', '                ||----w |', '                ||     ||'];
          respond(bubble, 'c-amber');
          break;
        }
        case 'fortune':
          respond(arrayT('term_fortune')[Math.floor(Math.random() * arrayT('term_fortune').length)], 'c-violet');
          break;
        case 'cal':
          this.calendar();
          break;
        case 'random':
          respond(String(Math.floor(Math.random() * (arg ? parseInt(arg, 10) || 100 : 100))), 'c-green');
          break;
        case 'uuid':
          respond((crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 3 | 8);
            return v.toString(16);
          })), 'c-cyan');
          break;
        case 'calc': {
          if (!arg) { respond(t('term_calc_usage'), 'c-dim'); break; }
          const v = safeCalc(arg);
          if (v === null) { respond(t('term_calc_err'), 'c-red'); break; }
          respond(String(v), 'c-green');
          break;
        }
        case 'base64': {
          const mode = parts[1];
          const rest = parts.slice(2).join(' ');
          if (mode === 'enc' || mode === 'encode') {
            try { respond(btoa(unescape(encodeURIComponent(rest))), 'c-green'); }
            catch (e) { respond(t('term_base64_err'), 'c-red'); }
          } else if (mode === 'dec' || mode === 'decode') {
            try { respond(decodeURIComponent(escape(atob(parts[2] || ''))), 'c-green'); }
            catch (e) { respond(t('term_base64_err'), 'c-red'); }
          } else {
            respond(t('term_base64_usage'), 'c-dim');
          }
          break;
        }
        case 'md5': {
          if (!arg) { respond(t('term_sha_usage').replace('{algo}', 'md5'), 'c-dim'); break; }
          respond(md5(arg), 'c-green');
          break;
        }
        case 'sha256': {
          if (!arg) { respond(t('term_sha_usage').replace('{algo}', 'sha256'), 'c-dim'); break; }
          crypto.subtle.digest('SHA-256', new TextEncoder().encode(arg)).then(buf => {
            respond(Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join(''), 'c-green');
          }).catch(() => respond(t('term_sha_usage').replace('{algo}', 'sha256'), 'c-dim'));
          break;
        }
        case 'network':
          respondHtml([
            '<span class="c-green">lo0:</span>   127.0.0.1/8      <span class="c-dim">loopback</span>',
            '<span class="c-green">em0:</span>   10.0.0.1/24      <span class="c-dim">Ethernet (LAN)</span>',
            '<span class="c-green">wlan0:</span> 192.168.1.42/24   <span class="c-dim">Wi-Fi (HOME_5G)</span>',
            '<span class="c-green">wg0:</span>   10.8.0.2/24      <span class="c-dim">WireGuard VPN</span>',
            '<span class="c-green">DNS:</span>   1.1.1.1, 9.9.9.9  <span class="c-dim">gateway: 192.168.1.1</span>',
          ], '');
          break;
        case 'java':
          respondHtml([
            '<span class="c-green">openjdk version "21.0.3"</span>  <span class="c-dim">2024-04-16</span>',
            '<span class="c-green">OpenJDK Runtime Environment</span> (build 21.0.3+9-1, <span class="c-dim">LTS</span>)',
            '<span class="c-green">OpenJDK 64-Bit Server VM</span> (build 21.0.3+9-1, mixed mode, sharing)',
            '<span class="c-dim">JAVA_HOME=/usr/local/jdk-21  <span class="c-amber">keytool</span> on PATH</span>',
          ], '');
          break;
        case 'minecraft':
          respond(arrayT('term_minecraft'), 'c-green');
          break;
        case 'fusion':
          respond(arrayT('term_fusion'), 'c-violet');
          break;
        case 'worldbox':
          respond(arrayT('term_worldbox'), 'c-green');
          break;
        case 'mafiaii':
          respond(arrayT('term_mafiaii'), 'c-pink');
          break;
        case 'githubstats':
          respondHtml([
            '<span class="c-green">github.com/m1lwh</span>',
            `Commits (last year): <span class="c-cyan">${843 + Math.floor(Math.random() * 90)}</span>`,
            `Repositories: <span class="c-cyan">27</span>   Stars: <span class="c-cyan">${240 + Math.floor(Math.random() * 60)}</span>`,
            'Languages: <span class="c-amber">Java 72%</span> <span class="c-cyan">Python 17%</span> <span class="c-violet">JS 11%</span>',
            'Streak: 46 days <span class="c-dim">(legendary)</span>',
          ], '');
          break;
        case 'repo':
          respondHtml([
            '<span class="c-cyan">m1lwh/portfolio</span>        <span class="c-dim">→ this site</span>',
            '<span class="c-cyan">m1lwh/winterclient</span>     <span class="c-dim">→ DLC client 1.16.5</span>',
            '<span class="c-cyan">m1lwh/pvz-fusion-l10n</span>  <span class="c-dim">→ RU localization</span>',
            '<span class="c-cyan">m1lwh/funsmine-plugins</span> <span class="c-dim">→ server plugins</span>',
            '<span class="c-dim">Tip: use github to open the profile</span>',
          ], '');
          break;
        case 'news':
          respond(arrayT('term_news'), 'c-amber');
          break;
        case 'quote':
          respond(arrayT('term_quote')[Math.floor(Math.random() * arrayT('term_quote').length)], 'c-violet');
          break;
        case 'joke':
          respond(arrayT('term_joke')[Math.floor(Math.random() * arrayT('term_joke').length)], 'c-amber');
          break;
        case 'figlet':
          if (!arg) { respond(t('term_figlet_usage'), 'c-dim'); break; }
          respondHtml(figlet(arg).map(l => `<span class="c-cyan">${l}</span>`), '');
          break;
        case 'lolcat':
          if (!arg) { respond(t('term_lolcat_usage'), 'c-dim'); break; }
          this.printHtml(lolcat(arg), '');
          break;
        case 'banner':
          respondHtml(arrayT('term_banner').map(l => `<span class="c-cyan">${l}</span>`), '');
          break;
        case 'ascii':
          this.printHtml(arrayT('term_ascii').join('\n'));
          break;
        case 'colors':
          respondHtml([
            '<span class="c-cyan">c-cyan</span>   <span class="c-green">c-green</span>   <span class="c-violet">c-violet</span>',
            '<span class="c-pink">c-pink</span>   <span class="c-amber">c-amber</span>   <span class="c-red">c-red</span>   <span class="c-dim">c-dim</span>',
          ], '');
          break;
        case 'theme':
          if (parts[1] === 'set' && parts[2]) {
            const th = parts[2];
            if (THEMES.includes(th)) {
              termTheme = th;
              localStorage.setItem(THEME_KEY, th);
              applyTermTheme();
              respond(t('term_theme_set').replace('{theme}', th), 'c-green');
            } else {
              respond(t('term_theme_usage'), 'c-dim');
            }
          } else {
            respond(t('term_theme_cur') + termTheme, 'c-cyan');
          }
          break;
        case 'music':
          toggleMusic();
          respond(t('term_music_stat').replace('{s}', musicOn ? t('term_on') : t('term_off')), 'c-green');
          break;
        case 'volume': {
          if (!arg) { respond(t('term_vol_now').replace('{v}', musicVol), 'c-cyan'); break; }
          let next;
          if (/^[+-]\d+$/.test(arg)) next = musicVol + parseInt(arg, 10);
          else if (/^\d+$/.test(arg)) next = parseInt(arg, 10);
          else { respond(t('term_vol_usage'), 'c-dim'); break; }
          setMusicVol(clamp(next, 0, 100));
          respond(t('term_vol_set').replace('{v}', musicVol), 'c-green');
          break;
        }
        case 'nick':
          if (parts[1] === 'select' && parts[2]) {
            const name = parts[2];
            if (/^[a-z][a-z0-9_]{0,15}$/i.test(name)) {
              nick = name.slice(0, 16);
              localStorage.setItem(NICK_KEY, nick);
              applyTermNick();
              respond(t('term_nick_set').replace('{nick}', nick), 'c-green');
            } else {
              respond(t('term_nick_usage'), 'c-dim');
            }
          } else {
            respond(t('term_nick_usage'), 'c-dim');
          }
          break;
        case 'lang':
          if (parts[1] === 'ru' || parts[1] === 'en') {
            setLang(parts[1]);
            respond(t('term_lang'), 'c-green');
          } else {
            respond(t('term_lang_arg'), 'c-dim');
          }
          break;
        case 'translate':
          if (arg) respond(t('term_translate_none') + arg, 'c-violet');
          else respond('translate <word>', 'c-dim');
          break;
        case 'neofetch':
        case 'fastfetch':
          respondHtml(arrayT('term_neofetch').map(l => l.replace('{u}', this.uptimeStr())), '');
          break;
        case 'sudo':
          if (/^rm\s+-?rf\s*\/?$/.test(arg) || /^rm\s+-r\s+-f\s*\/?$/.test(arg)) {
            this.rmJoke();
          } else {
            respond(t('term_sudo'), 'c-pink');
          }
          break;
        case 'iamgod':
          this.iamGod();
          break;
        case 'vim':
          respond(t('term_vim'), 'c-pink');
          break;
        case 'exit':
          respond(t('term_exit'), 'c-dim');
          break;
        case 'clear':
        case 'cls':
          this.clear();
          break;
        case 'openbsd':
          this.printHtml(arrayT('term_ascii').join('\n'));
          arrayT('term_motd').forEach(l => this.printLine(l, 'c-dim'));
          break;
        case 'git':
          respondHtml('<span class="c-green">git status</span>  <span class="c-dim">(nothing to commit, working tree clean)</span>', '');
          break;
        case 'help2':
          respond(t('term_unknown'), 'c-dim');
          break;
        case '':
          break;
        default:
          respond(t('term_unknown'), 'c-dim');
      }
    },

    calendar() {
      const now = new Date();
      const y = now.getFullYear();
      const m = now.getMonth();
      const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
      const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const name = lang === 'ru' ? months[m] : monthsEn[m];
      const first = new Date(y, m, 1).getDay();
      const offset = (first + 6) % 7;
      const days = new Date(y, m + 1, 0).getDate();
      const grid = ['Пн Вт Ср Чт Пт Сб Вс'.split(' ').map(d => `<span class="c-cyan">${d}</span>`).join(' ')];
      let row = '   '.repeat(offset);
      for (let d = 1; d <= days; d++) {
        row += (d === now.getDate() ? `<span class="hl">${String(d).padStart(2)}</span>` : String(d).padStart(2)) + ' ';
        if ((offset + d) % 7 === 0) { grid.push(row); row = ''; }
      }
      if (row.trim()) grid.push(row);
      this.printLine(`${name} ${y}`, 'c-amber');
      grid.forEach(l => this.printHtml(l, 'c-dim'));
    },
  };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function safeCalc(expr) {
    if (!expr || expr.length > 160) return null;
    if (!/^[0-9+\-*/^().,%\s]+$/.test(expr)) return null;
    let e = expr;
    let n = 0;
    while (e.includes('^')) {
      if (n++ > 20) return null;
      e = e.replace(/(\d+(?:\.\d+)?)\s*\^\s*(\d+(?:\.\d+)?)/g, (_, a, b) => String(Math.pow(parseFloat(a), parseFloat(b))));
    }
    try {
      const v = Function('"use strict";return (' + e.replace(/,/g, '.') + ')')();
      if (typeof v !== 'number' || !isFinite(v)) return null;
      return Math.round(v * 1e6) / 1e6;
    } catch (err) {
      return null;
    }
  }

  function md5(str) {
    const s = unescape(encodeURIComponent(String(str)));
    const n = s.length;
    let bitLen = n * 8;
    const b = [];
    for (let i = 0; i < n; i++) b.push(s.charCodeAt(i));
    b.push(0x80);
    while (b.length % 64 !== 56) b.push(0);
    for (let i = 0; i < 8; i++) b.push(Math.floor(bitLen / Math.pow(2, 8 * i)) & 0xff);
    const g = (i) => {
      if (i < 16) return i;
      if (i < 32) return (5 * i + 1) % 16;
      if (i < 48) return (3 * i + 5) % 16;
      return (7 * i) % 16;
    };
    const sh = (x, c) => (x << c) | (x >>> (32 - c));
    let a0 = 0x67452301;
    let b0 = 0xefcdab89;
    let c0 = 0x98badcfe;
    let d0 = 0x10325476;
    const K = [];
    for (let i = 0; i < 64; i++) K.push(Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) & 0xffffffff);
    for (let off = 0; off < b.length; off += 64) {
      const M = new Array(16);
      for (let i = 0; i < 16; i++) M[i] = (b[off + i * 4]) | (b[off + i * 4 + 1] << 8) | (b[off + i * 4 + 2] << 16) | (b[off + i * 4 + 3] << 24);
      let A = a0;
      let B = b0;
      let C = c0;
      let D = d0;
      for (let i = 0; i < 64; i++) {
        let F;
        if (i < 16) F = (B & C) | (~B & D);
        else if (i < 32) F = (D & B) | (~D & C);
        else if (i < 48) F = B ^ C ^ D;
        else F = C ^ (B | ~D);
        F = (F + A + K[i] + M[g(i)]) | 0;
        A = D;
        D = C;
        C = B;
        B = (B + sh(F, [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][Math.floor(i / 16) * 4 + (i % 4)])) | 0;
      }
      a0 = (a0 + A) | 0;
      b0 = (b0 + B) | 0;
      c0 = (c0 + C) | 0;
      d0 = (d0 + D) | 0;
    }
    const hex = v => [0, 8, 16, 24].map(b => ('00' + ((v >>> b) & 0xff).toString(16)).slice(-2)).join('');
    return hex(a0) + hex(b0) + hex(c0) + hex(d0);
  }

  const FIGLET = {
    A: [' ██ ', '█  █', '████', '█  █'], B: ['███ ', '█  █', '███ ', '█  █'],
    C: [' ███', '█   ', '█   ', ' ███'], D: ['██  ', '█ █ ', '█  █', '██  '],
    E: ['████', '█   ', '███ ', '█   '], F: ['████', '█   ', '███ ', '█   '],
    G: [' ███', '█   ', '█ ██', ' ███'], H: ['█  █', '████', '█  █', '█  █'],
    I: ['███', ' █ ', ' █ ', '███'], J: ['  ██', '  █ ', '  █ ', '██  '],
    K: ['█  █', '█ █ ', '██  ', '█ █ '], L: ['█   ', '█   ', '█   ', '████'],
    M: ['█   █', '██ ██', '█ █ █', '█   █'], N: ['█   █', '██  █', '█ █ █', '█  ██'],
    O: [' ██ ', '█  █', '█  █', ' ██ '], P: ['███ ', '█  █', '███ ', '█   '],
    Q: [' ██ ', '█  █', '█ █ ', ' █ █'], R: ['███ ', '█  █', '███ ', '█ █ '],
    S: [' ███', '█   ', ' ███', '  ██'], T: ['████', ' █ ', ' █ ', ' █ '],
    U: ['█  █', '█  █', '█  █', ' ██ '], V: ['█  █', '█  █', ' ██ ', ' █  '],
    W: ['█   █', '█ █ █', '█ █ █', ' █ █ '], X: ['█  █', ' ██ ', ' ██ ', '█  █'],
    Y: ['█  █', ' ██ ', ' █  ', ' █  '], Z: ['████', '  █ ', ' █  ', '████'],
    '0': [' ██ ', '█  █', '█  █', ' ██ '], '1': [' █ ', '██ ', ' █ ', '███'],
    '2': ['███', '  █', ' █ ', '████'], '3': ['███', '  █', '  ██', '███'],
    '4': ['█  █', '█  █', '████', '   █'], '5': ['████', '█   ', ' ███', '   █'],
    '6': [' ██ ', '█   ', '████', '█  █'], '7': ['████', '   █', '  █ ', '  █ '],
    '8': [' ██ ', '█  █', ' ██ ', '█  █'], '9': [' ██ ', '█  █', ' ███', '   █'],
    ' ': [' ', ' ', ' ', ' '], '!': ['█', '█', '█', ' '], '.': [' ', ' ', ' ', '█'],
    '-': [' ', '███', ' ', ' '], '@': [' ██ ', '█ ██', '█ ██', ' ██ '],
    '#': [' █ █ ', '█████', ' █ █ ', '█████'], '+': [' █ ', '███', ' █ ', ' '],
  };

  function figlet(text) {
    const upper = text.toUpperCase();
    const lines = ['', '', '', ''];
    for (const ch of upper) {
      const glyph = FIGLET[ch] || FIGLET[' '];
      for (let i = 0; i < 4; i++) lines[i] += glyph[i] + ' ';
    }
    return lines;
  }

  const LOLCAT_COLORS = ['c-red', 'c-amber', 'c-green', 'c-cyan', 'c-violet', 'c-pink'];

  function lolcat(text) {
    return [...text].map((ch, i) => `<span class="${LOLCAT_COLORS[i % LOLCAT_COLORS.length]}">${esc(ch)}</span>`).join('');
  }

  function applyTermNick() {
    $$('.p-user').forEach(el => { el.textContent = nick; });
    const login = $('.term-title');
    if (login) login.innerHTML = `<span class="p-user">${esc(nick)}</span><span class="p-at">@</span><span class="p-host">m1lwhOS</span><span class="p-path">:~/portfolio</span>`;
  }

  function applyTermTheme() {
    const term = $('.terminal');
    if (term) term.dataset.theme = termTheme;
  }

  


  const palette = {
    isOpen: false,
    sel: 0,
    actions: [],

    init() {
      this.panel = $('#palette');
      this.input = $('#palette-input');
      this.list = $('.palette-list');
      if (!this.panel) return;
      this.input.addEventListener('input', () => { this.sel = 0; this.render(); });
      this.input.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown') { e.preventDefault(); this.sel = Math.min(this.sel + 1, this.actions.length - 1); this.render(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); this.sel = Math.max(this.sel - 1, 0); this.render(); }
        if (e.key === 'Enter' && this.actions[this.sel]) { this.run(this.actions[this.sel].id); }
        if (e.key === 'Escape') this.close();
      });
      this.panel.addEventListener('click', e => {
        if (e.target === this.panel) this.close();
        const item = e.target.closest('.palette-item');
        if (item) this.run(item.dataset.id);
      });
    },

    build() {
      this.actions = [
        { id: 'home', icon: 'house', label: t('pal_home') },
        { id: 'about', icon: 'user', label: t('pal_about') },
        { id: 'projects', icon: 'folder', label: t('pal_projects') },
        { id: 'games', icon: 'gamepad-2', label: t('pal_games') },
        { id: 'skills', icon: 'zap', label: t('pal_skills') },
        { id: 'journey', icon: 'history', label: t('pal_journey') },
        { id: 'contact', icon: 'mail', label: t('pal_contact') },
        { id: 'copy-discord', icon: 'message-circle', label: t('pal_copy_discord') },
        { id: 'copy-ip', icon: 'server', label: t('pal_copy_ip') },
        { id: 'github', icon: 'github', label: t('pal_github') },
        { id: 'telegram', icon: 'send', label: t('pal_telegram') },
        { id: 'discord-srv', icon: 'users', label: t('pal_discord_srv') },
        { id: 'sound', icon: soundOn ? 'volume-2' : 'volume-x', label: soundOn ? t('pal_sound_off') : t('pal_sound') },
        { id: 'music', icon: 'music', label: musicOn ? t('pal_music_off') : t('pal_music') },
        { id: 'lang', icon: 'languages', label: t('pal_lang') },
        { id: 'top', icon: 'arrow-up', label: t('pal_top') },
      ];
    },

    render() {
      if (!this.list) return;
      const q = (this.input.value || '').toLowerCase().trim();
      const filtered = this.actions.filter(a => a.label.toLowerCase().includes(q));
      this.list.innerHTML = '';
      if (!filtered.length) {
        const empty = document.createElement('div');
        empty.className = 'palette-empty';
        empty.textContent = t('pal_empty');
        this.list.appendChild(empty);
        return;
      }
      this.sel = Math.min(this.sel, filtered.length - 1);
      filtered.forEach((a, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'palette-item' + (i === this.sel ? ' sel' : '');
        btn.dataset.id = a.id;
        btn.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#i-${a.icon}"></use></svg><span>${a.label}</span>`;
        this.list.appendChild(btn);
      });
    },

    open() {
      this.build();
      this.render();
      this.panel.classList.add('open');
      this.isOpen = true;
      clickSound();
      setTimeout(() => this.input.focus(), 60);
    },

    close() {
      this.panel.classList.remove('open');
      this.isOpen = false;
      this.input.value = '';
    },

    run(id) {
      clickSound();
      this.close();
      const nav = (sel) => {
        const el = $(sel);
        if (el) el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
      };
      switch (id) {
        case 'home': nav('#hero'); break;
        case 'about': nav('#about'); break;
        case 'projects': nav('#projects'); break;
        case 'games': nav('#games'); break;
        case 'skills': nav('#skills'); break;
        case 'journey': nav('#journey'); break;
        case 'contact': nav('#contact'); break;
        case 'copy-discord': copyText(DISCORD_USER); break;
        case 'copy-ip': copyText(SERVER_IP); break;
        case 'github': window.open(GITHUB_URL, '_blank', 'noopener'); break;
        case 'telegram': window.open(TELEGRAM_URL, '_blank', 'noopener'); break;
        case 'discord-srv': window.open(DISCORD_SERVER_URL, '_blank', 'noopener'); break;
        case 'sound': toggleSound(); break;
        case 'music': toggleMusic(); break;
        case 'lang': setLang(lang === 'ru' ? 'en' : 'ru'); break;
        case 'top': window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }); break;
      }
    },

    rebuild() {
      if (this.isOpen) { this.build(); this.render(); }
    },
  };

  


  function initGallery() {
    const lb = $('#lightbox');
    const img = $('.lightbox-img');
    const cap = $('.lightbox-caption');
    if (!lb) return;
    const close = () => {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    };
    $('.lightbox-close')?.addEventListener('click', close);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    $$('.g-item').forEach(item => {
      item.addEventListener('click', () => {
        const src = item.dataset.full || item.querySelector('img').src;
        img.src = src;
        cap.textContent = item.querySelector('.g-caption').textContent;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  


  function initFaq() {
    $$('.faq-item').forEach(item => {
      const q = $('.faq-q', item);
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        $$('.faq-item.open').forEach(o => o.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
          clickSound();
        }
      });
    });
  }

  


  function initNav() {
    const navbar = $('.navbar');
    const progress = $('#progress');
    const toTop = $('#to-top');
    let lastY = 0;

    const onScroll = () => {
      const y = window.scrollY;
      navbar.classList.toggle('scrolled', y > 40);
      navbar.classList.toggle('nav-hidden', y > 500 && y > lastY + 6 && !$('.nav-mobile').classList.contains('open'));
      lastY = y;
      if (progress) {
        const h = document.documentElement.scrollHeight - innerHeight;
        progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      }
      if (toTop) toTop.classList.toggle('show', y > 700);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop?.addEventListener('click', () => {
      clickSound();
      window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
    });

    const burger = $('.burger');
    const mobile = $('.nav-mobile');
    burger?.addEventListener('click', () => {
      const open = mobile.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      clickSound();
    });

    $$('.nav-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        mobile.classList.remove('open');
        burger.classList.remove('open');
        const target = $(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
        clickSound();
      });
    });

    const sections = $$('main section[id]');
    const links = $$('.nav-link[href^="#"]');
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => io.observe(s));
  }

  


  function bindUI() {
    $$('[data-copy]').forEach(el => {
      el.addEventListener('click', () => {
        copyWithFeedback(el, el.dataset.copy);
        successSound();
      });
    });
    $$('[data-action]').forEach(el => {
      el.addEventListener('click', () => {
        if (el.dataset.action === 'musicPop') {
          openMusicPop();
          return;
        }
        const fn = window[el.dataset.action];
        if (typeof fn === 'function') {
          fn();
        } else {
          clickSound();
        }
      });
    });
    $('#music-pp')?.addEventListener('click', () => toggleMusic());
    $('#music-vol')?.addEventListener('input', e => setMusicVol(e.target.value));
    $('#iamgod-yes')?.addEventListener('click', () => {
      successSound();
      window.location.href = 'https://ptoszek.pl/';
    });
    $('#iamgod-no')?.addEventListener('click', () => {
      clickSound();
      closeIamGod();
    });
    $('#iamgod-modal')?.addEventListener('click', e => {
      if (e.target === $('#iamgod-modal')) closeIamGod();
    });
    document.addEventListener('click', e => {
      const pop = $('#music-pop');
      if (pop && pop.classList.contains('open') && !e.target.closest('#music-pop') && !e.target.closest('.music-toggle')) {
        pop.classList.remove('open');
        const btn = $('#music-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
    if (FINE && !REDUCED) {
      $$('.btn, .icon-btn, .nav-link, .lang-switch button, .faq-q, .g-item').forEach(el => {
        el.addEventListener('mouseenter', hoverSound);
      });
    }
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        palette.isOpen ? palette.close() : palette.open();
      }
      if (e.key === 'Escape') {
        palette.close();
        openMusicPop(false);
        closeIamGod();
        terminal.focusTerm();
      }
    });
    $$('.lang-switch button, #preloader .lang-btn').forEach(b => {
      b.addEventListener('click', () => {
        setLang(b.dataset.lang);
        clickSound();
      });
    });
  }

  


  function consoleGreeting() {
    console.log(
      '%cm1lwh%c | %cJava Developer & Minecraft Enthusiast\n%c● github.com/m1lwh   ● mc.funsmine.su   ● Discord: m1lwh_tvink\n%cRun on M1lwhOS - minimalism without systemd',
      'font-size:22px;font-weight:800;background:linear-gradient(90deg,#22d3ee,#a78bfa);-webkit-background-clip:text;color:transparent;',
      'color:#626f96;',
      'font-size:13px;color:#aab6d6;',
      'color:#22d3ee;font-size:12px;',
      'color:#a78bfa;font-size:12px;font-style:italic;'
    );
    console.log('%cTip: press Ctrl/⌘ + K to open the command palette', 'color:#626f96;font-size:11px;');
  }

  


  function boot() {
    lang = detectLang();
    window.__term = terminal;
    window.__palette = palette;
    applyI18n();
    applyTermTheme();
    buildMarquee();
    initPreloader();
    initCursor();
    initParticles();
    initParallax();
    initMagnetic();
    initTilt();
    initReveal();
    initCounters();
    initSkillBars();
    initJourney();
    initNav();
    initGallery();
    initFaq();
    terminal.init();
    palette.init();
    bindUI();

    syncMusicUI();
    if (musicOn) initMusicEl().play().catch(() => {});

    $('#currentYear').textContent = new Date().getFullYear();
    consoleGreeting();

    window.setLang = setLang;
    window.toggleSound = toggleSound;
    window.toggleMusic = toggleMusic;
    window.paletteOpen = () => palette.open();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
