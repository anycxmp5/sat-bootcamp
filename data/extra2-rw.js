/* Reading & Writing — ещё задания для Information and Ideas и Craft and Structure. Оригинальные. */
(function () {
  const { mc } = SAT, E = SAT.extend;
  const P = (t) => '<p>' + t + '</p>';
  const T12 = (a, b) => `<span class="src">Text 1</span><p>${a}</p><span class="src">Text 2</span><p>${b}</p>`;
  const MAIN = 'Which choice best states the main idea of the text?';
  const PURP = 'Which choice best states the main purpose of the text?';
  const LOGIC = 'Which choice most logically completes the text?';
  const REL = 'Which choice best describes how Text 2 relates to Text 1?';

  E('rw-central', [
    mc(1, MAIN, ['Dolphins use individual whistles that function like names', 'Dolphins are born able to speak', 'Dolphins whistle only when threatened', 'People have taught dolphins to answer to names'], 0, 'У каждого дельфина свой «signature whistle», по которому его зовут, <b>как человека по имени</b>.',
      P('Bottlenose dolphins give themselves names of a sort. Each develops a distinctive “signature whistle” within its first year, and other dolphins use that whistle to call the individual, much as people use a name.')),
    mc(1, 'According to the text, what was the most common complaint of bus riders?', ['Unreliable schedules', 'High fares', 'Crowded buses', 'Limited service at night'], 0, 'Прямо в тексте: «the most common complaint was unreliable schedules».',
      P('In 2022, the city of Harlow surveyed bus riders and found that the most common complaint was unreliable schedules. In response, the transit agency added a real-time tracking app and increased service on its five busiest routes. Ridership rose 8 percent the following year.')),
    mc(2, MAIN, ['Tomás’s view of his grandfather’s workshop changes as he works there with him', 'Tomás dislikes his grandfather', 'Tomás plans to sell the workshop', 'Restoring chairs is difficult'], 0, 'Сначала Томас не ценил мастерскую, затем не хочет уходить: отношение <b>меняется</b>.',
      P('Tomás had never admired his grandfather’s workshop: the sawdust, the noise, the cramped benches. But on the afternoon he spent restoring a broken chair beside him, he found himself reluctant to leave.')),
    mc(3, MAIN, ['Roman concrete’s durability likely comes from a self-healing composition rather than from its thickness', 'Roman concrete was thicker than modern concrete', 'Volcanic ash weakens concrete', 'Modern engineers have copied Roman methods exactly'], 0, 'Текст отвергает версию «толщины» и объясняет долговечность <b>самозалечиванием</b> за счёт вулканического пепла.',
      P('A common assumption is that ancient Roman concrete endured because it was simply thicker than modern concrete. Recent analyses suggest otherwise: the Romans mixed volcanic ash into their concrete, and when cracks formed, water reacting with the ash helped fill them, effectively allowing the material to heal itself.')),
    mc(2, 'Which choice best states the study’s main finding?', ['When coffee is consumed may matter more for sleep than how much is consumed', 'Coffee never affects sleep', 'Drinking more coffee improves sleep', 'Non-drinkers sleep better than all coffee drinkers'], 0, 'Те, кто прекращал пить кофе к полудню, спали как не пьющие — вне зависимости от количества: важнее <b>время</b>.',
      P('Although coffee is often blamed for sleep problems, a recent study of 400 adults found that the timing of consumption mattered more than the amount: participants who stopped drinking coffee by noon slept as well as non-drinkers, regardless of how many cups they had earlier in the day.')),
  ]);

  E('rw-evidence', [
    mc(1, 'Which finding, if true, would most directly support the zoologist’s claim?', ['Urban foxes are most active at night', 'Over half of the stomach contents examined from 120 urban foxes included food scraps typically discarded by households', 'Foxes have lived in cities for decades', 'Rural foxes eat mostly small rodents'], 1, 'Нужна прямая связь «городские лисы едят продукты человека». Её показывает только содержимое желудков.',
      P('A zoologist claims that urban foxes have adapted to eat human-made foods.')),
    mc(2, 'Which choice most effectively uses data from the table to support the claim?', ['Membership was 14 in 2019 and rose each year, reaching 47 in 2022', 'Membership was 22 in 2020', 'Membership in 2022 was higher than in 2021', 'Membership fell between 2019 and 2020'], 0, 'Утверждение о росте <b>каждый год</b> с 2019 по 2022: только A показывает весь ряд (14 → 22 → 31 → 47).',
      P('A student claims that the number of members in the coding club grew every year from 2019 to 2022.') + '<table><tr><th>Year</th><th>2019</th><th>2020</th><th>2021</th><th>2022</th></tr><tr><td>Members</td><td>14</td><td>22</td><td>31</td><td>47</td></tr></table>'),
    mc(2, 'Which finding, if true, would most directly weaken the historian’s argument?', ['The manuscript is written in Latin', 'Handwriting analysis found at least three distinct hands in the manuscript', 'The manuscript was copied in the 1300s', 'The manuscript contains illustrations'], 1, 'Несколько почерков прямо противоречат версии об <b>одном</b> переписчике.',
      P('A historian argues that a medieval manuscript was copied by a single scribe.')),
    mc(2, 'Which quotation from the text best supports the claim that the narrator feels affection for the house?', ['“I had not set foot in the old house for ten years”', '“every creaking stair felt like a greeting”', '“the faded yellow paint I once complained about”', '“In the kitchen”'], 1, 'Скрипящая лестница, воспринимаемая как «приветствие», показывает <b>тёплое отношение</b>. Первый вариант лишь сообщает о долгом отсутствии.',
      P('I had not set foot in the old house for ten years, yet every creaking stair felt like a greeting. In the kitchen, the faded yellow paint I once complained about now seemed the color of sunshine.') + '<p><i>Claim: The narrator feels affection for the house.</i></p>'),
    mc(3, 'Which finding, if true, would most strongly support the claim?', ['Adolescents who report less screen time before bed tend to report sleeping more', 'In a trial, 90 adolescents were randomly assigned to avoid screens for an hour before bed or keep their usual routine; the screen-free group fell asleep about 18 minutes faster', 'Most adolescents own at least one device with a screen', 'Sleep experts recommend a consistent bedtime'], 1, 'Эксперимент со случайным распределением лучше всего показывает <b>причинную</b> связь; обзорные данные лишь показывают корреляцию.',
      P('A researcher claims that avoiding screens before bed improves adolescents’ sleep.')),
  ]);

  E('rw-inferences', [
    mc(1, LOGIC, ['nocturnal', 'herbivorous', 'migratory', 'endangered'], 0, 'Лиса охотилась только между сумерками и рассветом — вероятно, <b>nocturnal</b>.',
      P('Nocturnal animals are most active at night. Because the red fox in the study was seen hunting only between dusk and dawn, researchers concluded that the fox is likely ______')),
    mc(2, LOGIC, ['the season', 'its price', 'the bakery’s location', 'competitors’ advertising'], 0, 'Продажи растут каждый октябрь и падают к декабрю — спрос связан с <b>сезоном</b>. Про цену и конкурентов нет данных.',
      P('The bakery’s sales of pumpkin bread increase every October and fall sharply by December. This pattern suggests that demand for the bread is most closely tied to ______')),
    mc(2, LOGIC, ['is exposed to harsher weather conditions', 'carries many more vehicles each day', 'was built more recently', 'has more lanes'], 0, 'Трафик у мостов одинаков, поэтому разница в окраске скорее объясняется внешними условиями: более суровой погодой. Остальное либо противоречит условию, либо не следует из него.',
      P('Although both bridges carry roughly the same number of vehicles daily, the Eastgate Bridge needs repainting twice as often as the Westgate Bridge. One plausible explanation is that Eastgate ______')),
    mc(3, LOGIC, ['weaving as a local trade declined after the 1860s', 'the town’s population decreased', 'weavers moved to larger towns', 'the records were destroyed in a fire'], 0, 'Население росло, а ткачей почти не стало — вывод: местное ткачество <b>пришло в упадок</b>. Причины (переезд, пожар) в тексте не названы.',
      P('Historians note that the town’s records from 1840 to 1860 list dozens of weavers, but records after 1870 list almost none, even though the town’s population kept growing. This suggests that ______')),
    mc(2, LOGIC, ['must have received the new sheet music', 'may have received the new sheet music', 'did not need the new sheet music', 'was absent from the choir'], 0, 'Правило без исключений: каждый, кто был во вторник, получил ноты. Прия была — значит <b>обязательно</b> получила.',
      P('Every choir member who attended Tuesday’s rehearsal also received the new sheet music. Priya attended Tuesday’s rehearsal, so she ______')),
  ]);

  E('rw-structure', [
    mc(1, PURP, ['To describe how a landmark’s role has changed over time', 'To argue that lighthouses should be reopened', 'To explain how automated beacons work', 'To compare two lighthouses'], 0, 'Сначала — маяк направлял корабли, теперь он туристическая достопримечательность: <b>изменение роли</b>.',
      P('For more than a century, Cape Merrow Lighthouse guided ships past a dangerous reef. Today, though automated beacons have replaced its keepers, the tower remains a popular destination for visitors who come to climb its spiral stairs.')),
    mc(2, 'Which choice best describes the function of the last sentence (“In one experiment…”)?', ['It provides evidence that undermines a common belief', 'It introduces the belief that is later challenged', 'It defines the term “memory”', 'It describes a limitation of the study'], 0, 'Второе предложение оспаривает миф, а последнее — <b>эксперимент в подтверждение</b> опровержения.',
      P('Many people think that goldfish have three-second memories. This claim, however, does not hold up under testing. In one experiment, goldfish trained to push a lever for food remembered the task weeks later.')),
    mc(3, 'Which choice best describes the function of the phrase “a small theater” in the text?', ['To convey that cooking in the family kitchen felt like a performance', 'To suggest that the chef’s family was wealthy', 'To explain how theaters are built', 'To criticize the mother’s cooking'], 0, 'Метафора «маленький театр»: мама у плиты «выступает» для четырёх зрителей-детей.',
      P('In her memoir, the chef recalls the kitchen of her childhood as “a small theater”: her mother, at the stove, performed each evening for an audience of four hungry children.')),
    mc(2, 'Which choice best describes the overall structure of the text?', ['An assumption is presented, a discovery overturns it, and the significance is stated', 'A hypothesis is proposed and then tested in three experiments', 'Two competing theories are compared', 'A process is explained step by step'], 0, 'Допущение (жизни нет без света) → открытие в 1977 → значение для науки.',
      P('Scientists studying the deep sea once assumed that life could not survive without sunlight. Then, in 1977, researchers exploring hydrothermal vents discovered thriving communities of tube worms and clams that depend on chemical energy instead. The discovery reshaped biologists’ understanding of where life can exist.')),
  ]);

  E('rw-cross', [
    mc(1, REL, ['It raises a drawback of the arrangement praised in Text 1', 'It repeats the benefits listed in Text 1', 'It defines remote work', 'It denies that remote work exists'], 0, 'Text 1 хвалит удалёнку, Text 2 называет <b>недостаток</b> — изоляцию и слабое сотрудничество.',
      T12('Remote work saves employees commuting time and increases job satisfaction.', 'Remote workers often report feeling isolated from colleagues, which can reduce collaboration.')),
    mc(2, 'Based on the texts, how would the author of Text 2 most likely respond to the claim in Text 1?', ['By suggesting that experience with language is more influential than Text 1 implies', 'By agreeing that grammar is entirely innate', 'By arguing that children do not learn grammar', 'By claiming that psychologists should not study children'], 0, 'Text 2: грамматика развивается вместе с количеством услышанной речи, значит <b>опыт играет центральную роль</b>.',
      T12('Some linguists argue that children acquire language mainly through innate knowledge of grammar.', 'A team of psychologists found that children’s grammar develops closely in step with the amount of speech they hear, suggesting that exposure plays a central role.')),
    mc(3, REL, ['It offers data that challenge the critics’ claim in Text 1', 'It proves that tests are perfect', 'It agrees with the critics', 'It describes how tests are written'], 0, 'Тесты предсказывают оценки в колледже так же, как GPA, — это <b>данные против</b> тезиса о том, что они измеряют лишь умение сдавать тесты.',
      T12('Critics of standardized testing claim that the exams measure test-taking skill rather than knowledge.', 'A study that tracked 5,000 students found that standardized scores predicted college grades about as well as high school GPA did, suggesting the tests capture meaningful academic skill.')),
    mc(2, 'Which choice best describes how Reed’s argument relates to Lopez’s claim?', ['Reed partly agrees with Lopez but identifies a different primary cause', 'Reed rejects every point Lopez makes', 'Reed repeats Lopez’s conclusion', 'Reed provides a biography of Lopez'], 0, 'Рид соглашается, что границы истощали ресурсы, но главной причиной называет <b>внутренние распри</b>.',
      T12('Historian Lopez claims that the empire collapsed mainly because of overextended borders.', 'Historian Reed agrees that borders strained resources but argues that internal political rivalries ultimately proved decisive.')),
  ]);
})();
