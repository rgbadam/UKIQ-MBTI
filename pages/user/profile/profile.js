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
    pageText: {},
    editingNickname: false,
    editingPhone: false,
    nicknameInput: '',
    phoneInput: '',
    originalNickname: '',
    originalPhone: ''
  },

  onShow() {
    this.initLanguage();
    const token = wx.getStorageSync('token');
    if (token) {
      this.setData({ isLoggedIn: true });
      this.getUserInfo();
    } else {
      this.setData({ 
        isLoggedIn: false,
        nickname: '',
        phone: '',
        userId: '',
        isVip: false
      });
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

  handleVipTap() {
    const url = this.data.isVip ? '/pages/user/vip-detail/vip-detail' : '/pages/user/vip-open/vip-open';
    wx.navigateTo({ url });
  },

  checkLogin() {
    wx.getStorage({
      key: 'token',
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
    
    // 如果没有token，直接返回并提示登录
    if (!token) {
      this.setData({ 
        isLoggedIn: false,
        showLoginPopup: true 
      });
      return;
    }

    wx.request({
      url: `${app.globalData.requestUrl}/auth/userInfo`,
      method: 'GET',
      header: { 'Authorization': `Bearer ${token}` },
      success: (res) => {
        if (res.data.code === 200) {
          // 更新用户信息
          const userData = res.data.data;
          this.setData({ 
            isLoggedIn: true,
            userId: userData.user_id,
            phone: userData.phone || '',
            nickname: userData.nickname || '',
            isVip: userData.is_vip || false
          });
          this.loadUserData();
        } else if (res.data.code === 401) {
          wx.removeStorageSync('token');
          this.setData({ 
            isLoggedIn: false,
            showLoginPopup: true
          });
        } else if (res.data.code === 404) {
          wx.removeStorageSync('token');
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

  updateUserInfo(data) {
    const token = wx.getStorageSync('token');
    if (!token) {
      this.setData({ showLoginPopup: true });
      return;
    }

    wx.request({
      url: `${app.globalData.requestUrl}/auth/updateUserInfo`,
      method: 'POST',
      header: { 'Authorization': `Bearer ${token}` },
      data: data,
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            editingNickname: false,
            editingPhone: false
          });
          this.getUserInfo();
        } else {
          console.error('更新用户信息失败:', res.data.message || '更新失败');
        }
      },
      fail: (err) => {
        console.error('更新用户信息失败:', err || '网络错误');
      }
    });
  },

  editNickname() {
    if (!this.data.isLoggedIn) {
      this.setData({ showLoginPopup: true });
      return;
    }
    
    this.setData({
      editingNickname: true,
      nicknameInput: this.data.nickname || '',
      originalNickname: this.data.nickname || ''
    });
  },

  onNicknameInput(e) {
    this.setData({
      nicknameInput: e.detail.value
    });
  },

  saveNickname() {
    const nickname = this.data.nicknameInput.trim();
    if (!nickname) {
      wx.showToast({
        title: this.data.lang === 'cn' ? '昵称不能为空' : 'ئىسىم قۇرۇق',
        icon: 'none'
      });
      return;
    }
    
    this.updateUserInfo({ nickname: nickname });
    this.setData({
      editingNickname: false,
      nickname: nickname
    });
  },

  cancelEditNickname() {
    this.setData({
      editingNickname: false,
      nicknameInput: this.data.originalNickname
    });
  },

  editPhone() {
    if (!this.data.isLoggedIn) {
      this.setData({ showLoginPopup: true });
      return;
    }
    
    this.setData({
      editingPhone: true,
      phoneInput: this.data.phone || '',
      originalPhone: this.data.phone || ''
    });
  },

  onPhoneInput(e) {
    this.setData({
      phoneInput: e.detail.value
    });
  },

  savePhone() {
    const phone = this.data.phoneInput.trim();
    if (!phone) {
      wx.showToast({
        title: this.data.lang === 'cn' ? '手机号不能为空' : 'تېلېفون نومۇر قۇرۇق',
        icon: 'none'
      });
      return;
    }
    
    // 手机号验证
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      wx.showToast({
        title: this.data.lang === 'cn' ? '请输入正确的手机号' : 'تېلېفون نومۇر خاتا',
        icon: 'none'
      });
      return;
    }
    
    this.updateUserInfo({ phone: phone });
    this.setData({
      editingPhone: false,
      phone: phone
    });
  },

  cancelEditPhone() {
    this.setData({
      editingPhone: false,
      phoneInput: this.data.originalPhone
    });
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

    // 更新到后端，传递 gendervalue（即 genderData.value）
    if (result.genderData && result.genderData.value) {
      this.updateUserInfo({ gendervalue: result.genderData.value });
    }
  },

  loadUserData() {
    const favorites = wx.getStorageSync('favoriteNames') || [];
    const mbti = wx.getStorageSync('mbti');

    let genderText = '';
    let gender = wx.getStorageSync('userinfo').gender;
    let genderData = wx.getStorageSync('userinfo').genderData || null;
    if (genderData) {
      genderText = (this.data.lang === 'cn') ? (genderData.label_cn || '') : (genderData.label_ug || '');
    }

    this.setData({
      mbti,
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
    this.getUserInfo();
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


