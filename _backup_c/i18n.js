/* ═══════════════════════════════════════════════════════════════════════════
   m1lwh — i18n dictionaries (RU / EN)
   Every site string lives here. Applied via data-i18n / data-i18n-attr.
   ═══════════════════════════════════════════════════════════════════════════ */

const I18N = {
  /* ── document ── */
  doc_title: {
    ru: 'm1lwh — Java-разработчик и Minecraft-энтузиаст',
    en: 'm1lwh — Java Developer & Minecraft Enthusiast',
  },
  doc_desc: {
    ru: 'm1lwh — Java-разработчик: плагины и моды для Minecraft, сервер mc.funsmine.su, перевод PVZ Fusion Mod. Пишет на Java и Python, живёт на OpenBSD.',
    en: 'm1lwh — Java developer: Minecraft plugins & mods, mc.funsmine.su server, PVZ Fusion Mod translation. Codes in Java and Python, lives on OpenBSD.',
  },
  doc_keywords: {
    ru: 'm1lwh, java разработчик, minecraft, плагины, моды, openbsd, linux, debian, перевод, pvz fusion, mc.funsmine.su, портфолио',
    en: 'm1lwh, java developer, minecraft, plugins, mods, openbsd, linux, debian, translation, pvz fusion, mc.funsmine.su, portfolio',
  },

  /* ── preloader ── */
  preload_load: { ru: 'загрузка', en: 'loading' },
  preload_choose: { ru: 'Выберите язык', en: 'Choose language' },

  /* ── nav ── */
  nav_home: { ru: 'Главная', en: 'Home' },
  nav_about: { ru: 'Обо мне', en: 'About' },
  nav_projects: { ru: 'Проекты', en: 'Projects' },
  nav_games: { ru: 'Игры', en: 'Games' },
  nav_skills: { ru: 'Навыки', en: 'Skills' },
  nav_journey: { ru: 'Путь', en: 'Journey' },
  nav_contact: { ru: 'Контакты', en: 'Contact' },

  /* ── hero ── */
  hero_badge: { ru: 'Открыт для проектов и коллабораций', en: 'Open for projects & collaborations' },
  hero_greeting: { ru: 'Привет, меня зовут', en: 'Hi, my name is' },
  roles: {
    ru: ['Java Developer', 'Minecraft Developer', 'Linux User', 'OpenBSD Enthusiast', 'Open Source Lover', 'Creative Developer'],
    en: ['Java Developer', 'Minecraft Developer', 'Linux User', 'OpenBSD Enthusiast', 'Open Source Lover', 'Creative Developer'],
  },
  hero_tagline: {
    ru: 'Java-разработчик с глубокой страстью к Minecraft-экосистеме. Создаю плагины, моды и серверные решения, перевожу культовый <span class="hl">PVZ Fusion Mod</span> и живу на OpenBSD.',
    en: 'A Java developer with a deep passion for the Minecraft ecosystem. I build plugins, mods and server solutions, translate the iconic <span class="hl">PVZ Fusion Mod</span> and live on OpenBSD.',
  },
  hero_btn_projects: { ru: 'Мои проекты', en: 'My projects' },
  hero_btn_contact: { ru: 'Связаться', en: 'Get in touch' },
  hero_btn_github: { ru: 'GitHub', en: 'GitHub' },
  hero_scroll: { ru: 'листай вниз', en: 'scroll down' },
  hero_avatar_status: { ru: 'Online — на связи', en: 'Online — available' },

  /* ── stats ── */
  stat_years: { ru: 'лет опыта', en: 'years of experience' },
  stat_projects: { ru: 'проектов', en: 'projects' },
  stat_lines: { ru: 'строк перевода', en: 'translated lines' },
  stat_uptime: { ru: 'аптайм сервера', en: 'server uptime' },

  /* ── chips (hero avatar) ── */
  chip_java: { ru: 'Java', en: 'Java' },
  chip_minecraft: { ru: 'Minecraft', en: 'Minecraft' },
  chip_openbsd: { ru: 'OpenBSD', en: 'OpenBSD' },
  chip_oss: { ru: 'Open Source', en: 'Open Source' },

  /* ── about ── */
  about_eyebrow: { ru: 'Обо мне', en: 'About me' },
  about_title: { ru: 'Кто стоит за ником', en: 'Behind the nickname' },
  about_sub: {
    ru: 'Разработчик, моддер, переводчик и просто фанат кубического мира',
    en: 'Developer, modder, translator and simply a fan of the cubic world',
  },
  about_hello: { ru: 'Привет! Я — ', en: "Hey! I'm " },
  about_p1: {
    ru: 'Увлечённый <span class="hl">Java-разработчик</span> с многолетним опытом создания плагинов и модификаций для Minecraft. Моя страсть — расширять границы возможного: от кастомных серверных механик до глубоких клиентских модификаций.',
    en: 'A passionate <span class="hl">Java developer</span> with years of experience building plugins and modifications for Minecraft. My passion is pushing boundaries: from custom server mechanics to deep client-side mods.',
  },
  about_p2: {
    ru: 'Сейчас я полностью погружён в проект <span class="hl">перевода PVZ Fusion Mod</span> — масштабной модификации, соединяющей Plants vs Zombies с Minecraft. Кропотливая работа: тысячи строк, каждый термин и каждая культурная отсылка имеют значение.',
    en: 'Right now I am fully immersed in the <span class="hl">PVZ Fusion Mod translation</span> — a massive mod that blends Plants vs Zombies with Minecraft. Meticulous work: thousands of lines, every term and cultural reference matters.',
  },
  about_p3: {
    ru: 'Я создатель и администратор сервера <span class="hl">mc.funsmine.su</span> — там я воплощаю идеи в жизнь и собираю сообщество единомышленников. А в операционных системах прошёл путь от Debian к OpenBSD: минимализм без systemd и полный контроль над каждым процессом.',
    en: 'I created and administer the <span class="hl">mc.funsmine.su</span> server — where I bring ideas to life and grow a community of like-minded people. As for OSes, I went from Debian to OpenBSD: minimalism without systemd and full control over every process.',
  },
  about_ach_t: { ru: 'Ключевые вехи', en: 'Key milestones' },
  ach_1: { ru: 'Сервер mc.funsmine.su — 24/7', en: 'mc.funsmine.su server — 24/7' },
  ach_2: { ru: 'Полный перевод PVZ Fusion Mod', en: 'Full PVZ Fusion Mod translation' },
  ach_3: { ru: 'Собственный DLC-клиент для 1.16.5', en: 'Custom DLC client for 1.16.5' },
  ach_4: { ru: 'Миграция на OpenBSD', en: 'Migration to OpenBSD' },
  about_tags_t: { ru: 'Чем я занимаюсь', en: 'What I work with' },
  t_java: { ru: 'Java', en: 'Java' },
  t_python: { ru: 'Python', en: 'Python' },
  t_mc: { ru: 'Minecraft', en: 'Minecraft' },
  t_plugins: { ru: 'Плагины', en: 'Plugins' },
  t_mods: { ru: 'Моды', en: 'Mods' },
  t_openbsd: { ru: 'OpenBSD', en: 'OpenBSD' },
  t_debian: { ru: 'Debian', en: 'Debian' },
  t_translation: { ru: 'Перевод', en: 'Translation' },
  t_servers: { ru: 'Серверы', en: 'Servers' },
  t_git: { ru: 'Git', en: 'Git' },

  /* ── projects ── */
  projects_eyebrow: { ru: 'Проекты', en: 'Projects' },
  projects_title: { ru: 'Чем я горжусь', en: 'Things I am proud of' },
  projects_sub: {
    ru: 'От серверов до клиентских модификаций — всё, что создано с душой',
    en: 'From servers to client mods — everything built with heart',
  },
  pvz_title: { ru: 'PVZ Fusion Mod — перевод', en: 'PVZ Fusion Mod — translation' },
  pvz_desc: {
    ru: 'Активная локализация масштабной модификации, объединяющей Plants vs Zombies и Minecraft: интерфейс, описания растений и зомби, механики, культурные отсылки. Тысячи строк текста для русскоязычной аудитории.',
    en: 'Active localization of a massive mod blending Plants vs Zombies with Minecraft: UI, plant and zombie descriptions, mechanics, cultural references. Thousands of lines for the Russian-speaking audience.',
  },
  pvz_status: { ru: 'В работе', en: 'In progress' },
  winter_title: { ru: 'WinterClient', en: 'WinterClient' },
  winter_desc: {
    ru: 'Собственный DLC-клиент для Minecraft 1.16.5: продвинутые PvP-модули, визуальные улучшения и уникальные эксплойты. Проект был долгое время моим фокусом, но сейчас заморожен и остаётся важной вехой.',
    en: 'Custom DLC client for Minecraft 1.16.5: advanced PvP modules, visual enhancements and unique exploits. It was my main focus for a long time, now frozen — an important milestone.',
  },
  winter_status: { ru: 'Заброшен', en: 'Abandoned' },
  server_p_title: { ru: 'Minecraft-сервер', en: 'Minecraft server' },
  server_p_desc: {
    ru: 'Публичный сервер mc.funsmine.su, настроенный с нуля: от выбора хостинга и оптимизации ядра до кастомных плагинов и уникальных игровых механик. Активное комьюнити и стабильная работа 24/7.',
    en: 'Public server at mc.funsmine.su, built from scratch: from hosting and kernel tuning to custom plugins and unique mechanics. An active community and stable 24/7 operation.',
  },
  server_p_status: { ru: 'Онлайн', en: 'Online' },
  other_title: { ru: 'Другие проекты', en: 'Other projects' },
  other_desc: {
    ru: 'Кастомные плагины, утилиты для автоматизации сборки, Python-скрипты для анализа логов и управления инфраструктурой, экспериментальные модификации. Каждый проект — опыт и шаг вперёд.',
    en: 'Custom plugins, build automation utilities, Python scripts for log analysis and infrastructure, experimental mods. Every project is experience and a step forward.',
  },
  other_status: { ru: 'Разное', en: 'Various' },
  btn_repo: { ru: 'Репозиторий', en: 'Repository' },
  btn_details: { ru: 'Подробнее', en: 'Details' },

  /* ── server CTA ── */
  server_title: { ru: 'Играй на моём сервере', en: 'Play on my server' },
  server_desc: { ru: 'Java Edition • 24/7 • Кастомные плагины • Дружное комьюнити', en: 'Java Edition • 24/7 • Custom plugins • Friendly community' },
  copy_ip: { ru: 'Скопировать IP', en: 'Copy IP' },
  copied: { ru: 'Скопировано в буфер', en: 'Copied to clipboard' },
  copy_fail: { ru: 'Не удалось скопировать', en: 'Could not copy' },

  /* ── games ── */
  games_eyebrow: { ru: 'Игры', en: 'Games' },
  games_title: { ru: 'Во что я играю', en: 'What I play' },
  games_sub: { ru: 'Игры, которые вдохновляют и занимают свободное время', en: 'Games that inspire me and fill my free time' },
  g_mc_title: { ru: 'Minecraft', en: 'Minecraft' },
  g_mc_desc: {
    ru: 'Песочница, ставшая второй жизнью: серверы, плагины, моды и безграничный кубический мир.',
    en: 'The sandbox that became a second life: servers, plugins, mods and a boundless cubic world.',
  },
  g_mc_badge: { ru: 'Любимое', en: 'Favorite' },
  g_worldbox_title: { ru: 'WorldBox', en: 'WorldBox' },
  g_worldbox_desc: {
    ru: 'God-симулятор: создавать и разрушать цивилизации, наблюдать за эволюцией миров.',
    en: 'A god simulator: create and destroy civilizations, watch worlds evolve.',
  },
  g_worldbox_badge: { ru: 'Песочница', en: 'Sandbox' },
  g_mafia_title: { ru: 'Mafia II', en: 'Mafia II' },
  g_mafia_desc: {
    ru: 'Криминальная сага с атмосферой 40-х и 50-х: глубокий сюжет, стиль, неповторимая музыка.',
    en: 'A crime saga with a 1940s–50s atmosphere: deep story, style, a unique soundtrack.',
  },
  g_mafia_badge: { ru: 'Сюжет', en: 'Story' },
  g_pvz_title: { ru: 'Plants vs Zombies', en: 'Plants vs Zombies' },
  g_pvz_desc: {
    ru: 'Легендарная стратегия, из которой вырос мой любимый мод-проект — Fusion.',
    en: 'The legendary strategy that grew into my favorite mod project — Fusion.',
  },
  g_pvz_badge: { ru: 'Классика', en: 'Classic' },

  /* ── skills ── */
  skills_eyebrow: { ru: 'Навыки', en: 'Skills' },
  skills_title: { ru: 'Технический стек', en: 'Tech stack' },
  skills_sub: { ru: 'Инструменты, на которых я строю свои проекты', en: 'The tools I build my projects on' },
  sk_java: { ru: 'Основной язык', en: 'Primary language' },
  sk_java_note: { ru: 'моддинг • плагины • серверы', en: 'modding • plugins • servers' },
  sk_python: { ru: 'Автоматизация', en: 'Automation' },
  sk_python_note: { ru: 'скрипты • утилиты • анализ', en: 'scripts • utilities • analysis' },
  sk_mc: { ru: 'Экосистема Minecraft', en: 'Minecraft ecosystem' },
  sk_mc_note: { ru: 'Paper • Forge • Fabric • Spigot', en: 'Paper • Forge • Fabric • Spigot' },
  sk_linux: { ru: 'Linux / BSD', en: 'Linux / BSD' },
  sk_linux_note: { ru: 'Debian • OpenBSD • безопасность', en: 'Debian • OpenBSD • security' },
  sk_git: { ru: 'Git и инструменты', en: 'Git & tooling' },
  sk_git_note: { ru: 'GitHub • CI/CD • Docker', en: 'GitHub • CI/CD • Docker' },
  sk_loc: { ru: 'Локализация', en: 'Localization' },
  sk_loc_note: { ru: 'EN→RU • JSON/YAML локали', en: 'EN→RU • JSON/YAML locales' },

  /* ── terminal ── */
  term_title: { ru: 'm1lwh@openbsd — замаскированный терминал', en: 'm1lwh@openbsd — disguised terminal' },
  term_hint: { ru: 'Подсказка: введите help, чтобы увидеть все команды', en: 'Tip: type help to see all commands' },
  term_welcome: { ru: 'Добро пожаловать! Это мой терминал. Введите help для списка команд.', en: 'Welcome! This is my terminal. Type help to see available commands.' },
  term_help: {
    ru: 'Доступные команды: help · whoami · neofetch · skills · projects · server · contact · lang ru|en · sudo · clear',
    en: 'Available commands: help · whoami · neofetch · skills · projects · server · contact · lang ru|en · sudo · clear',
  },
  term_whoami: {
    ru: 'm1lwh — Java-разработчик, Minecraft-энтузиаст, фанат OpenBSD.',
    en: 'm1lwh — Java developer, Minecraft enthusiast, OpenBSD fan.',
  },
  term_neofetch: {
    ru: [
      'm1lwh@openbsd',
      'OS: OpenBSD (Debian без systemd)',
      'Languages: Java 92% · Python 55%',
      'Project: PVZ Fusion Mod перевод',
      'Server: mc.funsmine.su — online',
      'Motto: меньше магии, больше понимания',
    ],
    en: [
      'm1lwh@openbsd',
      'OS: OpenBSD (Debian without systemd)',
      'Languages: Java 92% · Python 55%',
      'Project: PVZ Fusion Mod translation',
      'Server: mc.funsmine.su — online',
      'Motto: less magic, more understanding',
    ],
  },
  term_skills: {
    ru: ['Java — плагины, моды, серверы', 'Python — автоматизация и скрипты', 'Minecraft Dev — Paper, Forge, Fabric', 'Linux/BSD — Debian, OpenBSD', 'Git, CI/CD, Docker', 'Локализация EN→RU'],
    en: ['Java — plugins, mods, servers', 'Python — automation & scripts', 'Minecraft Dev — Paper, Forge, Fabric', 'Linux/BSD — Debian, OpenBSD', 'Git, CI/CD, Docker', 'Localization EN→RU'],
  },
  term_projects: {
    ru: [
      'PVZ Fusion Mod — перевод (в работе)',
      'WinterClient — DLC-клиент 1.16.5 (архив)',
      'mc.funsmine.su — Minecraft-сервер (онлайн)',
    ],
    en: [
      'PVZ Fusion Mod — translation (in progress)',
      'WinterClient — DLC client 1.16.5 (archived)',
      'mc.funsmine.su — Minecraft server (online)',
    ],
  },
  term_server: { ru: 'IP сервера: mc.funsmine.su — Java Edition, 24/7, кастомные плагины.', en: 'Server IP: mc.funsmine.su — Java Edition, 24/7, custom plugins.' },
  term_contact: { ru: 'GitHub: github.com/m1lwh · Telegram: @m1lwh · Discord: m1lwh_tvink', en: 'GitHub: github.com/m1lwh · Telegram: @m1lwh · Discord: m1lwh_tvink' },
  term_lang: { ru: 'Язык переключён на русский. / Language switched to English.', en: 'Language switched to English. / Язык переключён на русский.' },
  term_sudo: { ru: 'Nice try. Здесь не OpenBSD — sudo не нужен. Вы и так root этого портфолио.', en: 'Nice try. This is not OpenBSD — no sudo needed. You are already the root of this portfolio.' },
  term_unknown: { ru: 'Неизвестная команда. Введите help.', en: 'Unknown command. Type help.' },
  term_lang_arg: { ru: 'Используйте: lang ru или lang en', en: 'Usage: lang ru or lang en' },

  /* ── journey ── */
  journey_eyebrow: { ru: 'История', en: 'Journey' },
  journey_title: { ru: 'Мой путь', en: 'My journey' },
  journey_sub: { ru: 'Ключевые вехи — от первых строк кода до собственного сервера', en: 'Key milestones — from first lines of code to my own server' },
  j1_y: { ru: '2020', en: '2020' },
  j1_t: { ru: 'Начало пути', en: 'The beginning' },
  j1_d: { ru: 'Первые шаги в программировании: Python, основы Java и удивительный мир Minecraft-моддинга.', en: 'First steps in programming: Python, Java basics and the wonderful world of Minecraft modding.' },
  j2_y: { ru: '2021 — 2022', en: '2021 — 2022' },
  j2_t: { ru: 'Углубление в Java', en: 'Deep dive into Java' },
  j2_d: { ru: 'Интенсивное изучение Java, серверной архитектуры и экосистемы плагинов Spigot и Paper.', en: 'Intensive study of Java, server architecture and the Spigot & Paper plugin ecosystem.' },
  j3_y: { ru: '2022 — 2023', en: '2022 — 2023' },
  j3_t: { ru: 'WinterClient', en: 'WinterClient' },
  j3_d: { ru: 'Разработка собственного DLC-клиента для Minecraft 1.16.5: PvP-модули, визуальные улучшения, эксплойты.', en: 'Built my own DLC client for Minecraft 1.16.5: PvP modules, visual upgrades, exploits.' },
  j4_y: { ru: '2023 — 2024', en: '2023 — 2024' },
  j4_t: { ru: 'Запуск mc.funsmine.su', en: 'Launch of mc.funsmine.su' },
  j4_d: { ru: 'Создание публичного сервера с нуля: кастомные плагины, баланс, комьюнити и стабильная работа 24/7.', en: 'Built a public server from scratch: custom plugins, balance, community and 24/7 stability.' },
  j5_y: { ru: '2024', en: '2024' },
  j5_t: { ru: 'Переход на OpenBSD', en: 'Migration to OpenBSD' },
  j5_d: { ru: 'Debian → OpenBSD. Никакого systemd — только минимализм, безопасность и полный контроль над системой.', en: 'Debian → OpenBSD. No systemd — just minimalism, security and full control over the system.' },
  j6_y: { ru: '2025 — сейчас', en: '2025 — now' },
  j6_t: { ru: 'Перевод PVZ Fusion Mod', en: 'PVZ Fusion Mod translation' },
  j6_d: { ru: 'Полная локализация культового мода: интерфейс, описания, культурные отсылки — тысячи строк текста.', en: 'Complete localization of an iconic mod: UI, descriptions, cultural references — thousands of lines.' },

  /* ── philosophy ── */
  phil_eyebrow: { ru: 'Философия', en: 'Philosophy' },
  phil_title: { ru: 'Как я работаю', en: 'How I work' },
  phil_bsd_t: { ru: 'OpenBSD > Debian', en: 'OpenBSD > Debian' },
  phil_bsd_d: {
    ru: 'Без systemd — только минимализм, безопасность и контроль над каждым процессом. Эту философию простоты я переношу и в код: меньше магии, больше понимания.',
    en: 'No systemd — just minimalism, security and control over every process. I carry this philosophy of simplicity into code too: less magic, more understanding.',
  },
  phil_lang_t: { ru: 'Java + Python', en: 'Java + Python' },
  phil_lang_d: {
    ru: 'Java — для серьёзных проектов: моды, плагины, серверы. Python — для быстрых скриптов и автоматизации. Идеальный баланс между мощностью и скоростью разработки.',
    en: 'Java — for serious projects: mods, plugins, servers. Python — for quick scripts and automation. The perfect balance of power and development speed.',
  },
  phil_comm_t: { ru: 'Качество и комьюнити', en: 'Quality & community' },
  phil_comm_d: {
    ru: 'Каждый проект — не просто код, а опыт для пользователей. Стабильно, полезно, с душой — будь то сервер, мод или перевод.',
    en: 'Every project is more than code — it is an experience for users. Stable, useful, heartfelt — whether it is a server, a mod or a translation.',
  },

  /* ── gallery ── */
  gallery_eyebrow: { ru: 'Галерея', en: 'Gallery' },
  gallery_title: { ru: 'Мой мир в картинках', en: 'My world in pictures' },
  gallery_sub: { ru: 'То, что меня окружает: код, серверы и атмосфера', en: 'What surrounds me: code, servers and the vibe' },
  g_pixel: { ru: 'Пиксельная эстетика', en: 'Pixel aesthetics' },
  g_pvz: { ru: 'Сад PVZ', en: 'PVZ garden' },
  g_mc: { ru: 'Кубический закат', en: 'Cubic sunset' },
  g_code: { ru: 'Java-код', en: 'Java code' },
  g_cyber: { ru: 'Киберпанк-настроение', en: 'Cyberpunk mood' },
  g_term: { ru: 'Терминал — дом', en: 'Terminal is home' },
  g_server: { ru: 'Серверная', en: 'Server room' },
  g_winter: { ru: 'Зимний лес', en: 'Winter forest' },
  g_mafia: { ru: 'Улицы Mafia II', en: 'Mafia II streets' },

  /* ── FAQ ── */
  faq_eyebrow: { ru: 'FAQ', en: 'FAQ' },
  faq_title: { ru: 'Частые вопросы', en: 'Frequently asked' },
  faq1_q: { ru: 'Чем ты занимаешься?', en: 'What do you do?' },
  faq1_a: {
    ru: 'Пишу плагины и моды для Minecraft на Java, администрирую сервер mc.funsmine.su и занимаюсь локализацией PVZ Fusion Mod. Параллельно автоматизирую рутину на Python.',
    en: 'I write Minecraft plugins and mods in Java, run the mc.funsmine.su server and localize PVZ Fusion Mod. Alongside that, I automate routine work with Python.',
  },
  faq2_q: { ru: 'Как попасть на твой сервер?', en: 'How do I join your server?' },
  faq2_a: {
    ru: 'Просто добавь сервер mc.funsmine.su в Minecraft Java Edition — он работает 24/7. IP можно скопировать кнопкой в секции «Игры», а обсуждения идут в Discord-сервере FunsMine.',
    en: 'Just add mc.funsmine.su in Minecraft Java Edition — it runs 24/7. You can copy the IP with the button in the Games section, and discussions happen in the FunsMine Discord server.',
  },
  faq3_q: { ru: 'Ты открыт к сотрудничеству?', en: 'Are you open to collaboration?' },
  faq3_a: {
    ru: 'Да! Если у тебя есть проект, связанный с Java, Minecraft или локализацией — пиши в Telegram или Discord. Всегда рад интересным идеям и партнёрствам.',
    en: 'Yes! If you have a project related to Java, Minecraft or localization — reach out on Telegram or Discord. Always happy about interesting ideas and partnerships.',
  },
  faq4_q: { ru: 'Почему OpenBSD?', en: 'Why OpenBSD?' },
  faq4_a: {
    ru: 'OpenBSD — это безопасность по умолчанию, чистота и отсутствие systemd. Система, где ты понимаешь каждый процесс. Как хороший код: простой и предсказуемый.',
    en: 'OpenBSD is security by default, cleanliness and no systemd. A system where you understand every process. Like good code: simple and predictable.',
  },

  /* ── contact ── */
  contact_eyebrow: { ru: 'Контакты', en: 'Contact' },
  contact_title: { ru: 'Давай на связи', en: "Let's stay in touch" },
  contact_sub: { ru: 'Выбирай удобный канал — всегда на связи', en: 'Pick a channel — I am always around' },
  c_github: { ru: 'Открытый код', en: 'Open source' },
  c_telegram: { ru: 'Мессенджер', en: 'Messenger' },
  c_discord: { ru: 'ЛС / копировать', en: 'DM / copy' },
  c_discord_server: { ru: 'Сообщество', en: 'Community' },
  c_server: { ru: 'Сервер / копировать', en: 'Server / copy' },
  collab_note: {
    ru: '<span class="hl">Открыт к сотрудничеству</span> — если у тебя есть проект на Java, Minecraft или локализации, я с радостью присоединюсь. Новые идеи всегда приветствуются.',
    en: '<span class="hl">Open to collaboration</span> — if you have a project in Java, Minecraft or localization, I would love to join. New ideas are always welcome.',
  },

  /* ── footer ── */
  footer_about: { ru: 'Java-разработчик, Minecraft-энтузиаст и фанат OpenBSD. Пишу плагины, моды и переводы, администрирую сервер mc.funsmine.su.', en: 'Java developer, Minecraft enthusiast and OpenBSD fan. Writing plugins, mods and translations, running the mc.funsmine.su server.' },
  footer_nav: { ru: 'Навигация', en: 'Navigation' },
  footer_social: { ru: 'Соцсети', en: 'Socials' },
  footer_made: { ru: 'Сделано с', en: 'Made with' },
  footer_on: { ru: 'на', en: 'on' },
  footer_rights: { ru: 'Все права защищены', en: 'All rights reserved' },

  /* ── palette ── */
  pal_placeholder: { ru: 'Что будем делать?..', en: 'What would you like to do?..' },
  pal_empty: { ru: 'Ничего не найдено', en: 'Nothing found' },
  pal_home: { ru: 'На главную', en: 'Go to hero' },
  pal_about: { ru: 'Раздел «Обо мне»', en: 'Go to about' },
  pal_projects: { ru: 'Раздел «Проекты»', en: 'Go to projects' },
  pal_games: { ru: 'Раздел «Игры»', en: 'Go to games' },
  pal_skills: { ru: 'Раздел «Навыки»', en: 'Go to skills' },
  pal_journey: { ru: 'Раздел «Путь»', en: 'Go to journey' },
  pal_contact: { ru: 'Раздел «Контакты»', en: 'Go to contact' },
  pal_copy_discord: { ru: 'Скопировать Discord: m1lwh_tvink', en: 'Copy Discord: m1lwh_tvink' },
  pal_copy_ip: { ru: 'Скопировать IP сервера', en: 'Copy server IP' },
  pal_github: { ru: 'Открыть GitHub', en: 'Open GitHub' },
  pal_telegram: { ru: 'Открыть Telegram', en: 'Open Telegram' },
  pal_discord_srv: { ru: 'Открыть Discord-сервер', en: 'Open Discord server' },
  pal_sound: { ru: 'Включить звук', en: 'Enable sound' },
  pal_sound_off: { ru: 'Выключить звук', en: 'Disable sound' },
  pal_music: { ru: 'Включить музыку', en: 'Enable music' },
  pal_music_off: { ru: 'Выключить музыку', en: 'Disable music' },
  pal_lang: { ru: 'Переключить язык', en: 'Switch language' },
  pal_top: { ru: 'Наверх страницы', en: 'Back to top' },
  pal_foot_nav: { ru: 'навигация', en: 'navigate' },
  pal_foot_open: { ru: 'выполнить', en: 'open' },
  pal_foot_close: { ru: 'закрыть', en: 'close' },

  /* ── aria / labels ── */
  a_palette: { ru: 'Командная палитра', en: 'Command palette' },
  a_sound: { ru: 'Переключить звук', en: 'Toggle sound' },
  a_music: { ru: 'Переключить музыку', en: 'Toggle music' },
  a_top: { ru: 'Наверх', en: 'Back to top' },
  a_menu: { ru: 'Меню', en: 'Menu' },
  a_copy: { ru: 'Копировать', en: 'Copy' },
  a_github: { ru: 'GitHub', en: 'GitHub' },
  a_telegram: { ru: 'Telegram', en: 'Telegram' },
  a_lang: { ru: 'Язык: русский', en: 'Language: English' },
  a_close: { ru: 'Закрыть', en: 'Close' },
  a_lightbox: { ru: 'Открыть в полном размере', en: 'Open full size' },

  /* ── toasts ── */
  toast_lang: { ru: 'Язык: русский', en: 'Language: English' },
  toast_sound_on: { ru: 'Звук включён', en: 'Sound on' },
  toast_sound_off: { ru: 'Звук выключен', en: 'Sound off' },
  toast_music_on: { ru: 'Музыка включена', en: 'Music on' },
  toast_music_off: { ru: 'Музыка выключена', en: 'Music off' },
};
