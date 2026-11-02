/* Math — Algebra и Advanced Math. Все задания оригинальные, формат Digital SAT. */
(function () {
  const { mc, sp } = SAT;

  SAT.addTopics([
    /* ================= ALGEBRA ================= */
    {
      id: 'm-lin1', section: 'math', domain: 'alg', title: 'Linear Equations in One Variable', ru: 'Линейные уравнения с одной переменной',
      lesson: `
<p>Базовый навык для всей математики на SAT: решить уравнение вида <code>ax + b = c</code> и понять, сколько у него решений.</p>
<div class="callout">Цель — <b>изолировать переменную</b>: всё с x в одну сторону, числа в другую. Что делаете с одной частью — делайте с другой.</div>
<h3>Шаги</h3>
<ol><li>Раскройте скобки.</li><li>Если есть дроби — умножьте обе части на общий знаменатель.</li><li>Соберите члены с x слева, числа справа.</li><li>Разделите на коэффициент при x.</li></ol>
<div class="example">2(x − 4) = 3x − 11 → 2x − 8 = 3x − 11 → −8 + 11 = 3x − 2x → <b>x = 3</b>.</div>
<h3>Сколько решений?</h3>
<table><tr><th>После упрощения</th><th>Решений</th></tr>
<tr><td>x = число</td><td>одно</td></tr>
<tr><td>0 = 0 (например 5x + 3 = 5x + 3)</td><td>бесконечно много</td></tr>
<tr><td>0 = 7 (например 5x + 3 = 5x + 10)</td><td>нет решений</td></tr></table>
<div class="trap">В «текстовых» задачах сначала запишите уравнение: «фиксированная плата + ставка × количество = итог».</div>`,
      questions: [
        mc(1, 'What is the solution to 3x + 7 = 25?', ['x = 5', 'x = 6', 'x = 7', 'x = 8'], 1, '3x = 18, поэтому <b>x = 6</b>.'),
        sp(1, 'If 2(x − 4) = 3x − 11, what is the value of x?', '3', '2x − 8 = 3x − 11 → 3 = x. <b>x = 3</b>.'),
        mc(2, 'What is the solution to (x + 3)/2 = (2x − 1)/3 ?', ['x = 9', 'x = 11', 'x = 13', 'x = 7'], 1, 'Перекрёстно: 3(x + 3) = 2(2x − 1) → 3x + 9 = 4x − 2 → <b>x = 11</b>.'),
        sp(3, 'In the equation 5(x − a) = 20 + 5x, a is a constant. For what value of a does the equation have infinitely many solutions?', '-4', '5x − 5a = 20 + 5x → −5a = 20 → <b>a = −4</b>. Тогда обе части совпадают при любом x.'),
        sp(2, 'A plumber charges $45 for a service call plus $30 per hour of work. If the total bill was $165, for how many hours did the plumber work?', '4', '45 + 30h = 165 → 30h = 120 → <b>h = 4</b>.'),
      ],
    },
    {
      id: 'm-lin2', section: 'math', domain: 'alg', title: 'Linear Functions and Equations in Two Variables', ru: 'Линейные функции и уравнения с двумя переменными',
      lesson: `
<p>Линейная функция описывает постоянное изменение: <code>y = mx + b</code>. Здесь <b>m</b> — угловой коэффициент (slope), <b>b</b> — значение при x = 0 (y-intercept).</p>
<div class="callout">Slope = <code>(y₂ − y₁)/(x₂ − x₁)</code>. В текстовых задачах slope — это «<b>на сколько меняется y при увеличении x на 1</b>» (ставка, скорость), а intercept — «<b>начальное значение</b>» (фиксированная плата).</div>
<h3>Что нужно уметь</h3>
<ul><li>Подставлять значение: f(4) для f(x) = 3x − 5 даёт 7.</li>
<li>Находить уравнение по двум точкам или по точке и наклону.</li>
<li>Интерпретировать числа в модели: C(m) = 25m + 60 → 25 за каждый месяц, 60 — разовый взнос.</li>
<li>Параллельные прямые — одинаковый slope; перпендикулярные — slope обратный по величине и знаку.</li></ul>
<div class="example">Прямая через (−2, 1) и (4, 10): slope = 9/6 = 1.5; y − 1 = 1.5(x + 2) → y = 1.5x + 4. Пересечение с осью y — <b>4</b>.</div>`,
      questions: [
        mc(1, 'The function f is defined by f(x) = 3x − 5. What is the value of f(4)?', ['5', '7', '9', '12'], 1, 'f(4) = 3·4 − 5 = 7.'),
        mc(1, 'What is the slope of the line in the xy-plane that passes through the points (2, 3) and (6, 11)?', ['1', '2', '3', '4'], 1, '(11 − 3)/(6 − 2) = 8/4 = <b>2</b>.'),
        mc(2, 'A line in the xy-plane has slope −3 and passes through the point (0, 4). Which equation represents the line?', ['y = 3x + 4', 'y = −3x + 4', 'y = −3x − 4', 'y = 4x − 3'], 1, 'Точка (0, 4) — это intercept b = 4, а m = −3: <b>y = −3x + 4</b>.'),
        mc(2, 'A gym’s total cost for m months is C(m) = 25m + 60. What does 25 represent in this context?', ['The one-time sign-up fee', 'The monthly fee', 'The total cost after one month', 'The number of months'], 1, '25 умножается на m (месяцы), значит это плата <b>за один месяц</b>. 60 — разовый взнос.'),
        sp(3, 'Line k passes through the points (−2, 1) and (4, 10) in the xy-plane. What is the y-coordinate of the point where k crosses the y-axis?', '4', 'Slope = 9/6 = 1.5. Из y − 1 = 1.5(x + 2) при x = 0: y = 1 + 3 = <b>4</b>.'),
      ],
    },
    {
      id: 'm-systems', section: 'math', domain: 'alg', title: 'Systems of Linear Equations', ru: 'Системы линейных уравнений',
      lesson: `
<p>Система — это два уравнения с двумя переменными. Решение — точка пересечения прямых.</p>
<div class="callout">Два метода: <b>подстановка</b> (выразить одну переменную и подставить) и <b>сложение</b> (умножить уравнения так, чтобы одна переменная ушла).</div>
<h3>Число решений</h3>
<table><tr><th>Прямые</th><th>Решений</th><th>Признак</th></tr>
<tr><td>Пересекаются</td><td>одно</td><td>разные slope</td></tr>
<tr><td>Параллельны</td><td>нет</td><td>одинаковый slope, разный intercept</td></tr>
<tr><td>Совпадают</td><td>бесконечно много</td><td>уравнения пропорциональны</td></tr></table>
<div class="example">2x + 3y = 12 и 4x + 6y = k. Второе = 2×первое, если k = <b>24</b> → бесконечно много решений. При другом k — нет решений.</div>
<div class="trap">Текстовые задачи: заведите две переменные и две связи («всего билетов» и «общая выручка»).</div>`,
      questions: [
        mc(1, 'If x + y = 10 and x − y = 4, what is the value of x?', ['3', '5', '7', '9'], 2, 'Сложим уравнения: 2x = 14 → <b>x = 7</b> (и y = 3).'),
        sp(2, 'The system 2x + 3y = 12 and 4x + 6y = k has infinitely many solutions. What is the value of k?', '24', 'Второе уравнение должно быть первым, умноженным на 2: k = 2·12 = <b>24</b>.'),
        mc(2, 'Adult tickets cost $12 and child tickets cost $7. A total of 30 tickets were sold for $290. How many adult tickets were sold?', ['14', '16', '18', '20'], 1, 'a + c = 30 и 12a + 7c = 290. Подставим c = 30 − a: 5a + 210 = 290 → <b>a = 16</b>.'),
        sp(3, 'In the system 3x − y = 5 and ax + 2y = 4, a is a constant. If the system has no solution, what is the value of a?', '-6', 'Нет решений → параллельные. Slope первой = 3. Вторая: y = (−a/2)x + 2, значит −a/2 = 3 → <b>a = −6</b> (intercept 2 ≠ −5, поэтому прямые различны).'),
        mc(2, 'The system y = 2x − 1 and y = −x + 8 has solution (x, y). What is the value of x + y?', ['6', '7', '8', '9'], 2, '2x − 1 = −x + 8 → x = 3, y = 5. x + y = <b>8</b>.'),
      ],
    },
    {
      id: 'm-ineq', section: 'math', domain: 'alg', title: 'Linear Inequalities', ru: 'Линейные неравенства',
      lesson: `
<p>Решаются как уравнения, но с одним важным правилом.</p>
<div class="callout">Если умножаете или делите неравенство на <b>отрицательное</b> число — знак неравенства <b>меняется на противоположный</b>.</div>
<h3>Что встретится</h3>
<ul><li>Решить: −2x + 7 ≤ 1 → −2x ≤ −6 → <b>x ≥ 3</b>.</li>
<li>Текстовые: «не больше», «максимум» → ≤; «хотя бы», «минимум» → ≥.</li>
<li>Системы неравенств: подставляйте точки из вариантов в <b>оба</b> неравенства.</li>
<li>Если решение — все x &gt; 3, а формула даёт x &gt; (11 − k)/2, приравняйте (11 − k)/2 = 3.</li></ul>
<div class="example">Бюджет $200, баннер $12, уже потрачено $44: 12b + 44 ≤ 200 → b ≤ 13. Наибольшее <b>целое</b> число баннеров — 13.</div>
<div class="trap">Для «строгих» знаков (&lt;, &gt;) крайнее значение <b>не входит</b> в решение — учитывайте при вопросе «наименьшее целое».</div>`,
      questions: [
        mc(1, 'Which inequality is equivalent to 3x − 5 > 10?', ['x > 5', 'x < 5', 'x > 15', 'x < −5'], 0, '3x > 15 → <b>x > 5</b>.'),
        sp(2, 'What is the smallest integer value of x that satisfies −2x + 7 ≤ 1?', '3', '−2x ≤ −6; делим на −2 и меняем знак: x ≥ 3. Наименьшее целое — <b>3</b>.'),
        sp(2, 'A school club has a budget of $200 and has already committed $44 of it. Banners cost $12 each. What is the greatest number of banners the club can buy?', '13', '12b + 44 ≤ 200 → b ≤ 13. Ответ <b>13</b>.'),
        mc(3, 'Which ordered pair (x, y) satisfies both y > 2x − 3 and y < −x + 6?', ['(3, 4)', '(1, 2)', '(0, −4)', '(2, 5)'], 1, 'Проверка (1, 2): 2 > −1 ✔ и 2 < 5 ✔. (3, 4): 4 < 3 ✘. (0, −4): −4 > −3 ✘. (2, 5): 5 < 4 ✘.'),
        sp(3, 'The solution set of the inequality 2x + k > 11 is x > 3. What is the value of k?', '5', '2x > 11 − k → x > (11 − k)/2 = 3 → 11 − k = 6 → <b>k = 5</b>.'),
      ],
    },

    /* ================= ADVANCED MATH ================= */
    {
      id: 'm-equiv', section: 'math', domain: 'adv', title: 'Equivalent Expressions', ru: 'Эквивалентные выражения и преобразования',
      lesson: `
<p>Нужно упрощать, раскрывать скобки и раскладывать на множители. Главные формулы — выучите наизусть:</p>
<table><tr><th>Формула</th><th>Результат</th></tr>
<tr><td>(a + b)²</td><td>a² + 2ab + b²</td></tr>
<tr><td>(a − b)²</td><td>a² − 2ab + b²</td></tr>
<tr><td>(a + b)(a − b)</td><td>a² − b²</td></tr>
<tr><td>(x + p)(x + q)</td><td>x² + (p + q)x + pq</td></tr></table>
<div class="callout">Раскладывайте на множители: сначала <b>общий множитель</b> (3x² + 6x = 3x(x + 2)), потом формулы.</div>
<h3>Дроби</h3>
<p>(x² − 9)/(x − 3) = (x − 3)(x + 3)/(x − 3) = <b>x + 3</b>, при x ≠ 3.</p>
<div class="trap">Нельзя «сокращать слагаемые»: (x + 3)/3 ≠ x + 1. Сокращаются только множители.</div>`,
      questions: [
        mc(1, 'Which expression is equivalent to (x + 3)(x − 2)?', ['x² − 6', 'x² + x − 6', 'x² + 5x − 6', 'x² − x − 6'], 1, 'x² − 2x + 3x − 6 = <b>x² + x − 6</b>.'),
        mc(2, 'Which expression is equivalent to 3x² + 6x?', ['3x(x + 2)', '3(x² + 6x)', 'x(3x + 6x)', '9x²'], 0, 'Общий множитель 3x: 3x(x + 2).'),
        mc(2, 'Which expression is equivalent to (2x + 1)²?', ['4x² + 1', '4x² + 2x + 1', '4x² + 4x + 1', '2x² + 4x + 1'], 2, '(2x)² + 2·2x·1 + 1² = <b>4x² + 4x + 1</b>.'),
        mc(3, 'For x ≠ 3, which expression is equivalent to (x² − 9)/(x − 3)?', ['x − 3', 'x + 3', 'x² − 3', '3'], 1, 'Разность квадратов: x² − 9 = (x − 3)(x + 3). После сокращения остаётся <b>x + 3</b>.'),
        sp(3, 'If 4x² − 20x + 25 = (ax − b)², where a and b are positive constants, what is the value of a + b?', '7', '4x² − 20x + 25 = (2x − 5)², поэтому a = 2, b = 5 и a + b = <b>7</b>.'),
      ],
    },
    {
      id: 'm-quad', section: 'math', domain: 'adv', title: 'Nonlinear Equations and Quadratics', ru: 'Нелинейные уравнения и квадратные уравнения',
      lesson: `
<p>Квадратное уравнение <code>ax² + bx + c = 0</code>. Три способа решения: разложение на множители, формула, выделение полного квадрата.</p>
<div class="callout"><b>Дискриминант</b> D = b² − 4ac:<br>D &gt; 0 → два вещественных корня; D = 0 → один корень; D &lt; 0 → вещественных корней нет.</div>
<h3>Формула корней</h3>
<p><code>x = (−b ± √(b² − 4ac)) / 2a</code>. Сумма корней = −b/a, произведение = c/a.</p>
<div class="example">x² − 5x + 6 = 0 → (x − 2)(x − 3) = 0 → x = 2 или 3. Сумма корней = 5 = −(−5)/1 ✔.</div>
<h3>Пересечение прямой и параболы</h3>
<p>Приравняйте правые части: x² − 4 = 2x − 1 → x² − 2x − 3 = 0 → x = 3 или −1; затем найдите y.</p>
<div class="trap">Подставляя найденные x, проверяйте, что точка принадлежит <b>обоим</b> графикам.</div>`,
      questions: [
        mc(1, 'What is the sum of the solutions to x² − 5x + 6 = 0?', ['2', '3', '5', '6'], 2, '(x − 2)(x − 3) = 0 → 2 + 3 = <b>5</b>.'),
        mc(2, 'How many real solutions does the equation x² − 8x + 16 = 0 have?', ['0', '1', '2', '4'], 1, 'x² − 8x + 16 = (x − 4)²; D = 64 − 64 = 0 → <b>одно</b> решение.'),
        sp(2, 'What is the positive solution to 2x² − 3x − 5 = 0?', ['5/2', '2.5'], '(2x − 5)(x + 1) = 0 → x = 5/2 или x = −1. Положительное: <b>5/2</b>.'),
        sp(3, 'The equation x² + bx + 36 = 0, where b is a positive constant, has exactly one real solution. What is the value of b?', '12', 'D = b² − 144 = 0 → b = 12 (b положительно).'),
        mc(3, 'Which ordered pair is a solution to the system y = x² − 4 and y = 2x − 1?', ['(3, 5)', '(−3, −7)', '(1, 1)', '(−1, 3)'], 0, 'x² − 4 = 2x − 1 → x² − 2x − 3 = 0 → x = 3 или −1. При x = 3: y = 5. Точка <b>(3, 5)</b>; (−1, −3) не в списке.'),
      ],
    },
    {
      id: 'm-nonlinear', section: 'math', domain: 'adv', title: 'Nonlinear Functions', ru: 'Нелинейные функции: квадратичные и показательные',
      lesson: `
<p>На SAT встречаются квадратичные, показательные и иногда другие функции. Нужно уметь подставлять значения, читать параметры и интерпретировать их.</p>
<h3>Квадратичные</h3>
<p>Вершинная форма: <code>f(x) = a(x − h)² + k</code>. Вершина (h, k). Если a &lt; 0 — парабола вниз, <b>максимум = k</b>; если a &gt; 0 — минимум = k.</p>
<h3>Показательные</h3>
<p><code>f(t) = a · bᵗ</code>: a — начальное значение, b — множитель роста. Если b = 1 + r, то рост на r за период; если b = 1 − r, то убывание на r.</p>
<div class="callout">«Удваивается каждые 3 часа» → <code>P(t) = P₀ · 2^(t/3)</code>. Показатель — это <b>число периодов</b>, t делится на длину периода.</div>
<div class="example">V(t) = 24000(0.85)ᵗ: 0.85 = 1 − 0.15 → стоимость падает на <b>15%</b> в год.</div>`,
      questions: [
        mc(1, 'If f(x) = x² − 4x + 3, what is the value of f(5)?', ['3', '6', '8', '12'], 2, '25 − 20 + 3 = <b>8</b>.'),
        mc(2, 'A bacteria population starts at 500 and doubles every 3 hours. Which function gives the population P(t) after t hours?', ['P(t) = 500(2)^(3t)', 'P(t) = 500(2)^(t/3)', 'P(t) = 500(3)^(2t)', 'P(t) = 500 + 2t/3'], 1, 'Число удвоений равно t/3, поэтому <b>500·2^(t/3)</b>.'),
        sp(2, 'The function f is defined by f(x) = −(x − 2)² + 9. What is the maximum value of f?', '9', 'Вершинная форма с a = −1: максимум равен k = <b>9</b> (при x = 2).'),
        sp(3, 'The function g is defined by g(x) = 2ˣ. What is the value of g(x + 3)/g(x)?', '8', '2^(x+3)/2ˣ = 2³ = <b>8</b>.'),
        sp(3, 'A car’s value is modeled by V(t) = 24,000(0.85)ᵗ, where t is the number of years after purchase. By what percent does the car’s value decrease each year?', '15', '0.85 = 1 − 0.15, поэтому значение уменьшается на <b>15%</b> каждый год.'),
      ],
    },
  ]);
})();
