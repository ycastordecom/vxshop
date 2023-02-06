//手机号登录请求体
export interface LoginByPhoneRequest {
  phone: string;
  password: string;
}
//手机号登录返回体数据
export interface LoginByPhoneResponseData {
  token: string;
  userId: number;
  phone: string;
  integral: number;
  isProhibited: boolean;
  createTime: number;
  updateTime: number;
  avatar: string;
  role: number;
  username: string;
  oppenid: string;
}

//用户注册请求体
export interface RegisterRequest {
  username: string;
  password: string;
  phone: string;
}

//微信登录请求体
export interface wxLoginRequest {
  code: string;
  avatar: string;
  username: string;
}

//绑定微信请求体
interface bindWxRequest {
  userId: number;
  code: string;
  avatar: string;
  username: string;
}

//获取地址列表请求体
export interface getAddressListRequest {
  addressId: number;
  userId: number;
  receiverName: string;
  phone: string;
  address: string;
  remark: string;
  isDefault: boolean;
  createTime: number;
  updateTime: number;
}

//添加地址请求体
export interface addAddressRequest {
  userId: number;
  address: string;
  receiverName: string;
  phone: string;
}
//添加地址返回体数据
export interface addAddressResponseData {
  [x: string]: any;
  addressId: number;
  userId: number;
  receiverName: string;
  phone: string;
  address: string;
  remark: string;
  isDefault: boolean;
  createTime: number;
  updateTime: number;
}

//修改地址请求体
export interface editAddressRequest {
  addressId: number;
  receiverName: string;
  phone: string;
  address: string;
  remark: string;
}
