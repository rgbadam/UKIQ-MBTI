const { mockAPI } = require('../../../utils/mockData');

Page({
  data: {
    gender: 'male',
    names: [],
    loading: true,
    favoriteIds: [],
    theme: 'light',
    cardLang: 'uyghur',
    sortOrder: 'asc',
    animating: false
  },

  onLoad: function(options) {
    if (options.gender) {
      this.setData({
        gender: options.gender
      });
    }
    
    // Load saved theme and language
    const savedTheme = wx.getStorageSync('theme') || 'light';
    const savedLang = wx.getStorageSync('cardLang') || 'uyghur';
    this.setData({ 
      theme: savedTheme,
      cardLang: savedLang
    });
    
    this.loadNamesByGender();
  },

  onShow: function() {
    this.getFavorites();
  },

  loadNamesByGender: function() {
    this.setData({ loading: true });
    
    const names = mockAPI.getNamesByGender(this.data.gender);
    
    // Sort names initially
    const sortedNames = this.sortNames(names, this.data.sortOrder);
    
    this.setData({
      names: sortedNames,
      loading: false
    });
  },

  getFavorites: function() {
    const favorites = wx.getStorageSync('favoriteNames') || [];
    this.setData({ favoriteIds: favorites.map(fav => fav._id) });
  },
  
  navigateToDetail: function(e) {
    const nameId = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `../namecard/namecard?id=${nameId}` });
  },
  
  navigateToSearch: function() {
    wx.navigateTo({ url: '../search/search?gender=' + this.data.gender });
  },
  
  thmeFunc() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('theme', newTheme);
  },
  
  langFunc() {
    const langOptions = ['uyghur', 'latin', 'chinese'];
    const currentIndex = langOptions.indexOf(this.data.cardLang);
    const nextIndex = (currentIndex + 1) % langOptions.length;
    
    // Start animation
    this.setData({ animating: true });
    
    // Wait for slide-out animation
    setTimeout(() => {
      // Change language
      this.setData({
        cardLang: langOptions[nextIndex]
      });
      wx.setStorageSync('cardLang', langOptions[nextIndex]);
      
      // End animation
      setTimeout(() => {
        this.setData({ animating: false });
      }, 50);
    }, 150);
  },
  
  // Helper function to sort names
  sortNames: function(names, order) {
    const namesToSort = [...names];
    return namesToSort.sort((a, b) => {
      const nameA = this.data.cardLang === 'uyghur' ? a.nameUyghur :
                    this.data.cardLang === 'latin' ? a.nameLatin : a.nameChinese;
      const nameB = this.data.cardLang === 'uyghur' ? b.nameUyghur :
                    this.data.cardLang === 'latin' ? b.nameLatin : b.nameChinese;
      
      return order === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
  },
  
  sortFunc: function() {
    // Toggle between ascending and descending
    const newOrder = this.data.sortOrder === 'asc' ? 'desc' : 'asc';
    
    // Start animation
    this.setData({ animating: true });
    
    // Sort the names array
    const sortedNames = this.sortNames(this.data.names, newOrder);
    
    // Update state with new sort order and sorted names
    setTimeout(() => {
      this.setData({
        sortOrder: newOrder,
        names: sortedNames
      });
      
      // End animation
      setTimeout(() => {
        this.setData({ animating: false });
      }, 50);
    }, 150);
  },

  onShareAppMessage: function() {
    return {
      title: this.data.gender === 'male' ? 'ئوغۇل بالا ئىسىملىرى' : 'قىز بالا ئىسىملىرى',
      path: `/pages/filtered/filtered?gender=${this.data.gender}`
    };
  }
}); 