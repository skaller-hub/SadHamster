export interface Achievement {
  name: string;
  emoji: string;
  description: string;
  longDescription: string;
  reward?: number;
  requirement?: number;
  clicksRequired?: number;
  purchasesRequired?: number;
}

export const achievements: { [key: string]: Achievement } = {
  hamsterBeginner: {
    name: "Первые сыркоины",
    emoji: "🧀",
    description: "Набрать 100 сыркоинов",
    longDescription:
      "Хомяк впервые понял, что даже маленькая забота может согреть. Ты помог ему сделать первый шаг к теплу.",
    requirement: 100,
  },
  comfortTrainee: {
    name: "Лёгкая забота",
    emoji: "🧸",
    description: "Набрать 1 000 сыркоинов",
    longDescription:
      "Маленький уют уже начинает работать. Хомяк перестаёт дрожать и учится надеяться.",
    requirement: 1000,
  },
  hamsterExpert: {
    name: "Понимание",
    emoji: "🌙",
    description: "Набрать 10 000 сыркоинов",
    longDescription:
      "Хомяк понимает, что счастье не всегда громкое — иногда оно тихо приходит в тёплых глазах.",
    requirement: 10000,
  },
  comfortMaster: {
    name: "Тёплый домик",
    emoji: "🏠",
    description: "Набрать 100 000 сыркоинов",
    longDescription:
      "Домик стал уютнее, и хомяк наконец-то начал дышать спокойно.",
    requirement: 100000,
  },
  hamsterLegend: {
    name: "Маленькая надежда",
    emoji: "✨",
    description: "Набрать 1 000 000 сыркоинов",
    longDescription:
      "Всего одна маленькая надежда уже освещает путь. Хомяк начинает верить, что всё можно поправить.",
    requirement: 1000000,
  },
  hamsterTycoon: {
    name: "Шок от счастья",
    emoji: "😮",
    description: "Набрать 10 000 000 сыркоинов",
    longDescription:
      "Хомяк внезапно понимает, что счастье действительно рядом — и от этого у него перехватывает дыхание.",
    requirement: 10000000,
  },
  hamsterMagnate: {
    name: "Восторг",
    emoji: "🤩",
    description: "Набрать 100 000 000 сыркоинов",
    longDescription:
      "Словно весь мир вдруг стал добрее. Хомяк улыбается без страха и не может поверить в этот момент.",
    requirement: 100000000,
  },
  hamsterBaron: {
    name: "Сырный кайф",
    emoji: "🧀",
    description: "Набрать 1 000 000 000 сыркоинов",
    longDescription:
      "Хомяк наконец-то получил то, к чему шёл — тепло, уют и настоящую радость.",
    requirement: 1000000000,
  },
  hamsterEmpire: {
    name: "Король уюта",
    emoji: "👑",
    description: "Набрать 10 000 000 000 сыркоинов",
    longDescription:
      "Тернистый путь завершён. Хомяк стал главным героем своей счастливой истории.",
    requirement: 10000000000,
  },
  hamsterUniverse: {
    name: "Герой счастья",
    emoji: "🌟",
    description: "Набрать 100 000 000 000 сыркоинов",
    longDescription:
      "Хомяк не просто счастлив — он осознал, что любовь и забота делают мир прекрасным.",
    requirement: 100000000000,
  },

  clickingNovice: {
    name: "Пожалевший хомяка",
    emoji: "🫶",
    description: "Нажать кнопку 10 раз",
    longDescription:
      "Ты уже не просто нажимаешь — ты замечаешь хомяка и пытаешься согреть его маленькими действиями.",
    clicksRequired: 10,
  },
  clickingPro: {
    name: "Тихая поддержка",
    emoji: "💛",
    description: "Нажать кнопку 100 раз",
    longDescription:
      "Каждый клик — это чуть-чуть больше тепла. Хомяк начинает чувствовать, что рядом кто-то есть.",
    clicksRequired: 100,
  },
  clickingChampion: {
    name: "Бантик в подарок",
    emoji: "🎀",
    description: "Нажать кнопку 500 раз",
    longDescription:
      "Маленький бантик и забота меняют настроение. Даже грусть становится чуть мягче.",
    clicksRequired: 500,
  },
  clickingMaster: {
    name: "Взгляд в глаза",
    emoji: "👀",
    description: "Нажать кнопку 1 000 раз",
    longDescription:
      "Хомяк начинает смотреть не в пустоту, а в будущее. В его глазах появляется свет.",
    clicksRequired: 1000,
  },
  clickingSuperstar: {
    name: "Вкусная награда",
    emoji: "🍪",
    description: "Нажать кнопку 5 000 раз",
    longDescription:
      "Вкусняшка зажгла в нём надежду, и весь мир стал чуть более добрым.",
    clicksRequired: 5000,
  },
  clickingLegend: {
    name: "Легенда счастья",
    emoji: "🌈",
    description: "Нажать кнопку 10 000 раз",
    longDescription:
      "Ты сделал столько добрых кликов, что хомяк наконец понял: чудо возможно.",
    clicksRequired: 10000,
  },
  clickingTitan: {
    name: "Гигант доброты",
    emoji: "💖",
    description: "Нажать кнопку 50 000 раз",
    longDescription:
      "Твой путь к счастью уже стал настоящим подвигом любви и заботы.",
    clicksRequired: 50000,
  },

  buyBeginner: {
    name: "Покупатель уюта",
    emoji: "🛍️",
    description: "Купить 10 предметов",
    longDescription:
      "Первые покупки наполняют хомяка теплом. Маленькие радости складываются в большой уют.",
    purchasesRequired: 10,
  },
  buyingEnthusiast: {
    name: "Любитель комфорта",
    emoji: "🧶",
    description: "Купить 50 предметов",
    longDescription:
      "Хомяк уже не просто выживает — он начинает чувствовать себя дома.",
    purchasesRequired: 50,
  },
  shoppingPro: {
    name: "Профессионал счастья",
    emoji: "🎀",
    description: "Купить 100 предметов",
    longDescription:
      "Уют стал привычкой, и хомяк перестаёт бояться нового дня.",
    purchasesRequired: 100,
  },
  buyTycoon: {
    name: "Магнат добра",
    emoji: "✨",
    description: "Купить 500 предметов",
    longDescription:
      "Ты строишь самый тёплый уголок для хомяка — и это уже выглядит как маленькое чудо.",
    purchasesRequired: 500,
  },
  buyExpert: {
    name: "Эксперт заботы",
    emoji: "💫",
    description: "Купить 1 000 предметов",
    longDescription:
      "Хомяк окружён заботой, и его мир уже совсем не похож на одиночество.",
    purchasesRequired: 1000,
  },

  ShareGameEnthusiast: {
    name: "Поделившийся счастьем",
    emoji: "🔗",
    description: "Нажать кнопку «Поделиться»",
    longDescription:
      "Ты рассказал миру о хомяке и его пути к счастью. Теперь его история становится чуточку светлее.",
    reward: 5000,
  },
  volumeController: {
    name: "Регулятор звука",
    emoji: "🔊",
    description: "Изменить громкость звука",
    longDescription:
      "Теперь можно выбрать именно ту музыку и мягкость, которые лучше всего подходят хомяку.",
  },
  profilePicturePro: {
    name: "Профильный романтик",
    emoji: "📷",
    description: "Изменить фото профиля",
    longDescription:
      "У хомяка теперь есть собственный стиль, а значит — и своё маленькое счастье.",
  },
};
