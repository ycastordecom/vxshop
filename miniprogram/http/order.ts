import { AddOrderParams, CartSettleParams } from './../type/order';

const httpUtils = require('./httpUtils');

//获取订单列表
export const getOrderList = (data: { status: number | null }) => {
  return httpUtils.request({
    url: 'order/ownListPage',
    showLoading: true,
    message: '正在获取订单列表...',
    data,
  });
};

//添加订单
export const addOrder = (data: AddOrderParams) => {
  return httpUtils.request({
    url: 'order/add',
    showLoading: true,
    message: '正在提交订单...',
    data,
  });
};

//点击确认收货
export const receiveGoods = (orderId: number) => {
  return httpUtils.request({
    url: 'order/finish?orderId=' + orderId,
    showLoading: true,
    message: '正在确认收货...',
  });
};

//购物车结算
export const cartSettlement = (data: CartSettleParams) => {
  return httpUtils.request({
    url: 'order/cartSettlement',
    showLoading: true,
    message: '正在结算...',
    data,
  });
};
