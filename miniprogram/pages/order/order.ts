import { OrderListResponse } from '../../type/order';
import { getOrderList, receiveGoods } from '../../http/order';

// pages/order/order.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0 as number,
    orderList: [] as OrderListResponse[],
    baseImage: require('../../utils/file_config').baseImage as string,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    this.setData({
      active: Number(option.active),
    });
    this.initOrderList();
  },
  async initOrderList() {
    const data: OrderListResponse[] = await getOrderList({
      status: this.data.active,
    });
    this.setData({
      orderList: data,
    });
  },
  change(event: { detail: { name: number } }) {
    this.setData({
      active: event.detail.name,
    });
    this.initOrderList();
  },
  //确认收货
  async receiveGoods(event: {
    currentTarget: { dataset: { orderid: number } };
  }) {
    const data = await receiveGoods(event.currentTarget.dataset.orderid);

    this.initOrderList();
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
