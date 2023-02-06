//获取订单列表返回数据
export interface OrderListResponse {
  orderId: number;
  orderNo: string;
  userId: number;
  payTime: number;
  totalAmount: number;
  waybillNo: number;
  status: number;
  receiverName: string;
  phone: string;
  address: string;
  createTime: number;
  updateTime: number;
  remark: string;
  completeTime: number;
  isDelete: boolean;
  orderDetailList: OrderDetailList[];
}

interface OrderDetailList {
  orderDetailId: number;
  orderId: number;
  goodsName: string;
  goodsIntroduce: string;
  specJson: string;
  price: number;
  image: string;
  num: number;
  isDelete: boolean;
}

//添加订单请求体
export interface AddOrderParams {
  goods: Good[];
  addressId: number;
  remark: string;
}

interface Good {
  goodsId: number;
  specId: number;
  goodsNum: number;
}

//添加订单返回数据
export interface AddOrderResponse {
  message: any;
  orderId: number;
  orderNo: string;
  userId: number;
  payTime: number;
  totalAmount: number;
  waybillNo: number;
  status: boolean;
  receiverName: string;
  phone: string;
  address: string;
  createTime: number;
  updateTime: number;
  remark: string;
  completeTime: number;
  isDelete: boolean;
  orderDetailList: OrderDetailList[];
}

interface OrderDetailList {
  orderDetailId: number;
  orderId: number;
  goodsName: string;
  goodsIntroduce: string;
  specJson: string;
  price: number;
  image: string;
  num: number;
  isDelete: boolean;
}

//购物车结算请求体
export interface CartSettleParams {
  addressId: number;
  remark: string;
}
