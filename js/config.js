/**
 * RAKHI SURPRISE CONFIGURATION - AGENT SESHU & DHATRI
 * Easily customize all content, questions, secret code, letter, and images here!
 */

const RAKHI_CONFIG = {
  // Sister & Brother Information
  brotherName: "Seshu",
  sisterName: "Dhatri",
  
  // Secret Code required to unlock the final Classified Envelope
  secretCode: "SESHU123", // Code entered on Mission 10 (Case-insensitive)

  // Quiz Questions (Mission 2: Brother Verification)
  brotherQuiz: [
    {
      id: 1,
      question: "Who spends money more recklessly?",
      options: ["Dhatri", "Seshu", "Both of us equally", "Classified Information 🤐"],
      correct: 0,
      responseCorrect: "Correct! Dhatri is officially the designated spender in this sibling dynamic. 💸😌",
      responseWrong: "Nice try! Deep down you know Dhatri spends way more! 😂"
    },
    {
      id: 2,
      question: "Who is officially the most annoying sibling?",
      options: ["Seshu (100%)", "Dhatri (Impossible)", "It's a tie", "The neighbor's dog 🐶"],
      correct: 0,
      responseCorrect: "Identity verified! Seshu takes the crown for #1 annoyance! 👑👑",
      responseWrong: "Wrong answer! Security sensors detect false modesty! 😜"
    },
    {
      id: 3,
      question: "Who starts arguments and fights most of the time?",
      options: ["Seshu (Over food/remote)", "Dhatri (Never!)", "We negotiate peacefully", "The WiFi router 📶"],
      correct: 0,
      responseCorrect: "Accurate! You start 99% of wars over stolen snacks! 🍕💥",
      responseWrong: "Lies! FBI database confirms you start all fights! 🕵️‍♀️"
    },
    {
      id: 4,
      question: "Who has the capability to eat double their body weight in snacks?",
      options: ["Dhatri", "Seshu", "Garfield", "Both at 2 AM 🌙"],
      correct: 1,
      responseCorrect: "Bulls-eye! Seshu's stomach is a black hole. 🍔🍟",
      responseWrong: "Are you hiding your snack stash right now? You know it's you! 😂"
    },
    {
      id: 5,
      question: "Who loses their patience first in a minor conflict?",
      options: ["Dhatri", "Seshu", "Neither", "Depends if coffee is served ☕"],
      correct: 1,
      responseCorrect: "Correct! Seshu gets angry in 0.5 seconds flat! ⚡😤",
      responseWrong: "Doubtful! You get heated before anyone even finishes their sentence! 💣"
    },
    {
      id: 6,
      question: "Who is most likely to secretly steal food from the fridge?",
      options: ["Seshu in stealth mode 🥷", "Dhatri in plain sight 😇", "The midnight ghost 👻", "Nobody"],
      correct: 0,
      responseCorrect: "Caught red-handed! The fridge thief is confirmed! 🍰🕵️‍♂️",
      responseWrong: "Don't pretend you didn't steal Dhatri's slice of cake yesterday! 🍰💀"
    },
    {
      id: 7,
      question: "What is Seshu's ultimate secret superpower?",
      options: [
        "Sleeping through 15 alarm clocks ⏰",
        "Ignoring texts for 6 hours 📱",
        "Being an awesome brother to Dhatri ❤️",
        "All of the above!"
      ],
      correct: 3,
      responseCorrect: "100% PERFECT MATCH! You possess all these legendary traits! 🏆✨",
      responseWrong: "Trick question! The correct answer is ALL OF THE ABOVE! 🌟"
    }
  ],

  // Brother Statistics (Mission 4)
  statistics: [
    { label: "Annoying Level", value: 97, color: "#b9aedc", icon: "🤪" },
    { label: "Comedy & Sarcasm", value: 89, color: "#c9a86a", icon: "🎭" },
    { label: "Sleeping Ability", value: 100, color: "#e9b9a7", icon: "😴" },
    { label: "Food Theft Capability", value: 100, color: "#d98c9a", icon: "🍕" },
    { label: "Protection Shield for Dhatri", value: 99, color: "#4caf50", icon: "🛡️" },
    { label: "Ability to Irritate Dhatri", value: "∞%", numericValue: 100, color: "#e65c7b", icon: "💥" }
  ],

  // Who Does This? Scenarios (Mission 5)
  whoDoesThis: [
    {
      statement: "💸 Spends money unnecessarily on random online shopping.",
      reactions: {
        me: "Guilty as charged! Dhatri's retail therapy is essential. 🛍️✨",
        seshu: "Wait, Seshu spends money on gadgets he never uses! 🤖",
        whoKnows: "Both Dhatri and Seshu are financially suspicious! 😂"
      }
    },
    {
      statement: "🍕 Steals food from the other person's plate while they aren't looking.",
      reactions: {
        me: "Hey, Dhatri's sister tax is legally required! 🍟😋",
        seshu: "Classic Seshu maneuver! Food ninja! 🥷",
        whoKnows: "The food just magically disappears... mysterious. 👻"
      }
    },
    {
      statement: "😴 Can sleep through a thunderstorm, earthquake, and 10 alarms.",
      reactions: {
        me: "Dhatri wakes up at the sound of a feather dropping! 🪶",
        seshu: "Seshu is a sleeping legend. Hibernation mode activated! 🐻",
        whoKnows: "Sleeping champion of the century! 💤"
      }
    },
    {
      statement: "😤 Gets dramatic and angry over tiny trivial matters.",
      reactions: {
        me: "Hey, Dhatri is just passionate! 💅✨",
        seshu: "Seshu turns into an angry potato in 2 seconds! 🥔🔥",
        whoKnows: "Two drama queens in one house! 🎭"
      }
    },
    {
      statement: "📱 Takes 3 business days to reply to a simple WhatsApp message.",
      reactions: {
        me: "Dhatri replies instantly like a speed runner! ⚡",
        seshu: "Seshu reads notifications from space and forgets to reply! 🚀",
        whoKnows: "Seen at 10:00 AM... Replied next year! 💀"
      }
    }
  ],

  // Evidence Room Photos — Including ALL 21 Brother-Sister Photos!
  evidencePhotos: [
    { id: "001", src: "images/photo1.jpg", title: "EXHIBIT #001: PARTNERS IN CRIME", caption: "Classified proof that Dhatri and Seshu have been causing chaos together since day one.", date: "MEMORIES ARCHIVE" },
    { id: "002", src: "images/photo2.jpg", title: "EXHIBIT #002: UNSTOPPABLE SMILES", caption: "Documented evidence of infectious sibling laughter.", date: "CLASSIFIED DOSSIER" },
    { id: "003", src: "images/photo3.jpg", title: "EXHIBIT #003: MIDNIGHT CHAOS", caption: "Suspect captured being completely ridiculous and funny.", date: "ARCHIVED FILE" },
    { id: "004", src: "images/photo4.jpg", title: "EXHIBIT #004: RARE MOMENT OF PEACE", caption: "A rare window where no teasing or arguing occurred for 5 minutes.", date: "HISTORIC EVENT" },
    { id: "005", src: "images/photo5.jpg", title: "EXHIBIT #005: THE DUO", caption: "Look at Dhatri and Seshu pretending to be civilized human beings.", date: "TOP SECRET" },
    { id: "006", src: "images/photo6.jpg", title: "EXHIBIT #006: LEGENDARY BROTHER", caption: "Evidence confirming Seshu is, after all, the best brother around.", date: "PERMANENT RECORD" },
    { id: "007", src: "images/photo7.jpg", title: "EXHIBIT #007: SIBLING VIBES", caption: "Pure candid happiness captured on camera.", date: "MEMORIES ARCHIVE" },
    { id: "008", src: "images/photo8.jpg", title: "EXHIBIT #008: TEASING SESSION", caption: "100% chance Seshu was teasing Dhatri seconds before this picture.", date: "CLASSIFIED DOSSIER" },
    { id: "009", src: "images/photo9.jpg", title: "EXHIBIT #009: MEMORY VAULT #1", caption: "Another precious memory added to the brother-sister vault.", date: "ARCHIVED FILE" },
    { id: "010", src: "images/photo10.jpg", title: "EXHIBIT #010: MEMORY VAULT #2", caption: "No matter where we go, we bring the fun with us.", date: "HISTORIC EVENT" },
    { id: "011", src: "images/photo11.jpg", title: "EXHIBIT #011: MEMORY VAULT #3", caption: "The bond that time or distance can never fade.", date: "TOP SECRET" },
    { id: "012", src: "images/photo12.jpg", title: "EXHIBIT #012: MEMORY VAULT #4", caption: "Always standing by each other through everything.", date: "PERMANENT RECORD" },
    { id: "013", src: "images/photo13.jpg", title: "EXHIBIT #013: MEMORY VAULT #5", caption: "Brothers make life 10x funnier and 100x more interesting.", date: "SPECIAL FILE" },
    { id: "014", src: "images/photo14.jpg", title: "EXHIBIT #014: MEMORY VAULT #6", caption: "Captured moment of sibling solidarity.", date: "CLASSIFIED DOSSIER" },
    { id: "015", src: "images/photo15.jpg", title: "EXHIBIT #015: MEMORY VAULT #7", caption: "Proof that we are stuck together forever.", date: "ARCHIVED FILE" },
    { id: "016", src: "images/photo16.jpg", title: "EXHIBIT #016: MEMORY VAULT #8", caption: "Classic Seshu expression in full glory.", date: "HISTORIC EVENT" },
    { id: "017", src: "images/photo17.jpg", title: "EXHIBIT #017: MEMORY VAULT #9", caption: "Unconditional sibling bond recorded forever.", date: "TOP SECRET" },
    { id: "018", src: "images/photo18.jpg", title: "EXHIBIT #018: MEMORY VAULT #10", caption: "Another gold moment with my brother.", date: "PERMANENT RECORD" },
    { id: "019", src: "images/photo19.jpg", title: "EXHIBIT #019: MEMORY VAULT #11", caption: "Smiling through all of life's craziness.", date: "SPECIAL FILE" },
    { id: "020", src: "images/photo20.jpg", title: "EXHIBIT #020: MEMORY VAULT #12", caption: "The best partner in crime Dhatri could ask for.", date: "CLASSIFIED DOSSIER" },
    { id: "021", src: "images/photo21.jpg", title: "EXHIBIT #021: FINAL EVIDENCE", caption: "Final exhibit confirming Seshu is #1 Brother of the Century!", date: "FINAL RECORD" }
  ],

  // Scratch-to-Reveal Memories (Mission 9)
  scratchMemories: [
    {
      id: 1,
      title: "MEMORY #01 — CHILDHOOD & LAUGHTER",
      image: "images/photo1.jpg",
      caption: "Building pillow forts, playing games, and causing endless chaos together! 🏰✨"
    },
    {
      id: 2,
      title: "MEMORY #02 — UNSTOPPABLE BOND",
      image: "images/photo5.jpg",
      caption: "No matter how tough things got, Dhatri and Seshu always found a reason to laugh. 😂❤️"
    },
    {
      id: 3,
      title: "MEMORY #03 — FOREVER BROTHER",
      image: "images/photo15.jpg",
      caption: "One of the millions of moments Dhatri wouldn't trade for anything in this world. 🧿"
    },
    {
      id: 4,
      title: "MEMORY #04 — BROTHERLY PROTECTOR",
      image: "images/photo21.jpg",
      caption: "Thank you for always having Dhatri's back no matter what! 🛡️✨"
    }
  ],

  // Emotional Letter (Mission 12)
  personalLetter: {
    salutation: "Dear Seshu,",
    paragraphs: [
      "If you're reading this, you've survived all of Dhatri's spy interrogations, funny challenges, and evidence rooms! 😂",
      "All jokes aside, I wanted to create something truly special for you this Raksha Bandhan to remind you how much you mean to me.",
      "Growing up together has been the wildest, funniest, and most wonderful adventure. We've fought over the television remote, stolen each other's food, argued over silly nonsense, and driven each other crazy — but through it all, you've always been my constant support system.",
      "Thank you for being the brother who listens, protects, makes me laugh when I'm stressed, and stands by me no matter what.",
      "Distance or time will never change this bond. You will always be my favorite target to tease, and my most cherished brother."
    ],
    closing: "With all my love and blessings,"
  },

  // Rakhi Moment Message (Mission 13)
  rakhiMoment: {
    headline: "HAPPY RAKSHA BANDHAN, SESHU! 🧿❤️",
    subtext: "No matter how much we fight, argue, or annoy each other, you are someone Dhatri will always stand by and cherish.",
    mainPhoto: "images/photo21.jpg",
    blessingQuote: "May this Rakhi thread bring you health, endless happiness, success, and protection always."
  },

  // Finale Message & P.S. (Mission 15)
  finalSurprise: {
    headline: "MISSION ACCOMPLISHED! 🎁",
    subtext: "You are stuck with Dhatri forever. No returns. No exchanges. No refunds! 😂",
    psMessage: "P.S. Dhatri still spends more money than you! 💸😌 So... you officially owe me a massive treat! 🍕🧋🎉"
  }
};

// Freeze configuration to prevent accidental runtime mutation
Object.freeze(RAKHI_CONFIG);
