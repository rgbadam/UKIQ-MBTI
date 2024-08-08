import result from '../../data/result.js';

Page({
  data: {
    currentData: null,
    type: null,
    resultArr: []
  },

  onLoad(options) {
    console.log('result', options.type)
    this.setData({ type: options.type })
    result.filter((item) => {
      if (item.value === this.data.type) {
        this.setData({ currentData: item })
      }
    })
  },

  goBack() {
    wx.navigateTo({
      url: '../index/index',
    })
  }
})