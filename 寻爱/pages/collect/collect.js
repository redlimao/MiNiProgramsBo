// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curHdIndex: 0,
    empty:0
  },
  onShow: function (options) {
    var that = this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/collectss',
            data: {code:ress.code},
            method: "GET",
            success: function (res) {
              if (res.data.goods == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  car: res.data.goods
                })
              }
            }
          })
        }
      }
    })
  },
  // ======返回上一级
  backName: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // ===商品详情跳转
  shopName: function (e) {
    var shop_id = e.currentTarget.id;
    var app = getApp();
    app.requestshop_id = shop_id;
    wx.navigateTo({
      url: '../shop_details/shop_details',
    })
  }
})