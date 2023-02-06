import { AddCartRequest } from '../type/cart';

const httpUtils = require('./httpUtils');

//获取购物车列表
export function getCartList() {
  return httpUtils.request({
    url: 'cart/ownList',
  });
}

//添加商品到购物车
export function addCart(data: AddCartRequest) {
  return httpUtils.request({
    url: 'cart/add',
    method: 'POST',
    data,
  });
}

//切换购物车商品选中状态
export function changeCartChecked(cartId: number, selected: boolean) {
  return httpUtils.request({
    url: `cart/setSelect?cartId=${cartId}&selected=${selected}`,
    method: 'POST',
  });
}

//修改购物车商品数量
export function changeCartNum(cartId: number, num: number) {
  return httpUtils.request({
    url: `cart/updateNum?cartId=${cartId}&num=${num}`,
    method: 'POST',
  });
}

//删除购物车商品
export function deleteCart(cartId: number) {
  return httpUtils.request({
    url: `cart/delete?cartId=${cartId}`,
    method: 'POST',
  });
}

//全选购物车商品
export function selectAllCart() {
  return httpUtils.request({
    url: `cart/selectAll`,
    method: 'POST',
  });
}

//取消全选购物车商品
export function unSelectAllCart() {
  return httpUtils.request({
    url: `cart/selectNone`,
    method: 'POST',
  });
}
