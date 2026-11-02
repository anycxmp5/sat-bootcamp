/* Reading & Writing — Standard English Conventions, Expression of Ideas.
   Все задания оригинальные, написаны в формате Digital SAT. */
(function () {
  const { mc } = SAT;
  const P = (t) => '<p>' + t + '</p>';
  const STD = 'Which choice completes the text so that it conforms to the conventions of Standard English?';
  const TRANS = 'Which choice completes the text with the most logical transition?';

  SAT.addTopics([
    /* ================= STANDARD ENGLISH CONVENTIONS ================= */
    {
      id: 'rw-boundaries', section: 'rw', domain: 'sec', title: 'Boundaries (Punctuation)', ru: 'Границы предложений и пунктуация',
      lesson: `
<p>Эти задания проверяют, как правильно <b>соединять и разделять</b> части предложения. Всё решается небольшим набором правил.</p>
<div class="callout"><b>Независимое предложение (IC)</b> — есть подлежащее и сказуемое, и оно может стоять само. <b>Зависимое (DC)</b> — начинается с although, because, when, which и т. п. и само стоять не может.</div>
<h3>Как соединять</h3>
<table><tr><th>Соединение</th><th>Знак</th></tr>
<tr><td>IC + IC</td><td><code>;</code> или <code>, and/but/so</code> (запятая + FANBOYS)</td></tr>
<tr><td>IC + список / пояснение</td><td><code>:</code> (после полного IC) или <code>—</code></td></tr>
<tr><td>DC, IC</td><td>запятая после вводной части</td></tr>
<tr><td>IC + DC</td><td>обычно запятая не нужна</td></tr>
<tr><td>Вставка (nonessential)</td><td>запятые / тире с <b>обеих</b> сторон</td></tr></table>
<h3>Три главных запрета</h3>
<ul><li><b>Comma splice:</b> две IC, соединённые одной запятой — ошибка.</li>
<li><b>Run-on:</b> две IC вообще без знака — ошибка.</li>
<li>Никакой запятой (и одной пары знаков) <b>между подлежащим и сказуемым</b>.</li></ul>
<div class="example">The storm knocked out power, <b>and</b> crews worked all night. ✔ &nbsp; The storm knocked out power, crews worked all night. ✘ (comma splice)</div>
<div class="trap">Двоеточие ставится только после <b>полного</b> предложения. «My favorite colors are: red…» — ошибка.</div>`,
      questions: [
        mc(1, STD, ['1920s, it', '1920s; it', '1920s it', '1920s: it'], 1,
          'После «1920s» — полное предложение, дальше тоже полное («it also includes…»). Две IC соединяются точкой с запятой: <b>1920s; it</b>. Запятая даст comma splice, без знака — run-on.',
          P('The museum’s newest exhibit features paintings from the ______ also includes rare photographs.')),
        mc(1, STD, ['hike,', 'hike:', 'hike;', 'hike and'], 1,
          'После полного предложения «Marisol packed three essentials for the hike» идёт перечисление — ставится <b>двоеточие</b>. Точка с запятой требует IC после себя.',
          P('Marisol packed three essentials for the ______ water, sunscreen, and a map.')),
        mc(1, STD, ['early,', 'early;', 'early:', 'early'], 3,
          'Подлежащее «The students who finished the exam early» и сказуемое «were allowed» нельзя разделять знаками. Верно: <b>без знака</b>.',
          P('The students who finished the exam ______ were allowed to leave quietly.')),
        mc(2, STD, ['Kilimanjaro, the highest peak in Africa attracts', 'Kilimanjaro the highest peak in Africa, attracts', 'Kilimanjaro, the highest peak in Africa, attracts', 'Kilimanjaro; the highest peak in Africa; attracts'], 2,
          '«the highest peak in Africa» — вставка (nonessential). Она выделяется <b>парой знаков</b> с двух сторон. Только C ставит запятые с обеих сторон.',
          P('Mount ______ thousands of climbers each year.')),
        mc(2, STD, ['result,', 'result;', 'result:', 'result —'], 0,
          'Начало «Although …» — зависимая часть. После неё нужна <b>запятая</b>, затем идёт независимое «the team learned…». Точка с запятой и двоеточие здесь недопустимы.',
          P('Although the experiment failed to produce the expected ______ the team learned a great deal about the limits of their equipment.')),
        mc(2, STD, ['county, and', 'county,', 'county and,', 'county; and'], 0,
          'Две независимые части: «The storm knocked out power…» и «crews worked…». Нужно <b>запятая + and</b>. Просто запятая — comma splice; «; and» — неверно.',
          P('The storm knocked out power across the ______ crews worked through the night to restore it.')),
      ],
    },
    {
      id: 'rw-form', section: 'rw', domain: 'sec', title: 'Form, Structure, and Sense', ru: 'Грамматика: форма, структура, смысл',
      lesson: `
<p>Эти задания проверяют <b>грамматическое согласование</b>. Пять самых частых тем:</p>
<ol>
<li><b>Подлежащее — сказуемое.</b> Ищите подлежащее, отбрасывая вставки: <i>The collection of coins, which was donated…, <b>is</b> on display.</i></li>
<li><b>Neither/nor, either/or:</b> сказуемое согласуется с ближайшим подлежащим.</li>
<li><b>Местоимения:</b> <i>company → it/its</i>, а не <i>they/their</i>; различайте <b>its/it’s</b>, <b>their/they’re</b>.</li>
<li><b>Времена:</b> Past Perfect (<i>had waited</i>) — действие, произошедшее <b>до</b> другого прошлого; Present Perfect — связь с настоящим.</li>
<li><b>Модификаторы:</b> слово сразу после запятой должно быть тем, кто выполняет действие вводной фразы.</li></ol>
<h3>Апостроф</h3>
<ul><li>Единственное число: <i>the student’s book</i>.</li><li>Множественное на -s: <i>the students’ books</i>.</li><li>Обычное множественное (без владения) — без апострофа.</li></ul>
<div class="example">Walking along the beach, <b>Jonas</b> found the sunrise spectacular. ✔ — Walking кто? Jonas. &nbsp; Walking along the beach, the sunrise seemed spectacular. ✘</div>
<div class="trap">Ближайшее существительное не всегда подлежащее: «The <u>box</u> of <i>chocolates</i> <b>is</b>…» — подлежащее box.</div>`,
      questions: [
        mc(1, STD, ['are', 'is', 'were', 'have been'], 1,
          'Подлежащее — «The collection» (единственное число). Вставка с «coins» и «families» отвлекает. Верно: <b>is</b>.',
          P('The collection of rare coins, which was donated by several families, ______ on display until June.')),
        mc(2, STD, ['was', 'is', 'were', 'has been'], 2,
          'При «neither … nor» глагол согласуется с ближайшим подлежащим — «players» (мн. число). Прошедшее время подтверждается контекстом: <b>were</b>.',
          P('Neither the coach nor the players ______ expecting the schedule change.')),
        mc(1, STD, ['their', 'its', 'it’s', 'they’re'], 1,
          'Company — единственное число, нужен притяжательный падеж: <b>its</b>. «It’s» = «it is».',
          P('The company announced that ______ new headquarters will open in March.')),
        mc(2, STD, ['the sunrise seemed spectacular to Jonas.', 'Jonas found the sunrise spectacular.', 'the sunrise was spectacular for him.', 'spectacular was the sunrise Jonas saw.'], 1,
          'Фраза «Walking along the beach» должна относиться к человеку, который идёт, — <b>Jonas</b>. В остальных вариантах «ходит» восход солнца.',
          P('Walking along the beach at dawn, ______')),
        mc(2, STD, ['waited', 'had been waiting', 'have waited', 'were waited'], 1,
          'Действие длилось до момента в прошлом («by the time the team arrived»): <b>had been waiting</b> (Past Perfect Continuous).',
          P('By the time the rescue team arrived, the hikers ______ for nearly six hours.')),
        mc(3, STD, ['towns’', 'town’s', 'towns', 'towns’s'], 0,
          'Владельцы — два города («two towns»), множественное число на -s → апостроф после s: <b>towns’</b> decision.',
          P('The two ______ decision to merge their libraries surprised residents.')),
      ],
    },

    /* ================= EXPRESSION OF IDEAS ================= */
    {
      id: 'rw-transitions', section: 'rw', domain: 'eoi', title: 'Transitions', ru: 'Переходные слова',
      lesson: `
<p>Нужно выбрать слово или фразу, которая верно показывает <b>логическую связь</b> между предложениями. Сначала определите связь, потом выбирайте слово.</p>
<table><tr><th>Связь</th><th>Слова</th></tr>
<tr><td>Контраст</td><td>however, but, yet, nevertheless, still, in contrast, regardless</td></tr>
<tr><td>Следствие</td><td>therefore, thus, as a result, consequently, for this reason</td></tr>
<tr><td>Добавление</td><td>moreover, furthermore, also, in addition, similarly, likewise</td></tr>
<tr><td>Пример</td><td>for example, for instance, specifically</td></tr>
<tr><td>Время / порядок</td><td>previously, meanwhile, later, finally, subsequently</td></tr>
<tr><td>Альтернатива / уточнение</td><td>alternatively, instead / in other words, indeed</td></tr></table>
<div class="callout">Прочитайте предложение <b>до</b> и <b>после</b> пропуска и спросите: «Вторая мысль <b>противоречит</b>, <b>вытекает</b>, <b>дополняет</b> или <b>иллюстрирует</b> первую?»</div>
<div class="trap">Нельзя выбирать переход по «звучанию». Закройте переходы, определите связь словами «но / поэтому / и / например» — только затем ищите синоним.</div>`,
      questions: [
        mc(1, TRANS, ['Similarly,', 'However,', 'As a result,', 'For example,'], 1,
          'Первое предложение: большинству стало быстрее. Второе: «a few riders… longer» — <b>контраст</b>.',
          P('The new bus route reduced commute times for most riders. ______ a few riders living at the route’s far end saw their trips grow longer.')),
        mc(1, TRANS, ['Nevertheless,', 'Therefore,', 'Likewise,', 'In particular,'], 0,
          'Она никогда не учила язык, но смогла заказать ужин — это <b>неожиданный контраст</b>: «Nevertheless».',
          P('Sophie had never studied Italian. ______ she was able to order dinner in Rome after only a week of using a language app.')),
        mc(2, TRANS, ['For this reason,', 'Meanwhile,', 'In contrast,', 'Previously,'], 0,
          'Панели хуже работают в жару → поэтому оставляют зазор для воздуха. Связь <b>причина-следствие</b>.',
          P('Solar panels become less efficient at high temperatures. ______ installers in hot climates often leave a gap between the panels and the roof to allow airflow.')),
        mc(1, TRANS, ['Therefore,', 'However,', 'Similarly,', 'For instance,'], 1,
          '«Often categorized as science fiction» — «Voss herself resisted such labels»: <b>противопоставление</b>.',
          P('Elena Voss’s novels are often categorized as science fiction. ______ Voss herself resisted such labels, preferring to describe her work as stories about human behavior.')),
        mc(3, TRANS, ['Regardless,', 'For example,', 'Specifically,', 'In other words,'], 0,
          'Критики разделились (хвалили / критиковали), но зрители всё равно шли в кино — <b>независимо от</b> отзывов: «Regardless».',
          P('Some critics praised the film’s visuals. Others found its plot thin. ______ audiences flocked to theaters, making it the year’s top earner.')),
        mc(2, TRANS, ['Alternatively,', 'Consequently,', 'Previously,', 'Accordingly,'], 0,
          'Если нет пахты, можно сделать замену — это <b>альтернатива</b>.',
          P('The recipe requires a cup of buttermilk. ______ you can make a substitute by adding a tablespoon of lemon juice to a cup of milk.')),
      ],
    },
    {
      id: 'rw-synthesis', section: 'rw', domain: 'eoi', title: 'Rhetorical Synthesis', ru: 'Риторический синтез',
      lesson: `
<p>Даны <b>заметки</b> (bullet points) и <b>цель</b> автора. Нужно выбрать предложение, которое достигает этой цели, используя нужные заметки.</p>
<div class="callout">Сначала <b>прочитайте цель</b> (goal), и только потом заметки. Цель подскажет, какие факты нужны, а какие лишние.</div>
<h3>Алгоритм</h3>
<ol><li>Подчеркните цель: «introduce», «contrast», «emphasize X», «explain a term», «acknowledge a limitation».</li>
<li>Отметьте 2–3 заметки, которые работают на эту цель.</li>
<li>Выберите вариант, где они есть и <b>связаны нужной логикой</b> (контраст — «although»; определение — «is a…»).</li>
<li>Исключите варианты с лишними деталями или искажёнными фактами.</li></ol>
<div class="trap">Правильный вариант не обязан включать <b>все</b> заметки. Он должен включать нужные для цели и не искажать факты.</div>`,
      questions: [
        mc(1, 'The student wants to emphasize the distance of the monarch butterfly’s migration. Which choice most effectively uses relevant information from the notes?', ['The monarch butterfly has orange and black wings.', 'Monarch butterflies migrate up to 3,000 miles between Canada and Mexico, a journey that spans several generations.', 'Monarchs are among the best-known butterflies in North America.', 'Some butterflies migrate, and monarchs are one example.'], 1,
          'Цель — расстояние. Нужна заметка «up to 3,000 miles». Вариант B даёт её (плюс поколения). Остальные расстояния не называют.',
          '<ul><li>Species: monarch butterfly</li><li>Migrates up to 3,000 miles between Canada and Mexico</li><li>Journey spans several generations</li><li>Has orange and black wings</li></ul>'),
        mc(2, 'The student wants to introduce Ada Lovelace to an audience unfamiliar with her. Which choice most effectively uses relevant information from the notes?', ['Ada Lovelace (1815–1852) was an English mathematician whose notes on Charles Babbage’s Analytical Engine include an algorithm often regarded as the first computer program.', 'Ada Lovelace wrote notes about a machine.', 'Charles Babbage’s Analytical Engine was never completed.', 'Bernoulli numbers are important in mathematics.'], 0,
          'Цель — представить человека: кто, когда, чем известна. Только A содержит годы, профессию и достижение.',
          '<ul><li>Ada Lovelace (1815–1852), English mathematician</li><li>Wrote notes on Charles Babbage’s Analytical Engine</li><li>Notes included an algorithm for computing Bernoulli numbers</li><li>Algorithm often regarded as the first computer program</li></ul>'),
        mc(2, 'The student wants to contrast gasoline and electric cars. Which choice most effectively uses relevant information from the notes?', ['Gasoline cars can refuel in about five minutes, while electric cars cost less per mile to operate.', 'Although gasoline cars can refuel in about five minutes, compared with roughly thirty at a fast charger, electric cars cost less per mile to operate.', 'Electric cars are charged at fast stations, and gasoline cars are refueled at gas stations.', 'Both gasoline cars and electric cars take time to refuel.'], 1,
          'Цель: сопоставить время заправки и стоимость. Вариант B включает оба аспекта и логику контраста («Although … compared with …»).',
          '<ul><li>Gasoline car: refuels in about 5 minutes</li><li>Electric car: about 30 minutes at a fast charging station</li><li>Electric cars cost less per mile to operate</li></ul><p><i>Goal: contrast the two kinds of vehicles in terms of refueling time and operating cost.</i></p>'),
        mc(1, 'The student wants to explain the term “umami” to readers. Which choice most effectively uses relevant information from the notes?', ['Umami is a taste found in many foods.', 'Mushrooms, tomatoes, and aged cheese are common ingredients.', 'Umami, one of five basic tastes, is often described as savory and is found in foods such as mushrooms, tomatoes, and aged cheese.', 'Five basic tastes exist, and umami was added to the list.'], 2,
          'Цель — объяснить термин: что это, как описывают, где встречается. Вариант C даёт определение и примеры.',
          '<ul><li>Term: “umami”</li><li>One of five basic tastes</li><li>Often described as savory</li><li>Found in mushrooms, tomatoes, and aged cheese</li></ul>'),
        mc(3, 'The student wants to acknowledge a limitation of the study. Which choice most effectively uses relevant information from the notes?', ['The 2020 study found that daily meditation lowers stress.', 'Participants meditated for ten minutes a day over eight weeks.', 'Although participants who meditated for ten minutes daily over eight weeks reported lower stress, the 2020 study involved only 24 people.', 'The study was published in 2020 and reported lower stress.'], 2,
          'Цель — признать ограничение. Ограничение — маленькая выборка (24). C показывает и результат, и ограничение с помощью «Although … only 24».',
          '<ul><li>Study published in 2020</li><li>24 participants</li><li>Participants meditated 10 minutes daily for 8 weeks</li><li>Participants reported lower stress</li></ul>'),
        mc(2, 'The student wants to emphasize how young the poet was when the poem was published. Which choice most effectively uses relevant information from the notes?', ['Langston Hughes (1901–1967) was a leading figure of the Harlem Renaissance.', 'Langston Hughes was only 19 when “The Negro Speaks of Rivers,” now a landmark of the Harlem Renaissance, was published in 1921.', '“The Negro Speaks of Rivers” was published in 1921.', 'Langston Hughes lived to the age of 66.'], 1,
          'Цель — подчеркнуть юный возраст. Нужны «19» и «1921». Вариант B — единственный, где возраст явно назван.',
          '<ul><li>Langston Hughes (1901–1967)</li><li>Leading figure of the Harlem Renaissance</li><li>“The Negro Speaks of Rivers” published in 1921, when he was 19</li></ul>'),
      ],
    },
  ]);
})();
