/* Запуск: инициализация данных, роутер, делегирование кликов */
(function () {
  'use strict';
  const S = window.SAT, ST = S.store;

  function route() {
    const parts = location.hash.replace(/^#\/?/, '').split('/');
    const page = parts[0] || '', arg = parts[1];
    const who = document.getElementById('who');
    who.textContent = ST.name() ? '★ ' + ST.name() : '';
    document.querySelectorAll('[data-nav]').forEach((a) => a.classList.toggle('active', a.dataset.nav === page));

    if (S.exam.active) { // во время теста другие страницы недоступны
      if (page !== 'exam') { location.hash = '#/exam'; return; }
      S.exam.resume();
      return;
    }
    if (!ST.p()) return S.views.welcome();
    if (page !== 'practice') S.leavePractice();
    switch (page) {
      case '': return S.views.home();
      case 'course': return S.views.course();
      case 'topic': return S.views.topic(arg);
      case 'practice': return S.views.practice(arg);
      case 'guide': return S.views.guide();
      case 'tests': return S.views.tests();
      case 'results': return S.views.results(arg);
      case 'cabinet': return S.views.cabinet();
      case 'exam': location.hash = '#/tests'; return;
      default: return S.views.notFound();
    }
  }
  S.refresh = route;

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]');
    if (!el || el.disabled) return;
    const fn = S.acts[el.dataset.act];
    if (fn) fn(el, e);
  });
  window.addEventListener('hashchange', route);

  S.init();
  route();
})();
