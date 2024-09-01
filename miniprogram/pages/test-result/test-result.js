var languageUtil = require('../../utils/languageUtil.js')

Page({
  data: {
    isUg: true,
    type: null,
    picUrl: "",
    currentData: null,
    resultList: [],
    pageContent: {}
  },

  onLoad(options) {
    this.initLanguage()
    this.initStyle()
    console.log('result', options.type)
    this.setData({ type: options.type })
    this.data.resultList.filter((item) => {
      if (item.value === this.data.type) {
        this.setData({ currentData: item })
        this.setData({picUrl: "https://6a6f-joyments-6gxawsnwcfc1bdbc-1325589715.tcb.qcloud.la/PopOut/MBTI/" + this.data.type + ".jpg"})
      }
    })
  },

  initLanguage() {
    var langPackage = languageUtil.getLangPackage()
    this.setData({ resultList: langPackage.results })
    this.setData({ pageContent: langPackage.pageTexts.testResult })
    wx.setNavigationBarTitle({ title: langPackage.pageTexts.testResult.navBarTitle })
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