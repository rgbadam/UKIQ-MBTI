const app = getApp();
const baseUrl = app.globalData.requestUrl;

Page({
  data: {
    names: [],
    loading: true,
    animating: false,
    theme: 'light',
    gender: 'male',
    sortOrder: 'asc',
    cardLang: 'uyghur',
  },

  onLoad: function(options) {
    if (options.gender) {
      this.setData({ gender: options.gender });
    }
    
    const savedTheme = wx.getStorageSync('theme') || 'light';
    const savedLang = wx.getStorageSync('cardLang') || 'uyghur';

    this.setData({ 
      theme: savedTheme,
      cardLang: savedLang
    });
    
    this.loadNamesByGender();
  },

  loadNamesByGender: function() {
    this.setData({ loading: true });
    
    wx.request({
      url: `${baseUrl}/names/getAll`,
      method: 'POST',
      data: { gender: this.data.gender },
      success: (res) => {
        if (res.data.code === 200) {
          const names = res.data.nameList || [];
          const sortedNames = this.sortNames(names, this.data.sortOrder);
          
          this.setData({
            names: sortedNames,
            loading: false
          });
        } else {
          wx.showToast({
            title: res.data.message || '获取数据失败',
            icon: 'none',
            duration: 2000
          });
          this.setData({ loading: false });
        }
      },
      fail: (err) => {
        this.setData({ loading: false });
      }
    });
  },
  
  navigateToDetail: function(e) {
    const nameId = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/names/namecard/namecard?id=${nameId}` });
  },
  
  navigateToSearch: function() {
    wx.navigateTo({ url: '/pages/names/search/search?gender=' + this.data.gender });
  },
  
  themeFunc() {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({ theme: newTheme });
    wx.setStorageSync('theme', newTheme);
  },
  
  langFunc() {
    const langOptions = ['uyghur', 'latin', 'chinese'];
    const currentIndex = langOptions.indexOf(this.data.cardLang);
    const nextIndex = (currentIndex + 1) % langOptions.length;
    
    this.setData({ animating: true });
    
    setTimeout(() => {
      this.setData({ cardLang: langOptions[nextIndex] });
      wx.setStorageSync('cardLang', langOptions[nextIndex]);
      setTimeout(() => { this.setData({ animating: false }) }, 50);
    }, 150);
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

  onShareAppMessage: function() {
    return {
      title: this.data.gender === 'male' ? 'ئوغۇل بالا ئىسىملىرى · 起名小助手' : 'قىز بالا ئىسىملىرى · 起名小助手',
      path: `/pages/filtered/filtered?gender=${this.data.gender}`
    };
  },

  onShareTimeline: function() {
    return {
      title: this.data.gender === 'male' ? 'ئوغۇل بالا ئىسىملىرى · 起名小助手' : 'قىز بالا ئىسىملىرى · 起名小助手',
      imageUrl: this.data.gender === 'male' ? '/images/illust/male-bg.png' : '/images/illust/female-bg.png'
    };
  }
}); 