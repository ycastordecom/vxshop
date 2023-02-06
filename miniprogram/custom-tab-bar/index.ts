// custom-tab-bar/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    list: [
      {
        id: 0,
        icon: 'home-o',
        text: '首页',
        url: '/pages/index/index',
      },
      {
        id: 1,
        icon: 'search',
        text: '分类',
        url: '/pages/class/class',
      },
      {
        id: 2,
        icon: 'shopping-cart-o',
        text: '购物车',
        url: '/pages/cart/cart',
      },
      {
        id: 3,
        icon: 'user-o',
        text: '我的',
        url: '/pages/my/my',
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event: any) {
      wx.switchTab({
        url: this.data.list[event.detail].url,
      });
      this.setData({ active: event.detail });
    },
    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(
          (item) => item.url === `/${page?.route}`,
        ),
      });
    },
  },
});
