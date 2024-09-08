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
    if(wx.getStorageSync('avatar')) {
      this.setData({ avatar: wx.getStorageSync('avatar') })
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
    wx.setStorageSync('avatar', avatarUrl)
  },

  myTypeClick() {
    if (this.data.mbti == '') {
      wx.switchTab({ url: '/pages/homepage/homepage' })
    } else {
      wx.navigateTo({ url: '../test-result/test-result?type=' + wx.getStorageSync('mbti') })
    }
  },

  FAQ() {
    // wx.showModal({ content: 'Developing...', showCancel: false })
    wx.navigateTo({ url: '../question/question' })
  },

  aboutMbti() {
    wx.navigateTo({ url: '../about-mbti/about-mbti' })
  },

  onShareAppMessage(){
    if(this.data.isUg) return { title: 'MBTI خارەكتىر سىنىقى' }
    return { title: 'MBTI人格测试' }
  },
  onShareTimeline(){
    if(this.data.isUg) return { title: 'MBTI - ئۆز خارەكتىرىنى چۈشىنىش' }
    return { title: 'MBTI人格 - 终于被理解的感觉真好' }
  }
});
