/* ============================================================
   OSOLUTIONS: ORIGINS — App
   ============================================================ */

const STORE_KEY = 'osol-origins-progress-v1';

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

const SMALL_WORDS = new Set(['and', 'or', 'the', 'of', 'in', 'on', 'to', 'a', 'an', 'for']);
const KEEP_CAPS = { ai: 'AI', ux: 'UX', '3d': '3D' };
const title = s => String(s).toLowerCase().split(' ').map((w, i) =>
  KEEP_CAPS[w] || (i > 0 && SMALL_WORDS.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1))
).join(' ');

const DIV_COLOR = { kinetic: '#22E0F0', forge: '#F76302' };
const DIV_SOFT = {
  kinetic: { s: 'rgba(34,224,240,.12)', l: 'rgba(34,224,240,.38)' },
  forge: { s: 'rgba(247,99,2,.13)', l: 'rgba(247,99,2,.42)' }
};

const MISSION_INDEX = (() => {
  const m = {};
  CORE_MISSIONS.forEach(x => m[x.id] = x);
  Object.values(TRACK_MISSIONS).flat().forEach(x => m[x.id] = x);
  BONUS_MISSIONS.forEach(x => m[x.id] = x);
  return m;
})();

const heroById = id => HEROES.find(h => h.id === id);

/* ---------- video thumbnails ----------
   YouTube links get their poster frame for free. For anything else, set
   `thumb: 'https://…'` on the mission and it is used as-is. */
function youtubeId(url) {
  const m = String(url || '').match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}
function thumbFor(m) {
  if (m.thumb) return m.thumb;
  const id = youtubeId(m.url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}
function thumbHTML(m) {
  const t = thumbFor(m);
  if (!t) return '';
  return `
    <a class="thumb" href="${esc(m.url)}" target="_blank" rel="noopener"
       aria-label="Watch: ${esc(m.title)}">
      <img src="${esc(t)}" alt="" loading="lazy"
           onerror="this.closest('.thumb').remove()">
      <span class="thumb__play" aria-hidden="true">▶</span>
    </a>`;
}

function nextRank(rank) {
  const i = PROGRAM.ranks.indexOf(rank);
  return i > -1 && i < PROGRAM.ranks.length - 1 ? PROGRAM.ranks[i + 1] : 'Top of the ladder';
}

function heroMissions(hero) {
  const track = TRACK_MISSIONS[hero.division] || [];
  const arcIds = new Set(hero.extras || []);
  return {
    core: CORE_MISSIONS,
    arc: track.filter(m => arcIds.has(m.id)),
    track: track.filter(m => !arcIds.has(m.id))
  };
}
const isDone = (h, m) => !!(progress[h] && progress[h][m]);

/* ---------- stations ---------- */
function heroBonus(hero) {
  return (hero.bonus || []).map(id => BONUS_MISSIONS.find(m => m.id === id)).filter(Boolean);
}

function stationMissions(hero, st) {
  const g = heroMissions(hero);
  const b = heroBonus(hero);
  return [
    ...st.core.map(id => MISSION_INDEX[id]),
    ...st.arc.map(i => g.arc[i]),
    ...st.track.map(i => g.track[i]),
    ...(st.bonus || []).map(i => b[i])
  ].filter(Boolean);
}

/* Stations for this hero, empties dropped, lock state resolved in order.
   Only people with a bonus track get the final station at all. */
function journey(hero) {
  let unlocked = true;
  return JOURNEY
    .map(st => ({ st, missions: stationMissions(hero, st) }))
    .filter(r => r.missions.length > 0)
    .map((r, i, all) => {
      const done = r.missions.filter(m => isDone(hero.id, m.id)).length;
      const complete = done === r.missions.length;
      /* a bonus stop is named after the thing being learned there,
         so Shimaa sees "Blender" where Asmaa sees "Screens" */
      const isBonus = !r.st.core.length && !r.st.arc.length && !r.st.track.length;
      const row = {
        st: r.st, missions: r.missions, done, total: r.missions.length, complete,
        label: (isBonus && r.missions[0].stopName) || r.st.name,
        bonus: isBonus,
        locked: !unlocked, index: i, count: all.length,
        pct: Math.round(done / r.missions.length * 100)
      };
      if (!complete) unlocked = false;   // the next station stays locked
      return row;
    });
}

function heroStats(hero) {
  const rows = journey(hero);
  const done = rows.reduce((s, r) => s + r.done, 0);
  const total = rows.reduce((s, r) => s + r.total, 0);
  return { done, total, pct: total ? Math.round(done / total * 100) : 0, rows };
}
function teamStats() {
  let done = 0, total = 0;
  HEROES.forEach(h => { const s = heroStats(h); done += s.done; total += s.total; });
  return { done, total, pct: total ? Math.round(done / total * 100) : 0 };
}

function programClock() {
  const start = new Date(PROGRAM.startDate + 'T00:00:00');
  const day = Math.floor((new Date() - start) / 86400000) + 1;
  const d = Math.min(Math.max(day, 1), PROGRAM.days);
  return { day: d, left: Math.max(PROGRAM.days - d, 0), phase: Math.min(Math.ceil(d / 30), 3) };
}

function toast(msg, sub) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span>${esc(msg)}</span>${sub ? `<b>${esc(sub)}</b>` : ''}`;
  $('#toasts').appendChild(el);
  setTimeout(() => { el.classList.add('is-out'); setTimeout(() => el.remove(), 260); }, 2400);
}

/* ============================================================
   TEAM
   ============================================================ */
let filter = 'all';

function renderTeam() {
  const c = programClock();
  const t = teamStats();

  $('#stats').innerHTML = `
    <div class="stats">
      <div class="stat"><div class="stat__v">DAY ${c.day}</div><div class="stat__l">of ${PROGRAM.days}</div></div>
      <div class="stat"><div class="stat__v">${c.left}</div><div class="stat__l">Days remaining</div></div>
      <div class="stat"><div class="stat__v">CH ${c.phase}</div><div class="stat__l">Current chapter</div></div>
      <div class="stat"><div class="stat__v">${t.pct}%</div><div class="stat__l">${t.done} of ${t.total} missions cleared</div></div>
    </div>`;

  const list = filter === 'all' ? HEROES : HEROES.filter(h => h.division === filter);

  $('#roster').innerHTML = list.map(h => {
    const s = heroStats(h);
    const col = DIV_COLOR[h.division];
    const d = DIVISIONS[h.division];
    return `
      <article class="card" data-id="${h.id}" tabindex="0" role="button"
               style="--dc:${col}" aria-label="Open ${esc(title(h.name))}, ${esc(h.title)}">
        <div class="card__img">
          <img src="${h.portrait}" alt="${esc(title(h.name))}" loading="lazy">
          <span class="card__team">${d.glyph} ${esc(title(d.name))}</span>
        </div>
        <div class="card__body">
          <div class="card__name">${esc(title(h.name))}</div>
          <div class="card__role">${esc(h.title)}</div>
          <div class="card__code"><span>Call sign</span> ${esc(h.codename)}</div>
          <div class="card__bar"><i style="width:${s.pct}%"></i></div>
          <div class="card__pct"><span>${s.done}/${s.total} missions</span><span>${s.pct}%</span></div>
        </div>
      </article>`;
  }).join('');

  $$('#roster .card').forEach(el => {
    const go = () => location.hash = '#person/' + el.dataset.id;
    el.addEventListener('click', go);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
  });
}

/* ============================================================
   MISSION ROW
   ============================================================ */
function missionHTML(hero, m) {
  const done = isDone(hero.id, m.id);
  return `
    <div class="mission ${done ? 'is-done' : ''}" data-mid="${m.id}">
      <div class="mission__head">
        <button class="tick" role="checkbox" aria-checked="${done}" aria-label="Mark ${esc(m.title)} cleared">✓</button>
        <span class="mission__code">${esc(m.code)}</span>
        <span class="src src--${m.origin}">${m.origin === 'deck' ? 'From deck' : 'Added'}</span>
        <span class="mission__title">${esc(m.title)}</span>
        <span class="mission__meta">${esc(m.duration)}</span>
        <button class="mission__more">Details <span>›</span></button>
      </div>
      <div class="mission__body">
        ${thumbHTML(m)}
        <div class="mrow"><div class="sub-label">What it is for</div><p>${esc(m.objective)}</p></div>
        <div class="mrow"><div class="sub-label">What you hand in</div><p>${esc(m.deliverable)}</p></div>
        <div class="mrow"><div class="sub-label">Cleared when</div>
          <ul class="mcrit">${m.criteria.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>
        <div class="mfoot">
          ${m.url ? `<a class="mlink" href="${esc(m.url)}" target="_blank" rel="noopener">Open material ↗</a>` : ''}
          <span class="mfoot__src">Source: ${esc(m.source)}</span>
        </div>
      </div>
    </div>`;
}

/* ============================================================
   THE MAP
   ============================================================ */
/* Serpentine board laid out from the station count, so a hero with a
   bonus station simply gets one more stop rather than a different map. */
const COL_X = [150, 500, 850], ROW_Y0 = 120, ROW_H = 200, COLS = 3;

function boardFor(n) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / COLS), c = i % COLS;
    pts.push([COL_X[r % 2 === 0 ? c : COLS - 1 - c], ROW_Y0 + r * ROW_H]);
  }
  let d = `M${pts[0][0]},${pts[0][1]}`;
  const dist = [0];
  for (let i = 1; i < n; i++) {
    const [px, py] = pts[i - 1], [x, y] = pts[i];
    d += py === y ? ` H${x}` : ` V${y}`;
    dist.push(dist[i - 1] + Math.abs(x - px) + Math.abs(y - py));
  }
  const rows = Math.ceil(n / COLS);
  return { pts, d, dist, len: dist[n - 1], height: ROW_Y0 + (rows - 1) * ROW_H + 130 };
}

let openStation = null;

function renderMap(hero) {
  const rows = journey(hero);
  const col = DIV_COLOR[hero.division];
  const b = boardFor(rows.length);

  const nodes = rows.map((r, i) => {
    const [x, y] = b.pts[i];
    const state = r.complete ? 'is-done' : (r.locked ? 'is-locked' : 'is-current');
    const glyph = r.locked ? '⌾' : (r.complete ? '✓' : r.st.glyph);
    const isOpen = openStation === i ? ' is-open' : '';
    return `
      <g class="node ${state}${isOpen}" data-i="${i}" tabindex="0" role="button"
         aria-label="Stop ${i + 1} of ${rows.length}: ${esc(title(r.label))}${r.locked ? ' (locked)' : ''}">
        ${state === 'is-current' ? `<circle class="pulse" cx="${x}" cy="${y}" r="34" fill="none" stroke="${col}" stroke-width="2"/>` : ''}
        <circle class="node__ring" cx="${x}" cy="${y}" r="34"/>
        <text class="node__glyph" x="${x}" y="${y}">${glyph}</text>
        <text class="node__label" x="${x}" y="${y + 58}">${esc(title(r.label))}</text>
        <text class="node__sub" x="${x}" y="${y + 78}">${r.done}/${r.total}${r.locked ? ' · locked' : ''}</text>
      </g>`;
  }).join('');

  return `
    <div class="map-shell">
      <svg class="map" viewBox="0 0 1000 ${b.height}" role="img"
           aria-label="Journey map: ${rows.length} stops, ${rows.filter(r => r.complete).length} cleared">
        <path class="road-base" d="${b.d}"/>
        <path class="road-dash" d="${b.d}"/>
        <path class="road-done" id="road-done" d="${b.d}" style="stroke:${col}"
              stroke-dasharray="${b.len}" stroke-dashoffset="${b.len}"/>
        ${nodes}
        <g class="walker" id="walker">
          <circle r="21" fill="var(--void)" stroke="${col}" stroke-width="3"/>
          <clipPath id="wclip"><circle r="18"/></clipPath>
          <image class="walker__img" href="${hero.portrait}" x="-18" y="-18" width="36" height="36" clip-path="url(#wclip)"/>
        </g>
      </svg>
    </div>
    <div id="station-panel" class="station"></div>`;
}

/* How far along the road this hero has walked. */
function walkedDistance(hero) {
  const rows = journey(hero);
  const b = boardFor(rows.length);
  const k = rows.findIndex(r => !r.complete);
  if (k === -1) return b.len;
  const base = b.dist[k];
  const span = (b.dist[k + 1] ?? b.len) - base;
  return base + span * (rows[k].pct / 100);
}

/* Re-queries inside the callback: the map is re-rendered on every tick,
   so an element captured beforehand can already be detached. */
function positionWalker(hero) {
  const dist = walkedDistance(hero);
  const len = boardFor(journey(hero).length).len;
  setTimeout(() => {
    const road = document.querySelector('#road-done');
    const walker = document.querySelector('#walker');
    if (!road || !walker) return;
    road.style.strokeDashoffset = String(len - dist);
    try {
      const p = road.getPointAtLength(dist);
      walker.setAttribute('transform', `translate(${p.x},${p.y})`);
    } catch (e) { /* path not measurable yet */ }
  }, 60);
}

function renderStation(hero, i) {
  const rows = journey(hero);
  const r = rows[i];
  const panel = $('#station-panel');
  if (!r || !panel) return;

  const ch = CHAPTERS[r.st.chapter];
  const state = r.complete
    ? '<span class="station__state station__state--done">Cleared</span>'
    : r.locked
      ? '<span class="station__state station__state--lock">Locked</span>'
      : '<span class="station__state station__state--open">In progress</span>';

  let body;
  if (r.locked) {
    const prev = rows[i - 1];
    body = `<div class="locked-msg">
        <span style="font-size:22px">⌾</span>
        <span>Clear <b>${esc(title(prev.label))}</b> first — ${prev.total - prev.done} mission${prev.total - prev.done === 1 ? '' : 's'} to go. Each stop opens the next one.</span>
      </div>`;
  } else {
    body = r.missions.map(m => missionHTML(hero, m)).join('');
  }

  panel.innerHTML = `
    <div class="card-s pad">
      <div class="station__head">
        <div class="station__glyph">${r.locked ? '⌾' : r.st.glyph}</div>
        <div style="flex:1;min-width:200px">
          <div class="station__name">${esc(title(r.label))}</div>
          <div class="station__tag">${esc(r.st.tagline)}</div>
          <div class="mission__meta" style="margin-top:8px">Stop ${r.index + 1} of ${r.count} · Chapter ${r.st.chapter} — ${esc(title(ch.name))} · Month ${r.st.chapter}</div>
        </div>
        ${state}
      </div>
      ${body}
    </div>`;

  if (!r.locked) wireMissions(hero, panel);
}

function wireMap(hero) {
  $$('.node').forEach(n => {
    const i = +n.dataset.i;
    const act = () => {
      const rows = journey(hero);
      if (rows[i].locked) {
        toast(`Clear ${title(rows[i - 1].label)} first`);
        return;
      }
      openStation = i;
      $$('.node').forEach(x => x.classList.toggle('is-open', +x.dataset.i === i));
      renderStation(hero, i);
      $('#station-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    n.addEventListener('click', act);
    n.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); }
    });
  });
}

function wireMissions(hero, root) {
  $$('.mission', root).forEach(el => {
    const mid = el.dataset.mid;
    const open = () => el.classList.toggle('is-open');
    $('.mission__more', el).addEventListener('click', open);
    $('.mission__title', el).addEventListener('click', open);

    const tick = $('.tick', el);
    tick.addEventListener('click', () => {
      const before = journey(hero);
      progress[hero.id] = progress[hero.id] || {};
      const now = !progress[hero.id][mid];
      if (now) progress[hero.id][mid] = true; else delete progress[hero.id][mid];
      save();

      const after = journey(hero);
      el.classList.toggle('is-done', now);
      tick.setAttribute('aria-checked', String(now));

      if (now) {
        const s = heroStats(hero);
        toast('Mission cleared', `${s.done} of ${s.total}`);
        /* did this open a new station? */
        const opened = after.findIndex((r, i) => before[i].locked && !r.locked);
        if (opened > -1) {
          setTimeout(() => toast('New station unlocked', title(after[opened].st.name)), 800);
        }
        if (s.pct === 100) setTimeout(() => toast('Journey complete', title(hero.name)), 1400);
      }
      refreshPerson(hero);
    });
  });
}

/* redraw the map + progress without losing the open station */
function refreshPerson(hero) {
  const s = heroStats(hero);
  const f = $('#p-fill'); if (f) f.style.width = s.pct + '%';
  const l = $('#p-label'); if (l) l.innerHTML = `<b>${s.done}</b> of ${s.total} missions cleared`;
  const p = $('#p-pct'); if (p) p.textContent = s.pct + '%';
  const nu = $('#nextup-host');
  if (nu) { nu.innerHTML = nextUpHTML(hero); wireNextUp(hero); }

  const host = $('#map-host');
  if (host) {
    host.innerHTML = renderMap(hero);
    wireMap(hero);
    renderStation(hero, openStation ?? currentStation(hero));
    positionWalker(hero);
  }
  updateHUD();
}

/* The single next thing this person should do. Drives the "Next up" card. */
function nextUp(hero) {
  const rows = journey(hero);
  const r = rows.find(x => !x.complete);
  if (!r) return null;
  const m = r.missions.find(x => !isDone(hero.id, x.id));
  return m ? { row: r, mission: m } : null;
}

function nextUpHTML(hero) {
  const n = nextUp(hero);
  if (!n) {
    return `
      <div class="nextup nextup--done">
        <div class="nextup__icon">★</div>
        <div class="nextup__body">
          <div class="nextup__label">Road complete</div>
          <div class="nextup__title">Every mission cleared</div>
          <p class="nextup__meta">Nothing left on the map. Time to pick the next thing to chase.</p>
        </div>
      </div>`;
  }
  return `
    <div class="nextup">
      <div class="nextup__icon">▸</div>
      <div class="nextup__body">
        <div class="nextup__label">Next up${n.row.bonus ? ' · bonus track' : ''}</div>
        <div class="nextup__title">${esc(n.mission.title)}</div>
        <p class="nextup__meta">
          ${esc(title(n.row.label))} · stop ${n.row.index + 1} of ${n.row.count} ·
          ${esc(n.mission.duration)} · ${esc(n.mission.code)}
        </p>
      </div>
      <button class="btn nextup__go" data-stop="${n.row.index}" data-mid="${n.mission.id}">Take me there</button>
    </div>`;
}

function wireNextUp(hero) {
  const b = $('.nextup__go');
  if (!b) return;
  b.addEventListener('click', () => {
    const i = +b.dataset.stop, mid = b.dataset.mid;
    openStation = i;
    $$('.node').forEach(x => x.classList.toggle('is-open', +x.dataset.i === i));
    renderStation(hero, i);
    const el = $(`#station-panel .mission[data-mid="${mid}"]`);
    if (el) {
      el.classList.add('is-open');
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('is-flash');
      setTimeout(() => el.classList.remove('is-flash'), 1400);
    } else {
      $('#station-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

function currentStation(hero) {
  const rows = journey(hero);
  const i = rows.findIndex(r => !r.complete);
  return i === -1 ? rows.length - 1 : i;
}

/* ============================================================
   PERSON PAGE
   ============================================================ */
function renderPerson(id) {
  const hero = heroById(id);
  if (!hero) { location.hash = '#team'; return; }

  const col = DIV_COLOR[hero.division];
  const soft = DIV_SOFT[hero.division];
  const d = DIVISIONS[hero.division];
  const s = heroStats(hero);
  const view = $('#view-person');

  view.style.setProperty('--accent', col);
  view.style.setProperty('--accent-soft', soft.s);
  view.style.setProperty('--accent-line', soft.l);

  openStation = currentStation(hero);

  const powers = hero.powers.map(p => {
    const segs = [1, 2, 3, 4, 5].map(i => {
      let cls = '';
      if (p.to > 0 && i <= p.to) cls = 'is-now';
      if (p.from > 0 && i <= p.from) cls = 'is-base';
      return `<span class="power__seg ${cls}"></span>`;
    }).join('');
    const lvl = p.to > 0 ? `${title(PROGRAM.levels[p.from])} → ${title(PROGRAM.levels[p.to])}` : 'Being set';
    return `<div class="power">
        <div class="power__top"><span class="power__name">${esc(p.name)}</span><span class="power__lvl">${esc(lvl)}</span></div>
        <div class="power__track">${segs}</div>
      </div>`;
  }).join('');

  const phases = hero.phases.map(p => `
    <div class="card-s pad phase">
      <div class="phase__n">Chapter ${p.n} · Month ${p.n}${p.origin === 'added' ? '<span class="draft">Drafted</span>' : ''}</div>
      <div class="phase__name">${esc(title(p.name))}</div>
      <ul>${p.objectives.map(o => `<li>${esc(o)}</li>`).join('')}</ul>
      <div class="phase__check"><b>Checkpoint</b>${esc(p.checkpoint)}</div>
    </div>`).join('');

  view.innerHTML = `
    <div class="wrap">
      <a class="backlink" href="#team">← Back to the team</a>

      <div class="hero-head">
        <div>
          <div class="hero-portrait"><img src="${hero.portrait}" alt="${esc(title(hero.name))}"></div>
          <div class="hero-status">${esc(hero.statusTag)}</div>
        </div>
        <div>
          <div class="hero-team"><span class="hero-team__dot"></span>${esc(title(d.name))} <span class="hero-team__role">— ${esc(d.role)}</span></div>
          <h1 class="hero-name">${esc(title(hero.name))}</h1>
          <p class="hero-job">${esc(hero.title)}</p>
          <div class="hero-meta">
            <span class="tag tag--accent"><b>Call sign</b> ${esc(hero.codename)}</span>
            <span class="tag"><b>Level</b> ${esc(title(hero.rank))}</span>
            <span class="tag"><b>Next level</b> ${esc(title(nextRank(hero.rank)))}</span>
          </div>
          <p class="hero-epithet">“${esc(hero.epithet)}”</p>
          <p class="hero-quote">${esc(hero.tagline)}</p>
          <div class="mt-s">
            <div class="prog__top">
              <span id="p-label"><b>${s.done}</b> of ${s.total} missions cleared</span>
              <span id="p-pct">${s.pct}%</span>
            </div>
            <div class="prog__track"><div class="prog__fill" id="p-fill" style="width:${s.pct}%"></div></div>
          </div>
          <div id="nextup-host">${nextUpHTML(hero)}</div>
        </div>
      </div>

      <div class="mt-l">
        <div class="eyebrow">The road ahead</div>
        <div class="sec-head">
          <div>
            <h2 class="h-l">${journey(hero).length} stops</h2>
            <p class="lede small mt-s">Each stop opens the next. Pick any stop you have reached to see what is inside. ${esc(PROGRAM.cap)}</p>
          </div>
        </div>
        <div id="map-host">${renderMap(hero)}</div>
      </div>

      <div class="mt-l">
        <div class="eyebrow">Next unlock</div>
        <div class="card-s pad quest">
          <div class="quest__name">${esc(title(hero.quest.name))}</div>
          <div class="quest__headline">${esc(hero.quest.headline)}</div>
          <p class="quest__why">${esc(hero.quest.why)}</p>
          <div class="sub-label" style="margin-top:24px">How to get there</div>
          <ul class="moves">${hero.quest.moves.map(m => `<li>${esc(m)}</li>`).join('')}</ul>
        </div>
      </div>

      <div class="grid-2 mt-l">
        <div class="card-s pad">
          <div class="eyebrow">The story so far</div>
          ${hero.origin.map(p => `<p class="lede" style="margin-bottom:12px">${esc(p)}</p>`).join('')}
        </div>
        <div class="card-s pad">
          <div class="eyebrow">Skill levels</div>
          ${powers}
          <div class="power__legend">
            <span><i style="background:var(--panel-3)"></i>May start</span>
            <span><i style="background:${col}"></i>Now</span>
          </div>
          ${hero.powersPending ? `<div class="note"><b>★</b><span>Starting stats for ${esc(title(hero.name))} are being set by the Team Lead, so every gain shows on the same scale as the rest of the team.</span></div>` : ''}
        </div>
      </div>

      <div class="mt-l">
        <div class="eyebrow">The three chapters</div>
        <div class="phases">${phases}</div>
        <div class="goal mt-m">
          <div class="goal__l">★ Where this ends ★</div>
          <div class="goal__t">${esc(hero.boss)}</div>
        </div>
      </div>
    </div>`;

  wireMap(hero);
  renderStation(hero, openStation);
  positionWalker(hero);
  wireNextUp(hero);

  window.scrollTo(0, 0);
}

/* ============================================================
   CATALOGUE / TRACKS / RESOURCES
   ============================================================ */
let catalogueQuery = '';

function renderCatalogue() {
  const q = catalogueQuery.trim().toLowerCase();
  const tokens = q.split(/\s+/).filter(Boolean);

  /* Every query word must hit. A short prefix is enough, so "branding"
     still finds "Brand Identity" and "editing" finds "Video Editing". */
  const match = m => {
    if (!tokens.length) return true;
    const hay = [m.code, m.title, m.stopName, m.objective, m.source, m.deliverable,
                 (m.criteria || []).join(' ')].filter(Boolean).join(' ').toLowerCase();
    return tokens.every(t => hay.includes(t) || (t.length >= 5 && hay.includes(t.slice(0, 5))));
  };

  const row = m => `
    <div class="crow">
      ${thumbHTML(m)}
      <div class="crow__top">
        <span class="mission__code">${esc(m.code)}</span>
        <span class="src src--${m.origin}">${m.origin === 'deck' ? 'From deck' : 'Added'}</span>
        <span class="crow__title">${esc(m.title)}</span>
        <span class="mission__meta">${esc(m.duration)}</span>
      </div>
      <p class="lede small">${esc(m.objective)}</p>
      <div class="mrow"><div class="sub-label">What you hand in</div><p>${esc(m.deliverable)}</p></div>
      <div class="mfoot">
        ${m.url ? `<a class="mlink" href="${esc(m.url)}" target="_blank" rel="noopener">Open material ↗</a>` : ''}
        <span class="mfoot__src">Source: ${esc(m.source)}</span>
      </div>
    </div>`;

  const block = (t, note, color, items) => {
    const hits = items.filter(match);
    if (!hits.length) return '';
    return `
    <div class="mt-l">
      <div class="sec-head">
        <div><h2 class="h-l" style="color:${color}">${esc(t)}</h2><p class="lede small mt-s">${esc(note)}</p></div>
        <span class="tag">${hits.length}${q ? ' of ' + items.length : ''} missions</span>
      </div>${hits.map(row).join('')}
    </div>`;
  };

  const who = m => HEROES.filter(h => (h.bonus || []).includes(m.id)).map(h => title(h.name)).join(', ');

  const html =
    block('Shared core', 'Everyone runs all nine of these. One standard for the whole team.', 'var(--ink)', CORE_MISSIONS) +
    block('Motion Team track', 'Video, animation and AI production.', 'var(--cyan)', TRACK_MISSIONS.kinetic) +
    block('Design Team track', 'Graphic design, branding and AI production.', 'var(--orange)', TRACK_MISSIONS.forge) +
    block('Bonus track', 'Personal, and only opens once someone has cleared their whole road. Still inside the 90 days.', 'var(--gold)',
      BONUS_MISSIONS.map(m => ({ ...m, source: m.source + ' · assigned to ' + (who(m) || 'nobody yet') })));

  $('#catalogue').innerHTML = html ||
    `<div class="empty">Nothing matches “${esc(catalogueQuery)}”. Try a mission code, a tool name, or a person.</div>`;
}

function renderTracks() {
  const colors = { 'gem-type': 'var(--orange)', 'gem-color': 'var(--cyan)', 'gem-ai': 'var(--violet)' };
  $('#tracks').innerHTML = SKILL_TREE.map(g => {
    const done = g.feeds.filter(id => HEROES.some(h => isDone(h.id, id))).length;
    const pct = Math.round(done / g.feeds.length * 100);
    const c = colors[g.id] || 'var(--orange)';
    return `
      <div class="card-s pad track" style="--tc:${c}">
        <div class="track__name">${esc(title(g.name))}</div>
        <p class="track__creed">“${esc(g.creed)}”</p>
        <ul class="track__list">
          ${g.feeds.map(id => {
            const m = MISSION_INDEX[id];
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
      <span class="vrow__go">↗</span>
    </a>`).join('');
}

function updateHUD() {
  const t = teamStats();
  const el = $('#hud');
  if (el) el.innerHTML = `TEAM <b>${t.pct}%</b> · ${t.done}/${t.total}`;
}

/* ============================================================
   ROUTER
   ============================================================ */
const VIEWS = ['team', 'person', 'missions', 'tracks', 'resources'];

function route() {
  const [name, arg] = (location.hash.replace('#', '') || 'team').split('/');
  const view = VIEWS.includes(name) ? name : 'team';

  $$('.view').forEach(v => v.classList.remove('is-active'));
  $('#view-' + view).classList.add('is-active');
  $$('.nav button').forEach(b =>
    b.classList.toggle('is-on', b.dataset.go === view || (view === 'person' && b.dataset.go === 'team')));

  if (view === 'team') renderTeam();
  if (view === 'person') renderPerson(arg);
  if (view === 'missions') renderCatalogue();
  if (view === 'tracks') renderTracks();
  if (view === 'resources') renderResources();

  if (view !== 'person') window.scrollTo(0, 0);
  updateHUD();
}

/* ============================================================
   LOADING SCREEN
   ============================================================ */
const TIPS = [
  'Each stop on the road opens the next one.',
  'Every mission ends with something you hand in.',
  'The shared core is the same for all six — one standard.',
  'Your team track is the craft only your team needs.',
  'Progress saves in this browser as you go.'
];

function bootSequence() {
  const el = $('#loader');
  if (!el) return route();

  const fill = $('#load-fill'), pct = $('#load-pct'), tip = $('#load-tip');
  let v = 0, ti = 0;
  tip.textContent = TIPS[0];

  const tipTimer = setInterval(() => { ti = (ti + 1) % TIPS.length; tip.textContent = TIPS[ti]; }, 700);
  const timer = setInterval(() => {
    v = Math.min(100, v + Math.random() * 16 + 7);
    fill.style.width = v + '%';
    pct.textContent = Math.floor(v) + '%';
    if (v >= 100) {
      clearInterval(timer); clearInterval(tipTimer);
      setTimeout(() => {
        el.classList.add('is-gone');
        setTimeout(() => el.remove(), 550);
      }, 320);
    }
  }, 150);

  route();
}

/* ---------- INIT ---------- */
function init() {
  $('#year').textContent = new Date().getFullYear();
  $$('.nav button').forEach(b => b.addEventListener('click', () => location.hash = '#' + b.dataset.go));
  $$('.chip').forEach(c => c.addEventListener('click', () => {
    $$('.chip').forEach(x => x.classList.remove('is-on'));
    c.classList.add('is-on');
    filter = c.dataset.div;
    renderTeam();
  }));
  const search = $('#msearch'), clear = $('#msearch-clear');
  search.addEventListener('input', () => {
    catalogueQuery = search.value;
    clear.hidden = !catalogueQuery;
    renderCatalogue();
  });
  clear.addEventListener('click', () => {
    search.value = ''; catalogueQuery = ''; clear.hidden = true;
    renderCatalogue(); search.focus();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (document.activeElement === search && search.value) { clear.click(); return; }
      if (location.hash.startsWith('#person/')) location.hash = '#team';
    }
  });

  $('#reset').addEventListener('click', () => {
    if (confirm('Reset mission progress for the whole team?')) {
      progress = {}; save(); openStation = null; route(); toast('Progress reset');
    }
  });
  window.addEventListener('hashchange', route);
  bootSequence();
}

document.addEventListener('DOMContentLoaded', init);
