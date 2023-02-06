import { wxLogin } from '../../http/user';
import { LoginByPhoneResponseData } from '../../type/user';

// pages/userLogin/userLogin.ts
const { userLogin } = require('../../http/user');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    baseImage: require('../../utils/file_config').baseImage,
    phone: '18333333333',
    password: 'admin',
  },
  /**
   * 登录
   */
  async login() {
    if (this.data.phone === '' || this.data.phone === '') {
      wx.showToast({
        title: '账号或密码为空',
        icon: 'error',
        duration: 2000,
      });
      return;
    }
    const data: LoginByPhoneResponseData = await userLogin({
      phone: this.data.phone,
      password: this.data.password,
    });
    if (data === null) return;
    wx.setStorageSync('user', data);
    wx.setStorageSync('token', data.token);
    //跳转到首页
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
  toRegister() {
    wx.navigateTo({
      url: '/pages/register/register',
    });
  },

  //微信登录
  async wxLogin() {
    //获取用户信息
    const { userInfo } = await wx.getUserProfile({
      desc: '用于完善会员资料',
    });
    console.log(userInfo);
    wx.login({
      success: async (res) => {
        const data = await wxLogin({
          code: res.code,
          avatar: userInfo.avatarUrl,
          username: userInfo.nickName,
        });
        if (data === null) return;
        wx.setStorageSync('user', data);
        wx.setStorageSync('token', data.token);
        //跳转到首页
        wx.switchTab({
          url: '/pages/index/index',
        });
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    /**
     * 关闭左上角返回首页按钮
     */
    wx.hideHomeButton();
  },

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
