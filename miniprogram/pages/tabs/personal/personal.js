Page({
  data: {
    gender: 'male'
  },
  navigateBack() {
    wx.navigateBack();
  },
  toggleGender() {
    this.setData({
      gender: this.data.gender === 'male' ? 'female' : 'male'
    });
  }
})