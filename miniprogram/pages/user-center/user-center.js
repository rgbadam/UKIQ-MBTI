const defaultAvatar = '../../images/icons/avatar.png'
const app = getApp()
const notTested = "تېخى خارەكتىرىڭىزنى سىناپ كۆرمەپسىز"
const tested = "سىزنىڭ خارەكتىر تىپىڭىز"

Page({
  data: {
    nickname: app.globalData.mbti == "" ? notTested : tested, 
    mbti: app.globalData.mbti,
    avatar: defaultAvatar,
  },

  avatarFunc(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatar: avatarUrl,
    })
  },

  FAQ() {
    wx.showModal({ content: '维护中... 有疑问请联系老师', showCancel: false })
    // wx.navigateTo({ url: '../question/question' })
  },
  contactUs() {
    wx.showModal({ content: '维护中... 有疑问请联系老师', showCancel: false })
    // wx.navigateTo({ url: '../contact/contact' })
  },

  onShareAppMessage(){
    return { title:'خارەكتىر سىنىقى' }
  },
  onShareTimeline(){
    return { title:'ئۆز خارەكتىرىنى چۈشىنىش نەقەدەر گۈزەل' }
  }
});
