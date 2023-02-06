import { getAddressListRequest } from '../../type/user';
import { deleteAddress, getAddressList } from '../../http/user';
import { Response } from '../../type';

// pages/address/address.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressList: [] as unknown as getAddressListRequest[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},
  //初始化地址列表
  async initAddressList() {
    const data: getAddressListRequest[] = await getAddressList();
    //设置默认地址在第一位
    data.sort((a, b) => {
      if (a.isDefault) return -1;
      if (b.isDefault) return 1;
      return 0;
    });

    this.setData({
      addressList: data,
    });
  },

  //添加地址跳转
  onSubmit() {
    wx.navigateTo({
      url: '/pages/addiseditaddress/addiseditaddress?type=add',
    });
  },

  //删除地址
  async deladdress(e: any) {
    const { addressid } = e.currentTarget.dataset;
    const data: null | Response<null> = await deleteAddress(addressid);
    if (data !== null) return wx.showToast({ title: data.message });
    this.initAddressList();
  },
  //编辑地址
  editaddress(e: any) {
    const { item } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/addiseditaddress/addiseditaddress?type=edit&item=${JSON.stringify(
        item,
      )}`,
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
    this.initAddressList();
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
