const app = getApp();

Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    lang: {
      type: String,
      value: 'cn'
    }
  },

  data: {
    isLoggingIn: false
  },

  methods: {
    onVisibleChange(e) {
      const { visible } = e.detail;
      if (!visible) {
        this.triggerEvent('close');
      }
    },

    easyLogin(e) {
      if (e.detail.errMsg !== 'getPhoneNumber:ok') {
        this.triggerEvent('login-fail', { reason: 'phone_auth_denied' });
        return;
      }

      this.setData({ isLoggingIn: true });
      // wx.login({
      //   success: (res) => {
      //     wx.request({
      //       url: `${app.globalData.requestUrl}/auth/wechat/login`,
      //       method: 'POST',
      //       data: {
      //         code: res.code,
      //         iv: e.detail.iv,
      //         encryptedData: e.detail.encryptedData
      //       },
      //       success: (res) => {
      //         if (res.statusCode === 200) {
      //           wx.setStorage({
      //             key: 'userInfo',
      //             data: res.data,
      //             success: () => {
      //               this.triggerEvent('login-success', res.data);
      //             }
      //           });
      //         } else {
      //           wx.showToast({ title: '登录失败', icon: 'none' });
      //           this.triggerEvent('login-fail', { reason: 'server-error' });
      //         }
      //       },
      //       fail: () => {
      //         wx.showToast({ title: '网络错误', icon: 'none' });
      //         this.triggerEvent('login-fail', { reason: 'network-error' });
      //       },
      //       complete: () => {
      //         this.setData({ isLoggingIn: false });
      //       }
      //     });
      //   },
      //   fail: () => {
      //     this.setData({ isLoggingIn: false });
      //     wx.showToast({ title: '获取登录码失败', icon: 'none' });
      //     this.triggerEvent('login-fail', { reason: 'wx_login_failed' });
      //   }
      // });
    }
  }
}); 