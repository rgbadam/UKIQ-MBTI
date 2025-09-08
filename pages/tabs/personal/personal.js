const app = getApp()
const defaultAvatar = '/images/illust/magiccube.png'
const { handleLoginFail } = require('../../../utils/loginErrorHandler.js')
const { getLangPackage, changeLanguage } = require('../../../utils/languageUtil.js')

Page({
  data: {
    lang: 'cn',
    gender: 'male',
    genderData: null,
    isLoggedIn: false,
    showLoginPopup: false,
    showCoderPopup: false,
    showGenderPopup: false,
    canCloseGenderBox: null,
    pageText: {}
  },

  onLoad() {
    this.checkLogin()
    this.checkGender()

    this.loginCallback = (userInfo) => {
      this.getUserInfo()
      this.setData({ isLoggedIn: true, ...userInfo })
    }
    app.globalData.eventBus.on('login', this.loginCallback)

    // 监听性别变更事件
    this.genderChangeCallback = (data) => {
      this.setData({
        gender: data.gender,
        genderData: data.genderData
      })
    }
    app.globalData.eventBus.on('genderChanged', this.genderChangeCallback)
  },

  onShow() {
    this.initLanguage()
  },

  initLanguage() {
    this.setData({ lang: wx.getStorageSync('languageType') == 1 ? 'cn' : 'ug' });
    var langPackage = getLangPackage()
    let personalPage = langPackage.pageTexts.personalPage
    this.setData({ pageText: personalPage })
  },

  checkLogin() {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        this.getUserInfo()
        this.setData({ isLoggedIn: true, ...res.data })
      },
      fail: () => {
        this.setData({ isLoggedIn: false, avatar: defaultAvatar })
      }
    })
  },

  checkGender() {
    let userInfo = wx.getStorageSync('userinfo')
    if (userInfo.genderData && userInfo.gender) {
      this.setData({
        genderData: userInfo.genderData,
        gender: userInfo.gender,
        showGenderPopup: false,
        canCloseGenderBox: true
      })
    } else {
      this.setData({
        showGenderPopup: true,
        canCloseGenderBox: false
      })
    }
  },

  switchLanguage() {
    changeLanguage()
    this.initLanguage()
  },

  goProfile() {
    wx.navigateTo({
      url: '/pages/user/profile/profile'
    })
  },

  closeGenderBox() {
    this.setData({ showGenderPopup: false })
  },

  confirmGender(e) {
    const result = e.detail
    this.setData({
      genderData: result.genderData,
      gender: result.gender,
      showGenderPopup: false
    })
  },

  contactCoder() {
    this.setData({ showCoderPopup: true })
  },

  closeCoderBox() {
    this.setData({ showCoderPopup: false })
  },

  goLogin() {
    this.setData({ showLoginPopup: true });
  },

  closeLoginBox() {
    this.setData({ showLoginPopup: false });
  },

  onLoginSuccess(e) {
    const userInfo = e.detail;
    this.getUserInfo()
    this.setData({ 
      isLoggedIn: true,
      showLoginPopup: false,
      ...userInfo
    });
  },

  onLoginFail(e) {
    this.setData({ showLoginPopup: false });
    
    handleLoginFail(e, () => {
      this.setData({ showLoginPopup: true });
    });
  },

  getUserInfo() {
    // wx.request({
    //   url: `${app.globalData.requestUrl}/auth/userinfo`,
    //   method: 'GET',
    //   header: {
    //     'Authorization': `Bearer ${wx.getStorageSync('userInfo').token}`
    //   },
    //   success: (res) => {
    //     if (res.statusCode === 200) {
    //       this.setData({ userId: res.data.data.user_id })
    //       this.setData({ phone: res.data.data.phone })
    //     } else if (res.statusCode === 401) {
    //       wx.removeStorage({ key: 'userInfo', success: () => {this.setData({ showLoginPopup: true })} })
    //     } else {
    //       wx.showToast({ title: res.data.message, icon: 'none' })
    //     }
    //   },
    //   fail: (err) => {
    //     console.error('user data fetch failed', err);
    //   }
    // })
  },

  logout() {
    // wx.showModal({
    //   title: this.data.lang === 'cn' ? '提示' : 'ئەسكەرتىش',
    //   content: this.data.lang === 'cn' ? '确定退出登录？' : 'تىزىملىتىشتىن چېكىنەمسىز؟',
    //   confirmText: 'Yes',
    //   cancelText: 'No',
    //   success: (res) => {
    //     if (res.confirm) {
    //       wx.removeStorage({
    //         key: 'userInfo',
    //         success: () => {
    //           this.setData({
    //             isLoggedIn: false,
    //             avatar: defaultAvatar,
    //             nickname: "ArtLens",
    //             userId: "",
    //             phone: ""
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
  },

  onUnload() {
    if (this.loginCallback) {
      app.globalData.eventBus.off('login', this.loginCallback)
    }
    if (this.genderChangeCallback) {
      app.globalData.eventBus.off('genderChanged', this.genderChangeCallback)
    }
  },

  onShareAppMessage() {
    return {
      title: "ISIMZAR",
      path: "/pages/tabs/personal/personal"
    }
  },

  onShareTimeline() {
    return {
      title: "ISIMZAR",
      path: "/pages/tabs/personal/personal"
    }
  }
})