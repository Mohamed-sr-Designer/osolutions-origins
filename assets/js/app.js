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
  return m;
})();

const heroById = id => HEROES.find(h => h.id === id);

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
function stationMissions(hero, st) {
  const g = heroMissions(hero);
  return [
    ...st.core.map(id => MISSION_INDEX[id]),
    ...st.arc.map(i => g.arc[i]),
    ...st.track.map(i => g.track[i])
  ].filter(Boolean);
}

/* Every station for this hero, with its lock state resolved in order. */
function journey(hero) {
  let unlocked = true;
  return JOURNEY.map(st => {
    const ms = stationMissions(hero, st);
    const done = ms.filter(m => isDone(hero.id, m.id)).length;
    const complete = ms.length > 0 && done === ms.length;
    const row = {
      st, missions: ms, done, total: ms.length, complete,
      locked: !unlocked,
      pct: ms.length ? Math.round(done / ms.length * 100) : 0
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
    return `
      <article class="card" data-id="${h.id}" tabindex="0" role="button"
               style="--dc:${col}" aria-label="Open ${esc(title(h.name))}">
        <div class="card__img">
          <img src="${h.portrait}" alt="${esc(title(h.name))}" loading="lazy">
          <span class="card__badge">${esc(title(h.rank))}</span>
        </div>
        <div class="card__body">
          <div class="card__name">${esc(title(h.name))}</div>
          <div class="card__code">${esc(h.codename)}</div>
          <div class="card__role">${esc(h.title)}</div>
          <div class="card__bar"><i style="width:${s.pct}%"></i></div>
          <div class="card__pct"><span>${s.done}/${s.total}</span><span>${s.pct}%</span></div>
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
const NODES = [
  [150, 120], [500, 120], [850, 120],
  [850, 320], [500, 320], [150, 320],
  [150, 520], [500, 520], [850, 520]
];
const ROAD_D = 'M150,120 H850 V320 H150 V520 H850';
/* cumulative distance along ROAD_D at each node */
const NODE_DIST = [0, 350, 700, 900, 1250, 1600, 1800, 2150, 2500];
const ROAD_LEN = 2500;

let openStation = null;

function renderMap(hero) {
  const rows = journey(hero);
  const col = DIV_COLOR[hero.division];

  const nodes = rows.map((r, i) => {
    const [x, y] = NODES[i];
    const state = r.complete ? 'is-done' : (r.locked ? 'is-locked' : 'is-current');
    const glyph = r.locked ? '⌾' : (r.complete ? '✓' : r.st.glyph);
    const isOpen = openStation === i ? ' is-open' : '';
    return `
      <g class="node ${state}${isOpen}" data-i="${i}" tabindex="0" role="button"
         aria-label="Station ${r.st.n}: ${esc(title(r.st.name))}${r.locked ? ' (locked)' : ''}">
        ${state === 'is-current' ? `<circle class="pulse" cx="${x}" cy="${y}" r="34" fill="none" stroke="${col}" stroke-width="2"/>` : ''}
        <circle class="node__ring" cx="${x}" cy="${y}" r="34"/>
        <text class="node__glyph" x="${x}" y="${y}">${glyph}</text>
        <text class="node__label" x="${x}" y="${y + 58}">${esc(title(r.st.name))}</text>
        <text class="node__sub" x="${x}" y="${y + 78}">${r.done}/${r.total}${r.locked ? ' · locked' : ''}</text>
      </g>`;
  }).join('');

  return `
    <div class="map-shell">
      <svg class="map" viewBox="0 0 1000 640" role="img"
           aria-label="Journey map: nine stations, ${rows.filter(r => r.complete).length} cleared">
        <path class="road-base" d="${ROAD_D}"/>
        <path class="road-dash" d="${ROAD_D}"/>
        <path class="road-done" id="road-done" d="${ROAD_D}" style="stroke:${col}"
              stroke-dasharray="${ROAD_LEN}" stroke-dashoffset="${ROAD_LEN}"/>
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
  let k = rows.findIndex(r => !r.complete);
  if (k === -1) return ROAD_LEN;
  const base = NODE_DIST[k];
  const span = (NODE_DIST[k + 1] ?? ROAD_LEN) - base;
  return base + span * (rows[k].pct / 100);
}

/* Re-queries inside the callback: the map is re-rendered on every tick,
   so an element captured beforehand can already be detached. */
function positionWalker(hero) {
  const dist = walkedDistance(hero);
  setTimeout(() => {
    const road = document.querySelector('#road-done');
    const walker = document.querySelector('#walker');
    if (!road || !walker) return;
    road.style.strokeDashoffset = String(ROAD_LEN - dist);
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
        <span>Clear <b>${esc(title(prev.st.name))}</b> first — ${prev.total - prev.done} mission${prev.total - prev.done === 1 ? '' : 's'} to go. Each station opens the next one.</span>
      </div>`;
  } else {
    body = r.missions.map(m => missionHTML(hero, m)).join('');
  }

  panel.innerHTML = `
    <div class="card-s pad">
      <div class="station__head">
        <div class="station__glyph">${r.locked ? '⌾' : r.st.glyph}</div>
        <div style="flex:1;min-width:200px">
          <div class="station__name">${esc(title(r.st.name))}</div>
          <div class="station__tag">${esc(r.st.tagline)}</div>
          <div class="mission__meta" style="margin-top:8px">Station ${r.st.n} of 9 · Chapter ${r.st.chapter} — ${esc(title(ch.name))}</div>
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
        toast(`Clear ${title(rows[i - 1].st.name)} first`);
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

  const host = $('#map-host');
  if (host) {
    host.innerHTML = renderMap(hero);
    wireMap(hero);
    renderStation(hero, openStation ?? currentStation(hero));
    positionWalker(hero);
  }
  updateHUD();
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
          <div class="hero-code">${esc(d.short)} DIVISION · ${esc(hero.codename)}</div>
          <h1 class="hero-name">${esc(title(hero.name))}</h1>
          <p class="hero-epithet">${esc(hero.title)} — “${esc(hero.epithet)}”</p>
          <div class="hero-meta">
            <span class="tag tag--accent">Rank · ${esc(title(hero.rank))}</span>
            <span class="tag">${esc(d.role)}</span>
          </div>
          <p class="hero-quote">${esc(hero.tagline)}</p>
          <div class="mt-s">
            <div class="prog__top">
              <span id="p-label"><b>${s.done}</b> of ${s.total} missions cleared</span>
              <span id="p-pct">${s.pct}%</span>
            </div>
            <div class="prog__track"><div class="prog__fill" id="p-fill" style="width:${s.pct}%"></div></div>
          </div>
        </div>
      </div>

      <div class="mt-l">
        <div class="eyebrow">The road ahead</div>
        <div class="sec-head">
          <div>
            <h2 class="h-l">Nine stations</h2>
            <p class="lede small mt-s">Each station opens the next. Pick any station you have reached to see what is inside.</p>
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

  window.scrollTo(0, 0);
}

/* ============================================================
   CATALOGUE / TRACKS / RESOURCES
   ============================================================ */
function renderCatalogue() {
  const row = m => `
    <div class="crow">
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

  const block = (t, note, color, items) => `
    <div class="mt-l">
      <div class="sec-head">
        <div><h2 class="h-l" style="color:${color}">${esc(t)}</h2><p class="lede small mt-s">${esc(note)}</p></div>
        <span class="tag">${items.length} missions</span>
      </div>${items.map(row).join('')}
    </div>`;

  $('#catalogue').innerHTML =
    block('Shared core', 'Everyone on the team runs all nine of these.', 'var(--ink)', CORE_MISSIONS) +
    block('Kinetic division', 'Motion and video.', 'var(--cyan)', TRACK_MISSIONS.kinetic) +
    block('Forge division', 'Static and graphic design.', 'var(--orange)', TRACK_MISSIONS.forge);
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
  'Nine stations. Each one opens the next.',
  'Every mission ends with something you hand in.',
  'The shared core is the same for all six — one standard.',
  'Your division track is the craft only you need.',
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
  $('#reset').addEventListener('click', () => {
    if (confirm('Reset mission progress for the whole team?')) {
      progress = {}; save(); openStation = null; route(); toast('Progress reset');
    }
  });
  window.addEventListener('hashchange', route);
  bootSequence();
}

document.addEventListener('DOMContentLoaded', init);
