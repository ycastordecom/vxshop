import { ResponseGoodsDetail, SpecList } from '../../type/shop';
import { requesShoptDetail } from '../../http/shop';
import { addCart } from '../../http/cart';
import { addOrder } from '../../http/order';
import { getAddressList } from '../../http/user';
import { getAddressListRequest } from '../../type/user';
import { AddOrderResponse } from '../../type/order';
import { Response } from 'miniprogram/type';
// pages/detail/detail.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    baseImage: require('../../utils/file_config').baseImage as string,
    goodsId: '' as string,
    goodsData: {} as ResponseGoodsDetail,
    imageList: [] as string[],
    specList: [] as SpecList[] & [] as any[],
    detailJson: [] as any[],
    show: false as boolean,
    specJson: [] as any[],
    actives: {} as any,
    popImage: '/image/IMG1615301845553647616.jpeg' as string,
    price: 0 as number,
    stock: 1 as number,
    specId: 0 as number,
    disabled: true as boolean,
    number: 1 as number,
    text: '加入购物车' as string,
    addressList: [] as getAddressListRequest[],
    active: 0 as number,
    addressShow: false as boolean,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    this.setData({
      goodsId: option.id,
    });
    this.getGoods();
    this.initAddress();
  },
  //提交
  onSubmit() {
    if (this.data.text === '加入购物车') {
      this.addCartSubmit();
    } else {
      this.addOrderSubmit();
    }
  },
  //加入购物车
  async addCartSubmit() {
    const data = await addCart({
      goodsId: this.data.goodsData.goodsId,
      num: this.data.number,
      specId: this.data.specId,
    });

    if (!data) {
      wx.switchTab({
        url: '/pages/cart/cart',
      });
    }
  },
  //立即购买
  async addOrderSubmit() {
    let data: AddOrderResponse = await addOrder({
      goods: [
        {
          goodsId: this.data.goodsData.goodsId,
          goodsNum: this.data.number,
          specId: this.data.specId,
        },
      ],
      addressId: this.data.active,
      remark: '',
    });
    if (data.orderId) {
      wx.navigateTo({
        url: `/pages/order/order?active=0`,
      });
      return;
    }
    data as unknown as Response<null>;
    wx.showToast({
      title: data.message,
      icon: 'none',
    });
  },
  //初始化地址
  async initAddress() {
    const data: getAddressListRequest[] = await getAddressList();
    // 设置默认地址第一
    data.forEach((item, index) => {
      if (item.isDefault) {
        this.setData({
          active: item.addressId,
        });
        const temp = data[0];
        data[0] = item;
        data[index] = temp;
      }
    });

    this.setData({
      addressList: data,
    });
  },
  //跳转购物车
  toCart() {
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },
  //点击加入购物车
  addCartTap() {
    this.setData({
      show: true,
      text: '加入购物车',
    });
  },
  //点击立即购买
  addOrderTap() {
    this.setData({
      show: true,
      addressShow: true,
      text: '立即购买',
    });
  },
  //选择规格
  selectSpec(e: any) {
    const { bindex, index } = e.currentTarget.dataset;
    const { specJson } = this.data;
    specJson[bindex].value.forEach((item: any) => {
      item.status = false;
    });
    specJson[bindex].value[index].status = true;

    //生成选中状态
    const actives: any = {};
    specJson.forEach((item: any) => {
      item.value.forEach((item2: any) => {
        if (item2.status) {
          actives[item.key] = item2.value;
        }
      });
    });

    //匹配价格、图片、库存
    let price = 0 as number;
    if (Object.keys(actives).length === specJson.length) {
      const active: SpecList | undefined = this.data.goodsData.specList.find(
        (item) => {
          return (
            JSON.stringify(actives) ===
            JSON.stringify(JSON.parse(item.specJson))
          );
        },
      );
      if (active) {
        price = active.premium;
        this.setData({
          price,
          stock: active.stock,
          popImage: active.image,
          specId: active.specId,
        });
      }
    }
    this.setData({
      specJson,
      actives,
      disabled: Object.keys(actives).length !== specJson.length, //是否选择完毕
    });
  },
  //获取商品详情
  async getGoods() {
    const data: ResponseGoodsDetail = await requesShoptDetail(
      this.data.goodsId,
    );
    const keys: string[] = [];
    data.specList.forEach((item: any) => {
      const spec = JSON.parse(item.specJson);
      keys.push(...Object.keys(spec));
    });
    //去重
    const newKeys = [...new Set(keys)];

    //规格
    const specJson = newKeys.map((item: string) => {
      //规格值
      const specValue = data.specList.map((item2: any) => {
        const spec = JSON.parse(item2.specJson);
        return spec[item];
      });
      //去重
      let newSpecValue = [...new Set(specValue)];
      //加上状态
      newSpecValue = newSpecValue.map((item2: string) => {
        return {
          value: item2,
          status: false,
        };
      });
      return {
        key: item,
        value: newSpecValue,
      };
    });

    this.setData({
      specJson,
    });
    //生成规格选中状态
    const specList = data.specList.map((item: any) => {
      const spec = JSON.parse(item.specJson);
      const specKey = Object.keys(spec);
      const specValue = Object.values(spec);
      const specStatus = specKey.map((item2: string, index: number) => {
        return {
          key: item2,
          value: specValue[index],
          status: false,
        };
      });

      return {
        ...item,
        specStatus,
      };
    });

    //其他信息
    this.setData({
      goodsData: data,
      imageList: data.imageList.split(','), //图片列表
      specList: specList, //规格列表
      detailJson: JSON.parse(data.detailJson), //详情
    });

    //初始化弹窗图片,价格
    this.setData({
      popImage: this.data.goodsData.image,
    });
  },
  //关闭弹窗
  close() {
    this.setData({
      show: false,
    });
  },
  //数量加减
  numberChange(event: { detail: number }) {
    this.setData({
      number: event.detail,
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
