export interface BlitzSlide {
  id: number
  question: string
  subtext?: string
  tagText?: string
  options: {
    label: string
    isPrimary?: boolean
  }[]
  isHeroIntro?: boolean
  polaroidPhoto?: string
  polaroidCaption?: string
  aspectRatio?: 'vertical' | 'horizontal'
  rotation?: number
}

export interface MemoryItem {
  id: number
  photo: string
  title: string
  caption: string
  question: string
  options: string[]
  correctIndex?: number
  allCorrect?: boolean
  hint?: string
  story: string
  rotation?: number
  aspectRatio?: 'vertical' | 'horizontal' | '4/3'
  objectPosition?: string
}

export interface QuestConfig {
  personName: string
  sisterRelation: string
  musicTrack: {
    title: string
    artist: string
    url?: string
  }
  blitzSlides: BlitzSlide[]
  memories: MemoryItem[]
  finale: {
    letterTitle: string
    letterGreeting: string
    letterParagraphs: string[]
    signature: string
    cakeWishText?: string
    cakeBlownText?: string
  }
}

export const getAssetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${base}${cleanPath}`
}

export const questData: QuestConfig = {
  personName: "Яна",
  sisterRelation: "улюблена сестричка",
  musicTrack: {
    title: "Dream",
    artist: "Imagine Dragons",
    url: getAssetUrl("music/dream.mp3")
  },
  blitzSlides: [
    {
      id: 1,
      question: "У когось, напевно, сьогодні день народження... 👀",
      subtext: "Давай це швиденько перевіримо.",
      options: [
        { label: "Перевірити", isPrimary: true }
      ],
      isHeroIntro: true,
      rotation: 0
    },
    {
      id: 2,
      question: "Вас випадково звуть Яна? І це ви зображені на фото?",
      subtext: "Система проводить ідентифікацію головної винуватиці свята.",
      options: [
        { label: "Так, це я" },
        { label: "Звісно, це точно я" }
      ],
      polaroidPhoto: getAssetUrl("images/1.jpg"),
      polaroidCaption: "Головна героїня дня",
      aspectRatio: "vertical",
      rotation: 0
    },
    {
      id: 3,
      question: "Астрологічний факт: хто тут у нас небезпечний і прекрасний Скорпіон?",
      subtext: "Магнетична інтуїція, сталевий характер і вміння відчувати фальш за кілометр. Якщо Скорпіон чогось захоче — весь всесвіт допоможе це отримати.",
      options: [
        { label: "Це на всі 100% про мене" },
        { label: "Інтуїція мене ніколи не підводить" },
        { label: "Я СКОРПІОН І ЦИМ ВСЕ СКАЗАНО" }
      ],
      polaroidPhoto: getAssetUrl("images/2.jpg"),
      polaroidCaption: "Справжній характер Скорпіона",
      aspectRatio: "vertical",
      rotation: 0
    },
    {
      id: 4,
      tagText: "Я жартую, останнє уточнення",
      question: "Що це за чоловік з вами на фото?",
      subtext: "Камера зафіксувала підозріло красиву та щасливу пару. Хто цей солідний джентльмен поруч?",
      options: [
        { label: "Мій майбутній чоловік" },
        { label: "Я його не знаю" },
        { label: "Мій колега" }
      ],
      polaroidPhoto: getAssetUrl("images/3.jpg"),
      polaroidCaption: "Секретний агент розкритий",
      aspectRatio: "vertical",
      rotation: 0
    }
  ],
  memories: [
    {
      id: 1,
      photo: getAssetUrl("images/4.png"),
      title: "Шкільні роки",
      caption: "Останній шкільний дзвінок",
      question: "Яка це подія була закарбована?",
      options: [
        "Мій останній дзвінок зі школи",
        "День вчителя в школі",
        "8 березня в школі"
      ],
      correctIndex: 0,
      hint: "Зверни увагу на білі бантики, шкільну форму та святкову стрічку випускниці.",
      story: "Той самий незабутній останній дзвінок зі школи! Білі пишні бантики, червоні троянди й початок великого життєвого шляху.",
      aspectRatio: "horizontal",
      objectPosition: "object-center"
    },
    {
      id: 2,
      photo: getAssetUrl("images/5.jpg"),
      title: "День народження братів",
      caption: "День народження молодших братів",
      question: "Кого це ти на фото так старанно годуєш тортом?",
      options: [
        "Саша, мій молодший брат",
        "Наче Саша",
        "Якогось дуже голодного хлопчика"
      ],
      allCorrect: true,
      story: "Спільний день народження молодших братів! Старша турботлива сестра в дії: щоб свято вдалося на всі 100%, іменинник має обов'язково скуштувати найсмачніший шматок торта.",
      aspectRatio: "4/3",
      objectPosition: "object-center"
    },
    {
      id: 3,
      photo: getAssetUrl("images/6.jpg"),
      title: "Дачний чіл",
      caption: "Повний релакс у гамаку",
      question: "В якому місці було зроблено це фото?",
      options: [
        "У дядька Андрія на дачі",
        "В селі у бабусі після городу",
        "На секретній турбазі «Преміум Гамак»"
      ],
      correctIndex: 0,
      hint: "Зверни увагу на знайомий паркан, затишний гамак і ту саму атмосферу дачі дядька Андрія.",
      story: "Той самий легендарний дачний релакс у дядька Андрія! Великий капелюх від сонця, гамак і повний дзен — ідеальний рецепт перезавантаження.",
      aspectRatio: "vertical",
      objectPosition: "object-center"
    },
    {
      id: 4,
      photo: getAssetUrl("images/7.jpg"),
      title: "Зустріч з братом",
      caption: "Теплі обійми в Норвегії",
      question: "В якій країні було зроблено це фото?",
      options: [
        "В Норвегії",
        "Польща",
        "Україна"
      ],
      correctIndex: 0,
      hint: "Зверни увагу на північний затишок і брата, який зараз живе серед норвезьких фіордів.",
      story: "Саме так, це наша тепла зустріч у Норвегії! Скільки б кілометрів нас не розділяло, такі моменти нагадують, наскільки ми близькі та рідні.",
      aspectRatio: "vertical",
      objectPosition: "object-center"
    },
    {
      id: 5,
      photo: getAssetUrl("images/8.jpg"),
      title: "Сім'я разом",
      caption: "День народження мами",
      question: "Що це була за подія?",
      options: [
        "День народження моєї мамочки ❤️",
        "День народження моєї мамочки ❤️",
        "День народження моєї мамочки ❤️"
      ],
      allCorrect: true,
      story: "Найтепліший день у колі найрідніших людей! Мама зі своїм розкішним букетом білих троянд, підрослі брати й ти — найкрасивіші та найщасливіші.",
      aspectRatio: "vertical",
      objectPosition: "object-center"
    },
    {
      id: 6,
      photo: getAssetUrl("images/9.jpg"),
      title: "1 вересня",
      caption: "1 вересня у малих в школі",
      question: "Що це за подія була?",
      options: [
        "1 вересня у малих в школі",
        "День міста",
        "День жарту"
      ],
      correctIndex: 0,
      hint: "Поглянь на святкові наряди малих і їхні щирі посмішки.",
      story: "Той самий святковий день 1 вересня у школі! Малі у красивих нарядах, а старша сестра поруч — головна підтримка й гордість для молодших братів.",
      aspectRatio: "vertical",
      objectPosition: "object-center"
    }
  ],
  finale: {
    letterTitle: "Особистий лист",
    letterGreeting: "Дорога Яночко,",
    letterParagraphs: [
      "З Днем Народження тебе!",
      "Бажаю тобі безмежного щастя, щирого кохання та здійснення всіх заповітних мрій. Завжди залишайся такою ж яскравою, доброю та неймовірною.",
      "Скільки б кілометрів нас не розділяло — я завжди поруч і дуже пишаюся тобою!"
    ],
    signature: "Твій брат"
  }
}
