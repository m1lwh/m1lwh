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
  const TERM_MODE_KEY = 'm1lwh_term_mode';
  const TERM_DOCK_KEY = 'm1lwh_term_dock';
  const TERM_FS_KEY = 'm1lwh_term_fullscreen';
  const DEFAULT_SONG_KEY = 'm1lwh_default_song';
  const TUTORIAL_KEY = 'm1lwh_tutorial';
  const TERM_MIN_W = 320;
  const TERM_MIN_H = 240;
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = window.matchMedia('(pointer: fine)').matches;
  const T = ms => (REDUCED ? Math.round(ms * 0.3) : ms);

  const DISCORD_USER = 'm1lwh_tvink';
  const SERVER_IP = 'mc.funsmine.su';
  const GITHUB_URL = 'https://github.com/m1lwh';
  const TELEGRAM_URL = 'https://t.me/m1lwh';
  const DISCORD_SERVER_URL = 'https://discord.gg/FwETzuJ2HF';
  const MUSIC_TRACKS = [
    { src: 'assets/music/Blonde Redhead - For the Damaged Coda.mp3', title: 'For the Damaged Coda', artist: 'Blonde Redhead' },
    { src: 'assets/music/shadowmixed_-_it_s_like_i_m_not_even_here_(mp3.pm).mp3', title: "it's like i'm not even here", artist: 'shadowmixed' },
  ];
  const THEMES = ['cyan', 'green', 'amber', 'violet', 'pink'];
  const TERM_CMDS_TXT_KEY = 'm1lwh_cmds_txt';

  const CMD_CAT = {
    about: 'site', skills: 'site', projects: 'site', games: 'site', contact: 'site',
    help: 'misc', 'help -a': 'misc', man: 'misc', history: 'misc', exit: 'misc', clear: 'misc', cls: 'misc',
    whoami: 'system', hostname: 'system', uname: 'system', uptime: 'system', who: 'system', w: 'system',
    date: 'system', time: 'system', clock: 'system', env: 'system', motd: 'system', su: 'system',
    passwd: 'system', reload: 'system', reboot: 'system', poweroff: 'system', kill: 'system', sleep: 'misc',
    pwd: 'files', ls: 'files', cd: 'files', tree: 'files', cat: 'files', touch: 'files', mkdir: 'files',
    rmdir: 'files', find: 'files', grep: 'files', stat: 'files', du: 'files', tar: 'files', dd: 'files',
    echo: 'dev', printf: 'dev', alias: 'dev', which: 'dev', whereis: 'dev', yes: 'fun', factor: 'dev',
    calc: 'dev', base64: 'dev', md5: 'dev', sha256: 'dev', uuid: 'dev', git: 'dev', repo: 'dev',
    githubstats: 'dev', java: 'dev', nano: 'dev', vi: 'dev', vim: 'dev',
    ping: 'net', ip: 'net', curl: 'net', ssh: 'net', server: 'net', github: 'net', weather: 'net', network: 'net',
    cpu: 'mon', memory: 'mon', free: 'mon', disk: 'mon', df: 'mon', processes: 'mon', ps: 'mon',
    top: 'mon', btop: 'mon', htop: 'mon', watch: 'mon',
    cmatrix: 'fun', matrix: 'fun', sl: 'fun', cowsay: 'fun', fortune: 'fun', joke: 'fun', quote: 'fun',
    cal: 'fun', random: 'fun', coffee: 'fun',
    figlet: 'art', lolcat: 'art', banner: 'art', ascii: 'art', colors: 'art',
    neofetch: 'mon', fastfetch: 'mon', screenfetch: 'mon',
    theme: 'misc', lang: 'misc', translate: 'misc', music: 'misc', volume: 'misc',
    playlist: 'misc', wallpaper: 'misc', nick: 'misc',
    minecraft: 'fun', fusion: 'fun', worldbox: 'fun', mafiaii: 'fun', news: 'fun',
    openbsd: 'system', sudo: 'system', iamgod: 'secret', help2: 'secret',
    nyancat: 'secret', pipes: 'secret', starwars: 'secret',
  };

  const CMD_SYNTAX = {
    'help -a': 'help -a',
    help: 'help [-a]',
    man: 'man <command>',
    cat: 'cat <file>',
    cd: 'cd <dir>',
    touch: 'touch <name>',
    mkdir: 'mkdir <name>',
    rmdir: 'rmdir <name>',
    find: 'find <name|pattern>',
    grep: 'grep <pattern>',
    stat: 'stat <file>',
    calc: 'calc <expression>',
    base64: 'base64 enc|dec <text>',
    md5: 'md5 <text>',
    sha256: 'sha256 <text>',
    uuid: 'uuid',
    random: 'random [max]',
    ping: 'ping [host]',
    curl: 'curl <url>',
    ssh: 'ssh <user>@<host>',
    theme: 'theme set <color>',
    lang: 'lang ru|en',
    volume: 'volume <0-100>|+5|-5',
    nick: 'nick select <name>',
    alias: 'alias [name=command]',
    which: 'which <command>',
    whereis: 'whereis <command>',
    printf: 'printf <text>',
    factor: 'factor <number>',
    sleep: 'sleep <seconds>',
    cowsay: 'cowsay [text]',
    figlet: 'figlet <text>',
    lolcat: 'lolcat <text>',
    watch: 'watch <command>',
    kill: 'kill <pid>',
    su: 'su [user]',
    passwd: 'passwd',
    tar: 'tar <archive.tar>',
    dd: 'dd if=<file> of=<file>',
    w: 'w',
    who: 'who',
    yes: 'yes',
    coffee: 'coffee',
    playlist: 'playlist',
    wallpaper: 'wallpaper',
    motd: 'motd',
    reload: 'reload',
    reboot: 'reboot',
    poweroff: 'poweroff',
    translate: 'translate <word>',
    git: 'git status',
    processess: 'processes',
  };

  const CMD_EXAMPLES = {
    'help -a': ['help -a'],
    help: ['help', 'help man'],
    man: ['man calc', 'man top'],
    cat: ['cat readme.md', 'cat welcome.txt'],
    cd: ['cd portfolio', 'cd ..'],
    touch: ['touch notes.txt'],
    mkdir: ['mkdir projects'],
    rmdir: ['rmdir tmp'],
    find: ['find readme', 'find *.sh'],
    grep: ['grep server'],
    stat: ['stat readme.md'],
    calc: ['calc 2+2*2', 'calc (4+5)^2'],
    base64: ['base64 enc hello', 'base64 dec aGVsbG8='],
    md5: ['md5 hello'],
    sha256: ['sha256 hello'],
    uuid: ['uuid'],
    random: ['random', 'random 1000'],
    ping: ['ping', 'ping mc.funsmine.su'],
    curl: ['curl github.com/m1lwh'],
    ssh: ['ssh m1lwh@portfolio'],
    theme: ['theme set green'],
    lang: ['lang en'],
    volume: ['volume 20', 'volume +5'],
    nick: ['nick select m1lwh'],
    alias: ['alias ll=ls -la', 'alias'],
    which: ['which curl'],
    whereis: ['whereis java'],
    printf: ['printf "Hello %s" m1lwh'],
    factor: ['factor 360'],
    sleep: ['sleep 3'],
    cowsay: ['cowsay hello'],
    figlet: ['figlet m1lwh'],
    lolcat: ['lolcat hello'],
    watch: ['watch date'],
    kill: ['kill 2021'],
    su: ['su root'],
    passwd: ['passwd'],
    tar: ['tar backup.tar'],
    w: ['w'],
    who: ['who'],
    yes: ['yes'],
    coffee: ['coffee'],
    playlist: ['playlist'],
    wallpaper: ['wallpaper'],
    motd: ['motd'],
    reload: ['reload'],
    reboot: ['reboot'],
    poweroff: ['poweroff'],
    translate: ['translate hello'],
  };

  const CMD_ALIASES = {
    cls: ['clear'], matrix: ['cmatrix'], ps: ['processes'], fastfetch: ['neofetch'],
    vi: ['vim'], reboot: ['reboot'], 'help -a': ['help'], clear: ['clear'], ls: ['ls'],
  };

  const CMD_NOTES = {
    sudo: 'Никогда не вводите «sudo rm -rf /» или «sudo rm rf /».',
    iamgod: 'Секретная команда. Не нажимайте ДА.',
    nyancat: 'Секретная команда. Кот летит!',
    pipes: 'Секретная команда. Красивые трубы.',
    starwars: 'Секретная команда. Да пребудет с тобой сила.',
    help: 'help -a выводит полный список команд в терминал.',
    poweroff: 'Система перестанет отвечать. Шутка.',
    su: '�-апросите пароль. Или нет.',
    yes: 'Остановка: просто введите другую команду.',
    watch: 'Остановка: введите другую команду.',
    nano: 'Игрушечный редактор. Настоящие файлы не сохраняются.',
    reboot: 'Экран мигнёт и всё вернётся.',
    poweroff: 'Потушит терминал на пару секунд.',
    curl: 'Эмуляция. Реальные запросы не выполняются.',
    ssh: 'Эмуляция. В портфолио не ходят по SSH.',
  };

  const VFS_BASE_FILES = ['readme.md', 'welcome.txt', 'backup.sh', 'monitor.py', 'deploy.sh'];
  const VFS_BASE_DIRS = ['Desktop', 'Documents', 'downloads', 'portfolio', 'scripts', 'projects'];
  const SECRET_CMDS = ['iamgod', 'nyancat', 'pipes', 'starwars', 'help2'];

  let lang = 'ru';
  let soundOn = localStorage.getItem(SOUND_KEY) === '1';
  let musicOn = localStorage.getItem(MUSIC_KEY) ? localStorage.getItem(MUSIC_KEY) === '1' : true;
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
  let musicIdx = 0;
  let musicShuffle = false;
  let musicRepeat = false;
  let musicDefault = null;
  let musicSeeking = false;
  let detachAutoplay = null;

  const fmtTime = s => {
    if (!isFinite(s) || s < 0) s = 0;
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m + ':' + String(sec).padStart(2, '0');
  };

  function initMusicEl() {
    if (musicEl) return musicEl;
    const el = new Audio();
    el.volume = musicVol / 100;
    el.preload = 'metadata';
    el.addEventListener('timeupdate', updateMusicUI);
    el.addEventListener('loadedmetadata', updateMusicUI);
    el.addEventListener('ended', onTrackEnded);
    el.addEventListener('play', syncMusicUI);
    el.addEventListener('pause', syncMusicUI);
    musicEl = el;
    return el;
  }

  function randomTrackIdx(exclude) {
    if (MUSIC_TRACKS.length < 2) return 0;
    let idx = Math.floor(Math.random() * MUSIC_TRACKS.length);
    if (idx === exclude) idx = (idx + 1) % MUSIC_TRACKS.length;
    return idx;
  }

  function setTrack(idx, autoplay = true) {
    if (!MUSIC_TRACKS[idx]) return;
    musicIdx = idx;
    const el = initMusicEl();
    if (el.src) el.pause();
    el.src = MUSIC_TRACKS[idx].src;
    el.currentTime = 0;
    renderMusicUI();
    if (autoplay) el.play().catch(() => {});
  }

  function nextTrack() {
    let idx;
    if (musicShuffle) idx = randomTrackIdx(musicIdx);
    else idx = (musicIdx + 1) % MUSIC_TRACKS.length;
    setTrack(idx, true);
  }

  function prevTrack() {
    const el = initMusicEl();
    if (el.currentTime > 3) {
      el.currentTime = 0;
      return;
    }
    setTrack((musicIdx - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length, true);
  }

  function onTrackEnded() {
    const el = initMusicEl();
    if (musicRepeat) {
      el.currentTime = 0;
      el.play().catch(() => {});
      return;
    }
    nextTrack();
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

  function updateMusicUI() {
    const el = musicEl;
    const seek = $('#music-seek');
    if (!el || !seek) return;
    const dur = el.duration || 0;
    const cur = el.currentTime || 0;
    seek.max = 1000;
    if (!musicSeeking) seek.value = dur ? Math.round((cur / dur) * 1000) : 0;
    seek.style.setProperty('--fill', (dur ? (cur / dur) * 100 : 0) + '%');
    const ct = $('#music-cur');
    const dt = $('#music-dur');
    if (ct) ct.textContent = fmtTime(cur);
    if (dt) dt.textContent = dur ? fmtTime(dur) : '0:00';
  }

  function renderMusicUI() {
    const track = MUSIC_TRACKS[musicIdx];
    const tt = $('#music-title');
    const ta = $('#music-artist');
    if (track) {
      if (tt) tt.textContent = track.title;
      if (ta) ta.textContent = track.artist;
    }
    $$('.music-item').forEach(item => {
      const idx = +item.dataset.idx;
      item.classList.toggle('active', idx === musicIdx);
      const star = item.querySelector('.music-item-star');
      if (star) {
        const isDef = musicDefault !== null && musicDefault === idx;
        star.classList.toggle('on', isDef);
        star.setAttribute('aria-pressed', String(isDef));
        star.setAttribute('aria-label', t(isDef ? 'a_music_star_on' : 'a_music_star'));
      }
    });
    const starBtn = $('#music-star');
    if (starBtn) {
      const isDef = musicDefault !== null && musicDefault === musicIdx;
      starBtn.classList.toggle('on', isDef);
      starBtn.setAttribute('aria-pressed', String(isDef));
      starBtn.setAttribute('aria-label', t(isDef ? 'a_music_star_on' : 'a_music_star'));
    }
    syncMusicUI();
  }

  function syncMusicUI() {
    const el = musicEl;
    const playing = !!el && !el.paused && !el.ended;
    $$('.music-toggle').forEach(b => b.setAttribute('aria-pressed', String(musicOn)));
    const pp = $('#music-pp');
    if (pp) {
      pp.classList.toggle('playing', playing);
      pp.setAttribute('aria-pressed', String(playing));
    }
    const sh = $('#music-shuffle');
    if (sh) sh.setAttribute('aria-pressed', String(musicShuffle));
    const rep = $('#music-repeat');
    if (rep) rep.setAttribute('aria-pressed', String(musicRepeat));
    setMusicVol(musicVol);
  }

  function autoplayMusic() {
    if (!musicOn) return;
    const el = initMusicEl();
    if (!el.src) return;
    if (detachAutoplay) { detachAutoplay(); detachAutoplay = null; }
    const kick = () => {
      if (!musicOn) return;
      el.play().then(() => {
        if (detachAutoplay) { detachAutoplay(); detachAutoplay = null; }
      }).catch(() => {});
    };
    const detach = () => {
      document.removeEventListener('click', kick);
      document.removeEventListener('keydown', kick);
      document.removeEventListener('scroll', kick);
      document.removeEventListener('touchstart', kick);
    };
    detachAutoplay = detach;
    el.play().then(() => {
      if (detachAutoplay) { detachAutoplay(); detachAutoplay = null; }
    }).catch(() => {
      document.addEventListener('click', kick);
      document.addEventListener('keydown', kick);
      document.addEventListener('scroll', kick, { passive: true });
      document.addEventListener('touchstart', kick, { passive: true });
    });
  }

  function initMusic() {
    const saved = localStorage.getItem(DEFAULT_SONG_KEY);
    musicDefault = (saved === '0' || saved === '1') ? +saved : null;
    const first = musicDefault !== null ? musicDefault : randomTrackIdx();
    setTrack(first, false);
    if (musicOn) autoplayMusic();
  }

  function toggleMusic() {
    musicOn = !musicOn;
    localStorage.setItem(MUSIC_KEY, musicOn ? '1' : '0');
    const el = initMusicEl();
    if (musicOn) {
      if (!el.src) setTrack(musicDefault !== null ? musicDefault : 0, false);
      autoplayMusic();
      successSound();
    } else {
      if (detachAutoplay) { detachAutoplay(); detachAutoplay = null; }
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
    gen: 0,
    typeGen: 0,
    booted: false,
    body: null,
    input: null,
    el: null,
    mode: 'docked',
    dockSlot: 'under-hero',
    pos: null,
    size: null,
    fs: false,
    winHidden: false,
    zones: [],
    DOCK_META: {
      'under-hero': { sel: '#about', pos: 'before' },
      'above-projects': { sel: '#projects', pos: 'before' },
      'below-projects': { sel: '#projects', pos: 'after' },
      'above-journey': { sel: '#journey', pos: 'before' },
      'below-journey': { sel: '#journey', pos: 'after' },
      'above-contact': { sel: '#contact', pos: 'before' },
      'bottom': { sel: 'main', pos: 'append' },
      'left': { float: 'left' },
      'right': { float: 'right' },
    },
    dockSlotOrder: ['under-hero', 'above-projects', 'below-projects', 'above-journey', 'below-journey', 'above-contact', 'bottom', 'left', 'right'],
    hist: [],
    histIdx: -1,
    clockTimer: null,
    clockLine: null,
    animTimer: null,
    watchTimer: null,
    pendingHelp: false,
    pendingPasswd: false,
    aliases: {},
    vfs: { dirs: {}, files: {} },
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
          const raw = this.input.value.trim();
          if (this.pendingHelp || this.pendingPasswd) {
            this.handlePending(raw);
          } else {
            this.exec(raw);
          }
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
      $('#term-full')?.addEventListener('click', () => this.toggleFullscreen());
      $('#term-min')?.addEventListener('click', () => this.minimize());
      $('#term-restore')?.addEventListener('click', () => this.restoreTerm());
      $('#term-reset')?.addEventListener('click', () => this.resetToDefault());
      this.initDrag();
      this.initResize();
      this.initDock();
      try { this.aliases = JSON.parse(localStorage.getItem('m1lwh_term_aliases') || '{}') || {}; } catch (e) { this.aliases = {}; }
      const io = new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) {
          obs.disconnect();
          this.boot();
        }
      }, { threshold: 0.2 });
      io.observe(this.body);
    },

    toggleFullscreen() {
      if (this.mode !== 'floating') return;
      this.fs = !this.fs;
      this.el.classList.toggle('term-fs', this.fs);
      this.saveDock();
      this.syncBarUI();
      clickSound();
      setTimeout(() => this.input && this.input.focus(), 60);
    },

    minimize() {
      if (this.mode !== 'floating') return;
      this.fs = false;
      this.el.classList.remove('term-fs');
      this.winHidden = true;
      this.el.classList.add('term-hidden');
      $('#term-restore').hidden = false;
      this.saveDock();
      clickSound();
    },

    restoreTerm() {
      this.winHidden = false;
      this.el.classList.remove('term-hidden');
      $('#term-restore').hidden = true;
      this.saveDock();
      toast(t('toast_term_restored'), 'check');
      clickSound();
      setTimeout(() => this.input && this.input.focus(), 60);
    },

    initDrag() {
      const bar = $('.term-bar');
      if (!bar || !this.el) return;
      bar.addEventListener('pointerdown', e => {
        if (e.target.closest('button')) return;
        if (window.matchMedia('(max-width: 720px)').matches) return;
        e.preventDefault();
        const r = this.el.getBoundingClientRect();
        const ox = e.clientX - r.left;
        const oy = e.clientY - r.top;
        if (this.mode !== 'floating') {
          this.pos = { x: e.clientX - ox, y: e.clientY - oy };
          this.size = { w: r.width, h: r.height };
          this.enterFloat(false);
        }
        this.el.classList.add('dragging');
        this.buildZones();
        document.documentElement.classList.add('term-interacting');
        const move = ev => {
          this.pos.x = Math.max(8, Math.min(ev.clientX - ox, innerWidth - 80));
          this.pos.y = Math.max(8, Math.min(ev.clientY - oy, innerHeight - 70));
          this.applyPos();
          this.updateZones(ev.clientX, ev.clientY);
        };
        const up = () => {
          this.el.classList.remove('dragging');
          document.documentElement.classList.remove('term-interacting');
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', up);
          const hit = this.activeZone();
          this.clearZones();
          if (hit) {
            this.dockTo(hit, true);
          } else {
            this.saveState();
            this.saveDock();
          }
          clickSound();
        };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
      });
      bar.addEventListener('dblclick', e => {
        if (e.target.closest('button')) return;
        if (this.mode !== 'floating') return;
        this.resetWindow();
      });
    },

    initResize() {
      if (!this.el) return;
      $$('.term-handle', this.el).forEach(h => {
        h.addEventListener('pointerdown', e => {
          if (this.mode !== 'floating') return;
          if (window.matchMedia('(max-width: 720px)').matches) return;
          e.preventDefault();
          e.stopPropagation();
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

    enterFloat(silent) {
      const oldRect = this.el.getBoundingClientRect();
      if (!this.pos) this.pos = { x: 24, y: 96 };
      if (!this.size) this.size = { w: 620, h: 460 };
      const maxW = Math.min(Math.round(innerWidth * 0.92), 1200);
      const maxH = Math.round(innerHeight * 0.85);
      this.size.w = clamp(Math.round(this.size.w), TERM_MIN_W, maxW);
      this.size.h = clamp(Math.round(this.size.h), TERM_MIN_H, maxH);
      this.pos.x = clamp(this.pos.x, 8, Math.max(8, innerWidth - this.size.w - 8));
      this.pos.y = clamp(this.pos.y, 8, Math.max(8, innerHeight - 90));
      this.el.classList.add('floating');
      if (this.fs) this.el.classList.add('term-fs');
      this.section.classList.add('term-away');
      if (this.el.parentElement !== document.body) document.body.appendChild(this.el);
      this.applyRect();
      this.mode = 'floating';
      if (!silent) requestAnimationFrame(() => this.flip(oldRect));
    },

    applyRect() {
      const el = this.el;
      if (!el) return;
      el.classList.add('floating');
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

    saveDock() {
      localStorage.setItem(TERM_MODE_KEY, this.mode);
      localStorage.setItem(TERM_DOCK_KEY, this.dockSlot);
      localStorage.setItem(TERM_FS_KEY, this.fs ? '1' : '0');
    },

    initDock() {
      this.section = $('#terminal');
      this.slotBox = this.el.parentElement;
      this.mode = localStorage.getItem(TERM_MODE_KEY) === 'floating' ? 'floating' : 'docked';
      this.dockSlot = this.validSlot(localStorage.getItem(TERM_DOCK_KEY));
      if (!this.dockSlot) this.dockSlot = 'under-hero';
      const dockCfg = this.DOCK_META[this.dockSlot];
      if (dockCfg && dockCfg.float) this.mode = 'floating';
      let pos = null;
      let size = null;
      try { pos = JSON.parse(localStorage.getItem(TERM_POS_KEY) || 'null'); } catch (e) {}
      try { size = JSON.parse(localStorage.getItem(TERM_SIZE_KEY) || 'null'); } catch (e) {}
      if (pos) this.pos = pos;
      if (size) this.size = size;
      this.fs = localStorage.getItem(TERM_FS_KEY) === '1';
      if (this.mode === 'floating') {
        if (dockCfg && dockCfg.float && !this.pos) {
          this.pos = { x: dockCfg.float === 'left' ? 24 : innerWidth - 644, y: 96 };
        }
        this.enterFloat(true);
      } else {
        this.placeSection(this.dockSlot);
      }
      this.syncBarUI();
    },

    validSlot(id) {
      return Object.prototype.hasOwnProperty.call(this.DOCK_META, id) ? id : null;
    },

    placeSection(slot) {
      const cfg = this.DOCK_META[slot];
      if (!cfg || !cfg.sel) return;
      const anchor = $(cfg.sel);
      if (!anchor) return;
      if (cfg.pos === 'append') {
        anchor.appendChild(this.section);
      } else if (cfg.pos === 'after') {
        if (anchor !== this.section.previousElementSibling) anchor.insertAdjacentElement('afterend', this.section);
      } else {
        if (anchor !== this.section.nextElementSibling) anchor.insertAdjacentElement('beforebegin', this.section);
      }
    },

    dockTo(slot, animate) {
      this.dockSlot = this.validSlot(slot) || 'under-hero';
      const oldRect = this.el.getBoundingClientRect();
      const cfg = this.DOCK_META[this.dockSlot];
      if (cfg && cfg.float) {
        this.el.classList.remove('term-fs', 'dragging', 'resizing');
        this.fs = false;
        this.mode = 'floating';
        this.pos = { x: cfg.float === 'left' ? 24 : innerWidth - 644, y: 96 };
        this.enterFloat(true);
        this.saveDock();
        if (animate) requestAnimationFrame(() => this.flip(oldRect));
        toast(t('toast_term_docked'), 'check');
        clickSound();
        return;
      }
      this.el.classList.remove('floating', 'term-fs', 'dragging', 'resizing');
      this.fs = false;
      this.el.style.left = this.el.style.top = this.el.style.width = this.el.style.height = '';
      this.section.classList.remove('term-away');
      this.slotBox.appendChild(this.el);
      this.placeSection(this.dockSlot);
      this.mode = 'docked';
      this.saveDock();
      if (animate) requestAnimationFrame(() => this.flip(oldRect));
      toast(t('toast_term_docked'), 'check');
      clickSound();
    },

    resetToDefault() {
      this.dockSlot = 'under-hero';
      const oldRect = this.el.getBoundingClientRect();
      this.el.classList.remove('floating', 'term-fs', 'dragging', 'resizing');
      this.fs = false;
      this.winHidden = false;
      this.el.classList.remove('term-hidden');
      $('#term-restore').hidden = true;
      this.el.style.left = this.el.style.top = this.el.style.width = this.el.style.height = '';
      this.section.classList.remove('term-away');
      this.slotBox.appendChild(this.el);
      this.placeSection('under-hero');
      this.mode = 'docked';
      this.dockSlot = 'under-hero';
      this.saveDock();
      localStorage.removeItem(TERM_POS_KEY);
      localStorage.removeItem(TERM_SIZE_KEY);
      requestAnimationFrame(() => this.flip(oldRect));
      toast(t('toast_term_default'), 'check');
      clickSound();
    },

    flip(from) {
      if (REDUCED) return;
      const el = this.el;
      const to = el.getBoundingClientRect();
      const dx = from.left - to.left;
      const dy = from.top - to.top;
      const sw = from.width / to.width;
      const sh = from.height / to.height;
      if (!dx && !dy && Math.abs(sw - 1) < 0.01 && Math.abs(sh - 1) < 0.01) return;
      el.animate([
        { transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + sw + ', ' + sh + ')', transformOrigin: 'top left' },
        { transform: 'translate(0, 0) scale(1, 1)' }
      ], { duration: 460, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)' });
    },

    buildZones() {
      if (this.zones.length) return;
      this.dockSlotOrder.forEach(slot => {
        const z = document.createElement('div');
        z.className = 'term-dockzone';
        z.dataset.slot = slot;
        const pill = document.createElement('span');
        pill.className = 'term-zone-pill';
        pill.textContent = t('dock_slot_' + slot);
        z.appendChild(pill);
        document.body.appendChild(z);
        this.zones.push(z);
      });
      this._repos = this._repos || this.reposZones.bind(this);
      window.addEventListener('scroll', this._repos, { passive: true });
      window.addEventListener('resize', this._repos);
    },

    clearZones() {
      this.zones.forEach(z => z.remove());
      this.zones = [];
      if (this._repos) {
        window.removeEventListener('scroll', this._repos);
        window.removeEventListener('resize', this._repos);
      }
    },

    reposZones() {
      this.zones.forEach(z => {
        const cfg = this.DOCK_META[z.dataset.slot];
        if (!cfg) return;
        if (cfg.float) {
          z.classList.add('term-dockzone--float');
          z.style.top = 'auto';
          if (cfg.float === 'left') {
            z.style.left = '24px';
            z.style.right = 'auto';
          } else {
            z.style.left = 'auto';
            z.style.right = '24px';
          }
          z.style.width = '240px';
          z.style.height = '110px';
          z.style.top = Math.round(innerHeight / 2 - 55) + 'px';
          return;
        }
        z.classList.remove('term-dockzone--float');
        const anchor = $(cfg.sel);
        if (!anchor) return;
        const r = anchor.getBoundingClientRect();
        if (r.top > innerHeight + 200 || r.bottom < -200) return;
        let top;
        if (cfg.pos === 'after') top = r.bottom + 16;
        else top = r.top - 96 - 16;
        top = Math.max(4, Math.min(top, innerHeight - 100));
        z.style.top = top + 'px';
      });
    },

    updateZones(x, y) {
      this.reposZones();
      this.zones.forEach(z => {
        const r = z.getBoundingClientRect();
        const pad = 14;
        const inside = x >= r.left - pad && x <= r.right + pad && y >= r.top - pad && y <= r.bottom + pad;
        z.classList.toggle('active', inside);
      });
    },

    activeZone() {
      const hit = this.zones.find(z => z.classList.contains('active'));
      return hit ? hit.dataset.slot : null;
    },

    syncBarUI() {
      const fullBtn = $('#term-full');
      if (fullBtn) fullBtn.setAttribute('aria-label', t(this.fs ? 'a_term_fs_exit' : 'a_term_fs'));
    },

    resetWindow() {
      if (this.mode !== 'floating') return;
      this.pos = { x: 24, y: 96 };
      this.size = { w: 620, h: 460 };
      const maxW = Math.min(Math.round(innerWidth * 0.92), 1200);
      const maxH = Math.round(innerHeight * 0.85);
      this.size.w = Math.min(this.size.w, maxW);
      this.size.h = Math.min(this.size.h, maxH);
      this.applyRect();
      localStorage.removeItem(TERM_POS_KEY);
      localStorage.removeItem(TERM_SIZE_KEY);
      toast(t('toast_term_reset'), 'check');
      clickSound();
    },

    printLinesDelayed(lines, cls = '', delay = 45, done) {
      const list = Array.isArray(lines) ? lines : [lines];
      const base = Date.now();
      let i = 0;
      let lastTick = Date.now();
      let watchdog = 0;
      const print = () => {
        const ahead = Math.floor((Date.now() - base) / Math.max(1, delay)) - i;
        const batch = Math.min(Math.max(1, ahead), 40);
        for (let k = 0; k < batch && i < list.length; k++) {
          this.printHtml(list[i], cls);
          i++;
        }
        return i;
      };
      const finish = () => {
        cancelAnimationFrame(watchdog);
        if (done) done();
      };
      const tick = () => {
        lastTick = Date.now();
        if (print() >= list.length) { finish(); return; }
        setTimeout(tick, delay);
      };
      const patrol = () => {
        if (Date.now() - lastTick > Math.max(1600, delay * 40)) {
          lastTick = Date.now();
          if (print() >= list.length) { finish(); return; }
        }
        if (i < list.length) watchdog = requestAnimationFrame(patrol);
      };
      tick();
      watchdog = requestAnimationFrame(patrol);
    },

    rebuild() {
      if (!this.body) return;
      this.gen++;
      this.typeGen++;
      this.typing = false;
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
      const gen = this.gen;
      const alive = () => gen === this.gen;
      const next = (delay, fn) => setTimeout(() => { if (alive()) fn(); }, delay);
      next(REDUCED ? 60 : 400, () => {
        if (!alive()) return;
        this.printLinesDelayed(arrayT('term_ascii'), '', REDUCED ? 5 : 55, () => {
          if (!alive()) return;
          next(REDUCED ? 20 : 150, () => {
            if (!alive()) return;
            arrayT('term_intro').forEach((l, i) => {
              next(REDUCED ? 5 : 170 * i, () => {
                if (!alive()) return;
                this.printHtml(l, 'c-dim');
              });
            });
            next(REDUCED ? 30 : 660, () => {
              if (!alive()) return;
              this.printLine('', '');
              arrayT('term_warn').forEach((l, i) => {
                next(REDUCED ? 5 : 250 * i, () => {
                  if (!alive()) return;
                  this.printHtml(l, i === 0 ? 'c-amber' : 'c-red');
                });
              });
              next(REDUCED ? 30 : 700, () => {
                if (!alive()) return;
                this.printLine('', '');
                this.printHtml(t('term_first'), 'c-green');
                this.printHtml(t('term_ready_hint'), 'c-dim');
                this.printLine('', '');
                this.scroll();
                if (this.input) this.input.focus();
              });
            });
          });
        });
      });
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
      return `<span class="p-user">${esc(nick)}</span><span class="p-at">@</span><span class="p-host">portfolio</span><span class="p-path">:${esc(path)}</span><span class="p-doll">$</span>`;
    },

    histNav(dir) {
      if (!this.hist.length) return;
      this.histIdx = clamp(this.histIdx + dir, -1, this.hist.length - 1);
      this.input.value = this.histIdx >= 0 ? this.hist[this.histIdx] : '';
    },

    typeLine(text, cls, done) {
      this.typing = true;
      const gen = this.gen;
      const token = this.typeGen;
      const el = document.createElement('div');
      el.className = 'term-line ' + cls;
      this.body.appendChild(el);
      let i = 0;
      const step = () => {
        if (gen !== this.gen || token !== this.typeGen) return;
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
      if (this.winHidden) this.restoreTerm();
      if (this.body && this.body.closest('.term-fs')) {
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
      if (this.animTimer) { clearInterval(this.animTimer); this.animTimer = null; }
      if (this.watchTimer) { clearInterval(this.watchTimer); this.watchTimer = null; }
      this.typeGen++;
      this.typing = false;
      const thisGen = this.typeGen;
      if (!silent) {
        this.hist.push(raw);
        this.histIdx = this.hist.length;
        this.echoInput(raw);
        if (this.input) this.input.value = '';
      }
      const parts = raw.split(/\s+/).filter(Boolean);
      const cmd = (parts[0] || '').toLowerCase();
      const arg = parts.slice(1).join(' ');

      if (this.aliases[cmd]) {
        const aliasTo = String(this.aliases[cmd]);
        if (aliasTo.split(/\s+/)[0] === cmd) {
          if (!silent) this.printLine(t('term_alias_usage'), 'c-red');
        } else {
          return this.exec(aliasTo + (arg ? ' ' + arg : ''), silent);
        }
      }

      const respond = (lines, cls = '') => {
        (Array.isArray(lines) ? lines : [lines]).forEach(l => this.printLine(l, cls));
      };
      const respondHtml = (lines, cls = '') => {
        (Array.isArray(lines) ? lines : [lines]).forEach(l => this.printHtml(l, cls));
      };
      const nl = () => this.printLine('', '');

      switch (cmd) {
        case 'help': {
          if (arg === '-a') {
            respondHtml(this.cmdCatalog(), '');
            respond(t('term_cmds_help_a'), 'c-dim');
            break;
          }
          const rows = [
            `<span class="c-cyan">${esc(t('term_help_hdr'))}</span>`,
            `<span class="c-dim">${esc(t('term_help_sub'))}</span>`,
            t('term_help_rule'),
          ];
          arrayT('term_help_list').forEach(l => rows.push(l));
          rows.push(t('term_help_rule'));
          const total = Object.keys(t('term_man')).length;
          this.box([
            t('term_help_cmd_count').replace('{n}', total),
            t('term_help_hidden'),
            t('term_help_eggs'),
            t('term_help_ver'),
            t('term_help_tip'),
          ]).forEach(l => rows.push(l));
          rows.push('');
          rows.push(`<span class="c-dim">${esc(t('term_man_tip'))}</span>`);
          this.printLinesDelayed(rows, '', REDUCED ? 2 : 14);
          if (!localStorage.getItem(TERM_CMDS_TXT_KEY)) {
            this.pendingHelp = true;
            this.printLine(t('term_cmds_q'), 'c-amber');
          }
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
          respond('portfolio', 'c-green');
          break;
        case 'uname':
          respond(`OpenBSD 7.6${arg === '-a' ? ' (GENERIC.MP) #0: ' + this.fmtKernel(this.bootAt || new Date()) : ''}`.trim(), 'c-green');
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
        case 'ps':
          respondHtml([
            '<span class="c-green">PID</span>  <span class="c-green">USER</span>  <span class="c-green">CPU</span>  <span class="c-green">MEM</span>  <span class="c-green">CMD</span>',
            `2021  ${nick.padEnd(8)} 0.1  0.3  java -Xms512M -Xmx1G -jar server.jar nogui`,
            '1964  root      0.0  0.1  sshd: m1lwh [priv]',
            '1832  root      0.0  0.1  ntpd -s',
            '1811  root      0.0  0.0  doas: m1lwh ttyC0',
            '1120  root      0.0  0.0  /sbin/init',
          ].map((l, i) => i ? `<span class="c-dim">${l}</span>` : l), '');
          break;
        case 'top': {
          const el = this.printHtml('', '');
          const procs = [
            ['java -jar server.jar', 31], ['chrome', 12], ['sshd', 0.1], ['ntpd', 0.0], ['doas', 0.0], ['/sbin/init', 0.0],
          ];
          const frame = () => {
            const c = 12 + Math.floor(Math.random() * 60);
            const m = 18 + Math.floor(Math.random() * 30);
            const body = procs.map(p =>
              `<span class="c-dim">${String(1800 + Math.floor(Math.random() * 900)).padStart(5)}  ${p[0].padEnd(18)}  ${(p[1] + Math.random() * 9).toFixed(1).padStart(5)}  ${(p[1] * 0.35 + Math.random()).toFixed(1).padStart(5)}</span>`
            ).join('\n');
            el.innerHTML = [
              `<span class="c-cyan">top</span> - OpenBSD 7.6 <span class="c-dim">(up ${this.uptimeStr()})</span>`,
              '',
              `CPU: <span class="c-green">${c}%</span>   MEM: <span class="c-cyan">${m}%</span>   <span class="c-dim">load: ${(Math.random() * 2).toFixed(2)}</span>`,
              '',
              '<span class="c-green">PID   COMMAND            CPU    MEM</span>',
              body,
            ].join('\n');
            this.scroll();
          };
          frame();
          this.animTimer = setInterval(frame, 1000);
          break;
        }
        case 'btop':
        case 'htop': {
          const el = this.printHtml('', '');
          const bar = p => '█'.repeat(Math.round(p / 5)) + '░'.repeat(Math.max(0, 20 - Math.round(p / 5)));
          const frame = () => {
            const c = 12 + Math.floor(Math.random() * 60);
            const m = 15 + Math.floor(Math.random() * 30);
            const s = Math.floor(Math.random() * 8);
            const d = 20 + Math.floor(Math.random() * 15);
            const rows = cmd === 'btop'
              ? `<span class="c-green">CPU</span> [${bar(c)}] ${c}%   <span class="c-cyan">MEM</span> [${bar(m)}] ${m}%\n<span class="c-cyan">SWAP</span> [${bar(s)}] ${s}%   <span class="c-amber">DISK</span> [${bar(d)}] ${d}%\n<span class="c-green">NET</span> ↓ ${(Math.random() * 40).toFixed(1)}MB/s  ↑ ${(Math.random() * 12).toFixed(1)}MB/s   <span class="c-pink">TEMP</span> ${(55 + Math.random() * 20).toFixed(1)}°C`
              : `<span class="c-green">CPU</span> [${bar(c)}] ${c}%   <span class="c-cyan">MEM</span> [${bar(m)}] ${m}%\n<span class="c-cyan">SWAP</span> [${bar(s)}] ${s}%   <span class="c-amber">DISK</span> [${bar(d)}] ${d}%`;
            el.innerHTML = [
              `<span class="c-cyan">${cmd}</span> - OpenBSD 7.6 <span class="c-dim">(up ${this.uptimeStr()})</span>`,
              '',
              rows,
              '',
              '<span class="c-green">PID</span> USER       CPU   MEM   COMMAND',
              `<span class="c-dim">2021 ${nick.padEnd(10)} ${(Math.random() * 3).toFixed(1)} ${(Math.random() * 2).toFixed(1)}   java -jar server.jar</span>`,
              '<span class="c-dim">1964 root       0.0   0.1   sshd: m1lwh [priv]</span>',
            ].join('\n');
            this.scroll();
          };
          frame();
          this.animTimer = setInterval(frame, 1100);
          break;
        }
        case 'cmatrix':
        case 'matrix': {
          const chars = 'アイウエオカキクケコサシスセソ0123456789ABCDEF';
          const COLS = 46, ROWS = 8;
          const grid = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => ' '));
          const el = this.printHtml('', '');
          const frame = () => {
            for (let c = 0; c < COLS; c++) {
              for (let r = ROWS - 1; r > 0; r--) grid[r][c] = grid[r - 1][c];
              grid[0][c] = Math.random() < 0.5 ? chars[Math.floor(Math.random() * chars.length)] : ' ';
              if (Math.random() < 0.12) grid[ROWS - 1][c] = ' ';
            }
            el.innerHTML = grid.map(r => `<span class="c-green">${esc(r.join(''))}</span>`).join('\n');
            this.scroll();
          };
          frame();
          this.animTimer = setInterval(frame, 90);
          break;
        }
        case 'free':
          respondHtml([
            '<span class="c-green">        total        used        free      shared  buff/cache   available</span>',
            '<span class="c-cyan">Mem:</span> <span class="c-dim">31.3Gi</span>       <span class="c-amber">6.2Gi</span>       <span class="c-dim">22.4Gi</span>       <span class="c-dim">0.2Gi</span>       <span class="c-dim">2.7Gi</span>       <span class="c-green">24.9Gi</span>',
            '<span class="c-cyan">Swap:</span> <span class="c-dim">4.0Gi</span>         0B         <span class="c-dim">4.0Gi</span>',
          ], '');
          break;
        case 'df':
          respondHtml([
            '<span class="c-green">Filesystem</span>   Size   Used   Avail   Use%  Mounted on',
            '<span class="c-dim">/dev/ada0p2    1.8T   412G   1.4T    23%  /</span>',
            '<span class="c-dim">/dev/ada0p1   260M    42M   207M    17%  /boot</span>',
            '<span class="c-dim">tmpfs        1.9G    12K   1.9G     1%  /tmp</span>',
            '<span class="c-cyan">overlay      620G   310G   310G    50%  /home</span>',
          ], '');
          break;
        case 'du':
          respondHtml([
            '<span class="c-green">du -sh ~/portfolio</span>',
            '<span class="c-cyan">1.4G</span>    <span class="c-dim">~/portfolio</span>',
            '<span class="c-cyan">240M</span>    <span class="c-dim">  assets/</span>',
            '<span class="c-cyan">1.1G</span>    <span class="c-dim">  projects/</span>',
          ], '');
          break;
        case 'env':
          respondHtml([
            `<span class="c-green">HOME=</span><span class="c-dim">/home/${esc(nick)}</span>`,
            '<span class="c-green">SHELL=</span><span class="c-dim">/bin/ksh</span>',
            '<span class="c-green">TERM=</span><span class="c-dim">xterm-256color</span>',
            `<span class="c-green">USER=</span><span class="c-dim">${esc(nick)}</span>`,
            '<span class="c-green">HOSTNAME=</span><span class="c-dim">portfolio</span>',
            '<span class="c-green">EDITOR=</span><span class="c-dim">vim</span>',
            `<span class="c-green">LANG=</span><span class="c-dim">${lang === 'ru' ? 'ru_RU.UTF-8' : 'en_US.UTF-8'}</span>`,
            `<span class="c-green">PATH=</span><span class="c-dim">/usr/local/bin:/usr/bin:/bin:/usr/X11R6/bin:/home/${esc(nick)}/.local/bin</span>`,
          ], '');
          break;
        case 'printf': {
          if (!arg) { respond(t('term_printf_usage'), 'c-dim'); break; }
          const toks = arg.split(/\s+/);
          let ti = 0;
          const fmtToks = [];
          while (ti < toks.length && (ti === 0 || toks[ti].includes('%'))) { fmtToks.push(toks[ti]); ti++; }
          const args2 = toks.slice(ti);
          let vi = 0;
          const out = fmtToks.join(' ').replace(/%s|%d|%i|%f|%c/g, () => vi < args2.length ? args2[vi++] : '').replace(/\\n/g, '\n').replace(/\\t/g, '\t');
          respond(out, 'c-dim');
          break;
        }
        case 'touch': {
          const f = (arg || '').toLowerCase().replace(/^\//, '');
          if (!f) { respond('touch <file>', 'c-dim'); break; }
          if (this.vfs.files[f] !== undefined || VFS_BASE_FILES.includes(f)) { respond(t('term_touch_err').replace('{f}', f), 'c-red'); break; }
          this.vfs.files[f] = '';
          respond(t('term_touch').replace('{f}', f), 'c-green');
          break;
        }
        case 'mkdir': {
          const d = (arg || '').toLowerCase().replace(/^\//, '');
          if (!d) { respond('mkdir <dir>', 'c-dim'); break; }
          if (this.vfs.dirs[d] || VFS_BASE_DIRS.includes(d)) { respond(t('term_mkdir_err').replace('{d}', d), 'c-red'); break; }
          this.vfs.dirs[d] = true;
          respond(t('term_mkdir').replace('{d}', d), 'c-green');
          break;
        }
        case 'rmdir': {
          const d = (arg || '').toLowerCase().replace(/^\//, '');
          if (!d) { respond(t('term_rmdir_usage'), 'c-dim'); break; }
          if (!this.vfs.dirs[d]) { respond(t('term_rmdir_err').replace('{d}', d), 'c-red'); break; }
          delete this.vfs.dirs[d];
          respond(t('term_rmdir').replace('{d}', d), 'c-green');
          break;
        }
        case 'find': {
          const q = (arg || '').toLowerCase().replace(/\*/g, '');
          if (!q) { respond('find <name|pattern>', 'c-dim'); break; }
          const all = VFS_BASE_FILES
            .concat(VFS_BASE_DIRS.map(d => d + '/'))
            .concat(Object.keys(this.vfs.files))
            .concat(Object.keys(this.vfs.dirs).map(d => d + '/'));
          const hits = all.filter(n => n.toLowerCase().includes(q));
          if (!hits.length) { respond(t('term_find_none'), 'c-dim'); break; }
          respond(t('term_find_hdr').replace('{q}', arg), 'c-cyan');
          hits.forEach(h => respondHtml(`<span class="c-cyan">${esc(h)}</span>`));
          break;
        }
        case 'grep': {
          if (!arg) { respond(t('term_grep_usage'), 'c-dim'); break; }
          const catMap = { 'readme.md': 'term_cat_readme', 'welcome.txt': 'term_cat_welcome', 'backup.sh': 'term_cat_backup', 'monitor.py': 'term_cat_monitor', 'deploy.sh': 'term_cat_deploy' };
          const q = arg.toLowerCase();
          const hits = [];
          Object.keys(catMap).forEach(f => {
            if (arrayT(catMap[f]).join(' ').toLowerCase().includes(q)) hits.push(f);
          });
          Object.keys(this.vfs.files).forEach(f => {
            if (String(this.vfs.files[f]).toLowerCase().includes(q)) hits.push(f);
          });
          if (!hits.length) { respond(t('term_grep_none'), 'c-dim'); break; }
          respond(t('term_grep_hdr').replace('{q}', arg), 'c-cyan');
          hits.forEach(h => respondHtml(`<span class="c-green">${esc(h)}</span>`));
          break;
        }
        case 'stat': {
          const f = (arg || '').toLowerCase().replace(/^\//, '');
          if (!f) { respond(t('term_stat_usage'), 'c-dim'); break; }
          const known = { 'readme.md': 1, 'welcome.txt': 1, 'backup.sh': 1, 'monitor.py': 1, 'deploy.sh': 1 };
          if (!known[f] && this.vfs.files[f] === undefined && !VFS_BASE_DIRS.includes(f)) {
            respond(t('term_stat_missing').replace('{f}', arg), 'c-red');
            break;
          }
          respondHtml([
            '<span class="c-green">  File:</span> ' + esc(arg),
            '<span class="c-green">  Size:</span> <span class="c-cyan">' + (VFS_BASE_DIRS.includes(f) ? 4096 : 1200 + Math.floor(Math.random() * 9000)) + '</span>   <span class="c-green">Blocks:</span> 8  <span class="c-green">Block size:</span> 512',
            '<span class="c-green">Access:</span> (0644/-rw-r--r--)  <span class="c-green">Uid:</span> (1000/m1lwh)  <span class="c-green">Gid:</span> (1000/users)',
            '<span class="c-green">Access:</span> ' + new Date().toDateString(),
            '<span class="c-green">Modify:</span> ' + new Date(Date.now() - 86400000 * 3).toDateString(),
          ], '');
          break;
        }
        case 'which': {
          const q = (arg || '').split(/\s+/)[0];
          if (!q) { respond('which <command>', 'c-dim'); break; }
          if (t('term_man')[q]) respond('/usr/local/bin/' + q, 'c-green');
          else respond(t('term_which_none').replace('{cmd}', q), 'c-red');
          break;
        }
        case 'whereis': {
          const q = (arg || '').split(/\s+/)[0];
          if (!q) { respond('whereis <command>', 'c-dim'); break; }
          if (t('term_man')[q]) respondHtml(`<span class="c-green">${esc(q)}:</span> <span class="c-dim">/usr/bin/${esc(q)} /usr/local/bin/${esc(q)}</span>`);
          else respond(t('term_whereis_none').replace('{cmd}', q), 'c-red');
          break;
        }
        case 'alias': {
          const m = arg.match(/^([a-z0-9_]+)=(.*)$/i);
          if (!arg) {
            const keys = Object.keys(this.aliases);
            if (!keys.length) { respond(t('term_alias_none'), 'c-dim'); break; }
            keys.forEach(k => respondHtml(`<span class="c-green">${esc(k)}</span>=<span class="c-dim">${esc(this.aliases[k])}</span>`));
            break;
          }
          if (!m) { respond(t('term_alias_usage'), 'c-dim'); break; }
          this.aliases[m[1]] = m[2];
          try { localStorage.setItem('m1lwh_term_aliases', JSON.stringify(this.aliases)); } catch (e) {}
          respond(t('term_alias_saved').replace('{a}', m[1] + '=' + m[2]), 'c-green');
          break;
        }
        case 'su':
          if (arg === 'root') respond(t('term_su_ok'), 'c-green');
          else respond(t('term_su'), 'c-red');
          break;
        case 'passwd':
          respond(t('term_passwd_ask').replace('{u}', nick), 'c-amber');
          this.pendingPasswd = true;
          break;
        case 'kill': {
          const pid = parseInt(arg, 10);
          if (!pid) { respond('kill <pid>', 'c-dim'); break; }
          if (pid === 1) { respond('kill: PID 1 - init. Даже здесь нельзя.', 'c-red'); break; }
          respond(t('term_kill').replace('{pid}', pid), 'c-green');
          break;
        }
        case 'sleep': {
          const s = parseInt(arg, 10);
          if (!s || s < 1 || s > 30) { respond(t('term_sleep_usage'), 'c-dim'); break; }
          respond(t('term_sleep').replace('{s}', s), 'c-dim');
          setTimeout(() => { if (this.typeGen === thisGen) respond(t('term_sleep_wake'), 'c-green'); }, s * 1000);
          break;
        }
        case 'yes': {
          let n = 0;
          this.animTimer = setInterval(() => {
            if (n++ >= 30) { clearInterval(this.animTimer); this.animTimer = null; return; }
            this.printLine('y', 'c-dim');
            this.scroll();
          }, 120);
          break;
        }
        case 'coffee': {
          const frames = ['⣷ Собираю зёрна...', '⣯ Мелю...', '⣟ Варю...', '⣻ Почти готово...'];
          const el = this.printHtml('', '');
          frames.forEach((f, i) => {
            setTimeout(() => { if (this.typeGen === thisGen) { el.textContent = f; this.scroll(); } }, i * 550);
          });
          setTimeout(() => {
            if (this.typeGen !== thisGen) return;
            el.innerHTML = `<span class="c-amber">☕ ${esc(t('term_coffee_ready'))}</span>`;
            this.scroll();
          }, frames.length * 550 + 300);
          break;
        }
        case 'playlist': {
          const lines = ['<span class="c-cyan">' + esc(t('term_playlist_hdr')) + '</span>', ''];
          MUSIC_TRACKS.forEach((tr, i) => lines.push(`<span class="c-green">${i + 1}. ${esc(tr.title)}</span>  <span class="c-dim">- ${esc(tr.artist)}</span>`));
          lines.push(`<span class="c-dim">♫ ${esc(nick)}@portfolio  volume: ${musicVol}%</span>`);
          respondHtml(lines, '');
          break;
        }
        case 'wallpaper':
          respondHtml([
            `<span class="c-cyan">${esc(t('term_wallpaper_hdr'))}</span>`,
            '',
            '<span class="c-green">1. openbsd-mountains.png</span>  <span class="c-dim">3840�-2160</span>',
            '<span class="c-green">2. matrix-code.png</span>       <span class="c-dim">2560�-1440</span>',
            '<span class="c-green">3. minimal-cyan.png</span>      <span class="c-dim">1920�-1080</span>',
            '',
            '<span class="c-dim">theme set cyan - сменить акцент.</span>',
          ], '');
          break;
        case 'motd':
          arrayT('term_motd').forEach(l => respond(l, 'c-dim'));
          break;
        case 'who':
          respondHtml([
            `<span class="c-green">${esc(nick)}</span>  <span class="c-dim">ttyC0</span>   <span class="c-amber">${new Date().toLocaleDateString()}</span>  <span class="c-dim">(portfolio)</span>`,
            '<span class="c-green">root</span>    <span class="c-dim">ttyC1</span>   <span class="c-amber">' + new Date().toLocaleDateString() + '</span>  <span class="c-dim">(::1)</span>',
          ], '');
          break;
        case 'w':
          respondHtml([
            `<span class="c-cyan">${new Date().toTimeString().slice(0, 8)}</span>  up ${this.uptimeStr()}  <span class="c-dim">1 user, load average: ${(Math.random() * 0.5).toFixed(2)}, ${(Math.random() * 0.5).toFixed(2)}, ${(Math.random() * 0.5).toFixed(2)}</span>`,
            '',
            '<span class="c-green">USER</span>  <span class="c-green">TTY</span>  <span class="c-green">FROM</span>  <span class="c-green">LOGIN@</span>  <span class="c-green">IDLE</span>  <span class="c-green">WHAT</span>',
            `<span class="c-dim">${esc(nick)}   ttyC0  :0      09:15    0.00s  help</span>`,
          ], '');
          break;
        case 'reload':
          respond(t('term_reload'), 'c-amber');
          setTimeout(() => location.reload(), 700);
          break;
        case 'reboot':
          this.printLinesDelayed([t('term_reload'), t('term_po_1'), t('term_po_2'), t('term_po_3')], '', REDUCED ? 3 : 60, () => setTimeout(() => location.reload(), 900));
          break;
        case 'poweroff': {
          this.printLinesDelayed([t('term_po_1'), t('term_po_2'), t('term_po_3'), t('term_po_4')], '', REDUCED ? 3 : 70, () => {
            this.el.classList.add('term-off');
            setTimeout(() => {
              this.el.classList.remove('term-off');
              this.printLine(t('term_po_4'), 'c-amber');
              if (this.input) this.input.focus();
            }, 3200);
          });
          break;
        }
        case 'curl': {
          const u = (arg || '').toLowerCase().replace(/^https?:\/\//, '');
          if (!u) { respond(t('term_curl_usage'), 'c-dim'); break; }
          const pages = {
            'github.com/m1lwh': ['<html>', '<head><title>m1lwh · GitHub</title></head>', '<body>', '<h1>m1lwh</h1>', '<p>27 repositories · Java, Python, JS</p>', '</body>', '</html>'],
            'portfolio': ['<html>', '<head><title>m1lwh portfolio</title></head>', '<body>', '<h1>Вы уже здесь :)</h1>', '</body>', '</html>'],
            'mc.funsmine.su': ['<html>', '<head><title>Funsmine</title></head>', '<body>', '<h1>Minecraft server</h1>', '<p>1.21.1 · Java Edition · 185.232.69.148</p>', '</body>', '</html>'],
          };
          const body = pages[u] || pages[u.replace(/\/.*$/, '')];
          if (!body) { respondHtml(`<span class="c-red">${esc(t('term_curl_404'))} (${esc(arg)})</span>`); break; }
          respondHtml([
            '<span class="c-green">HTTP/1.1 200 OK</span>',
            '<span class="c-dim">Content-Type: text/html; charset=utf-8</span>',
            '<span class="c-dim">Server: nginx/1.27.0</span>',
            '',
          ].concat(body.map(l => `<span class="c-dim">${esc(l)}</span>`)), '');
          break;
        }
        case 'ssh': {
          const m = arg.match(/^(\w+)@(.+)$/);
          if (!m) { respond(t('term_ssh_usage'), 'c-dim'); break; }
          respondHtml(`<span class="c-green">ssh: connecting to ${esc(arg)}...</span>`, '');
          setTimeout(() => { if (this.typeGen === thisGen) respondHtml(`<span class="c-red">${esc(t('term_ssh').replace('{h}', arg))}</span>`); }, 700);
          break;
        }
        case 'dd':
          respond(t('term_dd'), 'c-pink');
          break;
        case 'tar': {
          if (!arg) { respond(t('term_tar_usage'), 'c-dim'); break; }
          respondHtml(`<span class="c-green">${esc(t('term_tar_ok').replace('{a}', arg))}</span>`);
          break;
        }
        case 'factor': {
          const n = parseInt(arg, 10);
          if (!n || n < 2) { respond(t('term_factor_err'), 'c-red'); break; }
          const fac = [];
          let v = n;
          for (let p = 2; p * p <= v; p++) {
            while (v % p === 0) { fac.push(p); v /= p; }
          }
          if (v > 1) fac.push(v);
          respond(n + ': ' + fac.join(' '), 'c-green');
          break;
        }
        case 'vi':
          respond(t('term_vi'), 'c-pink');
          break;
        case 'nano': {
          if (!arg) { respond(t('term_nano_usage'), 'c-dim'); break; }
          respondHtml([
            `<span class="c-cyan">GNU nano 8.2</span>  <span class="c-dim">${esc(arg)}</span>`,
            '',
            '<span class="c-dim"># Этот файл редактируется... в воображении.</span>',
            '<span class="c-dim"># Никакие изменения не сохранятся. Как в жизни.</span>',
            '<span class="c-dim">~</span>',
            '<span class="c-dim">~</span>',
            `<span class="c-amber">${esc(t('term_nano_help'))}</span>`,
          ], '');
          setTimeout(() => { if (this.typeGen === thisGen) respond(t('term_nano_saved'), 'c-green'); }, 1600);
          break;
        }
        case 'watch': {
          const target = arg;
          if (!target) { respond(t('term_watch_usage'), 'c-dim'); break; }
          respondHtml(`<span class="c-cyan">watch ${esc(target)}</span> <span class="c-dim">(${t('term_help_sub')})</span>`);
          const loop = () => {
            this.exec(target, true);
            this.watchTimer = setTimeout(loop, 2000);
          };
          this.watchTimer = setTimeout(loop, 2000);
          loop();
          break;
        }
        case 'nyancat': {
          const colors = ['c-red', 'c-amber', 'c-green', 'c-cyan', 'c-violet', 'c-pink'];
          const el = this.printHtml('', '');
          let x = 0;
          const frame = () => {
            let row = '';
            for (let i = 0; i < 46; i++) {
              if (i >= x && i < x + 3) row += `<span class="c-amber">${'^o^'.charAt(i - x)}</span>`;
              else if (Math.random() < 0.3) row += `<span class="${colors[Math.floor(Math.random() * colors.length)]}">·</span>`;
              else row += ' ';
            }
            el.innerHTML = row;
            x = (x + 1) % 46;
            this.scroll();
          };
          frame();
          this.animTimer = setInterval(frame, 110);
          break;
        }
        case 'pipes': {
          const el = this.printHtml('', '');
          const W = 46, H = 8;
          const grid = Array.from({ length: H }, () => Array.from({ length: W }, () => ' '));
          const colors = ['c-cyan', 'c-green', 'c-violet', 'c-pink'];
          const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
          let cx = 2, cy = 2, dir = 0;
          const frame = () => {
            let g = dirs[dir];
            let nx = cx + g[0], ny = cy + g[1];
            if (Math.random() < 0.4) {
              const nd = (dir + (Math.random() < 0.5 ? 1 : 3)) % 4;
              const ng = dirs[nd];
              const tnx = cx + ng[0], tny = cy + ng[1];
              if (tnx >= 0 && tnx < W && tny >= 0 && tny < H) { nx = tnx; ny = tny; dir = nd; }
            }
            if (nx < 0 || nx >= W || ny < 0 || ny >= H) {
              dir = (dir + 2) % 4;
              g = dirs[dir];
              nx = cx + g[0]; ny = cy + g[1];
              if (nx < 0 || nx >= W || ny < 0 || ny >= H) { nx = cx; ny = cy; }
            }
            grid[cy][cx] = dir % 2 === 0 ? '─' : '│';
            grid[ny][nx] = dir % 2 === 0 ? '─' : '│';
            cx = nx; cy = ny;
            el.innerHTML = grid.map(r => `<span class="${colors[Math.floor(Math.random() * colors.length)]}">${esc(r.join(''))}</span>`).join('\n');
            this.scroll();
          };
          frame();
          this.animTimer = setInterval(frame, 120);
          break;
        }
        case 'starwars': {
          const text = arrayT('term_sw');
          let i = 0;
          const step = () => {
            if (i >= text.length) { this.printLine('', ''); return; }
            this.printHtml(`<span class="c-amber">${esc(text[i++])}</span>`);
            this.scroll();
            this.animTimer = setTimeout(step, 450);
          };
          step();
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
            '<span class="c-cyan">m1lwh/milwhario-visual</span>  <span class="c-dim">→ visual client 1.21.11</span>',
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
        case 'screenfetch': {
          const lines = arrayT('term_neofetch').map(l => l.replace('{u}', this.uptimeStr()));
          this.printLinesDelayed(lines, '', REDUCED ? 5 : 80);
          break;
        }
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

    echoInput(raw) {
      this.print(this.prompt(), 'cmd');
      const tLine = document.createElement('span');
      tLine.textContent = raw;
      this.body.lastChild.appendChild(tLine);
    },

    handlePending(raw) {
      const ans = raw.trim().toLowerCase();
      if (this.pendingHelp) {
        this.pendingHelp = false;
        this.echoInput(raw);
        if (ans === 'y' || ans === 'yes' || ans === 'да' || ans === 'д') {
          localStorage.setItem(TERM_CMDS_TXT_KEY, 'done');
          this.printLine(t('term_cmds_downloaded'), 'c-green');
          this.downloadCommandsTxt();
        } else {
          localStorage.setItem(TERM_CMDS_TXT_KEY, 'declined');
          this.printLine(t('term_cmds_declined'), 'c-dim');
        }
      } else if (this.pendingPasswd) {
        this.pendingPasswd = false;
        this.echoInput(raw);
        this.printLine(ans === 'm1lwh' || ans === 'root' ? t('term_passwd_ok') : t('term_passwd_done'), 'c-green');
      }
      this.input.value = '';
      this.scroll();
      if (this.input) this.input.focus();
    },

    box(lines, w = 44) {
      const out = ['┌' + '─'.repeat(w) + '┐'];
      lines.forEach(l => {
        const s = String(l).slice(0, w);
        out.push('│' + s + ' '.repeat(w - s.length) + '│');
      });
      out.push('└' + '─'.repeat(w) + '┘');
      return out;
    },

    cmdCatalog() {
      const man = t('term_man');
      const rows = [`<span class="c-cyan">${esc(t('term_cmds_title'))}</span>`, ''];
      Object.keys(man).sort().forEach(c => {
        const syn = CMD_SYNTAX[c] || c;
        const exs = CMD_EXAMPLES[c] || [c];
        const als = CMD_ALIASES[c] || [];
        const note = CMD_NOTES[c];
        rows.push(`<span class="c-green">${esc(c)}</span>  <span class="c-cyan">[${esc(t('term_cat_' + (CMD_CAT[c] || 'misc')))}]</span>  -  ${esc(man[c])}`);
        rows.push(`<span class="c-dim">    ${esc(t('term_cmds_syntax'))}: ${esc(syn)}</span>`);
        if (exs.length) rows.push(`<span class="c-dim">    ${esc(t('term_cmds_examples'))}: ${esc(exs.join(' | '))}</span>`);
        if (als.length) rows.push(`<span class="c-dim">    ${esc(t('term_cmds_aliases'))}: ${esc(als.join(', '))}</span>`);
        if (note) rows.push(`<span class="c-amber">    ${esc(t('term_cmds_note'))}: ${esc(note)}</span>`);
        rows.push('');
      });
      rows.push(`<span class="c-dim">${esc(t('term_cmds_note_auto'))}</span>`);
      return rows;
    },

    downloadCommandsTxt() {
      const man = t('term_man');
      const lines = [t('term_cmds_title'), '='.repeat(60), '', `terminal.portfolio - ${Object.keys(man).length} commands`, ''];
      Object.keys(man).sort().forEach(c => {
        const syn = CMD_SYNTAX[c] || c;
        const exs = CMD_EXAMPLES[c] || [c];
        const als = CMD_ALIASES[c] || [];
        const note = CMD_NOTES[c];
        lines.push(`[${t('term_cat_' + (CMD_CAT[c] || 'misc'))}]`);
        lines.push(`${c} - ${man[c]}`);
        lines.push(`  ${t('term_cmds_syntax')}: ${syn}`);
        lines.push(`  ${t('term_cmds_examples')}: ${exs.join(' | ')}`);
        if (als.length) lines.push(`  ${t('term_cmds_aliases')}: ${als.join(', ')}`);
        if (note) lines.push(`  ${t('term_cmds_note')}: ${note}`);
        lines.push('');
      });
      lines.push(t('term_cmds_note_auto'));
      const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'commands.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 3000);
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
    if (login) login.innerHTML = `<span class="p-user">${esc(nick)}</span><span class="p-at">@</span><span class="p-host">portfolio</span><span class="p-path">:~/portfolio</span>`;
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

  

  function initTutorial() {
    if (localStorage.getItem(TUTORIAL_KEY) === '1') return;
    const wrap = $('#tutorial');
    if (!wrap) return;
    const spot = $('#tutorial-spot');
    const title = $('#tutorial-title');
    const desc = $('#tutorial-desc');
    const count = $('#tutorial-count');
    const dots = $('#tutorial-dots');
    const prevBtn = $('#tutorial-prev');
    const nextBtn = $('#tutorial-next');
    const skipBtn = $('#tutorial-skip');
    const closeBtn = $('#tutorial-close');
    const mobile = () => matchMedia('(max-width: 900px)').matches;
    const steps = [
      { el: () => mobile() ? $('.burger') : $('.nav-links'), key: 1 },
      { el: () => $('.nav-inner [data-action="paletteOpen"]') || $('.nav-mobile [data-action="paletteOpen"]'), key: 2 },
      { el: () => $('#music-btn'), key: 3 },
      { el: () => $('.lang-switch'), key: 4 },
      { el: () => $('#terminal'), key: 5 },
      { el: () => $('#projects'), key: 6 },
      { el: () => $('#journey'), key: 7 },
      { el: () => $('#gallery'), key: 8 },
      { el: () => $('#contact'), key: 9 },
    ];
    let idx = 0;

    const placeSpot = (el) => {
      if (!el) { spot.style.display = 'none'; return; }
      const isSection = !!el.classList.contains('section');
      el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: isSection ? 'start' : 'center' });
      setTimeout(() => {
        if (!wrap.classList.contains('open')) return;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) { spot.style.display = 'none'; return; }
        const h = isSection ? Math.min(r.height, 280) : r.height;
        spot.style.display = 'block';
        spot.style.top = r.top + 'px';
        spot.style.left = r.left + 'px';
        spot.style.width = r.width + 'px';
        spot.style.height = h + 'px';
      }, REDUCED ? 30 : 430);
    };

    const render = () => {
      const s = steps[idx];
      const el = s.el();
      count.textContent = t('tutorial_step').replace('{c}', idx + 1).replace('{n}', steps.length);
      title.textContent = t('tutorial_' + s.key + '_t');
      desc.textContent = t('tutorial_' + s.key + '_d');
      prevBtn.hidden = idx === 0;
      if (idx === steps.length - 1) nextBtn.textContent = t('tutorial_finish');
      else nextBtn.textContent = t('tutorial_next');
      dots.innerHTML = steps.map((s2, i) => `<span class="tutorial-dot${i === idx ? ' on' : ''}"></span>`).join('');
      placeSpot(el);
    };

    const open = () => {
      wrap.classList.remove('hidden');
      wrap.classList.add('open');
      wrap.setAttribute('aria-hidden', 'false');
      render();
    };

    const close = () => {
      localStorage.setItem(TUTORIAL_KEY, '1');
      wrap.classList.remove('open');
      wrap.setAttribute('aria-hidden', 'true');
      setTimeout(() => spot.style.display = 'none', 250);
      successSound();
      toast(t('tutorial_done'), 'sparkles');
    };

    nextBtn.addEventListener('click', () => {
      clickSound();
      if (idx < steps.length - 1) { idx++; render(); }
      else close();
    });
    prevBtn.addEventListener('click', () => {
      if (idx > 0) { idx--; render(); clickSound(); }
    });
    skipBtn.addEventListener('click', () => { clickSound(); close(); });
    closeBtn.addEventListener('click', () => { clickSound(); close(); });

    const waitPreloader = new Promise(res => {
      if (!$('#preloader')) { res(); return; }
      const obs = new MutationObserver(() => {
        if (!$('#preloader')) { obs.disconnect(); res(); }
      });
      obs.observe(document.body, { childList: true });
    });
    waitPreloader.then(() => setTimeout(open, 350));
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
    $('#music-pp')?.addEventListener('click', () => {
      if (!musicOn) {
        musicOn = true;
        localStorage.setItem(MUSIC_KEY, '1');
      }
      const el = initMusicEl();
      if (el.paused) el.play().catch(() => {}); else el.pause();
    });
    $('#music-prev')?.addEventListener('click', prevTrack);
    $('#music-next')?.addEventListener('click', nextTrack);
    $('#music-shuffle')?.addEventListener('click', () => {
      musicShuffle = !musicShuffle;
      syncMusicUI();
      clickSound();
    });
    $('#music-repeat')?.addEventListener('click', () => {
      musicRepeat = !musicRepeat;
      syncMusicUI();
      clickSound();
    });
    $('#music-seek')?.addEventListener('input', e => {
      const el = musicEl;
      if (!el || !el.duration) return;
      musicSeeking = true;
      const ct = $('#music-cur');
      if (ct) ct.textContent = fmtTime((e.target.value / 1000) * el.duration);
    });
    $('#music-seek')?.addEventListener('change', e => {
      const el = musicEl;
      if (!el || !el.duration) return;
      el.currentTime = (e.target.value / 1000) * el.duration;
      musicSeeking = false;
      updateMusicUI();
    });
    $$('.music-item-main').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = +btn.dataset.play;
        if (!musicOn) {
          musicOn = true;
          localStorage.setItem(MUSIC_KEY, '1');
        }
        if (idx === musicIdx) {
          const el = initMusicEl();
          if (el.paused) el.play().catch(() => {}); else el.pause();
        } else {
          setTrack(idx, true);
        }
      });
    });
    $$('.music-item-star').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = +btn.dataset.star;
        const isDef = musicDefault === idx;
        musicDefault = isDef ? null : idx;
        if (musicDefault !== null) {
          localStorage.setItem(DEFAULT_SONG_KEY, String(musicDefault));
          toast(t('music_default_set').replace('{song}', MUSIC_TRACKS[idx].title), 'star');
        } else {
          localStorage.removeItem(DEFAULT_SONG_KEY);
          toast(t('music_default_cleared'), 'star');
        }
        renderMusicUI();
      });
    });
    $('#music-star')?.addEventListener('click', () => {
      if (!MUSIC_TRACKS[musicIdx]) return;
      const isDef = musicDefault === musicIdx;
      musicDefault = isDef ? null : musicIdx;
      if (musicDefault !== null) {
        localStorage.setItem(DEFAULT_SONG_KEY, String(musicDefault));
        toast(t('music_default_set').replace('{song}', MUSIC_TRACKS[musicIdx].title), 'star');
      } else {
        localStorage.removeItem(DEFAULT_SONG_KEY);
        toast(t('music_default_cleared'), 'star');
      }
      renderMusicUI();
    });
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
      '%cm1lwh%c | %cJava Developer & Minecraft Enthusiast\n%c�-� github.com/m1lwh   �-� mc.funsmine.su   �-� Discord: m1lwh_tvink\n%cOpenBSD - minimalism without systemd',
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
    initMusic();
    initTutorial();

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
