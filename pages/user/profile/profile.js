const { getLangPackage } = require('../../../utils/languageUtil.js')

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
    pageText: {}
  },

  onShow() {
    this.initLanguage();
    this.loadUserData();
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
        url: '/pages/mbti/homepage/homepage' 
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

  editNickname() {
    if (!this.data.nickname) return;
  },

  editPhone() {
    if (this.data.phone) return;
  },

  copyUserId() {
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
          
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/tabs/tabs'
            });
          }, 1000);
        }
      }
    });
  }
});


