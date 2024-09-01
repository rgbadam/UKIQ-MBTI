var languageUtil = require('../../utils/languageUtil.js')

Page({
  data: {
    currentData: null,
    type: null,
    resultList: [],
    pageContent: {}
  },

  onLoad(options) {
    this.initLanguage()
    console.log('result', options.type)
    this.setData({ type: options.type })
    this.data.resultList.filter((item) => {
      if (item.value === this.data.type) {
        this.setData({ currentData: item })
      }
    })
  },

  initLanguage() {
    var langPackage = languageUtil.getLangPackage()
    this.setData({ resultList: langPackage.results })
    this.setData({ pageContent: langPackage.pageTexts.testResult })
    wx.setNavigationBarTitle({ title: langPackage.pageTexts.testResult.navBarTitle })
  }
})