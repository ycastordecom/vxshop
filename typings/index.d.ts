/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: string;
  };
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}
