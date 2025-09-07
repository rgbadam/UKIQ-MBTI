Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    lang: {
      type: String,
      value: 'cn'
    },
    canClose: {
      type: Boolean,
      value: null
    },
    gender: {
      type: String,
      value: ''
    },
    genderData: {
      type: Object,
      value: {}
    }
  },

  data: {
    showMore: false,
    nicknameType: '',
    selectedGender: '',
    favGenderValue: '',
    favGenderLabel: '',
    defaultMaleData: { value: 'man', label_cn: '男生', label_ug: 'يىگىت', title_cn: '嘿，雄鹰般的男人', title_ug: 'پاھ، يىگىت', subtitle_cn: '哦吼，你也太帅了！', subtitle_ug: 'سەن نېمىدىگەن قامەتلىك' },
    defaultFemaleData: { value: 'woman', label_cn: '女生', label_ug: 'قىز', title_cn: '嘿，天鹅般的女人', title_ug: 'پاھ، قىز', subtitle_cn: '哇塞，你也太美了！', subtitle_ug: 'سىز نېمىدىگەن گۈزەل' },
    maleOptions: [
      { value: 'boy', label_cn: '男孩', label_ug: 'ئوغۇل', title_cn: '嗨，聪明的男孩', title_ug: 'پاھ، يىگىت', subtitle_cn: '哦吼，你也太帅了！', subtitle_ug: 'سەن نېمىدىگەن قامەتلىك' },
      { value: 'gentleman', label_cn: '绅士', label_ug: 'ئەپەندىم', title_cn: '嗨，优雅的绅士', title_ug: 'نازاكەتلىك جەنتىلمەن', subtitle_cn: '举止优雅，风度翩翩', subtitle_ug: 'نازاكەتلىك ۋە ئېسىل' },
      { value: 'prince', label_cn: '王子', label_ug: 'شاھزادە', title_cn: '嗨，英俊的王子', title_ug: 'كېلىشكەن شاھزادە', subtitle_cn: '优雅高贵的王子', subtitle_ug: 'ئېسىل شاھزادە' },
      { value: 'knight', label_cn: '骑士', label_ug: 'چەۋەنداز', title_cn: '嗨，忠诚的骑士', title_ug: 'سادىق چەۋەنداز', subtitle_cn: '忠诚勇敢的骑士', subtitle_ug: 'سادىق باتۇر چەۋەنداز' },
      { value: 'handsome', label_cn: '帅哥', label_ug: 'كېلىشكەن يىگىت', title_cn: '嗨，帅气的男人', title_ug: 'پىشقان ئەركەك', subtitle_cn: '充满魅力的成熟男人', subtitle_ug: 'جەلىپكار پىشقان ئەركەك' },
      { value: 'manHQ', label_cn: '高质量男性', label_ug: 'مۆتىۋەر يىگىت', title_cn: '嗨，高质量男性', title_ug: 'كۈچلۈك يىگىت', subtitle_cn: '阳刚之气十足', subtitle_ug: 'كۈچ-قۇۋۋەتكە تولغان' }
    ],
    femaleOptions: [
      { value: 'girl', label_cn: '女孩', label_ug: 'قىز', title_cn: '活泼的女孩', title_ug: 'جۇشقۇن قىز', subtitle_cn: '青春活力的女孩', subtitle_ug: 'ياش ۋە جۇشقۇن قىز' },
      { value: 'lady', label_cn: '女士', label_ug: 'خانىم', title_cn: '端庄的女士', title_ug: 'ئېسىل خانىم', subtitle_cn: '高贵优雅的女士', subtitle_ug: 'ئېسىل ۋە نازاكەتلىك خانىم' },
      { value: 'princess', label_cn: '公主', label_ug: 'مەلىكە', title_cn: '高贵的公主', title_ug: 'ئېسىل شاھزادە قىز', subtitle_cn: '优雅高贵的公主', subtitle_ug: 'نازاكەتلىك شاھزادە قىز' },
      { value: 'fairy', label_cn: '仙女', label_ug: 'پەرى', title_cn: '灵动的仙女', title_ug: 'يېنىك پەرى', subtitle_cn: '轻盈飘逸的仙女', subtitle_ug: 'يېنىك ۋە نازاكەتلىك پەرى' },
      { value: 'beauty', label_cn: '美女', label_ug: 'ساھىپجامال', title_cn: '漂亮的美女', title_ug: 'چىرايلىق گۈزەل', subtitle_cn: '倾国倾城的美女', subtitle_ug: 'دۇنيانى مەپتۇن قىلغان گۈزەل' },
      { value: 'womanHQ', label_cn: '高质量女性', label_ug: 'نازاكەتلىك قىز', title_cn: '贴心的女儿', title_ug: 'مېھرىبان قىز', subtitle_cn: '温柔体贴的女儿', subtitle_ug: 'مېھرىبان ۋە مۇلايىم قىز' },
    ]
  },

  observers: {
    'visible': function(visible) {
      if (visible && (wx.getStorageSync('userinfo').genderData || wx.getStorageSync('userinfo').gender)) {
        this.setData({
          selectedGender: this.data.gender,
          favGenderValue: this.data.genderData?.value,
          favGenderLabel: this.data.lang === 'cn' ? this.data.genderData?.label_cn : this.data.genderData?.label_ug,
        })
      }
    }
  },

  methods: {
    closePopup() {
      this.triggerEvent('close')
      this.setData({ showMore: false })
    },

    selectGender(e) {
      this.setData({
        selectedGender: e.currentTarget.dataset.gender,
        favGenderValue: '',
        favGenderLabel: ''
      })
    },

    showMore(e) {
      this.setData({
        showMore: true,
        nicknameType: e.currentTarget.dataset.type
      })
    },

    hideMore() {
      this.setData({
        showMore: false
      })
    },

    selectTitle(e) {
      this.setData({
        showMore: false,
        favGenderValue: e.currentTarget.dataset.value,
        favGenderLabel: e.currentTarget.dataset.label
      })
    },

    confirmGender() {
      if (this.data.selectedGender) {
        let genderData = null
        
        if (this.data.favGenderValue) {
          // 用户选择了具体称呼
          const options = this.data.selectedGender === 'male' ? this.data.maleOptions : this.data.femaleOptions
          genderData = options.find(item => item.value === this.data.favGenderValue)
        } else {
          // 用户只选择了基础性别
          if (this.data.selectedGender === 'male') {
            genderData = this.data.defaultMaleData
          } else {
            genderData = this.data.defaultFemaleData
          }
        }
        
        let userInfo = wx.getStorageSync('userinfo') || {}
        userInfo.genderData = genderData
        userInfo.gender = this.data.selectedGender
        wx.setStorageSync('userinfo', userInfo)
        
        const result = {
          genderData: genderData,
          gender: this.data.selectedGender
        }
        
        this.triggerEvent('confirm', result)
      }
    }
  }
}) 