const { mockAPI } = require('../../../utils/mockData');

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
      this.checkFavoriteStatus(this.data.nameData._id);
    }
  },

  loadNameData: function(nameId) {
    const nameData = mockAPI.getNameById(nameId);
    
    if (nameData) {
      this.setData({ nameData });
      this.checkFavoriteStatus(nameId);
    } else {
      wx.showToast({
        title: '无匹配信息',
        icon: 'error',
        duration: 2000
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 2000);
    }
  },

  checkFavoriteStatus: function(nameId) {
    const favorites = wx.getStorageSync('favoriteNames') || [];
    const isFavorite = favorites.some(fav => fav._id === nameId);
    this.setData({ isFavorite });
  },

  navigateBack: function() {
    wx.navigateBack();
  },

  toggleFavorite: function() {
    const nameId = this.data.nameData._id;
    const name = this.data.nameData.nameUyghur;
    
    let favorites = wx.getStorageSync('favoriteNames') || [];
    const index = favorites.findIndex(item => item._id === nameId);
    
    if (index === -1) {
      favorites.push({
        _id: nameId,
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
    const { nameUyghur, nameLatin, nameChinese, _id } = this.data.nameData;
    return {
      title: `${nameUyghur}｜${nameLatin}｜${nameChinese}`,
      path: `/pages/names/namecard/namecard?id=${_id}`
    };
  },

  onShareTimeline: function() {
    const { nameUyghur, nameLatin, nameChinese, _id } = this.data.nameData;
    return {
      title: `${nameUyghur}｜${nameLatin}｜${nameChinese}`,
      path: `/pages/names/namecard/namecard?id=${_id}`
    };
  }
}); 