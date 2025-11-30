const app = getApp();
const baseUrl = app.globalData.requestUrl;

Page({
  data: {
    nameData: null,
    isFavorite: false
  },

  onLoad: function(options) {
    if (options.id) {
      this.loadNameData(options.id);
    }
  },

  onShow: function() {
    if (this.data.nameData) {
      this.checkFavoriteStatus(this.data.nameData.id);
    }
  },

  loadNameData: function(nameId) {
    wx.request({
      url: `${baseUrl}/names/getById`,
      method: 'POST',
      data: { id: nameId },
      success: (res) => {
        if (res.data.code === 200) {
          const nameData = res.data.name;
          this.setData({ nameData });
          this.checkFavoriteStatus(nameId);
        } else if (res.data.code === 404) {
          wx.showToast({
            title: '名字不存在',
            icon: 'error',
            duration: 2000
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 2000);
        } else {
          wx.showToast({
            title: res.data.message || '获取数据失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        wx.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  checkFavoriteStatus: function(nameId) {
    const favorites = wx.getStorageSync('favoriteNames') || [];
    const isFavorite = favorites.some(fav => fav.id === nameId);
    this.setData({ isFavorite });
  },

  navigateBack: function() {
    wx.navigateBack();
  },

  toggleFavorite: function() {
    if (!this.data.nameData) return;
    
    const nameId = this.data.nameData.id;
    const name = this.data.nameData.nameUyghur;
    
    let favorites = wx.getStorageSync('favoriteNames') || [];
    const index = favorites.findIndex(item => item.id === nameId);
    
    if (index === -1) {
      favorites.push({
        id: nameId,
        name: name,
        date: new Date().getTime()
      });
    } else {
      favorites.splice(index, 1);
    }
    
    wx.setStorageSync('favoriteNames', favorites);
    
    this.setData({ isFavorite: !this.data.isFavorite });
  },

  copyName: function() {
    if (!this.data.nameData) return;
    
    const { nameUyghur, nameLatin, nameChinese } = this.data.nameData;
    const textToCopy = `${nameUyghur}\r\n${nameLatin}\r\n${nameChinese}`;
    
    wx.setClipboardData({
      data: textToCopy,
      success: () => {
        wx.showToast({
          title: '已复制',
          icon: 'success',
          duration: 1500
        });
      }
    });
  },

  onShareAppMessage: function() {
    if (!this.data.nameData) {
      return { title: 'ئىسىملار قامۇسى · 起名小助手', path: '/pages/names/homepage/homepage' };
    }
    const { nameUyghur, nameLatin, nameChinese, id } = this.data.nameData;
    return {
      title: `${nameUyghur}｜${nameLatin}｜${nameChinese}`,
      path: `/pages/names/namecard/namecard?id=${id}`
    };
  },

  onShareTimeline: function() {
    if (!this.data.nameData) {
      return { title: 'ئىسىملار قامۇسى · 起名小助手', path: '/pages/names/homepage/homepage' };
    }
    const { nameUyghur, nameLatin, nameChinese, id } = this.data.nameData;
    return {
      title: `${nameUyghur}｜${nameLatin}｜${nameChinese}`,
      path: `/pages/names/namecard/namecard?id=${id}`
    };
  }
}); 