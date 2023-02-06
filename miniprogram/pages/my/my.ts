import { LoginByPhoneResponseData } from '../../type/user';
import { bindWx, bindPhone } from '../../http/user';
import { OrderListResponse } from '../../type/order';
import { getOrderList } from '../../http/order';

// pages/my/my.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    baseImage: require('../../utils/file_config').baseImage as string,
    user: {} as LoginByPhoneResponseData,
    show: false as boolean,
    phone: '' as string,
    orderNumArr: [0, 0, 0] as number[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initOrderList();
    if (!wx.getStorageSync('user')) {
      wx.redirectTo({
        url: '/pages/userLogin/userLogin',
      });
    }
    this.setData({
      user: wx.getStorageSync('user') as LoginByPhoneResponseData,
    });
  },
  // 初始化订单列表
  async initOrderList() {
    const data: OrderListResponse[] = await getOrderList({
      status: null,
    });
    data.map((item) => {
      switch (item.status) {
        case 0:
          this.setData({
            ['orderNumArr[0]']: this.data.orderNumArr[0] + 1,
          });
          break;
        case 1:
          this.setData({
            ['orderNumArr[1]']: this.data.orderNumArr[0] + 1,
          });
          break;
        case 2:
          this.setData({
            ['orderNumArr[2]']: this.data.orderNumArr[0] + 1,
          });
          break;
      }
    });
  },

  //绑定微信
  async bindWxTap() {
    //获取用户信息
    const { userInfo } = await wx.getUserProfile({
      desc: '用于完善会员资料',
    });
    wx.login({
      success: async (res) => {
        const data = await bindWx({
          userId: this.data.user.userId,
          code: res.code,
          avatar: userInfo.avatarUrl,
          username: userInfo.nickName,
        });
        wx.showToast({
          title: '绑定成功',
        });
        wx.setStorageSync('user', data);
        this.setData({
          user: data,
        });
      },
    });
  },
  //打开绑定手机号弹窗
  openBindPhone() {
    this.setData({
      show: true,
    });
  },
  //绑定手机号
  async bindPhoneTap() {
    //检验手机号
    if (!/^1[3456789]\d{9}$/.test(this.data.phone)) {
      wx.showToast({
        title: '格式不正确',
        icon: 'error',
        duration: 2000,
      });
      //清空输入框
      this.setData({
        phone: '',
      });
      return;
    }
    const data = await bindPhone(this.data.phone);
    if (data === null) return this.setData({ phone: '' });
    wx.showToast({
      title: '绑定成功',
    });
    wx.setStorageSync('user', data);
    this.setData({
      show: false,
      user: data,
    });
  },
  //跳转到地址
  toAddress() {
    wx.navigateTo({
      url: '/pages/address/address',
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
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
