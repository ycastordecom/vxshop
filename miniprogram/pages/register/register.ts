// pages/register/register.ts
const { userRegister } = require('../../http/user');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    baseImage: require('../../utils/file_config').baseImage,
    phone: '',
    username: '',
    password: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    //关闭左上角小程序图标
    wx.hideHomeButton();
  },
  async register() {
    const { phone, username, password } = this.data;
    if (!username) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none',
      });
      return;
    }
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
      });
      return;
    }
    //手机号正则
    const phoneReg = /^1[3-9]\d{9}$/;
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
      });
      return;
    }
    if (!password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
      });
      return;
    }
    const data = await userRegister({
      phone,
      username,
      password,
    });
    if (data === null) return;

    wx.showToast({
      title: '注册成功',
      icon: 'none',
    });
    this.toLogin();
  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/userLogin/userLogin',
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
