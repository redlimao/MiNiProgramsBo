// pages/xieyi/xieyi.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodes: [{
      name: "div,strong"
    }],
  },

  onLoad: function (options) {
    var that=this;
    wx.request({
        url: 'https://www.mozhifang.cn/mofang_web/mofang_czy/index.php?s=/Home/Pay/xie_yi',
      data: { },
      method: "GET",
      success: function (res) {
        if (res.data) {
          var article = res.data
          WxParse.wxParse('article', 'html', article, that, 5)
        }
      }
    })
  },
})