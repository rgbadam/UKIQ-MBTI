function handleLoginFail(e, onRetry = null) {
  if (!e || !e.detail || !e.detail.reason) {
    console.log('登录失败，未知原因');
    return;
  }

  const { reason } = e.detail;
  
  switch (reason) {
    case 'phone_auth_denied':
      handlePhoneAuthDenied(onRetry);
      break;
      
    default:
      console.log('登录失败，原因:', reason);
      break;
  }
}

function handlePhoneAuthDenied(onRetry) {
  wx.showModal({
    title: '授权提示',
    content: '需要授权手机号才能使用完整功能，是否重新授权？',
    confirmText: '重新授权',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm && typeof onRetry === 'function') {
        onRetry();
      }
    }
  });
}

module.exports = {
  handleLoginFail,
  handlePhoneAuthDenied
}; 