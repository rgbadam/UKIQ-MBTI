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
    cooperation: "ھەمكارلىق"
  },
  profilePage: {
    navBarTitle: "شەخسىي ئۇچۇرلار",
    vipMember: "VIP ئەزالىق",
    vipActiveDesc: "ئەتىۋا مۇلازىمەت تولۇق ئىمتىيازى ھازىردۇر",
    vipInactiveDesc: "ئەزالىقتا تېخىمۇ كۆپ ئەتىۋا مۇلازىمەت ئىمتىيازى باردۇر",
    vipActivated: "ئەتىۋا ئەزا",
    vipNotActivated: "ئەزا بولاي",
    personalityType: "خارەكتېر تىپى",
    notTested: "نامەلۇم",
    favorites: "ياقتۇرغان ئىسىم",
    noFavorites: "يوق",
    genderTitle: "سالاھىيەت",
    wechatNickname: "نام ئاتاق",
    nicknameNotSet: "تېخى قويۇلماپمىش",
    phoneNumber: "ئالاقە نۇمۇر",
    phoneNotBound: "تېخى باغلانماپمىش",
    userId: "user ID",
    noUserId: "تېخى تىزىملانماپمىش",
    switch: "تاللاش",
    edit: "ئاتاغلاش",
    bind: "باغلاش",
    copy: "كۆچۈرۈش",
    logout: "تىزىمدىن چىقىش"
  },
  vipDetailPage: {
    navBarTitle: "VIP ئۇچۇرى",
    title: "VIP ئەزالىق ئىمتىيازلىرى",
    subtitle: "ئات تىلىش ۋە خارەكتىر چۈشەنچىسىنى ئاسانلاشتۇرىدۇ",
    statusLabel: "ھازىرقى ھالەت",
    statusActive: "VIP ئەزالىق ئاكتىپ",
    statusInactive: "تېخى VIP ئەزا ئەمەس",
    benefitsTitle: "ئالاھىدە ئىمتىيازلار",
    benefit1: "تېخىمۇ كۆپ ئىسىم ۋە خارەكتىر تەكلىپلىرى",
    benefit2: "يېڭى ئەمەللىرىنى ئالدى بىلەن سىناش ئىقتىدارى",
    benefit3: "ئالاھىدە خېرىدار مۇلازىمىتى، سۇئاللارغا جاۋاب",
    contactService: "مۇلازىمەت بىلەن ئالاقىلەش",
    contactDesc: "سۈزۈك چۈشەندۈرۈش ياكى قوللاش لازىم بولسا، تەرجىمان بىلەن ئالاقىلىشىڭ.",
    infoTitle: "تىزىمغا كىرگەندە ئەزا ئۇچۇرلىرىنى كۆرەلەيسىز",
    loginFirst: "ئاۋۋال تىزىمغا كىرىڭ",
    loginDesc: "ھازىرقى ئەزالىق ھالىتى ۋە تارىخىنى كۆرۈش ئۈچۈن تىزىمغا كىرىڭ",
    loginButton: "تىزىمغا كىرىش",
    currentPlan: "ھازىرقى پىلان",
    noActiveMembership: "ھازىرچە ئاكتىپ ئەزالىق يوق",
    planPeriod: "ئۈنۈملۈك ۋاقتى",
    planAmount: "تۆلەنگەن سومما",
    historyTitle: "ئەزالىق تارىخى",
    historyStatusActive: "ئىجرا بولۇۋاتىدۇ",
    historyStatusExpired: "ئاخىرلاشقان",
    historyEmpty: "تارىخ خاتىرىسى تېخى يوق",
    membershipTypes: {
      monthly: "ئايلىق ئەزا",
      quarterly: "پەسىللىك ئەزا",
      halfyear: "يېرىم يىللىق ئەزا",
      yearly: "يىللىق ئەزا",
      custom: "ئالاھىدە مۆھلەت",
      lifetime: "ئۆمۈرلۈك ئەزا"
    }
  },
  vipOpenPage: {
    navBarTitle: "ئەزالىق ئېچىش",
    title: "VIP ئەزالىق ئېچىش",
    subtitle: "تېخىمۇ كۆپ ئەتىۋا مۇلازىمەتكە ئېرىشەلەيسىز",
    benefit1: "بارچە ئىسىملارنى كۆرۈش",
    benefit2: "شەخسىي ياردەمچى",
    benefit3: "تولۇق خارەكتېر سۇئاللىرى",
    infoTitle: "ئۇچۇر تولۇقلاش",
    loginFirst: "ئاۋۋال تىزىمغا كىرىڭ",
    fillTips: "تىزىملىتىپ تېلېفون ۋە ئۈندىدار نامىنى تولدۇرۇڭ",
    loginButton: "تىزىملىتىش",
    phoneLabel: "تېلېفون نومۇرىڭىز",
    nicknameLabel: "ئۈندىدار ئىسمىڭىز",
    saveInfoButton: "تامام",
    payTitle: "ھەق تاپشۇرۇش",
    longPressHint: "ئىككىلىك كودنى ئۇزۇن بېسىپ تۇرۇپ ھەق تاپشۇرۇڭ",
    paidButton: "پۇل تۆلەپ بولدۇم",
    cancelButton: "ھازىرچە ئاچماي تۇراي",
    waitingText: "مۇلازىم ئارقا سۇپىدا بىرتەرەپ قىلماقتا، سەل تەخىر قىلىڭ",
    contactService: "ئاۋۋال ئالاقىلىشىڭ"
  }
}

module.exports = {
  'questions': questions,
  'results': results,
  'pageTexts': pageTexts
}
