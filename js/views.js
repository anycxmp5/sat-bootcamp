/* Экраны: главная, курс, урок, практика, список тестов, результаты, личный кабинет */
(function () {
  'use strict';
  const S = window.SAT, U = S.util, ST = S.store;
  const app = () => document.getElementById('app');
  const view = (html) => { app().innerHTML = html; window.scrollTo(0, 0); };
  S.acts = {};
  const ui = (S.ui = {});

  /* ---------- Общие куски разметки ---------- */
  ui.stars = (n) => '★'.repeat(n) + '☆'.repeat(3 - n);
  ui.statusChip = (st) =>
    st === 'done' ? '<span class="chip ok">Mastered</span>' : st === 'prog' ? '<span class="chip prog">In progress</span>' : '<span class="chip">New</span>';
  ui.bar = (frac, cls) => `<div class="bar ${cls || ''}"><i style="width:${Math.round(Math.max(0, Math.min(1, frac)) * 100)}%"></i></div>`;

  ui.choices = function (q, o) {
    // o: {sel, checked, elim, struck:[]}
    if (q.type === 'spr') {
      const cls = o.checked ? (SAT.isCorrect(q, o.sel) ? 'right' : 'wrong') : '';
      return `<div class="spr"><input id="sprIn" type="text" inputmode="decimal" autocomplete="off" maxlength="7" class="${cls}"
        value="${U.esc(o.sel == null ? '' : o.sel)}" ${o.checked ? 'disabled' : ''} placeholder="Answer" aria-label="Your answer">
        <span class="muted small">Введите число. Дроби — через «/», например 3/4. Допустимо до 5 символов (6 для отрицательных).</span></div>`;
    }
    return '<div class="choices">' + q.choices.map((c, i) => {
      let cls = 'choice';
      if (o.sel === i) cls += ' sel';
      if (o.checked) { if (i === q.answer) cls += ' right'; else if (o.sel === i) cls += ' wrong'; }
      const struck = o.struck && o.struck.indexOf(i) >= 0;
      if (struck) cls += ' struck';
      const btn = `<button class="${cls}" data-act="pick" data-i="${i}" ${o.checked ? 'disabled' : ''}>
        <span class="ltr">${'ABCD'[i]}</span><span class="txt">${c}</span></button>`;
      if (!o.elim) return btn;
      return `<div class="choice-wrap">${btn}<button class="elim" data-act="elim" data-i="${i}" title="Вычеркнуть вариант" aria-label="Eliminate option ${'ABCD'[i]}">${struck ? '↺' : '✕'}</button></div>`;
    }).join('') + '</div>';
  };

  ui.reviewItem = function (q, given, ok, n) {
    const mine = given == null || given === '' ? '<i>нет ответа</i>' : q.type === 'mc' ? 'ABCD'[given] + ') ' + q.choices[given] : U.esc(given);
    return `<div class="review-item ${ok ? 'ok' : 'bad'}">
      <div class="qmeta"><span class="qnum">${n}</span><span class="chip ${ok ? 'ok' : 'red'}">${ok ? 'Correct' : 'Incorrect'}</span>
      <span class="chip">${S.tById[q.topic].title}</span><span class="diff">${ui.stars(q.diff)}</span></div>
      ${q.passage ? `<div class="passage">${q.passage}</div>` : ''}
      <div class="qtext">${q.q}</div>
      <p><b>Ваш ответ:</b> ${mine}<br><b>Верный ответ:</b> ${S.answerText(q)}</p>
      <p class="muted">${q.exp}</p></div>`;
  };

  /* ---------- Приветствие / создание профиля ---------- */
  function welcome() {
    const names = ST.names();
    view(`<div class="hero"><h1>Welcome to <em>SAT Boot Camp</em></h1>
      <p>Полный курс подготовки к Digital SAT: темы, практика, 8 пробных тестов и личный кабинет. Введите имя, чтобы сохранять прогресс.</p></div>
      <div class="spacer"></div>
      <div class="card" style="max-width:520px"><h3>Новый игрок</h3>
        <p class="muted">У каждого — свой профиль (например, ученик и репетитор). Данные хранятся только в этом браузере.</p>
        <div class="row"><input id="nameIn" type="text" maxlength="24" placeholder="Ваше имя"> <button class="btn" data-act="createProfile">Let's go!</button></div></div>
      ${names.length ? `<div class="spacer"></div><div class="card" style="max-width:520px"><h3>Или выберите профиль</h3><div class="row">${names.map((n) => `<button class="btn ghost" data-act="switchProfile" data-n="${U.esc(n)}">${U.esc(n)}</button>`).join('')}</div></div>` : ''}`);
  }
  S.acts.createProfile = () => {
    const v = document.getElementById('nameIn').value;
    if (ST.create(v)) S.refresh(); else document.getElementById('nameIn').focus();
  };
  S.acts.switchProfile = (el) => { ST.switchTo(el.dataset.n); location.hash = '#/'; S.refresh(); };

  /* ---------- Главная ---------- */
  function nextTopic() {
    return S.topics.find((t) => S.stats.topic(t.id).status !== 'done');
  }
  function home() {
    const o = S.stats.overall(), p = ST.p(), nt = nextTopic();
    const acc = o.tries ? U.pct(o.right, o.tries) : 0;
    let cd = '';
    if (p.examDate) {
      const days = Math.ceil((new Date(p.examDate + 'T00:00:00') - new Date()) / 86400000);
      if (days >= 0) cd = `<div class="card stat countdown"><div class="num">${days}</div><div class="lbl">дней до экзамена</div></div>`;
    }
    view(`<div class="hero"><h1>Привет, <em>${U.esc(ST.name())}</em>!</h1>
      <p>Курс по Digital SAT: ${S.topics.length} тем, ${S.questions.length} заданий в стиле экзамена, ${S.TEST_COUNT} полных пробных тестов с официальным таймером.</p>
      <div class="row">${nt ? `<a class="btn gold" href="#/topic/${nt.id}">▶ Продолжить: ${nt.title}</a>` : ''}<a class="btn ghost" href="#/tests">Practice Tests</a></div></div>
      <div class="spacer"></div>
      ${S.campus.homePanel()}
      <div class="spacer"></div>
      <div class="grid four">
        <div class="card stat"><div class="num">${o.done}<small style="font-size:20px">/${S.topics.length}</small></div><div class="lbl">тем освоено</div></div>
        <div class="card stat"><div class="num">${o.tries}</div><div class="lbl">задач решено · ${acc}%</div></div>
        <div class="card stat"><div class="num">${o.best || '—'}</div><div class="lbl">лучший балл (из 1600)</div></div>
        <div class="card stat"><div class="num">${S.stats.streak()}</div><div class="lbl">дней подряд 🔥</div></div>
        ${cd}
      </div>
      <div class="spacer"></div>
      <div class="grid two">
        <div class="card"><h3>Как устроен экзамен</h3><ul class="rules">
          <li><b>Digital SAT</b> проходит в приложении Bluebook, 2 ч 14 мин чистого времени, 98 заданий.</li>
          <li><b>Reading & Writing</b>: 2 модуля × 27 заданий, по 32 минуты.</li>
          <li><b>Перерыв</b> 10 минут.</li>
          <li><b>Math</b>: 2 модуля × 22 задания, по 35 минут. Калькулятор (Desmos) и справочный лист доступны весь раздел.</li>
          <li><b>Адаптивность</b>: сложность 2-го модуля зависит от результата 1-го.</li>
          <li><b>Штрафа за ошибки нет</b> — отвечайте на всё.</li>
          <li>Все подробности — в разделе <a href="#/guide">Exam Guide</a>.</li></ul></div>
        <div class="card blue"><h3>Как заниматься</h3><ol>
          <li>Откройте <a href="#/course" style="color:var(--gold)">Course</a> и идите по темам по порядку.</li>
          <li>Прочитайте урок, затем решите задания темы.</li>
          <li>Раз в неделю проходите пробный тест — сначала без таймера, ближе к экзамену — с таймером.</li>
          <li>В <a href="#/cabinet" style="color:var(--gold)">My Locker</a> смотрите слабые места и возвращайтесь к ним.</li></ol></div>
      </div>`);
  }

  /* ---------- Курс ---------- */
  function course() {
    let html = `<h1>The Playbook</h1><p class="muted">Все темы по порядку. Статус «Mastered» — урок изучен, все задания решены и верны не менее чем на 70%.</p>`;
    let n = 0;
    ['rw', 'math'].forEach((sid) => {
      const sec = S.SECTIONS[sid];
      html += `<div class="section-head"><span class="badge">${sec.name}</span><span class="muted">${sec.ru} · ${sec.size * 2} заданий на экзамене</span></div>`;
      S.DOMAINS.filter((d) => d.section === sid).forEach((d) => {
        const ts = S.topicsOf(d.id);
        const done = ts.filter((t) => S.stats.topic(t.id).status === 'done').length;
        html += `<div class="domain card"><div class="domain-title"><h3>${d.name}</h3><span class="muted">${d.ru} · ≈${Math.round(d.w * 100)}% экзамена · ${done}/${ts.length}</span></div>`;
        ts.forEach((t) => {
          n++;
          const s = S.stats.topic(t.id);
          html += `<a class="topic-row" href="#/topic/${t.id}"><span class="num">${n}</span>
            <span class="t"><b>${t.title}</b><span>${t.ru} · ${s.answered}/${s.total} заданий${s.answered ? ' · точность ' + U.pct(s.right, s.answered) + '%' : ''}</span></span>${ui.statusChip(s.status)}</a>`;
        });
        html += '</div>';
      });
    });
    view(html);
  }

  /* ---------- Урок ---------- */
  function topic(id) {
    const t = S.tById[id]; if (!t) return notFound();
    const s = S.stats.topic(id), idx = S.topics.indexOf(t), d = S.domain(t.domain);
    const prev = S.topics[idx - 1], next = S.topics[idx + 1];
    view(`<div class="crumbs"><a href="#/course">Playbook</a> › ${S.SECTIONS[t.section].name} › ${d.name}</div>
      <div class="row" style="justify-content:space-between"><h1>${t.title}</h1>${ui.statusChip(s.status)}</div>
      <p class="muted">${t.ru}</p>
      <div class="lesson">${t.lesson}</div>
      <div class="cta-bar">
        <button class="btn ${s.studied ? 'ghost' : 'navy'}" data-act="toggleLesson" data-id="${id}">${s.studied ? '✔ Урок изучен (снять отметку)' : 'Отметить урок изученным'}</button>
        <a class="btn" href="#/practice/${id}">Practice · ${t.questions.length} заданий →</a>
        ${(S.gens[id] || []).length ? `<button class="btn gold" data-act="prDrill" data-id="${id}">∞ Extra drill</button>` : ''}
      </div>
      <div class="spacer"></div>
      <div class="row" style="justify-content:space-between">
        ${prev ? `<a href="#/topic/${prev.id}">← ${prev.title}</a>` : '<span></span>'}
        ${next ? `<a href="#/topic/${next.id}">${next.title} →</a>` : ''}</div>`);
  }
  S.acts.toggleLesson = (el) => {
    const id = el.dataset.id;
    ST.setLesson(id, !ST.p().lessons[id]);
    topic(id);
  };

  /* ---------- Практика по теме ---------- */
  let PR = null;
  function practice(id) {
    const t = S.tById[id]; if (!t) return notFound();
    if (!PR || PR.tid !== id || PR.done || PR.stale) PR = { tid: id, qs: t.questions, idx: 0, sel: {}, checked: {}, done: false };
    renderPractice();
  }
  function renderPractice() {
    const t = S.tById[PR.tid];
    if (PR.done) return practiceSummary(t);
    const q = PR.qs[PR.idx], i = PR.idx, checked = !!PR.checked[i];
    const ok = checked && SAT.isCorrect(q, PR.sel[i]);
    const dots = PR.qs.map((x, k) => `<i class="${k === i ? 'cur' : PR.checked[k] ? (SAT.isCorrect(x, PR.sel[k]) ? 'ok' : 'bad') : ''}"></i>`).join('');
    view(`<div class="crumbs"><a href="#/topic/${t.id}">← ${t.title}</a></div>
      <div class="dots">${dots}</div>
      <div class="qcard">
        <div class="qmeta"><span class="qnum">${i + 1}</span><span class="chip">${t.title}</span>${PR.drill ? '<span class="chip gold">Extra drill</span>' : ''}<span class="diff" title="Сложность">${ui.stars(q.diff)}</span></div>
        ${q.passage ? `<div class="passage">${q.passage}</div>` : ''}
        <div class="qtext">${q.q}</div>
        ${ui.choices(q, { sel: PR.sel[i], checked })}
        ${checked ? `<div class="feedback ${ok ? 'ok' : 'bad'}"><b class="h">${ok ? '✔ Correct!' : '✘ Not quite'}</b>
          ${ok ? '' : `<p><b>Верный ответ:</b> ${S.answerText(q)}</p>`}<p style="margin:0">${q.exp}</p></div>` : ''}
        <div class="qfoot">
          <button class="btn ghost small" data-act="prPrev" ${i === 0 ? 'disabled' : ''}>← Back</button>
          ${checked
            ? `<button class="btn" data-act="prNext">${i === PR.qs.length - 1 ? 'Finish ★' : 'Next →'}</button>`
            : `<button class="btn" data-act="prCheck" ${q.type === 'mc' && PR.sel[i] == null ? 'disabled' : ''}>Check answer</button>`}
        </div>
      </div>`);
    const inp = document.getElementById('sprIn');
    if (inp && !checked) { inp.focus(); inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') S.acts.prCheck(); }); }
  }
  S.acts.pick = (el) => {
    if (S.exam && S.exam.active) return S.exam.pick(+el.dataset.i);
    PR.sel[PR.idx] = +el.dataset.i; renderPractice();
  };
  S.acts.prCheck = () => {
    const q = PR.qs[PR.idx];
    if (q.type === 'spr') {
      const v = document.getElementById('sprIn').value.trim();
      if (!v) return;
      PR.sel[PR.idx] = v;
    }
    PR.checked[PR.idx] = true;
    ST.recordAnswer(q, SAT.isCorrect(q, PR.sel[PR.idx]));
    renderPractice();
  };
  S.acts.prNext = () => {
    if (PR.idx >= PR.qs.length - 1) PR.done = true; else PR.idx++;
    renderPractice();
  };
  S.acts.prPrev = () => { if (PR.idx > 0) { PR.idx--; renderPractice(); } };
  S.acts.prRetry = () => { PR = { tid: PR.tid, qs: S.tById[PR.tid].questions, idx: 0, sel: {}, checked: {}, done: false }; renderPractice(); };
  // «Ещё практика»: 5 новых заданий из генератора (не влияют на статус «Mastered»)
  S.acts.prDrill = (el) => {
    const tid = el ? el.dataset.id : PR.tid, fns = S.gens[tid] || [];
    if (!fns.length) return;
    const qs = [], start = Math.floor(Math.random() * fns.length);
    for (let k = 0; k < 5; k++) qs.push(S.genQ(tid, (start + k) % fns.length, 1 + Math.floor(Math.random() * 999999)));
    PR = { tid, qs, idx: 0, sel: {}, checked: {}, done: false, drill: true };
    const target = '#/practice/' + tid;
    if (location.hash === target) renderPractice();
    else location.hash = target; // роутер отрисует практику сам, сессия остаётся, пока пользователь не уйдёт со страницы
  };
  // Вызывается роутером при уходе со страницы практики: следующий заход начнёт сессию заново
  S.leavePractice = () => { if (PR) PR.stale = true; };
  function practiceSummary(t) {
    const n = PR.qs.length;
    const right = PR.qs.filter((q, k) => SAT.isCorrect(q, PR.sel[k])).length;
    const pct = U.pct(right, n);
    const idx = S.topics.indexOf(t), next = S.topics[idx + 1];
    const missed = PR.qs.map((q, k) => [q, k]).filter(([q, k]) => !SAT.isCorrect(q, PR.sel[k]));
    const hasGen = (S.gens[t.id] || []).length > 0;
    if (!PR.celebrated) {
      PR.celebrated = true;
      if (right === n) S.campus.flag('perfect');
      if (pct >= 70) S.campus.confetti();
    }
    view(`<div class="crumbs"><a href="#/topic/${t.id}">← ${t.title}</a></div>
      <div class="card blue" style="text-align:center"><h2>${pct >= 70 ? 'Touchdown! 🏈' : 'Keep training 💪'}</h2>
        <div class="score-big">${right}/${n}</div><p>Точность ${pct}%. ${PR.drill ? 'Это дополнительная практика: на статус темы она не влияет.' : pct >= 70 ? 'Тема засчитана как освоенная (если урок отмечен изученным).' : 'Перечитайте урок и попробуйте ещё раз — нужно минимум 70%.'}</p></div>
      <div class="spacer"></div>
      ${missed.length ? `<h3>Разбор ошибок</h3>${missed.map(([q, k]) => ui.reviewItem(q, PR.sel[k], false, k + 1)).join('')}` : ''}
      <div class="cta-bar">${PR.drill ? '' : '<button class="btn" data-act="prRetry">Повторить</button>'}
        ${hasGen ? `<button class="btn gold" data-act="prDrill" data-id="${t.id}">∞ Ещё 5 новых заданий</button>` : ''}
        <a class="btn ghost" href="#/topic/${t.id}">К уроку</a>
        ${next ? `<a class="btn navy" href="#/topic/${next.id}">Следующая тема →</a>` : ''}</div>`);
  }

  /* ---------- Список пробных тестов ---------- */
  function tests() {
    const p = ST.p();
    let cards = '';
    for (let n = 1; n <= S.TEST_COUNT; n++) {
      const tries = p.tests.filter((t) => t.testNo === n);
      const best = tries.length ? Math.max.apply(null, tries.map((t) => t.total)) : null;
      cards += `<div class="card test-card"><div class="no">#${n}</div><h3>Practice Test ${n}</h3>
        <p class="muted small">98 заданий · 4 модуля · адаптивный 2-й модуль</p>
        <p class="best">${best ? `Лучший: ${best} · попыток: ${tries.length}` : 'Ещё не пройден'}</p>
        <div class="row"><button class="btn small" data-act="startExam" data-n="${n}" data-mode="timed">⏱ Timed</button>
        <button class="btn small ghost" data-act="startExam" data-n="${n}" data-mode="untimed">∞ Untimed</button></div></div>`;
    }
    view(`<h1>Full-Length Practice Tests</h1>
      <div class="grid two">
        <div class="card"><h3>Правила, как на настоящем SAT</h3><ul class="rules">
          <li>Reading & Writing: 2 модуля по <b>27</b> заданий, <b>32 мин</b> каждый.</li>
          <li>Перерыв <b>10 мин</b>.</li>
          <li>Math: 2 модуля по <b>22</b> задания, <b>35 мин</b> каждый.</li>
          <li>Вернуться в предыдущий <b>модуль</b> нельзя; внутри модуля — можно, и можно ставить флажок «Mark for Review».</li>
          <li>Время вышло — модуль закрывается автоматически.</li>
          <li>Штрафов нет: если не знаете — угадывайте.</li>
          <li>В Math доступны калькулятор и справочный лист.</li></ul></div>
        <div class="card"><h3>Режимы</h3>
          <p><b>⏱ Timed</b> — все ограничения по времени, как на экзамене. Используйте перед самой датой теста.</p>
          <p><b>∞ Untimed</b> — та же структура и адаптивность, но без таймера: для спокойной отработки.</p>
          <div class="notice"><b>О заданиях.</b> Все задания оригинальные, в формате и пропорциях Digital SAT (официальные тексты College Board защищены авторским правом). Каждый тест собирается из ${S.questions.length} авторских заданий и генераторов: большая часть Math и часть R&W (грамматика, пунктуация, переходы, лексика) создаётся заново, поэтому тесты почти не повторяются. Задания по пониманию текста (Information and Ideas, Craft and Structure) берутся из авторского банка и могут частично повторяться. Настоящие официальные тесты бесплатны в приложении Bluebook — пройдите их для контроля.</div></div>
      </div><div class="spacer"></div><div class="grid three">${cards}</div>`);
  }
  S.acts.startExam = (el) => S.exam.start(+el.dataset.n, el.dataset.mode);

  /* ---------- Результаты теста ---------- */
  function results(id) {
    const a = ST.p().tests.find((t) => t.id === id); if (!a) return notFound();
    const sec = (k) => a.sections[k];
    const modRows = a.mods.map((m) => `<tr><td>${S.SECTIONS[m.sec].name} · Module ${m.n}</td><td>${m.level === 'hard' ? 'Harder' : m.level === 'easy' ? 'Easier' : 'Standard'}</td><td>${m.correct}/${m.total}</td><td>${U.pct(m.correct, m.total)}%</td></tr>`).join('');
    const byDom = {};
    a.items.forEach((it) => {
      const q = S.getQ(it.qid); if (!q) return;
      const d = byDom[q.domain] || (byDom[q.domain] = { r: 0, t: 0 });
      d.t++; if (it.ok) d.r++;
    });
    const domRows = S.DOMAINS.filter((d) => byDom[d.id]).map((d) => `<div class="dom-bar"><span>${d.name}</span>${ui.bar(byDom[d.id].r / byDom[d.id].t, byDom[d.id].r / byDom[d.id].t >= 0.7 ? 'green' : '')}<b>${byDom[d.id].r}/${byDom[d.id].t}</b></div>`).join('');
    const weak = Object.entries(a.items.reduce((m, it) => { const q = S.getQ(it.qid); if (q && !it.ok) m[q.topic] = (m[q.topic] || 0) + 1; return m; }, {}))
      .sort((x, y) => y[1] - x[1]).slice(0, 5);
    results.filter = results.filter || 'all';
    results.done = results.done || {};
    if (!results.done[id]) { // конфетти — если это лучший результат на данный момент
      results.done[id] = true;
      const prev = ST.p().tests.filter((t) => t.id !== id && t.ts < a.ts).map((t) => t.total);
      if (!prev.length || a.total >= Math.max.apply(null, prev)) S.campus.confetti();
    }
    const items = a.items.map((it, i) => ({ it, i, q: S.getQ(it.qid) })).filter((x) => x.q)
      .filter((x) => results.filter === 'all' || (results.filter === 'wrong' && !x.it.ok) || (results.filter === 'flag' && x.it.flag));
    view(`<div class="card blue" style="text-align:center">
        <div class="chip" style="background:var(--gold)">Practice Test ${a.testNo} · ${a.mode === 'timed' ? 'Timed' : 'Untimed'}</div>
        <h2 style="margin-top:10px">Final Score (estimate)</h2><div class="score-big">${a.total}</div><p>из 1600 · Время: ${U.fmtTime(a.secs)}</p>
        <div class="row" style="justify-content:center;gap:34px">
          <div class="patch"><b>${sec('rw').score}</b><span>Reading & Writing</span></div>
          <div class="patch"><b>${sec('math').score}</b><span>Math</span></div></div></div>
      <div class="notice" style="margin-top:14px">Баллы — оценка по шкале 200–800 на секцию с учётом сложности 2-го модуля. Официальный пересчёт College Board для каждого теста свой, поэтому реальный результат может отличаться на ±40–60 баллов.</div>
      <div class="spacer"></div>
      <div class="grid two">
        <div class="card"><h3>По модулям</h3><table class="data"><tr><th>Модуль</th><th>Уровень</th><th>Верно</th><th>%</th></tr>${modRows}</table></div>
        <div class="card"><h3>По разделам</h3>${domRows}</div></div>
      ${weak.length ? `<div class="spacer"></div><div class="card"><h3>Что подтянуть</h3>${weak.map(([tid, n]) => `<div class="weak"><span>${S.tById[tid].title} — ошибок: ${n}</span><a href="#/topic/${tid}">Открыть тему →</a></div>`).join('')}</div>` : ''}
      <div class="spacer"></div><h2>Разбор заданий</h2>
      <div class="tabs">${[['all', 'Все'], ['wrong', 'Только ошибки'], ['flag', 'С флажком']].map(([k, l]) => `<button class="btn small ${results.filter === k ? 'on' : 'ghost'}" data-act="resFilter" data-f="${k}" data-id="${id}">${l}</button>`).join('')}</div>
      ${items.map((x) => ui.reviewItem(x.q, x.it.given, x.it.ok, x.i + 1)).join('') || '<p class="muted">Здесь пусто.</p>'}
      <div class="cta-bar"><a class="btn" href="#/tests">К списку тестов</a><a class="btn ghost" href="#/cabinet">My Locker</a></div>`);
  }
  S.acts.resFilter = (el) => { results.filter = el.dataset.f; results(el.dataset.id); };
  S.showResults = (id) => { location.hash = '#/results/' + id; };

  /* ---------- Личный кабинет ---------- */
  function lineChart(tests) {
    if (!tests.length) return '<p class="muted">Пройдите пробный тест — здесь появится график баллов.</p>';
    const W = 640, H = 220, L = 46, B = 28, T = 14, R = 14;
    const lo = 400, hi = 1600, xs = tests.length === 1 ? 1 : tests.length - 1;
    const X = (i) => L + (tests.length === 1 ? (W - L - R) / 2 : (i * (W - L - R)) / xs);
    const Y = (v) => T + (1 - (v - lo) / (hi - lo)) * (H - T - B);
    let g = '';
    [400, 800, 1200, 1600].forEach((v) => { g += `<line x1="${L}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}" stroke="#dce6f5" stroke-width="2"/><text x="${L - 6}" y="${Y(v) + 4}" text-anchor="end" font-size="12" fill="#5b6785">${v}</text>`; });
    const pts = tests.map((t, i) => `${X(i)},${Y(t.total)}`).join(' ');
    const dots = tests.map((t, i) => `<circle cx="${X(i)}" cy="${Y(t.total)}" r="6" fill="#c8102e" stroke="#0b2455" stroke-width="3"/><text x="${X(i)}" y="${Y(t.total) - 12}" text-anchor="middle" font-size="13" font-weight="700" fill="#0b2455">${t.total}</text><text x="${X(i)}" y="${H - 8}" text-anchor="middle" font-size="12" fill="#5b6785">#${t.testNo}</text>`).join('');
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="График баллов пробных тестов">${g}<polyline points="${pts}" fill="none" stroke="#0b2455" stroke-width="3"/>${dots}</svg>`;
  }
  function cabinet() {
    const p = ST.p(), o = S.stats.overall();
    const acc = o.tries ? U.pct(o.right, o.tries) : 0;
    const domBars = S.DOMAINS.map((d) => {
      const x = S.stats.domainAcc(d.id), f = x.answered ? x.right / x.answered : 0;
      return `<div class="dom-bar"><span>${d.name}</span>${ui.bar(f, f >= 0.7 ? 'green' : '')}<b>${x.answered ? Math.round(f * 100) + '%' : '—'}</b></div>`;
    }).join('');
    const weak = S.topics.map((t) => ({ t, s: S.stats.topic(t.id) })).filter((x) => x.s.answered >= 3 && x.s.acc < 0.7).sort((a, b) => a.s.acc - b.s.acc).slice(0, 6);
    const grid = S.topics.map((t) => { const s = S.stats.topic(t.id); return `<a class="topic-row" href="#/topic/${t.id}" style="margin:0"><span class="t"><b style="font-size:16px">${t.title}</b></span>${ui.statusChip(s.status)}</a>`; }).join('');
    const hist = p.tests.slice().reverse().map((t) => `<tr><td>${U.date(t.ts)}</td><td>Test ${t.testNo}</td><td>${t.mode === 'timed' ? 'Timed' : 'Untimed'}</td><td>${t.sections.rw.score}</td><td>${t.sections.math.score}</td><td><b>${t.total}</b></td><td><a href="#/results/${t.id}">Разбор</a></td></tr>`).join('');
    view(`<h1>My Locker</h1>
      ${S.campus.lockerPanel()}
      <div class="spacer"></div>
      <div class="grid four">
        <div class="card stat"><div class="num">${o.studied}/${S.topics.length}</div><div class="lbl">уроков изучено</div></div>
        <div class="card stat"><div class="num">${o.done}</div><div class="lbl">тем освоено</div></div>
        <div class="card stat"><div class="num">${o.tries}</div><div class="lbl">решено · ${acc}% верно</div></div>
        <div class="card stat"><div class="num">${o.best || '—'}</div><div class="lbl">лучший тест</div></div></div>
      <div class="spacer"></div>
      <div class="grid two">
        <div class="card"><h3>Баллы пробных тестов</h3>${lineChart(p.tests)}</div>
        <div class="card"><h3>Точность по разделам</h3>${domBars}</div></div>
      <div class="spacer"></div>
      <div class="grid two">
        <div class="card"><h3>Слабые места</h3>${weak.length ? weak.map((x) => `<div class="weak"><span>${x.t.title} · ${Math.round(x.s.acc * 100)}%</span><a href="#/practice/${x.t.id}">Тренировать →</a></div>`).join('') : '<p class="muted">Пока нет тем с точностью ниже 70% (учитываются темы, где решено 3+ задач).</p>'}</div>
        <div class="card"><h3>Дата экзамена</h3><p class="muted">Покажем обратный отсчёт на главной.</p>
          <div class="row"><input id="examDate" type="date" value="${p.examDate || ''}"><button class="btn small" data-act="saveDate">Save</button></div></div></div>
      <div class="spacer"></div>
      <div class="card"><h3>История тестов</h3>${hist ? `<table class="data"><tr><th>Дата</th><th>Тест</th><th>Режим</th><th>R&W</th><th>Math</th><th>Итог</th><th></th></tr>${hist}</table>` : '<p class="muted">Тестов пока нет.</p>'}</div>
      <div class="spacer"></div>
      <h2>Все темы</h2><div class="locker-grid">${grid}</div>
      <div class="spacer"></div>
      <div class="card"><h3>Профили и данные</h3>
        <p class="muted">Прогресс хранится в этом браузере. Чтобы перенести его на другой компьютер — экспортируйте файл и импортируйте там.</p>
        <div class="row"><button class="btn small ghost" data-act="exportData">Экспорт</button>
          <label class="btn small ghost" style="cursor:pointer">Импорт<input id="importFile" type="file" accept=".json" hidden></label>
          <button class="btn small ghost" data-act="newProfile">Другой профиль</button>
          <button class="btn small ghost" data-act="resetProfile">Сбросить мой прогресс</button></div></div>`);
    document.getElementById('importFile').addEventListener('change', (e) => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => { try { ST.importJSON(r.result); S.refresh(); } catch (err) { alert('Не удалось прочитать файл.'); } };
      r.readAsText(f);
    });
  }
  S.acts.saveDate = () => { ST.setExamDate(document.getElementById('examDate').value); alert('Дата сохранена.'); };
  S.acts.exportData = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ST.exportJSON()], { type: 'application/json' }));
    a.download = 'sat-bootcamp-progress.json'; a.click();
  };
  S.acts.newProfile = () => { ST.logout(); location.hash = '#/'; S.refresh(); };
  S.acts.resetProfile = () => { if (confirm('Удалить весь прогресс профиля «' + ST.name() + '»? Это нельзя отменить.')) { ST.resetProfile(); cabinet(); } };

  /* ---------- Exam Guide: правила и нюансы официального экзамена ---------- */
  function guide() {
    view(`<h1>Exam Guide</h1><p class="muted">Всё, что нужно знать про формат Digital SAT. Даты, цены и правила могут меняться — актуальную информацию проверяйте на сайте College Board (collegeboard.org/sat).</p>
      <div class="grid two">
        <div class="card"><h3>Структура экзамена</h3>
          <table class="data"><tr><th>Раздел</th><th>Модули</th><th>Вопросов</th><th>Время</th></tr>
          <tr><td>Reading & Writing</td><td>2</td><td>27 + 27</td><td>32 + 32 мин</td></tr>
          <tr><td colspan="4" style="text-align:center"><b>Перерыв 10 минут</b></td></tr>
          <tr><td>Math</td><td>2</td><td>22 + 22</td><td>35 + 35 мин</td></tr>
          <tr><th>Всего</th><th>4</th><th>98</th><th>2 ч 14 мин</th></tr></table>
          <p class="muted small">Из 27 / 22 вопросов модуля 25 / 20 идут в оценку, а 2 — пробные (pretest), их не отличить. Поэтому не зацикливайтесь на «странном» вопросе.</p></div>
        <div class="card"><h3>Адаптивность</h3>
          <p>Экзамен подстраивается под вас <b>по модулям</b>: результат первого модуля раздела определяет, будет ли второй <b>более лёгким или более трудным</b>. Трудный второй модуль открывает потолок оценки (до 800), лёгкий — ограничивает её.</p>
          <p>Вывод: первый модуль — самый важный. Здесь не торопитесь, проверяйте ответы.</p></div>
        <div class="card"><h3>Оценка</h3>
          <ul><li>Итог: <b>400–1600</b> (две секции по 200–800).</li>
          <li><b>Штрафа за неверные ответы нет</b> — всегда отвечайте.</li>
          <li>Баллы считаются по специальной шкале (equating): один и тот же процент верных ответов на разных тестах даёт разный балл.</li>
          <li>Университеты видят итог и, как правило, учитывают <b>лучший результат</b> (superscore — решает вуз).</li></ul></div>
        <div class="card"><h3>Формат заданий</h3>
          <ul><li><b>Reading & Writing:</b> короткий текст (25–150 слов) + один вопрос с 4 вариантами. Читать длинные тексты не нужно.</li>
          <li><b>Math:</b> около 75% — с вариантами, около 25% — <b>student-produced response</b> (вводите число сами).</li>
          <li>Порядок вопросов в модуле: сначала темы по списку, внутри — от лёгких к трудным.</li></ul></div>
      </div>
      <div class="spacer"></div>
      <div class="grid two">
        <div class="card"><h3>Ввод ответа в Math (без вариантов)</h3>
          <ul><li>До 5 символов, с минусом — до 6.</li>
          <li>Можно вводить дробью (<code>3/4</code>) или десятичной (<code>0.75</code>).</li>
          <li>Десятичные, не помещающиеся в поле, вводите максимально точно (например, 0.3333).</li>
          <li>Смешанные числа вроде 2 1/2 <b>не принимаются</b>: пишите 5/2 или 2.5.</li>
          <li>Иногда принимаются несколько верных ответов — достаточно ввести один.</li></ul></div>
        <div class="card"><h3>Инструменты в Bluebook</h3>
          <ul><li><b>Desmos</b> — встроенный графический калькулятор, доступен во всех модулях Math. Разрешён и собственный допустимый калькулятор.</li>
          <li><b>Reference sheet</b> — формулы по геометрии и тригонометрии.</li>
          <li><b>Mark for Review</b> — флажок и страница проверки в конце модуля.</li>
          <li><b>Answer eliminator</b> — вычёркивание вариантов.</li>
          <li><b>Highlights & Notes</b> — выделение текста и заметки.</li>
          <li><b>Таймер</b> можно скрыть; за 5 минут до конца он подсвечивается.</li></ul>
          <p class="muted small">Наш симулятор повторяет флажок, вычёркивание, таймер, перерыв, адаптивность, калькулятор и справочный лист.</p></div>
      </div>
      <div class="spacer"></div>
      <div class="grid two">
        <div class="card"><h3>Правила во время теста</h3>
          <ul><li>Нельзя возвращаться к предыдущему <b>модулю</b>; внутри модуля — можно.</li>
          <li>Когда время модуля закончилось — он закрывается автоматически.</li>
          <li>Нельзя пользоваться телефоном, наушниками, умными часами, заметками.</li>
          <li>Перерыв — 10 минут; в это время можно выйти, перекусить, попить воды. Материалы раздела не открывайте.</li></ul></div>
        <div class="card"><h3>День экзамена: чек-лист</h3>
          <ul><li>Заряженный ноутбук или планшет с установленным <b>Bluebook</b> (или устройство центра).</li>
          <li>Admission ticket (билет с допуском) и документ с фото.</li>
          <li>Карандаш, одобренный калькулятор (по желанию), запасной зарядник.</li>
          <li>Лёгкая еда на перерыв, вода.</li>
          <li>Пройдите <b>exam preview</b> в Bluebook заранее.</li>
          <li>Сон накануне важнее, чем ещё один пробный тест.</li></ul></div>
      </div>
      <div class="spacer"></div>
      <div class="card blue"><h3>Стратегия по времени</h3>
        <p><b>Reading & Writing:</b> на вопрос в среднем ~71 секунда. Пропускайте тугой вопрос, ставьте флажок, возвращайтесь в конце.</p>
        <p><b>Math:</b> в среднем ~95 секунд. Лёгкие первыми, трудные — потом. Если задача решается графиком — используйте Desmos.</p>
        <p><b>Всегда</b> оставляйте себе 2–3 минуты на страницу проверки и угадывайте всё, что осталось пустым.</p>
        <p><b>План подготовки:</b> пройдите все темы курса → 1 пробный тест без таймера → разбор ошибок → 2–3 теста с таймером → доводка слабых тем.</p></div>`);
  }

  function notFound() { view('<div class="card"><h2>Страница не найдена</h2><a class="btn" href="#/">На главную</a></div>'); }

  /* ---------- Роутер ---------- */
  S.views = { welcome, home, course, topic, practice, tests, results, cabinet, guide, notFound };
})();
