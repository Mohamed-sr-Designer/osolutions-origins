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

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ALL-CAPS source strings render as shouty headings in this theme — title-case them */
const SMALL_WORDS = new Set(['and', 'or', 'the', 'of', 'in', 'on', 'to', 'a', 'an', 'for']);
const KEEP_CAPS = { ai: 'AI', ux: 'UX', '3d': '3D' };
const title = s => String(s).toLowerCase().split(' ').map((w, i) =>
  KEEP_CAPS[w] || (i > 0 && SMALL_WORDS.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1))
).join(' ');

const DIV_STYLE = {
  kinetic: 'var(--teal)',
  forge: 'var(--orange)'
};
const DIV_SOFT = {
  kinetic: { s: 'var(--teal-soft)', l: 'var(--teal-line)' },
  forge: { s: 'var(--orange-soft)', l: 'var(--orange-line)' }
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
function heroAll(hero) {
  const g = heroMissions(hero);
  return [...g.core, ...g.arc, ...g.track];
}
const isDone = (h, m) => !!(progress[h] && progress[h][m]);

function heroStats(hero) {
  const all = heroAll(hero);
  const done = all.filter(m => isDone(hero.id, m.id));
  return {
    done: done.length,
    total: all.length,
    xp: done.reduce((s, m) => s + m.xp, 0),
    xpTotal: all.reduce((s, m) => s + m.xp, 0),
    pct: all.length ? Math.round(done.length / all.length * 100) : 0
  };
}
function teamStats() {
  let done = 0, total = 0;
  HEROES.forEach(h => { const s = heroStats(h); done += s.done; total += s.total; });
  return { done, total, pct: total ? Math.round(done / total * 100) : 0 };
}

function programClock() {
  const start = new Date(PROGRAM.startDate + 'T00:00:00');
  const day = Math.floor((new Date() - start) / 86400000) + 1;
  const clamped = Math.min(Math.max(day, 1), PROGRAM.days);
  return { day: clamped, left: Math.max(PROGRAM.days - clamped, 0), phase: Math.min(Math.ceil(clamped / 30), 3) };
}

function toast(msg, sub) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span>${esc(msg)}</span>${sub ? `<b>${esc(sub)}</b>` : ''}`;
  $('#toasts').appendChild(el);
  setTimeout(() => { el.classList.add('is-out'); setTimeout(() => el.remove(), 260); }, 2200);
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
      <div class="stat"><div class="stat__v">Phase ${c.phase}</div><div class="stat__l">Current phase</div></div>
      <div class="stat">
        <div class="stat__v">${t.pct}%</div>
        <div class="stat__l">${t.done} of ${t.total} missions done</div>
      </div>
    </div>`;

  const list = filter === 'all' ? HEROES : HEROES.filter(h => h.division === filter);

  $('#roster').innerHTML = list.map(h => {
    const s = heroStats(h);
    const col = DIV_STYLE[h.division];
    return `
      <article class="card" data-id="${h.id}" tabindex="0" role="button"
               style="--dc:${col}" aria-label="Open ${esc(h.name)}">
        <div class="card__img">
          <img src="${h.portrait}" alt="${esc(h.name)}" loading="lazy">
          <span class="card__badge">${esc(h.rank[0] + h.rank.slice(1).toLowerCase())}</span>
        </div>
        <div class="card__body">
          <div class="card__name">${esc(h.name[0] + h.name.slice(1).toLowerCase())}</div>
          <div class="card__code">${esc(h.codename)}</div>
          <div class="card__role">${esc(h.title)}</div>
          <div class="card__prog">
            <div class="card__bar"><i style="width:${s.pct}%"></i></div>
            <div class="card__pct"><span>${s.done}/${s.total} missions</span><span>${s.pct}%</span></div>
          </div>
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
        <button class="tick" role="checkbox" aria-checked="${done}" aria-label="Mark ${esc(m.title)} complete">✓</button>
        <span class="mission__code">${esc(m.code)}</span>
        <span class="src src--${m.origin}">${m.origin === 'deck' ? 'From deck' : 'Added'}</span>
        <span class="mission__title">${esc(m.title)}</span>
        <span class="mission__meta">${esc(m.duration)}</span>
        <button class="mission__more">Details <span>›</span></button>
      </div>
      <div class="mission__body">
        <div class="mrow">
          <div class="sub-label">What it is for</div>
          <p>${esc(m.objective)}</p>
        </div>
        <div class="mrow">
          <div class="sub-label">What you hand in</div>
          <p>${esc(m.deliverable)}</p>
        </div>
        <div class="mrow">
          <div class="sub-label">Done when</div>
          <ul class="mcrit">${m.criteria.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>
        <div class="mfoot">
          ${m.url ? `<a class="mlink" href="${esc(m.url)}" target="_blank" rel="noopener">Open material ↗</a>` : ''}
          <span class="mfoot__src">Source: ${esc(m.source)}</span>
        </div>
      </div>
    </div>`;
}

function wireMissions(hero, root) {
  $$('.mission', root).forEach(el => {
    const mid = el.dataset.mid;
    const m = MISSION_INDEX[mid];
    const open = () => el.classList.toggle('is-open');

    $('.mission__more', el).addEventListener('click', open);
    $('.mission__title', el).addEventListener('click', open);

    const tick = $('.tick', el);
    tick.addEventListener('click', () => {
      progress[hero.id] = progress[hero.id] || {};
      const now = !progress[hero.id][mid];
      if (now) progress[hero.id][mid] = true; else delete progress[hero.id][mid];
      save();
      el.classList.toggle('is-done', now);
      tick.setAttribute('aria-checked', String(now));
      const s = heroStats(hero);
      if (now) {
        toast('Mission complete', `${s.done} of ${s.total}`);
        if (s.pct === 100) setTimeout(() => toast('All missions complete', hero.name), 600);
      }
      refreshProgress(hero);
      updateHUD();
    });
  });
}

function refreshProgress(hero) {
  const s = heroStats(hero);
  const f = $('#p-fill'); if (f) f.style.width = s.pct + '%';
  const l = $('#p-label');
  if (l) l.innerHTML = `<b>${s.done}</b> of ${s.total} missions complete`;
  const p = $('#p-pct'); if (p) p.textContent = s.pct + '%';
}

/* ============================================================
   PERSON PAGE
   ============================================================ */
function renderPerson(id) {
  const hero = heroById(id);
  if (!hero) { location.hash = '#team'; return; }

  const col = DIV_STYLE[hero.division];
  const soft = DIV_SOFT[hero.division];
  const d = DIVISIONS[hero.division];
  const g = heroMissions(hero);
  const s = heroStats(hero);
  const view = $('#view-person');

  view.style.setProperty('--accent', col);
  view.style.setProperty('--accent-soft', soft.s);
  view.style.setProperty('--accent-line', soft.l);

  const cap = title;

  const powers = hero.powers.map(p => {
    const segs = [1, 2, 3, 4, 5].map(i => {
      let cls = '';
      if (p.to > 0 && i <= p.to) cls = 'is-now';
      if (p.from > 0 && i <= p.from) cls = 'is-base';
      return `<span class="power__seg ${cls}"></span>`;
    }).join('');
    const lvl = p.to > 0
      ? `${cap(PROGRAM.levels[p.from])} → ${cap(PROGRAM.levels[p.to])}`
      : 'Baseline not set';
    return `
      <div class="power">
        <div class="power__top"><span class="power__name">${esc(p.name)}</span><span class="power__lvl">${esc(lvl)}</span></div>
        <div class="power__track">${segs}</div>
      </div>`;
  }).join('');

  const phases = hero.phases.map(p => `
    <div class="card-s pad phase">
      <div class="phase__n">Phase ${String(p.n).padStart(2, '0')} · Month ${p.n}${p.origin === 'added' ? '<span class="draft">Drafted</span>' : ''}</div>
      <div class="phase__name">${esc(cap(p.name))}</div>
      <ul>${p.objectives.map(o => `<li>${esc(o)}</li>`).join('')}</ul>
      <div class="phase__check"><b>Checkpoint</b>${esc(p.checkpoint)}</div>
    </div>`).join('');

  const group = (title, note, dot, items) => items.length ? `
    <div class="mgroup">
      <div class="mgroup__head">
        <div class="mgroup__title"><span class="mgroup__dot" style="background:${dot}"></span>${esc(title)}</div>
        <div class="mgroup__note">${esc(note)}</div>
      </div>
      ${items.map(m => missionHTML(hero, m)).join('')}
    </div>` : '';

  view.innerHTML = `
    <div class="wrap">
      <a class="backlink" href="#team">← Back to team</a>

      <div class="hero-head">
        <div>
          <div class="hero-portrait"><img src="${hero.portrait}" alt="${esc(hero.name)}"></div>
          <div class="hero-status">${esc(hero.statusTag)}</div>
        </div>
        <div>
          <div class="hero-code">${esc(d.short)} DIVISION · ${esc(hero.codename)}</div>
          <h1 class="hero-name">${esc(cap(hero.name))}</h1>
          <p class="hero-epithet">${esc(hero.title)} — “${esc(hero.epithet)}”</p>
          <div class="hero-meta">
            <span class="tag tag--accent">Rank · ${esc(cap(hero.rank))}</span>
            <span class="tag">${esc(d.role)}</span>
          </div>
          <p class="hero-quote">${esc(hero.tagline)}</p>
          <div class="prog mt-s">
            <div class="prog__top">
              <span id="p-label"><b>${s.done}</b> of ${s.total} missions complete</span>
              <span id="p-pct">${s.pct}%</span>
            </div>
            <div class="prog__track"><div class="prog__fill" id="p-fill" style="width:${s.pct}%"></div></div>
          </div>
        </div>
      </div>

      <div class="grid-2 mt-l">
        <div class="card-s pad">
          <div class="eyebrow">Where they are now</div>
          ${hero.origin.map(p => `<p class="lede" style="margin-bottom:12px">${esc(p)}</p>`).join('')}
        </div>
        <div class="card-s pad">
          <div class="eyebrow">Skill levels</div>
          ${powers}
          <div class="power__legend">
            <span><i style="background:#B9C8DA"></i>May baseline</span>
            <span><i style="background:${col}"></i>Now</span>
          </div>
          ${hero.powersPending ? `<div class="note"><b>!</b><span>No skill assessment exists for ${esc(cap(hero.name))} in the source deck. The Team Lead sets these before Phase 01 — left blank rather than invented.</span></div>` : ''}
        </div>
      </div>

      <div class="mt-l">
        <div class="eyebrow">The blocker</div>
        <div class="card-s pad nemesis">
          <div class="nemesis__name">${esc(cap(hero.nemesis.name))}</div>
          <div class="nemesis__threat">${esc(hero.nemesis.threat)}</div>
          <p class="nemesis__brief">${esc(hero.nemesis.brief)}</p>
          <div class="sub-label" style="margin-top:22px">How we counter it</div>
          <ul class="counter">${hero.nemesis.counter.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
        </div>
      </div>

      <div class="mt-l">
        <div class="eyebrow">The plan</div>
        <div class="phases">${phases}</div>
        <div class="goal mt-m">
          <div class="goal__l">Goal for the ninety days</div>
          <div class="goal__t">${esc(hero.boss)}</div>
        </div>
      </div>

      <div class="mt-l">
        <div class="eyebrow">Missions</div>
        <h2 class="h-l" style="margin-bottom:26px">${s.total} missions, three groups</h2>
        ${group('Personal track', `Chosen for ${cap(hero.name)} specifically — the missions that answer the blocker above.`, col, g.arc)}
        ${group('Shared core', 'Identical for all six people. Same missions, same standard.', 'var(--ink-block)', g.core)}
        ${group(title(d.short) + ' division', `Shared across everyone in the ${d.role.toLowerCase()} division.`, col, g.track)}
      </div>
    </div>`;

  wireMissions(hero, view);
  window.scrollTo(0, 0);
}

/* ============================================================
   CATALOGUE
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
      <div class="mrow">
        <div class="sub-label">What you hand in</div>
        <p>${esc(m.deliverable)}</p>
      </div>
      <div class="mfoot">
        ${m.url ? `<a class="mlink" href="${esc(m.url)}" target="_blank" rel="noopener">Open material ↗</a>` : ''}
        <span class="mfoot__src">Source: ${esc(m.source)}</span>
      </div>
    </div>`;

  const block = (title, note, color, items) => `
    <div class="mt-l">
      <div class="sec-head">
        <div>
          <h2 class="h-l" style="color:${color}">${esc(title)}</h2>
          <p class="lede small mt-s">${esc(note)}</p>
        </div>
        <span class="tag">${items.length} missions</span>
      </div>
      ${items.map(row).join('')}
    </div>`;

  $('#catalogue').innerHTML =
    block('Shared core', 'Every person on the team runs all nine of these.', 'var(--ink)', CORE_MISSIONS) +
    block('Kinetic division', 'Motion and video only.', 'var(--teal)', TRACK_MISSIONS.kinetic) +
    block('Forge division', 'Static and graphic design only.', 'var(--orange)', TRACK_MISSIONS.forge);
}

/* ============================================================
   TRACKS
   ============================================================ */
function renderTracks() {
  const colors = { 'gem-type': 'var(--orange)', 'gem-color': 'var(--teal)', 'gem-ai': 'var(--violet)' };
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
        <div class="prog mt-s">
          <div class="prog__top"><span>${done} of ${g.feeds.length} started</span><span>${pct}%</span></div>
          <div class="prog__track"><div class="prog__fill" style="width:${pct}%;background:${c}"></div></div>
        </div>
      </div>`;
  }).join('');
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
      <span class="vrow__go">↗</span>
    </a>`).join('');
}

/* ---------- HUD ---------- */
function updateHUD() {
  const t = teamStats();
  const el = $('#hud');
  if (el) el.innerHTML = `Team <b>${t.pct}%</b> · ${t.done}/${t.total}`;
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
  $$('.nav button').forEach(b => b.classList.toggle('is-on', b.dataset.go === view || (view === 'person' && b.dataset.go === 'team')));

  if (view === 'team') renderTeam();
  if (view === 'person') renderPerson(arg);
  if (view === 'missions') renderCatalogue();
  if (view === 'tracks') renderTracks();
  if (view === 'resources') renderResources();

  if (view !== 'person') window.scrollTo(0, 0);
  updateHUD();
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
      progress = {}; save(); route(); toast('Progress reset');
    }
  });

  window.addEventListener('hashchange', route);
  route();
}

document.addEventListener('DOMContentLoaded', init);
