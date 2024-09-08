var languageUtil = require('../../utils/languageUtil.js')

Page({
  data: {
    isUg: true,
    loadFont: false,
    resultList: [],
    pageContent: {}
  },

  onShow() {
    this.initLanguage()
    this.initStyle()
  },

  onReady() {
    if(wx.getStorageSync('loadFont')) {
      this.setData({ loadFont: true })
    } else {
      this.setData({ loadFont: false })
    }
  },

  initLanguage() {
    var langPackage = languageUtil.getLangPackage()
    this.setData({ resultList: langPackage.results })
    this.setData({ pageContent: langPackage.pageTexts.typeList })
    wx.setNavigationBarTitle({ title: langPackage.pageTexts.typeList.navBarTitle })
  },

  initStyle() {
    if (wx.getStorageSync('languageType') == 0) {
      this.setData({ isUg: true })
    }
    if (wx.getStorageSync('languageType') == 1) {
      this.setData({ isUg: false })
    }
  },

  onShareAppMessage(){
    if(this.data.isUg) return { title: 'MBTI خارەكتىر سىنىقى' }
    return { title: 'MBTI人格测试' }
  },
  onShareTimeline(){
    if(this.data.isUg) return { title: 'MBTI - ئۆز خارەكتىرىنى چۈشىنىش' }
    return { title: 'MBTI人格 - 终于被理解的感觉真好' }
  }
})