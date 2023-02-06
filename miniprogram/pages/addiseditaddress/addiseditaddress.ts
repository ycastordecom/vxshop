// pages/addiseditaddress/addiseditaddress.ts
import { areaList } from '@vant/area-data';
import { addAddressResponseData } from '../../type/user';
import { addAddress, setDefaultAddress, updateAddress } from '../../http/user';
import { Response } from '../../type';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    areaList,
    show: false as boolean,
    addressArr: [] as {
      name: string;
      code: string;
    }[],
    address: '' as string,
    checked: false as boolean,
    username: '' as string,
    phone: '' as string,
    detailaddress: '' as string,
    type: '添加地址' as string,
    addressId: 0 as number,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    if (option.type === 'add') {
      wx.setNavigationBarTitle({
        title: '添加地址',
      });
      this.setData({
        type: '添加地址',
      });
    }
    if (option.type === 'edit') {
      console.log(option.item);
      const item = JSON.parse(option.item as string);
      wx.setNavigationBarTitle({
        title: '编辑地址',
      });
      this.setData({
        type: '编辑地址',
        address: item.address.split('_')[0],
        username: item.receiverName,
        phone: item.phone,
        detailaddress: item.address.split('_')[1],
        checked: item.isDefault,
        addressId: item.addressId,
      });
    }
  },
  //获取地址
  getAddress() {
    this.setData({
      show: true,
    });
  },
  //确定地址
  addaddress(arr: any) {
    this.setData({
      addressArr: arr.detail.values,
      address:
        arr.detail.values[0].name +
        '-' +
        arr.detail.values[1].name +
        '-' +
        arr.detail.values[2].name,
      show: false,
    });
  },
  //是否设置为默认地址
  onChange(event: any) {
    this.setData({
      checked: event.detail,
    });
  },
  //提交
  async onSubmit() {
    if (this.data.type === '添加地址') {
      if (
        this.data.address === '' ||
        this.data.username === '' ||
        this.data.phone === '' ||
        this.data.detailaddress === ''
      ) {
        return wx.showToast({ title: '请填写完整信息', icon: 'none' });
      }
      const data: addAddressResponseData = await addAddress({
        userId: wx.getStorageSync('user').userId,
        address: this.data.address + '_' + this.data.detailaddress,
        receiverName: this.data.username,
        phone: this.data.phone,
      });
      if (!data.addressId)
        return wx.showToast({ title: '添加失败', icon: 'none' });
      wx.showToast({ title: '添加成功', icon: 'none' });
      if (!this.data.checked) return;
      const res: null | Response<null> = await setDefaultAddress(
        data.addressId,
      );
      if (res !== null)
        return wx.showToast({ title: data.message, icon: 'none' });
      wx.showToast({ title: '设置默认成功', icon: 'none' });
      wx.navigateBack({
        delta: 1,
      });
    }
    if (this.data.type === '编辑地址') {
      if (
        this.data.address === '' ||
        this.data.username === '' ||
        this.data.phone === '' ||
        this.data.detailaddress === ''
      ) {
        return wx.showToast({ title: '请填写完整信息', icon: 'none' });
      }
      const data: null | Response<null> = await updateAddress({
        addressId: this.data.addressId,
        address: this.data.address + '_' + this.data.detailaddress,
        receiverName: this.data.username,
        phone: this.data.phone,
        remark: '',
      });
      if (data !== null)
        return wx.showToast({ title: data.message, icon: 'none' });
      wx.showToast({ title: '修改成功', icon: 'none' });
      if (!this.data.checked) return;
      let res: null | Response<null> = await setDefaultAddress(
        this.data.addressId,
      );
      if (res !== null) {
        return wx.showToast({ title: res.message, icon: 'none' });
      }
      wx.showToast({ title: '设置默认成功', icon: 'none' });
      wx.navigateBack({
        delta: 1,
      });
    }
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
