var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    nodes: [{
      name: "div,strong"
    }],
  },
  onLoad: function (options) {
    var points_id = getApp().requestpoints_id;
    var that=this;
    wx.request({
        url: 'https://www.bozhiyingxiao.com/little_program/store_meitian/index.php?s=/Little/Center/xie_rules',
      data: { type: points_id },
      method: "GET",
      success: function (res) {
        var article = res.data.info
        WxParse.wxParse('article', 'html', article, that, 5)
      }
    }) 
  },
})