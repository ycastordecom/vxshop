//获取购物车列表
export interface CartListRequest {
  cartId: number;
  goodsId: number;
  specId: number;
  num: number;
  createTime: number;
  updateTime: number;
  isChoose: boolean;
  userId: number;
  goods: CartListRequestGoods;
  spec: CartListRequestSpec;
}

interface CartListRequestSpec {
  specId: number;
  goodsId: number;
  specJson: string;
  premium: number;
  image: string;
  isDelete: boolean;
  createTime: number;
  updateTime: number;
  stock: number;
}

interface CartListRequestGoods {
  goodsId: number;
  goodsName: string;
  introduce: string;
  image: string;
  price: number;
  imageList: string;
  isDelete: boolean;
  createTime: number;
  updateTime: number;
  categoryId: number;
  isBanner: boolean;
  isHome: boolean;
  detailJson: string;
}

// 添加商品到购物车
export interface AddCartRequest {
  goodsId: number;
  num: number;
  specId: number;
}
//添加购物车返回体
interface AddCartResponse {
  cartId: number;
  goodsId: number;
  specId: number;
  num: number;
  createTime: number;
  updateTime: number;
  isChoose: boolean;
  userId: number;
  goods: AddCartResponseSpecGoods;
  spec: AddCartResponseSpec;
}

interface AddCartResponseSpec {
  specId: number;
  goodsId: number;
  specJson: string;
  premium: number;
  image: string;
  isDelete: boolean;
  createTime: number;
  updateTime: number;
  stock: number;
}

interface AddCartResponseSpecGoods {
  goodsId: number;
  goodsName: string;
  introduce: string;
  image: string;
  price: number;
  imageList: string;
  isDelete: boolean;
  createTime: number;
  updateTime: number;
  categoryId: number;
  isBanner: boolean;
  isHome: boolean;
  detailJson: string;
}
