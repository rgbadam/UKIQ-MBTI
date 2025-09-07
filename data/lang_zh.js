import EI_questionList from "./zh/EI";
import NS_questionList from "./zh/NS";
import FT_questionList from "./zh/FT";
import JP_questionList from "./zh/JP";
import resultList from "./zh/result";

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
    tabBarTitle: "首页",
    homeTitle: "MBTI人格测试",
    subTitle: "-- 终于被理解的感觉真好 --",
    total: "共",
    quests: "题",
    langSwitch: "ئۇ",
    submit: "提交"
  },
  testResult: {
    navBarTitle: "测试结果",
    analysis: "人格特点",
    career: "适合职业",
    advantage: "优点",
    disadvantage: "缺点",
    relationship: "友情和爱情",
    shareText: "🔮 分享好友也来测测～"
  },
  typeList: {
    navBarTitle: "人格类型",
    tabBarTitle: "人格",
    title: "16型职业人格",
    analysis: "人格特点",
    career: "适合职业",
    advantage: "优点",
    disadvantage: "缺点",
    relationship: "友情和爱情"
  },
  userCenter: {
    navBarTitle: "个人中心",
    tabBarTitle: "我的",
    notTested: "还未测试你的MBTI人格",
    tested: "你的MBTI人格",
    aboutUs: "了解MBTI",
    faq: "常见问题",
    share: "分享好友",
    jumpApp: "更多好玩"
  },
  discoverPage: {
    navBarTitle: "人格测试",
    tabBarTitle: "MBTI",
    langSwitch: "ئۇ",
    getStarted: "开始测试",
    funcTitle: "- 终于被理解的感觉真好 -",
    typeList: "人格类型",
    aboutMBTI: "了解MBTI",
    FAQ: "常见问题",
    testedText: "你的MBTI人格类型",
    notTestedText: "还未测试你的MBTI人格"
  },
  personalPage: {
    langSwitch: "ئۇ",
    myProfile: "我的资料",
    shareToFriend: "分享好友",
    moreFun: "更多好玩",
    cooperation: "我要合作",
    quoteText: "成功属于坚持到最后的人。"
  }
}

module.exports = {
  'questions': questions,
  'results': results,
  'pageTexts': pageTexts
}