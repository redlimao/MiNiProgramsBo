// pages/list/list.js
Page({

  data: {
  
  },
  onLoad: function (options) {
    var search_txt = options.searchtxt;
    var that = this;
    console.log(search_txt)
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: "https://www.bozhiyingxiao.com/little_program/store_bama/index.php?s=/Little/Sou/index",
      data:{content: search_txt},
      method: "GET",
      success: function (res) {
        console.log(res)
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
      },
      complete:function(){
          wx.hideLoading()
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
    console.log(app.requestshop_id, app.requesttypes_id)
    wx.navigateTo({
      url: '../shop_details/shop_details',
    })
  },
})