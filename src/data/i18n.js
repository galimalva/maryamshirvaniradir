export const t = {
  fa: {
    brand: "شویار",
    home: "خانه",
    about: "درباره من",
    works: "آثار",
    gallery: "گالری",
    achievements: "افتخارات",
    contact: "ارتباط",
    menu: "منو",
    theme: "حالت روز و شب",
    introName: "مریم شیروانی‌راد",
    introPen: "«شویار»",
    // home
    homeTitle: "مریم شیروانی‌راد «شویار»",
    homeLead:
      "شاعر و داستان‌نویس؛ از سال ۱۳۹۱ به‌طور حرفه‌ای شعر می‌نویسم و از سال ۱۳۹۳ داستان‌نویسی را دنبال می‌کنم.",
    homeLine2:
      "جهان نوشتن برای من جایی‌ست برای دیدن آنچه در زندگی روزمره کمتر دیده می‌شود.",
    // about
    aboutTitle: "من مریم شیروانی‌راد هستم.",
    aboutBody:
      "شاعر و داستان‌نویس، متولد ۱۳۵۴؛ از سال ۱۳۹۱ به‌طور حرفه‌ای شعر می‌نویسم و از سال ۱۳۹۳ داستان‌نویسی را دنبال می‌کنم. شعر و داستان برای من دو زبان برای نزدیک‌شدن به انسان‌اند.",
    // works
    worksTitle: "آثار شویار",
    worksSub: "داستان‌ها و شعرهایی که ادامه یا مجموعه‌شان در تلگرام منتشر می‌شود.",
    stories: "داستان‌ها",
    poems: "شعرها",
    storyPill: "برشی از داستان",
    poemPill: "شعر",
    moreTg: "ادامه در تلگرام ←",
    // gallery
    galleryTitle: "لحظه‌هایی از مسیر ادبی",
    gallerySub: "روی هر عکس کلیک کنید تا بزرگ شود.",
    galleryHint: "گالری تصاویر؛ نشست‌ها، میز کار و لحظه‌های نوشتن.",
    close: "بستن",
    // achievements
    achTitle: "مسیر ادبی، قدم‌به‌قدم",
    // contact
    contactTitle: "برای گفت‌وگو، همکاری و ارتباط",
    contactSub: "یکی از راه‌های زیر را انتخاب کنید.",
    titles: {
      home: "مریم شیروانی‌راد | شویار",
      about: "درباره من | شویار",
      works: "آثار | شویار",
      gallery: "گالری | شویار",
      achievements: "افتخارات | شویار",
      contact: "ارتباط | شویار",
    },
  },

  en: {
    brand: "Shooyar",
    home: "Home",
    about: "About",
    works: "Works",
    gallery: "Gallery",
    achievements: "Achievements",
    contact: "Contact",
    menu: "Menu",
    theme: "Day / Night mode",
    introName: "Maryam Shirvani Rad",
    introPen: "“Shooyar”",
    homeTitle: "Maryam Shirvani Rad “Shooyar”",
    homeLead:
      "Poet and fiction writer; I have been writing poetry professionally since 2012 and fiction since 2014.",
    homeLine2:
      "Writing, for me, is a place to see what everyday life rarely lets us see.",
    aboutTitle: "I am Maryam Shirvani Rad.",
    aboutBody:
      "Poet and fiction writer, born in 1975. I have been writing poetry professionally since 2012 and fiction since 2014. Poetry and prose are, for me, two languages for getting closer to the human being.",
    worksTitle: "Shooyar’s Works",
    worksSub:
      "Stories and poems whose full versions are published on Telegram.",
    stories: "Stories",
    poems: "Poems",
    storyPill: "Story excerpt",
    poemPill: "Poem",
    moreTg: "Read on Telegram →",
    galleryTitle: "Moments of the Literary Path",
    gallerySub: "Click any photo to enlarge it.",
    galleryHint: "Readings, my desk, and moments of writing.",
    close: "Close",
    achTitle: "A Literary Path, Step by Step",
    contactTitle: "For Dialogue, Collaboration and Contact",
    contactSub: "Choose one of the following ways to reach me.",
    titles: {
      home: "Maryam Shirvani Rad | Shooyar",
      about: "About | Shooyar",
      works: "Works | Shooyar",
      gallery: "Gallery | Shooyar",
      achievements: "Achievements | Shooyar",
      contact: "Contact | Shooyar",
    },
  },
};

// سال‌های شمسی → میلادی فقط برای نمایش انگلیسی
export const yearEn = (fa) =>
  ({
    "۱۳۵۴": "1975",
    "۱۳۹۱": "2012",
    "۱۳۹۳": "2014",
    "۱۴۰۰": "2021",
    "۱۴۰۱": "2022",
    "۱۴۰۲": "2023",
    "۱۴۰۳": "2024",
  }[fa] ?? fa);