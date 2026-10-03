const SAVE_KEY = "formless-save-v1";

const evolutions = {
  formless: {
    name: "The Formless",
    glyph: "●",
    whisper: "It does not know what it is yet."
  },
  ember: {
    name: "Ember",
    glyph: "✦",
    whisper: "It learned that motion can become heat.",
    copy: "You touched it relentlessly. It learned urgency, pressure, force. Somewhere inside the dark, something caught fire."
  },
  seed: {
    name: "Seed",
    glyph: "❋",
    whisper: "Stillness did not mean nothing was happening.",
    copy: "You let energy gather instead of demanding an answer. It learned to hold, wait, and grow."
  },
  mechanism: {
    name: "Mechanism",
    glyph: "⌬",
    whisper: "It discovered that work can continue without you.",
    copy: "You taught it repetition. The first tiny process now turns on its own."
  }
};

const upgradeDefs = [
  {
    id: "pressure",
    name: "Apply Pressure",
    desc: "Your touch leaves a stronger impression.",
    baseCost: 24,
    max: 8,
    trait: "force",
    apply: state => { state.clickPower += 1; }
  },
  {
    id: "reservoir",
    name: "Deepen the Reservoir",
    desc: "Reward the instinct to keep energy unspent.",
    baseCost: 38,
    max: 8,
    trait: "patience",
    apply: state => { state.reserveBonus += 0.05; }
  },
  {
    id: "pulse",
    name: "Teach a Pulse",
    desc: "A faint autonomous rhythm produces energy.",
    baseCost: 50,
    max: 8,
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
  evolved: false,
  traits: { force: 0, patience: 0, industry: 0 },
  upgrades: { pressure: 0, reservoir: 0, pulse: 0 },
  discovered: ["formless"],
  lastSavedAt: Date.now()
});

let state = load();
let lastTick = performance.now();
let autosaveTimer = 0;

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
    const parsed = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!parsed) return freshState();

    const merged = {
      ...freshState(),
      ...parsed,
      traits: { ...freshState().traits, ...(parsed.traits || {}) },
      upgrades: { ...freshState().upgrades, ...(parsed.upgrades || {}) }
    };

    const awaySeconds = Math.min((Date.now() - (parsed.lastSavedAt || Date.now())) / 1000, 60 * 60 * 8);
    if (awaySeconds > 10 && merged.passive > 0) {
      const gained = merged.passive * awaySeconds;
      merged.energy += gained;
      merged.lifetimeEnergy += gained;
      merged.traits.patience += Math.min(awaySeconds / 180, 20);
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
  const units = [["K", 1e3], ["M", 1e6], ["B", 1e9], ["T", 1e12]];
  for (let i = units.length - 1; i >= 0; i--) {
    if (n >= units[i][1]) return (n / units[i][1]).toFixed(n >= units[i][1] * 100 ? 0 : 1) + units[i][0];
  }
  return Math.floor(n).toLocaleString();
}

function clickGain() {
  return state.clickPower * (1 + state.reserveBonus * Math.min(state.energy / 200, 3));
}

function onEntityClick(event) {
  const now = Date.now();
  const gap = state.lastClickAt ? now - state.lastClickAt : 1000;
  const gain = clickGain();

  state.energy += gain;
  state.lifetimeEnergy += gain;
  state.clicks += 1;
  state.lastActiveAt = now;

  if (gap < 450) state.traits.force += 0.28;
  else if (gap > 1800) state.traits.patience += 0.08;
  else state.traits.force += 0.08;

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
  return Math.floor(def.baseCost * Math.pow(1.72, level));
}

function buyUpgrade(id) {
  const def = upgradeDefs.find(x => x.id === id);
  if (!def) return;
  const level = state.upgrades[id] || 0;
  const cost = upgradeCost(def);
  if (level >= def.max || state.energy < cost) return;

  state.energy -= cost;
  state.upgrades[id] = level + 1;
  state.traits[def.trait] += 4 + level * 0.5;
  def.apply(state);

  if (def.trait === "industry") state.traits.industry += 2;

  considerEvolution();
  render();
  save();
}

function considerEvolution() {
  if (state.evolved || state.lifetimeEnergy < 150) return;

  const t = state.traits;
  const scores = [
    ["ember", t.force],
    ["seed", t.patience + Math.min(state.energy / 60, 7)],
    ["mechanism", t.industry + state.upgrades.pulse * 2.4]
  ].sort((a, b) => b[1] - a[1]);

  if (scores[0][1] < 8) return;

  evolve(scores[0][0]);
}

function evolve(form) {
  state.form = form;
  state.evolved = true;
  if (!state.discovered.includes(form)) state.discovered.push(form);

  if (form === "ember") state.clickPower += 2;
  if (form === "seed") state.passive += 0.75;
  if (form === "mechanism") state.passive += 1.5;

  const evo = evolutions[form];
  el.evoGlyph.textContent = evo.glyph;
  el.evoTitle.textContent = evo.name;
  el.evoCopy.textContent = evo.copy;
  el.overlay.hidden = false;

  save();
  render();
}

function renderUpgrades() {
  el.upgrades.innerHTML = "";
  upgradeDefs.forEach(def => {
    const level = state.upgrades[def.id] || 0;
    const cost = upgradeCost(def);
    const button = document.createElement("button");
    button.className = "upgrade";
    button.disabled = state.energy < cost || level >= def.max;
    button.innerHTML = `
      <span class="upgrade-name">${def.name} <small>· ${level}/${def.max}</small></span>
      <span class="upgrade-desc">${def.desc}</span>
      <span class="upgrade-cost">${level >= def.max ? "Complete" : fmt(cost) + " energy"}</span>
    `;
    button.addEventListener("click", () => buyUpgrade(def.id));
    el.upgrades.appendChild(button);
  });
}

function renderCodex() {
  el.codexList.innerHTML = "";
  Object.entries(evolutions).forEach(([key, evo]) => {
    const known = state.discovered.includes(key);
    const entry = document.createElement("div");
    entry.className = "codex-entry" + (known ? " discovered" : "");
    entry.textContent = known ? evo.glyph + "  " + evo.name : "???  Undiscovered";
    el.codexList.appendChild(entry);
  });
  el.discoveryCount.textContent = state.discovered.length + " discovered";
}

function render() {
  const evo = evolutions[state.form] || evolutions.formless;
  document.body.dataset.form = state.form;
  el.energy.textContent = fmt(state.energy);
  el.rateText.textContent = "+" + Number(clickGain().toFixed(1)) + " per touch" + (state.passive > 0 ? "  ·  +" + state.passive.toFixed(1) + "/sec" : "");
  el.formName.textContent = evo.name;
  el.whisper.textContent = evo.whisper;
  el.evolutionStatus.textContent = state.evolved ? "Evolution: " + evo.name : "Evolution: ???";
  renderUpgrades();
  renderCodex();
}

function tick(now) {
  const dt = Math.min((now - lastTick) / 1000, 1);
  lastTick = now;

  if (state.passive > 0) {
    const generated = state.passive * dt;
    state.energy += generated;
    state.lifetimeEnergy += generated;
    state.traits.industry += dt * 0.012 * state.passive;
  }

  if (Date.now() - state.lastActiveAt > 12000) {
    state.traits.patience += dt * 0.035;
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
  if (!confirm("Erase this form and begin again?")) return;
  localStorage.removeItem(SAVE_KEY);
  state = freshState();
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
