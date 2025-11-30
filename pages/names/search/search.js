const app = getApp();
const baseUrl = app.globalData.requestUrl;

Page({
  data: {
    query: '',
    allNames: [],
    displayNames: [],
    loading: true,
    isFocused: false,
    searchText: '',
    total: 0
  },

  onLoad: function() {
    this.loadData();
  },

  loadData: function(keyword = '') {
    this.setData({ loading: true });
    
    wx.request({
      url: `${baseUrl}/names/getAll`,
      method: 'POST',
      data: keyword ? { keyword } : {},
      success: (res) => {
        if (res.data.code === 200) {
          const nameList = res.data.nameList || [];
          
          // Sort names by Uyghur name
          nameList.sort((a, b) => a.nameUyghur.localeCompare(b.nameUyghur));
          
          this.setData({
            allNames: nameList,
            displayNames: nameList,
            total: res.data.total || 0,
            loading: false
          });
        } else {
          wx.showToast({
            title: res.data.message || '获取数据失败',
            icon: 'none'
          });
          this.setData({ loading: false });
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        wx.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none'
        });
        this.setData({ loading: false });
      }
    });
  },

  onInput: function(e) {
    const query = e.detail.value;
    this.setData({ query });
    
    // 使用防抖优化搜索
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    
    this.searchTimer = setTimeout(() => {
      this.filterNames(query);
    }, 300);
  },

  filterNames: function(query) {
    // 如果查询为空，重新加载所有数据
    if (!query || query.trim() === '') {
      this.loadData();
      return;
    }
    
    // 调用 API 进行搜索
    this.setData({ loading: true });
    
    wx.request({
      url: `${baseUrl}/names/getAll`,
      method: 'POST',
      data: { keyword: query.trim() },
      success: (res) => {
        if (res.data.code === 200) {
          const nameList = res.data.nameList || [];
          
          // Sort names by Uyghur name
          nameList.sort((a, b) => a.nameUyghur.localeCompare(b.nameUyghur));
          
          this.setData({
            displayNames: nameList,
            total: res.data.total || 0,
            loading: false
          });
        } else {
          wx.showToast({
            title: res.data.message || '搜索失败',
            icon: 'none'
          });
          this.setData({ loading: false });
        }
      },
      fail: (err) => {
        console.error('搜索失败:', err);
        wx.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none'
        });
        this.setData({ loading: false });
      }
    });
  },

  clearSearch: function() {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    this.setData({
      query: '',
      searchText: ''
    });
    // 重新加载所有数据
    this.loadData();
  },

  navigateToDetail: function(e) {
    const nameId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../namecard/namecard?id=${nameId}`
    });
  },

  onSearchFocus: function() {
    this.setData({ isFocused: true });
  },

  onSearchBlur: function() {
    this.setData({ isFocused: false });
  },

  onSearchInput: function(e) {
    const searchText = e.detail.value;
    this.setData({ searchText });
    
    // 使用防抖优化搜索
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    
    this.searchTimer = setTimeout(() => {
      this.filterNames(searchText);
    }, 300);
  },

  navigateBack: function() {
    wx.navigateBack();
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