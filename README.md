# Osolutions — Learning Path

A 90 day development plan for the Osolutions design and motion teams, built from the
**"Enhance & Process"** deck (62 slides).

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
│  └─ img/                 # Osolutions logo
└─ README.md
```

## Design

Light, brand-locked: navy `#11253E` and orange `#F76302` from the logo, teal for the
Motion Team, violet for specialisations. Archivo for headings, Inter for body copy,
IBM Plex Mono for codes and labels.

## Teams

| Team | Covers |
|---|---|
| **Motion Team** | Video editing, animation and AI production |
| **Design Team** | Graphic design, branding and AI production |

## The learning path

One path for everyone, ordered from mid-level to senior, using **free material only**
(YouTube courses, Blender, DaVinci Resolve, Figma free plan). A stage holds one to four
courses and only opens once the stage before it is complete.

| Month | Level | Stages |
|---|---|---|
| 1 — Foundations | Foundation | Briefing & Planning · AI Workflow · Editing Foundations · Typography · Colour |
| 2 — Practitioner | Practitioner | Motion Foundations · Blender Foundations · Craft & Composition · Presenting & Review |
| 3 — Senior | Senior | Blender: Light & Product · Grade & Sound · AI Video Workflow · Senior Capstone |
| 3 | Specialisation | Personal, one stage each, after the shared path |

Every course lists its own **YouTube videos** with thumbnails, a hand-in piece of work and
a completion checklist. Each course carries an hour estimate, rolled up per stage, per month
and per person (about 9 to 10 hours a week across 13 weeks). **Every track is capped at 3 months.**

### Specialisations

| Person | Specialisations | Stages | Hours |
|---|---|---|---|
| Alice | Advanced Montage | 14 | 125 |
| Shimaa | Advanced Montage → Blender Deep Dive | 15 | 135 |
| Abdelrahman Makhlouf | Advanced Montage → Blender Deep Dive | 15 | 135 |
| Mahmoud | Brand Identity | 14 | 132 |
| Islam | Brand Identity | 14 | 131 |
| Yomna | none assigned yet | 13 | 119 |
| Asmaa | UI/UX → Brand Identity | 15 | 134 |

Stages live in  in . A person's priority courses fill the  slots in the order
of their  array (use  to leave a slot empty). A stage with no courses for someone is dropped.

## Adding course links

Drop a new course into `CORE_MISSIONS`, `TRACK_MISSIONS.*` or `BONUS_MISSIONS` in `data.js`.

**Videos:** add  to a course and each one renders as a thumbnail card with its title.

**Single links are automatic.** Any YouTube `url` — `watch?v=`, `youtu.be/`, `/embed/`
or `/shorts/` — has its poster frame pulled from `img.youtube.com` with no extra work.
For a non-YouTube video, set `thumb: 'https://…'` and that image is used instead.
A thumbnail that fails to load removes itself, so a broken link never leaves a gap.

## Editing content

Everything is in `assets/js/data.js`. Nothing is hard-coded in the HTML.

- Add a course → push to `CORE_MISSIONS`, `TRACK_MISSIONS.kinetic` / `.forge`, or `BONUS_MISSIONS`
- Make it someone's priority → add its `id` to that person's `extras` array
- Give someone a specialisation → add its `id` to their `bonus` array (each one creates an
  extra stage; an empty `bonus` simply means the nine shared stages)
- Set a baseline → edit that person's `powers` (`from` / `to`, 0–5 mapping to
  `— / Emerging / Developing / Competent / Strong / Independent`; `0` renders as "Being set")
- Fill in a development focus → replace the `pending: true` block in their `focus`
- Change the start date → `PROGRAM.startDate` (the day counter reads from it)
- Change the cap wording → `PROGRAM.cap`

## Progress tracking

Ticking a course stores it in `localStorage` under `osol-learning-progress-v1`, per person.
Stage states, the roster percentages, the team counter, the next-course card and the
learning-track bars all read from it. **Reset all progress** is on the Resources page.

## To confirm with the Team Lead

Surfaced on the Resources page rather than guessed at:

1. **Shimaa's three month plan** is drafted here and marked `Draft` — needs sign-off.
2. **Baseline skill levels for Islam, Yomna and Asmaa**, so progress is on the same scale.
3. **Colour theory** is one of the three learning tracks; `CORE-06` gives it real material.
4. **The Motion Team** now has its own technical run, `KIN-03` … `KIN-10`.
5. **Yomna has no specialisation assigned yet** — the only person without one.
