/* Reading & Writing — Craft and Structure, Information and Ideas.
   Все задания оригинальные, написаны в формате и по спецификации Digital SAT. */
(function () {
  const { mc, sp } = SAT;
  const P = (t) => '<p>' + t + '</p>';
  const WIC = 'Which choice completes the text with the most logical and precise word or phrase?';

  SAT.addTopics([
    /* ================= CRAFT AND STRUCTURE ================= */
    {
      id: 'rw-words', section: 'rw', domain: 'cs', title: 'Words in Context', ru: 'Слова в контексте',
      lesson: `
<p>Задание: выбрать слово или фразу, которые <b>точнее всего</b> подходят по смыслу и тону. Это самый частый тип вопросов в Reading & Writing — на каждом экзамене их 4–6 на модуль.</p>
<div class="callout">Сначала <b>закройте варианты</b> и сами придумайте слово, которое подошло бы в пропуск. Только потом сверяйтесь с ответами. Так вы не поддадитесь красивому, но неподходящему слову.</div>
<h3>Алгоритм</h3>
<ol>
<li>Найдите в тексте <b>подсказку</b>: слово-синоним, антоним, пояснение после двоеточия или запятой.</li>
<li>Определите <b>направление</b>: продолжение мысли (also, and) или контраст (although, but, rather than, yet).</li>
<li>Сформулируйте свой вариант одним-двумя словами.</li>
<li>Подставьте каждый вариант и проверьте <b>смысл и тон</b> (позитивный / негативный / нейтральный).</li></ol>
<div class="example">«Although the novel was dismissed as frivolous, it is now seen as a <i>seminal</i> work.» Контраст («although … dismissed») → нужно слово с положительным значением «важный, основополагающий».</div>
<h3>Типовые вопросы на лексику</h3>
<ul><li><b>Многозначные слова:</b> «table» в американском английском — «отложить», «run» — «управлять», «bear» — «нести/выносить». Подставляйте значение из контекста, а не самое известное.</li>
<li><b>Оттенки:</b> «thrifty» (хвалим) vs «stingy» (осуждаем).</li></ul>
<div class="trap">Нельзя выбирать слово только потому, что оно «звучит умно». Если вариант не подтверждается подсказкой в тексте — он неверный.</div>`,
      questions: [
        mc(1, WIC, ['trivial', 'seminal', 'obscure', 'predictable'], 1,
          'Подсказка: «Although … dismissed … as frivolous» — контраст. Нужно положительное «важный, основополагающий»; <b>seminal</b> подходит, «reshaped how authors approach narrative» это подтверждает.',
          P('Although the novel was initially dismissed by critics as frivolous, it has since been recognized as a ______ work that reshaped how contemporary authors approach narrative voice.')),
        mc(1, WIC, ['hesitant', 'generous', 'forceful', 'transparent'], 0,
          'Конструкция «anything but ___»: мэр действовала быстро, значит она была <b>hesitant</b> (нерешительной) — противоположное. Остальные слова не противопоставляются «announced a plan within a day».',
          P('The mayor’s response to the budget crisis was anything but ______: rather than weighing options for weeks, she announced a comprehensive plan within a day.')),
        mc(2, WIC, ['disputed', 'corroborated', 'overshadowed', 'postponed'], 1,
          'Независимые команды получили почти те же результаты — значит выводы <b>corroborated</b> (подтверждены). «Disputed» противоречит тексту.',
          P('Marine biologist Dr. Alana Reyes’s findings were ______ by subsequent studies; independent teams in three countries obtained nearly identical results.')),
        mc(2, WIC, ['viable', 'conspicuous', 'volatile', 'negligible'], 0,
          'Растение хранит воду и переживает засухи, которые убивают других, — оно остаётся <b>viable</b> (жизнеспособным). Остальные слова не отражают выживание.',
          P('Because the desert plant stores water in its thick leaves, it can remain ______ during droughts that would kill most other vegetation.')),
        mc(3, 'As used in the text, what does the word “table” most nearly mean?', ['postpone', 'summarize', 'display', 'reject'], 0,
          'В американском английском «to table a proposal» = отложить рассмотрение. Контекст: «frustrated advocates who had hoped for a vote that evening» — голосования не было, то есть вопрос <b>отложили</b>.',
          P('The committee’s decision to table the proposal frustrated advocates who had hoped for a vote that evening.')),
        mc(3, WIC, ['scathing', 'measured', 'effusive', 'cursory'], 1,
          '«Even the author, usually defensive, conceded that several criticisms were fair» — рецензия была сдержанной и обоснованной: <b>measured</b>. «Scathing» (разгромная) не вызвала бы согласия.',
          P('The critic’s review was so ______ that even the author, usually defensive about her work, conceded that several of the criticisms were fair.')),
      ],
    },
    {
      id: 'rw-structure', section: 'rw', domain: 'cs', title: 'Text Structure and Purpose', ru: 'Структура и цель текста',
      lesson: `
<p>Здесь спрашивают не <i>о чём</i> текст, а <i>что он делает</i>: объясняет, опровергает, иллюстрирует, сравнивает. Два подтипа: <b>основная цель всего текста</b> и <b>функция отдельного предложения</b>.</p>
<div class="callout">Ответ почти всегда начинается с глагола: <i>to describe, to illustrate, to challenge, to propose, to correct, to explain</i>. Найдите в тексте движение мысли — и подберите глагол.</div>
<h3>Алгоритм</h3>
<ol><li>Прочитайте текст и своими словами ответьте: «Автор хочет … (что сделать?)».</li>
<li>Для вопроса о предложении — определите, как оно связано с соседними: <b>пример, контраргумент, вывод, уточнение, определение</b>.</li>
<li>Исключите варианты, где глагол слишком сильный («criticize», «prove») или тема не совпадает.</li></ol>
<div class="example">«Many believe bats are blind. In fact, all bats can see…» — первое предложение: распространённое мнение, второе: опровержение. Цель: <b>исправить заблуждение</b>.</div>
<div class="trap">Правильный вариант описывает <b>весь</b> текст. Если вариант верен лишь для одной детали — это ловушка.</div>`,
      questions: [
        mc(1, 'Which choice best states the main purpose of the text?', ['To illustrate how a scientist’s overlooked work was eventually recognized', 'To criticize the Nobel committee’s selection process', 'To explain the mechanism of genetic transposition', 'To argue that scientists should avoid controversial hypotheses'], 0,
          'Текст: работу отвергали, она продолжала исследования, потом признание и Нобелевская премия — <b>illustrate recognition</b>. Механизм генов в тексте не объясняется.',
          P('Botanist Barbara McClintock’s discovery of “jumping genes” was dismissed by many of her peers in the 1950s. She continued her research quietly, and in 1983 her work was vindicated when she received the Nobel Prize in Physiology or Medicine.')),
        mc(1, 'Which choice best states the main purpose of the text?', ['To correct a common misconception', 'To describe the process of echolocation in detail', 'To compare bats with birds', 'To propose a new research method'], 0,
          'Структура: «Many people assume … In fact …» — опровержение. Цель: <b>исправить заблуждение</b>.',
          P('Many people assume that bats are blind. In fact, all bat species can see, and some, such as fruit bats, have excellent vision. Echolocation supplements rather than replaces sight.')),
        mc(2, 'Which choice best describes the function of the second sentence (“Her critics, however…”)?', ['It presents an objection to Jacobs’s position', 'It provides biographical details about Jacobs', 'It summarizes research on pedestrian-friendly cities', 'It restates Jacobs’s central claim'], 0,
          'Слово «however» + «critics claimed» вводит <b>возражение</b> против позиции Джейкобс. Третье предложение уже возвращается к поддержке её взглядов.',
          P('Urban planner Jane Jacobs argued that vibrant neighborhoods depend on mixed-use development. Her critics, however, claimed her approach ignored the needs of automobile traffic. Subsequent research on pedestrian-friendly cities has largely supported her view.')),
        mc(2, 'Which choice best describes the overall structure of the text?', ['It introduces a subject and then explains the mechanism behind a remarkable trait', 'It raises a question and then rejects two possible answers', 'It presents a theory and then offers evidence against it', 'It narrates a sequence of events in chronological order'], 0,
          'Сначала — тихоходки и их выживаемость, затем — механизм (криптобиоз). Это <b>введение темы + объяснение механизма</b>.',
          P('Tardigrades, microscopic animals often called water bears, can survive conditions that would kill nearly any other organism: extreme heat, radiation, even the vacuum of space. When dehydrated, they enter a state called cryptobiosis, in which their metabolism slows to less than 0.01 percent of its normal rate.')),
        mc(1, 'Which choice best states the main purpose of the text?', ['To describe how a change in method led to better results', 'To argue that piano lessons are too expensive', 'To compare two piano teachers', 'To explain how to record audio'], 0,
          'Автор рассказывает, как запись себя помогла заметить ошибки и ускорила прогресс — <b>изменение метода → результат</b>.',
          P('I used to think that practicing was the only path to improvement at the piano. Then my teacher had me record myself. Listening back revealed errors my ears had missed in the moment, and my progress doubled.')),
        mc(3, 'Which choice best describes the function of the second sentence (“A survey of gig workers…”)?', ['It provides evidence that challenges a widely held view', 'It defines the term “gig economy”', 'It offers an example that supports the claim in the first sentence', 'It proposes a solution to a problem'], 0,
          'Первое предложение — распространённое мнение (flexibility). «Yet» в начале второго + опрос показывают обратное: <b>данные, ставящие мнение под сомнение</b>. Третье предложение подтверждает это («complicates the claim»).',
          P('Economists often describe the gig economy as a source of flexibility for workers. Yet a survey of gig workers found that more than half would prefer a traditional job with benefits. This finding complicates the claim that flexibility is what workers value most.')),
      ],
    },
    {
      id: 'rw-cross', section: 'rw', domain: 'cs', title: 'Cross-Text Connections', ru: 'Связь между двумя текстами',
      lesson: `
<p>Даны два коротких текста (Text 1 и Text 2) по одной теме. Вопрос обычно: как автор Text 2 <b>отреагировал бы</b> на утверждение Text 1, или как тексты связаны между собой.</p>
<div class="callout">Сформулируйте <b>позицию каждого текста одним предложением</b>, затем сравните: согласны, спорят, дополняют, предлагают другое объяснение?</div>
<h3>Типичные отношения</h3>
<ul><li><b>Опровержение</b> («however», «in fact», данные против).</li>
<li><b>Частичное согласие</b> («although», «while it matters»).</li>
<li><b>Альтернативное объяснение</b> того же факта.</li>
<li><b>Дополнение</b>: новая проблема, которой нет в Text 1.</li></ul>
<div class="trap">Отвечайте на вопрос о том, что сказал бы <b>именно этот</b> автор. Не приписывайте ему более радикальные взгляды («completely wrong», «never») — правильный ответ обычно точный и умеренный.</div>`,
      questions: [
        mc(2, 'Based on the texts, how would the author of Text 2 most likely respond to the claim in Text 1?', ['By agreeing that the press mattered but denying it was the primary cause', 'By arguing that the printing press had no effect on the Reformation', 'By agreeing that the press was the primary cause', 'By claiming reformers did not use pamphlets'], 0,
          'Text 2: «Though the press mattered» — частичное согласие; «deeper roots» — главная причина другая. Значит, пресса важна, но <b>не первопричина</b>.',
          '<span class="src">Text 1</span><p>Some historians argue that the printing press was the primary cause of the Protestant Reformation, since it allowed reformers’ ideas to spread rapidly.</p><span class="src">Text 2</span><p>Though the press mattered, the Reformation had deeper roots in widespread resentment of church corruption; without that resentment, pamphlets would have found few readers.</p>'),
        mc(2, 'Which choice best describes the relationship between the two texts?', ['Text 2 proposes a different explanation for the observation described in Text 1', 'Text 2 provides further evidence for the explanation in Text 1', 'Text 2 questions whether the observation in Text 1 is accurate', 'Text 2 describes a method used in Text 1'], 0,
          'Факт один (городские воробьи поют выше). Text 1: адаптивная реакция на шум. Text 2: <b>генетическое различие</b>. Это другое объяснение, а не сомнение в факте.',
          '<span class="src">Text 1</span><p>Researchers studying urban birds found that city-dwelling sparrows sing at higher pitches than rural ones, likely to be heard over traffic noise.</p><span class="src">Text 2</span><p>A separate team found that the higher pitch is not a flexible response to noise but a genetic difference between populations.</p>'),
        mc(2, 'Which choice best describes how Text 2 relates to Text 1?', ['It offers evidence that partly supports the idea in Text 1', 'It directly contradicts the idea in Text 1', 'It introduces a completely unrelated topic', 'It questions the credentials of the advocates'], 0,
          'В пилотном проекте продуктивность <b>не упала</b> — это поддерживает идею о том, что сокращение недели не вредит. Но рост продуктивности (Text 1) не показан, поэтому поддержка <b>частичная</b>.',
          '<span class="src">Text 1</span><p>Advocates of a four-day workweek claim it raises productivity because workers are more rested.</p><span class="src">Text 2</span><p>In a pilot involving 30 firms, productivity held steady during a four-day week, supporting claims that shorter weeks need not hurt output.</p>'),
        mc(3, 'Based on the texts, how would Demir most likely respond to Ruiz’s claim?', ['By insisting that rhythm and sound can be reproduced exactly in translation', 'By arguing that poems should not be translated', 'By conceding that sound cannot be replicated while denying that this makes translation a failure', 'By claiming that Ruiz is unfamiliar with poetry'], 2,
          'Демир соглашается, что звук не воспроизвести («does not replicate the original’s sound»), но считает перевод <b>другим, но равноценным</b> стихотворением. Вариант C точно это передаёт.',
          '<span class="src">Text 1</span><p>Literary critic Ana Ruiz holds that translation inevitably distorts a poem, since rhythm and sound cannot be carried across languages.</p><span class="src">Text 2</span><p>Translator Yusuf Demir argues that a good translation does not replicate the original’s sound but creates analogous effects in the new language, making a different but equally valid poem.</p>'),
        mc(1, 'Which choice best describes how Text 2 relates to Text 1?', ['It raises a concern that Text 1 does not address', 'It repeats the main argument of Text 1', 'It rejects the factual claim made in Text 1', 'It provides a historical background for Text 1'], 0,
          'Text 1: экологическая польза волков. Text 2: потери скота — <b>новая проблема</b>, которой в Text 1 нет. Факты Text 1 не оспариваются.',
          '<span class="src">Text 1</span><p>Many ecologists support reintroducing wolves to Yellowstone, citing benefits to vegetation as elk populations decline.</p><span class="src">Text 2</span><p>Rancher groups note that wolves have killed livestock outside the park and call for compensation programs.</p>'),
        mc(2, 'Which choice best describes how Text 2 relates to Text 1?', ['It presents a criticism of the approach described in Text 1', 'It provides an example of the approach in Text 1', 'It summarizes the history of the approach in Text 1', 'It supports Text 1 with new data'], 0,
          'Text 2 — «critics of Stoicism argue…» — это <b>критика</b> подхода из Text 1.',
          '<span class="src">Text 1</span><p>Stoic philosophy advises that people should focus only on what they can control.</p><span class="src">Text 2</span><p>Critics of Stoicism argue that this advice, taken to extremes, can discourage people from challenging unjust systems they might in fact change.</p>'),
      ],
    },

    /* ================= INFORMATION AND IDEAS ================= */
    {
      id: 'rw-central', section: 'rw', domain: 'ii', title: 'Central Ideas and Details', ru: 'Главная мысль и детали',
      lesson: `
<p>Два вопроса: «что <b>главное</b> в тексте?» и «что текст <b>прямо говорит</b> о детали?». Ответ всегда подтверждается словами из текста — домысливать не нужно.</p>
<div class="callout">Главная мысль — это ответ на вопрос «<b>Что автор хочет, чтобы я запомнил после прочтения?</b>» Она шире любой отдельной детали, но не шире самого текста.</div>
<h3>Алгоритм</h3>
<ol><li>Прочитайте текст и сформулируйте <b>вывод одним предложением</b>.</li>
<li>Исключите варианты: слишком узкие (одна деталь), слишком широкие (выходят за текст), с искажённой логикой («always», «never», когда в тексте «often»).</li>
<li>Для вопросов о деталях найдите в тексте <b>точную фразу</b> — правильный ответ перефразирует её.</li></ol>
<div class="trap">Следите за кванторами. «Does not <i>always</i> help» ≠ «never helps». Одно усилившее слово делает вариант неверным.</div>`,
      questions: [
        mc(1, 'Which choice best states the main idea of the text?', ['Octopuses display strong problem-solving abilities even though they live mostly alone', 'Octopuses are easily trained by their keepers', 'Octopuses learn primarily through social interaction', 'Laboratory conditions harm octopus intelligence'], 0,
          'Основная мысль: умения осьминогов (решение задач) <b>несмотря на</b> одиночный образ жизни. Вариант C противоречит тексту.',
          P('Octopuses are remarkable problem solvers. In laboratory settings, they have unscrewed jar lids to reach food, navigated mazes, and even learned to recognize individual human keepers. Researchers note that these abilities arise despite the octopus’s solitary lifestyle, which offers few opportunities for social learning.')),
        mc(2, 'Which choice best states the main idea of the text?', ['Alder Falls recovered from the loss of its main employer by attracting new industry', 'Alder Falls has always depended on technology firms', 'The textile industry is the best foundation for a town’s economy', 'Young people should avoid leaving small towns'], 0,
          'Сюжет: закрытие фабрики → безработица → приход технологических компаний. Главное — <b>восстановление города</b>.',
          P('In the early 1900s, the town of Alder Falls relied on a single textile mill for employment. When the mill closed in 1978, unemployment rose sharply and many young residents left. By the 1990s, however, the town had attracted several small technology firms drawn by low rents and a skilled workforce.')),
        mc(1, 'According to the text, what did the researchers caution about the study?', ['It did not directly measure academic performance', 'It included too few students', 'It was conducted over only one week', 'It ignored absences'], 0,
          'Прямая цитата: «the study did not measure academic performance directly». Размер выборки (200) в тексте не называется недостаточным.',
          P('A study of 200 high school students found that those who started school at 8:30 a.m. rather than 7:30 a.m. reported getting about 40 more minutes of sleep per night and had fewer absences. The researchers cautioned, though, that the study did not measure academic performance directly.')),
        mc(2, 'Which choice best states the main idea of the text?', ['Gradual exposure to new methods matters more than artist’s talent', 'Painter Elena Ortiz built her style by combining techniques from several traditions', 'Elena Ortiz rejected all traditional techniques', 'Techniques cannot be combined successfully'], 1,
          'Центральная идея — Ортис <b>соединила приёмы разных традиций</b>. Вариант C слишком радикален («rejected all»).',
          P('Painter Elena Ortiz trained in the strict realist tradition of her home city, then spent a decade studying Japanese ink techniques abroad. Her mature work combines the precise anatomy of the first tradition with the economy of line of the second, and critics describe the result as unmistakably her own.')),
        mc(3, 'Which choice best summarizes the text?', ['Removing invasive plants does not always help native species and can sometimes harm them', 'Removing invasive plants never helps native species', 'Native species always rebound after restoration', 'Invasive plants should never be removed from any habitat'], 0,
          'Фраза: «in roughly a third of cases, native species did not rebound and sometimes declined». Значит, удаление помогает <b>не всегда</b>. «Never» и «always» — крайности.',
          P('Ecologists once believed that removing invasive plants always helps native species recover. But a recent review of 87 restoration projects found that in roughly a third of cases, native species did not rebound and sometimes declined, because the invasive plants had been providing shelter that nothing replaced.')),
        mc(2, 'Which choice best states the main idea of the text?', ['Dara hesitates over a decision she had resolved to act on', 'Dara is angry about the rain', 'Dara has forgotten the letter', 'Dara is waiting for someone to arrive'], 0,
          'Она перечитывает письмо и не идёт к двери, к которой решила пойти. Главное — <b>колебание</b> перед решением.',
          P('Dara folded the letter and set it on the sill, then unfolded it and read it again. Outside, the rain had stopped, yet she made no move toward the door she had promised herself she would walk through that morning.')),
      ],
    },
    {
      id: 'rw-evidence', section: 'rw', domain: 'ii', title: 'Command of Evidence', ru: 'Доказательства и данные',
      lesson: `
<p>Нужно выбрать факт, цитату или данные, которые <b>лучше всего подтверждают (или ослабляют)</b> заданное утверждение. Бывает два вида: <b>textual</b> (по тексту) и <b>quantitative</b> (по таблице или графику).</p>
<div class="callout">Правильный ответ <b>напрямую</b> связан с утверждением. Если нужно «поддержать», он должен содержать именно ту связь, которую утверждает автор.</div>
<h3>Textual</h3>
<ol><li>Перефразируйте утверждение: «X приводит к Y».</li>
<li>Ищите вариант, где есть <b>и X, и Y</b> в нужной связи.</li>
<li>Исключите факты «по теме», но о другом.</li></ol>
<h3>Quantitative</h3>
<ol><li>Найдите в таблице именно те <b>строки и столбцы</b>, о которых утверждение.</li>
<li>Проверьте, что варианты приводят верные числа и верное сравнение.</li></ol>
<div class="trap">Для «ослабляющих» вопросов ищите результат, который <b>противоречит</b> утверждению, а не просто нейтральный.</div>`,
      questions: [
        mc(1, 'Which finding, if true, would most directly support the student’s claim?', ['Parks are among the most popular places for residents to visit on weekends', 'Temperatures in neighborhoods with more trees averaged 3°C lower than in comparable neighborhoods with fewer trees', 'Cities with large parks have higher housing prices', 'Trees take many years to reach maturity'], 1,
          'Нужно прямое подтверждение «зелень → прохладнее». Только B сравнивает температуры <b>с деревьями и без</b>.',
          P('A student claims that urban green spaces help reduce summer heat in surrounding neighborhoods.')),
        mc(2, 'Which finding, if true, would most directly weaken the researchers’ claim?', ['Barnacle growth is more severe in warm water than in cold water', 'After six months, boats with the coating had as many barnacles as uncoated boats', 'The coating costs more than traditional paint', 'Barnacles attach mainly to the hulls of larger boats'], 1,
          'Если лодки с покрытием обросли так же, как без него, значит покрытие <b>не работает</b> — прямое опровержение.',
          P('Marine biologists claim that a new coating prevents barnacles from growing on boat hulls.')),
        mc(2, 'Which choice most effectively uses data from the table to support the claim?', ['48% of seniors prefer practice tests, compared with 25% of freshmen', 'Group study is preferred by 35% of freshmen', 'Flashcards are preferred by 40% of freshmen and 22% of seniors', '30% of seniors prefer group study'], 0,
          'Утверждение про <b>practice tests</b> у seniors против freshmen. Только A сравнивает эту строку для обеих групп (48% против 25%).',
          P('A student claims that seniors are more likely than freshmen to prefer practice tests as a study method. The table shows the percent of surveyed students in each grade preferring each method.') + '<table><tr><th>Method</th><th>Grade 9</th><th>Grade 12</th></tr><tr><td>Flashcards</td><td>40%</td><td>22%</td></tr><tr><td>Practice tests</td><td>25%</td><td>48%</td></tr><tr><td>Group study</td><td>35%</td><td>30%</td></tr></table>'),
        mc(2, 'Which choice most effectively uses data from the table to complete the statement?', ['Visits fell sharply in 2020 and have since recovered partially, remaining below the 2019 level', 'Visits in 2022 were higher than visits in 2019', 'Visits rose every year from 2019 to 2022', 'Visits in 2021 were nearly equal to visits in 2020'], 0,
          'Данные: 12 400 → 4 100 (резкое падение) → 7 900 → 10 800 (рост, но <b>ниже 12 400</b>). Верно только A.',
          P('A librarian claims that library visits dropped sharply in 2020 and have only partially recovered.') + '<table><tr><th>Year</th><th>2019</th><th>2020</th><th>2021</th><th>2022</th></tr><tr><td>Visits</td><td>12,400</td><td>4,100</td><td>7,900</td><td>10,800</td></tr></table>'),
        mc(3, 'Which finding, if true, would most directly support the historian’s claim?', ['Telegraph companies earned large profits', 'After telegraph lines connected two cities, wheat prices in the cities differed by about 3% on average, down from about 12% before', 'Telegraph lines were built mostly in the 1850s', 'Wheat farmers adopted new machinery during the same period'], 1,
          'Утверждение: телеграф <b>уменьшил разницу в ценах</b>. Только B показывает снижение разницы после подключения линий.',
          P('A historian claims that the invention of the telegraph reduced regional differences in the price of goods.')),
        mc(2, 'Which quotation from the text most effectively illustrates the claim?', ['“Anna arrived early and chose the seat nearest the door.”', '“she cleared her throat twice before speaking, and her note cards trembled slightly in her hand”', '“by the end of her presentation, she was smiling”', '“When the committee asked her to begin”'], 1,
          'Нервозность подтверждают <b>физические признаки</b>: прочищает горло, дрожат карточки. Выбор места у двери неоднозначен, а улыбка — уже о конце.',
          P('Anna arrived early and chose the seat nearest the door. When the committee asked her to begin, she cleared her throat twice before speaking, and her note cards trembled slightly in her hand. Still, by the end of her presentation, she was smiling.') + '<p><i>Claim: Anna initially felt nervous about presenting.</i></p>'),
      ],
    },
    {
      id: 'rw-inferences', section: 'rw', domain: 'ii', title: 'Inferences', ru: 'Логические выводы',
      lesson: `
<p>Текст заканчивается пропуском, и нужно выбрать вывод, который <b>логически следует</b> из сказанного. Никаких «внешних знаний» — только то, что вытекает из текста.</p>
<div class="callout">Правильный вариант — <b>минимальный, осторожный вывод</b>. Он не добавляет новых фактов и не преувеличивает.</div>
<h3>Алгоритм</h3>
<ol><li>Выделите все факты в тексте (обычно 2–3).</li>
<li>Спросите себя: «Что из этого <b>обязательно</b> следует?»</li>
<li>Выбирайте вариант, который можно <b>доказать</b> текстом; отсеивайте всё, что звучит как «слишком сильное» (always, proves, all).</li></ol>
<div class="example">«Seedlings on the north windowsill are spindly. Dim rooms make plants grow tall and thin.» Вывод: саженцы получают <b>мало света</b>.</div>
<div class="trap">Часто неверный вариант «разумен в жизни», но в тексте для него нет основания. Проверяйте каждое слово варианта по тексту.</div>`,
      questions: [
        mc(1, 'Which choice most logically completes the text?', ['are receiving too little light', 'have been given too much water', 'are growing in poor soil', 'will soon flower'], 0,
          'Факт 1: в тусклых комнатах растения вытягиваются. Факт 2: саженцы у северного окна именно такие. Вывод: <b>света мало</b>.',
          P('Plants kept in dim rooms often grow tall and thin as they stretch toward light sources. A gardener noticed that her seedlings on the north windowsill were unusually spindly. This suggests that the seedlings ______')),
        mc(1, 'Which choice most logically completes the text?', ['accessible to readers of both languages', 'ignored by Spanish-speaking readers', 'limited to a small group of scholars', 'translated into several other languages'], 0,
          'Писала на обоих языках → её работы могут читать носители <b>обоих</b>. Остальное — домыслы.',
          P('Unlike many of her contemporaries, who published only in English, poet Lucia Marín wrote in both Spanish and English. As a result, her work was likely ______')),
        mc(2, 'Which choice most logically completes the text?', ['free up mental resources otherwise occupied by anxiety', 'eliminate the need to study', 'cause students to forget material', 'make exams easier to design'], 0,
          'Безопасный вывод: письмо о тревогах снижает тревогу, освобождая внимание. «Eliminate the need to study» — преувеличение.',
          P('In a study, participants who wrote about their worries for ten minutes before an exam scored higher than those who did not. Researchers concluded that writing about worries may ______')),
        mc(3, 'Which choice most logically completes the text?', ['a major exhibit opened the same month the policy began', 'the museum has a large permanent collection', 'admission fees fund most of the museum’s budget', 'the director is new to the museum'], 0,
          'Автор осторожен: рост <b>не обязательно</b> вызван политикой. Логичная причина сомнения — другой фактор, действовавший одновременно: новая выставка.',
          P('The museum’s director said that attendance had tripled since the free-admission policy began, but she cautioned that this by itself does not prove the policy caused the rise, since ______')),
        mc(2, 'Which choice most logically completes the text?', ['widespread but not universal among frog species in the valley', 'limited to a few rare species', 'caused by a single disease', 'unlikely to continue'], 0,
          '31 из 40 уменьшились — это <b>большинство, но не все</b>. Причина и прогноз в тексте не указаны.',
          P('Of the 40 species of frogs surveyed in the valley, 31 had declined in population since 1990. Biologists therefore concluded that the decline is ______')),
        mc(1, 'Which choice most logically completes the text?', ['check the loaf earlier than the recipe suggests', 'bake the loaf for longer than the recipe suggests', 'use less flour than the recipe requires', 'switch to a different recipe'], 0,
          'Духовка греет сильнее → хлеб испечётся быстрее → нужно <b>проверить раньше</b>.',
          P('Maya’s recipe called for baking the loaf until golden brown, but her oven runs hotter than most. To avoid burning the loaf, Maya will most likely ______')),
      ],
    },
  ]);
})();
