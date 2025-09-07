var languageUtil = require('../../../utils/languageUtil.js')

Page({
  data: {
    lang: 'cn',
    tips: '',
    mbti: '',
    pageText: {}
  },

  onShow() {
    this.initLanguage()
    if(wx.getStorageSync('mbti')) {
      this.setData({ mbti: wx.getStorageSync('mbti') })
    }
  },

  switchLanguage() {
    languageUtil.changeLanguage()
    this.initLanguage()
  },

  initLanguage() {
    this.setData({ lang: wx.getStorageSync('languageType') == 1 ? 'cn' : 'ug' });
    var langPackage = languageUtil.getLangPackage()
    let discoverPage = langPackage.pageTexts.discoverPage
    this.setData({ pageText: discoverPage })
    this.setData({ tips: wx.getStorageSync('mbti') ? discoverPage.testedText : discoverPage.notTestedText })
  },

  getStarted() {
    wx.navigateTo({ url: '/pages/mbti/homepage/homepage' })
  },

  jumpTypeList() {
    wx.navigateTo({ url: '/pages/mbti/type-list/type-list' })
  },

  jumpAboutMbti() {
    wx.navigateTo({ url: '/pages/mbti/about-mbti/about-mbti' })
  },

  jumpFAQ() {
    wx.navigateTo({ url: '/pages/mbti/question/question' })
  },

  jumpResultPage() {
    const type = this.data.mbti
    if (type) {
      wx.navigateTo({ url: '/pages/mbti/test-result/test-result?type=' + type })
    }
  },

  onShareAppMessage() {
    return {
      title: this.data.isUg ? "MBTI · خارەكتىر سىنىقى" : "MBTI · 人格测试",
      path: "/pages/tabbar/discover/discover",
      imageUrl: "/images/illust/mbti.svg"
    }
  },
  onShareTimeline() {
    return {
      title: this.data.isUg ? "MBTI - ئۆز خارەكتىرىنى چۈشىنىش" : "MBTI人格 - 终于被理解的感觉真好",
      path: "/pages/tabbar/discover/discover",
      imageUrl: "/images/illust/mbti.svg"
    }
  }
})
