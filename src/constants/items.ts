export interface Item {
  name: string;
  cost: number;
  multiplier: number;
  perSecond: number;
  description: string;
  emoji?: string;
}

export const items: { [key: string]: Item } = {
  smallCushion: {
    name: "Маленькая подушка",
    cost: 20,
    multiplier: 0.5,
    perSecond: 2,
    description: "Тёплая мягкая подушка, которая помогает хомяку немного расслабиться.",
    emoji: "🛏️",
  },

  warmToy: {
    name: "Плюшевая грелка",
    cost: 100,
    multiplier: 2,
    perSecond: 5,
    description: "Грелка с уютным теплом, которая согревает хомяка в самые тоскливые моменты.",
    emoji: "🧸",
  },

  comfortMat: {
    name: "Коврик из мохера",
    cost: 500,
    multiplier: 5,
    perSecond: 20,
    description: "Мягкий коврик, на котором хомяк чувствует себя чуть счастливее и спокойнее.",
    emoji: "🧶",
  },

  happinessBow: {
    name: "Бантик счастья",
    cost: 1000,
    multiplier: 10,
    perSecond: 30,
    description: "Пушистый бантик, после которого хомяк смотрит на мир совсем по-другому.",
    emoji: "🎀",
  },

  comfortBlanket: {
    name: "Пелёнка-обнимашка",
    cost: 2500,
    multiplier: 25,
    perSecond: 50,
    description: "Мягкая пелёнка, в которой хомяк чувствует себя защищённым и любимым.",
    emoji: "🧣",
  },

  nightLight: {
    name: "Лампа-ночник",
    cost: 5000,
    multiplier: 50,
    perSecond: 100,
    description: "Тёплый ночник помогает хомяку меньше бояться темноты и одиночества.",
    emoji: "💡",
  },

  goldenFlower: {
    name: "Сырный торт",
    cost: 12500,
    multiplier: 75,
    perSecond: 180,
    description: "Самый вкусный кусочек счастья, который делает хомяка чуть более счастливым.",
    emoji: "🧀",
  },

  milkCup: {
    name: "Кружка с молоком",
    cost: 20000,
    multiplier: 100,
    perSecond: 250,
    description: "Спокойный вечер за чашкой тёплого молока и мягким светом.",
    emoji: "🥛",
  },

  careCoat: {
    name: "Костюм заботы",
    cost: 100000,
    multiplier: 500,
    perSecond: 1000,
    description: "Уютный наряд, который напоминает хомяку, что он тоже заслуживает тепло.",
    emoji: "🧥",
  },

  hive: {
    name: "Домик для хомяка",
    cost: 500000,
    multiplier: 1000,
    perSecond: 2000,
    description: "Небольшой домик, где хомяк может укрыться от тревоги и просто быть собой.",
    emoji: "🏡",
  },

  royalJelly: {
    name: "Пуховый плед",
    cost: 1000000,
    multiplier: 2000,
    perSecond: 5000,
    description: "Плед, который дарит ощущение уюта даже в самый тяжёлый день.",
    emoji: "🧵",
  },

  pollinatorDrone: {
    name: "Игровая игрушка",
    cost: 2500000,
    multiplier: 3000,
    perSecond: 7500,
    description: "Пушистая игрушка, от которой хомяк не может оторвать глаз и начинает улыбаться.",
    emoji: "🧸",
  },

  royalHive: {
    name: "Кровать из плюша",
    cost: 5000000,
    multiplier: 5000,
    perSecond: 10000,
    description: "Пуховая кровать, в которой хочется забыть грусть и просто спать спокойно.",
    emoji: "🛏️",
  },

  apiary: {
    name: "Сырный фестиваль",
    cost: 10000000,
    multiplier: 7500,
    perSecond: 15000,
    description: "Целый день радости, сыра и общения, которого так не хватало хомяку.",
    emoji: "🎉",
  },

  pollenCollector: {
    name: "Звёздный проектор",
    cost: 25000000,
    multiplier: 10000,
    perSecond: 20000,
    description: "Небесный свет на потолке, который помогает хомяку слушать тишину и мечтать.",
    emoji: "🌌",
  },

  crystalBowl: {
    name: "Кристальная миска",
    cost: 50000000,
    multiplier: 15000,
    perSecond: 30000,
    description: "Лучшая миска для угощений — хомяк сияет от счастья при виде неё.",
    emoji: "🥣",
  },

  diamondHive: {
    name: "Счастливый фонарь",
    cost: 100000000,
    multiplier: 25000,
    perSecond: 50000,
    description: "Яркий свет, который напоминает хомяку, что он не один и всё хорошо.",
    emoji: "💎",
  },

  cheeseShop: {
    name: "Сырная лавка",
    cost: 500000000,
    multiplier: 50000,
    perSecond: 100000,
    description: "Небольшой сырный рай, где хомяк наконец получает то, о чём мечтал.",
    emoji: "🧀",
  },
  happinessPark: {
    name: "Парк счастья",
    cost: 1000000000,
    multiplier: 150000,
    perSecond: 350000,
    description: "Полный уютных мест и тёплых неожиданностей, где хомяк чувствует себя по-настоящему живым.",
    emoji: "🌼",
  },
  happyMomentsMuseum: {
    name: "Музей счастливых моментов",
    cost: 5000000000,
    multiplier: 750000,
    perSecond: 1500000,
    description: "Место, где собираются все маленькие победы, открывшие хомяку дорогу к радости.",
    emoji: "🏛️",
  },
  heroStatue: {
    name: "Статуя героя",
    cost: 10000000000,
    multiplier: 2000000,
    perSecond: 4000000,
    description: "Памятник хомяку, который прошёл путь от слёз к счастью.",
    emoji: "🗿",
  },
  codingHamster: {
    name: "Кодовый хомяк",
    cost: 50000000000,
    multiplier: 10000000,
    perSecond: 250000000,
    description: "Хомяк, который научился писать код, улыбаться и помогать другим быть счастливее.",
    emoji: "🐹💻",
  },
};
