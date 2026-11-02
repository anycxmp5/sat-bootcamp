/* Ядро: структура курса, утилиты, хранилище прогресса, проверка ответов */
(function () {
  'use strict';
  const SAT = (window.SAT = window.SAT || {});

  /* ---------- Структура экзамена (Digital SAT) ---------- */
  SAT.SECTIONS = {
    rw: { id: 'rw', name: 'Reading & Writing', ru: 'Чтение и письмо', size: 27, minutes: 32 },
    math: { id: 'math', name: 'Math', ru: 'Математика', size: 22, minutes: 35 },
  };
  SAT.BREAK_MINUTES = 10;
  SAT.TEST_COUNT = 8;

  // w — доля вопросов домена в модуле по спецификации College Board
  SAT.DOMAINS = [
    { id: 'cs', section: 'rw', name: 'Craft and Structure', ru: 'Структура и язык текста', w: 0.28 },
    { id: 'ii', section: 'rw', name: 'Information and Ideas', ru: 'Информация и идеи', w: 0.26 },
    { id: 'sec', section: 'rw', name: 'Standard English Conventions', ru: 'Правила английского', w: 0.26 },
    { id: 'eoi', section: 'rw', name: 'Expression of Ideas', ru: 'Выражение идей', w: 0.2 },
    { id: 'alg', section: 'math', name: 'Algebra', ru: 'Алгебра', w: 0.35 },
    { id: 'adv', section: 'math', name: 'Advanced Math', ru: 'Продвинутая математика', w: 0.35 },
    { id: 'psda', section: 'math', name: 'Problem-Solving and Data Analysis', ru: 'Задачи и анализ данных', w: 0.15 },
    { id: 'geo', section: 'math', name: 'Geometry and Trigonometry', ru: 'Геометрия и тригонометрия', w: 0.15 },
  ];

  /* ---------- Реестр тем и вопросов ---------- */
  SAT.topics = [];
  SAT.addTopics = (list) => list.forEach((t) => SAT.topics.push(t));
  // Короткие конструкторы вопросов: mc — выбор (answer = индекс), sp — ввод ответа
  SAT.mc = (diff, q, choices, answer, exp, passage) => ({ type: 'mc', diff, q, choices, answer, exp, passage });
  SAT.sp = (diff, q, answer, exp, passage) => ({ type: 'spr', diff, q, answer: [].concat(answer), exp, passage });

  // Дополнительные задания к уже объявленной теме (файлы data/extra-*.js)
  SAT.extend = (topicId, list) => {
    const t = SAT.topics.find((x) => x.id === topicId);
    if (t) list.forEach((q) => t.questions.push(q)); else console.warn('Тема не найдена: ' + topicId);
  };

  // Равномерно распределяет позицию верного ответа (A–D). Перемешивание детерминировано
  // (зависит только от id), чтобы сохранённые ответы и разборы не «ехали». Не трогаем вопросы,
  // где объяснение ссылается на буквы, и варианты с естественным порядком (числа, none/one/two).
  function spreadAnswer(q) {
    if (q.type !== 'mc' || q._spread) return;
    q._spread = true;
    const plain = (s) => String(s).replace(/<[^>]*>/g, '').trim();
    const natural = q.choices.every((c) => /^[−-]?[\d.,/%$°π]+[A-Za-z]*$/.test(plain(c).replace(/\s/g, ''))) ||
      q.choices.some((c) => /^(None|Exactly|Infinitely|Mean|Median|Range|3 only|9 and|Increasing|Decreasing)/.test(plain(c)));
    if (natural || /(^|[\s>(])[A-D]([\s.,:;)]|$)/.test(plain(q.exp))) return;
    let h = 2166136261;
    for (let i = 0; i < q.id.length; i++) h = Math.imul(h ^ q.id.charCodeAt(i), 16777619);
    const rnd = U.rng(h);
    const order = U.shuffle([0, 1, 2, 3], rnd);
    q.choices = order.map((i) => q.choices[i]);
    q.answer = order.indexOf(q.answer);
  }

  // Генераторы: SAT.gens[topicId] = [function (rnd) → вопрос]. Вопрос полностью определяется
  // (тема, шаблон, seed), поэтому его можно восстановить по id вида g:тема:шаблон:seed.
  SAT.gens = {};
  SAT.addGens = (topicId, fns) => { SAT.gens[topicId] = (SAT.gens[topicId] || []).concat(fns); };
  // В настоящем SAT Math около 75% заданий — с вариантами ответа. Генераторы возвращают числовой ответ,
  // поэтому часть целочисленных заданий превращаем в выбор из 4 чисел (правдоподобные «ошибочные» значения).
  const MC_SHARE = 0.8;
  function asChoices(q, r) {
    if (q.type !== 'spr' || q.answer.length !== 1 || !/^-?\d+$/.test(q.answer[0]) || r() >= MC_SHARE) return;
    const a = +q.answer[0];
    const pool = [a + 1, a - 1, a + 2, a - 2, a + 3, a - 3, a * 2, a / 2, a * 3, -a, a + 5, a - 5, a + 10, a - 10]
      .filter((v, i, arr) => v !== a && Number.isInteger(v) && Math.abs(v) < 1e6 && arr.indexOf(v) === i);
    const up = SAT.util.shuffle(pool.filter((v) => v > a), r), down = SAT.util.shuffle(pool.filter((v) => v < a), r);
    // сколько «неверных» значений будет больше верного — выбираем равновероятно, чтобы позиция ответа (A–D) была случайной
    const ks = [0, 1, 2, 3].filter((k) => k <= up.length && 3 - k <= down.length);
    const k = ks[Math.floor(r() * ks.length)];
    const all = up.slice(0, k).concat(down.slice(0, 3 - k), a).sort((x, y) => x - y);
    q.type = 'mc';
    q.choices = all.map(String);
    q.answer = all.indexOf(a);
  }

  SAT.genQ = function (tid, ti, seed) {
    const id = `g:${tid}:${ti}:${seed}`;
    if (SAT.qById[id]) return SAT.qById[id];
    const fn = (SAT.gens[tid] || [])[ti], t = SAT.tById[tid];
    if (!fn || !t) return null;
    const q = fn(SAT.util.rng(seed * 7919 + ti * 104729 + 13));
    if (t.section === 'math') asChoices(q, SAT.util.rng(seed * 31 + ti * 17 + 5));
    Object.assign(q, { id, topic: tid, domain: t.domain, section: t.section, gen: true });
    q.sig = (q.passage || '') + q.q; // подпись содержимого — чтобы не ставить в один тест одинаковые задания
    spreadAnswer(q);
    SAT.qById[id] = q;
    return q;
  };
  SAT.getQ = function (id) {
    if (SAT.qById[id]) return SAT.qById[id];
    const m = /^g:(.+):(\d+):(\d+)$/.exec(id);
    return m ? SAT.genQ(m[1], +m[2], +m[3]) : null;
  };

  SAT.init = function () {
    // порядок тем: по доменам, внутри домена — по порядку объявления; topic.after вставляет тему после указанной
    const dIdx = (t) => SAT.DOMAINS.findIndex((d) => d.id === t.domain);
    const base = SAT.topics.filter((t) => !t.after).sort((a, b) => dIdx(a) - dIdx(b) || (b.first ? 1 : 0) - (a.first ? 1 : 0));
    SAT.topics.filter((t) => t.after).forEach((t) => {
      const i = base.findIndex((x) => x.id === t.after);
      base.splice(i < 0 ? base.length : i + 1, 0, t);
    });
    SAT.topics = base;
    SAT.questions = [];
    SAT.qById = {};
    SAT.tById = {};
    SAT.topics.forEach((t) => {
      SAT.tById[t.id] = t;
      t.questions.forEach((q, i) => {
        q.id = t.id + '-' + (i + 1);
        q.topic = t.id;
        q.domain = t.domain;
        q.section = t.section;
        if (SAT.passages && SAT.passages[q.id]) q.passage = SAT.passages[q.id]; // расширенный текст (data/passages-rw-*.js)
        (SAT.patches && SAT.patches[q.id] || []).forEach(([from, to]) => {
          const k = q.choices.indexOf(from);
          if (k >= 0) q.choices[k] = to; else console.warn('patch: вариант не найден в ' + q.id + ': ' + from);
        });
        spreadAnswer(q);
        SAT.questions.push(q);
        SAT.qById[q.id] = q;
      });
    });
  };
  SAT.domain = (id) => SAT.DOMAINS.find((d) => d.id === id);
  SAT.topicsOf = (domainId) => SAT.topics.filter((t) => t.domain === domainId);

  /* ---------- Утилиты ---------- */
  const U = (SAT.util = {});
  U.rng = function (seed) { // mulberry32
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  U.shuffle = (arr, rnd) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor((rnd || Math.random)() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  U.fmtTime = (sec) => {
    sec = Math.max(0, Math.round(sec));
    const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    const p = (n) => String(n).padStart(2, '0');
    return h ? `${h}:${p(m)}:${p(s)}` : `${p(m)}:${p(s)}`;
  };
  U.pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
  U.date = (ts) => new Date(ts).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
  U.esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  U.dayKey = (ts) => new Date(ts).toISOString().slice(0, 10);

  /* ---------- Проверка ответов ---------- */
  function parseNum(s) {
    s = String(s).trim().replace(/\s+/g, '').replace(',', '.');
    if (/^-?\d*\.?\d+$/.test(s)) return parseFloat(s);
    const m = s.match(/^(-?\d+)\/(\d+)$/);
    if (m && +m[2] !== 0) return +m[1] / +m[2];
    return NaN;
  }
  SAT.isCorrect = function (q, given) {
    if (given === undefined || given === null || given === '') return false;
    if (q.type === 'mc') return given === q.answer;
    const v = parseNum(given);
    if (Number.isNaN(v)) return false;
    return q.answer.some((a) => {
      const t = parseNum(a);
      return Math.abs(t - v) < (Number.isInteger(t) ? 1e-9 : 0.0011);
    });
  };
  SAT.answerText = (q) => (q.type === 'mc' ? 'ABCD'[q.answer] + ') ' + q.choices[q.answer] : q.answer[0]);

  /* ---------- Оценка результата ---------- */
  // Приблизительная шкала 200–800 для адаптивной секции. Официальной таблицы для
  // каждого теста нет, поэтому это оценка: второй модуль «hard» открывает потолок 800,
  // «easy» ограничивает результат примерно 650.
  SAT.estimateSection = function (correct, total, level) {
    const r = total ? correct / total : 0;
    const raw = level === 'easy' ? 200 + 450 * r : 300 + 500 * r;
    return Math.max(200, Math.min(800, Math.round(raw / 10) * 10));
  };

  /* ---------- Хранилище (localStorage) ---------- */
  const KEY = 'satbootcamp.v1';
  let mem = null;
  function fresh() { return { current: null, profiles: {} }; }
  function read() {
    if (mem) return mem;
    try { mem = JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch (e) { mem = fresh(); }
    return mem;
  }
  function write() { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { /* режим без хранилища */ } }

  const store = (SAT.store = {});
  store.names = () => Object.keys(read().profiles);
  store.name = () => read().current;
  store.p = () => read().profiles[read().current];
  store.create = (name) => {
    const db = read();
    name = name.trim().slice(0, 24);
    if (!name) return false;
    if (!db.profiles[name]) db.profiles[name] = { created: Date.now(), lessons: {}, qs: {}, tests: [], days: {}, examDate: '' };
    db.current = name; write(); return true;
  };
  store.switchTo = (name) => { const db = read(); if (db.profiles[name]) { db.current = name; write(); } };
  store.remove = (name) => {
    const db = read(); delete db.profiles[name];
    db.current = Object.keys(db.profiles)[0] || null; write();
  };
  store.logout = () => { read().current = null; write(); };
  store.save = write;
  function touch(p) { const k = U.dayKey(Date.now()); p.days[k] = (p.days[k] || 0) + 1; }
  store.recordAnswer = (q, correct) => {
    const p = store.p(); if (!p) return;
    const r = p.qs[q.id] || { tries: 0, right: 0 };
    r.tries++; if (correct) r.right++;
    r.last = correct; r.ts = Date.now();
    p.qs[q.id] = r; touch(p); write();
    if (SAT.campus) SAT.campus.check();
  };
  store.setLesson = (tid, on) => {
    const p = store.p(); if (!p) return;
    if (on) { p.lessons[tid] = Date.now(); touch(p); } else delete p.lessons[tid];
    write();
    if (SAT.campus) SAT.campus.check();
  };
  store.addTest = (a) => { const p = store.p(); p.tests.push(a); touch(p); write(); if (SAT.campus) SAT.campus.check(); };
  store.setExamDate = (d) => { store.p().examDate = d; write(); };
  store.exportJSON = () => JSON.stringify(read(), null, 2);
  store.importJSON = (txt) => {
    const obj = JSON.parse(txt);
    if (!obj || typeof obj.profiles !== 'object') throw new Error('bad');
    mem = obj; write();
  };
  store.resetProfile = () => {
    const db = read(); const n = db.current;
    db.profiles[n] = { created: Date.now(), lessons: {}, qs: {}, tests: [], days: {}, examDate: '' }; write();
  };

  /* ---------- Статистика ---------- */
  SAT.stats = {
    topic(tid) {
      const t = SAT.tById[tid], p = store.p();
      let answered = 0, right = 0;
      t.questions.forEach((q) => {
        const r = p.qs[q.id];
        if (r) { answered++; if (r.last) right++; }
      });
      const total = t.questions.length;
      const studied = !!p.lessons[tid];
      let status = 'new';
      if (studied || answered) status = 'prog';
      if (studied && answered === total && right / total >= 0.7) status = 'done';
      return { answered, right, total, studied, status, acc: answered ? right / answered : 0 };
    },
    overall() {
      const p = store.p();
      let tries = 0, right = 0;
      Object.values(p.qs).forEach((r) => { tries += r.tries; right += r.right; });
      const done = SAT.topics.filter((t) => SAT.stats.topic(t.id).status === 'done').length;
      const studied = Object.keys(p.lessons).length;
      const scores = p.tests.map((t) => t.total);
      return { tries, right, done, studied, tests: p.tests.length, best: scores.length ? Math.max.apply(null, scores) : null, qUnique: Object.keys(p.qs).length };
    },
    streak() {
      const p = store.p(); let n = 0; const d = new Date();
      for (;;) {
        const k = U.dayKey(d.getTime());
        if (p.days[k]) n++; else if (n || k !== U.dayKey(Date.now())) break;
        d.setDate(d.getDate() - 1);
      }
      return n;
    },
    domainAcc(domainId) {
      const p = store.p(); let a = 0, r = 0;
      SAT.questions.filter((q) => q.domain === domainId).forEach((q) => {
        const x = p.qs[q.id]; if (x) { a++; if (x.last) r++; }
      });
      return { answered: a, right: r };
    },
  };
})();
