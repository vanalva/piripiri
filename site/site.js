// ─── Site-wide cursor & button fire effects ────────────────────────────────
// 1. initFlameCursor — animated SVG flame follows the cursor.
// 2. initButtonFire  — flames spawn above buttons/links on hover.
// Loaded from site.js on every page. Home-specific inline flames remain
// inline in index.html.

// Theme-aware flame color.
// Only the brand-orange background needs cream flames (otherwise the orange
// flames disappear against the orange bg). Dark and light backgrounds both
// keep brand-orange flames since orange reads fine against both.
const PP_FLAME_BRAND = '#ff5224'; // var(--swatch--brand-500)
const PP_FLAME_CREAM = '#efdece'; // var(--swatch--light-200)
function ppFlameColorAt(x, y) {
  const el = document.elementFromPoint(x, y);
  if (!el) return PP_FLAME_BRAND;
  // Walk ancestors; the innermost theme wins (mirrors the CSS cursor cascade).
  let node = el;
  while (node && node !== document.documentElement) {
    if (node.classList) {
      if (node.classList.contains('u-theme-dark') || node.classList.contains('u-theme-light')) return PP_FLAME_BRAND;
      if (node.classList.contains('u-theme-brand')) return PP_FLAME_CREAM;
    }
    node = node.parentElement;
  }
  return PP_FLAME_BRAND;
}

// True on touch-primary devices (phones/tablets) that have no hover-capable,
// precise pointer. Used to skip the cursor-follow flame and button-hover fire,
// which are meaningless (and can misfire on tap) without a mouse.
const PP_IS_TOUCH = !!(window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches);

(function initFlameCursor() {
  if (PP_IS_TOUCH) return;
  if (window._ppFlameCursorInited) return;
  window._ppFlameCursorInited = true;

  const FLAME_HTML = `
    <div id="pp-fire" style="position:fixed;pointer-events:none;z-index:99999;top:-999px;left:-999px;opacity:0;">
      <div class="pp-flame-wrap" id="pp-fl-a" style="position:absolute;width:13px;height:28px;left:-18px;bottom:-4px;transform:rotate(-12deg);transform-origin:bottom center;"></div>
      <div class="pp-flame-wrap" id="pp-fl-b" style="position:absolute;width:16px;height:36px;left:-8px;bottom:0;"></div>
      <div class="pp-flame-wrap" id="pp-fl-c" style="position:absolute;width:14px;height:30px;left:4px;bottom:-6px;transform:rotate(10deg);transform-origin:bottom center;"></div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', FLAME_HTML);
  const fire = window._ppFire = document.getElementById('pp-fire');
  fire.style.color = PP_FLAME_BRAND;

  const style = document.createElement('style');
  style.textContent = `.pp-flame-wrap svg{position:absolute;bottom:0;left:0;width:100%;height:100%;opacity:0}.pp-flame-wrap svg.pp-active{opacity:1}`;
  document.head.appendChild(style);

  const ns = 'http://www.w3.org/2000/svg';
  const frames = [
    { vb:'0 0 54.4 128',   tag:'path',    d:'M31.7,15.1l-20.8,25.9,10.4,54.5-.9,27.6,15.5-26.9,1.7-22.9s-3.6-20.9-3.4-22,7.1-26.9,7.1-26.9l2-19.4-11.8,10.2Z' },
    { vb:'0 0 54.4 103.9', tag:'polygon', d:'42.2 5.5 52.8 36.3 46.8 55.6 37.4 71 26.5 79.7 19.6 102.3 2.7 74 3.9 57 12.3 30.1 15.3 46.6 14.6 65.8 29.6 52.6 35.7 40.2 37.8 18.7 42.2 5.5' },
    { vb:'0 0 54.4 103.9', tag:'path',    d:'M28.4,16.3l-8.9,20.3,7.6,17.8-3.1,10.4-7.6,12.3,3.5,24.7s6.4-18.8,7.2-20,7.7-15.9,7.7-15.9l4.7-13.1s-4-10.2-4.7-12.4,0-8.4,0-14.8.7-12.9.8-13.6-1-9.4-1-9.4l-6.2,13.8Z' },
    { vb:'0 0 54.4 103.9', tag:'path',    d:'M33.7,4.9c0,.6,9,61,9,61,0,0-35.1,32.9-34.7,31.2s14.6-62.7,14.6-62.7l11.1-29.4Z' },
    { vb:'0 0 54.4 103.9', tag:'polygon', d:'18 0 8 28 4 54 14 76 20 103.9 34 80 44 58 40 34 30 46 18 0' },
    { vb:'0 0 54.4 103.9', tag:'polygon', d:'36 0 48 30 50 58 38 80 28 103.9 16 78 6 52 10 28 24 44 36 0' },
    { vb:'0 0 54.4 128',   tag:'polygon', d:'27 0 38 22 42 52 36 80 30 128 22 82 16 54 18 24 27 0' },
    { vb:'0 0 54.4 103.9', tag:'polygon', d:'28 8 42 26 50 50 44 72 32 103.9 20 74 8 52 12 28 28 8' },
    { vb:'0 0 54.4 103.9', tag:'polygon', d:'38 2 50 30 48 60 36 82 26 103.9 14 80 10 56 16 32 26 50 38 2' },
    { vb:'0 0 54.4 128',   tag:'polygon', d:'24 0 14 24 10 56 18 82 26 128 36 84 44 60 40 30 30 48 24 0' },
  ];

  function buildFrames(wrap, startIdx) {
    const shuffled = [...frames];
    for (let i = 0; i < startIdx; i++) shuffled.push(shuffled.shift());
    shuffled.forEach(f => {
      const svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('viewBox', f.vb);
      const el = document.createElementNS(ns, f.tag);
      if (f.tag === 'path') el.setAttribute('d', f.d);
      else el.setAttribute('points', f.d);
      el.setAttribute('fill', 'currentColor');
      svg.appendChild(el);
      wrap.appendChild(svg);
    });
  }

  buildFrames(document.getElementById('pp-fl-a'), 0);
  buildFrames(document.getElementById('pp-fl-b'), 3);
  buildFrames(document.getElementById('pp-fl-c'), 7);

  function startFlicker(wrap, phaseOffset) {
    const svgs = Array.from(wrap.querySelectorAll('svg'));
    let cur = 0;
    svgs[cur].classList.add('pp-active');
    function next() {
      svgs[cur].classList.remove('pp-active');
      let n; do { n = Math.floor(Math.random() * svgs.length); } while (n === cur);
      cur = n;
      svgs[cur].classList.add('pp-active');
      const s = parseFloat(wrap.dataset.s || 1);
      setTimeout(next, Math.max(30, 80 - s * 10) + Math.random() * (80 / Math.max(s, 1)));
    }
    setTimeout(next, phaseOffset + Math.random() * 100);
  }

  startFlicker(document.getElementById('pp-fl-a'), 0);
  startFlicker(document.getElementById('pp-fl-b'), 50);
  startFlicker(document.getElementById('pp-fl-c'), 120);

  const sparkShapes = [
    { vb:'0 0 54.4 103.9', tag:'path',    d:'M33.7,4.9c0,.6,9,61,9,61,0,0-35.1,32.9-34.7,31.2s14.6-62.7,14.6-62.7l11.1-29.4Z' },
    { vb:'0 0 54.4 103.9', tag:'polygon', d:'18 0 8 28 4 54 14 76 20 103.9 34 80 44 58 40 34 30 46 18 0' },
    { vb:'0 0 54.4 103.9', tag:'polygon', d:'38 2 50 30 48 60 36 82 26 103.9 14 80 10 56 16 32 26 50 38 2' },
    { vb:'0 0 54.4 128',   tag:'polygon', d:'27 0 38 22 42 52 36 80 30 128 22 82 16 54 18 24 27 0' },
    { vb:'0 0 54.4 103.9', tag:'polygon', d:'28 8 42 26 50 50 44 72 32 103.9 20 74 8 52 12 28 28 8' },
  ];

  function spawnSpark(x, y, vx_, vy_) {
    const sh = sparkShapes[Math.floor(Math.random() * sparkShapes.length)];
    const size = 6 + Math.random() * 10;
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', sh.vb);
    svg.style.cssText = `position:fixed;pointer-events:none;z-index:99998;width:${size}px;height:${size*1.6}px;left:${x-size/2}px;top:${y-size}px;color:${ppFlameColorAt(x, y)};`;
    const el = document.createElementNS(ns, sh.tag);
    if (sh.tag === 'path') el.setAttribute('d', sh.d);
    else el.setAttribute('points', sh.d);
    el.setAttribute('fill', 'currentColor');
    svg.appendChild(el);
    document.body.appendChild(svg);
    const life = 380 + Math.random() * 300;
    const start = performance.now();
    let vx = vx_, vy = vy_;
    function tick(now) {
      const t = now - start;
      if (t > life) { svg.remove(); return; }
      vy += 0.12; vx *= 0.97;
      svg.style.left = (parseFloat(svg.style.left) + vx) + 'px';
      svg.style.top  = (parseFloat(svg.style.top)  + vy) + 'px';
      svg.style.transform = `rotate(${vx*8}deg)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const bases = { 'pp-fl-a':{w:13,h:28}, 'pp-fl-b':{w:16,h:36}, 'pp-fl-c':{w:14,h:30} };
  const MAX_SCALE=2.8, GROW_RATE=0.14, DECAY_RATE=0.06;
  let scale=1, holding=false, noiseT=0;
  let curX=window.innerWidth/2, curY=window.innerHeight/2;
  let posX=curX, posY=curY;
  let smoothVx=0, smoothVy=0;
  let prevCurX=curX, prevCurY=curY;
  let lean=0, leanV=0, pitch=0, pitchV=0;
  let prevT = performance.now();

  function spring(cur, vel, target, stiffness, damping, dt) {
    const f = stiffness * (target - cur) - damping * vel;
    vel += f * dt;
    cur += vel * dt;
    return { v: cur, vel };
  }

  let overNav = false;
  window._ppFireHidden = false;
  const nav = document.querySelector('.hero_nav');
  if (nav) {
    nav.addEventListener('mouseenter', () => { overNav = true;  fire.style.opacity = '0'; });
    nav.addEventListener('mouseleave', () => { overNav = false; if (!window._ppFireHidden) fire.style.opacity = '1'; });
  }

  document.addEventListener('mousemove', e => {
    curX = e.clientX; curY = e.clientY;
    if (!overNav && !window._ppFireHidden) fire.style.opacity = '1';
    fire.style.color = ppFlameColorAt(curX, curY);
  });

  let holdInterval = null;
  document.addEventListener('mousedown', () => {
    holding = true;
    const count = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const speed = 3 + Math.random() * 3;
        const bias = Math.max(-1, Math.min(1, smoothVx / 300));
        const spread = (Math.random() - 0.5) * (Math.PI / 2);
        const angle = -Math.PI / 2 + spread + bias * (Math.PI / 4);
        spawnSpark(posX, posY, Math.cos(angle)*speed, Math.sin(angle)*speed);
      }, i * 30);
    }
    holdInterval = setInterval(() => {
      if (!holding) return;
      const speed = 3 + Math.random() * 3;
      const bias = Math.max(-1, Math.min(1, smoothVx / 300));
      const spread = (Math.random() - 0.5) * (Math.PI / 2);
      const angle = -Math.PI / 2 + spread + bias * (Math.PI / 4);
      spawnSpark(posX, posY, Math.cos(angle)*speed, Math.sin(angle)*speed);
    }, 180 + Math.random() * 80);
  });
  document.addEventListener('mouseup', () => { holding = false; clearInterval(holdInterval); });

  function loop(now) {
    const dt = Math.min((now - prevT) / 1000, 0.05);
    prevT = now;

    if (holding) scale = Math.min(MAX_SCALE, scale + GROW_RATE + Math.random()*0.02);
    else         scale = Math.max(1, scale - DECAY_RATE);
    noiseT += 0.08;
    for (const [id, b] of Object.entries(bases)) {
      const el = document.getElementById(id);
      const wobble = holding ? Math.sin(noiseT + (id==='pp-fl-a'?0:id==='pp-fl-b'?2:4)) * 0.08 * (scale-1) : 0;
      const s = scale + wobble;
      el.style.width  = (b.w * s) + 'px';
      el.style.height = (b.h * s) + 'px';
      el.dataset.s = s;
    }

    const rawVx = (curX - prevCurX) / dt;
    const rawVy = (curY - prevCurY) / dt;
    prevCurX = curX; prevCurY = curY;
    smoothVx += (rawVx - smoothVx) * Math.min(1, dt * 12);
    smoothVy += (rawVy - smoothVy) * Math.min(1, dt * 12);

    posX = curX;
    posY = curY;

    const targetLean  = Math.max(-60, Math.min(60, -(smoothVx / 18)));
    const upward = smoothVy < 0;
    const pitchStrength = upward ? 0.035 : 0.055;
    const targetPitch = Math.max(-40, Math.min(40, -(smoothVy * pitchStrength)));

    const lx = spring(lean, leanV, targetLean, 55, 9, dt);
    lean = lx.v; leanV = lx.vel;
    const ly = spring(pitch, pitchV, targetPitch, 55, 9, dt);
    pitch = ly.v; pitchV = ly.vel;

    fire.style.left      = posX + 'px';
    fire.style.top       = posY + 'px';
    fire.style.transform = `rotate(${lean}deg) skewX(${lean*0.18}deg) skewY(${pitch*0.22}deg) scaleY(${1 - pitch*0.007})`;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();


// ─── Button fire — flames spawn above hovered buttons / nav links ──────────
(function initButtonFire() {
  if (PP_IS_TOUCH) return;
  if (window._ppButtonFireInited) return;
  window._ppButtonFireInited = true;

  const ns = 'http://www.w3.org/2000/svg';

  const FRAMES = [
    { vb:'0 0 54.4 128',   tag:'path',    d:'M31.7,15.1l-20.8,25.9,10.4,54.5-.9,27.6,15.5-26.9,1.7-22.9s-3.6-20.9-3.4-22,7.1-26.9,7.1-26.9l2-19.4-11.8,10.2Z' },
    { vb:'0 0 54.4 103.9', tag:'polygon', d:'18 0 8 28 4 54 14 76 20 103.9 34 80 44 58 40 34 30 46 18 0' },
    { vb:'0 0 54.4 103.9', tag:'polygon', d:'36 0 48 30 50 58 38 80 28 103.9 16 78 6 52 10 28 24 44 36 0' },
    { vb:'0 0 54.4 128',   tag:'polygon', d:'27 0 38 22 42 52 36 80 30 128 22 82 16 54 18 24 27 0' },
    { vb:'0 0 54.4 103.9', tag:'polygon', d:'28 8 42 26 50 50 44 72 32 103.9 20 74 8 52 12 28 28 8' },
    { vb:'0 0 54.4 103.9', tag:'polygon', d:'38 2 50 30 48 60 36 82 26 103.9 14 80 10 56 16 32 26 50 38 2' },
    { vb:'0 0 54.4 128',   tag:'polygon', d:'24 0 14 24 10 56 18 82 26 128 36 84 44 60 40 30 30 48 24 0' },
  ];

  function randomConfigs() {
    const r = () => Math.random();
    const patterns = [
      [0.05, 0.18, 0.82, 0.95],
      [0.05, 0.15, 0.28, 0.88],
      [0.12, 0.88, 0.78, 0.95],
      [0.08, 0.35, 0.60, 0.92],
      [0.05, 0.20, 0.42, 0.58],
      [0.40, 0.58, 0.80, 0.95],
      [0.05, 0.48, 0.52, 0.95],
      [0.10, 0.30, 0.55, 0.90],
    ];
    const base = patterns[Math.floor(r() * patterns.length)];
    const xPcts = base.map(x => x + (r() * 0.08 - 0.04)).sort(() => r() - 0.5);
    const heightMults = [1.4, 2.0, 2.8, 1.7].sort(() => r() - 0.5);
    return xPcts.map((xPct, i) => {
      const baseLean = (xPct - 0.5) * 40;
      const wobble   = (r() - 0.5) * 16;
      return {
        xPct,
        rot:        baseLean + wobble,
        size:       13 + r() * 9,
        heightMult: heightMults[i],
        yOff:       r() * 10 - 5,
        gap:        3 + r() * 5,
      };
    });
  }

  function buildFlame(cfg) {
    const h = cfg.size * (cfg.heightMult || 2.1);
    const wrap = document.createElement('div');
    wrap.style.cssText = `position:fixed;pointer-events:none;z-index:9998;transform-origin:bottom center;transform:rotate(${cfg.rot}deg);width:${cfg.size}px;height:${h}px;`;
    const svgs = FRAMES.map(f => {
      const svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('viewBox', f.vb);
      svg.style.cssText = `position:absolute;bottom:0;left:0;width:100%;height:100%;opacity:0;`;
      const el = document.createElementNS(ns, f.tag);
      if (f.tag === 'path') el.setAttribute('d', f.d);
      else el.setAttribute('points', f.d);
      el.setAttribute('fill', 'currentColor');
      svg.appendChild(el);
      wrap.appendChild(svg);
      return svg;
    });
    let cur = 0;
    svgs[0].style.opacity = '1';
    function next() {
      svgs[cur].style.opacity = '0';
      let n; do { n = Math.floor(Math.random() * svgs.length); } while (n === cur);
      cur = n;
      svgs[cur].style.opacity = '1';
      wrap._timer = setTimeout(next, 40 + Math.random() * 90);
    }
    wrap._timer = setTimeout(next, Math.random() * 120);
    return wrap;
  }

  function attachButtonFire(el) {
    let flames = null;

    el.addEventListener('mouseenter', () => {
      if (flames) return;
      window._ppFireHidden = true;
      if (window._ppFire) window._ppFire.style.opacity = '0';

      const rect = el.getBoundingClientRect();
      // Sample theme color at the button's center so all flames in a burst match.
      const flameColor = ppFlameColorAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
      const cfgs = randomConfigs(rect.width);
      flames = cfgs.map(cfg => {
        const wrap = buildFlame(cfg);
        wrap.style.color = flameColor;
        document.body.appendChild(wrap);
        const h = cfg.size * (cfg.heightMult || 2.1);
        const x = rect.left + rect.width * cfg.xPct - cfg.size * 0.5;
        const y = rect.top + cfg.yOff - h;
        wrap.style.left = x + 'px';
        wrap.style.top  = y + 'px';
        return wrap;
      });
    });

    el.addEventListener('mouseleave', () => {
      if (!flames) return;
      flames.forEach(w => { clearTimeout(w._timer); w.remove(); });
      flames = null;
      window._ppFireHidden = false;
      if (window._ppFire) window._ppFire.style.opacity = '1';
    });
  }

  function attachAll() {
    document.querySelectorAll('.button_main_element, .hero_nav_link, button.clickable_btn').forEach(el => {
      if (!el._btnFireAttached) {
        el._btnFireAttached = true;
        attachButtonFire(el);
      }
    });
  }

  attachAll();
  new MutationObserver(attachAll).observe(document.body, { childList: true, subtree: true });
})();


// ─── Inline animated flames — populate any .pp-inline-fire .pp-flame-wrap ──
// Used by home-page heading decorations AND by the big menu fire on every
// page. Each wrap independently cycles through the shared FRAMES set.
(function initInlineFlames() {
  if (window._ppInlineFlamesInited) return;
  window._ppInlineFlamesInited = true;

  const ns = 'http://www.w3.org/2000/svg';
  const FRAMES = [
    { vb:'0 0 54.4 128',   tag:'path',    d:'M31.7,15.1l-20.8,25.9,10.4,54.5-.9,27.6,15.5-26.9,1.7-22.9s-3.6-20.9-3.4-22,7.1-26.9,7.1-26.9l2-19.4-11.8,10.2Z' },
    { vb:'0 0 54.4 103.9', tag:'polygon', d:'18 0 8 28 4 54 14 76 20 103.9 34 80 44 58 40 34 30 46 18 0' },
    { vb:'0 0 54.4 103.9', tag:'polygon', d:'36 0 48 30 50 58 38 80 28 103.9 16 78 6 52 10 28 24 44 36 0' },
    { vb:'0 0 54.4 128',   tag:'polygon', d:'27 0 38 22 42 52 36 80 30 128 22 82 16 54 18 24 27 0' },
    { vb:'0 0 54.4 103.9', tag:'polygon', d:'28 8 42 26 50 50 44 72 32 103.9 20 74 8 52 12 28 28 8' },
    { vb:'0 0 54.4 103.9', tag:'polygon', d:'38 2 50 30 48 60 36 82 26 103.9 14 80 10 56 16 32 26 50 38 2' },
    { vb:'0 0 54.4 128',   tag:'polygon', d:'24 0 14 24 10 56 18 82 26 128 36 84 44 60 40 30 30 48 24 0' },
  ];

  document.querySelectorAll('.pp-inline-fire .pp-flame-wrap').forEach((wrap, i) => {
    if (wrap._inlineFlameInited) return;
    wrap._inlineFlameInited = true;
    const svgs = FRAMES.map(f => {
      const svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('viewBox', f.vb);
      const el = document.createElementNS(ns, f.tag);
      if (f.tag === 'path') el.setAttribute('d', f.d);
      else el.setAttribute('points', f.d);
      // Use currentColor so the flame inherits the wrap's CSS color, which lets
      // theme rules (e.g. .u-theme-brand .pp-inline-fire) switch it to cream.
      el.setAttribute('fill', 'currentColor');
      svg.appendChild(el);
      wrap.appendChild(svg);
      return svg;
    });
    let cur = 0;
    svgs[0].classList.add('pp-active');
    function next() {
      svgs[cur].classList.remove('pp-active');
      let n; do { n = Math.floor(Math.random() * svgs.length); } while (n === cur);
      cur = n;
      svgs[cur].classList.add('pp-active');
      setTimeout(next, 90 + Math.random() * 140);
    }
    setTimeout(next, i * 80 + Math.random() * 150);
  });
})();


// ─── Floating CTAs: dock to subfooter + lift above cookie banner ───────────
// • While the subfooter is visible and the cookie banner is hidden, the CTAs
//   dock vertically centered into the subfooter strip on the right.
// • While the cookie banner is visible, docking is suppressed and the CTAs
//   sit just above the banner (via the --pp-cookie-offset CSS variable).
(function initFloatingCtaDock() {
  if (window._ppFloatingDockInited) return;
  window._ppFloatingDockInited = true;

  function init() {
    const ctas = document.querySelector('.floating-ctas');
    if (!ctas) return;
    const subfooter = document.querySelector('.footer_bottom_wrap');
    const cookieBanner = document.getElementById('cookie-banner');

    let subfooterVisible = false;
    let cookieOffset = 0;
    let rafId = 0;

    function measureCookie() {
      if (!cookieBanner) { cookieOffset = 0; return; }
      const cs = getComputedStyle(cookieBanner);
      const visible = cs.display !== 'none' && cs.visibility !== 'hidden' && cookieBanner.offsetHeight > 0;
      cookieOffset = visible ? cookieBanner.offsetHeight + 12 /* breathing room */ : 0;
      ctas.style.setProperty('--pp-cookie-offset', cookieOffset + 'px');
    }

    function placeDocked() {
      const rect = subfooter.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      // .button_main_wrap has `transform: translateY(-10px)` (the shadow
      // compensation utility in site.css), so the painted buttons sit 10px
      // above the floating-ctas layout box. Shift the docked layout DOWN by
      // 10px so the painted buttons land in the subfooter's visual center.
      const SHADOW_OFFSET = 10;
      ctas.style.top = (center - ctas.offsetHeight / 2 + SHADOW_OFFSET) + 'px';
    }

    function apply() {
      rafId = 0;
      const wantDocked = subfooterVisible && !!subfooter && cookieOffset === 0;
      ctas.classList.toggle('is-at-footer', wantDocked);
      if (wantDocked) placeDocked();
      else ctas.style.top = '';
    }
    function schedule() {
      if (rafId) return;
      rafId = requestAnimationFrame(apply);
    }

    if (subfooter && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { subfooterVisible = e.isIntersecting; });
        apply();
      }, { threshold: 0 });
      io.observe(subfooter);
    }

    if (cookieBanner) {
      measureCookie();
      const onChange = () => { measureCookie(); apply(); };
      new MutationObserver(onChange).observe(cookieBanner, { attributes: true, attributeFilter: ['style', 'class'] });
      if ('ResizeObserver' in window) new ResizeObserver(onChange).observe(cookieBanner);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', () => { measureCookie(); schedule(); });

    apply();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


// ─── Mobile: collapse the floating RESERVA/PIDE YA bar to one FAB ───────────
// On phones the two pills are bulky. Collapse them to a single round flame
// button (FAB) by default; expand to the full pair when the user scrolls UP
// (or taps the FAB). Scrolling down collapses again. Desktop is untouched.
(function initFloatingCtaCollapse() {
  if (window._ppCtaCollapseInited) return;
  window._ppCtaCollapseInited = true;

  function init() {
    const ctas = document.querySelector('.floating-ctas');
    if (!ctas) return;

    const mobileMq = window.matchMedia('(max-width: 767px)');

    // Build the collapsed FAB once. A flame glyph keeps it on-brand; tapping
    // it expands the pair so it stays reachable without scrolling.
    const fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'floating-ctas-fab';
    fab.setAttribute('aria-label', 'Reservar o pedir');
    fab.innerHTML =
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M13.4 1.5c.3 2.6-.8 4.4-2.3 5.9C9.2 9.1 7 10.9 7 14.2 7 18 9.9 21 13 21c3.4 0 6-2.6 6-6.2 0-2.2-1-4-2.4-5.6.1 1.2-.4 2.2-1.3 2.8.6-2 0-4.2-1.9-7.5z"/>' +
      '<path d="M11 14.5c0-1.4.9-2.4 1.6-3 0 .9.4 1.4 1 1.9.7.5 1.4 1.2 1.4 2.3 0 1.5-1.2 2.6-2.6 2.6S9.9 17.2 9.9 15.8c0-.6.2-1.1.5-1.6.1.5.3.9.6 1.2-.1-.3 0-.6 0-.9z"/>' +
      '</svg>';
    fab.addEventListener('click', function () { setCollapsed(false); });
    ctas.appendChild(fab);

    let collapsed = true;
    let lastY = window.scrollY || window.pageYOffset || 0;
    let rafId = 0;

    function setCollapsed(next) {
      collapsed = next;
      ctas.classList.toggle('is-collapsed', collapsed && mobileMq.matches);
    }

    function onScrollFrame() {
      rafId = 0;
      const y = window.scrollY || window.pageYOffset || 0;
      const delta = y - lastY;
      // ignore tiny jitter / rubber-banding
      if (Math.abs(delta) > 6) {
        if (delta < 0) setCollapsed(false);   // scrolling up → expand
        else setCollapsed(true);              // scrolling down → collapse
      }
      lastY = y;
    }
    function onScroll() {
      if (!mobileMq.matches) return;
      if (!rafId) rafId = requestAnimationFrame(onScrollFrame);
    }

    function applyMode() {
      if (mobileMq.matches) {
        setCollapsed(collapsed);              // honor current state on mobile
      } else {
        ctas.classList.remove('is-collapsed'); // desktop: always full pair
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    (mobileMq.addEventListener
      ? mobileMq.addEventListener('change', applyMode)
      : mobileMq.addListener(applyMode));

    applyMode();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


// ─── Sticky nav: keep the EXISTING logo + MENÚ exactly where they are, just
// simplify them on mobile scroll ────────────────────────────────────────────
// No DOM moves, no repositioning — the on-load placement is untouched. The
// z-index trapping (logo/menu live in the hero's z-index:1 context) is fixed in
// CSS by lifting the hero. On mobile, scrolling DOWN hides the logo and reduces
// the MENÚ button to just its icon; scrolling UP restores both.
(function initStickyNav() {
  if (window._ppStickyNavInited) return;
  window._ppStickyNavInited = true;

  // Cream wordmark on dark/brand sections, dark on light ones, so the (no
  // background) logo stays legible while it floats over different sections.
  function themeColorFor(node) {
    while (node && node !== document.documentElement) {
      if (node.classList) {
        if (node.classList.contains('u-theme-light')) return 'var(--swatch--dark-900)';
        if (node.classList.contains('u-theme-dark')
          || node.classList.contains('u-theme-brand')
          || node.classList.contains('u-theme-brand-2')) return 'var(--swatch--light-200)';
      }
      node = node.parentElement;
    }
    return '';
  }

  function init() {
    const menuBtn = document.querySelector('[data-modal-trigger="menu"]');
    const logo = document.querySelector('.hero_nav .hero_logo_wrap');
    if (!menuBtn && !logo) return;

    const mq = window.matchMedia('(max-width: 767px)');
    let lastY = window.scrollY || 0, raf = 0;

    function updateLogoColor() {
      if (!logo) return;
      const r = logo.getBoundingClientRect();
      // Only adapt while the logo is the persistent (fixed) one — on desktop it
      // scrolls away inside the hero and keeps its theme colour.
      if (r.width === 0 || getComputedStyle(logo).position !== 'fixed') return;
      const els = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      const behind = els.find(e => e !== logo && !logo.contains(e));
      const c = themeColorFor(behind);
      if (c) logo.style.color = c;
    }
    function setCollapsed(on) {
      const c = !!on && mq.matches;
      if (menuBtn) menuBtn.classList.toggle('is-nav-collapsed', c);
      if (logo) logo.classList.toggle('is-nav-hidden', c);
    }
    function frame() {
      raf = 0;
      const y = window.scrollY || 0, d = y - lastY;
      if (mq.matches && Math.abs(d) > 6) setCollapsed(d > 0 && y > 50);
      lastY = y;
      updateLogoColor();
    }
    window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(frame); }, { passive: true });
    if (mq.addEventListener) mq.addEventListener('change', () => { if (!mq.matches) setCollapsed(false); updateLogoColor(); });

    updateLogoColor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
