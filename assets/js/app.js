/* ============================================================
   Osolutions Learning Path
   ============================================================ */

const STORE_KEY = 'osol-learning-progress-v1';

let progress = load();
function load() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch (e) {}
}

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const TEAM_COLOR = { kinetic: 'var(--teal)', forge: 'var(--orange)' };
const TEAM_VARS = {
  kinetic: { a: 'var(--teal)', s: 'var(--teal-soft)', l: 'var(--teal-line)' },
  forge: { a: 'var(--orange)', s: 'var(--orange-soft)', l: 'var(--orange-line)' }
};

const COURSE_INDEX = (() => {
  const m = {};
  CORE_MISSIONS.forEach(x => m[x.id] = x);
  Object.values(TRACK_MISSIONS).flat().forEach(x => m[x.id] = x);
  BONUS_MISSIONS.forEach(x => m[x.id] = x);
  return m;
})();

const personById = id => HEROES.find(h => h.id === id);
const initials = name => name.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();

function nextRank(rank) {
  const i = PROGRAM.ranks.indexOf(rank);
  return i > -1 && i < PROGRAM.ranks.length - 1 ? PROGRAM.ranks[i + 1] : null;
}

/* ---------- video thumbnails ----------
   YouTube links resolve their own poster frame. Anything else can set
   `thumb: 'https://…'` on the course. */
function youtubeId(url) {
  const m = String(url || '').match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}
function thumbFor(c) {
  if (c.thumb) return c.thumb;
  const id = youtubeId(c.url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}
function thumbHTML(c) {
  const t = thumbFor(c);
  if (!t) return '';
  return `
    <a class="thumb" href="${esc(c.url)}" target="_blank" rel="noopener"
       aria-label="Watch: ${esc(c.title)}">
      <img src="${esc(t)}" alt="" loading="lazy" onerror="this.closest('.thumb').remove()">
      <span class="thumb__play" aria-hidden="true">▶</span>
    </a>`;
}

/* ============================================================
   STRUCTURE
   ============================================================ */
function personCourses(p) {
  const track = TRACK_MISSIONS[p.division] || [];
  const priority = new Set(p.extras || []);
  return {
    core: CORE_MISSIONS,
    arc: track.filter(c => priority.has(c.id)),
    track: track.filter(c => !priority.has(c.id))
  };
}
function personBonus(p) {
  return (p.bonus || []).map(id => BONUS_MISSIONS.find(c => c.id === id)).filter(Boolean);
}
const isDone = (pid, cid) => !!(progress[pid] && progress[pid][cid]);

function stageCourses(p, st) {
  const g = personCourses(p);
  const b = personBonus(p);
  return [
    ...st.core.map(id => COURSE_INDEX[id]),
    ...st.arc.map(i => g.arc[i]),
    ...st.track.map(i => g.track[i]),
    ...(st.bonus || []).map(i => b[i])
  ].filter(Boolean);
}

/* Stages for this person, empties dropped, prerequisites resolved in order. */
function stages(p) {
  let unlocked = true;
  return JOURNEY
    .map(st => ({ st, courses: stageCourses(p, st) }))
    .filter(r => r.courses.length > 0)
    .map((r, i, all) => {
      const done = r.courses.filter(c => isDone(p.id, c.id)).length;
      const complete = done === r.courses.length;
      const isSpec = !r.st.core.length && !r.st.arc.length && !r.st.track.length;
      const row = {
        st: r.st, courses: r.courses, done, total: r.courses.length, complete,
        /* a specialisation stage is named after the subject being learned */
        label: (isSpec && r.courses[0].stopName) || r.st.name,
        spec: isSpec,
        locked: !unlocked, index: i, count: all.length,
        pct: Math.round(done / r.courses.length * 100)
      };
      if (!complete) unlocked = false;
      return row;
    });
}

function personStats(p) {
  const rows = stages(p);
  const done = rows.reduce((s, r) => s + r.done, 0);
  const total = rows.reduce((s, r) => s + r.total, 0);
  return { done, total, pct: total ? Math.round(done / total * 100) : 0, rows };
}
function teamStats() {
  let done = 0, total = 0;
  HEROES.forEach(p => { const s = personStats(p); done += s.done; total += s.total; });
  return { done, total, pct: total ? Math.round(done / total * 100) : 0 };
}

function programClock() {
  const start = new Date(PROGRAM.startDate + 'T00:00:00');
  const day = Math.floor((new Date() - start) / 86400000) + 1;
  const d = Math.min(Math.max(day, 1), PROGRAM.days);
  return { day: d, left: Math.max(PROGRAM.days - d, 0), month: Math.min(Math.ceil(d / 30), 3) };
}

function toast(msg, sub) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span>${esc(msg)}</span>${sub ? `<b>${esc(sub)}</b>` : ''}`;
  $('#toasts').appendChild(el);
  setTimeout(() => { el.classList.add('is-out'); setTimeout(() => el.remove(), 240); }, 2200);
}

/* ============================================================
   TEAM PAGE
   ============================================================ */
let filter = 'all';

function renderTeam() {
  const c = programClock();
  const t = teamStats();

  $('#stats').innerHTML = `
    <div class="stats">
      <div class="stat"><div class="stat__v">Day ${c.day}</div><div class="stat__l">of ${PROGRAM.days}</div></div>
      <div class="stat"><div class="stat__v">${c.left}</div><div class="stat__l">Days remaining</div></div>
      <div class="stat"><div class="stat__v">Month ${c.month}</div><div class="stat__l">Current month</div></div>
      <div class="stat"><div class="stat__v">${t.pct}%</div><div class="stat__l">${t.done} of ${t.total} courses complete</div></div>
    </div>`;

  const list = filter === 'all' ? HEROES : HEROES.filter(p => p.division === filter);

  $('#roster').innerHTML = list.map(p => {
    const s = personStats(p);
    const d = DIVISIONS[p.division];
    const col = TEAM_COLOR[p.division];
    return `
      <article class="pcard" data-id="${p.id}" tabindex="0" role="button"
               style="--c:${col}" aria-label="Open ${esc(p.name)}, ${esc(p.title)}">
        <div class="pcard__top">
          <span class="avatar" aria-hidden="true">${esc(initials(p.name))}</span>
          <div>
            <div class="pcard__name">${esc(p.name)}</div>
            <div class="pcard__role">${esc(p.title)}</div>
          </div>
        </div>
        <div class="pcard__team">${esc(d.name)}</div>
        <div class="pcard__prog">
          <div class="bar"><i style="width:${s.pct}%"></i></div>
          <div class="pcard__meta"><span>${s.done} of ${s.total} courses</span><span>${s.pct}%</span></div>
        </div>
      </article>`;
  }).join('');

  $$('#roster .pcard').forEach(el => {
    const go = () => location.hash = '#person/' + el.dataset.id;
    el.addEventListener('click', go);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
  });
}

/* ============================================================
   COURSE ROW
   ============================================================ */
function courseHTML(p, c) {
  const done = isDone(p.id, c.id);
  return `
    <div class="course ${done ? 'is-done' : ''}" data-cid="${c.id}">
      <div class="course__head">
        <button class="tick" role="checkbox" aria-checked="${done}"
                aria-label="Mark ${esc(c.title)} complete">✓</button>
        <span class="course__code">${esc(c.code)}</span>
        <span class="course__title">${esc(c.title)}</span>
        <span class="course__meta">${esc(c.duration)}</span>
        <span class="src src--${c.origin}">${c.origin === 'deck' ? 'From deck' : 'Added'}</span>
        <button class="course__more">Details <span aria-hidden="true">›</span></button>
      </div>
      <div class="course__body">
        ${thumbHTML(c)}
        <div class="crow"><div class="sub-label">Purpose</div><p>${esc(c.objective)}</p></div>
        <div class="crow"><div class="sub-label">What you hand in</div><p>${esc(c.deliverable)}</p></div>
        <div class="crow"><div class="sub-label">Complete when</div>
          <ul class="checklist">${c.criteria.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>
        <div class="cfoot">
          ${c.url ? `<a class="link-btn" href="${esc(c.url)}" target="_blank" rel="noopener">Open material ↗</a>` : ''}
          <span class="cfoot__src">Source: ${esc(c.source)}</span>
        </div>
      </div>
    </div>`;
}

function wireCourses(p, root) {
  $$('.course', root).forEach(el => {
    const cid = el.dataset.cid;
    const toggleOpen = () => el.classList.toggle('is-open');
    $('.course__more', el).addEventListener('click', toggleOpen);
    $('.course__title', el).addEventListener('click', toggleOpen);

    const tick = $('.tick', el);
    tick.addEventListener('click', () => {
      const before = stages(p);
      progress[p.id] = progress[p.id] || {};
      const now = !progress[p.id][cid];
      if (now) progress[p.id][cid] = true; else delete progress[p.id][cid];
      save();

      const after = stages(p);
      el.classList.toggle('is-done', now);
      tick.setAttribute('aria-checked', String(now));

      if (now) {
        const s = personStats(p);
        toast('Course complete', `${s.done} of ${s.total}`);
        const opened = after.findIndex((r, i) => before[i] && before[i].locked && !r.locked);
        if (opened > -1) setTimeout(() => toast('Stage unlocked', after[opened].label), 700);
        if (s.pct === 100) setTimeout(() => toast('Plan complete', p.name), 1300);
      }
      refreshPerson(p);
    });
  });
}

/* ============================================================
   THE PATH — a month-grouped timeline
   ============================================================ */
let openStage = null;

function pathHTML(p) {
  const rows = stages(p);
  let html = '';
  let lastMonth = 0;

  rows.forEach(r => {
    if (r.st.chapter !== lastMonth) {
      lastMonth = r.st.chapter;
      const ch = CHAPTERS[lastMonth];
      html += `
        <div class="phase-head">
          <span class="phase-head__name">${esc(ch.name)}</span>
          <span class="phase-head__sub">${esc(ch.sub)}</span>
        </div>`;
    }

    const state = r.complete ? 'is-done' : (r.locked ? 'is-locked' : 'is-current');
    const status = r.complete
      ? '<span class="pill pill--done">Complete</span>'
      : r.locked
        ? '<span class="pill pill--locked">Locked</span>'
        : '<span class="pill pill--now">In progress</span>';

    html += `
      <div class="stage ${state} ${openStage === r.index ? 'is-open' : ''}" data-i="${r.index}">
        <button class="stage__head" aria-expanded="${openStage === r.index}">
          <span class="stage__num">${r.complete ? '✓' : (r.locked ? '🔒' : r.index + 1)}</span>
          <span class="stage__text">
            <span class="stage__name">${esc(r.label)}${r.spec ? '<span class="spec-tag">Specialisation</span>' : ''}</span>
            <span class="stage__tag">${esc(r.st.tagline)}</span>
          </span>
          <span class="stage__side">
            <span class="stage__count">${r.done}/${r.total} courses</span>
            ${status}
            <span class="stage__caret" aria-hidden="true">›</span>
          </span>
        </button>
        <div class="stage__body">
          ${r.locked
            ? `<p class="locked-note">Complete <b>${esc(rows[r.index - 1].label)}</b> first —
               ${rows[r.index - 1].total - rows[r.index - 1].done} course${rows[r.index - 1].total - rows[r.index - 1].done === 1 ? '' : 's'} to go.
               Each stage opens the next.</p>`
            : r.courses.map(c => courseHTML(p, c)).join('')}
        </div>
      </div>`;
  });

  return html;
}

function wirePath(p) {
  $$('#path .stage').forEach(el => {
    const i = +el.dataset.i;
    $('.stage__head', el).addEventListener('click', () => {
      const rows = stages(p);
      if (rows[i].locked) { toast(`Complete ${rows[i - 1].label} first`); return; }
      const nowOpen = !el.classList.contains('is-open');
      $$('#path .stage').forEach(x => x.classList.remove('is-open'));
      $$('#path .stage__head').forEach(x => x.setAttribute('aria-expanded', 'false'));
      if (nowOpen) {
        el.classList.add('is-open');
        $('.stage__head', el).setAttribute('aria-expanded', 'true');
        openStage = i;
      } else {
        openStage = null;
      }
    });
    if (!stages(p)[i].locked) wireCourses(p, el);
  });
}

/* ============================================================
   NEXT COURSE
   ============================================================ */
function nextUp(p) {
  const rows = stages(p);
  const r = rows.find(x => !x.complete);
  if (!r) return null;
  const c = r.courses.find(x => !isDone(p.id, x.id));
  return c ? { row: r, course: c } : null;
}

function nextUpHTML(p) {
  const n = nextUp(p);
  if (!n) {
    return `
      <div class="nextup nextup--done">
        <div class="nextup__body">
          <div class="nextup__label">Plan complete</div>
          <div class="nextup__title">Every course finished</div>
        </div>
      </div>`;
  }
  return `
    <div class="nextup">
      <div class="nextup__body">
        <div class="nextup__label">Next course</div>
        <div class="nextup__title">${esc(n.course.title)}</div>
        <p class="nextup__meta">${esc(n.row.label)} · stage ${n.row.index + 1} of ${n.row.count} · ${esc(n.course.duration)}</p>
      </div>
      <button class="btn nextup__go" data-stage="${n.row.index}" data-cid="${n.course.id}">Open</button>
    </div>`;
}

function wireNextUp(p) {
  const b = $('.nextup__go');
  if (!b) return;
  b.addEventListener('click', () => {
    const i = +b.dataset.stage, cid = b.dataset.cid;
    openStage = i;
    const stage = $(`#path .stage[data-i="${i}"]`);
    $$('#path .stage').forEach(x => x.classList.remove('is-open'));
    if (!stage) return;
    stage.classList.add('is-open');
    $('.stage__head', stage).setAttribute('aria-expanded', 'true');
    const course = $(`.course[data-cid="${cid}"]`, stage);
    if (course) {
      course.classList.add('is-open');
      course.scrollIntoView({ behavior: 'smooth', block: 'center' });
      course.classList.add('is-flash');
      setTimeout(() => course.classList.remove('is-flash'), 1300);
    } else {
      stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

function refreshPerson(p) {
  const s = personStats(p);
  const f = $('#p-fill'); if (f) f.style.width = s.pct + '%';
  const l = $('#p-label'); if (l) l.innerHTML = `<b>${s.done}</b> of ${s.total} courses complete`;
  const pc = $('#p-pct'); if (pc) pc.textContent = s.pct + '%';

  const nu = $('#nextup-host');
  if (nu) { nu.innerHTML = nextUpHTML(p); wireNextUp(p); }

  const host = $('#path');
  if (host) { host.innerHTML = pathHTML(p); wirePath(p); }
  updateHUD();
}

function currentStage(p) {
  const rows = stages(p);
  const i = rows.findIndex(r => !r.complete);
  return i === -1 ? rows.length - 1 : i;
}

/* ============================================================
   PERSON PAGE
   ============================================================ */
function renderPerson(id) {
  const p = personById(id);
  if (!p) { location.hash = '#team'; return; }

  const v = TEAM_VARS[p.division];
  const d = DIVISIONS[p.division];
  const s = personStats(p);
  const view = $('#view-person');
  view.style.setProperty('--accent', v.a);
  view.style.setProperty('--accent-soft', v.s);
  view.style.setProperty('--accent-line', v.l);

  openStage = currentStage(p);

  const skills = p.powers.map(k => {
    const segs = [1, 2, 3, 4, 5].map(i => {
      let cls = '';
      if (k.to > 0 && i <= k.to) cls = 'is-now';
      if (k.from > 0 && i <= k.from) cls = 'is-base';
      return `<span class="seg ${cls}"></span>`;
    }).join('');
    const lvl = k.to > 0 ? `${PROGRAM.levels[k.from]} → ${PROGRAM.levels[k.to]}` : 'Being set';
    return `
      <div class="skill">
        <div class="skill__top"><span class="skill__name">${esc(k.name)}</span><span class="skill__lvl">${esc(lvl)}</span></div>
        <div class="skill__track">${segs}</div>
      </div>`;
  }).join('');

  const months = p.phases.map(ph => `
    <div class="card month">
      <div class="month__n">Month ${ph.n}${ph.origin === 'added' ? '<span class="draft">Draft</span>' : ''}</div>
      <div class="month__name">${esc(ph.name)}</div>
      <ul>${ph.objectives.map(o => `<li>${esc(o)}</li>`).join('')}</ul>
      <div class="month__check"><b>Checkpoint</b>${esc(ph.checkpoint)}</div>
    </div>`).join('');

  const nr = nextRank(p.rank);

  view.innerHTML = `
    <div class="wrap">
      <a class="backlink" href="#team">← Back to the team</a>

      <div class="phead">
        <span class="avatar avatar--lg" aria-hidden="true">${esc(initials(p.name))}</span>
        <div class="phead__id">
          <div class="phead__team">${esc(d.name)} — ${esc(d.role)}</div>
          <h1 class="phead__name">${esc(p.name)}</h1>
          <p class="phead__job">${esc(p.title)}</p>
          <div class="chips">
            <span class="chip-s">Level · ${esc(p.rank)}</span>
            ${nr ? `<span class="chip-s">Next level · ${esc(nr)}</span>` : ''}
            <span class="chip-s chip-s--a">${esc(p.statusTag)}</span>
          </div>
        </div>
        <div class="phead__prog">
          <div class="prog__top">
            <span id="p-label"><b>${s.done}</b> of ${s.total} courses complete</span>
            <span id="p-pct">${s.pct}%</span>
          </div>
          <div class="prog__track"><div class="prog__fill" id="p-fill" style="width:${s.pct}%"></div></div>
          <div id="nextup-host">${nextUpHTML(p)}</div>
        </div>
      </div>

      <p class="quote">${esc(p.tagline)}</p>

      <div class="grid-2 mt-l">
        <div class="card pad">
          <h2 class="h-s">Where they are now</h2>
          ${p.origin.map(x => `<p class="lede" style="margin-bottom:12px">${esc(x)}</p>`).join('')}
        </div>
        <div class="card pad">
          <h2 class="h-s">Skill levels</h2>
          <div class="mt-s">${skills}</div>
          <div class="legend-row">
            <span><i class="sw sw--base"></i>May baseline</span>
            <span><i class="sw sw--now"></i>Now</span>
          </div>
          ${p.powersPending ? `<p class="note">Baseline levels for ${esc(p.name)} are being set by the Team Lead, so progress is measured on the same scale as the rest of the team.</p>` : ''}
        </div>
      </div>

      <div class="card pad focus mt-l">
        <h2 class="h-s">Development focus</h2>
        <p class="focus__head">${esc(p.focus.headline)}</p>
        <p class="lede">${esc(p.focus.why)}</p>
        <div class="sub-label mt-s">How to get there</div>
        <ul class="moves">${p.focus.moves.map(m => `<li>${esc(m)}</li>`).join('')}</ul>
      </div>

      <div class="mt-l">
        <div class="sec-head">
          <div>
            <h2 class="h-l">The plan, month by month</h2>
            <p class="lede small mt-s">${esc(PROGRAM.cap)}</p>
          </div>
        </div>
        <div class="grid-3">${months}</div>
        <div class="goal mt-m">
          <span class="goal__l">90-day goal</span>
          <span class="goal__t">${esc(p.boss)}</span>
        </div>
      </div>

      <div class="mt-l">
        <div class="sec-head">
          <div>
            <h2 class="h-l">Learning path — ${stages(p).length} stages</h2>
            <p class="lede small mt-s">Each stage opens once the one before it is complete. Click a stage to see its courses.</p>
          </div>
        </div>
        <div id="path" class="path">${pathHTML(p)}</div>
      </div>
    </div>`;

  wirePath(p);
  wireNextUp(p);
  window.scrollTo(0, 0);
}

/* ============================================================
   CURRICULUM
   ============================================================ */
let query = '';

function renderCatalogue() {
  const q = query.trim().toLowerCase();
  const tokens = q.split(/\s+/).filter(Boolean);
  const match = c => {
    if (!tokens.length) return true;
    const hay = [c.code, c.title, c.stopName, c.objective, c.source, c.deliverable,
                 (c.criteria || []).join(' ')].filter(Boolean).join(' ').toLowerCase();
    return tokens.every(t => hay.includes(t) || (t.length >= 5 && hay.includes(t.slice(0, 5))));
  };

  const row = c => `
    <div class="crow-card">
      ${thumbHTML(c)}
      <div class="crow-card__top">
        <span class="course__code">${esc(c.code)}</span>
        <span class="src src--${c.origin}">${c.origin === 'deck' ? 'From deck' : 'Added'}</span>
        <span class="crow-card__title">${esc(c.title)}</span>
        <span class="course__meta">${esc(c.duration)}</span>
      </div>
      <p class="lede small">${esc(c.objective)}</p>
      <div class="crow"><div class="sub-label">What you hand in</div><p>${esc(c.deliverable)}</p></div>
      <div class="cfoot">
        ${c.url ? `<a class="link-btn" href="${esc(c.url)}" target="_blank" rel="noopener">Open material ↗</a>` : ''}
        <span class="cfoot__src">Source: ${esc(c.source)}</span>
      </div>
    </div>`;

  const block = (t, note, color, items) => {
    const hits = items.filter(match);
    if (!hits.length) return '';
    return `
      <div class="mt-l">
        <div class="sec-head">
          <div><h2 class="h-l" style="color:${color}">${esc(t)}</h2><p class="lede small mt-s">${esc(note)}</p></div>
          <span class="chip-s">${hits.length}${q ? ' of ' + items.length : ''} courses</span>
        </div>${hits.map(row).join('')}
      </div>`;
  };

  const who = c => HEROES.filter(p => (p.bonus || []).includes(c.id)).map(p => p.name).join(', ');

  const html =
    block('Shared core', 'Everyone takes all nine. One standard across the team.', 'var(--ink)', CORE_MISSIONS) +
    block('Motion Team track', 'Video editing, animation and AI production.', 'var(--teal)', TRACK_MISSIONS.kinetic) +
    block('Design Team track', 'Graphic design, branding and AI production.', 'var(--orange)', TRACK_MISSIONS.forge) +
    block('Specialisations', 'Personal, and only start once someone has completed the shared plan.', 'var(--violet)',
      BONUS_MISSIONS.map(c => ({ ...c, source: c.source + ' · assigned to ' + (who(c) || 'nobody yet') })));

  $('#catalogue').innerHTML = html ||
    `<p class="empty">Nothing matches “${esc(query)}”. Try a course code, a tool name, or a subject.</p>`;
}

/* ============================================================
   TRACKS / RESOURCES
   ============================================================ */
function renderTracks() {
  const colors = { 'gem-type': 'var(--orange)', 'gem-color': 'var(--teal)', 'gem-ai': 'var(--violet)' };
  $('#tracks').innerHTML = SKILL_TREE.map(g => {
    const done = g.feeds.filter(id => HEROES.some(p => isDone(p.id, id))).length;
    const pct = Math.round(done / g.feeds.length * 100);
    const c = colors[g.id] || 'var(--orange)';
    return `
      <div class="card pad track" style="--tc:${c}">
        <h2 class="track__name">${esc(g.name)}</h2>
        <p class="track__creed">${esc(g.creed)}</p>
        <ul class="track__list">
          ${g.feeds.map(id => {
            const m = COURSE_INDEX[id];
            return m ? `<li><code>${esc(m.code)}</code>${esc(m.title)}</li>` : '';
          }).join('')}
        </ul>
        <div class="mt-s">
          <div class="prog__top"><span>${done} of ${g.feeds.length} started</span><span>${pct}%</span></div>
          <div class="prog__track"><div class="prog__fill" style="width:${pct}%;background:${c}"></div></div>
        </div>
      </div>`;
  }).join('');
}

function renderResources() {
  $('#vault').innerHTML = VAULT.map(v => `
    <a class="vrow" href="${esc(v.url)}" target="_blank" rel="noopener">
      <span class="vrow__kind">${esc(v.kind)}</span>
      <span style="flex:1">
        <span class="vrow__name">${esc(v.name)}</span><br>
        <span class="vrow__note">${esc(v.note)}</span>
      </span>
      <span class="vrow__go" aria-hidden="true">↗</span>
    </a>`).join('');
}

function updateHUD() {
  const t = teamStats();
  const el = $('#hud');
  if (el) el.innerHTML = `Team <b>${t.pct}%</b> · ${t.done}/${t.total}`;
}

/* ============================================================
   ROUTER
   ============================================================ */
const VIEWS = ['team', 'person', 'curriculum', 'tracks', 'resources'];

function route() {
  const [name, arg] = (location.hash.replace('#', '') || 'team').split('/');
  const view = VIEWS.includes(name) ? name : 'team';

  $$('.view').forEach(v => v.classList.remove('is-active'));
  $('#view-' + view).classList.add('is-active');
  $$('.nav button').forEach(b =>
    b.classList.toggle('is-on', b.dataset.go === view || (view === 'person' && b.dataset.go === 'team')));

  if (view === 'team') renderTeam();
  if (view === 'person') renderPerson(arg);
  if (view === 'curriculum') renderCatalogue();
  if (view === 'tracks') renderTracks();
  if (view === 'resources') renderResources();

  if (view !== 'person') window.scrollTo(0, 0);
  updateHUD();
}

/* ---------- init ---------- */
function init() {
  $('#year').textContent = new Date().getFullYear();

  $$('.nav button').forEach(b => b.addEventListener('click', () => location.hash = '#' + b.dataset.go));

  $$('.filter').forEach(c => c.addEventListener('click', () => {
    $$('.filter').forEach(x => x.classList.remove('is-on'));
    c.classList.add('is-on');
    filter = c.dataset.div;
    renderTeam();
  }));

  const search = $('#search'), clear = $('#search-clear');
  search.addEventListener('input', () => {
    query = search.value;
    clear.hidden = !query;
    renderCatalogue();
  });
  clear.addEventListener('click', () => {
    search.value = ''; query = ''; clear.hidden = true;
    renderCatalogue(); search.focus();
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (document.activeElement === search && search.value) { clear.click(); return; }
    if (location.hash.startsWith('#person/')) location.hash = '#team';
  });

  $('#reset').addEventListener('click', () => {
    if (confirm('Reset course progress for the whole team?')) {
      progress = {}; save(); openStage = null; route(); toast('Progress reset');
    }
  });

  window.addEventListener('hashchange', route);

  const loader = $('#loader');
  route();
  if (loader) setTimeout(() => {
    loader.classList.add('is-gone');
    setTimeout(() => loader.remove(), 420);
  }, 420);
}

document.addEventListener('DOMContentLoaded', init);
