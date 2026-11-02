/* Генераторы Reading & Writing: правила английского (грамматика, пунктуация), переходы, слова в контексте.
   Задания собираются из словарей фраз, поэтому дают тысячи вариантов; верный ответ определён правилом. */
(function () {
  const { mc } = SAT;
  const ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const pk = (r, a) => a[Math.floor(r() * a.length)];
  const P = (t) => '<p>' + t + '</p>';
  const STD = 'Which choice completes the text so that it conforms to the conventions of Standard English?';
  const TRANS = 'Which choice completes the text with the most logical transition?';
  const WIC = 'Which choice completes the text with the most logical and precise word or phrase?';
  const G = SAT.addGens;

  /* ---------- Form, Structure, and Sense ---------- */
  const SING_HEADS = ['The collection', 'The stack', 'The bouquet', 'The list', 'The box', 'The series', 'The pile', 'The jar', 'The set', 'The row'];
  const PL_MODS = ['of rare coins', 'of old letters', 'of fresh flowers', 'of student names', 'of ancient maps', 'of wooden chairs', 'of heavy books', 'of colorful stickers'];
  const PLACES = ['attic', 'library', 'basement', 'museum', 'office', 'workshop'];
  const PL_HEADS = ['The students', 'The books', 'The researchers', 'The windows', 'The lights', 'The paintings', 'The engines'];
  const SG_MODS = ['in the old building', 'on the top shelf', 'at the local university', 'near the main entrance', 'from the northern region'];
  const ORGS = [['company', 'new headquarters'], ['museum', 'new wing'], ['university', 'new library'], ['bakery', 'second shop'], ['airline', 'new route'], ['library', 'new branch']];
  const MONTHS = ['March', 'June', 'September', 'October', 'January', 'April'];
  const PL_NOUNS = ['students', 'teachers', 'neighbors', 'partners', 'sisters', 'engineers', 'neighbors', 'volunteers'];
  const OBJS = ['shared project', 'joint proposal', 'final report', 'new schedule'];
  const PARALLEL = [
    ['Kenji enjoys hiking, camping, and', 'fishing', ['to fish', 'fish', 'fisher']],
    ['The new manager is organized, patient, and', 'decisive', ['decisively', 'a decision', 'to decide']],
    ['The workshop teaches students to write clearly, argue logically, and', 'revise thoroughly', ['revising thoroughly', 'thorough revisions', 'has revised thoroughly']],
    ['She plans to graduate in May, move to Chicago, and', 'start a new job', ['starting a new job', 'a new job', 'she starts a new job']],
    ['The coach praised the team for working hard, practicing daily, and', 'supporting one another', ['to support one another', 'support of one another', 'supports one another']],
    ['Volunteers will sort the donations, label the boxes, and', 'load the truck', ['loading the truck', 'the truck loaded', 'to the truck']],
    ['The apartment is spacious, bright, and', 'affordable', ['affordably', 'affordability', 'to afford']],
    ['Lena likes painting, sketching, and', 'sculpting', ['to sculpt', 'sculpt', 'sculpture']],
  ];

  G('rw-form', [
    (r) => { const h = pk(r, SING_HEADS), m = pk(r, PL_MODS), pl = pk(r, PLACES);
      return mc(1, STD, ['is', 'are', 'were', 'be'], 0, `Подлежащее — «${h}» (ед. число); «${m}» — отвлекающая вставка. Верно: <b>is</b>.`, P(`${h} ${m} ______ currently kept in the ${pl}.`)); },
    (r) => { const h = pk(r, PL_HEADS), m = pk(r, SG_MODS);
      return mc(2, STD, ['have', 'has', 'is', 'was'], 0, `Подлежащее — «${h}» (мн. число); вставка «${m}» с существительным в ед. числе не меняет согласование. Верно: <b>have</b>.`, P(`${h} ${m} ______ recently been inspected.`)); },
    (r) => {
      if (r() < 0.5) { const [o, thing] = pk(r, ORGS);
        return mc(1, STD, ['its', 'their', 'it’s', 'they’re'], 0, `«${o}» — единственное число, нужен притяжательный падеж <b>its</b> (it’s = it is).`, P(`The ${o} announced that ______ ${thing} will be ready in ${pk(r, MONTHS)}.`)); }
      const w = pk(r, ['researchers', 'engineers', 'volunteers', 'students']);
      return mc(1, STD, ['their', 'its', 'there', 'they’re'], 0, `«${w}» — множественное число: <b>their</b>.`, P(`The ${w} shared ______ findings with the rest of the team.`)); },
    (r) => { const pl = pk(r, PL_NOUNS), sg = pl.slice(0, -1), obj = pk(r, OBJS);
      return r() < 0.5
        ? mc(3, STD, [pl + '’', sg + '’s', pl, pl + '’s'], 0, `«The two» — владельцев двое, множественное число на -s: апостроф после s — <b>${pl}’</b>.`, P(`The two ______ ${obj} was approved by the board.`))
        : mc(3, STD, [sg + '’s', pl + '’', sg, pl], 0, `«A single» — владелец один: <b>${sg}’s</b>.`, P(`A single ______ idea won the contest.`)); },
    (r) => {
      if (r() < 0.5) { const ev = pk(r, ['concert', 'ceremony', 'meeting', 'game']), who = pk(r, ['fans', 'guests', 'delegates', 'parents']), n = pk(r, ['two', 'three', 'four', 'five', 'six']);
        return mc(2, STD, ['had been waiting', 'waited', 'have waited', 'are waiting'], 0, 'Действие длилось до момента в прошлом («by the time … began»): <b>had been waiting</b>.', P(`By the time the ${ev} began, the ${who} ______ for nearly ${n} hours.`)); }
      const org = pk(r, ['factory', 'studio', 'farm']), item = pk(r, ['bicycles', 'tiles', 'jars']);
      return mc(2, STD, ['has produced', 'produced', 'will produce', 'had produced'], 0, '«Since + год» связывает прошлое с настоящим: Present Perfect — <b>has produced</b>.', P(`Since ${ri(r, 2005, 2018)}, the ${org} ______ more than ${ri(r, 20, 90)} thousand ${item}.`)); },
    (r) => { const [pre, c, d] = pk(r, PARALLEL);
      return mc(3, STD, [c].concat(d), 0, 'Параллельная конструкция: элементы перечисления должны быть в одной грамматической форме.', P(`${pre} ______.`)); },
  ]);

  /* ---------- Boundaries ---------- */
  const IC_PAIRS = [
    ['The museum closed early on Monday', 'the staff attended a training session'],
    ['Maya practiced the violin for two hours', 'her fingers ached by evening'],
    ['The river flooded last spring', 'the town built a new levee'],
    ['Solar panels are getting cheaper every year', 'more families are installing them'],
    ['The orchestra tuned its instruments', 'the conductor raised her baton'],
    ['Our flight was delayed by three hours', 'we missed the opening ceremony'],
    ['The bakery opens at dawn', 'its first loaves are ready by six'],
    ['Honeybees visit thousands of flowers', 'each trip yields only a tiny drop of nectar'],
    ['The library extended its hours', 'student attendance rose sharply'],
    ['Elena studied the map carefully', 'the trail was harder to follow than she expected'],
  ];
  const DC_PAIRS = [
    ['Because the road was closed', 'we took a detour'], ['When the bell rang', 'the students filed out of the room'],
    ['Although the experiment failed', 'the team learned from it'], ['After the storm passed', 'the volunteers began cleaning up'],
    ['If you finish early', 'please review your answers'], ['Since the museum was free that day', 'the line stretched around the block'],
    ['While the soup simmered', 'Dara set the table'], ['Unless the weather improves', 'the game will be postponed'],
    ['Because she had practiced daily', 'Lin performed confidently'], ['Once the paint dries', 'we can hang the pictures'],
  ];
  const APPOS = [
    ['My neighbor', 'a retired pilot', 'grows tomatoes every summer'], ['The novel', 'a mystery set in Lisbon', 'won several awards'],
    ['Our science teacher', 'Ms. Alvarez', 'organized the field trip'], ['The Amazon', 'the largest rainforest on Earth', 'is home to millions of species'],
    ['Dr. Chen', 'a specialist in marine biology', 'will lead the expedition'], ['The library', 'built in 1925', 'is being renovated'],
    ['My cousin', 'an avid cyclist', 'rides to work daily'], ['The bridge', 'completed last year', 'has reduced commute times'],
  ];
  const SV_PAIRS = [
    ['The author of the best-selling novels', 'was awarded a national prize'], ['The students who finished the exam early', 'were allowed to leave'],
    ['The collection of rare stamps', 'is displayed on the second floor'], ['The cause of the delays', 'remains unclear'],
    ['The woman who founded the company', 'still sits on its board'], ['The results of the survey', 'surprised the entire committee'],
    ['Every one of the volunteers', 'received a certificate'], ['The path through the woods', 'leads to a hidden waterfall'],
  ];
  const split = (pair) => { const a = pair[0].split(' '), b = pair[1].split(' '); const last = a.pop(), first = b.shift(); return { pre: a.join(' '), last, first, post: b.join(' ') }; };

  G('rw-boundaries', [
    (r) => { const x = split(pk(r, IC_PAIRS));
      return mc(2, STD, [`${x.last}; ${x.first}`, `${x.last}, ${x.first}`, `${x.last} ${x.first}`, `${x.last}. ${x.first}`], 0,
        'Два самостоятельных предложения соединяются <b>точкой с запятой</b>. Запятая даёт comma splice, отсутствие знака — run-on, точка требует заглавной буквы.', P(`${x.pre} ______ ${x.post}.`)); },
    (r) => { const x = split(pk(r, DC_PAIRS));
      return mc(1, STD, [`${x.last}, ${x.first}`, `${x.last}; ${x.first}`, `${x.last} ${x.first}`, `${x.last}: ${x.first}`], 0,
        'После вводной зависимой части ставится <b>запятая</b>.', P(`${x.pre} ______ ${x.post}.`)); },
    (r) => { const [pre, ap, post] = pk(r, APPOS);
      return mc(2, STD, [`, ${ap},`, ` ${ap},`, `, ${ap}`, `; ${ap};`], 0,
        'Вставка (nonessential) выделяется <b>парой запятых</b>: по одной с каждой стороны.', P(`${pre} ______ ${post}.`)); },
    (r) => { const x = split(pk(r, SV_PAIRS));
      return mc(1, STD, [`${x.last} ${x.first}`, `${x.last}, ${x.first}`, `${x.last}; ${x.first}`, `${x.last}: ${x.first}`], 0,
        'Между подлежащим и сказуемым <b>нельзя</b> ставить знаки препинания.', P(`${x.pre} ______ ${x.post}.`)); },
  ]);

  /* ---------- Transitions ---------- */
  const REL = {
    contrast: { ru: 'контраст', words: ['However,', 'Nevertheless,', 'In contrast,', 'Still,'] },
    cause: { ru: 'следствие', words: ['Therefore,', 'As a result,', 'Consequently,', 'For this reason,'] },
    example: { ru: 'пример', words: ['For example,', 'For instance,', 'Specifically,'] },
    addition: { ru: 'добавление', words: ['Moreover,', 'Furthermore,', 'In addition,', 'Also,'] },
  };
  const TPAIRS = [
    ['contrast', 'The new phone has a stunning display.', 'its battery drains faster than last year’s model.'],
    ['contrast', 'Many residents support the new park.', 'a few worry about the cost of maintenance.'],
    ['contrast', 'The experiment was designed carefully.', 'the results were inconclusive.'],
    ['contrast', 'Most birds migrate south for the winter.', 'the chickadee stays through the coldest months.'],
    ['contrast', 'Early reviews of the film were harsh.', 'audiences embraced it.'],
    ['contrast', 'The recipe looks complicated.', 'it takes only twenty minutes.'],
    ['cause', 'Heavy snow blocked the mountain pass overnight.', 'the school district canceled classes on Monday.'],
    ['cause', 'Rainfall in the region fell sharply this year.', 'reservoir levels are at a ten-year low.'],
    ['cause', 'The team practiced every morning for months.', 'they won the regional championship.'],
    ['cause', 'Demand for electric buses has increased.', 'several manufacturers are expanding production.'],
    ['cause', 'The author spent years researching the period.', 'the novel’s details feel remarkably authentic.'],
    ['example', 'Many fruits are rich in vitamin C.', 'oranges and strawberries supply a full day’s recommended amount in one serving.'],
    ['example', 'Some animals use camouflage to avoid predators.', 'the leaf insect resembles a green leaf almost perfectly.'],
    ['example', 'Several cities have introduced congestion pricing.', 'London charges drivers who enter its central zone.'],
    ['example', 'Public libraries offer more than books.', 'many lend tools, seeds, and even musical instruments.'],
    ['example', 'Plants have evolved varied defenses.', 'thorns, toxins, and bitter tastes discourage grazing animals.'],
    ['addition', 'The new software makes scheduling easier.', 'it reduces paperwork for the entire staff.'],
    ['addition', 'The city’s bike-share program is inexpensive.', 'it is available at more than 200 stations.'],
    ['addition', 'Regular exercise strengthens the heart.', 'it improves sleep and mood.'],
    ['addition', 'The scholarship covers tuition.', 'it provides a stipend for books.'],
  ];
  G('rw-transitions', [
    (r) => { const [rel, a, b] = pk(r, TPAIRS), ok = pk(r, REL[rel].words);
      const others = [].concat(...Object.keys(REL).filter((k) => k !== rel).map((k) => REL[k].words)), d = [];
      while (d.length < 3) { const w = pk(r, others); if (d.indexOf(w) < 0) d.push(w); }
      return mc(rel === 'contrast' || rel === 'cause' ? 1 : 2, TRANS, [ok].concat(d), 0, `Связь между предложениями — <b>${REL[rel].ru}</b>, поэтому подходит «${ok}».`, P(`${a} ______ ${b}`)); },
  ]);

  /* ---------- Command of Evidence: данные таблицы ---------- */
  const SUBJ = ['members of the coding club', 'visits to the school library', 'tons of paper recycled by the town', 'plots rented in the community garden', 'attendees at the spring concert'];
  const tableHtml = (label, years, vals) => `<table><tr><th>Year</th>${years.map((y) => `<th>${y}</th>`).join('')}</tr><tr><td>${label.length > 28 ? 'Total' : label}</td>${vals.map((v) => `<td>${v}</td>`).join('')}</tr></table>`;
  G('rw-evidence', [
    (r) => { const label = pk(r, SUBJ), y0 = ri(r, 2016, 2021), ys = [y0, y0 + 1, y0 + 2, y0 + 3],
        ctx = pk(r, ['A local organization keeps yearly records so that it can report its progress to the community.', 'Each year, volunteers at a community center tally their results and post them in a newsletter.', 'A school group has recorded the same figure every year for several years in order to plan for the future.', 'Organizers compile their totals from sign-in sheets and use them to decide how to spend their budget.']);
      if (r() < 0.5) {
        const v = [ri(r, 10, 60)]; for (let i = 1; i < 4; i++) v.push(v[i - 1] + ri(r, 3, 15));
        return mc(2, 'Which choice most effectively uses data from the table to support the student’s claim?',
          [`The number of ${label} rose from ${v[0]} in ${ys[0]} to ${v[1]} in ${ys[1]}, ${v[2]} in ${ys[2]}, and ${v[3]} in ${ys[3]}.`, `The number of ${label} fell from ${v[3]} in ${ys[0]} to ${v[0]} in ${ys[3]}.`, `The number of ${label} in ${ys[3]} (${v[3]}) was higher than in ${ys[2]} (${v[2]}).`, `The number of ${label} in ${ys[1]} was ${v[1]}.`], 0,
          'Утверждение: рост <b>каждый год</b>. Нужен вариант, который показывает весь ряд значений, а не одну пару лет.', P(`${ctx} A student claims that the number of ${label} increased every year from ${ys[0]} to ${ys[3]}.`) + tableHtml(label, ys, v)); }
      const a = ri(r, 10, 40), pkv = a + ri(r, 15, 40), v = [a, a + ri(r, 5, 12), pkv, a + ri(r, 3, 10)];
      return mc(2, 'Which choice most effectively uses data from the table to support the student’s claim?',
        [`The number of ${label} was highest in ${ys[2]} at ${v[2]}, compared with ${v[0]} in ${ys[0]}, ${v[1]} in ${ys[1]}, and ${v[3]} in ${ys[3]}.`, `The number of ${label} was highest in ${ys[3]} at ${v[3]}.`, `The number of ${label} was lowest in ${ys[2]} at ${v[2]}.`, `The number of ${label} did not change from ${ys[0]} to ${ys[3]}.`], 0,
        'Утверждение о пике: верный вариант называет год максимума и сравнивает его с остальными годами.', P(`${ctx} A student claims that the number of ${label} peaked in ${ys[2]}.`) + tableHtml(label, ys, v)); },
  ]);

  /* ---------- Inferences: логические выводы ---------- */
  const SYLL = [
    ['choir member', 'attended Tuesday’s rehearsal', 'received the new sheet music', 'received the new sheet music'],
    ['student', 'finished the survey', 'earned a free ticket', 'earned a free ticket'],
    ['volunteer', 'completed the training', 'received a badge', 'received a badge'],
    ['hiker', 'registered at the trailhead', 'was given a map', 'been given a map'],
    ['participant', 'arrived before noon', 'received a lunch voucher', 'received a lunch voucher'],
    ['member', 'paid the annual fee', 'got access to the archive', 'gotten access to the archive'],
  ];
  const NAMES = ['Priya', 'Marcus', 'Elena', 'Jun', 'Sofia', 'Omar', 'Lena', 'Tariq'];
  G('rw-inferences', [
    (r) => { const [g, a, b, p] = pk(r, SYLL), n = pk(r, NAMES),
        ctx = pk(r, ['The organizers keep careful records of who takes part in each event.', 'The group follows its rules without exceptions.', 'The club’s secretary explained how things work at the start of the term.', 'The coordinator described the policy in an email to the whole group.']);
      return mc(2, 'Which choice most logically completes the text?', [`must have ${p}`, `might have ${p}`, `cannot have ${p}`, `must not have ${p}`], 0,
        'Правило сформулировано без исключений («every»), а условие выполнено — вывод <b>обязателен</b>. «Might» слишком слаб, остальное противоречит правилу.', P(`${ctx} Every ${g} who ${a} also ${b}. ${n} ${a}, so ${n} ______`)); },
  ]);

  /* ---------- Cross-Text Connections ---------- */
  const T12 = (a, b) => `<span class="src">Text 1</span><p>${a}</p><span class="src">Text 2</span><p>${b}</p>`;
  const XT = [
    ['Community gardens improve neighborhood health by giving residents access to fresh vegetables.',
      { challenge: 'A survey of 12 neighborhoods found that residents near community gardens ate no more vegetables than residents elsewhere.', partial: 'Gardens do provide fresh produce, but their main health benefit comes from the exercise residents get while tending them.', extension: 'Gardens also lower summer street temperatures, a benefit that matters most for older residents.', support: 'In a three-year study, residents who joined a garden ate about two more servings of vegetables per day than before joining.' }],
    ['Switching to electric buses will cut a city’s transportation emissions.',
      { challenge: 'A recent analysis found that in regions where electricity comes mostly from coal, electric buses produce emissions comparable to diesel buses.', partial: 'Electric buses do reduce tailpipe emissions, but the greater gains come from persuading more people to ride transit at all.', extension: 'Electric buses are also quieter, which could change how residents experience busy streets.', support: 'Cities that completed the switch reported transportation emissions falling by about a third within five years.' }],
    ['Reading aloud to young children strengthens their vocabulary.',
      { challenge: 'A controlled study found no difference in vocabulary between children read to daily and those who were not.', partial: 'Reading aloud helps, but conversations that invite children to respond seem to build vocabulary even more.', extension: 'Reading aloud also appears to help children sit still and concentrate, skills that aid early schooling.', support: 'Preschoolers read to nightly for a year learned roughly 300 more words than a comparison group.' }],
    ['Later school start times improve teenagers’ grades.',
      { challenge: 'A district that delayed start times by an hour saw no change in average grades over two years.', partial: 'Later start times help grades somewhat, but students’ evening screen use appears to matter more.', extension: 'Later start times also appear to reduce car accidents involving teenage drivers.', support: 'After one district moved its start time later, average grades rose by about a third of a letter grade.' }],
    ['Urban rooftop beehives help local ecosystems by increasing pollination.',
      { challenge: 'Research indicates that honeybees from rooftop hives compete with native bees for flowers and may reduce overall pollination.', partial: 'Rooftop hives do add pollination, but planting native flowers would do more for local ecosystems.', extension: 'Rooftop hives also give city residents a hands-on way to learn about insects.', support: 'Gardens near rooftop hives produced noticeably more fruit than comparable gardens farther away.' }],
    ['Small-group tutoring raises students’ math scores.',
      { challenge: 'A large review found that students in small-group tutoring improved no more than students in regular classes.', partial: 'Tutoring helps, but the quality of the tutor appears to matter more than the size of the group.', extension: 'Tutoring also seems to raise students’ confidence in speaking up in class.', support: 'Students in weekly small-group tutoring gained about 10 points more on math tests than peers without it.' }],
    ['Walkable neighborhoods encourage residents to be more physically active.',
      { challenge: 'A study of 20 cities found that residents of walkable neighborhoods exercised about as often as residents of car-oriented ones.', partial: 'Walkability helps, but access to parks and gyms appears to have a stronger effect on activity.', extension: 'Walkable neighborhoods also tend to support more small businesses along a single street.', support: 'Residents who moved to walkable neighborhoods added about 20 minutes of walking per day.' }],
    ['Free admission makes museums more accessible to low-income families.',
      { challenge: 'After one museum eliminated fees, the share of visitors from low-income households did not change.', partial: 'Free admission helps, but transportation and unfamiliarity with museums appear to be larger barriers.', extension: 'Free admission may also reduce a museum’s revenue, forcing cuts to educational programs.', support: 'After one museum eliminated fees, visits from low-income households doubled within a year.' }],
  ];
  // Дополнительные предложения: делают тексты длиннее, не меняя логику связи между ними
  const XT_T1 = [
    'Supporters add that gardens also give neighbors a reason to spend time outdoors.', 'Several cities have begun testing electric buses on their busiest routes.',
    'Many pediatricians recommend setting aside time for reading every day.', 'Several school boards are now considering moving their first bells later.',
    'Hive kits for rooftops have become increasingly popular in recent years.', 'Many districts have recently expanded their tutoring programs.',
    'City planners increasingly design new developments around sidewalks and short blocks.', 'Several museums have recently experimented with eliminating their fees.',
  ];
  const XT_T2 = {
    challenge: ['The authors say the result held up in every group they examined.', 'The authors say they were surprised by how consistent the result was.'],
    partial: ['The authors urge decision-makers to keep both factors in mind.', 'The authors add that the two factors may work together.'],
    extension: ['The authors say this effect has received little attention so far.', 'The authors say the effect deserves further study.'],
    support: ['The authors say the effect was visible in every group studied.', 'The authors say the result was larger than they had expected.'],
  };
  const XT_ANS = {
    challenge: 'It presents evidence that calls the claim in Text 1 into question',
    partial: 'It agrees with Text 1 in part but argues that another factor matters more',
    extension: 'It identifies an additional consequence that Text 1 does not address',
    support: 'It provides data that supports the claim made in Text 1',
  };
  const XT_BAD = [
    'It restates the claim in Text 1 using different examples from the same field',
    'It defines a key term from Text 1 and explains how researchers measure it',
    'It describes the early history of the topic that Text 1 discusses',
    'It proposes a policy solution to a problem raised in Text 1',
    'It questions the qualifications of the person quoted in Text 1',
    'It summarizes the research methods used in the study in Text 1',
  ];
  G('rw-cross', [
    (r) => { const bi = Math.floor(r() * XT.length), [t1base, rel] = XT[bi], kind = pk(r, ['challenge', 'partial', 'extension', 'support']),
        t1 = t1base + ' ' + XT_T1[bi], t2 = rel[kind] + ' ' + pk(r, XT_T2[kind]);
      const bad = SAT.util.shuffle(XT_BAD, r).slice(0, 3);
      return mc(kind === 'partial' ? 3 : 2, 'Which choice best describes how Text 2 relates to Text 1?', [XT_ANS[kind]].concat(bad), 0,
        { challenge: 'Text 2 приводит данные, <b>противоречащие</b> утверждению Text 1.', partial: 'Text 2 соглашается частично («do… but»), но называет <b>другой, более важный фактор</b>.', extension: 'Text 2 не спорит с Text 1, а называет <b>дополнительное следствие</b>.', support: 'Text 2 даёт данные, <b>подтверждающие</b> утверждение Text 1.' }[kind], T12(t1, t2)); },
  ]);

  /* ---------- Text Structure and Purpose ---------- */
  const MISC = [
    ['Many people believe that lightning never strikes the same place twice.', 'In fact, tall structures are struck repeatedly, and some skyscrapers are hit dozens of times a year.', 'Lightning rods give those buildings a safe path for the charge.'],
    ['It is often said that humans use only ten percent of their brains.', 'Brain imaging shows activity throughout the brain, even during sleep.', 'Different regions simply become more active for different tasks.'],
    ['Many assume that the Great Wall of China can be seen from space with the naked eye.', 'Astronauts report that the wall is too narrow to pick out without magnification.', 'Highways and city lights are far easier to spot from orbit.'],
    ['People often think that sugar makes children hyperactive.', 'Controlled trials have found no difference in behavior between children given sugar and those given a placebo.', 'Parents’ expectations appear to shape what they notice.'],
    ['It is common to hear that chameleons change color mainly to blend in with their surroundings.', 'Researchers have found that the shifts mostly reflect temperature and mood.', 'Bright colors, in fact, often make a chameleon easier to see.'],
  ];
  const EXAMPLES = [
    ['Many animals have evolved striking ways to avoid predators.', 'The hawk moth caterpillar inflates its head to resemble a small snake.', 'The owl butterfly displays wing spots that look like an owl’s eyes.'],
    ['Some plants have developed unusual strategies for obtaining nutrients.', 'The Venus flytrap snaps shut on insects that touch its sensitive hairs.', 'The pitcher plant lures prey into a slippery, fluid-filled tube.'],
    ['Cities around the world have found creative uses for old industrial buildings.', 'In one city, a former power station now houses a museum of modern art.', 'In another, an abandoned rail depot has become a covered public market.'],
    ['Inventors have often drawn ideas directly from nature.', 'Velcro was inspired by the tiny hooks on burrs that cling to clothing.', 'The design of some high-speed trains copies the beak of the kingfisher.'],
  ];
  const CHANGE = [
    ['For decades, the Eastview Theater showed only silent films.', 'In the 1930s it installed sound equipment and began screening talking pictures.', 'Today it hosts live concerts and film festivals.'],
    ['When it opened in 1905, the Harlow Library held fewer than 2,000 books.', 'After a major expansion in the 1960s, it added a children’s wing and a periodicals room.', 'Now it also lends tools, offers coding classes, and hosts job fairs.'],
    ['The Marlow Mill once produced cotton fabric for markets across the region.', 'After it closed in 1978, the building stood empty for nearly twenty years.', 'It now contains apartments, small studios, and a community kitchen.'],
    ['Founded as a one-room school, Brightwater Academy enrolled just twelve students in its first year.', 'By the 1950s it had grown into a boarding school with several dormitories.', 'It now serves over a thousand students through online and in-person programs.'],
  ];
  const MISC_X = ['The saying persists mostly because strikes are rare in any one spot.', 'Neurologists describe the idea as one of the most persistent myths about the brain.', 'The misconception endures in part because the wall is so famously long.', 'Still, the belief remains widespread among parents and teachers.', 'The popular explanation endures largely because it is simple and appealing.'];
  const EXAMPLES_X = ['Such defenses can mean the difference between life and death in the wild.', 'These strategies allow the plants to thrive in soils that lack nitrogen.', 'Such projects often revive neighborhoods that had seemed beyond saving.', 'Engineers call this approach biomimicry.'];
  const CHANGE_X = ['The building itself, with its red-brick facade, has hardly changed at all.', 'Its staff say the collection of books is now only a small part of what patrons use.', 'Its brick smokestack, once a symbol of the town’s industry, still stands.', 'Its original one-room building is preserved as a small museum.'];
  const PURP = 'Which choice best states the main purpose of the text?';
  G('rw-structure', [
    (r) => { const mi = Math.floor(r() * MISC.length), [a, b, c] = MISC[mi], d = MISC_X[mi];
      return mc(1, PURP, ['To correct a widely held misconception', 'To trace the history of a familiar saying', 'To argue that popular beliefs are always based on research', 'To compare two competing scientific explanations'], 0,
        'Структура «Many believe… In fact…»: автор <b>опровергает распространённое заблуждение</b>.', P(`${a} ${b} ${c} ${d}`)); },
    (r) => { const ei = Math.floor(r() * EXAMPLES.length), [a, b, c] = EXAMPLES[ei], d = EXAMPLES_X[ei];
      return mc(1, PURP, ['To illustrate a general claim with specific examples', 'To question whether the general claim is accurate at all', 'To rank the examples in order of their importance', 'To explain how researchers first discovered each example'], 0,
        'Первое предложение — общее утверждение, дальше два конкретных примера: цель — <b>проиллюстрировать утверждение примерами</b>.', P(`${a} ${b} ${c} ${d}`)); },
    (r) => { const ci = Math.floor(r() * CHANGE.length), [a, b, c] = CHANGE[ci], d = CHANGE_X[ci];
      return mc(2, PURP, ['To trace how an institution’s activities changed over time', 'To argue that the institution should return to its original purpose', 'To compare the institution with similar institutions elsewhere', 'To explain why the institution became financially successful'], 0,
        'Текст идёт от прошлого к настоящему: <b>как менялась деятельность учреждения</b>. Сравнений и оценок нет.', P(`${a} ${b} ${c} ${d}`)); },
  ]);

  /* ---------- Words in Context (банк) ---------- */
  const WORDS = [
    ['Because the committee wanted every voice heard, the chair gave a ______ summary of each member’s comments, omitting nothing.', 'thorough', ['brief', 'careless', 'hostile'], 1],
    ['The scientist’s ______ attitude toward new data, neither accepting nor rejecting it immediately, helped her avoid hasty conclusions.', 'cautious', ['dismissive', 'enthusiastic', 'indifferent'], 2],
    ['Although the sculptor’s early works were ______ and delicate, her later pieces were massive and bold.', 'diminutive', ['enormous', 'brash', 'costly'], 3],
    ['The senator’s speech, though long, was ______: every sentence advanced her argument and none was wasted.', 'efficient', ['rambling', 'vague', 'redundant'], 2],
    ['Researchers were ______ by the discovery, having expected the material to behave exactly as it had in earlier trials.', 'astonished', ['reassured', 'unconcerned', 'convinced'], 2],
    ['To keep the peace among rival neighbors, the mediator took a ______ position, favoring neither side.', 'neutral', ['partisan', 'radical', 'defensive'], 1],
    ['The once-bustling harbor now seems ______, its docks empty and its warehouses silent.', 'deserted', ['crowded', 'prosperous', 'hazardous'], 1],
    ['Her ______ explanation left the audience confused; no one could tell what she was trying to argue.', 'convoluted', ['lucid', 'concise', 'persuasive'], 2],
    ['The journalist’s reputation for ______ meant readers trusted that she would report the facts even when they were unflattering.', 'integrity', ['ambition', 'flexibility', 'notoriety'], 2],
    ['The garden’s ______ growth, with vines choking every path, suggested that no one had tended it in years.', 'rampant', ['sparse', 'stunted', 'orderly'], 2],
    ['Far from being ______, the committee’s final report offered specific, detailed recommendations.', 'vague', ['precise', 'thorough', 'lengthy'], 2],
    ['The pianist’s performance was so ______ that several audience members wept.', 'poignant', ['mediocre', 'rushed', 'mechanical'], 2],
    ['Scientists remain ______ about the cause of the decline, offering several competing theories but no consensus.', 'uncertain', ['unanimous', 'confident', 'dismissive'], 1],
    ['The ______ of the old bridge made engineers worry that it could not support heavy trucks much longer.', 'fragility', ['elegance', 'length', 'popularity'], 2],
    ['The mayor’s ______ remarks angered residents, who felt she had ignored their concerns entirely.', 'dismissive', ['sympathetic', 'thoughtful', 'measured'], 1],
    ['The novel’s plot is ______: readers can guess nearly every twist chapters before it happens.', 'predictable', ['unpredictable', 'intricate', 'original'], 1],
    ['The diplomat’s ______ remark defused the tension in the room, and soon both delegations were laughing.', 'timely', ['inflammatory', 'belated', 'unintelligible'], 2],
    ['The two theories are not ______; evidence for one does not rule out the other.', 'incompatible', ['identical', 'ancient', 'outdated'], 3],
    ['After years of ______ spending, the small town found itself unable to pay for basic repairs.', 'reckless', ['frugal', 'modest', 'careful'], 1],
    ['The architect’s design was widely admired for its ______, achieving beauty with remarkably few materials.', 'simplicity', ['extravagance', 'complexity', 'ornamentation'], 2],
  ];
  G('rw-words', [
    (r) => { const [s, ok, d, diff] = pk(r, WORDS);
      return mc(diff, WIC, [ok].concat(d), 0, `Контекст и логическая подсказка в предложении требуют слова <b>${ok}</b>; остальные варианты противоречат смыслу или тону.`, P(s)); },
  ]);
})();
