/* Math — Problem-Solving and Data Analysis, Geometry and Trigonometry.
   Все задания оригинальные, формат Digital SAT. */
(function () {
  const { mc, sp } = SAT;
  const surveyTable = '<table><tr><th></th><th>Tea</th><th>Coffee</th><th>Neither</th></tr><tr><th>Under 30</th><td>40</td><td>55</td><td>5</td></tr><tr><th>30 and over</th><td>35</td><td>50</td><td>15</td></tr></table>';

  SAT.addTopics([
    /* ================= PROBLEM-SOLVING AND DATA ANALYSIS ================= */
    {
      id: 'm-ratio', section: 'math', domain: 'psda', title: 'Ratios, Rates, Proportions, Percents', ru: 'Отношения, пропорции и проценты',
      lesson: `
<p>Самая «жизненная» часть SAT: скидки, рецепты, скорость, налоги.</p>
<div class="callout">Пропорция: <code>a/b = c/d</code> → <code>ad = bc</code>. Проценты: <code>часть = процент/100 × целое</code>.</div>
<h3>Формулы процентов</h3>
<ul><li>Изменение в %: <code>(новое − старое)/старое × 100</code>.</li>
<li>Скидка 25% → платим <b>75%</b> цены: ×0.75.</li>
<li>Рост на 20% → ×1.2; падение на 20% → ×0.8.</li>
<li>Последовательные изменения <b>перемножаются</b>, а не складываются.</li></ul>
<div class="example">+20% потом −20%: 1.2 × 0.8 = 0.96 → итог <b>96%</b> от исходной цены (−4%, а не 0).</div>
<div class="trap">Процент от какого числа? В «на 30% больше, чем B» базой служит B, а не итоговое число.</div>`,
      questions: [
        sp(1, 'A recipe uses 3 cups of flour to make 24 cookies. At the same rate, how many cups of flour are needed to make 40 cookies?', '5', '3/24 = x/40 → x = 120/24 = <b>5</b>.'),
        sp(1, 'A jacket originally priced at $80 is on sale for 25% off. What is the sale price, in dollars?', '60', '80 × 0.75 = <b>60</b>.'),
        sp(2, 'The price of a book increased from $40 to $52. By what percent did the price increase?', '30', '(52 − 40)/40 = 0.3 → <b>30%</b>.'),
        sp(2, 'A car travels 150 miles using 6 gallons of gas. At this rate, how many gallons are needed to travel 400 miles?', '16', '150/6 = 25 миль на галлон; 400/25 = <b>16</b>.'),
        mc(3, 'A price is increased by 20% and then the new price is decreased by 20%. The final price is what percent of the original price?', ['100%', '96%', '98%', '104%'], 1, '1.2 × 0.8 = 0.96 → <b>96%</b>.'),
      ],
    },
    {
      id: 'm-units', section: 'math', domain: 'psda', title: 'Unit Conversion and Density', ru: 'Единицы измерения и плотность',
      lesson: `
<p>Нужно перевести единицы, умножая на дроби, равные 1, так, чтобы ненужные единицы «сократились».</p>
<div class="callout">Пишите единицы рядом с числами и сокращайте их: <code>60 miles/hour × 5280 ft/mile × 1 hour/3600 s = 88 ft/s</code>.</div>
<h3>Что запомнить</h3>
<ul><li>1 мили = 5280 футов; 1 час = 3600 секунд; 1 фут = 12 дюймов.</li>
<li>Скорость = расстояние / время. Время = расстояние / скорость.</li>
<li>Плотность = масса / объём. Масса = плотность × объём.</li>
<li>Если единицы в задаче даны (1 gallon ≈ 3.785 L) — используйте их, не те, что помните.</li></ul>
<div class="example">Водяной бак 2400 л, насос 8 л/мин: 2400/8 = 300 мин = <b>5 часов</b>.</div>
<div class="trap">Следите за единицами в ответе: просят часы — а вы посчитали минуты.</div>`,
      questions: [
        sp(1, 'How many seconds are in 2.5 hours?', '9000', '2.5 × 60 × 60 = <b>9000</b>.'),
        sp(2, 'A car travels at a constant speed of 60 miles per hour. What is the car’s speed, in feet per second? (1 mile = 5,280 feet)', '88', '60 × 5280 / 3600 = <b>88</b> ft/s.'),
        sp(2, 'A tank holds 2,400 liters of water. A pump removes water at a constant rate of 8 liters per minute. How many hours will it take the pump to empty the tank?', '5', '2400 / 8 = 300 минут = <b>5</b> часов.'),
        sp(3, 'A metal block has a mass of 540 grams and a volume of 200 cubic centimeters. What is the density of the metal, in grams per cubic centimeter?', '2.7', '540 / 200 = <b>2.7</b>.'),
        sp(3, 'Water flows from a pipe at a rate of 12 gallons per minute. To the nearest whole number, how many liters of water flow from the pipe in 10 minutes? (1 gallon ≈ 3.785 liters)', '454', '12 × 10 × 3.785 = 454.2 → <b>454</b>.'),
      ],
    },
    {
      id: 'm-prob', section: 'math', domain: 'psda', title: 'Tables and Probability', ru: 'Таблицы данных и вероятность',
      lesson: `
<p>Двусторонние таблицы (two-way tables) и простая вероятность.</p>
<div class="callout"><code>Вероятность = число благоприятных исходов / число всех возможных исходов</code>. В условной вероятности «всех» ограничено условием: «среди тех, кто …».</div>
<h3>Как читать вопрос</h3>
<ul><li>«Из тех, кто … , какая доля …» → знаменатель — <b>эта группа</b> (строка или столбец).</li>
<li>«Не X» → 1 − P(X).</li>
<li>Два независимых события → вероятности <b>перемножаются</b>; кости: считайте исходы из 36.</li>
<li>Включение-исключение: |A ∪ B| = |A| + |B| − |A ∩ B|.</li></ul>
<div class="example">Две кости, сумма 8: (2,6),(3,5),(4,4),(5,3),(6,2) → 5 исходов из 36 → <b>5/36</b>.</div>
<div class="trap">Всегда уточняйте знаменатель: «из всех опрошенных» и «из тех, кто выбрал кофе» — разные числа.</div>`,
      questions: [
        sp(1, 'The table shows the drink preferences of 200 surveyed people. If one person under 30 is selected at random, what is the probability that the person prefers tea? (Express your answer as a decimal or a fraction.)' + surveyTable, ['0.4', '2/5'], 'Under 30: 40 + 55 + 5 = 100 человек, из них чай — 40. 40/100 = <b>0.4</b>.'),
        mc(2, 'A bag contains 5 red marbles, 7 blue marbles, and 8 green marbles. One marble is selected at random. What is the probability that the marble is not blue?', ['7/20', '13/20', '5/20', '8/20'], 1, 'Не синий: 5 + 8 = 13 из 20 → <b>13/20</b>.'),
        mc(2, 'Using the table above, of the people who prefer coffee, what fraction are 30 and over?' + surveyTable, ['50/100', '50/105', '50/200', '55/105'], 1, 'Предпочитают кофе: 55 + 50 = 105. Из них 30+: 50. Ответ <b>50/105</b>.'),
        mc(3, 'Two fair six-sided dice are rolled. What is the probability that the sum of the two numbers is 8?', ['1/6', '5/36', '1/9', '7/36'], 1, 'Исходов с суммой 8: (2,6),(3,5),(4,4),(5,3),(6,2) = 5 из 36.'),
        sp(2, 'In a class of 30 students, 18 take Spanish, 12 take French, and 5 take both. How many students take neither language?', '5', 'Хотя бы один: 18 + 12 − 5 = 25. Ни одного: 30 − 25 = <b>5</b>.'),
      ],
    },
    {
      id: 'm-scatter', section: 'math', domain: 'psda', title: 'Scatterplots and Models', ru: 'Диаграммы рассеяния и модели',
      lesson: `
<p>Линия наилучшего приближения (line of best fit) — модель связи между двумя величинами.</p>
<div class="callout">В модели <code>y = mx + b</code>: <b>m</b> — прогнозируемое изменение y при увеличении x на 1; <b>b</b> — прогноз при x = 0 (иногда не имеет реального смысла).</div>
<h3>Что спрашивают</h3>
<ul><li>Прогноз: подставьте x в формулу модели.</li>
<li><b>Остаток (residual)</b> = фактическое − прогнозируемое.</li>
<li>Показательная модель P = a(1 + r)ᵗ → рост на r в единицу времени.</li>
<li>Корреляция ≠ причинность: связь не доказывает, что одно вызывает другое.</li></ul>
<div class="example">Высота растения 40 см на 10-й неделе, а модель y = 2.4x + 15 даёт 39 → остаток 40 − 39 = <b>1</b>.</div>
<div class="trap">Модель можно применять только в пределах данных. Прогноз далеко за их пределами ненадёжен.</div>`,
      questions: [
        sp(1, 'A scatterplot shows hours studied (x) and test score (y). The line of best fit is y = 6.5x + 52. According to the model, what is the predicted score for a student who studied 4 hours?', '78', '6.5 × 4 + 52 = <b>78</b>.'),
        mc(2, 'In the model y = 6.5x + 52 above, what does the number 6.5 represent?', ['The predicted score for a student who did not study', 'The predicted increase in score for each additional hour studied', 'The maximum possible score', 'The average number of hours studied'], 1, 'Коэффициент при x — <b>прирост балла за каждый дополнительный час</b>.'),
        sp(2, 'A model for the height y, in centimeters, of a plant after x weeks is y = 2.4x + 15. At week 10 the plant’s actual height was 40 cm. What is the residual (actual minus predicted) at week 10, in centimeters?', '1', 'Прогноз: 2.4·10 + 15 = 39. Остаток 40 − 39 = <b>1</b>.'),
        mc(3, 'The population of a town is modeled by P(t) = 8,000(1.04)ᵗ, where t is the number of years after 2010. Which statement best describes the model?', ['The population increases by 4 people each year', 'The population increases by 4% each year', 'The population doubles every 4 years', 'The population was 4,000 in 2010'], 1, 'Множитель 1.04 = рост на <b>4% в год</b>. Начальное значение 8 000.'),
        mc(3, 'A scatterplot shows a positive association between monthly ice cream sales and monthly drowning incidents. Which is the best conclusion?', ['Ice cream consumption causes drownings', 'Both variables may be related to a third factor, such as warm weather; the association alone does not show causation', 'Drownings cause an increase in ice cream sales', 'There is no relationship between the two variables'], 1, 'Корреляция не доказывает причинность. Вероятен общий фактор — <b>тёплая погода</b>.'),
      ],
    },
    {
      id: 'm-stats', section: 'math', domain: 'psda', title: 'Statistics: Center and Spread', ru: 'Среднее, медиана, разброс',
      lesson: `
<p>Меры центра: <b>mean</b> (среднее), <b>median</b> (медиана), <b>mode</b> (мода). Меры разброса: <b>range</b> (размах), <b>standard deviation</b> (стандартное отклонение).</p>
<div class="callout">Mean = сумма / количество. Median — середина упорядоченного ряда (при чётном количестве — среднее двух средних). SD показывает, насколько данные разбросаны вокруг среднего.</div>
<h3>Полезные факты</h3>
<ul><li><b>Выброс (outlier)</b> сильно меняет mean, range и SD, но median почти не меняет.</li>
<li>При одинаковом среднем больший разброс значений = большее SD. Считать SD вручную не требуется.</li>
<li>Добавление значения: новое mean = (сумма + новое)/(n + 1).</li>
<li>Если mean &gt; median, распределение обычно скошено вправо (есть большие значения).</li></ul>
<div class="example">Mean пяти чисел = 20 → сумма 100. Добавили 32 → (100 + 32)/6 = <b>22</b>.</div>`,
      questions: [
        sp(1, 'What is the mean of the data set 4, 8, 6, 10, 12?', '8', '(4 + 8 + 6 + 10 + 12)/5 = 40/5 = <b>8</b>.'),
        sp(1, 'What is the median of the data set 3, 9, 4, 12, 7, 5?', '6', 'Упорядочим: 3, 4, 5, 7, 9, 12. Среднее двух средних: (5 + 7)/2 = <b>6</b>.'),
        mc(2, 'Data set A: 10, 12, 14, 16, 18. Data set B: 2, 12, 14, 16, 26. Both sets have a mean of 14. Which statement is true?', ['Set A has the greater standard deviation', 'Set B has the greater standard deviation', 'The sets have the same standard deviation', 'It cannot be determined'], 1, 'У B значения дальше от среднего (2 и 26), поэтому SD <b>больше у B</b>.'),
        sp(2, 'The mean of five numbers is 20. A sixth number, 32, is added to the set. What is the mean of the six numbers?', '22', 'Сумма 100 + 32 = 132; 132/6 = <b>22</b>.'),
        mc(3, 'The data set 5, 6, 7, 8, 9, 60 has an outlier. If 60 is removed, which statistic changes the least?', ['Mean', 'Median', 'Range', 'Standard deviation'], 1, 'Median: 7.5 → 7 (разница 0.5). Mean: ≈15.8 → 7; range: 55 → 4; SD резко падает. Медиана меняется меньше всего.'),
      ],
    },
    {
      id: 'm-infer', section: 'math', domain: 'psda', title: 'Inference and Study Design', ru: 'Выводы по выборке и дизайн исследования',
      lesson: `
<p>Как по выборке судить обо всей популяции и какие выводы допустимы.</p>
<div class="callout">Из <b>случайной</b> выборки можно делать выводы о <b>той популяции, из которой её взяли</b>. Из эксперимента со <b>случайным распределением</b> по группам можно делать вывод о причинности (но только для участников).</div>
<h3>Что запомнить</h3>
<ul><li>Оценка по выборке: доля в выборке × размер популяции.</li>
<li><b>Margin of error</b> — «плюс-минус»: настоящее значение, скорее всего, лежит в интервале [оценка − ME; оценка + ME].</li>
<li>Больше выборка → меньше margin of error.</li>
<li>Не случайная выборка (добровольцы) → выводы нельзя распространять на всех.</li></ul>
<div class="example">200 из 2000 студентов опрошены, 60 ездят на велосипеде. 60/200 = 30% → оценка для школы: 0.3 × 2000 = <b>600</b>.</div>
<div class="trap">Не придумывайте «слишком сильных» выводов: допустимо только то, что позволяет дизайн исследования.</div>`,
      questions: [
        sp(1, 'A random sample of 200 students was selected from a school of 2,000 students. In the sample, 60 students said they bike to school. Based on the sample, what is the best estimate of the number of students in the school who bike to school?', '600', '60/200 = 0.30 → 0.30 × 2000 = <b>600</b>.'),
        mc(2, 'A poll of a random sample of voters found that 52% support a measure, with a margin of error of ±3%. Which is most consistent with the poll?', ['The percent of all voters who support the measure is between 49% and 55%', 'Exactly 52% of all voters support the measure', 'Fewer than 49% of voters support the measure', 'The poll must be wrong'], 0, 'Интервал: 52 ± 3 = от 49% до 55%.'),
        mc(2, 'Researchers selected a random sample of residents of one city and surveyed them about commuting. To which group can the results be generalized?', ['All residents of that city', 'All residents of the country', 'All people who commute', 'Only the people in the sample'], 0, 'Выборка случайна <b>в пределах города</b>, поэтому выводы — для всех жителей этого города.'),
        mc(3, 'In an experiment, 60 volunteers were randomly assigned to one of two groups: one received a new study app and the other did not. The app group scored higher. Which conclusion is best supported?', ['The app caused higher scores for the volunteers, but results may not generalize to non-volunteers', 'The app will raise scores for all students in the world', 'The app has no effect', 'Volunteers always score higher'], 0, 'Случайное распределение → причинность допустима; но участники — добровольцы, поэтому нельзя обобщать на всех.'),
        mc(3, 'A survey was conducted using a random sample. Which change would most likely decrease the margin of error?', ['Increasing the sample size', 'Decreasing the sample size', 'Surveying only volunteers', 'Asking fewer questions'], 0, 'Чем больше выборка, тем <b>меньше</b> margin of error.'),
      ],
    },

    /* ================= GEOMETRY AND TRIGONOMETRY ================= */
    {
      id: 'm-area', section: 'math', domain: 'geo', title: 'Area and Volume', ru: 'Площадь и объём',
      lesson: `
<p>Большинство формул даны в Reference Sheet прямо на экзамене, но важно знать, как ими пользоваться.</p>
<table><tr><th>Фигура</th><th>Формула</th></tr>
<tr><td>Прямоугольный параллелепипед</td><td>V = ℓwh</td></tr>
<tr><td>Цилиндр</td><td>V = πr²h</td></tr>
<tr><td>Конус</td><td>V = (1/3)πr²h</td></tr>
<tr><td>Шар</td><td>V = (4/3)πr³</td></tr>
<tr><td>Куб</td><td>V = s³, площадь поверхности = 6s²</td></tr></table>
<div class="callout">Если ответ «в терминах π», <b>не подставляйте</b> 3.14 — оставьте π как множитель.</div>
<div class="example">Куб с площадью поверхности 150: 6s² = 150 → s² = 25 → s = 5 → V = <b>125</b>.</div>
<div class="trap">Конус и пирамида содержат множитель <b>1/3</b>; радиус и диаметр — не путайте.</div>`,
      questions: [
        sp(1, 'A rectangular prism has length 6, width 4, and height 5. What is its volume?', '120', '6 × 4 × 5 = <b>120</b>.'),
        mc(2, 'A right circular cylinder has radius 3 and height 10. What is its volume?', ['30π', '60π', '90π', '120π'], 2, 'V = π·3²·10 = <b>90π</b>.'),
        mc(2, 'A right circular cone has radius 6 and height 5. What is its volume?', ['30π', '60π', '180π', '36π'], 1, 'V = (1/3)π·36·5 = <b>60π</b>.'),
        sp(3, 'The surface area of a cube is 150 square units. What is the volume of the cube, in cubic units?', '125', '6s² = 150 → s = 5 → V = 5³ = <b>125</b>.'),
        sp(3, 'A sphere has a volume of 36π cubic units. What is the radius of the sphere, in units?', '3', '(4/3)πr³ = 36π → r³ = 27 → <b>r = 3</b>.'),
      ],
    },
    {
      id: 'm-angles', section: 'math', domain: 'geo', title: 'Lines, Angles, and Triangles', ru: 'Прямые, углы и треугольники',
      lesson: `
<p>Основные факты, которые нужно помнить (многие не даются в справке):</p>
<ul><li>Сумма углов треугольника = <b>180°</b>.</li>
<li>В равнобедренном треугольнике углы при основании равны.</li>
<li>Внешний угол = сумма двух несмежных внутренних.</li>
<li>Накрест лежащие и соответственные углы при параллельных прямых равны; односторонние в сумме дают 180°.</li>
<li>Прямая — 180°, полный оборот — 360°.</li></ul>
<h3>Подобные треугольники</h3>
<div class="callout">Подобные фигуры: стороны пропорциональны (коэффициент k), <b>площади — в отношении k²</b>, углы равны.</div>
<div class="example">△ABC ∼ △DEF, AB = 6, DE = 9, BC = 8 → k = 9/6 = 1.5 → EF = 8 × 1.5 = <b>12</b>.</div>
<div class="trap">Если коэффициент подобия 3 : 5, то площади относятся как 9 : 25, а не 3 : 5.</div>`,
      questions: [
        sp(1, 'In a triangle, two angles measure 50° and 65°. What is the measure, in degrees, of the third angle?', '65', '180 − 50 − 65 = <b>65</b>.'),
        sp(2, 'Triangle ABC is similar to triangle DEF, where AB corresponds to DE and BC corresponds to EF. If AB = 6, DE = 9, and BC = 8, what is the length of EF?', '12', 'k = 9/6 = 1.5; EF = 8 × 1.5 = <b>12</b>.'),
        sp(2, 'An isosceles triangle has a vertex angle of 40°. What is the measure, in degrees, of each base angle?', '70', '(180 − 40)/2 = <b>70</b>.'),
        sp(2, 'An exterior angle of a triangle measures 120°. One of the two remote interior angles measures 45°. What is the measure, in degrees, of the other remote interior angle?', '75', 'Внешний угол = сумма двух несмежных: 120 − 45 = <b>75</b>.'),
        sp(3, 'Two similar triangles have corresponding sides in the ratio 3 : 5. The area of the smaller triangle is 18. What is the area of the larger triangle?', '50', 'Отношение площадей 9 : 25. 18 × 25/9 = <b>50</b>.'),
      ],
    },
    {
      id: 'm-trig', section: 'math', domain: 'geo', title: 'Right Triangles and Trigonometry', ru: 'Прямоугольные треугольники и тригонометрия',
      lesson: `
<p>Теорема Пифагора: <code>a² + b² = c²</code>. Тройки: 3-4-5, 5-12-13, 8-15-17, 7-24-25.</p>
<h3>Специальные треугольники (есть в справке)</h3>
<ul><li>30°-60°-90°: стороны x, x√3, 2x.</li><li>45°-45°-90°: стороны x, x, x√2.</li></ul>
<h3>Тригонометрия</h3>
<div class="callout"><b>SOH-CAH-TOA</b>: sin = противолежащий/гипотенуза, cos = прилежащий/гипотенуза, tan = противолежащий/прилежащий.</div>
<ul><li>Для острых углов A и B одного прямоугольного треугольника: <code>sin A = cos B</code> (углы дополняют друг друга до 90°).</li></ul>
<div class="example">Лестница-рампа длиной 20 образует с землёй 30°: высота = 20·sin 30° = 20·0.5 = <b>10</b>.</div>
<div class="trap">Калькулятор должен быть в нужном режиме (градусы / радианы). Значения sin 30°, cos 60° = 0.5 лучше знать на память.</div>`,
      questions: [
        sp(1, 'The legs of a right triangle have lengths 6 and 8. What is the length of the hypotenuse?', '10', '√(36 + 64) = √100 = <b>10</b>.'),
        mc(2, 'A right triangle has a hypotenuse of length 13 and one leg of length 5. What is the length of the other leg?', ['8', '10', '12', '14'], 2, '13² − 5² = 169 − 25 = 144 → <b>12</b>.'),
        mc(2, 'In right triangle ABC, the right angle is at C and sin A = 3/5. What is the value of cos B?', ['4/5', '3/5', '5/3', '3/4'], 1, 'Для дополнительных углов sin A = cos B. Следовательно, cos B = <b>3/5</b>.'),
        sp(3, 'In a 45°-45°-90° triangle, each leg has length 8√2. What is the length of the hypotenuse?', '16', 'Гипотенуза = катет × √2 = 8√2 × √2 = 8 × 2 = <b>16</b>.'),
        sp(3, 'A 20-foot ramp makes a 30° angle with level ground. How high above the ground, in feet, is the top of the ramp?', '10', 'Высота = 20 · sin 30° = 20 · 0.5 = <b>10</b>.'),
      ],
    },
    {
      id: 'm-circles', section: 'math', domain: 'geo', title: 'Circles', ru: 'Окружности: длина, площадь, уравнение',
      lesson: `
<p>Базовые формулы: <code>C = 2πr</code>, <code>A = πr²</code> (есть в справке).</p>
<h3>Дуги и секторы</h3>
<div class="callout">Часть окружности определяется центральным углом θ: <b>доля = θ/360</b>. Длина дуги = (θ/360)·2πr, площадь сектора = (θ/360)·πr².</div>
<h3>Уравнение окружности</h3>
<p><code>(x − h)² + (y − k)² = r²</code> — центр (h, k), радиус r. Обратите внимание на знаки: (y + 2)² означает k = −2.</p>
<div class="example">Центральный угол 90°, радиус 8: дуга = (1/4)·2π·8 = <b>4π</b>.</div>
<div class="trap">В уравнении справа стоит r², а не r: 25 → радиус 5. Диаметр = 2r.</div>`,
      questions: [
        mc(1, 'A circle has radius 7. What is its circumference?', ['7π', '14π', '49π', '28π'], 1, 'C = 2π·7 = <b>14π</b>.'),
        sp(2, 'A circle has an area of 49π. What is the diameter of the circle?', '14', 'πr² = 49π → r = 7 → d = <b>14</b>.'),
        mc(2, 'A circle has radius 8. What is the length of an arc with a central angle of 90°?', ['2π', '4π', '8π', '16π'], 1, '(90/360)·2π·8 = (1/4)·16π = <b>4π</b>.'),
        mc(3, 'The equation (x − 3)² + (y + 2)² = 25 represents a circle in the xy-plane. What are the center and radius?', ['Center (3, −2), radius 5', 'Center (−3, 2), radius 5', 'Center (3, −2), radius 25', 'Center (−3, 2), radius 25'], 0, 'Из (x − h)² + (y − k)² = r²: h = 3, k = −2, r² = 25 → r = 5.'),
        mc(3, 'A circle has radius 6. What is the area of a sector with a central angle of 60°?', ['3π', '6π', '12π', '36π'], 1, '(60/360)·π·36 = (1/6)·36π = <b>6π</b>.'),
      ],
    },
  ]);
})();
