App({
  globalData: {},

  onLaunch() {
    wx.removeStorageSync('loadFont')
  },

  onShow() {
    /* ug-font */
    wx.loadFontFace({
      family: 'Alpsoft-Qolyazma5',
      source: 'https://6a6f-joyments-6gxawsnwcfc1bdbc-1325589715.tcb.qcloud.la/PopOut/Fonts/AlpsoftQolyazma5.ttf',
      global: true,
      success() { wx.setStorageSync('loadFont', true) },
      fail() { wx.setStorageSync('loadFont', false) }
    })
    wx.loadFontFace({
      family: 'Shirkhan Asman',
      source: 'https://6a6f-joyments-6gxawsnwcfc1bdbc-1325589715.tcb.qcloud.la/PopOut/Fonts/Shirkhan%20Asman.ttf',
      global: true
    })
    wx.loadFontFace({
      family: 'Shirkhan Yumilaq',
      source: 'https://6a6f-joyments-6gxawsnwcfc1bdbc-1325589715.tcb.qcloud.la/PopOut/Fonts/Shirkhan%20Yumilaq.ttf',
      global: true
    })
    /* zh-font */
    wx.loadFontFace({
      family: '浪漫情书体',
      source: 'https://6a6f-joyments-6gxawsnwcfc1bdbc-1325589715.tcb.qcloud.la/PopOut/Fonts/%E6%B5%AA%E6%BC%AB%E6%83%85%E4%B9%A6%E4%BD%93.ttf',
      global: true
    })
    wx.loadFontFace({
      family: '温暖童稚体',
      source: 'https://6a6f-joyments-6gxawsnwcfc1bdbc-1325589715.tcb.qcloud.la/PopOut/Fonts/%E6%B8%A9%E6%9A%96%E7%AB%A5%E7%A8%9A%E4%BD%93.ttf',
      global: true
    })
    wx.loadFontFace({
      family: '创粗圆',
      source: 'https://6a6f-joyments-6gxawsnwcfc1bdbc-1325589715.tcb.qcloud.la/PopOut/Fonts/%E5%88%9B%E7%B2%97%E5%9C%86.ttf',
      global: true
    })
    wx.loadFontFace({
      family: '酷乐潮玩体',
      source: 'https://6a6f-joyments-6gxawsnwcfc1bdbc-1325589715.tcb.qcloud.la/PopOut/Fonts/%E9%85%B7%E4%B9%90%E6%BD%AE%E7%8E%A9%E4%BD%93.ttf',
      global: true
    })
  }
});
