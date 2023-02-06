// pages/class/class.ts
import {
  ClsssListResponse,
  RequestGoodsRequest,
  ResponseGoodsListDatum,
} from '../../type/shop';
import { requesShoptClassList, requesShoptList } from '../../http/shop';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    baseImage: require('../../utils/file_config').baseImage as string,
    classList: [] as ClsssListResponse[],
    shopList: [] as RequestGoodsRequest[],
    baseIndex: 0,
    pageNum: 1,
    hasNext: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    await this.getClassList();
    await this.getGoodsList();
  },
  //切换分类
  tabClass(e: { currentTarget: { dataset: { index: number } } }) {
    //清空商品列表
    this.setData({
      shopList: [],
      pageNum: 1,
    });

    const { index } = e.currentTarget.dataset;
    this.setData({
      baseIndex: index,
    });
    this.getGoodsList();
  },
  //获取分类列表
  async getClassList() {
    const data: ClsssListResponse[] = await requesShoptClassList();
    this.setData({
      classList: data,
    });
  },
  //获取商品列表
  async getGoodsList() {
    const data = await requesShoptList({
      pageNum: this.data.pageNum,
      pageSize: 10,
      query: {
        categoryId: this.data.classList[this.data.baseIndex].categoryId,
      },
    });
    this.setData({
      shopList: [...this.data.shopList, ...data.data],
      hasNext: data.hasNextPage,
    });
  },
  // 跳转到商品详情
  toShopDetail(e: {
    currentTarget: {
      dataset: {
        item: ResponseGoodsListDatum;
      };
    };
  }) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.item.goodsId}`,
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
