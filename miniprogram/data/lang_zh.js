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
    navBarTitle: "MBTI人格",
    tabBarTitle: "首页",
    homeTitle: "MBTI人格测试",
    subTitle: "-- 终于被理解的感觉真好 --",
    total: "共",
    quests: "题",
    langSwitch: "ئۇ/中",
    submit: "提交"
  },
  testResult: {
    navBarTitle: "测试结果",
    title: "你的人格类型是"
  },
  typeList: {
    navBarTitle: "MBTI-16型人格简介",
    tabBarTitle: "人格",
    title: "16型职业人格"
  },
  userCenter: {
    navBarTitle: "个人中心",
    tabBarTitle: "我的",
    notTested: "还未测试你的MBTI人格",
    tested: "你的MBTI人格是",
    faq: "常见问题",
    aboutUs: "关于我们",
    contactUs: "联系我们"
  }
}

module.exports = {
  'questions': questions,
  'results': results,
  'pageTexts': pageTexts
}