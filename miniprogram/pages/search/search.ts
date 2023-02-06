import { ResponseGoodsListDatum } from '../../type/shop';
import { requesShoptList } from '../../http/shop';

// pages/search/search.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    shopList: [] as ResponseGoodsListDatum[],
    shopShow: false as boolean,
    baseImage: require('../../utils/file_config').baseImage as string,
    pageNum: 1 as number,
    hasNext: true as boolean,
  },

  // 获取商品列表
  async search() {
    const data = await requesShoptList({
      pageNum: this.data.pageNum,
      pageSize: 20,
      query: {
        goodsName: this.data.value,
      },
    });
    if (!data) return;
    //没有下一页
    this.setData({
      shopList: this.data.shopList.concat(data.data),
      hasNext: data.hasNext,
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
  onReachBottom() {
    if (!this.data.hasNext) {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none',
      });
      return;
    }
    this.setData({
      pageNum: this.data.pageNum + 1,
    });
    this.search();
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
