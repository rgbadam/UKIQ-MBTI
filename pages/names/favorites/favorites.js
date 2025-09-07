const { mockAPI } = require('../../../utils/mockData');

Page({
  data: {
    loading: true,
    favoriteNames: [],
    displayNames: [],
    sortOrder: 'time',
    genderFilter: 'all'
  },

  onLoad: function() {
    this.loadFavorites();
  },

  onShow: function() {
    this.loadFavorites();
  },

  navigateBack: function() {
    wx.navigateBack({delta: 1})
  },

  loadFavorites: function() {
    this.setData({ loading: true });
    
    const favorites = wx.getStorageSync('favoriteNames') || [];
    
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
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 5) {
      return 'تېخى باياتىن';
    } else if (minutes < 60) {
      return `${minutes} مىنۇت بۇرۇن`;
    } else if (hours < 24) {
      return `${hours} سائەت بۇرۇن`;
    } else {
      return `${days} كۈن بۇرۇن`;
    }
  },

  filterAndSortNames: function() {
    let names = [...this.data.favoriteNames];
    
    if (this.data.genderFilter !== 'all') {
      names = names.filter(name => name.gender === this.data.genderFilter);
    }
    
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
    
    let favorites = wx.getStorageSync('favoriteNames') || [];
    
    favorites = favorites.filter(fav => fav._id !== nameId);
    
    wx.setStorageSync('favoriteNames', favorites);
    
    this.loadFavorites();
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
      title: 'ئىسىملار قامۇسى · 起名小助手',
      path: '/pages/names/homepage/homepage'
    };
  },

  onShareTimeline: function() {
    return {
      title: 'ئىسىملار قامۇسى · 起名小助手',
      path: '/pages/names/homepage/homepage',
      imageUrl: '/images/illust/magiccube.png'
    };
  }
}); 