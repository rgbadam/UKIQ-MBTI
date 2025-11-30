function handleLoginFail(e, onRetry = null) {
  if (!e || !e.detail || !e.detail.reason) {
    console.log('登录失败，未知原因');
    return;
  }

  const { reason } = e.detail;
  
  switch (reason) {
    case 'network-error':
      handleNetworkError(onRetry);
      break;
      
    case 'server-error':
      // 服务器错误已在组件中显示toast，这里只记录日志
      console.log('登录失败，服务器错误:', reason);
      break;
      
    case 'wx_login_failed':
      handleWxLoginFailed(onRetry);
      break;
      
    default:
      console.log('登录失败，原因:', reason);
      break;
  }
}

function handleNetworkError(onRetry) {
  wx.showModal({
    title: '网络错误',
    content: '网络连接失败，请检查网络后重试',
    confirmText: '重试',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm && typeof onRetry === 'function') {
        onRetry();
      }
    }
  });
}

function handleWxLoginFailed(onRetry) {
  wx.showModal({
    title: '登录失败',
    content: '获取微信登录信息失败，请重试',
    confirmText: '重试',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm && typeof onRetry === 'function') {
        onRetry();
      }
    }
  });
}

module.exports = {
  handleLoginFail
}; 