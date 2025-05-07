// pages/names/namecard/namecard.js
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
    // Check favorite status when returning to this page
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
        title: 'ئىسىم تېپىلمىدى',
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

  toggleFavorite: function() {
    const nameId = this.data.nameData._id;
    const name = this.data.nameData.nameUyghur;
    
    // Get current favorites
    let favorites = wx.getStorageSync('favoriteNames') || [];
    const index = favorites.findIndex(item => item._id === nameId);
    
    if (index === -1) {
      // Add to favorites
      favorites.push({
        _id: nameId,
        name: name,
        date: new Date().getTime()
      });
      wx.showToast({
        title: 'ساقلاندى',
        icon: 'success',
        duration: 1500
      });
    } else {
      // Remove from favorites
      favorites.splice(index, 1);
      wx.showToast({
        title: 'ئۆچۈرۈلدى',
        icon: 'none',
        duration: 1500
      });
    }
    
    // Save updated favorites
    wx.setStorageSync('favoriteNames', favorites);
    
    // Update favorite status
    this.setData({ isFavorite: !this.data.isFavorite });
  },

  copyName: function() {
    const { nameUyghur, nameLatin, nameChinese } = this.data.nameData;
    const textToCopy = `${nameUyghur}\n${nameLatin}\n${nameChinese}`;
    
    wx.setClipboardData({
      data: textToCopy,
      success: () => {
        wx.showToast({
          title: 'كۆچۈرۈلدى',
          icon: 'success',
          duration: 1500
        });
      }
    });
  },

  shareName: function() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  onShareAppMessage: function() {
    const { nameUyghur, _id } = this.data.nameData;
    return {
      title: `${nameUyghur} - ئۇيغۇرچە ئىسىم`,
      path: `/pages/names/namecard/namecard?id=${_id}`
    };
  },

  onShareTimeline: function() {
    const { nameUyghur, _id } = this.data.nameData;
    return {
      title: `${nameUyghur} - ئۇيغۇرچە ئىسىم`,
      query: `id=${_id}`
    };
  },

  navigateBack: function() {
    wx.navigateBack();
  }
}); 