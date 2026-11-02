/* Math — недостающие по спецификации College Board темы. Оригинальные задания. */
(function () {
  const { mc, sp } = SAT;

  SAT.addTopics([
    /* ================= ALGEBRA ================= */
    {
      id: 'm-found', first: true, section: 'math', domain: 'alg', title: 'Math Foundations Review', ru: 'Основы: порядок действий, дроби, степени, формат ответов',
      lesson: `
<p>Это «разминка» перед основным курсом. Если здесь всё легко — переходите дальше; если нет — задержитесь: на этих навыках стоит вся остальная математика SAT.</p>
<h3>1. Порядок действий</h3>
<p><b>PEMDAS</b>: скобки → степени → умножение/деление (слева направо) → сложение/вычитание (слева направо).</p>
<div class="example">3 + 4 × (10 − 6)² ÷ 8 = 3 + 4 × 16 ÷ 8 = 3 + 8 = <b>11</b>.</div>
<h3>2. Дроби и десятичные</h3>
<ul><li>Сложение: общий знаменатель. 3/4 + 5/6 = 9/12 + 10/12 = 19/12.</li>
<li>«Часть от числа»: 3/5 от n = 24 → n = 24 · 5/3 = 40.</li>
<li>Десятичные → дроби: 0.35 = 35/100 = 7/20.</li></ul>
<h3>3. Отрицательные числа и степени</h3>
<ul><li>(−3)² = 9, но −3² = −9.</li><li>aᵐ · aⁿ = aᵐ⁺ⁿ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ; a⁻ⁿ = 1/aⁿ; a⁰ = 1.</li></ul>
<h3>4. Как отвечать на SAT Math</h3>
<div class="callout">В заданиях <b>student-produced response</b> (без вариантов) вводится число: до 5 символов (6 с минусом), дробь через «/» или десятичная. Десятичные округляйте не меньше, чем до 3–4 знаков, либо вводите дробью. Смешанные числа вроде 2 1/2 не принимаются — вводите 5/2 или 2.5.</div>
<h3>5. Инструменты экзамена</h3>
<ul><li><b>Desmos</b> встроен: можно вводить уравнения и смотреть точки пересечения — это быстрее для систем и квадратных уравнений.</li>
<li><b>Подстановка ответов</b> (backsolving): в заданиях с вариантами подставляйте ответы в условие.</li>
<li><b>Подстановка чисел</b>: если в задаче только переменные, возьмите простые числа (x = 2, y = 3).</li></ul>`,
      questions: [
        sp(1, 'What is the value of 3 + 4 × (10 − 6)² ÷ 8?', '11', '(10 − 6)² = 16; 4 × 16 ÷ 8 = 8; 3 + 8 = <b>11</b>.'),
        mc(1, 'What is the value of 3/4 + 5/6?', ['8/10', '19/12', '15/24', '4/5'], 1, 'Общий знаменатель 12: 9/12 + 10/12 = <b>19/12</b>.'),
        sp(1, 'What is the value of (−3)² − 2(−4)?', '17', '9 + 8 = <b>17</b>.'),
        mc(1, 'Which fraction is equal to 0.35?', ['7/20', '35/10', '3/5', '7/10'], 0, '0.35 = 35/100 = <b>7/20</b>.'),
        sp(2, 'If 3/5 of a number is 24, what is 1/4 of the number?', '10', 'Число = 24 · 5/3 = 40; 40/4 = <b>10</b>.'),
        mc(2, 'Which of the following numbers is the greatest?', ['3/7', '0.43', '4/9', '0.4'], 2, '3/7 ≈ 0.4286; 0.43; 4/9 ≈ 0.4444; 0.4. Наибольшее — <b>4/9</b>.'),
        sp(2, 'What is the value of 2⁵ ÷ 2² × 3?', '24', '2⁵ ÷ 2² = 2³ = 8; 8 × 3 = <b>24</b>.'),
        mc(3, 'What is the value of 2³ × 2⁻¹?', ['2', '4', '8', '16'], 1, '2³ · 2⁻¹ = 2² = <b>4</b>.'),
      ],
    },
    {
      id: 'm-graphs', after: 'm-lin2', section: 'math', domain: 'alg', title: 'Graphs of Linear Equations and Inequalities', ru: 'Графики линейных уравнений и неравенств',
      lesson: `
<p>Нужно уметь переходить между уравнением, графиком и таблицей, а также работать с неравенствами с двумя переменными.</p>
<h3>Формы записи прямой</h3>
<table><tr><th>Форма</th><th>Вид</th><th>Что видно сразу</th></tr>
<tr><td>Slope-intercept</td><td>y = mx + b</td><td>наклон m, пересечение с y — b</td></tr>
<tr><td>Standard</td><td>Ax + By = C</td><td>x-intercept = C/A, y-intercept = C/B, slope = −A/B</td></tr>
<tr><td>Point-slope</td><td>y − y₁ = m(x − x₁)</td><td>точка и наклон</td></tr></table>
<h3>Параллельные и перпендикулярные</h3>
<ul><li>Параллельные: одинаковый slope.</li><li>Перпендикулярные: m₁ · m₂ = −1.</li></ul>
<h3>Неравенства</h3>
<div class="callout">Граница — прямая. <b>≤ или ≥</b> — сплошная линия (точки на границе входят), <b>&lt; или &gt;</b> — пунктирная. Чтобы понять, какая сторона закрашена, подставьте <b>пробную точку</b> (например, (0, 0)).</div>
<div class="example">y ≤ −x + 4, точка (1, 2): 2 ≤ −1 + 4 = 3 ✔ — точка входит в решение.</div>
<div class="trap">Чтобы найти slope из Ax + By = C, не забудьте знак минус: slope = <b>−A/B</b>.</div>`,
      questions: [
        mc(1, 'What is the slope of the line 2x + 3y = 12?', ['2/3', '−2/3', '3/2', '−3/2'], 1, '3y = −2x + 12 → y = −(2/3)x + 4. Slope <b>−2/3</b>.'),
        sp(1, 'What is the x-intercept of the line 3x + 4y = 24?', '8', 'При y = 0: 3x = 24 → <b>x = 8</b>.'),
        sp(2, 'What is the y-intercept of the line 5x − 2y = 20?', '-10', 'При x = 0: −2y = 20 → <b>y = −10</b>.'),
        mc(2, 'Which equation represents the line through (2, 7) that is parallel to y = 3x − 1?', ['y = 3x + 1', 'y = 3x − 1', 'y = −x/3 + 7', 'y = 3x + 7'], 0, 'Slope 3: y − 7 = 3(x − 2) → y = 3x + 1.'),
        mc(2, 'Which point is a solution to the inequality y ≤ −x + 4?', ['(2, 3)', '(1, 2)', '(4, 1)', '(0, 5)'], 1, '(1, 2): 2 ≤ 3 ✔. (2, 3): 3 ≤ 2 ✘. (4, 1): 1 ≤ 0 ✘. (0, 5): 5 ≤ 4 ✘.'),
        sp(3, 'Line ℓ has equation y = −2x + 10. Line m is perpendicular to ℓ and passes through the origin. If ℓ and m intersect at (a, b), what is the value of a + b?', '6', 'm: y = x/2. x/2 = −2x + 10 → x = 4, y = 2. a + b = <b>6</b>.'),
        mc(2, 'A line passes through (0, −3) and (2, 1). Which equation represents the line?', ['y = 2x − 3', 'y = −2x − 3', 'y = 2x + 3', 'y = x/2 − 3'], 0, 'Slope = 4/2 = 2, intercept −3 → <b>y = 2x − 3</b>.'),
        sp(3, 'The graph of ax + by = 12 passes through (2, 0) and (0, 3). What is the value of a + b?', '10', '2a = 12 → a = 6; 3b = 12 → b = 4. a + b = <b>10</b>.'),
      ],
    },

    /* ================= ADVANCED MATH ================= */
    {
      id: 'm-poly', after: 'm-equiv', section: 'math', domain: 'adv', title: 'Exponents, Radicals, and Polynomials', ru: 'Степени, корни и многочлены',
      lesson: `
<p>Алгебраические преобразования — основа большинства заданий Advanced Math.</p>
<h3>Правила степеней</h3>
<table><tr><th>Правило</th><th>Пример</th></tr>
<tr><td>aᵐ · aⁿ = aᵐ⁺ⁿ</td><td>x³ · x⁴ = x⁷</td></tr>
<tr><td>(aᵐ)ⁿ = aᵐⁿ</td><td>(x²)³ = x⁶</td></tr>
<tr><td>(ab)ⁿ = aⁿbⁿ</td><td>(3x²y³)² = 9x⁴y⁶</td></tr>
<tr><td>a^(m/n) = ⁿ√(aᵐ)</td><td>x^(3/2) = √(x³)</td></tr>
<tr><td>a⁻ⁿ = 1/aⁿ</td><td>2⁻³ = 1/8</td></tr></table>
<div class="callout">Если у уравнения с неизвестной в показателе слева и справа можно получить <b>одно основание</b> — приравняйте показатели: 2^(x+1) = 32 = 2⁵ → x + 1 = 5.</div>
<h3>Корни</h3>
<p>√50 = √(25·2) = 5√2. Выносите полные квадраты из-под корня.</p>
<h3>Многочлены</h3>
<ul><li>При вычитании меняйте знак у <b>каждого</b> члена во второй скобке.</li>
<li><b>Теорема о делении (remainder theorem)</b>: остаток от деления p(x) на (x − a) равен p(a). Если p(a) = 0, то (x − a) — множитель.</li></ul>
<div class="trap">(x + y)² ≠ x² + y². Всегда раскрывайте: x² + 2xy + y².</div>`,
      questions: [
        mc(1, 'Which expression is equivalent to (x³)(x⁴)?', ['x⁷', 'x¹²', '2x⁷', 'x⁻¹'], 0, 'Показатели складываются: <b>x⁷</b>.'),
        sp(1, 'If 2^(x+1) = 32, what is the value of x?', '4', '32 = 2⁵ → x + 1 = 5 → <b>x = 4</b>.'),
        mc(2, 'Which expression is equivalent to √50?', ['25√2', '5√2', '10√5', '2√5'], 1, '√50 = √(25 · 2) = <b>5√2</b>.'),
        sp(2, 'The expression (2x² − 3x + 1) − (x² − 5x + 4) can be written as x² + bx + c. What is the value of b + c?', '-1', '= x² + 2x − 3, поэтому b = 2, c = −3, b + c = <b>−1</b>.'),
        mc(2, 'For x > 0, which expression is equivalent to x^(3/2)?', ['√(x³)', '³√(x²)', '(3/2)x', '√x + x'], 0, 'a^(m/n) = ⁿ√(aᵐ): показатель 3/2 → <b>√(x³)</b>.'),
        sp(3, 'The polynomial p(x) = x³ − 4x² + kx + 6 is divisible by x − 2. What is the value of k?', '1', 'p(2) = 8 − 16 + 2k + 6 = 2k − 2 = 0 → <b>k = 1</b>.'),
        mc(2, 'Which expression is equivalent to (3x²y³)²?', ['6x⁴y⁶', '9x⁴y⁶', '9x²y³', '3x⁴y⁶'], 1, 'Возводим каждый множитель: 3² · x⁴ · y⁶ = <b>9x⁴y⁶</b>.'),
        sp(3, 'If 3ᵃ · 9ᵇ = 3⁷ and a = 1, what is the value of b?', '3', '9ᵇ = 3²ᵇ. 3^(1 + 2b) = 3⁷ → 2b = 6 → <b>b = 3</b>.'),
      ],
    },
    {
      id: 'm-radrat', after: 'm-quad', section: 'math', domain: 'adv', title: 'Radical, Rational, and Absolute Value Equations', ru: 'Радикальные, рациональные уравнения и модуль',
      lesson: `
<p>Нелинейные уравнения с одной переменной бывают не только квадратными.</p>
<h3>Радикальные</h3>
<ol><li>Изолируйте корень.</li><li>Возведите обе части в квадрат.</li><li><b>Обязательно проверьте корни</b> подстановкой — появляются посторонние решения.</li></ol>
<div class="example">x = √(x + 6) → x² = x + 6 → x = 3 или −2. Проверка: x = −2 даёт −2 = √4 = 2 ✘. Ответ: <b>x = 3</b>.</div>
<h3>Рациональные</h3>
<p>Умножьте всё на общий знаменатель, решите, затем <b>исключите значения, обращающие знаменатель в 0</b>.</p>
<h3>Модуль</h3>
<div class="callout">|A| = c (c &gt; 0) даёт два случая: A = c или A = −c. Если c &lt; 0 — решений нет, модуль не бывает отрицательным.</div>
<div class="trap">Модуль |x − a| = b даёт решения a ± b: их сумма всегда 2a.</div>`,
      questions: [
        sp(1, 'If √(x + 5) = 4, what is the value of x?', '11', 'x + 5 = 16 → <b>x = 11</b>.'),
        sp(2, 'What is the sum of the solutions to |2x − 6| = 10?', '6', '2x − 6 = 10 → x = 8; 2x − 6 = −10 → x = −2. Сумма <b>6</b>.'),
        mc(2, 'What is the solution to x = √(x + 6)?', ['−2', '3', '−2 and 3', 'There is no solution'], 1, 'x² = x + 6 → x = 3 или −2. Проверка: −2 ≠ √4, поэтому <b>3</b>.'),
        sp(2, 'If 6/(x − 1) = 2, what is the value of x?', '4', 'x − 1 = 3 → <b>x = 4</b>.'),
        sp(3, 'If x/(x − 4) = 2/(x − 4) + 3, what is the value of x?', '5', 'Умножим на (x − 4): x = 2 + 3(x − 4) → −2x = −10 → <b>x = 5</b> (≠ 4 ✔).'),
        mc(2, 'How many solutions does |x + 2| = −3 have?', ['None', 'One', 'Two', 'Infinitely many'], 0, 'Модуль не может быть отрицательным: <b>решений нет</b>.'),
        sp(3, 'If √(3x + 4) = x and x > 0, what is the value of x?', '4', '3x + 4 = x² → x² − 3x − 4 = 0 → x = 4 или −1. Положительный: <b>4</b>.'),
        sp(2, 'What is the product of the solutions to |x − 5| = 3?', '16', 'x = 8 или x = 2. Произведение <b>16</b>.'),
      ],
    },
    {
      id: 'm-quadfun', after: 'm-radrat', section: 'math', domain: 'adv', title: 'Quadratic Functions and Parabolas', ru: 'Квадратичные функции и параболы',
      lesson: `
<p>Парабола — самая частая нелинейная функция на SAT. Три формы записи, каждая показывает своё:</p>
<table><tr><th>Форма</th><th>Вид</th><th>Что видно</th></tr>
<tr><td>Standard</td><td>ax² + bx + c</td><td>y-intercept = c; вершина x = −b/2a</td></tr>
<tr><td>Vertex</td><td>a(x − h)² + k</td><td>вершина (h, k)</td></tr>
<tr><td>Factored</td><td>a(x − r₁)(x − r₂)</td><td>нули r₁ и r₂</td></tr></table>
<div class="callout">Вершина — <b>максимум</b> (если a &lt; 0) или <b>минимум</b> (если a &gt; 0). Ось симметрии: x = −b/2a, она лежит посередине между нулями.</div>
<h3>Число x-пересечений</h3>
<p>D = b² − 4ac: D &gt; 0 — два, D = 0 — одно (вершина на оси), D &lt; 0 — ни одного.</p>
<div class="example">h(t) = −5t² + 20t + 1: вершина при t = −20/(2·(−5)) = 2, высота = −20 + 40 + 1 = <b>21</b>.</div>
<div class="trap">В текстовых задачах уточняйте, о чём спрашивают: <b>когда</b> достигается максимум (t) или <b>чему он равен</b> (h).</div>`,
      questions: [
        sp(1, 'What is the x-coordinate of the vertex of f(x) = x² − 6x + 5?', '3', 'x = −b/2a = 6/2 = <b>3</b>.'),
        mc(1, 'What is the vertex of the graph of f(x) = −2(x − 1)² + 8?', ['(−1, 8)', '(1, 8)', '(1, −8)', '(2, 8)'], 1, 'Вершинная форма a(x − h)² + k даёт <b>(1, 8)</b>.'),
        sp(2, 'What is the product of the zeros of f(x) = x² − 7x + 10?', '10', '(x − 2)(x − 5): нули 2 и 5, произведение <b>10</b> (= c).'),
        sp(2, 'The function f(x) = x² − 4x + k has a minimum value of 1. What is the value of k?', '5', 'Вершина при x = 2: f(2) = 4 − 8 + k = k − 4 = 1 → <b>k = 5</b>.'),
        mc(2, 'At which x-values does the graph of y = (x − 2)(x + 4) cross the x-axis?', ['2 and 4', '−2 and 4', '2 and −4', '−2 and −4'], 2, 'Нули: x = 2 и x = −4.'),
        sp(2, 'A ball’s height, in meters, is h(t) = −5t² + 20t + 1 where t is time in seconds. What is the maximum height, in meters?', '21', 'Вершина при t = 2: h(2) = −20 + 40 + 1 = <b>21</b>.'),
        sp(3, 'A parabola has the form f(x) = ax² + bx + c, passes through (0, 3), and has vertex (1, 2). What is the value of a?', '1', 'f(x) = a(x − 1)² + 2; f(0) = a + 2 = 3 → <b>a = 1</b>.'),
        mc(3, 'For which value of k does x² + 6x + k = 0 have no real solutions?', ['5', '8', '9', '10'], 3, 'D = 36 − 4k &lt; 0 → k &gt; 9. Из вариантов подходит <b>10</b> (при 9 — одно решение).'),
      ],
    },
    {
      id: 'm-expo', after: 'm-nonlinear', section: 'math', domain: 'adv', title: 'Exponential Growth and Decay', ru: 'Показательный рост и убывание',
      lesson: `
<p>Модель: <code>f(t) = a · bᵗ</code>. Здесь <b>a</b> — начальное значение, <b>b</b> — множитель за период.</p>
<h3>Что скрыто в b</h3>
<ul><li>b = 1 + r (b &gt; 1): рост на r (например, 1.05 → +5%).</li>
<li>b = 1 − r (0 &lt; b &lt; 1): убывание на r (0.95 → −5%).</li></ul>
<div class="callout">Если период — не 1 единица времени, то показатель — <b>t, делённое на длину периода</b>. «Удваивается каждые 3 года»: f(t) = a · 2^(t/3). «Период полураспада 5 дней»: a · (1/2)^(t/5).</div>
<h3>Сложные проценты</h3>
<p><code>A = P(1 + r/n)^(nt)</code>: P — вклад, r — годовая ставка, n — число начислений в год, t — годы.</p>
<div class="example">80 г вещества, полураспад 5 дней. Через 15 дней — 3 периода: 80 · (1/2)³ = <b>10 г</b>.</div>`,
      questions: [
        sp(1, 'The function P is defined by P(t) = 200 · 2ᵗ. What is the value of P(4)?', '3200', '200 · 16 = <b>3200</b>.'),
        mc(1, 'The function f(x) = 500(1.05)ˣ models a quantity. By what percent does the quantity increase for each increase of 1 in x?', ['0.05%', '5%', '50%', '105%'], 1, '1.05 = 1 + 0.05 → <b>5%</b>.'),
        sp(2, 'A radioactive sample has a half-life of 5 days. If the sample initially has 80 grams, how many grams remain after 15 days?', '10', '15 дней = 3 периода: 80 · (1/2)³ = <b>10</b>.'),
        mc(2, 'A $1,000 investment earns 6% interest compounded annually. Which expression gives the value after t years?', ['1000(0.06)ᵗ', '1000(1.06)ᵗ', '1000 + 0.06t', '1000(1 + 6)ᵗ'], 1, 'Множитель за год 1.06: <b>1000(1.06)ᵗ</b>.'),
        sp(2, 'The number of bacteria is modeled by N(t) = 1200(0.95)ᵗ. By what percent does the number decrease each period?', '5', '0.95 = 1 − 0.05 → <b>5%</b>.'),
        sp(3, 'A population of 50 triples every 4 years. How large is the population after 8 years?', '450', 'Два периода: 50 · 3² = <b>450</b>.'),
        mc(3, 'A quantity doubles every 3 years. Which function models the quantity f(t) after t years, starting with amount a?', ['a · 2^(3t)', 'a · 2^(t/3)', 'a · 3^(t/2)', 'a · (t/3)²'], 1, 'Число удвоений t/3 → <b>a · 2^(t/3)</b>.'),
        sp(3, 'The value of an account is modeled by A(t) = 800(1.5)^(t/2). What is the value of A(4)?', '1800', 'A(4) = 800 · 1.5² = 800 · 2.25 = <b>1800</b>.'),
      ],
    },
    {
      id: 'm-transform', after: 'm-expo', section: 'math', domain: 'adv', title: 'Function Transformations and Composition', ru: 'Преобразования и композиция функций',
      lesson: `
<p>Графики можно сдвигать, растягивать и отражать, а функции — подставлять одну в другую.</p>
<h3>Сдвиги и отражения</h3>
<table><tr><th>Запись</th><th>Действие с графиком y = f(x)</th></tr>
<tr><td>f(x) + k</td><td>вверх на k</td></tr>
<tr><td>f(x − h)</td><td><b>вправо</b> на h (знак «наоборот»)</td></tr>
<tr><td>−f(x)</td><td>отражение относительно оси x</td></tr>
<tr><td>f(−x)</td><td>отражение относительно оси y</td></tr></table>
<h3>Композиция</h3>
<div class="callout">f(g(x)) — сначала считаете <b>g(x)</b>, затем подставляете результат в f. Порядок важен: f(g(3)) ≠ g(f(3)).</div>
<div class="example">f(x) = 2x + 1, g(x) = x². g(3) = 9 → f(g(3)) = 19. Но f(3) = 7 → g(f(3)) = 49.</div>
<div class="trap">Если f имеет нули −2 и 5, то у f(x − 1) нули −1 и 6: сдвиг вправо на 1 прибавляет 1 к каждому нулю.</div>`,
      questions: [
        mc(1, 'The graph of g(x) = f(x) + 3 is obtained from the graph of f by which transformation?', ['Shift up 3 units', 'Shift down 3 units', 'Shift left 3 units', 'Shift right 3 units'], 0, 'Прибавление к значению функции — сдвиг <b>вверх</b>.'),
        mc(2, 'The graph of g(x) = f(x − 2) is obtained from the graph of f by which transformation?', ['Shift left 2 units', 'Shift right 2 units', 'Shift up 2 units', 'Shift down 2 units'], 1, 'f(x − 2) — сдвиг <b>вправо</b> на 2.'),
        sp(2, 'If f(x) = 2x + 1 and g(x) = x², what is the value of f(g(3))?', '19', 'g(3) = 9; f(9) = 19.'),
        sp(2, 'If f(x) = 2x + 1 and g(x) = x², what is the value of g(f(3))?', '49', 'f(3) = 7; g(7) = 49.'),
        mc(2, 'If f(x) = x² and g(x) = f(x + 4) − 1, what is the vertex of the graph of g?', ['(4, −1)', '(−4, −1)', '(−4, 1)', '(4, 1)'], 1, 'g(x) = (x + 4)² − 1: сдвиг влево на 4, вниз на 1 → <b>(−4, −1)</b>.'),
        sp(3, 'The function f is defined by f(x) = x² − 3x. If f(a) = f(0) and a ≠ 0, what is the value of a?', '3', 'f(0) = 0; a² − 3a = 0 → a = 3 (a ≠ 0).'),
        mc(3, 'The graph of y = f(x) has x-intercepts at −2 and 5. What are the x-intercepts of y = f(x − 1)?', ['−3 and 4', '−1 and 6', '−2 and 5', '−1 and 4'], 1, 'Сдвиг вправо на 1: <b>−1 и 6</b>.'),
        sp(3, 'The function f is defined by f(x) = 3x − 4. The linear function g satisfies f(g(x)) = 6x + 5. What is the value of g(0)?', '3', '3g(x) − 4 = 6x + 5 → g(x) = 2x + 3 → <b>g(0) = 3</b>.'),
      ],
    },

    /* ================= PROBLEM-SOLVING AND DATA ANALYSIS ================= */
    {
      id: 'm-percent', after: 'm-ratio', section: 'math', domain: 'psda', title: 'Percent Change, Discounts, and Interest', ru: 'Проценты: изменение, скидки, наценки, проценты по вкладу',
      lesson: `
<p>Проценты на SAT — это почти всегда умножение на множитель.</p>
<table><tr><th>Ситуация</th><th>Множитель</th></tr>
<tr><td>Скидка 20%</td><td>× 0.80</td></tr>
<tr><td>Наценка / налог 8%</td><td>× 1.08</td></tr>
<tr><td>Две подряд (+25%, −20%)</td><td>× 1.25 × 0.80 = ×1.00</td></tr></table>
<div class="callout"><b>Обратная задача</b>: «после скидки 20% цена 48» → x · 0.8 = 48 → x = 60. Не прибавляйте 20% к 48!</div>
<h3>Формулы</h3>
<ul><li>Процент от числа: 15% от 240 = 0.15 · 240 = 36.</li>
<li>Какой процент: часть / целое · 100.</li>
<li>Простой процент: I = P·r·t.</li>
<li>Сложный: A = P(1 + r)ᵗ.</li></ul>
<div class="trap">Два снижения по 10% — это не 20%, а 1 − 0.9² = 19%.</div>`,
      questions: [
        sp(1, 'What is 15% of 240?', '36', '0.15 · 240 = <b>36</b>.'),
        sp(1, '18 is what percent of 72?', '25', '18/72 = 0.25 → <b>25%</b>.'),
        sp(2, 'After a 20% discount, the price of a coat is $48. What was the original price, in dollars?', '60', 'x · 0.8 = 48 → <b>x = 60</b>.'),
        mc(2, 'A quantity increases by 25% and then decreases by 20%. What is the net change?', ['5% increase', 'No change', '5% decrease', '45% increase'], 1, '1.25 · 0.80 = 1.00 → <b>без изменений</b>.'),
        sp(2, 'A $800 deposit earns simple interest at 5% per year. How much interest, in dollars, is earned in 3 years?', '120', '800 · 0.05 · 3 = <b>120</b>.'),
        sp(3, 'A store marks up an item 40% above its cost and sells it for $84. What was the store’s cost, in dollars?', '60', 'cost · 1.4 = 84 → <b>60</b>.'),
        mc(3, 'When a number n is increased by 30%, the result is 91. What is the value of n?', ['65', '70', '75', '118.3'], 1, '1.3n = 91 → n = <b>70</b>.'),
        sp(3, 'A price is reduced by 10%, and the new price is then reduced by another 10%. The final price is what percent less than the original?', '19', '0.9 · 0.9 = 0.81 → снижение на <b>19%</b>.'),
      ],
    },
    {
      id: 'm-dist', after: 'm-stats', section: 'math', domain: 'psda', title: 'Data Distributions and Displays', ru: 'Распределения данных: таблицы, гистограммы, ящики с усами',
      lesson: `
<p>Данные приходят в виде таблицы частот, гистограммы, dot plot или box plot. Нужно уметь считать характеристики по ним и сравнивать наборы.</p>
<h3>Box plot (ящик с усами)</h3>
<p>Пять чисел: <b>min, Q1, median, Q3, max</b>. <b>IQR = Q3 − Q1</b> — размах средних 50% данных. Range = max − min.</p>
<h3>Таблица частот</h3>
<ul><li>Среднее = Σ(значение × частота) / Σ(частот).</li>
<li>Медиана — значение на средней позиции в упорядоченном списке (при n = 12 — среднее 6-го и 7-го).</li></ul>
<h3>Форма распределения</h3>
<div class="callout">Хвост вправо (right-skewed) → <b>mean &gt; median</b>. Хвост влево → mean &lt; median. Симметричное — примерно равны.</div>
<ul><li>Медиана и IQR <b>устойчивы к выбросам</b>; mean, range и SD — нет.</li>
<li>Среднее двух групп — <b>взвешенное</b> по их размерам.</li></ul>
<div class="example">Класс A: 20 человек, среднее 80; класс B: 30 человек, среднее 90. Общее среднее = (20·80 + 30·90)/50 = <b>86</b>, а не 85.</div>`,
      questions: [
        sp(1, 'A data set has minimum 4, first quartile 9, median 12, third quartile 18, and maximum 30. What is the interquartile range?', '9', 'IQR = Q3 − Q1 = 18 − 9 = <b>9</b>.'),
        sp(2, 'In a frequency table, the value 1 appears 2 times, the value 2 appears 5 times, and the value 3 appears 3 times. What is the mean of the data?', '2.1', '(2·1 + 5·2 + 3·3)/10 = 21/10 = <b>2.1</b>.'),
        sp(2, 'Scores: 70 appears 3 times, 80 appears 4 times, and 90 appears 5 times. What is the median score?', '80', 'n = 12; позиции 6 и 7 — оба равны 80. Медиана <b>80</b>.'),
        mc(2, 'A distribution is skewed to the right. Which statement is true?', ['The mean is greater than the median', 'The mean is less than the median', 'The mean equals the median', 'The standard deviation is zero'], 0, 'Длинный правый хвост «тянет» среднее вправо: <b>mean &gt; median</b>.'),
        sp(3, 'Class A has 20 students with an average score of 80. Class B has 30 students with an average score of 90. What is the average score of all 50 students?', '86', '(1600 + 2700)/50 = <b>86</b>.'),
        mc(2, 'Data set 1 has an IQR of 12 and data set 2 has an IQR of 20. Which statement must be true?', ['The middle 50% of data set 2 is more spread out', 'The range of data set 2 is greater', 'The mean of data set 2 is greater', 'Data set 1 has an outlier'], 0, 'IQR измеряет разброс средних 50% данных: у второго набора он <b>больше</b>. О range, mean и выбросах вывода нет.'),
        sp(3, 'The mean of 10 numbers is 15. If one of the numbers, 25, is replaced by 5, what is the new mean?', '13', 'Сумма 150 − 20 = 130; 130/10 = <b>13</b>.'),
        mc(3, 'Which measure of spread is least affected by an extreme outlier?', ['Range', 'Standard deviation', 'Interquartile range', 'Variance'], 2, 'IQR опирается на Q1 и Q3, выбросы почти не влияют.'),
      ],
    },

    /* ================= GEOMETRY AND TRIGONOMETRY ================= */
    {
      id: 'm-coord', after: 'm-angles', section: 'math', domain: 'geo', title: 'Coordinate Geometry', ru: 'Координатная геометрия: расстояние, середина, фигуры',
      lesson: `
<p>Геометрия на координатной плоскости соединяет алгебру и геометрию.</p>
<table><tr><th>Что</th><th>Формула</th></tr>
<tr><td>Расстояние</td><td>d = √((x₂ − x₁)² + (y₂ − y₁)²)</td></tr>
<tr><td>Середина</td><td>((x₁ + x₂)/2, (y₁ + y₂)/2)</td></tr>
<tr><td>Наклон</td><td>m = (y₂ − y₁)/(x₂ − x₁)</td></tr></table>
<div class="callout">Расстояние — это просто теорема Пифагора для «ступеньки» между точками. Ищите тройки 3-4-5, 5-12-13, 6-8-10: так можно обойтись без корней.</div>
<h3>Фигуры</h3>
<ul><li>Если сторона лежит на оси, высота и основание читаются прямо по координатам.</li>
<li>Диагонали прямоугольника равны; у параллелограмма делятся пополам (середины совпадают).</li>
<li>Перпендикулярные стороны: произведение наклонов −1.</li></ul>
<div class="example">Если середина отрезка (4, 3), а один конец (1, 1), то другой: (2·4 − 1, 2·3 − 1) = <b>(7, 5)</b>.</div>`,
      questions: [
        sp(1, 'What is the distance between the points (1, 2) and (4, 6)?', '5', '√(3² + 4²) = <b>5</b>.'),
        sp(1, 'The midpoint of the segment with endpoints (−2, 8) and (6, 2) is (a, b). What is the value of a + b?', '7', 'Середина: (2, 5), a + b = <b>7</b>.'),
        mc(2, 'The midpoint of a segment is (4, 3), and one endpoint is (1, 1). What is the other endpoint?', ['(7, 5)', '(5, 4)', '(2.5, 2)', '(6, 4)'], 0, '(2·4 − 1, 2·3 − 1) = <b>(7, 5)</b>.'),
        sp(2, 'A triangle in the xy-plane has vertices (0, 0), (8, 0), and (0, 6). What is its area?', '24', 'Катеты 8 и 6: ½ · 8 · 6 = <b>24</b>.'),
        mc(2, 'Line m passes through (1, 2) and (3, 8). What is the slope of a line perpendicular to m?', ['3', '−3', '1/3', '−1/3'], 3, 'Slope m = 6/2 = 3; перпендикулярный: <b>−1/3</b>.'),
        sp(3, 'Points A and B have coordinates (−1, 2) and (5, 10). What is the length of segment AB?', '10', '√(6² + 8²) = <b>10</b>.'),
        sp(3, 'A rectangle has vertices (1, 1), (7, 1), (7, 9), and (1, 9). What is the length of its diagonal?', '10', 'Стороны 6 и 8, диагональ <b>10</b>.'),
        mc(3, 'Which equation represents the line that passes through (0, 1) and is parallel to 4x − 2y = 6?', ['y = 2x + 1', 'y = −2x + 1', 'y = x/2 + 1', 'y = 4x + 1'], 0, '4x − 2y = 6 → y = 2x − 3, slope 2. Через (0, 1): <b>y = 2x + 1</b>.'),
      ],
    },
    {
      id: 'm-trig2', after: 'm-trig', section: 'math', domain: 'geo', title: 'Radians, the Unit Circle, and Trig Relationships', ru: 'Радианы, единичная окружность, тригонометрия',
      lesson: `
<p>На Digital SAT встречаются радианы и простые тригонометрические соотношения.</p>
<h3>Радианы</h3>
<div class="callout"><b>π рад = 180°</b>. Градусы → радианы: умножаем на π/180. Радианы → градусы: на 180/π.</div>
<table><tr><th>Градусы</th><th>30°</th><th>45°</th><th>60°</th><th>90°</th><th>180°</th></tr><tr><th>Радианы</th><td>π/6</td><td>π/4</td><td>π/3</td><td>π/2</td><td>π</td></tr></table>
<h3>Длина дуги</h3>
<p><code>s = rθ</code> (θ в радианах). Радиус 6, угол π/3: s = 2π.</p>
<h3>Значения</h3>
<table><tr><th></th><th>30°</th><th>45°</th><th>60°</th></tr><tr><th>sin</th><td>1/2</td><td>√2/2</td><td>√3/2</td></tr><tr><th>cos</th><td>√3/2</td><td>√2/2</td><td>1/2</td></tr></table>
<ul><li>tan θ = sin θ / cos θ.</li><li>sin(90° − x) = cos x.</li><li>sin² x + cos² x = 1.</li></ul>
<div class="trap">Четверти: I — 0…π/2, II — π/2…π, III — π…3π/2, IV — 3π/2…2π.</div>`,
      questions: [
        sp(1, 'How many degrees are in π/3 radians?', '60', 'π/3 · 180/π = <b>60</b>.'),
        mc(1, 'What is 150° in radians?', ['π/6', '5π/6', '2π/3', '3π/2'], 1, '150 · π/180 = <b>5π/6</b>.'),
        mc(2, 'What is the value of sin 30° + cos 60°?', ['1/2', '1', '√3/2', '√3'], 1, '1/2 + 1/2 = <b>1</b>.'),
        sp(2, 'A circle has radius 6. The length of an arc intercepted by a central angle of π/3 radians is kπ. What is the value of k?', '2', 's = rθ = 6 · π/3 = 2π → <b>k = 2</b>.'),
        mc(2, 'In a right triangle, angle θ is acute and tan θ = 3/4. What is sin θ?', ['4/5', '3/5', '5/4', '3/4'], 1, 'Катеты 3 и 4, гипотенуза 5: sin θ = <b>3/5</b>.'),
        sp(3, 'For an acute angle x, sin x° = cos(2x − 30)°. What is the value of x?', '40', 'sin x = cos(90 − x) → 90 − x = 2x − 30 → x = <b>40</b>.'),
        mc(2, 'In which quadrant does an angle of 7π/6 radians lie?', ['I', 'II', 'III', 'IV'], 2, 'π = 6π/6, 3π/2 = 9π/6: 7π/6 лежит между ними — <b>III</b> четверть.'),
        sp(3, 'An arc of length 10 lies on a circle with radius 4. What is the measure of its central angle, in radians?', '2.5', 'θ = s/r = 10/4 = <b>2.5</b>.'),
      ],
    },
  ]);
})();
