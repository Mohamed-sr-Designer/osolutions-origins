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
Osolutions logo — navy `#11253E` / orange `#F76302`, cyan for the Motion Team.
Press Start 2P for display only; Inter for body copy; IBM Plex Mono for codes.

## Teams

| Team | Codename | Covers |
|---|---|---|
| **Motion Team** | Kinetic | Video editing, animation and AI production |
| **Design Team** | Forge | Graphic design, branding and AI production |

Each person also carries a **call sign** (Atlas, Nova, Chronos…) shown next to their real
name and job title — flavour, never a replacement for either.

## The journey map

Each person walks one road of **nine core stops**, plus one extra stop for each bonus
mission they carry — between 9 and 12 in total.
A stop holds one to four missions and **only opens when the stop before it is fully cleared**
— the same gating idea as a game skill tree. Their portrait walks the road as they progress,
and the road lights up behind them.

| Stops | Chapter |
|---|---|
| 1. The Signal · 2. The Atelier · 3. The Workshop | 1 — Foundations |
| 4. The Type Garden · 5. The Colour Spring · 6. The Makers Hall | 2 — Craft |
| 7. The Stage · 8. The Round Table · 9. The Summit | 3 — Mastery |
| 10–12. One stop per bonus mission *(only for those who have them)* | 3 — Mastery |

**Every track is capped at 3 months** — bonus stops included.

### Bonus track

Opens only after someone clears their whole core road. Assigned per person, not per team.
Each bonus mission gets its **own stop**, named after the thing being learned — so Shimaa
sees a stop called Blender where Asmaa sees one called Screens.

| Person | Bonus stops, in order |
|---|---|
| Alice | The Cutting Room *(Advanced Montage)* |
| Shimaa | The Third Dimension *(3D Foundations)* → Blender |
| Mahmoud | Identity *(Brand Identity)* → Moving Pictures *(Video Editing & Simple Motion)* |
| Islam | Identity *(Brand Identity)* |
| Yomna | — none assigned yet |
| Asmaa | First Movement *(Motion Basics)* → Screens *(UI/UX)* → Identity *(Brand Identity)* |

The board lays itself out from the stop count, so adding a stop needs no layout work.
Stops are defined in `JOURNEY` in `data.js`. Each one lists `core` mission ids plus
`arc` / `track` indices, resolved per person — so the same stops hold different
missions depending on who is walking them. A stop that resolves to zero missions is dropped,
which is how a bonus stop only appears for the person it belongs to.

## Adding course links

Drop a new mission into `CORE_MISSIONS`, `TRACK_MISSIONS.*` or `BONUS_MISSIONS` in `data.js`.

**Video thumbnails are automatic.** Any YouTube `url` — `watch?v=`, `youtu.be/`, `/embed/`
or `/shorts/` — has its poster frame pulled from `img.youtube.com` with no extra work.
For a non-YouTube video, set `thumb: 'https://…'` on the mission and that image is used
instead. A thumbnail that fails to load removes itself, so a broken link never leaves a gap.

## Tone

The content is written to encourage. Each person has a **next unlock** — the upgrade closest
within reach, with the moves that get them there — rather than a list of shortcomings.
Nothing on the site frames a person by what they are missing.

## The people

| Name | Job title | Call sign | Team | Stops |
|---|---|---|---|---|
| Alice | Video Designer | Chronos | Motion | 10 |
| Shimaa | Video Designer | Lumen | Motion | 11 |
| Mahmoud | Senior Designer | Atlas | Design | 11 |
| Islam | Graphic Designer | Forge | Design | 10 |
| Yomna | Junior Designer | Nova | Design | 9 |
| Asmaa | Intern Designer | Ember | Design | 12 |

## Mission architecture

- **Shared core** — 9 missions, identical for all six. One standard.
- **Team track** — 10 Motion / 7 Design missions, shared within the team.
- **Next up card** — on every person page, the exact next mission plus a jump straight to it.
- **Personal track** — the 3–4 team-track missions flagged as that person's priority,
  chosen to answer their next unlock.
- **Bonus track** — per person, one stop each, opens only after their core road is cleared.

33 missions total: **8 came from the deck**, **25 were written** to give named tracks real
material. Every mission is labelled `From deck` or `Added` so the difference stays visible.

## Editing content

Everything is in `assets/js/data.js`. Nothing is hard-coded in the HTML.

- Add a mission → push to `CORE_MISSIONS`, `TRACK_MISSIONS.kinetic` / `.forge`, or `BONUS_MISSIONS`
- Make it someone's personal priority → add its `id` to that person's `extras` array
- Give someone a bonus mission → add its `id` to their `bonus` array (each one creates an
  extra stop for them; someone with an empty `bonus` simply has the nine core stops)
- Set a skill baseline → edit that person's `powers` (`from` / `to`, 0–5 mapping to
  `— / Emerging / Developing / Competent / Strong / Independent`; `0` renders as "Being set")
- Fill in someone's next unlock → replace the `pending: true` block in their `quest`
- Change the start date → `PROGRAM.startDate` (the countdown reads from it)
- Change the cap wording → `PROGRAM.cap`

## Progress tracking

Ticking a mission stores it in `localStorage` under `osol-origins-progress-v1`, per person.
The road, the walker, the roster percentages, the team counter and the learning-track bars
all read from it. **Reset all progress** is at the bottom of the Resources page.

## To confirm with the Team Lead

Surfaced on the Resources page rather than guessed at:

1. **Shimaa's three-month plan** is drafted here and marked `Drafted` — needs sign-off.
2. **Starting skill levels for Islam, Yomna and Asmaa**, so their gains show on the same scale.
3. **Colour theory** is one of the three learning tracks; `CORE-06` was written to give it material.
4. **The Motion Team** now has its own technical run, `KIN-03` … `KIN-10`.
