//商品列表请求体数据
export interface RequestGoodsRequest {
  goodsName?: string;
  categoryId?: number;
  sortField?: string;
  isBanner?: boolean;
}
// 商品列表返回体数据
export interface ResponseGoodsListDatum {
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
  detailJSon: number;
  specList: SpecList[];
}

export interface SpecList {
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
//商品分类列表返回体数据
export interface ClsssListResponse {
  categoryId: number;
  name: string;
}

//商品详情返回体数据
export interface ResponseGoodsDetail {
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
  specList: SpecList[];
}

//商品规格数据
export interface SpecList {
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
