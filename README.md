# Osolutions — Learning Path

A 180 day development plan for the Osolutions design and motion teams, built from the
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

One path per person, ordered from mid-level to senior, using **free material only** (YouTube
courses, Blender, DaVinci Resolve, the Figma free plan; Premiere, After Effects, Photoshop and
Illustrator courses are free, the apps are covered by the Adobe licence). A stage holds one to
four courses and only opens once the stage before it is complete.

Everyone shares the briefing, AI workflow, editing foundations, typography, colour, motion
foundations, Blender foundations, craft and presenting stages. Then the path splits by team:

| | Motion Team | Design Team |
|---|---|---|
| Month 2-3 | Cuts and pacing, easing, grade and sound, Blender light and product, AI video workflow, senior capstone | Photoshop and Illustrator craft, layout systems, brand strategy, identity and guidelines, art direction, AI for design, design capstone |

Each course lists its own YouTube videos with thumbnails, a hand-in piece of work and a
completion checklist, plus an hour estimate rolled up per stage, month and person.
**Every track is capped at 6 months.**

### The Design Team, by person

| Person | Target | Extra depth |
|---|---|---|
| Mahmoud | Senior-level branding, art direction and creative direction | Strategy, identity and guidelines, campaign concepting, AI art direction, presenting and leading reviews |
| Islam | Senior-bound: the densest design path | Everything above except leading reviews, plus Photoshop and Illustrator craft and layout systems |
| Yomna | Strong mid-level | Craft, layout, strategy, identity, art direction, AI for design |
| Asmaa | Strong mid-level, a deliberate push | Same as Yomna, plus a UI/UX specialisation |

### Specialisations and hours

| Person | Specialisations | Stages | Hours |
|---|---|---|---|
| Alice | Advanced Montage | 14 | 129 |
| Shimaa | Advanced Montage, then Blender Deep Dive | 15 | 139 |
| Abdelrahman Makhlouf | Advanced Montage, then Blender Deep Dive | 15 | 139 |
| Mahmoud | none | 15 | 127 |
| Islam | none | 15 | 136 |
| Yomna | none | 15 | 124 |
| Asmaa | UI/UX | 16 | 134 |

Stages live in `JOURNEY` in `data.js`. A stage lists `core` course ids for everyone, `team` ids per
team, `people` ids per person, and `arc` slots filled from a person's `extras` array (use `null` to leave a
slot empty). A stage with no courses for someone is dropped.


## Adding course links

Drop a new course into `CORE_MISSIONS`, `TRACK_MISSIONS.*` or `BONUS_MISSIONS` in `data.js`.

**Videos:** add `videos: [{ id, title, by }]` to a course and each one renders as a thumbnail card with its title.

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

## The Team Lead track

Mohamed Tarek (Graphic Team Lead) has his own custom path, separate from the shared core:
Blender from basics to advanced (modeling, sculpting, light and materials, geometry nodes,
simulation, rigging), Cinema 4D from basics to production (MoGraph, product lighting), AI from
zero to advanced (prompting, ComfyUI, ControlNet and IPAdapter, training your own LoRA, AI video),
and VFX (keying, tracking, Fusion compositing). Six months, all video, about 6 hours a week.
A person with `custom: true` takes only the courses listed for them in a stage's `people` map.
