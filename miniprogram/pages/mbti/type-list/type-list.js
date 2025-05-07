var languageUtil = require('../../../utils/languageUtil.js')

Page({
  data: {
    isUg: true,
    loadFont: false,
    resultList: [],
    pageContent: {},
    eiType: '',
    snType: '',
    tfType: '',
    jpType: '',
    currentType: ''
  },

  onShow() {
    this.initLanguage()
    this.initStyle()
  },

  onReady() {
    if(wx.getStorageSync('loadFont')) {
      this.setData({ loadFont: true })
    } else {
      this.setData({ loadFont: false })
    }
  },

  initLanguage() {
    var langPackage = languageUtil.getLangPackage()
    this.setData({ resultList: langPackage.results })
    this.setData({ pageContent: langPackage.pageTexts.typeList })
    wx.setNavigationBarTitle({ title: langPackage.pageTexts.typeList.navBarTitle })
  },

  initStyle() {
    if (wx.getStorageSync('languageType') == 0) {
      this.setData({ isUg: true })
    }
    if (wx.getStorageSync('languageType') == 1) {
      this.setData({ isUg: false })
    }
  },

  onShareAppMessage() {
    return { title: this.data.isUg ? "MBTI · خارەكتىر سىنىقى" : "MBTI · 人格测试" }
  },
  onShareTimeline() {
    return { title: this.data.isUg ? "MBTI - ئۆز خارەكتىرىنى چۈشىنىش" : "MBTI人格 - 终于被理解的感觉真好" }
  },

  selectEI(e) {
    const type = e.currentTarget.dataset.type;
    if (this.data.eiType === type) {
      this.setData({ eiType: '' });
    } else {
      this.setData({ eiType: type });
    }
    this.updateCurrentType();
  },

  selectSN(e) {
    const type = e.currentTarget.dataset.type;
    if (this.data.snType === type) {
      this.setData({ snType: '' });
    } else {
      this.setData({ snType: type });
    }
    this.updateCurrentType();
  },

  selectTF(e) {
    const type = e.currentTarget.dataset.type;
    if (this.data.tfType === type) {
      this.setData({ tfType: '' });
    } else {
      this.setData({ tfType: type });
    }
    this.updateCurrentType();
  },

  selectJP(e) {
    const type = e.currentTarget.dataset.type;
    if (this.data.jpType === type) {
      this.setData({ jpType: '' });
    } else {
      this.setData({ jpType: type });
    }
    this.updateCurrentType();
  },

  updateCurrentType() {
    const { eiType, snType, tfType, jpType } = this.data;
    if (eiType && snType && tfType && jpType) {
      const type = `${eiType}${snType}${tfType}${jpType}`;
      this.setData({ currentType: type });
      this.scrollToType(type);
    } else {
      this.setData({ currentType: '' });
    }
  },

  scrollToType(type) {
    const query = wx.createSelectorQuery();
    query.selectAll('.item').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(res => {
      const items = res[0];
      const scrollTop = res[1].scrollTop;
      const targetIndex = this.data.resultList.findIndex(item => item.value === type);
      
      if (targetIndex >= 0 && items[targetIndex]) {
        const selectorHeight = 48;
        const targetTop = items[targetIndex].top + scrollTop - selectorHeight - 10;
        
        wx.pageScrollTo({
          scrollTop: targetTop,
          duration: 300
        });
      }
    });
  }
})