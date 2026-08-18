/* ============================================================
   OSOLUTIONS: ORIGINS — Learning Path Data
   Source of truth: "Enhance & Process" deck (62 slides)
   origin: 'deck'  = taken directly from the deck
   origin: 'added' = written to fill a gap (flagged in the UI)
   ============================================================ */

const PROGRAM = {
  title: 'OSOLUTIONS: ORIGINS',
  subtitle: 'Enhance & Process — 90 Day Learning Path',
  startDate: '2026-08-18',
  days: 90,
  ranks: ['INTERN', 'JUNIOR', 'DESIGNER', 'SENIOR', 'LEAD'],
  levels: ['—', 'EMERGING', 'DEVELOPING', 'COMPETENT', 'STRONG', 'INDEPENDENT']
};

const DIVISIONS = {
  kinetic: {
    id: 'kinetic',
    name: 'KINETIC DIVISION',
    short: 'KINETIC',
    role: 'Motion / Video Editing',
    color: '#22E0F0',
    glyph: '▶',
    creed: 'We control time. The cut is the weapon.'
  },
  forge: {
    id: 'forge',
    name: 'FORGE DIVISION',
    short: 'FORGE',
    role: 'Static / Graphic Design',
    color: '#F76302',
    glyph: '◆',
    creed: 'We build the frame. The layout is the argument.'
  }
};

/* ---------- ACADEMY CORE — every hero runs these ---------- */
const CORE_MISSIONS = [
  {
    id: 'core-01', code: 'CORE-01', origin: 'deck', type: 'video',
    title: 'The New AI Workflow',
    source: 'Freepik Spaces — "This New AI Workflow Replaces Prompting"',
    url: 'https://www.youtube.com/watch?v=xG7fACIFSGk',
    duration: '1 session', xp: 100,
    objective: 'Stop writing prompts. Start building node graphs you can re-run, version and hand to someone else.',
    deliverable: 'One Space rebuilt from a real brief you already shipped — same output, node-based.',
    criteria: ['The graph runs twice and gives a controllable result', 'You can explain every node to a teammate', 'No manual re-prompting between versions']
  },
  {
    id: 'core-02', code: 'CORE-02', origin: 'deck', type: 'video',
    title: 'Every Node Explained — Part I',
    source: 'Magnific AI Tutorial (Freepik Spaces)',
    url: 'https://www.youtube.com/watch?v=52WhUjkmsTk',
    duration: '1 session', xp: 100,
    objective: 'Learn what each node actually does instead of guessing which one to drag in.',
    deliverable: 'A one-page node cheatsheet in your own words, shared with the team.',
    criteria: ['Every node named with its real use case', 'At least 3 nodes you had never used before', 'Posted to the team channel']
  },
  {
    id: 'core-03', code: 'CORE-03', origin: 'deck', type: 'video',
    title: 'Every Node Explained — Part II',
    source: 'Magnific AI Tutorial (Freepik Spaces)',
    url: 'https://www.youtube.com/watch?v=FdLRSKxkA6k',
    duration: '1 session', xp: 100,
    objective: 'Chain nodes into a production pipeline: input, control, upscale, output.',
    deliverable: 'One reusable Space template the whole team can open and run.',
    criteria: ['Named and documented', 'Works on someone else’s brief without edits', 'Handles at least 2 aspect ratios']
  },
  {
    id: 'core-04', code: 'CORE-04', origin: 'deck', type: 'course',
    title: 'Typography & Visual Hierarchy',
    source: 'Graphic Design Course — Before & After Edition',
    url: 'https://www.youtube.com/watch?v=Tm25IxJQPWM&list=PL-c9Rq56P4Kln7CVqo4UY85zElYfW6_2j&index=3',
    duration: '2 weeks', xp: 150,
    objective: 'Understand text hierarchy and its proper application in design. (Deck objective, verbatim.)',
    deliverable: 'Take 3 of your own old deliverables and redo the hierarchy only — no new art, no new colour.',
    criteria: ['Three levels of hierarchy readable in 2 seconds', 'Type scale is deliberate, not default', 'Before/after posted for review']
  },
  {
    id: 'core-05', code: 'CORE-05', origin: 'deck', type: 'video',
    title: 'Manipulation — Back to REAL Art',
    source: 'Spider-Man Poster Design Without AI (Photoshop manipulation)',
    url: 'https://www.youtube.com/watch?v=b1QoecESJJE',
    duration: '1 week', xp: 150,
    objective: 'Understand the tools and techniques, whether using manual or AI-based methods. (Deck objective, verbatim.)',
    deliverable: 'One poster built manually, then the same concept rebuilt with AI. Compare cost, time and control.',
    criteria: ['Manual version has real masking and light logic', 'You can say where AI helped and where it lied', 'Both versions presented side by side']
  },
  {
    id: 'core-06', code: 'CORE-06', origin: 'added', type: 'practice',
    title: 'Colour Theory & Application',
    source: 'Internal — built for the Learning Track',
    url: '',
    duration: '2 weeks', xp: 150,
    objective: 'Colour is one of the three learning tracks. This mission gives it a concrete, defensible system rather than instinct.',
    deliverable: 'A palette system for one live account: primary, secondary, neutrals, and the rule for when each is used.',
    criteria: ['Contrast checked, not eyeballed', 'A written rule for every colour', 'Applied to 3 deliverables without changing the palette']
  },
  {
    id: 'core-07', code: 'CORE-07', origin: 'added', type: 'practice',
    title: 'Reading The Brief',
    source: 'Internal — Osolutions workflow',
    url: '',
    duration: '3 days', xp: 80,
    objective: 'Revision rounds usually trace back to the brief, not the design. Sharpen the brief and the rounds drop.',
    deliverable: 'For your next 3 briefs: write the goal, the audience, the one thing that must be understood, and the 2 questions you still need answered — before opening any software.',
    criteria: ['Written before execution, not after', 'Questions sent to the account owner', 'Revision rounds counted and compared']
  },
  {
    id: 'core-08', code: 'CORE-08', origin: 'added', type: 'practice',
    title: 'Present Your Work',
    source: 'Internal — Osolutions workflow',
    url: '',
    duration: '1 week', xp: 80,
    objective: 'Work that cannot be explained gets rewritten by whoever speaks loudest in the room.',
    deliverable: 'Present one project in 3 minutes: the goal, the direction, why this one and not the other.',
    criteria: ['Starts with the client goal, not the software', 'One reason per decision', 'Handles one objection without redesigning live']
  },
  {
    id: 'core-09', code: 'CORE-09', origin: 'added', type: 'practice',
    title: 'The Critique Protocol',
    source: 'Internal — feedback process (deck: "a clear feedback process")',
    url: '',
    duration: 'Ongoing', xp: 80,
    objective: 'Give and take direct, specific feedback. Name whether a note is technical, creative or about communication.',
    deliverable: 'Run or attend 6 critique sessions. Each note must name which of the three it is.',
    criteria: ['Feedback is specific and actionable', 'No feedback about the person', 'The designer restates the note before fixing it']
  }
];

/* ---------- DIVISION TRACKS ---------- */
const TRACK_MISSIONS = {
  kinetic: [
    {
      id: 'kin-01', code: 'KIN-01', origin: 'deck', type: 'course',
      title: 'Soni Courses',
      source: 'sonicourses.com', url: 'https://www.sonicourses.com/',
      duration: 'Self-paced', xp: 120,
      objective: 'Reference library for production quality the deck points the video team at.',
      deliverable: 'Pick one course, finish it, and rebuild one exercise with an Osolutions brief instead of the tutorial brief.',
      criteria: ['Finished, not sampled', 'Reworked with a real brief', 'Technique named and added to your notes']
    },
    {
      id: 'kin-02', code: 'KIN-02', origin: 'deck', type: 'course',
      title: 'Seif Hussam — 3D Courses',
      source: 'seifhussam3d.com', url: 'https://seifhussam3d.com/ar/',
      duration: 'Self-paced', xp: 120,
      objective: 'Add depth, camera and lighting logic to work that currently lives on a flat timeline.',
      deliverable: 'One shot with a real camera move and lighting that motivates the composition.',
      criteria: ['Camera move has a reason', 'Light direction is consistent', 'Renders integrated into an edit, not shown alone']
    },
    {
      id: 'kin-03', code: 'KIN-03', origin: 'added', type: 'practice',
      title: 'Storytelling vs Editing',
      source: 'Internal — named in the deck as the biggest gap',
      url: '',
      duration: '2 weeks', xp: 180,
      objective: 'Editing is already a strength across the division. Storytelling is the layer that sits on top of it — this mission builds that layer.',
      deliverable: 'Take one finished edit. Rebuild it from a written 5-beat story: hook, setup, turn, payoff, close. Same footage, different film.',
      criteria: ['The 5 beats written before touching the timeline', 'Every cut serves a beat', 'Someone who has not seen it can retell the story after one watch']
    },
    {
      id: 'kin-04', code: 'KIN-04', origin: 'added', type: 'practice',
      title: 'Character Sets & Environments',
      source: 'Internal — named in the deck as a required skill',
      url: '',
      duration: '2 weeks', xp: 180,
      objective: 'Build one character that survives across multiple environments without breaking. Consistency is the skill, not the render.',
      deliverable: 'One character, 6 shots, 3 different environments, recognisably the same character in all of them.',
      criteria: ['Same face, wardrobe and proportions across all 6', 'Environments lit differently on purpose', 'Reference sheet saved and reusable']
    },
    {
      id: 'kin-05', code: 'KIN-05', origin: 'added', type: 'practice',
      title: 'Space & Magnification',
      source: 'Internal — named in the deck for the execution phase',
      url: '',
      duration: '1 week', xp: 140,
      objective: 'Understand the power of space and magnification during execution: what to hold wide, what to push in on, and when the frame should breathe.',
      deliverable: 'One sequence cut twice — once with a static scale, once using scale as a storytelling tool. Show both.',
      criteria: ['Every push-in has a narrative trigger', 'Negative space used deliberately at least twice', 'The two versions feel different, not decorated']
    },
    {
      id: 'kin-06', code: 'KIN-06', origin: 'added', type: 'practice',
      title: 'Pacing & Rhythm',
      source: 'Internal', url: '',
      duration: '1 week', xp: 120,
      objective: 'Cut to a beat you chose, not to the beat the music happened to have.',
      deliverable: 'The same 30 seconds cut at three different rhythms. Defend which one ships.',
      criteria: ['Cut points marked before editing', 'Rhythm changes at the turn', 'You can explain the choice in one sentence']
    },
    {
      id: 'kin-07', code: 'KIN-07', origin: 'added', type: 'practice',
      title: 'Colour Grading',
      source: 'Internal', url: '',
      duration: '1 week', xp: 120,
      objective: 'Make the grade carry mood, and make it hold across shots from different sources.',
      deliverable: 'One mixed-source sequence graded to a single look. Before/after included.',
      criteria: ['Skin tones survive the grade', 'Shots match across sources', 'The look has a stated intention']
    },
    {
      id: 'kin-08', code: 'KIN-08', origin: 'added', type: 'practice',
      title: 'Sound Design & Mix',
      source: 'Internal', url: '',
      duration: '1 week', xp: 100,
      objective: 'Sound is half the edit. Stop treating it as the last 10 minutes before delivery.',
      deliverable: 'One piece with a real sound pass: ambience, effects, ducking, and a level-checked mix.',
      criteria: ['Dialogue or VO always intelligible', 'At least 3 designed effects', 'No clipping, levels checked against a standard']
    },
    {
      id: 'kin-09', code: 'KIN-09', origin: 'added', type: 'practice',
      title: 'AI Video Production',
      source: 'Internal — extends the deck’s AI track into motion',
      url: '',
      duration: '2 weeks', xp: 160,
      objective: 'Motion deserves its own AI toolkit: generation, keyframing, upscaling, and the judgement for where AI footage belongs in a cut.',
      deliverable: 'One deliverable where AI-generated shots sit inside a real edit and nobody can point at the seam.',
      criteria: ['AI shots serve the story, not the demo', 'Consistent grade and grain with real footage', 'You can state where you refused to use it and why']
    },
    {
      id: 'kin-10', code: 'KIN-10', origin: 'added', type: 'practice',
      title: 'Motion Typography',
      source: 'Internal — bridges CORE-04 into motion',
      url: '',
      duration: '1 week', xp: 120,
      objective: 'Apply the hierarchy from CORE-04 to type that moves. Most kinetic type fails because the hierarchy was never there to begin with.',
      deliverable: 'One title sequence where hierarchy is readable at every frame, not just at rest.',
      criteria: ['Three levels of hierarchy hold during motion', 'Easing is deliberate', 'Legible at mobile size']
    }
  ],
  forge: [
    {
      id: 'frg-01', code: 'FRG-01', origin: 'deck', type: 'practice',
      title: 'Mood Board Before Execution',
      source: 'Internal — the deck’s stated fix for repeated work',
      url: '',
      duration: 'Ongoing', xp: 160,
      objective: 'Build a mood board before starting and state the direction for the coming month or two. It is what gives every account a look that belongs only to it.',
      deliverable: 'A mood board and a one-paragraph direction, approved before any execution, for every new account cycle.',
      criteria: ['Board exists before the first artboard', 'Direction stated in writing', 'Two consecutive accounts do not look like each other']
    },
    {
      id: 'frg-02', code: 'FRG-02', origin: 'added', type: 'practice',
      title: 'Grid & Composition',
      source: 'Internal', url: '',
      duration: '1 week', xp: 120,
      objective: 'Stop centring everything. Build a grid, then break it on purpose.',
      deliverable: 'One campaign laid out on a documented grid across 4 formats.',
      criteria: ['Grid documented and reusable', 'Every break from it is intentional', 'Holds across all 4 formats']
    },
    {
      id: 'frg-03', code: 'FRG-03', origin: 'added', type: 'practice',
      title: 'Retouching & Compositing',
      source: 'Internal — extends CORE-05', url: '',
      duration: '1 week', xp: 120,
      objective: 'Clean, believable compositing: edges, shadows, colour integration. The part that separates a mockup from a finished piece.',
      deliverable: 'One composite where the subject genuinely belongs in the scene.',
      criteria: ['Edges hold at 100% zoom', 'Contact shadows present', 'Colour temperature matched']
    },
    {
      id: 'frg-04', code: 'FRG-04', origin: 'added', type: 'practice',
      title: 'Brand Systems',
      source: 'Internal', url: '',
      duration: '2 weeks', xp: 150,
      objective: 'Design the rules, not just the artwork. A system survives handover; a one-off does not.',
      deliverable: 'A mini brand system for one account: type scale, palette rules, layout patterns, do and don’t.',
      criteria: ['Another designer can use it without asking you', 'Covers at least 5 recurring formats', 'Written, not implied']
    },
    {
      id: 'frg-05', code: 'FRG-05', origin: 'added', type: 'practice',
      title: 'Layout For Social',
      source: 'Internal', url: '',
      duration: '1 week', xp: 100,
      objective: 'Design for the feed it actually lives in: thumb-stop, safe areas, and legibility at 30% size.',
      deliverable: 'One campaign adapted across story, square, portrait and cover — without a single stretched asset.',
      criteria: ['Readable at thumbnail size', 'Safe areas respected', 'Each format composed, not resized']
    },
    {
      id: 'frg-06', code: 'FRG-06', origin: 'added', type: 'practice',
      title: 'Art Direction',
      source: 'Internal', url: '',
      duration: '2 weeks', xp: 160,
      objective: 'Move from making the thing to deciding what the thing should be. Direction before execution.',
      deliverable: 'Two distinct directions for one brief, each with a stated rationale and a recommendation.',
      criteria: ['The two directions are genuinely different', 'Each has a written rationale', 'You recommend one and can defend it']
    },
    {
      id: 'frg-07', code: 'FRG-07', origin: 'added', type: 'practice',
      title: 'Deck & Presentation Craft',
      source: 'Internal', url: '',
      duration: '1 week', xp: 100,
      objective: 'The work gets judged through the deck. A strong deck lets strong work land.',
      deliverable: 'One client-ready presentation of your own work: context, direction, execution, next step.',
      criteria: ['One idea per slide', 'Work shown in context, not floating', 'Ends with a decision the client can make']
    }
  ]
};

/* ---------- HEROES ---------- */
const HEROES = [
  {
    id: 'alice', name: 'ALICE', codename: 'CHRONOS', title: 'Video Designer',
    division: 'kinetic', rank: 'DESIGNER', portrait: 'assets/heroes/chronos.jpg',
    epithet: 'The one who bends the timeline',
    tagline: 'Editing was never the question. The question was how much more she could be trusted with — and the answer keeps growing.',
    statusTag: 'ROLE EXPANDING',
    origin: [
      'Started as a video editor. Built strong AI skills on her own and now takes on work well outside what she was hired for.',
      'She picked up storyboarding from scratch. Video now starts from a planned sequence instead of being assembled inside the edit — that is a different discipline, and she learned it in one cycle.',
      'What this unlocks: she can be handed more kinds of work. A specialist who can also absorb production load makes the busy weeks far easier to plan.'
    ],
    powers: [
      { name: 'AI in Production', from: 1, to: 4 },
      { name: 'Storyboarding', from: 1, to: 4 },
      { name: 'Work Beyond Video', from: 1, to: 3 },
      { name: 'Video Editing', from: 4, to: 4 }
    ],
    quest: {
      name: 'OVERDRIVE',
      headline: 'Next unlock: let the machine carry the weight.',
      why: 'The craft is already there. The remaining upside is in production speed — every hour AI could absorb is an hour freed for the parts only she can do. Same output, far less lifting.',
      moves: [
        'Collect references and production processes up front, so execution starts with the picture already clear',
        'Build character sets that hold across environments — make the set once, reuse it everywhere',
        'Use space and magnification as deliberate tools during execution',
        'Write the story beats before the timeline opens'
      ]
    },
    phases: [
      {
        n: 1, name: 'UNDERSTAND', origin: 'deck',
        objectives: [
          'Clarify briefs, references and expectations before execution',
          'Establish a clear feedback loop',
          'Read whether an issue is technical, creative or communication-related',
          'Turn direct feedback into a fast change'
        ],
        checkpoint: 'Every project opens with a written reference set and a stated expectation.'
      },
      {
        n: 2, name: 'BUILD CONFIDENCE', origin: 'deck',
        objectives: [
          'Propose solutions before asking for direction',
          'Cut revision rounds by sharpening the brief first'
        ],
        checkpoint: 'Revision rounds measurably lower than Phase 01.'
      },
      {
        n: 3, name: 'INDEPENDENCE', origin: 'deck',
        objectives: [
          'Arrive with the solution already formed'
        ],
        checkpoint: 'A full campaign delivered brief-to-master in a single revision round.'
      }
    ],
    boss: 'A video designer who walks in with the answer already built.',
    extras: ['kin-03', 'kin-04', 'kin-05', 'kin-09']
  },
  {
    id: 'shimaa', name: 'SHIMAA', codename: 'LUMEN', title: 'Video Designer',
    division: 'kinetic', rank: 'DESIGNER', portrait: 'assets/heroes/lumen.jpg',
    epithet: 'The one who splits the light',
    tagline: 'Learned a whole new discipline from zero this cycle. That is the hard part, and it is already done.',
    statusTag: 'NEW SKILL UNLOCKED',
    origin: [
      'The standout gain here is storyboarding. Shimaa had never worked from storyboards before. She does now — so video work starts from a plan that can be approved before a single hour of edit time is spent.',
      'Output matches the written standard far more often, and her briefs now run through the same approval path as the rest of the team. The process side is locked in.',
      'What this unlocks: the foundation is built. The tools sitting on top of it are the fastest win available to anyone on the team right now.'
    ],
    powers: [
      { name: 'Storyboarding', from: 1, to: 4 },
      { name: 'Consistency', from: 2, to: 3 },
      { name: 'New Workflow', from: 1, to: 2 },
      { name: 'AI Tools', from: 1, to: 2 }
    ],
    quest: {
      name: 'MOMENTUM',
      headline: 'Next unlock: carry the storyboard win into the tools.',
      why: 'Going from zero storyboarding to planning every project is the biggest single jump anyone made this cycle. The same momentum applied to the AI toolkit is the shortest path to the next level.',
      moves: [
        'One new tool a week, used on live client work rather than a test file',
        'Storyboard every project — the habit is already there, keep it absolute',
        'Pair on one Space build a week with the Forge division',
        'Check against the written standard before submitting, so the win is visible up front'
      ]
    },
    phases: [
      {
        n: 1, name: 'ADOPT', origin: 'added',
        objectives: [
          'Run everything on the new workflow — one process, no parallel track',
          'Fold one AI tool per week into real client work',
          'Storyboard before the timeline opens, every time',
          'Bring every brief through the shared approval path'
        ],
        checkpoint: 'Three projects in a row delivered fully on the new workflow.'
      },
      {
        n: 2, name: 'CONSISTENCY', origin: 'added',
        objectives: [
          'Hold the written standard without a review pass',
          'Keep deliverables on one account tightly matched',
          'Handle revisions independently',
          'Use the AI tools in production, not as a side experiment'
        ],
        checkpoint: 'Two deliverables in a row clear review with no standard notes.'
      },
      {
        n: 3, name: 'SELF-DIRECTION', origin: 'added',
        objectives: [
          'Own a project end to end',
          'Propose the treatment rather than receive it',
          'Present the direction before execution'
        ],
        checkpoint: 'A project where the treatment was hers and shipped as proposed.'
      }
    ],
    boss: 'A designer whose output lands right without needing a second pair of eyes.',
    extras: ['kin-03', 'kin-06', 'kin-07', 'kin-09']
  },
  {
    id: 'mahmoud', name: 'MAHMOUD', codename: 'ATLAS', title: 'Senior Designer',
    division: 'forge', rank: 'SENIOR', portrait: 'assets/heroes/atlas.jpg',
    epithet: 'The one who carries the standard',
    tagline: 'The biggest move anyone made this cycle. Quality no longer depends on one person, because it depends on him too.',
    statusTag: 'RUNS INDEPENDENTLY',
    origin: [
      'The biggest change in the team. Mahmoud now starts from the client goal and explains his layout from it. Before, he started from the software — that is a genuine shift in how he thinks, not just what he makes.',
      'His AI work went from nothing to a normal part of the day. He knows where AI output belongs in a piece and where it does not, which is the judgement most people skip.',
      'What this unlocks: he knows the standard well enough to carry work forward with almost no review. That hands back review time and means the standard now holds across two people instead of one.'
    ],
    powers: [
      { name: 'Design Thinking', from: 2, to: 5 },
      { name: 'AI in Production', from: 1, to: 5 },
      { name: 'Working Independently', from: 2, to: 5 },
      { name: 'Holds The Standard', from: 2, to: 5 }
    ],
    quest: {
      name: 'THE SIGNATURE',
      headline: 'Next unlock: give every account its own voice.',
      why: 'He has internalised the standard so completely that it travels with him into every account. That is exactly what a Lead should have. The next level is range on top of it — each account carrying a look that belongs only to it.',
      moves: [
        'Build a mood board before anything starts',
        'State the direction for the coming month or two up front',
        'Bring two genuinely different directions to a brief before committing',
        'Put two consecutive accounts side by side and push them further apart'
      ]
    },
    phases: [
      {
        n: 1, name: 'OWNERSHIP', origin: 'deck',
        objectives: [
          'Take ownership of one full account',
          'Lead the creative process from brief to delivery',
          'Take an active seat in team reviews',
          'Support the Junior and Intern designers'
        ],
        checkpoint: 'One account fully his, with the Lead reviewing only at delivery.'
      },
      {
        n: 2, name: 'LEADERSHIP', origin: 'deck',
        objectives: [
          'Run the account independently',
          'Lead creative discussions with the team',
          'Review the work of assigned designers',
          'Present creative directions before execution',
          'Handle client feedback with minimal supervision'
        ],
        checkpoint: 'He runs the creative discussion; the Lead attends without steering.'
      },
      {
        n: 3, name: 'SENIOR OWNERSHIP', origin: 'deck',
        objectives: [
          'Own creative direction on assigned projects',
          'Mentor the Junior designers',
          'Run first-level quality reviews'
        ],
        checkpoint: 'First-level review is his. The Lead sees escalations only.'
      }
    ],
    boss: 'Senior Designer to Creative Lead — the person the standard runs through.',
    extras: ['frg-01', 'frg-04', 'frg-06', 'frg-07']
  },
  {
    id: 'islam', name: 'ISLAM', codename: 'FORGE', title: 'Graphic Designer',
    division: 'forge', rank: 'DESIGNER', portrait: 'assets/heroes/forge.jpg',
    epithet: 'The one who builds from raw brief',
    tagline: 'A clear run ahead: from making what is asked to deciding what gets asked for.',
    statusTag: 'STATS BEING SET',
    origin: [
      'Islam’s plan is the clearest of the group on direction: move from executing given work to owning the project that produces it.',
      'The route runs project ownership, then concept development, then a full account under his name — each phase adding one level of decision-making on top of the last.',
      'His starting stats are being set by the Team Lead now, so progress gets measured on exactly the same scale as everyone else.'
    ],
    powers: [
      { name: 'Design Thinking', from: 0, to: 0 },
      { name: 'AI in Production', from: 0, to: 0 },
      { name: 'Concept Development', from: 0, to: 0 },
      { name: 'Working Independently', from: 0, to: 0 }
    ],
    powersPending: true,
    quest: {
      name: 'THE FIRST CROWN',
      pending: true,
      headline: 'Next unlock: your first account, start to finish.',
      why: 'The whole run points at one thing — an account that is genuinely his, from the brief through to the client conversation. Everything before it is preparation for that.',
      moves: [
        'Team Lead sets the starting stats before Phase 01 opens',
        'Agree the one measurable behaviour that marks the shift from executing to owning',
        'Pick the account he will take first, so the target is real from day one'
      ]
    },
    phases: [
      {
        n: 1, name: 'OWNERSHIP', origin: 'deck',
        objectives: [
          'Take ownership of specific projects',
          'Sharpen how briefs get read',
          'Take a seat in ideation sessions',
          'Present the reasoning behind the design in reviews'
        ],
        checkpoint: 'He can name the reason behind every major decision in a review.'
      },
      {
        n: 2, name: 'INDEPENDENCE', origin: 'deck',
        objectives: [
          'Own projects from brief to delivery',
          'Develop the concept before execution starts',
          'Handle revisions independently',
          'Run further between check-ins'
        ],
        checkpoint: 'A full project delivered without a mid-way direction check.'
      },
      {
        n: 3, name: 'ACCOUNT OWNERSHIP', origin: 'deck',
        objectives: [
          'Run an assigned account or project independently',
          'Present concepts and solutions',
          'Handle feedback and revisions'
        ],
        checkpoint: 'An account running under his name, Lead at delivery only.'
      }
    ],
    boss: 'From executor to Account Owner — the person the client asks for.',
    extras: ['frg-02', 'frg-03', 'frg-05', 'frg-06']
  },
  {
    id: 'yomna', name: 'YOMNA', codename: 'NOVA', title: 'Junior Designer',
    division: 'forge', rank: 'JUNIOR', portrait: 'assets/heroes/nova.jpg',
    epithet: 'The rising star',
    tagline: 'Fundamentals first, then the work becomes hers. A straight climb with nothing in the way.',
    statusTag: 'STATS BEING SET',
    origin: [
      'Yomna’s run is built the way it should be for this stage: fundamentals first, then small ownership, then responsibility for how a project lands.',
      'By the end of the third phase she is presenting her own solutions and handling client feedback — a genuine step up from executing tasks.',
      'Her starting stats are being set by the Team Lead now, so every gain is measured on the same scale as the rest of the team.'
    ],
    powers: [
      { name: 'Design Fundamentals', from: 0, to: 0 },
      { name: 'Speed & Consistency', from: 0, to: 0 },
      { name: 'Concept Development', from: 0, to: 0 },
      { name: 'Decision Confidence', from: 0, to: 0 }
    ],
    powersPending: true,
    quest: {
      name: 'THE ASCENT',
      pending: true,
      headline: 'Next unlock: own the outcome, not just the task.',
      why: 'The fundamentals are the fastest thing to build at this stage, and they compound into everything after. Once they are solid, ownership follows almost on its own.',
      moves: [
        'Team Lead sets the starting stats before Phase 01 opens',
        'Agree what confident decision-making looks like in a review',
        'Pick the first small project she carries end to end'
      ]
    },
    phases: [
      {
        n: 1, name: 'LEARN', origin: 'deck',
        objectives: [
          'Learn the team workflow end to end',
          'Build the design fundamentals',
          'Take on smaller deliverables',
          'Join the creative reviews'
        ],
        checkpoint: 'She can walk the workflow start to finish unprompted.'
      },
      {
        n: 2, name: 'DEVELOP', origin: 'deck',
        objectives: [
          'Own small projects',
          'Develop the initial concept',
          'Handle simple revisions independently',
          'Build speed and consistency'
        ],
        checkpoint: 'Concepts arrive before execution, not during it.'
      },
      {
        n: 3, name: 'RESPONSIBILITY', origin: 'deck',
        objectives: [
          'Own small projects from brief to delivery',
          'Communicate requirements clearly',
          'Present creative solutions',
          'Handle client feedback with support nearby',
          'Make the call and back it'
        ],
        checkpoint: 'She presents her own work to the account owner and holds the room.'
      }
    ],
    boss: 'From task execution to project responsibility — the work becomes hers.',
    extras: ['frg-02', 'frg-03', 'frg-05', 'frg-07']
  },
  {
    id: 'asmaa', name: 'ASMAA', codename: 'EMBER', title: 'Intern Designer',
    division: 'forge', rank: 'INTERN', portrait: 'assets/heroes/ember.jpg',
    epithet: 'The first spark',
    tagline: 'Ninety days from production support to ready for a Junior seat.',
    statusTag: 'STATS BEING SET',
    origin: [
      'Asmaa’s run is the classic build: foundation, then supervised practice, then independence on simple work — the fastest-moving stretch of anyone’s path, because everything is new.',
      'By the third phase the target is explicit: doing Junior-level work before the title changes.',
      'Her starting stats are being set by the Team Lead now, so the progress shows on the same scale as everyone else.'
    ],
    powers: [
      { name: 'Photoshop / Illustrator', from: 0, to: 0 },
      { name: 'Brand Guidelines', from: 0, to: 0 },
      { name: 'Speed & Detail', from: 0, to: 0 },
      { name: 'Working Unsupervised', from: 0, to: 0 }
    ],
    powersPending: true,
    quest: {
      name: 'THE SPARK',
      pending: true,
      headline: 'Next unlock: deliver something start to finish, on your own.',
      why: 'Everything at this stage compounds fast. The first task carried alone from brief to delivery is the moment the rest of the path opens up.',
      moves: [
        'Team Lead sets the starting stats before Phase 01 opens',
        'Define the concrete bar for Junior-ready, so the target is visible',
        'Pick the first task she takes without supervision'
      ]
    },
    phases: [
      {
        n: 1, name: 'FOUNDATION', origin: 'deck',
        objectives: [
          'Learn the team workflow',
          'Learn the brand guidelines',
          'Take on simple production tasks',
          'Support the designers with adaptations',
          'Build the Photoshop and Illustrator fundamentals'
        ],
        checkpoint: 'Adaptations come back right the first time.'
      },
      {
        n: 2, name: 'PRACTICE', origin: 'deck',
        objectives: [
          'Handle simple deliverables independently',
          'Take on the social media adaptations',
          'Hold the existing visual direction',
          'Join the ideation sessions',
          'Build speed and attention to detail'
        ],
        checkpoint: 'A full set of social adaptations delivered with no corrections.'
      },
      {
        n: 3, name: 'INDEPENDENCE', origin: 'deck',
        objectives: [
          'Own simple design tasks from brief to delivery',
          'Deliver without supervision',
          'Bring ideas to the smaller projects',
          'Handle basic revisions',
          'Show she is ready for Junior-level work'
        ],
        checkpoint: 'She is doing Junior work before the title changes.'
      }
    ],
    boss: 'From production support to Junior-ready — the title just catching up.',
    extras: ['frg-02', 'frg-05', 'frg-07']
  }
];

/* ---------- THE JOURNEY MAP ----------
   Nine stations along one road. A station unlocks only when the one
   before it is fully cleared. core = explicit mission ids;
   arc / track = indices into that hero's personal and division lists. */
const JOURNEY = [
  { n: 1, chapter: 1, name: 'THE SIGNAL', glyph: '◈',
    tagline: 'Every run starts by knowing exactly where you are going.',
    core: ['core-07'], arc: [0], track: [] },
  { n: 2, chapter: 1, name: 'THE ATELIER', glyph: '✦',
    tagline: 'Trade prompting for a workflow you can re-run and hand over.',
    core: ['core-01', 'core-02'], arc: [], track: [] },
  { n: 3, chapter: 1, name: 'THE WORKSHOP', glyph: '⬡',
    tagline: 'Chain the tools into one pipeline the whole team can open.',
    core: ['core-03'], arc: [], track: [0] },
  { n: 4, chapter: 2, name: 'THE TYPE GARDEN', glyph: '◐',
    tagline: 'Make anything readable in two seconds flat.',
    core: ['core-04'], arc: [], track: [] },
  { n: 5, chapter: 2, name: 'THE COLOUR SPRING', glyph: '◉',
    tagline: 'Turn colour from a feeling into a rule you can defend.',
    core: ['core-06'], arc: [], track: [1] },
  { n: 6, chapter: 2, name: 'THE MAKERS HALL', glyph: '⬢',
    tagline: 'Build it by hand, then build it with the machine. Master both.',
    core: ['core-05'], arc: [1], track: [] },
  { n: 7, chapter: 3, name: 'THE STAGE', glyph: '▲',
    tagline: 'Work that can be explained is work that ships.',
    core: ['core-08'], arc: [2], track: [] },
  { n: 8, chapter: 3, name: 'THE ROUND TABLE', glyph: '⬣',
    tagline: 'Give notes that land. Take notes that build.',
    core: ['core-09'], arc: [], track: [2] },
  { n: 9, chapter: 3, name: 'THE SUMMIT', glyph: '★',
    tagline: 'Everything you have collected, running at once.',
    core: [], arc: [3], track: [3, 4, 5, 6, 7, 8, 9] }
];

const CHAPTERS = {
  1: { name: 'FOUNDATIONS', sub: 'Month 01 — get the ground solid' },
  2: { name: 'CRAFT', sub: 'Month 02 — build the range' },
  3: { name: 'MASTERY', sub: 'Month 03 — run it yourself' }
};

/* ---------- SKILL TREE (deck: final "Learning Track" slide) ---------- */
const SKILL_TREE = [
  {
    id: 'gem-type', name: 'TYPOGRAPHY & VISUAL HIERARCHY', color: '#F76302',
    creed: 'If it cannot be read in two seconds, it was not designed.',
    feeds: ['core-04', 'kin-10', 'frg-02', 'frg-07']
  },
  {
    id: 'gem-color', name: 'COLOUR THEORY & APPLICATION', color: '#22E0F0',
    creed: 'Colour is a rule, not a mood.',
    feeds: ['core-06', 'kin-07', 'frg-04', 'frg-05']
  },
  {
    id: 'gem-ai', name: 'AI & MANUAL DESIGN TECHNIQUES', color: '#A855F7',
    creed: 'Know what the machine can carry, and what it will drop.',
    feeds: ['core-01', 'core-02', 'core-03', 'core-05', 'kin-09', 'frg-03']
  }
];

/* ---------- THE VAULT ---------- */
const VAULT = [
  { name: 'Ahmed Safa', kind: 'Instagram', note: 'Page the deck marks as must-follow.', url: 'https://www.instagram.com/ahmed.safa97/' },
  { name: 'Obada Ramadan', kind: 'Instagram', note: 'Page the deck marks as must-follow.', url: 'https://www.instagram.com/obada.ramadan/' },
  { name: 'Soni Courses', kind: 'Course library', note: 'Motion and production reference library.', url: 'https://www.sonicourses.com/' },
  { name: 'Seif Hussam 3D', kind: 'Course library', note: '3D courses — camera, light, depth.', url: 'https://seifhussam3d.com/ar/' }
];
