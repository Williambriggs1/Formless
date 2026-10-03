const SAVE_KEY = "formless-save-v2";
const LEGACY_SAVE_KEY = "formless-save-v1";

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
  }
};

const upgradeDefs = [
  {
    id: "pressure",
    name: "Apply Pressure",
    desc: "Your touch leaves a stronger impression.",
    baseCost: 24,
    max: 12,
    trait: "force",
    apply: state => { state.clickPower += 1; }
  },
  {
    id: "reservoir",
    name: "Deepen the Reservoir",
    desc: "Strengthen slow, passive growth without changing touch power.",
    baseCost: 38,
    max: 12,
    trait: "patience",
    apply: state => {
      state.reserveBonus += 0.05;
      state.passive += 0.12;
    }
  },
  {
    id: "pulse",
    name: "Teach a Pulse",
    desc: "A faint autonomous rhythm produces energy.",
    baseCost: 50,
    max: 12,
    trait: "industry",
    apply: state => { state.passive += 0.4; }
  }
];

const freshState = () => ({
  energy: 0,
  lifetimeEnergy: 0,
  clickPower: 1,
  passive: 0,
  reserveBonus: 0,
  clicks: 0,
  lastClickAt: 0,
  lastActiveAt: Date.now(),
  startedAt: Date.now(),
  form: "formless",
  evolutionTier: 0,
  evolutionCount: 0,
  traits: { force: 0, patience: 0, industry: 0 },
  stageTraits: { force: 0, patience: 0, industry: 0 },
  upgrades: { pressure: 0, reservoir: 0, pulse: 0 },
  discovered: ["formless"],
  firstEvolutionEnergy: 0,
  lastSavedAt: Date.now()
});

let state = load();
let lastTick = performance.now();
let autosaveTimer = 0;
let lastUpgradeRenderKey = "";
let lastCodexRenderKey = "";
let transientWhisper = "";
let transientWhisperUntil = 0;

const el = {
  energy: document.querySelector("#energy"),
  rateText: document.querySelector("#rateText"),
  entity: document.querySelector("#entity"),
  floatLayer: document.querySelector("#floatLayer"),
  whisper: document.querySelector("#whisper"),
  formName: document.querySelector("#formName"),
  evolutionStatus: document.querySelector("#evolutionStatus"),
  upgrades: document.querySelector("#upgrades"),
  codexList: document.querySelector("#codexList"),
  discoveryCount: document.querySelector("#discoveryCount"),
  overlay: document.querySelector("#evolutionOverlay"),
  evoGlyph: document.querySelector("#evolutionGlyph"),
  evoTitle: document.querySelector("#evolutionTitle"),
  evoCopy: document.querySelector("#evolutionCopy"),
  continueButton: document.querySelector("#continueButton"),
  resetButton: document.querySelector("#resetButton")
};

function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY) || localStorage.getItem(LEGACY_SAVE_KEY);
    const parsed = JSON.parse(raw);
    if (!parsed) return freshState();

    const base = freshState();
    const legacyTier = parsed.evolutionTier ?? (parsed.evolved ? 1 : 0);

    const merged = {
      ...base,
      ...parsed,
      evolutionTier: legacyTier,
      evolutionCount: parsed.evolutionCount ?? legacyTier,
      traits: { ...base.traits, ...(parsed.traits || {}) },
      stageTraits: { ...base.stageTraits, ...(parsed.stageTraits || {}) },
      upgrades: { ...base.upgrades, ...(parsed.upgrades || {}) },
      discovered: Array.from(new Set(["formless", ...(parsed.discovered || [])]))
    };

    if (legacyTier === 1 && !parsed.stageTraits) {
      merged.stageTraits = { force: 0, patience: 0, industry: 0 };
      merged.firstEvolutionEnergy = parsed.firstEvolutionEnergy || parsed.lifetimeEnergy || 0;
    }

    const awaySeconds = Math.min(
      (Date.now() - (parsed.lastSavedAt || Date.now())) / 1000,
      60 * 60 * 8
    );

    if (awaySeconds > 10 && merged.passive > 0) {
      const gained = merged.passive * awaySeconds;
      merged.energy += gained;
      merged.lifetimeEnergy += gained;
      addTrait("patience", Math.min(awaySeconds / 180, 20), merged);
      addTrait("industry", Math.min((awaySeconds / 300) * merged.passive, 14), merged);
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
  if (target.evolutionTier === 1) target.stageTraits[trait] += amount;
}

function clickGain() {
  const formBonus = {
    ember: 1.15, inferno: 1.65, core: 1.4, furnace: 1.35,
    briar: 1.25, press: 1.55, convergence: 1.35
  }[state.form] || 1;

  return state.clickPower * formBonus;
}

function passiveGain() {
  const formMultiplier = {
    seed: 1.15, grove: 1.8, cultivator: 1.55,
    mechanism: 1.2, engine: 2.1, clockwork: 1.65,
    furnace: 1.55, convergence: 1.35
  }[state.form] || 1;

  const patienceMultiplier = 1 + state.reserveBonus;
  return state.passive * formMultiplier * patienceMultiplier;
}

function onEntityClick(event) {
  const now = Date.now();
  const gap = state.lastClickAt ? now - state.lastClickAt : 1000;
  const gain = clickGain();

  state.energy += gain;
  state.lifetimeEnergy += gain;
  state.clicks += 1;
  state.lastActiveAt = now;

  if (gap < 400) addTrait("force", 0.3);
  else if (gap > 1900) addTrait("patience", 0.1);
  else addTrait("force", 0.07);

  state.lastClickAt = now;
  spawnFloat(event, gain);
  considerEvolution();
  render();
}

function spawnFloat(event, gain) {
  const node = document.createElement("span");
  node.className = "float-number";
  node.textContent = "+" + Math.max(1, Math.round(gain));
  node.style.setProperty("--drift", (Math.random() * 38 - 19) + "px");

  const rect = el.floatLayer.getBoundingClientRect();
  node.style.left = ((event.clientX || rect.left + rect.width / 2) - rect.left) + "px";
  node.style.top = ((event.clientY || rect.top + rect.height / 2) - rect.top) + "px";
  el.floatLayer.appendChild(node);
  setTimeout(() => node.remove(), 850);
}

function upgradeCost(def) {
  const level = state.upgrades[def.id] || 0;
  return Math.floor(def.baseCost * Math.pow(1.66, level));
}

function buyUpgrade(id) {
  const def = upgradeDefs.find(x => x.id === id);
  if (!def) return;

  const level = state.upgrades[id] || 0;
  const cost = upgradeCost(def);

  if (level >= def.max) return;

  if (state.energy < cost) {
    const missing = Math.max(1, Math.ceil(cost - state.energy));
    transientWhisper = "It needs " + fmt(missing) + " more energy before it can learn that.";
    transientWhisperUntil = Date.now() + 1800;
    render();
    return;
  }

  state.energy -= cost;
  state.upgrades[id] = level + 1;
  addTrait(def.trait, 4 + level * 0.45);
  def.apply(state);

  if (def.trait === "industry") addTrait("industry", 1.6);

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

function considerEvolution() {
  if (state.evolutionTier === 0) considerFirstEvolution();
  else if (state.evolutionTier === 1) considerSecondEvolution();
}

function considerFirstEvolution() {
  if (state.lifetimeEnergy < 150) return;

  const scores = [
    ["ember", state.traits.force],
    ["seed", state.traits.patience + Math.min(state.energy / 60, 7)],
    ["mechanism", state.traits.industry + state.upgrades.pulse * 2.4]
  ].sort((a, b) => b[1] - a[1]);

  if (scores[0][1] < 8) return;
  evolve(scores[0][0], 1);
}

function considerSecondEvolution() {
  const gainedSinceFirst = state.lifetimeEnergy - state.firstEvolutionEnergy;
  if (gainedSinceFirst < 950) return;

  const s = state.stageTraits;
  const ranked = traitScores(s);
  const highest = ranked[0][1];
  const lowest = ranked[2][1];
  const spread = highest - lowest;

  if (highest < 12) return;

  let next;

  if (lowest >= 10 && spread <= 5) {
    next = "convergence";
  } else {
    const primary = ranked[0][0];

    const branches = {
      ember: { force: "inferno", patience: "core", industry: "furnace" },
      seed: { force: "briar", patience: "grove", industry: "cultivator" },
      mechanism: { force: "press", patience: "clockwork", industry: "engine" }
    };

    next = branches[state.form]?.[primary];
  }

  if (next) evolve(next, 2);
}

function applyEvolutionBonus(form) {
  const effects = {
    ember: () => { state.clickPower += 2; },
    seed: () => { state.passive += 0.75; },
    mechanism: () => { state.passive += 1.5; },

    inferno: () => { state.clickPower += 5; },
    core: () => { state.clickPower += 3; state.reserveBonus += 0.12; },
    furnace: () => { state.clickPower += 2; state.passive += 2.2; },

    grove: () => { state.passive += 3; },
    briar: () => { state.clickPower += 4; state.passive += 0.7; },
    cultivator: () => { state.passive += 3.8; },

    engine: () => { state.passive += 5; },
    press: () => { state.clickPower += 5; state.passive += 1; },
    clockwork: () => { state.passive += 3; state.reserveBonus += 0.14; },

    convergence: () => {
      state.clickPower += 3;
      state.passive += 3;
      state.reserveBonus += 0.1;
    }
  };

  effects[form]?.();
}

function evolve(form, tier) {
  state.form = form;
  state.evolutionTier = tier;
  state.evolutionCount += 1;

  if (tier === 1) {
    state.firstEvolutionEnergy = state.lifetimeEnergy;
    state.stageTraits = { force: 0, patience: 0, industry: 0 };
  }

  if (!state.discovered.includes(form)) state.discovered.push(form);
  applyEvolutionBonus(form);

  const evo = evolutions[form];
  el.evoGlyph.textContent = evo.glyph;
  el.evoTitle.textContent = evo.name;
  el.evoCopy.textContent = evo.copy;
  el.overlay.hidden = false;

  save();
  render();
}

function renderUpgrades() {
  const key = upgradeDefs.map(def => {
    const level = state.upgrades[def.id] || 0;
    const cost = upgradeCost(def);
    const affordable = state.energy >= cost ? 1 : 0;
    return def.id + ":" + level + ":" + affordable;
  }).join("|");

  if (key === lastUpgradeRenderKey) return;
  lastUpgradeRenderKey = key;
  el.upgrades.innerHTML = "";

  upgradeDefs.forEach(def => {
    const level = state.upgrades[def.id] || 0;
    const cost = upgradeCost(def);
    const affordable = state.energy >= cost;
    const button = document.createElement("button");

    button.className = "upgrade" + (!affordable && level < def.max ? " locked" : "") + (level >= def.max ? " maxed" : "");
    button.disabled = level >= def.max;
    button.innerHTML = `
      <span class="upgrade-name">${def.name} <small>· ${level}/${def.max}</small></span>
      <span class="upgrade-desc">${def.desc}</span>
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
    "convergence"
  ];
}

function renderCodex() {
  const renderKey = state.discovered.slice().sort().join("|");
  if (renderKey === lastCodexRenderKey) return;
  lastCodexRenderKey = renderKey;
  el.codexList.innerHTML = "";

  codexOrder().forEach(key => {
    const evo = evolutions[key];
    const known = state.discovered.includes(key);
    const entry = document.createElement("div");
    entry.className = "codex-entry tier-" + evo.tier + (known ? " discovered" : "");

    if (known) {
      entry.innerHTML = `
        <span class="codex-glyph">${evo.glyph}</span>
        <span>
          <strong>${evo.name}</strong>
          <small>${evo.tier === 0 ? "Origin" : "Evolution " + evo.tier}</small>
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

function evolutionStatusText() {
  if (state.evolutionTier === 0) return "Evolution: ???";
  if (state.evolutionTier === 1) return "Evolution I · " + evolutions[state.form].name;
  return "Evolution II · " + evolutions[state.form].name;
}

function render() {
  const evo = evolutions[state.form] || evolutions.formless;
  document.body.dataset.form = state.form;
  document.body.dataset.family = evo.family;

  el.energy.textContent = fmt(state.energy);
  el.rateText.textContent =
    "+" + Number(clickGain().toFixed(1)) + " per touch" +
    (passiveGain() > 0 ? "  ·  +" + passiveGain().toFixed(1) + "/sec" : "");

  el.formName.textContent = evo.name;
  el.whisper.textContent = Date.now() < transientWhisperUntil ? transientWhisper : evo.whisper;
  el.evolutionStatus.textContent = evolutionStatusText();

  renderUpgrades();
  renderCodex();
}

function tick(now) {
  const dt = Math.min((now - lastTick) / 1000, 1);
  lastTick = now;

  const perSecond = passiveGain();
  if (perSecond > 0) {
    const generated = perSecond * dt;
    state.energy += generated;
    state.lifetimeEnergy += generated;
    addTrait("industry", dt * 0.011 * Math.max(perSecond, 1));
  }

  if (Date.now() - state.lastActiveAt > 12000) {
    addTrait("patience", dt * 0.035);
  }

  autosaveTimer += dt;
  if (autosaveTimer > 5) {
    save();
    autosaveTimer = 0;
  }

  considerEvolution();
  render();
  requestAnimationFrame(tick);
}

el.entity.addEventListener("click", onEntityClick);

el.continueButton.addEventListener("click", () => {
  el.overlay.hidden = true;
});

el.resetButton.addEventListener("click", () => {
  if (!confirm("Erase this form and begin again? Your discoveries in this browser will also reset.")) return;

  localStorage.removeItem(SAVE_KEY);
  localStorage.removeItem(LEGACY_SAVE_KEY);
  state = freshState();
  lastUpgradeRenderKey = "";
  lastCodexRenderKey = "";
  transientWhisper = "";
  transientWhisperUntil = 0;
  el.overlay.hidden = true;
  render();
  save();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) save();
});

window.addEventListener("beforeunload", save);

render();
requestAnimationFrame(tick);
