const { getLangPackage } = require('../../../utils/languageUtil.js')
const { handleLoginFail } = require('../../../utils/loginErrorHandler.js')
const app = getApp()

Page({
  data: {
    lang: 'cn',
    nickname: '',
    phone: '',
    userId: '',
    mbti: '',
    genderText: '',
    gender: 'male',
    genderData: null,
    isVip: false,
    favoritesCount: 0,
    showGenderPopup: false,
    canCloseGenderBox: true,
    showLoginPopup: false,
    isLoggedIn: false,
    pageText: {}
  },

  onShow() {
    this.initLanguage();
    // 检查登录状态并获取用户信息
    const token = wx.getStorageSync('token');
    const userInfo = wx.getStorageSync('userInfo');
    if (token && userInfo) {
      this.setData({ isLoggedIn: true });
      this.getUserInfo();
    } else {
      this.setData({ isLoggedIn: false });
      this.loadUserData();
    }
  },

  initLanguage() {
    this.setData({ lang: wx.getStorageSync('languageType') == 1 ? 'cn' : 'ug' });
    var langPackage = getLangPackage()
    let profilePage = langPackage.pageTexts.profilePage
    this.setData({ pageText: profilePage })
    wx.setNavigationBarTitle({ title: langPackage.pageTexts.profilePage.navBarTitle })
  },
  
  goToTestResults() {
    if (!this.data.mbti) {
      wx.navigateTo({
        url: '/pages/mbti/mbti-test/mbti-test' 
      });
    }
    wx.navigateTo({
      url: `/pages/mbti/test-result/test-result?type=${this.data.mbti}`
    });
  },

  goToFavorites() {
    wx.navigateTo({
      url: '/pages/names/favorites/favorites'
    });
  },

  switchGender() {
    this.setData({ 
      showGenderPopup: true,
      canCloseGenderBox: true 
    });
  },

  checkLogin() {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        this.setData({ isLoggedIn: true });
      },
      fail: () => {
        this.setData({ isLoggedIn: false });
      }
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
              // 更新页面数据
              this.setData({ 
                isLoggedIn: true,
                userId: userData.user_id,
                phone: userData.phone || '',
                nickname: userData.nickname || ''
              });
              // 加载其他用户数据
              this.loadUserData();
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
        } else {
          this.loadUserData();
        }
      },
      fail: (err) => {
        console.error('获取用户信息失败:', err);
        this.loadUserData();
      }
    });
  },

  editNickname() {
    if (!this.data.isLoggedIn) {
      this.setData({ showLoginPopup: true });
      return;
    }
    if (!this.data.nickname) return;
  },

  editPhone() {
    if (!this.data.isLoggedIn) {
      this.setData({ showLoginPopup: true });
      return;
    }
    if (this.data.phone) return;
  },

  copyUserId() {
    if (!this.data.isLoggedIn) {
      this.setData({ showLoginPopup: true });
      return;
    }
    if (!this.data.userId) return;
    wx.setClipboardData({
      data: this.data.userId,
      success: () => {
        wx.showToast({
          title: this.data.lang === 'cn' ? '已复制' : 'كۆچۈرۈلدى',
          icon: 'success'
        });
      }
    });
  },

  closeGenderBox() {
    this.setData({ showGenderPopup: false });
  },

  confirmGender(e) {
    const result = e.detail;
    const genderText = this.data.lang === 'cn' ? result.genderData.label_cn : result.genderData.label_ug;

    this.setData({
      genderData: result.genderData,
      gender: result.gender,
      genderText: genderText,
      showGenderPopup: false
    });

    // 保存到本地存储
    let userinfo = wx.getStorageSync('userinfo') || {};
    userinfo.genderData = result.genderData;
    userinfo.gender = result.gender;
    wx.setStorageSync('userinfo', userinfo);

    // 通知其他页面性别已更新
    const app = getApp();
    if (app.globalData.eventBus) {
      app.globalData.eventBus.emit('genderChanged', {
        gender: result.gender,
        genderData: result.genderData
      });
    }
  },

  loadUserData() {
    const userAuth = wx.getStorageSync('userInfo') || {};
    const localUser = wx.getStorageSync('userinfo') || {};
    const favorites = wx.getStorageSync('favoriteNames') || [];

    const nickname = userAuth.nickname || userAuth.nickName || localUser.nickname || localUser.nickName;
    const phone = userAuth.phone;
    const userId = userAuth.user_id || userAuth.userId;
    const mbti = wx.getStorageSync('mbti');
    const isVip = !!(userAuth.isVip || userAuth.vip);

    let genderText = '';
    let gender = localUser.gender;
    let genderData = localUser.genderData || null;
    
    if (localUser.genderData) {
      genderText = (this.data.lang === 'cn') ? (localUser.genderData.label_cn || '') : (localUser.genderData.label_ug || '');
    }

    this.setData({
      nickname,
      phone,
      userId,
      mbti,
      isVip,
      genderText,
      gender,
      genderData,
      favoritesCount: favorites.length
    });
  },

  closeLoginBox() {
    this.setData({ showLoginPopup: false });
  },

  onLoginSuccess(e) {
    const userInfo = e.detail;
    this.setData({ 
      isLoggedIn: true,
      showLoginPopup: false
    });
    // 登录成功后获取最新用户信息
    this.getUserInfo();
    // 触发登录事件，通知其他页面
    if (app.globalData.eventBus) {
      app.globalData.eventBus.emit('login', userInfo);
    }
  },

  onLoginFail(e) {
    this.setData({ showLoginPopup: false });
    handleLoginFail(e, () => {
      this.setData({ showLoginPopup: true });
    });
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('userAuth');
          wx.removeStorageSync('localUser');
          wx.removeStorageSync('userInfo');
          
          this.setData({ isLoggedIn: false });
          
          setTimeout(() => {
            wx.reLaunch({
              url: 'views/personal/personal'
            });
          }, 1000);
        }
      }
    });
  }
});


