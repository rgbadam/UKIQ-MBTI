const getLangPackage = function(){
  if (wx.getStorageSync('languageType') == 1) {
    var langPackage_zh = require('../data/lang_zh.js')
    return langPackage_zh
  } else {
    var langPackage_ug = require('../data/lang_ug.js')
    return langPackage_ug
  }
}

const changeLanguage = function(){
  if (wx.getStorageSync('languageType') == '' || wx.getStorageSync('languageType') == 0) {
    wx.setStorageSync('languageType', 1)
    // changeTabBarTitle('zh')
  } else if (wx.getStorageSync('languageType') == 1) {
    wx.setStorageSync('languageType', 0)
    // changeTabBarTitle('ug')
  }
}

function changeTabBarTitle(langType) {
  var langPackage = require(`../data/lang_${langType}.js`)
  wx.setTabBarItem({
    index: 0,
    "text": langPackage.pageTexts.homepage.tabBarTitle
  })
  wx.setTabBarItem({
    index: 1,
    "text": langPackage.pageTexts.discoverPage.tabBarTitle
  })
  wx.setTabBarItem({
    index: 2,
    "text": langPackage.pageTexts.typeList.tabBarTitle
  })
  wx.setTabBarItem({
    index: 3,
    "text": langPackage.pageTexts.userCenter.tabBarTitle
  })
}

module.exports = {
  'getLangPackage': getLangPackage,
  'changeLanguage': changeLanguage
}