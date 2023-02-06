import {
  addAddressRequest,
  bindWxRequest,
  editAddressRequest,
  LoginByPhoneRequest,
  RegisterRequest,
  wxLoginRequest,
} from '../type/user';
const httpUtils = require('./httpUtils');
//用户手机号密码登录
export const userLogin = (data: LoginByPhoneRequest) => {
  return httpUtils.request({
    url: 'user/login',
    showLoading: true,
    message: '正在登录...',
    data,
  });
};
//用户注册
export const userRegister = (data: RegisterRequest) => {
  return httpUtils.request({
    url: 'user/register',
    showLoading: true,
    message: '正在注册...',
    data,
  });
};
//微信登录
export const wxLogin = (data: wxLoginRequest) => {
  return httpUtils.request({
    url: 'user/wxLogin',
    showLoading: true,
    message: '正在登录...',
    data,
  });
};

//绑定微信
export const bindWx = (data: bindWxRequest) => {
  return httpUtils.request({
    url: 'user/bindWX',
    showLoading: true,
    message: '正在绑定...',
    data,
  });
};

//绑定手机号
export const bindPhone = (phone: string) => {
  return httpUtils.request({
    url: 'user/updatePhone?phone=' + phone,
    showLoading: true,
    message: '正在绑定...',
  });
};

//获取地址列表
export const getAddressList = () => {
  return httpUtils.request({
    url: 'address/getOwnAddressList',
    showLoading: true,
    message: '正在获取地址列表...',
  });
};

//添加地址
export const addAddress = (data: addAddressRequest) => {
  return httpUtils.request({
    url: 'address/add',
    showLoading: true,
    message: '正在添加地址...',
    data,
  });
};

//设置默认地址
export const setDefaultAddress = (addressId: number) => {
  return httpUtils.request({
    url: 'address/setDefault?addressId=' + addressId,
    showLoading: true,
    message: '正在设置默认地址...',
  });
};
//删除地址
export const deleteAddress = (addressId: number) => {
  return httpUtils.request({
    url: 'address/delete?addressId=' + addressId,
    showLoading: true,
    message: '正在删除地址...',
  });
};

//修改地址
export const updateAddress = (data: editAddressRequest) => {
  return httpUtils.request({
    url: 'address/update',
    showLoading: true,
    message: '正在修改地址...',
    data,
  });
};
