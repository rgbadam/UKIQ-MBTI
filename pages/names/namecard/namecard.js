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
          setTimeout(() => {
            wx.navigateBack();
          }, 2000);
        } else {
          setTimeout(() => {
            wx.navigateBack();
          }, 2000);
        }
      },
      fail: (err) => {
        setTimeout(() => {
          wx.navigateBack();
        }, 2000);
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
      return { title: 'ئىسىملار قامۇسى · 起名小助手', path: '/views/home/home' };
    }
    const { nameUyghur, nameLatin, nameChinese, id } = this.data.nameData;
    return {
      title: `${nameUyghur}｜${nameLatin}｜${nameChinese}`,
      path: `/pages/names/namecard/namecard?id=${id}`
    };
  },

  onShareTimeline: function() {
    if (!this.data.nameData) {
      return { title: 'ئىسىملار قامۇسى · 起名小助手', path: '/views/home/home' };
    }
    const { nameUyghur, nameLatin, nameChinese, id } = this.data.nameData;
    return {
      title: `${nameUyghur}｜${nameLatin}｜${nameChinese}`,
      path: `/pages/names/namecard/namecard?id=${id}`
    };
  }
}); 