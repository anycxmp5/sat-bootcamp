/* Движок пробного теста: 4 модуля, адаптивность, таймер, перерыв, инструменты */
(function () {
  'use strict';
  const S = window.SAT, U = S.util, ST = S.store;
  const E = (S.exam = { active: false });
  const app = () => document.getElementById('app');
  const modalRoot = () => document.getElementById('modal-root');
  let s = null, timerId = null;

  const ORDER = [['rw', 1], ['rw', 2], ['math', 1], ['math', 2]];
  const SEC_LABEL = { rw: 'Section 1', math: 'Section 2' };
  const SEC_TITLE = { rw: 'Reading and Writing', math: 'Math' };
  const HARD_THRESHOLD = 0.6;

  /* ---------- Сборка модулей ---------- */
  function apportion(weights, size) { // метод наибольших остатков
    const raw = weights.map((w) => w * size), base = raw.map(Math.floor);
    let left = size - base.reduce((a, b) => a + b, 0);
    raw.map((r, i) => [r - base[i], i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left-- > 0) base[i]++; });
    return base;
  }
  function rank(pool, level) {
    const pref = (q) => (level === 'hard' ? 3 - q.diff : level === 'easy' ? q.diff - 1 : 0);
    return pool.map((q) => ({ q, k: pref(q) + s.rng() * 1.6 })).sort((a, b) => a.k - b.k).map((x) => x.q);
  }
  // Доля заданий из генераторов: тесты по Math почти не повторяются от попытки к попытке
  const GEN_SHARE = { alg: 0.8, adv: 0.8, psda: 0.8, geo: 0.8, sec: 0.7, eoi: 0.4, cs: 0.55, ii: 0.45 };
  function genFor(domainId, level) {
    const topics = S.topicsOf(domainId).filter((t) => (S.gens[t.id] || []).length);
    if (!topics.length) return null;
    let best = null, bestK = Infinity;
    for (let i = 0; i < 6; i++) { // из нескольких кандидатов берём лучший по сложности для уровня модуля
      const t = topics[Math.floor(s.rng() * topics.length)], fns = S.gens[t.id];
      const ti = Math.floor(s.rng() * fns.length), seed = 1 + Math.floor(s.rng() * 999999);
      if (s.used.has(`g:${t.id}:${ti}:${seed}`)) continue;
      const q = S.genQ(t.id, ti, seed);
      if (!q || s.usedSig.has(q.sig)) continue;
      const pref = level === 'hard' ? 3 - q.diff : level === 'easy' ? q.diff - 1 : 0;
      const k = pref + s.rng() * 1.2;
      if (k < bestK) { best = q; bestK = k; }
    }
    return best;
  }
  function build(sec, level) {
    const size = S.SECTIONS[sec].size, doms = S.DOMAINS.filter((d) => d.section === sec);
    const targets = apportion(doms.map((d) => d.w), size);
    let out = [];
    doms.forEach((d, i) => {
      const pool = rank(S.questions.filter((q) => q.domain === d.id && !s.used.has(q.id)), level);
      for (let k = 0; k < targets[i]; k++) {
        const g = s.rng() < (GEN_SHARE[d.id] || 0) ? genFor(d.id, level) : null;
        const q = g || pool.shift() || genFor(d.id, level);
        if (q && out.indexOf(q) < 0) { out.push(q); s.used.add(q.id); if (q.sig) s.usedSig.add(q.sig); }
      }
    });
    if (out.length < size) { // в банке не хватило — добираем из других доменов
      const rest = S.questions.filter((q) => q.section === sec && !s.used.has(q.id) && out.indexOf(q) < 0);
      out = out.concat(rank(rest, level).slice(0, size - out.length));
    }
    out.forEach((q) => s.used.add(q.id));
    return out;
  }

  /* ---------- Старт и вспомогательное ---------- */
  E.start = function (no, mode) {
    s = {
      no, mode, rng: U.rng(no * 7919 + 13), used: new Set(), usedSig: new Set(), mi: 0, mods: [], ans: {}, flags: {}, struck: {},
      hideTimer: false, spent: 0, name: ST.name(),
    };
    E.active = true;
    document.body.classList.add('in-exam');
    window.onbeforeunload = () => 'Тест не завершён — прогресс будет потерян.';
    location.hash = '#/exam';
    intro();
  };
  E.resume = () => {
    if (!s) return;
    if (s.phase === 'q') render();
    else if (s.phase === 'intro') intro();
    else if (s.phase === 'break') { /* экран перерыва уже показан, таймер идёт */ }
    else modIntro();
  };
  function leave() {
    clearInterval(timerId); E.active = false; window.onbeforeunload = null;
    document.body.classList.remove('in-exam'); closeTools();
  }
  function closeTools() { modalRoot().innerHTML = ''; }
  const cur = () => s.mods[s.mi];
  const timed = () => s.mode === 'timed';
  const secLeft = () => Math.max(0, Math.ceil((cur().deadline - Date.now()) / 1000));

  /* ---------- Экраны ---------- */
  function intro() {
    s.phase = 'intro';
    app().innerHTML = `<div class="center-screen"><div class="card">
      <span class="chip">${timed() ? 'Timed mode' : 'Untimed mode'}</span>
      <h1 style="margin-top:10px">Practice Test ${s.no}</h1>
      <p>Тест состоит из <b>четырёх модулей</b>: два по Reading & Writing (по 27 заданий, 32 мин) и два по Math (по 22 задания, 35 мин). Между разделами — перерыв 10 минут.</p>
      <ul class="rules">
        <li>Сложность второго модуля зависит от результата первого (как в настоящем адаптивном SAT).</li>
        <li>Внутри модуля можно переходить между вопросами и ставить флажок <b>Mark for Review</b>; после отправки модуля вернуться к нему нельзя.</li>
        <li>Штрафов за неверные ответы нет — отвечайте на все вопросы.</li>
        <li>Math: доступны калькулятор и справочный лист. Для настоящего экзамена используйте Desmos в Bluebook.</li>
        <li>Инструмент ✕ рядом с вариантом ответа вычёркивает его.</li>
        ${timed() ? '<li>Время идёт непрерывно. Когда оно истекает, модуль закрывается автоматически.</li>' : '<li>Режим без таймера: ограничений по времени нет.</li>'}
        <li>Телефон, подсказки и посторонние сайты — не используйте: так оценка получится честной.</li></ul>
      <div class="cta-bar"><button class="btn" data-act="exBegin">Begin test ★</button><button class="btn ghost" data-act="exExit">Cancel</button></div></div></div>`;
  }
  function modIntro() {
    s.phase = 'modintro';
    const [sec, n] = ORDER[s.mi];
    if (n === 1) s.level[sec] = 'mixed';
    else { const m1 = s.mods[s.mi - 1]; s.level[sec] = m1.correct / m1.total >= HARD_THRESHOLD ? 'hard' : 'easy'; }
    const lvl = n === 2 ? (s.level[sec] === 'hard' ? 'Harder' : 'Easier') : '';
    const size = S.SECTIONS[sec].size, mins = S.SECTIONS[sec].minutes;
    app().innerHTML = `<div class="center-screen"><div class="card" style="text-align:center">
      <span class="chip">${SEC_LABEL[sec]}, Module ${n}</span>
      <h1 style="margin-top:10px">${SEC_TITLE[sec]}</h1>
      <p>${size} заданий · ${timed() ? mins + ' минут' : 'без ограничения времени'}${lvl ? ' · по результатам 1-го модуля вам достался модуль уровня <b>' + lvl + '</b>' : ''}.</p>
      <p class="muted">Таймер запустится после нажатия кнопки.</p>
      <div class="row" style="justify-content:center"><button class="btn" data-act="exModStart">Start Module ${n}</button>
      <button class="btn ghost small" data-act="exExit">Exit test</button></div></div></div>`;
  }
  function startModule() {
    const [sec, n] = ORDER[s.mi];
    s.mods[s.mi] = { sec, n, qs: build(sec, s.level[sec]), cur: 0, review: false, level: s.level[sec], t0: Date.now(), deadline: timed() ? Date.now() + S.SECTIONS[sec].minutes * 60000 : null };
    s.phase = 'q';
    render();
    clearInterval(timerId);
    timerId = setInterval(tick, 500);
  }
  function tick() {
    if (s.phase !== 'q' || !timed()) return;
    const left = secLeft(), el = document.getElementById('timerVal');
    if (el) el.textContent = s.hideTimer ? '— : —' : U.fmtTime(left);
    const box = document.getElementById('timerBox');
    if (box) box.classList.toggle('low', left <= 300);
    if (left <= 0) { alert('Время модуля истекло. Ответы отправлены автоматически.'); submitModule(); }
  }

  function render() {
    const m = cur(), n = m.qs.length;
    if (!n) return;
    const q = m.qs[m.cur], id = q.id;
    const tools = m.sec === 'math'
      ? '<button class="tool" data-act="exCalc">Calculator</button><button class="tool" data-act="exRef">Reference</button>' : '';
    const timerHtml = timed()
      ? `<div class="timer" id="timerBox"><b id="timerVal">${s.hideTimer ? '— : —' : U.fmtTime(secLeft())}</b><button data-act="exHide">${s.hideTimer ? 'Show timer' : 'Hide timer'}</button></div>`
      : '<div class="timer"><b>∞</b><span class="small">No time limit</span></div>';
    const top = `<div class="exam-top"><div class="l">${SEC_LABEL[m.sec]}, Module ${m.n}<small>${SEC_TITLE[m.sec]}</small></div>${timerHtml}
      <div class="exam-tools">${tools}<button class="tool" data-act="exExit">Exit</button></div></div>`;

    if (m.review) { app().innerHTML = `<div class="exam">${top}${reviewBody(m)}</div>`; return; }

    const flagged = !!s.flags[id], given = s.ans[id];
    const qpane = `<div class="qmeta"><span class="qnum">${m.cur + 1}</span>
        <button class="flag-btn ${flagged ? 'on' : ''}" data-act="exFlag">⚑ Mark for Review</button></div>
        <div class="qtext">${q.q}</div>${S.ui.choices(q, { sel: given, elim: q.type === 'mc', struck: s.struck[id] || [] })}`;
    const body = q.passage
      ? `<div class="exam-body"><div class="pane left"><div class="passage" style="border:0;background:none;padding:0">${q.passage}</div></div><div class="pane">${qpane}</div></div>`
      : `<div class="exam-body single"><div class="pane">${qpane}</div></div>`;
    const bottom = `<div class="exam-bottom"><span>${U.esc(s.name)}</span>
      <button class="qnav-btn" data-act="exNav">Question ${m.cur + 1} of ${n} ▴</button>
      <span class="row"><button class="btn small ghost" data-act="exBack" ${m.cur === 0 ? 'disabled' : ''}>Back</button>
      <button class="btn small gold" data-act="exNext">${m.cur === n - 1 ? 'Review' : 'Next'}</button></span></div>`;
    app().innerHTML = `<div class="exam">${top}${body}${bottom}</div>`;
    const inp = document.getElementById('sprIn');
    if (inp) inp.addEventListener('input', () => { s.ans[id] = inp.value.trim(); });
  }
  function status(m, i) {
    const id = m.qs[i].id;
    return { done: s.ans[id] != null && s.ans[id] !== '', flag: !!s.flags[id], cur: i === m.cur };
  }
  function grid(m, onReview) {
    return '<div class="qgrid">' + m.qs.map((q, i) => {
      const st = status(m, i);
      return `<button class="${st.done ? 'done' : ''} ${st.flag ? 'flag' : ''} ${st.cur && !onReview ? 'cur' : ''}" data-act="exGo" data-i="${i}" aria-label="Question ${i + 1}">${i + 1}</button>`;
    }).join('') + '</div>';
  }
  function reviewBody(m) {
    const un = m.qs.filter((q, i) => !status(m, i).done).length, fl = m.qs.filter((q, i) => status(m, i).flag).length;
    return `<div class="center-screen"><div class="card"><h2>Check your work</h2>
      <p>Модуль ${m.n}: ${SEC_TITLE[m.sec]}. Выберите вопрос, чтобы вернуться к нему.</p>${grid(m, true)}
      <div class="legend"><span>Светло-голубой — есть ответ</span><span>Белый — без ответа</span><span style="color:var(--red)">⚑ — отмечен для проверки</span></div>
      <p style="margin-top:14px">${un ? `<b style="color:var(--red)">Без ответа: ${un}.</b> ` : '<b style="color:var(--ok)">Все вопросы отвечены.</b> '}${fl ? `С флажком: ${fl}.` : ''}</p>
      <div class="cta-bar"><button class="btn ghost" data-act="exGo" data-i="${m.qs.length - 1}">← Back to questions</button>
      <button class="btn" data-act="exSubmit">Submit Module ${m.n}</button></div>
      <p class="muted small">После отправки вернуться в этот модуль будет нельзя.</p></div></div>`;
  }

  /* ---------- Завершение модуля, перерыв, итог ---------- */
  function submitModule() {
    clearInterval(timerId); closeTools();
    const m = cur();
    m.correct = m.qs.filter((q) => SAT.isCorrect(q, s.ans[q.id])).length;
    m.total = m.qs.length;
    s.spent += (Date.now() - m.t0) / 1000;
    if (s.mi === 1) { s.mi = 2; breakScreen(); return; }
    if (s.mi === 3) return finish();
    s.mi++; modIntro();
  }
  function breakScreen() {
    s.phase = 'break';
    s.breakEnd = Date.now() + S.BREAK_MINUTES * 60000;
    app().innerHTML = `<div class="center-screen"><div class="card blue" style="text-align:center">
      <h1>Break time ☕</h1><p>Раздел Reading & Writing завершён. ${timed() ? 'У вас есть 10 минут: встаньте, разомнитесь, выпейте воды.' : 'Можно отдохнуть сколько нужно.'}</p>
      ${timed() ? '<div class="score-big" id="breakVal" style="font-size:72px"></div>' : ''}
      <p class="small">Следующий раздел: Math — калькулятор и справочный лист будут доступны.</p>
      <div class="row" style="justify-content:center"><button class="btn gold" data-act="exResume">Resume testing</button>
      <button class="btn ghost small" data-act="exExit">Exit test</button></div></div></div>`;
    if (timed()) {
      const upd = () => {
        const left = Math.max(0, Math.ceil((s.breakEnd - Date.now()) / 1000)), el = document.getElementById('breakVal');
        if (el) el.textContent = U.fmtTime(left);
        if (left <= 0 && s.phase === 'break') { clearInterval(timerId); modIntro(); }
      };
      upd(); clearInterval(timerId); timerId = setInterval(upd, 500);
    }
  }
  function finish() {
    const items = [];
    s.mods.forEach((m) => m.qs.forEach((q) => items.push({ qid: q.id, given: s.ans[q.id] == null ? null : s.ans[q.id], ok: SAT.isCorrect(q, s.ans[q.id]), flag: !!s.flags[q.id], mod: m.sec + m.n })));
    const sections = {};
    ['rw', 'math'].forEach((sec) => {
      const ms = s.mods.filter((m) => m.sec === sec);
      const c = ms.reduce((a, m) => a + m.correct, 0), t = ms.reduce((a, m) => a + m.total, 0);
      const level = ms[1] ? ms[1].level : 'mixed';
      sections[sec] = { correct: c, total: t, level, score: SAT.estimateSection(c, t, level) };
    });
    const a = {
      id: 't' + Date.now(), testNo: s.no, mode: s.mode, ts: Date.now(), secs: Math.round(s.spent), sections,
      total: sections.rw.score + sections.math.score,
      mods: s.mods.map((m) => ({ sec: m.sec, n: m.n, correct: m.correct, total: m.total, level: m.level })), items,
    };
    ST.addTest(a);
    leave();
    S.showResults(a.id);
  }

  /* ---------- Калькулятор и справочный лист ---------- */
  const ALIAS = { pi: 'Math.PI', e: 'Math.E', sqrt: 'Math.sqrt', abs: 'Math.abs', ln: 'Math.log', log: 'Math.log10', sin: 'Math.sin', cos: 'Math.cos', tan: 'Math.tan' };
  function calcEval(expr) {
    let e = expr.replace(/π/g, 'pi').replace(/\^/g, '**').replace(/×/g, '*').replace(/÷/g, '/');
    if (!e.trim()) return '';
    if (!/^[0-9a-z+\-*/().,\s]*$/i.test(e)) return 'Error';
    let bad = false;
    e = e.replace(/[a-z]+/gi, (w) => { const k = w.toLowerCase(); if (!ALIAS[k]) bad = true; return ALIAS[k] || ''; });
    if (bad) return 'Error';
    try {
      const v = Function('"use strict";return (' + e + ')')();
      return typeof v === 'number' && isFinite(v) ? String(+v.toPrecision(10)) : 'Error';
    } catch (err) { return ''; }
  }
  function calcOpen() {
    if (document.getElementById('calcBox')) return calcClose();
    const keys = ['7', '8', '9', '÷', 'C', '4', '5', '6', '×', '(', '1', '2', '3', '-', ')', '0', '.', '^', '+', '⌫', 'π', 'sqrt(', 'sin(', 'cos(', 'tan('];
    const box = document.createElement('div');
    box.id = 'calcBox'; box.className = 'calc';
    box.innerHTML = `<header><span>Calculator</span><button class="tool" style="color:var(--navy);border-color:var(--navy)" data-act="exCalc">✕</button></header>
      <input id="calcIn" type="text" autocomplete="off" aria-label="Expression" placeholder="напр. 3.5*12+sqrt(49)">
      <div class="out" id="calcOut"></div>
      <div class="keys">${keys.map((k) => `<button class="${/[÷×\-+^]/.test(k) && k.length === 1 ? 'op' : ''}" data-act="calcKey" data-k="${k}">${k}</button>`).join('')}</div>
      <p class="muted small" style="margin:8px 0 0">В настоящем SAT встроен Desmos.</p>`;
    modalRoot().appendChild(box);
    const inp = document.getElementById('calcIn');
    inp.addEventListener('input', calcUpdate); inp.focus();
  }
  function calcClose() { const b = document.getElementById('calcBox'); if (b) b.remove(); }
  function calcUpdate() { document.getElementById('calcOut').textContent = '= ' + calcEval(document.getElementById('calcIn').value); }
  function refSheet() {
    modalRoot().insertAdjacentHTML('beforeend', `<div class="modal-bg" id="refBg"><div class="modal"><h2>Reference Sheet</h2><div class="refsheet">
      <div><b>Circle</b><br>A = πr²<br>C = 2πr</div>
      <div><b>Rectangle</b><br>A = ℓw</div>
      <div><b>Triangle</b><br>A = ½bh</div>
      <div><b>Pythagorean theorem</b><br>a² + b² = c²</div>
      <div><b>Special right triangles</b><br>30°-60°-90°: x, x√3, 2x<br>45°-45°-90°: x, x, x√2</div>
      <div><b>Rectangular prism</b><br>V = ℓwh</div>
      <div><b>Cylinder</b><br>V = πr²h</div>
      <div><b>Sphere</b><br>V = (4/3)πr³</div>
      <div><b>Cone</b><br>V = (1/3)πr²h</div>
      <div><b>Pyramid</b><br>V = (1/3)ℓwh</div>
      <div><b>Facts</b><br>Круг содержит 360°.<br>Круг содержит 2π радиан.<br>Сумма углов треугольника — 180°.</div></div>
      <div class="cta-bar"><button class="btn" data-act="exRefClose">Close</button></div></div></div>`);
  }

  /* ---------- Действия ---------- */
  const A = S.acts;
  A.exBegin = () => { s.level = {}; s.mi = 0; modIntro(); };
  A.exModStart = () => startModule();
  A.exExit = () => {
    if (confirm('Выйти из теста? Результаты не сохранятся.')) { leave(); s = null; location.hash = '#/tests'; S.refresh(); }
  };
  A.exResume = () => { clearInterval(timerId); modIntro(); };
  E.pick = (i) => { const m = cur(); s.ans[m.qs[m.cur].id] = i; render(); };
  A.elim = (el) => {
    const m = cur(), id = m.qs[m.cur].id, i = +el.dataset.i, arr = (s.struck[id] = s.struck[id] || []);
    const k = arr.indexOf(i); if (k >= 0) arr.splice(k, 1); else arr.push(i);
    render();
  };
  A.exFlag = () => { const id = cur().qs[cur().cur].id; s.flags[id] = !s.flags[id]; render(); };
  A.exNext = () => { const m = cur(); if (m.cur === m.qs.length - 1) m.review = true; else m.cur++; render(); };
  A.exBack = () => { const m = cur(); if (m.cur > 0) { m.cur--; render(); } };
  A.exGo = (el) => { const m = cur(); m.cur = +el.dataset.i; m.review = false; closeNavModal(); render(); };
  A.exNav = () => {
    const m = cur();
    modalRoot().insertAdjacentHTML('beforeend', `<div class="modal-bg" id="navBg"><div class="modal"><h3>${SEC_TITLE[m.sec]} · Module ${m.n}</h3>${grid(m)}
      <div class="legend"><span>Светло-голубой — есть ответ</span><span style="color:var(--red)">⚑ — отмечен</span><span>Жёлтый — текущий</span></div>
      <div class="cta-bar"><button class="btn small ghost" data-act="exNavClose">Close</button><button class="btn small" data-act="exToReview">Go to Review Page</button></div></div></div>`);
  };
  function closeNavModal() { const b = document.getElementById('navBg'); if (b) b.remove(); }
  A.exNavClose = closeNavModal;
  A.exToReview = () => { closeNavModal(); cur().review = true; render(); };
  A.exSubmit = () => {
    const m = cur(), un = m.qs.filter((q, i) => !status(m, i).done).length;
    if (un && !confirm(`Без ответа осталось вопросов: ${un}. Всё равно отправить модуль?`)) return;
    submitModule();
  };
  A.exHide = () => { s.hideTimer = !s.hideTimer; render(); };
  A.exCalc = () => calcOpen();
  A.exRef = () => refSheet();
  A.exRefClose = () => { const b = document.getElementById('refBg'); if (b) b.remove(); };
  A.calcKey = (el) => {
    const inp = document.getElementById('calcIn'), k = el.dataset.k;
    if (k === 'C') inp.value = ''; else if (k === '⌫') inp.value = inp.value.slice(0, -1); else inp.value += k;
    calcUpdate(); inp.focus();
  };
})();
