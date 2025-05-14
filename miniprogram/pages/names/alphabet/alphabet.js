const { mockAPI } = require('../../../utils/mockData');

Page({
  data: {
    alphabet: ['ئا', 'ئە', 'ب', 'پ', 'ت', 'ج', 'چ', 'خ', 'د', 'ر', 'ز', 'س', 'ش', 'غ', 'ف', 'ق', 'ك', 'گ', 'ل', 'م', 'ن', 'ھ', 'ئو', 'ئۇ', 'ئۆ', 'ئۈ', 'ۋ', 'ئې', 'ئى', 'ي'],
    allNames: [],
    letterCounts: {},
    isFold: false,
    gridClass: '',
    featuresClass: '',
    illustClass: '',
    cardClass: '',
  },

  onLoad() {
    this.loadNames()
    this.touchStartY = 0
    this.lastTouchY = 0
    this.scrollTop = 0
    this.transitionThreshold = 5
  },

  touchStart(e) {
    this.touchStartY = e.touches[0].clientY
    this.lastTouchY = e.touches[0].clientY
  },

  touchMove(e) {
    const currentY = e.touches[0].clientY
    const deltaY = currentY - this.lastTouchY
    this.lastTouchY = currentY

    wx.createSelectorQuery()
      .select('.content-wrapper')
      .boundingClientRect(rect => {
        if (rect) {
          if (deltaY < 0 && rect.top < this.transitionThreshold && !this.data.isFold) {
            this.setData({ 
              isFold: true,
              featuresClass: 'f-fold',
              illustClass: 'i-fold',
              gridClass: 'g-fold',
              cardClass: 'c-fold'
            })
          }  else if (deltaY > 0 && rect.top < this.transitionThreshold && this.data.isFold) {
            this.setData({ 
              isFold: false,
              featuresClass: '',
              illustClass: '',
              gridClass: '',
              cardClass: ''
            })
          }
        }
      })
      .exec()
  },

  navigateBack() {
    wx.navigateBack()
  },

  loadNames() {
    const names = mockAPI.getAllNames()
    this.setData({ 
      allNames: names
    })
    this.calculateLetterCounts(names)
  },

  calculateLetterCounts(names) {
    const letterCounts = {}
    
    this.data.alphabet.forEach(letter => {
      letterCounts[letter] = 0
    })

    names.forEach(name => {
      const firstLetter = this.getFirstLetter(name.nameUyghur)
      if (letterCounts.hasOwnProperty(firstLetter)) {
        letterCounts[firstLetter]++
      }
    })

    this.setData({ letterCounts })
  },

  getFirstLetter(name) {
    if (name.startsWith('ئا')) return 'ئا'
    if (name.startsWith('ئە')) return 'ئە'
    if (name.startsWith('ئو')) return 'ئو'
    if (name.startsWith('ئۇ')) return 'ئۇ'
    if (name.startsWith('ئۆ')) return 'ئۆ'
    if (name.startsWith('ئۈ')) return 'ئۈ'
    if (name.startsWith('ئې')) return 'ئې'
    if (name.startsWith('ئى')) return 'ئى'
    return name.charAt(0)
  },

  selectLetter(e) {
    const { letter } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/names/lettercard/lettercard?letter=${letter}`
    })
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
})