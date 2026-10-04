const SAVE_KEY = "formless-save-v5";
const LEGACY_SAVE_KEYS = ["formless-save-v4", "formless-save-v3", "formless-save-v2", "formless-save-v1"];

const evolutions = {
  formless: {
    tier: 0, family: "origin", name: "The Formless", glyph: "●",
    whisper: "It does not know what it is yet."
  },

  ember: {
    tier: 1, family: "ember", name: "Ember", glyph: "✦",
    whisper: "It learned that motion can become heat.",
    copy: "You touched it relentlessly. It learned urgency, pressure, force. Somewhere inside the dark, something caught fire."
  },
  seed: {
    tier: 1, family: "seed", name: "Seed", glyph: "❋",
    whisper: "Stillness did not mean nothing was happening.",
    copy: "You let energy gather instead of demanding an answer. It learned to hold, wait, and grow."
  },
  mechanism: {
    tier: 1, family: "mechanism", name: "Mechanism", glyph: "⌬",
    whisper: "It discovered that work can continue without you.",
    copy: "You taught it repetition. The first tiny process now turns on its own."
  },

  inferno: {
    tier: 2, family: "ember", name: "Inferno", glyph: "✹",
    whisper: "It no longer waits for your touch. It lunges toward it.",
    copy: "You answered fire with more force. The Ember stopped containing itself."
  },
  core: {
    tier: 2, family: "hybrid", name: "Core", glyph: "◉",
    whisper: "Pressure gathered inward until stillness became power.",
    copy: "You taught the Ember restraint. Heat folded inward, becoming dense, quiet, and difficult to disturb."
  },
  furnace: {
    tier: 2, family: "hybrid", name: "Furnace", glyph: "▣",
    whisper: "Heat has learned a schedule.",
    copy: "The Ember learned repetition. What was once wild now burns with purpose."
  },

  grove: {
    tier: 2, family: "seed", name: "Grove", glyph: "♧",
    whisper: "It grows most when nothing asks it to.",
    copy: "You gave the Seed time. One life became many, connected by patience."
  },
  briar: {
    tier: 2, family: "hybrid", name: "Briar", glyph: "✤",
    whisper: "Growth has learned to push back.",
    copy: "You taught the Seed force. Its softness hardened into thorns and stubborn roots."
  },
  cultivator: {
    tier: 2, family: "hybrid", name: "Cultivator", glyph: "⌘",
    whisper: "Growth now tends to itself.",
    copy: "You taught the Seed a rhythm. Roots, cycles, and repetition began working together."
  },

  engine: {
    tier: 2, family: "mechanism", name: "Engine", glyph: "⚙",
    whisper: "The rhythm accelerates whether you are here or not.",
    copy: "You kept teaching the Mechanism to repeat. It learned momentum."
  },
  press: {
    tier: 2, family: "hybrid", name: "Press", glyph: "◆",
    whisper: "The machine has learned the meaning of pressure.",
    copy: "You taught the Mechanism force. Every movement now lands with intent."
  },
  clockwork: {
    tier: 2, family: "hybrid", name: "Clockwork", glyph: "◫",
    whisper: "Nothing is rushed. Nothing is wasted.",
    copy: "You gave the Mechanism time. Its motion became measured, deliberate, and exact."
  },

  convergence: {
    tier: 2, family: "rare", name: "Convergence", glyph: "✧",
    whisper: "For once, no instinct won.",
    copy: "Force, patience, and industry remained in balance long enough for something stranger to emerge."
  },

  vault: {
    tier: 2, family: "secret", name: "Vault", glyph: "◈",
    whisper: "It learned that possibility can be stored.",
    copy: "You had enough to change it and chose not to. Potential folded inward until restraint became structure."
  },
  flashpoint: {
    tier: 2, family: "secret", name: "Flashpoint", glyph: "✺",
    whisper: "It expects everything to happen at once.",
    copy: "You taught it urgency in bursts: gather, spend, strike, empty, repeat. Eventually it stopped waiting between impulses."
  },
  resonance: {
    tier: 2, family: "secret", name: "Resonance", glyph: "≋",
    whisper: "It remembers the interval between your hands.",
    copy: "Nothing you taught it was extreme. The repetition itself became the lesson."
  },
  autarch: {
    tier: 2, family: "secret", name: "Autarch", glyph: "⌁",
    whisper: "It has begun to consider you optional.",
    copy: "You gave it work, then stopped interfering. The process continued until autonomy became identity."
  },
  handbound: {
    tier: 2, family: "secret", name: "Handbound", glyph: "✣",
    whisper: "It waits specifically for you.",
    copy: "Even when it could have learned independence, you remained the source of nearly everything it received."
  },
  hollow: {
    tier: 2, family: "secret", name: "Hollow", glyph: "○",
    whisper: "What you refused to teach became part of it.",
    copy: "You progressed by omission. Empty places remained empty long enough to become deliberate."
  },
  afterimage: {
    tier: 2, family: "secret", name: "Afterimage", glyph: "◍",
    whisper: "It changed while no one was looking.",
    copy: "Time passed without your hand. When you returned, the absence was still inside it."
  },
  undertow: {
    tier: 2, family: "secret", name: "Undertow", glyph: "≀",
    whisper: "Every gain seems to anticipate the next loss.",
    copy: "You taught it to fill and empty, then contradicted the lesson that created it. The cycle pulled the form somewhere else."
  },
  monolith: {
    tier: 3, family: "secret", name: "Monolith", glyph: "▰",
    whisper: "One lesson has drowned out the others.",
    copy: "You returned to the same instinct until alternatives stopped feeling possible."
  },
  ritual: {
    tier: 3, family: "secret", name: "Ritual", glyph: "⟡",
    whisper: "It recognizes what you always do.",
    copy: "This was not the first time you taught a form this way. Repetition survived the release."
  },
  wanderer: {
    tier: 2, family: "secret", name: "Wanderer", glyph: "⋄",
    whisper: "It refuses to become familiar.",
    copy: "You kept choosing unfamiliar paths. Variety itself became the only consistent thing about you."
  },
  palimpsest: {
    tier: 2, family: "secret", name: "Palimpsest", glyph: "⧉",
    whisper: "Something underneath this form remembers a different ending.",
    copy: "You repeated the beginning but not the result. Old outcomes remained beneath the new one like erased writing."
  }
};

const upgradeDefs = [
  {
    id: "pressure",
    name: "Apply Pressure",
    desc: "Strengthen active touches and build momentum while clicking.",
    baseCost: 24,
    max: 12,
    trait: "force"
  },
  {
    id: "reservoir",
    name: "Deepen the Reservoir",
    desc: "Grow stronger the longer you resist spending energy.",
    baseCost: 38,
    max: 12,
    trait: "patience"
  },
  {
    id: "pulse",
    name: "Teach a Pulse",
    desc: "Build autonomous production that compounds with each level.",
    baseCost: 50,
    max: 12,
    trait: "industry"
  }
];

const shapingLanguage = {
  origin: {
    pressure: ["Apply Pressure", "Strengthen active touches and build momentum while clicking."],
    reservoir: ["Deepen the Reservoir", "Grow stronger the longer you resist spending energy."],
    pulse: ["Teach a Pulse", "Build autonomous production that compounds with each level."]
  },
  ember: {
    pressure: ["Stoke", "Feed the heat. Rapid touches build stronger temporary momentum."],
    reservoir: ["Contain", "Hold energy without spending it and compress the heat inward."],
    pulse: ["Automate Combustion", "Teach the flame to keep burning when your hands stop."]
  },
  seed: {
    pressure: ["Break Soil", "Push harder through resistance. Active growth answers force."],
    reservoir: ["Deepen Roots", "The longer resources remain untouched, the deeper the roots reach."],
    pulse: ["Establish Rhythm", "Let growth continue on its own in repeating cycles."]
  },
  mechanism: {
    pressure: ["Increase Torque", "Active input builds rotational momentum."],
    reservoir: ["Store Charge", "Unused energy accumulates efficiency over time."],
    pulse: ["Add Process", "Each process strengthens the machine's autonomous output."]
  },
  convergence: {
    pressure: ["Intensify", "Push one instinct without fully surrendering the others."],
    reservoir: ["Center", "Stillness strengthens the balance."],
    pulse: ["Synchronize", "Let every system contribute to the same rhythm."]
  }
};

const behaviorDefaults = () => ({
  hoarding: 0,
  impulse: 0,
  bursts: 0,
  consistency: 0,
  specialization: 0,
  balance: 0,
  abstinence: 0,
  dormancy: 0,
  returning: 0,
  activeNeglect: 0,
  automationReliance: 0,
  manualReliance: 0,
  cycling: 0,
  deepSaving: 0,
  reversal: 0,
  minimalism: 0,
  overactivity: 0
});

const behaviorRuntimeDefaults = () => ({
  affordableSince: { pressure: 0, reservoir: 0, pulse: 0 },
  affordableLast: { pressure: false, reservoir: false, pulse: false },
  energyPeak: 0,
  purchases: 0,
  manualEnergy: 0,
  passiveEnergy: 0,
  burstEpisodes: 0
});

const historyDefaults = () => ({
  releases: [],
  repetition: 0,
  exploration: 0,
  misremember: 0
});

const freshState = () => ({
  energy: 0,
  lifetimeEnergy: 0,
  clicks: 0,
  lastClickAt: 0,
  lastActiveAt: Date.now(),
  lastSpendAt: Date.now(),
  startedAt: Date.now(),
  form: "formless",
  evolutionTier: 0,
  evolutionCount: 0,
  heat: 0,
  traits: { force: 0, patience: 0, industry: 0 },
  shapingTraits: { force: 0, patience: 0, industry: 0 },
  shapingStartedAt: 0,
  stageTraits: { force: 0, patience: 0, industry: 0 },
  upgrades: { pressure: 0, reservoir: 0, pulse: 0 },
  firstEvolutionUpgrades: { pressure: 0, reservoir: 0, pulse: 0 },
  behaviors: behaviorDefaults(),
  behaviorRuntime: behaviorRuntimeDefaults(),
  history: historyDefaults(),
  firstForm: "",
  discovered: ["formless"],
  discoveryMeta: {
    formless: { count: 1, firstAt: Date.now(), lastAt: Date.now() }
  },
  hintsSeen: {},
  settings: { sound: false },
  firstEvolutionEnergy: 0,
  firstEvolutionAt: 0,
  secondEvolutionEnergy: 0,
  secondEvolutionAt: 0,
  secondForm: "",
  lastSavedAt: Date.now()
});

let state = load();
let lastTick = performance.now();
let autosaveTimer = 0;
let lastUpgradeRenderKey = "";
let lastCodexRenderKey = "";
let transientWhisper = "";
let transientWhisperUntil = 0;
let pendingEvolution = null;
let teachingTimer = 0;
let releaseInProgress = false;
let audioContext = null;
let lastTouchSoundAt = 0;
let recentClickTimes = [];
let recentClickGaps = [];
let burstClickCount = 0;
let burstLastClickAt = 0;

const el = {
  energy: document.querySelector("#energy"),
  rateText: document.querySelector("#rateText"),
  mechanicText: document.querySelector("#mechanicText"),
  entity: document.querySelector("#entity"),
  floatLayer: document.querySelector("#floatLayer"),
  whisper: document.querySelector("#whisper"),
  formName: document.querySelector("#formName"),
  evolutionStatus: document.querySelector("#evolutionStatus"),
  evolutionSignal: document.querySelector("#evolutionSignal"),
  upgrades: document.querySelector("#upgrades"),
  codexList: document.querySelector("#codexList"),
  discoveryCount: document.querySelector("#discoveryCount"),
  overlay: document.querySelector("#evolutionOverlay"),
  evoGlyph: document.querySelector("#evolutionGlyph"),
  evoTitle: document.querySelector("#evolutionTitle"),
  evoCopy: document.querySelector("#evolutionCopy"),
  continueButton: document.querySelector("#continueButton"),
  soundButton: document.querySelector("#soundButton"),
  resetButton: document.querySelector("#resetButton"),
  shapingButton: document.querySelector("#shapingButton"),
  codexButton: document.querySelector("#codexButton"),
  shapingDrawer: document.querySelector("#shapingDrawer"),
  codexDrawer: document.querySelector("#codexDrawer"),
  shapingClose: document.querySelector("#shapingClose"),
  codexClose: document.querySelector("#codexClose"),
  drawerBackdrop: document.querySelector("#drawerBackdrop")
};

const debugMode =
  typeof location !== "undefined" &&
  new URLSearchParams(location.search).get("debug") === "1";

let debugPanel = null;
if (debugMode) {
  debugPanel = document.createElement("pre");
  debugPanel.className = "debug-panel";
  document.body.appendChild(debugPanel);
}

function setDrawer(name = "") {
  const active = name === "shaping" || name === "codex" ? name : "";

  if (active) document.body.dataset.drawer = active;
  else delete document.body.dataset.drawer;

  const shapingOpen = active === "shaping";
  const codexOpen = active === "codex";

  el.shapingButton.setAttribute("aria-expanded", shapingOpen ? "true" : "false");
  el.codexButton.setAttribute("aria-expanded", codexOpen ? "true" : "false");
  el.shapingDrawer.setAttribute("aria-hidden", shapingOpen ? "false" : "true");
  el.codexDrawer.setAttribute("aria-hidden", codexOpen ? "false" : "true");
  el.drawerBackdrop.hidden = !active;
}

function toggleDrawer(name) {
  const current = document.body.dataset.drawer || "";
  setDrawer(current === name ? "" : name);
}

function findSave() {
  const current = localStorage.getItem(SAVE_KEY);
  if (current) return current;

  for (const key of LEGACY_SAVE_KEYS) {
    const old = localStorage.getItem(key);
    if (old) return old;
  }

  return null;
}

function load() {
  try {
    const raw = findSave();
    if (!raw) return freshState();

    const parsed = JSON.parse(raw);
    const base = freshState();
    const legacyTier = parsed.evolutionTier ?? (parsed.evolved ? 1 : 0);

    const merged = {
      ...base,
      ...parsed,
      evolutionTier: legacyTier,
      evolutionCount: parsed.evolutionCount ?? legacyTier,
      firstEvolutionAt: parsed.firstEvolutionAt || 0,
      secondEvolutionEnergy: parsed.secondEvolutionEnergy || 0,
      secondEvolutionAt: parsed.secondEvolutionAt || 0,
      secondForm: parsed.secondForm || "",
      heat: Number.isFinite(parsed.heat) ? parsed.heat : 0,
      lastSpendAt: parsed.lastSpendAt || parsed.lastSavedAt || Date.now(),
      traits: { ...base.traits, ...(parsed.traits || {}) },
      shapingTraits: { ...base.shapingTraits, ...(parsed.shapingTraits || {}) },
      shapingStartedAt: parsed.shapingStartedAt || 0,
      stageTraits: { ...base.stageTraits, ...(parsed.stageTraits || {}) },
      upgrades: { ...base.upgrades, ...(parsed.upgrades || {}) },
      firstEvolutionUpgrades: {
        ...base.firstEvolutionUpgrades,
        ...(parsed.firstEvolutionUpgrades || {})
      },
      behaviors: { ...base.behaviors, ...(parsed.behaviors || {}) },
      behaviorRuntime: {
        ...base.behaviorRuntime,
        ...(parsed.behaviorRuntime || {}),
        affordableSince: {
          ...base.behaviorRuntime.affordableSince,
          ...(parsed.behaviorRuntime?.affordableSince || {})
        },
        affordableLast: {
          ...base.behaviorRuntime.affordableLast,
          ...(parsed.behaviorRuntime?.affordableLast || {})
        }
      },
      history: { ...base.history, ...(parsed.history || {}) },
      firstForm: parsed.firstForm || "",
      discovered: Array.from(new Set(["formless", ...(parsed.discovered || [])])),
      discoveryMeta: { ...base.discoveryMeta, ...(parsed.discoveryMeta || {}) },
      hintsSeen: { ...base.hintsSeen, ...(parsed.hintsSeen || {}) },
      settings: { ...base.settings, ...(parsed.settings || {}) }
    };

    merged.discovered.forEach(form => {
      if (!merged.discoveryMeta[form]) {
        merged.discoveryMeta[form] = { count: 1, firstAt: null, lastAt: null };
      }
    });

    if (legacyTier === 1 && !parsed.stageTraits) {
      merged.stageTraits = { force: 0, patience: 0, industry: 0 };
      merged.firstEvolutionEnergy = parsed.firstEvolutionEnergy || parsed.lifetimeEnergy || 0;
    }

    // Older saves do not know which Shape levels existed at Evolution I.
    // Snapshot the current levels so an in-progress legacy run is not
    // retroactively pushed toward a branch by old purchases.
    if (legacyTier === 1 && !parsed.firstEvolutionUpgrades) {
      merged.firstEvolutionUpgrades = { ...merged.upgrades };
    }

    if (merged.evolutionTier >= 2 && !merged.secondEvolutionAt) {
      merged.secondEvolutionEnergy = parsed.lifetimeEnergy || 0;
      merged.secondEvolutionAt = parsed.lastSavedAt || Date.now();
      merged.secondForm = parsed.form || "";
    }

    if (evolutions[merged.form]?.tier === 3 && merged.evolutionTier < 3) {
      merged.evolutionTier = 3;
    }

    const awaySeconds = Math.min(
      (Date.now() - (parsed.lastSavedAt || Date.now())) / 1000,
      60 * 60 * 8
    );

    merged.heat = Math.max(0, merged.heat - awaySeconds * heatDecayRate(merged));

    if (awaySeconds >= 1800) {
      const returnWeight = Math.min(12, Math.log2(awaySeconds / 900) * 2.2);
      merged.behaviors.dormancy = Math.min(100, merged.behaviors.dormancy + returnWeight);
      merged.behaviors.returning = Math.min(100, merged.behaviors.returning + 1);
    }

    if (awaySeconds > 10) {
      const rate = passiveGainFor(merged, Date.now());
      if (rate > 0) {
        const gained = rate * awaySeconds;
        merged.energy += gained;
        merged.lifetimeEnergy += gained;
        merged.behaviorRuntime.passiveEnergy += gained;
        addTrait("patience", Math.min(awaySeconds / 180, 20), merged);
        addTrait("industry", Math.min((awaySeconds / 300) * rate, 14), merged);
      }
    }

    return merged;
  } catch {
    return freshState();
  }
}

function save() {
  state.lastSavedAt = Date.now();
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function updateSoundButton() {
  if (!el.soundButton) return;
  const enabled = !!state.settings.sound;
  el.soundButton.textContent = enabled ? "Sound on" : "Sound off";
  el.soundButton.setAttribute("aria-pressed", enabled ? "true" : "false");
}

async function ensureAudio() {
  if (!state.settings.sound || typeof window === "undefined") return null;

  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return null;

  if (!audioContext) {
    audioContext = new AudioCtor();
  }

  if (audioContext.state !== "running") {
    try {
      await audioContext.resume();
    } catch {
      return null;
    }
  }

  return audioContext.state === "running" ? audioContext : null;
}

async function playTone(kind) {
  if (!state.settings.sound) return;

  if (kind === "touch") {
    const now = performance.now();
    if (now - lastTouchSoundAt < 70) return;
    lastTouchSoundAt = now;
  }

  const ctx = await ensureAudio();
  if (!ctx) return;

  // Keep the tones subtle, but high enough to survive small mobile speakers.
  const profiles = {
    touch: [420, 0.045, 0.035, "sine"],
    upgrade: [620, 0.14, 0.065, "triangle"],
    evolve: [520, 0.72, 0.095, "sine"],
    release: [280, 0.68, 0.075, "triangle"]
  };

  const [frequency, duration, volume, type] = profiles[kind] || profiles.touch;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const start = ctx.currentTime + 0.005;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);

  if (kind === "evolve") {
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.8, start + duration);
  } else if (kind === "release") {
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(80, frequency * .48), start + duration);
  }

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.04);
}

function reactToTeaching(id) {
  if (!el.entity) return;
  el.entity.dataset.teaching = id;
  clearTimeout(teachingTimer);
  teachingTimer = setTimeout(() => {
    delete el.entity.dataset.teaching;
  }, 700);
  playTone("upgrade");
}

function showBehaviorHint(key, text, duration = 3000) {
  if (state.hintsSeen[key]) return;
  state.hintsSeen[key] = true;
  transientWhisper = text;
  transientWhisperUntil = Date.now() + duration;
  save();
}

function maybeBehaviorHints() {
  if (!state.shapingStartedAt) return;

  const b = state.behaviors;

  if (b.hoarding >= 3) {
    showBehaviorHint("hidden-hoarding", "It noticed that you could have changed it.");
    return;
  }

  if (b.impulse >= 3) {
    showBehaviorHint("hidden-impulse", "It has learned how quickly you spend what you gather.");
    return;
  }

  if (b.bursts >= 3) {
    showBehaviorHint("hidden-bursts", "It waits for the next outburst.");
    return;
  }

  if (b.consistency >= 3) {
    showBehaviorHint("hidden-consistency", "It remembers the rhythm.");
    return;
  }

  if (b.abstinence >= 3) {
    showBehaviorHint("hidden-abstinence", "It notices what you refuse to teach.");
    return;
  }

  if (b.activeNeglect >= 3) {
    showBehaviorHint("hidden-neglect", "You left it alone, though you did not leave.");
    return;
  }

  if (b.dormancy >= 4) {
    showBehaviorHint("hidden-dormancy", "It remembers the time without you.");
    return;
  }

  if (b.cycling >= 2.2) {
    showBehaviorHint("hidden-cycling", "You keep emptying it.");
    return;
  }

  if (b.reversal >= 3) {
    showBehaviorHint("hidden-reversal", "It no longer trusts your first lesson.");
    return;
  }

  if (state.evolutionTier > 0) return;

  if (state.heat >= 38) {
    showBehaviorHint("force", "It notices when you rush it.");
    return;
  }

  if (upgradeLevel("reservoir") > 0 && reservoirCharge() >= .38) {
    showBehaviorHint("patience", "It is changing while you leave it undisturbed.");
    return;
  }

  if (
    upgradeLevel("pulse") >= 2 &&
    state.lastClickAt &&
    Date.now() - state.lastClickAt > 8000
  ) {
    showBehaviorHint("industry", "It continues even when your hand is gone.");
  }
}

function recordDiscovery(form) {
  const now = Date.now();

  if (!state.discovered.includes(form)) {
    state.discovered.push(form);
  }

  const existing = state.discoveryMeta[form];
  state.discoveryMeta[form] = {
    count: (existing?.count || 0) + 1,
    firstAt: existing?.firstAt || now,
    lastAt: now
  };

  lastCodexRenderKey = "";
}

function fmt(n) {
  if (n < 1000) return Math.floor(n).toLocaleString();

  const units = [["K", 1e3], ["M", 1e6], ["B", 1e9], ["T", 1e12], ["Qa", 1e15]];
  for (let i = units.length - 1; i >= 0; i--) {
    if (n >= units[i][1]) {
      return (n / units[i][1]).toFixed(n >= units[i][1] * 100 ? 0 : 1) + units[i][0];
    }
  }

  return Math.floor(n).toLocaleString();
}

function addTrait(trait, amount, target = state) {
  target.traits[trait] += amount;

  if (target.evolutionTier === 0 && target.shapingStartedAt) {
    target.shapingTraits[trait] += amount;
  }

  if (target.evolutionTier === 1) {
    target.stageTraits[trait] += amount;
  }
}

function upgradeLevel(id, target = state) {
  return Math.max(0, Number(target.upgrades[id] || 0));
}

function addBehavior(name, amount, target = state) {
  if (!target.behaviors || !(name in target.behaviors)) return;
  target.behaviors[name] = Math.max(0, Math.min(100, target.behaviors[name] + amount));
}

function nextUpgradeCost(id, target = state) {
  const def = upgradeDefs.find(item => item.id === id);
  if (!def) return Infinity;
  const level = Math.max(0, Number(target.upgrades[id] || 0));
  if (level >= def.max) return Infinity;
  return Math.floor(def.baseCost * Math.pow(1.62, level));
}

function affordableShapes(target = state) {
  return upgradeDefs.filter(def => {
    const level = upgradeLevel(def.id, target);
    return level < def.max && target.energy >= nextUpgradeCost(def.id, target);
  });
}

function totalUpgradeLevels(target = state) {
  return upgradeDefs.reduce((sum, def) => sum + upgradeLevel(def.id, target), 0);
}

function behaviorGenerationTotal(target = state) {
  return target.behaviorRuntime.manualEnergy + target.behaviorRuntime.passiveEnergy;
}

function updateRelianceSignals(target = state) {
  const total = behaviorGenerationTotal(target);
  if (total < 200) return;

  target.behaviors.manualReliance =
    Math.max(0, Math.min(100, (target.behaviorRuntime.manualEnergy / total) * 100));
  target.behaviors.automationReliance =
    Math.max(0, Math.min(100, (target.behaviorRuntime.passiveEnergy / total) * 100));
}

function stageDominantTrait(target = state) {
  const ranked = traitScores(target.stageTraits || { force: 0, patience: 0, industry: 0 });
  return ranked[0]?.[1] >= 8 ? ranked[0][0] : "";
}

function firstFormInstinct(target = state) {
  return {
    ember: "force",
    seed: "patience",
    mechanism: "industry"
  }[target.firstForm || target.form] || "";
}

function updateAffordabilitySignals(now = Date.now()) {
  upgradeDefs.forEach(def => {
    const affordable =
      upgradeLevel(def.id) < def.max &&
      state.energy >= nextUpgradeCost(def.id);

    const wasAffordable = !!state.behaviorRuntime.affordableLast[def.id];

    if (affordable && !wasAffordable) {
      state.behaviorRuntime.affordableSince[def.id] = now;
    } else if (!affordable) {
      state.behaviorRuntime.affordableSince[def.id] = 0;
    }

    state.behaviorRuntime.affordableLast[def.id] = affordable;
  });
}

function updateHiddenBehaviors(dt) {
  if (!state.shapingStartedAt) return;

  const affordable = affordableShapes();
  const affordableCount = affordable.length;
  const levels = upgradeDefs.map(def => upgradeLevel(def.id));
  const totalLevels = levels.reduce((sum, level) => sum + level, 0);
  const maxLevel = Math.max(...levels);
  const minLevel = Math.min(...levels);
  const spread = maxLevel - minLevel;

  // Hoarding only exists when the player is actively refusing real choices.
  if (affordableCount >= 2) {
    addBehavior("hoarding", dt * (affordableCount === 3 ? .055 : .04));

    const nextCosts = affordable.map(def => nextUpgradeCost(def.id));
    const deepThreshold = Math.max(...nextCosts) * 5;
    if (state.energy >= deepThreshold) {
      addBehavior("deepSaving", dt * .035);
    }
  }

  if (totalLevels >= 5) {
    if (spread >= 4 && maxLevel / Math.max(1, totalLevels) >= .62) {
      addBehavior("specialization", dt * .025);
    }

    if (spread <= 1) {
      addBehavior("balance", dt * .024);
    }

    const untouchedAffordable = upgradeDefs.some(def =>
      upgradeLevel(def.id) === 0 &&
      state.energy >= nextUpgradeCost(def.id)
    );

    if (minLevel === 0 && untouchedAffordable) {
      addBehavior("abstinence", dt * .023);
    }
  }

  const inactiveFor = (Date.now() - state.lastActiveAt) / 1000;
  if (
    typeof document !== "undefined" &&
    !document.hidden &&
    inactiveFor >= 18 &&
    affordableCount >= 2
  ) {
    addBehavior("activeNeglect", dt * .04);
  }

  const runSeconds = (Date.now() - state.startedAt) / 1000;
  if (
    runSeconds >= 150 &&
    state.behaviorRuntime.purchases <= 2 &&
    state.clicks <= 55 &&
    state.lifetimeEnergy >= 900
  ) {
    addBehavior("minimalism", dt * .025);
  }

  if (state.evolutionTier === 1) {
    const origin = firstFormInstinct();
    const current = stageDominantTrait();
    if (origin && current && origin !== current) {
      addBehavior("reversal", dt * .03);
    }
  }

  updateRelianceSignals();
}

function finalizeBurstEpisode() {
  // A burst is intentionally a short attack followed by a real pause.
  // One enormous uninterrupted spam session is sustained pressure, not bursting.
  if (burstClickCount >= 7 && burstClickCount <= 45) {
    state.behaviorRuntime.burstEpisodes += 1;
    addBehavior("bursts", 1);
  }

  burstClickCount = 0;
}

function recordClickBehavior(gap, now) {
  recentClickTimes.push(now);
  recentClickTimes = recentClickTimes.filter(time => now - time <= 60000);

  if (recentClickTimes.length >= 110) {
    addBehavior("overactivity", .06);
  }

  if (gap >= 1200) {
    // Credit the previous burst only when the player actually returns after
    // the pause. Merely stopping a long clicking session is not a burst pattern.
    finalizeBurstEpisode();
    burstClickCount = 1;
  } else if (gap < 280) {
    burstClickCount += 1;
  } else {
    // A short hesitation breaks the rapid cluster without creating a
    // burst episode.
    burstClickCount = 1;
  }

  burstLastClickAt = now;

  if (gap >= 250 && gap <= 2500) {
    recentClickGaps.push(gap);
    if (recentClickGaps.length > 18) recentClickGaps.shift();

    if (recentClickGaps.length >= 10) {
      const mean = recentClickGaps.reduce((a, b) => a + b, 0) / recentClickGaps.length;
      const variance =
        recentClickGaps.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
        recentClickGaps.length;
      const cv = Math.sqrt(variance) / Math.max(1, mean);

      if (cv <= .16) addBehavior("consistency", .12);
    }
  }
}

function recordPurchaseBehavior(id, cost, beforeEnergy, now) {
  const affordableSince = state.behaviorRuntime.affordableSince[id] || 0;
  if (affordableSince) {
    const reactionSeconds = (now - affordableSince) / 1000;
    if (reactionSeconds <= 5) addBehavior("impulse", 1.3);
    else if (reactionSeconds <= 10) addBehavior("impulse", .65);
  }

  const afterEnergy = beforeEnergy - cost;
  state.behaviorRuntime.energyPeak = Math.max(
    state.behaviorRuntime.energyPeak,
    beforeEnergy
  );

  if (
    beforeEnergy >= Math.max(100, cost * 1.35) &&
    afterEnergy <= beforeEnergy * .35
  ) {
    addBehavior("cycling", 1.1);
  }

  state.behaviorRuntime.purchases += 1;
}

function recordRunHistory() {
  if (state.evolutionTier <= 0) return;

  const entry = {
    firstForm: state.firstForm || (state.evolutionTier >= 1 ? state.form : ""),
    finalForm: state.form,
    tier: state.evolutionTier,
    at: Date.now()
  };

  const releases = state.history.releases || [];
  const previous = releases[releases.length - 1];
  const seenFinalBefore = releases.some(item => item.finalForm === entry.finalForm);

  if (previous) {
    if (previous.finalForm === entry.finalForm) {
      state.history.repetition += 1.5;
    } else {
      state.history.exploration += seenFinalBefore ? .6 : 1.25;
    }

    if (previous.firstForm === entry.firstForm) {
      state.history.repetition += .4;
      if (previous.finalForm !== entry.finalForm) {
        state.history.misremember += 1;
      }
    }
  } else {
    state.history.exploration += 1;
  }

  state.history.releases = [...releases, entry].slice(-16);
}

function pressureBase(target = state) {
  const level = upgradeLevel("pressure", target);
  return 1 + level * 0.75;
}

function pulseBase(target = state) {
  const level = upgradeLevel("pulse", target);
  if (level <= 0) return 0;
  return 0.45 * Math.pow(level, 1.55);
}

function reservoirBase(target = state) {
  return upgradeLevel("reservoir", target) * 0.08;
}

function formGroup(form = state.form) {
  if (["ember", "inferno", "core", "furnace"].includes(form)) return "ember";
  if (["seed", "grove", "briar", "cultivator"].includes(form)) return "seed";
  if (["mechanism", "engine", "press", "clockwork"].includes(form)) return "mechanism";
  if (form === "convergence") return "convergence";
  if (evolutions[form]?.family === "secret") return "convergence";
  return "origin";
}

function heatDecayRate(target = state) {
  if (target.form === "inferno") return 8;
  if (target.form === "briar" || target.form === "press") return 10;
  return 14;
}

function heatBuildAmount(gap, target = state) {
  const level = upgradeLevel("pressure", target);
  if (level <= 0) return 0;

  let amount = 2.5 + level * 0.45;
  if (gap < 450) amount *= 1.45;
  if (target.form === "inferno") amount *= 1.4;
  if (target.form === "press") amount *= 1.25;

  return amount;
}

function heatMultiplier(target = state) {
  const level = upgradeLevel("pressure", target);
  if (level <= 0) return 1;

  let ceiling = 0.25 + level * 0.018;
  if (target.form === "inferno") ceiling += 0.18;
  if (target.form === "press") ceiling += 0.12;
  if (target.form === "briar") ceiling += 0.06;

  return 1 + (Math.min(100, target.heat) / 100) * ceiling;
}

function reservoirCharge(target = state, now = Date.now()) {
  const level = upgradeLevel("reservoir", target);
  if (level <= 0) return 0;

  let secondsToFull = 300;
  if (target.form === "core") secondsToFull = 210;
  if (target.form === "grove") secondsToFull = 180;
  if (target.form === "clockwork") secondsToFull = 240;

  const elapsed = Math.max(0, (now - (target.lastSpendAt || now)) / 1000);
  return Math.min(1, elapsed / secondsToFull);
}

function reservoirMultiplier(target = state, now = Date.now()) {
  const level = upgradeLevel("reservoir", target);
  if (level <= 0) return 1;

  const charge = reservoirCharge(target, now);
  let permanent = level * 0.025;
  let charged = charge * (0.22 + level * 0.045);

  if (target.form === "core") charged *= 1.25;
  if (target.form === "grove") charged *= 1.35;
  if (target.form === "clockwork") permanent += 0.08;

  return 1 + permanent + charged;
}

function formClickMultiplier(target = state) {
  return {
    ember: 1.05,
    inferno: 1.12,
    core: 1.03,
    furnace: 1.03,
    briar: 1.08,
    press: 1.12,
    convergence: 1.06
  }[target.form] || 1;
}

function formPassiveMultiplier(target = state) {
  return {
    seed: 1.12,
    grove: 1.28,
    cultivator: 1.22,
    mechanism: 1.15,
    engine: 1.5,
    clockwork: 1.28,
    furnace: 1.22,
    convergence: 1.16
  }[target.form] || 1;
}

function clickGainFor(target = state) {
  return pressureBase(target) * heatMultiplier(target) * formClickMultiplier(target);
}

function clickGain() {
  return clickGainFor(state);
}

function passiveGainFor(target = state, now = Date.now()) {
  let base = pulseBase(target) + reservoirBase(target);
  if (base <= 0) return 0;

  let result = base * reservoirMultiplier(target, now) * formPassiveMultiplier(target);

  if (target.form === "furnace") {
    result *= 1 + (Math.min(100, target.heat) / 100) * 0.55;
  }

  if (target.form === "cultivator") {
    const p = upgradeLevel("pulse", target);
    const r = upgradeLevel("reservoir", target);
    result *= 1 + Math.min(p, r) * 0.025;
  }

  if (target.form === "convergence") {
    const levels = [
      upgradeLevel("pressure", target),
      upgradeLevel("reservoir", target),
      upgradeLevel("pulse", target)
    ];
    const spread = Math.max(...levels) - Math.min(...levels);
    if (spread <= 2) result *= 1.18;
  }

  return result;
}

function passiveGain() {
  return passiveGainFor(state, Date.now());
}

function onEntityClick(event) {
  if (releaseInProgress) return;

  const now = Date.now();
  const gap = state.lastClickAt ? now - state.lastClickAt : 1000;
  const gain = clickGain();

  state.energy += gain;
  state.lifetimeEnergy += gain;
  state.behaviorRuntime.manualEnergy += gain;
  state.behaviorRuntime.energyPeak = Math.max(state.behaviorRuntime.energyPeak, state.energy);
  state.clicks += 1;
  state.lastActiveAt = now;
  state.heat = Math.min(100, state.heat + heatBuildAmount(gap));

  // Ordinary clicking is neutral. Only distinctive behavior should shape evolution.
  if (gap < 325) addTrait("force", 0.12);
  else if (gap > 1600) addTrait("patience", 0.06);

  recordClickBehavior(gap, now);
  state.lastClickAt = now;
  playTone("touch");
  spawnFloat(event, gain);
  considerEvolution();
  render();
}

function spawnFloat(event, gain) {
  const node = document.createElement("span");
  node.className = "float-number";
  node.textContent = "+" + Math.max(1, Number(gain.toFixed(1)));
  node.style.setProperty("--drift", (Math.random() * 38 - 19) + "px");

  const rect = el.floatLayer.getBoundingClientRect();
  node.style.left = ((event.clientX || rect.left + rect.width / 2) - rect.left) + "px";
  node.style.top = ((event.clientY || rect.top + rect.height / 2) - rect.top) + "px";
  el.floatLayer.appendChild(node);
  setTimeout(() => node.remove(), 850);
}

function upgradeCost(def) {
  const level = upgradeLevel(def.id);
  return Math.floor(def.baseCost * Math.pow(1.62, level));
}

function buyUpgrade(id) {
  if (releaseInProgress) return;

  const def = upgradeDefs.find(x => x.id === id);
  if (!def) return;

  const level = upgradeLevel(id);
  const cost = upgradeCost(def);

  if (level >= def.max) return;

  if (state.energy < cost) {
    const missing = Math.max(1, Math.ceil(cost - state.energy));
    transientWhisper = "It needs " + fmt(missing) + " more energy before it can learn that.";
    transientWhisperUntil = Date.now() + 1800;
    render();
    return;
  }

  const beforeEnergy = state.energy;
  const purchaseTime = Date.now();
  recordPurchaseBehavior(id, cost, beforeEnergy, purchaseTime);

  state.energy -= cost;

  if (!state.shapingStartedAt && state.evolutionTier === 0) {
    state.shapingStartedAt = Date.now();
    state.shapingTraits = { force: 0, patience: 0, industry: 0 };
  }

  state.upgrades[id] = level + 1;
  state.lastSpendAt = purchaseTime;
  state.lastActiveAt = purchaseTime;

  addTrait(def.trait, 4 + level * 0.45);
  if (def.trait === "industry") addTrait("industry", 1.6);

  reactToTeaching(id);
  lastUpgradeRenderKey = "";
  considerEvolution();
  render();
  save();
}

function traitScores(source) {
  return [
    ["force", source.force],
    ["patience", source.patience],
    ["industry", source.industry]
  ].sort((a, b) => b[1] - a[1]);
}

function clearPendingEvolution(tier) {
  if (pendingEvolution?.tier === tier) pendingEvolution = null;
}

function queueEvolution(form, tier) {
  if (!form) {
    clearPendingEvolution(tier);
    return;
  }

  if (pendingEvolution?.form === form && pendingEvolution?.tier === tier) return;

  pendingEvolution = {
    form,
    tier,
    startedAt: Date.now()
  };

  transientWhisper = "Something inside it is rearranging itself.";
  transientWhisperUntil = Date.now() + 5200;
}

function advancePendingEvolution() {
  if (!pendingEvolution) return;
  if (Date.now() - pendingEvolution.startedAt < 4500) return;

  const next = pendingEvolution;
  pendingEvolution = null;
  evolve(next.form, next.tier);
}

function considerEvolution() {
  if (state.evolutionTier === 0) considerFirstEvolution();
  else if (state.evolutionTier === 1) considerSecondEvolution();
  else if (state.evolutionTier === 2) considerThirdEvolution();
}

function considerFirstEvolution() {
  // Give the player enough time to establish an actual play style before
  // deciding what the Formless becomes.
  if (state.lifetimeEnergy < 420) {
    clearPendingEvolution(1);
    return;
  }

  const pressure = upgradeLevel("pressure");
  const reservoir = upgradeLevel("reservoir");
  const pulse = upgradeLevel("pulse");

  // Shaping choices matter more than the unavoidable act of clicking.
  // Behavior still nudges the result, but doesn't decide it by itself.
  if (!state.shapingStartedAt) {
    clearPendingEvolution(1);
    return;
  }

  const shaping = state.shapingTraits;

  const scores = [
    ["ember", pressure * 4.5 + Math.min(shaping.force, 6) * 0.8],
    [
      "seed",
      reservoir * 4.5 +
      Math.min(shaping.patience, 6) * 0.9 +
      Math.min(state.energy / 180, 2)
    ],
    [
      "mechanism",
      pulse * 4.5 +
      Math.min(shaping.industry, 6) * 0.9
    ]
  ].sort((a, b) => b[1] - a[1]);

  const lead = scores[0][1] - scores[1][1];

  if (scores[0][1] < 10) {
    clearPendingEvolution(1);
    return;
  }

  // Ambiguity can delay the first evolution, but it should never trap a
  // player in Formless indefinitely. The longer the run remains unresolved,
  // the less separation the leading instinct needs.
  let requiredLead = 1.75;
  if (state.lifetimeEnergy >= 900) requiredLead = 0.75;
  if (state.lifetimeEnergy >= 1500) requiredLead = 0;

  if (lead < requiredLead) {
    clearPendingEvolution(1);
    return;
  }

  queueEvolution(scores[0][0], 1);
}

function upgradeDeltaSinceFirst(id, target = state) {
  const before = Number(target.firstEvolutionUpgrades?.[id] || 0);
  return Math.max(0, upgradeLevel(id, target) - before);
}

function secondEvolutionScores(target = state) {
  const stage = target.stageTraits || { force: 0, patience: 0, industry: 0 };

  const pressureDelta = upgradeDeltaSinceFirst("pressure", target);
  const reservoirDelta = upgradeDeltaSinceFirst("reservoir", target);
  const pulseDelta = upgradeDeltaSinceFirst("pulse", target);

  // Visible post-evolution teaching is the primary signal. Raw behavior is
  // deliberately capped so necessary clicking cannot overwhelm the player's
  // actual Shape choices.
  return {
    force:
      pressureDelta * 6 +
      Math.min(stage.force, 12) * .35,
    patience:
      reservoirDelta * 6 +
      Math.min(stage.patience, 12) * .45 +
      reservoirCharge(target) * 1.5,
    industry:
      pulseDelta * 6 +
      Math.min(stage.industry, 12) * .45 +
      Math.min(1.5, (target.behaviors?.automationReliance || 0) / 70)
  };
}

function normalSecondEvolutionCandidate(target = state) {
  const scores = secondEvolutionScores(target);
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const highest = ranked[0][1];
  const lowest = ranked[2][1];
  const spread = highest - lowest;

  if (highest < 18) return "";

  if (lowest >= 12 && spread <= 5) {
    return "convergence";
  }

  const branches = {
    ember: { force: "inferno", patience: "core", industry: "furnace" },
    seed: { force: "briar", patience: "grove", industry: "cultivator" },
    mechanism: { force: "press", patience: "clockwork", industry: "engine" }
  };

  return branches[target.form]?.[ranked[0][0]] || "";
}

function secretEvolutionCandidate() {
  const b = state.behaviors;
  const h = state.history;
  const levels = {
    pressure: upgradeLevel("pressure"),
    reservoir: upgradeLevel("reservoir"),
    pulse: upgradeLevel("pulse")
  };
  const totalLevels = levels.pressure + levels.reservoir + levels.pulse;
  const maxLevel = Math.max(levels.pressure, levels.reservoir, levels.pulse);

  const sortedLevels = Object.values(levels).sort((a, b) => b - a);
  const extremeSinglePath =
    sortedLevels[0] >= 10 &&
    sortedLevels[1] <= 1 &&
    sortedLevels[2] === 0;

  if (h.misremember >= 2.5 && b.reversal >= 7) return "palimpsest";
  if (h.exploration >= 5 && b.balance >= 6) return "wanderer";
  if (b.dormancy >= 9 && b.returning >= 2) return "afterimage";
  if (b.hoarding >= 8 && b.deepSaving >= 5 && levels.reservoir >= 4) return "vault";

  // Flashpoint is repeated attack-pause-attack play, not ordinary sustained
  // spam clicking. Several genuine burst episodes must occur in the same run.
  if (
    b.impulse >= 6 &&
    state.behaviorRuntime.burstEpisodes >= 4 &&
    b.cycling >= 3
  ) return "flashpoint";

  if (b.consistency >= 6 && b.balance >= 5) return "resonance";
  if (b.automationReliance >= 84 && b.activeNeglect >= 6 && levels.pulse >= 5) return "autarch";
  if (b.manualReliance >= 94 && b.abstinence >= 6 && levels.pulse === 0) return "handbound";
  if (
    b.minimalism >= 5 &&
    state.behaviorRuntime.purchases <= 2 &&
    totalLevels <= 2
  ) return "hollow";
  if (b.cycling >= 5 && b.reversal >= 6) return "undertow";

  return "";
}

function thirdEvolutionCandidate() {
  const b = state.behaviors;
  const h = state.history;
  const levels = [
    upgradeLevel("pressure"),
    upgradeLevel("reservoir"),
    upgradeLevel("pulse")
  ].sort((a, b) => b - a);

  const extremeSinglePath =
    levels[0] >= 11 &&
    levels[1] <= 1 &&
    levels[2] === 0;

  // Monolith is the end-state of extreme single-path specialization.
  if (
    extremeSinglePath &&
    b.specialization >= 14 &&
    b.abstinence >= 10
  ) return "monolith";

  // Ritual is specialization repeated strongly enough across separate runs
  // that the behavior survives release.
  if (
    h.repetition >= 5 &&
    b.specialization >= 11
  ) return "ritual";

  return "";
}

function considerSecondEvolution() {
  const gainedSinceFirst = state.lifetimeEnergy - state.firstEvolutionEnergy;
  const maturedFor = state.firstEvolutionAt
    ? (Date.now() - state.firstEvolutionAt) / 1000
    : 0;

  if (gainedSinceFirst < 3200 || maturedFor < 240) {
    clearPendingEvolution(2);
    return;
  }

  const normal = normalSecondEvolutionCandidate();
  if (!normal) {
    clearPendingEvolution(2);
    return;
  }

  // Secrets are allowed to replace a normal branch only after the player has
  // also established enough visible post-evolution direction to evolve at all.
  const secret = secretEvolutionCandidate();
  queueEvolution(secret || normal, 2);
}

function considerThirdEvolution() {
  const gainedSinceSecond = state.lifetimeEnergy - state.secondEvolutionEnergy;
  const maturedFor = state.secondEvolutionAt
    ? (Date.now() - state.secondEvolutionAt) / 1000
    : 0;

  // Tier III should feel like an end-state, not something that immediately
  // follows the second evolution.
  if (gainedSinceSecond < 7500 || maturedFor < 300) {
    clearPendingEvolution(3);
    return;
  }

  const next = thirdEvolutionCandidate();
  if (next) queueEvolution(next, 3);
  else clearPendingEvolution(3);
}

function resetStageBehavior() {
  state.behaviors = behaviorDefaults();
  state.behaviorRuntime = behaviorRuntimeDefaults();

  recentClickTimes = [];
  recentClickGaps = [];
  burstClickCount = 0;
  burstLastClickAt = 0;
}

function evolve(form, tier) {
  state.form = form;
  state.evolutionTier = tier;
  state.evolutionCount += 1;

  if (tier === 1) {
    state.firstForm = form;
    state.firstEvolutionEnergy = state.lifetimeEnergy;
    state.firstEvolutionAt = Date.now();
    state.firstEvolutionUpgrades = { ...state.upgrades };
    state.stageTraits = { force: 0, patience: 0, industry: 0 };
    state.shapingTraits = { force: 0, patience: 0, industry: 0 };

    // Tier II should respond to what the player does after becoming a first
    // form, not hidden behavior accumulated while they were still Formless.
    resetStageBehavior();
  }

  if (tier === 2) {
    state.secondForm = form;
    state.secondEvolutionEnergy = state.lifetimeEnergy;
    state.secondEvolutionAt = Date.now();

    // Evolution III specialization is likewise earned after Tier II.
    resetStageBehavior();
  }

  recordDiscovery(form);

  lastUpgradeRenderKey = "";

  const evo = evolutions[form];
  el.evoGlyph.textContent = evo.glyph;
  el.evoTitle.textContent = evo.name;
  el.evoCopy.textContent = evo.copy;
  el.overlay.hidden = false;
  playTone("evolve");

  save();
  render();
}

function shapingFor(def) {
  const group = formGroup();
  return shapingLanguage[group]?.[def.id] || [def.name, def.desc];
}

function renderUpgrades() {
  const group = formGroup();
  const key = upgradeDefs.map(def => {
    const level = upgradeLevel(def.id);
    const cost = upgradeCost(def);
    const affordable = state.energy >= cost ? 1 : 0;
    return def.id + ":" + level + ":" + affordable + ":" + group;
  }).join("|");

  if (key === lastUpgradeRenderKey) return;
  lastUpgradeRenderKey = key;
  el.upgrades.innerHTML = "";

  upgradeDefs.forEach(def => {
    const level = upgradeLevel(def.id);
    const cost = upgradeCost(def);
    const affordable = state.energy >= cost;
    const button = document.createElement("button");
    const language = shapingFor(def);

    button.className = "upgrade" +
      (!affordable && level < def.max ? " locked" : "") +
      (level >= def.max ? " maxed" : "");

    button.disabled = level >= def.max;
    button.innerHTML = `
      <span class="upgrade-name">${language[0]} <small>· ${level}/${def.max}</small></span>
      <span class="upgrade-desc">${language[1]}</span>
      <span class="upgrade-cost">${level >= def.max ? "Complete" : fmt(cost) + " energy"}</span>
    `;

    button.addEventListener("click", () => buyUpgrade(def.id));
    el.upgrades.appendChild(button);
  });
}

function codexOrder() {
  return [
    "formless",
    "ember", "seed", "mechanism",
    "inferno", "core", "furnace",
    "grove", "briar", "cultivator",
    "engine", "press", "clockwork",
    "convergence",
    "vault", "flashpoint", "resonance", "autarch",
    "handbound", "hollow", "afterimage", "undertow",
    "wanderer", "palimpsest",
    "monolith", "ritual"
  ];
}

function formatDiscoveryDate(timestamp) {
  if (!timestamp) return "from an earlier run";
  try {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch {
    return "from an earlier run";
  }
}

function renderCodex() {
  const renderKey =
    state.discovered.slice().sort().join("|") + "|" +
    Object.entries(state.discoveryMeta)
      .map(([key, value]) => key + ":" + (value?.count || 0))
      .sort()
      .join("|");
  if (renderKey === lastCodexRenderKey) return;

  lastCodexRenderKey = renderKey;
  el.codexList.innerHTML = "";

  codexOrder().forEach(key => {
    const evo = evolutions[key];
    const known = state.discovered.includes(key);
    const entry = document.createElement("div");

    entry.className = "codex-entry tier-" + evo.tier + (known ? " discovered" : "");

    if (known) {
      const meta = state.discoveryMeta[key] || {};
      const reached = Math.max(1, meta.count || 1);
      const lore = evo.whisper || "It left an impression.";

      entry.innerHTML = `
        <span class="codex-glyph">${evo.glyph}</span>
        <span>
          <strong>${evo.name}</strong>
          <small>${evo.tier === 0 ? "Origin" : "Evolution " + evo.tier}</small>
          <span class="codex-meta">
            <span class="codex-lore">${lore}</span>
            <span class="codex-history">${reached} ${reached === 1 ? "time" : "times"} reached · ${formatDiscoveryDate(meta.firstAt)}</span>
          </span>
        </span>
      `;
    } else {
      entry.innerHTML = `
        <span class="codex-glyph unknown">?</span>
        <span><strong>Undiscovered</strong><small>Evolution ${evo.tier}</small></span>
      `;
    }

    el.codexList.appendChild(entry);
  });

  el.discoveryCount.textContent = state.discovered.length + " / " + codexOrder().length + " discovered";
}

function firstEvolutionScores(target = state) {
  const pressure = upgradeLevel("pressure", target);
  const reservoir = upgradeLevel("reservoir", target);
  const pulse = upgradeLevel("pulse", target);
  const shaping = target.shapingTraits || { force: 0, patience: 0, industry: 0 };

  return [
    ["ember", pressure * 4.5 + Math.min(shaping.force, 6) * .8],
    [
      "seed",
      reservoir * 4.5 +
      Math.min(shaping.patience, 6) * .9 +
      Math.min(target.energy / 180, 2)
    ],
    [
      "mechanism",
      pulse * 4.5 +
      Math.min(shaping.industry, 6) * .9
    ]
  ].sort((a, b) => b[1] - a[1]);
}

function evolutionReadiness() {
  if (pendingEvolution) {
    return {
      level: 4,
      status: "changing",
      whisper: "Something inside it is rearranging itself."
    };
  }

  if (state.evolutionTier === 0) {
    if (!state.shapingStartedAt) {
      return {
        level: state.lifetimeEnergy >= 180 ? 1 : 0,
        status: state.lifetimeEnergy >= 180 ? "stirring" : "faint",
        whisper: state.lifetimeEnergy >= 180
          ? "It is listening. Teach it something."
          : "Something faint is beginning to answer."
      };
    }

    const progress = Math.min(1, state.lifetimeEnergy / 420);
    const scores = firstEvolutionScores();
    const lead = scores[0][1] - scores[1][1];

    let requiredLead = 1.75;
    if (state.lifetimeEnergy >= 900) requiredLead = .75;
    if (state.lifetimeEnergy >= 1500) requiredLead = 0;

    if (progress < .35) {
      return {
        level: 1,
        status: "stirring",
        whisper: "Its first instincts are beginning to wake."
      };
    }

    if (progress < .7) {
      return {
        level: 2,
        status: "gathering",
        whisper: "Your habits are beginning to leave a shape behind."
      };
    }

    if (progress < 1) {
      return {
        level: 3,
        status: "forming",
        whisper: "A first shape is gathering beneath the surface."
      };
    }

    if (scores[0][1] < 10) {
      return {
        level: 3,
        status: "waiting",
        whisper: "It has gathered enough, but your lesson is still too faint."
      };
    }

    if (lead < requiredLead) {
      return {
        level: 3,
        status: "divided",
        whisper: "It is pulled between competing instincts."
      };
    }

    return {
      level: 4,
      status: "near",
      whisper: "The first shape is almost impossible to hide."
    };
  }

  if (state.evolutionTier === 1) {
    const gained = Math.max(0, state.lifetimeEnergy - state.firstEvolutionEnergy);
    const energyProgress = Math.min(1, gained / 3200);
    const maturedFor = state.firstEvolutionAt
      ? (Date.now() - state.firstEvolutionAt) / 1000
      : 0;
    const timeProgress = Math.min(1, maturedFor / 240);
    const progress = Math.min(energyProgress, timeProgress);

    if (progress < .3) {
      return {
        level: 1,
        status: "faint",
        whisper: "This form is still young. What you do now will matter later."
      };
    }

    if (progress < .65) {
      return {
        level: 2,
        status: "stirring",
        whisper: "It is learning which parts of this form should survive."
      };
    }

    if (progress < 1) {
      if (energyProgress >= 1 && timeProgress < 1) {
        return {
          level: 3,
          status: "settling",
          whisper: "It has strength, but this form has not lived long enough."
        };
      }

      if (timeProgress >= 1 && energyProgress < 1) {
        return {
          level: 3,
          status: "gathering",
          whisper: "The form has settled. It still needs more experience."
        };
      }

      return {
        level: 3,
        status: "forming",
        whisper: "Another change is beginning to gather."
      };
    }

    if (!normalSecondEvolutionCandidate()) {
      return {
        level: 3,
        status: "unresolved",
        whisper: "It is ready to change, but your lesson is still divided."
      };
    }

    return {
      level: 4,
      status: "near",
      whisper: "Something beyond this form is pressing closer."
    };
  }

  if (state.evolutionTier === 2) {
    const gained = Math.max(0, state.lifetimeEnergy - state.secondEvolutionEnergy);
    const energyProgress = Math.min(1, gained / 7500);
    const maturedFor = state.secondEvolutionAt
      ? (Date.now() - state.secondEvolutionAt) / 1000
      : 0;
    const timeProgress = Math.min(1, maturedFor / 300);
    const progress = Math.min(energyProgress, timeProgress);

    if (progress < .3) {
      return {
        level: 1,
        status: "faint",
        whisper: "This form may still have somewhere further to go."
      };
    }

    if (progress < .65) {
      return {
        level: 2,
        status: "deepening",
        whisper: "Its identity is becoming harder to undo."
      };
    }

    if (progress < 1) {
      if (energyProgress >= 1 && timeProgress < 1) {
        return {
          level: 3,
          status: "settling",
          whisper: "There is enough power here, but not enough history yet."
        };
      }

      if (timeProgress >= 1 && energyProgress < 1) {
        return {
          level: 3,
          status: "gathering",
          whisper: "It has become itself. Something more still needs to accumulate."
        };
      }

      return {
        level: 3,
        status: "forming",
        whisper: "Something final is beginning to gather around it."
      };
    }

    if (!thirdEvolutionCandidate()) {
      return {
        level: 3,
        status: "dormant",
        whisper: "It could go further, but nothing about this path is extreme enough yet."
      };
    }

    return {
      level: 4,
      status: "near",
      whisper: "This identity is beginning to harden into something final."
    };
  }

  return {
    level: 4,
    status: "complete",
    whisper: evolutions[state.form]?.whisper || "It has become something difficult to change."
  };
}

function evolutionStatusText(readiness = evolutionReadiness()) {
  const nextTier = Math.min(3, state.evolutionTier + 1);
  const labels = { 1: "First evolution", 2: "Second evolution", 3: "Third evolution" };

  if (state.evolutionTier >= 3) {
    return "Evolution III · " + evolutions[state.form].name;
  }

  return labels[nextTier] + " · " + readiness.status;
}

function mechanicStatusText() {
  const parts = [];
  const pressure = upgradeLevel("pressure");
  const reservoir = upgradeLevel("reservoir");
  const pulse = upgradeLevel("pulse");

  if (pressure > 0 && state.heat >= 12) {
    parts.push(state.heat >= 72 ? "blazing" : state.heat >= 38 ? "heated" : "warming");
  }

  if (reservoir > 0) {
    const charge = reservoirCharge();
    if (charge >= .75) parts.push("deeply held");
    else if (charge >= .3) parts.push("settling");
  }

  if (pulse > 0) {
    parts.push(pulse >= 8 ? "strong pulse" : pulse >= 4 ? "steady pulse" : "faint pulse");
  }

  return parts.join("  ·  ");
}

function renderDebug() {
  if (!debugPanel) return;

  const p = upgradeLevel("pressure");
  const r = upgradeLevel("reservoir");
  const u = upgradeLevel("pulse");
  const shaping = state.shapingTraits;
  const firstScores = {
    ember: p * 4.5 + Math.min(shaping.force, 6) * .8,
    seed: r * 4.5 + Math.min(shaping.patience, 6) * .9 + Math.min(state.energy / 180, 2),
    mechanism: u * 4.5 + Math.min(shaping.industry, 6) * .9
  };

  debugPanel.textContent = [
    "FORMLESS DEBUG",
    "form: " + state.form + " / tier " + state.evolutionTier,
    "energy: " + state.energy.toFixed(2),
    "lifetime: " + state.lifetimeEnergy.toFixed(2),
    "upgrades: P" + p + " R" + r + " U" + u,
    "heat: " + state.heat.toFixed(1),
    "reserve charge: " + (reservoirCharge() * 100).toFixed(1) + "%",
    "passive: " + passiveGain().toFixed(3) + "/s",
    "traits: " + JSON.stringify(state.traits),
    "shaping: " + JSON.stringify(state.shapingTraits),
    "stage: " + JSON.stringify(state.stageTraits),
    "tier I upgrade snapshot: " + JSON.stringify(state.firstEvolutionUpgrades),
    "tier II scores: " + JSON.stringify(
      Object.fromEntries(
        Object.entries(secondEvolutionScores()).map(([key, value]) => [key, Number(value.toFixed(2))])
      )
    ),
    "normal tier II: " + (normalSecondEvolutionCandidate() || "none"),
    "behaviors: " + JSON.stringify(
      Object.fromEntries(
        Object.entries(state.behaviors).map(([key, value]) => [key, Number(value.toFixed(2))])
      )
    ),
    "burst episodes: " + state.behaviorRuntime.burstEpisodes,
    "history: " + JSON.stringify(state.history),
    "secret tier II: " + (secretEvolutionCandidate() || "none"),
    "secret tier III: " + (thirdEvolutionCandidate() || "none"),
    "first scores: " + JSON.stringify(firstScores),
    "first lead required: " + (
      state.lifetimeEnergy >= 1500 ? "0" :
      state.lifetimeEnergy >= 900 ? "0.75" : "1.75"
    ),
    "tier I matured: " + (state.firstEvolutionAt ? ((Date.now() - state.firstEvolutionAt) / 1000).toFixed(1) + "s" : "n/a"),
    "tier II matured: " + (state.secondEvolutionAt ? ((Date.now() - state.secondEvolutionAt) / 1000).toFixed(1) + "s" : "n/a"),
    "pending: " + (pendingEvolution ? pendingEvolution.form + " / tier " + pendingEvolution.tier : "none")
  ].join("\n");
}

function render() {
  const evo = evolutions[state.form] || evolutions.formless;

  document.body.dataset.form = state.form;
  document.body.dataset.family = evo.family;
  document.body.dataset.evolving = pendingEvolution ? "true" : "false";

  const heatVisual = Math.min(1, state.heat / 100);
  const reserveVisual = Math.min(1, reservoirCharge());
  const pulseVisual = Math.min(1, upgradeLevel("pulse") / 10);

  el.entity.style.setProperty("--heat", heatVisual.toFixed(3));
  el.entity.style.setProperty("--reserve", reserveVisual.toFixed(3));
  el.entity.style.setProperty("--pulse", pulseVisual.toFixed(3));

  el.energy.textContent = fmt(state.energy);

  const touch = Number(clickGain().toFixed(1));
  const passive = passiveGain();
  el.rateText.textContent =
    "+" + touch + " per touch" +
    (passive > 0 ? "  ·  +" + passive.toFixed(1) + "/sec" : "");

  el.mechanicText.textContent = mechanicStatusText();

  const readiness = evolutionReadiness();

  el.formName.textContent = evo.name;
  el.whisper.textContent =
    Date.now() < transientWhisperUntil ? transientWhisper : readiness.whisper;
  el.evolutionStatus.textContent = evolutionStatusText(readiness);

  if (el.evolutionSignal) {
    el.evolutionSignal.dataset.level = String(readiness.level);
  }

  updateSoundButton();
  renderUpgrades();
  renderCodex();
  renderDebug();
}

function tick(now) {
  const dt = Math.min((now - lastTick) / 1000, 1);
  lastTick = now;

  state.heat = Math.max(0, state.heat - heatDecayRate() * dt);

  const perSecond = passiveGain();
  if (perSecond > 0) {
    const generated = perSecond * dt;
    state.energy += generated;
    state.lifetimeEnergy += generated;
    state.behaviorRuntime.passiveEnergy += generated;
    state.behaviorRuntime.energyPeak = Math.max(state.behaviorRuntime.energyPeak, state.energy);
    addTrait("industry", dt * 0.008 * Math.max(perSecond, 1));
  }

  if (Date.now() - state.lastActiveAt > 12000) {
    addTrait("patience", dt * 0.035);
  }

  updateAffordabilitySignals(Date.now());
  updateHiddenBehaviors(dt);

  autosaveTimer += dt;
  if (autosaveTimer > 5) {
    save();
    autosaveTimer = 0;
  }

  maybeBehaviorHints();
  considerEvolution();
  advancePendingEvolution();
  render();
  requestAnimationFrame(tick);
}

el.entity.addEventListener("click", onEntityClick);

el.shapingButton.addEventListener("click", () => toggleDrawer("shaping"));
el.codexButton.addEventListener("click", () => toggleDrawer("codex"));
el.shapingClose.addEventListener("click", () => setDrawer(""));
el.codexClose.addEventListener("click", () => setDrawer(""));
el.drawerBackdrop.addEventListener("click", () => setDrawer(""));

document.addEventListener("keydown", event => {
  if (event.key === "Escape") setDrawer("");
});

el.continueButton.addEventListener("click", () => {
  el.overlay.hidden = true;
});

el.soundButton.addEventListener("click", async () => {
  state.settings.sound = !state.settings.sound;
  updateSoundButton();

  if (state.settings.sound) {
    await ensureAudio();
    await playTone("upgrade");
  }

  save();
});

// iOS/WebKit can suspend Web Audio after page switches or browser UI changes.
// Any real pointer gesture is an opportunity to wake it back up.
document.addEventListener("pointerdown", () => {
  if (state.settings.sound && audioContext?.state !== "running") {
    ensureAudio();
  }
}, { passive: true });

el.resetButton.addEventListener("click", () => {
  if (releaseInProgress) return;
  setDrawer("");
  if (!confirm("Release this form and begin again? Your Codex discoveries will remain.")) return;

  recordRunHistory();

  const discoveries = Array.from(new Set(["formless", ...(state.discovered || [])]));
  const discoveryMeta = { ...state.discoveryMeta };
  const hintsSeen = { ...state.hintsSeen };
  const settings = { ...state.settings };
  const history = {
    ...state.history,
    releases: [...(state.history.releases || [])]
  };

  releaseInProgress = true;
  pendingEvolution = null;
  document.body.dataset.releasing = "true";
  playTone("release");

  setTimeout(() => {
    localStorage.removeItem(SAVE_KEY);
    LEGACY_SAVE_KEYS.forEach(key => localStorage.removeItem(key));

    state = freshState();
    state.discovered = discoveries;
    state.discoveryMeta = discoveryMeta;
    state.hintsSeen = hintsSeen;
    state.settings = settings;
    state.history = history;

    lastUpgradeRenderKey = "";
    lastCodexRenderKey = "";
    transientWhisper = "";
    transientWhisperUntil = 0;
    el.overlay.hidden = true;

    document.body.dataset.releasing = "false";
    releaseInProgress = false;

    render();
    save();
  }, 850);
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) save();
});

window.addEventListener("beforeunload", save);

render();
requestAnimationFrame(tick);
