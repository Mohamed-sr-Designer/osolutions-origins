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
    objective: 'The deck lists Colour Theory as a required track but attaches no material. This mission fills that gap.',
    deliverable: 'A palette system for one live account: primary, secondary, neutrals, and the rule for when each is used.',
    criteria: ['Contrast checked, not eyeballed', 'A written rule for every colour', 'Applied to 3 deliverables without changing the palette']
  },
  {
    id: 'core-07', code: 'CORE-07', origin: 'added', type: 'practice',
    title: 'Reading The Brief',
    source: 'Internal — Osolutions workflow',
    url: '',
    duration: '3 days', xp: 80,
    objective: 'Most revisions are not design failures. They are brief failures. Catch them before execution.',
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
    deliverable: 'Present one project in 3 minutes: the problem, the direction, why this and not the other one.',
    criteria: ['Starts with the client goal, not the software', 'One reason per decision', 'Handles one objection without redesigning live']
  },
  {
    id: 'core-09', code: 'CORE-09', origin: 'added', type: 'practice',
    title: 'The Critique Protocol',
    source: 'Internal — feedback process (deck: "a clear feedback process")',
    url: '',
    duration: 'Ongoing', xp: 80,
    objective: 'Give and take direct, specific feedback. Separate technical, creative and communication problems.',
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
      objective: 'The deck states it directly: the team is focused on editing, and there is still a big gap between the editing approach and actual storytelling. This mission closes it.',
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
      objective: 'The deck’s AI missions are all image-based. Motion needs its own: generation, keyframing, upscaling, and knowing where AI footage cannot go.',
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
      objective: 'The deck names the fix directly: build a mood board before starting, and explain the direction for the coming month or two. It keeps work from rhyming across accounts.',
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
      objective: 'The work gets judged through the deck. A weak deck loses strong work.',
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
    tagline: 'Editing was never the problem. The problem was that editing was the only thing we could give her.',
    statusTag: 'WIDER ROLE',
    origin: [
      'Started as a video editor only. Built strong AI skills and now takes on work outside her first job.',
      'She also learned storyboarding, which she did not do before. Video now starts from a planned sequence instead of being built inside the edit.',
      'What this changes: we can give her more kinds of work. A specialist who can also take extra production load makes busy weeks much easier to plan.'
    ],
    powers: [
      { name: 'AI in Production', from: 1, to: 4 },
      { name: 'Storyboarding', from: 1, to: 4 },
      { name: 'Work Beyond Video', from: 1, to: 3 },
      { name: 'Video Editing', from: 4, to: 4 }
    ],
    nemesis: {
      name: 'THE DRAG',
      threat: 'Speed under pressure, and an unclaimed ceiling on what AI can carry.',
      brief: 'Execution is slower than the brief allows, and the full production capability of AI has not been claimed yet. Every hour AI could absorb is currently paid for by hand.',
      counter: [
        'Show more ideas and production processes through multiple references before execution starts',
        'Character sets across different environments — build the set, not the shot',
        'Space and magnification as execution tools, not afterthoughts',
        'Storytelling before editing: the beats get written before the timeline opens'
      ]
    },
    phases: [
      {
        n: 1, name: 'UNDERSTAND', origin: 'deck',
        objectives: [
          'Clarify briefs, references and expectations before execution',
          'Establish a clear feedback process',
          'Understand whether an issue is technical, creative or communication-related',
          'Receive and act on direct, specific feedback'
        ],
        checkpoint: 'No project starts without a written reference set and a stated expectation.'
      },
      {
        n: 2, name: 'BUILD CONFIDENCE', origin: 'deck',
        objectives: [
          'Propose solutions before asking for direction',
          'Reduce unnecessary revisions through clearer briefs'
        ],
        checkpoint: 'Revision rounds drop measurably against Phase 01.'
      },
      {
        n: 3, name: 'INDEPENDENCE', origin: 'deck',
        objectives: [
          'Deliver solutions instead of waiting for instructions'
        ],
        checkpoint: 'One full campaign delivered brief-to-master with a single revision round.'
      }
    ],
    boss: 'Build confidence and clarity — a video designer who arrives with the solution already formed.',
    extras: ['kin-03', 'kin-04', 'kin-05', 'kin-09']
  },
  {
    id: 'shimaa', name: 'SHIMAA', codename: 'LUMEN', title: 'Video Designer',
    division: 'kinetic', rank: 'DESIGNER', portrait: 'assets/heroes/lumen.jpg',
    epithet: 'The one who splits the light',
    tagline: 'New skill, slower change — but the change is real.',
    statusTag: 'NEW SKILL, SLOWER CHANGE',
    origin: [
      'The clearest gain here is storyboarding. Shimaa did not work from storyboards before. She does now, so video work starts from a plan we can approve before we spend edit time on it.',
      'To be honest: the wider workflow change was slower here than in the design team, and the AI tools are still not fully used.',
      'There was still real progress. The output matches the written standard more often, and briefs now come through the same approval path as the rest of the team.'
    ],
    powers: [
      { name: 'Storyboarding', from: 1, to: 4 },
      { name: 'Consistency', from: 2, to: 3 },
      { name: 'Using The New Workflow', from: 1, to: 2 },
      { name: 'Trying AI Tools', from: 1, to: 2 }
    ],
    nemesis: {
      name: 'THE SLOW BURN',
      threat: 'Adoption lag. The tools are available; the habit is not built yet.',
      brief: 'Workflow and AI adoption moved slower here than in the design team. The gap is not ability — it is that new tools are being tested on the side instead of inside real deliverables.',
      counter: [
        'One new tool per week, used on live client work — not on a test file',
        'Storyboard every project, no exceptions, before edit time is spent',
        'Pair on one Space build per week with the Forge division',
        'Consistency check against the written standard before submitting, not after'
      ]
    },
    phases: [
      {
        n: 1, name: 'ADOPT', origin: 'added',
        objectives: [
          'Move fully onto the new workflow — no parallel old process',
          'Integrate one AI tool per week into real client work',
          'Storyboard every project before the timeline opens',
          'Bring every brief through the shared approval path'
        ],
        checkpoint: 'Three consecutive projects delivered entirely on the new workflow.'
      },
      {
        n: 2, name: 'CONSISTENCY', origin: 'added',
        objectives: [
          'Hold the written standard without a review pass',
          'Reduce variance between deliverables on the same account',
          'Handle revisions independently',
          'Use AI tools in production, not as an experiment'
        ],
        checkpoint: 'Two deliverables in a row pass review with no standard-related notes.'
      },
      {
        n: 3, name: 'SELF-DIRECTION', origin: 'added',
        objectives: [
          'Own a project end to end',
          'Propose the treatment rather than execute a given one',
          'Present the direction before execution'
        ],
        checkpoint: 'One project where the treatment was hers and shipped without a rewrite.'
      }
    ],
    boss: 'Move from "new skill, slower change" to a designer whose output is predictable without review.',
    extras: ['kin-03', 'kin-06', 'kin-07', 'kin-09']
  },
  {
    id: 'mahmoud', name: 'MAHMOUD', codename: 'ATLAS', title: 'Senior Designer',
    division: 'forge', rank: 'SENIOR', portrait: 'assets/heroes/atlas.jpg',
    epithet: 'The one who carries the standard',
    tagline: 'My shadow for the next 3 months.',
    statusTag: 'WORKS ON HIS OWN NOW',
    origin: [
      'The biggest change in the team. Mahmoud now starts from the client goal and explains his layout from it. Before, he started from the software.',
      'His AI work went from nothing to a normal part of his day. He knows where AI output can go in a piece and where it cannot.',
      'What this changes: he knows the standard well enough to carry work forward with very little review. That gives back review time and means quality no longer depends on one person.'
    ],
    powers: [
      { name: 'Design Thinking', from: 2, to: 5 },
      { name: 'AI in Production', from: 1, to: 5 },
      { name: 'Working On His Own', from: 2, to: 5 },
      { name: 'Holds The Standard Alone', from: 2, to: 5 }
    ],
    nemesis: {
      name: 'THE ECHO',
      threat: 'Solutions that travel between accounts and start to rhyme.',
      brief: 'He repeats what he does across many accounts. This is not necessarily bad — the execution is strong — but it is avoidable, and it costs each account its own character.',
      counter: [
        'Build a mood board before starting anything new',
        'State the direction for the coming one to two months upfront',
        'Two distinct directions per brief before committing to one',
        'Review two consecutive accounts side by side — if they rhyme, restart the board'
      ]
    },
    phases: [
      {
        n: 1, name: 'OWNERSHIP', origin: 'deck',
        objectives: [
          'Take ownership of one full account',
          'Lead the creative process from brief to delivery',
          'Participate in team reviews',
          'Support Junior and Intern designers'
        ],
        checkpoint: 'One account fully owned, with the Lead only reviewing at delivery.'
      },
      {
        n: 2, name: 'LEADERSHIP', origin: 'deck',
        objectives: [
          'Manage the account independently',
          'Lead creative discussions with the team',
          'Review assigned designers’ work',
          'Present creative directions before execution',
          'Handle client feedback with minimal supervision'
        ],
        checkpoint: 'He runs the creative discussion; the Lead attends but does not steer.'
      },
      {
        n: 3, name: 'SENIOR OWNERSHIP', origin: 'deck',
        objectives: [
          'Lead creative direction for assigned projects',
          'Mentor Junior designers',
          'Conduct first-level quality reviews'
        ],
        checkpoint: 'First-level review passes to him. The Lead only sees escalations.'
      }
    ],
    boss: 'Turn Mahmoud from a Senior Designer into a reliable Creative Lead.',
    extras: ['frg-01', 'frg-04', 'frg-06', 'frg-07']
  },
  {
    id: 'islam', name: 'ISLAM', codename: 'FORGE', title: 'Graphic Designer',
    division: 'forge', rank: 'DESIGNER', portrait: 'assets/heroes/forge.jpg',
    epithet: 'The one who builds from raw brief',
    tagline: 'From executor to owner.',
    statusTag: 'BASELINE PENDING',
    origin: [
      'No written assessment was recorded for Islam in the source deck — only the three-month plan.',
      'The plan is clear on direction: move from executing given work to owning the project that produces it.',
      'Baseline skill levels need to be set by the Team Lead before Phase 01 starts, so progress can be measured the same way it is measured for the rest of the team.'
    ],
    powers: [
      { name: 'Design Thinking', from: 0, to: 0 },
      { name: 'AI in Production', from: 0, to: 0 },
      { name: 'Concept Development', from: 0, to: 0 },
      { name: 'Working On His Own', from: 0, to: 0 }
    ],
    powersPending: true,
    nemesis: {
      name: 'UNIDENTIFIED',
      pending: true,
      threat: 'Not recorded in the source deck.',
      brief: 'The deck records a three-month plan for Islam but no challenge note and no skill assessment. Until the Team Lead defines it, this slot stays empty rather than being invented.',
      counter: [
        'Team Lead to record the primary blocker before Phase 01 begins',
        'Set baseline levels across the four power tracks',
        'Agree the single measurable behaviour that marks the shift from executor to owner'
      ]
    },
    phases: [
      {
        n: 1, name: 'OWNERSHIP', origin: 'deck',
        objectives: [
          'Take ownership of specific projects',
          'Improve understanding of briefs',
          'Participate in ideation sessions',
          'Present design rationale during reviews'
        ],
        checkpoint: 'He can state the reason behind every major decision in a review.'
      },
      {
        n: 2, name: 'INDEPENDENCE', origin: 'deck',
        objectives: [
          'Own projects from brief to delivery',
          'Develop concepts before execution',
          'Handle revisions independently',
          'Reduce dependency on the Team Lead'
        ],
        checkpoint: 'A full project delivered without a direction check-in mid-way.'
      },
      {
        n: 3, name: 'ACCOUNT OWNERSHIP', origin: 'deck',
        objectives: [
          'Manage an assigned account or project independently',
          'Present concepts and solutions',
          'Handle feedback and revisions'
        ],
        checkpoint: 'One account running under his name with the Lead at delivery only.'
      }
    ],
    boss: 'Turn Islam from an executor into an independent Account Owner.',
    extras: ['frg-02', 'frg-03', 'frg-05', 'frg-06']
  },
  {
    id: 'yomna', name: 'YOMNA', codename: 'NOVA', title: 'Junior Designer',
    division: 'forge', rank: 'JUNIOR', portrait: 'assets/heroes/nova.jpg',
    epithet: 'The one still gaining light',
    tagline: 'From task execution to project responsibility.',
    statusTag: 'BASELINE PENDING',
    origin: [
      'No written assessment was recorded for Yomna in the source deck — only the three-month plan.',
      'The trajectory in the plan is fundamentals first, then small ownership, then responsibility for the outcome.',
      'Baseline levels need to be set by the Team Lead before Phase 01 starts.'
    ],
    powers: [
      { name: 'Design Fundamentals', from: 0, to: 0 },
      { name: 'Speed & Consistency', from: 0, to: 0 },
      { name: 'Concept Development', from: 0, to: 0 },
      { name: 'Decision Confidence', from: 0, to: 0 }
    ],
    powersPending: true,
    nemesis: {
      name: 'UNIDENTIFIED',
      pending: true,
      threat: 'Not recorded in the source deck.',
      brief: 'The deck records a three-month plan for Yomna but no challenge note and no skill assessment. The slot stays empty until the Team Lead defines it.',
      counter: [
        'Team Lead to record the primary blocker before Phase 01 begins',
        'Set baseline levels across the four power tracks',
        'Agree what "confident decision-making" looks like in a review'
      ]
    },
    phases: [
      {
        n: 1, name: 'LEARN', origin: 'deck',
        objectives: [
          'Understand the team workflow',
          'Improve design fundamentals',
          'Work on smaller deliverables',
          'Participate in creative reviews'
        ],
        checkpoint: 'She can walk the workflow end to end without prompting.'
      },
      {
        n: 2, name: 'DEVELOP', origin: 'deck',
        objectives: [
          'Own small projects',
          'Develop initial concepts',
          'Handle simple revisions independently',
          'Improve speed and consistency'
        ],
        checkpoint: 'Concepts arrive before execution, not during it.'
      },
      {
        n: 3, name: 'RESPONSIBILITY', origin: 'deck',
        objectives: [
          'Own small projects from brief to delivery',
          'Communicate requirements clearly',
          'Present creative solutions',
          'Handle client feedback with supervision',
          'Become more confident in decision-making'
        ],
        checkpoint: 'She presents her own work to the account owner and holds the room.'
      }
    ],
    boss: 'Move Yomna from task execution to project responsibility.',
    extras: ['frg-02', 'frg-03', 'frg-05', 'frg-07']
  },
  {
    id: 'asmaa', name: 'ASMAA', codename: 'EMBER', title: 'Intern Designer',
    division: 'forge', rank: 'INTERN', portrait: 'assets/heroes/ember.jpg',
    epithet: 'The first spark',
    tagline: 'From production support to Junior-ready.',
    statusTag: 'BASELINE PENDING',
    origin: [
      'No written assessment was recorded for Asmaa in the source deck — only the three-month plan.',
      'The plan runs foundation, then supervised practice, then independence on simple work.',
      'Baseline levels need to be set by the Team Lead before Phase 01 starts.'
    ],
    powers: [
      { name: 'Photoshop / Illustrator', from: 0, to: 0 },
      { name: 'Brand Guidelines', from: 0, to: 0 },
      { name: 'Speed & Attention To Detail', from: 0, to: 0 },
      { name: 'Working Unsupervised', from: 0, to: 0 }
    ],
    powersPending: true,
    nemesis: {
      name: 'UNIDENTIFIED',
      pending: true,
      threat: 'Not recorded in the source deck.',
      brief: 'The deck records a three-month plan for Asmaa but no challenge note and no skill assessment. The slot stays empty until the Team Lead defines it.',
      counter: [
        'Team Lead to record the primary blocker before Phase 01 begins',
        'Set baseline levels across the four power tracks',
        'Define the concrete bar for "Junior-ready"'
      ]
    },
    phases: [
      {
        n: 1, name: 'FOUNDATION', origin: 'deck',
        objectives: [
          'Learn the team’s workflow',
          'Understand brand guidelines',
          'Handle simple production tasks',
          'Support designers with adaptations',
          'Improve Photoshop and Illustrator fundamentals'
        ],
        checkpoint: 'Adaptations come back correct the first time.'
      },
      {
        n: 2, name: 'PRACTICE', origin: 'deck',
        objectives: [
          'Handle simple deliverables independently',
          'Work on social media adaptations',
          'Follow the existing visual direction',
          'Participate in ideation sessions',
          'Improve speed and attention to detail'
        ],
        checkpoint: 'A full set of social adaptations delivered with no corrections.'
      },
      {
        n: 3, name: 'INDEPENDENCE', origin: 'deck',
        objectives: [
          'Own simple design tasks from brief to delivery',
          'Deliver without constant supervision',
          'Contribute ideas to smaller projects',
          'Handle basic revisions',
          'Demonstrate readiness for Junior-level responsibilities'
        ],
        checkpoint: 'She is doing Junior work before the title changes.'
      }
    ],
    boss: 'Move Asmaa from production support to a Junior-ready designer.',
    extras: ['frg-02', 'frg-05', 'frg-07']
  }
];

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
