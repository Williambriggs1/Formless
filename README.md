# Formless

I'm building **Formless** as a quiet browser game that evolves around how the player behaves.

**You do not pick a class. What you teach the Formless determines what it becomes.**

## Current build

The current prototype includes:

- A central evolving form and Energy resource
- Three core shaping instincts:
  - **Force** — pressure, rapid interaction, and active momentum
  - **Patience** — restraint, holding energy, and allowing systems to settle
  - **Industry** — automation and passive production
- Three first evolutions:
  - **Ember**
  - **Seed**
  - **Mechanism**
- A second evolution layer with family, hybrid, and rare outcomes
- Behavior that is re-evaluated after the first evolution, allowing a run to change direction
- Distinct mechanics for Heat, Reservoir, and Pulse
- Layered visual mutations that change with each form
- A persistent Discovery Codex across released runs
- Discovery history, lore, and times reached for known forms
- A **Release Form** reset flow that preserves discoveries
- Optional browser-generated sound effects
- Local browser saves with migration from earlier versions
- Limited offline progress
- A single-screen mobile layout
- Slide-out Shaping and Codex drawers for mobile play
- Mobile interaction protections against accidental scrolling, text selection, and double-tap zoom

## Design rule

I intentionally do not document exact evolution recipes.

I want the interface to hint at what the Formless is learning without directly explaining every condition. Experimentation and community discovery are part of the game.

## Run locally

I keep Formless dependency-free and build-tool-free.

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

I intentionally keep the exact branch conditions undocumented.

## Direction

The next areas I want to explore include:

- Hidden behavioral signals beyond the three primary instincts
- Secret forms and unusual evolution conditions
- A deeper Release system
- **Memory** as long-term progression left behind by released forms
- More Codex depth and collection systems
- Third-stage evolutions
- Community discovery features
- Optional account and cloud-save support
- More environmental and entity mutations
