Page({
  data: {
    isUg: true,
    picUrl: "https://6a6f-joyments-6gxawsnwcfc1bdbc-1325589715.tcb.qcloud.la/PopOut/MBTI/MBTI.jpg"
  },

  onShow() {
    this.initStyle()
  },

  onReady() {
    if(wx.getStorageSync('loadFont')) {
      this.setData({ loadFont: true })
    } else {
      this.setData({ loadFont: false })
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

  onShareAppMessage() {
    return {
      title: this.data.isUg ? "MBTI · خارەكتىر سىنىقى" : "MBTI · 人格测试",
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
})