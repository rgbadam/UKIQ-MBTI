const app = getApp();
const baseUrl = app.globalData.requestUrl;

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
    
    if (favorites.length === 0) {
      this.setData({
        favoriteNames: [],
        displayNames: [],
        loading: false
      });
      return;
    }
    
    // 并发获取所有收藏的名字详情
    const requests = favorites.map(fav => {
      return new Promise((resolve, reject) => {
        wx.request({
          url: `${baseUrl}/names/getById`,
          method: 'POST',
          data: { id: fav.id },
          success: (res) => {
            if (res.data.code === 200) {
              resolve({
                ...res.data.name,
                saveTime: fav.date,
                saveTimeText: this.formatTime(fav.date)
              });
            } else {
              // 如果名字不存在，返回 null，后续过滤掉
              resolve(null);
            }
          },
          fail: (err) => {
            console.error('获取名字详情失败:', err);
            resolve(null);
          }
        });
      });
    });
    
    Promise.all(requests).then(results => {
      // 过滤掉获取失败的名字
      const favoriteNames = results.filter(name => name !== null);
      
      this.setData({
        favoriteNames,
        loading: false
      }, () => {
        this.filterAndSortNames();
      });
    }).catch(err => {
      console.error('批量获取失败:', err);
      wx.showToast({
        title: '获取收藏列表失败',
        icon: 'none',
        duration: 2000
      });
      this.setData({ loading: false });
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
    
    favorites = favorites.filter(fav => fav.id !== nameId);
    
    wx.setStorageSync('favoriteNames', favorites);
    
    this.loadFavorites();
  },

  navigateToDetail: function(e) {
    const nameId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/names/namecard/namecard?id=${nameId}`
    });
  },

  navigateToSearch: function() {
    wx.navigateTo({
      url: '/pages/names/search/search'
    });
  },

  onShareAppMessage: function() {
    return {
      title: 'ئىسىملار قامۇسى · 起名小助手',
      path: '/views/home/home'
    };
  },

  onShareTimeline: function() {
    return {
      title: 'ئىسىملار قامۇسى · 起名小助手',
      path: '/views/home/home',
      imageUrl: '/images/illust/magiccube.png'
    };
  }
}); 