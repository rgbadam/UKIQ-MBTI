var languageUtil = require('../../utils/languageUtil.js')
const defaultAvatar = '../../images/icons/avatar.png'

Page({
  data: {
    tips: '', 
    mbti: '',
    isUg: true,
    pageContent: {},
    avatar: defaultAvatar
  },

  onShow() {
    this.initLanguage()
    this.initStyle()
    if(wx.getStorageSync('mbti')) {
      this.setData({ mbti: wx.getStorageSync('mbti') })
    }
  },

  initLanguage() {
    var langPackage = languageUtil.getLangPackage()
    let userCenter = langPackage.pageTexts.userCenter
    this.setData({ pageContent: userCenter })
    this.setData({ tips: wx.getStorageSync('mbti') ? userCenter.tested : userCenter.notTested })
    wx.setNavigationBarTitle({ title: langPackage.pageTexts.userCenter.navBarTitle })
  },

  initStyle() {
    if (wx.getStorageSync('languageType') == 0) {
      this.setData({ isUg: true })
    }
    if (wx.getStorageSync('languageType') == 1) {
      this.setData({ isUg: false })
    }
  },

  avatarFunc(e) {
    const { avatarUrl } = e.detail 
    this.setData({ avatar: avatarUrl })
  },

  typeFunc() {
    wx.navigateTo({
      url: '../test-result/test-result?type=' + mbti,
    })
  },

  FAQ() {
    wx.showModal({ content: 'Developing...', showCancel: false })
    // wx.navigateTo({ url: '../question/question' })
  },

  contactUs() {
    wx.showModal({ content: 'Developing...', showCancel: false })
    // wx.navigateTo({ url: '../contact/contact' })
  },

  onShareAppMessage(){
    return { title: 'MBTI人格测试' }
  },
  onShareTimeline(){
    return { title: 'MBTI人格测试 - 终于被理解的感觉真好' }
  }
});
