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

Each person has a path of **nine shared stages**, plus one extra stage for each
specialisation they carry — between 9 and 12 in total. A stage holds one to four courses
and **only opens once the stage before it is complete**. Stages are grouped by month.

| Stages | Month |
|---|---|
| Briefing & Feedback · AI Production I · AI Production II | 1 — Foundations |
| Typography · Colour · Craft & Retouching | 2 — Craft |
| Presenting Work · Critique & Review · Consolidation | 3 — Independence |
| One stage per specialisation | 3 — Independence |

**Every track is capped at 3 months**, specialisations included.

### Specialisations

Personal, not per team. They start once someone has completed the shared plan, and each
one gets its own stage named after the subject.

| Person | Specialisations, in order | Stages |
|---|---|---|
| Alice | Advanced Editing | 10 |
| Shimaa | 3D Foundations → Blender | 11 |
| Mahmoud | Brand Identity → Video & Motion | 11 |
| Islam | Brand Identity | 10 |
| Yomna | *none assigned yet* | 9 |
| Asmaa | Motion Basics → UI/UX → Brand Identity | 12 |

Stages are defined in `JOURNEY` in `data.js`. Each lists `core` course ids plus
`arc` / `track` / `bonus` indices resolved per person, so the same stages hold different
courses depending on who is walking them. A stage that resolves to zero courses is dropped
— which is how a specialisation stage only appears for the person it belongs to. The
month grouping comes from each stage's `chapter`.

## The people

| Name | Job title | Team | Level |
|---|---|---|---|
| Alice | Video Designer | Motion | Designer |
| Shimaa | Video Designer | Motion | Designer |
| Mahmoud | Senior Designer | Design | Senior |
| Islam | Graphic Designer | Design | Designer |
| Yomna | Junior Designer | Design | Junior |
| Asmaa | Intern Designer | Design | Intern |

Avatars are initials in the brand navy — no photos are stored in the repo.

## Course architecture

- **Shared core** — 9 courses, identical for all six. One standard.
- **Team track** — 10 Motion / 7 Design courses, shared within the team.
- **Priority courses** — the 3–4 team-track courses flagged as that person's focus.
- **Specialisations** — per person, one stage each, after the shared plan.

33 courses total: **8 came from the deck**, **25 were written** to give the named tracks
real material. Every course is labelled `From deck` or `Added` so the difference stays visible.

## Adding course links

Drop a new course into `CORE_MISSIONS`, `TRACK_MISSIONS.*` or `BONUS_MISSIONS` in `data.js`.

**Video thumbnails are automatic.** Any YouTube `url` — `watch?v=`, `youtu.be/`, `/embed/`
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
