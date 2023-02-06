// app.ts
App<IAppOption>({
  globalData: {},
  onShow() {},
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  },
});
