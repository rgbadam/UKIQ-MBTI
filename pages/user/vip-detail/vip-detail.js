const { getLangPackage } = require('../../../utils/languageUtil.js');
const { handleLoginFail } = require('../../../utils/loginErrorHandler.js');
const app = getApp();

Page({
  data: {
    lang: 'cn',
    isVip: false,
    isLoggedIn: false,
    showCoderPopup: false,
    showLoginPopup: false,
    pageText: {},
    loadingMembership: false,
    activeMembership: null
  },

  onShow() {
    this.initLanguage();
    this.loadMembershipInfo();
  },

  initLanguage() {
    const langPackage = getLangPackage();
    const lang = wx.getStorageSync('languageType') == 1 ? 'cn' : 'ug';
    this.setData({
      lang,
      pageText: langPackage.pageTexts.vipDetailPage
    });
    wx.setNavigationBarTitle({
      title: langPackage.pageTexts.vipDetailPage.navBarTitle
    });
  },

  loadMembershipInfo() {
    const token = wx.getStorageSync('token');
    if (!token) {
      this.setData({
        isLoggedIn: false,
        isVip: false,
        activeMembership: null
      });
      return;
    }

    this.setData({
      isLoggedIn: true,
      loadingMembership: true
    });

    wx.request({
      url: `${app.globalData.requestUrl}/auth/membership`,
      method: 'GET',
      header: { 'Authorization': `Bearer ${token}` },
      success: (res) => {
        if (res.data && res.data.code === 200 && res.data.data) {
          const { is_vip, active_membership } = res.data.data;
          const formattedActive = active_membership ? this.formatMembershipRecord(active_membership) : null;
          this.setData({
            isVip: !!is_vip,
            activeMembership: formattedActive
          });
        } else if (res.data && (res.data.code === 401 || res.data.code === 404)) {
          wx.removeStorageSync('token');
          this.setData({
            isLoggedIn: false,
            isVip: false,
            activeMembership: null,
            showLoginPopup: true
          });
        }
      },
      complete: () => {
        this.setData({ loadingMembership: false });
      }
    });
  },

  formatMembershipRecord(record = {}) {
    return {
      ...record,
      typeLabel: this.getMembershipTypeLabel(record.membership_type),
      startFormatted: this.formatDate(record.start_date),
      endFormatted: this.formatDate(record.end_date)
    };
  },

  getMembershipTypeLabel(type) {
    const map = (this.data.pageText && this.data.pageText.membershipTypes) || {};
    if (!type) return map.custom || '--';
    return map[type] || type;
  },

  formatDate(dateStr) {
    if (!dateStr) return '--';
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) {
      return '--';
    }
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}.${month}.${day}`;
  },

  openCoderBox() {
    this.setData({ showCoderPopup: true });
  },

  closeCoderBox() {
    this.setData({ showCoderPopup: false });
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
    if (app.globalData.eventBus) {
      app.globalData.eventBus.emit('login', userInfo);
    }
    this.loadMembershipInfo();
  },

  onLoginFail(e) {
    this.setData({ showLoginPopup: false });
    handleLoginFail(e, () => {
      this.setData({ showLoginPopup: true });
    });
  }
});


