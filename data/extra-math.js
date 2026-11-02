/* Math — дополнительные задания (по 4 на тему). Оригинальные, формат Digital SAT. */
(function () {
  const { mc, sp } = SAT, E = SAT.extend;
  const survey = '<table><tr><th></th><th>Tea</th><th>Coffee</th><th>Neither</th></tr><tr><th>Under 30</th><td>40</td><td>55</td><td>5</td></tr><tr><th>30 and over</th><td>35</td><td>50</td><td>15</td></tr></table>';

  E('m-lin1', [
    mc(1, 'If 4x − 9 = 15, what is the value of x?', ['4', '5', '6', '7'], 2, '4x = 24 → <b>x = 6</b>.'),
    sp(2, 'If 5x + 3 = 2x + 24, what is the value of x?', '7', '3x = 21 → <b>x = 7</b>.'),
    mc(2, 'What is the solution to 3(x − 2) = 2(x + 1) + 4?', ['8', '10', '12', '14'], 2, '3x − 6 = 2x + 6 → <b>x = 12</b>.'),
    mc(3, 'How many solutions does the equation 4(x + 2) = 4x + 9 have?', ['None', 'Exactly one', 'Exactly two', 'Infinitely many'], 0, '4x + 8 = 4x + 9 → 8 = 9 — неверно при любом x. <b>Решений нет</b>.'),
  ]);
  E('m-lin2', [
    mc(1, 'At what point does the graph of y = −2x + 7 cross the y-axis?', ['(7, 0)', '(0, 7)', '(0, −2)', '(−2, 0)'], 1, 'При x = 0: y = 7 → <b>(0, 7)</b>.'),
    sp(2, 'The function f is linear, f(2) = 5, and f(6) = 17. What is the value of f(4)?', '11', 'Slope = 12/4 = 3. f(4) = 5 + 3·2 = <b>11</b>.'),
    mc(2, 'A taxi charges $3 plus $2.50 per mile. Which equation gives the cost C, in dollars, of a trip of m miles?', ['C = 3m + 2.5', 'C = 2.5m + 3', 'C = 5.5m', 'C = 2.5 + 3m'], 1, 'Ставка за милю умножается на m, фиксированная плата прибавляется: <b>C = 2.5m + 3</b>.'),
    sp(3, 'A line passes through (0, 2) and is perpendicular to the line y = 2x + 1. What is the x-coordinate of the point where this line crosses the x-axis?', '4', 'Перпендикулярный slope = −1/2: y = −x/2 + 2. При y = 0: x = <b>4</b>.'),
  ]);
  E('m-systems', [
    mc(1, 'If y = 3x and x + y = 12, what is the value of x?', ['2', '3', '4', '6'], 1, 'x + 3x = 12 → 4x = 12 → <b>x = 3</b>.'),
    sp(2, 'If 2x + y = 11 and x − y = 1, what is the value of x?', '4', 'Сложим: 3x = 12 → <b>x = 4</b>.'),
    mc(2, 'Maria buys 3 notebooks and 2 pens for $12. Jon buys 1 notebook and 2 pens for $8. What is the cost of one notebook?', ['$1', '$2', '$3', '$4'], 1, 'Вычтем: 2 тетради = $4 → тетрадь <b>$2</b>.'),
    mc(3, 'How many solutions does the system y = 2x + 3 and 4x − 2y = −6 have?', ['None', 'Exactly one', 'Exactly two', 'Infinitely many'], 3, '4x − 2y = −6 → y = 2x + 3: это <b>одна и та же прямая</b>, решений бесконечно много.'),
  ]);
  E('m-ineq', [
    mc(1, 'Which inequality is equivalent to x + 4 ≥ 9?', ['x ≤ 5', 'x ≥ 5', 'x ≥ 13', 'x ≤ 13'], 1, 'x ≥ 5.'),
    sp(2, 'What is the smallest integer that satisfies −3x < 12?', '-3', 'Делим на −3 и меняем знак: x > −4. Наименьшее целое — <b>−3</b>.'),
    mc(2, 'Sam has $60 to spend on tickets that cost $8 each. Which inequality represents the number of tickets, t, he can buy?', ['8t ≥ 60', '8t ≤ 60', 't + 8 ≤ 60', '60t ≤ 8'], 1, 'Расходы не больше бюджета: <b>8t ≤ 60</b>.'),
    sp(3, 'The solution set of 3x − a < 12 is x < 5. What is the value of a?', '3', 'x < (12 + a)/3 = 5 → 12 + a = 15 → <b>a = 3</b>.'),
  ]);
  E('m-equiv', [
    mc(1, 'Which expression is equivalent to 2(3x − 4) + 5x?', ['11x − 4', '8x − 8', '11x − 8', '11x + 8'], 2, '6x − 8 + 5x = <b>11x − 8</b>.'),
    mc(2, 'Which expression is equivalent to x² − x − 12?', ['(x + 4)(x − 3)', '(x − 4)(x + 3)', '(x − 6)(x + 2)', '(x − 12)(x + 1)'], 1, 'Числа с произведением −12 и суммой −1: −4 и 3. <b>(x − 4)(x + 3)</b>.'),
    mc(2, 'Which expression is equivalent to (x + 5)² − 25?', ['x²', 'x² + 10x', 'x² + 10x + 50', 'x² + 25'], 1, 'x² + 10x + 25 − 25 = <b>x² + 10x</b>.'),
    sp(3, 'If (3x + 2)(x − 4) = 3x² + bx − 8, what is the value of b?', '-10', '3x² − 12x + 2x − 8 = 3x² − 10x − 8 → <b>b = −10</b>.'),
  ]);
  E('m-quad', [
    mc(1, 'What are the solutions to x² − 9 = 0?', ['3 only', '−3 only', '3 and −3', '9 and −9'], 2, 'x² = 9 → <b>x = ±3</b>.'),
    sp(2, 'What is the larger solution to x² − 6x + 8 = 0?', '4', '(x − 2)(x − 4) = 0 → большее решение <b>4</b>.'),
    mc(2, 'What are the solutions to x² + 2x − 15 = 0?', ['5 and −3', '−15 and 1', '3 and 5', '−5 and 3'], 3, '(x + 5)(x − 3) = 0 → <b>−5 и 3</b>.'),
    sp(3, 'The equation x² + kx + 49 = 0, where k is positive, has exactly one real solution. What is the value of k?', '14', 'D = k² − 196 = 0 → <b>k = 14</b>.'),
  ]);
  E('m-nonlinear', [
    mc(1, 'If g(x) = 2x² − 3, what is g(3)?', ['9', '12', '15', '18'], 2, '2·9 − 3 = <b>15</b>.'),
    mc(2, 'A quantity starts at 10 and triples every year. Which function models the quantity after t years?', ['10 + 3t', '10(3)ᵗ', '3(10)ᵗ', '30t'], 1, 'Начальное значение 10, множитель 3: <b>10·3ᵗ</b>.'),
    sp(2, 'The height of a ball, in feet, t seconds after it is thrown is h(t) = −16t² + 64t + 5. What is the maximum height, in feet?', '69', 'Вершина при t = −64/(2·(−16)) = 2. h(2) = −64 + 128 + 5 = <b>69</b>.'),
    sp(3, 'If f(x) = 3(2)ˣ, what is the value of f(4) − f(2)?', '36', 'f(4) = 48, f(2) = 12 → <b>36</b>.'),
  ]);
  E('m-ratio', [
    sp(1, 'On a map, 1 inch represents 25 miles. Two cities are 6 inches apart on the map. What is the actual distance, in miles?', '150', '6 × 25 = <b>150</b>.'),
    sp(2, 'A jacket costs $250 before an 8% sales tax is added. What is the total cost, in dollars?', '270', '250 × 1.08 = <b>270</b>.'),
    mc(2, 'A town’s population decreased from 5,000 to 4,000. By what percent did it decrease?', ['10%', '20%', '25%', '80%'], 1, '(5000 − 4000)/5000 = 0.2 → <b>20%</b>.'),
    sp(3, 'After a 10% raise, a worker’s salary is $44,000. What was the salary before the raise, in dollars?', '40000', 'x · 1.1 = 44000 → x = <b>40000</b>.'),
  ]);
  E('m-units', [
    sp(1, 'How many inches are in 3.5 feet?', '42', '3.5 × 12 = <b>42</b>.'),
    sp(2, 'A printer prints 24 pages per minute. How many pages does it print in 2.5 hours?', '3600', '2.5 ч = 150 мин; 150 × 24 = <b>3600</b>.'),
    sp(2, 'A cyclist rides at a constant speed of 15 kilometers per hour. How many minutes does it take to ride 9 kilometers?', '36', '9/15 = 0.6 ч = <b>36</b> минут.'),
    sp(3, 'A rock has a density of 3 grams per cubic centimeter and a volume of 250 cubic centimeters. What is its mass, in kilograms?', '0.75', 'Масса = 3 × 250 = 750 г = <b>0.75</b> кг.'),
  ]);
  E('m-prob', [
    mc(1, 'A spinner has 8 equal sections numbered 1 through 8. What is the probability of landing on a number greater than 5?', ['1/2', '5/8', '3/8', '1/4'], 2, 'Больше 5: 6, 7, 8 → <b>3/8</b>.'),
    sp(2, 'In the table, one of the 200 surveyed people is selected at random. What is the probability that the person is 30 and over and prefers coffee?' + survey, ['0.25', '1/4'], '50 из 200 = <b>0.25</b>.'),
    mc(2, 'A box contains 4 red and 6 blue marbles. Two marbles are drawn without replacement. What is the probability that both are red?', ['2/15', '4/25', '1/5', '16/100'], 0, '4/10 · 3/9 = 12/90 = <b>2/15</b>.'),
    sp(3, 'Of 80 people surveyed, 45 like hiking, 35 like biking, and 15 like both. How many like neither?', '15', 'Хотя бы одно: 45 + 35 − 15 = 65. Ни одного: 80 − 65 = <b>15</b>.'),
  ]);
  E('m-scatter', [
    sp(1, 'A line of best fit is y = −1.5x + 30. What is the predicted value of y when x = 8?', '18', '−12 + 30 = <b>18</b>.'),
    mc(2, 'In the model y = 3x + 12, where x is years of ownership and y is a machine’s repair cost in dollars, what does 12 represent?', ['The predicted cost increase per year', 'The predicted cost when x = 0', 'The maximum possible cost', 'The number of years until repair'], 1, 'Свободный член — прогноз при x = 0.'),
    sp(2, 'A model predicts a value of 50 for a data point whose actual value is 46. What is the residual (actual minus predicted)?', '-4', '46 − 50 = <b>−4</b>.'),
    mc(3, 'The model A(t) = 200(0.9)ᵗ describes the amount of a substance after t hours. Which statement is true?', ['The amount decreases by 10% each hour', 'The amount decreases by 0.9 units each hour', 'The amount increases by 10% each hour', 'The amount is 90 at the start'], 0, '0.9 = 1 − 0.1 → убывание на <b>10% в час</b>. Начало: 200.'),
  ]);
  E('m-stats', [
    sp(1, 'What is the mode of the data set 2, 3, 3, 5, 7, 3, 9?', '3', 'Чаще всего встречается 3.'),
    sp(2, 'What is the median of 12, 7, 9, 15, 10?', '10', 'Упорядочим: 7, 9, 10, 12, 15. Медиана <b>10</b>.'),
    mc(2, 'The mean of four numbers is 10. Three of the numbers are 8, 9, and 11. What is the fourth number?', ['10', '11', '12', '13'], 2, 'Сумма 40; 8 + 9 + 11 = 28 → <b>12</b>.'),
    mc(3, 'Every value in a data set is increased by 5. Which statement is true about the mean and standard deviation of the new set?', ['Both increase by 5', 'The mean increases by 5 and the standard deviation is unchanged', 'The mean is unchanged and the standard deviation increases by 5', 'Both are unchanged'], 1, 'Сдвиг всех значений меняет среднее, но не разброс: <b>mean +5, SD без изменений</b>.'),
  ]);
  E('m-infer', [
    sp(1, 'In a random sample of 150 customers, 45 prefer brand X. Based on the sample, about how many of the 8,000 customers in the population prefer brand X?', '2400', '45/150 = 0.3 → 0.3 × 8000 = <b>2400</b>.'),
    mc(2, 'Which sampling method is most likely to produce a representative sample of a city’s residents?', ['Surveying people at a gym', 'Surveying volunteers who respond to an online ad', 'Randomly selecting residents from the city’s registry', 'Surveying the researcher’s friends'], 2, 'Случайный выбор из полного списка — <b>наиболее репрезентативен</b>.'),
    mc(2, 'A poll reports that 60% of a random sample support a proposal, with a margin of error of 4%. Which interval is most plausible for the population percent?', ['56% to 64%', '40% to 60%', '60% to 64%', '50% to 70%'], 0, '60 ± 4 = <b>56%–64%</b>.'),
    mc(3, 'An observational study found that people who drink tea daily live longer. Which conclusion is best supported?', ['Drinking tea causes longer life', 'There is an association, but causation cannot be concluded', 'Tea has no effect on lifespan', 'Everyone should drink tea'], 1, 'Без случайного распределения нельзя говорить о причинности — только об <b>ассоциации</b>.'),
  ]);
  E('m-area', [
    sp(1, 'A triangle has a base of 10 and a height of 7. What is its area?', '35', '½ · 10 · 7 = <b>35</b>.'),
    mc(2, 'A rectangle has a perimeter of 30 and a length of 10. What is its area?', ['150', '75', '100', '50'], 3, 'Ширина: (30 − 20)/2 = 5. Площадь 10 · 5 = <b>50</b>.'),
    sp(2, 'A cylinder has radius 2 and volume 40π. What is its height?', '10', 'π·4·h = 40π → <b>h = 10</b>.'),
    sp(3, 'A cone has a volume of 12π and a radius of 3. What is its height?', '4', '(1/3)π·9·h = 3πh = 12π → <b>h = 4</b>.'),
  ]);
  E('m-angles', [
    sp(1, 'Two angles on a straight line measure (2x + 20)° and (x + 10)°. What is the value of x?', '50', '3x + 30 = 180 → <b>x = 50</b>.'),
    mc(2, 'In an isosceles triangle, each base angle measures 50°. What is the measure of the vertex angle?', ['50°', '60°', '80°', '100°'], 2, '180 − 100 = <b>80°</b>.'),
    sp(2, 'In right triangle ABC, the right angle is at C and angle A measures 35°. What is the measure, in degrees, of angle B?', '55', '90 − 35 = <b>55</b>.'),
    sp(3, 'Two parallel lines are cut by a transversal. Two corresponding angles measure (3x − 10)° and (2x + 25)°. What is the value of x?', '35', 'Соответственные углы равны: 3x − 10 = 2x + 25 → <b>x = 35</b>.'),
  ]);
  E('m-trig', [
    sp(1, 'The legs of a right triangle have lengths 9 and 12. What is the length of the hypotenuse?', '15', '√(81 + 144) = √225 = <b>15</b>.'),
    mc(2, 'In a right triangle, an acute angle has an opposite side of length 5 and an adjacent side of length 12. What is the tangent of this angle?', ['5/13', '12/13', '5/12', '12/5'], 2, 'tan = противолежащий/прилежащий = <b>5/12</b>.'),
    sp(2, 'In a 30°-60°-90° triangle, the hypotenuse has length 18. What is the length of the shorter leg?', '9', 'Короткий катет = половина гипотенузы = <b>9</b>.'),
    mc(3, 'In a right triangle, sin x° = 0.6. What is the value of cos(90 − x)°?', ['0.4', '0.6', '0.8', '1.0'], 1, 'cos(90° − x) = sin x = <b>0.6</b>.'),
  ]);
  E('m-circles', [
    sp(1, 'A circle has a circumference of 18π. What is its radius?', '9', '2πr = 18π → <b>r = 9</b>.'),
    mc(2, 'A circle has a circumference of 10π. What is its area?', ['5π', '10π', '25π', '100π'], 2, 'r = 5 → A = π·25 = <b>25π</b>.'),
    sp(2, 'An arc of a circle with radius 12 has length 6π. What is the measure of the arc’s central angle, in degrees?', '90', '(θ/360)·24π = 6π → θ = <b>90</b>.'),
    mc(3, 'Which point lies on the circle (x + 1)² + (y − 4)² = 16?', ['(−1, 4)', '(1, 4)', '(3, 4)', '(−5, 0)'], 2, 'При (3, 4): 16 + 0 = 16 ✔. (−1, 4): 0; (1, 4): 4; (−5, 0): 32.'),
  ]);
})();
