var languageUtil = require('../../utils/languageUtil.js')

Page({
  data: {
    resultList: [],
    pageContent: {}
  },

  onShow() {
    this.initLanguage()
  },

  initLanguage() {
    var langPackage = languageUtil.getLangPackage()
    this.setData({ resultList: langPackage.results })
    this.setData({ pageContent: langPackage.pageTexts.typeList })
    wx.setNavigationBarTitle({ title: langPackage.pageTexts.typeList.navBarTitle })
  }

})