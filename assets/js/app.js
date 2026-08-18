/* ============================================================
   OSOLUTIONS: ORIGINS — App
   ============================================================ */

const STORE_KEY = 'osol-origins-progress-v1';

/* ---------- state ---------- */
let progress = load();

function load() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
  catch (e) { return {}; }
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch (e) {}
}

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

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

function isDone(heroId, missionId) {
  return !!(progress[heroId] && progress[heroId][missionId]);
}

function heroStats(hero) {
  const all = heroAll(hero);
  const done = all.filter(m => isDone(hero.id, m.id));
  const xp = done.reduce((s, m) => s + m.xp, 0);
  const xpTotal = all.reduce((s, m) => s + m.xp, 0);
  return {
    done: done.length,
    total: all.length,
    xp, xpTotal,
    pct: all.length ? Math.round(done.length / all.length * 100) : 0
  };
}

function teamStats() {
  let xp = 0, xpTotal = 0, done = 0, total = 0;
  HEROES.forEach(h => {
    const s = heroStats(h);
    xp += s.xp; xpTotal += s.xpTotal; done += s.done; total += s.total;
  });
  return { xp, xpTotal, done, total, pct: total ? Math.round(done / total * 100) : 0 };
}

function nextRank(rank) {
  const i = PROGRAM.ranks.indexOf(rank);
  return i > -1 && i < PROGRAM.ranks.length - 1 ? PROGRAM.ranks[i + 1] : 'MAX';
}

/* ---------- countdown ---------- */
function programClock() {
  const start = new Date(PROGRAM.startDate + 'T00:00:00');
  const now = new Date();
  const day = Math.floor((now - start) / 86400000) + 1;
  const clamped = Math.min(Math.max(day, 1), PROGRAM.days);
  const left = Math.max(PROGRAM.days - clamped, 0);
  const phase = Math.min(Math.ceil(clamped / 30), 3);
  return { day: clamped, left, phase, started: now >= start };
}

/* ---------- toast ---------- */
function toast(msg, sub) {
  const host = $('#toasts');
  const el = document.createElement('div');
  el.className = 'toast notch-sm';
  el.innerHTML = `<div class="toast__in"><span>★</span><span>${esc(msg)}${sub ? ` <b>${esc(sub)}</b>` : ''}</span></div>`;
  host.appendChild(el);
  setTimeout(() => { el.classList.add('is-out'); setTimeout(() => el.remove(), 320); }, 2400);
}

/* ============================================================
   RENDERERS
   ============================================================ */

/* ---------- ROSTER ---------- */
let rosterFilter = 'all';

function renderRoster() {
  const clock = programClock();
  const t = teamStats();

  $('#roster-clock').innerHTML = `
    <div class="panel"><div class="panel__in">
      <div class="countdown">
        <div>
          <div class="cd__val">${clock.started ? String(clock.day).padStart(2, '0') : '00'}</div>
          <div class="cd__lbl">DAY OF ${PROGRAM.days}</div>
        </div>
        <div>
          <div class="cd__val">${String(clock.left).padStart(2, '0')}</div>
          <div class="cd__lbl">DAYS REMAINING</div>
        </div>
        <div>
          <div class="cd__val">PH ${clock.phase}</div>
          <div class="cd__lbl">CURRENT PHASE</div>
        </div>
      </div>
      <div class="xpbar">
        <div class="xpbar__top"><span>TEAM PROGRESS</span><span><b>${t.done}</b> / ${t.total} MISSIONS · <b>${t.xp}</b> XP</span></div>
        <div class="xpbar__track"><div class="xpbar__fill" style="width:${t.pct}%"></div></div>
      </div>
    </div></div>`;

  const list = rosterFilter === 'all' ? HEROES : HEROES.filter(h => h.division === rosterFilter);

  $('#roster-grid').innerHTML = list.map(h => {
    const d = DIVISIONS[h.division];
    const s = heroStats(h);
    return `
      <article class="card" data-div="${h.division}" data-id="${h.id}" tabindex="0"
               style="--accent:${d.color}"
               role="button" aria-label="Open ${esc(h.name)} — ${esc(h.codename)}">
        <div class="card__in">
          <div class="card__img">
            <img src="${h.portrait}" alt="${esc(h.codename)} — pixel art hero portrait" loading="lazy">
            <span class="card__rank">${esc(h.rank)}</span>
            <span class="card__div" style="color:${d.color}">${d.glyph}</span>
          </div>
          <div class="card__body">
            <div class="card__code" style="color:${d.color}">${esc(h.codename)}</div>
            <div class="card__name">${esc(h.name)}</div>
            <div class="card__role">${esc(h.title)}</div>
            <div class="card__bar"><i style="width:${s.pct}%;background:${d.color}"></i></div>
            <div class="card__pct"><span>${s.done}/${s.total}</span><span>${s.pct}%</span></div>
          </div>
        </div>
      </article>`;
  }).join('');

  $$('#roster-grid .card').forEach(c => {
    const go = () => location.hash = '#hero/' + c.dataset.id;
    c.addEventListener('click', go);
    c.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
  });
}

/* ---------- MISSION CARD ---------- */
function missionHTML(hero, m) {
  const done = isDone(hero.id, m.id);
  return `
    <div class="mission notch-sm ${done ? 'is-done' : ''}" data-mid="${m.id}">
      <div class="mission__in">
        <div class="mission__head">
          <span class="tickbox notch-sm" role="checkbox" aria-checked="${done}" tabindex="0">✔</span>
          <span class="mission__code">${esc(m.code)}</span>
          <span class="badge notch-sm badge--${m.origin}">${m.origin === 'deck' ? 'FROM DECK' : 'ADDED'}</span>
          <span class="mission__title">${esc(m.title)}</span>
          <span class="mission__xp">+${m.xp} XP</span>
          <span class="mission__caret">▶</span>
        </div>
        <div class="mission__body">
          <div class="mission__row">
            <div class="mission__label">OBJECTIVE</div>
            <p>${esc(m.objective)}</p>
          </div>
          <div class="mission__row">
            <div class="mission__label">PROOF OF POWER</div>
            <p>${esc(m.deliverable)}</p>
          </div>
          <div class="mission__row">
            <div class="mission__label">CLEARED WHEN</div>
            <ul class="mission__crit">${m.criteria.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
          </div>
          <div class="mission__src">Source: ${esc(m.source)} · Duration: ${esc(m.duration)}</div>
          ${m.url ? `<a class="mission__link" href="${esc(m.url)}" target="_blank" rel="noopener">OPEN MATERIAL ↗</a>` : ''}
        </div>
      </div>
    </div>`;
}

function wireMissions(hero, root) {
  $$('.mission', root).forEach(el => {
    const mid = el.dataset.mid;
    const m = MISSION_INDEX[mid];

    $('.mission__head', el).addEventListener('click', e => {
      if (e.target.closest('.tickbox')) return;
      el.classList.toggle('is-open');
    });

    const tick = $('.tickbox', el);
    const toggle = () => {
      progress[hero.id] = progress[hero.id] || {};
      const now = !progress[hero.id][mid];
      if (now) progress[hero.id][mid] = true; else delete progress[hero.id][mid];
      save();
      el.classList.toggle('is-done', now);
      tick.setAttribute('aria-checked', String(now));
      const s = heroStats(hero);
      if (now) {
        toast(`MISSION CLEARED · +${m.xp} XP`, `${s.done}/${s.total}`);
        if (s.pct === 100) setTimeout(() => toast('ALL MISSIONS CLEARED', hero.codename), 700);
      }
      refreshHeroXP(hero);
      updateHUD();
    };
    tick.addEventListener('click', toggle);
    tick.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
}

function refreshHeroXP(hero) {
  const s = heroStats(hero);
  const bar = $('#hero-xp-fill'); if (bar) bar.style.width = s.pct + '%';
  const lbl = $('#hero-xp-label');
  if (lbl) lbl.innerHTML = `<b>${s.done}</b> / ${s.total} MISSIONS · <b>${s.xp}</b> / ${s.xpTotal} XP`;
  const pct = $('#hero-xp-pct'); if (pct) pct.textContent = s.pct + '%';
}

/* ---------- HERO PAGE ---------- */
function renderHero(id) {
  const hero = heroById(id);
  if (!hero) { location.hash = '#roster'; return; }
  const d = DIVISIONS[hero.division];
  const g = heroMissions(hero);
  const s = heroStats(hero);
  const view = $('#view-hero');
  view.style.setProperty('--accent', d.color);

  const powersHTML = hero.powers.map(p => {
    const segs = [1, 2, 3, 4, 5].map(i => {
      let cls = '';
      if (p.to > 0 && i <= p.to) cls = 'is-now';
      if (p.from > 0 && i <= p.from) cls = 'is-base';
      return `<span class="power__seg ${cls}"></span>`;
    }).join('');
    const lvl = p.to > 0
      ? `${PROGRAM.levels[p.from]} → ${PROGRAM.levels[p.to]}`
      : 'AWAITING BASELINE';
    return `
      <div class="power">
        <div class="power__top">
          <span class="power__name">${esc(p.name)}</span>
          <span class="power__lvl">${esc(lvl)}</span>
        </div>
        <div class="power__track">${segs}</div>
      </div>`;
  }).join('');

  const phasesHTML = hero.phases.map(p => `
    <div class="panel phase"><div class="panel__in">
      <div class="phase__num">PHASE ${String(p.n).padStart(2, '0')} ${p.origin === 'added' ? '· DRAFTED' : ''}</div>
      <div class="phase__name">${esc(p.name)}</div>
      <ul>${p.objectives.map(o => `<li>${esc(o)}</li>`).join('')}</ul>
      <div class="phase__check"><b>CHECKPOINT</b>${esc(p.checkpoint)}</div>
    </div></div>`).join('');

  view.innerHTML = `
    <div class="wrap">
      <a class="backlink" href="#roster">◀ BACK TO ROSTER</a>

      <div class="hero-top">
        <div>
          <div class="hero-portrait">
            <img src="${hero.portrait}" alt="${esc(hero.codename)} — pixel art hero portrait">
          </div>
          <div class="hero-tag notch-sm">${esc(hero.statusTag)}</div>
        </div>
        <div>
          <div class="eyebrow">${d.glyph} ${esc(d.name)} · ${esc(d.role)}</div>
          <h1 class="hero-id__codename">${esc(hero.codename)}</h1>
          <div class="hero-id__name">${esc(hero.name)}</div>
          <div class="hero-id__epithet">“${esc(hero.epithet)}”</div>
          <div class="hero-id__meta">
            <span class="pill notch-sm pill--accent">RANK · ${esc(hero.rank)}</span>
            <span class="pill notch-sm">NEXT · ${esc(nextRank(hero.rank))}</span>
            <span class="pill notch-sm">${esc(hero.title)}</span>
          </div>
          <p class="hero-quote">${esc(hero.tagline)}</p>

          <div class="xpbar">
            <div class="xpbar__top">
              <span id="hero-xp-label"><b>${s.done}</b> / ${s.total} MISSIONS · <b>${s.xp}</b> / ${s.xpTotal} XP</span>
              <span id="hero-xp-pct">${s.pct}%</span>
            </div>
            <div class="xpbar__track"><div class="xpbar__fill" id="hero-xp-fill" style="width:${s.pct}%"></div></div>
          </div>
        </div>
      </div>

      <div class="grid-2 mt-xl">
        <div class="panel"><div class="panel__in">
          <div class="eyebrow">ORIGIN</div>
          ${hero.origin.map(p => `<p class="lede" style="margin:0 0 12px">${esc(p)}</p>`).join('')}
        </div></div>

        <div class="panel"><div class="panel__in">
          <div class="eyebrow">POWER GRID</div>
          ${powersHTML}
          <div class="power__legend">
            <span><i style="background:#1E3A5C"></i>MAY BASELINE</span>
            <span><i style="background:${d.color}"></i>CURRENT</span>
          </div>
          ${hero.powersPending ? `<div class="pending-note notch-sm"><b>!</b><span>No skill assessment exists for ${esc(hero.name)} in the source deck. The Team Lead sets these levels before Phase 01 — they are deliberately left blank rather than invented.</span></div>` : ''}
        </div></div>
      </div>

      <div class="mt-xl">
        <div class="eyebrow">THE NEMESIS</div>
        <div class="panel nemesis"><div class="panel__in">
          <div class="nemesis__name">${esc(hero.nemesis.name)}</div>
          <div class="nemesis__threat">${esc(hero.nemesis.threat)}</div>
          <p class="nemesis__brief">${esc(hero.nemesis.brief)}</p>
          <div class="mission__label" style="margin-top:22px">COUNTER-MOVES</div>
          <ul class="counter-list">${hero.nemesis.counter.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
        </div></div>
      </div>

      <div class="mt-xl">
        <div class="eyebrow">THE THREE PHASES</div>
        <div class="phases">${phasesHTML}</div>
      </div>

      <div class="mt-l">
        <div class="panel boss"><div class="panel__in">
          <div class="boss__label">◆ FINAL BOSS ◆</div>
          <div class="boss__text">${esc(hero.boss)}</div>
        </div></div>
      </div>

      <div class="mt-xl" id="hero-missions">
        <div class="eyebrow">MISSION LOG</div>

        <div class="mission-group">
          <div class="mission-group__head">
            <span class="mission-group__title" style="color:${d.color}">◆ PERSONAL ARC</span>
            <span class="mission-group__note">Assigned to ${esc(hero.codename)} specifically — the missions that answer this nemesis.</span>
          </div>
          ${g.arc.map(m => missionHTML(hero, m)).join('')}
        </div>

        <div class="mission-group">
          <div class="mission-group__head">
            <span class="mission-group__title">▣ ACADEMY CORE</span>
            <span class="mission-group__note">Shared by all six. Same missions, same standard, everyone.</span>
          </div>
          ${g.core.map(m => missionHTML(hero, m)).join('')}
        </div>

        <div class="mission-group">
          <div class="mission-group__head">
            <span class="mission-group__title" style="color:${d.color}">${d.glyph} ${esc(d.short)} TRACK</span>
            <span class="mission-group__note">Shared across the ${esc(d.short.toLowerCase())} division.</span>
          </div>
          ${g.track.map(m => missionHTML(hero, m)).join('')}
        </div>
      </div>
    </div>`;

  wireMissions(hero, view);
  window.scrollTo(0, 0);
}

/* ---------- ACADEMY CORE PAGE ---------- */
function renderCore() {
  const rows = m => `
    <div class="panel" style="margin-bottom:12px"><div class="panel__in">
      <div class="mission-group__head">
        <span class="mission__code">${esc(m.code)}</span>
        <span class="badge notch-sm badge--${m.origin}">${m.origin === 'deck' ? 'FROM DECK' : 'ADDED'}</span>
        <span class="mission-group__title" style="flex:1">${esc(m.title)}</span>
        <span class="mission__xp">+${m.xp} XP · ${esc(m.duration)}</span>
      </div>
      <p class="lede" style="margin:6px 0 14px">${esc(m.objective)}</p>
      <div class="mission__label">PROOF OF POWER</div>
      <p style="margin:0 0 14px;color:var(--muted);font-size:.93rem">${esc(m.deliverable)}</p>
      <div class="mission__src">Source: ${esc(m.source)}</div>
      ${m.url ? `<a class="mission__link" href="${esc(m.url)}" target="_blank" rel="noopener">OPEN MATERIAL ↗</a>` : ''}
    </div></div>`;

  $('#core-body').innerHTML = `
    <div class="mission-group">
      <div class="eyebrow">▣ ACADEMY CORE · SHARED BY ALL SIX</div>
      ${CORE_MISSIONS.map(rows).join('')}
    </div>
    <div class="mission-group mt-xl">
      <div class="eyebrow" style="--accent:${DIVISIONS.kinetic.color};color:${DIVISIONS.kinetic.color}">▶ KINETIC TRACK · MOTION ONLY</div>
      ${TRACK_MISSIONS.kinetic.map(rows).join('')}
    </div>
    <div class="mission-group mt-xl">
      <div class="eyebrow">◆ FORGE TRACK · STATIC ONLY</div>
      ${TRACK_MISSIONS.forge.map(rows).join('')}
    </div>`;
}

/* ---------- SKILL TREE ---------- */
function renderTree() {
  $('#tree-body').innerHTML = SKILL_TREE.map(g => {
    let done = 0;
    g.feeds.forEach(id => {
      if (HEROES.some(h => isDone(h.id, id))) done++;
    });
    const pct = Math.round(done / g.feeds.length * 100);
    return `
      <div class="panel gem" style="--gc:${g.color}"><div class="panel__in">
        <div class="gem__shape"></div>
        <div class="gem__name" style="color:${g.color}">${esc(g.name)}</div>
        <div class="gem__creed">“${esc(g.creed)}”</div>
        <ul class="gem__feeds">
          ${g.feeds.map(id => {
            const m = MISSION_INDEX[id];
            return m ? `<li>${esc(m.code)} — ${esc(m.title)}</li>` : '';
          }).join('')}
        </ul>
        <div class="gem__bar"><i style="width:${pct}%"></i></div>
      </div></div>`;
  }).join('');
}

/* ---------- VAULT ---------- */
function renderVault() {
  $('#vault-body').innerHTML = VAULT.map(v => `
    <a class="vault-item notch-sm" href="${esc(v.url)}" target="_blank" rel="noopener">
      <span class="vault-item__kind">${esc(v.kind)}</span>
      <span style="flex:1">
        <span class="vault-item__name">${esc(v.name)}</span><br>
        <span class="vault-item__note">${esc(v.note)}</span>
      </span>
      <span class="mission__link" style="margin:0;border:0">↗</span>
    </a>`).join('');
}

/* ---------- HUD ---------- */
function updateHUD() {
  const t = teamStats();
  const el = $('#hud');
  if (el) el.innerHTML = `TEAM <b>${t.pct}%</b> · <b>${t.xp}</b> XP`;
}

/* ============================================================
   ROUTER
   ============================================================ */
const VIEWS = ['boot', 'roster', 'hero', 'core', 'tree', 'vault'];

function route() {
  const hash = location.hash.replace('#', '') || 'boot';
  const [name, arg] = hash.split('/');
  const view = VIEWS.includes(name) ? name : 'boot';

  $$('.view').forEach(v => v.classList.remove('is-active'));
  const target = $('#view-' + view);
  if (target) target.classList.add('is-active');

  $('#topbar').classList.toggle('is-on', view !== 'boot');
  $$('.nav button').forEach(b => b.classList.toggle('is-on', b.dataset.go === view));

  document.documentElement.style.setProperty('--accent', '#F76302');

  if (view === 'roster') renderRoster();
  if (view === 'hero') renderHero(arg);
  if (view === 'core') renderCore();
  if (view === 'tree') renderTree();
  if (view === 'vault') renderVault();

  if (view !== 'hero') window.scrollTo(0, 0);
  updateHUD();
}

/* ============================================================
   INIT
   ============================================================ */
function init() {
  $('#year').textContent = new Date().getFullYear();
  $('#boot-window').textContent =
    `${PROGRAM.startDate} → ${new Date(new Date(PROGRAM.startDate).getTime() + PROGRAM.days * 86400000).toISOString().slice(0, 10)}`;

  $$('.nav button').forEach(b => {
    b.addEventListener('click', () => location.hash = '#' + b.dataset.go);
  });

  $$('.chip').forEach(c => {
    c.addEventListener('click', () => {
      $$('.chip').forEach(x => x.classList.remove('is-on'));
      c.classList.add('is-on');
      rosterFilter = c.dataset.div;
      renderRoster();
    });
  });

  const start = () => { if ((location.hash || '#boot') === '#boot' || !location.hash) location.hash = '#roster'; };
  $('#boot-screen').addEventListener('click', start);
  document.addEventListener('keydown', e => {
    if ($('#view-boot').classList.contains('is-active') && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault(); start();
    }
  });

  $('#reset').addEventListener('click', () => {
    if (confirm('Reset all mission progress for the whole team?')) {
      progress = {}; save(); route(); toast('PROGRESS RESET');
    }
  });

  window.addEventListener('hashchange', route);
  route();
}

document.addEventListener('DOMContentLoaded', init);
