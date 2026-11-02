/* Генераторы заданий Math: каждый шаблон принимает rnd() и возвращает вопрос с проверяемым ответом.
   Используются в пробных тестах (чтобы тесты не повторялись) и в режиме «ещё практика». */
(function () {
  const { mc, sp } = SAT;
  const ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const pk = (r, a) => a[Math.floor(r() * a.length)];
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const frac = (n, d) => { const g = gcd(n, d); return n / g + '/' + d / g; };
  const sg = (n) => (n < 0 ? '− ' + Math.abs(n) : '+ ' + n);

  const G = SAT.addGens;

  G('m-found', [
    (r) => { const e = pk(r, [2, 4]), b = e * ri(r, 1, 3), k = ri(r, 2, 4), d = ri(r, 1, 5), a = ri(r, 1, 9), v = a + (b / e) * k * k;
      return sp(1, `What is the value of ${a} + ${b} × (${d + k} − ${d})² ÷ ${e}?`, String(v), `(${d + k} − ${d})² = ${k * k}; ${b} × ${k * k} ÷ ${e} = ${(b / e) * k * k}; плюс ${a} = <b>${v}</b>.`); },
    (r) => { const q = pk(r, [3, 4, 5, 6, 7, 8]), p = ri(r, 1, q - 1), n = q * ri(r, 2, 9), m = (p * n) / q;
      return sp(2, `If ${p}/${q} of a number is ${m}, what is the number?`, String(n), `Число = ${m} · ${q}/${p} = <b>${n}</b>.`); },
  ]);

  G('m-lin1', [
    (r) => { const x = ri(r, 2, 15), a = ri(r, 2, 9), b = ri(r, -12, 20), c = a * x + b;
      return sp(1, `If ${a}x ${sg(b)} = ${c}, what is the value of x?`, String(x), `${a}x = ${c - b} → <b>x = ${x}</b>.`); },
    (r) => { const x = ri(r, -5, 12), a = ri(r, 2, 7), b = ri(r, 1, 9), c = a * (x + b);
      return sp(2, `If ${a}(x + ${b}) = ${c}, what is the value of x?`, String(x), `x + ${b} = ${c / a} → <b>x = ${x}</b>.`); },
    (r) => { const h = ri(r, 2, 12), f = 5 * ri(r, 4, 16), p = 5 * ri(r, 2, 9), T = f + p * h;
      return sp(1, `A technician charges $${f} for a visit plus $${p} per hour of work. If the total charge was $${T}, for how many hours did the technician work?`, String(h), `${f} + ${p}h = ${T} → <b>h = ${h}</b>.`); },
    (r) => { const k = ri(r, 2, 9), b = ri(r, 1, 6);
      return sp(3, `In the equation ${k}(x + ${b}) = ${k}x + n, n is a constant. For what value of n does the equation have infinitely many solutions?`, String(k * b), `${k}x + ${k * b} = ${k}x + n → <b>n = ${k * b}</b>.`); },
  ]);

  G('m-lin2', [
    (r) => { const x1 = ri(r, -3, 4), y1 = ri(r, -5, 9), dx = ri(r, 1, 5), s = pk(r, [-4, -3, -2, -1, 1, 2, 3, 4, 5]), y2 = y1 + s * dx;
      return sp(1, `What is the slope of the line through the points (${x1}, ${y1}) and (${x1 + dx}, ${y2})?`, String(s), `(${y2} − ${y1})/${dx} = <b>${s}</b>.`); },
    (r) => { const x1 = ri(r, 1, 5), s = pk(r, [-3, -2, 2, 3, 4]), b = ri(r, -9, 9), dx = ri(r, 1, 4), y1 = s * x1 + b, y2 = s * (x1 + dx) + b;
      return sp(2, `A line passes through the points (${x1}, ${y1}) and (${x1 + dx}, ${y2}). What is the y-coordinate of the point where the line crosses the y-axis?`, String(b), `Slope = ${s}; b = ${y1} − ${s}·${x1} = <b>${b}</b>.`); },
  ]);

  G('m-graphs', [
    (r) => { const xi = ri(r, 2, 9), A = ri(r, 2, 6), B = ri(r, 2, 7);
      return sp(1, `What is the x-intercept of the line ${A}x + ${B}y = ${A * xi}?`, String(xi), `При y = 0: ${A}x = ${A * xi} → <b>x = ${xi}</b>.`); },
    (r) => { const yi = ri(r, 2, 9), A = ri(r, 2, 6), B = ri(r, 2, 7);
      return sp(1, `What is the y-intercept of the line ${A}x + ${B}y = ${B * yi}?`, String(yi), `При x = 0: ${B}y = ${B * yi} → <b>y = ${yi}</b>.`); },
  ]);

  G('m-systems', [
    (r) => { let x, y, p, q, s, t;
      do { x = ri(r, 1, 9); y = ri(r, 1, 9); p = ri(r, 1, 4); q = ri(r, 1, 4); s = ri(r, 1, 4); t = ri(r, 1, 4); } while (p * t - q * s === 0);
      const ask = r() < 0.5;
      return sp(2, `If ${p}x + ${q}y = ${p * x + q * y} and ${s}x + ${t}y = ${s * x + t * y}, what is the value of ${ask ? 'x' : 'x + y'}?`, String(ask ? x : x + y), `Решение системы: x = ${x}, y = ${y}. Ответ <b>${ask ? x : x + y}</b>.`); },
    (r) => { const pa = ri(r, 8, 15), pb = ri(r, 4, pa - 1), a = ri(r, 5, 20), b = ri(r, 5, 20);
      return sp(2, `Adult tickets cost $${pa} and student tickets cost $${pb}. A total of ${a + b} tickets were sold for $${pa * a + pb * b}. How many adult tickets were sold?`, String(a), `a + s = ${a + b}; ${pa}a + ${pb}s = ${pa * a + pb * b} → <b>a = ${a}</b>.`); },
  ]);

  G('m-ineq', [
    (r) => { const a = ri(r, 2, 7), b = ri(r, -10, 10), c = ri(r, b + 3, b + 40), t = (c - b) / a, ans = Math.floor(t) + 1;
      return sp(2, `What is the smallest integer value of x that satisfies ${a}x ${sg(b)} > ${c}?`, String(ans), `x > ${c - b}/${a} ≈ ${Math.round(t * 100) / 100} → наименьшее целое <b>${ans}</b>.`); },
    (r) => { const p = ri(r, 3, 15), n = ri(r, 4, 20), C = ri(r, 10, 60), B = C + p * n + ri(r, 0, p - 1);
      return sp(1, `A club has a budget of $${B} and has already spent $${C}. Each poster costs $${p}. What is the greatest number of posters the club can buy?`, String(n), `${p}n + ${C} ≤ ${B} → n ≤ ${((B - C) / p).toFixed(2)} → <b>${n}</b>.`); },
  ]);

  G('m-equiv', [
    (r) => { let p, q; do { p = ri(r, -6, 6); q = ri(r, -6, 6); } while (!p || !q);
      return sp(2, `If (x ${sg(p)})(x ${sg(q)}) = x² + bx + c, what is the value of b + c?`, String(p + q + p * q), `b = ${p + q}, c = ${p * q} → b + c = <b>${p + q + p * q}</b>.`); },
    (r) => { const a = ri(r, 2, 5), b = ri(r, 1, 6);
      return sp(2, `If (${a}x + ${b})² = ${a * a}x² + kx + ${b * b}, what is the value of k?`, String(2 * a * b), `k = 2·${a}·${b} = <b>${2 * a * b}</b>.`); },
  ]);

  G('m-quad', [
    (r) => { const r1 = ri(r, 1, 8), r2 = ri(r, r1 + 1, 10);
      return sp(2, `What is the larger solution to x² − ${r1 + r2}x + ${r1 * r2} = 0?`, String(r2), `(x − ${r1})(x − ${r2}) = 0 → <b>${r2}</b>.`); },
    (r) => { const b = 2 * ri(r, 1, 8);
      return sp(3, `The equation x² + ${b}x + c = 0, where c is a constant, has exactly one real solution. What is the value of c?`, String((b * b) / 4), `D = ${b}² − 4c = 0 → <b>c = ${(b * b) / 4}</b>.`); },
  ]);

  G('m-poly', [
    (r) => { const b = pk(r, [2, 3, 5]), n = ri(r, 3, 6), k = ri(r, 1, n - 1);
      return sp(1, `If ${b}^(x + ${k}) = ${Math.pow(b, n)}, what is the value of x?`, String(n - k), `${Math.pow(b, n)} = ${b}^${n} → x + ${k} = ${n} → <b>x = ${n - k}</b>.`); },
  ]);

  G('m-radrat', [
    (r) => { const a = ri(r, 1, 15), b = ri(r, 2, 9);
      return sp(1, `If √(x + ${a}) = ${b}, what is the value of x?`, String(b * b - a), `x + ${a} = ${b * b} → <b>x = ${b * b - a}</b>.`); },
    (r) => { const a = ri(r, 2, 5), d = ri(r, 1, 6), c = ri(r, 4, 20);
      return sp(2, `What is the sum of the solutions to |${a}x − ${a * d}| = ${c}?`, String(2 * d), `Решения (${a * d} ± ${c})/${a}; их сумма 2·${a * d}/${a} = <b>${2 * d}</b>.`); },
  ]);

  G('m-quadfun', [
    (r) => { const a = ri(r, 2, 5), t0 = ri(r, 1, 6), c = ri(r, 1, 20);
      return sp(2, `The height of a ball, in meters, t seconds after launch is h(t) = −${a}t² + ${2 * a * t0}t + ${c}. What is the maximum height, in meters?`, String(a * t0 * t0 + c), `Вершина t = ${t0}: h = ${a * t0 * t0 + c}.`); },
    (r) => { const h = ri(r, 1, 8), k = h * h + ri(r, 1, 9);
      return sp(2, `What is the minimum value of f(x) = x² − ${2 * h}x + ${k}?`, String(k - h * h), `Вершина x = ${h}: f = ${k} − ${h * h} = <b>${k - h * h}</b>.`); },
  ]);

  G('m-expo', [
    (r) => { const a = pk(r, [10, 20, 50, 100, 200]), b = pk(r, [2, 3]), t = ri(r, 2, 4);
      return sp(1, `The function P is defined by P(t) = ${a} · ${b}ᵗ. What is the value of P(${t})?`, String(a * Math.pow(b, t)), `${a} · ${Math.pow(b, t)} = <b>${a * Math.pow(b, t)}</b>.`); },
    (r) => { const k = ri(r, 5, 20), n = ri(r, 2, 4), d = ri(r, 2, 6);
      return sp(2, `A sample of a substance has a half-life of ${d} days and initially has ${k * Math.pow(2, n)} grams. How many grams remain after ${n * d} days?`, String(k), `${n} периода: ${k * Math.pow(2, n)}/2^${n} = <b>${k}</b>.`); },
  ]);

  G('m-transform', [
    (r) => { const a = ri(r, 2, 5), b = ri(r, -4, 6), d = ri(r, -5, 5), c = ri(r, 1, 4), g = c * c + d;
      return sp(2, `If f(x) = ${a}x ${sg(b)} and g(x) = x² ${sg(d)}, what is the value of f(g(${c}))?`, String(a * g + b), `g(${c}) = ${g}; f(${g}) = <b>${a * g + b}</b>.`); },
  ]);

  G('m-ratio', [
    (r) => { const p = ri(r, 2, 9), q = ri(r, 2, 9), t = ri(r, 2, 6), s = ri(r, 2, 8);
      return sp(1, `A machine makes ${p * t} parts in ${q * t} minutes. At this constant rate, how many parts does it make in ${q * s} minutes?`, String(p * s), `Скорость ${p}/${q} деталей в минуту: ${q * s} · ${p}/${q} = <b>${p * s}</b>.`); },
  ]);

  G('m-percent', [
    (r) => { const old = 20 * ri(r, 1, 10), p = pk(r, [10, 20, 25, 30, 40, 50]), nw = (old * (100 + p)) / 100;
      return sp(1, `A price increased from $${old} to $${nw}. By what percent did the price increase?`, String(p), `(${nw} − ${old})/${old} = <b>${p}%</b>.`); },
    (r) => { const O = 20 * ri(r, 2, 15), d = pk(r, [10, 20, 25, 30, 40, 50]), P = (O * (100 - d)) / 100;
      return sp(2, `After a ${d}% discount, an item costs $${P}. What was the original price, in dollars?`, String(O), `x · ${(100 - d) / 100} = ${P} → <b>x = ${O}</b>.`); },
    (r) => { const p = pk(r, [10, 20, 30, 40, 50]), q = pk(r, [10, 20, 30, 40, 50]), v = ((100 + p) * (100 - q)) / 100;
      return sp(3, `A price is increased by ${p}% and then the new price is decreased by ${q}%. The final price is what percent of the original price?`, String(v), `${(100 + p) / 100} · ${(100 - q) / 100} = ${v / 100} → <b>${v}%</b>.`); },
  ]);

  G('m-units', [
    (r) => { const s = 15 * ri(r, 1, 6);
      return sp(2, `A car travels at ${s} miles per hour. What is the car’s speed, in feet per second? (1 mile = 5,280 feet)`, String((22 * s) / 15), `${s} · 5280 / 3600 = <b>${(22 * s) / 15}</b>.`); },
    (r) => { const h = ri(r, 2, 8), rate = pk(r, [5, 10, 20, 25]);
      return sp(2, `A tank holds ${rate * 60 * h} liters. A pump removes ${rate} liters per minute. How many hours does it take to empty the tank?`, String(h), `${rate * 60 * h}/${rate} = ${60 * h} мин = <b>${h}</b> ч.`); },
  ]);

  G('m-prob', [
    (r) => { const R = ri(r, 3, 9), B = ri(r, 3, 9), Gr = ri(r, 3, 9), T = R + B + Gr, f = frac(R + Gr, T);
      return sp(1, `A bag contains ${R} red marbles, ${B} blue marbles, and ${Gr} green marbles. One marble is selected at random. What is the probability that it is not blue? (Enter a fraction or a decimal.)`, [f], `(${R} + ${Gr})/${T} = <b>${f}</b>.`); },
    (r) => { const s = ri(r, 3, 11), w = 6 - Math.abs(s - 7);
      return sp(2, `Two fair six-sided dice are rolled. What is the probability that the sum of the numbers is ${s}? (Enter a fraction.)`, [frac(w, 36)], `Благоприятных исходов ${w} из 36 → <b>${frac(w, 36)}</b>.`); },
  ]);

  G('m-stats', [
    (r) => { const n = ri(r, 4, 6), a = []; let S = 0; for (let i = 0; i < n - 1; i++) { a.push(ri(r, 5, 30)); S += a[i]; }
      let L = 1; while ((S + L) % n) L++;
      return sp(2, `The mean of ${n} numbers is ${(S + L) / n}. Of these numbers, ${n - 1} are ${a.join(', ')}. What is the remaining number?`, String(L), `Сумма ${S + L}; ${S + L} − ${S} = <b>${L}</b>.`); },
    (r) => { const a = []; while (a.length < 7) { const v = ri(r, 1, 40); if (a.indexOf(v) < 0) a.push(v); } const s = a.slice().sort((x, y) => x - y);
      return sp(1, `What is the median of the data set ${a.join(', ')}?`, String(s[3]), `Упорядоченный ряд: ${s.join(', ')}. Медиана <b>${s[3]}</b>.`); },
  ]);

  G('m-dist', [
    (r) => { let n1, n2, m1, m2, tries = 0;
      do { n1 = ri(r, 10, 30); n2 = ri(r, 10, 30); m1 = ri(r, 60, 90); m2 = ri(r, 60, 95); tries++; } while ((n1 * m1 + n2 * m2) % (n1 + n2) && tries < 400);
      const v = (n1 * m1 + n2 * m2) / (n1 + n2);
      return sp(3, `Class A has ${n1} students with an average score of ${m1}. Class B has ${n2} students with an average score of ${m2}. What is the average score of all ${n1 + n2} students?`, String(v), `(${n1}·${m1} + ${n2}·${m2})/${n1 + n2} = <b>${v}</b>.`); },
  ]);

  G('m-scatter', [
    (r) => { const m = pk(r, [1.5, 2.5, 3.5, 4, 6, -2, -3, 5]), b = ri(r, 10, 60), x = 2 * ri(r, 1, 6), y = m * x + b;
      return sp(1, `A line of best fit for a data set is y = ${m}x ${sg(b)}. According to the model, what is the predicted value of y when x = ${x}?`, String(y), `${m} · ${x} + ${b} = <b>${y}</b>.`); },
    (r) => { const m = pk(r, [2, 3, 4, 5]), b = ri(r, 10, 50), x = ri(r, 2, 12), d = pk(r, [-9, -7, -5, -3, -2, 2, 3, 5, 7, 9]), pred = m * x + b;
      return sp(2, `A model for a data set is y = ${m}x + ${b}. For the data point with x = ${x}, the actual y-value is ${pred + d}. What is the residual (actual minus predicted)?`, String(d), `Прогноз ${pred}; ${pred + d} − ${pred} = <b>${d}</b>.`); },
  ]);

  G('m-infer', [
    (r) => { let n, N, k, v, tries = 0;
      do { n = pk(r, [100, 150, 200, 250, 400]); N = pk(r, [2000, 3000, 4000, 5000, 6000]); k = ri(r, Math.ceil(n * 0.1), Math.floor(n * 0.6)); v = (k * N) / n; tries++; } while (!Number.isInteger(v) && tries < 500);
      return sp(2, `In a random sample of ${n} customers, ${k} said they prefer online shopping. Based on the sample, about how many of the ${N} customers in the population prefer online shopping?`, String(v), `${k}/${n} · ${N} = <b>${v}</b>.`); },
  ]);

  G('m-area', [
    (r) => { const R = ri(r, 2, 6), h = ri(r, 2, 12);
      return sp(2, `A right circular cylinder has radius ${R} and height ${h}. Its volume is kπ. What is the value of k?`, String(R * R * h), `V = π·${R}²·${h}, k = <b>${R * R * h}</b>.`); },
    (r) => { const s = ri(r, 2, 9);
      return sp(3, `The surface area of a cube is ${6 * s * s} square units. What is the volume of the cube, in cubic units?`, String(s * s * s), `6s² = ${6 * s * s} → s = ${s} → V = <b>${s * s * s}</b>.`); },
  ]);

  G('m-angles', [
    (r) => { const a = ri(r, 25, 80), b = ri(r, 25, 80);
      return sp(1, `In a triangle, two angles measure ${a}° and ${b}°. What is the measure, in degrees, of the third angle?`, String(180 - a - b), `180 − ${a} − ${b} = <b>${180 - a - b}</b>.`); },
    (r) => { const a = ri(r, 3, 9), b = ri(r, 3, 12), k = ri(r, 2, 4);
      return sp(2, `Triangle ABC is similar to triangle DEF, where AB corresponds to DE and BC corresponds to EF. If AB = ${a}, DE = ${a * k}, and BC = ${b}, what is the length of EF?`, String(b * k), `Коэффициент ${k}: EF = ${b}·${k} = <b>${b * k}</b>.`); },
  ]);

  G('m-trig', [
    (r) => { const t = pk(r, [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]), k = ri(r, 1, 4), mode = ri(r, 0, 1);
      return mode
        ? sp(1, `The legs of a right triangle have lengths ${t[0] * k} and ${t[1] * k}. What is the length of the hypotenuse?`, String(t[2] * k), `Тройка ${t[0]}-${t[1]}-${t[2]} × ${k} → <b>${t[2] * k}</b>.`)
        : sp(2, `A right triangle has a hypotenuse of length ${t[2] * k} and one leg of length ${t[0] * k}. What is the length of the other leg?`, String(t[1] * k), `Тройка ${t[0]}-${t[1]}-${t[2]} × ${k} → <b>${t[1] * k}</b>.`); },
  ]);

  G('m-trig2', [
    (r) => { const n = pk(r, [2, 3, 4, 5, 6, 9, 10, 12]), k = ri(r, 1, 2);
      return sp(1, `How many degrees are in ${k === 1 ? '' : k}π/${n} radians?`, String((180 * k) / n), `${k}·180/${n} = <b>${(180 * k) / n}</b>.`); },
  ]);

  G('m-circles', [
    (r) => { const th = pk(r, [60, 90, 120, 180]), R = 6 * ri(r, 1, 4), k = (th * R) / 180;
      return sp(2, `An arc of a circle with radius ${R} has a central angle of ${th}°. The length of the arc is kπ. What is the value of k?`, String(k), `(${th}/360)·2π·${R} = ${k}π → <b>k = ${k}</b>.`); },
    (r) => { const R = ri(r, 3, 12);
      return sp(2, `A circle has a circumference of ${2 * R}π. Its area is kπ. What is the value of k?`, String(R * R), `r = ${R}; A = π·${R}² → <b>k = ${R * R}</b>.`); },
  ]);

  G('m-coord', [
    (r) => { const t = pk(r, [[3, 4, 5], [5, 12, 13], [6, 8, 10]]), k = ri(r, 1, 3), x = ri(r, -5, 5), y = ri(r, -5, 5);
      return sp(2, `What is the distance between the points (${x}, ${y}) and (${x + t[0] * k}, ${y + t[1] * k})?`, String(t[2] * k), `Тройка × ${k}: <b>${t[2] * k}</b>.`); },
    (r) => { const x1 = 2 * ri(r, -5, 5), y1 = 2 * ri(r, -5, 5), x2 = 2 * ri(r, -5, 5), y2 = 2 * ri(r, -5, 5);
      return sp(1, `The midpoint of the segment with endpoints (${x1}, ${y1}) and (${x2}, ${y2}) is (a, b). What is the value of a + b?`, String((x1 + x2 + y1 + y2) / 2), `a = ${(x1 + x2) / 2}, b = ${(y1 + y2) / 2} → <b>${(x1 + x2 + y1 + y2) / 2}</b>.`); },
  ]);
})();
