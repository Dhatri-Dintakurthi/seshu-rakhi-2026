/**
 * MAIN RAKHI SURPRISE APP LOGIC
 * Manages screen transitions, quiz engine, minigames, audio cues, and world morphs.
 */

const App = (function () {
  let currentScreenIndex = 0;
  const screens = [
    'screen-opening',
    'screen-quiz',
    'screen-quiz-result',
    'screen-stats',
    'screen-who-does-this',
    'screen-evidence',
    'screen-hidden-rakhi',
    'screen-do-not-click',
    'screen-scratch-memories',
    'screen-classified-unlock',
    'screen-letter',
    'screen-rakhi-moment',
    'screen-mission-complete',
    'screen-finale'
  ];

  // Quiz state
  let currentQuizIndex = 0;
  let quizScore = 0;
  
  // Who does this state
  let currentWhoIndex = 0;

  // Do not click count
  let doNotClickCount = 0;

  // Scratch memory reveal count
  let scratchRevealedCount = 0;

  // Hidden Rakhi found state
  let isRakhiFound = false;

  // Audio mute state
  let isMuted = false;

  function init() {
    setupNavigation();
    setupAudioToggle();
    setupOpeningScreen();
    setupQuiz();
    setupWhoDoesThis();
    setupEvidenceGallery();
    setupHiddenRakhi();
    setupDoNotClick();
    setupClassifiedUnlock();
    setupRakhiMoment();

    // Check for saved screen index in sessionStorage on page refresh
    let startScreenIndex = 0;
    try {
      const saved = sessionStorage.getItem('agent_seshu_saved_screen');
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < screens.length) {
          startScreenIndex = parsed;
        }
      }
    } catch (err) {}

    screens.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (el) {
        if (idx === startScreenIndex) {
          el.classList.remove('exit');
          el.classList.add('active');
        } else {
          el.classList.remove('active', 'exit');
        }
      }
    });

    currentScreenIndex = startScreenIndex;
    updateProgressUI();

    if (startScreenIndex > 0) {
      goToScreen(startScreenIndex, true);
    }
  }

  function goToScreen(index, isInitial = false) {
    if (index < 0 || index >= screens.length) return;
    
    try {
      if (index === 0) {
        sessionStorage.removeItem('agent_seshu_saved_screen');
      } else {
        sessionStorage.setItem('agent_seshu_saved_screen', index);
      }
    } catch (err) {}

    const prevScreenId = screens[currentScreenIndex];
    const newScreenId = screens[index];
    const prevEl = document.getElementById(prevScreenId);
    const newEl = document.getElementById(newScreenId);

    if (!newEl) return;

    if (prevEl && prevEl !== newEl && !isInitial) {
      prevEl.classList.remove('active');
      prevEl.classList.add('exit');
      setTimeout(() => {
        prevEl.classList.remove('exit');
      }, 500);
    }

    screens.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (el) {
        if (idx === index) {
          el.classList.remove('exit');
          el.classList.add('active');
        } else {
          el.classList.remove('active', 'exit');
        }
      }
    });

    currentScreenIndex = index;

    // Play click / transition sound unless initial load
    if (!isInitial) {
      SoundEngine.playClick();
    }

    // Dynamic evolving theme phase switcher (Phase 1 to Phase 6)
    document.body.className = '';
    if (index <= 1) {
      document.body.classList.add('phase-1');
    } else if (index <= 3) {
      document.body.classList.add('phase-2');
    } else if (index <= 5) {
      document.body.classList.add('phase-3');
    } else if (index <= 8) {
      document.body.classList.add('phase-4');
    } else if (index <= 10) {
      document.body.classList.add('phase-5');
    } else {
      document.body.classList.add('phase-6');
    }

    updateProgressUI();

    // Screen specific triggers
    if (newScreenId === 'screen-stats') {
      animateStats();
    } else if (newScreenId === 'screen-scratch-memories') {
      setTimeout(initScratchCards, 200);
    } else if (newScreenId === 'screen-mission-complete') {
      animateMissionComplete();
    } else if (newScreenId === 'screen-finale') {
      triggerGrandFinale();
    }
  }

  function updateProgressUI() {
    const progressText = document.getElementById('mission-progress-text');
    const progressBar = document.getElementById('mission-progress-fill');
    
    // Calculate display step (1 to 13)
    const stepNum = currentScreenIndex === 0 ? 1 : Math.min(currentScreenIndex, 13);
    const totalSteps = 13;
    const percent = (stepNum / totalSteps) * 100;

    if (progressText) {
      progressText.textContent = `MISSION ${String(stepNum).padStart(2, '0')} / ${totalSteps}`;
    }
    if (progressBar) {
      progressBar.style.width = `${percent}%`;
    }

    // Toggle header visibility (hide on opening screen if desired, or keep sticky)
    const headerEl = document.getElementById('app-header');
    if (headerEl) {
      if (currentScreenIndex === 0 || currentScreenIndex === screens.length - 1) {
        headerEl.classList.add('header-minimal');
      } else {
        headerEl.classList.remove('header-minimal');
      }
    }
  }

  function setupNavigation() {
    // Universal button navigation bindings
    document.querySelectorAll('[data-next-screen]').forEach(btn => {
      btn.addEventListener('click', () => {
        goToScreen(currentScreenIndex + 1);
      });
    });

    document.querySelectorAll('[data-prev-screen]').forEach(btn => {
      btn.addEventListener('click', () => {
        goToScreen(currentScreenIndex - 1);
      });
    });
  }

  function setupAudioToggle() {
    const muteBtn = document.getElementById('btn-mute-toggle');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const muted = SoundEngine.toggleMute();
        muteBtn.textContent = muted ? '🔇' : '🔊';
        muteBtn.setAttribute('title', muted ? 'Unmute Audio' : 'Mute Audio');
      });
    }
  }

  // SCREEN 0: Opening Screen
  function setupOpeningScreen() {
    const acceptBtn = document.getElementById('btn-accept-mission');
    if (acceptBtn) {
      const handleAccept = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        try {
          SoundEngine.playUnlock();
        } catch (err) {}
        try {
          FXEngine.fireConfetti({ count: 30, upward: true });
        } catch (err) {}
        goToScreen(1);
      };

      acceptBtn.addEventListener('click', handleAccept);
      acceptBtn.addEventListener('touchend', (e) => {
        handleAccept(e);
      });
    }
  }

  // SCREEN 1 & 2: Brother Verification Quiz Engine
  function setupQuiz() {
    renderQuizQuestion(0);
  }

  function renderQuizQuestion(index) {
    const questions = RAKHI_CONFIG.brotherQuiz;
    if (index < 0 || index >= questions.length) {
      finishQuiz();
      return;
    }

    currentQuizIndex = index;
    const qData = questions[index];

    const numEl = document.getElementById('quiz-question-num');
    const badgeEl = document.getElementById('quiz-question-badge');
    const textEl = document.getElementById('quiz-question-text');
    const noteEl = document.getElementById('quiz-question-note');
    const optionsEl = document.getElementById('quiz-options-container');
    const feedbackEl = document.getElementById('quiz-feedback-box');
    const dotsRow = document.getElementById('quiz-dots-row');

    if (numEl) numEl.textContent = `BROTHER CHECK ${String(index + 1).padStart(2, '0')} / ${String(questions.length).padStart(2, '0')}`;
    if (badgeEl) badgeEl.textContent = `✍️ QUESTION #${String(index + 1).padStart(2, '0')}`;
    if (textEl) textEl.textContent = qData.question;

    const notes = [
      "Don't think too hard... you know the truth! 💸",
      "Sensors don't lie, brother 👀",
      "Over food or remote control? Be honest! 🍕",
      "2 AM fridge raid victim confirmed 🍔",
      "Patience level: 0.5 seconds flat! ⚡",
      "Your cake theft record is on file 🍰",
      "Choose carefully... your title is on the line 👑"
    ];
    if (noteEl) noteEl.textContent = `"${notes[index % notes.length]}"`;

    // Render 7 physical sticker dots
    if (dotsRow) {
      dotsRow.innerHTML = '';
      for (let i = 0; i < questions.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'quiz-dot' + (i === index ? ' active' : (i < index ? ' completed' : ''));
        dotsRow.appendChild(dot);
      }
    }

    if (feedbackEl) {
      feedbackEl.className = 'quiz-feedback-box hidden';
      const fContent = document.getElementById('quiz-feedback-content');
      if (fContent) fContent.innerHTML = '';
    }

    if (optionsEl) {
      optionsEl.innerHTML = '';
      const badges = ['🌸 A', '🧿 B', '✨ C', '🔒 D'];
      qData.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-quiz-option';
        btn.innerHTML = `<span class="opt-badge-sticker">${badges[optIdx]}</span> <span class="opt-text">${optText}</span>`;
        btn.addEventListener('click', () => handleQuizAnswer(optIdx, btn));
        optionsEl.appendChild(btn);
      });
    }
  }

  function handleQuizAnswer(selectedIdx, clickedBtn) {
    const questions = RAKHI_CONFIG.brotherQuiz;
    const qData = questions[currentQuizIndex];
    const isCorrect = selectedIdx === qData.correct;

    // Disable option buttons during feedback
    const allBtns = document.querySelectorAll('#quiz-options-container button');
    allBtns.forEach(b => b.disabled = true);

    const feedbackEl = document.getElementById('quiz-feedback-box');
    const fContent = document.getElementById('quiz-feedback-content');

    if (isCorrect) {
      quizScore++;
      clickedBtn.classList.add('correct');
      SoundEngine.playSuccess();
      FXEngine.fireConfetti({ count: 25, x: clickedBtn.getBoundingClientRect().left + 100, y: clickedBtn.getBoundingClientRect().top });
      if (fContent) {
        fContent.innerHTML = `<div class="fb-title">✨ CORRECT! 😌</div><div class="fb-desc">${qData.responseCorrect}</div>`;
      }
    } else {
      clickedBtn.classList.add('wrong');
      allBtns[qData.correct].classList.add('correct-highlight');
      SoundEngine.playWrong();
      if (fContent) {
        fContent.innerHTML = `<div class="fb-title">😂 WRONG! 💀</div><div class="fb-desc">${qData.responseWrong}</div>`;
      }
    }

    if (feedbackEl) {
      feedbackEl.className = `quiz-feedback-box ${isCorrect ? 'feedback-correct' : 'feedback-wrong'} animated bounceIn`;
    }

    // Attach Next Page button listener for paper slide transition
    const nextBtn = document.getElementById('btn-quiz-next-page');
    if (nextBtn) {
      nextBtn.onclick = () => {
        const qWrapper = document.getElementById('quiz-question-wrapper');
        const optGrid = document.getElementById('quiz-options-container');

        if (qWrapper) qWrapper.classList.add('paper-slide-out');
        if (optGrid) optGrid.classList.add('paper-slide-out');

        setTimeout(() => {
          if (qWrapper) qWrapper.classList.remove('paper-slide-out');
          if (optGrid) optGrid.classList.remove('paper-slide-out');

          if (currentQuizIndex + 1 < questions.length) {
            renderQuizQuestion(currentQuizIndex + 1);
            if (qWrapper) qWrapper.classList.add('paper-slide-in');
            if (optGrid) optGrid.classList.add('paper-slide-in');

            setTimeout(() => {
              if (qWrapper) qWrapper.classList.remove('paper-slide-in');
              if (optGrid) optGrid.classList.remove('paper-slide-in');
            }, 350);
          } else {
            finishQuiz();
          }
        }, 280);
      };
    }
  }

  function finishQuiz() {
    const questions = RAKHI_CONFIG.brotherQuiz;
    const total = questions.length;
    const scorePct = Math.round((quizScore / total) * 100);

    // Setup Quiz Result Screen (Screen 2)
    const scoreNumEl = document.getElementById('result-score-num');
    const scoreRankEl = document.getElementById('result-rank-title');
    const scoreDescEl = document.getElementById('result-rank-desc');
    const ringCircle = document.getElementById('result-ring-circle');

    if (scoreNumEl) scoreNumEl.textContent = `${quizScore} / ${total}`;
    
    // Animate SVG stroke circle
    if (ringCircle) {
      const radius = ringCircle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      ringCircle.style.strokeDasharray = `${circumference}`;
      const offset = circumference - (scorePct / 100) * circumference;
      ringCircle.style.strokeDashoffset = offset;
    }

    let rankTitle = "";
    let rankDesc = "";

    if (scorePct >= 85) {
      rankTitle = "🏆 BROTHER LEVEL: LEGENDARY";
      rankDesc = "Identity 100% Confirmed! Seshu actually pays attention to his sister. Welcome, Agent Seshu! 🥹❤️";
      SoundEngine.playFanfare();
      FXEngine.fireConfetti({ count: 60 });
    } else if (scorePct >= 60) {
      rankTitle = "✅ IDENTITY CONFIRMED";
      rankDesc = "Clearance granted! You passed the security protocol with flying colors. Welcome, Seshu! 😎";
      SoundEngine.playSuccess();
    } else {
      rankTitle = "🤨 SUSPICIOUS CLEARANCE";
      rankDesc = "Are you sure you're Seshu? Or did a midnight fridge intruder steal his phone? You barely passed! 😂";
      SoundEngine.playAlarm();
    }

    if (scoreRankEl) scoreRankEl.textContent = rankTitle;
    if (scoreDescEl) scoreDescEl.textContent = rankDesc;

    goToScreen(2);
  }

  // SCREEN 3: Stats Renderer
  function animateStats() {
    const statsContainer = document.getElementById('stats-grid-container');
    if (!statsContainer) return;

    statsContainer.innerHTML = '';
    const stats = RAKHI_CONFIG.statistics;

    stats.forEach((stat, idx) => {
      const card = document.createElement('div');
      card.className = 'stat-card glass-panel';
      card.style.animationDelay = `${idx * 0.12}s`;

      const displayVal = typeof stat.value === 'number' ? `${stat.value}%` : stat.value;
      const numPercent = typeof stat.value === 'number' ? stat.value : (stat.numericValue || 100);

      card.innerHTML = `
        <div class="stat-header">
          <span class="stat-icon">${stat.icon}</span>
          <span class="stat-label">${stat.label}</span>
          <span class="stat-value" style="color: ${stat.color}">${displayVal}</span>
        </div>
        <div class="stat-bar-track">
          <div class="stat-bar-fill" style="width: 0%; background: ${stat.color}"></div>
        </div>
      `;

      statsContainer.appendChild(card);

      // Animate progress bar fill after DOM append
      setTimeout(() => {
        const fill = card.querySelector('.stat-bar-fill');
        if (fill) fill.style.width = `${numPercent}%`;
      }, 150 + idx * 100);
    });

    // Stamp 10/10 sound effect
    setTimeout(() => {
      SoundEngine.playSuccess();
    }, 1000);
  }

  // SCREEN 4: Who Does This? Challenge
  function setupWhoDoesThis() {
    renderWhoScenario(0);
  }

  function renderWhoScenario(index) {
    const scenarios = RAKHI_CONFIG.whoDoesThis;
    if (index < 0 || index >= scenarios.length) {
      finishWhoDoesThis();
      return;
    }

    currentWhoIndex = index;
    const sData = scenarios[index];

    const numEl = document.getElementById('who-card-num');
    const statementEl = document.getElementById('who-statement-text');
    const feedbackEl = document.getElementById('who-feedback-box');
    const cardEl = document.getElementById('who-interactive-card');

    if (numEl) numEl.textContent = `SCENARIO ${index + 1} OF ${scenarios.length}`;
    if (statementEl) statementEl.textContent = sData.statement;
    if (feedbackEl) {
      feedbackEl.className = 'who-feedback-box hidden';
      feedbackEl.innerHTML = '';
    }

    if (cardEl) {
      cardEl.classList.remove('slide-out');
      cardEl.classList.add('slide-in');
    }

    const btnMe = document.getElementById('btn-who-me');
    const btnSeshu = document.getElementById('btn-who-seshu');
    const btnWho = document.getElementById('btn-who-knows');

    const handleChoice = (type) => {
      SoundEngine.playClick();
      const reaction = sData.reactions[type];

      if (feedbackEl) {
        feedbackEl.className = 'who-feedback-box feedback-active animated popIn';
        feedbackEl.innerHTML = `<div class="who-reaction-text">${reaction}</div>`;
      }

      // Disable buttons temporarily
      [btnMe, btnSeshu, btnWho].forEach(b => b && (b.disabled = true));

      setTimeout(() => {
        [btnMe, btnSeshu, btnWho].forEach(b => b && (b.disabled = false));
        if (currentWhoIndex + 1 < scenarios.length) {
          if (cardEl) {
            cardEl.classList.remove('slide-in');
            cardEl.classList.add('slide-out');
          }
          setTimeout(() => {
            renderWhoScenario(currentWhoIndex + 1);
          }, 300);
        } else {
          finishWhoDoesThis();
        }
      }, 2000);
    };

    if (btnMe) btnMe.onclick = () => handleChoice('me');
    if (btnSeshu) btnSeshu.onclick = () => handleChoice('seshu');
    if (btnWho) btnWho.onclick = () => handleChoice('whoKnows');
  }

  function finishWhoDoesThis() {
    const summaryCard = document.getElementById('who-summary-card');
    const gameArea = document.getElementById('who-game-area');
    if (gameArea) gameArea.classList.add('hidden');
    if (summaryCard) {
      summaryCard.classList.remove('hidden');
      SoundEngine.playFanfare();
      FXEngine.fireConfetti({ count: 40 });
    }
  }

  // SCREEN 5: Evidence Room Gallery
  function setupEvidenceGallery() {
    const galleryContainer = document.getElementById('evidence-gallery-grid');
    if (!galleryContainer) return;

    galleryContainer.innerHTML = '';
    const photos = RAKHI_CONFIG.evidencePhotos;

    photos.forEach((photo, idx) => {
      const card = document.createElement('div');
      card.className = 'polaroid-card glass-panel';
      card.style.animationDelay = `${idx * 0.1}s`;

      card.innerHTML = `
        <div class="polaroid-pin">📌</div>
        <div class="polaroid-badge">EVIDENCE #${photo.id}</div>
        <div class="polaroid-img-wrapper">
          <img src="${photo.src}" alt="${photo.title}" class="polaroid-img" onerror="this.onerror=null; this.src='${createPlaceholderSVG(photo.title, photo.id)}';" />
        </div>
        <div class="polaroid-caption">
          <h3>${photo.title}</h3>
          <p>${photo.caption}</p>
          <span class="evidence-date">${photo.date}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        openEvidenceModal(photo);
      });

      galleryContainer.appendChild(card);
    });

    // Modal close bindings
    const modal = document.getElementById('evidence-modal');
    const closeBtn = document.getElementById('evidence-modal-close');
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }
  }

  function openEvidenceModal(photo) {
    const modal = document.getElementById('evidence-modal');
    const modalImg = document.getElementById('modal-evidence-img');
    const modalTitle = document.getElementById('modal-evidence-title');
    const modalDesc = document.getElementById('modal-evidence-desc');

    if (!modal) return;
    if (modalImg) {
      modalImg.src = photo.src;
      modalImg.onerror = function() {
        this.src = createPlaceholderSVG(photo.title, photo.id);
      };
    }
    if (modalTitle) modalTitle.textContent = photo.title;
    if (modalDesc) modalDesc.textContent = photo.caption;

    modal.classList.add('active');
    SoundEngine.playClick();
  }

  // SVG Fallback Generator for missing photos
  function createPlaceholderSVG(title, id) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4a1525"/>
            <stop offset="100%" stop-color="#260811"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#g)"/>
        <rect x="20" y="20" width="360" height="260" fill="none" stroke="#ffd700" stroke-width="2" stroke-dasharray="6,6" opacity="0.4"/>
        <circle cx="200" cy="120" r="40" fill="none" stroke="#ff758c" stroke-width="3"/>
        <path d="M185 120 L215 120 M200 105 L200 135" stroke="#ffd700" stroke-width="3" stroke-linecap="round"/>
        <text x="200" y="190" font-family="sans-serif" font-size="16" fill="#ffd700" font-weight="bold" text-anchor="middle">MEMORY EXHIBIT #${id}</text>
        <text x="200" y="215" font-family="sans-serif" font-size="12" fill="rgba(255,255,255,0.8)" text-anchor="middle">SESHU MEMORY FILE</text>
      </svg>
    `;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  // SCREEN 6: Secret Hidden Rakhi Challenge
  function setupHiddenRakhi() {
    const container = document.getElementById('hidden-rakhi-area');
    const targetRakhi = document.getElementById('hidden-rakhi-target');
    const successBox = document.getElementById('hidden-rakhi-success');
    const continueBtn = document.getElementById('btn-hidden-rakhi-continue');

    if (!container || !targetRakhi) return;

    // Randomize Rakhi position within container
    const randomTop = Math.floor(Math.random() * 60 + 20); // 20% to 80%
    const randomLeft = Math.floor(Math.random() * 60 + 20); // 20% to 80%

    targetRakhi.style.top = `${randomTop}%`;
    targetRakhi.style.left = `${randomLeft}%`;

    targetRakhi.addEventListener('click', (e) => {
      if (isRakhiFound) return;
      isRakhiFound = true;

      targetRakhi.classList.add('found-glow');
      SoundEngine.playUnlock();
      FXEngine.fireConfetti({ count: 60, x: e.clientX, y: e.clientY });

      if (successBox) successBox.classList.remove('hidden');
      if (continueBtn) continueBtn.classList.remove('hidden');
    });
  }

  // SCREEN 7: Do Not Click Button
  function setupDoNotClick() {
    const btn = document.getElementById('btn-do-not-click');
    const statusText = document.getElementById('do-not-click-status');
    const continueBtn = document.getElementById('btn-do-not-click-continue');
    const cardEl = document.getElementById('do-not-click-card');

    if (!btn) return;

    const messages = [
      "I told you NOT to click! 😑",
      "Seshu... please stop. 🛑",
      "You're doing this intentionally, aren't you? 💀",
      "FINE! YOU WIN! 😂 Okay, you may continue!"
    ];

    btn.addEventListener('click', (e) => {
      doNotClickCount++;

      if (cardEl) {
        cardEl.classList.remove('shake');
        void cardEl.offsetWidth; // Force reflow
        cardEl.classList.add('shake');
      }

      if (doNotClickCount <= messages.length) {
        if (statusText) {
          statusText.textContent = messages[doNotClickCount - 1];
          statusText.className = 'dnc-status-text animated fadeIn';
        }
      }

      if (doNotClickCount === 1) {
        SoundEngine.playWrong();
        btn.textContent = "DON'T CLICK AGAIN 👿";
      } else if (doNotClickCount === 2) {
        SoundEngine.playAlarm();
        btn.textContent = "SERIOUSLY STOP IT 🛑";
      } else if (doNotClickCount === 3) {
        SoundEngine.playAlarm();
        btn.textContent = "LAST WARNING ⚠️";
      } else if (doNotClickCount >= 4) {
        SoundEngine.playFanfare();
        FXEngine.fireConfetti({ count: 70, x: e.clientX, y: e.clientY });
        btn.textContent = "VICTORY ACHIEVED! 🏆";
        btn.disabled = true;
        btn.style.opacity = '0.6';
        if (continueBtn) continueBtn.classList.remove('hidden');
      }
    });
  }

  // SCREEN 8: Scratch Memories (One-at-a-Time Physical Scrapbook Frame)
  let currentScratchIndex = 0;

  function initScratchCards() {
    renderScratchCard(0);
  }

  function renderScratchCard(index) {
    const grid = document.getElementById('scratch-cards-grid');
    const badgeEl = document.getElementById('scratch-step-badge');
    const continueBtn = document.getElementById('btn-scratch-continue');
    if (!grid) return;

    const memories = RAKHI_CONFIG.scratchMemories;
    if (index < 0 || index >= memories.length) return;

    currentScratchIndex = index;
    const mem = memories[index];

    if (badgeEl) badgeEl.textContent = `✨ MEMORY ${index + 1} OF ${memories.length}`;
    if (continueBtn) {
      continueBtn.classList.add('hidden');
      continueBtn.textContent = (index + 1 < memories.length) ? "NEXT MEMORY ➡️" : "PROCEED TO CLASSIFIED UNLOCK 🔓";
    }

    grid.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'scratch-card-wrapper animated popIn';

    wrapper.innerHTML = `
      <div class="polaroid-tape-sticker">📌</div>
      <div class="scratch-card-inner">
        <img src="${mem.image}" alt="${mem.title}" class="memory-photo" onerror="this.onerror=null; this.src='${createPlaceholderSVG(mem.title, mem.id)}';" />
        <canvas class="scratch-canvas"></canvas>
      </div>
      <div class="scratch-caption-box">
        <div class="scratch-title">${mem.title}</div>
        <div class="scratch-desc">${mem.caption}</div>
      </div>
    `;

    grid.appendChild(wrapper);

    const onReveal = () => {
      SoundEngine.playSuccess();
      FXEngine.fireConfetti({ count: 35 });
      if (continueBtn) continueBtn.classList.remove('hidden');
    };

    const imgEl = wrapper.querySelector('.memory-photo');
    if (imgEl && imgEl.complete) {
      ScratchEngine.initCard(wrapper, mem, onReveal);
    } else if (imgEl) {
      imgEl.addEventListener('load', () => {
        ScratchEngine.initCard(wrapper, mem, onReveal);
      });
      setTimeout(() => ScratchEngine.initCard(wrapper, mem, onReveal), 300);
    } else {
      ScratchEngine.initCard(wrapper, mem, onReveal);
    }

    if (continueBtn) {
      continueBtn.onclick = () => {
        if (currentScratchIndex + 1 < memories.length) {
          renderScratchCard(currentScratchIndex + 1);
        } else {
          goToScreen(9); // Screen 9: Secret code unlock
        }
      };
    }
  }

  // SCREEN 9: Classified Code Unlock
  function setupClassifiedUnlock() {
    const inputEl = document.getElementById('secret-code-input');
    const submitBtn = document.getElementById('btn-submit-code');
    const feedbackEl = document.getElementById('code-feedback-msg');
    const envelopeEl = document.getElementById('classified-envelope');

    if (!submitBtn || !inputEl) return;

    // Keypad button bindings
    document.querySelectorAll('.keypad-btn').forEach(keyBtn => {
      keyBtn.addEventListener('click', () => {
        SoundEngine.playClick();
        const val = keyBtn.getAttribute('data-val');
        if (val === 'DEL') {
          inputEl.value = inputEl.value.slice(0, -1);
        } else if (val === 'CLR') {
          inputEl.value = '';
        } else {
          inputEl.value += val;
        }
      });
    });

    // Physical keyboard input listener for desktop
    document.addEventListener('keydown', (e) => {
      if (screens[currentScreenIndex] !== 'screen-classified-unlock') return;
      
      if (e.key === 'Backspace') {
        inputEl.value = inputEl.value.slice(0, -1);
      } else if (e.key === 'Escape') {
        inputEl.value = '';
      } else if (e.key === 'Enter') {
        submitBtn.click();
      } else if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
        inputEl.value += e.key.toUpperCase();
        SoundEngine.playClick();
      }
    });

    submitBtn.addEventListener('click', () => {
      const entered = inputEl.value.trim().toUpperCase();
      const actual = RAKHI_CONFIG.secretCode.trim().toUpperCase();

      if (entered === actual) {
        SoundEngine.playUnlock();
        if (feedbackEl) {
          feedbackEl.className = 'code-feedback feedback-success';
          feedbackEl.textContent = '🔓 ACCESS GRANTED! UNLOCKING CLASSIFIED SURPRISE...';
        }

        if (envelopeEl) {
          envelopeEl.classList.add('opened');
        }

        FXEngine.fireConfetti({ count: 50 });

        setTimeout(() => {
          // Transition into World 2 (Screen 10 - Personal Letter)
          goToScreen(10);
        }, 1800);

      } else {
        SoundEngine.playWrong();
        if (feedbackEl) {
          feedbackEl.className = 'code-feedback feedback-error animated shake';
          feedbackEl.textContent = `❌ ACCESS DENIED! Nice try, ${RAKHI_CONFIG.brotherName}. 😂 Hint: Try "${actual}"`;
        }
      }
    });
  }

  // SCREEN 10 & 11: Personal Letter & Rakhi Ceremony Interaction
  function setupRakhiMoment() {
    // Fill Personal Letter (Screen 10)
    const letterObj = RAKHI_CONFIG.personalLetter;
    const salutationEl = document.getElementById('letter-salutation');
    const bodyEl = document.getElementById('letter-body-paragraphs');
    const closingEl = document.getElementById('letter-closing');

    if (salutationEl) salutationEl.textContent = letterObj.salutation;
    if (closingEl) closingEl.innerHTML = `${letterObj.closing}<br><strong>${RAKHI_CONFIG.sisterName}</strong> ❤️`;

    if (bodyEl) {
      bodyEl.innerHTML = letterObj.paragraphs.map(p => `<p>${p}</p>`).join('');
    }

    // Fill Rakhi Ceremony Stage (Screen 11)
    const medallion = document.getElementById('rakhi-medallion');
    const threadBack = document.getElementById('thread-back');
    const threadFront = document.getElementById('thread-front');
    const threadKnot = document.getElementById('thread-knot');
    const tieBtn = document.getElementById('btn-tie-rakhi');
    const instructionText = document.getElementById('rakhi-instruction-text');
    const successArea = document.getElementById('rakhi-success-area');
    const actionArea = document.getElementById('rakhi-action-area');
    const openNoteBtn = document.getElementById('btn-open-final-note');
    const personalNoteCard = document.getElementById('rakhi-personal-note-card');
    const psHiddenNote = document.getElementById('rakhi-ps-hidden-note');
    const polaroidBox = document.getElementById('rakhi-polaroid-box');
    const footerNav = document.getElementById('rakhi-footer-nav');
    const replayBtn = document.getElementById('btn-replay-rakhi');
    const sparklesContainer = document.getElementById('rakhi-sparkles-container');

    if (!tieBtn || !medallion) return;

    let isTying = false;

    function createSparkleBurst(count = 8) {
      if (!sparklesContainer) return;
      const icons = ['✨', '🌸', '💖', '⭐', '🧿'];
      for (let i = 0; i < count; i++) {
        const item = document.createElement('div');
        item.className = 'rakhi-sparkle-item';
        item.textContent = icons[Math.floor(Math.random() * icons.length)];
        item.style.left = `${50 + (Math.random() * 40 - 20)}%`;
        item.style.top = `${50 + (Math.random() * 40 - 20)}%`;
        sparklesContainer.appendChild(item);
        setTimeout(() => item.remove(), 1000);
      }
    }

    function runTyingSequence() {
      if (isTying) return;
      isTying = true;

      // STEP 1 — START: Press button feedback & initial sparkle
      tieBtn.disabled = true;
      tieBtn.textContent = 'TYING RAKHI... 🎀';
      medallion.classList.remove('rakhi-idle');
      SoundEngine.playClick();
      createSparkleBurst(4);

      // STEP 2 — RAKHI MOVES: 400ms delay, Rakhi moves to wrist center
      setTimeout(() => {
        medallion.classList.add('tying-move');
        SoundEngine.playUnlock();
        createSparkleBurst(6);

        // STEP 3 — THREAD WRAPS: 500ms delay, thread paths animate around wrist
        setTimeout(() => {
          if (threadBack) threadBack.style.strokeDashoffset = '0';
          setTimeout(() => {
            if (threadFront) threadFront.style.strokeDashoffset = '0';
          }, 300);

          // STEP 4 — KNOT FORMS: 700ms delay, knot pops in & settled bounce
          setTimeout(() => {
            if (threadKnot) threadKnot.setAttribute('r', '8');
            createSparkleBurst(10);
            
            // STEP 5 & 6 — SPARKLE & GLOW: 400ms delay
            setTimeout(() => {
              medallion.classList.remove('tying-move');
              medallion.classList.add('tied-glow');
              SoundEngine.playSuccess();
              FXEngine.fireConfetti({ count: 45 });

              // STEP 7 — SUCCESS MESSAGE
              if (instructionText) instructionText.textContent = "✨ Rakhi successfully tied with love!";
              if (actionArea) actionArea.classList.add('hidden');
              if (successArea) successArea.classList.remove('hidden');
              isTying = false;
            }, 400);
          }, 700);
        }, 500);
      }, 400);
    }

    // Bind tying triggers (button & medallion tap)
    tieBtn.onclick = runTyingSequence;
    medallion.onclick = runTyingSequence;

    // Final note reveal
    if (openNoteBtn) {
      openNoteBtn.onclick = () => {
        SoundEngine.playUnlock();
        FXEngine.fireConfetti({ count: 35 });
        if (personalNoteCard) personalNoteCard.classList.remove('hidden');
        
        // Reveal PS Note sliding out after 700ms
        setTimeout(() => {
          if (psHiddenNote) psHiddenNote.classList.remove('hidden');
          if (polaroidBox) polaroidBox.classList.remove('hidden');
          if (footerNav) footerNav.classList.remove('hidden');
          openNoteBtn.classList.add('hidden');
        }, 700);
      };
    }

    // Replay ceremony
    if (replayBtn) {
      replayBtn.onclick = () => {
        isTying = false;
        medallion.className = 'rakhi-medallion rakhi-idle';
        if (threadBack) threadBack.style.strokeDashoffset = '160';
        if (threadFront) threadFront.style.strokeDashoffset = '160';
        if (threadKnot) threadKnot.setAttribute('r', '0');
        if (actionArea) actionArea.classList.remove('hidden');
        if (successArea) successArea.classList.add('hidden');
        if (personalNoteCard) personalNoteCard.classList.add('hidden');
        if (psHiddenNote) psHiddenNote.classList.add('hidden');
        if (polaroidBox) polaroidBox.classList.add('hidden');
        if (footerNav) footerNav.classList.add('hidden');
        if (openNoteBtn) openNoteBtn.classList.remove('hidden');
        if (instructionText) instructionText.textContent = '"Tap the Rakhi when you\'re ready 👀"';
        tieBtn.disabled = false;
        tieBtn.textContent = 'TIE THE RAKHI 🎀✨';
      };
    }
  }

  // SCREEN 12: Mission Complete Checklist
  function animateMissionComplete() {
    const listItems = document.querySelectorAll('.mission-check-item');
    listItems.forEach((item, idx) => {
      item.classList.remove('checked');
      setTimeout(() => {
        item.classList.add('checked');
        SoundEngine.playClick();
      }, 300 + idx * 350);
    });

    setTimeout(() => {
      SoundEngine.playFanfare();
      FXEngine.fireConfetti({ count: 60 });
      const finaleBtn = document.getElementById('btn-mission-complete-finale');
      if (finaleBtn) finaleBtn.classList.remove('hidden');
    }, 300 + listItems.length * 350);
  }

  // SCREEN 13: Grand Finale
  function triggerGrandFinale() {
    SoundEngine.playFanfare();

    // Continuous celebration bursts
    FXEngine.fireConfetti({ count: 100, upward: true });
    setTimeout(() => FXEngine.fireConfetti({ count: 80 }), 800);
    setTimeout(() => FXEngine.fireConfetti({ count: 90 }), 1600);

    const headline = document.getElementById('finale-headline');
    const subtext = document.getElementById('finale-subtext');
    const psText = document.getElementById('finale-ps-text');

    if (headline) headline.textContent = RAKHI_CONFIG.finalSurprise.headline;
    if (subtext) subtext.textContent = RAKHI_CONFIG.finalSurprise.subtext;
    if (psText) psText.textContent = RAKHI_CONFIG.finalSurprise.psMessage;
  }

  // Toast Helper for Hidden Scrapbook Discoveries
  function showScrapbookToast(text) {
    const toast = document.getElementById('scrapbook-toast');
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('active');
    try { SoundEngine.playClick(); } catch (err) {}
    setTimeout(() => {
      toast.classList.remove('active');
    }, 2200);
  }

  function setupHiddenSecrets() {
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('scrapbook-sticker')) {
        showScrapbookToast("Why are you touching my stickers? 😂");
      } else if (target.classList.contains('washi-tape-top') || target.classList.contains('washi-tape-corner')) {
        showScrapbookToast("You found secret washi tape! 🌸");
      } else if (target.classList.contains('push-pin')) {
        showScrapbookToast("Evidence pin secured! 🕵️");
      }
    });
  }

  return {
    init: function () {
      init();
      setupHiddenSecrets();
    },
    goToScreen: goToScreen
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
  App.init();
});
