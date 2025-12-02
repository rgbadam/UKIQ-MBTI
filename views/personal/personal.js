const app = getApp()
const defaultAvatar = '/images/illust/magiccube.png'
const { handleLoginFail } = require('../../utils/loginErrorHandler.js')
const { getLangPackage, changeLanguage } = require('../../utils/languageUtil.js')

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
    pageText: {},
    quoteText: ''
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
    this.loadQuote()
    // 如果已登录，获取最新用户信息
    if (this.data.isLoggedIn) {
      this.getUserInfo()
    }
  },

  initLanguage() {
    this.setData({ lang: wx.getStorageSync('languageType') == 1 ? 'cn' : 'ug' });
    var langPackage = getLangPackage()
    let personalPage = langPackage.pageTexts.personalPage
    this.setData({ pageText: personalPage })
  },

  loadQuote() {
    const langMap = {
      'cn': 'zh',
      'ug': 'ug'
    };
    const apiLang = langMap[this.data.lang] || 'zh';
    const baseUrl = app.globalData.requestUrl;
    
    const defaultQuotes = {
      'cn': '成功属于坚持到最后的人。',
      'ug': 'ھەر ئىشتا بىر ھېكمەت بار.'
    };
    
    wx.request({
      url: `${baseUrl}/quotes/getQuote`,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        lang: apiLang
      },
      success: (res) => {
        if (res.data.code === 200) {
          const quote = res.data.quote;
          this.setData({ quoteText: quote.content || '' });
        } else {
          this.setData({ quoteText: defaultQuotes[this.data.lang] || defaultQuotes['ug'] });
        }
      },
      fail: () => {
        this.setData({ quoteText: defaultQuotes[this.data.lang] || defaultQuotes['ug'] });
      }
    });
  },

  checkLogin() {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        this.getUserInfo()
        this.setData({ isLoggedIn: true, ...res.data })
      },
      fail: () => {
        this.setData({ isLoggedIn: false, avatar: defaultAvatar, showLoginPopup: true })
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
    this.loadQuote()
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
    this.setData({ 
      isLoggedIn: true,
      showLoginPopup: false,
      ...userInfo
    });
    // 登录成功后获取最新用户信息
    this.getUserInfo();
  },

  onLoginFail(e) {
    this.setData({ showLoginPopup: false });
    
    handleLoginFail(e, () => {
      this.setData({ showLoginPopup: true });
    });
  },

  getUserInfo() {
    const token = wx.getStorageSync('token');
    const userInfo = wx.getStorageSync('userInfo');
    
    // 如果没有token或userInfo，直接返回
    if (!token || !userInfo) {
      this.setData({ 
        isLoggedIn: false, 
        showLoginPopup: true 
      });
      return;
    }

    wx.request({
      url: `${app.globalData.requestUrl}/auth/userInfo`,
      method: 'GET',
      header: {
        'Authorization': `Bearer ${token}`
      },
      success: (res) => {
        if (res.data.code === 200) {
          // 更新用户信息
          const userData = res.data.data;
          const updatedUserInfo = {
            ...userInfo,
            id: userData.id,
            user_id: userData.user_id,
            openid: userData.openid,
            phone: userData.phone,
            nickname: userData.nickname,
            last_login_at: userData.last_login_at,
            created_at: userData.created_at
          };
          
          // 保存更新后的用户信息
          wx.setStorage({
            key: 'userInfo',
            data: updatedUserInfo,
            success: () => {
              this.setData({ 
                isLoggedIn: true,
                ...updatedUserInfo
              });
            }
          });
        } else if (res.data.code === 401) {
          // Token无效或过期，清除存储并显示登录弹窗
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          this.setData({ 
            isLoggedIn: false,
            showLoginPopup: true
          });
        } else if (res.data.code === 404) {
          // 用户不存在，清除存储并显示登录弹窗
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          this.setData({ 
            isLoggedIn: false,
            showLoginPopup: true
          });
        } else {}
      },
      fail: () => {}
    });
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
      path: "/views/personal/personal"
    }
  },

  onShareTimeline() {
    return {
      title: "ISIMZAR",
      path: "/views/personal/personal"
    }
  }
})