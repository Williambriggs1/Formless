# Formless

A small web clicker game that evolves according to how the player behaves.

You do not pick a class. The game watches what you teach it.

## Current prototype

The first playable version includes:

- A central click interaction and Energy resource
- Three hidden behavior traits: **Force**, **Patience**, and **Industry**
- Upgrades that reinforce different play styles
- Passive resource generation
- A first hidden evolution:
  - **Ember** for forceful / rapid play
  - **Seed** for patient / hoarding play
  - **Mechanism** for automation-focused play
- UI appearance changes after evolution
- A discovery codex
- Local browser saves and limited offline progress
- Responsive mobile layout

## Run locally

There are no dependencies or build tools.

Open `index.html` in a browser, or serve the directory with any static web server.

For example:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Design direction

Formless should hide exact evolution formulas from players. The interface can hint at what the entity is learning, while the community discovers the actual paths.

Future milestones can introduce hybrid traits, second-stage evolutions, rare balanced paths, achievements, more atmospheric UI transformations, and optional cloud saves.
