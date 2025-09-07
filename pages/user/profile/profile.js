Page({
  data: {
    lang: 'cn',
    nickname: '',
    phone: '',
    userId: '',
    mbti: '',
    genderText: '',
    gender: 'female',
    genderData: null,
    isVip: false,
    favoritesCount: 0,
    showGenderPopup: false,
    canCloseGenderBox: true
  },

  onShow() {
    this.initLanguage();
    this.loadUserData();
  },

  initLanguage() {
    this.setData({ lang: wx.getStorageSync('languageType') == 1 ? 'cn' : 'ug' });
  },

  // 切换性别称呼
  switchGender() {
    this.setData({ 
      showGenderPopup: true,
      canCloseGenderBox: true 
    });
  },

  // 编辑昵称
  editNickname() {
    wx.showToast({
      title: this.data.lang === 'cn' ? '编辑昵称' : 'لەقەم تەھرىرلەش',
      icon: 'none'
    });
  },

  // 编辑手机号
  editPhone() {
    wx.showToast({
      title: this.data.lang === 'cn' ? '编辑手机号' : 'تېلېفون تەھرىرلەش',
      icon: 'none'
    });
  },

  // 复制用户ID
  copyUserId() {
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

  // 关闭性别选择框
  closeGenderBox() {
    this.setData({ showGenderPopup: false });
  },

  // 确认性别选择
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

    // 设置默认值
    const nickname = userAuth.nickname || userAuth.nickName || localUser.nickname || localUser.nickName || 
                    (this.data.lang === 'cn' ? '未设置昵称' : 'لەقەم تەڭشەلمىگەن');
    const phone = userAuth.phone || (this.data.lang === 'cn' ? '未绑定手机' : 'تېلېفون باغلانمىغان');
    const userId = userAuth.user_id || userAuth.userId || 
                  (this.data.lang === 'cn' ? '暂无ID' : 'ID يوق');
    const mbti = wx.getStorageSync('mbti') || '';
    const isVip = !!(userAuth.isVip || userAuth.vip);

    let genderText = '';
    let gender = localUser.gender || 'female';
    let genderData = localUser.genderData || null;
    
    if (localUser.genderData) {
      genderText = (this.data.lang === 'cn') ? (localUser.genderData.label_cn || '') : (localUser.genderData.label_ug || '');
    } else if (localUser.gender) {
      genderText = localUser.gender;
    } else {
      genderText = this.data.lang === 'cn' ? '请选择性别' : 'جىنىس تاللاڭ';
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
      title: this.data.lang === 'cn' ? '确认退出' : 'چىقىشنى جەزملەشتۈرۈڭ',
      content: this.data.lang === 'cn' ? '确定要退出登录吗？' : 'چىقىشنى جەزملەشتۈرەمسىز؟',
      confirmText: this.data.lang === 'cn' ? '确定' : 'جەزملەشتۈرۈش',
      cancelText: this.data.lang === 'cn' ? '取消' : 'بىكار قىلىش',
      success: (res) => {
        if (res.confirm) {
          // 清除存储的用户数据
          wx.removeStorageSync('userAuth');
          wx.removeStorageSync('localUser');
          wx.removeStorageSync('userInfo');
          
          wx.showToast({
            title: this.data.lang === 'cn' ? '退出成功' : 'چىقىش مۇۋەپپەقىيەتلىك',
            icon: 'success'
          });
          
          // 跳转到登录页或首页
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


