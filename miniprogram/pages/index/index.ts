// index.ts

import { ResponseList } from '../../type';
import { ResponseGoodsListDatum } from '../../type/shop';

// 获取应用实例
// const app = getApp<IAppOption>();
//获取轮播图
const { requesShoptList } = require('../../http/shop');
Page({
  data: {
    shopList: [] as ResponseGoodsListDatum[],
    banner: [] as ResponseGoodsListDatum[],
    baseImage: require('../../utils/file_config').baseImage as string,
    pageNum: 1 as number,
    hasNext: true as boolean,
  },
  onLoad() {
    this.getBanner();
    this.getShopList();
  },
  //触底加载
  onReachBottom() {
    //加载中
    //全局loading
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });

    if (!this.data.hasNext) {
      //没有下一页
      // 复制一份数据
      setTimeout(() => {
        this.setData({
          shopList: this.data.shopList.concat(this.data.shopList),
        });
        wx.hideToast();
      }, 1000);
      return;
    }

    this.setData({
      pageNum: this.data.pageNum + 1,
    });
    this.getShopList();
    setTimeout(() => {
      wx.hideToast();
    }, 1000);
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
  //toSearch
  toSearch() {
    wx.navigateTo({
      url: `/pages/search/search`,
    });
  },
  // 获取轮播图
  async getBanner() {
    const data: ResponseList<ResponseGoodsListDatum> = await requesShoptList({
      pageNum: 1,
      pageSize: 6,
      query: {
        isBanner: true,
      },
    });

    if (!data) return;
    this.setData({
      banner: data.data,
    });
  },
  // 获取商品列表
  async getShopList() {
    const data = await requesShoptList({
      pageNum: this.data.pageNum,
      pageSize: 20,
      query: {
        isHome: true,
      },
    });
    if (!data) return;
    //没有下一页
    this.setData({
      shopList: this.data.shopList.concat(data.data),
      hasNext: data.hasNext,
    });
  },
  onShow() {
    this.getTabBar().init();
  },
});
