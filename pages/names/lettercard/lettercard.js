const { mockAPI } = require('../../../utils/mockData');

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
    const allNames = mockAPI.getAllNames();
    const names = allNames.filter(name => {
      // 支持双字母（如ئا、ئە等）
      if (letter.length === 2) {
        return name.nameUyghur.startsWith(letter);
      } else {
        return name.nameUyghur.startsWith(letter);
      }
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