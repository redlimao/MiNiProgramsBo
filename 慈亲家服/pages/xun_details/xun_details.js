var WxParse = require('../../wxParse/wxParse.js');
Page({

  data: {
  
  },
  onLoad: function (options) {
    var jia_id = getApp().requestjia_id;
    var that = this;
    wx.request({
      url: 'https://www.ciqinfuwu.com/index.php?s=/Little/Servers/info',
      data: { id:  jia_id },
      method: "GET",
      success: function (res) {
        that.setData({
          xun_img: res.data.img
        })
        var article = res.data.content
        WxParse.wxParse('article', 'html', article, that, 5)
      }
    })
  },
  orderName:function(e){
    var order_type = e.currentTarget.id;
    var app = getApp();
    app.requestorder_type = order_type;
    var types_id = 2;
    var app = getApp();
    app.requesttypes_id = types_id;
    wx.navigateTo({
      url: '../order/order',
    })
  }
})