# Formless

A quiet web clicker game that evolves according to how the player behaves.

**You do not pick a class. The game watches what you teach it.**

## v0.2 — The Second Evolution

The prototype now includes:

- A central click interaction and Energy resource
- Three hidden behavioral instincts:
  - **Force** — rapid clicking and pressure
  - **Patience** — waiting, restraint, and holding energy
  - **Industry** — automation and passive production
- Three first evolutions:
  - **Ember**
  - **Seed**
  - **Mechanism**
- A second evolution layer with family and hybrid outcomes
- A rare balanced second evolution
- Behavior is re-evaluated after the first evolution, so a player's later habits can change the direction of their form
- Distinct production bonuses for evolved forms
- Visual mutations for second-generation forms
- An expanded Discovery Codex with hidden entries
- Local browser saves, including migration from the original v0.1 save
- Limited offline progress
- Responsive mobile layout

## Design rule

Exact evolution recipes should not be shown to players.

The interface can hint at what the entity is learning, but discovery is part of the game. Players should be able to compare forms, experiment, and eventually uncover paths as a community.

## Run locally

There are no dependencies or build tools.

Open `index.html` directly, or run any static web server:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Current structure

```
Formless
├─ Ember
├─ Seed
└─ Mechanism
   ↓
Second-generation forms
   ↓
Hybrid / rare outcomes
```

The exact branch conditions intentionally remain undocumented.

## Next ideas

- Third-stage forms
- Hidden behavioral signals beyond the three primary instincts
- Permanent discovery collection across released forms
- A lore-driven reset / prestige system called **Release**
- **Memory** as the permanent resource left behind by a released form
- Secret evolution conditions
- More environmental UI mutations
