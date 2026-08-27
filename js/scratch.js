/**
 * SCRATCH-TO-REVEAL MEMORY CARDS (SCRAPBOOK ADAPTIVE FRAME)
 * HTML5 Canvas touch & mouse drag scratch effect.
 * Preserves original photo aspect ratio & 100% full face composition.
 */

const ScratchEngine = (function () {
  function initCard(containerEl, memoryData, onRevealed) {
    const canvas = containerEl.querySelector('.scratch-canvas');
    const imgEl = containerEl.querySelector('.memory-photo');
    const innerEl = containerEl.querySelector('.scratch-card-inner') || containerEl;
    if (!canvas || !imgEl) return;

    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let isRevealed = false;

    // Canvas positioning overlay
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '10';

    function resizeCanvas() {
      if (isRevealed) return;
      const w = innerEl.clientWidth || innerEl.offsetWidth || 300;
      const h = innerEl.clientHeight || innerEl.offsetHeight || 280;
      
      canvas.width = w;
      canvas.height = h;
      drawOverlay();
    }

    function drawOverlay() {
      if (isRevealed) return;
      ctx.globalCompositeOperation = 'source-over';
      
      const w = canvas.width || 300;
      const h = canvas.height || 280;

      // Warm festive cream, rose & gold scratch surface gradient
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#fdf4e7');
      grad.addColorStop(0.5, '#f5dbdc');
      grad.addColorStop(1, '#ebd3c2');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Gold pattern overlay lines
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 2;
      for (let i = -h; i < w; i += 22) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + h, h);
        ctx.stroke();
      }

      // Scrapbook cover badge text
      ctx.fillStyle = '#5a2d3c';
      ctx.font = 'bold 15px "Fredoka", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🔒 SECRET MEMORY', w / 2, h / 2 - 12);
      
      ctx.fillStyle = '#d96b82';
      ctx.font = 'bold 13px "Fredoka", sans-serif';
      ctx.fillText('SCRATCH HERE 👀', w / 2, h / 2 + 14);
    }

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      let clientX = e.clientX;
      let clientY = e.clientY;

      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function scratch(e) {
      if (!isDrawing || isRevealed) return;
      e.preventDefault();
      const pos = getPos(e);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 30, 0, Math.PI * 2);
      ctx.fill();

      checkScratchedPercent();
    }

    function checkScratchedPercent() {
      if (isRevealed) return;
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;

        for (let i = 3; i < pixels.length; i += 4) {
          if (pixels[i] === 0) {
            transparentPixels++;
          }
        }

        const scratchedPercent = (transparentPixels / (pixels.length / 4)) * 100;
        if (scratchedPercent > 35) {
          isRevealed = true;
          // Fade out cover smoothly to reveal complete original photo
          canvas.style.transition = 'opacity 0.6s ease';
          canvas.style.opacity = '0';
          setTimeout(() => {
            canvas.style.display = 'none';
          }, 600);

          if (typeof onRevealed === 'function') {
            onRevealed(memoryData);
          }
        }
      } catch (err) {
        // Security fallback
      }
    }

    // Mouse events
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      scratch(e);
    });
    window.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', () => { isDrawing = false; });

    // Touch events
    canvas.addEventListener('touchstart', (e) => {
      isDrawing = true;
      scratch(e);
    }, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    window.addEventListener('touchend', () => { isDrawing = false; });

    // Sizing triggers
    resizeCanvas();
    requestAnimationFrame(resizeCanvas);
    setTimeout(resizeCanvas, 150);
    setTimeout(resizeCanvas, 400);
    window.addEventListener('resize', resizeCanvas);
  }

  return {
    initCard: initCard
  };
})();
