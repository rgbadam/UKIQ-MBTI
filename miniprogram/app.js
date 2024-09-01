App({
  globalData: {},

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'wx-env01-3gf49vue58112f19',
        traceUser: true,
      });
    }
  }
});
