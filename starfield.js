/* 🌵 PIR® starfield + comet dust: one copy for the GitHub hub, its 404, and the AstroLog (which loads
   this file by full URL). Stars drift away from the pointer and dust trails behind it.
   Expects <canvas id="starfield-canvas">.

   Follows the arrival kit's choices on <html>:
     data-theme   "light" recolors the stars for Daybreak
     data-motion  "still": one quiet frame, nothing moves · "gentle" (Drift): twinkle, repel, dust ·
                  "vivid" (Shooting stars): brighter, faster twinkle and the odd meteor
     data-cursor  "off": the stars ignore the pointer and no dust is shed
   Without the kit (no attributes), it falls back to the OS reduced-motion setting. */
(function () {
  var c = document.getElementById('starfield-canvas'); if (!c) return;
  var x = c.getContext('2d'); if (!x) return;
  var root = document.documentElement;
  var osReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var star, spark, meteorInk, stars = [], sparks = [], meteors = [];
  var m = { x: -9999, y: -9999 }, last = { x: -9999, y: -9999 }, W = 0, H = 0, raf = 0, nextMeteor = 0;

  var motion = function () { return root.dataset.motion || (osReduced ? 'still' : 'gentle'); };
  var cursorOn = function () { var v = root.dataset.cursor; return (v ? v === 'on' : !osReduced) && motion() !== 'still'; };

  var init = function () {
    W = c.width = innerWidth; H = c.height = innerHeight; stars = [];
    for (var i = 0, n = Math.min(140, Math.floor(W * H / 9000)); i < n; i++) {
      var bx = Math.random() * W, by = Math.random() * H;
      stars.push({ bx: bx, by: by, x: bx, y: by, r: Math.random() * 1.4 + .4, b: Math.random() < .22, p: Math.random() * 6.28, s: .4 + Math.random() * .6 });
    }
  };

  var spike = function (s, a) {
    x.strokeStyle = star; x.globalAlpha = a; x.lineWidth = .6; x.beginPath();
    x.moveTo(s.x - s.r * 2.6, s.y); x.lineTo(s.x + s.r * 2.6, s.y); x.moveTo(s.x, s.y - s.r * 2.6); x.lineTo(s.x, s.y + s.r * 2.6); x.stroke();
  };

  var draw = function (t) {
    var mo = motion(), still = mo === 'still', vivid = mo === 'vivid', repel = cursorOn();
    x.clearRect(0, 0, W, H);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i], tx = s.bx, ty = s.by;
      if (repel) {
        var dx = s.bx - m.x, dy = s.by - m.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 90) { var f = 1 - d / 90, a = Math.atan2(dy, dx); tx += Math.cos(a) * f * f * 26; ty += Math.sin(a) * f * f * 26; }
      }
      if (still) { s.x = tx; s.y = ty; } else { s.x += (tx - s.x) * .18; s.y += (ty - s.y) * .18; }
      var tw = still ? .7 : .5 + .5 * Math.sin(t * .001 * s.s * (vivid ? 1.8 : 1) + s.p);
      var lift = vivid ? 1.15 : 1;
      x.globalAlpha = Math.min(1, (s.b ? .55 + tw * .45 : .22 + tw * .3) * lift); x.fillStyle = star;
      x.beginPath(); x.arc(s.x, s.y, s.r * (vivid && s.b ? 1.15 : 1), 0, 6.283); x.fill();
      if (s.b) spike(s, still ? .45 : .55);
    }
    // Comet dust behind the pointer.
    for (var k = sparks.length - 1; k >= 0; k--) {
      var p = sparks[k]; p.x += p.vx; p.y += p.vy; p.vx *= .92; p.vy = p.vy * .92 + .01; p.l -= .022;
      if (p.l <= 0) { sparks.splice(k, 1); continue; }
      x.globalAlpha = p.l; x.fillStyle = spark; x.beginPath(); x.arc(p.x, p.y, p.z, 0, 6.283); x.fill();
    }
    // Shooting stars, on the vivid level only.
    if (vivid && t > nextMeteor) {
      if (nextMeteor) {
        var ang = (Math.PI / 5) + Math.random() * (Math.PI / 8), sp = 9 + Math.random() * 6;
        meteors.push({ x: Math.random() * W * .8, y: Math.random() * H * .35, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, l: 1 });
      }
      nextMeteor = t + 2600 + Math.random() * 4200;
    }
    for (var j = meteors.length - 1; j >= 0; j--) {
      var e = meteors[j]; e.x += e.vx; e.y += e.vy; e.l -= .02;
      if (e.l <= 0 || e.x > W + 60 || e.y > H + 60) { meteors.splice(j, 1); continue; }
      var g = x.createLinearGradient(e.x, e.y, e.x - e.vx * 9, e.y - e.vy * 9);
      g.addColorStop(0, meteorInk); g.addColorStop(1, 'rgba(0,0,0,0)');
      x.globalAlpha = e.l; x.strokeStyle = g; x.lineWidth = 1.6; x.lineCap = 'round';
      x.beginPath(); x.moveTo(e.x, e.y); x.lineTo(e.x - e.vx * 9, e.y - e.vy * 9); x.stroke();
    }
    x.globalAlpha = 1;
  };

  var loop = function (t) {
    raf = 0;
    draw(t || 0);
    if (motion() !== 'still' && !document.hidden) raf = requestAnimationFrame(loop);
  };
  var schedule = function () {
    if (motion() === 'still') {
      if (raf) cancelAnimationFrame(raf);
      raf = 0; sparks = []; meteors = []; draw(0);
    } else if (!raf) raf = requestAnimationFrame(loop);
  };
  var sync = function () {
    var light = root.dataset.theme === 'light';
    star = light ? '#6b3fd1' : '#f1edfb'; spark = light ? '#0f7fa8' : '#f3c76b'; meteorInk = light ? '#6b3fd1' : '#ffffff';
    if (!cursorOn()) { m.x = m.y = -9999; last.x = last.y = -9999; }
    schedule();
  };

  init(); sync();
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-motion', 'data-cursor'] });
  addEventListener('resize', function () { init(); if (motion() === 'still') draw(0); });
  addEventListener('mousemove', function (e) {
    if (!cursorOn()) return;
    m.x = e.clientX; m.y = e.clientY;
    if (last.x > -9000) for (var i = 0; i < 2; i++) {
      if (sparks.length > 80) sparks.shift();
      var j = (Math.random() - .5) * .6;
      sparks.push({ x: m.x, y: m.y, vx: (m.x - last.x) * .12 + j, vy: (m.y - last.y) * .12 + j, l: 1, z: 1 + Math.random() * 1.6 });
    }
    last.x = m.x; last.y = m.y;
  });
  document.addEventListener('mouseleave', function () { m.x = m.y = -9999; last.x = last.y = -9999; });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) schedule(); });
})();
