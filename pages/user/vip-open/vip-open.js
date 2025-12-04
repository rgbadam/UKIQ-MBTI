const { getLangPackage } = require('../../../utils/languageUtil.js');
const { handleLoginFail } = require('../../../utils/loginErrorHandler.js');
const app = getApp();

Page({
  data: {
    lang: 'cn',
    isLoggedIn: false,
    phoneInput: '',
    nicknameInput: '',
    showLoginPopup: false,
    showPayActions: false,
    infoReady: false,
    isPaying: false,
    payMessage: '',
    pageText: {},
    vipTypes: [],
    loadingVipTypes: false,
    phoneFocused: false,
    nicknameFocused: false
  },

  onShow() {
    this.initLanguage();
    this.loadUserInfo();
    this.loadVipTypes();
  },

  initLanguage() {
    const langPackage = getLangPackage();
    const lang = wx.getStorageSync('languageType') == 1 ? 'cn' : 'ug';
    this.setData({
      lang,
      pageText: langPackage.pageTexts.vipOpenPage
    });
    wx.setNavigationBarTitle({
      title: langPackage.pageTexts.vipOpenPage.navBarTitle
    });
  },

  loadUserInfo() {
    const token = wx.getStorageSync('token');
    if (!token) {
      this.setData({
        isLoggedIn: false,
        phoneInput: '',
        nicknameInput: '',
        infoReady: false,
        showPayActions: false
      });
      return;
    }

    wx.request({
      url: `${app.globalData.requestUrl}/auth/userInfo`,
      method: 'GET',
      header: { 'Authorization': `Bearer ${token}` },
      success: (res) => {
        if (res.data && res.data.code === 200 && res.data.data) {
          const userData = res.data.data;
          const phone = userData.phone || '';
          const nickname = userData.nickname || '';
          const infoReady = !!(phone && nickname);
          this.setData({
            isLoggedIn: true,
            phoneInput: phone,
            nicknameInput: nickname,
            infoReady,
            showPayActions: false
          });
        } else if (res.data.code === 401 || res.data.code === 404) {
          wx.removeStorageSync('token');
          this.setData({
            isLoggedIn: false,
            phoneInput: '',
            nicknameInput: '',
            infoReady: false,
            showPayActions: false
          });
        }
      }
    });
  },

  openLoginPopup() {
    this.setData({ showLoginPopup: true });
  },

  closeLoginPopup() {
    this.setData({ showLoginPopup: false });
  },

  onLoginSuccess(e) {
    const userInfo = e.detail;
    this.setData({
      isLoggedIn: true,
      showLoginPopup: false
    });
    // 刷新一次用户信息，保证手机号和昵称同步
    this.loadUserInfo();
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

  onPhoneInput(e) {
    this.setData({ phoneInput: e.detail.value });
  },

  onNicknameInput(e) {
    this.setData({ nicknameInput: e.detail.value });
  },

  onPhoneFocus() {
    this.setData({ phoneFocused: true });
  },

  onPhoneBlur() {
    this.setData({ phoneFocused: false });
  },

  onNicknameFocus() {
    this.setData({ nicknameFocused: true });
  },

  onNicknameBlur() {
    this.setData({ nicknameFocused: false });
  },

  saveUserInfo() {
    if (!this.data.isLoggedIn) {
      this.setData({ showLoginPopup: true });
      return;
    }

    const phone = (this.data.phoneInput || '').trim();
    const nickname = (this.data.nicknameInput || '').trim();

    if (!phone || !nickname) {
      return;
    }

    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      wx.showToast({
        title: this.data.lang === 'cn' ? '请输入正确的手机号' : 'تېلېفون نومۇر خاتا',
        icon: 'none'
      });
      return;
    }

    const token = wx.getStorageSync('token');
    if (!token) {
      this.setData({ isLoggedIn: false, showLoginPopup: true });
      return;
    }

    wx.request({
      url: `${app.globalData.requestUrl}/auth/updateUserInfo`,
      method: 'POST',
      header: { 'Authorization': `Bearer ${token}` },
      data: {
        phone,
        nickname
      },
      success: (res) => {
        if (res.data && res.data.code === 200) {
          this.setData({
            infoReady: true,
            showPayActions: false
          });
        }
      }
    });
  },

  onQrLongPress() {
    // 当用户长按二维码时，认为已进入支付流程，回到页面后可展示操作按钮
    if (!this.data.isLoggedIn || !this.data.infoReady) return;
    this.setData({ showPayActions: true });
  },

  handlePaid() {
    if (this.data.isPaying) return;
    this.setData({
      isPaying: true,
      payMessage: ''
    });

    // 模拟处理中的展示效果
    setTimeout(() => {
      this.setData({
        isPaying: false,
        payMessage: this.data.pageText.waitingText,
        showPayActions: false
      });
    }, 1200);
  },

  handleCancel() {
    if (getCurrentPages().length > 1) {
      wx.navigateBack();
    } else {
      wx.switchTab({
        url: '/views/personal/personal'
      });
    }
  },

  loadVipTypes() {
    this.setData({ loadingVipTypes: true });
    wx.request({
      url: `${app.globalData.requestUrl}/vipType/getTypes`,
      method: 'GET',
      success: (res) => {
        if (res.data && res.data.code === 200 && res.data.data) {
          // 按照 id 排序，确保显示顺序正确
          const vipTypes = res.data.data.sort((a, b) => a.id - b.id);
          this.setData({ vipTypes });
        }
      },
      fail: (err) => {
        console.error('获取会员类型失败:', err);
      },
      complete: () => {
        this.setData({ loadingVipTypes: false });
      }
    });
  }
});


