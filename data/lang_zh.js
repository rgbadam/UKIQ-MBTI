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
    cooperation: "我要合作"
  },
  profilePage: {
    navBarTitle: "个人资料",
    vipMember: "VIP 会员",
    vipActiveDesc: "尊享专属特权服务",
    vipInactiveDesc: "开通会员享受更多特权",
    vipActivated: "尊贵会员",
    vipNotActivated: "开通会员",
    personalityType: "人格类型",
    notTested: "未测试",
    favorites: "收藏名数",
    noFavorites: "暂无",
    genderTitle: "身份称呼",
    wechatNickname: "用户昵称",
    nicknameNotSet: "未设置昵称",
    phoneNumber: "手机号",
    phoneNotBound: "暂未绑定",
    userId: "UserID",
    noUserId: "暂未登录",
    switch: "更换",
    edit: "编辑",
    bind: "绑定",
    copy: "复制",
    logout: "退出登录"
  },
  vipDetailPage: {
    navBarTitle: "会员详情",
    title: "VIP 会员权益",
    subtitle: "让取名和人格探索更轻松",
    statusLabel: "当前状态",
    statusActive: "已开通 VIP 会员",
    statusInactive: "未开通 VIP 会员",
    benefitsTitle: "会员特权",
    benefit1: "更多名字与人格灵感推荐",
    benefit2: "优先体验新功能与优化",
    benefit3: "专属客服，一对一解答疑问",
    contactService: "联系客服",
    contactDesc: "如有任何问题或需要人工协助，请联系开发者。",
    infoTitle: "登录后可查看会员记录",
    loginFirst: "请先登录账号",
    loginDesc: "登录后可查看当前会员状态与历史记录",
    loginButton: "去登录",
    currentPlan: "当前套餐",
    noActiveMembership: "暂无正在进行的会员",
    planPeriod: "有效期",
    planAmount: "支付金额",
    historyTitle: "会员历史记录",
    historyStatusActive: "生效中",
    historyStatusExpired: "已结束",
    historyEmpty: "还没有会员历史记录",
    membershipTypes: {
      monthly: "月度会员",
      quarterly: "季度会员",
      halfyear: "半年会员",
      yearly: "年度会员",
      custom: "特定期限",
      lifetime: "终身会员"
    }
  },
  vipOpenPage: {
    navBarTitle: "开通会员",
    title: "开通 VIP 会员",
    subtitle: "解锁更多功能 ｜ 享用最佳体验",
    benefit1: "查看全部人名",
    benefit2: "私人助理分析",
    benefit3: "完整MBTI人格题库",
    infoTitle: "信息完善",
    loginFirst: "请先登录账号",
    fillTips: "请先登录并填写手机号和昵称",
    loginButton: "去登录",
    phoneLabel: "手机号",
    nicknameLabel: "微信昵称",
    saveInfoButton: "保存信息",
    payTitle: "费用支付",
    longPressHint: "长按识别二维码进行支付",
    paidButton: "我已付款",
    cancelButton: "暂不开通",
    waitingText: "客服在处理会员开通流程，请稍候片刻",
    contactService: "请先联系客服"
  }
}

module.exports = {
  'questions': questions,
  'results': results,
  'pageTexts': pageTexts
}