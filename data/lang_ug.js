import EI_questionList from "./ug/EI";
import NS_questionList from "./ug/NS";
import FT_questionList from "./ug/FT";
import JP_questionList from "./ug/JP";
import resultList from "./ug/result";

const questions = [
  ...EI_questionList,
  ...NS_questionList,
  ...FT_questionList,
  ...JP_questionList,
];

const results = [
  ...resultList
]

const pageTexts = {
  homepage: {
    navBarTitle: "MBTI",
    tabBarTitle: "باشبەت",
    homeTitle: "MBTI خارەكتىر سىنىقى ",
    subTitle: "-- ئۆز خارەكتىرىنى چۈشىنىش نەقەدەر گۈزەل --",
    total: "جەمئىي",
    quests: "سۇئال",
    langSwitch: "中",
    submit: "تامام"
  },
  testResult: {
    navBarTitle: "سىناق نەتىجىسى",
    analysis: "خارەكتىر ئالاھىدىلىكى",
    career: "خىزمەت تەۋسىيەسى",
    advantage: "ئارتۇقچىلىق",
    disadvantage: "ئاجىزلىق",
    relationship: "مۇھەببەت ۋە دوستلۇق",
    shareText: "دوستۇممۇ سىناپ باقسۇنچۇ 🔮"
  },
  typeList: {
    navBarTitle: "خارەكتىرلەر",
    tabBarTitle: "خارەكتىرلەر",
    title: "16 خىل MBTI خارەكتىر تىپلىرى",
    analysis: "خارەكتىر ئالاھىدىلىكى",
    career: "خىزمەت تەۋسىيەسى",
    advantage: "ئارتۇقچىلىق",
    disadvantage: "ئاجىزلىق",
    relationship: "مۇھەببەت ۋە دوستلۇق"
  },
  userCenter: {
    navBarTitle: "كەمىنە",
    tabBarTitle: "كەمىنە",
    notTested: "تېخى خارەكتىرىڭىزنى سىناپ كۆرمەپسىز",
    tested: "سىزنىڭ خارەكتىر تىپىڭىز",
    aboutUs: "ھەققىدە MBTI",
    faq: "دائىمىي سۇئاللار",
    share: "ھەمبەھرلەش",
    jumpApp: "ئىلھام بۇلىقى"
  },
  discoverPage: {
    navBarTitle: "خارەكتىر سىنىقى",
    tabBarTitle: "MBTI",
    langSwitch: "中",
    getStarted: "سىناپ كۆرەي",
    funcTitle: "- ئۆز خارەكتىرىنى چۈشىنىش نەقەدەر گۈزەل -",
    typeList: "خارەكتىر تىپلىرى",
    aboutMBTI: "ھەققىدە MBTI",
    FAQ: "دائىمىي سۇئاللار",
    testedText: "سىزنىڭ خارەكتىر تىپىڭىز",
    notTestedText: "تېخى خارەكتىرىڭىزنى سىناپ كۆرمەپسىز"
  },
  personalPage: {
    langSwitch: "中",
    myProfile: "ئۇچۇرۇم",
    shareToFriend: "تەۋسىيەلەش",
    moreFun: "ئىلھاملار",
    cooperation: "ھەمكارلىق",
    quoteText: "ھەر ئىشتا بىر ھېكمەت بار."
  }
}

module.exports = {
  'questions': questions,
  'results': results,
  'pageTexts': pageTexts
}
