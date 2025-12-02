Page({
  data: {
    isUg: true,
    picUrl: "https://6a6f-joyments-6gxawsnwcfc1bdbc-1325589715.tcb.qcloud.la/PopOut/MBTI/MBTI.jpg"
  },

  onShow() {
    this.initStyle()
  },

  initStyle() {
    if (wx.getStorageSync('languageType') == 0) {
      this.setData({ isUg: true })
    }
    if (wx.getStorageSync('languageType') == 1) {
      this.setData({ isUg: false })
    }
  },

  onShareAppMessage() {
    return {
      title: this.data.isUg ? "MBTI · خارەكتىر سىنىقى" : "MBTI · 人格测试",
      path: "/views/discover/discover",
      imageUrl: "/images/illust/mbti.svg"
    }
  },
  onShareTimeline() {
    return {
      title: this.data.isUg ? "MBTI - ئۆز خارەكتىرىنى چۈشىنىش" : "MBTI人格 - 终于被理解的感觉真好",
      path: "/views/discover/discover",
      imageUrl: "/images/illust/mbti.svg"
    }
  }
})