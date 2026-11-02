/* «Школьная жизнь»: ученический билет, уровни (Freshman → Valedictorian), значки-письма, табель успеваемости,
   цель дня, советы тренера, конфетти. Всё считается из данных профиля — отдельное хранилище нужно только для билета и полученных значков. */
(function () {
  'use strict';
  const S = window.SAT, U = S.util, ST = S.store;
  const C = (S.campus = {});

  const MASCOTS = [['🦅', 'Eagles'], ['🐻', 'Bears'], ['🐯', 'Tigers'], ['🐺', 'Wolves'], ['🦁', 'Lions'], ['🐎', 'Mustangs'], ['🐬', 'Dolphins']];
  const LEVELS = [
    { name: 'Freshman', xp: 0, icon: '🌱' }, { name: 'Sophomore', xp: 400, icon: '📘' }, { name: 'Junior', xp: 1200, icon: '🏅' },
    { name: 'Senior', xp: 2500, icon: '🎓' }, { name: 'Honor Student', xp: 4500, icon: '🏆' }, { name: 'Valedictorian', xp: 8000, icon: '👑' },
  ];
  const DAILY_GOAL = 10;

  /* ---------- Профиль ученика (билет) ---------- */
  C.card = function () {
    const p = ST.p();
    if (!p.card) {
      const y = new Date().getFullYear() + (new Date().getMonth() > 5 ? 1 : 0);
      p.card = { mascot: 0, classYear: y, target: 1400, num: String(100000 + (Math.floor(p.created / 1000) % 900000)) };
      ST.save();
    }
    return p.card;
  };

  /* ---------- XP и уровни ---------- */
  C.xp = function () {
    const p = ST.p(); let xp = 0;
    Object.values(p.qs).forEach((r) => { xp += r.right * 5 + (r.tries - r.right); });
    xp += Object.keys(p.lessons).length * 30 + p.tests.length * 150;
    return xp;
  };
  C.level = function () {
    const xp = C.xp(); let i = 0;
    LEVELS.forEach((l, k) => { if (xp >= l.xp) i = k; });
    const cur = LEVELS[i], next = LEVELS[i + 1];
    return { xp, cur, next, frac: next ? (xp - cur.xp) / (next.xp - cur.xp) : 1 };
  };

  /* ---------- Значки ---------- */
  const mastered = (ids) => ids.every((id) => S.stats.topic(id).status === 'done');
  const domainTopics = (section) => S.topics.filter((t) => t.section === section).map((t) => t.id);
  const BADGES = [
    { id: 'first-down', icon: '🏈', name: 'First Down', desc: 'Решите первое задание', ok: (o) => o.tries >= 1 },
    { id: 'bookworm', icon: '📚', name: 'Bookworm', desc: 'Изучите 5 уроков', ok: (o) => o.studied >= 5 },
    { id: 'honor-roll', icon: '📜', name: 'Honor Roll', desc: 'Освойте 5 тем', ok: (o) => o.done >= 5 },
    { id: 'dean-list', icon: '🎖️', name: 'Dean’s List', desc: 'Освойте 15 тем', ok: (o) => o.done >= 15 },
    { id: 'century', icon: '💯', name: 'Century Club', desc: 'Решите 100 заданий', ok: (o) => o.tries >= 100 },
    { id: 'marathon', icon: '🏃', name: 'Marathoner', desc: 'Решите 500 заданий', ok: (o) => o.tries >= 500 },
    { id: 'sharp', icon: '🎯', name: 'Sharpshooter', desc: '90%+ верных при 30+ заданиях', ok: (o) => o.tries >= 30 && o.right / o.tries >= 0.9 },
    { id: 'streak3', icon: '🔥', name: 'Hot Streak', desc: '3 дня занятий подряд', ok: () => S.stats.streak() >= 3 },
    { id: 'streak7', icon: '☄️', name: 'Iron Student', desc: '7 дней подряд', ok: () => S.stats.streak() >= 7 },
    { id: 'perfect', icon: '✨', name: 'Perfect Set', desc: '100% в наборе заданий', ok: (o, p) => !!(p.flags && p.flags.perfect) },
    { id: 'game-day', icon: '🏟️', name: 'Game Day', desc: 'Пройдите первый пробный тест', ok: (o) => o.tests >= 1 },
    { id: 'clock', icon: '⏱️', name: 'Beat the Clock', desc: 'Завершите тест с таймером', ok: (o, p) => p.tests.some((t) => t.mode === 'timed') },
    { id: 'comeback', icon: '📈', name: 'Comeback Kid', desc: 'Улучшите итог теста на 100+', ok: (o, p) => p.tests.some((t, i) => i && t.total - p.tests[i - 1].total >= 100) },
    { id: 'v1200', icon: '🅰️', name: 'Varsity Letter', desc: 'Итог теста 1200+', ok: (o) => o.best >= 1200 },
    { id: 'v1400', icon: '⭐', name: 'All-Star', desc: 'Итог теста 1400+', ok: (o) => o.best >= 1400 },
    { id: 'v1500', icon: '🏛️', name: 'Hall of Fame', desc: 'Итог теста 1500+', ok: (o) => o.best >= 1500 },
    { id: 'math-mvp', icon: '🧮', name: 'Math MVP', desc: 'Освойте все темы Math', ok: () => mastered(domainTopics('math')) },
    { id: 'wordsmith', icon: '✒️', name: 'Wordsmith', desc: 'Освойте все темы Reading & Writing', ok: () => mastered(domainTopics('rw')) },
  ];
  C.badges = BADGES;

  C.check = function () {
    const p = ST.p(); if (!p) return;
    p.badges = p.badges || {};
    const o = S.stats.overall(), fresh = [];
    BADGES.forEach((b) => { if (!p.badges[b.id] && b.ok(o, p)) { p.badges[b.id] = Date.now(); fresh.push(b); } });
    const before = p.lvl || 0, lv = C.level(), idx = LEVELS.indexOf(lv.cur);
    if (idx > before) { p.lvl = idx; toast(`${lv.cur.icon} Новый уровень: ${lv.cur.name}!`, true); }
    else if (p.lvl === undefined) p.lvl = idx;
    fresh.forEach((b) => toast(`${b.icon} Значок «${b.name}» — ${b.desc}`));
    if (fresh.length || idx > before) ST.save();
  };
  C.flag = (name) => { const p = ST.p(); p.flags = p.flags || {}; p.flags[name] = true; ST.save(); C.check(); };

  /* ---------- Тосты и конфетти ---------- */
  function toast(text, big) {
    let box = document.getElementById('toasts');
    if (!box) { box = document.createElement('div'); box.id = 'toasts'; document.body.appendChild(box); }
    const t = document.createElement('div');
    t.className = 'toast' + (big ? ' big' : '');
    t.textContent = text;
    box.appendChild(t);
    if (big) C.confetti();
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 400); }, 5200);
  }
  C.confetti = function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const colors = ['#c8102e', '#0b2455', '#f2b705', '#ffffff', '#1f8f4e'], wrap = document.createElement('div');
    wrap.className = 'confetti'; wrap.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 70; i++) {
      const s = document.createElement('i');
      s.style.cssText = `left:${Math.random() * 100}%;background:${colors[i % colors.length]};animation-delay:${Math.random() * 0.8}s;animation-duration:${2.4 + Math.random() * 1.6}s;transform:rotate(${Math.random() * 360}deg)`;
      wrap.appendChild(s);
    }
    document.body.appendChild(wrap);
    setTimeout(() => wrap.remove(), 4800);
  };

  /* ---------- Советы тренера ---------- */
  const TIPS = [
    'Штрафа за неверный ответ нет: никогда не оставляйте вопрос пустым.',
    'Трудный вопрос? Поставьте флажок Mark for Review и вернитесь к нему, когда останется время.',
    'Первый модуль важнее: он определяет сложность второго. Не спешите и проверяйте ответы.',
    'В Math сначала «разведайте» условие: часто задачу быстрее решить подстановкой вариантов ответа.',
    'В R&W сначала закройте варианты и сформулируйте свой ответ, потом сравнивайте.',
    'Тренируйте Desmos заранее: системы и параболы он решает за секунды.',
    'Разбирайте ошибки: каждая неправильная задача — это бесплатный урок.',
    'Спите перед экзаменом. Ещё один пробный тест ночью даст меньше, чем выспавшаяся голова.',
    'Правильный ответ в R&W почти всегда подтверждается словами из текста — найдите эти слова.',
    'Не знаете ответ? Вычеркните два заведомо неверных варианта: шанс угадать вырастает вдвое.',
    '10 заданий в день за месяц — это 300 заданий. Маленькие шаги побеждают.',
    'В заданиях с вводом ответа проверяйте формат: дробь через «/», без смешанных чисел.',
    'В переходах (However, Therefore…) сначала определите связь между мыслями: контраст, следствие или пример.',
    'Читайте условие Math до конца: часто спрашивают не x, а x + 3 или значение выражения.',
    'Следите за временем: в Math ~95 секунд на вопрос, в R&W ~70.',
  ];
  C.tip = () => TIPS[Math.floor(Date.now() / 86400000) % TIPS.length];

  /* ---------- Табель успеваемости ---------- */
  const GRADES = [[90, 'A', 4], [80, 'B', 3], [70, 'C', 2], [60, 'D', 1], [0, 'F', 0]];
  const COMMENTS = { A: 'Excellent work!', B: 'Great job, keep going!', C: 'Solid. A bit more practice.', D: 'Needs attention.', F: 'Let’s review this together.' };
  C.reportCard = function () {
    const rows = S.DOMAINS.map((d) => {
      const x = S.stats.domainAcc(d.id);
      if (!x.answered) return { d, grade: null };
      const pct = Math.round((100 * x.right) / x.answered), g = GRADES.find((g) => pct >= g[0]);
      return { d, pct, grade: g[1], pts: g[2], n: x.answered };
    });
    const graded = rows.filter((r) => r.grade);
    const gpa = graded.length ? graded.reduce((a, r) => a + r.pts, 0) / graded.length : null;
    return { rows, gpa };
  };

  /* ---------- Разметка ---------- */
  const esc = U.esc;
  C.idCard = function (editable) {
    const c = C.card(), lv = C.level(), best = S.stats.overall().best, [emoji, team] = MASCOTS[c.mascot] || MASCOTS[0];
    const bars = Array.from({ length: 34 }, (_, i) => `<i style="width:${1 + ((c.num.charCodeAt(i % 6) + i * 7) % 4)}px"></i>`).join('');
    const prog = best ? Math.max(0, Math.min(1, (best - 400) / Math.max(1, c.target - 400))) : 0;
    const form = editable ? `<div class="id-edit card">
        <h3>Настроить билет</h3>
        <label class="muted small">Талисман команды</label>
        <div class="mascots">${MASCOTS.map((m, i) => `<button class="mascot ${i === c.mascot ? 'on' : ''}" data-act="setMascot" data-i="${i}" title="${m[1]}" aria-label="${m[1]}">${m[0]}</button>`).join('')}</div>
        <div class="row" style="margin-top:12px">
          <label class="small muted">Выпуск<br><select id="classYear">${[0, 1, 2, 3, 4].map((k) => { const y = new Date().getFullYear() + k; return `<option ${y === c.classYear ? 'selected' : ''}>${y}</option>`; }).join('')}</select></label>
          <label class="small muted">Целевой балл<br><input id="targetScore" type="number" min="400" max="1600" step="10" value="${c.target}" style="width:110px"></label>
          <button class="btn small" data-act="saveCard">Save</button></div></div>` : '';
    return `<div class="idwrap"><div class="idcard">
        <div class="id-hole"></div>
        <div class="id-head"><b>★ SAT Boot Camp High School ★</b><small>Student Identification Card</small></div>
        <div class="id-body">
          <div class="id-photo"><span>${emoji}</span><small>${esc(team)}</small></div>
          <div class="id-info">
            <div class="id-name">${esc(ST.name())}</div>
            <div class="id-row"><span>Class of</span><b>${c.classYear}</b></div>
            <div class="id-row"><span>Grade</span><b>${lv.cur.name}</b></div>
            <div class="id-row"><span>Student ID</span><b>${c.num.slice(0, 3)}-${c.num.slice(3)}</b></div>
            <div class="id-row"><span>Target</span><b>${c.target}</b></div>
          </div>
        </div>
        <div class="id-goal"><span>Path to target: ${best || '—'} / ${c.target}</span>${ui().bar(prog)}</div>
        <div class="id-strip" aria-hidden="true">${bars}</div>
        <div class="id-foot">Valid through test day ★ XP ${lv.xp.toLocaleString('ru-RU')}</div>
      </div>${form}</div>`;
  };
  const ui = () => S.ui;

  C.levelBar = function () {
    const lv = C.level();
    return `<div class="levelbar"><span class="lv-icon">${lv.cur.icon}</span>
      <div class="lv-main"><b>${lv.cur.name}</b><span class="muted small"> · ${lv.xp.toLocaleString('ru-RU')} XP${lv.next ? ` · до «${lv.next.name}» ещё ${(lv.next.xp - lv.xp).toLocaleString('ru-RU')}` : ' · максимум!'}</span>${ui().bar(lv.frac)}</div></div>`;
  };

  C.homePanel = function () {
    const k = U.dayKey(Date.now()), done = Math.min(DAILY_GOAL, (ST.p().days[k] || 0)), deg = Math.round((done / DAILY_GOAL) * 360), card = C.card();
    return `<div class="grid three pep">
      <div class="card">${C.levelBar()}<p class="muted small" style="margin:10px 0 0">Каждое решённое задание, изученный урок и тест приносят XP.</p></div>
      <div class="card goal"><div class="ring" style="background:conic-gradient(var(--red) ${deg}deg, var(--sky) 0)"><b>${done}/${DAILY_GOAL}</b></div>
        <div><h3 style="margin:0">Daily Goal</h3><span class="muted small">${done >= DAILY_GOAL ? 'Цель дня выполнена! 🎉' : `Сделайте ${DAILY_GOAL} действий сегодня`}</span></div></div>
      <div class="card coach"><span class="coach-ico">📣</span><div><h3 style="margin:0">Coach’s Tip</h3><span class="small">${C.tip()}</span></div></div></div>
      <div class="spacer"></div>
      <div class="home-id"><a href="#/cabinet" class="idmini"><span class="idm-ico">${(MASCOTS[card.mascot] || MASCOTS[0])[0]}</span><span><b>${esc(ST.name())}</b> · Class of ${card.classYear}<br><span class="muted small">Ваш ученический билет и значки — в My Locker →</span></span></a></div>`;
  };

  C.lockerPanel = function () {
    const p = ST.p(), got = p.badges || {}, n = BADGES.filter((b) => got[b.id]).length;
    const patches = BADGES.map((b) => `<div class="badge ${got[b.id] ? 'earned' : ''}" title="${esc(b.desc)}">
        <div class="patch-ico">${got[b.id] ? b.icon : '🔒'}</div><b>${esc(b.name)}</b><small>${esc(b.desc)}</small></div>`).join('');
    const rc = C.reportCard();
    const rows = rc.rows.map((r) => `<tr><td>${esc(r.d.name)}<br><span class="muted small">${esc(r.d.ru)}</span></td>
      <td class="gr ${r.grade ? 'g' + r.grade : ''}">${r.grade || '—'}</td><td style="white-space:nowrap">${r.grade ? r.pct + '% (' + r.n + ')' : '—'}</td>
      <td class="muted small">${r.grade ? COMMENTS[r.grade] : 'Начните тренироваться'}</td></tr>`).join('');
    const gpaTxt = rc.gpa === null ? '—' : rc.gpa.toFixed(2);
    return `<div class="grid two" style="align-items:start">${C.idCard(true)}
        <div class="card"><h3>Report Card</h3>
          <table class="data report"><tr><th>Subject</th><th>Grade</th><th>Accuracy</th><th>Comment</th></tr>${rows}</table>
          <p style="margin:12px 0 0"><b>GPA: ${gpaTxt}</b> ${rc.gpa !== null && rc.gpa >= 3.5 ? '<span class="chip ok">Honor Roll</span>' : ''}</p>
          <div style="margin-top:14px">${C.levelBar()}</div></div></div>
      <div class="spacer"></div>
      <div class="card"><div class="domain-title"><h3>Varsity Letters &amp; Badges</h3><span class="muted">${n} / ${BADGES.length}</span></div><div class="badges">${patches}</div></div>`;
  };

  /* ---------- Действия ---------- */
  S.acts.setMascot = (el) => { C.card().mascot = +el.dataset.i; ST.save(); S.refresh(); };
  S.acts.saveCard = () => {
    const c = C.card();
    c.classYear = +document.getElementById('classYear').value;
    c.target = Math.max(400, Math.min(1600, Math.round((+document.getElementById('targetScore').value || 1400) / 10) * 10));
    ST.save(); S.refresh();
  };
})();
