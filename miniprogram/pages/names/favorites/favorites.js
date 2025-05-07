// pages/names/favorites/favorites.js
const { mockAPI } = require('../../../utils/mockData');

Page({
  data: {
    loading: true,
    favoriteNames: [],
    displayNames: [],
    sortOrder: 'time', // 'time' or 'alphabet'
    genderFilter: 'all' // 'all', 'male', or 'female'
  },

  onLoad: function() {
    this.loadFavorites();
  },

  onShow: function() {
    // Refresh favorites when user returns to this page
    this.loadFavorites();
  },

  loadFavorites: function() {
    this.setData({ loading: true });
    
    // Get favorites from storage
    const favorites = wx.getStorageSync('favoriteNames') || [];
    
    // Get full name details for each favorite
    const favoriteNames = favorites.map(fav => {
      const nameDetails = mockAPI.getNameById(fav._id);
      return {
        ...nameDetails,
        saveTime: fav.date,
        saveTimeText: this.formatTime(fav.date)
      };
    });
    
    this.setData({
      favoriteNames,
      loading: false
    }, () => {
      this.filterAndSortNames();
    });
  },

  formatTime: function(timestamp) {
    const now = new Date().getTime();
    const diff = now - timestamp;
    
    // Convert to minutes, hours, days
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) {
      return `${minutes} مىنۇت بۇرۇن`;
    } else if (hours < 24) {
      return `${hours} سائەت بۇرۇن`;
    } else {
      return `${days} كۈن بۇرۇن`;
    }
  },

  filterAndSortNames: function() {
    let names = [...this.data.favoriteNames];
    
    // Apply gender filter
    if (this.data.genderFilter !== 'all') {
      names = names.filter(name => name.gender === this.data.genderFilter);
    }
    
    // Apply sort order
    if (this.data.sortOrder === 'time') {
      names.sort((a, b) => b.saveTime - a.saveTime);
    } else {
      names.sort((a, b) => a.nameUyghur.localeCompare(b.nameUyghur));
    }
    
    this.setData({ displayNames: names });
  },

  toggleSortOrder: function() {
    this.setData({
      sortOrder: this.data.sortOrder === 'time' ? 'alphabet' : 'time'
    }, () => {
      this.filterAndSortNames();
    });
  },

  toggleGenderFilter: function() {
    const filters = ['all', 'male', 'female'];
    const currentIndex = filters.indexOf(this.data.genderFilter);
    const nextFilter = filters[(currentIndex + 1) % filters.length];
    
    this.setData({
      genderFilter: nextFilter
    }, () => {
      this.filterAndSortNames();
    });
  },

  removeFavorite: function(e) {
    const nameId = e.currentTarget.dataset.id;
    
    // Get current favorites
    let favorites = wx.getStorageSync('favoriteNames') || [];
    
    // Remove the name
    favorites = favorites.filter(fav => fav._id !== nameId);
    
    // Save updated favorites
    wx.setStorageSync('favoriteNames', favorites);
    
    // Update the display
    this.loadFavorites();
    
    wx.showToast({
      title: 'ئۆچۈرۈلدى',
      icon: 'success',
      duration: 1500
    });
  },

  navigateToDetail: function(e) {
    const nameId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../namecard/namecard?id=${nameId}`
    });
  },

  navigateToSearch: function() {
    wx.navigateTo({
      url: '../search/search'
    });
  },

  onShareAppMessage: function() {
    return {
      title: 'مېنىڭ ياخشى كۆرگەن ئىسىملىرىم',
      path: '/pages/names/favorites/favorites'
    };
  }
}); 