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

Dark arcade shell with the legibility of a normal internal tool. Palette locked to the
Osolutions logo — navy `#11253E` / orange `#F76302`, cyan for the Kinetic division.
Press Start 2P for display only; Inter for body copy; IBM Plex Mono for codes.

## Teams

| Team | Codename | Covers |
|---|---|---|
| **Motion Team** | Kinetic | Video editing, animation and AI production |
| **Design Team** | Forge | Graphic design, branding and AI production |

Each person also carries a **call sign** (Atlas, Nova, Chronos…) shown next to their real
name and job title — flavour, never a replacement for either.

## The journey map

Each person walks one road of **nine stops**, or **ten** if they carry a bonus track. A station holds one to four missions and
**only opens when the station before it is fully cleared** — the same gating idea as a game
skill tree. Their portrait walks the road as they progress, and the road lights up behind them.

| Station | Chapter |
|---|---|
| 1. The Signal · 2. The Atelier · 3. The Workshop | 1 — Foundations |
| 4. The Type Garden · 5. The Colour Spring · 6. The Makers Hall | 2 — Craft |
| 7. The Stage · 8. The Round Table · 9. The Summit | 3 — Mastery |
| 10. The Frontier *(bonus track holders only)* | 3 — Mastery |

**Every track is capped at 3 months** — the bonus stop included.

### Bonus track

Opens only after someone clears their whole road. Assigned per person, not per team.

| Mission | Who |
|---|---|
| Motion Basics — a light first pass | Asmaa |
| Brand Identity — building one from zero | Mahmoud, Islam |

The board lays itself out from the stop count, so adding a stop needs no layout work.
Stops are defined in `JOURNEY` in `data.js`. Each one lists `core` mission ids plus
`arc` / `track` indices, resolved per person — so the same nine stations hold different
missions depending on who is walking them. A stop that resolves to zero missions is dropped,
which is how the bonus stop only appears for the three people who have one.

## Tone

The content is written to encourage. Each person has a **next unlock** — the upgrade closest
within reach, with the moves that get them there — rather than a list of shortcomings.
Nothing on the site frames a person by what they are missing.

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
