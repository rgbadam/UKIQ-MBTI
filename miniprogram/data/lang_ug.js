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
    navBarTitle: "خارەكتىر MBTI",
    tabBarTitle: "باشبەت",
    homeTitle: "MBTI خارەكتىر سىنىقى ",
    subTitle: "-- ئۆز خارەكتىرىنى چۈشىنىش نەقەدەر گۈزەل --",
    total: "جەمئىي",
    quests: "سۇئال",
    langSwitch: "中/ئۇ",
    submit: "تامام"
  },
  testResult: {
    navBarTitle: "سىناق نەتىجىسى",
    analysis: "خارەكتىر ئالاھىدىلىكى",
    career: "خىزمەت تەۋسىيەسى",
    advantage: "ئارتۇقچىلىق",
    disadvantage: "ئاجىزلىق",
    relationship: "مۇھەببەت ۋە دوستلۇق"
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
    faq: "دائىمىي سۇئاللار",
    aboutUs: "ھەققىدە MBTI",
    contactUs: "تەكلىپ پىكىر"
  }
}

module.exports = {
  'questions': questions,
  'results': results,
  'pageTexts': pageTexts
}
