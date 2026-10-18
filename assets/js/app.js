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
  LADDER_MISSIONS.forEach(x => m[x.id] = x);
  DESIGN_MISSIONS.forEach(x => m[x.id] = x);
  STAGE2_MISSIONS.forEach(x => m[x.id] = x);
  STAGE3_MISSIONS.forEach(x => m[x.id] = x);
  TL_MISSIONS.forEach(x => m[x.id] = x);
  THINKING_MISSIONS.forEach(x => m[x.id] = x);
  BONUS_MISSIONS.forEach(x => m[x.id] = x);
  return m;
})();

const personById = id => HEROES.find(h => h.id === id);
const initials = name => name.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();

function nextRank(rank) {
  const i = PROGRAM.ranks.indexOf(rank);
  return i > -1 && i < PROGRAM.ranks.length - 1 ? PROGRAM.ranks[i + 1] : null;
}

/* ---------- videos ----------
   A course lists its videos as { id, title, by }. Thumbnails come from the
   YouTube id. A course with only a url still gets one thumbnail. */
function youtubeId(url) {
  const m = String(url || '').match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}
function videosFor(c) {
  if (c.videos && c.videos.length) return c.videos;
  const id = youtubeId(c.url);
  return id ? [{ id, title: c.title, by: '' }] : [];
}
function videoCard(v) {
  return `
    <a class="vid" href="https://www.youtube.com/watch?v=${esc(v.id)}" target="_blank" rel="noopener"
       aria-label="Watch: ${esc(v.title)}">
      <span class="vid__img">
        <img src="https://img.youtube.com/vi/${esc(v.id)}/hqdefault.jpg" alt="" loading="lazy"
             onerror="this.closest('.vid').remove()">
        <span class="vid__play" aria-hidden="true">▶</span>
      </span>
      <span class="vid__title">${esc(v.title)}</span>
      ${v.by ? `<span class="vid__by">${esc(v.by)}</span>` : ''}
    </a>`;
}
function videosHTML(c) {
  const vs = videosFor(c);
  if (!vs.length) return '';
  return `<div class="vids"><div class="sub-label">Watch</div><div class="vids__grid">${vs.map(videoCard).join('')}</div></div>`;
}
const thumbHTML = videosHTML;

/* ============================================================
   STRUCTURE
   ============================================================ */
function personCourses(p) {
  return {
    core: CORE_MISSIONS,
    arc: (p.extras || []).map(id => (id ? COURSE_INDEX[id] : null)),
    track: []
  };
}
function personBonus(p) {
  return (p.bonus || []).map(id => BONUS_MISSIONS.find(c => c.id === id)).filter(Boolean);
}
const isDone = (pid, cid) => !!(progress[pid] && progress[pid][cid]);

function stageCourses(p, st) {
  const g = personCourses(p);
  const b = personBonus(p);
  /* a custom path takes only the courses named for that person */
  return [
    ...(p.custom ? [] : st.core).map(id => COURSE_INDEX[id]),
    ...(p.custom ? [] : ((st.team || {})[p.division] || [])).map(id => COURSE_INDEX[id]),
    ...((st.people || {})[p.id] || []).map(id => COURSE_INDEX[id]),
    ...(p.custom ? [] : st.arc).map(i => g.arc[i]),
    ...st.track.map(i => g.track[i]),
    ...(st.bonus || []).map(i => b[i])
  ].filter(Boolean);
}

/* Stages for this person, empties dropped, prerequisites resolved in order. */
function stages(p) {
  const MONTHS = 6;
  const seen = new Set();              // a video shows only once on a person's path
  const raw = (p.path || []).map(def => ({
    def,
    courses: def.courses.map(id => COURSE_INDEX[id]).filter(Boolean).map(c => {
      const vs = videosFor(c).filter(v => !seen.has(v.id));
      vs.forEach(v => seen.add(v.id));
      return { ...c, videos: vs, url: vs[0] ? 'https://www.youtube.com/watch?v=' + vs[0].id : c.url };
    })
  })).filter(r => r.courses.length);

  /* months follow the hours, so the load is even and the order never changes */
  const total = raw.reduce((s, r) => s + r.courses.reduce((t, c) => t + hrs(c), 0), 0) || 1;
  let acc = 0;
  raw.forEach(r => {
    const h = r.courses.reduce((t, c) => t + hrs(c), 0);
    r.month = Math.min(MONTHS, Math.floor((acc + h / 2) / total * MONTHS) + 1);
    acc += h;
  });

  let unlocked = true;
  return raw.map((r, i, all) => {
    const done = r.courses.filter(c => isDone(p.id, c.id)).length;
    const complete = done === r.courses.length;
    const row = {
      st: { name: r.def.name, tagline: r.def.tagline, level: r.def.level, chapter: r.month },
      courses: r.courses, done, total: r.courses.length, complete,
      label: r.def.name,
      hours: r.courses.reduce((t, c) => t + hrs(c), 0),
      level: (p.midCap && r.def.level === 'Senior') ? (p.midLabel || 'Strong mid-level') : r.def.level,
      spec: false, bonus: false,
      locked: !unlocked, index: i, count: all.length,
      pct: Math.round(done / r.courses.length * 100)
    };
    if (!complete) unlocked = false;
    return row;
  });
}

const hrs = c => c.hours || 0;
function personHours(p) {
  return stages(p).reduce((s, r) => s + r.courses.reduce((t, c) => t + hrs(c), 0), 0);
}
const WEEKS = Math.round(PROGRAM.days / 7);

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
  return { day: d, left: Math.max(PROGRAM.days - d, 0), month: Math.min(Math.ceil(d / 30), 6) };
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
        <span class="course__meta">${c.hours ? c.hours + ' h' : esc(c.duration)}</span>
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

/* ---------- stage passwords ----------
   A soft gate: the site is static, so this keeps people on the plan's order,
   it is not security. Only hashes are in the code. */
const PW_KEY = 'osol-stage-pw-v1';
function pwStore() { try { return JSON.parse(localStorage.getItem(PW_KEY)) || {}; } catch (e) { return {}; } }
function pwOk(p, label) { return !!(pwStore()[p.id] || {})[label]; }
function pwSave(p, label) {
  const s = pwStore(); s[p.id] = s[p.id] || {}; s[p.id][label] = true;
  try { localStorage.setItem(PW_KEY, JSON.stringify(s)); } catch (e) {}
}
async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}
function askPassword(p, label, onOk) {
  const wrap = document.createElement('div');
  wrap.className = 'pw';
  wrap.innerHTML = `
    <form class="pw__box" autocomplete="off">
      <div class="pw__key" aria-hidden="true">🔑</div>
      <h2 class="pw__title">${esc(label)}</h2>
      <p class="pw__text">This stage has a password. Ask the Team Lead for it.</p>
      <input class="pw__in" type="text" placeholder="Enter the password" aria-label="Password" autocapitalize="off" spellcheck="false">
      <p class="pw__err" hidden>That is not it. Check the spelling and try again.</p>
      <div class="pw__btns">
        <button type="button" class="btn btn--ghost pw__cancel">Cancel</button>
        <button type="submit" class="btn">Unlock</button>
      </div>
    </form>`;
  document.body.appendChild(wrap);
  const input = $('.pw__in', wrap), err = $('.pw__err', wrap), box = $('.pw__box', wrap);
  const close = () => wrap.remove();
  input.focus();
  $('.pw__cancel', wrap).addEventListener('click', close);
  wrap.addEventListener('mousedown', e => { if (e.target === wrap) close(); });
  wrap.addEventListener('keydown', e => { if (e.key === 'Escape') { e.stopPropagation(); close(); } });
  box.addEventListener('submit', async e => {
    e.preventDefault();
    const ok = (await sha256('osol|' + input.value.trim().toLowerCase())) === (STAGE_KEYS[p.id] || {})[label];
    if (ok) { pwSave(p, label); close(); toast('Stage unlocked', label); onOk(); }
    else { err.hidden = false; box.classList.remove('is-shake'); void box.offsetWidth; box.classList.add('is-shake'); input.select(); }
  });
}
function unlockAndOpen(p, i) {
  const host = $('#path');
  openStage = i;
  host.innerHTML = pathHTML(p); wirePath(p);
  const el = $('#path .stage[data-i="' + i + '"]');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}


function pathHTML(p) {
  const rows = stages(p);
  let html = '';
  let lastMonth = 0;

  rows.forEach(r => {
    if (r.st.chapter !== lastMonth) {
      lastMonth = r.st.chapter;
      const covers = [...new Set(rows.filter(x => x.st.chapter === lastMonth).map(x => x.label.split(':')[0]))];
      const ch = {
        name: (lastMonth <= 3 ? 'Stage 1' : 'Stage 2') + ' · Month ' + lastMonth,
        sub: covers.length > 3 ? covers.slice(0, 3).join(' · ') + ' …' : covers.join(' · ')
      };
      const mh = rows.filter(x => x.st.chapter === lastMonth).reduce((s, x) => s + x.hours, 0);
      html += `
        <div class="phase-head">
          <span class="phase-head__name">${esc(ch.name)}</span>
          <span class="phase-head__sub">${esc(ch.sub)}</span>
          <span class="phase-head__hrs">${mh} hours</span>
        </div>`;
    }

    const state = r.complete ? 'is-done' : (r.locked ? 'is-locked' : 'is-current');
    const status = r.complete
      ? '<span class="pill pill--done">Complete</span>'
      : r.locked
        ? '<span class="pill pill--locked">Locked</span>'
        : !pwOk(p, r.label)
          ? '<span class="pill pill--key">🔑 Password</span>'
          : '<span class="pill pill--now">In progress</span>';

    html += `
      <div class="stage ${state} ${(openStage === r.index && pwOk(p, r.label)) ? 'is-open' : ''}" data-i="${r.index}">
        <button class="stage__head" aria-expanded="${openStage === r.index && pwOk(p, r.label)}">
          <span class="stage__num">${r.complete ? '✓' : (r.locked ? '🔒' : r.index + 1)}</span>
          <span class="stage__text">
            <span class="stage__name">${esc(r.label)}<span class="lvl lvl--${r.level.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">${esc(r.level)}</span></span>
            <span class="stage__tag">${esc(r.st.tagline)}</span>
          </span>
          <span class="stage__side">
            <span class="stage__count">${r.hours} h · ${r.done}/${r.total}</span>
            ${status}
            <span class="stage__caret" aria-hidden="true">›</span>
          </span>
        </button>
        <div class="stage__body">
          ${r.locked
            ? `<p class="locked-note">Complete <b>${esc(rows[r.index - 1].label)}</b> first —
               ${rows[r.index - 1].total - rows[r.index - 1].done} course${rows[r.index - 1].total - rows[r.index - 1].done === 1 ? '' : 's'} to go.
               Each stage opens the next.</p>`
            : !pwOk(p, r.label)
              ? '<p class="locked-note">This stage needs a password. Open it and enter the password from the Team Lead.</p>'
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
      if (!pwOk(p, rows[i].label)) { askPassword(p, rows[i].label, () => unlockAndOpen(p, i)); return; }
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
    if (!stages(p)[i].locked && pwOk(p, stages(p)[i].label)) wireCourses(p, el);
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
        <p class="nextup__meta">${esc(n.row.label)} · stage ${n.row.index + 1} of ${n.row.count} · ${n.course.hours ? n.course.hours + ' h' : esc(n.course.duration)}</p>
      </div>
      <button class="btn nextup__go" data-stage="${n.row.index}" data-cid="${n.course.id}">Open</button>
    </div>`;
}

function wireNextUp(p) {
  const b = $('.nextup__go');
  if (!b) return;
  b.addEventListener('click', () => {
    const i = +b.dataset.stage, cid = b.dataset.cid;
    const lab = stages(p)[i].label;
    if (!pwOk(p, lab)) { askPassword(p, lab, () => { unlockAndOpen(p, i); b.click(); }); return; }
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
      <div class="month__n">${esc(ph.label || 'Month ' + ph.n)}${ph.origin === 'added' ? '<span class="draft">Draft</span>' : ''}</div>
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
            <span class="chip-s">${personHours(p)} hours · about ${Math.round(personHours(p) / WEEKS)} a week</span>
          </div>
        </div>
        <div class="phead__prog">
          <div class="prog__top">
            <span id="p-label"><b>${s.done}</b> of ${s.total} courses complete</span>
            <span id="p-pct">${s.pct}%</span>
          </div>
          <div class="prog__track"><div class="prog__fill" id="p-fill" style="width:${s.pct}%"></div></div>
          <div id="nextup-host">${nextUpHTML(p)}</div>
          <button class="btn btn--ghost btn--small mt-s" id="person-reset">Reset ${esc(p.name.split(' ')[0])}’s progress</button>
        </div>
      </div>

      <p class="quote">${esc(p.tagline)}</p>
      <p class="target"><b>Target</b>${esc(p.target || PROGRAM.target)}</p>
      <p class="target-note">This target is a starting point. The final goal for ${esc(p.name.split(' ')[0])} will be set from the evaluation the Team Lead sent.</p>

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
          ${p.powersPending ? `<p class="note">${esc(p.pendingNote || ('Baseline levels for ' + p.name + ' are being set by the Team Lead, so progress is measured on the same scale as the rest of the team.'))}</p>` : ''}
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
        <div class="grid-2">${months}</div>
        <div class="goal mt-m">
          <span class="goal__l">120-day goal</span>
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
  const rb = $('#person-reset');
  if (rb) rb.addEventListener('click', () => {
    if (!confirm('Reset all progress for ' + p.name + '? Other people are not affected.')) return;
    delete progress[p.id]; save(); openStage = null;
    renderPerson(p.id); updateHUD(); toast('Progress reset', p.name.split(' ')[0]);
  });
  window.scrollTo(0, 0);
}

/* ============================================================
   RESOURCES
   ============================================================ */
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
const VIEWS = ['team', 'person', 'library', 'resources'];

function route() {
  const [name, arg] = (location.hash.replace('#', '') || 'team').split('/');
  const view = VIEWS.includes(name) ? name : 'team';

  $$('.view').forEach(v => v.classList.remove('is-active'));
  $('#view-' + view).classList.add('is-active');
  $$('.nav button').forEach(b =>
    b.classList.toggle('is-on', b.dataset.go === view || (view === 'person' && b.dataset.go === 'team')));

  if (view === 'team') renderTeam();
  if (view === 'person') renderPerson(arg);
  if (view === 'library') renderLibrary();
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


  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
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
