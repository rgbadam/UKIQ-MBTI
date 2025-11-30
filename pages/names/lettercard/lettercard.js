const app = getApp();
const baseUrl = app.globalData.requestUrl;

Page({
  data: {
    letter: '',
    names: [],
    totalCount: 0,
    maleCount: 0,
    femaleCount: 0,
    loading: true
  },

  onLoad: function(options) {
    const letter = options.letter || '';
    this.setData({ letter });
    this.loadNames(letter);
  },

  loadNames: function(letter) {
    this.setData({ loading: true });
    
    wx.request({
      url: `${baseUrl}/names/getAll`,
      method: 'POST',
      success: (res) => {
        if (res.data.code === 200) {
          const allNames = res.data.nameList || [];
          const names = allNames.filter(name => {
            // 支持双字母（如ئا、ئە等）
            return name.nameUyghur.startsWith(letter);
          });
          const totalCount = names.length;
          const maleCount = names.filter(n => n.gender === 'male').length;
          const femaleCount = names.filter(n => n.gender === 'female').length;
          this.setData({
            names,
            totalCount,
            maleCount,
            femaleCount,
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
        console.error('请求失败:', err);
        wx.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none',
          duration: 2000
        });
        this.setData({ loading: false });
      }
    });
  },

  navigateBack: function() {
    wx.navigateBack();
  },

  navigateToDetail: function(e) {
    const nameId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../namecard/namecard?id=${nameId}`
    });
  },

  onShareAppMessage: function() {
    return {
      title: `${this.data.letter} بىلەن باشلانغان ئىسىملار · 起名小助手`,
      path: `/pages/names/lettercard/lettercard?letter=${this.data.letter}`
    };
  },

  onShareTimeline: function() {
    return {
      title: `${this.data.letter} بىلەن باشلانغان ئىسىملار · 起名小助手`,
      path: `/pages/names/lettercard/lettercard?letter=${this.data.letter}`,
      imageUrl: '/images/illust/magiccube.png'
    };
  }
}); 