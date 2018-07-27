var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    nodes: [{
      name: "div,strong"
    }],
  },
  onLoad: function (options) {
    var that=this;
    var types = options.types
    wx.request({
      url: 'https://www.bozhiyingxiao.com/little_program/store_love/index.php?s=/Little/Center/xie_rules',
      data: { type: types },
      method: "GET",
      success: function (res) {
        var article = res.data.info
        WxParse.wxParse('article', 'html', article, that, 5)
      }
    }) 
  },
  // =====返回上一级
  backName: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})