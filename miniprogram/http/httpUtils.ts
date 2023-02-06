import { Response } from '../type/';
const ui = require('./ui');
const BASE_URL = 'http://119.23.55.88:8080/';

/**
 * 网络请求request
 * obj.data 请求接口需要传递的数据
 * obj.showLoading 控制是否显示加载Loading 默认为false不显示
 * obj.contentType 默认为 application/json
 * obj.method 请求的方法  默认为GET
 * obj.url 请求的接口路径
 * obj.message 加载数据提示语
 */
function request(obj: {
  data: any;
  contentType: any;
  method: any;
  showLoading: boolean;
  message: string;
  url: string;
}) {
  return new Promise(function (resolve, reject) {
    if (obj.showLoading) {
      ui.showLoading(obj.message ? obj.message : '加载中...');
    }
    var data = {};
    if (obj.data) {
      data = obj.data;
    }
    var contentType = 'application/json';
    if (obj.contentType) {
      contentType = obj.contentType;
    }

    var method: string = 'POST';
    if (obj.method) {
      method = obj.method;
    }

    wx.request({
      url: BASE_URL + obj.url,
      data,
      method: method as any,
      //添加请求头
      header: {
        'Content-Type': contentType,
        Authorization: wx.getStorageSync('token'), //获取保存的token
      },
      //请求成功
      success: function (res) {
        console.log(
          '===============================================================================================',
        );
        console.log('==    接口地址：' + obj.url);
        console.log('==    接口参数：' + JSON.stringify(data));
        console.log('==    请求类型：' + method);
        console.log('==    接口状态：' + res.statusCode);
        console.log('==    接口数据：' + JSON.stringify(res.data));
        console.log(
          '===============================================================================================',
        );
        res.data = res.data as Response<any>;
        if (res.data.code === 200) {
          resolve(res.data.data);
        }
        // 认证失败
        if (res.data.code === 401) {
          ui.showToast(res.data.message);
          jumpToLogin();
        }
        // //用户名或密码错误
        if (res.data.code === 400159) {
          ui.showToast(res.data.message);
        }
        //逻辑错误
        if (res.data.code === 410) {
          ui.showToast(res.data.message);
          resolve(res.data.data);
        }
        //服务器异常
        if (res.data.code == 500) {
          ui.showToast(res.data.message);
        }
        // 400 为参数错误
        if (res.data.code == 400) {
          ui.showToast(res.data.message);
        }
      },
      fail: function (err) {
        //服务器连接异常
        console.log(
          '===============================================================================================',
        );
        console.log('==    接口地址：' + obj.url);
        console.log('==    接口参数：' + JSON.stringify(data));
        console.log('==    请求类型：' + method);
        console.log('==    服务器连接异常');
        console.log(
          '===============================================================================================',
        );
        ui.showToast('服务器连接异常');
        reject(err);
      },
      complete: function () {
        ui.hideLoading();
      },
    });
  });
}

//跳转到登录页
function jumpToLogin() {
  wx.reLaunch({
    url: '/pages/userLogin/userLogin',
  });
}

module.exports = {
  request,
};
