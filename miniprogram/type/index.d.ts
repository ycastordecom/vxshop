//逻辑返回体基础接口
export interface Response<T> {
  code: number;
  message: string;
  data: T;
}
//列表请求基础地址
export interface RequestList<T> {
  pageNum: number;
  pageSize: number;
  query: T;
}
//列表返回体基础接口
export interface ResponseList<T> {
  hasNext: boolean;
  total: number;
  data: T[];
}
