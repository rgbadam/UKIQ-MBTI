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

  onShareAppMessage() {
    return {
      title: this.data.isUg ? "MBTI · سىزمۇ سىناپ كۆرۈڭ" : "MBTI · 你也来测一测",
      path: "/pages/homepage/homepage",
      imageUrl: "https://6a6f-joyments-6gxawsnwcfc1bdbc-1325589715.tcb.qcloud.la/PopOut/MBTI/logo.jpg"
    }
  },
  onShareTimeline() {
    return {
      title: this.data.isUg ? "MBTI - ئۆز خارەكتىرىنى چۈشىنىش" : "MBTI人格 - 终于被理解的感觉真好",
      path: "/pages/homepage/homepage",
      imageUrl: "https://6a6f-joyments-6gxawsnwcfc1bdbc-1325589715.tcb.qcloud.la/PopOut/MBTI/logo.jpg"
    }
  }
});
