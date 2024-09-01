var languageUtil = require('../../utils/languageUtil.js')

Page({
  data: {
    done: false,
    currentIndex: 0,
    selectIndex: -1,
    questionList: [],
    selectAnswerList: [],
    lastSelectValue: null,
    pageContent: {},
    isUg: true
  },

  onShow() {
    this.initLanguage()
    this.initStyle()
  },

  switchLanguage() {
    languageUtil.changeLanguage()
    this.initLanguage()
    this.initStyle()
  },

  initLanguage() {
    var langPackage = languageUtil.getLangPackage()
    this.setData({ questionList: langPackage.questions })
    this.setData({ pageContent: langPackage.pageTexts.homepage })
    wx.setNavigationBarTitle({ title: langPackage.pageTexts.homepage.navBarTitle })
  },

  initStyle() {
    if (wx.getStorageSync('languageType') == 0) {
      this.setData({ isUg: true })
    }
    if (wx.getStorageSync('languageType') == 1) {
      this.setData({ isUg: false })
    }
  },

  onSelect(event) {
    const index = event.currentTarget.dataset.index;
    const value = event.currentTarget.dataset.value;
    console.log("onSelect", index, value, this.data.currentIndex + 1)
    this.setData({ selectIndex: index })
    if (this.data.currentIndex >= this.data.questionList.length - 1) {
      this.setData({ lastSelectValue: value })
      this.setData({ done: true })
    } else {
      setTimeout(() => {
        this.data.selectAnswerList.push(value);
        this.setData({ selectAnswerList: this.data.selectAnswerList })
        this.setData({ selectIndex: -1 })
        this.data.currentIndex++;
        this.setData({ currentIndex: this.data.currentIndex })
      }, 500)
    }
  },

  handleResult(answerList) {
    if (answerList.length === 0) return;
    const validTypes = ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P']
    answerList.forEach((item) => {
      if (!validTypes.includes(item)) return;
    })
    const counts = answerList.reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1
      return acc
    }, {})
    console.log('counts', counts);
    const types = [
      ['E', 'I'],
      ['S', 'N'],
      ['T', 'F'],
      ['J', 'P']
    ]
    const result = types.map(t => (counts[t[0]] > counts[t[1]] || counts[t[1]] === undefined) ? t[0] : t[1]).join('')
    return result
  },

  onSubmit() {
    this.data.selectAnswerList.push(this.data.lastSelectValue);
    this.setData({ selectAnswerList: this.data.selectAnswerList })
    const result = this.handleResult(this.data.selectAnswerList);
    wx.setStorageSync('mbti', result)
    wx.redirectTo({
      url: '../test-result/test-result?type='+result,
    })
  },

  goTypeList() {
    wx.switchTab({
      url: '../type-list/type-list',
    })
  }
})