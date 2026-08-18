# OSOLUTIONS: ORIGINS

A learning-path site built from the **"Enhance & Process"** deck (62 slides).

## Run it

```bash
npx -y serve -l 4700 osolutions-learning-path
```

Then open `http://localhost:4700`. No build step — plain HTML, CSS and JS.

## Structure

```
osolutions-learning-path/
├─ index.html              # all views live here (hash router)
├─ assets/
│  ├─ css/style.css        # design system, layout, responsive
│  ├─ js/data.js           # ALL content — edit this, not the HTML
│  ├─ js/app.js            # router, progress tracking, rendering
│  ├─ img/                 # Osolutions logo
│  └─ heroes/*.jpg         # 6 AI-generated pixel-art portraits
└─ README.md
```

## Design

Light editorial theme locked to the Osolutions logo palette — navy `#11253E` and orange `#F76302`.
Archivo for headings, Inter for body, IBM Plex Mono for codes and labels.
The pixel-art portraits are the one retro element kept; everything reads as a normal
internal tool, not an arcade game.

| Section | What it actually is |
|---|---|
| Phase | One month of the plan — three phases, ninety days |
| Skill levels | The real May baseline vs. current assessment |
| The blocker | The written challenge note for that person, plus counter-moves |
| Missions | Course or exercise + the deliverable that proves it landed |
| Goal | The stated 3-month outcome |

## The team

| Name | Codename | Division | Rank |
|---|---|---|---|
| Alice | CHRONOS | Kinetic | Designer |
| Shimaa | LUMEN | Kinetic | Designer |
| Mahmoud | ATLAS | Forge | Senior |
| Islam | FORGE | Forge | Designer |
| Yomna | NOVA | Forge | Junior |
| Asmaa | EMBER | Forge | Intern |

## Mission architecture

- **Academy Core** — 9 missions, identical for all six. One standard.
- **Division Track** — 10 Kinetic / 7 Forge missions, shared within the division.
- **Personal Arc** — the 3–4 track missions flagged as that hero's priority, chosen to answer their nemesis.

26 missions total: **8 came from the deck**, **18 were written** to close gaps the deck named
but never filled. Every mission card is labelled `FROM DECK` or `ADDED` so the difference stays visible.

## Editing content

Everything is in `assets/js/data.js`. Nothing is hard-coded in the HTML.

- Add a mission → push to `CORE_MISSIONS` or `TRACK_MISSIONS.kinetic` / `.forge`
- Assign it as someone's personal arc → add its `id` to that hero's `extras` array
- Set a skill baseline → edit that hero's `powers` (`from` / `to`, values 0–5 mapping to
  `— / EMERGING / DEVELOPING / COMPETENT / STRONG / INDEPENDENT`; `0` renders as "AWAITING BASELINE")
- Fill in a missing nemesis → replace the `pending: true` block
- Change the start date → `PROGRAM.startDate` (the countdown reads from it)

## Progress tracking

Ticking a mission stores it in `localStorage` under `osol-origins-progress-v1`, per hero.
XP bars, the roster percentages, the team HUD and the skill-tree gems all read from it.
**Reset all progress** is at the bottom of the Vault page.

## Open items for the Team Lead

These are real gaps in the source deck, surfaced on the Vault page rather than papered over:

1. **Shimaa has no three-month plan** — her slide repeats Alice's text verbatim. A plan is drafted here and marked `DRAFTED`; it needs sign-off.
2. **Islam, Yomna and Asmaa have no challenge note and no skill baseline.** Both are left blank rather than invented.
3. **Colour Theory** is listed in the Learning Track with no material attached. `CORE-06` was written to fill it.
4. **The Kinetic division had no motion-specific technical material.** `KIN-03` … `KIN-10` were written to cover it.
