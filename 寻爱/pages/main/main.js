// pages/main/main.js
Page({
  data: {
    ation: false,
    path:''
  },
  onShow: function (options) {
    var that = this;
    wx.login({
      success: function (ress) {
        if (ress.code) {
          wx.showLoading({
            title: '加载中',
          })
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/index',
            data: { code: ress.code },
            method: "GET",
            success: function (res) {
              that.setData({
                info: res.data.info,
                common: res.data.icon,
                tian:res.data.tian,
                path:res.data.url
              })
            },
            complete: function () {
              wx.hideLoading();
            }
          })
        }
      }
    })
  },
  // =====全部订单
  orderName: function () {
    var typess_id = 1;
    var app = getApp();
    app.requesttypess_id = typess_id;
    wx.navigateTo({
      url: '../my_order/my_order?types=2',
    })
  },
  // ======我的好友
  pengName:function(){
    wx.navigateTo({
      url: '../peng/peng',
    })
  },
  // =====优惠券
  quanName:function(){
    var money_id = 0;
    var app = getApp();
    app.requestmoney_id = money_id;
    wx.navigateTo({
      url: '../quan/quan',
    })
  },
  // =====我的积分
  pointsName:function(){
    wx.navigateTo({
      url: '../qian/qian',
    })
  },
  // =========我的消息
  xiaoName:function(){
    wx.navigateTo({
      url: '../xiao/xiao',
    })
  },
  //收藏
  collectName: function () {
    wx.navigateTo({
      url: '../collect/collect',
    })
  },
  // =======资料设置
  selfName:function(){
    var userId = this.data.userId;
    wx.navigateTo({
      url: '../message/message',
    })
  },
  // ======鲜花消息
  flowerName:function(){
    wx.navigateTo({
      url: '../flower/flower',
    })
  },
  //============我的名片
  erName:function(){
    wx.navigateTo({
      url: '../er/er',
    })
  },
  //============我的转介
  jieName: function () {
    wx.navigateTo({
      url: '../jie/jie',
    })
  },
  // ========关于我们
  bindOur:function(){
    wx.navigateTo({
      url: '../mains/mains',
    })
  },
  
  // ======未通过认证原因
  ationName:function(){
    this.setData({
      ation:true
    })
  },
  // =======认证原因关闭
  ationClose:function(){
    this.setData({
      ation:false
    })
  },
  // =====技术支持
  jiName: function () {
    var path=this.data.path;
    wx.navigateTo({
      url: '../newpage/newpage?path=' + path,
    })
  },
})