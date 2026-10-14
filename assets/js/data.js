/* ============================================================
   OSOLUTIONS: ORIGINS — Learning Path Data
   Source of truth: "Enhance & Process" deck (62 slides)
   origin: 'deck'  = taken directly from the deck
   origin: 'added' = written to fill a gap (flagged in the UI)
   ============================================================ */

const PROGRAM = {
  title: 'Osolutions Learning Path',
  subtitle: 'Enhance & Process — 180 day development plan',
  startDate: '2026-08-18',
  days: 180,
  ranks: ['Intern', 'Junior', 'Designer', 'Senior', 'Lead'],
  levels: ['—', 'Emerging', 'Developing', 'Competent', 'Strong', 'Independent'],
  cap: 'Every track is capped at 6 months: three for Stage 1, three for Stage 2. Nothing here runs past the 180-day window.',
  target: 'By day 180 everyone works at senior level in editing, motion and Blender, using free video lessons. Final goals are set from each person\'s evaluation.'
};

const DIVISIONS = {
  kinetic: {
    id: 'kinetic',
    name: 'Motion Team',
    short: 'Motion',
    role: 'Video editing, animation and AI production',
    color: '#22E0F0',
    creed: 'Work that moves — video, animation and AI production.'
  },
  forge: {
    id: 'forge',
    name: 'Design Team',
    short: 'Design',
    role: 'Graphic design, branding and AI production',
    color: '#F76302',
    creed: 'Work that holds still — graphic design, branding and AI production.'
  }
};

/* ---------- SHARED CORE — everyone takes these ---------- */
const CORE_MISSIONS = [
  {
    id: 'core-01', code: 'CORE-01', hours: 3, origin: 'deck', type: 'video',
    title: 'The New AI Workflow',
    source: 'Freepik Spaces — "This New AI Workflow Replaces Prompting"',
    url: 'https://www.youtube.com/watch?v=xG7fACIFSGk',
    duration: '1 session',
    objective: 'Stop writing prompts. Start building node graphs you can re-run, version and hand to someone else.',
    deliverable: 'One Space rebuilt from a real brief you already shipped — same output, node-based.',
    criteria: ['The graph runs twice and gives a controllable result', 'You can explain every node to a teammate', 'No manual re-prompting between versions']
  },
  {
    id: 'core-02', code: 'CORE-02', hours: 2, origin: 'deck', type: 'video',
    title: 'Every Node Explained — Part I',
    source: 'Magnific AI Tutorial (Freepik Spaces)',
    url: 'https://www.youtube.com/watch?v=52WhUjkmsTk',
    duration: '1 session',
    objective: 'Learn what each node actually does instead of guessing which one to drag in.',
    deliverable: 'A one-page node cheatsheet in your own words, shared with the team.',
    criteria: ['Every node named with its real use case', 'At least 3 nodes you had never used before', 'Posted to the team channel']
  },
  {
    id: 'core-03', code: 'CORE-03', hours: 3, origin: 'deck', type: 'video',
    title: 'Every Node Explained — Part II',
    source: 'Magnific AI Tutorial (Freepik Spaces)',
    url: 'https://www.youtube.com/watch?v=FdLRSKxkA6k',
    duration: '1 session',
    objective: 'Chain nodes into a production pipeline: input, control, upscale, output.',
    deliverable: 'One reusable Space template the whole team can open and run.',
    criteria: ['Named and documented', 'Works on someone else’s brief without edits', 'Handles at least 2 aspect ratios']
  },
  {
    id: 'core-04', code: 'CORE-04', hours: 8, origin: 'deck', type: 'course',
    title: 'Typography & Visual Hierarchy',
    source: 'Graphic Design Course — Before & After Edition',
    url: 'https://www.youtube.com/watch?v=Tm25IxJQPWM&list=PL-c9Rq56P4Kln7CVqo4UY85zElYfW6_2j&index=3',
    duration: '2 weeks',
    objective: 'Understand text hierarchy and its proper application in design. (Deck objective, verbatim.)',
    deliverable: 'Take 3 of your own old deliverables and redo the hierarchy only — no new art, no new colour.',
    criteria: ['Three levels of hierarchy readable in 2 seconds', 'Type scale is deliberate, not default', 'Before/after posted for review']
  },
  {
    id: 'core-05', code: 'CORE-05', hours: 6, origin: 'deck', type: 'video',
    title: 'Manipulation — Back to REAL Art',
    source: 'Spider-Man Poster Design Without AI (Photoshop manipulation)',
    url: 'https://www.youtube.com/watch?v=b1QoecESJJE',
    duration: '1 week',
    objective: 'Understand the tools and techniques, whether using manual or AI-based methods. (Deck objective, verbatim.)',
    deliverable: 'One poster built manually, then the same concept rebuilt with AI. Compare cost, time and control.',
    criteria: ['Manual version has real masking and light logic', 'You can say where AI helped and where it lied', 'Both versions presented side by side']
  },
  {
    id: 'core-06', code: 'CORE-06', hours: 6, videos: [{ id: '2QTHs7QSR9o', title: "Color Theory for Beginners (free course)", by: "Envato Tuts+" }, { id: 'Tznnrjkhp7E', title: "Color Theory for Graphic Design: How to Choose Better Colors", by: "4 The Creatives" }, { id: '8N_TW6q5-Bw', title: "Color Theory Masterclass 2026", by: "Saurabh Saini" }], origin: 'added', type: 'practice',
    title: 'Colour Theory & Application',
    source: 'Internal — built for the Learning Track',
    url: '',
    duration: '2 weeks',
    objective: 'Colour is one of the three learning tracks. This course gives it a concrete, defensible system rather than instinct.',
    deliverable: 'A palette system for one live account: primary, secondary, neutrals, and the rule for when each is used.',
    criteria: ['Contrast checked, not eyeballed', 'A written rule for every colour', 'Applied to 3 deliverables without changing the palette']
  },
  {
    id: 'core-07', code: 'CORE-07', hours: 2, videos: [{ id: 'cJrpeLgW_Wc', title: "10 Questions to Ask a Client Before Creating a Design Brief", by: "WebFX" }, { id: '2txi9YNAyjc', title: "16 Client Project Questions for Graphic Designers", by: "Graphic Design How To" }, { id: 'eHi_Y64tiYE', title: "Anatomy of a Strong Graphic Design Brief", by: "Gareth David Studio" }, { id: 'NGnSnGUB1vs', title: "How to Nail Your Design Brief", by: "Digisnapsss" }], origin: 'added', type: 'practice',
    title: 'Reading The Brief',
    source: 'Internal — Osolutions workflow',
    url: '',
    duration: '3 days',
    objective: 'Revision rounds usually trace back to the brief, not the design. Sharpen the brief and the rounds drop.',
    deliverable: 'For your next 3 briefs: write the goal, the audience, the one thing that must be understood, and the 2 questions you still need answered — before opening any software.',
    criteria: ['Written before execution, not after', 'Questions sent to the account owner', 'Revision rounds counted and compared']
  },
  {
    id: 'core-08', code: 'CORE-08', hours: 3, videos: [{ id: '_WyYr1p1XVk', title: "How to Present Design So Clients Say YES", by: "Flux Academy" }, { id: 'RJEINa1G1cQ', title: "How to Present Logo Concepts to Clients", by: "Megan Weeks" }], origin: 'added', type: 'practice',
    title: 'Present Your Work',
    source: 'Internal — Osolutions workflow',
    url: '',
    duration: '1 week',
    objective: 'Work that cannot be explained gets rewritten by whoever speaks loudest in the room.',
    deliverable: 'Present one project in 3 minutes: the goal, the direction, why this one and not the other.',
    criteria: ['Starts with the client goal, not the software', 'One reason per decision', 'Handles one objection without redesigning live']
  },
  {
    id: 'core-09', code: 'CORE-09', hours: 3, videos: [{ id: 'fcoMDIn52pE', title: "How to Give Better Design Feedback", by: "Superside" }, { id: 'JcqG3dILKZY', title: "How to Give a Professional Design Critique", by: "Lindsay Marsh" }, { id: 'F-sGQ1rM6Bw', title: "How to Give Design Feedback", by: "Jesse Showalter" }], origin: 'added', type: 'practice',
    title: 'The Critique Protocol',
    source: 'Internal — feedback process (deck: "a clear feedback process")',
    url: '',
    duration: 'Ongoing',
    objective: 'Give and take direct, specific feedback. Name whether a note is technical, creative or about communication.',
    deliverable: 'Run or attend 6 critique sessions. Each note must name which of the three it is.',
    criteria: ['Feedback is specific and actionable', 'No feedback about the person', 'The designer restates the note before fixing it']
  }
];

/* ---------- TEAM TRACKS ---------- */
const TRACK_MISSIONS = {
  kinetic: [
    {
      id: 'kin-01', code: 'KIN-01', hours: 6, origin: 'deck', type: 'course',
      title: 'Soni Courses',
      source: 'sonicourses.com', url: 'https://www.sonicourses.com/',
      duration: 'Self-paced',
      objective: 'Reference library for production quality the deck points the video team at.',
      deliverable: 'Pick one course, finish it, and rebuild one exercise with an Osolutions brief instead of the tutorial brief.',
      criteria: ['Finished, not sampled', 'Reworked with a real brief', 'Technique named and added to your notes']
    },
    {
      id: 'kin-02', code: 'KIN-02', hours: 6, origin: 'deck', type: 'course',
      title: 'Seif Hussam — 3D Courses',
      source: 'seifhussam3d.com', url: 'https://seifhussam3d.com/ar/',
      duration: 'Self-paced',
      objective: 'Add depth, camera and lighting logic to work that currently lives on a flat timeline.',
      deliverable: 'One shot with a real camera move and lighting that motivates the composition.',
      criteria: ['Camera move has a reason', 'Light direction is consistent', 'Renders integrated into an edit, not shown alone']
    },
    {
      id: 'kin-03', code: 'KIN-03', hours: 4, origin: 'added', type: 'practice',
      title: 'Storytelling vs Editing',
      source: 'Internal — named in the deck as the biggest gap',
      url: '',
      duration: '2 weeks',
      objective: 'Editing is already a strength across the team. Storytelling is the layer that sits on top of it, and this course builds it.',
      deliverable: 'Take one finished edit. Rebuild it from a written 5-beat story: hook, setup, turn, payoff, close. Same footage, different film.',
      criteria: ['The 5 beats written before touching the timeline', 'Every cut serves a beat', 'Someone who has not seen it can retell the story after one watch']
    },
    {
      id: 'kin-04', code: 'KIN-04', hours: 5, videos: [{ id: 'jC2srIYbA78', title: "Character Consistency: A Kling AI Canvas Workflow", by: "Sergio Valdez" }, { id: 'RK-989PgFk4', title: "How to Make Consistent Characters in Veo 3", by: "AI Video School" }], origin: 'added', type: 'practice',
      title: 'Character Sets & Environments',
      source: 'Internal — named in the deck as a required skill',
      url: '',
      duration: '2 weeks',
      objective: 'Build one character that survives across multiple environments without breaking. Consistency is the skill, not the render.',
      deliverable: 'One character, 6 shots, 3 different environments, recognisably the same character in all of them.',
      criteria: ['Same face, wardrobe and proportions across all 6', 'Environments lit differently on purpose', 'Reference sheet saved and reusable']
    },
    {
      id: 'kin-05', code: 'KIN-05', hours: 4, videos: [{ id: '53C4JPULu68', title: "All Camera Shot Sizes Explained", by: "Shawn Dolinski" }, { id: 'wiMUHOuwI5M', title: "What Are Camera Shot Sizes and Framing", by: "Postpace" }, { id: 'XEEgxwduYFA', title: "Mastering 27 Camera Shots, Moves, and Angles", by: "jimcostafilms" }], origin: 'added', type: 'practice',
      title: 'Space & Magnification',
      source: 'Internal — named in the deck for the execution phase',
      url: '',
      duration: '1 week',
      objective: 'Understand the power of space and magnification during execution: what to hold wide, what to push in on, and when the frame should breathe.',
      deliverable: 'One sequence cut twice — once with a static scale, once using scale as a storytelling tool. Show both.',
      criteria: ['Every push-in has a narrative trigger', 'Negative space used deliberately at least twice', 'The two versions feel different, not decorated']
    },
    {
      id: 'kin-06', code: 'KIN-06', hours: 3, origin: 'added', type: 'practice',
      title: 'Pacing & Rhythm',
      source: 'Internal', url: '',
      duration: '1 week',
      objective: 'Cut to a beat you chose, not to the beat the music happened to have.',
      deliverable: 'The same 30 seconds cut at three different rhythms. Defend which one ships.',
      criteria: ['Cut points marked before editing', 'Rhythm changes at the turn', 'You can explain the choice in one sentence']
    },
    {
      id: 'kin-07', code: 'KIN-07', hours: 4, origin: 'added', type: 'practice',
      title: 'Colour Grading',
      source: 'Internal', url: '',
      duration: '1 week',
      objective: 'Make the grade carry mood, and make it hold across shots from different sources.',
      deliverable: 'One mixed-source sequence graded to a single look. Before/after included.',
      criteria: ['Skin tones survive the grade', 'Shots match across sources', 'The look has a stated intention']
    },
    {
      id: 'kin-08', code: 'KIN-08', hours: 3, origin: 'added', type: 'practice',
      title: 'Sound Design & Mix',
      source: 'Internal', url: '',
      duration: '1 week',
      objective: 'Sound is half the edit. Stop treating it as the last 10 minutes before delivery.',
      deliverable: 'One piece with a real sound pass: ambience, effects, ducking, and a level-checked mix.',
      criteria: ['Dialogue or VO always intelligible', 'At least 3 designed effects', 'No clipping, levels checked against a standard']
    },
    {
      id: 'kin-09', code: 'KIN-09', hours: 6, videos: [{ id: '3PetDyf6Iwg', title: "5 FREE AI Video Generation Tools You Need to Try in 2026", by: "Digital Media Skills" }, { id: 'ziSfvzRFLac', title: "These 8 AI Video Tools Are Completely FREE", by: "Lassine AI" }], origin: 'added', type: 'practice',
      title: 'AI Video Production',
      source: 'Internal — extends the deck’s AI track into motion',
      url: '',
      duration: '2 weeks',
      objective: 'Motion deserves its own AI toolkit: generation, keyframing, upscaling, and the judgement for where AI footage belongs in a cut.',
      deliverable: 'One deliverable where AI-generated shots sit inside a real edit and nobody can point at the seam.',
      criteria: ['AI shots serve the story, not the demo', 'Consistent grade and grain with real footage', 'You can state where you refused to use it and why']
    },
    {
      id: 'kin-10', code: 'KIN-10', hours: 4, origin: 'added', type: 'practice',
      title: 'Motion Typography',
      source: 'Internal — bridges CORE-04 into motion',
      url: '',
      duration: '1 week',
      objective: 'Apply the hierarchy from CORE-04 to type that moves. Most kinetic type fails because the hierarchy was never there to begin with.',
      deliverable: 'One title sequence where hierarchy is readable at every frame, not just at rest.',
      criteria: ['Three levels of hierarchy hold during motion', 'Easing is deliberate', 'Legible at mobile size']
    }
  ],
  forge: [
    {
      id: 'frg-01', code: 'FRG-01', hours: 4, videos: [{ id: 'D6gSFNWP-eU', title: "Mood Boards Explained: A Simple Brand Design Tool", by: "Coursera" }, { id: 'pF1BDc0tZ6w', title: "What is Mood Board", by: "Canva" }, { id: '3r67_pPBeQY', title: "Best Brainstorming Trick for Artists: Mood Boards", by: "Art Prof" }, { id: 'rVHKbGWJVi8', title: "Art directing a project: how to make a moodboard", by: "GarageFarm Academy" }], origin: 'deck', type: 'practice',
      title: 'Mood Board Before Execution',
      source: 'Internal — the deck’s stated fix for repeated work',
      url: '',
      duration: 'Ongoing',
      objective: 'Build a mood board before starting and state the direction for the coming month or two. It is what gives every account a look that belongs only to it.',
      deliverable: 'A mood board and a one-paragraph direction, approved before any execution, for every new account cycle.',
      criteria: ['Board exists before the first artboard', 'Direction stated in writing', 'Two consecutive accounts do not look like each other']
    },
    {
      id: 'frg-02', code: 'FRG-02', hours: 4, origin: 'added', type: 'practice',
      title: 'Grid & Composition',
      source: 'Internal', url: '',
      duration: '1 week',
      objective: 'Stop centring everything. Build a grid, then break it on purpose.',
      deliverable: 'One campaign laid out on a documented grid across 4 formats.',
      criteria: ['Grid documented and reusable', 'Every break from it is intentional', 'Holds across all 4 formats']
    },
    {
      id: 'frg-03', code: 'FRG-03', hours: 5, videos: [{ id: 'KJhuHWeRr1k', title: "Easy Portrait Retouching Using Frequency Separation and Dodge and Burn", by: "Prince Meyson" }, { id: 'TGEtoMjLWvg', title: "Advanced Skin Retouching using Dodge & Burn and Frequency Separation", by: "The Tech Tourque" }, { id: 'PurAA6hWpuA', title: "Corrective Dodge and Burn and Frequency Separation", by: "iCapture Studios" }], origin: 'added', type: 'practice',
      title: 'Retouching & Compositing',
      source: 'Internal — extends CORE-05', url: '',
      duration: '1 week',
      objective: 'Clean, believable compositing: edges, shadows, colour integration. The part that separates a mockup from a finished piece.',
      deliverable: 'One composite where the subject genuinely belongs in the scene.',
      criteria: ['Edges hold at 100% zoom', 'Contact shadows present', 'Colour temperature matched']
    },
    {
      id: 'frg-04', code: 'FRG-04', hours: 6, origin: 'added', type: 'practice',
      title: 'Brand Systems',
      source: 'Internal', url: '',
      duration: '2 weeks',
      objective: 'Design the rules, not just the artwork. A system survives handover; a one-off does not.',
      deliverable: 'A mini brand system for one account: type scale, palette rules, layout patterns, do and don’t.',
      criteria: ['Another designer can use it without asking you', 'Covers at least 5 recurring formats', 'Written, not implied']
    },
    {
      id: 'frg-05', code: 'FRG-05', hours: 4, videos: [{ id: 'N8TQfE1qKeE', title: "Master Layout & Composition Design", by: "Satori Graphics" }, { id: 'v04_46cWiDY', title: "7 Advanced Tips For Layout & Composition", by: "Typefool" }], origin: 'added', type: 'practice',
      title: 'Layout For Social',
      source: 'Internal', url: '',
      duration: '1 week',
      objective: 'Design for the feed it actually lives in: thumb-stop, safe areas, and legibility at 30% size.',
      deliverable: 'One campaign adapted across story, square, portrait and cover — without a single stretched asset.',
      criteria: ['Readable at thumbnail size', 'Safe areas respected', 'Each format composed, not resized']
    },
    {
      id: 'frg-06', code: 'FRG-06', hours: 6, origin: 'added', type: 'practice',
      title: 'Art Direction',
      source: 'Internal', url: '',
      duration: '2 weeks',
      objective: 'Move from making the thing to deciding what the thing should be. Direction before execution.',
      deliverable: 'Two distinct directions for one brief, each with a stated rationale and a recommendation.',
      criteria: ['The two directions are genuinely different', 'Each has a written rationale', 'You recommend one and can defend it']
    },
    {
      id: 'frg-07', code: 'FRG-07', hours: 4, videos: [{ id: '7hdtmyIvg-E', title: "Dream Big. Pitch Bigger: Storytelling and Pitch Decks", by: "BizLitFest" }, { id: 'Ri0Pe1Y6lwM', title: "15 Slides you NEED on your Pitch Deck", by: "Slidebean" }, { id: 'EJ4XV9k8Gcc', title: "The Perfect Pitch Deck Structure (50+ Real Examples)", by: "Nik Zechner" }, { id: 'iHNwH4oiPIE', title: "Ultimate Pitch Deck Guide with Examples", by: "Raw Startup" }], origin: 'added', type: 'practice',
      title: 'Deck & Presentation Craft',
      source: 'Internal', url: '',
      duration: '1 week',
      objective: 'The work gets judged through the deck. A strong deck lets strong work land.',
      deliverable: 'One client-ready presentation of your own work: context, direction, execution, next step.',
      criteria: ['One idea per slide', 'Work shown in context, not floating', 'Ends with a decision the client can make']
    }
  ]
};

/* ---------- THE LADDER ----------
   Free material, ordered from mid-level to senior, taken by everyone. */
const LADDER_MISSIONS = [
  {
    id: 'lad-01', code: 'EDIT-1', origin: 'added', type: 'course', level: 'Foundation', hours: 6,
    title: "Editing Foundations in Premiere Pro",
    source: "Free YouTube courses (Premiere Pro is part of the Adobe licence)",
    url: 'https://www.youtube.com/watch?v=48Fn-PQILIY',
    duration: '6 hours',
    videos: [{ id: '48Fn-PQILIY', title: "Premiere Pro For Beginners — 2025 Edition", by: "Valentina Vee x Adobe Video" }, { id: 'u4vX5RgUX0E', title: "Premiere Pro Tutorial for Beginners — Full Course in 1 Hour", by: "" }, { id: 'oLMdXC_B1vQ', title: "Learn Adobe Premiere Pro Start to Finish — 2 Hour Workshop", by: "Adobe Video" }, { id: 'xDq3ij-oHJA', title: "Premiere Pro Tutorial for Beginners — Full Course", by: "" }, { id: 'aq-_Gd9EI_c', title: "Free Course: How to Use Adobe Premiere Pro for Beginners", by: "" }],
    objective: "Premiere Pro is the first editing tool everyone learns here, since it sits beside After Effects in the same Adobe workflow. Import, cut, trim, transitions, titles and export, end to end.",
    deliverable: "A 60 second edit built from raw footage, exported and shared with the team.",
    criteria: ["Clean cuts with no accidental gaps","Titles and audio levelled","Exported at the right size and format for its platform"]
  },
  {
    id: 'lad-12', code: 'STORY-1', origin: 'added', type: 'course', level: 'Foundation', hours: 3,
    title: "Storytelling Concepts: Structure, Beats and Emotion",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=gQ58-GPaj2k',
    duration: '3 hours',
    videos: [{ id: 'gQ58-GPaj2k', title: "The Three-Act Structure Explained in Less Than 2 Minutes", by: "" }, { id: 'dzi0p25nw2s', title: "Three Act Structure: The Ultimate Guide", by: "" }, { id: 'Kp7NR2cmSS4', title: "Intro to Story Beats (Save the Cat)", by: "" }, { id: 'DfLaFm-G3ag', title: "The 3-Act Structure — The Secret of Editing a Great Film Trailer", by: "" }, { id: 'HS0ZYtFLGmU', title: "7 Tips to Tell Better Stories Through Video Editing", by: "" }, { id: 'SIxQPIHtX64', title: "How to Tell a Story with Video Editing", by: "" }],
    objective: "Before any cutting technique, understand what a story is: setup, confrontation, resolution, and the beats between them. Everything later in this path uses this idea.",
    deliverable: "Take one finished video, mark its three acts and its main beats on the timeline, and write two sentences on what each act does.",
    criteria: ["You can name the setup, turning point and payoff of a piece","Beats are marked on a real timeline, not just described","You can explain why one cut earns its place in the story"]
  },
  {
    id: 'lad-02', code: 'EDIT-2', origin: 'added', type: 'course', level: 'Foundation', hours: 3,
    title: "Cuts and Pacing",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=J0ydlAqg6_8',
    duration: "4 hours",
    videos: [{ id: 'J0ydlAqg6_8', title: "The ONLY 7 Cuts You Need To Tell Any Story", by: "Tim Runia" }, { id: 'eraB3u3e7aM', title: "How to Control PACING in your Video Editing", by: "Abhay PS Rajawat" }, { id: 'WOVroZM6NCo', title: "Rhythm in Film Editing", by: "John Tindell" }, { id: 'a9reuDw4cnU', title: "How to Pace Your Film", by: "StudioBinder" }], 
    objective: "With the story structure from STORY-1 in place, learn the cut types and how pace shapes feeling, so each cut serves a beat.",
    deliverable: "Recut your edit from EDIT-1 twice with different pacing, marking the story beats first, then write one sentence on which one ships and why.",
    criteria: ["Each version has a stated idea behind its pacing","You can name the cut types you used","The two versions feel clearly different"]
  },
  {
    id: 'lad-03', code: 'MOTION-1', origin: 'added', type: 'course', level: 'Intermediate', hours: 8,
    title: "Motion Foundations in After Effects",
    source: "Free YouTube courses (After Effects is part of the Adobe licence)",
    url: 'https://www.youtube.com/watch?v=lHlyBUn9OAs',
    duration: "8 hours",
    videos: [{ id: 'lHlyBUn9OAs', title: "After Effects for Beginners — Free Course", by: "Motion by Nick" }, { id: 'ALmYrTm6EKQ', title: "Learn After Effects — Beginner Motion Design Workshop", by: "Adobe Video" }, { id: 'ROw_Xnmg2W4', title: "Complete Intro to Motion Design — Full After Effects Course", by: "TipTut" }, { id: '9dl2vd2vbk4', title: "After Effects Basics Tutorial Series for Beginners", by: "Motion Nations" }], 
    objective: "Animate shapes, text and layers with keyframes, masks and precomps, and know where everything lives in the timeline.",
    deliverable: "A 10 second looping motion piece built from your own layout.",
    criteria: ["Loops cleanly with no visible jump","Layers named and organised","Rendered and shared with the team"]
  },
  {
    id: 'lad-04', code: 'MOTION-2', origin: 'added', type: 'course', level: 'Intermediate', hours: 4,
    title: "Timing, Easing and Graph Editor",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=6zrEKEuJGKs',
    duration: "4 hours",
    videos: [{ id: '6zrEKEuJGKs', title: "Beautiful easing curves in After Effects", by: "Jake In Motion" }, { id: 'IzUxpC5xVi4', title: "After Effects Basics: 'Easing' and the Graph Editor", by: "Motion Teaching" }, { id: 'a1_b1uEOb8U', title: "Motion Graphics Masterclass (8 hours) — optional deep dive", by: "Ag Motion Designs" }], 
    objective: "What separates mid-level motion from senior motion is timing. Learn to shape the curve instead of accepting the default.",
    deliverable: "Take your MOTION-1 piece and rebuild every move with hand-shaped easing curves.",
    criteria: ["No keyframe left on default easing","Heavy and light objects move differently","Shown next to the original so the difference is visible"]
  },
  {
    id: 'lad-05', code: '3D-1', origin: 'added', type: 'course', level: 'Intermediate', hours: 10,
    title: "Blender Foundations",
    source: "Free — Blender is open source",
    url: 'https://www.youtube.com/watch?v=4haAdmHqGOw',
    duration: "10 hours",
    videos: [{ id: '4haAdmHqGOw', title: "Beginner Blender 4.0 Tutorial — the full donut course", by: "Blender Guru" }, { id: 'z-Xl9tGqH14', title: "Beginner Blender Tutorial (2026)", by: "Blender Guru" }], 
    objective: "Learn the interface, modelling, materials, lighting and rendering by building one complete scene. Everything later builds on this.",
    deliverable: "Your own finished render of the tutorial scene, with at least one change that makes it yours.",
    criteria: ["Modelled, shaded and lit by you","Rendered at final quality","One deliberate change from the tutorial"]
  },
  {
    id: 'lad-06', code: '3D-2', origin: 'added', type: 'course', level: 'Senior', hours: 6,
    title: "Blender Lighting and Materials",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=xACzjrh-pYo',
    duration: "6 hours",
    videos: [{ id: 'xACzjrh-pYo', title: "FREE Blender Course — Part 2: Lighting & Materials", by: "ukramedia" }, { id: 'vXe2Vsr0PEg', title: "Product Lighting in Blender (Free Course: Part 3)", by: "The Blenderender" }], 
    objective: "Light and material choices decide whether a 3D shot looks professional. Learn key, fill and rim lights and believable surfaces.",
    deliverable: "One object lit three different ways, with a note on what each setup communicates.",
    criteria: ["A reason behind every light","Materials look believable up close","Three clearly different moods"]
  },
  {
    id: 'lad-13', code: 'EDIT-3', origin: 'added', type: 'course', level: 'Senior', hours: 3,
    title: "DaVinci Resolve Essentials",
    source: "Free DaVinci Resolve — the full version costs nothing",
    url: 'https://www.youtube.com/watch?v=fDe7G8Tz6cA',
    duration: '3 hours',
    videos: [{ id: 'fDe7G8Tz6cA', title: "DaVinci Resolve 20 for Beginners: Crash Course", by: "Jason Yadlovski" }, { id: 'CC_-V5qjhaY', title: "DaVinci Resolve 20 — Complete Tutorial for Beginners", by: "Justin Brown" }],
    objective: "You already edit in Premiere. Resolve is the free tool that goes furthest in colour and sound, so learn just enough of it to grade and mix.",
    deliverable: "Open your EDIT-1 project in Resolve, rebuild the cut, and export it.",
    criteria: ["The cut matches your Premiere version","You can find the Edit, Color and Fairlight pages without help","Exported cleanly"]
  },
  {
    id: 'lad-07', code: 'GRADE-1', origin: 'added', type: 'course', level: 'Senior', hours: 5,
    title: "Colour Grading in DaVinci Resolve",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=jvQhY8F30uw',
    duration: "5 hours",
    videos: [{ id: 'jvQhY8F30uw', title: "DaVinci Resolve Color Grading for Beginners — Free Course", by: "Envato Tuts+" }, { id: 'QK6pAiaiXO4', title: "The Only Color Grading Guide You Need", by: "Graham Hunt" }, { id: 'LQiySO0eXGQ', title: "Easy Color Grading in DaVinci Resolve", by: "Elib Filmz" }], 
    objective: "Match shots from different sources, protect skin tones, and give a piece one intentional look.",
    deliverable: "One mixed-source sequence graded to a single look, with before and after.",
    criteria: ["Shots match across sources","Skin tones look natural","The look has a stated intention"]
  },
  {
    id: 'lad-08', code: 'SOUND-1', origin: 'added', type: 'course', level: 'Senior', hours: 3,
    title: "Sound for Editors",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=f5JWZpa_LmY',
    duration: "3 hours",
    videos: [{ id: 'f5JWZpa_LmY', title: "Complete DaVinci Resolve Audio Course — Free Fairlight Training", by: "DaVinci Dojo" }, { id: 'r00ZfXkUA2Y', title: "How I Get PERFECT AUDIO in DaVinci Resolve", by: "Joris Hermans" }, { id: 'tbH2MKPnc_0', title: "Fairlight Training: Introduction to Mixing", by: "Blackmagic Design" }], 
    objective: "Sound is half of the edit. Clean dialogue, level the mix and add a few designed effects.",
    deliverable: "Give one existing edit a proper sound pass: clean voice, ambience, a few effects, levelled mix.",
    criteria: ["Voice is always clear","No clipping","At least three designed sound effects"]
  },
  {
    id: 'lad-09', code: '3D-3', origin: 'added', type: 'course', level: 'Senior', hours: 7,
    title: "Blender Product Animation and Motion Graphics",
    source: "Free YouTube courses",
    url: 'https://www.youtube.com/watch?v=q3q3-iweRZ8',
    duration: "7 hours",
    videos: [{ id: 'q3q3-iweRZ8', title: "FREE COURSE: Blender Product Animation (do Chapter 1, serum bottle)", by: "JB 3D Studio" }, { id: 'tWvgHbZXCtA', title: "Geometry Nodes for Complete Beginners — Part 1", by: "Ryan King Art" }, { id: '-M-Y3WYPvnE', title: "Create Easy Motion Graphics With Geometry Nodes", by: "Terry Blend" }], 
    objective: "Animate a lit product shot and learn the basics of procedural motion with Geometry Nodes.",
    deliverable: "One animated product shot of 8 to 10 seconds, rendered and ready to drop into an edit.",
    criteria: ["Camera move has a purpose","Lighting carried over from 3D-2","Renders cleanly with no flicker"]
  },
  {
    id: 'lad-10', code: 'AI-1', origin: 'added', type: 'course', level: 'Senior', hours: 4,
    title: "Free AI Video Workflow",
    source: "Free and open source tools",
    url: 'https://www.youtube.com/watch?v=0z8Pp4TaAl8',
    duration: "4 hours",
    videos: [{ id: '31GR1pXlB1g', title: "My AI Filmmaking Workflow: Kling, Veo & Nano Banana", by: "AI Video School" }, { id: 'htpz-FgzJdM', title: "Kling 3.0 AI Video Generator: Free AI Video Tool", by: "BrainyBytes" }, { id: '17YPqat8aDE', title: "Kling AI Image to Video Tutorial", by: "Cem Eygi Media" }, { id: '3PetDyf6Iwg', title: "5 FREE AI Video Generation Tools You Need to Try in 2026", by: "Digital Media Skills" }], 
    objective: "Build a repeatable image to video workflow with free tools, so AI footage becomes something you can plan, not something you hope for. Free tools give limited credits, so test on short clips first.",
    deliverable: "One 5 second AI shot made with a documented, repeatable workflow, cut into a real edit.",
    criteria: ["The workflow is written down so someone else can repeat it","Matches the grade of surrounding footage","Used where it helps the story"]
  },
  {
    id: 'lad-11', code: 'CAPSTONE', origin: 'added', type: 'course', level: 'Senior', hours: 8, videos: [{ id: 'vlRmtD1FGlA', title: "The Story to Motion Design Workflow: From Brief to Animation", by: "Styleframe Saturdays" }, { id: 'UMTyVhq7k-E', title: "How to edit a TV Commercial", by: "Michael Odelberth" }, { id: 'Zs9DPR9AsS8', title: "How To Edit A Product Commercial", by: "The Blenderender" }],
    title: "Senior Capstone — one piece, every skill",
    source: "Internal — the proof of senior level",
    url: '',
    duration: "8 hours",
    
    objective: "Bring editing, motion, 3D and AI together in one piece, the way a senior would on a real brief.",
    deliverable: "A 30 second piece that uses a real edit, a motion graphics layer, one Blender shot and one AI shot, graded and mixed.",
    criteria: ["Starts from a written brief and a storyboard","Every technique serves the story","Graded, mixed and exported ready to publish","Presented in three minutes, with the reasoning"]
  }
];

/* ---------- DESIGN LADDER ----------
   Free material for the Design Team: craft, branding, art direction, AI. */
const DESIGN_MISSIONS = [
  {
    id: 'des-01', code: 'CRAFT-1', origin: 'added', type: 'course', level: 'Intermediate', hours: 6,
    title: "Photoshop Craft",
    source: "Free YouTube lessons (Photoshop is part of the Adobe licence)",
    url: 'https://www.youtube.com/watch?v=RzBHzo-IWQU',
    duration: '6 hours',
    videos: [{ id: 'RzBHzo-IWQU', title: "Adobe Photoshop Free Course for Beginners (Full)", by: "Pixel & Bracket" }, { id: 'L70dxMOSecU', title: "Advanced Photoshop for Everyone", by: "Envato Tuts+" }, { id: 'y501KkJGsOY', title: "Free Graphic Design Course: Beginner to Advanced Photoshop", by: "Azad Chaiwala" }],
    objective: "Strong layout is only as good as the craft under it: layers, masks, selections, smart objects and non-destructive workflow done properly.",
    deliverable: "Rebuild one of your own older pieces with a fully non-destructive file: named layers, masks, smart objects, nothing flattened.",
    criteria: ["Every edit can be changed later","Layers named and grouped so a colleague can open the file","Edges and masks hold up at 100% zoom"]
  },
  {
    id: 'des-02', code: 'CRAFT-2', origin: 'added', type: 'course', level: 'Intermediate', hours: 6,
    title: "Illustrator and Logo Construction",
    source: "Free YouTube lessons (Illustrator is part of the Adobe licence)",
    url: 'https://www.youtube.com/watch?v=0_4-hbHM0Ck',
    duration: '6 hours',
    videos: [{ id: '0_4-hbHM0Ck', title: "Adobe Illustrator Course: 100% FREE", by: "Jeremy Mura" }, { id: 'mXYPZ7YGwcM', title: "Create a Vector Logo Design from Sketch", by: "Dom Designs" }, { id: 'xE8-LyEJQd8', title: "Learn How To Draw a Vector Logo in Adobe Illustrator", by: "Dansky" }],
    objective: "Vector craft is the base of every identity. Learn clean paths, shape building and the sketch to vector process.",
    deliverable: "Take three pencil sketches of a mark and build them as clean vectors, then pick one.",
    criteria: ["Paths use the fewest points that work","Curves are smooth at 400% zoom","The mark works in one colour"]
  },
  {
    id: 'des-03', code: 'LAYOUT-1', origin: 'added', type: 'course', level: 'Intermediate', hours: 5,
    title: "Layout Systems: Grids and Composition",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=kWbp1vEEuB0',
    duration: '5 hours',
    videos: [{ id: 'kWbp1vEEuB0', title: "Learn Grids and Layouts in Graphic Design", by: "Paola Kassa" }, { id: 'oPrDgIuxdYQ', title: "Better Layouts in Minutes: Using 6 Professional Grids", by: "GraphiqVibe" }, { id: 'DDDFYt7N4Xg', title: "Grid Systems in Graphic Design", by: "4 The Creatives" }, { id: 'N8TQfE1qKeE', title: "Master Layout & Composition Design", by: "Satori Graphics" }],
    objective: "Stop centring everything. Build a grid, use it, then break it on purpose. Pairs with CORE-04 so type and layout are learned together.",
    deliverable: "One campaign laid out on a documented grid in three formats.",
    criteria: ["The grid is drawn and written down","Every break from the grid is deliberate","Holds across all three formats"]
  },
  {
    id: 'des-04', code: 'BRAND-1', origin: 'added', type: 'course', level: 'Intermediate', hours: 5,
    title: "Brand Strategy and Positioning",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=y1YiAKzivsg',
    duration: '5 hours',
    videos: [{ id: 'y1YiAKzivsg', title: "Brand Strategy for Beginners: Audience, Positioning, Values & Personality", by: "4 The Creatives" }, { id: 'swPSJGXExgo', title: "How To Create A Brand Positioning Strategy", by: "Brand Master Academy" }, { id: 'CivS0WAZzlc', title: "Brand Positioning: A 4-Step Framework", by: "Elements Brand Management" }, { id: 'Rcv-J6534oE', title: "What Is Brand Positioning? With Examples", by: "Brand Master Academy" }],
    objective: "A strong identity starts with a decision about who the brand is for and why it matters. Learn audience, positioning, values and personality before drawing anything.",
    deliverable: "A one page brand strategy for a real or fictional brand: audience, positioning line, three values, personality in five words.",
    criteria: ["The positioning fits in one sentence","It names what the brand is not","Written before any visual work starts"]
  },
  {
    id: 'des-05', code: 'BRAND-2', origin: 'added', type: 'course', level: 'Senior', hours: 7,
    title: "Logo and Identity Design",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=mhUMNu7XeTE',
    duration: '7 hours',
    videos: [{ id: 'mhUMNu7XeTE', title: "Complete Brand Identity Design from Zero to Mockups", by: "GraphiqVibe" }, { id: 'FBTvh_OOcNY', title: "How to Design a Brand Identity (Full Guide 2026)", by: "Yanis Xavier" }, { id: 'yB2j6JJmnJk', title: "How To Design a Brand Identity: Real Client Process", by: "Anik Jain" }],
    objective: "Turn the strategy into a mark, a type and colour system and a set of applications, following the process working studios use.",
    deliverable: "A full identity built on your BRAND-1 strategy: logo, colour, type and three mockups.",
    criteria: ["Every visual choice traces back to the positioning","The mark works large and at favicon size","Presented as a story, not a sheet of assets"]
  },
  {
    id: 'des-06', code: 'BRAND-3', origin: 'added', type: 'course', level: 'Senior', hours: 5,
    title: "Brand Guidelines and Applications",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=bj5UMd1IQUs',
    duration: '5 hours',
    videos: [{ id: 'bj5UMd1IQUs', title: "How to Create Brand Guidelines", by: "Edward White" }, { id: 'STWzeKO2CGE', title: "How to design a brand style guide", by: "Kayla" }, { id: 'qFEROyN9kWc', title: "How to create a brandbook", by: "Simplified HQ" }, { id: 'isl5vIjqKDA', title: "Let's InDesign: A Brand Guide", by: "Adobe Live" }],
    objective: "An identity only survives handover if it is documented. Build the guidelines another designer could use without asking you.",
    deliverable: "A guidelines document for your BRAND-2 identity: logo rules, colour, type, layout, do and do not.",
    criteria: ["Another designer could use it unaided","Covers at least five recurring formats","Exported as a clean PDF"]
  },
  {
    id: 'des-07', code: 'ART-1', origin: 'added', type: 'course', level: 'Senior', hours: 6,
    title: "Art Direction: Visual Language and Moodboards",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=-oMqEVHcukg',
    duration: '6 hours',
    videos: [{ id: '-oMqEVHcukg', title: "How a Brand Designer Actually Moodboards", by: "Will Paterson" }, { id: 'FzNpsv6l-mY', title: "Brand Identity Design Process: Mood Board & Visual Direction", by: "Megan Weeks" }, { id: 'GSBjVedREWE', title: "Mastering Moodboards: Great Creative Work", by: "orenmeetsworld" }, { id: 'gK0ynvv9Yas', title: "How I Create Mood Boards For My Design Projects", by: "Paola Kassa" }, { id: 'uOvNil7caN4', title: "How to Art Direct your Mood Board in Photoshop", by: "Jason Murray" }],
    objective: "Art direction is deciding what the work should look like and why, before anyone opens a file. Learn to build a visual language, not a collage.",
    deliverable: "Two genuinely different visual directions for one brief, each with a moodboard, a written rationale and a recommendation.",
    criteria: ["The two directions are clearly different","Each moodboard is annotated, not just pretty","You recommend one and can defend it"]
  },
  {
    id: 'des-08', code: 'ART-2', origin: 'added', type: 'course', level: 'Senior', hours: 6,
    title: "Campaign Concepting",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=9pCUKOSXrjM',
    duration: '6 hours',
    videos: [{ id: '9pCUKOSXrjM', title: "Intro to Concepting: How Ad Creatives Actually Start Ideas", by: "Stuff About Advertising" }, { id: 'fXtb_BH0QQ4', title: "How Great Campaign Ideas Are Actually Created", by: "MySkill" }, { id: '2q4ri4pvVIQ', title: "How to Brainstorm: Pro Advertising Methods", by: "Stuff About Advertising" }, { id: 'Qo7RZSO2YFg', title: "Creative Block? 3 Ways to Get Unstuck", by: "Stuff About Advertising" }, { id: '_VtCIjVVU2s', title: "Creative Strategy for Beginners", by: "Julian Cole" }],
    objective: "A campaign is one idea that works in many places. Learn to find that idea, test it and carry it across formats.",
    deliverable: "A campaign concept from brief to three executions, with the one line idea written first.",
    criteria: ["The idea fits in one sentence","The three executions clearly belong together","You rejected at least ten other ideas on paper"]
  },
  {
    id: 'des-09', code: 'AI-2', origin: 'added', type: 'course', level: 'Intermediate', hours: 5,
    title: "AI for Designers: Free Image Workflow",
    source: "Free and open source tools",
    url: 'https://www.youtube.com/watch?v=w8EcDV3tOCI',
    duration: '5 hours',
    videos: [{ id: 'w8EcDV3tOCI', title: "Beginner's Guide to Writing Your First Prompt", by: "OpenArt" }, { id: '2mZgRdcyN8w', title: "Full AI Art Workflow: ControlNet & Stable Diffusion", by: "Sebastian Kamph" }, { id: 'g-9wo9v4mCs', title: "120 FREE Art Styles to Unlock Flux", by: "Promptvara" }, { id: 'Hd1Li22jjBU', title: "How to Install Stable Diffusion (Forge)", by: "Endangered AI" }],
    objective: "Use free generative tools as part of a design workflow rather than a one off trick: prompting, references, and finishing in Photoshop. If the workstation cannot run models locally, use the free cloud options shown in the videos.",
    deliverable: "Three finished assets for a real brief where AI made the raw image and you did the finishing, with the workflow written down.",
    criteria: ["The workflow is documented so someone can repeat it","Finished in Photoshop, not used raw","Style matches the brand, not the tool default"]
  },
  {
    id: 'des-10', code: 'AI-3', origin: 'added', type: 'course', level: 'Senior', hours: 5,
    title: "AI Art Direction: Consistent Style and Characters",
    source: "Free and open source tools",
    url: 'https://www.youtube.com/watch?v=Uls_jXy9RuU',
    duration: '5 hours',
    videos: [{ id: 'phtGr4mZ-vU', title: "Improve your Flux image generation with prompts", by: "Code Crafters Corner" }, { id: 'A269uxDhc5s', title: "How to Use and Install Controlnet in ForgeUI", by: "Ai Foundry" }, { id: 'DWvcLggvWcQ', title: "Controlnet Stable Diffusion Tutorial In 8 Minutes", by: "Bitesized Genius" }, { id: 'mmZSOBSg2E4', title: "ControlNet Stable Diffusion Updated Full Tutorial", by: "Aigen" }],
    objective: "The senior skill is control: one visual language held across a whole set, not a lucky single image. Use pose and style controls to keep a set consistent.",
    deliverable: "A set of six images in one consistent style or with one consistent character, with the setup that produced them.",
    criteria: ["All six clearly belong to one world","The reference and prompt set is saved and reusable","Directed by the brand moodboard from ART-1"]
  },
  {
    id: 'des-11', code: 'ART-3', origin: 'added', type: 'course', level: 'Senior', hours: 4,
    title: "Presenting Ideas and Leading Reviews",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=mU6vF385Z1k',
    duration: '4 hours',
    videos: [{ id: 'mU6vF385Z1k', title: "How to Present Ideas to Creative Director With Confidence", by: "Stuff About Advertising" }, { id: '_WyYr1p1XVk', title: "How to Present Design So Clients Say YES", by: "Flux Academy" }, { id: 'RJEINa1G1cQ', title: "How to Present Logo Concepts to Clients", by: "Megan Weeks" }],
    objective: "A creative lead runs the review: frames the problem, presents the direction and gives notes that move the work forward.",
    deliverable: "Run one internal review for another designer: frame the brief, give notes, and agree the next step.",
    criteria: ["Notes are specific and about the work","The designer leaves knowing what to change","The review ends with a decision"]
  },
  {
    id: 'des-12', code: 'CAPSTONE-D', origin: 'added', type: 'course', level: 'Senior', hours: 8, videos: [{ id: 'C65_Po3pt_8', title: "The ONLY Graphic Design Tutorial You Will Ever Need: Full Process", by: "Satori Graphics" }, { id: 'wALKWj7rQq4', title: "My Logo & Brand Identity Design Process", by: "Typefool" }, { id: 'MFCMSRnxE28', title: "Brand Identity Design Process: Custom Logo Design", by: "Megan Weeks" }],
    title: "Design Capstone: one brand, one campaign",
    source: "Internal — the proof of level",
    url: 'https://www.youtube.com/watch?v=mhUMNu7XeTE',
    duration: '8 hours',
    
    objective: "Bring strategy, identity, art direction and AI into one piece of work, the way it happens on a real account.",
    deliverable: "A mini brand with strategy, identity, guidelines and a three execution campaign, presented in five minutes.",
    criteria: ["Starts from a written strategy","Identity and campaign clearly belong together","At least one AI assisted asset, finished by hand","Presented with the reasoning for every major decision"]
  }
];

/* ---------- STAGE 2 (month 4) ----------
   Extra depth, found by search, still free. */
const STAGE2_MISSIONS = [
  {
    id: 's2-01', code: 'S2-PORT', origin: 'added', type: 'course', level: 'Stage 2', hours: 4,
    title: "Portfolio and Case Studies",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=qelg3fYlxAE',
    duration: '4 hours',
    videos: [{ id: 'qelg3fYlxAE', title: "Presenting Your Graphic Design Portfolio: A Creative Director's Tips", by: "Tirso Gamboa" }, { id: 'jo6t-TxbUL0', title: "What to include in a design case study", by: "Monica's Design Process" }, { id: 'zCgM6JQYyTg', title: "7 Tips For Design Portfolio Presentation", by: "Zimri Mayfield" }, { id: 'w-PoV_sIWos', title: "Presenting portfolio projects in a design interview", by: "femke.design" }, { id: 'VFAkgNpAVSo', title: "Portfolio Tips: Reviewing Your Design Work", by: "The Futur Academy" }],
    objective: "Work that is not documented is invisible. Turn four months of work into case studies that show the problem, the thinking and the result.",
    deliverable: "Two case studies from work done on this plan, each with the brief, your role, the process and the outcome.",
    criteria: ["Each case study starts from the problem, not the software","Process shown with real sketches or drafts","You can present either one in three minutes"]
  },
  {
    id: 's2-02', code: 'S2-AE', origin: 'added', type: 'course', level: 'Stage 2', hours: 5,
    title: "After Effects Expressions",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=3_m_vwRF4_U',
    duration: '5 hours',
    videos: [{ id: '3_m_vwRF4_U', title: "How to Use Wiggle Expression in After Effects", by: "Quick Fix Up" }, { id: 'UvZqWnVkBto', title: "After Effects Tutorial: loopOut() Expression", by: "Andy Ford Video" }, { id: 'RpAdFa7IzLU', title: "How to Use LoopOut + Wiggle Expression", by: "Mike Murphy" }, { id: 'vyu7s4-3Vio', title: "After Effects Expression Basics", by: "WOO Visual Art" }],
    objective: "Expressions let you build motion once and reuse it: loops, wiggles and links that replace hundreds of keyframes.",
    deliverable: "Rebuild one earlier motion piece so its repeating moves run on expressions, with the keyframe count cut by at least half.",
    criteria: ["At least three different expressions used","Nothing is hard coded that should be controllable","The piece looks identical to the original"]
  },
  {
    id: 's2-03', code: 'S2-VFX', origin: 'added', type: 'course', level: 'Stage 2', hours: 7,
    title: "Blender Camera Tracking and VFX Integration",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=ui0JUHE12k8',
    duration: '7 hours',
    videos: [{ id: 'ui0JUHE12k8', title: "A Beginner's Guide to Camera Tracking in Blender 4.0", by: "Jacob Zirkle" }, { id: 'EAjbcod1HRQ', title: "Complete Blender Camera Tracking Tutorial: From Footage to Finished VFX", by: "Axel Olsson" }, { id: '-aWApR4tUFo', title: "Blender Motion Tracking Part 3: Lighting, Compositing & Final", by: "UDOCGI" }],
    objective: "Put a 3D object into real footage so it sits there convincingly: tracking, matching light and shadow, and compositing.",
    deliverable: "A 5 second shot of a 3D object tracked into your own footage, with matching light and shadow.",
    criteria: ["The track does not slide","Shadows and reflections match the scene","Exported and cut into an edit"]
  },
  {
    id: 's2-04', code: 'S2-ED', origin: 'added', type: 'course', level: 'Stage 2', hours: 6,
    title: "Editing Commercials and Brand Films",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=UMTyVhq7k-E',
    duration: '6 hours',
    videos: [{ id: 'UMTyVhq7k-E', title: "How to edit a TV Commercial", by: "Michael Odelberth" }, { id: 'dsRkaKAuORQ', title: "How to Edit a Commercial in DaVinci Resolve", by: "Images By Zel" }, { id: 'pUlH1UQgK0o', title: "How to Edit a Motion Graphics Commercial (Premiere Pro)", by: "Premiere Basics" }, { id: 'cwCCUAOV0I4', title: "Editing Tricks to Level Up Your Video Ads", by: "Linx Digital" }],
    objective: "Commercials are edited to a clock and a message. Learn how a 30 second ad is structured and cut.",
    deliverable: "A 30 second commercial cut from supplied footage, with a hook in the first three seconds and a clear call to action.",
    criteria: ["The hook works with the sound off","Exactly the right length for its platform","One message, stated clearly"]
  },
  {
    id: 's2-05', code: 'S2-PACK', origin: 'added', type: 'course', level: 'Stage 2', hours: 6,
    title: "Packaging Design",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=vVmJXUakZUk',
    duration: '6 hours',
    videos: [{ id: 'vVmJXUakZUk', title: "Product Packaging Design From Scratch: Full Process", by: "itsbossin" }, { id: 'hbABAW2csEE', title: "Modern Product Packaging Design Tutorial (3D Mockup)", by: "Megan Weeks" }, { id: 'WeDJv63Wgjk', title: "Learn Packaging Design Part 3: Dielines into 3D Mockups", by: "GraphiqVibe" }, { id: 'YxjpEiO-fMQ', title: "How To Create a Product Packaging Mockup Template in Photoshop", by: "VerticDesigns" }],
    objective: "Packaging is identity you can hold. Learn dielines, structure and how a design wraps across a physical object.",
    deliverable: "Packaging for one product built on a real dieline, with a mockup, applying your brand identity work.",
    criteria: ["Built on a correct dieline","Legible on every face","Shown in a believable mockup"]
  },
  {
    id: 's2-06', code: 'S2-EDIT', origin: 'added', type: 'course', level: 'Stage 2', hours: 6,
    title: "Editorial Layout in InDesign",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=yvDvSG2HxVA',
    duration: '6 hours',
    videos: [{ id: 'yvDvSG2HxVA', title: "Create a Stunning Magazine Layout from Scratch", by: "The Online Learning Space" }, { id: 'kb7VvaiS_70', title: "Design a Stunning Magazine Layout in InDesign & Illustrator", by: "The Online Learning Space" }, { id: 'LbnXpxehVsY', title: "Design a Magazine Spread in Adobe InDesign", by: "Matt Dombrowski" }],
    objective: "Long form layout is where grids, type and hierarchy are tested together. Learn styles, master pages and flow.",
    deliverable: "A four page editorial spread built with paragraph styles, a grid and master pages.",
    criteria: ["All text uses styles, none set by hand","A visible grid holds every page","Reads clearly at a glance"]
  },
  {
    id: 's2-07', code: 'S2-SOC', origin: 'added', type: 'course', level: 'Stage 2', hours: 5,
    title: "Social Design Systems and Templates",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=LEEiSUlfgIo',
    duration: '5 hours',
    videos: [{ id: 'LEEiSUlfgIo', title: "Design Better Social Media Posts (Full Process)", by: "GraphiqVibe" }, { id: 'Ac3b4vmYJks', title: "How to build unbreakable Brand Templates", by: "Canva" }, { id: 'Ds7hQKDxdrQ', title: "How to Keep Your Brand Consistent", by: "DIY Design Club" }, { id: 'G9dYsmyvNos', title: "Building Designs for Your Brand's Social Media", by: "Adobe Live" }],
    objective: "Turn one-off posts into a system others can use without breaking the brand.",
    deliverable: "A template set for one account: five post types, locked structure, editable content, written rules.",
    criteria: ["A teammate can use it without asking you","The brand holds across all five types","Works in all required formats"]
  },
  {
    id: 's2-08', code: 'S2-LEAD', origin: 'added', type: 'course', level: 'Stage 2', hours: 6,
    title: "Giving Direction and Critique",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=fcoMDIn52pE',
    duration: '6 hours',
    videos: [{ id: 'fcoMDIn52pE', title: "How to Give Better Design Feedback", by: "Superside" }, { id: 'JcqG3dILKZY', title: "How to Give a Professional Design Critique", by: "Lindsay Marsh" }, { id: 'wySDdnwxtRY', title: "How to give great creative direction to other creatives and designers", by: "Creative Director Studio" }, { id: 'jrm5rVNhZ2I', title: "Design Leadership: One on One Meetings to Build Trust", by: "Headway" }, { id: 'dRjW-bscMVA', title: "Advice for New Creative Directors", by: "Philip VanDusen" }],
    objective: "Leading creative work means giving notes that move it forward and building trust with the people doing it.",
    deliverable: "Run three real critiques and write down, for each, the note you gave and what changed because of it.",
    criteria: ["Notes are about the work, never the person","The designer knows exactly what to do next","You asked at least one question per critique"]
  },
  {
    id: 's2-09', code: 'S2-PROJ-M', origin: 'added', type: 'course', level: 'Stage 2', hours: 10, videos: [{ id: 'sB9cbAvC1L0', title: "Storyboards for Motion Design", by: "ECAbrams" }, { id: '84rA66PobII', title: "From Storyboard to Motion", by: "ECAbrams" }, { id: 'HtFOnuH6c-Q', title: "How to Create Amazing Style Frames for Motion Design", by: "Ben Marriott" }, { id: 'NvifSxoYmEg', title: "Style Frames for Motion Design", by: "ECAbrams" }],
    title: "Stage 2 Project: a real motion piece",
    source: "Internal — the proof of Stage 2",
    url: '',
    duration: '10 hours',
    
    objective: "Deliver one real piece for a real brief, using what Stage 2 added.",
    deliverable: "A 45 second piece for a real account that uses expressions, a tracked or 3D element and a commercial structure, delivered on time.",
    criteria: ["Starts from a written brief","At least two Stage 2 techniques used","Delivered and accepted by the account owner"]
  },
  {
    id: 's2-11', code: 'S2-PROJ-D', origin: 'added', type: 'course', level: 'Stage 2', hours: 10, videos: [{ id: 'sYQIMii1FII', title: "Logo guidelines: a walk through a guidelines document", by: "Rock Your Brand" }, { id: 'nPS-TOeiRCg', title: "Layout & Typography for Beginners", by: "dedicated designer" }, { id: 'qJ946Xf6rjw', title: "How to Effectively Brief a Graphic Design Project", by: "magier" }],
    title: "Stage 2 Project: a real design system",
    source: "Internal — the proof of Stage 2",
    url: '',
    duration: '10 hours',
    
    objective: "Deliver one real piece of work that proves the extra depth: not a single asset but a system.",
    deliverable: "A real project delivered end to end: strategy, identity or packaging or editorial, and the templates to run it.",
    criteria: ["Starts from a written brief","More than one format delivered","Delivered and accepted by the account owner"]
  }
];

/* ---------- STAGE 2, months 5 and 6 ---------- */
const STAGE3_MISSIONS = [
  {
    id: 'm-01', code: 'S2-ANIM', origin: 'added', type: 'course', level: 'Stage 2', hours: 5,
    title: "Animation Principles in After Effects",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=Cxuk8wJQNsY',
    duration: '5 hours',
    videos: [{ id: 'Cxuk8wJQNsY', title: "Anticipation: The 12 Principles of Animation", by: "Purple Pie Studios" }, { id: 'feCnLnqqFsI', title: "Animation 201: Secondary Action in After Effects", by: "Adobe Live" }, { id: 'PlLO2WFET6s', title: "Animation Principles in After Effects", by: "Gareth David Studio" }, { id: 'dd1goyY3eXg', title: "12 Principles of Animation: The Complete Series", by: "TipTut" }, { id: 'zfaZtLyyxAI', title: "Making the most of the 12 basic principles for Motion Graphics", by: "Escape Studios" }],
    objective: "Follow the videos, then apply anticipation, overshoot and follow through to your own work.",
    deliverable: "Redo one earlier animation so it uses at least four principles, and show before and after.",
    criteria: ["Four principles clearly visible","Motion feels weighted, not floaty","Before and after shown side by side"]
  },
  {
    id: 'm-02', code: 'S2-TYPE', origin: 'added', type: 'course', level: 'Stage 2', hours: 5,
    title: "Kinetic Typography",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=-UiaPUbTaME',
    duration: '5 hours',
    videos: [{ id: '-UiaPUbTaME', title: "After Effects Tutorial: Kinetic Typography #018", by: "Masd*Lab" }, { id: '4vLwhXY0ZRw', title: "Typography Motion Graphics Animation in After Effects", by: "Motion Nations" }, { id: 'kD73GVXwLXg', title: "Kinetic Typography in After Effects: No Plugins", by: "Avnish Parker" }, { id: 'ICQL3SnPOcU', title: "Text Motion Graphics Tutorial", by: "Ag Motion Designs" }],
    objective: "Make text move with rhythm and hierarchy, following four full builds.",
    deliverable: "A 15 second kinetic type piece from a short script, timed to a voice or music track.",
    criteria: ["Hierarchy stays readable while moving","Timing follows the audio","No default easing"]
  },
  {
    id: 'm-03', code: 'S2-DOC', origin: 'added', type: 'course', level: 'Stage 2', hours: 6,
    title: "Interview and Documentary Editing",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=q4ZxiJbPD9A',
    duration: '6 hours',
    videos: [{ id: 'q4ZxiJbPD9A', title: "Documentary editing: Cut interviews short for story", by: "Moundain" }, { id: 'S9iZ2ZvHVHo', title: "Documentary Scene Editing: B-Roll, A-Roll, Music and Sound", by: "Joshua Kirk" }, { id: '6k7ahnIWvcY', title: "How to Edit a Documentary Like a Pro (4 Lessons)", by: "Austen Menges" }, { id: 'R89niSkCdkg', title: "How to Edit Interviews with B-Roll in Premiere Pro", by: "ParEdits" }, { id: 'LWa-35PXDDg', title: "How to Edit B-Roll: Beginners Guide", by: "Jeven Dovey" }],
    objective: "Cut long interviews into a clear story and cover them with B-roll.",
    deliverable: "A 90 second interview piece with at least five B-roll cutaways.",
    criteria: ["The story makes sense without the questions","B-roll supports the words, not decorates them","Audio levelled"]
  },
  {
    id: 'm-04', code: 'S2-3DANIM', origin: 'added', type: 'course', level: 'Stage 2', hours: 6,
    title: "Blender Animation Basics",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=5WOrfMz2Sqs',
    duration: '6 hours',
    videos: [{ id: '5WOrfMz2Sqs', title: "Beginners Guide to Animation in Blender 4: Keyframes", by: "Grant Abbitt" }, { id: 'geE8Sy97CQE', title: "Beginners Guide to Animation in Blender 4: Graph Editor", by: "Grant Abbitt" }, { id: 'xACMr9nFELU', title: "The Basics of Animation & Keyframes in Blender", by: "Ryan King Art" }, { id: 'sc64wS-gukU', title: "How to Use the Graph Editor for Beginners", by: "Ryan King Art" }, { id: '1_WbNMZplIQ', title: "Animation Quick Start Guide for Absolute Beginners", by: "Ryan King Art" }],
    objective: "Move objects with intent in 3D: keyframes, interpolation and the graph editor.",
    deliverable: "A 6 second bouncing and sliding object animation with hand-shaped curves.",
    criteria: ["Curves edited, not left on default","Clear weight and timing","Rendered and shared"]
  },
  {
    id: 'm-05', code: 'S2-CAM', origin: 'added', type: 'course', level: 'Stage 2', hours: 4,
    title: "Shots, Angles and Camera Movement",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=53C4JPULu68',
    duration: '4 hours',
    videos: [{ id: '53C4JPULu68', title: "All Camera Shot Sizes Explained", by: "Shawn Dolinski" }, { id: 'SlNviMsi0K0', title: "12 Camera Angles to Enhance Your Films", by: "Full Time Filmmaker" }, { id: 'Ce923BeqsXU', title: "Camera Movements Explained 101", by: "Rebel Filmmakers" }, { id: 'XEEgxwduYFA', title: "Mastering 27 Camera Shots, Moves, and Angles", by: "jimcostafilms" }],
    objective: "Know the shot you want before you cut or animate it.",
    deliverable: "Pick one scene from your own work and list the shot size, angle and move for every shot, with a reason.",
    criteria: ["Every shot has a stated reason","At least four different shot sizes","Camera moves are motivated"]
  },
  {
    id: 'm-06', code: 'S2-STYLE', origin: 'added', type: 'course', level: 'Stage 2', hours: 5,
    title: "Storyboards and Style Frames for Motion",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=G1AK-mrDrnw',
    duration: '5 hours',
    videos: [{ id: 'G1AK-mrDrnw', title: "Motion graphics design process: How to create style frames", by: "Milanote" }, { id: '3k7Tj6tcUIs', title: "How To Storyboard For Motion Design", by: "Motion Array Tutorials" }, { id: '43dHC3O_iMU', title: "Designing Style Frames for Motion Design", by: "Kristina ExplainersEasy" }, { id: 'sRMwjqh3cJY', title: "Motion graphics design process: How to make the final animation", by: "Milanote" }, { id: 'vlRmtD1FGlA', title: "The Story to Motion Design Workflow: From Brief to Animation", by: "Styleframe Saturdays" }],
    objective: "Plan motion work the way studios do: board it, design the key frames, then animate.",
    deliverable: "A six panel storyboard and three style frames for one real brief, approved before animation.",
    criteria: ["Storyboard approved before animating","Style frames look like the final piece","Animation matches the style frames"]
  },
  {
    id: 'm-07', code: 'S2-BEAT', origin: 'added', type: 'course', level: 'Stage 2', hours: 3,
    title: "Cutting to Music",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=GaIGE3FWUJA',
    duration: '3 hours',
    videos: [{ id: 'GaIGE3FWUJA', title: "How to Edit to the Beat Using Markers in Premiere", by: "Merle Becker" }, { id: 'rZsRYWJ0FCs', title: "Cut to the Music Beat FAST", by: "Javier Mercedes" }, { id: 'Yd2XFVXGiVU', title: "How To Sync Edits to the Music in Premiere Pro 2025", by: "Tigran H." }, { id: '1NpMieBm1ok', title: "How to edit to the beat in Premiere Pro", by: "Video Editing With Finn" }],
    objective: "Make the picture and the music feel like one thing.",
    deliverable: "A 30 second montage cut to a track, with markers on every beat that matters.",
    criteria: ["Cuts land on the beat","Not every beat is cut","Pace changes with the music"]
  },
  {
    id: 'm-08', code: 'S2-LINK', origin: 'added', type: 'course', level: 'Stage 2', hours: 3,
    title: "Premiere Pro and After Effects Together",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=oP5oo6gJcus',
    duration: '3 hours',
    videos: [{ id: 'oP5oo6gJcus', title: "How Dynamic Link Works with After Effects and Premiere", by: "Adobe Creative Cloud" }, { id: 'DMWM9vaj7B0', title: "How To Create Dynamic Links Between Premiere Pro and After Effects", by: "Mike Murphy" }, { id: 'kNN_wk40kBY', title: "Premiere Pro and After Effects Dynamic Link: Workflow Tips", by: "FilterGrade" }, { id: 'Hzhv_jx8JrQ', title: "Dynamic Link Tutorial", by: "Ben Wood Animation Studio" }],
    objective: "Move between the two apps without exporting every time.",
    deliverable: "Take one edit, send three shots to After Effects with Dynamic Link, and bring them back finished.",
    criteria: ["No intermediate exports","Changes in After Effects update in Premiere","Project files stay organised"]
  },
  {
    id: 'm-09', code: 'S2-SHORT', origin: 'added', type: 'course', level: 'Stage 2', hours: 4,
    title: "Short-form and Social Video Editing",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=5H2gPnRVI_o',
    duration: '4 hours',
    videos: [{ id: '5H2gPnRVI_o', title: "How to Edit Video in Premiere Pro for TikTok, Reels and Shorts", by: "Bolam Unbound" }, { id: 'pq-O1VgEj_4', title: "My Exact Premiere Pro Workflow for Short-Form Content", by: "Chriss Boustedt" }, { id: 'u8E68WsqniU', title: "How to Set Up Premiere Pro for TikTok and Reels", by: "Maxwell Ridgeway" }, { id: 'Z4TvefEhJX8', title: "Edit Viral Hooks Like a Pro in Premiere Pro", by: "Chriss Boustedt" }],
    objective: "Edit for vertical, for the first three seconds, and for people who watch with the sound off.",
    deliverable: "Three 20 second vertical edits of one story, each with a different hook.",
    criteria: ["Hook lands in three seconds","Captions readable on a phone","Safe areas respected"]
  },
  {
    id: 'm-10', code: 'S2-SHADE', origin: 'added', type: 'course', level: 'Stage 2', hours: 6,
    title: "Blender Shading and Procedural Materials",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=J5t7gzIfTt0',
    duration: '6 hours',
    videos: [{ id: 'J5t7gzIfTt0', title: "Introduction to Procedural Shader Nodes for Complete Beginners", by: "Ryan King Art" }, { id: '5B244CYX1Tw', title: "Procedural Nodes For Beginners", by: "Ryan King Art" }, { id: '5DM2K0svM-I', title: "Master Procedural Materials In Blender", by: "Extra 3d" }, { id: '9r26hI7_Nms', title: "Procedural Shading: Fundamentals and Beyond", by: "Dr Eye Render" }],
    objective: "Build materials from nodes instead of downloading them.",
    deliverable: "Three procedural materials of your own on one scene.",
    criteria: ["No image textures used","Materials hold up in close-up","Node trees are tidy and named"]
  },
  {
    id: 'm-11', code: 'S2-REEL', origin: 'added', type: 'course', level: 'Stage 2', hours: 3,
    title: "Showreel",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=8XNtme1h6EM',
    duration: '3 hours',
    videos: [{ id: '8XNtme1h6EM', title: "7 Showreel Tips to Help You Get Hired", by: "The Video Shop" }, { id: 'yedsKSMD_k8', title: "20 Tips For An Amazing Showreel", by: "Ben Marriott" }, { id: 'Le5ylFHXck0', title: "How to build your Motion Graphics Showreel", by: "Digital Motion Academy" }, { id: '6NuGFzgnUrs', title: "Reacting to Motion Graphics Reels: Showreel Review", by: "Ben Marriott" }],
    objective: "Turn six months of work into one reel people actually finish watching.",
    deliverable: "A 60 to 90 second showreel with your strongest piece first and your name and contact at the end.",
    criteria: ["Starts with the best shot","Cut to music","Each piece labelled with your role"]
  },
  {
    id: 'd-01', code: 'S2-MOGFX', origin: 'added', type: 'course', level: 'Stage 2', hours: 5,
    title: "Animating Your Designs",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=abauHdmiOZw',
    duration: '5 hours',
    videos: [{ id: 'abauHdmiOZw', title: "How to animate social media posts in After Effects", by: "Digital Motion Academy" }, { id: 'WzBOY92vanY', title: "Create Social Media Animation in After Effects", by: "Dope Motions" }, { id: 'slbBhLLrCe4', title: "Social Media Pop-up Animation", by: "Skyline Motions" }, { id: 'RFFx92Jk7a4', title: "Animate Motion Graphic Social Media Post", by: "Vijay Gupta" }],
    objective: "Take a finished static post and bring it to life in After Effects.",
    deliverable: "Three of your own static posts animated as 6 second clips.",
    criteria: ["Layout survives the animation","Type stays readable throughout","Exported at platform size"]
  },
  {
    id: 'd-02', code: 'S2-RETOUCH', origin: 'added', type: 'course', level: 'Stage 2', hours: 6,
    title: "Photo Retouching",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=9GFPYPl7RJQ',
    duration: '6 hours',
    videos: [{ id: '9GFPYPl7RJQ', title: "Frequency Separation + Dodge & Burn: Professional Retouching Workflow", by: "Nevison Photography" }, { id: '3B69Djm1gIA', title: "Frequency Separation + Dodge & Burn for high end retouching", by: "Roberta Montagnini" }, { id: 'u_9nnvkhIXI', title: "Frequency Separation and Dodge & Burn in Photoshop: Full Tutorial", by: "Ronnix Photography" }, { id: 'erSPHKcSQKA', title: "My Complete Retouching Workflow", by: "Jerry Besong" }],
    objective: "Clean, believable retouching that keeps skin and texture.",
    deliverable: "Retouch one portrait and one product photo, with before and after.",
    criteria: ["Skin texture is kept","No visible patches at 100%","Non-destructive layers"]
  },
  {
    id: 'd-03', code: 'S2-KERN', origin: 'added', type: 'course', level: 'Stage 2', hours: 4,
    title: "Type Detail: Kerning and Pairing",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=j6MBrSmi7_M',
    duration: '4 hours',
    videos: [{ id: 'j6MBrSmi7_M', title: "4 Essential Tips for Kerning Type & Lettering", by: "The Futur" }, { id: 'MXdAmttDOz4', title: "Kerning and Tracking Type Explained", by: "Gary Bradley" }, { id: 'djn-bHQ_gLw', title: "How to Pair Fonts Like a Pro", by: "Pariah Burke" }, { id: 'zJH3SXlyi1A', title: "Pairing fonts the EASY way", by: "Learn UI Design" }],
    objective: "The details that make type look professionally set.",
    deliverable: "Kern one wordmark by hand and pair fonts for three different brands.",
    criteria: ["Spacing looks even at small and large size","Each pairing has a clear contrast","Used in a real layout"]
  },
  {
    id: 'd-04', code: 'S2-ICON', origin: 'added', type: 'course', level: 'Stage 2', hours: 6,
    title: "Icons and Illustration",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=FUiRufl7vUw',
    duration: '6 hours',
    videos: [{ id: 'FUiRufl7vUw', title: "Adobe Illustrator Illustration for Beginners", by: "Envato Tuts+" }, { id: '3AMZbUW4VYE', title: "Vector Favela Free Illustration Course", by: "Jeremy Mura" }, { id: 'C0f1IRGvmFs', title: "From Concept to Icon: Flat Icon Design in Illustrator", by: "Design with Saad Ahmed" }, { id: 'I7YyZsrWE-k', title: "Illustrating Flat Icons", by: "Adobe Live" }, { id: 'IhAgSPZwl_U', title: "Design a flat icon using Illustrator", by: "The Simple Designers" }],
    objective: "Draw your own icons and simple illustrations instead of searching for them.",
    deliverable: "A set of 12 icons in one style, plus one flat illustration for a brand.",
    criteria: ["All 12 icons share one grid and stroke","Readable at 24px","The illustration uses the brand colours"]
  },
  {
    id: 'd-05', code: 'S2-DECK', origin: 'added', type: 'course', level: 'Stage 2', hours: 4,
    title: "Presentation and Pitch Deck Design",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=x-ta0Uls0vE',
    duration: '4 hours',
    videos: [{ id: 'x-ta0Uls0vE', title: "Mastering Pitch Deck Design with The Deckery", by: "MKW Creative Co." }, { id: '0GC1-a1Rao4', title: "Pitch Deck Narrative and Design Workshop", by: "Village Global" }, { id: 'XEc9SpkjBrI', title: "How To Improve Storytelling In A Pitch Deck", by: "Alejandro Cremades" }, { id: 's2rERXHOTpw', title: "How To Nail Your Pitch Deck's Narrative", by: "Alejandro Cremades" }],
    objective: "Design decks that tell a story, since this is how most work gets sold.",
    deliverable: "A 10 slide deck for one of your own projects, designed and ready to present.",
    criteria: ["One idea per slide","Work shown in context","Ends with a decision"]
  },
  {
    id: 'u-01', code: 'S2-UXPROC', origin: 'added', type: 'course', level: 'Stage 2', hours: 6,
    title: "UX Process: Research to Wireframes",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=KIWNconZd6E',
    duration: '6 hours',
    videos: [{ id: 'KIWNconZd6E', title: "Best Free UX/UI Design Course with Assignments", by: "Dropout Academy" }, { id: 'DAUh0qR8anw', title: "How to learn UI/UX Design for free as a beginner", by: "Dezinx by Kirtanya" }, { id: 'JkEMg9Ctg0A', title: "Intro to UX Design", by: "Noble Desktop" }, { id: 'MBblN98-5lg', title: "UI UX Design Full Course For Beginners", by: "Intellipaat" }],
    objective: "Follow the real UX process: talk to people, find the problem, sketch, wireframe and test.",
    deliverable: "For one app idea: five user interviews, a problem statement, and a set of wireframes tested with three people.",
    criteria: ["Findings come from real people","Wireframes change after testing","Process is documented"]
  },
  {
    id: 'u-02', code: 'S2-PROTO', origin: 'added', type: 'course', level: 'Stage 2', hours: 6,
    title: "Figma Prototyping and Motion",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=0RP1PDu2di0',
    duration: '6 hours',
    videos: [{ id: '0RP1PDu2di0', title: "Motion Design Crash Course: Figma, Smart Animate & UI Animations", by: "Zero To Mastery" }, { id: 'O4e62tbnEFE', title: "Advanced Figma Animation and Prototyping (Free Course)", by: "UIX Design Academy" }, { id: 'KD-EsBfWJmY', title: "Figma tutorial: Prototyping and Interactions", by: "Yariv BE" }, { id: 'eqaahu5-FjY', title: "Figma Course 14: Prototyping and Animation", by: "Joshua Pomeroy" }, { id: 'p0j8CwjBEIM', title: "How to Use Smart Animate in Figma", by: "Soren Iverson" }],
    objective: "Make screens feel real with interactions and motion.",
    deliverable: "A clickable prototype of your UX Process screens with at least three animated interactions.",
    criteria: ["Every main flow can be clicked through","Animations explain, not decorate","Shown to a user and fixed once"]
  },
  {
    id: 'u-03', code: 'S2-SYSTEM', origin: 'added', type: 'course', level: 'Stage 2', hours: 5,
    title: "Figma Design Systems",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=L-tpK7Eeuow',
    duration: '5 hours',
    videos: [{ id: 'L-tpK7Eeuow', title: "Design System & Figma Variable Set Up: Full Tutorial", by: "UI Collective" }, { id: 'iLTGLS-vw3k', title: "Figma Design System Setup: Foundations & Variables", by: "Jonathan Waterworth" }, { id: 'HwiHqfax7Uk', title: "Figma tutorial: auto layout & components", by: "Aliena Cai" }, { id: 'SuJOdt-BP-I', title: "Master Auto Layout & Components in Figma", by: "praise onyenwe" }, { id: 'NcQneN8zt5I', title: "Figma Design Best Practices", by: "Kevin Geary" }],
    objective: "Turn your screens into a system others can build from.",
    deliverable: "A small component library with variables, auto layout and variants, used in two screens.",
    criteria: ["Components use auto layout","Colours and type come from variables","Another designer could use it unaided"]
  },
  {
    id: 'd-06', code: 'S2-LEAD2', origin: 'added', type: 'course', level: 'Stage 2', hours: 6,
    title: "Leading a Design Team",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=jrm5rVNhZ2I',
    duration: '6 hours',
    videos: [{ id: 'jrm5rVNhZ2I', title: "Design Leadership Skills: One on One Meetings to Build Trust", by: "Headway" }, { id: 'XqmgkYvocYU', title: "Design Leadership Skills: Growing and Managing a Design Team", by: "Headway" }, { id: 'vIaWMnfEzlE', title: "An Absolute Beginner's Guide to Design Leadership", by: "Game Devs of Color Expo" }, { id: 'wySDdnwxtRY', title: "How to give great creative direction to other creatives and designers", by: "Creative Director Studio" }, { id: 'dRjW-bscMVA', title: "Advice for New Creative Directors", by: "Philip VanDusen" }],
    objective: "Run a small team: set direction, hold one to one meetings, and grow the people around you.",
    deliverable: "Run four one to one meetings and one team review, and write down what you changed because of them.",
    criteria: ["Each person leaves knowing their next step", "Direction is given as a question or a reason, not an order", "You wrote down what worked and what did not"]
  }
];

/* ---------- TEAM LEAD TRACK (Blender, Cinema 4D, AI, VFX) ---------- */
const TL_MISSIONS = [
  {
    id: 'tl-01', code: 'TL-3D-1', origin: 'added', type: 'course', level: 'Basics', hours: 8,
    title: "Blender Hard Surface Modeling",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=zxhaCD-Zlfw',
    duration: '8 hours',
    videos: [{ id: 'zxhaCD-Zlfw', title: "Hard-Surface Modeling in Blender for Beginners (Full Course)", by: "CG Boost" }, { id: 'pSFeDo7aOp4', title: "How to Learn Hard Surface Modelling in Blender", by: "Grant Abbitt" }],
    objective: "Clean modeling is the base of everything else in 3D: booleans, bevels and good topology.",
    deliverable: "One hard-surface object of your own design, fully modeled and rendered.",
    criteria: ["Clean topology with no stray triangles","Bevels catch the light","Rendered on a plain background"]
  },
  {
    id: 'tl-02', code: 'TL-AI-1', origin: 'added', type: 'course', level: 'Basics', hours: 5,
    title: "AI from Zero: Prompting and Free Tools",
    source: "Free YouTube courses",
    url: 'https://www.youtube.com/watch?v=B-qwrTFRCF4',
    duration: '5 hours',
    videos: [{ id: 'B-qwrTFRCF4', title: "Prompt Engineering Made Easy for Beginners", by: "PowerPoint University" }, { id: 'dUulqgLqPBk', title: "Learn Prompt Engineering from Scratch (Full Free Course)", by: "Digital Skills" }, { id: 'XbB3zFuU57g', title: "Prompt Engineering 2026 Full Course (Free)", by: "CA Shivam Palan" }, { id: '8ib4Qnh2HFE', title: "Full AI Prompting Course with Andrew Ng", by: "DeepLearning.AI" }],
    objective: "Start from the very beginning: what a prompt is, how to write a good one, and which free tools to use.",
    deliverable: "A one page prompt guide for your own work, with five prompts that worked and why.",
    criteria: ["Each prompt names subject, style and constraint","Results compared across two free tools","The guide is short enough to reuse"]
  },
  {
    id: 'tl-03', code: 'TL-3D-2', origin: 'added', type: 'course', level: 'Basics', hours: 6,
    title: "Blender Sculpting",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=KURuPAVJ6hM',
    duration: '6 hours',
    videos: [{ id: 'KURuPAVJ6hM', title: "Sculpting in Blender for Beginners (Full Course)", by: "CG Boost" }, { id: 'Lxem4yMs5Dg', title: "Sculpting for Complete Beginners", by: "Ryan King Art" }, { id: 'lORLr-bt3v0', title: "Blender Character Sculpting for Beginners", by: "Twan Olig" }],
    objective: "Shape organic forms by hand, from a first blob to a finished sculpt.",
    deliverable: "One finished sculpt, from block-out to detail.",
    criteria: ["Big forms before small detail","Clean silhouette from every side","Shown with a simple material"]
  },
  {
    id: 'tl-04', code: 'TL-C4D-1', origin: 'added', type: 'course', level: 'Basics', hours: 7,
    title: "Cinema 4D: Getting Started",
    source: "Free YouTube lessons (the course is free, Cinema 4D itself needs a Maxon licence)",
    url: 'https://www.youtube.com/watch?v=srqJKX8OH0k',
    duration: '7 hours',
    videos: [{ id: 'srqJKX8OH0k', title: "Cinema 4D Jumpstart: Free C4D Course", by: "CG Shortcuts" }, { id: 'lJfX5xS0tew', title: "C4D Quickstart", by: "CG Shortcuts" }, { id: 'bdu7dXAFQg4', title: "Camera Basics", by: "CG Shortcuts" }, { id: '_dz3bGizluc', title: "Cinema 4D Absolute Beginner's Tutorial: Part 1", by: "SOFTER" }, { id: 'EY3jWUA1p20', title: "Easy Cinema 4D Tutorial", by: "Fattu Tutorials" }, { id: 'VKMlvYkAc8Q', title: "The Ultimate Beginners Guide To Cinema 4D in 2026", by: "CG Shortcuts" }],
    objective: "Learn the interface, objects, cameras and a first render in Cinema 4D.",
    deliverable: "A simple still scene you built, lit and rendered yourself.",
    criteria: ["Scene is organised and named","Camera placed on purpose","Rendered at final quality"]
  },
  {
    id: 'tl-05', code: 'TL-C4D-2', origin: 'added', type: 'course', level: 'Intermediate', hours: 6,
    title: "Cinema 4D: MoGraph",
    source: "Free YouTube lessons (the course is free, Cinema 4D itself needs a Maxon licence)",
    url: 'https://www.youtube.com/watch?v=1BICYTY2_0w',
    duration: '6 hours',
    videos: [{ id: '1BICYTY2_0w', title: "Mograph 101: Master the Basics", by: "Ace5 Studios" }, { id: 'KBO0nIk8taE', title: "Cloners, Effectors and Fields", by: "QuickVFX" }, { id: '-z-kQNfWdWg', title: "MoGraph Cloner, Effectors and Fields", by: "Maxon Training Team" }, { id: 'JwMx84b9-Lg', title: "Trigger Animation Using Mograph Effectors", by: "eyedesyn" }, { id: '97AcZAGcCDE', title: "Intro to the Mograph Shader Effector", by: "eyedesyn" }, { id: '7eJoFcYRnDA', title: "Cloner Object and Shader Effector", by: "Michael Balchaitis" }],
    objective: "Make hundreds of objects move together with cloners, effectors and fields.",
    deliverable: "A 10 second looping MoGraph piece built from one cloner.",
    criteria: ["Loops without a visible jump","At least two effectors and one field","Rendered cleanly"]
  },
  {
    id: 'tl-06', code: 'TL-AI-2', origin: 'added', type: 'course', level: 'Intermediate', hours: 6,
    title: "AI Control: ControlNet and Style References",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=hTSt0yCY-oE',
    duration: '6 hours',
    videos: [{ id: 'WZg3e6B2yPQ', title: "How to use ControlNet. ControlNet for Stable Diffusion Tutorial", by: "Sebastian Kamph" }, { id: 'kT96mgrtQFU', title: "Controlnet Open Pose Stable Diffusion Tutorial In 7 Minutes", by: "Bitesized Genius" }, { id: 'mmZSOBSg2E4', title: "ControlNet Stable Diffusion Updated Full Tutorial", by: "Aigen" }, { id: 'A269uxDhc5s', title: "How to Use and Install Controlnet in ForgeUI", by: "Ai Foundry" }],
    objective: "Steer the result instead of hoping: pose, depth and style references.",
    deliverable: "Five images that follow a reference pose and share one style reference.",
    criteria: ["Pose follows the reference","Style stays consistent across the set","Workflow file saved"]
  },
  {
    id: 'tl-07', code: 'TL-C4D-3', origin: 'added', type: 'course', level: 'Intermediate', hours: 7,
    title: "Cinema 4D: Product Lighting and Rendering",
    source: "Free YouTube lessons (the course is free, Cinema 4D itself needs a Maxon licence)",
    url: 'https://www.youtube.com/watch?v=kN00Z7UsW5U',
    duration: '7 hours',
    videos: [{ id: 'kN00Z7UsW5U', title: "Cinema 4D Product Lighting: From Flat to Premium Renders", by: "Derek Kirk" }, { id: 'fZqLT6_kIk8', title: "Cinema 4D and Physical Render: Product Lighting", by: "HDR Light Studio" }, { id: 'kY827e8dQt4', title: "How to make a Product Visualisation background", by: "Maxon" }, { id: 'su5dQbPkNW8', title: "Visualization in C4D (2 of 4)", by: "Maxon Training Team" }],
    objective: "Light a product so it looks like a campaign shot.",
    deliverable: "One main product render and two alternate lighting setups.",
    criteria: ["Reflections shaped on purpose","Background supports the product","Three clearly different moods"]
  },
  {
    id: 'tl-08', code: 'TL-3D-3', origin: 'added', type: 'course', level: 'Intermediate', hours: 6,
    title: "Blender Geometry Nodes: Procedural Art",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=_m6bh9O5MJk',
    duration: '6 hours',
    videos: [{ id: '_m6bh9O5MJk', title: "Blender Geometry Nodes for Beginners: Full Course", by: "Jakob Design" }, { id: 'cLI_1S1Nl3w', title: "Blender Geometry Nodes: Turn ANY Mesh into Procedural Art", by: "Jaleed Khan 3D" }, { id: 'vgqtYgrVTRQ', title: "FREE Road Generator: Procedural Geometry Nodes", by: "HuyKhoi2407" }, { id: 'tWvgHbZXCtA', title: "Geometry Nodes for Complete Beginners: Part 1", by: "Ryan King Art" }],
    objective: "Build things that can be changed with a slider instead of redone.",
    deliverable: "A procedural scene with at least three controls that change the result.",
    criteria: ["Controls exposed and named","Nothing hand-placed that should be generated","Setup is tidy"]
  },
  {
    id: 'tl-09', code: 'TL-3D-4', origin: 'added', type: 'course', level: 'Advanced', hours: 6,
    title: "Blender Simulations: Smoke, Cloth and Fluid",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=2oivpTS5Azs',
    duration: '6 hours',
    videos: [{ id: '2oivpTS5Azs', title: "Blender Smoke Simulation Tutorial for Beginners", by: "VISH 3D" }, { id: '46UcFP3QQQE', title: "2023 Blender Cloth Physics Simulation (Easy)", by: "KennyPhases" }, { id: '5tvoYKukhdc', title: "Simple Cloth Physics Tutorial", by: "Blender Rookie" }, { id: 'DkOrAFihTYA', title: "Ultimate Cloth & Fluid Simulations in Blender", by: "b3dt." }],
    objective: "Add believable physics to your shots.",
    deliverable: "Three simulated elements (smoke, cloth, liquid) in one short shot.",
    criteria: ["Simulations are cached","Scale looks right","Rendered without flicker"]
  },
  {
    id: 'tl-10', code: 'TL-3D-5', origin: 'added', type: 'course', level: 'Advanced', hours: 8,
    title: "Blender Rigging and Character Animation",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=mapuLpQNSAw',
    duration: '8 hours',
    videos: [{ id: 'mapuLpQNSAw', title: "Full animated character course for Free: The Gameboy Project", by: "Pierrick Picaut" }, { id: '2nlMZx0vp6E', title: "Character Rigging in Blender: Easy Setup for Beginners", by: "Grant Abbitt" }, { id: 'Zx2LtlZqG3g', title: "The QUICKEST way to RIG your Characters", by: "Lewis Animation" }, { id: '4z7G4TyKE9g', title: "Rig and Animate Character in 10 Minutes", by: "Poly Flo" }],
    objective: "Bring a character to life: rig it, pose it and animate it.",
    deliverable: "A rigged character performing a 5 second action.",
    criteria: ["Rig bends without breaking","Action has anticipation and follow through","Rendered and cut into a sequence"]
  },
  {
    id: 'tl-11', code: 'TL-AI-3', origin: 'added', type: 'course', level: 'Advanced', hours: 6,
    title: "Training Your Own LoRA",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=8AZmT8gS7TI',
    duration: '6 hours',
    videos: [{ id: 'cQLAtDvHZD8', title: "Free FLUX LoRA Training: FluxGym Tutorial", by: "AI Voice Tutor" }, { id: 'OXU72JOPjqc', title: "FluxGym: Simple FLUX LoRA training Web UI with LOW VRAM support", by: "DevsKingdom" }, { id: '1DyfPhIkX78', title: "Fluxgym Full Guide For Flux LoRA Training", by: "Future Thinker" }, { id: 'faAj4n4fDf4', title: "Fluxgym: Training LoRAs", by: "A Latent Place" }],
    objective: "Teach a model your own style or character so results stay on brand. One video trains on a free cloud GPU, so a strong local graphics card is not required.",
    deliverable: "A trained LoRA of one style or character, with ten test images.",
    criteria: ["Training images are curated and captioned","The style holds across ten different prompts","Settings and files documented"]
  },
  {
    id: 'tl-12', code: 'TL-VFX-1', origin: 'added', type: 'course', level: 'Intermediate', hours: 5,
    title: "VFX: Keying and Rotoscoping in After Effects",
    source: "Free YouTube lessons (After Effects is part of the Adobe licence)",
    url: 'https://www.youtube.com/watch?v=L0WTGEqcD4E',
    duration: '5 hours',
    videos: [{ id: 'L0WTGEqcD4E', title: "Easy Green Screen Keying in After Effects", by: "KaiCreative" }, { id: 'aR8D6nBzVB0', title: "Key Green Screen Footage Fast in After Effects", by: "Yeager Film" }, { id: '2b796PpS9y8', title: "Green Screen Keying with Keylight in After Effects CC", by: "What Make Art" }, { id: 'QmgIoRaG6b4', title: "Quick Green Screen Keying Tutorial", by: "Luka Parac" }, { id: 'K-uOFPoIm6U', title: "Advanced Green Screen Keying in After Effects", by: "Advanced Indie VFX" }],
    objective: "Cut a subject cleanly out of footage, whether it is a perfect green screen or not.",
    deliverable: "A keyed shot with a new background and clean edges, plus one hand-rotoscoped shot.",
    criteria: ["No green fringing","Hair and edges look natural","Light on the subject matches the new background"]
  },
  {
    id: 'tl-13', code: 'TL-VFX-2', origin: 'added', type: 'course', level: 'Advanced', hours: 8,
    title: "VFX Compositing in DaVinci Resolve Fusion",
    source: "Free YouTube lessons (DaVinci Resolve is free)",
    url: 'https://www.youtube.com/watch?v=vZdxA_2Dan8',
    duration: '8 hours',
    videos: [{ id: 'vZdxA_2Dan8', title: "FREE 2 Hour Compositing Course For Beginners", by: "The Blenderender" }, { id: 'q2Goepyqyi4', title: "Learn Fusion in DaVinci Resolve: 5h Free Course", by: "VFXstudy" }, { id: 'gaFT_Kj2yeQ', title: "DaVinci Resolve Fusion Tutorial: Motion Graphics and VFX", by: "Kevin Stratvert" }, { id: 'xZSpi51XoJE', title: "Fusion for Production: VFX Compositing", by: "pixeltrain" }],
    objective: "Work node-based, the way film VFX is built, in a free tool.",
    deliverable: "A composited shot that combines footage, a 3D render and an effect.",
    criteria: ["Node tree is tidy and labelled","Colour and grain match across elements","The shot holds up frame by frame"]
  },
  {
    id: 'tl-14', code: 'TL-AI-4', origin: 'added', type: 'course', level: 'Advanced', hours: 5,
    title: "AI Video: Advanced Workflow",
    source: "Free YouTube lessons",
    url: 'https://www.youtube.com/watch?v=htpz-FgzJdM',
    duration: '5 hours',
    videos: [{ id: 'VwMFUbRg70g', title: "Workflow Completo com Kling e Wan", by: "INEMA TDS" }, { id: '0YccN8G7-_A', title: "100% Free AI Video Generator: Kling, Veo and Runway", by: "Zohaib Bodla" }, { id: 'jC2srIYbA78', title: "Character Consistency: A Kling AI Canvas Workflow", by: "Sergio Valdez" }, { id: 'RK-989PgFk4', title: "How to Make Consistent Characters in Veo 3", by: "AI Video School" }, { id: 'D4tzDHwDkhE', title: "Create Cinematic AI Videos with Runway Gen-4 (Full Course)", by: "Tao Prompts" }, { id: 'lfiASPH1lvE', title: "Gen-4 References", by: "Runway Academy" }],
    objective: "Build a repeatable video pipeline: first and last frame control, reference video, and finishing.",
    deliverable: "A 15 second AI sequence with consistent look, finished and graded.",
    criteria: ["Same character and style across shots","First and last frames planned","Graded to match real footage"]
  },
  {
    id: 'tl-15', code: 'TL-CAP', origin: 'added', type: 'course', level: 'Advanced', hours: 10,
    title: "Lead Capstone: 3D, AI and VFX in one piece",
    source: "Internal — the proof of the track",
    url: 'https://www.youtube.com/watch?v=EAjbcod1HRQ',
    duration: '10 hours',
    videos: [{ id: 'EAjbcod1HRQ', title: "Complete Blender Camera Tracking Tutorial: From Footage to Finished VFX", by: "Axel Olsson" }, { id: 'vlRmtD1FGlA', title: "The Story to Motion Design Workflow: From Brief to Animation", by: "Styleframe Saturdays" }, { id: 'vZdxA_2Dan8', title: "FREE 2 Hour Compositing Course For Beginners", by: "The Blenderender" }],
    objective: "Combine everything into one piece that shows the whole range.",
    deliverable: "A 30 second piece with a Blender or Cinema 4D render, an AI element and a VFX shot, ready for the studio reel.",
    criteria: ["Starts from a written brief","All three skills serve the idea","Presented to the team with the reasoning"]
  }
];

/* ---------- THINKING ---------- */
const THINKING_MISSIONS = [
  {
    id: 'ang-01', code: 'THINK-1', origin: 'added', type: 'course', level: 'Foundation', hours: 4,
    title: "Seeing a Problem from Different Angles",
    source: 'Free YouTube lessons',
    url: 'https://www.youtube.com/watch?v=4oMF1F5eEuo',
    duration: '4 hours',
    videos: [{ id: '4oMF1F5eEuo', title: "What is Lateral Thinking? (Easiest Explanation)", by: "Helpful Professor" }, { id: 'o2xgXxGDlL0', title: "10 Ways to use Lateral Thinking for Idea Generation & Problem Solving", by: "Paul Sloane" }, { id: 'BUdempbxbRI', title: "Design Thinking for Beginners: How to Think Like a Graphic Designer", by: "4 The Creatives" }, { id: '1JP59E5oKss', title: "7 Step Creative Process for Graphic Designers", by: "Design With Kellie" }, { id: 'gViIbCzRkv0', title: "Mind Mapping Tutorial: Find Graphic Design Inspiration and New Ideas", by: "Design With Kellie" }, { id: 'dIL15TOv0_4', title: "Concept Ideation & Approach in Design (Ep. 3)", by: "Adobe Creative Cloud" }],
    objective: "Before you design or cut, look at the brief from more than one side: question the obvious answer, map the options, and choose an angle on purpose.",
    deliverable: "Take one real brief and write down five genuinely different angles on it (a mind map plus five one-line concepts). Choose one and say why.",
    criteria: ["Five angles that are really different from each other", "The obvious answer is listed first, then challenged", "The chosen angle is defended in one sentence"]
  }
];

/* ---------- SPECIALISATIONS ----------
   Personal, free, and they start once the shared path is done. */
const BONUS_MISSIONS = [
  {
    id: 'bon-montage', code: 'SPEC-ED', origin: 'added', type: 'course', level: 'Extra skill', hours: 8,
    title: "Advanced Montage",
    source: "Internal — editing as a specialism",
    url: 'https://www.youtube.com/watch?v=2AfnqysJuFI',
    stopName: "Advanced Montage",
    duration: "8 hours",
    videos: [{ id: '2AfnqysJuFI', title: "Enhancing Storytelling with Rhythm & Pacing in Editing", by: "Hollywood Editing Mentor" }, { id: 'CcLarHrGbfo', title: "Video Editing Fundamentals: Cuts, Transitions & Pacing", by: "CodeLucky" }], 
    objective: "Take the editing from EDIT-2 further: structure, rhythm and the kind of cut that carries a whole film on its own.",
    deliverable: "Recut one existing project three ways — built on rhythm, tension and contrast — and present which one earns its place.",
    criteria: ["Each version has a stated structural idea","Cut points are chosen before the timeline opens","One version works on picture alone","You can defend the final choice in a sentence"]
  },
  {
    id: 'bon-blender', code: 'SPEC-3D', origin: 'added', type: 'course', level: 'Extra skill', hours: 10,
    title: "Blender Deep Dive",
    source: "Free YouTube courses",
    url: 'https://www.youtube.com/watch?v=q3q3-iweRZ8',
    stopName: "Blender Deep Dive",
    duration: "10 hours",
    videos: [{ id: 'q3q3-iweRZ8', title: "FREE COURSE: Blender Product Animation — remaining chapters", by: "JB 3D Studio" }, { id: '_m6bh9O5MJk', title: "Blender Geometry Nodes for Beginners — Full Course", by: "Jakob Design" }], 
    objective: "Go past one shot: finish a second product animation chapter and build a procedural scene with Geometry Nodes.",
    deliverable: "A second finished product animation plus one procedural motion graphic, both cut into a sequence.",
    criteria: ["Both pieces rendered and edited together","The Geometry Nodes setup is organised and reusable","Notes on what you would do differently next time"]
  },
  {
    id: 'bon-uiux', code: 'SPEC-UX', origin: 'added', type: 'course', level: 'Extra skill', hours: 10,
    title: "UI/UX Foundations",
    source: "Free YouTube courses (Figma free plan)",
    url: 'https://www.youtube.com/watch?v=cKZEgtQUxlU',
    stopName: "UI/UX",
    duration: "10 hours",
    videos: [{ id: 'cKZEgtQUxlU', title: "Design 101 Crash Course: UX/UI Design and Figma", by: "Zero To Mastery" }, { id: 'mT_Jjn8RJdo', title: "Learn Figma in 6 Hours — Full Course", by: "freeCodeCamp.org" }], 
    objective: "Print and social are about attention. Screens are about what happens next. Learn flows, states and hierarchy for screens people actually use.",
    deliverable: "One small app or landing flow, three screens minimum, with empty, loading, filled and error states.",
    criteria: ["A user flow is drawn before any screen","Tap targets and text sizes checked on a real phone","Every screen has its empty and error state","One round of feedback from someone new"]
  }
];

/* ---------- PEOPLE ---------- */
const HEROES = [
  {
    id: 'alice', name: 'Alice', title: 'Video Designer',
    path: [
      {
        "name": "Typography",
        "level": "Foundation",
        "tagline": "Text hierarchy first, then the details that make type look professionally set.",
        "courses": [
          "core-04",
          "d-03"
        ]
      },
      {
        "name": "Thinking in Different Angles",
        "level": "Foundation",
        "tagline": "Read the brief, then look at it from more than one side before you design or cut.",
        "courses": [
          "core-07",
          "ang-01",
          "m-05",
          "des-08"
        ]
      },
      {
        "name": "AI Workflow",
        "level": "Foundation",
        "tagline": "Move from prompting to a node workflow you can re-run and hand over.",
        "courses": [
          "core-01",
          "core-02",
          "core-03"
        ]
      },
      {
        "name": "AI from Zero",
        "level": "Foundation",
        "tagline": "Prompting and the free tools.",
        "courses": [
          "tl-02"
        ]
      },
      {
        "name": "AI Video",
        "level": "Intermediate",
        "tagline": "A free, repeatable image to video pipeline.",
        "courses": [
          "lad-10"
        ]
      },
      {
        "name": "Colour",
        "level": "Foundation",
        "tagline": "Turn colour from instinct into a system you can defend.",
        "courses": [
          "core-06"
        ]
      },
      {
        "name": "Manual & AI Technique",
        "level": "Foundation",
        "tagline": "Build it by hand and with AI, and know which one a job needs.",
        "courses": [
          "core-05"
        ]
      },
      {
        "name": "Editing: Premiere Pro",
        "level": "Foundation",
        "tagline": "Premiere Pro end to end, then the story concepts behind every edit.",
        "courses": [
          "lad-01",
          "lad-12"
        ]
      },
      {
        "name": "Editing: Cuts & Rhythm",
        "level": "Intermediate",
        "tagline": "The cut types, pacing, and cutting to music.",
        "courses": [
          "lad-02",
          "m-07"
        ]
      },
      {
        "name": "Editing: Story Formats",
        "level": "Intermediate",
        "tagline": "Interviews, commercials and short-form video.",
        "courses": [
          "m-03",
          "s2-04",
          "m-09"
        ]
      },
      {
        "name": "Editing: Advanced Montage",
        "level": "Senior",
        "tagline": "Editing as a specialism.",
        "courses": [
          "bon-montage"
        ]
      },
      {
        "name": "Editing: Resolve, Grade & Sound",
        "level": "Senior",
        "tagline": "The free tool that finishes an edit, then colour and sound.",
        "courses": [
          "lad-13",
          "lad-07",
          "lad-08"
        ]
      },
      {
        "name": "Motion: After Effects",
        "level": "Foundation",
        "tagline": "Animate in After Effects, then shape the timing.",
        "courses": [
          "lad-03",
          "lad-04"
        ]
      },
      {
        "name": "Motion: Principles & Type",
        "level": "Intermediate",
        "tagline": "Apply the principles of animation, then make type move.",
        "courses": [
          "m-01",
          "m-02"
        ]
      },
      {
        "name": "Motion: Expressions & Workflow",
        "level": "Intermediate",
        "tagline": "Build motion once, and link Premiere with After Effects.",
        "courses": [
          "s2-02",
          "m-08"
        ]
      },
      {
        "name": "Motion: Planning",
        "level": "Senior",
        "tagline": "Storyboards and style frames, the way studios plan motion.",
        "courses": [
          "m-06"
        ]
      },
      {
        "name": "Presenting & Feedback",
        "level": "Intermediate",
        "tagline": "Explain the work, and give and take feedback that is specific.",
        "courses": [
          "core-08",
          "core-09"
        ]
      },
      {
        "name": "Blender: Foundations",
        "level": "Foundation",
        "tagline": "One complete 3D scene from first open to final render.",
        "courses": [
          "lad-05"
        ]
      },
      {
        "name": "Blender: Light & Materials",
        "level": "Intermediate",
        "tagline": "Lighting and materials that look professional.",
        "courses": [
          "lad-06",
          "m-10"
        ]
      },
      {
        "name": "Blender: Animation",
        "level": "Intermediate",
        "tagline": "Animate in 3D and finish a product shot.",
        "courses": [
          "m-04",
          "lad-09"
        ]
      },
      {
        "name": "Blender: Tracking & VFX",
        "level": "Senior",
        "tagline": "Put 3D into real footage.",
        "courses": [
          "s2-03"
        ]
      },
      {
        "name": "Capstone",
        "level": "Senior",
        "tagline": "One piece that uses every skill.",
        "courses": [
          "lad-11"
        ]
      },
      {
        "name": "Project",
        "level": "Senior",
        "tagline": "One real piece that proves the extra depth.",
        "courses": [
          "s2-09"
        ]
      },
      {
        "name": "Portfolio & Reel",
        "level": "Senior",
        "tagline": "Document the work so it can be seen.",
        "courses": [
          "s2-01",
          "m-11"
        ]
      }
    ],
    division: 'kinetic', rank: 'Designer',
    tagline: 'Editing was never the question. The question was how much more she could be trusted with — and the answer keeps growing.',
    statusTag: 'Role expanding',
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
    focus: {
      headline: 'Focus: let the machine carry the weight.',
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
        n: 1, name: 'Understand', origin: 'deck',
        objectives: [
          'Clarify briefs, references and expectations before execution',
          'Establish a clear feedback loop',
          'Read whether an issue is technical, creative or communication-related',
          'Turn direct feedback into a fast change'
        ],
        checkpoint: 'Every project opens with a written reference set and a stated expectation.'
      },
      {
        n: 2, name: 'Build confidence', origin: 'deck',
        objectives: [
          'Propose solutions before asking for direction',
          'Cut revision rounds by sharpening the brief first'
        ],
        checkpoint: 'Revision rounds measurably lower than Phase 01.'
      },
      {
        n: 3, name: 'Independence', origin: 'deck',
        objectives: [
          'Arrive with the solution already formed'
        ],
        checkpoint: 'A full campaign delivered brief-to-master in a single revision round.'
      },
      {
        n: 4, label: 'Months 4 to 6', name: 'Stage 2 — Depth', origin: 'added',
        objectives: ['Speed up repeatable motion with expressions',
          'Add real VFX and commercial structure to the toolkit',
          'Turn the work into portfolio case studies',
          'Deliver one real piece for a real account'],
        checkpoint: "A portfolio with two case studies and one delivered client piece."
      }
    ],
    boss: 'A video designer who walks in with the answer already built.',
    extras: ['kin-04', 'kin-05', null, 'kin-09'],
    bonus: ['bon-montage']
  },
  {
    id: 'shimaa', name: 'Shimaa', title: 'Video Designer',
    path: [
      {
        "name": "Typography",
        "level": "Foundation",
        "tagline": "Text hierarchy first, then the details that make type look professionally set.",
        "courses": [
          "core-04",
          "d-03"
        ]
      },
      {
        "name": "Thinking in Different Angles",
        "level": "Foundation",
        "tagline": "Read the brief, then look at it from more than one side before you design or cut.",
        "courses": [
          "core-07",
          "ang-01",
          "m-05",
          "des-08"
        ]
      },
      {
        "name": "AI Workflow",
        "level": "Foundation",
        "tagline": "Move from prompting to a node workflow you can re-run and hand over.",
        "courses": [
          "core-01",
          "core-02",
          "core-03"
        ]
      },
      {
        "name": "AI from Zero",
        "level": "Foundation",
        "tagline": "Prompting and the free tools.",
        "courses": [
          "tl-02"
        ]
      },
      {
        "name": "AI Video",
        "level": "Intermediate",
        "tagline": "A free, repeatable image to video pipeline.",
        "courses": [
          "lad-10"
        ]
      },
      {
        "name": "Colour",
        "level": "Foundation",
        "tagline": "Turn colour from instinct into a system you can defend.",
        "courses": [
          "core-06"
        ]
      },
      {
        "name": "Manual & AI Technique",
        "level": "Foundation",
        "tagline": "Build it by hand and with AI, and know which one a job needs.",
        "courses": [
          "core-05"
        ]
      },
      {
        "name": "Editing: Premiere Pro",
        "level": "Foundation",
        "tagline": "Premiere Pro end to end, then the story concepts behind every edit.",
        "courses": [
          "lad-01",
          "lad-12"
        ]
      },
      {
        "name": "Editing: Cuts & Rhythm",
        "level": "Intermediate",
        "tagline": "The cut types, pacing, and cutting to music.",
        "courses": [
          "lad-02",
          "m-07"
        ]
      },
      {
        "name": "Editing: Story Formats",
        "level": "Intermediate",
        "tagline": "Interviews, commercials and short-form video.",
        "courses": [
          "m-03",
          "s2-04",
          "m-09"
        ]
      },
      {
        "name": "Editing: Advanced Montage",
        "level": "Senior",
        "tagline": "Editing as a specialism.",
        "courses": [
          "bon-montage"
        ]
      },
      {
        "name": "Editing: Resolve, Grade & Sound",
        "level": "Senior",
        "tagline": "The free tool that finishes an edit, then colour and sound.",
        "courses": [
          "lad-13",
          "lad-07",
          "lad-08"
        ]
      },
      {
        "name": "Motion: After Effects",
        "level": "Foundation",
        "tagline": "Animate in After Effects, then shape the timing.",
        "courses": [
          "lad-03",
          "lad-04"
        ]
      },
      {
        "name": "Motion: Principles & Type",
        "level": "Intermediate",
        "tagline": "Apply the principles of animation, then make type move.",
        "courses": [
          "m-01",
          "m-02"
        ]
      },
      {
        "name": "Motion: Expressions & Workflow",
        "level": "Intermediate",
        "tagline": "Build motion once, and link Premiere with After Effects.",
        "courses": [
          "s2-02",
          "m-08"
        ]
      },
      {
        "name": "Motion: Planning",
        "level": "Senior",
        "tagline": "Storyboards and style frames, the way studios plan motion.",
        "courses": [
          "m-06"
        ]
      },
      {
        "name": "Presenting & Feedback",
        "level": "Intermediate",
        "tagline": "Explain the work, and give and take feedback that is specific.",
        "courses": [
          "core-08",
          "core-09"
        ]
      },
      {
        "name": "Blender: Foundations",
        "level": "Foundation",
        "tagline": "One complete 3D scene from first open to final render.",
        "courses": [
          "lad-05"
        ]
      },
      {
        "name": "Blender: Light & Materials",
        "level": "Intermediate",
        "tagline": "Lighting and materials that look professional.",
        "courses": [
          "lad-06",
          "m-10"
        ]
      },
      {
        "name": "Blender: Animation",
        "level": "Intermediate",
        "tagline": "Animate in 3D and finish a product shot.",
        "courses": [
          "m-04",
          "lad-09"
        ]
      },
      {
        "name": "Blender: Deep Dive",
        "level": "Senior",
        "tagline": "Go past one shot: a second animation and procedural work.",
        "courses": [
          "bon-blender"
        ]
      },
      {
        "name": "Capstone",
        "level": "Senior",
        "tagline": "One piece that uses every skill.",
        "courses": [
          "lad-11"
        ]
      },
      {
        "name": "Project",
        "level": "Senior",
        "tagline": "One real piece that proves the extra depth.",
        "courses": [
          "s2-09"
        ]
      },
      {
        "name": "Portfolio & Reel",
        "level": "Senior",
        "tagline": "Document the work so it can be seen.",
        "courses": [
          "s2-01",
          "m-11"
        ]
      }
    ],
    division: 'kinetic', rank: 'Designer',
    tagline: 'Learned a whole new discipline from zero this cycle. That is the hard part, and it is already done.',
    statusTag: 'New skill established',
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
    focus: {
      headline: 'Focus: carry the storyboard win into the tools.',
      why: 'Going from zero storyboarding to planning every project is the biggest single jump anyone made this cycle. The same momentum applied to the AI toolkit is the shortest path to the next level.',
      moves: [
        'One new tool a week, used on live client work rather than a test file',
        'Storyboard every project — the habit is already there, keep it absolute',
        'Pair on one Space build a week with someone from the Design Team',
        'Check against the written standard before submitting, so the win is visible up front'
      ]
    },
    phases: [
      {
        n: 1, name: 'Adopt', origin: 'added',
        objectives: [
          'Run everything on the new workflow — one process, no parallel track',
          'Fold one AI tool per week into real client work',
          'Storyboard before the timeline opens, every time',
          'Bring every brief through the shared approval path'
        ],
        checkpoint: 'Three projects in a row delivered fully on the new workflow.'
      },
      {
        n: 2, name: 'Consistency', origin: 'added',
        objectives: [
          'Hold the written standard without a review pass',
          'Keep deliverables on one account tightly matched',
          'Handle revisions independently',
          'Use the AI tools in production, not as a side experiment'
        ],
        checkpoint: 'Two deliverables in a row clear review with no standard notes.'
      },
      {
        n: 3, name: 'Self-direction', origin: 'added',
        objectives: [
          'Own a project end to end',
          'Propose the treatment rather than receive it',
          'Present the direction before execution'
        ],
        checkpoint: 'A project where the treatment was hers and shipped as proposed.'
      },
      {
        n: 4, label: 'Months 4 to 6', name: 'Stage 2 — Depth', origin: 'added',
        objectives: ['Speed up repeatable motion with expressions',
          'Add real VFX and commercial structure to the toolkit',
          'Turn the work into portfolio case studies',
          'Deliver one real piece for a real account'],
        checkpoint: "A portfolio with two case studies and one delivered client piece."
      }
    ],
    boss: 'A designer whose output lands right without needing a second pair of eyes.',
    extras: ['kin-04', 'kin-05', null, 'kin-09'],
    bonus: ['bon-montage', 'bon-blender']
  },
  {
    id: 'abdelrahman', name: 'Abdelrahman Makhlouf', title: 'Video Designer',
    path: [
      {
        "name": "Typography",
        "level": "Foundation",
        "tagline": "Text hierarchy first, then the details that make type look professionally set.",
        "courses": [
          "core-04",
          "d-03"
        ]
      },
      {
        "name": "Thinking in Different Angles",
        "level": "Foundation",
        "tagline": "Read the brief, then look at it from more than one side before you design or cut.",
        "courses": [
          "core-07",
          "ang-01",
          "m-05",
          "des-08"
        ]
      },
      {
        "name": "AI Workflow",
        "level": "Foundation",
        "tagline": "Move from prompting to a node workflow you can re-run and hand over.",
        "courses": [
          "core-01",
          "core-02",
          "core-03"
        ]
      },
      {
        "name": "AI from Zero",
        "level": "Foundation",
        "tagline": "Prompting and the free tools.",
        "courses": [
          "tl-02"
        ]
      },
      {
        "name": "AI Video",
        "level": "Intermediate",
        "tagline": "A free, repeatable image to video pipeline.",
        "courses": [
          "lad-10"
        ]
      },
      {
        "name": "Colour",
        "level": "Foundation",
        "tagline": "Turn colour from instinct into a system you can defend.",
        "courses": [
          "core-06"
        ]
      },
      {
        "name": "Manual & AI Technique",
        "level": "Foundation",
        "tagline": "Build it by hand and with AI, and know which one a job needs.",
        "courses": [
          "core-05"
        ]
      },
      {
        "name": "Editing: Premiere Pro",
        "level": "Foundation",
        "tagline": "Premiere Pro end to end, then the story concepts behind every edit.",
        "courses": [
          "lad-01",
          "lad-12"
        ]
      },
      {
        "name": "Editing: Cuts & Rhythm",
        "level": "Intermediate",
        "tagline": "The cut types, pacing, and cutting to music.",
        "courses": [
          "lad-02",
          "m-07"
        ]
      },
      {
        "name": "Editing: Story Formats",
        "level": "Intermediate",
        "tagline": "Interviews, commercials and short-form video.",
        "courses": [
          "m-03",
          "s2-04",
          "m-09"
        ]
      },
      {
        "name": "Editing: Advanced Montage",
        "level": "Senior",
        "tagline": "Editing as a specialism.",
        "courses": [
          "bon-montage"
        ]
      },
      {
        "name": "Editing: Resolve, Grade & Sound",
        "level": "Senior",
        "tagline": "The free tool that finishes an edit, then colour and sound.",
        "courses": [
          "lad-13",
          "lad-07",
          "lad-08"
        ]
      },
      {
        "name": "Motion: After Effects",
        "level": "Foundation",
        "tagline": "Animate in After Effects, then shape the timing.",
        "courses": [
          "lad-03",
          "lad-04"
        ]
      },
      {
        "name": "Motion: Principles & Type",
        "level": "Intermediate",
        "tagline": "Apply the principles of animation, then make type move.",
        "courses": [
          "m-01",
          "m-02"
        ]
      },
      {
        "name": "Motion: Expressions & Workflow",
        "level": "Intermediate",
        "tagline": "Build motion once, and link Premiere with After Effects.",
        "courses": [
          "s2-02",
          "m-08"
        ]
      },
      {
        "name": "Motion: Planning",
        "level": "Senior",
        "tagline": "Storyboards and style frames, the way studios plan motion.",
        "courses": [
          "m-06"
        ]
      },
      {
        "name": "Presenting & Feedback",
        "level": "Intermediate",
        "tagline": "Explain the work, and give and take feedback that is specific.",
        "courses": [
          "core-08",
          "core-09"
        ]
      },
      {
        "name": "Blender: Foundations",
        "level": "Foundation",
        "tagline": "One complete 3D scene from first open to final render.",
        "courses": [
          "lad-05"
        ]
      },
      {
        "name": "Blender: Light & Materials",
        "level": "Intermediate",
        "tagline": "Lighting and materials that look professional.",
        "courses": [
          "lad-06",
          "m-10"
        ]
      },
      {
        "name": "Blender: Animation",
        "level": "Intermediate",
        "tagline": "Animate in 3D and finish a product shot.",
        "courses": [
          "m-04",
          "lad-09"
        ]
      },
      {
        "name": "Blender: Deep Dive",
        "level": "Senior",
        "tagline": "Go past one shot: a second animation and procedural work.",
        "courses": [
          "bon-blender"
        ]
      },
      {
        "name": "Capstone",
        "level": "Senior",
        "tagline": "One piece that uses every skill.",
        "courses": [
          "lad-11"
        ]
      },
      {
        "name": "Project",
        "level": "Senior",
        "tagline": "One real piece that proves the extra depth.",
        "courses": [
          "s2-09"
        ]
      },
      {
        "name": "Portfolio & Reel",
        "level": "Senior",
        "tagline": "Document the work so it can be seen.",
        "courses": [
          "s2-01",
          "m-11"
        ]
      }
    ],
    division: 'kinetic', rank: 'Designer',
    tagline: 'A fresh start on the same road: editing, motion and Blender, taken to senior level in 180 days.',
    statusTag: 'Joining the Motion Team',
    origin: [
      'Abdelrahman joins the Motion Team on the same road as Shimaa: the shared standard first, then deeper editing, motion and Blender.',
      'He starts with everything ahead of him and no old habits to unlearn, which is the easiest way to build a clean workflow.',
      'His starting skill levels are being set by the Team Lead, so progress is measured on the same scale as everyone else.'
    ],
    powers: [
      { name: 'Video Editing', from: 0, to: 0 },
      { name: 'Motion Graphics', from: 0, to: 0 },
      { name: 'Blender', from: 0, to: 0 },
      { name: 'AI in Production', from: 0, to: 0 }
    ],
    powersPending: true,
    focus: {
      headline: 'Focus: reach senior editing, motion and Blender by day 180.',
      why: 'Editing is the main craft here, with motion and 3D around it. The ladder is ordered so each step makes the next one easier.',
      moves: [
        'Follow the path in order: each stop opens the next',
        'Finish every course with the piece of work it asks for',
        'Use Advanced Montage as the place to go deep on editing',
        'Agree starting skill levels with the Team Lead in week one'
      ]
    },
    phases: [
      {
        n: 1, name: 'Adopt', origin: 'added',
        objectives: [
          'Run everything on the new workflow — one process, no parallel track',
          'Fold one AI tool per week into real client work',
          'Storyboard before the timeline opens, every time',
          'Bring every brief through the shared approval path'
        ],
        checkpoint: 'Three projects in a row delivered fully on the new workflow.'
      },
      {
        n: 2, name: 'Consistency', origin: 'added',
        objectives: [
          'Hold the written standard without a review pass',
          'Keep deliverables on one account tightly matched',
          'Handle revisions independently',
          'Use the AI tools in production, not as a side experiment'
        ],
        checkpoint: 'Two deliverables in a row clear review with no standard notes.'
      },
      {
        n: 3, name: 'Self-direction', origin: 'added',
        objectives: [
          'Own a project end to end',
          'Propose the treatment rather than receive it',
          'Present the direction before execution'
        ],
        checkpoint: 'A project where the treatment was hers and shipped as proposed.'
      },
      {
        n: 4, label: 'Months 4 to 6', name: 'Stage 2 — Depth', origin: 'added',
        objectives: ['Speed up repeatable motion with expressions',
          'Add real VFX and commercial structure to the toolkit',
          'Turn the work into portfolio case studies',
          'Deliver one real piece for a real account'],
        checkpoint: "A portfolio with two case studies and one delivered client piece."
      }
    ],
    boss: 'A video designer working at senior level in editing, motion and Blender.',
    extras: ['kin-04', 'kin-05', null, 'kin-09'],
    bonus: ['bon-montage', 'bon-blender']
  },
  {
    id: 'mahmoud', name: 'Mahmoud', title: 'Senior Designer',
    path: [
      {
        "name": "Art Direction",
        "level": "Intermediate",
        "tagline": "Visual language, moodboards and campaign ideas.",
        "courses": [
          "core-07",
          "des-07",
          "frg-01",
          "des-08"
        ]
      },
      {
        "name": "Typography",
        "level": "Foundation",
        "tagline": "Text hierarchy first, then the details that make type look professionally set.",
        "courses": [
          "core-04",
          "d-03"
        ]
      },
      {
        "name": "Layout & Editorial",
        "level": "Intermediate",
        "tagline": "Grids, then long-form layout.",
        "courses": [
          "des-03",
          "s2-06"
        ]
      },
      {
        "name": "Colour",
        "level": "Foundation",
        "tagline": "Turn colour from instinct into a system you can defend.",
        "courses": [
          "core-06"
        ]
      },
      {
        "name": "Manual & AI Technique",
        "level": "Foundation",
        "tagline": "Build it by hand and with AI, and know which one a job needs.",
        "courses": [
          "core-05"
        ]
      },
      {
        "name": "Brand Strategy",
        "level": "Intermediate",
        "tagline": "Decide who the brand is for before drawing anything.",
        "courses": [
          "des-04"
        ]
      },
      {
        "name": "Identity & Guidelines",
        "level": "Senior",
        "tagline": "Build the identity, then document it.",
        "courses": [
          "des-05",
          "des-06"
        ]
      },
      {
        "name": "Packaging & Social Systems",
        "level": "Senior",
        "tagline": "Identity you can hold, and templates others can use.",
        "courses": [
          "s2-05",
          "s2-07"
        ]
      },
      {
        "name": "AI Workflow",
        "level": "Foundation",
        "tagline": "Move from prompting to a node workflow you can re-run and hand over.",
        "courses": [
          "core-01",
          "core-02",
          "core-03"
        ]
      },
      {
        "name": "AI for Design",
        "level": "Intermediate",
        "tagline": "A free, repeatable AI image workflow.",
        "courses": [
          "tl-02",
          "des-09"
        ]
      },
      {
        "name": "AI: Control & Style",
        "level": "Senior",
        "tagline": "Hold one style across a whole set.",
        "courses": [
          "des-10"
        ]
      },
      {
        "name": "Editing: Premiere Pro",
        "level": "Foundation",
        "tagline": "Premiere Pro end to end, then the story concepts behind every edit.",
        "courses": [
          "lad-01",
          "lad-12"
        ]
      },
      {
        "name": "Editing: Cuts & Formats",
        "level": "Intermediate",
        "tagline": "Cutting to music, and video for social.",
        "courses": [
          "m-07",
          "m-09"
        ]
      },
      {
        "name": "Motion: After Effects",
        "level": "Foundation",
        "tagline": "Animate in After Effects, then shape the timing.",
        "courses": [
          "lad-03",
          "lad-04"
        ]
      },
      {
        "name": "Motion: Principles & Type",
        "level": "Intermediate",
        "tagline": "The principles of animation, and type that moves.",
        "courses": [
          "m-01",
          "m-02"
        ]
      },
      {
        "name": "Motion: Workflow & Your Designs",
        "level": "Intermediate",
        "tagline": "Link the apps, then bring your own designs to life.",
        "courses": [
          "m-08",
          "d-01"
        ]
      },
      {
        "name": "UI/UX: Foundations",
        "level": "Foundation",
        "tagline": "Design for screens people actually use.",
        "courses": [
          "bon-uiux"
        ]
      },
      {
        "name": "UX: Process",
        "level": "Intermediate",
        "tagline": "Research, wireframes and testing.",
        "courses": [
          "u-01"
        ]
      },
      {
        "name": "UI: Prototyping & Systems",
        "level": "Senior",
        "tagline": "Make screens feel real, then turn them into a system.",
        "courses": [
          "u-02",
          "u-03"
        ]
      },
      {
        "name": "Presenting & Feedback",
        "level": "Intermediate",
        "tagline": "Explain the work and run reviews.",
        "courses": [
          "core-08",
          "core-09",
          "des-11",
          "d-05"
        ]
      },
      {
        "name": "Leading a Team",
        "level": "Senior",
        "tagline": "Give direction and run one to ones.",
        "courses": [
          "s2-08",
          "d-06"
        ]
      },
      {
        "name": "Blender: Foundations",
        "level": "Foundation",
        "tagline": "One complete 3D scene from first open to final render.",
        "courses": [
          "lad-05"
        ]
      },
      {
        "name": "Blender: Light & Materials",
        "level": "Intermediate",
        "tagline": "Lighting and materials that look professional.",
        "courses": [
          "lad-06",
          "m-10"
        ]
      },
      {
        "name": "Blender: Animation",
        "level": "Intermediate",
        "tagline": "Animate in 3D.",
        "courses": [
          "m-04"
        ]
      },
      {
        "name": "Capstone & Project",
        "level": "Senior",
        "tagline": "One brand, one campaign, and one real project.",
        "courses": [
          "des-12",
          "s2-11"
        ]
      },
      {
        "name": "Portfolio",
        "level": "Senior",
        "tagline": "Document the work so it can be seen.",
        "courses": [
          "s2-01"
        ]
      }
    ],
    target: "Senior-level branding, art direction and creative direction, with working skills in editing, motion and Blender.",
    division: 'forge', rank: 'Senior',
    tagline: 'The biggest move anyone made this cycle. Quality no longer depends on one person, because it depends on him too.',
    statusTag: 'Works independently',
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
    focus: {
      headline: 'Focus: give every account its own voice.',
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
        n: 1, name: 'Ownership', origin: 'deck',
        objectives: [
          'Take ownership of one full account',
          'Lead the creative process from brief to delivery',
          'Take an active seat in team reviews',
          'Support the Junior and Intern designers'
        ],
        checkpoint: 'One account fully his, with the Lead reviewing only at delivery.'
      },
      {
        n: 2, name: 'Leadership', origin: 'deck',
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
        n: 3, name: 'Senior ownership', origin: 'deck',
        objectives: [
          'Own creative direction on assigned projects',
          'Mentor the Junior designers',
          'Run first-level quality reviews'
        ],
        checkpoint: 'First-level review is his. The Lead sees escalations only.'
      },
      {
        n: 4, label: 'Months 4 to 6', name: 'Stage 2 — Lead', origin: 'added',
        objectives: ['Give direction and critique that moves the work',
          'Build systems that hold across social, print and packaging',
          'Turn the work into portfolio case studies',
          'Deliver one real project end to end'],
        checkpoint: "Three critiques run, two case studies, and one delivered project."
      }
    ],
    boss: 'Senior Designer to Creative Lead — the person the standard runs through.',
    extras: ['frg-01', null, null, 'frg-07']
  },
  {
    id: 'islam', name: 'Islam', title: 'Graphic Designer',
    path: [
      {
        "name": "Brief & Direction",
        "level": "Intermediate",
        "tagline": "Read the brief, find the visual language, and find the idea.",
        "courses": [
          "core-07",
          "des-07",
          "des-08"
        ]
      },
      {
        "name": "Typography",
        "level": "Foundation",
        "tagline": "Text hierarchy first, then the details that make type look professionally set.",
        "courses": [
          "core-04",
          "d-03"
        ]
      },
      {
        "name": "Layout & Editorial",
        "level": "Intermediate",
        "tagline": "Grids, then long-form layout.",
        "courses": [
          "des-03",
          "s2-06"
        ]
      },
      {
        "name": "Colour",
        "level": "Foundation",
        "tagline": "Turn colour from instinct into a system you can defend.",
        "courses": [
          "core-06"
        ]
      },
      {
        "name": "Manual & AI Technique",
        "level": "Foundation",
        "tagline": "Build it by hand and with AI, and know which one a job needs.",
        "courses": [
          "core-05"
        ]
      },
      {
        "name": "Photoshop & Illustrator Craft",
        "level": "Intermediate",
        "tagline": "The file craft that every strong design sits on.",
        "courses": [
          "des-01",
          "des-02"
        ]
      },
      {
        "name": "Retouching & Icons",
        "level": "Intermediate",
        "tagline": "Clean retouching, compositing and your own icons.",
        "courses": [
          "d-02",
          "frg-03",
          "d-04"
        ]
      },
      {
        "name": "Brand Strategy",
        "level": "Intermediate",
        "tagline": "Decide who the brand is for before drawing anything.",
        "courses": [
          "des-04"
        ]
      },
      {
        "name": "Identity & Guidelines",
        "level": "Senior",
        "tagline": "Build the identity, then document it.",
        "courses": [
          "des-05",
          "des-06"
        ]
      },
      {
        "name": "Packaging & Social Systems",
        "level": "Senior",
        "tagline": "Identity you can hold, and templates others can use.",
        "courses": [
          "s2-05",
          "s2-07",
          "frg-05"
        ]
      },
      {
        "name": "AI Workflow",
        "level": "Foundation",
        "tagline": "Move from prompting to a node workflow you can re-run and hand over.",
        "courses": [
          "core-01",
          "core-02",
          "core-03"
        ]
      },
      {
        "name": "AI for Design",
        "level": "Intermediate",
        "tagline": "A free, repeatable AI image workflow.",
        "courses": [
          "tl-02",
          "des-09"
        ]
      },
      {
        "name": "AI: Control & Style",
        "level": "Senior",
        "tagline": "Hold one style across a whole set.",
        "courses": [
          "des-10"
        ]
      },
      {
        "name": "Editing: Premiere Pro",
        "level": "Foundation",
        "tagline": "Premiere Pro end to end, then the story concepts behind every edit.",
        "courses": [
          "lad-01",
          "lad-12"
        ]
      },
      {
        "name": "Editing: Cuts & Formats",
        "level": "Intermediate",
        "tagline": "Cutting to music, and video for social.",
        "courses": [
          "m-07",
          "m-09"
        ]
      },
      {
        "name": "Motion: After Effects",
        "level": "Foundation",
        "tagline": "Animate in After Effects.",
        "courses": [
          "lad-03"
        ]
      },
      {
        "name": "Motion: Workflow & Your Designs",
        "level": "Intermediate",
        "tagline": "Link the apps, then bring your own designs to life.",
        "courses": [
          "m-08",
          "d-01"
        ]
      },
      {
        "name": "Presenting & Feedback",
        "level": "Intermediate",
        "tagline": "Explain the work and run reviews.",
        "courses": [
          "core-08",
          "core-09",
          "d-05"
        ]
      },
      {
        "name": "Leading",
        "level": "Senior",
        "tagline": "Give direction and run one to ones.",
        "courses": [
          "s2-08",
          "d-06"
        ]
      },
      {
        "name": "Blender: Foundations",
        "level": "Foundation",
        "tagline": "One complete 3D scene from first open to final render.",
        "courses": [
          "lad-05"
        ]
      },
      {
        "name": "Blender: Animation",
        "level": "Intermediate",
        "tagline": "Animate in 3D.",
        "courses": [
          "m-04"
        ]
      },
      {
        "name": "Capstone & Project",
        "level": "Senior",
        "tagline": "One brand, one campaign, and one real project.",
        "courses": [
          "des-12",
          "s2-11"
        ]
      },
      {
        "name": "Portfolio",
        "level": "Senior",
        "tagline": "Document the work so it can be seen.",
        "courses": [
          "s2-01"
        ]
      }
    ],
    target: "Senior-bound: complete branding, art direction and AI practice, ready for a senior role, with working skills in editing, motion and Blender.",
    division: 'forge', rank: 'Designer',
    tagline: 'A clear run ahead: from making what is asked to deciding what gets asked for.',
    statusTag: 'Baseline being set',
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
    focus: {
      pending: true,
      headline: 'Focus: your first account, start to finish.',
      why: 'The whole run points at one thing — an account that is genuinely his, from the brief through to the client conversation. Everything before it is preparation for that.',
      moves: [
        'Team Lead sets the starting stats before Phase 01 opens',
        'Agree the one measurable behaviour that marks the shift from executing to owning',
        'Pick the account he will take first, so the target is real from day one'
      ]
    },
    phases: [
      {
        n: 1, name: 'Ownership', origin: 'deck',
        objectives: [
          'Take ownership of specific projects',
          'Sharpen how briefs get read',
          'Take a seat in ideation sessions',
          'Present the reasoning behind the design in reviews'
        ],
        checkpoint: 'He can name the reason behind every major decision in a review.'
      },
      {
        n: 2, name: 'Independence', origin: 'deck',
        objectives: [
          'Own projects from brief to delivery',
          'Develop the concept before execution starts',
          'Handle revisions independently',
          'Run further between check-ins'
        ],
        checkpoint: 'A full project delivered without a mid-way direction check.'
      },
      {
        n: 3, name: 'Account ownership', origin: 'deck',
        objectives: [
          'Run an assigned account or project independently',
          'Present concepts and solutions',
          'Handle feedback and revisions'
        ],
        checkpoint: 'An account running under his name, Lead at delivery only.'
      },
      {
        n: 4, label: 'Months 4 to 6', name: 'Stage 2 — Senior-ready', origin: 'added',
        objectives: ['Add packaging, editorial and systems work to the range',
          'Give and take direction as a senior would',
          'Turn the work into portfolio case studies',
          'Deliver one real project end to end'],
        checkpoint: "A portfolio that reads as senior, and one delivered project."
      }
    ],
    boss: 'From executor to Account Owner — the person the client asks for.',
    extras: [null, 'frg-03', 'frg-05', null]
  },
  {
    id: 'yomna', name: 'Yomna', title: 'Junior Designer',
    path: [
      {
        "name": "Brief & Art Direction",
        "level": "Intermediate",
        "tagline": "Read the brief and find the visual language.",
        "courses": [
          "core-07",
          "des-07"
        ]
      },
      {
        "name": "Typography",
        "level": "Foundation",
        "tagline": "Text hierarchy first, then the details that make type look professionally set.",
        "courses": [
          "core-04",
          "d-03"
        ]
      },
      {
        "name": "Layout & Editorial",
        "level": "Intermediate",
        "tagline": "Grids, then long-form layout.",
        "courses": [
          "des-03",
          "s2-06"
        ]
      },
      {
        "name": "Colour",
        "level": "Foundation",
        "tagline": "Turn colour from instinct into a system you can defend.",
        "courses": [
          "core-06"
        ]
      },
      {
        "name": "Manual & AI Technique",
        "level": "Foundation",
        "tagline": "Build it by hand and with AI, and know which one a job needs.",
        "courses": [
          "core-05"
        ]
      },
      {
        "name": "Photoshop & Illustrator Craft",
        "level": "Intermediate",
        "tagline": "The file craft that every strong design sits on.",
        "courses": [
          "des-01",
          "des-02"
        ]
      },
      {
        "name": "Retouching & Icons",
        "level": "Intermediate",
        "tagline": "Clean retouching, compositing and your own icons.",
        "courses": [
          "d-02",
          "frg-03",
          "d-04"
        ]
      },
      {
        "name": "Brand Strategy",
        "level": "Intermediate",
        "tagline": "Decide who the brand is for before drawing anything.",
        "courses": [
          "des-04"
        ]
      },
      {
        "name": "Identity & Guidelines",
        "level": "Senior",
        "tagline": "Build the identity, then document it.",
        "courses": [
          "des-05",
          "des-06"
        ]
      },
      {
        "name": "Packaging & Social Systems",
        "level": "Senior",
        "tagline": "Identity you can hold, and templates others can use.",
        "courses": [
          "s2-05",
          "s2-07",
          "frg-05"
        ]
      },
      {
        "name": "AI Workflow",
        "level": "Foundation",
        "tagline": "Move from prompting to a node workflow you can re-run and hand over.",
        "courses": [
          "core-01",
          "core-02",
          "core-03"
        ]
      },
      {
        "name": "AI for Design",
        "level": "Intermediate",
        "tagline": "A free, repeatable AI image workflow.",
        "courses": [
          "tl-02",
          "des-09"
        ]
      },
      {
        "name": "Editing: Premiere Pro",
        "level": "Foundation",
        "tagline": "Premiere Pro end to end, then the story concepts behind every edit.",
        "courses": [
          "lad-01",
          "lad-12"
        ]
      },
      {
        "name": "Editing: Cuts & Formats",
        "level": "Intermediate",
        "tagline": "Cutting to music, and video for social.",
        "courses": [
          "m-07",
          "m-09"
        ]
      },
      {
        "name": "Motion: After Effects",
        "level": "Foundation",
        "tagline": "Animate in After Effects.",
        "courses": [
          "lad-03"
        ]
      },
      {
        "name": "Motion: Workflow & Your Designs",
        "level": "Intermediate",
        "tagline": "Link the apps, then bring your own designs to life.",
        "courses": [
          "m-08",
          "d-01"
        ]
      },
      {
        "name": "Presenting & Feedback",
        "level": "Intermediate",
        "tagline": "Explain the work and take feedback.",
        "courses": [
          "core-08",
          "core-09",
          "d-05",
          "frg-07"
        ]
      },
      {
        "name": "Blender: Foundations",
        "level": "Foundation",
        "tagline": "One complete 3D scene from first open to final render.",
        "courses": [
          "lad-05"
        ]
      },
      {
        "name": "Blender: Animation",
        "level": "Intermediate",
        "tagline": "Animate in 3D.",
        "courses": [
          "m-04"
        ]
      },
      {
        "name": "Capstone & Project",
        "level": "Senior",
        "tagline": "One brand, one campaign, and one real project.",
        "courses": [
          "des-12",
          "s2-11"
        ]
      },
      {
        "name": "Portfolio",
        "level": "Senior",
        "tagline": "Document the work so it can be seen.",
        "courses": [
          "s2-01"
        ]
      }
    ],
    midCap: true,
    target: "A strong mid-level designer in branding, art direction and AI, with working skills in editing, motion and Blender.",
    division: 'forge', rank: 'Junior',
    tagline: 'Fundamentals first, then the work becomes hers. A straight climb with nothing in the way.',
    statusTag: 'Baseline being set',
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
    focus: {
      pending: true,
      headline: 'Focus: own the outcome, not just the task.',
      why: 'The fundamentals are the fastest thing to build at this stage, and they compound into everything after. Once they are solid, ownership follows almost on its own.',
      moves: [
        'Team Lead sets the starting stats before Phase 01 opens',
        'Agree what confident decision-making looks like in a review',
        'Pick the first small project she carries end to end'
      ]
    },
    phases: [
      {
        n: 1, name: 'Learn', origin: 'deck',
        objectives: [
          'Learn the team workflow end to end',
          'Build the design fundamentals',
          'Take on smaller deliverables',
          'Join the creative reviews'
        ],
        checkpoint: 'She can walk the workflow start to finish unprompted.'
      },
      {
        n: 2, name: 'Develop', origin: 'deck',
        objectives: [
          'Own small projects',
          'Develop the initial concept',
          'Handle simple revisions independently',
          'Build speed and consistency'
        ],
        checkpoint: 'Concepts arrive before execution, not during it.'
      },
      {
        n: 3, name: 'Responsibility', origin: 'deck',
        objectives: [
          'Own small projects from brief to delivery',
          'Communicate requirements clearly',
          'Present creative solutions',
          'Handle client feedback with support nearby',
          'Make the call and back it'
        ],
        checkpoint: 'She presents her own work to the account owner and holds the room.'
      },
      {
        n: 4, label: 'Months 4 to 6', name: 'Stage 2 — Stronger', origin: 'added',
        objectives: ['Add packaging, editorial and systems work to the range',
          'Turn the work into portfolio case studies',
          'Deliver one real project end to end'],
        checkpoint: "Two case studies and one delivered project, beyond the level expected."
      }
    ],
    boss: 'From task execution to project responsibility — the work becomes hers.',
    extras: [null, 'frg-03', 'frg-05', 'frg-07']
  },
  {
    id: 'asmaa', name: 'Asmaa', title: 'Intern Designer',
    path: [
      {
        "name": "Brief & Art Direction",
        "level": "Intermediate",
        "tagline": "Read the brief and find the visual language.",
        "courses": [
          "core-07",
          "des-07"
        ]
      },
      {
        "name": "Typography",
        "level": "Foundation",
        "tagline": "Text hierarchy first, then the details that make type look professionally set.",
        "courses": [
          "core-04",
          "d-03"
        ]
      },
      {
        "name": "Layout & Editorial",
        "level": "Intermediate",
        "tagline": "Grids, then long-form layout.",
        "courses": [
          "des-03",
          "s2-06"
        ]
      },
      {
        "name": "Colour",
        "level": "Foundation",
        "tagline": "Turn colour from instinct into a system you can defend.",
        "courses": [
          "core-06"
        ]
      },
      {
        "name": "Manual & AI Technique",
        "level": "Foundation",
        "tagline": "Build it by hand and with AI, and know which one a job needs.",
        "courses": [
          "core-05"
        ]
      },
      {
        "name": "Photoshop & Illustrator Craft",
        "level": "Intermediate",
        "tagline": "The file craft that every strong design sits on.",
        "courses": [
          "des-01",
          "des-02"
        ]
      },
      {
        "name": "Retouching & Icons",
        "level": "Intermediate",
        "tagline": "Clean retouching and your own icons.",
        "courses": [
          "d-02",
          "d-04"
        ]
      },
      {
        "name": "Brand Strategy",
        "level": "Intermediate",
        "tagline": "Decide who the brand is for before drawing anything.",
        "courses": [
          "des-04"
        ]
      },
      {
        "name": "Identity",
        "level": "Senior",
        "tagline": "Build an identity from the strategy.",
        "courses": [
          "des-05"
        ]
      },
      {
        "name": "Packaging & Social Systems",
        "level": "Senior",
        "tagline": "Identity you can hold, and templates others can use.",
        "courses": [
          "s2-05",
          "s2-07",
          "frg-05"
        ]
      },
      {
        "name": "AI Workflow",
        "level": "Foundation",
        "tagline": "Move from prompting to a node workflow you can re-run and hand over.",
        "courses": [
          "core-01",
          "core-02",
          "core-03"
        ]
      },
      {
        "name": "AI for Design",
        "level": "Intermediate",
        "tagline": "A free, repeatable AI image workflow.",
        "courses": [
          "tl-02",
          "des-09"
        ]
      },
      {
        "name": "Editing: Premiere Pro",
        "level": "Foundation",
        "tagline": "Premiere Pro end to end, then the story concepts behind every edit.",
        "courses": [
          "lad-01",
          "lad-12"
        ]
      },
      {
        "name": "Editing: Cuts & Formats",
        "level": "Intermediate",
        "tagline": "Cutting to music, and video for social.",
        "courses": [
          "m-07",
          "m-09"
        ]
      },
      {
        "name": "Motion: After Effects",
        "level": "Foundation",
        "tagline": "Animate in After Effects.",
        "courses": [
          "lad-03"
        ]
      },
      {
        "name": "Motion: Workflow & Your Designs",
        "level": "Intermediate",
        "tagline": "Link the apps, then bring your own designs to life.",
        "courses": [
          "m-08",
          "d-01"
        ]
      },
      {
        "name": "UI/UX: Foundations",
        "level": "Foundation",
        "tagline": "Design for screens people actually use.",
        "courses": [
          "bon-uiux"
        ]
      },
      {
        "name": "UX: Process",
        "level": "Intermediate",
        "tagline": "Research, wireframes and testing.",
        "courses": [
          "u-01"
        ]
      },
      {
        "name": "UI: Prototyping & Systems",
        "level": "Senior",
        "tagline": "Make screens feel real, then turn them into a system.",
        "courses": [
          "u-02",
          "u-03"
        ]
      },
      {
        "name": "Presenting & Feedback",
        "level": "Intermediate",
        "tagline": "Explain the work and take feedback.",
        "courses": [
          "core-08",
          "core-09",
          "d-05",
          "frg-07"
        ]
      },
      {
        "name": "Blender: Foundations",
        "level": "Foundation",
        "tagline": "One complete 3D scene from first open to final render.",
        "courses": [
          "lad-05"
        ]
      },
      {
        "name": "Capstone & Project",
        "level": "Senior",
        "tagline": "One brand, one campaign, and one real project.",
        "courses": [
          "des-12",
          "s2-11"
        ]
      },
      {
        "name": "Portfolio",
        "level": "Senior",
        "tagline": "Document the work so it can be seen.",
        "courses": [
          "s2-01"
        ]
      }
    ],
    midCap: true,
    midLabel: 'Full mid-level',
    target: "A full mid-level designer, well beyond the junior track, with working skills in editing, motion and Blender.",
    division: 'forge', rank: 'Intern',
    tagline: 'Ninety days from production support to ready for a Junior seat.',
    statusTag: 'Baseline being set',
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
    focus: {
      pending: true,
      headline: 'Focus: deliver something start to finish, on your own.',
      why: 'Everything at this stage compounds fast. The first task carried alone from brief to delivery is the moment the rest of the path opens up.',
      moves: [
        'Team Lead sets the starting stats before Phase 01 opens',
        'Define the concrete bar for Junior-ready, so the target is visible',
        'Pick the first task she takes without supervision'
      ]
    },
    phases: [
      {
        n: 1, name: 'Foundation', origin: 'deck',
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
        n: 2, name: 'Practice', origin: 'deck',
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
        n: 3, name: 'Independence', origin: 'deck',
        objectives: [
          'Own simple design tasks from brief to delivery',
          'Deliver without supervision',
          'Bring ideas to the smaller projects',
          'Handle basic revisions',
          'Show she is ready for Junior-level work'
        ],
        checkpoint: 'She is doing Junior work before the title changes.'
      },
      {
        n: 4, label: 'Months 4 to 6', name: 'Stage 2 — Stronger', origin: 'added',
        objectives: ['Add packaging, editorial and systems work to the range',
          'Turn the work into portfolio case studies',
          'Deliver one real project end to end'],
        checkpoint: "Two case studies and one delivered project, beyond the level expected."
      }
    ],
    boss: 'From production support to Junior-ready — the title just catching up.',
    extras: [null, 'frg-03', 'frg-05', 'frg-07']
  },
  {
    id: 'tarek', name: 'Mohamed Tarek', title: 'Graphic Team Lead',
    path: [
      {
        "name": "Cinema 4D: Getting Started",
        "level": "Foundation",
        "tagline": "Interface, objects, cameras and a first render.",
        "courses": [
          "tl-04"
        ]
      },
      {
        "name": "Cinema 4D: MoGraph",
        "level": "Intermediate",
        "tagline": "Cloners, effectors and fields.",
        "courses": [
          "tl-05"
        ]
      },
      {
        "name": "Cinema 4D: Product Work",
        "level": "Senior",
        "tagline": "Lighting and rendering for campaigns.",
        "courses": [
          "tl-07"
        ]
      },
      {
        "name": "AI from Zero",
        "level": "Foundation",
        "tagline": "Prompting and free image tools.",
        "courses": [
          "tl-02",
          "des-09"
        ]
      },
      {
        "name": "AI Video",
        "level": "Intermediate",
        "tagline": "A free, repeatable image to video pipeline.",
        "courses": [
          "lad-10"
        ]
      },
      {
        "name": "AI: Control",
        "level": "Intermediate",
        "tagline": "ControlNet and style references.",
        "courses": [
          "tl-06"
        ]
      },
      {
        "name": "AI: Your Own Model",
        "level": "Senior",
        "tagline": "Train a LoRA on your own style.",
        "courses": [
          "tl-11"
        ]
      },
      {
        "name": "AI Video: Advanced",
        "level": "Senior",
        "tagline": "Consistent characters and a full pipeline.",
        "courses": [
          "tl-14"
        ]
      },
      {
        "name": "VFX: Keying & Roto",
        "level": "Intermediate",
        "tagline": "Clean cut-outs in After Effects.",
        "courses": [
          "tl-12"
        ]
      },
      {
        "name": "VFX: Compositing",
        "level": "Senior",
        "tagline": "Node-based compositing in Fusion.",
        "courses": [
          "tl-13"
        ]
      },
      {
        "name": "Leading the Team",
        "level": "Senior",
        "tagline": "Run one to ones and reviews.",
        "courses": [
          "d-06"
        ]
      },
      {
        "name": "Blender: Foundations",
        "level": "Foundation",
        "tagline": "From first open to a finished scene.",
        "courses": [
          "lad-05"
        ]
      },
      {
        "name": "Blender: Modeling",
        "level": "Foundation",
        "tagline": "Hard surface and sculpting.",
        "courses": [
          "tl-01",
          "tl-03"
        ]
      },
      {
        "name": "Blender: Light & Materials",
        "level": "Intermediate",
        "tagline": "Lighting and materials that look professional.",
        "courses": [
          "lad-06",
          "m-10"
        ]
      },
      {
        "name": "Blender: Procedural",
        "level": "Intermediate",
        "tagline": "Build things that change with a slider.",
        "courses": [
          "tl-08"
        ]
      },
      {
        "name": "Blender: Product Animation",
        "level": "Intermediate",
        "tagline": "Animate a lit product shot.",
        "courses": [
          "lad-09"
        ]
      },
      {
        "name": "Blender: Simulation",
        "level": "Senior",
        "tagline": "Smoke, cloth and fluid.",
        "courses": [
          "tl-09"
        ]
      },
      {
        "name": "Blender: Characters",
        "level": "Senior",
        "tagline": "Rigging and animation.",
        "courses": [
          "tl-10"
        ]
      },
      {
        "name": "Blender: Tracking",
        "level": "Senior",
        "tagline": "Put 3D into real footage.",
        "courses": [
          "s2-03"
        ]
      },
      {
        "name": "Lead Capstone",
        "level": "Senior",
        "tagline": "One piece with 3D, AI and VFX.",
        "courses": [
          "tl-15"
        ]
      },
      {
        "name": "Portfolio & Reel",
        "level": "Senior",
        "tagline": "Document the work.",
        "courses": [
          "s2-01",
          "m-11"
        ]
      }
    ],
    custom: true,
    division: 'forge', rank: 'Lead',
    target: 'Strong, hands-on range in Blender, Cinema 4D, AI production and VFX, from basics to advanced, so the lead can direct and produce across the whole studio.',
    chapterNames: {
      1: { name: 'Month 1 — Blender and AI basics', sub: 'Modeling, sculpting and prompting' },
      2: { name: 'Month 2 — Cinema 4D basics', sub: 'First scenes, MoGraph and free AI workflows' },
      3: { name: 'Month 3 — Production', sub: 'Product work, procedural 3D and controlled AI' },
      4: { name: 'Month 4 — Advanced 3D', sub: 'Simulations, characters and your own AI model' },
      5: { name: 'Month 5 — VFX', sub: 'Keying, tracking, compositing and AI video' },
      6: { name: 'Month 6 — Proof', sub: 'A capstone, leading the team and the reel' }
    },
    statusTag: 'Building new range',
    tagline: 'A lead who can do the work as well as direct it: 3D, AI and VFX, learned in order.',
    origin: [
      'This track is built for the Graphic Team Lead: Blender from first open to advanced, Cinema 4D from basics to production, AI from zero to advanced, and VFX.',
      'It is hands-on and all video: every course lists the lessons to watch and the piece of work to make.',
      'Everything on it is free to learn from. Cinema 4D and the Adobe apps need their normal licences.'
    ],
    powers: [
      { name: 'Blender', from: 0, to: 0 },
      { name: 'Cinema 4D', from: 0, to: 0 },
      { name: 'AI Production', from: 0, to: 0 },
      { name: 'VFX', from: 0, to: 0 }
    ],
    powersPending: true,
    pendingNote: 'Place yourself on the scale in each of these four areas to see your progress against it.',
    focus: {
      headline: 'Focus: 3D, AI and VFX from basics to advanced.',
      why: 'These are the areas that open the most new work for the studio. Learning them in order, with a small piece of work at every step, is faster than learning them in parallel.',
      moves: [
        'Follow the path in order: each stage opens the next',
        'Make the piece each course asks for, however small',
        'Use the capstone to build a reel piece the studio can use',
        'Reset any part you want to repeat with the button on this page'
      ]
    },
    phases: [
      { n: 1, name: 'Basics', origin: 'added', objectives: ['Learn Blender modeling and sculpting', 'Learn lighting and materials in Blender', 'Start AI from zero with prompting and free tools'], checkpoint: 'A modeled object, a sculpt and a working prompt guide.' },
      { n: 2, name: 'Cinema 4D', origin: 'added', objectives: ['Learn the Cinema 4D interface and first scenes', 'Build MoGraph pieces', 'Run a free AI image workflow'], checkpoint: 'A Cinema 4D still, a MoGraph loop and a free AI image workflow.' },
      { n: 3, name: 'Production', origin: 'added', objectives: ['Light and render products in Cinema 4D and Blender', 'Build procedural scenes with Geometry Nodes', 'Control AI results with ControlNet and IPAdapter'], checkpoint: 'A main product render and a controlled AI image set.' },
      { n: 4, name: 'Advanced 3D', origin: 'added', objectives: ['Add simulations to shots', 'Rig and animate a character', 'Train your own LoRA'], checkpoint: 'A simulated shot, an animated character and a trained LoRA.' },
      { n: 5, name: 'VFX', origin: 'added', objectives: ['Key and rotoscope footage', 'Track 3D into real footage', 'Composite in Fusion and build an AI video pipeline'], checkpoint: 'A composited VFX shot and a 15 second AI sequence.' },
      { n: 6, name: 'Proof', origin: 'added', objectives: ['Make one capstone using 3D, AI and VFX', 'Lead the team with what you have learned', 'Build the studio reel and portfolio'], checkpoint: 'A capstone piece and a reel the studio can show.' }
    ],
    boss: 'A Graphic Team Lead who can produce in 3D, AI and VFX, not only direct it.',
    extras: []
  }
];

/* ---------- THE JOURNEY MAP ----------
   Nine stations along one road. A station unlocks only when the one
   before it is fully complete. core = explicit course ids;
   arc / track = indices into that person's priority and team lists. */
const JOURNEY = [
  { n: 1, chapter: 1, level: 'Foundation', name: "Briefing & Planning",
    tagline: "Start every project knowing the goal, and plan before you open any software.",
    core: ['core-07'], arc: [0], track: [], team: {}, people: {}, bonus: [] },
  { n: 2, chapter: 1, level: 'Foundation', name: "AI Workflow",
    tagline: "Move from prompting to a node workflow you can re-run and hand over.",
    core: ['core-01','core-02','core-03'], arc: [], track: [], team: {}, people: {}, bonus: [] },
  { n: 3, chapter: 1, level: 'Foundation', name: "Editing Foundations",
    tagline: "Premiere Pro end to end, the story concepts behind every edit, then the craft of the cut.",
    core: ['lad-01','lad-12'], arc: [], track: [], team: {'kinetic':['lad-02']}, people: {}, bonus: [] },
  { n: 4, chapter: 1, level: 'Foundation', name: "Typography & Layout",
    tagline: "Text hierarchy and layout systems, so anything reads in two seconds.",
    core: ['core-04'], arc: [], track: [], team: {'forge':['des-03']}, people: {}, bonus: [] },
  { n: 5, chapter: 1, level: 'Foundation', name: "Colour",
    tagline: "Turn colour from instinct into a system you can defend.",
    core: ['core-06'], arc: [], track: [], team: {}, people: {}, bonus: [] },
  { n: 6, chapter: 1, level: 'Foundation', name: "Photoshop & Illustrator Craft",
    tagline: "The file craft that every strong design sits on.",
    core: [], arc: [], track: [], team: {}, people: {'islam':['des-01','des-02'],'yomna':['des-01','des-02'],'asmaa':['des-01','des-02']}, bonus: [] },
  { n: 7, chapter: 2, level: 'Intermediate', name: "Motion Foundations",
    tagline: "Animate in After Effects, then shape the timing.",
    core: ['lad-03'], arc: [], track: [], team: {'kinetic':['lad-04']}, people: {}, bonus: [] },
  { n: 8, chapter: 2, level: 'Intermediate', name: "Blender Foundations",
    tagline: "One complete 3D scene from first open to final render.",
    core: ['lad-05'], arc: [], track: [], team: {}, people: {}, bonus: [] },
  { n: 9, chapter: 2, level: 'Intermediate', name: "Craft & Composition",
    tagline: "Manual and AI technique, and knowing which one a job needs.",
    core: ['core-05'], arc: [1], track: [], team: {}, people: {}, bonus: [] },
  { n: 10, chapter: 2, level: 'Intermediate', name: "Brand Strategy",
    tagline: "Decide who the brand is for before drawing anything.",
    core: [], arc: [], track: [], team: {'forge':['des-04']}, people: {}, bonus: [] },
  { n: 11, chapter: 2, level: 'Intermediate', name: "Grade & Sound",
    tagline: "Colour grade and sound, the two things that finish an edit.",
    core: [], arc: [], track: [], team: {'kinetic':['lad-13','lad-07','lad-08']}, people: {}, bonus: [] },
  { n: 12, chapter: 2, level: 'Intermediate', name: "Presenting & Review",
    tagline: "Explain the work, and give and take feedback that is specific.",
    core: ['core-08','core-09'], arc: [2], track: [], team: {}, people: {}, bonus: [] },
  { n: 13, chapter: 3, level: 'Senior', name: "Identity & Guidelines",
    tagline: "Build the identity, then document it so it survives handover.",
    core: [], arc: [], track: [], team: {}, people: {'mahmoud':['des-05','des-06'],'islam':['des-05','des-06'],'yomna':['des-05'],'asmaa':['des-05']}, bonus: [] },
  { n: 14, chapter: 3, level: 'Senior', name: "Art Direction",
    tagline: "Visual language, moodboards and campaign ideas.",
    core: [], arc: [], track: [], team: {'forge':['des-07']}, people: {'mahmoud':['des-08'],'islam':['des-08']}, bonus: [] },
  { n: 15, chapter: 3, level: 'Senior', name: "AI for Design",
    tagline: "A free, repeatable AI image workflow, and control over style.",
    core: [], arc: [], track: [], team: {'forge':['des-09']}, people: {'mahmoud':['des-10'],'islam':['des-10']}, bonus: [] },
  { n: 16, chapter: 3, level: 'Senior', name: "Blender: Light & Product",
    tagline: "Lighting, materials and a finished animated shot.",
    core: [], arc: [], track: [], team: {'kinetic':['lad-06','lad-09']}, people: {}, bonus: [] },
  { n: 17, chapter: 3, level: 'Senior', name: "AI Video Workflow",
    tagline: "A free, repeatable AI video pipeline.",
    core: [], arc: [], track: [], team: {'kinetic':['lad-10']}, people: {}, bonus: [] },
  { n: 18, chapter: 3, level: 'Senior', name: "Creative Direction",
    tagline: "Run the review: frame the problem, present the direction, move the work.",
    core: [], arc: [], track: [], team: {}, people: {'mahmoud':['des-11']}, bonus: [] },
  { n: 19, chapter: 3, level: 'Senior', name: "Capstone",
    tagline: "One piece that uses every skill, presented clearly with your reasoning.",
    core: [], arc: [3], track: [], team: {'kinetic':['lad-11'],'forge':['des-12']}, people: {}, bonus: [] },
  { n: 20, chapter: 4, level: 'Stage 2', name: "Motion Craft",
    tagline: "Link the apps, build with expressions, apply the principles.",
    core: [], arc: [], track: [], team: {'kinetic':['m-08','s2-02','m-01']}, people: {}, bonus: [] },
  { n: 21, chapter: 4, level: 'Stage 2', name: "Camera & Story",
    tagline: "Know the shot, then cut the interview into a story.",
    core: [], arc: [], track: [], team: {'kinetic':['m-05','m-03']}, people: {}, bonus: [] },
  { n: 22, chapter: 4, level: 'Stage 2', name: "Commercial Editing",
    tagline: "Cut to a clock and a message.",
    core: [], arc: [], track: [], team: {'kinetic':['s2-04']}, people: {}, bonus: [] },
  { n: 23, chapter: 4, level: 'Stage 2', name: "Tracking & VFX",
    tagline: "Put 3D into real footage.",
    core: [], arc: [], track: [], team: {}, people: {'alice':['s2-03']}, bonus: [] },
  { n: 24, chapter: 4, level: 'Stage 2', name: "Packaging & Editorial",
    tagline: "Identity you can hold, and long-form layout.",
    core: [], arc: [], track: [], team: {}, people: {'mahmoud':['s2-05','s2-06'],'islam':['s2-05','s2-06'],'yomna':['s2-05','s2-06'],'asmaa':['s2-05','s2-06']}, bonus: [] },
  { n: 25, chapter: 4, level: 'Stage 2', name: "Social & Motion Design",
    tagline: "Templates others can use, then bring them to life.",
    core: [], arc: [], track: [], team: {}, people: {'mahmoud':['s2-07','d-01'],'islam':['s2-07','d-01'],'yomna':['s2-07','d-01'],'asmaa':['s2-07','d-01']}, bonus: [] },
  { n: 26, chapter: 4, level: 'Stage 2', name: "Photo Retouching",
    tagline: "Clean, believable retouching.",
    core: [], arc: [], track: [], team: {}, people: {'islam':['d-02'],'yomna':['d-02'],'asmaa':['d-02']}, bonus: [] },
  { n: 27, chapter: 4, level: 'Stage 2', name: "Direction & Critique",
    tagline: "Give notes that move the work.",
    core: [], arc: [], track: [], team: {}, people: {'mahmoud':['s2-08'],'islam':['s2-08']}, bonus: [] },
  { n: 28, chapter: 4, level: 'Stage 2', name: "UI/UX Foundations",
    tagline: "Design for screens people use.",
    core: [], arc: [], track: [], team: {}, people: {'asmaa':['bon-uiux']}, bonus: [] },
  { n: 29, chapter: 5, level: 'Stage 2', name: "Animated Type & Pacing",
    tagline: "Type that moves, edits that sit on the music, video for social.",
    core: [], arc: [], track: [], team: {'kinetic':['m-02','m-07','m-09']}, people: {}, bonus: [] },
  { n: 30, chapter: 5, level: 'Stage 2', name: "3D Animation & Shading",
    tagline: "Move things in Blender, then build their materials.",
    core: [], arc: [], track: [], team: {'kinetic':['m-04','m-10']}, people: {}, bonus: [] },
  { n: 31, chapter: 5, level: 'Stage 2', name: "Storyboards & Style Frames",
    tagline: "Plan motion the way studios do.",
    core: [], arc: [], track: [], team: {'kinetic':['m-06']}, people: {}, bonus: [] },
  { n: 32, chapter: 5, level: 'Stage 2', name: "Type Detail & Icons",
    tagline: "Kerning, pairing and a set of your own icons.",
    core: [], arc: [], track: [], team: {'forge':['d-03']}, people: {'islam':['d-04'],'yomna':['d-04'],'asmaa':['d-04']}, bonus: [] },
  { n: 33, chapter: 5, level: 'Stage 2', name: "Brand Guidelines",
    tagline: "Document the identity so it survives handover.",
    core: [], arc: [], track: [], team: {}, people: {'yomna':['des-06']}, bonus: [] },
  { n: 34, chapter: 5, level: 'Stage 2', name: "UX Process & Prototyping",
    tagline: "From research to a clickable prototype.",
    core: [], arc: [], track: [], team: {}, people: {'asmaa':['u-01','u-02']}, bonus: [] },
  { n: 35, chapter: 5, level: 'Stage 2', name: "Video for Designers",
    tagline: "Edit to music, link Premiere and After Effects, and cut for social.",
    core: [], arc: [], track: [], team: {'forge':['m-07','m-08','m-09']}, people: {}, bonus: [] },
  { n: 36, chapter: 5, level: 'Stage 2', name: "3D Animation",
    tagline: "Move things in Blender.",
    core: [], arc: [], track: [], team: {}, people: {'mahmoud':['m-04'],'islam':['m-04'],'yomna':['m-04']}, bonus: [] },
  { n: 37, chapter: 5, level: 'Extra skill', name: "Specialisation I",
    tagline: "A personal specialisation, starting once the shared path is complete.",
    core: [], arc: [], track: [], team: {}, people: {}, bonus: [0] },
  { n: 38, chapter: 6, level: 'Stage 2', name: "Pitch & Presentation Design",
    tagline: "Design the deck that sells the work.",
    core: [], arc: [], track: [], team: {'forge':['d-05']}, people: {}, bonus: [] },
  { n: 39, chapter: 6, level: 'Stage 2', name: "Design Systems",
    tagline: "Turn screens into a system.",
    core: [], arc: [], track: [], team: {}, people: {'asmaa':['u-03']}, bonus: [] },
  { n: 40, chapter: 6, level: 'Stage 2', name: "Portfolio & Showreel",
    tagline: "Document the work so it can be seen.",
    core: ['s2-01'], arc: [], track: [], team: {'kinetic':['m-11']}, people: {}, bonus: [] },
  { n: 41, chapter: 6, level: 'Stage 2', name: "Leading a Design Team",
    tagline: "Run one to ones and reviews that grow people.",
    core: [], arc: [], track: [], team: {}, people: {'mahmoud':['d-06'],'islam':['d-06']}, bonus: [] },
  { n: 42, chapter: 6, level: 'Extra skill', name: "Specialisation II",
    tagline: "The second specialisation.",
    core: [], arc: [], track: [], team: {}, people: {}, bonus: [1] },
  { n: 43, chapter: 6, level: 'Stage 2', name: "Stage 2 Project",
    tagline: "One real piece that proves the extra depth.",
    core: [], arc: [], track: [], team: {'kinetic':['s2-09'],'forge':['s2-11']}, people: {}, bonus: [] },
  { n: 44, chapter: 1, level: 'Basics', name: "Blender: Foundations",
    tagline: "From first open to a finished scene.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['lad-05']}, bonus: [] },
  { n: 45, chapter: 1, level: 'Basics', name: "Blender: Modeling",
    tagline: "Hard surface and sculpting.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['tl-01','tl-03']}, bonus: [] },
  { n: 46, chapter: 1, level: 'Basics', name: "AI from Zero",
    tagline: "Prompting and free image tools.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['tl-02','des-09']}, bonus: [] },
  { n: 47, chapter: 2, level: 'Basics', name: "Blender: Light & Materials",
    tagline: "Lighting and materials that look professional.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['lad-06']}, bonus: [] },
  { n: 48, chapter: 2, level: 'Basics', name: "Cinema 4D: Getting Started",
    tagline: "Interface, objects, cameras and a first render.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['tl-04']}, bonus: [] },
  { n: 49, chapter: 2, level: 'Intermediate', name: "Cinema 4D: MoGraph",
    tagline: "Cloners, effectors and fields.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['tl-05']}, bonus: [] },
  { n: 50, chapter: 2, level: 'Intermediate', name: "Free AI Workflows",
    tagline: "A repeatable image to video pipeline.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['lad-10']}, bonus: [] },
  { n: 51, chapter: 3, level: 'Intermediate', name: "Cinema 4D: Product Work",
    tagline: "Lighting and rendering for campaigns.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['tl-07']}, bonus: [] },
  { n: 52, chapter: 3, level: 'Intermediate', name: "Blender: Production",
    tagline: "Product animation and procedural scenes.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['lad-09','tl-08']}, bonus: [] },
  { n: 53, chapter: 3, level: 'Intermediate', name: "AI: Control",
    tagline: "ControlNet and IPAdapter.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['tl-06']}, bonus: [] },
  { n: 54, chapter: 4, level: 'Advanced', name: "Blender: Simulation",
    tagline: "Smoke, cloth and fluid.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['tl-09']}, bonus: [] },
  { n: 55, chapter: 4, level: 'Advanced', name: "Blender: Characters",
    tagline: "Rigging and animation.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['tl-10']}, bonus: [] },
  { n: 56, chapter: 4, level: 'Advanced', name: "Blender: Procedural Materials",
    tagline: "Build materials from nodes.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['m-10']}, bonus: [] },
  { n: 57, chapter: 4, level: 'Advanced', name: "AI: Your Own Model",
    tagline: "Train a LoRA.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['tl-11']}, bonus: [] },
  { n: 58, chapter: 5, level: 'Intermediate', name: "VFX: Keying & Roto",
    tagline: "Clean cut-outs in After Effects.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['tl-12']}, bonus: [] },
  { n: 59, chapter: 5, level: 'Advanced', name: "VFX: Tracking",
    tagline: "Put 3D into real footage.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['s2-03']}, bonus: [] },
  { n: 60, chapter: 5, level: 'Advanced', name: "VFX: Compositing",
    tagline: "Node-based compositing in Fusion.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['tl-13']}, bonus: [] },
  { n: 61, chapter: 5, level: 'Advanced', name: "AI Video",
    tagline: "Advanced video workflow.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['tl-14']}, bonus: [] },
  { n: 62, chapter: 6, level: 'Advanced', name: "Lead Capstone",
    tagline: "One piece with 3D, AI and VFX.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['tl-15']}, bonus: [] },
  { n: 63, chapter: 6, level: 'Advanced', name: "Leading the Team",
    tagline: "Run one to ones and reviews.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['d-06']}, bonus: [] },
  { n: 64, chapter: 6, level: 'Advanced', name: "Portfolio & Reel",
    tagline: "Document the work.",
    core: [], arc: [], track: [], team: {}, people: {'tarek':['s2-01','m-11']}, bonus: [] }
];

const CHAPTERS = {
  1: { name: 'Stage 1 · Month 1 — Foundations', sub: 'Mid-level fundamentals, built in order' },
  2: { name: 'Stage 1 · Month 2 — Intermediate', sub: 'Motion, 3D and craft in practice' },
  3: { name: 'Stage 1 · Month 3 — Senior', sub: 'Senior-level work and a capstone' },
  4: { name: 'Stage 2 · Month 4 — Depth', sub: 'New skills, still all on video' },
  5: { name: 'Stage 2 · Month 5 — Range', sub: 'More tools, more formats' },
  6: { name: 'Stage 2 · Month 6 — Proof', sub: 'Portfolio, specialisation and a real project' }
};

/* ---------- SKILL TREE (deck: final "Learning Track" slide) ---------- */
const SKILL_TREE = [
  {
    id: 'gem-type', name: 'Typography & Visual Hierarchy', color: '#F76302',
    creed: 'If it cannot be read in two seconds, it was not designed.',
    feeds: ['core-04', 'kin-10', 'frg-02', 'frg-07']
  },
  {
    id: 'gem-color', name: 'Colour Theory & Application', color: '#22E0F0',
    creed: 'Colour is a rule, not a mood.',
    feeds: ['core-06', 'kin-07', 'frg-04', 'frg-05']
  },
  {
    id: 'gem-ai', name: 'AI & Manual Design Techniques', color: '#A855F7',
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
