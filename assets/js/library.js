/* ============================================================
   LIBRARY: a question flow that recommends free video courses.
   No password. Built from every course on the site plus extra videos.
   ============================================================ */
const LIB_KEY = 'osol-library-v1';
const LIB_TOPICS = [
  { id: 'video', name: 'Video & Filmmaking' },
  { id: 'editing', name: 'Video Editing' },
  { id: 'motion', name: 'Motion & VFX' },
  { id: 'direction', name: 'Art & Creative Direction' },
  { id: 'ui', name: 'UI/UX' },
  { id: '3d', name: '3D' },
  { id: 'design', name: 'Graphic Design' },
  { id: 'brand', name: 'Branding' },
  { id: 'ai', name: 'AI' }
];
const LIB_LEVELS = { 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced' };
const LIB_GOALS = [
  { id: 'job', name: 'Get my first job', topics: [], pin: ['s2-01', 'm-11'] },
  { id: 'freelance', name: 'Work with clients as a freelancer', topics: ['brand', 'direction'], pin: [] },
  { id: 'levelup', name: 'Level up at my current job', topics: [], pin: [] },
  { id: 'lead', name: 'Lead a team or become a creative lead', topics: ['direction'], pin: ['d-06', 's2-08'] },
  { id: 'own', name: 'Make my own projects', topics: [], pin: [] }
];
const LIB_TIME = [
  { id: 'light', name: 'About 2 hours a week', h: 2, sub: 'A little each week' },
  { id: 'normal', name: 'About 5 hours a week', h: 5, sub: 'A steady habit' },
  { id: 'heavy', name: '8 hours or more a week', h: 8, sub: 'Serious focus' }
];
const LIB_TOPIC_SUB = {
  video: 'Shooting, framing, lighting, filmmaking basics', editing: 'Cutting, pacing, colour, sound, Premiere and DaVinci',
  motion: 'After Effects, animation, VFX, showreels', direction: 'Art direction, concepts, creative leadership',
  ui: 'Apps, websites, Figma, user research', '3d': 'Blender, Cinema 4D, lighting and rendering',
  design: 'Layout, typography, composition, Photoshop, Illustrator', brand: 'Logos, identity systems, brand guidelines', ai: 'AI tools for images, video and workflow'
};
const LIB_LEVEL_SUB = { 1: 'I know little or nothing yet', 2: 'I can do the basics on my own', 3: 'I am comfortable and want to go deeper' };
const LIB_GOAL_SUB = {
  job: 'A strong portfolio and showreel', freelance: 'Branding, direction, working with clients', levelup: 'Sharper skills in what you already do',
  lead: 'Direction, feedback and managing creative work', own: 'Personal films, apps, art and experiments'
};
const LIB_TOPIC_OF = {
  video: ['m-05', 'kin-05', 'lad-11', 'core-07'],
  editing: ['lad-01', 'lad-12', 'lad-02', 'lad-13', 'lad-07', 'lad-08', 'bon-montage', 'm-03', 'm-07', 'm-09', 's2-04', 'm-08'],
  motion: ['lad-03', 'lad-04', 'm-01', 'm-02', 'm-06', 's2-02', 'd-01', 's2-09', 'tl-12', 'tl-13', 'm-11'],
  direction: ['des-07', 'des-08', 'frg-01', 'ang-01', 'des-11', 's2-08', 'd-06', 'core-08', 'core-09'],
  ui: ['bon-uiux', 'u-01', 'u-02', 'u-03'],
  '3d': ['lad-05', 'lad-06', 'lad-09', 'm-04', 'm-10', 'tl-01', 'tl-03', 'tl-04', 'tl-05', 'tl-07', 'tl-08', 'tl-09', 'tl-10', 's2-03', 'bon-blender'],
  design: ['core-04', 'core-06', 'core-05', 'd-03', 'des-01', 'des-02', 'des-03', 'd-02', 'd-04', 's2-06', 'd-05', 'frg-03', 'frg-05', 'frg-07', 's2-01'],
  brand: ['des-04', 'des-05', 'des-06', 's2-05', 's2-07'],
  ai: ['core-01', 'core-02', 'core-03', 'tl-02', 'des-09', 'des-10', 'lad-10', 'tl-06', 'tl-11', 'tl-14', 'kin-04', 'kin-09']
};
const LIB_LEVEL_OVERRIDE = { 'lad-05': 1, 'lad-03': 1, 'lad-01': 1, 'core-07': 1, 'tl-02': 1, 'core-01': 1, 'core-02': 1, 'core-03': 2, 'des-09': 2, 'm-05': 1, 'kin-05': 1 };
const LIB_EXTRA = [{"id":"9AGaECt9j4g","title":"Film Blocking Tutorial — Filmmaking Techniques for Directors: Ep3","by":"StudioBinder","topic":"video","level":1},{"id":"h00dz3nLXYY","title":"Master the Art of Scene Blocking with These Director Tips","by":"jimcostafilms","topic":"video","level":1},{"id":"Ijr1bpY9NFw","title":"How to Make a Shot List | Filmmaking for Beginners","by":"The Nerdy Filmmaker","topic":"video","level":1},{"id":"TwHhDD3n_BM","title":"Directing and Blocking | Joan Scheckel workshops | Film Independent","by":"Film Independent","topic":"video","level":1},{"id":"TAX-EE9dkEk","title":"WHAT IS BLOCKING AND STAGING IN FILM?","by":"BBP Reel Insights","topic":"video","level":1},{"id":"oGmqtvbbyhc","title":"How to Block a Scene | What Blocking Means | Directing Your Actors - Film Education","by":"Kendra Joy","topic":"video","level":1},{"id":"-EUexjlStHg","title":"The best first project for beginner filmmakers...","by":"Matt Aitia","topic":"video","level":1},{"id":"eL_XaKA5qWM","title":"Why Great Directors Lock the Camera","by":"StudioBinder","topic":"video","level":1},{"id":"IwQFb3H6RS0","title":"WHAT IS SHOT BLOCKING IN FILM?","by":"BBP Reel Insights","topic":"video","level":1},{"id":"OMd7pQM7HLU","title":"Film Blocking Masterclass: Elevate Your Visual Storytelling","by":"Breadfruit Studios","topic":"video","level":2},{"id":"7FNQ_1SYAv8","title":"What is an art director on a film set?","by":"PaulMcGhie","topic":"direction","level":1},{"id":"xw6MaR73mHI","title":"The Impact of Art Direction in Film","by":"Alex Killian","topic":"direction","level":1},{"id":"FP5EOLF7GPI","title":"The Art Director Job Description","by":"Open Door Creative","topic":"direction","level":1},{"id":"AVJOLDacdQQ","title":"How to Become an Art Director","by":"Western Governors University","topic":"direction","level":1},{"id":"qSDVfvoOyZY","title":"The 4 Key Steps to Art Direction | Marcus Brown Design","by":"awwwards.","topic":"direction","level":1},{"id":"UNlwaYa9dZw","title":"Job description of Art Director - Role, Responsibilities & Skills","by":"Irritating Facts","topic":"direction","level":1},{"id":"Ck0-TuQPxBw","title":"9 Years of Art Direction in 15 Minutes","by":"orenmeetsworld","topic":"direction","level":2},{"id":"yqCoK_bLQGM","title":"How to Become an Art Director: Ideas, Visual Skills, and a Spec Portfolio","by":"Teachable","topic":"direction","level":2},{"id":"lFToIvzG0os","title":"Visual Hierarchy Explained | UI Design Principles for Beginners","by":"VirtualAddiction","topic":"ui","level":1},{"id":"-O1ds-kPUZg","title":"The Easy Way to Pick Perfect Spacing","by":"Sajid","topic":"ui","level":1},{"id":"DBHBmeNhYrY","title":"What Is Visual Hierarchy?","by":"Envato","topic":"ui","level":1},{"id":"cf95Z7Ngg8k","title":"Master Spacing in UI Design 💪","by":"Jesse Showalter","topic":"ui","level":1},{"id":"In6IWl60Y4U","title":"5 ingredients to master Visual Hierarchy | Visual Design | Visual Hierarchy in UI/UX Design","by":"ProApp Learn Design","topic":"ui","level":1},{"id":"uwNClNmekGU","title":"4 Foundational UI Design Principles | C.R.A.P.","by":"Jesse Showalter","topic":"ui","level":1},{"id":"mbj6hx4itkM","title":"Mobile UI Design Principles and Best Practices: Tappability Affordances","by":"IxDF - Interaction Design Foundation","topic":"ui","level":1},{"id":"Gfsd8NNuD9g","title":"Everything you need to know about Mobile App UI’s in 8 minutes (beginner friendly)","by":"Kole Jain","topic":"ui","level":1},{"id":"YUMdv4yFlQU","title":"Visual Design Principles in Action","by":"NNgroup","topic":"ui","level":1},{"id":"D4NyQ5iOMF0","title":"Figma UX tutorial for beginners - Wireframe","by":"Aliena Cai","topic":"ui","level":1},{"id":"c9Wg6Cb_YlU","title":"UI / UX Design Tutorial – Wireframe, Mockup & Design in Figma","by":"freeCodeCamp.org","topic":"ui","level":1},{"id":"D1pO4AQTfes","title":"UI Design Live: UI Patterns, Visual Hierarchy and Iterations","by":"DesignCode","topic":"ui","level":2},{"id":"BT1twU_rDSM","title":"How to Create a UX Design Case Study | Presentation Deck & Visuals for your UX Portfolio","by":"Charli Cheung","topic":"ui","level":2},{"id":"ZzOoPvHkwyI","title":"How to Create a UI/UX Case Study in Figma (2026) to Land a Job","by":"Seddyworld Digital ","topic":"ui","level":2},{"id":"JcSZ2e5cZOA","title":"Level up your UX case studies in under 12 minutes! free Figma mockups template","by":"erinkate","topic":"ui","level":2},{"id":"W7R0b4DReqc","title":"UX Case Study Walkthrough","by":"Sara Brunettini","topic":"ui","level":2},{"id":"bKQ8WUxteBs","title":"Figma Prototyping Tutorial: How to Design & Animate a Fintech App (Step-by-Step)","by":"Design with Kingsley","topic":"ui","level":2},{"id":"nUQmCgFubeY","title":"UI Design a Portfolio site in Figma - full course","by":"DesignCode","topic":"ui","level":2},{"id":"q7ICZWUBE7w","title":"Make Your Logo ANIMATE in After Effects!","by":"7 Minute AE Tutorials","topic":"motion","level":1},{"id":"jxzaBuBtIpo","title":"How To Animate Any Logo in After Effects(Tutorial)","by":"Logo animation service","topic":"motion","level":1},{"id":"pJLZU7ffXDA","title":"Motion Graphics Tutorial | Pro Logo Animation in After Effects","by":"Jafar Fazel","topic":"motion","level":1},{"id":"M2S-6ptUvus","title":"10 Pro Ways To Animate Your Logo in After Effects","by":"SonduckFilm","topic":"motion","level":1},{"id":"ZP_TUrLN9uE","title":"Stylized Logo Animation After Effects CC Tutorial","by":"SSB Otaru","topic":"motion","level":2},{"id":"rEYXgyuWy4s","title":"Custom Logo Animation in After Effects | Nature Leaf Animation | After Effects Tutorial","by":"sheikh sohel","topic":"motion","level":2},{"id":"bj-UW0AM384","title":"Morph Any Logo & Objects into Other Objects in After Effects","by":"DuckTUT","topic":"motion","level":2},{"id":"5KbRVVJqGdc","title":"3 Seamless Cinematic Transitions for Your Premiere Pro Edits","by":"MJ Editings","topic":"editing","level":2},{"id":"wzWxA7wYdhI","title":"Cinematic TRANSITIONS for Premiere Pro","by":"Media Magnet","topic":"editing","level":2},{"id":"O4E6JUySCt0","title":"TUTORIAL - Cinematic Transitions and Effects in Premiere Pro","by":"DaniMult","topic":"editing","level":2},{"id":"-a3e2ga6RRw","title":"Cinematic FLASH Transition | Premiere Pro Tutorial","by":"Adobe Made Simple","topic":"editing","level":2},{"id":"y9OQH9wI5jE","title":"3 BEST TRANSITIONS you NEED to know! | Cinematic Transitions in Premiere Pro (Tutorial)","by":"Mohnish Doultani","topic":"editing","level":2},{"id":"UAOc35-QrKw","title":"TOP 3 TRANSITIONS in Premiere Pro | Best Easy Transitions","by":"Smertimba Graphics","topic":"editing","level":2},{"id":"wBMkrDK51b0","title":"This Premiere Transition Makes Edits Look Cinematic (No Plugin)","by":"Media Magnet","topic":"editing","level":2},{"id":"pwjJhb54Wxw","title":"90 New FREE Effects and Transitions in Premiere Pro! (Video Editing Tutorial)","by":"Peter Sarellas","topic":"editing","level":2},{"id":"mgg066fvUqc","title":"HDRI Lighting Fundamentals in Blender","by":"Blender Tutor","topic":"3d","level":1},{"id":"FIbuGjN0rzI","title":"Blender how to use HDRI in render","by":"blenderian","topic":"3d","level":1},{"id":"Im9Q-_hjv48","title":"How to use HDRI in Blender (Best way)","by":"BadgerBricks","topic":"3d","level":1},{"id":"r5z_9g3LxIk","title":"HDRI lighting in Blender - Setup an interior scene like Keyshot","by":"Mabel Design","topic":"3d","level":1},{"id":"wZ6_fmDGWHs","title":"Blender Realistic Render with Environment Map Texture using HDRI lighting image","by":"blenderian","topic":"3d","level":1},{"id":"dbAWTNCJVEs","title":"Using HDRIs in Blender 2.8 - Instant Realistic Lighting","by":"FlippedNormals","topic":"3d","level":1},{"id":"gDKrDelckX0","title":"1 Click = 100% Realistic Lighting! | Blender Essentials 02 | Blender 3D Beginners Tutorial","by":"ArtSyndrom3","topic":"3d","level":1},{"id":"cvVm4ou7ByE","title":"How to add HDRi in Blender 4.1! (Quick realistic Lighting)","by":"Blender Inferno","topic":"3d","level":1},{"id":"PKXIujVcAj0","title":"How to do HDR lighting in Blender/Cycles in 15 seconds","by":"Greg Zaal","topic":"3d","level":1},{"id":"fB1yye1aAmY","title":"Render with Jay #02: Lighting and HDRI Setup in Blender","by":"The WP Guru","topic":"3d","level":1}];

function libLevelOf(c) {
  if (LIB_LEVEL_OVERRIDE[c.id]) return LIB_LEVEL_OVERRIDE[c.id];
  const l = String(c.level || '');
  if (/^(Foundation|Basics)$/.test(l)) return 1;
  if (/^(Practitioner|Intermediate)$/.test(l)) return 2;
  if (l) return 3;
  return /^(core)/.test(c.id) ? 1 : 2;
}
let libState = (() => { try { return JSON.parse(localStorage.getItem(LIB_KEY)) || {}; } catch (e) { return {}; } })();
libState.answers = libState.answers || { topics: [], level: 0, goal: '', time: '' };
libState.mine = libState.mine || [];
function libSave() { try { localStorage.setItem(LIB_KEY, JSON.stringify(libState)); } catch (e) {} }

function libCourses() {
  const out = [];
  Object.entries(LIB_TOPIC_OF).forEach(([topic, ids]) => ids.forEach(id => {
    const c = COURSE_INDEX[id]; if (!c) return;
    const vs = (c.videos && c.videos.length) ? c.videos : (youtubeId(c.url) ? [{ id: youtubeId(c.url), title: c.title, by: '' }] : []);
    out.push({ c, topic, level: libLevelOf(c), videos: vs });
  }));
  return out;
}
function libAllVideos() {
  const seen = new Set(); const out = [];
  libCourses().forEach(x => x.videos.forEach(v => {
    if (seen.has(v.id)) return; seen.add(v.id);
    out.push({ id: v.id, title: v.title, by: v.by || '', topic: x.topic, level: x.level, course: x.c.title });
  }));
  LIB_EXTRA.forEach(v => { if (!seen.has(v.id)) { seen.add(v.id); out.push({ id: v.id, title: v.title, by: v.by, topic: v.topic, level: v.level, course: '' }); } });
  return out;
}

function libRecommend() {
  const a = libState.answers;
  const goal = LIB_GOALS.find(g => g.id === a.goal);
  const topics = [...new Set([...(a.topics || []), ...(goal ? goal.topics : [])])];
  const hw = (LIB_TIME.find(t => t.id === a.time) || { h: 5 }).h;
  const cap = hw * 12;                       // a plan that fits in about 3 months at this pace
  const lv = a.level || 1;
  const all = libCourses();
  const queues = topics.map(t => {
    const q = all.filter(x => x.topic === t && (x.level === lv || x.level === lv + 1))
      .sort((p, q2) => Math.abs(p.level - lv) - Math.abs(q2.level - lv) || p.level - q2.level || (p.c.hours || 0) - (q2.c.hours || 0));
    return { t, q: (a.topics || []).includes(t) ? q : q.slice(0, 2) };
  });
  const picked = []; let hours = 0, more = true;
  const used = new Set();
  while (more) {
    more = false;
    for (const { t, q } of queues) {
      const x = q.shift(); if (!x) continue; more = true;
      if (used.has(x.c.id) || hours + (x.c.hours || 0) > cap) continue;
      used.add(x.c.id); hours += x.c.hours || 0;
      const why = [];
      if ((a.topics || []).includes(t)) why.push('You picked ' + LIB_TOPICS.find(z => z.id === t).name);
      else why.push('Supports your goal: ' + goal.name.toLowerCase());
      why.push(x.level === lv ? 'matches your level' : 'a step up from your level');
      picked.push({ ...x, why: why.join(', ') });
    }
  }
  if (goal) goal.pin.forEach(id => {
    const x = all.find(z => z.c.id === id);
    if (x && !used.has(id) && hours + (x.c.hours || 0) <= cap + 6) { used.add(id); hours += x.c.hours || 0; picked.push({ ...x, why: 'Built for your goal: ' + goal.name.toLowerCase() }); }
  });
  picked.sort((p, q2) => p.level - q2.level);   // easier first, stable within a level
  const weeks = Math.max(1, Math.round(hours / hw));
  const topicHours = topics.map(t => ({ t, h: picked.filter(x => x.topic === t).reduce((s2, x) => s2 + (x.c.hours || 0), 0) })).filter(z => z.h);
  const extras = libAllVideos().filter(v => !v.course && topics.includes(v.topic) && (v.level === lv || v.level === lv + 1)).slice(0, 12);
  return { picked, hours, weeks, hw, goal, topicHours, extras, lv };
}

function libVidCard(v) {
  return `<a class="vid vid--s" href="https://www.youtube.com/watch?v=${esc(v.id)}" target="_blank" rel="noopener" aria-label="Watch: ${esc(v.title)}">
    <span class="vid__img"><img src="https://img.youtube.com/vi/${esc(v.id)}/hqdefault.jpg" alt="" loading="lazy" onerror="this.closest('.vid').remove()"><span class="vid__play" aria-hidden="true">▶</span></span>
    <span class="vid__title">${esc(v.title)}</span>${v.by ? `<span class="vid__by">${esc(v.by)}</span>` : ''}</a>`;
}
function libCourseCard(x) {
  const c = x.c, mine = libState.mine.includes(c.id);
  const shown = x.videos.slice(0, 4), rest = x.videos.slice(4);
  return `<article class="rec" data-cid="${esc(c.id)}">
    <div class="rec__top">
      <div>
        <div class="rec__meta"><span class="lvl lvl--${['', 'foundation', 'intermediate', 'senior'][x.level]}">${LIB_LEVELS[x.level]}</span>
          <span class="rec__small">${c.hours ? c.hours + ' h' : ''} · ${x.videos.length} video${x.videos.length === 1 ? '' : 's'}</span></div>
        <h3 class="rec__title">${esc(c.title)}</h3>
      </div>
      <button class="btn ${mine ? '' : 'btn--ghost'} btn--small rec__add" data-add="${esc(c.id)}">${mine ? '✓ In my list' : '+ Add to my list'}</button>
    </div>
    <p class="rec__why">${esc(c.objective)}</p>
    <div class="vids__grid">${shown.map(libVidCard).join('')}</div>
    ${rest.length ? `<details class="rec__more"><summary>Show ${rest.length} more video${rest.length === 1 ? '' : 's'}</summary><div class="vids__grid">${rest.map(libVidCard).join('')}</div></details>` : ''}
  </article>`;
}

const LIB_STEPS = 2;
function libOpt(group, id, name, sub, on, multi) {
  return `<button type="button" class="opt ${on ? 'is-on' : ''}" data-q="${group}" data-v="${id}" aria-pressed="${on}">
    <span class="opt__mark">${multi ? '' : ''}</span><span class="opt__name">${esc(name)}</span><span class="opt__sub">${esc(sub || '')}</span></button>`;
}
function libQuizHTML() {
  const a = libState.answers, st = Math.min(libState.step || 0, LIB_STEPS - 1);
  const steps = [
    { t: 'What do you want to learn?', h: 'Pick as many as you like.', body: LIB_TOPICS.map(t => libOpt('topics', t.id, t.name, LIB_TOPIC_SUB[t.id], a.topics.includes(t.id), true)).join(''), multi: true, ok: a.topics.length > 0 },
    { t: 'Where are you today?', h: 'Be honest. It decides where your plan starts.', body: [1, 2, 3].map(n => libOpt('level', n, LIB_LEVELS[n], LIB_LEVEL_SUB[n], a.level === n)).join('') }
  ];
  const s2 = steps[st];
  return `<div class="wiz">
    <div class="wiz__bar"><span style="width:${(st / LIB_STEPS) * 100}%"></span></div>
    <div class="wiz__count">Question ${st + 1} of ${LIB_STEPS}</div>
    <h2 class="wiz__t">${s2.t}</h2><p class="wiz__h">${s2.h}</p>
    <div class="opts opts--${st === 0 ? 'wide' : 'norm'}">${s2.body}</div>
    <div class="wiz__nav">
      <button class="btn btn--ghost" id="lib-back" ${st === 0 ? 'hidden' : ''}>Back</button>
      ${(s2.multi || st === LIB_STEPS - 1) ? `<button class="btn" id="lib-next" ${(s2.multi ? s2.ok : !!a.level) ? '' : 'disabled'}>${st === LIB_STEPS - 1 ? 'Build my plan' : 'Next'}</button>` : ''}
    </div></div>`;
}
function libSummaryHTML() {
  const a = libState.answers, g = LIB_GOALS.find(x => x.id === a.goal), t = LIB_TIME.find(x => x.id === a.time);
  return `<div class="sum"><div class="sum__chips">
    ${a.topics.map(id => '<span class="sum__c">' + esc(LIB_TOPICS.find(z => z.id === id).name) + '</span>').join('')}
    <span class="sum__c sum__c--n">${LIB_LEVELS[a.level]}</span></div>
    <button class="btn btn--ghost btn--small" id="lib-edit">Change my answers</button></div>`;
}

function libResultsHTML() {
  const r = libRecommend();
  if (!r.picked.length) return '<p class="empty">No courses match those answers yet. Try another level or add more interests.</p>';
  const allIn = r.picked.every(x => libState.mine.includes(x.c.id));
  const mx = Math.max(...r.topicHours.map(z => z.h), 1);
  let h = `<div class="plan">
    <p class="eyebrow">Your plan</p>
    <h2 class="h-l">${r.picked.length} courses, ${r.hours} hours, about ${r.weeks} weeks</h2>
    <p class="lede small mt-s">Built from your answers. At ${r.hw} hours a week you can finish it in about ${r.weeks} weeks. Start at step 1 and go in order. Remove anything you do not want.</p>
    <div class="plan__split">${r.topicHours.map(z => `<div class="plan__row"><span>${esc(LIB_TOPICS.find(x => x.id === z.t).name)}</span><span class="plan__bar"><i style="width:${Math.round(z.h / mx * 100)}%"></i></span><b>${z.h} h</b></div>`).join('')}</div>
    <div class="plan__go"><button class="btn" id="lib-addall">${allIn ? '✓ Whole plan is in my list' : 'Add the whole plan to my list'}</button></div>
  </div>`;
  let wk = 0;
  h += '<div class="steps">' + r.picked.map((x, i) => {
    const start = Math.floor(wk) + 1; wk += (x.c.hours || 0) / r.hw;
    return `<div class="step"><div class="step__n">${i + 1}</div><div class="step__b"><div class="step__when">${Math.ceil(wk) > start ? 'Weeks ' + start + ' to ' + Math.ceil(wk) : 'Week ' + start} · ${esc(x.why)}</div>${libCourseCard(x)}</div></div>`;
  }).join('') + '</div>';
  if (r.extras.length) h += `<div class="lib-more"><div class="sub-label">Extra videos on your topics</div><div class="vids__grid">${r.extras.map(libVidCard).join('')}</div></div>`;
  return h;
}

function libMineHTML() {
  const items = libState.mine.map(id => COURSE_INDEX[id]).filter(Boolean);
  if (!items.length) return '<p class="lede small">Your list is empty. Use “Add to my list” on any recommended course.</p>';
  const hours = items.reduce((s, c) => s + (c.hours || 0), 0);
  return `<div class="prog__top"><span><b>${items.length}</b> course${items.length === 1 ? '' : 's'} · <b>${hours}</b> hours</span></div>
    <ul class="mine">${items.map(c => `<li><span>${esc(c.title)}</span><button class="mine__x" data-rm="${esc(c.id)}" aria-label="Remove ${esc(c.title)}">✕</button></li>`).join('')}</ul>`;
}

let libFilter = { topic: '', level: 0, q: '', n: 48 };
function libAllHTML() {
  const q = libFilter.q.trim().toLowerCase();
  const all = libAllVideos().filter(v => (!libFilter.topic || v.topic === libFilter.topic) && (!libFilter.level || v.level === libFilter.level) && (!q || (v.title + ' ' + v.by + ' ' + v.course).toLowerCase().includes(q)));
  const shown = all.slice(0, libFilter.n);
  return `<p class="lede small">${all.length} video${all.length === 1 ? '' : 's'}</p>
    <div class="vids__grid vids__grid--lib mt-s">${shown.map(libVidCard).join('') || '<p class="empty">Nothing matches. Try another topic or word.</p>'}</div>
    ${all.length > shown.length ? '<div class="lib-showmore"><button class="btn btn--ghost" id="lib-more">Show more</button></div>' : ''}`;
}

function libRefreshAdd(id) {
  $$('#lib-results [data-add="' + id + '"]').forEach(btn => {
    const on = libState.mine.includes(id);
    btn.textContent = on ? '✓ In my list' : '+ Add to my list'; btn.classList.toggle('btn--ghost', !on);
  });
  const all = $('#lib-addall');
  if (all) { const r = libRecommend(); all.textContent = r.picked.every(x => libState.mine.includes(x.c.id)) ? '✓ Whole plan is in my list' : 'Add the whole plan to my list'; }
}
function libShowQuiz() {
  const done = libState.shown;
  $('#lib-quiz').innerHTML = done ? libSummaryHTML() : libQuizHTML();
  $('#lib-results').innerHTML = done ? libResultsHTML() : '';
}
function renderLibrary() {
  $('#lib-count').textContent = libAllVideos().length;
  libShowQuiz();
  $('#lib-mine').innerHTML = libMineHTML();
  $('#lib-filters').innerHTML = `<div class="filters">
      <button class="filter ${!libFilter.topic ? 'is-on' : ''}" data-ft="">All topics</button>
      ${LIB_TOPICS.map(t => `<button class="filter ${libFilter.topic === t.id ? 'is-on' : ''}" data-ft="${t.id}">${esc(t.name)}</button>`).join('')}
    </div>
    <div class="filters mt-s">
      <button class="filter ${!libFilter.level ? 'is-on' : ''}" data-fl="0">Any level</button>
      ${[1, 2, 3].map(n => `<button class="filter ${libFilter.level === n ? 'is-on' : ''}" data-fl="${n}">${LIB_LEVELS[n]}</button>`).join('')}
    </div>`;
  $('#lib-all').innerHTML = libAllHTML();
}
function libFinish() {
  libState.shown = true; libSave(); libShowQuiz();
  $('#lib-quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('click', e => {
  if (!$('#view-library') || !$('#view-library').classList.contains('is-active')) return;
  const t = e.target.closest('button'); if (!t) return;
  const a = libState.answers;
  if (t.dataset.q) {
    const g = t.dataset.q, v = t.dataset.v;
    if (g === 'topics') { a.topics = a.topics.includes(v) ? a.topics.filter(x => x !== v) : [...a.topics, v]; libSave(); $('#lib-quiz').innerHTML = libQuizHTML(); return; }
    if (g === 'level') a.level = +v; else a[g] = v;
    libSave(); $('#lib-quiz').innerHTML = libQuizHTML();
    
  } else if (t.id === 'lib-next') {
    if ((libState.step || 0) >= LIB_STEPS - 1) libFinish(); else { libState.step = (libState.step || 0) + 1; libSave(); libShowQuiz(); }
  } else if (t.id === 'lib-back') {
    libState.step = Math.max(0, (libState.step || 0) - 1); libSave(); libShowQuiz();
  } else if (t.id === 'lib-edit') {
    libState.shown = false; libState.step = 0; libSave(); libShowQuiz(); $('#lib-quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (t.id === 'lib-addall') {
    const r = libRecommend(), ids = r.picked.map(x => x.c.id);
    const every = ids.every(id => libState.mine.includes(id));
    libState.mine = every ? libState.mine.filter(id => !ids.includes(id)) : [...new Set([...libState.mine, ...ids])];
    libSave(); $('#lib-mine').innerHTML = libMineHTML(); ids.forEach(libRefreshAdd);
    toast(every ? 'Plan removed from your list' : 'Plan added to your list', ids.length + ' courses');
  } else if (t.dataset.add) {
    const id = t.dataset.add;
    libState.mine = libState.mine.includes(id) ? libState.mine.filter(x => x !== id) : [...libState.mine, id];
    libSave(); $('#lib-mine').innerHTML = libMineHTML(); libRefreshAdd(id);
    if (libState.mine.includes(id)) toast('Added to your list', COURSE_INDEX[id].title);
  } else if (t.dataset.rm) {
    libState.mine = libState.mine.filter(x => x !== t.dataset.rm); libSave();
    $('#lib-mine').innerHTML = libMineHTML(); libRefreshAdd(t.dataset.rm);
  } else if (t.dataset.ft !== undefined) {
    libFilter.topic = t.dataset.ft; libFilter.n = 48; renderLibrary();
  } else if (t.dataset.fl !== undefined) {
    libFilter.level = +t.dataset.fl; libFilter.n = 48; renderLibrary();
  } else if (t.id === 'lib-more') {
    libFilter.n += 48; $('#lib-all').innerHTML = libAllHTML();
  }
});
document.addEventListener('input', e => {
  if (e.target.id === 'lib-search') { libFilter.q = e.target.value; libFilter.n = 48; $('#lib-all').innerHTML = libAllHTML(); }
});
