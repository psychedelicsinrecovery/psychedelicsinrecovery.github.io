/* 🌵 PIR® starfield + comet dust for the GitHub hub and its 404 (same mechanic as the AstroLog's
   Starfield component): stars drift away from the pointer, dust trails behind it. Theme-aware,
   and still (no motion) under prefers-reduced-motion. Expects <canvas id="starfield-canvas">. */
(function () {
  var c = document.getElementById('starfield-canvas'); if (!c) return;
  var x = c.getContext('2d'), reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var star, spark, stars = [], sparks = [], m = { x: -9999, y: -9999 }, last = { x: -9999, y: -9999 }, W, H;
  var sync = function () {
    var light = document.documentElement.dataset.theme === 'light';
    star = light ? '#6b3fd1' : '#f1edfb'; spark = light ? '#0f7fa8' : '#f3c76b';
    if (reduced) draw(0);
  };
  var init = function () {
    W = c.width = innerWidth; H = c.height = innerHeight; stars = [];
    for (var i = 0, n = Math.min(140, Math.floor(W * H / 9000)); i < n; i++) {
      var bx = Math.random() * W, by = Math.random() * H;
      stars.push({ bx: bx, by: by, x: bx, y: by, r: Math.random() * 1.4 + .4, b: Math.random() < .22, p: Math.random() * 6.28, s: .4 + Math.random() * .6 });
    }
    if (reduced) draw(0);
  };
  var draw = function (t) {
    x.clearRect(0, 0, W, H);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i], dx = s.bx - m.x, dy = s.by - m.y, d = Math.sqrt(dx * dx + dy * dy), tx = s.bx, ty = s.by;
      if (d < 90 && !reduced) { var f = 1 - d / 90, a = Math.atan2(dy, dx); tx += Math.cos(a) * f * f * 26; ty += Math.sin(a) * f * f * 26; }
      s.x += (tx - s.x) * .18; s.y += (ty - s.y) * .18;
      var tw = reduced ? .7 : .5 + .5 * Math.sin(t * .001 * s.s + s.p);
      x.globalAlpha = s.b ? .55 + tw * .45 : .22 + tw * .3; x.fillStyle = star;
      x.beginPath(); x.arc(s.x, s.y, s.r, 0, 6.283); x.fill();
      if (s.b) {
        x.strokeStyle = star; x.globalAlpha = .55; x.lineWidth = .6; x.beginPath();
        x.moveTo(s.x - s.r * 2.6, s.y); x.lineTo(s.x + s.r * 2.6, s.y); x.moveTo(s.x, s.y - s.r * 2.6); x.lineTo(s.x, s.y + s.r * 2.6); x.stroke();
      }
    }
    for (var k = sparks.length - 1; k >= 0; k--) {
      var p = sparks[k]; p.x += p.vx; p.y += p.vy; p.vx *= .92; p.vy = p.vy * .92 + .01; p.l -= .022;
      if (p.l <= 0) { sparks.splice(k, 1); continue; }
      x.globalAlpha = p.l; x.fillStyle = spark; x.beginPath(); x.arc(p.x, p.y, p.z, 0, 6.283); x.fill();
    }
    x.globalAlpha = 1;
  };
  var loop = function (t) { draw(t); if (!document.hidden) requestAnimationFrame(loop); };
  sync(); init();
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  addEventListener('resize', init);
  if (reduced) return;
  addEventListener('mousemove', function (e) {
    m.x = e.clientX; m.y = e.clientY;
    if (last.x > -9000) for (var i = 0; i < 2; i++) {
      if (sparks.length > 80) sparks.shift();
      var j = (Math.random() - .5) * .6;
      sparks.push({ x: m.x, y: m.y, vx: (m.x - last.x) * .12 + j, vy: (m.y - last.y) * .12 + j, l: 1, z: 1 + Math.random() * 1.6 });
    }
    last.x = m.x; last.y = m.y;
  });
  addEventListener('mouseleave', function () { m.x = m.y = -9999; });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) requestAnimationFrame(loop); });
  requestAnimationFrame(loop);
})();
