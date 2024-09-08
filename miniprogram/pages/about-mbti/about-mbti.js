Page({
  data: {
    isUg: true,
    picUrl: "https://6a6f-joyments-6gxawsnwcfc1bdbc-1325589715.tcb.qcloud.la/PopOut/MBTI/MBTI.jpg"
  },

  onShow() {
    this.initStyle()
  },

  onReady() {
    if(wx.getStorageSync('failFont')) {
      this.setData({ failFont: true })
    } else {
      this.setData({ failFont: false })
    }
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