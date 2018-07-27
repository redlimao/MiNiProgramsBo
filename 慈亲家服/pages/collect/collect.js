// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curHdIndex: 0,
    empty:0,
    emptys:0,
    emptyss:0,
    emptysss:0,
    list:[{title:"课程2",num1:1,num2:2}]
  },
  onShow: function (options) {
    var that = this;
    wx.login({
      success:function(ress){
        if(ress.code){
          wx.request({
            url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Center/collects',
            data: {code:ress.code},
            method: "GET",
            success: function (res) {
              console.log(res)
              if (res.data.o == 1) {
                that.setData({
                  empty: 1
                })
              } else {
                that.setData({
                  list: res.data.o
                })
              }
              if (res.data.t == 1) {
                that.setData({
                  emptys: 1
                })
              } else {
                that.setData({
                  lists: res.data.t
                })
              }
              if (res.data.h == 1) {
                that.setData({
                  emptyss: 1
                })
              } else {
                that.setData({
                  car: res.data.h
                })
              }
            }
          })
        }
      }
    })
  },
  // ===大导航
  tabFun: function (e) {
    this.setData({
      curHdIndex: e.target.dataset.id
    });
  },
  innerName: function (e) {
    this.setData({
      curHdIndex: e.detail.current,
    })
  },
  // ===家政详情
  detailsName: function (e) {
    var jia_id = e.currentTarget.id;
    var app = getApp();
    app.requestjia_id = jia_id;
    wx.navigateTo({
      url: '../jia_details/jia_details',
    })
  },
  // ===雇主详情
  guName: function (e) {
    var gu_id = e.currentTarget.id;
    var app = getApp();
    app.requestgu_id = gu_id;
    var gu_types = 1;
    var app = getApp();
    app.requestgu_types = gu_types;
    wx.navigateTo({
      url: '../gu_details/gu_details',
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