const httpUtils = require('./httpUtils');
//类型
import { RequestList } from '../type/index';
import { RequestGoodsRequest } from '../type/shop';
//获取商品列表
export const requesShoptList = (data: RequestList<RequestGoodsRequest>) => {
  return httpUtils.request({
    url: 'goods/listPage',
    method: 'POST',
    data,
  });
};
//获取商品分类列表
export const requesShoptClassList = () => {
  return httpUtils.request({
    url: 'category/list',
    method: 'POST',
  });
};

// 获取商品详情
export const requesShoptDetail = (goodsId: string) => {
  return httpUtils.request({
    url: 'goods/detail?goodsId=' + goodsId,
    method: 'POST',
  });
};
