/* Reading & Writing — дополнительные задания (по 4 на тему). Оригинальные, формат Digital SAT. */
(function () {
  const { mc } = SAT, E = SAT.extend;
  const P = (t) => '<p>' + t + '</p>';
  const T12 = (a, b) => `<span class="src">Text 1</span><p>${a}</p><span class="src">Text 2</span><p>${b}</p>`;
  const WIC = 'Which choice completes the text with the most logical and precise word or phrase?';
  const STD = 'Which choice completes the text so that it conforms to the conventions of Standard English?';
  const TRANS = 'Which choice completes the text with the most logical transition?';
  const PURP = 'Which choice best states the main purpose of the text?';
  const MAIN = 'Which choice best states the main idea of the text?';
  const LOGIC = 'Which choice most logically completes the text?';
  const NOTES = (items) => '<ul>' + items.map((i) => '<li>' + i + '</li>').join('') + '</ul>';

  E('rw-words', [
    mc(1, WIC, ['tentative', 'boastful', 'indifferent', 'dismissive'], 0, 'Исследователи «предостерегали, что нужно больше данных» — значит, были осторожны: <b>tentative</b>.',
      P('Researchers were ______ about the results, cautioning that more data was needed before any conclusions could be drawn.')),
    mc(2, WIC, ['ornate', 'ambiguous', 'concise', 'repetitive'], 2, 'Абзац передаёт то, на что другим нужна страница, — стиль <b>concise</b> (краткий).',
      P('The author’s prose is so ______ that a single paragraph can convey what other writers need a full page to say.')),
    mc(1, WIC, ['enthusiasm', 'resistance', 'indifference', 'relief'], 1, 'Жители пришли «voice objections» — реакция <b>resistance</b>.',
      P('The new policy was met with ______ from residents, who attended the meeting in large numbers to voice their objections.')),
    mc(3, 'As used in the text, what does the word “sound” most nearly mean?', ['valid', 'noisy', 'healthy', 'shallow'], 0, 'Аргумент, где каждый шаг следует из принципов и нет изъянов, — <b>valid</b> (обоснованный).',
      P('The engineer’s argument was sound: every step followed from established principles, and independent reviewers could find no flaw.')),
  ]);
  E('rw-structure', [
    mc(1, PURP, ['To describe the high energy demands of hummingbird flight', 'To argue that hummingbirds should be protected', 'To compare different sources of nectar', 'To recount a field study of hummingbirds'], 0, 'Текст: частые взмахи и необходимость часто питаться — <b>описание энергозатрат</b>. Защита птиц и полевое исследование не упоминаются.',
      P('Hummingbirds beat their wings up to 80 times per second. To fuel this effort, they consume large quantities of nectar and must feed many times an hour.')),
    mc(2, 'Which choice best describes the function of the sentence “In 2019, voters approved a bond to construct a new facility”?', ['It introduces a problem with the old library', 'It describes the event that led to the change described in the next sentence', 'It offers a criticism of the new library', 'It defines the term “bond”'], 1, 'Решение избирателей → новое здание из следующего предложения: <b>причина изменения</b>.',
      P('For decades, the Lakeview Library held its collection in a cramped brick building. In 2019, voters approved a bond to construct a new facility. The new library, which opened last spring, has triple the shelf space and a dedicated children’s wing.')),
    mc(2, PURP, ['To criticize the practice of rehearsing speeches', 'To describe Mei’s grandmother’s cooking', 'To show a character moving from a rehearsed delivery to a more personal one', 'To explain how to prepare for public speaking'], 2, 'Мэй откладывает заметки и начинает говорить о личном — <b>переход от заученного к личному</b>.',
      P('Mei had practiced the speech so many times that the words no longer felt like hers. Standing at the podium, she set her notes aside and began to speak about the afternoon her grandmother taught her to fold dumplings.')),
    mc(3, 'Which choice best describes the overall structure of the text?', ['It defines a term and then gives several examples of it', 'It describes an experiment and then lists its flaws', 'It narrates a discovery in chronological order', 'It states a widely held assumption, presents a finding that challenges it, and notes an implication'], 3, 'Допущение (планеты только у звёзд) → находка (одинокий объект) → следствие (пересмотр моделей).',
      P('Astronomers have long assumed that planets form only around stars. Recently, however, researchers detected a Jupiter-sized object drifting alone through space, with no star in sight. If confirmed, such “rogue planets” would force a revision of existing formation models.')),
  ]);
  E('rw-cross', [
    mc(2, 'Which choice best describes how Text 2 relates to Text 1?', ['It presents findings that call into question the claim in Text 1', 'It repeats the claim in Text 1 with new vocabulary', 'It defines a term used in Text 1', 'It describes the history of bike lanes'], 0, 'Text 1: полосы уменьшают заторы. Text 2: исследование — <b>заторы почти не изменились</b>.',
      T12('City planners argue that adding bike lanes reduces traffic congestion by encouraging residents to leave their cars at home.', 'A study of five cities found that bike lanes increased cycling but had little measurable effect on overall congestion.')),
    mc(2, 'Based on the texts, how would Ortiz most likely respond to Kapoor’s belief?', ['By agreeing that rhyme should be avoided', 'By suggesting that the limitation he identifies can have a productive side', 'By arguing that rhyme is unrelated to word choice', 'By claiming that poets rarely use rhyme'], 1, 'Ортис говорит, что ограничение рифмы <b>стимулирует творчество</b>. Она согласна, что рифма ограничивает, но видит в этом пользу.',
      T12('Poet Ravi Kapoor believes rhyme limits expression, forcing poets to choose words for sound rather than meaning.', 'Critic Lena Ortiz argues that the constraint of rhyme can actually spur creativity, pushing poets toward unexpected word choices.')),
    mc(3, 'Based on the texts, how would the author of Text 2 most likely respond to the claim in Text 1?', ['By agreeing that all fat should be minimized', 'By arguing that calories are irrelevant to health', 'By suggesting that the claim overlooks the difference between kinds of fat', 'By denying that fat is calorie-dense'], 2, 'Text 2 признаёт калорийность, но утверждает, что <b>вид жира важнее количества</b>.',
      T12('Some nutrition scientists contend that dietary fat should be minimized because it is calorie-dense.', 'While fat is calorie-dense, a recent review found that diets rich in unsaturated fats were associated with improved heart health, suggesting that the type of fat matters more than the quantity.')),
    mc(1, 'Which choice best describes how Text 2 relates to Text 1?', ['It disputes the benefit described in Text 1', 'It explains how the garden was built', 'It compares the garden with another garden', 'It identifies an additional benefit not mentioned in Text 1'], 3, 'Text 1: доступ к овощам. Text 2: «also» — <b>дополнительная польза</b> (связи между соседями).',
      T12('The community garden has increased neighborhood access to fresh vegetables.', 'Organizers also report that the garden has strengthened ties among residents who previously rarely spoke.')),
  ]);
  E('rw-central', [
    mc(1, MAIN, ['Coral reefs occupy little space but support a large share of marine life', 'Coral reefs are the largest ecosystems in the ocean', 'Scientists disagree about the importance of reefs', 'Rainforests contain more species than reefs'], 0, '«Less than one percent» площади, но «a quarter of all marine species» — <b>малая площадь, большое значение</b>.',
      P('Coral reefs cover less than one percent of the ocean floor, yet they support roughly a quarter of all marine species. This disproportion has led scientists to describe reefs as “the rainforests of the sea.”')),
    mc(1, 'According to the text, what was one reason for moving the festival to October?', ['Orchard fruit had not yet reached peak ripeness in September', 'Attendance had declined in September', 'The orchards had closed for the season', 'The county fair demanded the date'], 0, 'Прямо в тексте: плоды не достигли пика спелости в сентябре. Конфликт был с ярмаркой, но не по её требованию.',
      P('For years, Millbrook held its harvest festival in September, but organizers found that many of the region’s apple orchards had not yet reached peak ripeness. Moving the festival to October allowed visitors to taste fruit at its best and also avoided a conflict with a nearby county fair.')),
    mc(2, MAIN, ['Children copy adults without understanding grammar', 'Linguists have proved that language is innate', 'Adults should correct children’s grammar errors', 'Children’s errors such as “goed” suggest they learn language by identifying rules'], 3, '«goed» — форма, которую ребёнок не слышал, значит он <b>выводит правила</b>, а не копирует.',
      P('Linguists once assumed that children learn language mainly by imitating adults. Yet children routinely produce forms they have never heard, such as “goed” for “went,” suggesting that they are extracting rules rather than copying.')),
    mc(3, 'Which choice best summarizes the text?', ['The composting program failed to reduce landfill waste', 'The program has reduced landfill waste, but uneven participation has led the city to plan targeted outreach', 'Northern districts should be excluded from the program', 'The city intends to end the program'], 1, 'Программа сработала (на ~20% больше отходов отвернули), но участие неравномерно → работа с югом.',
      P('Although the city’s new composting program diverted nearly 20 percent more waste from landfills in its first year, officials noted that participation was uneven: households in the northern districts composted at roughly twice the rate of those in the south. The city plans to focus outreach on the southern districts.')),
  ]);
  E('rw-evidence', [
    mc(1, 'Which finding, if true, would most directly support the researcher’s claim?', ['Most students report that they would like more sleep', 'Students who sleep more tend to eat breakfast', 'Students who slept eight or more hours recalled about 20% more words on a memory test than students who slept six hours or fewer', 'Memory tests are commonly given in the morning'], 2, 'Нужна прямая связь «больше сна → лучше память». Только C сравнивает результаты теста памяти.',
      P('A researcher claims that students who sleep eight or more hours perform better on memory tests.')),
    mc(2, 'Which finding, if true, would most directly weaken the botanist’s hypothesis?', ['Tomato plants with the fungus and plants without it wilted at the same rate during a two-week drought', 'The fungus is commonly found in forest soils', 'Tomato plants grow faster in warm weather', 'The fungus was first described in 1950'], 0, 'Если растения с грибом и без вянут одинаково, гриб <b>не помогает</b> — прямое опровержение.',
      P('A botanist hypothesizes that a certain soil fungus helps tomato plants resist drought.')),
    mc(2, 'Which choice most effectively uses data from the table to support the claim?', ['City A has more bike commuters than City B', '30% of City B commuters use transit', '48% of City B commuters drive, compared with 62% in City A, and 22% bike, compared with 13%', 'Transit use is higher than biking in both cities'], 2, 'Утверждение о машинах (меньше) и велосипедах (больше) в City B. Только C сравнивает обе строки правильно.',
      P('A student claims that residents of City B are less likely than residents of City A to commute by car and more likely to commute by bicycle.') + '<table><tr><th>Mode</th><th>City A</th><th>City B</th></tr><tr><td>Car</td><td>62%</td><td>48%</td></tr><tr><td>Transit</td><td>25%</td><td>30%</td></tr><tr><td>Bike</td><td>13%</td><td>22%</td></tr></table>'),
    mc(2, 'Which quotation from the text best supports the claim that the single-workshop hypothesis may be mistaken?', ['“the ceramic shards at the site were uniformly red”', '“chemical analysis revealed three distinct clay sources”', '“suggesting a single workshop”', '“The researcher notes”'], 1, 'Три разные глины противоречат версии об одной мастерской. Цвет и сама версия — это то, что оспаривается.',
      P('The researcher notes that the ceramic shards at the site were uniformly red, suggesting a single workshop. Yet chemical analysis revealed three distinct clay sources.')),
  ]);
  E('rw-inferences', [
    mc(1, LOGIC, ['combines traits seen in different animal groups', 'is a reptile', 'cannot produce milk', 'evolved from birds'], 0, 'Яйца — как у рептилий и птиц, молоко — как у млекопитающих: <b>сочетание признаков разных групп</b>.',
      P('Platypuses lay eggs, a trait typical of reptiles and birds, but they also nurse their young with milk, a trait unique to mammals. Therefore, the platypus is best described as an animal that ______')),
    mc(1, LOGIC, ['rare luxuries', 'common staples', 'banned items', 'imported only'], 1, 'Без холодильника в тёплых регионах опирались на соль и сушку — такие продукты были <b>обычной частью рациона</b>.',
      P('Before the invention of refrigeration, communities in warm climates relied heavily on salting and drying to preserve food. This suggests that salted and dried foods were likely ______ in those communities.')),
    mc(2, LOGIC, ['electric-bike owners may be more likely to ride regularly', 'conventional bikes are unsafe', 'electric bikes are cheaper than conventional bikes', 'most respondents prefer conventional bikes'], 0, '80% против 35% — владельцы электровелосипедов ездят чаще. Безопасность и цена в данных не упоминаются.',
      P('A survey found that 80 percent of respondents who owned electric bikes rode them at least weekly, while only 35 percent of respondents who owned conventional bikes rode them that often. The survey’s authors suggest that ______')),
    mc(3, LOGIC, ['was a farmer', 'lacked any education', 'had considerable resources', 'wrote the manuscript quickly'], 2, 'Дорогой материал → владелец мог себе его позволить: <b>значительные средства</b>.',
      P('The ancient manuscript was written on parchment, a material that was expensive to produce. Scholars therefore infer that the manuscript’s owner ______')),
  ]);
  E('rw-boundaries', [
    mc(2, STD, ['crowd, many', 'crowd; many', 'crowd many', 'crowd. many'], 1, 'После «crowd» — полное предложение, затем ещё одно («many attendees traveled…»). Нужна <b>точка с запятой</b>; запятая даст comma splice.',
      P('The conference drew a large ______ attendees traveled more than a day to get there.')),
    mc(2, STD, ['author; Alma Reyes; visited', 'author Alma Reyes, visited', 'author, Alma Reyes visited', 'author, Alma Reyes, visited'], 3, '«Alma Reyes» — приложение (вставка). Нужна <b>пара запятых</b>, по одной с каждой стороны.',
      P('My sister’s favorite ______ our school last week.')),
    mc(2, STD, ['costly, however,', 'costly; however,', 'costly however,', 'costly, however'], 1, '«however» между двумя независимыми предложениями: перед ним <b>точка с запятой</b>, после — запятая.',
      P('The experiment was ______ it produced valuable data.')),
    mc(3, STD, ['months;', 'months:', 'months,', 'months —'], 2, 'Вставка «which took place over six months» уже открыта запятой, значит нужна <b>закрывающая запятая</b>. Другие знаки не парные.',
      P('The results of the third and final trial, which took place over six ______ surprised the entire team.')),
  ]);
  E('rw-form', [
    mc(1, STD, ['are', 'is', 'were', 'have been'], 1, '«Each» — единственное число: <b>is</b>.',
      P('Each of the students ______ required to submit a final project.')),
    mc(2, STD, ['I', 'me', 'myself', 'mine'], 1, 'После предлога «between» нужен объектный падеж: <b>me</b>.',
      P('The award was shared between Dana and ______.')),
    mc(1, STD, ['opens', 'opened', 'has opened', 'will open'], 1, 'Конкретная дата в прошлом («in 2018») → Past Simple: <b>opened</b>.',
      P('The museum ______ its new wing in 2018, and attendance has grown steadily since.')),
    mc(3, STD, ['to communicate', 'communicates', 'communicating', 'communication'], 2, 'Параллельная структура: working, practicing, <b>communicating</b> — все герундии.',
      P('The coach praised the team for working diligently, practicing consistently, and ______ openly with one another.')),
  ]);
  E('rw-transitions', [
    mc(1, TRANS, ['Consequently,', 'Likewise,', 'However,', 'Specifically,'], 2, 'Плюс поездов (надёжность) → минус (дороже): <b>контраст</b>.',
      P('Many commuters prefer trains for their reliability. ______ trains tend to be more expensive than buses.')),
    mc(2, TRANS, ['Nevertheless,', 'For example,', 'In contrast,', 'Previously,'], 1, 'Второе предложение — конкретный пример «waggle dance»: <b>For example</b>.',
      P('Honeybees communicate the location of food through a “waggle dance.” ______ a bee that has found a distant flower patch performs a longer, more vigorous dance than one that has found a nearby patch.')),
    mc(2, TRANS, ['Even so,', 'Meanwhile,', 'As a result,', 'Likewise,'], 2, 'Плохая работа в холоде → инженеры переработали корпус: <b>следствие</b>.',
      P('The first prototype performed poorly in cold weather. ______ the engineers redesigned the battery housing, and the second prototype passed every winter test.')),
    mc(2, TRANS, ['Instead,', 'Therefore,', 'Similarly,', 'Specifically,'], 0, 'Ожидали годы, а сделали за восемь месяцев — противопоставление: <b>Instead</b>.',
      P('Dr. Kim’s team expected the vaccine to take years to test. ______ they completed the trials in under eight months.')),
  ]);
  E('rw-synthesis', [
    mc(1, 'The student wants to emphasize the sea otter’s use of tools. Which choice most effectively uses relevant information from the notes?', ['Sea otters have the densest fur of any animal and spend most of their lives in the water.', 'Sea otters, which live along Pacific coasts, use rocks as tools to crack open shellfish.', 'Sea otters live along Pacific coasts and spend most of their lives in the water.', 'Dense fur helps sea otters stay warm.'], 1, 'Цель — использование орудий. Только B упоминает камни и раскалывание моллюсков.',
      NOTES(['Sea otters live along Pacific coasts', 'Use rocks as tools to crack open shellfish', 'Have the densest fur of any animal', 'Spend most of their lives in the water'])),
    mc(2, 'The student wants to introduce Chinua Achebe to an audience unfamiliar with him. Which choice most effectively uses relevant information from the notes?', ['Chinua Achebe was born in 1930.', 'Things Fall Apart is widely read.', 'Chinua Achebe wrote about Igbo society.', 'Chinua Achebe (1930–2013) was a Nigerian novelist best known for Things Fall Apart (1958), a widely read novel depicting Igbo society before and during colonial rule.'], 3, 'Для знакомства нужны: кто, годы, главное произведение, о чём оно. Это даёт только D.',
      NOTES(['Chinua Achebe (1930–2013), Nigerian novelist', 'Best known for <i>Things Fall Apart</i> (1958)', 'The novel depicts Igbo society before and during colonial rule', 'Widely read around the world'])),
    mc(2, 'The student wants to emphasize the difference in size between the two cities. Which choice most effectively uses relevant information from the notes?', ['City A and City B are both located on the same river.', 'City B has a population of 480,000.', 'Although both cities lie on the same river, City B’s population of 480,000 is four times that of City A, which has 120,000.', 'City A has 120,000 residents and City B has more.'], 2, 'Цель — разница в размере. C даёт обе цифры и вывод «в четыре раза».',
      NOTES(['City A population: 120,000', 'City B population: 480,000', 'Both cities are on the same river'])),
    mc(3, 'The student wants to present the study’s finding while noting a limitation. Which choice most effectively uses relevant information from the notes?', ['A ten-year study of 1,200 adults found that those who walked daily had lower rates of heart disease, though the researchers did not control for diet.', 'Researchers followed 1,200 adults for ten years and did not control for diet.', 'People who walk daily have lower rates of heart disease.', 'The study of 1,200 adults proved that walking prevents heart disease.'], 0, 'Нужны и результат, и ограничение (не учтена диета). «Proved» — преувеличение.',
      NOTES(['Study followed 1,200 adults for 10 years', 'Participants who walked daily had lower rates of heart disease', 'Researchers did not control for diet'])),
  ]);
})();
