# 🎁 Agent Seshu — Top Secret Rakhi Surprise Website

A premium, interactive, mobile-first Raksha Bandhan surprise website created exclusively for **Seshu** by his sister.

---

## 🌟 Features Overview

- 🚨 **Secret Agent / Top Secret Theme (World 1)**: Glassmorphism panels, scanlines, Agent Seshu mission file header, security clearance stamps.
- 🔐 **Brother Verification Quiz**: 7 customizable funny sibling questions with instant interactive feedback and score gauge.
- 📊 **Seshu Statistics Dashboard**: Animated progress bars (Annoying level 97%, Sister protection 99%, Food theft 100%, Irritation ability ∞%).
- 😂 **Who Does This? Challenge**: 5 scenario interactive cards with voting buttons ("ME", "SESHU", "WHO KNOWS") and commentary.
- 🕵️ **Evidence Room (Photo Gallery)**: Polaroid-style photo cards with classified timestamps, tap-to-enlarge modal, and SVG fallback graphics.
- 🔎 **Secret Hidden Rakhi Challenge**: Interactive visual search mini-game with hidden Rakhi emblem and sparkle effects.
- ⚠️ **DO NOT CLICK Button**: Sassy interactive button that gets progressively more dramatic with each click before celebrating with confetti.
- ✨ **Scratch-to-Reveal Memories**: HTML5 Canvas touch & mouse drag scratch cards revealing photos and hidden memory captions.
- 🔒 **Classified Secret Code Unlock**: Keypad input screen requiring the secret passcode (`SESHU123`).
- 🌸 **World 2 Transition (Warm Festive Rakhi Theme)**: Seamless visual transition into warm cream, rose, and gold aesthetic with floating sparkles.
- 💌 **Personal Letter**: Parchment card layout with custom sister-brother message.
- 🧿 **The Rakhi Moment**: Interactive Rakhi thread tying animation with blessing quote and main photo card.
- 📋 **Mission Complete Dashboard**: Sequentially checked mission checklist.
- 🎊 **Grand Finale Celebration**: Continuous canvas confetti explosion, sound fanfare, and P.S. note ("You owe me a treat 🍕").
- 🔊 **Native Web Audio API Synth**: Real-time synthesized sound effects (click, alarm, success, fanfare) with a visible Mute/Unmute toggle button.

---

## 🛠️ How to Customize (1-Minute Guide)

Everything on the website can be customized in **one single file**: [`js/config.js`](file:///d:/rakhi/js/config.js).

### 1. Customizing Names & Secret Code
Open `js/config.js` and edit:
```js
brotherName: "Seshu",
sisterName: "Your Name",
secretCode: "SESHU123", // Code needed on Mission 10
```

### 2. Customizing Photos
Place your actual photos inside the `images/` directory:
- `images/photo1.jpg` — Childhood photo / Evidence Exhibit A
- `images/photo2.jpg` — Midnight snack robbery photo / Exhibit B
- `images/photo3.jpg` — Laughing photo / Memory #02
- `images/photo4.jpg` — Unstoppable duo / Exhibit D
- `images/photo5.jpg` — Legendary brother / Memory #03
- `images/rakhi_together.jpg` — Best photo of brother & sister together

*Note: If any image file is missing, the site automatically renders a beautiful SVG fallback graphic!*

### 3. Customizing Questions & Responses
You can edit, add, or change any quiz questions, option choices, and funny responses inside the `brotherQuiz` array in `js/config.js`.

### 4. Customizing Personal Letter & Messages
Edit `personalLetter` and `rakhiMoment` fields in `js/config.js` to express your exact personal message.

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or launch a local dev server:

```bash
# Using Python builtin server
python -m http.server 3000

# Or using npx serve / live-server
npx serve .
```

Then visit: `http://localhost:3000` on your mobile phone or laptop browser!
