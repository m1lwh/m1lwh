/* ═══════════════════════════════════════════════════════════════════════
   m1lwh — i18n module
   RU/EN dictionary + language API used by main.js and 404.html
   ═══════════════════════════════════════════════════════════════════════ */
'use strict';

const I18N_KEY = 'm1lwh_lang';

const I18N = {
  ru: {
    doc_title: 'm1lwh — Java-разработчик, Minecraft-разработчик и энтузиаст OpenBSD',
    doc_desc: 'Персональный сайт m1lwh: Java-разработчик и Minecraft-энтузиаст. Плагины, моды, перевод PVZ Fusion Mod, сервер mc.funsmine.su. Open Source и OpenBSD.',
    doc_keywords: 'm1lwh, Java Developer, Minecraft, Minecraft Developer, PVZ Fusion, плагины, моды, OpenBSD, Linux, Debian, open source, mc.funsmine.su',

    /* ── Boot ── */
    boot_sub: 'Java Developer · Minecraft · OpenBSD',
    boot_enter: 'Войти',
    boot_reset: 'сбросить настройки',

    /* ── Nav ── */
    nav_about: 'Обо мне',
    nav_journey: 'Путь',
    nav_projects: 'Проекты',
    nav_games: 'Игры',
    nav_skills: 'Навыки',
    nav_gallery: 'Галерея',
    nav_faq: 'FAQ',
    nav_contact: 'Контакты',

    /* ── Hero ── */
    hero_badge: 'Открыт к сотрудничеству',
    hero_role_prefix: 'Я —',
    hero_roles: ['Java-разработчик', 'Minecraft-разработчик', 'Переводчик PVZ Fusion', 'Энтузиаст OpenBSD'],
    hero_tagline: 'Создаю <b>плагины</b>, <b>моды</b> и <b>серверные решения</b> для Minecraft на Java. Сейчас полностью погружён в перевод легендарного <b>PVZ Fusion Mod</b>. Живу на OpenBSD — чистота и минимализм без systemd.',
    hero_cta_projects: 'Смотреть проекты',
    hero_cta_github: 'GitHub',
    hero_cta_discord: 'Скопировать Discord',
    hero_scroll: 'Листай вниз',

    /* ── Stats ── */
    stat_years: 'лет опыта',
    stat_projects: 'проектов',
    stat_lines: 'строк перевода',
    stat_os: 'систем мигрировано',

    /* ── About ── */
    about_eyebrow: 'Обо мне',
    about_title: 'За кодом — <span class="grad">человек</span>',
    about_float1: 'Java-разработчик',
    about_float2: 'Переводчик PVZ Fusion',
    about_float3: 'Сервер mc.funsmine.su',
    about_p1: 'Я — <span class="hl-cyan">Java-разработчик</span> с многолетним опытом в Minecraft-экосистеме: от кастомных механик серверов до глубоких клиентских модификаций. Моя страсть — расширять границы возможного в игровой вселенной.',
    about_p2: 'Сейчас я полностью погружён в <span class="hl-green">перевод PVZ Fusion Mod</span> — масштабной модификации, объединяющей Plants vs Zombies и Minecraft. Тысячи строк текста: интерфейс, растения, зомби, механики — кропотливая работа над каждым термином.',
    about_p3: 'Также я создатель и администратор сервера <span class="hl-violet">mc.funsmine.su</span>, где собираю комьюнити и воплощаю идеи в жизнь.',
    about_p4: 'В плане систем прошёл путь от <span class="hl-amber">Debian</span> к <span class="hl-pink">OpenBSD</span> — по сути, Debian без systemd: больше контроля, безопасности и минимализма. Ценю простоту и надёжность во всём — от кода до инфраструктуры.',
    about_p5: 'Пишу преимущественно на <span class="hl-cyan">Java</span>, а <span class="hl-amber">Python</span> использую для автоматизации и утилит.',
    about_tag_java: 'Java',
    about_tag_python: 'Python',
    about_tag_mc: 'Minecraft',
    about_tag_plugins: 'Плагины',
    about_tag_mods: 'Моды',
    about_tag_os: 'OpenBSD',
    about_tag_linux: 'Linux',
    about_tag_i18n: 'Локализация',
    about_tag_servers: 'Серверы',
    about_tag_git: 'Git',

    /* ── Journey ── */
    journey_eyebrow: 'История',
    journey_title: 'Мой <span class="grad">путь</span>',
    journey_sub: 'Ключевые вехи в хронологическом порядке',
    tl_2025_d: '2025 — наши дни',
    tl_2025_t: 'Перевод PVZ Fusion Mod',
    tl_2025_p: 'Активная работа над полной локализацией масштабной модификации: тысячи строк перевода, адаптация интерфейса и механик под русскоязычную аудиторию.',
    tl_2024_d: '2024',
    tl_2024_t: 'Переход на OpenBSD',
    tl_2024_p: 'Миграция с Debian на OpenBSD — новый уровень контроля, безопасности и минимализма в рабочем окружении.',
    tl_2023_d: '2023 — 2024',
    tl_2023_t: 'Запуск mc.funsmine.su',
    tl_2023_p: 'Создание и настройка собственного публичного Minecraft-сервера с нуля: кастомные плагины, уникальные механики, живое сообщество.',
    tl_2022_d: '2022 — 2023',
    tl_2022_t: 'WinterClient — DLC-клиент',
    tl_2022_p: 'Разработка чит-DLC клиента для Minecraft 1.16.5: PvP-модули, визуальные улучшения, автоматизация. Проект заморожен и остаётся в архиве как важная веха пути.',
    tl_deb_d: '2022 — 2023',
    tl_deb_t: 'Осознание Debian',
    tl_deb_p: 'Знакомство с Debian кардинально изменило мою жизнь — открыло мир свободного ПО, терминала и серьёзной разработки.',
    tl_2021_d: '2021 — 2022',
    tl_2021_t: 'Углубление в Java',
    tl_2021_p: 'Интенсивное изучение Java, Minecraft-моддинга, серверной архитектуры и экосистемы плагинов.',
    tl_2020_d: '2020',
    tl_2020_t: 'Начало пути',
    tl_2020_p: 'Первые шаги в программировании: знакомство с Python и основами Java внутри мира Minecraft.',

    /* ── Projects ── */
    projects_eyebrow: 'Проекты',
    projects_title: 'Избранные <span class="grad">работы</span>',
    projects_sub: 'От серверов до клиентских модификаций — то, чем я горжусь',
    pr_pvz_status: 'В работе',
    pr_pvz_repo: 'Репозиторий',
    pr_pvz_name: 'PVZ Fusion Mod — Перевод',
    pr_pvz_desc: 'Полная локализация масштабной модификации, объединяющей Plants vs Zombies и Minecraft: интерфейс, описания растений и зомби, механики, культурные отсылки.',
    pr_pvz_tech1: 'Локализация',
    pr_pvz_tech2: 'C# / Unity',
    pr_pvz_tech3: 'JSON',
    pr_winter_status: 'Архив',
    pr_winter_name: 'WinterClient',
    pr_winter_desc: 'Собственный чит-DLC клиент для Minecraft 1.16.5: PvP-модули, визуальные улучшения, автоматизация и уникальные эксплойты. Важный этап, сейчас в архиве.',
    pr_winter_tech1: 'Java 1.16.5',
    pr_winter_tech2: 'Mixin',
    pr_winter_tech3: 'PvP',
    pr_server_status: 'Онлайн',
    pr_server_name: 'Minecraft-сервер',
    pr_server_desc: 'Публичный сервер mc.funsmine.su, настроенный с нуля: оптимизация ядра, кастомные плагины, уникальные механики. Активное сообщество и стабильная работа 24/7.',
    pr_server_tech1: 'Paper',
    pr_server_tech2: 'Плагины',
    pr_server_tech3: 'Администрирование',
    pr_other_status: 'Активно',
    pr_other_name: 'Экосистема',
    pr_other_desc: 'Кастомные плагины, утилиты автоматизации сборки, Python-скрипты для анализа логов и управления инфраструктурой, экспериментальные моды. Каждый проект — шаг вперёд.',
    pr_other_tech1: 'Java',
    pr_other_tech2: 'Python',
    pr_other_tech3: 'Bash',
    pr_view_github: 'GitHub',
    server_join: 'Присоединяйся',
    server_desc: 'Java Edition · Paper · Кастомные плагины · Дружное комьюнити',
    server_copy: 'Скопировать IP',

    /* ── Games ── */
    games_eyebrow: 'Игры',
    games_title: 'Любимые <span class="grad">игры</span>',
    games_sub: 'То, что вдохновляет и занимает свободное время',
    game_mc_t: 'Minecraft',
    game_mc_p: 'Бесконечная песочница, ставшая моей второй жизнью: серверы, плагины, моды.',
    game_mc_b: 'Любимое',
    game_wb_t: 'WorldBox',
    game_wb_p: 'God-симулятор: создавать и разрушать целые цивилизации.',
    game_wb_b: 'Песочница',
    game_mafia_t: 'Mafia II',
    game_mafia_p: 'Классическая криминальная сага с атмосферой 40–50-х годов.',
    game_mafia_b: 'Сюжет',

    /* ── Terminal ── */
    term_title: 'm1lwh@openbsd: ~',
    term_kernel: 'ядро',
    term_shell: 'оболочка',
    term_uptime: 'аптайм',
    term_terminal: 'терминал',
    term_editor: 'редактор',
    term_langs: 'языки',
    term_lines: 'строк перевода',
    term_about_cmd: 'about m1lwh',
    term_about_out: 'Java-разработчик · Minecraft · OpenBSD',
    term_translate_cmd: 'translate pvzfusion --lang ru',
    term_translate_out: '12 400+ строк переведено · работа в процессе',

    /* ── Skills ── */
    skills_eyebrow: 'Навыки',
    skills_title: 'Технический <span class="grad">стек</span>',
    skills_sub: 'Инструменты и технологии, с которыми работаю каждый день',
    skill_java: 'Java',
    skill_java_sub: 'Основной язык',
    skill_py: 'Python',
    skill_py_sub: 'Автоматизация',
    skill_mc: 'Minecraft Dev',
    skill_mc_sub: 'Плагины и моды',
    skill_os: 'Linux / OpenBSD',
    skill_os_sub: 'Системы и серверы',
    skill_git: 'Git & CI/CD',
    skill_git_sub: 'Контроль версий',
    skill_i18n: 'Локализация',
    skill_i18n_sub: 'Перевод и адаптация',

    /* ── Setup ── */
    setup_eyebrow: 'Сетап',
    setup_title: 'Рабочая <span class="grad">среда</span>',
    setup_sub: 'Минимализм, безопасность и полный контроль над процессами',
    setup_os: 'Операционная система',
    setup_os_p: 'OpenBSD — Debian без systemd. Чистота и безопасность.<img class="setup-logo" src="assets/brand/debian.svg" alt="Debian" loading="lazy">',
    setup_editor: 'Редакторы',
    setup_editor_p: 'IntelliJ IDEA для Java, Neovim и Vim для всего остального.',
    setup_term: 'Терминал',
    setup_term_p: 'Bash, tmux и хардкорные хоткеи. Без мыши — быстрее.',
    setup_git: 'Контроль версий',
    setup_git_p: 'Git + GitHub + GitLab. Чистая история, понятные коммиты.',
    setup_docker: 'Контейнеры',
    setup_docker_p: 'Docker для локальных окружений и тестовых серверов.',
    setup_gradle: 'Сборка',
    setup_gradle_p: 'Gradle — стандарт де-факто для моддинга и плагинов.',

    /* ── Gallery ── */
    gallery_eyebrow: 'Галерея',
    gallery_title: 'Мир <span class="grad">m1lwh</span>',
    gallery_sub: 'Пиксели, системы и атмосфера — нажмите на картинку',
    gal_pixel: 'Пиксельный аватар',
    gal_mc: 'Minecraft-пейзаж',
    gal_linux: 'Терминал Linux',
    gal_pvz: 'PVZ Fusion — сад',
    gal_mafia: 'Улицы Mafia II',
    gal_bsd: 'Рыбка OpenBSD',
    gal_server: 'Серверная',
    gal_cyber: 'Киберпанк',
    gal_desk: 'Рабочий стол',
    gal_java: 'Java-код',
    gal_winter: 'Зимний лес',

    /* ── FAQ ── */
    faq_eyebrow: 'FAQ',
    faq_title: 'Частые <span class="grad">вопросы</span>',
    faq_q1: 'Что такое PVZ Fusion Mod?',
    faq_a1: 'Это масштабная модификация, объединяющая вселенную Plants vs Zombies с Minecraft. Я занимаюсь её полной локализацией на русский язык: интерфейс, описания, механики.',
    faq_q2: 'Почему OpenBSD, а не Ubuntu?',
    faq_a2: 'OpenBSD — это Debian без systemd: минимализм, безопасность по умолчанию и полный контроль. Для разработки и серверов мне хватает его с головой.',
    faq_q3: 'Как попасть на ваш сервер?',
    faq_a3: 'Добавьте mc.funsmine.su в Minecraft Java Edition и заходите! Кастомные плагины, дружное комьюнити и никаких привилегий за деньги.',
    faq_q4: 'Берёте заказы на разработку?',
    faq_a4: 'Да, открыт к сотрудничеству: плагины, моды, локализация, автоматизация. Напишите в Telegram или Discord — обсудим.',
    faq_q5: 'Что с WinterClient?',
    faq_a5: 'Проект заморожен и больше не поддерживается, но остался важной вехой: именно он научил меня глубокой Java-разработке.',

    /* ── Contact ── */
    contact_eyebrow: 'Контакты',
    contact_title: 'Давайте <span class="grad">создавать</span>',
    contact_sub: 'Всегда открыт к новым знакомствам и коллаборациям',
    contact_tg: 'Telegram',
    contact_discord: 'Discord',
    contact_discord_v: 'm1lwh_tvink · клик — копия',
    contact_server: 'Discord-сервер',
    contact_mc: 'Minecraft-сервер',
    contact_mc_v: 'mc.funsmine.su · клик — копия',
    contact_note: '<span class="hl">Открыт к сотрудничеству.</span> Плагины, моды, переводы или просто поговорить о Java и OpenBSD — пишите, всегда на связи.',

    /* ── Footer ── */
    footer_made: 'Сделано с',
    footer_on: 'на',
    footer_uptime: 'сайт работает на OpenBSD',

    /* ── UI ── */
    back_top: 'Наверх',
    pal_music: 'Музыка',
    pal_btn: 'Команды',
    open_menu: 'Меню',
    pal_placeholder: 'Введите команду или поиск…',
    pal_hint: 'навигация · Enter — выполнить · Esc — закрыть',
    copied: 'Скопировано!',
    server_copied: 'IP сервера скопирован!',

    /* ── Command palette ── */
    pal_group_nav: 'Навигация',
    pal_group_actions: 'Действия',
    pal_group_socials: 'Соцсети',
    pal_copy_ip: 'Скопировать IP сервера',
    pal_copy_dc: 'Скопировать Discord',
    pal_theme: 'Сменить язык на',
    pal_github: 'GitHub',
    pal_tg: 'Telegram',
    pal_empty: 'Ничего не найдено',

    /* ── Audio ── */
    now_playing: '▶ лоу-фай в эфире',
    music_stopped: 'Музыка остановлена',

    /* ── 404 ── */
    '404_title': 'Страница не найдена',
    '404_desc': 'Похоже, этот путь ведёт в неизвестность — как паста из далёкого 2022 года.',
    '404_home': 'На главную'
  },

  en: {
    doc_title: 'm1lwh — Java Developer, Minecraft Developer & OpenBSD Enthusiast',
    doc_desc: 'Personal site of m1lwh: Java developer and Minecraft enthusiast. Plugins, mods, PVZ Fusion Mod translation, mc.funsmine.su server. Open Source and OpenBSD.',
    doc_keywords: 'm1lwh, Java Developer, Minecraft, Minecraft Developer, PVZ Fusion, plugins, mods, OpenBSD, Linux, Debian, open source, mc.funsmine.su',

    /* ── Boot ── */
    boot_sub: 'Java Developer · Minecraft · OpenBSD',
    boot_enter: 'Enter',
    boot_reset: 'reset settings',

    /* ── Nav ── */
    nav_about: 'About',
    nav_journey: 'Journey',
    nav_projects: 'Projects',
    nav_games: 'Games',
    nav_skills: 'Skills',
    nav_gallery: 'Gallery',
    nav_faq: 'FAQ',
    nav_contact: 'Contact',

    /* ── Hero ── */
    hero_badge: 'Open to collaboration',
    hero_role_prefix: 'I am a',
    hero_roles: ['Java Developer', 'Minecraft Developer', 'PVZ Fusion Translator', 'OpenBSD Enthusiast'],
    hero_tagline: 'I build <b>plugins</b>, <b>mods</b> and <b>server solutions</b> for Minecraft in Java. Right now I am fully focused on translating the legendary <b>PVZ Fusion Mod</b>. I live on OpenBSD — clean and minimal, no systemd.',
    hero_cta_projects: 'View projects',
    hero_cta_github: 'GitHub',
    hero_cta_discord: 'Copy Discord',
    hero_scroll: 'Scroll down',

    /* ── Stats ── */
    stat_years: 'years of experience',
    stat_projects: 'projects',
    stat_lines: 'translated lines',
    stat_os: 'systems migrated',

    /* ── About ── */
    about_eyebrow: 'About',
    about_title: 'Behind the code — a <span class="grad">human</span>',
    about_float1: 'Java developer',
    about_float2: 'PVZ Fusion translator',
    about_float3: 'Server mc.funsmine.su',
    about_p1: 'I am a <span class="hl-cyan">Java developer</span> with years of experience in the Minecraft ecosystem: from custom server mechanics to deep client-side modifications. My passion is pushing the limits of what is possible in the game universe.',
    about_p2: 'Right now I am fully focused on the <span class="hl-green">PVZ Fusion Mod translation</span> — a massive mod that combines Plants vs Zombies and Minecraft. Thousands of lines of text: UI, plants, zombies, mechanics — painstaking work on every single term.',
    about_p3: 'I am also the creator and administrator of the <span class="hl-violet">mc.funsmine.su</span> server, where I build a community and bring ideas to life.',
    about_p4: 'On the system side I went from <span class="hl-amber">Debian</span> to <span class="hl-pink">OpenBSD</span> — basically, Debian without systemd: more control, security and minimalism. I value simplicity and reliability in everything — from code to infrastructure.',
    about_p5: 'I write mostly in <span class="hl-cyan">Java</span>, and use <span class="hl-amber">Python</span> for automation and utilities.',
    about_tag_java: 'Java',
    about_tag_python: 'Python',
    about_tag_mc: 'Minecraft',
    about_tag_plugins: 'Plugins',
    about_tag_mods: 'Mods',
    about_tag_os: 'OpenBSD',
    about_tag_linux: 'Linux',
    about_tag_i18n: 'Localization',
    about_tag_servers: 'Servers',
    about_tag_git: 'Git',

    /* ── Journey ── */
    journey_eyebrow: 'Story',
    journey_title: 'My <span class="grad">journey</span>',
    journey_sub: 'Key milestones in chronological order',
    tl_2025_d: '2025 — today',
    tl_2025_t: 'PVZ Fusion Mod translation',
    tl_2025_p: 'Active work on the full localization of a massive mod: thousands of translated lines, adapting the UI and mechanics for the Russian-speaking audience.',
    tl_2024_d: '2024',
    tl_2024_t: 'Switch to OpenBSD',
    tl_2024_p: 'Migration from Debian to OpenBSD — a new level of control, security and minimalism in my working environment.',
    tl_2023_d: '2023 — 2024',
    tl_2023_t: 'Launch of mc.funsmine.su',
    tl_2023_p: 'Building and running my own public Minecraft server from scratch: custom plugins, unique mechanics, a living community.',
    tl_2022_d: '2022 — 2023',
    tl_2022_t: 'WinterClient — DLC client',
    tl_2022_p: 'Development of a cheat-DLC client for Minecraft 1.16.5: PvP modules, visual improvements, automation. The project is frozen and remains in the archive as an important milestone.',
    tl_deb_d: '2022 — 2023',
    tl_deb_t: 'Discovering Debian',
    tl_deb_p: 'Getting to know Debian changed my life — it opened up the world of free software, the terminal and serious development.',
    tl_2021_d: '2021 — 2022',
    tl_2021_t: 'Going deeper into Java',
    tl_2021_p: 'Intensive study of Java, Minecraft modding, server architecture and the plugin ecosystem.',
    tl_2020_d: '2020',
    tl_2020_t: 'The beginning',
    tl_2020_p: 'First steps in programming: getting familiar with Python and the basics of Java inside the world of Minecraft.',

    /* ── Projects ── */
    projects_eyebrow: 'Projects',
    projects_title: 'Selected <span class="grad">work</span>',
    projects_sub: 'From servers to client mods — things I am proud of',
    pr_pvz_status: 'In progress',
    pr_pvz_repo: 'Repository',
    pr_pvz_name: 'PVZ Fusion Mod — Translation',
    pr_pvz_desc: 'Full localization of a massive mod combining Plants vs Zombies and Minecraft: UI, plant and zombie descriptions, mechanics, cultural references.',
    pr_pvz_tech1: 'Localization',
    pr_pvz_tech2: 'C# / Unity',
    pr_pvz_tech3: 'JSON',
    pr_winter_status: 'Archive',
    pr_winter_name: 'WinterClient',
    pr_winter_desc: 'My own cheat-DLC client for Minecraft 1.16.5: PvP modules, visual improvements, automation and unique exploits. An important stage, now archived.',
    pr_winter_tech1: 'Java 1.16.5',
    pr_winter_tech2: 'Mixin',
    pr_winter_tech3: 'PvP',
    pr_server_status: 'Online',
    pr_server_name: 'Minecraft server',
    pr_server_desc: 'A public server at mc.funsmine.su built from scratch: kernel optimization, custom plugins, unique mechanics. An active community and stable 24/7 uptime.',
    pr_server_tech1: 'Paper',
    pr_server_tech2: 'Plugins',
    pr_server_tech3: 'Administration',
    pr_other_status: 'Active',
    pr_other_name: 'Ecosystem',
    pr_other_desc: 'Custom plugins, build automation utilities, Python scripts for log analysis and infrastructure management, experimental mods. Every project is a step forward.',
    pr_other_tech1: 'Java',
    pr_other_tech2: 'Python',
    pr_other_tech3: 'Bash',
    pr_view_github: 'GitHub',
    server_join: 'Join in',
    server_desc: 'Java Edition · Paper · Custom plugins · Friendly community',
    server_copy: 'Copy IP',

    /* ── Games ── */
    games_eyebrow: 'Games',
    games_title: 'Favorite <span class="grad">games</span>',
    games_sub: 'What inspires me and fills my free time',
    game_mc_t: 'Minecraft',
    game_mc_p: 'An endless sandbox that became my second life: servers, plugins, mods.',
    game_mc_b: 'Favorite',
    game_wb_t: 'WorldBox',
    game_wb_p: 'A god simulator: create and destroy entire civilizations.',
    game_wb_b: 'Sandbox',
    game_mafia_t: 'Mafia II',
    game_mafia_p: 'A classic crime saga with the atmosphere of the 40s–50s.',
    game_mafia_b: 'Story',

    /* ── Terminal ── */
    term_title: 'm1lwh@openbsd: ~',
    term_kernel: 'kernel',
    term_shell: 'shell',
    term_uptime: 'uptime',
    term_terminal: 'terminal',
    term_editor: 'editor',
    term_langs: 'languages',
    term_lines: 'translated lines',
    term_about_cmd: 'about m1lwh',
    term_about_out: 'Java Developer · Minecraft · OpenBSD',
    term_translate_cmd: 'translate pvzfusion --lang en',
    term_translate_out: '12,400+ lines translated · work in progress',

    /* ── Skills ── */
    skills_eyebrow: 'Skills',
    skills_title: 'Tech <span class="grad">stack</span>',
    skills_sub: 'Tools and technologies I work with every day',
    skill_java: 'Java',
    skill_java_sub: 'Main language',
    skill_py: 'Python',
    skill_py_sub: 'Automation',
    skill_mc: 'Minecraft Dev',
    skill_mc_sub: 'Plugins & mods',
    skill_os: 'Linux / OpenBSD',
    skill_os_sub: 'Systems & servers',
    skill_git: 'Git & CI/CD',
    skill_git_sub: 'Version control',
    skill_i18n: 'Localization',
    skill_i18n_sub: 'Translation & adaptation',

    /* ── Setup ── */
    setup_eyebrow: 'Setup',
    setup_title: 'Work <span class="grad">environment</span>',
    setup_sub: 'Minimalism, security and full control over processes',
    setup_os: 'Operating system',
    setup_os_p: 'OpenBSD — Debian without systemd. Clean and secure.<img class="setup-logo" src="assets/brand/debian.svg" alt="Debian" loading="lazy">',
    setup_editor: 'Editors',
    setup_editor_p: 'IntelliJ IDEA for Java, Neovim and Vim for everything else.',
    setup_term: 'Terminal',
    setup_term_p: 'Bash, tmux and hardcore hotkeys. No mouse — faster.',
    setup_git: 'Version control',
    setup_git_p: 'Git + GitHub + GitLab. Clean history, clear commits.',
    setup_docker: 'Containers',
    setup_docker_p: 'Docker for local environments and test servers.',
    setup_gradle: 'Build',
    setup_gradle_p: 'Gradle — the de facto standard for modding and plugins.',

    /* ── Gallery ── */
    gallery_eyebrow: 'Gallery',
    gallery_title: 'The world of <span class="grad">m1lwh</span>',
    gallery_sub: 'Pixels, systems and atmosphere — click on a picture',
    gal_pixel: 'Pixel avatar',
    gal_mc: 'Minecraft landscape',
    gal_linux: 'Linux terminal',
    gal_pvz: 'PVZ Fusion — garden',
    gal_mafia: 'Mafia II streets',
    gal_bsd: 'OpenBSD fish',
    gal_server: 'Server room',
    gal_cyber: 'Cyberpunk',
    gal_desk: 'Desktop',
    gal_java: 'Java code',
    gal_winter: 'Winter forest',

    /* ── FAQ ── */
    faq_eyebrow: 'FAQ',
    faq_title: 'Frequently asked <span class="grad">questions</span>',
    faq_q1: 'What is PVZ Fusion Mod?',
    faq_a1: 'It is a massive mod that combines the Plants vs Zombies universe with Minecraft. I am working on its full Russian localization: UI, descriptions, mechanics.',
    faq_q2: 'Why OpenBSD instead of Ubuntu?',
    faq_a2: 'OpenBSD is Debian without systemd: minimalism, security by default and full control. For development and servers it is more than enough.',
    faq_q3: 'How do I join your server?',
    faq_a3: 'Add mc.funsmine.su in Minecraft Java Edition and join! Custom plugins, a friendly community and no pay-to-win privileges.',
    faq_q4: 'Do you take development orders?',
    faq_a4: 'Yes, I am open to collaboration: plugins, mods, localization, automation. Message me on Telegram or Discord — let\'s talk.',
    faq_q5: 'What about WinterClient?',
    faq_a5: 'The project is frozen and no longer supported, but it remains an important milestone: it is what taught me deep Java development.',

    /* ── Contact ── */
    contact_eyebrow: 'Contact',
    contact_title: 'Let\'s <span class="grad">create</span>',
    contact_sub: 'Always open to new connections and collaborations',
    contact_tg: 'Telegram',
    contact_discord: 'Discord',
    contact_discord_v: 'm1lwh_tvink · click to copy',
    contact_server: 'Discord server',
    contact_mc: 'Minecraft server',
    contact_mc_v: 'mc.funsmine.su · click to copy',
    contact_note: '<span class="hl">Open to collaboration.</span> Plugins, mods, translations or just a chat about Java and OpenBSD — message me, I am always around.',

    /* ── Footer ── */
    footer_made: 'Made with',
    footer_on: 'on',
    footer_uptime: 'site runs on OpenBSD',

    /* ── UI ── */
    back_top: 'Back to top',
    pal_music: 'Music',
    pal_btn: 'Commands',
    open_menu: 'Menu',
    pal_placeholder: 'Type a command or search…',
    pal_hint: 'navigate · Enter — run · Esc — close',
    copied: 'Copied!',
    server_copied: 'Server IP copied!',

    /* ── Command palette ── */
    pal_group_nav: 'Navigation',
    pal_group_actions: 'Actions',
    pal_group_socials: 'Socials',
    pal_copy_ip: 'Copy server IP',
    pal_copy_dc: 'Copy Discord',
    pal_theme: 'Switch language to',
    pal_github: 'GitHub',
    pal_tg: 'Telegram',
    pal_empty: 'Nothing found',

    /* ── Audio ── */
    now_playing: '▶ lo-fi is on',
    music_stopped: 'Music stopped',

    /* ── 404 ── */
    '404_title': 'Page not found',
    '404_desc': 'This path leads into the unknown — like a 2022 pasta.',
    '404_home': 'Back Home'
  }
};

let currentLang = 'ru';

function t(key, lang = currentLang) {
  const dict = I18N[lang] || I18N.ru;
  if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
  if (lang !== 'ru' && Object.prototype.hasOwnProperty.call(I18N.ru, key)) return I18N.ru[key];
  return key;
}

function detectLang() {
  const saved = localStorage.getItem(I18N_KEY);
  if (saved === 'ru' || saved === 'en') return saved;
  return (navigator.language || 'ru').toLowerCase().indexOf('ru') === 0 ? 'ru' : 'en';
}

function applyLang(lang, opts = {}) {
  currentLang = lang === 'en' ? 'en' : 'ru';
  if (opts.save !== false) {
    try { localStorage.setItem(I18N_KEY, currentLang); } catch (e) { /* private mode */ }
  }
  document.documentElement.lang = currentLang;
  document.title = t('doc_title');
  const metaMap = {
    'meta[name="description"]': 'doc_desc',
    'meta[name="keywords"]': 'doc_keywords',
    'meta[property="og:description"]': 'doc_desc',
    'meta[name="twitter:description"]': 'doc_desc',
  };
  Object.entries(metaMap).forEach(([sel, key]) => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute(el.tagName === 'META' ? 'content' : 'content', t(key));
  });
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.innerHTML = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
  });
  document.querySelectorAll('[data-lang]').forEach((b) => {
    const on = b.dataset.lang === currentLang;
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', String(on));
  });
  document.dispatchEvent(new CustomEvent('langchange', { detail: currentLang }));
}
