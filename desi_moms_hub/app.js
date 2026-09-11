/**
 * THE BELAN CHRONICLE & PROCRASTINATION MONITOR, MUMMY
 * Interactive Application Core Logic
 */

// ==========================================================================
// 1. WEB AUDIO SOUND EFFECTS SYNTHESIZER
// ==========================================================================
class DesiSoundEngine {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Cartoon "Thwack" (Chappal contact / button hit)
  playThwack() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.audioCtx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.4, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.12);
  }

  // Comedic Pressure Cooker Whistle (Alert / High Threat)
  playWhistle() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1400, this.audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(1800, this.audioCtx.currentTime + 0.25);
    osc.frequency.linearRampToValueAtTime(1500, this.audioCtx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, this.audioCtx.currentTime + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.5);
  }

  // Wholesome Sitar / Harp Arpeggio (Sliced Apple moment / S-Rank victory)
  playWholesome() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    const notes = [330, 415, 494, 660]; // E major pentatonic vibe
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(this.audioCtx.currentTime + idx * 0.08);
      osc.stop(this.audioCtx.currentTime + idx * 0.08 + 0.35);
    });
  }
}

const soundEngine = new DesiSoundEngine();

// ==========================================================================
// 2. PROCRASTINATION MONITOR TABS
// ==========================================================================
function initAppTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.app-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      soundEngine.playThwack();
      const targetApp = btn.dataset.app;

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      panels.forEach(p => {
        if (p.dataset.panel === targetApp) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    });
  });
}

// ==========================================================================
// 3. CHOOSE-YOUR-OWN-ADVENTURE (CYOA) COMIC ENGINE
// ==========================================================================
const CYOA_SCENARIOS = {
  goa: {
    title: "Mission Goa Trip: The Living Room Interrogation",
    initialNode: "start",
    nodes: {
      start: {
        face: "🤨",
        mood: "Skeptical",
        prop: "🩴",
        speech: "Goa?! Why do you suddenly want to go to Goa? Who is going? Whose car? Who is paying? And why is your room looking so suspiciously tidy today?",
        subNote: "💡 Household Tip: Never bring up Goa without making ginger tea first.",
        suspicion: 35,
        choices: [
          { text: "“Mummy, all college toppers are going to study marine biology on the beach.”", next: "marine_lie", tag: "Blatant Lie" },
          { text: "“Actually Mummy, here is fresh ginger tea and I also folded the dry laundry.”", next: "tea_tactics", tag: "Diplomatic Buttering" },
          { text: "“Everyone's parents have allowed them except you!”", next: "emotional_disaster", tag: "Instant Regret" }
        ]
      },
      marine_lie: {
        face: "🧐",
        mood: "Detective Mode",
        prop: "🪵",
        speech: "Marine biology?! You failed high school botany! Do you think your mother was born yesterday? What marine life is there at 2:00 AM on Baga Beach?",
        subNote: "⚠️ Suspicion rising exponentially.",
        suspicion: 75,
        choices: [
          { text: "“I meant... we are visiting ancient historical Portuguese churches.”", next: "church_pivot", tag: "Historical Pivot" },
          { text: "“Okay fine, we just want to eat seafood and relax after exams.”", next: "honest_confession", tag: "Honest Truth" }
        ]
      },
      tea_tactics: {
        face: "😌",
        mood: "Temporarily Pleased",
        prop: "☕",
        speech: "The tea is good. But don't think I don't see what you are doing. Who all are going? Is Sharma Ji's son Rahul also going?",
        subNote: "✅ The Sharma Ji factor has been unlocked!",
        suspicion: 20,
        choices: [
          { text: "“Yes, Rahul is organizing it and his parents said it's very safe.”", next: "sharma_victory", tag: "Leverage Sharma Ji" },
          { text: "“No, just our normal 4 friends who failed internal exams.”", next: "loser_friends", tag: "Bad Company Trap" }
        ]
      },
      emotional_disaster: {
        face: "😡",
        mood: "High Voltage Rage",
        prop: "🩴",
        speech: "Then go live in their house! If everyone's parents tell them to jump into a well, will you also jump into the well?! Phone is confiscated until next semester!",
        subNote: "❌ Fatal household mistake: Never compare mom to other parents.",
        suspicion: 100,
        choices: [
          { text: "Apologize profusely and wash all the dinner dishes.", next: "start", tag: "Reset Dignity" }
        ]
      },
      church_pivot: {
        face: "🤨",
        mood: "Unimpressed",
        prop: "🪵",
        speech: "Churches? You won't even wake up to visit the local temple 200 meters away on Sunday, and you're flying 1,000 miles to see churches?! DENIED.",
        subNote: "Ending: Confined to home with extra tuition classes.",
        suspicion: 90,
        choices: [
          { text: "Try another strategy.", next: "start", tag: "Restart" }
        ]
      },
      honest_confession: {
        face: "🤔",
        mood: "Negotiable",
        prop: "📱",
        speech: "At least you told the truth. BUT: 1. You will share live WhatsApp location 24/7. 2. You will video call me every 2 hours. 3. You will carry 4 packets of homemade Thepla.",
        subNote: "🎉 RANK B CONDITIONAL SUCCESS: Permission granted with 400 conditions!",
        suspicion: 40,
        choices: [
          { text: "Accept all 400 conditions with folded hands!", next: "victory_conditional", tag: "Accept Deal" }
        ]
      },
      sharma_victory: {
        face: "😏",
        mood: "Competitive Pride",
        prop: "🏆",
        speech: "Rahul is going? Well, if Sharma Ji's son is going, then my child will definitely go. Take 2,000 rupees extra. Don't let him look richer than you. Go pack!",
        subNote: "🌟 RANK S MIRACLE: Parental pride outranked all household rules!",
        suspicion: 5,
        choices: [
          { text: "Celebrate victory quietly before she changes her mind!", next: "victory_s", tag: "Mission Accomplished" }
        ]
      },
      loser_friends: {
        face: "😤",
        mood: "Disgusted",
        prop: "🪵",
        speech: "Those loafers?! The same boys who stand at the tea stall in ripped jeans? You are not crossing the colony gate with them!",
        subNote: "Ending: Vacation spent organizing mom's spice containers.",
        suspicion: 85,
        choices: [
          { text: "Accept defeat and retreat to room.", next: "start", tag: "Try Again" }
        ]
      },
      victory_conditional: {
        face: "👵",
        mood: "Protective Matriarch",
        prop: "🧳",
        speech: "Now go pack two sweaters. Yes, in Goa. What if the air conditioning in the train is cold?! Have you no common sense?",
        subNote: "Outcome: You survived. Enjoy your beach trip with 3 sweaters.",
        suspicion: 30,
        choices: [
          { text: "Play Again from Start", next: "start", tag: "Restart" }
        ]
      },
      victory_s: {
        face: "👑",
        mood: "Undisputed Queen",
        prop: "🍎",
        speech: "Here, eat this sliced apple before you start packing. And remember to send photos where you are standing in front of Rahul in all group pictures.",
        subNote: "Outcome: Perfect victory. Sliced apple delivered to desk.",
        suspicion: 0,
        choices: [
          { text: "Play Again or Try Tupperware Scenario", next: "start", tag: "Play Again" }
        ]
      }
    }
  },

  tupperware: {
    title: "Case File: The Lost Blue Tupperware Dabba",
    initialNode: "start",
    nodes: {
      start: {
        face: "😠",
        mood: "Criminal Investigation",
        prop: "🥫",
        speech: "I unpacked your bag. Where is the blue 500ml airtight container with the leak-proof lid? I gave you rajma chawal in it this morning. WHERE IS IT?",
        subNote: "🚨 HIGH TREASON ALERT: Losing mother's Tupperware is punishable by law.",
        suspicion: 60,
        choices: [
          { text: "“Mummy, I think my friend Rahul borrowed it to eat lunch...”", next: "blame_rahul", tag: "Sacrifice Friend" },
          { text: "“I washed it and left it on my office/college desk to dry, promise!”", next: "desk_lie", tag: "Tactical Delay" },
          { text: "“It's okay Mummy, I will buy you a new one from Amazon.”", next: "money_insult", tag: "Fatal Error" }
        ]
      },
      blame_rahul: {
        face: "📱",
        mood: "Mobilizing Army",
        prop: "🩴",
        speech: "Rahul borrowed it?! Give me his mother's phone number right now. I will call Mrs. Sharma and ask why her son is stealing other people's heirloom containers!",
        subNote: "⚠️ Escalation level: Colony warfare imminent.",
        suspicion: 80,
        choices: [
          { text: "“No no wait! I remembered! It's in my locker!”", next: "rescue_desk", tag: "Backpedal" }
        ]
      },
      desk_lie: {
        face: "🤨",
        mood: "Skeptical Stare",
        prop: "🪵",
        speech: "Left to dry? If it is not in your hands by 8:00 AM tomorrow morning, you will carry your lunch in a plastic grocery bag for the next six months.",
        subNote: "Verdict: 24-hour ultimatum issued.",
        suspicion: 40,
        choices: [
          { text: "Set 14 alarms to fetch it first thing tomorrow.", next: "survived_tupperware", tag: "Close Call" }
        ]
      },
      money_insult: {
        face: "🤬",
        mood: "Cosmic Indignation",
        prop: "🪵",
        speech: "BUY A NEW ONE?! That container was purchased in Singapore in 2004! It has emotional value! Do you think money grows on curry leaf plants in the garden?!",
        subNote: "Outcome: Lecture on the value of money lasted 3 hours and 42 minutes.",
        suspicion: 100,
        choices: [
          { text: "Bow head and apologize sincerely.", next: "start", tag: "Restart" }
        ]
      },
      rescue_desk: {
        face: "🧐",
        mood: "Watchful",
        prop: "🥫",
        speech: "You better bring it back intact. Not a single scratch on the lid, or no dinner for you tomorrow.",
        subNote: "Temporary truce established.",
        suspicion: 50,
        choices: [
          { text: "Pledge allegiance to the blue container.", next: "survived_tupperware", tag: "Complete" }
        ]
      },
      survived_tupperware: {
        face: "😌",
        mood: "Grudging Mercy",
        prop: "🍎",
        speech: "Good. Now drink your turmeric milk. And don't ever lose household property again.",
        subNote: "Crisis averted. The sacred container remains legendary.",
        suspicion: 15,
        choices: [
          { text: "Return to Goa Trip Scenario", next: "switch_goa", tag: "Switch Scenario" }
        ]
      }
    }
  }
};

let currentScenarioKey = 'goa';
let currentNodeKey = 'start';

function renderCYOANode() {
  const scenario = CYOA_SCENARIOS[currentScenarioKey];
  const node = scenario.nodes[currentNodeKey];

  // Update scenario title
  document.getElementById('comic-scenario-title').innerText = scenario.title;

  // Update avatar & props
  document.getElementById('mom-face').innerText = node.face;
  document.getElementById('mom-mood-badge').innerText = `Mood: ${node.mood}`;
  document.getElementById('cartoon-prop').innerText = node.prop;

  // Update speech & note
  document.getElementById('speech-text').innerText = `“${node.speech}”`;
  document.getElementById('speech-sub-note').innerText = node.subNote;

  // Update suspicion meter
  const suspicionVal = document.getElementById('comic-suspicion-val');
  const suspicionFill = document.getElementById('comic-suspicion-fill');
  suspicionVal.innerText = `${node.suspicion}%`;
  suspicionFill.style.width = `${node.suspicion}%`;

  if (node.suspicion > 70) {
    suspicionFill.style.background = 'var(--crimson)';
    suspicionVal.style.color = 'var(--crimson)';
  } else if (node.suspicion > 35) {
    suspicionFill.style.background = 'var(--gold)';
    suspicionVal.style.color = 'var(--gold)';
  } else {
    suspicionFill.style.background = 'var(--jade)';
    suspicionVal.style.color = 'var(--jade)';
  }

  // Populate choice buttons
  const choicesContainer = document.getElementById('comic-choices');
  choicesContainer.innerHTML = '';

  node.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = `
      <span>${choice.text}</span>
      <span class="choice-tag">${choice.tag}</span>
    `;
    btn.addEventListener('click', () => {
      soundEngine.playThwack();
      if (choice.next === 'switch_goa') {
        currentScenarioKey = 'goa';
        currentNodeKey = 'start';
      } else if (choice.next.includes('victory') || choice.next === 'survived_tupperware') {
        soundEngine.playWholesome();
        currentNodeKey = choice.next;
      } else if (choice.next === 'emotional_disaster' || choice.next === 'money_insult') {
        soundEngine.playWhistle();
        currentNodeKey = choice.next;
      } else {
        currentNodeKey = choice.next;
      }
      renderCYOANode();
    });
    choicesContainer.appendChild(btn);
  });
}

function initCYOAEngine() {
  renderCYOANode();

  document.getElementById('comic-restart-btn').addEventListener('click', () => {
    soundEngine.playThwack();
    currentNodeKey = 'start';
    renderCYOANode();
  });

  document.getElementById('comic-tupperware-btn').addEventListener('click', () => {
    soundEngine.playThwack();
    if (currentScenarioKey === 'goa') {
      currentScenarioKey = 'tupperware';
      document.getElementById('comic-tupperware-btn').innerText = '🏖️ Switch to "Goa Trip Permission"';
    } else {
      currentScenarioKey = 'goa';
      document.getElementById('comic-tupperware-btn').innerText = '📦 Switch to "The Lost Tupperware Dabba" Case';
    }
    currentNodeKey = 'start';
    renderCYOANode();
  });
}

// ==========================================================================
// 4. AMMI-MATIC MEME STUDIO (HTML5 CANVAS)
// ==========================================================================
class MemeStudio {
  constructor() {
    this.canvas = document.getElementById('memeCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.template = 'chappal';
    this.topText = "ME: *HAS A SLIGHT COLD*";
    this.bottomText = "MOM: IT IS THAT 24-HOUR PHONE!";
    this.gossipLevel = 75;
    this.stickers = [];
    this.init();
  }

  init() {
    this.bindEvents();
    this.draw();
  }

  bindEvents() {
    // Template Selector
    const tmplButtons = document.querySelectorAll('.tmpl-btn');
    tmplButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        soundEngine.playThwack();
        tmplButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.template = btn.dataset.tmpl;
        this.draw();
      });
    });

    // Caption Inputs
    const topInput = document.getElementById('meme-top-text');
    const btmInput = document.getElementById('meme-bottom-text');

    topInput.addEventListener('input', (e) => {
      this.topText = e.target.value.toUpperCase();
      this.draw();
    });

    btmInput.addEventListener('input', (e) => {
      this.bottomText = e.target.value.toUpperCase();
      this.draw();
    });

    // Slider
    const logSlider = document.getElementById('log-slider');
    const logVal = document.getElementById('log-val');
    logSlider.addEventListener('input', (e) => {
      this.gossipLevel = parseInt(e.target.value, 10);
      let desc = 'Level: Neighborhood Calm (10%)';
      if (this.gossipLevel > 30) desc = 'Level: Balcony Watchers (45%)';
      if (this.gossipLevel > 60) desc = "Level: Sharma Ji's Aunties (75%)";
      if (this.gossipLevel > 85) desc = 'Level: Society WhatsApp Emergency (95%)';
      logVal.innerText = desc;
      this.draw();
    });

    // Sticker Buttons
    const stickerButtons = document.querySelectorAll('.sticker-btn');
    stickerButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        soundEngine.playThwack();
        const emoji = btn.dataset.sticker;
        this.stickers.push({
          emoji: emoji,
          x: 100 + Math.random() * 380,
          y: 200 + Math.random() * 200,
          size: 56
        });
        this.draw();
      });
    });

    // Reset Button
    document.getElementById('btn-reset-meme').addEventListener('click', () => {
      soundEngine.playThwack();
      this.stickers = [];
      topInput.value = "ME: *HAS A SLIGHT COLD*";
      btmInput.value = "MOM: IT IS THAT 24-HOUR PHONE!";
      this.topText = topInput.value;
      this.bottomText = btmInput.value;
      this.draw();
    });

    // Download Button
    document.getElementById('btn-download-meme').addEventListener('click', () => {
      soundEngine.playWhistle();
      const link = document.createElement('a');
      link.download = `ammi_matic_meme_${Date.now()}.png`;
      link.href = this.canvas.toDataURL('image/png');
      link.click();
    });

    // WhatsApp Format Button
    document.getElementById('btn-copy-whatsapp').addEventListener('click', () => {
      soundEngine.playThwack();
      alert('📲 Meme formatted for WhatsApp! Downloading PNG to share directly into your Family WhatsApp group.');
      const link = document.createElement('a');
      link.download = `whatsapp_forward_to_mom_${Date.now()}.png`;
      link.href = this.canvas.toDataURL('image/png');
      link.click();
    });
  }

  draw() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, w, h);

    // 1. Draw Template Background Scene
    this.drawTemplateArt(w, h);

    // 2. Draw "Log Kya Kahenge" Dial Overlay
    this.drawGossipWatermark(w, h);

    // 3. Draw Stickers
    this.stickers.forEach(s => {
      ctx.font = `${s.size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(s.emoji, s.x, s.y);
    });

    // 4. Draw Meme Captions (Impact Style)
    this.drawMemeText(this.topText, w / 2, 70, w - 40);
    this.drawMemeText(this.bottomText, w / 2, h - 50, w - 40);

    // 5. Watermark Footer
    ctx.font = '700 12px Space Grotesk';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.textAlign = 'center';
    ctx.fillText('THE BELAN CHRONICLE • OFFICIAL DESI MOM MEME', w / 2, h - 12);
  }

  drawTemplateArt(w, h) {
    const ctx = this.ctx;

    if (this.template === 'chappal') {
      // Dynamic Flying Slipper Scenario
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#2B0A0F');
      grad.addColorStop(1, '#50141D');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Parabolic Trajectory Line
      ctx.strokeStyle = '#FFC93C';
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(80, h - 140);
      ctx.quadraticCurveTo(w / 2, 100, w - 90, h - 180);
      ctx.stroke();
      ctx.setLineDash([]);

      // Mom Thrower Icon
      ctx.font = '64px serif';
      ctx.fillText('👩‍🦱', 80, h - 130);

      // Target (Your bedroom)
      ctx.font = '64px serif';
      ctx.fillText('🎯', w - 90, h - 170);

      // Flying Slipper in Midair
      ctx.save();
      ctx.translate(w / 2, 150);
      ctx.rotate(-0.35);
      ctx.font = '90px serif';
      ctx.fillText('🩴', -40, 20);
      ctx.restore();

      // Motion speed lines
      ctx.strokeStyle = 'rgba(255, 159, 28, 0.7)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(w / 2 - 110, 155);
      ctx.lineTo(w / 2 - 50, 150);
      ctx.stroke();

    } else if (this.template === 'belan') {
      // The Rolling Pin of Justice
      const grad = ctx.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, w / 2);
      grad.addColorStop(0, '#3A0D14');
      grad.addColorStop(1, '#1A0407');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Golden Sunburst
      ctx.strokeStyle = 'rgba(255, 201, 60, 0.18)';
      ctx.lineWidth = 3;
      for (let i = 0; i < 16; i++) {
        const angle = (i * Math.PI) / 8;
        ctx.beginPath();
        ctx.moveTo(w / 2, h / 2);
        ctx.lineTo(w / 2 + Math.cos(angle) * 350, h / 2 + Math.sin(angle) * 350);
        ctx.stroke();
      }

      // Giant Belan Artifact
      ctx.font = '120px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🪵', w / 2, h / 2 - 20);

      ctx.font = '700 16px Unbounded';
      ctx.fillStyle = '#FF9F1C';
      ctx.fillText('SCEPTRE OF UNILATERAL DECISION MAKING', w / 2, h / 2 + 80);

    } else if (this.template === 'phone') {
      // Phone = Root of all evil
      ctx.fillStyle = '#180407';
      ctx.fillRect(0, 0, w, h);

      // Glowing Hazard Signs
      ctx.font = '110px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('📱', w / 2, h / 2 - 30);

      // Warning circles
      ctx.strokeStyle = '#E63946';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2 - 30, 95, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = '700 15px Unbounded';
      ctx.fillStyle = '#E63946';
      ctx.fillText('CAUSE OF COLDS, BAD GRADES & CLIMATE CHANGE', w / 2, h / 2 + 90);

    } else if (this.template === 'sharmaji') {
      // The Legendary Sharma Ji Son
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#0D2B1B');
      grad.addColorStop(1, '#1A0407');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.font = '110px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🏆', w / 2, h / 2 - 30);

      ctx.font = '700 16px Unbounded';
      ctx.fillStyle = '#4CAF82';
      ctx.fillText('SHARMA JI KA BETA (WAKES UP AT 3:45 AM)', w / 2, h / 2 + 80);
    }
  }

  drawGossipWatermark(w, h) {
    const ctx = this.ctx;
    ctx.save();
    ctx.font = '800 14px Unbounded';
    ctx.fillStyle = 'rgba(255, 201, 60, 0.7)';
    ctx.textAlign = 'right';
    ctx.fillText(`LOG KYA KAHENGE METER: ${this.gossipLevel}%`, w - 24, h - 90);
    ctx.restore();
  }

  drawMemeText(text, x, y, maxWidth) {
    if (!text) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.font = '900 32px Unbounded, Impact, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 7;
    ctx.lineJoin = 'round';
    ctx.strokeText(text, x, y, maxWidth);

    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(text, x, y, maxWidth);
    ctx.restore();
  }
}

// ==========================================================================
// 5. THE STRICT-O-METER QUIZ ENGINE
// ==========================================================================
const QUIZ_QUESTIONS = [
  {
    q: "You inform your mother you have developed a mild headache. What is her diagnosis?",
    options: [
      { text: "“Drink plenty of water and rest your eyes, beta.”", pts: 2 },
      { text: "“It's because of that 24-hour glowing phone screen!”", pts: 10 },
      { text: "“Did you eat soaked almonds this morning? No. That is why.”", pts: 15 },
      { text: "“Rub mustard oil on your skull and sleep at 8:30 PM.”", pts: 20 }
    ]
  },
  {
    q: "You open the freezer searching for ice cream. You find a family-pack tub. What is inside?",
    options: [
      { text: "Actual Belgian Chocolate Ice Cream (Glitch in Reality)", pts: 0 },
      { text: "Frozen Ginger-Garlic paste cubes in plastic wrap", pts: 12 },
      { text: "Finely chopped fresh coriander and green chillies", pts: 15 },
      { text: "Leftover Daal from three Mondays ago stored in vacuum", pts: 20 }
    ]
  },
  {
    q: "It is 6:15 AM on a Sunday. Mom walks into your bedroom to wake you up. What time does she yell?",
    options: [
      { text: "“Wake up beta, it is 6:15 AM.”", pts: 2 },
      { text: "“Utho! It is almost 7:30 AM!”", pts: 8 },
      { text: "“BETA UTTHO! 9 BAJ GAYE! The whole colony is awake!”", pts: 18 },
      { text: "“Half the day is over! Lunch is getting cold on table!”", pts: 25 }
    ]
  },
  {
    q: "You are going for a 1-day college trip. How many sweaters does she pack in your bag?",
    options: [
      { text: "Zero, it is 42°C in peak summer.", pts: 2 },
      { text: "One light hoodie 'just in case AC is cold'.", pts: 10 },
      { text: "Three thermal sweaters, monkey cap, and wool socks.", pts: 18 },
      { text: "Her own shawl, 2 sweaters, and 4 kilograms of Thepla.", pts: 25 }
    ]
  },
  {
    q: "You ask her where the TV remote is. What is her immediate response?",
    options: [
      { text: "“It is on the side table near the lamp.”", pts: 2 },
      { text: "“If I come there and find it, I will throw it at you!”", pts: 18 },
      { text: "“If it had teeth, it would have bitten you by now.”", pts: 22 },
      { text: "“Why do you need TV? Go study like Sharma Ji's son.”", pts: 25 }
    ]
  },
  {
    q: "You scored 96% in your final board exams. What is her instant review?",
    options: [
      { text: "“We are so proud of you beta!”", pts: 2 },
      { text: "“Good, but where did the other 4% go?”", pts: 18 },
      { text: "“Sharma Ji's son got 98.4%. But okay, drink milk.”", pts: 22 },
      { text: "“Don't boast outside or someone will cast an evil eye (Nazar) on you!”", pts: 25 }
    ]
  }
];

class StrictOMeterQuiz {
  constructor() {
    this.currentIdx = 0;
    this.totalScore = 0;
    this.init();
  }

  init() {
    this.renderQuestion();
    document.getElementById('btn-retake-quiz').addEventListener('click', () => {
      soundEngine.playThwack();
      this.currentIdx = 0;
      this.totalScore = 0;
      document.getElementById('quiz-question-area').style.display = 'block';
      document.getElementById('quiz-result-area').style.display = 'none';
      this.renderQuestion();
    });
  }

  renderQuestion() {
    const qData = QUIZ_QUESTIONS[this.currentIdx];
    const totalQ = QUIZ_QUESTIONS.length;

    document.getElementById('quiz-step-label').innerText = `Question ${this.currentIdx + 1} of ${totalQ}`;
    document.getElementById('quiz-bar-fill').style.width = `${((this.currentIdx + 1) / totalQ) * 100}%`;
    document.getElementById('quiz-score-preview').innerText = `Score: ${this.totalScore} pts`;

    document.getElementById('quiz-q-title').innerText = qData.q;

    const list = document.getElementById('quiz-options-list');
    list.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    qData.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.innerHTML = `
        <span class="opt-letter">${letters[i]}</span>
        <span>${opt.text}</span>
      `;
      btn.addEventListener('click', () => {
        soundEngine.playThwack();
        this.totalScore += opt.pts;
        this.currentIdx++;

        if (this.currentIdx < totalQ) {
          this.renderQuestion();
        } else {
          this.showResults();
        }
      });
      list.appendChild(btn);
    });
  }

  showResults() {
    document.getElementById('quiz-question-area').style.display = 'none';
    document.getElementById('quiz-result-area').style.display = 'block';

    const rankStamp = document.getElementById('cert-rank-stamp');
    const rankTitle = document.getElementById('cert-rank-title');
    const rankDesc = document.getElementById('cert-rank-desc');
    const timeSpec = document.getElementById('cert-time-spec');
    const cureSpec = document.getElementById('cert-cure-spec');

    if (this.totalScore >= 95) {
      soundEngine.playWhistle();
      rankStamp.innerText = 'GRADE: S+';
      rankTitle.innerText = 'Rank: Supreme Commander Ammi';
      rankDesc.innerText = 'Your mother possesses the legendary 90-degree hallway ricochet chappal throw. She detects missing Tupperware telepathically and views mobile phones as weapons of mass distraction.';
      timeSpec.innerText = '6:00 AM = "It is already 12:00 PM!"';
      cureSpec.innerText = 'Vicks Vaporub + Haldi Kadha + Phone Confiscation';
    } else if (this.totalScore >= 65) {
      soundEngine.playWhistle();
      rankStamp.innerText = 'GRADE: A';
      rankTitle.innerText = 'Rank: Belan Black Belt';
      rankDesc.innerText = 'Highly strategic, masters the art of comparing you to Sharma Ji’s kids, and has never thrown away an empty plastic ice cream tub in her entire adult existence.';
      timeSpec.innerText = '6:15 AM = "Whole colony is awake!"';
      cureSpec.innerText = 'Mustard Oil + Soaked Almonds';
    } else if (this.totalScore >= 35) {
      soundEngine.playWholesome();
      rankStamp.innerText = 'GRADE: B+';
      rankTitle.innerText = 'Rank: Tactical Diplomat Mom';
      rankDesc.innerText = 'Relies on masterclass emotional guilt trips rather than ballistic slippers. Always delivers sliced apples to your study desk 10 minutes after a major argument.';
      timeSpec.innerText = '6:15 AM = "It is almost 7:30 AM"';
      cureSpec.innerText = 'Ginger Honey Tea + 1 Extra Roti';
    } else {
      soundEngine.playWholesome();
      rankStamp.innerText = 'GRADE: B';
      rankTitle.innerText = 'Rank: Chilled Chachi';
      rankDesc.innerText = 'Unusually calm for a Desi household. Might actually believe you when you say you were studying on YouTube. Cherish her, she is a statistical rarity.';
      timeSpec.innerText = 'Accurate to within 15 minutes';
      cureSpec.innerText = 'Actual Medicine + Nap';
    }
  }
}

// ==========================================================================
// 6. MUSEUM OF DOMESTIC RELICS (MODAL SYSTEM)
// ==========================================================================
const RELIC_DOSSIERS = {
  tupperware: {
    title: "🥫 The Sacred Blue Airtight Tupperware",
    stats: "Treason Level: 10/10 • Threat Rating: High Alert",
    quote: "“You can forget your house keys, you can forget your college degree, but if you leave this container at school, do not ring the doorbell.”",
    lore: "In Desi households, plastic containers are not mere lunchboxes; they are family heirlooms purchased during special trips or collected from historic family weddings. The loss of a container triggers a household forensic investigation more thorough than Interpol."
  },
  cookies: {
    title: "🧵 The Danish Butter Cookie Tin of Deception",
    stats: "Deception Rating: 100% • Emotional Hazard: Extreme",
    quote: "“Who said there are cookies inside? Look how neatly I have stored the buttons from your father’s 1994 wedding kurta!”",
    lore: "Every child across the diaspora has sprinted towards the kitchen counter upon spotting the royal blue tin with golden biscuits on the lid—only to open it and find 42 spare buttons, safety pins, and rusty tailor shears. Cookies were consumed decades ago."
  },
  plasticbags: {
    title: "🛍️ The Master Plastic Bag Filled With 400 Bags",
    stats: "Capacity: Infinite • Lifespan: Eternal",
    quote: "“Do not throw that grocery bag away! It is sturdy plastic, fold it into a triangle and put it under the sink!”",
    lore: "Stored beneath every Desi kitchen sink exists an infinite mass singularity: one large grocery bag containing hundreds of smaller grocery bags folded into neat geometric origami triangles. It is the cornerstone of household recycling."
  },
  chappal: {
    title: "🩴 The Aerodynamic Blue Rubber Slipper (Bata Certified)",
    stats: "Effective Range: 40m • Trajectory: Curved Around Doors",
    quote: "“Do not test my aim today, beta. I have not missed since 1988.”",
    lore: "Legendary for defying known laws of physics. Capable of ricocheting off hallway mirrors and refrigerators to make precise, light contact. More of a psychological deterrent than an actual weapon."
  },
  sofaplastic: {
    title: "🛋️ The Eternal Sofa Plastic Wrap",
    stats: "Preservation: 12 Years • Comfort: Sticky in Summer",
    quote: "“If we take the plastic off, what will the guests think? What if someone spills tea? Sit on the dining chair!”",
    lore: "The formal drawing-room sofa must remain encased in crinkly factory plastic so it remains 'brand new' for special guests who visit once every half-decade. Household members who dare sit on it in shorts during humid summers will experience instant adhesion."
  },
  vicks: {
    title: "🧴 The Sacred Blue Tub of Vicks Vaporub",
    stats: "Panacea Rating: 100% • Scent: Nostalgic Eucalyptus",
    quote: "“Headache? Rub Vicks. Knee pain? Rub Vicks. Stressed about exams? Rub Vicks on your forehead and sleep.”",
    lore: "The undisputed holy grail of domestic medicine. Applied liberally to chests, foreheads, and feet wrapped in warm socks. Believed to cure everything from minor sniffles to existential dread."
  }
};

function initRelicsModal() {
  const cards = document.querySelectorAll('.relic-card');
  const modal = document.getElementById('relic-modal');
  const title = document.getElementById('relic-modal-title');
  const body = document.getElementById('relic-modal-body');
  const closeBtn = document.getElementById('close-relic');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      soundEngine.playThwack();
      const rKey = card.dataset.relic;
      const data = RELIC_DOSSIERS[rKey];
      if (!data) return;

      title.innerText = data.title;
      body.innerHTML = `
        <div style="margin-bottom: 14px; font-size: 12px; font-weight: 800; color: var(--gold);">${data.stats}</div>
        <div class="quote-card" style="margin-bottom: 18px;">
          <p class="quote-text">${data.quote}</p>
          <div class="quote-author">— Mummy's Official Ruling</div>
        </div>
        <h4 style="font-size: 14px; color: var(--marigold); margin-bottom: 8px;">CULTURAL LORE & CONTEXT:</h4>
        <p style="font-size: 13.5px; line-height: 1.6; color: var(--paper);">${data.lore}</p>
      `;
      modal.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
}

// ==========================================================================
// 7. MOM'S CORNER (COMMUNITY STORIES FEED & SUBMISSION)
// ==========================================================================
const DEFAULT_STORIES = [
  {
    id: 1,
    author: "Rahul, 24 (Software Engineer)",
    category: "The Tupperware Tragedy",
    content: "Left my blue tiffin on the metro seat in 2019. I literally bought an identical container online, had it delivered to my friend's house, and brought it home hoping she wouldn't notice. She took one glance at the lid and said: 'This plastic is from Gujarat, mine was from Pune.' I was grounded for 3 weeks.",
    reactions: { meriMummy: 842, rip: 312, apple: 198 }
  },
  {
    id: 2,
    author: "Sneha, 21 (Design Student)",
    category: "FBI Level Mom Detection",
    content: "I told my mom I was studying in the college library. She asked me what book I was reading. I said 'Advanced Economics page 40'. Two minutes later she replied: 'Library closes at 5 PM on Wednesdays. Why is the background sound of a blender running? Are you at the juice stall?' I froze in absolute terror.",
    reactions: { meriMummy: 1205, rip: 640, apple: 340 }
  },
  {
    id: 3,
    author: "Karan, 27 (Bangalore)",
    category: "Wholesome Sliced Apple Climax",
    content: "Had a huge argument with Mummy about moving to another city for work. We didn't speak the entire evening. At 11:30 PM, the door clicked open silently. She walked in, didn't say a single word, placed a steel plate with sliced apples sprinkled with black salt and chaat masala on my laptop keyboard, patted my head, and walked out. I cried into the apples.",
    reactions: { meriMummy: 2410, rip: 89, apple: 4120 }
  }
];

class CommunityStories {
  constructor() {
    this.feedEl = document.getElementById('stories-feed');
    this.countEl = document.getElementById('feed-count');
    this.form = document.getElementById('story-form');
    this.stories = this.loadStories();
    this.init();
  }

  loadStories() {
    const saved = localStorage.getItem('desi_mom_stories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_STORIES;
      }
    }
    return DEFAULT_STORIES;
  }

  saveStories() {
    localStorage.setItem('desi_mom_stories', JSON.stringify(this.stories));
  }

  init() {
    this.render();
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      soundEngine.playWhistle();

      const author = document.getElementById('story-author').value.trim();
      const catSelect = document.getElementById('story-category');
      const cat = catSelect.options[catSelect.selectedIndex].text;
      const content = document.getElementById('story-content').value.trim();

      if (!author || !content) return;

      const newStory = {
        id: Date.now(),
        author: author,
        category: cat,
        content: content,
        reactions: { meriMummy: 1, rip: 0, apple: 0 }
      };

      this.stories.unshift(newStory);
      this.saveStories();
      this.render();
      this.form.reset();

      alert("🎉 Your confession has been submitted to Mummy's Adalat! Case accepted.");
    });
  }

  render() {
    this.feedEl.innerHTML = '';
    this.countEl.innerText = `Showing ${this.stories.length} Community Cases`;

    this.stories.forEach(story => {
      const card = document.createElement('div');
      card.className = 'story-card';
      card.innerHTML = `
        <div class="story-top">
          <span class="story-author">${story.author}</span>
          <span class="story-cat-badge">${story.category}</span>
        </div>
        <p class="story-content-text">${story.content}</p>
        <div class="story-reactions">
          <button class="reaction-btn" data-id="${story.id}" data-type="meriMummy">
            <span>🩴 Meri Mummy Bhi:</span> <strong>${story.reactions.meriMummy}</strong>
          </button>
          <button class="reaction-btn" data-id="${story.id}" data-type="rip">
            <span>🫡 RIP Comrade:</span> <strong>${story.reactions.rip}</strong>
          </button>
          <button class="reaction-btn" data-id="${story.id}" data-type="apple">
            <span>🍎 Sliced Apple:</span> <strong>${story.reactions.apple}</strong>
          </button>
        </div>
      `;

      // Wire reaction clicks
      const rButtons = card.querySelectorAll('.reaction-btn');
      rButtons.forEach(b => {
        b.addEventListener('click', () => {
          soundEngine.playThwack();
          const sid = parseInt(b.dataset.id, 10);
          const rtype = b.dataset.type;
          const target = this.stories.find(s => s.id === sid);
          if (target && target.reactions[rtype] !== undefined) {
            target.reactions[rtype]++;
            this.saveStories();
            this.render();
          }
        });
      });

      this.feedEl.appendChild(card);
    });
  }
}

// ==========================================================================
// 8. GLOSSARY MODAL & SFX TOGGLE
// ==========================================================================
function initGlossaryAndSFX() {
  const modal = document.getElementById('glossary-modal');
  const openBtn = document.getElementById('glossary-btn');
  const closeBtn = document.getElementById('close-glossary');

  openBtn.addEventListener('click', () => {
    soundEngine.playThwack();
    modal.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Sound Toggle
  const sfxBtn = document.getElementById('sfx-toggle');
  const sfxIcon = document.getElementById('sfx-icon');
  const sfxLabel = document.querySelector('.sfx-label');

  sfxBtn.addEventListener('click', () => {
    soundEngine.enabled = !soundEngine.enabled;
    if (soundEngine.enabled) {
      sfxIcon.innerText = '🔊';
      sfxLabel.innerText = 'SFX: ON';
      soundEngine.playThwack();
    } else {
      sfxIcon.innerText = '🔇';
      sfxLabel.innerText = 'SFX: OFF';
    }
  });

  // Dynamic Ticker Rotation
  const rules = [
    "Rule #402: 'If you have a headache, it is the phone. If you failed math, it is the phone.'",
    "Rule #108: 'The good china and fancy sofa are only for guests who visit once every 7 years.'",
    "Rule #304: 'If you lose the blue Tupperware, do not return home without police protection.'",
    "Rule #512: '6:15 AM on Sunday means it is 11:30 AM and you have wasted your life.'"
  ];
  let rIdx = 0;
  const tickerText = document.getElementById('ticker-text');
  setInterval(() => {
    rIdx = (rIdx + 1) % rules.length;
    tickerText.innerText = rules[rIdx];
  }, 7000);
}

// ==========================================================================
// INITIALIZATION ON DOM READY
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initAppTabs();
  initCYOAEngine();
  new MemeStudio();
  new StrictOMeterQuiz();
  initRelicsModal();
  new CommunityStories();
  initGlossaryAndSFX();
});
