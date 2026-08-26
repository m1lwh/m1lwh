/* ═══════════════════════════════════════════════════════════════════════
   m1lwh — Canvas particle background (perf-optimized)
   ═══════════════════════════════════════════════════════════════════════ */
'use strict';

(() => {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d', { alpha: true });
  let w = 0, h = 0, dpr = 1;
  let particles = [];
  let rafId = null;
  let running = true;
  const MAX_P = 90;

  const colors = ['rgba(34,211,238,', 'rgba(129,140,248,', 'rgba(192,132,252,'];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function makeParticle(random = false) {
    const p = {
      x: random ? Math.random() * w : w / 2,
      y: random ? Math.random() * h : h / 2,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.6 + 0.6,
      c: colors[(Math.random() * colors.length) | 0],
      a: Math.random() * 0.45 + 0.25,
    };
    return p;
  }

  function seed() {
    const count = Math.min(MAX_P, Math.floor((w * h) / 22000));
    particles = Array.from({ length: count }, () => makeParticle(true));
  }

  function step() {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);

    const linkDist = 130;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < linkDist * linkDist) {
          const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.1;
          ctx.strokeStyle = `rgba(120,140,220,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }

    for (const p of particles) {
      ctx.beginPath();
      ctx.fillStyle = p.c + p.a + ')';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    rafId = requestAnimationFrame(step);
  }

  function start() {
    if (!rafId) rafId = requestAnimationFrame(step);
  }

  function stop() {
    running = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  function resume() {
    running = true;
    start();
  }

  window.addEventListener('resize', () => {
    resize();
    if (running) { /* loop continues, particles re-seeded */ }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else resume();
  });

  resize();
  start();
})();
