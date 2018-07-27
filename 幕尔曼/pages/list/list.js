// pages/list/list.js
Page({

  data: {
  
  },
  onLoad: function (options) {
    var sou_id = getApp().requestsou_id;
    var types = options.type;
    console.log(types)
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: "https://www.bozhiyingxiao.com/little_program/store_mrm/index.php?s=/Little/Sou/index",
      data: { content: sou_id, type: types },
      method: "get",
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        if (res.data.list == 1) {
          that.setData({
            empty: 1
          })
        } else {
          that.setData({
            list: res.data.list,
            empty: 0
          })
        }
      }
    })
  },
  // ===商品详情跳转
  shopName: function (e) {
    var shop_id = e.currentTarget.id;
    var app = getApp();
    app.requestshop_id = shop_id;
    var types_id = e.currentTarget.dataset.id;
    var app = getApp();
    app.requesttypes_id = types_id;
    wx.navigateTo({
      url: '../shop_details/shop_details',
    })
  },
})