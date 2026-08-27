/**
 * CUTE CANVAS CONFETTI & SPARKLING AMBIENT ENGINE
 * Floating cute stars, sparkles, and hearts overlay.
 * Palette: Dusty Rose (#d98c9a), Soft Lavender (#b9aedc), Muted Peach (#e9b9a7), Warm Gold (#c9a86a)
 */

const FXEngine = (function () {
  let canvas, ctx;
  let particles = [];
  let animId = null;
  let bgParticles = [];

  function init() {
    canvas = document.getElementById('fx-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'fx-canvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '99999';
      document.body.appendChild(canvas);
    }
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    initBgParticles();
    loop();
  }

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth * window.devicePixelRatio || 1;
    canvas.height = window.innerHeight * window.devicePixelRatio || 1;
    if (ctx) ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  function initBgParticles() {
    bgParticles = [];
    const count = 30;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const types = ['star', 'heart', 'sparkle', 'dot'];

    for (let i = 0; i < count; i++) {
      bgParticles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 5 + 3,
        speedY: (Math.random() * 0.35 + 0.1) * -1,
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        type: types[Math.floor(Math.random() * types.length)],
        color: ['#b9aedc', '#e9b9a7', '#d98c9a', '#c9a86a'][Math.floor(Math.random() * 4)]
      });
    }
  }

  function loop() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    ctx.clearRect(0, 0, w, h);

    // Draw ambient floating cute particles (stars, hearts, sparkles)
    bgParticles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.003;

      if (p.y < -20) p.y = h + 20;
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;

      ctx.save();
      ctx.globalAlpha = Math.max(0.1, Math.min(0.75, p.opacity));
      ctx.fillStyle = p.color;

      if (p.type === 'heart') {
        drawHeart(ctx, p.x, p.y, p.size);
      } else if (p.type === 'star') {
        drawStar(ctx, p.x, p.y, 5, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    // Draw explosion confetti
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vRot;
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.life);

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'star') {
        drawStar(ctx, 0, 0, 5, p.size, p.size / 2);
      } else if (p.shape === 'heart') {
        drawHeart(ctx, 0, 0, p.size);
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      ctx.restore();
    }

    animId = requestAnimationFrame(loop);
  }

  function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  function drawHeart(ctx, x, y, size) {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size);
    ctx.bezierCurveTo(x, y + size, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
  }

  return {
    init: init,
    setWorld: function () {},
    fireConfetti: function (opts = {}) {
      const count = opts.count || 70;
      const originX = opts.x !== undefined ? opts.x : window.innerWidth / 2;
      const originY = opts.y !== undefined ? opts.y : window.innerHeight / 2;

      const colors = ['#d98c9a', '#b9aedc', '#c9a86a', '#e9b9a7', '#f4a5b7', '#f5e6b3'];
      const shapes = ['rect', 'circle', 'star', 'heart'];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 10 + 3.5;
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (opts.upward ? 4.5 : 2),
          gravity: 0.22,
          size: Math.random() * 9 + 5,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          life: 1.0,
          decay: Math.random() * 0.015 + 0.01
        });
      }
    }
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  FXEngine.init();
});
