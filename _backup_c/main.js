/* ═══════════════════════════════════════════════════════════════════════════
   m1lwh — main application logic
   i18n · preloader · particles · cursor · palette · terminal · sound · UI
   ═══════════════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const LANG_KEY = 'm1lwh_lang';
  const SOUND_KEY = 'm1lwh_sound';
  const MUSIC_KEY = 'm1lwh_music';
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = window.matchMedia('(pointer: fine)').matches;

  const DISCORD_USER = 'm1lwh_tvink';
  const SERVER_IP = 'mc.funsmine.su';
  const GITHUB_URL = 'https://github.com/m1lwh';
  const TELEGRAM_URL = 'https://t.me/m1lwh';
  const DISCORD_SERVER_URL = 'https://discord.gg/FwETzuJ2HF';
  const PVZ_REPO_URL = 'https://github.com/Teyliu/PVZF-Translation';

  let lang = 'ru';
  let soundOn = localStorage.getItem(SOUND_KEY) === '1';
  let musicOn = localStorage.getItem(MUSIC_KEY) === '1';

  const t = key => (I18N[key] ? I18N[key][lang] ?? I18N[key].ru : key);
  const arrayT = key => t(key) || [];

  /* ═══════════════════════════════════════════════════════════════════════
     I18N
     ═══════════════════════════════════════════════════════════════════════ */

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

    const roles = I18N.roles[lang] || I18N.roles.ru;
    if (window.__typeRoles) window.__typeRoles.setRoles(roles);

    if (window.__term && window.__term.body) window.__term.rebuild();
    if (window.__palette) window.__palette.rebuild();

    $$('.lang-btn').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
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

  /* ═══════════════════════════════════════════════════════════════════════
     Toast
     ═══════════════════════════════════════════════════════════════════════ */

  function toast(message, icon = 'check') {
    const wrap = $('#toasts');
    if (!wrap) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#i-${icon}"></use></svg><span></span>`;
    el.querySelector('span').textContent = message;
    wrap.appendChild(el);
    setTimeout(() => {
      el.classList.add('leaving');
      setTimeout(() => el.remove(), 320);
    }, 2600);
  }

  /* ═══════════════════════════════════════════════════════════════════════
     Copy helpers
     ═══════════════════════════════════════════════════════════════════════ */

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

  /* ═══════════════════════════════════════════════════════════════════════
     Audio (WebAudio — no external files)
     ═══════════════════════════════════════════════════════════════════════ */

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

  function blip(freq = 660, dur = 0.07, type = 'sine', gain = 0.06) {
    const ctx = audio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    osc.connect(g).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur + 0.02);
  }

  function clickSound() {
    if (!soundOn) return;
    blip(760, 0.05, 'triangle', 0.035);
  }
  function successSound() {
    if (!soundOn) return;
    blip(660, 0.08, 'sine', 0.05);
    setTimeout(() => blip(990, 0.09, 'sine', 0.045), 90);
  }
  function failSound() {
    if (!soundOn) return;
    blip(220, 0.14, 'sawtooth', 0.03);
  }

  /* ambient pad */
  let musicNodes = [];
  function startMusic() {
    const ctx = audio();
    if (!ctx || musicNodes.length) return;
    const master = ctx.createGain();
    master.gain.value = 0.028;
    master.connect(ctx.destination);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 720;
    filter.connect(master);
    const freqs = [220, 277.18, 329.63, 440];
    const oscs = freqs.map(f => {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f;
      o.detune.value = (Math.random() - 0.5) * 8;
      const g = ctx.createGain();
      g.gain.value = 0.22;
      o.connect(g).connect(filter);
      o.start();
      return { o, g };
    });
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.08;
    lfo.connect(lfoGain).connect(master.gain);
    lfo.start();
    musicNodes = [...oscs.map(x => x.o), lfo, filter, master];
  }
  function stopMusic() {
    musicNodes.forEach(n => { try { n.stop?.(); n.disconnect?.(); } catch {} });
    musicNodes = [];
  }

  function toggleSound() {
    soundOn = !soundOn;
    localStorage.setItem(SOUND_KEY, soundOn ? '1' : '0');
    $$('.sound-toggle').forEach(b => b.classList.toggle('off', !soundOn));
    if (soundOn) successSound();
    toast(t(soundOn ? 'toast_sound_on' : 'toast_sound_off'), soundOn ? 'volume-2' : 'volume-x');
    if (window.__palette) window.__palette.rebuild();
  }

  function toggleMusic() {
    musicOn = !musicOn;
    localStorage.setItem(MUSIC_KEY, musicOn ? '1' : '0');
    if (musicOn) { startMusic(); successSound(); }
    else stopMusic();
    $$('.music-toggle').forEach(b => b.classList.toggle('off', !musicOn));
    toast(t(musicOn ? 'toast_music_on' : 'toast_music_off'), 'music');
    if (window.__palette) window.__palette.rebuild();
  }

  /* ═══════════════════════════════════════════════════════════════════════
     Preloader
     ═══════════════════════════════════════════════════════════════════════ */

  function initPreloader() {
    const pre = $('#preloader');
    if (!pre) return;
    const fill = $('.preloader-bar-fill', pre);
    const status = $('.preloader-status', pre);
    const langRow = $('.preloader-lang', pre);
    const firstVisit = !localStorage.getItem(LANG_KEY);

    lang = detectLang();
    document.documentElement.classList.add('preloading');

    if (firstVisit) {
      langRow.hidden = false;
      $$('.lang-btn', langRow).forEach(b => {
        b.addEventListener('click', () => {
          lang = b.dataset.lang;
          localStorage.setItem(LANG_KEY, lang);
          langRow.hidden = true;
          start();
        });
      });
    }
    start();

    function start() {
      applyI18n();
      const startT = performance.now();
      const dur = firstVisit ? 0 : REDUCED ? 120 : 1400;
      const step = now => {
        const p = Math.min(1, (now - startT) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        fill.style.width = (eased * 100).toFixed(1) + '%';
        status.textContent = `${t('preload_load')}… ${Math.round(eased * 100)}%`;
        if (p < 1) requestAnimationFrame(step);
        else if (!firstVisit) hide();
      };
      if (firstVisit) {
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

  /* ═══════════════════════════════════════════════════════════════════════
     Typing roles
     ═══════════════════════════════════════════════════════════════════════ */

  const typeRoles = {
    roles: [],
    timer: null,
    setRoles(r) {
      this.roles = r;
      const el = $('#hero-role');
      if (!el) return;
      el.textContent = '';
      const caret = document.createElement('span');
      caret.className = 'caret';
      caret.setAttribute('aria-hidden', 'true');
      el.appendChild(caret);
      if (REDUCED) { el.insertBefore(document.createTextNode(this.roles[0]), caret); return; }
      let ri = 0;
      let ci = 0;
      let deleting = false;
      clearTimeout(this.timer);
      const tick = () => {
        if (!el.isConnected) return;
        const word = this.roles[ri] || '';
        const textNode = el.firstChild;
        if (textNode && textNode.nodeType === 3) textNode.nodeValue = word.slice(0, ci);
        else el.insertBefore(document.createTextNode(word.slice(0, ci)), caret);
        if (!deleting) {
          ci++;
          if (ci > word.length) { deleting = true; this.timer = setTimeout(tick, 1500); return; }
        } else {
          ci--;
          if (ci < 0) { deleting = false; ri = (ri + 1) % this.roles.length; this.timer = setTimeout(tick, 260); return; }
        }
        this.timer = setTimeout(tick, deleting ? 30 : 75);
      };
      this.timer = setTimeout(tick, 500);
    },
  };

  /* ═══════════════════════════════════════════════════════════════════════
     Custom cursor
     ═══════════════════════════════════════════════════════════════════════ */

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

  /* ═══════════════════════════════════════════════════════════════════════
     Particle canvas
     ═══════════════════════════════════════════════════════════════════════ */

  function initParticles() {
    const canvas = $('#bg-canvas');
    if (!canvas || REDUCED) return;
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0;
    let parts = [];
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      w = canvas.width = innerWidth * dpr;
      h = canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(100, Math.floor((innerWidth * innerHeight) / 18000));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.6 + 0.4,
        c: ['#22d3ee', '#818cf8', '#c084fc', '#34d399'][Math.floor(Math.random() * 4)],
        a: Math.random() * 0.4 + 0.15,
      }));
    };
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => { running = !document.hidden; });

    const loop = () => {
      if (!running) { requestAnimationFrame(loop); return; }
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -12) p.x = innerWidth + 12;
        if (p.x > innerWidth + 12) p.x = -12;
        if (p.y < -12) p.y = innerHeight + 12;
        if (p.y > innerHeight + 12) p.y = -12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.a;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ═══════════════════════════════════════════════════════════════════════
     Parallax
     ═══════════════════════════════════════════════════════════════════════ */

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

  /* ═══════════════════════════════════════════════════════════════════════
     Magnetic buttons
     ═══════════════════════════════════════════════════════════════════════ */

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

  /* ═══════════════════════════════════════════════════════════════════════
     Reveal on scroll
     ═══════════════════════════════════════════════════════════════════════ */

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

  /* ═══════════════════════════════════════════════════════════════════════
     Counters
     ═══════════════════════════════════════════════════════════════════════ */

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

  /* ═══════════════════════════════════════════════════════════════════════
     Skill bars
     ═══════════════════════════════════════════════════════════════════════ */

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

  /* ═══════════════════════════════════════════════════════════════════════
     Marquee (tech strip)
     ═══════════════════════════════════════════════════════════════════════ */

  function buildMarquee() {
    const track = $('#marquee-track');
    if (!track) return;
    const items = ['Java', 'Python', 'Paper', 'Spigot', 'Forge', 'Fabric', 'Git', 'GitHub', 'Docker', 'Linux', 'Debian', 'OpenBSD', 'Bash', 'JSON', 'YAML', 'Minecraft'];
    const render = () => items.map(it => `<span><svg class="icon" aria-hidden="true"><use href="#i-sparkles"></use></svg>${it}</span>`).join('');
    track.innerHTML = render() + render();
  }

  /* ═══════════════════════════════════════════════════════════════════════
     Terminal
     ═══════════════════════════════════════════════════════════════════════ */

  const terminal = {
    lines: [],
    typing: false,
    body: null,
    input: null,

    init() {
      this.body = $('.term-body');
      this.input = $('.term-input');
      if (!this.body || !this.input) return;
      this.input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.exec(this.input.value.trim());
        }
      });
      const io = new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) {
          obs.disconnect();
          this.boot();
        }
      }, { threshold: 0.3 });
      io.observe(this.body);
    },

    rebuild() {
      if (this.typing || !this.body) return;
      this.body.innerHTML = '';
      this.lines = [];
      if ($('.terminal').getBoundingClientRect().top < innerHeight) this.boot(true);
    },

    boot(skip) {
      const welcome = t('term_welcome');
      const cmds = [welcome, 'help'];
      if (skip) {
        this.lines = [];
        this.printLine(welcome, '');
        this.printLine('help', 'cmd');
        this.exec('help', true);
        return;
      }
      let i = 0;
      const type = () => {
        if (i >= cmds.length) return;
        const word = cmds[i];
        this.typeLine(word, i === 0 ? '' : 'cmd', () => {
          if (i === cmds.length - 1) this.exec('help', true);
          i++;
          setTimeout(type, 500);
        });
      };
      setTimeout(type, 600);
    },

    typeLine(text, cls, done) {
      this.typing = true;
      const el = document.createElement('div');
      el.className = 'term-line ' + cls;
      this.body.appendChild(el);
      let i = 0;
      const step = () => {
        el.textContent = (cls === 'cmd' ? text.slice(0, i) : text.slice(0, i));
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

    scroll() {
      this.body.scrollTop = this.body.scrollHeight;
    },

    exec(raw, silent) {
      const input = this.input;
      if (!silent) {
        this.printLine(raw, 'cmd');
        if (input) input.value = '';
      }
      const parts = raw.toLowerCase().split(/\s+/).filter(Boolean);
      const cmd = parts[0] || '';

      const respond = (lines, cls = '') => {
        (Array.isArray(lines) ? lines : [lines]).forEach(l => this.printLine(l, cls));
      };

      switch (cmd) {
        case 'help':
          respond(t('term_help'), 'c-dim');
          break;
        case 'whoami':
          respond(t('term_whoami'), 'c-cyan');
          break;
        case 'neofetch':
          respond(arrayT('term_neofetch'));
          break;
        case 'skills':
          respond(arrayT('term_skills'), 'c-green');
          break;
        case 'projects':
          respond(arrayT('term_projects'), 'c-violet');
          break;
        case 'server':
          respond(t('term_server'), 'c-amber');
          break;
        case 'contact':
          respond(t('term_contact'), 'c-pink');
          break;
        case 'lang':
          if (parts[1] === 'ru' || parts[1] === 'en') {
            setLang(parts[1]);
            respond(t('term_lang'), 'c-green');
          } else {
            respond(t('term_lang_arg'), 'c-dim');
          }
          break;
        case 'sudo':
          respond(t('term_sudo'), 'c-pink');
          break;
        case 'clear':
        case 'cls':
          this.body.innerHTML = '';
          this.lines = [];
          break;
        case '':
          break;
        default:
          respond(t('term_unknown'), 'c-dim');
      }
    },
  };

  /* ═══════════════════════════════════════════════════════════════════════
     Command palette
     ═══════════════════════════════════════════════════════════════════════ */

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

  /* ═══════════════════════════════════════════════════════════════════════
     Gallery + lightbox
     ═══════════════════════════════════════════════════════════════════════ */

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

  /* ═══════════════════════════════════════════════════════════════════════
     FAQ accordion
     ═══════════════════════════════════════════════════════════════════════ */

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

  /* ═══════════════════════════════════════════════════════════════════════
     Navbar / scroll behaviour
     ═══════════════════════════════════════════════════════════════════════ */

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
      mobile.classList.toggle('open');
      burger.setAttribute('aria-expanded', mobile.classList.contains('open'));
      clickSound();
    });

    $$('.nav-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        mobile.classList.remove('open');
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

  /* ═══════════════════════════════════════════════════════════════════════
     Global listeners
     ═══════════════════════════════════════════════════════════════════════ */

  function bindUI() {
    $$('[data-copy]').forEach(el => {
      el.addEventListener('click', () => {
        copyWithFeedback(el, el.dataset.copy);
        successSound();
      });
    });
    $$('[data-action]').forEach(el => {
      el.addEventListener('click', () => {
        const fn = window[el.dataset.action];
        if (typeof fn === 'function') fn();
        clickSound();
      });
    });
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        palette.isOpen ? palette.close() : palette.open();
      }
      if (e.key === 'Escape') {
        palette.close();
      }
    });
    $$('.lang-switch button, .preloader .lang-btn').forEach(b => {
      b.addEventListener('click', () => setLang(b.dataset.lang));
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     Console easter egg
     ═══════════════════════════════════════════════════════════════════════ */

  function consoleGreeting() {
    console.log(
      '%cm1lwh%c | %cJava Developer & Minecraft Enthusiast\n%c● github.com/m1lwh   ● mc.funsmine.su   ● Discord: m1lwh_tvink\n%cRun on OpenBSD — minimalism without systemd',
      'font-size:22px;font-weight:800;background:linear-gradient(90deg,#22d3ee,#a78bfa);-webkit-background-clip:text;color:transparent;',
      'color:#5d6a8f;',
      'font-size:13px;color:#a7b1d0;',
      'color:#22d3ee;font-size:12px;',
      'color:#a78bfa;font-size:12px;font-style:italic;'
    );
    console.log('%c💡 Tip: press Ctrl/⌘ + K to open the command palette', 'color:#5d6a8f;font-size:11px;');
  }

  /* ═══════════════════════════════════════════════════════════════════════
     Boot
     ═══════════════════════════════════════════════════════════════════════ */

  function boot() {
    lang = detectLang();
    window.__typeRoles = typeRoles;
    window.__term = terminal;
    window.__palette = palette;
    applyI18n();
    buildMarquee();
    initPreloader();
    initCursor();
    initParticles();
    initParallax();
    initMagnetic();
    initReveal();
    initCounters();
    initSkillBars();
    initNav();
    initGallery();
    initFaq();
    terminal.init();
    palette.init();
    bindUI();

    $$('.sound-toggle').forEach(b => b.classList.toggle('off', !soundOn));
    $$('.music-toggle').forEach(b => b.classList.toggle('off', !musicOn));
    if (musicOn) startMusic();

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
