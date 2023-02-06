// pages/cart/cart.ts
import { CartListRequest } from '../../type/cart';
import {
  changeCartChecked,
  changeCartNum,
  deleteCart,
  getCartList,
  selectAllCart,
  unSelectAllCart,
} from '../../http/cart';
import { getAddressListRequest } from '../../type/user';
import { getAddressList } from '../../http/user';
import { cartSettlement } from '../../http/order';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartList: [] as CartListRequest[],
    tags: [] as any[],
    baseImage: require('../../utils/file_config').baseImage as string,
    price: 0 as number,
    allChecked: false as boolean,
    addressShow: false as boolean,
    active: 0 as number,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    //查看有没有token
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/userLogin/userLogin',
      });
    }

    this.initAddress();
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
  //提交订单
  onClickButton() {
    this.setData({
      addressShow: true,
    });
  },
  //监听弹窗点击确定
  async onConfirm() {
    //TODO:提交订单
    const data = await cartSettlement({
      addressId: this.data.active,
      remark: '',
    });
    console.log(data);
  },

  //获取购物车列表
  async cartListInit() {
    const data: CartListRequest[] = await getCartList();

    //添加规格标签
    data.forEach((item) => {
      const baseitem = JSON.parse(item.spec.specJson);
      const tags = Object.keys(baseitem);
      const arr = [] as any[];
      tags.forEach((tag) => {
        arr.push(baseitem[tag]);
      });
      this.setData({
        tags: [...this.data.tags, arr],
      });
    });
    this.setData({
      cartList: data,
    });
    this.totalPrice(); //计算总价
  },
  //切换购物车商品选中状态
  async changeCartChecked(e: any) {
    const { cartid } = e.currentTarget.dataset;
    const { detail: selected } = e;
    const data = await changeCartChecked(cartid, selected);
    if (!data) {
      this.cartListInit();
    }
  },
  //修改购物车商品数量
  async changeCartNum(e: any) {
    const { cartid } = e.currentTarget.dataset;
    const { detail: num } = e;
    const data = await changeCartNum(cartid, num);
    if (!data) {
      this.cartListInit();
    }
  },
  //删除购物车商品
  async delCart(e: any) {
    const { cartid } = e.currentTarget.dataset;
    const data = await deleteCart(cartid);
    if (!data) {
      this.cartListInit();
    }
  },
  //计算总价
  totalPrice() {
    let total = 0;
    this.data.cartList.forEach((item) => {
      if (item.isChoose) {
        total += (item.goods.price + item.spec.premium) * item.num;
      }
    });
    this.setData({
      price: total,
    });
  },
  //全选
  async allChecked() {
    if (!this.data.allChecked) {
      const data = await selectAllCart();
      if (!data) {
        this.setData({
          allChecked: true,
        });
        this.cartListInit();
      }
      return;
    }
    if (this.data.allChecked) {
      const data = await unSelectAllCart();
      if (!data) {
        this.setData({
          allChecked: false,
        });
        this.cartListInit();
      }
      return;
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.cartListInit();
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
