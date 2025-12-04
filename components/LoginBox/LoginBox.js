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

    onClose() {
      this.triggerEvent('close');
    },

    easyLogin() {
      this.setData({ isLoggingIn: true });
      wx.login({
        success: (res) => {
          if (res.code) {
            // 调用登录接口
            wx.request({
              url: `${app.globalData.requestUrl}/auth/login`,
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              data: {
                code: res.code
              },
              success: (loginRes) => {
                if (loginRes.data.code === 200) {
                  const { token, openid, is_new_user, user_id, id } = loginRes.data.data;
                  
                  wx.setStorageSync('token', token);
                  
                  const userInfo = {
                    token,
                    openid,
                    is_new_user,
                    user_id,
                    id
                  };
                  this.triggerEvent('login-success', userInfo);
                } else {
                  this.triggerEvent('login-fail', { reason: 'server-error' });
                }
              },
              fail: () => {
                wx.showToast({ title: '网络错误', icon: 'none' });
                this.triggerEvent('login-fail', { reason: 'network-error' });
              },
              complete: () => {
                this.setData({ isLoggingIn: false });
              }
            });
          } else {
            this.setData({ isLoggingIn: false });
            this.triggerEvent('login-fail', { reason: 'wx_login_failed' });
          }
        },
        fail: () => {
          this.setData({ isLoggingIn: false });
          this.triggerEvent('login-fail', { reason: 'wx_login_failed' });
        }
      });
    }
  }
}); 